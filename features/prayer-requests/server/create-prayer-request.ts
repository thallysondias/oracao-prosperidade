import type { SupabaseClient } from '@supabase/supabase-js';

import type { CreatePrayerRequestInput } from '@/features/prayer-requests/types';
import {
  PRAYER_REQUEST_DEFAULT_GOAL,
  PRAYER_REQUEST_FALLBACK_PAYMENT_LINK,
  PRAYER_REQUEST_PAYMENT_LINK,
} from '@/features/prayer-requests/config';

export async function createPrayerRequest(
  supabase: SupabaseClient,
  input: CreatePrayerRequestInput,
) {
  const { data, error } = await supabase
    .from('prayer_requests')
    .insert({
      profile_id: input.profileId ?? null,
      email: input.email,
      name: input.name,
      goal: input.goal || PRAYER_REQUEST_DEFAULT_GOAL,
      prayer_text: input.prayerText,
      status: 'pending',
      payment_link: PRAYER_REQUEST_PAYMENT_LINK || PRAYER_REQUEST_FALLBACK_PAYMENT_LINK,
    })
    .select()
    .single();

  return { data, error };
}

export async function getLatestPrayerRequest(
  supabase: SupabaseClient,
  email: string,
) {
  return supabase
    .from('prayer_requests')
    .select('id, status, goal, prayer_text, payment_link, created_at')
    .eq('email', email)
    .order('created_at', { ascending: false })
    .limit(1)
    .single();
}
