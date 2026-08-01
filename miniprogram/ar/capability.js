function getVkCapability(wxApi) {
  if (!wxApi || typeof wxApi.createVKSession !== 'function') {
    return {
      available: false,
      reason: '当前环境未提供 wx.createVKSession，请使用支持 VisionKit 的真机微信测试。',
    };
  }

  return {
    available: true,
    reason: '已检测到 VisionKit API；品类追踪参数与 three.js 渲染仍需真机接入。',
  };
}

module.exports = {
  getVkCapability,
};
