// Serves the Docusaurus build and the support form endpoint (api/support.mjs) on Dokploy, with no dependencies.
// The handler keeps the Vercel function signature, so this file adapts node:http to it (res.status().json(), req.body).
import http from 'node:http';
import { createReadStream } from 'node:fs';
import { stat } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import support from './api/support.mjs';

const ROOT = path.join(path.dirname(fileURLToPath(import.meta.url)), 'build');
const PORT = Number(process.env.PORT) || 3000;
const MAX_BODY = 64 * 1024;

const TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.mjs': 'text/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.xml': 'application/xml; charset=utf-8',
  '.txt': 'text/plain; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.webp': 'image/webp',
  '.gif': 'image/gif',
  '.ico': 'image/x-icon',
  '.woff2': 'font/woff2',
  '.woff': 'font/woff',
  '.map': 'application/json; charset=utf-8',
};

// Same header the Vercel config set: the reference page may only call the app and the image bucket.
const API_REFERENCE_CSP = "connect-src 'self' https://app.getreica.com https://storage.googleapis.com";

async function findFile(urlPath) {
  const rel = path.normalize(decodeURIComponent(urlPath)).replace(/^(\.\.(\/|\\|$))+/, '');
  const base = path.join(ROOT, rel);
  if (!base.startsWith(ROOT)) return null;
  // Docusaurus writes /support as support/index.html; Vercel served it without a redirect, so does this.
  for (const candidate of [base, path.join(base, 'index.html'), `${base}.html`]) {
    try {
      const info = await stat(candidate);
      if (info.isFile()) return { file: candidate, size: info.size };
    } catch {}
  }
  return null;
}

function sendFile(req, res, status, { file, size }, headers = {}) {
  const type = TYPES[path.extname(file).toLowerCase()] || 'application/octet-stream';
  // Hashed bundles under /assets never change; HTML must be revalidated so a deploy shows up at once.
  const cache = req.url.startsWith('/assets/') ? 'public, max-age=31536000, immutable' : 'public, max-age=0, must-revalidate';
  res.writeHead(status, { 'Content-Type': type, 'Content-Length': size, 'Cache-Control': cache, ...headers });
  if (req.method === 'HEAD') return res.end();
  createReadStream(file).pipe(res);
}

function readJson(req) {
  return new Promise((resolve) => {
    let size = 0;
    const chunks = [];
    req.on('data', (chunk) => {
      size += chunk.length;
      if (size > MAX_BODY) {
        req.destroy();
        resolve(null);
      } else chunks.push(chunk);
    });
    req.on('end', () => {
      try {
        resolve(JSON.parse(Buffer.concat(chunks).toString('utf8')));
      } catch {
        resolve({});
      }
    });
    req.on('error', () => resolve(null));
  });
}

async function handleSupport(req, res) {
  req.body = req.method === 'POST' ? await readJson(req) : {};
  if (req.body === null) {
    res.writeHead(413, { 'Content-Type': 'application/json' });
    return res.end(JSON.stringify({ error: 'Request too large.' }));
  }
  res.status = (code) => {
    res.statusCode = code;
    return res;
  };
  res.json = (data) => {
    res.setHeader('Content-Type', 'application/json; charset=utf-8');
    res.end(JSON.stringify(data));
    return res;
  };
  await support(req, res);
}

const server = http.createServer(async (req, res) => {
  try {
    const { pathname } = new URL(req.url, 'http://localhost');
    if (pathname === '/api/support' || pathname === '/api/support/') return await handleSupport(req, res);
    if (req.method !== 'GET' && req.method !== 'HEAD') {
      res.writeHead(405, { Allow: 'GET, HEAD' });
      return res.end();
    }
    const found = await findFile(pathname);
    if (found) {
      const extra = /^\/api-reference\/?$/.test(pathname) ? { 'Content-Security-Policy': API_REFERENCE_CSP } : {};
      return sendFile(req, res, 200, found, extra);
    }
    const notFound = await findFile('/404.html');
    if (notFound) return sendFile(req, res, 404, notFound);
    res.writeHead(404);
    res.end();
  } catch (err) {
    console.error('[server]', err);
    if (!res.headersSent) res.writeHead(500);
    res.end();
  }
});

server.listen(PORT, '0.0.0.0', () => console.log(`docs on :${PORT}`));
