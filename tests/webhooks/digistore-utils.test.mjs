import assert from 'node:assert/strict';
import test from 'node:test';

import {
  mapDigistoreEventStatus,
  normalizeDigistorePayload,
  parseDigistoreFormBody,
} from '../../features/webhooks/digistore/utils.ts';

test('maps Digistore payment lifecycle events to internal purchase statuses', () => {
  assert.equal(mapDigistoreEventStatus('payment'), 'approved');
  assert.equal(mapDigistoreEventStatus('on_payment'), 'approved');
  assert.equal(mapDigistoreEventStatus('refund'), 'refunded');
  assert.equal(mapDigistoreEventStatus('on_chargeback'), 'chargeback');
  assert.equal(mapDigistoreEventStatus('payment_denial'), 'cancelled');
  assert.equal(mapDigistoreEventStatus('on_payment_missed'), 'cancelled');
  assert.equal(mapDigistoreEventStatus('unknown_event'), 'pending');
});

test('normalizes a Digistore form payload for the shared webhook processor', () => {
  const payload = parseDigistoreFormBody(
    'email=buyer%40example.com&first_name=Ana&last_name=Silva&transaction_id=123789067&order_id=M96T73SC&product_id=680442&product_name=Divine+Prayer&event=payment&amount_brutto=37.00&currency=USD'
  );

  const normalized = normalizeDigistorePayload(payload);

  assert.deepEqual(normalized, {
    provider: 'digistore',
    status: 'approved',
    transactionId: '123789067',
    email: 'buyer@example.com',
    name: 'Ana Silva',
    sourceProductId: '680442',
    sourceProductName: 'Divine Prayer',
    purchasedAt: normalized.purchasedAt,
    rawPayload: payload,
  });

  assert.match(normalized.purchasedAt, /^\d{4}-\d{2}-\d{2}T/);
});
