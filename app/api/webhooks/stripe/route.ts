import { headers } from 'next/headers';
import { NextResponse } from 'next/server';
import Stripe from 'stripe';

import {
  getImportedUserPassword,
  isUsingLegacyImportedPassword,
} from '@/features/auth/server/imported-user-password';
import { createClient } from '@/utils/supabase/server';

const MAILINGBOSS_TOKEN = process.env.MAILINGBOSS_TOKEN || '75537:6ddeb64d3ac1a0e5a93cde784e73e243';
const MAILINGBOSS_LIST_UID = '696f4ee812328'; 
const MAILINGBOSS_API_URL = 'https://member.mailingboss.com/integration/index.php/lists/subscribers/create';

const STRIPE_SECRET_KEY = process.env.STRIPE_SECRET_KEY;
const STRIPE_WEBHOOK_SECRET = process.env.STRIPE_WEBHOOK_SECRET;
const stripe = STRIPE_SECRET_KEY
  ? new Stripe(STRIPE_SECRET_KEY, {
      apiVersion: '2025-12-15.clover',
    })
  : null;

function getStripeClient() {
  if (!stripe) {
    throw new Error('Stripe webhook is not configured');
  }

  return stripe;
}

// Mapeamento de nomes de produtos do Stripe para nomes padronizados
const STRIPE_PRODUCT_NAMES: Record<string, string> = {
  'Oración de San Benito': 'Oración de San Benito',
  'Padre Pio': 'Padre Pio',
  'Pedido de Oración Personalizado': 'Pedido de Oración Personalizado',
  '21 Días de Oración y Milagros en Vivo': '21 Días de Oración y Milagros en Vivo',
  'Decreto de Riqueza de Salomón': 'Decreto de Riqueza de Salomón',
  'Oración de Carlos Acutis': 'Oración de Carlos Acutis',
};

// Função para normalizar o nome do produto
function normalizeProductName(stripeName: string): string {
  // Procura por correspondência parcial no nome do produto
  for (const [key, value] of Object.entries(STRIPE_PRODUCT_NAMES)) {
    if (stripeName.includes(key) || key.includes(stripeName)) {
      return value;
    }
  }
  return stripeName;
}

type NormalizedStripePayload = {
  email: string;
  name: string;
  productId: string;
  productName: string;
  transactionId: string;
  status: 'approved' | 'pending' | 'cancelled' | 'refunded' | 'chargeback';
  purchasedAt: string;
  subscriptionItems?: Array<{
    priceId: string;
    productId: string;
    productName: string;
  }>;
};

/**
 * Processa os itens de uma subscription e retorna array com todos os produtos
 */
async function getSubscriptionItems(subscriptionId: string): Promise<Array<{ priceId: string; productId: string; productName: string }>> {
  try {
    const subscription = await getStripeClient().subscriptions.retrieve(subscriptionId, {
      expand: ['items.data.price.product'],
    });

    return subscription.items.data.map((item) => {
      const priceId = item.price.id;
      const product = item.price.product as Stripe.Product;
      const productId = typeof product === 'string' ? product : product.id;
      
      // Usa o nickname do price ou nome do produto como fallback
      const productName = item.price.nickname || product.name || 'Produto Stripe';

      return {
        priceId,
        productId,
        productName,
      };
    });
  } catch (error) {
    console.error('Error fetching subscription items:', error);
    return [];
  }
}

