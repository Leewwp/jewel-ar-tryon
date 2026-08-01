const CATEGORY_CONFIG = Object.freeze({
  necklace: Object.freeze({
    id: 'necklace',
    label: '项链',
    tracker: 'face',
    anchor: 'neck',
  }),
  earring: Object.freeze({
    id: 'earring',
    label: '耳环',
    tracker: 'face',
    anchor: 'ear',
  }),
  bangle: Object.freeze({
    id: 'bangle',
    label: '手镯',
    tracker: 'hand',
    anchor: 'wrist',
  }),
  bracelet: Object.freeze({
    id: 'bracelet',
    label: '手链',
    tracker: 'hand',
    anchor: 'wrist',
  }),
  anklet: Object.freeze({
    id: 'anklet',
    label: '脚链',
    tracker: 'body',
    anchor: 'ankle',
  }),
});

function listCategories() {
  return Object.values(CATEGORY_CONFIG);
}

function getCategory(categoryId) {
  return CATEGORY_CONFIG[categoryId] || null;
}

function isSupportedCategory(categoryId) {
  return Boolean(getCategory(categoryId));
}

module.exports = {
  CATEGORY_CONFIG,
  getCategory,
  isSupportedCategory,
  listCategories,
};
