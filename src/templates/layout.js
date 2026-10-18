'use strict';

const { esc, slugify } = require('../lib/util');
const { SITE, LOCALES, t } = require('../data/site');
const art = require('../lib/art');

/* Locale-aware link helper. The English tree lives at the site root and
   Kiswahili under /sw/, so every internal link goes through here. */
function localePath(path, locale) {
  const clean = path === '/' ? '' : path.replace(/\/$/, '');
  return locale === 'en' ? (clean || '/') : `/sw${clean || ''}`;
}

function swapLocale(path, locale) {
  const stripped = path.replace(/^\/sw(?=\/|$)/, '') || '/';
  return localePath(stripped, locale);
}

function brandMark(size = 40) {
  return `<svg class="brand__mark" viewBox="0 0 48 48" aria-hidden="true" width="${size}" height="${size}">
    <path d="M24 2 46 44H2L24 2Z" fill="currentColor"/>
    <path d="m15 25 18 18M33 25 15 43" fill="none" stroke="var(--brand-surface, #F5F3EC)" stroke-width="6" stroke-linecap="square"/>
  </svg>`;
}

const NAV_GROUPS = [
  { key: 'buy', href: '/search?purpose=sale' },
  { key: 'rent', href: '/search?purpose=rent' },
  {
    key: 'homes',
    href: '/house-collections',
    children: [
      { label: 'All collections', href: '/house-collections' },
      { label: 'Swahili Coastal', href: '/house-collections/swahili-coastal' },
      { label: 'Victorian', href: '/house-collections/victorian' },
      { label: 'Art Deco', href: '/house-collections/art-deco' },
      { label: 'Contemporary', href: '/house-collections/contemporary' },
      { label: 'Garden Court', href: '/house-collections/garden-court' },
      { label: 'Courtyard Villa', href: '/house-collections/courtyard-villa' },
    ],
  },
  {
    key: 'tools',
    href: '/tools/configurator',
    children: [
      { label: 'Smart home configurator', href: '/tools/configurator' },
      { label: 'Live demo dashboard', href: '/tools/live-demo' },
      { label: 'Savings calculator', href: '/tools/savings-calculator' },
      { label: 'Virtual tours', href: '/tools/virtual-tours' },
      { label: 'Compare properties', href: '/compare' },
    ],
  },
  {
    key: 'products',
    href: '/products',
    children: [
      { label: 'All apps', href: '/products' },
      { label: 'TRIXX Home', href: '/products/home' },
      { label: 'TRIXX Farm', href: '/products/farm' },
      { label: 'TRIXX Rent', href: '/products/rent' },
      { label: 'TRIXX Market', href: '/products/market' },
      { label: 'TRIXX School', href: '/products/school' },
      { label: 'Smart packages', href: '/smart-packages' },
      { label: 'Farm solutions', href: '/farm-solutions' },
    ],
  },
  {
    key: 'about',
    href: '/about',
    children: [
      { label: 'About TRIXX', href: '/about' },
      { label: 'Our team', href: '/team' },
      { label: 'Portfolio', href: '/portfolio' },
      { label: 'Blog and guides', href: '/blog' },
      { label: 'FAQ', href: '/faq' },
      { label: 'Contact', href: '/contact' },
    ],
  },
];

function navMarkup(currentPath, locale) {
  const here = currentPath.replace(/^\/sw(?=\/|$)/, '') || '/';
  return NAV_GROUPS.map((group) => {
    const href = localePath(group.href, locale);
    const isCurrent = here === group.href || (group.href !== '/' && here.startsWith(group.href));
    const label = t(locale, `nav.${group.key}`);

    if (!group.children) {
      return `<a class="nav__link" href="${href}"${isCurrent ? ' aria-current="page"' : ''}>${esc(label)}</a>`;
    }

    const children = group.children.map((child) => {
      const childCurrent = here === child.href;
      return `<a href="${localePath(child.href, locale)}"${childCurrent ? ' aria-current="page"' : ''}>${esc(child.label)}</a>`;
    }).join('');

    return `<div class="nav__group">
      <a class="nav__link" href="${href}"${isCurrent ? ' aria-current="page"' : ''}>${esc(label)}<span aria-hidden="true"> ▾</span></a>
      <div class="nav__panel">${children}</div>
    </div>`;
  }).join('');
}

