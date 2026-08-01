const { isSupportedCategory } = require('../tracking/categories');

function hasText(value) {
  return typeof value === 'string' && value.trim().length > 0;
}

function validateProductDraft(draft, options = {}) {
  const { requireModel = false } = options;
  const errors = {};

  if (!hasText(draft.name)) {
    errors.name = '请填写商品名称。';
  }
  if (!isSupportedCategory(draft.category)) {
    errors.category = '请选择首期支持的佩戴品类。';
  }
  if (!hasText(draft.material)) {
    errors.material = '请填写材质或成分。';
  }
  if (!Number.isFinite(Number(draft.weightGrams)) || Number(draft.weightGrams) <= 0) {
    errors.weightGrams = '请填写大于 0 的克重。';
  }
  if (!hasText(draft.dimensionsMm)) {
    errors.dimensionsMm = '请填写包含单位的真实尺寸。';
  }

  if (requireModel && !hasText(draft.modelPath)) {
    errors.modelPath = '请选择 GLB 或 glTF 模型文件。';
  }
  if (
    hasText(draft.modelPath) &&
    !draft.modelPath.toLowerCase().endsWith('.glb') &&
    !draft.modelPath.toLowerCase().endsWith('.gltf')
  ) {
    errors.modelPath = '模型文件必须是 .glb 或 .gltf。';
  }

  return {
    errors,
    valid: Object.keys(errors).length === 0,
  };
}

function listVisibleProducts(products, category = 'all') {
  return products.filter((product) => {
    const visible = product.status !== 'archived';
    return visible && (category === 'all' || product.category === category);
  });
}

function findProductById(products, productId) {
  return products.find((product) => product.id === productId) || null;
}

module.exports = {
  findProductById,
  listVisibleProducts,
  validateProductDraft,
};
