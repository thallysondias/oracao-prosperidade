import type { HotmartStatus } from '@/features/webhooks/hotmart/types';

export function mapHotmartStatus(event: string, status: HotmartStatus): string {
  if (event === 'PURCHASE_CANCELED') return 'cancelled';
  if (event === 'PURCHASE_REFUNDED') return 'refunded';
  if (event === 'PURCHASE_CHARGEBACK') return 'chargeback';
  if (event === 'PURCHASE_APPROVED') return 'approved';
  if (status === 'approved') return 'approved';
  return 'pending';
}

export function resolvePurchasedAt(approvedDate?: number) {
  if (!approvedDate) {
    return new Date().toISOString();
  }

  const date =
    approvedDate > 9999999999
      ? new Date(approvedDate)
      : new Date(approvedDate * 1000);

  return date.toISOString();
}

export function isApprovedPrayerRequestProduct(productName: string) {
  return (
    productName.includes('Pedido de Oración') ||
    productName.includes('Pedido Personalizado')
  );
}
