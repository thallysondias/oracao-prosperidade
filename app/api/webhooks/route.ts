import { NextResponse } from 'next/server';

import { readWebhookBody } from '@/features/webhooks/core/body';
import { processNormalizedWebhook } from '@/features/webhooks/core/processor';
import { normalizeProviderPayload, parseWebhookProvider } from '@/features/webhooks/providers';

export async function POST(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const provider = parseWebhookProvider(searchParams.get('provider') ?? request.headers.get('x-webhook-provider'));

    if (!provider) {
      return NextResponse.json({ error: 'Missing or unsupported webhook provider' }, { status: 400 });
    }

    if (provider !== 'digistore') {
      return NextResponse.json({ error: `Central receiver not implemented for provider: ${provider}` }, { status: 400 });
    }

    const body = await readWebhookBody(request);
    const event = normalizeProviderPayload(provider, body);
    const result = await processNormalizedWebhook({
      event,
      leadProvider: searchParams.get('sender'),
    });

    return NextResponse.json(result.body, { status: result.status });
  } catch (error) {
    console.error('Central webhook error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function GET() {
  return NextResponse.json({
    status: 'ok',
    endpoint: 'central-webhook',
    timestamp: new Date().toISOString(),
  });
}
