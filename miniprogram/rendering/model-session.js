class ModelSession {
  constructor(rendererAdapter) {
    if (!rendererAdapter || typeof rendererAdapter.loadModel !== 'function') {
      throw new TypeError('rendererAdapter.loadModel is required');
    }
    this.rendererAdapter = rendererAdapter;
    this.activeModel = null;
  }

  async mountProduct(product, calibration) {
    if (!product.modelUrl) {
      throw new Error('该演示商品尚未配置模型文件。');
    }

    this.activeModel = await this.rendererAdapter.loadModel(product.modelUrl, calibration);
    return this.activeModel;
  }

  updateAnchor(transform, facing) {
    if (!this.activeModel) {
      return false;
    }
    this.rendererAdapter.updateModel(this.activeModel, transform, facing);
    return true;
  }

  dispose() {
    if (this.activeModel && typeof this.rendererAdapter.disposeModel === 'function') {
      this.rendererAdapter.disposeModel(this.activeModel);
    }
    this.activeModel = null;
  }
}

module.exports = {
  ModelSession,
};