function header(currentPath, locale, singleLocale, corporate = false) {
  if (corporate) {
    const links = [
      ['Home', '/'],
      ['Gated Community', '/gated-community'],
      ['House Concepts', '/house-concepts'],
      ['Smart Homes', '/smart-homes'],
      ['Smart Living', '/smart-living'],
      ['Sustainability', '/sustainability'],
      ['Portfolio & Journal', '/projects'],
      ['Partners', '/partners'],
    ];
    const nav = links.map(([label, href]) => `<a class="corp-nav__link" href="${href}"${currentPath === href ? ' aria-current="page"' : ''}>${label}</a>`).join('');
    const drawerNav = links.map(([label, href]) => `<a href="${href}"${currentPath === href ? ' aria-current="page"' : ''}>${label}<span aria-hidden="true">→</span></a>`).join('');
    return `<header class="corp-header">
  <div class="corp-shell corp-header__inner">
    <a class="corp-brand" href="/" aria-label="TRIXX Technologies home"><span class="corp-brand__mark" aria-hidden="true">T</span><span><strong>TRIXX</strong><small>TECHNOLOGIES</small></span></a>
    <nav class="corp-nav" aria-label="Main navigation">${nav}</nav>
    <a class="corp-button corp-button--header" href="/start-project">Discuss your project <span aria-hidden="true">→</span></a>
    <button class="corp-menu-toggle" type="button" data-drawer-open aria-controls="drawer" aria-expanded="false" aria-label="Open navigation">☰</button>
  </div>
</header>
<div class="corp-drawer" id="drawer" data-open="false" role="dialog" aria-modal="true" aria-label="Navigation menu">
  <div class="corp-drawer__head"><a class="corp-brand" href="/" aria-label="TRIXX Technologies home"><span class="corp-brand__mark" aria-hidden="true">T</span><span><strong>TRIXX</strong><small>TECHNOLOGIES</small></span></a><button class="corp-menu-toggle" type="button" data-drawer-close aria-label="Close navigation">×</button></div>
  <nav class="corp-drawer__links" aria-label="Mobile navigation">${drawerNav}<a href="/waitlist">Join the waitlist<span aria-hidden="true">→</span></a><a href="/about">About TRIXX<span aria-hidden="true">→</span></a><a href="/leadership">Leadership<span aria-hidden="true">→</span></a><a href="/contact">Contact<span aria-hidden="true">→</span></a><a class="corp-drawer__cta" href="/start-project">Discuss your project <span aria-hidden="true">→</span></a></nav>
</div>`;
  }
  // On a page with no canonical address the language switcher would point at
  // URLs that never exist, so it is replaced with the locale name.
  const langLinks = singleLocale
    ? `<span class="lang-static">${esc((LOCALES.find((l) => l.code === locale) || {}).label || locale)}</span>`
    : LOCALES.map((l) => {
      const href = swapLocale(currentPath, l.code);
      return `<a href="${href}" hreflang="${l.code}"${l.code === locale ? ' aria-current="true"' : ''}>${l.short}</a>`;
    }).join('');

  const drawerGroups = NAV_GROUPS.map((group) => {
    const links = group.children
      ? group.children.map((c) => `<a href="${localePath(c.href, locale)}"><span>${esc(c.label)}</span><span aria-hidden="true">→</span></a>`).join('')
      : `<a href="${localePath(group.href, locale)}"><span>${esc(t(locale, `nav.${group.key}`))}</span><span aria-hidden="true">→</span></a>`;
    return `<div class="drawer__group"><p class="group-label">${esc(t(locale, `nav.${group.key}`))}</p>${links}</div>`;
  }).join('');

  return `<header class="masthead">
  <div class="masthead__top">
    <div class="wrap">
      <span>${esc(SITE.tagline)}</span>
      <span class="cluster" style="gap:1.1rem">
        <a href="tel:${esc(SITE.phone.replace(/\s/g, ''))}">${esc(SITE.phone)}</a>
        <a href="${localePath('/contact', locale)}">${esc(t(locale, 'nav.contact'))}</a>
      </span>
    </div>
  </div>
  <div class="wrap masthead__bar">
    <a class="brand" href="${localePath('/', locale)}">
      ${brandMark()}
      <span>
        <span class="brand__word"><span>TRI</span><b>XX</b></span>
        <span class="brand__sub">${esc(t(locale, 'brand.sub'))}</span>
      </span>
    </a>
    <nav class="nav" aria-label="Main">
      ${navMarkup(currentPath, locale)}
    </nav>
    <div class="masthead__actions">
      <div class="lang" role="group" aria-label="${esc(t(locale, 'lang.switch'))}">${langLinks}</div>
      <a class="btn btn--quiet btn--sm" href="${localePath('/login', locale)}">${esc(t(locale, 'cta.login'))}</a>
      <a class="btn btn--primary btn--sm" href="${localePath('/book-viewing', locale)}">${esc(t(locale, 'cta.book'))}</a>
      <button class="nav-toggle" type="button" data-drawer-open aria-controls="drawer" aria-expanded="false">
        ${esc(t(locale, 'nav.menu'))}
      </button>
    </div>
  </div>
</header>

<div class="drawer" id="drawer" data-open="false" role="dialog" aria-modal="true" aria-label="${esc(t(locale, 'nav.menu'))}">
  <div class="drawer__head">
    <a class="brand" href="${localePath('/', locale)}">${brandMark(32)}<span class="brand__word"><span>TRI</span><b>XX</b></span></a>
    <button class="nav-toggle" type="button" data-drawer-close>${esc(t(locale, 'nav.close'))}</button>
  </div>
  <div class="drawer__body">
    ${drawerGroups}
    <div class="drawer__group">
      <p class="group-label">${esc(t(locale, 'nav.accounts'))}</p>
      <a href="${localePath('/login', locale)}"><span>${esc(t(locale, 'cta.login'))}</span><span aria-hidden="true">→</span></a>
      <a href="${localePath('/register', locale)}"><span>${esc(t(locale, 'cta.register'))}</span><span aria-hidden="true">→</span></a>
      <a href="${localePath('/owner/dashboard', locale)}"><span>${esc(t(locale, 'nav.owner'))}</span><span aria-hidden="true">→</span></a>
      <a href="${localePath('/tenant', locale)}"><span>${esc(t(locale, 'nav.tenant'))}</span><span aria-hidden="true">→</span></a>
      <a href="${localePath('/book-viewing', locale)}"><span>${esc(t(locale, 'cta.book'))}</span><span aria-hidden="true">→</span></a>
    </div>
    <div class="cluster" style="margin-top:1.5rem">
      <a class="btn btn--primary" href="${localePath('/list-your-property', locale)}">${esc(t(locale, 'cta.list'))}</a>
      <a class="btn btn--outline" href="https://wa.me/${esc(SITE.whatsapp.replace(/\D/g, ''))}">${esc(t(locale, 'cta.whatsapp'))}</a>
    </div>
  </div>
</div>`;
}

