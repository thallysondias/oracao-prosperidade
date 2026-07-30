import assert from 'node:assert/strict';
import test from 'node:test';

import { hasOpenContentAccess } from '../../features/auth/open-content-access.ts';

test('authenticated content is open even when the user has no purchases', () => {
  assert.equal(hasOpenContentAccess({ isAuthenticated: true }), true);
  assert.equal(hasOpenContentAccess({ isAuthenticated: false }), false);
});