function mapStripeStatus(eventType: string): NormalizedStripePayload['status'] {
  switch (eventType) {
    case 'checkout.session.completed':
    case 'payment_intent.succeeded':
    case 'invoice.payment_succeeded':
    case 'customer.subscription.created':
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

async function normalizeStripeEvent(event: Stripe.Event): Promise<NormalizedStripePayload | null> {
  switch (event.type) {
    case 'checkout.session.completed': {
      const session = event.data.object as Stripe.Checkout.Session;
      const email = session.customer_details?.email || session.customer_email;
      const name =
        session.customer_details?.name ||
        session.metadata?.customer_name ||
        session.metadata?.buyer_name ||
        'Cliente Stripe';
      
      if (!email) {
        return null;
      }

      const status = mapStripeStatus(event.type);
      const transactionId = session.payment_intent?.toString() || session.id;

      // Se for uma subscription, busca os itens da subscription
      let subscriptionItems: Array<{ priceId: string; productId: string; productName: string }> = [];
      
      if (session.subscription && typeof session.subscription === 'string') {
        subscriptionItems = await getSubscriptionItems(session.subscription);
      }

      // Se tiver itens da subscription, usa o primeiro como principal e adiciona os outros
      let productId: string;
      let productName: string;

      if (subscriptionItems.length > 0) {
        productId = subscriptionItems[0].productId;
        productName = subscriptionItems[0].productName;
      } else {
        // Fallback para metadata
        productId = session.metadata?.product_id || 'stripe_product';
        const rawProductName = session.metadata?.product_name || session.metadata?.productId || 'Produto Stripe';
        productName = normalizeProductName(rawProductName);
      }

      return {
        email,
        name,
        productId,
        productName,
        transactionId,
        status,
        purchasedAt: new Date((session.created || Math.floor(Date.now() / 1000)) * 1000).toISOString(),
        subscriptionItems: subscriptionItems.length > 0 ? subscriptionItems : undefined,
      };
    }
    case 'customer.subscription.created': {
      const subscription = event.data.object as Stripe.Subscription;
      
      // Busca o customer para pegar o email
      let email: string | undefined;
      let name: string = 'Cliente Stripe';
      
      try {
        const customer = await getStripeClient().customers.retrieve(subscription.customer as string);
        if (customer && !customer.deleted) {
          email = customer.email ?? undefined;
          name = customer.name || name;
        }
      } catch (error) {
        console.error('Error fetching customer:', error);
        return null;
      }

      if (!email) {
        return null;
      }

      const status = mapStripeStatus(event.type);
      const transactionId = subscription.id;

      // Processa os itens da subscription
      const subscriptionItems = subscription.items.data.map((item) => {
        const priceId = item.price.id;
        const product = item.price.product as Stripe.Product;
        const productId = typeof product === 'string' ? product : product.id;
        const productName = item.price.nickname || (typeof product !== 'string' ? product.name : null) || 'Produto Stripe';

        return {
          priceId,
          productId,
          productName,
        };
      });

      // Usa o primeiro item como principal
      const productId = subscriptionItems[0]?.productId || 'stripe_product';
      const productName = subscriptionItems[0]?.productName || 'Produto Stripe';

      return {
        email,
        name,
        productId,
        productName,
        transactionId,
        status,
        purchasedAt: new Date((subscription.created || Math.floor(Date.now() / 1000)) * 1000).toISOString(),
        subscriptionItems,
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
      const rawProductName = intent.metadata?.product_name || 'Produto Stripe';
      const productName = normalizeProductName(rawProductName);
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
      const rawProductName = charge.metadata?.product_name || 'Produto Stripe';
      const productName = normalizeProductName(rawProductName);
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

    // Adicionar tag 'stripe' junto com o status
    const tags = `${tag},stripe`;

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
        taginternals: tags,
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
  if (!STRIPE_SECRET_KEY || !STRIPE_WEBHOOK_SECRET || !stripe) {
    console.error('Missing Stripe webhook configuration.');
    return NextResponse.json({ error: 'Stripe webhook is not configured' }, { status: 500 });
  }

  if (isUsingLegacyImportedPassword()) {
    console.warn('Using legacy imported user password fallback. Configure DEFAULT_IMPORTED_USER_PASSWORD.');
  }

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

  const normalized = await normalizeStripeEvent(event);

  if (!normalized) {
    console.log('Stripe event ignored (missing data or unsupported type):', event.type);
    return NextResponse.json({ success: true, action: 'ignored', event: event.type });
  }

  const supabase = await createClient();
  const { email, name, productId, productName, transactionId, status, purchasedAt, subscriptionItems } = normalized;

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
        password: getImportedUserPassword(),
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

  // Se tiver múltiplos itens de subscription, cria uma compra para cada
  if (subscriptionItems && subscriptionItems.length > 0) {
    const purchasePromises = subscriptionItems.map(async (item, index) => {
      const itemTransactionId = `${transactionId}_item_${index}`;
      
      const { data: existingPurchase } = await supabase
        .from('purchases')
        .select('id')
        .eq('transaction_id', itemTransactionId)
        .single();

      if (existingPurchase) {
        return supabase
          .from('purchases')
          .update({
            status,
            purchase_data: event,
            updated_at: new Date().toISOString(),
          })
          .eq('transaction_id', itemTransactionId);
      }

      return supabase.from('purchases').insert({
        profile_id: profileId,
        email,
        product_id: item.productId,
        product_name: item.productName,
        transaction_id: itemTransactionId,
        status,
        payment_gateway: 'stripe',
        purchase_data: event,
        purchased_at: purchasedAt,
      });
    });

    const results = await Promise.all(purchasePromises);
    const hasError = results.some((result) => result.error);

    if (hasError) {
      console.error('Error creating/updating some Stripe purchases:', results);
      return NextResponse.json({ error: 'Failed to process some purchases' }, { status: 500 });
    }

    await addToMailingBoss(email, name, status);

    // Verifica se algum dos produtos é "Pedido de Oração"
    const hasPrayerRequest = subscriptionItems.some(
      (item) =>
        item.productName.includes('Pedido de Oración') ||
        item.productName.includes('Pedido Personalizado') ||
        item.productName.includes('Pedido de Oração')
    );

    if (status === 'approved' && hasPrayerRequest) {
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
      action: 'processed_subscription',
      transaction: transactionId,
      items: subscriptionItems.length,
      status,
    });
  }

  // Processamento para compras únicas (sem subscription items)
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
    payment_gateway: 'stripe',
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



