export type WebhookProvider = 'hotmart' | 'kiwify' | 'vendapay' | 'digistore';

export type NormalizedPurchaseStatus =
  | 'approved'
  | 'cancelled'
  | 'refunded'
  | 'chargeback'
  | 'pending';

export type NormalizedWebhookEvent = {
  provider: WebhookProvider;
  status: NormalizedPurchaseStatus;
  transactionId: string;
  email: string;
  name: string;
  sourceProductId: string;
  sourceProductName: string;
  purchasedAt: string;
  rawPayload: unknown;
};
