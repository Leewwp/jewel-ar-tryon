const products = require('../../data/demo-products.json');
const { findProductById } = require('../../domain/product');
const { getCategory } = require('../../tracking/categories');

Page({
  data: {
    categoryLabel: '',
    product: null,
  },

  onLoad(options) {
    const product = findProductById(products, options.id);
    if (!product) {
      wx.showToast({ title: '未找到该商品', icon: 'none' });
      return;
    }

    const category = getCategory(product.category);
    this.setData({
      categoryLabel: category ? category.label : '',
      product,
    });
  },

  startTryOn() {
    const { product } = this.data;
    if (!product) {
      return;
    }
    wx.navigateTo({
      url: `/pages/try-on/index?id=${product.id}&category=${product.category}`,
    });
  },
});
