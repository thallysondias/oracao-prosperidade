import { normalizeDigistorePayload } from '@/features/webhooks/digistore/utils';

import type { NormalizedWebhookEvent, WebhookProvider } from './core/types';

export function normalizeProviderPayload(provider: WebhookProvider, payload: unknown): NormalizedWebhookEvent {
  if (provider === 'digistore') {
    return normalizeDigistorePayload(payload as Parameters<typeof normalizeDigistorePayload>[0]);
  }

  throw new Error(`Unsupported provider: ${provider}`);
}

export function parseWebhookProvider(value: string | null): WebhookProvider | null {
  if (value === 'hotmart' || value === 'kiwify' || value === 'vendapay' || value === 'digistore') {
    return value;
  }

  return null;
}
