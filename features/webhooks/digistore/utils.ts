import type { NormalizedPurchaseStatus, NormalizedWebhookEvent } from '@/features/webhooks/core/types';
import type { DigistoreWebhook } from '@/features/webhooks/digistore/types';

const DIGISTORE_STATUS_MAP: Record<string, NormalizedPurchaseStatus> = {
  payment: 'approved',
  on_payment: 'approved',
  refund: 'refunded',
  on_refund: 'refunded',
  chargeback: 'chargeback',
  on_chargeback: 'chargeback',
  payment_denial: 'cancelled',
  rejected_payment: 'cancelled',
  on_payment_missed: 'cancelled',
  missed_recurring_payment: 'cancelled',
  last_paid_day: 'cancelled',
};

export function parseDigistoreFormBody(rawBody: string): DigistoreWebhook {
  return Object.fromEntries(new URLSearchParams(rawBody).entries()) as DigistoreWebhook;
}

export function mapDigistoreEventStatus(event?: string): NormalizedPurchaseStatus {
  if (!event) return 'pending';
  return DIGISTORE_STATUS_MAP[event.trim().toLowerCase()] ?? 'pending';
}

export function normalizeDigistorePayload(payload: DigistoreWebhook): NormalizedWebhookEvent {
  const email = payload.email?.trim().toLowerCase() ?? '';
  const name = [payload.first_name?.trim(), payload.last_name?.trim()].filter(Boolean).join(' ').trim()
    || email.split('@')[0]
    || 'Cliente Digistore';

  return {
    provider: 'digistore',
    status: mapDigistoreEventStatus(payload.event),
    transactionId: payload.transaction_id?.trim() || payload.order_id?.trim() || '',
    email,
    name,
    sourceProductId: payload.product_id?.trim() || 'digistore_purchase',
    sourceProductName: payload.product_name?.trim() || payload.product_name_intern?.trim() || 'Produto Digistore',
    purchasedAt: resolveDigistorePurchasedAt(payload),
    rawPayload: payload,
  };
}

function resolveDigistorePurchasedAt(payload: DigistoreWebhook) {
  const candidates = [payload.transaction_date_time, payload.order_date_time].filter(Boolean) as string[];

  for (const candidate of candidates) {
    const normalized = candidate.includes('T') ? candidate : candidate.replace(' ', 'T');
    const parsed = new Date(normalized);

    if (!Number.isNaN(parsed.getTime())) {
      return parsed.toISOString();
    }
  }

  return new Date().toISOString();
}
