const { getVkCapability } = require('../../ar/capability');
const { getCategory } = require('../../tracking/categories');

Page({
  data: {
    categoryLabel: '首饰',
    capabilityState: 'idle',
    statusText: '尚未检查设备能力。',
  },

  onLoad(options) {
    const category = getCategory(options.category);
    this.setData({
      categoryLabel: category ? category.label : '首饰',
    });
  },

  checkCapability() {
    this.setData({
      capabilityState: 'loading',
      statusText: '正在检查 VisionKit API…',
    });

    const result = getVkCapability(wx);
    this.setData({
      capabilityState: result.available ? 'success' : 'error',
      statusText: result.reason,
    });
  },
});
