import { access, readFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const requiredFiles = [
  'project.config.json',
  'miniprogram/app.js',
  'miniprogram/app.json',
  'miniprogram/app.wxss',
  'miniprogram/sitemap.json',
  'miniprogram/data/demo-products.json',
  'CONTEXT.md',
  'docs/architecture.md',
];

const errors = [];

for (const relativePath of requiredFiles) {
  try {
    await access(path.join(root, relativePath));
  } catch {
    errors.push(`Missing required file: ${relativePath}`);
  }
}

const projectConfig = JSON.parse(await readFile(path.join(root, 'project.config.json'), 'utf8'));
if (projectConfig.miniprogramRoot !== 'miniprogram/') {
  errors.push('project.config.json must set miniprogramRoot to miniprogram/');
}

const appConfig = JSON.parse(await readFile(path.join(root, 'miniprogram/app.json'), 'utf8'));
for (const page of appConfig.pages || []) {
  for (const extension of ['js', 'json', 'wxml', 'wxss']) {
    const pageFile = path.join(root, 'miniprogram', `${page}.${extension}`);
    try {
      await access(pageFile);
    } catch {
      errors.push(`Missing page file: miniprogram/${page}.${extension}`);
    }
  }
}

const products = JSON.parse(
  await readFile(path.join(root, 'miniprogram/data/demo-products.json'), 'utf8'),
);
const allowedCategories = new Set(['necklace', 'earring', 'bangle', 'bracelet', 'anklet']);
for (const product of products) {
  if (!allowedCategories.has(product.category)) {
    errors.push(`Unsupported demo category: ${product.category}`);
  }
  if (product.modelUrl && !product.modelUrl.startsWith('https://')) {
    errors.push(`Model URL must use HTTPS: ${product.id}`);
  }
}

if (errors.length > 0) {
  errors.forEach((error) => console.error(`- ${error}`));
  process.exitCode = 1;
} else {
  console.log(
    `Project validation passed (${appConfig.pages.length} pages, ${products.length} products).`,
  );
}