function footer(locale, corporate = false) {
  if (corporate) return `<footer class="corp-footer">
  <div class="corp-shell">
    <div class="corp-footer__main">
      <div class="corp-footer__identity"><a class="corp-brand corp-brand--footer" href="/" aria-label="TRIXX Technologies home"><span class="corp-brand__mark" aria-hidden="true">T</span><span><strong>TRIXX</strong><small>TECHNOLOGIES</small></span></a><p>Developing practical digital solutions across industries and everyday life.</p></div>
      <div><p class="corp-footer__label">Divisions</p><ul>${[
        ['Real Estate & Smart Homes', '/divisions/real-estate-smart-homes'],
        ['EdTech', '/divisions/edtech'],
        ['Property Management', '/divisions/property-management'],
        ['AgriTech', '/divisions/agritech'],
        ['Smart Living & IoT', '/divisions/smart-living-iot'],
      ].map(([label, href]) => `<li><a href="${href}">${label}</a></li>`).join('')}</ul></div>
      <div><p class="corp-footer__label">Explore</p><ul><li><a href="/house-concepts">House Concepts</a></li><li><a href="/smart-living">Smart Living</a></li><li><a href="/sustainability">Sustainability</a></li><li><a href="/projects">Portfolio & Journal</a></li><li><a href="/partners">Partners</a></li><li><a href="/divisions">Five Business Divisions</a></li><li><a href="/about">About Us</a></li><li><a href="/leadership">Leadership</a></li></ul></div>
      <div><p class="corp-footer__label">Connect</p><ul><li><a href="/start-project">Discuss a project</a></li><li><a href="/contact">Contact</a></li><li><a href="/divisions">Business divisions</a></li><li><a href="/legal/privacy">Privacy Policy</a></li><li><a href="/legal/terms">Terms of Use</a></li></ul><p class="corp-footer__pending">Contact details pending verification</p></div>
    </div>
    <div class="corp-footer__bottom"><span>© ${new Date().getFullYear()} TRIXX Technologies. All rights reserved.</span><span>Kenya · Building for Africa and beyond</span></div>
  </div>
</footer>`;
  const columns = [
    {
      title: t(locale, 'footer.explore'),
      links: [
        ['footer.link.buy', '/search?purpose=sale'],
        ['footer.link.rent', '/search?purpose=rent'],
        ['footer.link.collections', '/house-collections'],
        ['footer.link.packages', '/smart-packages'],
        ['footer.link.farm', '/farm-solutions'],
        ['footer.link.tours', '/tools/virtual-tours'],
      ],
    },
    {
      title: t(locale, 'nav.products'),
      links: [
        ['TRIXX Home', '/products/home'],
        ['TRIXX Farm', '/products/farm'],
        ['TRIXX Rent', '/products/rent'],
        ['TRIXX Market', '/products/market'],
        ['TRIXX School', '/products/school'],
        ['footer.link.allApps', '/products'],
      ],
    },
    {
      title: t(locale, 'footer.company'),
      links: [
        ['footer.link.about', '/about'],
        ['footer.link.team', '/team'],
        ['footer.link.portfolio', '/portfolio'],
        ['footer.link.blog', '/blog'],
        ['footer.link.careers', '/about#careers'],
        ['footer.link.press', '/portfolio#press'],
      ],
    },
    {
      title: t(locale, 'footer.support'),
      links: [
        ['footer.link.contact', '/contact'],
        ['footer.link.book', '/book-viewing'],
        ['footer.link.list', '/list-your-property'],
        ['footer.link.owner', '/owner/dashboard'],
        ['footer.link.tenant', '/tenant'],
        ['footer.link.faq', '/faq'],
      ],
    },
  ].map((col) => `<div>
    <p class="group-label">${esc(col.title)}</p>
    <ul>${col.links.map(([label, href]) => `<li><a href="${localePath(href, locale)}">${esc(label.startsWith('TRIXX ') ? label : t(locale, label))}</a></li>`).join('')}</ul>
  </div>`).join('');

  const legal = [
    ['footer.legal.privacy', '/legal/privacy'],
    ['footer.legal.terms', '/legal/terms'],
    ['footer.legal.cookies', '/legal/cookies'],
    ['footer.legal.deviceData', '/legal/device-data'],
    ['footer.legal.accessibility', '/legal/accessibility'],
    ['footer.legal.listingRules', '/legal/listing-rules'],
  ].map(([key, href]) => `<a href="${localePath(href, locale)}">${esc(t(locale, key))}</a>`).join('');

  return `<footer class="footer">
  <div class="wrap">
    <div class="footer__grid">
      <div class="footer__brand">
        <a class="brand" href="${localePath('/', locale)}">${brandMark(38)}<span><span class="brand__word"><span>TRI</span><b>XX</b></span><span class="brand__sub">${esc(t(locale, 'brand.sub'))}</span></span></a>
        <p>${esc(SITE.description)}</p>
        <p class="tiny">${esc(SITE.address.line1)}, ${esc(SITE.address.line2)}, ${esc(SITE.address.city)} ${esc(SITE.address.postcode)}, ${esc(SITE.address.country)}</p>
        <p class="tiny"><a href="mailto:${esc(SITE.email)}">${esc(SITE.email)}</a> · <a href="tel:${esc(SITE.phone.replace(/\s/g, ''))}">${esc(SITE.phone)}</a></p>
        <form class="newsletter" data-form="newsletter" novalidate>
          <label class="visually-hidden" for="nl-${locale}">${esc(t(locale, 'footer.emailLabel'))}</label>
          <input id="nl-${locale}" type="email" name="email" placeholder="you@example.com" required>
          <button class="btn btn--brass btn--sm" type="submit">${esc(t(locale, 'footer.subscribe'))}</button>
        </form>
        <p class="tiny" data-form-msg hidden></p>
      </div>
      ${columns}
    </div>
    <div class="footer__bottom">
      <span>© ${new Date().getFullYear()} ${esc(SITE.legalName)}. ${esc(t(locale, 'footer.rights'))}</span>
      <span class="footer__legal">${legal}</span>
    </div>
  </div>
</footer>`;
}

