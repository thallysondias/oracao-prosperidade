import { NextResponse } from 'next/server';

import { readWebhookBody } from '@/features/webhooks/core/body';
import { processNormalizedWebhook } from '@/features/webhooks/core/processor';
import { normalizeDigistorePayload } from '@/features/webhooks/digistore/utils';

export async function POST(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const body = await readWebhookBody(request);
    const event = normalizeDigistorePayload(body as Parameters<typeof normalizeDigistorePayload>[0]);
    const result = await processNormalizedWebhook({
      event,
      leadProvider: searchParams.get('sender'),
    });

    return NextResponse.json(result.body, { status: result.status });
  } catch (error) {
    console.error('Digistore webhook error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function GET() {
  return NextResponse.json({
    status: 'ok',
    endpoint: 'digistore-webhook',
    timestamp: new Date().toISOString(),
  });
}
