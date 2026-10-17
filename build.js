'use strict';

/* TRIXX static site builder.
   No runtime dependencies: it renders every page to static HTML with clean
   URLs, copies the CSS/JS, and writes the sitemap and robots file.
   Flags: --serve (dev server on PORT, default 12000), --watch (rebuild on change). */

const fs = require('fs');
const path = require('path');
const http = require('http');

const ROOT = __dirname;
const DIST = path.join(ROOT, 'dist');
const SRC = path.join(ROOT, 'src');

const { SITE, LOCALES } = require('./src/data/site');
const { page: renderPage } = require('./src/templates/layout');
const { favicon, markSvg } = require('./src/lib/brand');
const art = require('./src/lib/art');

const PAGE_MODULES = [
  'home', 'collections', 'packages', 'products', 'farm', 'search', 'listings',
  'tools', 'accounts', 'owner', 'tenant', 'trust', 'legal', 'contact', 'admin', 'system',
];

function ensureDir(dir) {
  fs.mkdirSync(dir, { recursive: true });
}

function rmrf(dir) {
  fs.rmSync(dir, { recursive: true, force: true });
}

function copyDir(from, to) {
  ensureDir(to);
  for (const entry of fs.readdirSync(from, { withFileTypes: true })) {
    const src = path.join(from, entry.name);
    const dest = path.join(to, entry.name);
    if (entry.isDirectory()) copyDir(src, dest);
    else fs.copyFileSync(src, dest);
  }
}

/* Pages declare their canonical (English) route in `path` plus a `locale`.
   The build composes the published URL, so the English tree sits at the root
   and Kiswahili under /sw/. */
function routeFor(p) {
  if (p.locale && p.locale !== 'en') return `/sw${p.path === '/' ? '' : p.path}`;
  return p.path;
}

function loadPages() {
  const pages = [];
  for (const name of PAGE_MODULES) {
    const file = path.join(SRC, 'pages', `${name}.js`);
    if (!fs.existsSync(file)) continue;
    const mod = require(file);
    const produced = typeof mod === 'function' ? mod() : mod.pages;
    if (!produced) continue;
    for (const p of [produced].flat()) {
      if (p && p.path) {
        p.route = routeFor(p);
        pages.push(p);
      }
    }
  }
  return pages;
}

