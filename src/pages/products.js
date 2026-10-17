'use strict';

const { esc, money } = require('../lib/util');
const { SITE, t } = require('../data/site');
const { c } = require('../data/copy');
const { appsFor, APP_SLUGS } = require('../data/catalog');
const { LISTINGS } = require('../data/listings');
const art = require('../lib/art');
const { localePath } = require('../templates/layout');
const { breadcrumbs, breadcrumbLd, statBlock, storeButtons, listingCard } = require('../templates/components');

function productsIndex(locale) {
  const APPS = appsFor(locale);
  const body = `
  <section class="section">
    <div class="wrap">
      ${breadcrumbs([{ label: 'Home', href: '/' }, { label: c(locale, 'products.eyebrow') }], locale)}
      <div class="section-head">
        <p class="eyebrow">${esc(c(locale, 'products.eyebrow'))}</p>
        <h1>${esc(c(locale, 'products.title'))}</h1>
        <p class="lede">${esc(c(locale, 'products.lede'))}</p>
      </div>

      <div class="panel panel--paper mb-4">
        <div class="grid grid--4">
          ${statBlock({ value: '5', label: c(locale, 'products.statApps') })}
          ${statBlock({ value: '1', label: c(locale, 'products.statAccount') })}
          ${statBlock({ value: '2,400+', label: c(locale, 'products.statListings') })}
          ${statBlock({ value: '21,000+', label: c(locale, 'products.statGuardians') })}
        </div>
      </div>

      ${APPS.map((app, i) => `
      <section class="section${i % 2 === 1 ? ' section--tight' : ''}" id="${app.slug}">
        <div class="app-showcase${i % 2 === 1 ? ' app-showcase--flip' : ''}">
          <div>
            <p class="eyebrow">${esc(app.name)}</p>
            <h2>${esc(app.tagline)}</h2>
            <p class="lede">${esc(app.description)}</p>
            <h3 class="mt-4">${esc(c(locale, 'products.featuresTitle'))}</h3>
            <ul style="list-style:none;padding:0">
              ${app.features.map((f) => `<li style="display:flex;gap:0.6rem;padding:0.45rem 0;border-bottom:1px solid var(--line)"><span style="color:${app.accent}">✓</span><span>${esc(f)}</span></li>`).join('')}
            </ul>
            <div class="grid grid--3 mt-4">
              ${app.stats.map((s) => statBlock(s)).join('')}
            </div>
            <h3 class="mt-4">${esc(c(locale, 'products.platformsTitle'))}</h3>
            <div class="material-list mb-3">
              ${app.platforms.map((p) => `<span class="tag">${esc(p)}</span>`).join('')}
              <span class="tag">${esc(app.sizes)}</span>
            </div>
            ${storeButtons(app)}
          </div>
          <div class="phone-frame">${art.appScreen(app.slug, { label: `${app.name} app screen` })}</div>
        </div>
      </section>`).join('')}
    </div>
  </section>

  <section class="section bg-ink">
    <div class="wrap">
      <div class="grid grid--sidebar grid--sidebar--right">
        <div>
          <p class="eyebrow">One backend, one login</p>
          <h2>Register here, and you are already in Rent and Market.</h2>
          <p class="lede">The website and all five apps share one identity service, one property database and one payment ledger. A tenant paying through the portal is the same record the landlord sees in the app.</p>
          <div class="cluster mt-3">
            <a class="btn btn--brass" href="${localePath('/register', locale)}">${esc(t(locale, 'cta.register'))}</a>
            <a class="btn btn--outline" style="border-color:rgba(244,237,224,0.35);color:var(--paper)" href="${localePath('/contact', locale)}">${esc(t(locale, 'cta.talkToUs'))}</a>
          </div>
        </div>
        <div class="phone-row">
          <div class="phone-frame">${art.appScreen('rent', { label: 'TRIXX Rent app screen' })}</div>
          <div class="phone-frame">${art.appScreen('market', { label: 'TRIXX Market app screen' })}</div>
        </div>
      </div>
    </div>
  </section>
`;

  return {
    path: '/products',
    locale,
    navKey: 'products',
    title: locale === 'sw'
      ? 'Bidhaa — app tano za TRIXX: Home, Farm, Rent, Market na School'
      : 'Products — the five TRIXX apps: Home, Farm, Rent, Market and School',
    description: locale === 'sw'
      ? 'Chunguza app tano za TRIXX: Home kwa nyumba smart, Farm kwa umwagiliaji, Rent kwa kodi, Market kwa mali na School kwa shule. Pakua kwa Android na iOS.'
      : 'Explore the five TRIXX apps: Home for smart-house control, Farm for irrigation, Rent for tenancies, Market for property and School for schools. Download on Android and iOS.',
    jsonLd: [
      breadcrumbLd([{ label: 'Home', href: '/' }, { label: 'Products', href: '/products' }]),
      {
        '@context': 'https://schema.org',
        '@type': 'ItemList',
        name: 'TRIXX apps',
        itemListElement: APPS.map((a, i) => ({
          '@type': 'ListItem',
          position: i + 1,
          name: a.name,
          url: `${SITE.url}/products/${a.slug}`,
        })),
      },
    ],
    body,
  };
}

