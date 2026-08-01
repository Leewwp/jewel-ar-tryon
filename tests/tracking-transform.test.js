const assert = require('node:assert/strict');
const test = require('node:test');

const {
  calculateModelScale,
  composeAnchorTransform,
  resolveFacing,
} = require('../miniprogram/tracking/transform');

test('calculates model scale from millimetres and model units', () => {
  assert.equal(calculateModelScale(58, 2), 0.029);
});

test('rejects zero or negative calibration dimensions', () => {
  assert.throws(() => calculateModelScale(0, 2), RangeError);
  assert.throws(() => calculateModelScale(58, -1), RangeError);
});

test('composes anchor position without mutating the source', () => {
  const anchor = { x: 1, y: 2, z: 3 };
  const transform = composeAnchorTransform(anchor, {
    offset: { x: 0.1, y: -0.2, z: 0.3 },
    rotation: { x: 0, y: 1.2, z: 0 },
    scale: 0.029,
  });

  assert.deepEqual(transform.position, { x: 1.1, y: 1.8, z: 3.3 });
  assert.deepEqual(transform.rotation, { x: 0, y: 1.2, z: 0 });
  assert.equal(transform.scale, 0.029);
  assert.deepEqual(anchor, { x: 1, y: 2, z: 3 });
});

test('uses hysteresis to avoid front and back flicker near the boundary', () => {
  assert.equal(resolveFacing(0.4, 'front'), 'back');
  assert.equal(resolveFacing(-0.4, 'back'), 'front');
  assert.equal(resolveFacing(0.02, 'front'), 'front');
  assert.equal(resolveFacing(-0.02, 'back'), 'back');
});