function outputPathFor(pagePath) {
  if (pagePath === '/') return path.join(DIST, 'index.html');
  // The 404 page is served by the host for any unmatched path, so it sits at
  // the root rather than in its own directory.
  if (pagePath === '/404' || pagePath.endsWith('/404')) return path.join(DIST, pagePath.replace(/^\//, '').replace(/404$/, '') + '404.html');
  return path.join(DIST, pagePath.replace(/^\//, ''), 'index.html');
}

function build() {
  const started = Date.now();
  rmrf(DIST);
  ensureDir(DIST);

  const pages = loadPages();
  const seen = new Set();

  for (const p of pages) {
    if (seen.has(p.route)) {
      throw new Error(`Duplicate page route: ${p.route}`);
    }
    seen.add(p.route);
    const out = outputPathFor(p.route);
    ensureDir(path.dirname(out));
    fs.writeFileSync(out, renderPage(p), 'utf8');
  }

  copyDir(path.join(ROOT, 'assets'), path.join(DIST, 'assets'));
  fs.writeFileSync(path.join(DIST, 'assets', 'img', 'favicon.svg'), favicon(), 'utf8');

  writeTourAssets();
  writeSitemap(pages);
  writeRobots();
  writeHeaders();

  const ms = Date.now() - started;
  const htmlCount = pages.length;
  console.log(`TRIXX build: ${htmlCount} pages in ${ms} ms -> dist/`);
  return pages;
}

/* Eight pre-rendered 45° panorama frames per architectural style, written as
   standalone scripts. The tour viewer loads exactly one when a tour opens, so
   pages stay small and the frames stay cacheable. */
function writeTourAssets() {
  const dir = path.join(DIST, 'assets', 'data');
  ensureDir(dir);
  const { STYLES } = require('./src/data/catalog');
  const { LOCALES } = require('./src/data/site');
  const { minifySvg } = require('./src/templates/components');

  /* Room labels are baked into the panorama SVG, so each locale needs its own
     frames. The viewer fetches the set matching the page's data-locale. */
  for (const { code: locale } of LOCALES) {
    for (const style of STYLES) {
      const frames = {};
      for (let angle = 0; angle < 360; angle += 45) {
        frames[angle] = minifySvg(art.tourPanorama(style.slug, { angle, locale, label: `${style.name} 360 tour` }));
      }
      fs.writeFileSync(
        path.join(dir, `tour-${style.slug}-${locale}.js`),
        `window.TRIXX_TOUR_FRAMES=window.TRIXX_TOUR_FRAMES||{};window.TRIXX_TOUR_FRAMES[${JSON.stringify(`${style.slug}-${locale}`)}]=${JSON.stringify(frames)};\n`,
        'utf8',
      );
    }
  }

  // One bundle of style renders for the configurator preview and CMS preview.
  const renders = {};
  for (const style of STYLES) {
    renders[style.slug] = minifySvg(art.houseRender(style.slug, { label: `${style.name} home render`, seed: style.slug }));
  }
  fs.writeFileSync(
    path.join(dir, 'renders.js'),
    `window.TRIXX_RENDERS=${JSON.stringify(renders)};\n`,
    'utf8',
  );
}

function writeSitemap(pages) {
  const today = new Date().toISOString().slice(0, 10);
  const priorityFor = (p) => {
    if (p.route === '/') return '1.0';
    if (['/search', '/smart-packages', '/house-collections'].includes(p.path)) return '0.9';
    if (p.path.startsWith('/listings/') || p.path.startsWith('/house-collections/')) return '0.8';
    if (p.path.startsWith('/legal/')) return '0.3';
    return '0.7';
  };

  const urls = pages
    .filter((p) => !p.noindex && !p.noSitemap)
    .map((p) => {
      const loc = `${SITE.url}${p.route === '/' ? '/' : p.route + '/'}`;
      const alternates = LOCALES.map((l) => {
        const altPath = l.code === 'en' ? p.path : `/sw${p.path === '/' ? '' : p.path}`;
        return `    <xhtml:link rel="alternate" hreflang="${l.code}" href="${SITE.url}${altPath === '/' ? '/' : altPath + '/'}"/>`;
      }).join('\n');
      return `  <url>
    <loc>${loc}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>${p.path.startsWith('/blog/') ? 'monthly' : 'weekly'}</changefreq>
    <priority>${priorityFor(p)}</priority>
${alternates}
  </url>`;
    }).join('\n');

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">
${urls}
</urlset>
`;
  fs.writeFileSync(path.join(DIST, 'sitemap.xml'), xml, 'utf8');
}

function writeRobots() {
  fs.writeFileSync(path.join(DIST, 'robots.txt'), `User-agent: *
Allow: /
Disallow: /admin/
Disallow: /owner/
Disallow: /tenant/
Disallow: /api/

Sitemap: ${SITE.url}/sitemap.xml
`, 'utf8');
}

function writeHeaders() {
  fs.writeFileSync(path.join(DIST, '_headers'), `/*
  X-Content-Type-Options: nosniff
  X-Frame-Options: SAMEORIGIN
  Referrer-Policy: strict-origin-when-cross-origin
  Permissions-Policy: camera=(self), geolocation=(self), microphone=()
  Strict-Transport-Security: max-age=63072000; includeSubDomains; preload

/assets/*
  Cache-Control: public, max-age=31536000, immutable

/*.html
  Cache-Control: public, max-age=600
`, 'utf8');
}

/* ---------- dev server ---------- */

const MIME = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.json': 'application/json; charset=utf-8',
  '.xml': 'application/xml; charset=utf-8',
  '.txt': 'text/plain; charset=utf-8',
  '.woff2': 'font/woff2',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.webp': 'image/webp',
};

function serve(port) {
  const server = http.createServer((req, res) => {
    let urlPath = decodeURIComponent(req.url.split('?')[0]);
    if (urlPath.endsWith('/')) urlPath += 'index.html';
    let file = path.join(DIST, urlPath);

    if (!file.startsWith(DIST)) {
      res.writeHead(403).end('Forbidden');
      return;
    }
    if (!fs.existsSync(file) && fs.existsSync(file + '.html')) file += '.html';
    if (fs.existsSync(file) && fs.statSync(file).isDirectory()) file = path.join(file, 'index.html');
    if (!fs.existsSync(file)) {
      const notFound = path.join(DIST, '404.html');
      if (fs.existsSync(notFound)) {
        res.writeHead(404, { 'Content-Type': MIME['.html'] });
        res.end(fs.readFileSync(notFound));
        return;
      }
      res.writeHead(404).end('Not found');
      return;
    }

    res.writeHead(200, { 'Content-Type': MIME[path.extname(file)] || 'application/octet-stream' });
    fs.createReadStream(file).pipe(res);
  });

  server.listen(port, () => {
    console.log(`TRIXX dev server: http://localhost:${port}`);
  });
}

const args = process.argv.slice(2);
const wantServe = args.includes('--serve');
const wantWatch = args.includes('--watch');

build();

if (wantWatch) {
  let timer = null;
  const rebuild = () => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      try {
        build();
      } catch (err) {
        console.error('Build failed:', err.message);
      }
    }, 120);
  };
  for (const dir of [SRC, path.join(ROOT, 'assets')]) {
    fs.watch(dir, { recursive: true }, rebuild);
  }
  console.log('Watching src/ and assets/ for changes…');
}

if (wantServe || wantWatch) {
  serve(Number(process.env.PORT) || 12000);
}

module.exports = { build };
