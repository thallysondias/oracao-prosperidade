import {
  getImportedUserPassword,
  isUsingLegacyImportedPassword,
} from '@/features/auth/server/imported-user-password';
import {
  PLATFORM_ACCESS_PRODUCTS,
  isApprovedPrayerRequestProduct,
} from '@/features/webhooks/shared/products';
import { syncLead } from '@/features/webhooks/shared/lead-sync';
import { createAdminClient } from '@/utils/supabase/admin';

import type { NormalizedWebhookEvent } from './types';

type ProcessWebhookOptions = {
  event: NormalizedWebhookEvent;
  leadProvider?: string | null;
};

export async function processNormalizedWebhook({ event, leadProvider }: ProcessWebhookOptions) {
  if (isUsingLegacyImportedPassword()) {
    console.warn('Using legacy imported user password fallback. Configure DEFAULT_IMPORTED_USER_PASSWORD.');
  }

  if (!event.email) {
    return { ok: false, status: 400, body: { error: 'Missing customer email' } };
  }

  if (!event.transactionId) {
    return { ok: false, status: 400, body: { error: 'Missing transaction id' } };
  }

  const supabase = createAdminClient();
  if (!supabase) {
    console.error('Missing Supabase service role credentials for webhook processing.');
    return { ok: false, status: 500, body: { error: 'Webhook storage is not configured' } };
  }

  const { data: existingProfile } = await supabase
    .from('profiles')
    .select('id')
    .eq('email', event.email)
    .single();

  let profileId: string;

  if (!existingProfile) {
    const { data: newProfile, error: profileError } = await supabase
      .from('profiles')
      .insert({
        email: event.email,
        name: event.name,
        password: getImportedUserPassword(),
      })
      .select('id')
      .single();

    if (profileError || !newProfile) {
      console.error(`Error creating profile from ${event.provider} webhook:`, profileError);
      return { ok: false, status: 500, body: { error: 'Failed to create profile' } };
    }

    profileId = newProfile.id;
  } else {
    profileId = existingProfile.id;
  }

  const accessProducts = PLATFORM_ACCESS_PRODUCTS;
  const purchaseResults = await Promise.all(
    accessProducts.map(async (product, index) => {
      const itemTransactionId = `${event.transactionId}_${product.id}_${index}`;

      const { data: existingPurchase } = await supabase
        .from('purchases')
        .select('id')
        .eq('transaction_id', itemTransactionId)
        .single();

      if (existingPurchase) {
        return supabase
          .from('purchases')
          .update({
            status: event.status,
            product_id: product.id,
            product_name: product.name,
            purchase_data: event.rawPayload,
            updated_at: new Date().toISOString(),
          })
          .eq('transaction_id', itemTransactionId);
      }

      return supabase.from('purchases').insert({
        profile_id: profileId,
        email: event.email,
        product_id: product.id,
        product_name: product.name,
        transaction_id: itemTransactionId,
        status: event.status,
        payment_gateway: event.provider,
        purchase_data: event.rawPayload,
        purchased_at: event.purchasedAt,
      });
    })
  );

  const purchaseError = purchaseResults.find((result) => result.error)?.error;

  if (purchaseError) {
    console.error(`Error processing ${event.provider} purchases:`, purchaseError);
    return { ok: false, status: 500, body: { error: 'Failed to process purchases' } };
  }

  await syncLead({
    email: event.email,
    name: event.name,
    status: event.status,
    provider: leadProvider,
    productNames: accessProducts.map((product) => product.name),
  });

  if (event.status === 'approved' && accessProducts.some((product) => isApprovedPrayerRequestProduct(product.name))) {
    const { error: updatePrayerError } = await supabase
      .from('prayer_requests')
      .update({
        status: 'approved',
        transaction_id: event.transactionId,
        updated_at: new Date().toISOString(),
      })
      .eq('email', event.email)
      .eq('status', 'pending')
      .order('created_at', { ascending: false })
      .limit(1);

    if (updatePrayerError) {
      console.error(`Error updating prayer request from ${event.provider} webhook:`, updatePrayerError);
    }
  }

  return {
    ok: true,
    status: 200,
    body: {
      success: true,
      action: 'processed',
      provider: event.provider,
      transaction: event.transactionId,
      status: event.status,
      productsGranted: accessProducts.length,
    },
  };
}
