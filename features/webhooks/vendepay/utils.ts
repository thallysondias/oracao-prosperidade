import { resolveProductNameById } from '@/features/webhooks/shared/products';
import type { VendePayWebhook } from '@/features/webhooks/vendepay/types';

const VENDEPAY_STATUS_MAP: Record<
  number,
  'pending' | 'approved' | 'cancelled' | 'refunded' | 'chargeback'
> = {
  1: 'pending',
  2: 'approved',
  3: 'cancelled',
  4: 'refunded',
  5: 'chargeback',
};

export function getBuyerName(body: VendePayWebhook) {
  return [body.nomeComprador?.trim(), body.sobrenomeComprador?.trim()]
    .filter(Boolean)
    .join(' ')
    .trim();
}

export function getTransactionId(body: VendePayWebhook) {
  return body.id?.trim() || body.checkoutId?.trim() || '';
}

export function mapVendePayStatus(status?: number) {
  if (typeof status !== 'number') {
    return 'pending';
  }

  return VENDEPAY_STATUS_MAP[status] || 'pending';
}

export function resolvePurchasedAt(createdAt?: string) {
  if (!createdAt) {
    return new Date().toISOString();
  }

  const parsed = new Date(createdAt);

  if (Number.isNaN(parsed.getTime())) {
    return new Date().toISOString();
  }

  return parsed.toISOString();
}

export function resolveVendePayProductName(body: VendePayWebhook) {
  return resolveProductNameById(body.produtoId, 'Produto VendePay');
}
