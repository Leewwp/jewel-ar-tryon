const { validateProductDraft } = require('../../domain/product');
const { listCategories } = require('../../tracking/categories');

const categories = listCategories();

Page({
  data: {
    categories,
    categoryIndex: 0,
    draft: {
      category: categories[0].id,
      dimensionsMm: '',
      material: '',
      modelPath: '',
      name: '',
      weightGrams: '',
    },
    feedbackState: 'idle',
    feedbackText: '资料只保存在当前页面，不会上传到云端。',
  },

  onFieldInput(event) {
    const field = event.currentTarget.dataset.field;
    this.setData({ [`draft.${field}`]: event.detail.value });
  },

  onCategoryChange(event) {
    const categoryIndex = Number(event.detail.value);
    this.setData({
      categoryIndex,
      'draft.category': categories[categoryIndex].id,
    });
  },

  chooseModel() {
    wx.chooseMessageFile({
      count: 1,
      extension: ['glb', 'gltf'],
      type: 'file',
      success: ({ tempFiles }) => {
        const selected = tempFiles[0];
        this.setData({
          'draft.modelPath': selected.name,
          feedbackState: 'idle',
          feedbackText: '已选择本地文件；提交云端前仍需大小、内容和权限校验。',
        });
      },
    });
  },

  saveDraft() {
    const result = validateProductDraft(this.data.draft, { requireModel: true });
    if (!result.valid) {
      this.setData({
        feedbackState: 'error',
        feedbackText: Object.values(result.errors)[0],
      });
      return;
    }

    this.setData({
      feedbackState: 'success',
      feedbackText: '本地草稿校验通过；云端保存尚未接入。',
    });
  },
});