function appPage(app, locale) {
  const APPS = appsFor(locale);
  app = APPS.find((a) => a.slug === app.slug) || app;
  const others = APPS.filter((a) => a.slug !== app.slug);
  const relatedListings = LISTINGS.slice(0, 3);

  const body = `
  <section class="section">
    <div class="wrap">
      ${breadcrumbs([{ label: 'Home', href: '/' }, { label: c(locale, 'products.eyebrow'), href: '/products' }, { label: app.name }], locale)}
      <div class="app-showcase">
        <div>
          <p class="eyebrow" style="color:${app.accent}">${esc(app.name)}</p>
          <h1>${esc(app.tagline)}</h1>
          <p class="lede">${esc(app.description)}</p>
          <div class="cluster mt-3">
            <span class="tag">${esc(app.sizes)}</span>
            ${app.platforms.map((p) => `<span class="tag">${esc(p)}</span>`).join('')}
          </div>
          <div class="mt-4">${storeButtons(app)}</div>
        </div>
        <div class="phone-frame">${art.appScreen(app.slug, { label: `${app.name} app screen` })}</div>
      </div>
    </div>
  </section>

  <section class="section bg-paper2 border-y">
    <div class="wrap">
      <div class="grid grid--sidebar grid--sidebar--right">
        <div>
          <p class="eyebrow">${esc(c(locale, 'products.featuresTitle'))}</p>
          <h2>What ${esc(app.name)} does</h2>
          <ul style="list-style:none;padding:0">
            ${app.features.map((f) => `<li style="display:flex;gap:0.7rem;padding:0.65rem 0;border-bottom:1px solid var(--line)"><span style="color:${app.accent};font-weight:600">✓</span><span>${esc(f)}</span></li>`).join('')}
          </ul>
        </div>
        <aside class="stack" style="--stack-gap:1.25rem">
          <div class="panel panel--paper">
            <h3 style="margin-top:0">${esc(app.name)} by the numbers</h3>
            <ul class="spec-list">
              ${app.stats.map((s) => `<li><span>${esc(s.label)}</span><span>${esc(s.value)}</span></li>`).join('')}
            </ul>
          </div>
          <div class="panel panel--ink">
            <h3 style="margin-top:0">Included with your TRIXX account</h3>
            <p class="small" style="color:rgba(244,237,224,0.72)">One login covers the website and all five apps. No separate subscription for core features.</p>
            <a class="btn btn--brass btn--block mt-3" href="${localePath('/register', locale)}">${esc(t(locale, 'cta.register'))}</a>
          </div>
        </aside>
      </div>
    </div>
  </section>

  <section class="section">
    <div class="wrap">
      <div class="section-head">
        <p class="eyebrow">${esc(c(locale, 'products.otherTitle'))}</p>
        <h2>The rest of the range</h2>
      </div>
      <div class="grid grid--4">
        ${others.map((o) => `<article class="card">
          <div class="card__body">
            <span class="badge" style="border-color:${o.accent};color:${o.accent};align-self:flex-start">${esc(o.name)}</span>
            <h3 class="card__title" style="font-size:1rem"><a href="${localePath(`/products/${o.slug}`, locale)}">${esc(o.tagline)}</a></h3>
            <div class="card__foot">
              <span class="tiny muted">${esc(o.sizes)}</span>
              <a class="btn btn--outline btn--sm" href="${localePath(`/products/${o.slug}`, locale)}">${esc(t(locale, 'cta.explore'))}</a>
            </div>
          </div>
        </article>`).join('')}
      </div>
    </div>
  </section>

  <section class="section bg-paper2 border-y">
    <div class="wrap">
      <div class="section-head section-head--split">
        <div>
          <p class="eyebrow">Available now</p>
          <h2>Properties you can act on in ${esc(app.name)}</h2>
        </div>
        <a class="btn btn--outline" href="${localePath('/search', locale)}">${esc(t(locale, 'nav.search'))} →</a>
      </div>
      <div class="grid grid--3">${relatedListings.map((l) => listingCard(l, locale)).join('')}</div>
    </div>
  </section>
`;

  return {
    path: `/products/${app.slug}`,
    locale,
    navKey: 'products',
    title: `${app.name} — ${app.tagline} | TRIXX`,
    description: `${app.description} Download on Android and iOS.`.slice(0, 300),
    jsonLd: [
      breadcrumbLd([
        { label: 'Home', href: '/' },
        { label: 'Products', href: '/products' },
        { label: app.name, href: `/products/${app.slug}` },
      ]),
      {
        '@context': 'https://schema.org',
        '@type': 'SoftwareApplication',
        name: app.name,
        applicationCategory: 'BusinessApplication',
        operatingSystem: 'Android, iOS',
        description: app.description,
        offers: { '@type': 'Offer', price: '0', priceCurrency: 'KES' },
        aggregateRating: {
          '@type': 'AggregateRating',
          ratingValue: '4.8',
          ratingCount: '412',
        },
      },
    ],
    body,
  };
}

module.exports = () => {
  const pages = [productsIndex('en'), productsIndex('sw')];
  for (const app of appsFor('en')) pages.push(appPage(app, 'en'), appPage(app, 'sw'));
  return pages;
};
