const MILLIMETERS_PER_METER = 1000;

function assertFiniteNumber(value, name) {
  if (!Number.isFinite(value)) {
    throw new TypeError(`${name} must be a finite number`);
  }
}

function calculateModelScale(realSizeMm, modelSizeUnits) {
  assertFiniteNumber(realSizeMm, 'realSizeMm');
  assertFiniteNumber(modelSizeUnits, 'modelSizeUnits');

  if (realSizeMm <= 0 || modelSizeUnits <= 0) {
    throw new RangeError('realSizeMm and modelSizeUnits must be greater than zero');
  }

  return realSizeMm / MILLIMETERS_PER_METER / modelSizeUnits;
}

function composeAnchorTransform(anchor, options = {}) {
  const { offset = { x: 0, y: 0, z: 0 }, rotation = { x: 0, y: 0, z: 0 }, scale = 1 } = options;

  ['x', 'y', 'z'].forEach((axis) => {
    assertFiniteNumber(anchor[axis], `anchor.${axis}`);
    assertFiniteNumber(offset[axis], `offset.${axis}`);
    assertFiniteNumber(rotation[axis], `rotation.${axis}`);
  });
  assertFiniteNumber(scale, 'scale');

  return {
    position: {
      x: anchor.x + offset.x,
      y: anchor.y + offset.y,
      z: anchor.z + offset.z,
    },
    rotation: { ...rotation },
    scale,
  };
}

function resolveFacing(dotProduct, previousFacing = 'front', hysteresis = 0.08) {
  assertFiniteNumber(dotProduct, 'dotProduct');
  assertFiniteNumber(hysteresis, 'hysteresis');

  if (!['front', 'back'].includes(previousFacing)) {
    throw new RangeError('previousFacing must be front or back');
  }
  if (hysteresis < 0 || hysteresis >= 1) {
    throw new RangeError('hysteresis must be between 0 and 1');
  }

  if (dotProduct > hysteresis) {
    return 'back';
  }
  if (dotProduct < -hysteresis) {
    return 'front';
  }
  return previousFacing;
}

module.exports = {
  MILLIMETERS_PER_METER,
  calculateModelScale,
  composeAnchorTransform,
  resolveFacing,
};
