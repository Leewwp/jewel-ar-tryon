const products = require('../../data/demo-products.json');
const { listVisibleProducts } = require('../../domain/product');
const { listCategories } = require('../../tracking/categories');

const categoryOptions = [
  { id: 'all', label: '全部' },
  ...listCategories().map(({ id, label }) => ({ id, label })),
];

Page({
  data: {
    categories: categoryOptions,
    selectedCategory: 'all',
    visibleProducts: [],
  },

  onLoad() {
    this.applyFilter('all');
  },

  applyFilter(category) {
    this.setData({
      selectedCategory: category,
      visibleProducts: listVisibleProducts(products, category),
    });
  },

  onCategoryTap(event) {
    this.applyFilter(event.currentTarget.dataset.category);
  },

  openProduct(event) {
    const productId = event.currentTarget.dataset.id;
    wx.navigateTo({ url: `/pages/product-detail/index?id=${productId}` });
  },

  openMerchantUpload() {
    wx.navigateTo({ url: '/pages/merchant-upload/index' });
  },
});