function head(page, locale) {
  const canonicalPath = page.route || page.path;
  const canonical = `${SITE.url}${canonicalPath === '/' ? '/' : canonicalPath + '/'}`;
  // A page with no canonical address (the 404) gets no hreflang pair, since
  // pointing at a URL that never exists would be worse than saying nothing.
  const alternateLocales = page.hreflangLocales || (page.noHreflang ? [] : LOCALES.map((l) => l.code));
  const alternates = alternateLocales.map((code) => {
    const l = LOCALES.find((localeItem) => localeItem.code === code);
    if (!l) return '';
    const alt = swapLocale(page.path, l.code);
    const href = `${SITE.url}${alt === '/' ? '/' : alt + '/'}`;
    return `<link rel="alternate" hreflang="${l.code}" href="${href}">`;
  }).filter(Boolean).join('\n  ');

  const jsonLd = [page.jsonLd].flat().filter(Boolean);

  return `<meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>${esc(page.title)}</title>
  <meta name="description" content="${esc(page.description)}">
  <link rel="canonical" href="${canonical}">
${page.noindex ? '  <meta name="robots" content="noindex, nofollow">\n' : ''}${alternates ? `  ${alternates}\n` : ''}  <meta name="theme-color" content="${page.theme === 'corporate' ? '#101B2D' : '#101A19'}">
  <meta property="og:type" content="${page.ogType || 'website'}">
  <meta property="og:site_name" content="${esc(SITE.name)}">
  <meta property="og:title" content="${esc(page.title)}">
  <meta property="og:description" content="${esc(page.description)}">
  <meta property="og:url" content="${canonical}">
  <meta property="og:locale" content="${locale === 'sw' ? 'sw_KE' : 'en_KE'}">
  <meta name="twitter:card" content="summary_large_image">
  ${page.theme === 'corporate' ? `<meta property="og:image" content="${SITE.url}/assets/img/site-upscaled/Homepage/01_homepage_hero.jpg">
  <meta property="og:image:alt" content="Illustrative TRIXX Technologies concept image, not a completed project">
  <meta name="twitter:image" content="${SITE.url}/assets/img/site-upscaled/Homepage/01_homepage_hero.jpg">` : ''}
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0;1&family=IBM+Plex+Mono:wght@400;500;600&family=Inter:wght@400;500;600;700&family=Manrope:wght@400;500;600;700;800&display=swap">
  <link rel="stylesheet" href="/assets/css/base.css">
  <link rel="stylesheet" href="/assets/css/components.css">
  ${page.theme === 'corporate' ? '<link rel="stylesheet" href="/assets/css/corporate.css">' : ''}
  <link rel="icon" href="/assets/img/favicon.svg" type="image/svg+xml">
${page.extraHead ? `  ${page.extraHead}\n` : ''}${jsonLd.length ? `  ${jsonLd.map((obj) => `<script type="application/ld+json">${JSON.stringify(obj)}</script>`).join('\n  ')}\n` : ''}`;
}

