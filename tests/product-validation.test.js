const assert = require('node:assert/strict');
const test = require('node:test');

const products = require('../miniprogram/data/demo-products.json');
const {
  findProductById,
  listVisibleProducts,
  validateProductDraft,
} = require('../miniprogram/domain/product');

test('accepts a complete supported product draft', () => {
  const result = validateProductDraft(
    {
      category: 'bangle',
      dimensionsMm: '内径 58 mm',
      material: '18K 金',
      modelPath: 'bracelet.glb',
      name: '开口手镯',
      weightGrams: '12.4',
    },
    { requireModel: true },
  );

  assert.equal(result.valid, true);
  assert.deepEqual(result.errors, {});
});

test('rejects unsupported categories and invalid model files', () => {
  const result = validateProductDraft(
    {
      category: 'ring',
      dimensionsMm: '',
      material: '',
      modelPath: 'ring.obj',
      name: '',
      weightGrams: 0,
    },
    { requireModel: true },
  );

  assert.equal(result.valid, false);
  assert.equal(result.errors.category, '请选择首期支持的佩戴品类。');
  assert.equal(result.errors.modelPath, '模型文件必须是 .glb 或 .gltf。');
});

test('filters visible products by wearable category', () => {
  const wristProducts = listVisibleProducts(products, 'bracelet');
  assert.equal(wristProducts.length, 1);
  assert.equal(wristProducts[0].id, 'demo-bracelet-01');
});

test('finds products by stable identifier', () => {
  assert.equal(findProductById(products, 'demo-anklet-01').category, 'anklet');
  assert.equal(findProductById(products, 'missing'), null);
});
