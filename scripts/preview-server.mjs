import { readFile } from 'node:fs/promises';
import http from 'node:http';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const port = Number(process.env.PREVIEW_PORT || 4173);

const allowedFiles = new Map([
  ['/', 'preview/index.html'],
  ['/preview/', 'preview/index.html'],
  ['/preview/index.html', 'preview/index.html'],
  ['/preview/styles.css', 'preview/styles.css'],
  ['/preview/app.js', 'preview/app.js'],
  ['/tokens.css', 'tokens.css'],
  ['/miniprogram/data/demo-products.json', 'miniprogram/data/demo-products.json'],
]);

const contentTypes = {
  '.css': 'text/css; charset=utf-8',
  '.html': 'text/html; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
};

const server = http.createServer(async (request, response) => {
  const requestUrl = new URL(request.url || '/', 'http://127.0.0.1');
  const relativePath = allowedFiles.get(requestUrl.pathname);

  if (!relativePath) {
    response.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' });
    response.end('Not found');
    return;
  }

  try {
    const body = await readFile(path.join(root, relativePath));
    response.writeHead(200, {
      'Cache-Control': 'no-store',
      'Content-Type': contentTypes[path.extname(relativePath)] || 'application/octet-stream',
    });
    response.end(body);
  } catch (error) {
    response.writeHead(500, { 'Content-Type': 'text/plain; charset=utf-8' });
    response.end(`Preview server error: ${error.message}`);
  }
});

server.listen(port, '127.0.0.1', () => {
  console.log(`UI preview: http://127.0.0.1:${port}/preview/`);
});
