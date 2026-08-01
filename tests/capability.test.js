const assert = require('node:assert/strict');
const test = require('node:test');

const { getVkCapability } = require('../miniprogram/ar/capability');

test('reports unavailable outside a VisionKit-capable WeChat environment', () => {
  const result = getVkCapability({});
  assert.equal(result.available, false);
  assert.match(result.reason, /wx\.createVKSession/);
});

test('reports the API surface without claiming tracking is complete', () => {
  const result = getVkCapability({ createVKSession() {} });
  assert.equal(result.available, true);
  assert.match(result.reason, /仍需真机接入/);
});