/* Keep the document outline monotonic: a heading may never jump more than one
   level deeper than the one before it. Authoring markup keeps its intended
   relative depth; this only clamps a jump, and CSS controls the visual size, so
   appearance is unaffected. */
function normaliseHeadingLevels(html) {
  let prev = 1;
  return html.replace(/<(\/?)h([1-6])([\s>])/g, (match, close, level, tail) => {
    const n = Number(level);
    if (close) return `<${close}h${n}${tail}`;
    const clamped = Math.min(n, prev + 1);
    prev = clamped;
    return `<h${clamped}${tail}`;
  });
}

/* Renders a full HTML document: head, header, page body, footer, scripts. */
function page(doc) {
  const locale = doc.locale || 'en';
  return `<!doctype html>
<html lang="${locale}" dir="${(LOCALES.find((l) => l.code === locale) || {}).dir || 'ltr'}">
<head>
  ${head(doc, locale)}
</head>
<body data-page="${esc(doc.navKey || '')}" data-locale="${locale}">
  <a class="skip" href="#main">Skip to content</a>
  <div class="scroll-progress" data-progress aria-hidden="true"></div>
  ${header(doc.path, locale, doc.noHreflang, doc.theme === 'corporate')}
  ${doc.adminBar || ''}
  <main id="main">
${normaliseHeadingLevels(doc.body)}
  </main>
  ${footer(locale, doc.theme === 'corporate')}
  ${doc.mobileBar || ''}
  ${doc.compareBar || ''}
  <script src="/assets/js/app.js" defer></script>
  ${doc.extraScript ? `<script src="${doc.extraScript}" defer></script>` : ''}
  ${doc.tourStyle ? `<script src="/assets/data/tour-${doc.tourStyle}-${locale}.js" defer></script>` : ''}
  ${doc.inlineScript ? `<script>${doc.inlineScript}</script>` : ''}
</body>
</html>`;
}

module.exports = { page, header, footer, head, localePath, swapLocale, brandMark, NAV_GROUPS };
