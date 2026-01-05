'use server';

import { headers } from 'next/headers';
import { NextResponse } from 'next/server';
import Stripe from 'stripe';

import { createClient } from '@/utils/supabase/server';

const MAILINGBOSS_TOKEN = process.env.MAILINGBOSS_TOKEN || '75537:6ddeb64d3ac1a0e5a93cde784e73e243';
const MAILINGBOSS_LIST_UID = process.env.MAILINGBOSS_LIST_UID || 'vh485p76so057';
const MAILINGBOSS_API_URL = 'https://member.mailingboss.com/integration/index.php/lists/subscribers/create';

const STRIPE_SECRET_KEY = process.env.STRIPE_SECRET_KEY;
const STRIPE_WEBHOOK_SECRET = process.env.STRIPE_WEBHOOK_SECRET;

if (!STRIPE_SECRET_KEY) {
  throw new Error('Missing STRIPE_SECRET_KEY env');
}

if (!STRIPE_WEBHOOK_SECRET) {
  throw new Error('Missing STRIPE_WEBHOOK_SECRET env');
}

const stripe = new Stripe(STRIPE_SECRET_KEY, {
  apiVersion: '2025-11-17.clover',
});

type NormalizedStripePayload = {
  email: string;
  name: string;
  productId: string;
  productName: string;
  transactionId: string;
  status: 'approved' | 'pending' | 'cancelled' | 'refunded' | 'chargeback';
  purchasedAt: string;
};

function mapStripeStatus(eventType: string): NormalizedStripePayload['status'] {
  switch (eventType) {
    case 'checkout.session.completed':
    case 'payment_intent.succeeded':
    case 'invoice.payment_succeeded':
      return 'approved';
    case 'charge.refunded':
      return 'refunded';
    case 'charge.dispute.created':
      return 'chargeback';
    case 'payment_intent.payment_failed':
    case 'invoice.payment_failed':
    case 'customer.subscription.deleted':
      return 'cancelled';
    default:
      return 'pending';
  }
}

function normalizeStripeEvent(event: Stripe.Event): NormalizedStripePayload | null {
  switch (event.type) {
    case 'checkout.session.completed': {
      const session = event.data.object as Stripe.Checkout.Session;
      const email = session.customer_details?.email || session.customer_email;
      const name =
        session.customer_details?.name ||
        session.metadata?.customer_name ||
        session.metadata?.buyer_name ||
        'Cliente Stripe';
      const productId = session.metadata?.product_id || 'stripe_product';
      const productName = session.metadata?.product_name || session.metadata?.productId || 'Produto Stripe';
      const status = mapStripeStatus(event.type);
      const transactionId = session.payment_intent?.toString() || session.id;

      if (!email) {
        return null;
      }

      return {
        email,
        name,
        productId,
        productName,
        transactionId,
        status,
        purchasedAt: new Date((session.created || Math.floor(Date.now() / 1000)) * 1000).toISOString(),
      };
    }
    case 'payment_intent.succeeded':
    case 'payment_intent.payment_failed': {
      const intent = event.data.object as Stripe.PaymentIntent;
      const email = (intent.receipt_email ||
        intent.metadata?.customer_email ||
        intent.metadata?.buyer_email) as string | undefined;

      if (!email) {
        return null;
      }

      const name =
        (intent.metadata?.customer_name ||
          intent.metadata?.buyer_name ||
          (intent.customer as string)) ??
        'Cliente Stripe';
      const productId = intent.metadata?.product_id || 'stripe_product';
      const productName = intent.metadata?.product_name || 'Produto Stripe';
      const status = mapStripeStatus(event.type);

      return {
        email,
        name,
        productId,
        productName,
        transactionId: intent.id,
        status,
        purchasedAt: new Date((intent.created || Math.floor(Date.now() / 1000)) * 1000).toISOString(),
      };
    }
    case 'charge.refunded':
    case 'charge.dispute.created': {
      const charge = event.data.object as Stripe.Charge;
      const email =
        charge.billing_details?.email ||
        (charge.metadata?.customer_email as string | undefined) ||
        (charge.metadata?.buyer_email as string | undefined);

      if (!email) {
        return null;
      }

      const name =
        charge.billing_details?.name ||
        (charge.metadata?.customer_name as string | undefined) ||
        'Cliente Stripe';
      const productId = charge.metadata?.product_id || 'stripe_product';
      const productName = charge.metadata?.product_name || 'Produto Stripe';
      const status = mapStripeStatus(event.type);

      return {
        email,
        name,
        productId,
        productName,
        transactionId: charge.payment_intent?.toString() || charge.id,
        status,
        purchasedAt: new Date((charge.created || Math.floor(Date.now() / 1000)) * 1000).toISOString(),
      };
    }
    default:
      return null;
  }
}

