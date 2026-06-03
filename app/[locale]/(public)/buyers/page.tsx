import type { Metadata } from 'next';

import { createAdminClient } from '@/utils/supabase/admin';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'Latest buyers',
  description: 'Latest buyers on calmia.club',
};

type PurchaseEmailRow = {
  email: string;
};

function maskEmail(email: string) {
  const [name, domain] = email.split('@');

  if (!name || !domain) {
    return email;
  }

  const visibleStart = name.slice(0, Math.min(2, name.length));
  const visibleEnd = name.length > 4 ? name.slice(-1) : '';

  return `${visibleStart}${'*'.repeat(3)}${visibleEnd}@${domain}`;
}

async function getLatestBuyerEmails() {
  const supabase = createAdminClient();

  if (!supabase) {
    return {
      buyers: [],
      error: 'Supabase admin client is not configured.',
    };
  }

  const { data, error } = await supabase
    .from('purchases')
    .select('email')
    .eq('status', 'approved')
    .order('purchased_at', { ascending: false })
    .limit(5)
    .returns<PurchaseEmailRow[]>();

  if (error) {
    console.error('Error loading latest buyers:', error);
    return {
      buyers: [],
      error: 'Could not load latest buyers.',
    };
  }

  return {
    buyers: (data || []).map((purchase) => maskEmail(purchase.email)),
    error: null,
  };
}

export default async function BuyersPage() {
  const { buyers, error } = await getLatestBuyerEmails();

  return (
    <main className="min-h-screen bg-[#f7f1e8] px-4 py-10 text-[#2b241c]">
      <section className="mx-auto w-full max-w-xl rounded-2xl border border-[#d8c39d] bg-white p-6 shadow-sm">
        <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#94743e]">
          calmia.club
        </p>
        <h1 className="mt-2 text-3xl font-bold">Latest buyers</h1>

        {error ? (
          <p className="mt-6 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
            {error}
          </p>
        ) : buyers.length > 0 ? (
          <ul className="mt-6 divide-y divide-[#eadcc6]">
            {buyers.map((email, index) => (
              <li key={`${email}-${index}`} className="py-3 font-mono text-sm">
                {email}
              </li>
            ))}
          </ul>
        ) : (
          <p className="mt-6 text-sm text-[#6f604d]">No buyers found.</p>
        )}
      </section>
    </main>
  );
}
