const categoryLabels = {
  all: '全部',
  anklet: '脚链',
  bangle: '手镯',
  bracelet: '手链',
  earring: '耳环',
  necklace: '项链',
};

const state = {
  category: 'all',
  products: [],
  selectedProduct: null,
};

const categoryRail = document.querySelector('.category-rail');
const count = document.querySelector('.catalogue__count');
const dialog = document.querySelector('.product-dialog');
const dialogCategory = dialog.querySelector('.dialog-category');
const dialogDescription = dialog.querySelector('.dialog-description');
const dialogMedia = dialog.querySelector('.dialog-media');
const dialogSpecs = dialog.querySelector('.dialog-specs');
const dialogTitle = dialog.querySelector('#dialog-title');
const grid = document.querySelector('.product-grid');
const status = dialog.querySelector('.tryon-status');
const tryonButton = dialog.querySelector('.tryon-button');

function createTextElement(tag, className, text) {
  const element = document.createElement(tag);
  element.className = className;
  element.textContent = text;
  return element;
}

function getVisibleProducts() {
  if (state.category === 'all') {
    return state.products;
  }
  return state.products.filter((product) => product.category === state.category);
}

function renderCategories() {
  categoryRail.replaceChildren();
  Object.entries(categoryLabels).forEach(([id, label]) => {
    const button = createTextElement('button', 'category-chip', label);
    button.type = 'button';
    button.dataset.category = id;
    button.setAttribute('aria-pressed', String(state.category === id));
    button.addEventListener('click', () => {
      state.category = id;
      renderCategories();
      renderProducts();
    });
    categoryRail.append(button);
  });
}

function openProduct(product) {
  state.selectedProduct = product;
  dialogCategory.textContent = `${categoryLabels[product.category]} · Demo 商品`;
  dialogDescription.textContent = product.description;
  dialogMedia.className = `dialog-media tone-${product.visualTone}`;
  dialogTitle.textContent = product.name;
  dialogSpecs.replaceChildren();

  [
    ['材质', product.material],
    ['克重', `${product.weightGrams} g`],
    ['真实尺寸', product.dimensionsMm],
    ['商家', product.merchantName],
  ].forEach(([term, value]) => {
    const row = document.createElement('div');
    const dt = createTextElement('dt', '', term);
    const dd = createTextElement('dd', '', value);
    row.append(dt, dd);
    dialogSpecs.append(row);
  });

  resetTryonState();
  dialog.showModal();
}

function renderProducts() {
  const products = getVisibleProducts();
  count.textContent = `${products.length} 件`;
  grid.replaceChildren();

  products.forEach((product) => {
    const card = document.createElement('button');
    card.className = 'product-card';
    card.type = 'button';
    card.setAttribute('aria-label', `查看 ${product.name}`);

    const media = createTextElement(
      'span',
      `product-media tone-${product.visualTone}`,
      '图片待商家上传',
    );
    const meta = document.createElement('span');
    meta.className = 'product-meta';
    const metaCopy = document.createElement('span');
    metaCopy.className = 'product-meta__copy';
    metaCopy.append(
      createTextElement('span', 'product-name', product.name),
      createTextElement(
        'span',
        'product-material',
        `${product.material} · ${product.weightGrams} g`,
      ),
    );
    meta.append(metaCopy, createTextElement('span', 'product-link', '查看并试戴 →'));
    card.append(media, meta);
    card.addEventListener('click', () => openProduct(product));
    grid.append(card);
  });
}

function resetTryonState() {
  tryonButton.disabled = false;
  tryonButton.dataset.state = 'default';
  tryonButton.textContent = '开始试戴检查';
  status.dataset.state = 'default';
  status.textContent = '浏览器预览只检查交互。真实 AR 需要微信真机环境。';
}

tryonButton.addEventListener('click', () => {
  tryonButton.disabled = true;
  tryonButton.dataset.state = 'loading';
  tryonButton.textContent = '正在检查环境…';
  status.dataset.state = 'default';
  status.textContent = '正在确认预览环境与商品数据。';

  setTimeout(() => {
    tryonButton.disabled = false;
    tryonButton.dataset.state = 'success';
    tryonButton.textContent = '检查完成';
    status.dataset.state = 'success';
    status.textContent = '商品流程可用；浏览器无法访问 wx.createVKSession，请在微信真机中验证 AR。';
  }, 450);
});

dialog.querySelector('.dialog-close').addEventListener('click', () => dialog.close());
dialog.addEventListener('close', resetTryonState);

fetch('/miniprogram/data/demo-products.json')
  .then((response) => {
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`);
    }
    return response.json();
  })
  .then((products) => {
    state.products = products;
    renderCategories();
    renderProducts();
  })
  .catch(() => {
    count.textContent = '加载失败';
    grid.append(createTextElement('p', 'load-error', '演示商品没有加载，请检查本地预览服务器。'));
  });
