'use strict';

/* Post-build verification. Walks every generated HTML file and checks that
   each internal link resolves to a file in dist, that no page is orphaned,
   that structured data parses, and that required accessibility scaffolding
   (one h1, a main landmark, a skip link, alt text on illustrations) is present.
   Exits non-zero on any failure so it can gate a deploy. */

const fs = require('fs');
const path = require('path');

const DIST = path.join(__dirname, 'dist');
const problems = [];
const warnings = [];

function walk(dir) {
  const out = [];
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) out.push(...walk(full));
    else if (entry.name.endsWith('.html')) out.push(full);
  }
  return out;
}

function urlToFile(urlPath) {
  const clean = urlPath.split('#')[0].split('?')[0];
  if (clean === '/' || clean === '') return path.join(DIST, 'index.html');
  const base = path.join(DIST, clean.replace(/^\//, ''));
  if (fs.existsSync(base) && fs.statSync(base).isFile()) return base;
  return path.join(base, 'index.html');
}

function fileToUrl(file) {
  const rel = path.relative(DIST, file).replace(/\\/g, '/');
  if (rel === 'index.html') return '/';
  if (rel.endsWith('/index.html')) return `/${rel.slice(0, -'index.html'.length)}`;
  if (rel.endsWith('404.html')) return `/${rel.slice(0, -'404.html'.length)}404`;
  return `/${rel}`;
}

const files = walk(DIST);
const knownUrls = new Set(files.map(fileToUrl));
const linkedTo = new Set();

let totalLinks = 0;
let totalLd = 0;

for (const file of files) {
  const html = fs.readFileSync(file, 'utf8');
  const url = fileToUrl(file);
  const rel = path.relative(DIST, file);

  // --- internal links ---
  const hrefs = [...html.matchAll(/href="([^"]+)"/g)].map((m) => m[1]);
  for (const href of hrefs) {
    if (/^(https?:|mailto:|tel:|#|data:)/.test(href)) continue;
    if (!href.startsWith('/')) {
      problems.push(`${rel}: relative link "${href}" (all internal links must be root-relative)`);
      continue;
    }
    totalLinks += 1;
    const target = urlToFile(href);
    if (!fs.existsSync(target)) {
      problems.push(`${rel}: broken link "${href}"`);
    } else {
      linkedTo.add(fileToUrl(target));
    }
  }

  // --- assets ---
  const srcs = [...html.matchAll(/src="(\/[^"]+)"/g)].map((m) => m[1]);
  for (const src of srcs) {
    const asset = path.join(DIST, src.replace(/^\//, ''));
    if (!fs.existsSync(asset)) problems.push(`${rel}: missing asset "${src}"`);
  }

  // --- structured data parses ---
  const ldBlocks = [...html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)];
  totalLd += ldBlocks.length;
  for (const block of ldBlocks) {
    try {
      const parsed = JSON.parse(block[1]);
      if (!parsed['@context']) warnings.push(`${rel}: JSON-LD without @context`);
    } catch (err) {
      problems.push(`${rel}: invalid JSON-LD (${err.message})`);
    }
  }

  // --- accessibility scaffolding ---
  const h1Count = (html.match(/<h1[\s>]/g) || []).length;
  if (h1Count !== 1) problems.push(`${rel}: expected exactly one <h1>, found ${h1Count}`);
  if (!html.includes('id="main"')) problems.push(`${rel}: missing <main id="main">`);
  if (!html.includes('class="skip"')) problems.push(`${rel}: missing skip link`);
  if (!/<html lang="(en|sw)"/.test(html)) problems.push(`${rel}: missing or invalid lang attribute`);
  if (!html.includes('name="description"')) problems.push(`${rel}: missing meta description`);
  if (!html.includes('rel="canonical"')) problems.push(`${rel}: missing canonical link`);

  const svgNoLabel = [...html.matchAll(/<svg[^>]*>/g)].filter((m) => !/aria-label=|aria-hidden="true"/.test(m[0]));
  if (svgNoLabel.length) {
    problems.push(`${rel}: ${svgNoLabel.length} inline SVG(s) without aria-label or aria-hidden`);
  }

  // --- headings order sanity ---
  const headings = [...html.matchAll(/<h([1-6])[\s>]/g)].map((m) => Number(m[1]));
  let prev = 1;
  for (const level of headings) {
    if (level > prev + 1) {
      warnings.push(`${rel}: heading jumps from h${prev} to h${level}`);
      break;
    }
    prev = level;
  }

  // --- noindex pages must not be in the sitemap ---
  const isNoindex = html.includes('name="robots" content="noindex"') || html.includes('noindex');
  if (isNoindex) linkedTo.add('__noindex__');
}

// --- orphan detection ---
const noindexSet = new Set();
for (const file of files) {
  const html = fs.readFileSync(file, 'utf8');
  if (html.includes('noindex')) noindexSet.add(fileToUrl(file));
}

for (const url of knownUrls) {
  if (url === '/' || url.endsWith('/404')) continue;
  if (noindexSet.has(url)) continue;
  if (!linkedTo.has(url)) problems.push(`orphan page: ${url} is not linked from anywhere`);
}

// --- sitemap sanity ---
const sitemap = fs.readFileSync(path.join(DIST, 'sitemap.xml'), 'utf8');
const sitemapUrls = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1].replace('https://trixx.co.ke', ''));
if (!sitemapUrls.length) problems.push('sitemap.xml contains no URLs');
for (const url of sitemapUrls) {
  if (!fs.existsSync(urlToFile(url))) problems.push(`sitemap references a missing page: ${url}`);
  if (noindexSet.has(url)) problems.push(`sitemap includes a noindex page: ${url}`);
}
for (const url of knownUrls) {
  if (url === '/' || url.endsWith('/404')) continue;
  if (noindexSet.has(url)) continue;
  if (!sitemapUrls.includes(url)) problems.push(`page missing from sitemap: ${url}`);
}

// --- hreflang pairing ---
for (const file of files) {
  const html = fs.readFileSync(file, 'utf8');
  const rel = path.relative(DIST, file);
  if (rel.endsWith('404.html')) continue; // no canonical address, no alternates
  const en = (html.match(/hreflang="en" href="([^"]+)"/) || [])[1];
  const sw = (html.match(/hreflang="sw" href="([^"]+)"/) || [])[1];
  if (!en) {
    problems.push(`${rel}: missing English hreflang alternate`);
    continue;
  }
  const enFile = urlToFile(en.replace('https://trixx.co.ke', ''));
  if (!fs.existsSync(enFile)) problems.push(`${rel}: hreflang en target missing (${en})`);
  if (sw) {
    const swFile = urlToFile(sw.replace('https://trixx.co.ke', ''));
    if (!fs.existsSync(swFile)) problems.push(`${rel}: hreflang sw target missing (${sw})`);
  }
}

console.log(`Checked ${files.length} pages, ${totalLinks} internal links, ${totalLd} JSON-LD blocks.`);
console.log(`Distinct pages linked: ${linkedTo.size}`);

if (warnings.length) {
  console.log(`\n${warnings.length} warning(s):`);
  for (const w of warnings.slice(0, 25)) console.log(`  ! ${w}`);
}

if (problems.length) {
  console.log(`\n${problems.length} problem(s):`);
  for (const p of problems.slice(0, 60)) console.log(`  x ${p}`);
  process.exit(1);
}

console.log('\nAll checks passed.');