async function addToMailingBoss(email: string, name: string, tag: string) {
  try {
    const [firstName, ...lastNameParts] = name.split(' ');
    const lastName = lastNameParts.join(' ') || '';

    const response = await fetch(`${MAILINGBOSS_API_URL}/${MAILINGBOSS_TOKEN}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email,
        list_uid: MAILINGBOSS_LIST_UID,
        fname: firstName,
        lname: lastName,
        taginternals: tag,
      }),
    });

    const data = await response.json();

    if (response.ok && data.status === 'success') {
      console.log('Lead added/updated in MailingBoss:', {
        email,
        tag,
        subscriber_uid: data.data?.subscriber_uid,
      });
      return { success: true, data };
    } else {
      console.error('MailingBoss API error:', data);
      return { success: false, error: data };
    }
  } catch (error) {
    console.error('Error adding to MailingBoss:', error);
    return { success: false, error };
  }
}

export async function POST(request: Request) {
  const signature = (await headers()).get('stripe-signature');
  const payload = await request.text();

  if (!signature) {
    return NextResponse.json({ error: 'Missing Stripe signature' }, { status: 400 });
  }

  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(payload, signature, STRIPE_WEBHOOK_SECRET!);
  } catch (err) {
    console.error('Stripe webhook signature verification failed:', err);
    return NextResponse.json({ error: 'Invalid signature' }, { status: 400 });
  }

  const normalized = normalizeStripeEvent(event);

  if (!normalized) {
    console.log('Stripe event ignored (missing data or unsupported type):', event.type);
    return NextResponse.json({ success: true, action: 'ignored', event: event.type });
  }

  const supabase = await createClient();
  const { email, name, productId, productName, transactionId, status, purchasedAt } = normalized;

  const { data: existingProfile } = await supabase
    .from('profiles')
    .select('id')
    .eq('email', email)
    .single();

  let profileId: string;

  if (!existingProfile) {
    const { data: newProfile, error: profileError } = await supabase
      .from('profiles')
      .insert({
        email,
        name,
        password: 'benedito',
      })
      .select('id')
      .single();

    if (profileError || !newProfile) {
      console.error('Error creating profile from Stripe webhook:', profileError);
      return NextResponse.json({ error: 'Failed to create profile' }, { status: 500 });
    }

    profileId = newProfile.id;
  } else {
    profileId = existingProfile.id;
  }

  const { data: existingPurchase } = await supabase
    .from('purchases')
    .select('id')
    .eq('transaction_id', transactionId)
    .single();

  if (existingPurchase) {
    const { error: updateError } = await supabase
      .from('purchases')
      .update({
        status,
        purchase_data: event,
        updated_at: new Date().toISOString(),
      })
      .eq('transaction_id', transactionId);

    if (updateError) {
      console.error('Error updating Stripe purchase:', updateError);
      return NextResponse.json({ error: 'Failed to update purchase' }, { status: 500 });
    }

    await addToMailingBoss(email, name, status);

    return NextResponse.json({
      success: true,
      action: 'updated',
      transaction: transactionId,
    });
  }

  const { error: purchaseError } = await supabase.from('purchases').insert({
    profile_id: profileId,
    email,
    product_id: productId,
    product_name: productName,
    transaction_id: transactionId,
    status,
    purchase_data: event,
    purchased_at: purchasedAt,
  });

  if (purchaseError) {
    console.error('Error creating Stripe purchase:', purchaseError);
    return NextResponse.json({ error: 'Failed to create purchase' }, { status: 500 });
  }

  await addToMailingBoss(email, name, status);

  if (
    status === 'approved' &&
    (productName.includes('Pedido de Oración') || productName.includes('Pedido Personalizado'))
  ) {
    const { error: updatePrayerError } = await supabase
      .from('prayer_requests')
      .update({
        status: 'approved',
        transaction_id: transactionId,
        updated_at: new Date().toISOString(),
      })
      .eq('email', email)
      .eq('status', 'pending')
      .order('created_at', { ascending: false })
      .limit(1);

    if (updatePrayerError) {
      console.error('Error updating prayer request (Stripe):', updatePrayerError);
    } else {
      console.log('Prayer request updated to approved (Stripe):', email);
    }
  }

  return NextResponse.json({
    success: true,
    action: 'created',
    transaction: transactionId,
    status,
  });
}

export async function GET() {
  return NextResponse.json({
    status: 'ok',
    endpoint: 'stripe-webhook',
    timestamp: new Date().toISOString(),
  });
}


