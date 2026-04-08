import { NextResponse } from 'next/server';

import {
  getImportedUserPassword,
  isUsingLegacyImportedPassword,
} from '@/features/auth/server/imported-user-password';
import {
  PLATFORM_ACCESS_PRODUCTS,
  isApprovedPrayerRequestProduct,
} from '@/features/webhooks/shared/products';
import { syncLead } from '@/features/webhooks/shared/lead-sync';
import type { VendePayWebhook } from '@/features/webhooks/vendepay/types';
import {
  getBuyerName,
  getTransactionId,
  mapVendePayStatus,
  resolvePurchasedAt,
} from '@/features/webhooks/vendepay/utils';
import { createClient } from '@/utils/supabase/server';

const VENDEPAY_APPROVED_EVENTS = new Set(['compra.aprovada', 'assinatura.realizada']);

export async function POST(request: Request) {
  try {
    if (isUsingLegacyImportedPassword()) {
      console.warn('Using legacy imported user password fallback. Configure DEFAULT_IMPORTED_USER_PASSWORD.');
    }

    const supabase = await createClient();
    const { searchParams } = new URL(request.url);
    const sender = searchParams.get('sender');
    const body: VendePayWebhook = await request.json();

    if (body.event === 'TEST') {
      console.log('VendePay test webhook received:', body);
      return NextResponse.json({
        success: true,
        action: 'ignored_test',
      });
    }

    const email = body.emailComprador?.trim().toLowerCase();
    const transactionId = getTransactionId(body);
    const buyerName = getBuyerName(body) || email?.split('@')[0] || 'Cliente VendePay';
    const sourceProductId = body.produtoId?.trim() || 'vendepay_super_purchase';
    const normalizedEvent = body.event?.trim().toLowerCase();
    const status = VENDEPAY_APPROVED_EVENTS.has(normalizedEvent || '')
      ? 'approved'
      : mapVendePayStatus(body.status);

    console.log('VendePay webhook received:', {
      event: body.event,
      transaction: transactionId,
      email,
      productId: sourceProductId,
      status,
    });

    if (!email) {
      return NextResponse.json({ error: 'Missing customer email' }, { status: 400 });
    }

    if (!transactionId) {
      return NextResponse.json({ error: 'Missing transaction id' }, { status: 400 });
    }

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
          name: buyerName,
          password: getImportedUserPassword(),
        })
        .select('id')
        .single();

      if (profileError || !newProfile) {
        console.error('Error creating profile from VendePay webhook:', profileError);
        return NextResponse.json({ error: 'Failed to create profile' }, { status: 500 });
      }

      profileId = newProfile.id;
    } else {
      profileId = existingProfile.id;
    }

    const purchasedAt = resolvePurchasedAt(body.createdAt);
    const accessProducts = PLATFORM_ACCESS_PRODUCTS;

    const purchaseResults = await Promise.all(
      accessProducts.map(async (product, index) => {
        const itemTransactionId = `${transactionId}_${product.id}_${index}`;

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
              product_id: product.id,
              product_name: product.name,
              purchase_data: body,
              updated_at: new Date().toISOString(),
            })
            .eq('transaction_id', itemTransactionId);
        }

        return supabase.from('purchases').insert({
          profile_id: profileId,
          email,
          product_id: product.id,
          product_name: product.name,
          transaction_id: itemTransactionId,
          status,
          payment_gateway: 'vendepay',
          purchase_data: body,
          purchased_at: purchasedAt,
        });
      })
    );

    const purchaseError = purchaseResults.find((result) => result.error)?.error;

    if (purchaseError) {
      console.error('Error processing VendePay purchases:', purchaseError);
      return NextResponse.json({ error: 'Failed to process purchases' }, { status: 500 });
    }

    await syncLead({
      email,
      name: buyerName,
      status,
      provider: sender,
      productNames: accessProducts.map((product) => product.name),
    });

    if (status === 'approved' && accessProducts.some((product) => isApprovedPrayerRequestProduct(product.name))) {
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
        console.error('Error updating prayer request from VendePay webhook:', updatePrayerError);
      }
    }

    return NextResponse.json({
      success: true,
      action: 'processed',
      transaction: transactionId,
      status,
      productsGranted: accessProducts.length,
    });
  } catch (error) {
    console.error('VendePay webhook error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function GET() {
  return NextResponse.json({
    status: 'ok',
    endpoint: 'vendepay-webhook',
    timestamp: new Date().toISOString(),
  });
}
