'use strict';

const { esc, money, num } = require('../lib/util');
const { SITE, t } = require('../data/site');
const { c, ROOM_KEYS } = require('../data/copy');
const { stylesFor, packagesFor } = require('../data/catalog');
const { LISTINGS } = require('../data/listings');
const art = require('../lib/art');
const SITE_IMAGES = require('../lib/site-images');
const { localePath } = require('../templates/layout');
const {
  styleCard, listingCard, breadcrumbs, breadcrumbLd, statBlock, packageCard,
} = require('../templates/components');

function styleCount(slug) {
  return LISTINGS.filter((l) => l.style === slug).length;
}

function collectionsIndex(locale) {
  const STYLES = stylesFor(locale);
  const PACKAGES = packagesFor(locale);
  const body = `
  <section class="section">
    <div class="wrap">
      ${breadcrumbs([{ label: 'Home', href: '/' }, { label: c(locale, 'collections.eyebrow') }], locale)}
      <div class="section-head">
        <p class="eyebrow">${esc(c(locale, 'collections.eyebrow'))}</p>
        <h1>${esc(c(locale, 'collections.title'))}</h1>
        <p class="lede">${esc(c(locale, 'collections.lede'))}</p>
      </div>

      <div class="panel panel--paper mb-3">
        <div class="grid grid--4">
          ${statBlock({ value: String(STYLES.length), label: 'Collections' })}
          ${statBlock({ value: 'KES 16.9M', label: 'Lowest build' })}
          ${statBlock({ value: '30 wks', label: 'Fastest build' })}
          ${statBlock({ value: '3', label: 'Smart tiers each' })}
        </div>
      </div>

      <div class="grid grid--3">
        ${STYLES.map((s) => styleCard(s, locale)).join('')}
      </div>
    </div>
  </section>

  <section class="section section--tight bg-paper2 border-y">
    <div class="wrap">
      <div class="section-head">
        <p class="eyebrow">${locale === 'sw' ? 'Marejeleo ya usanifu' : 'Design references'}</p>
        <h2>${locale === 'sw' ? 'Msukumo kutoka mitindo mbalimbali' : 'Ideas from different traditions'}</h2>
        <p class="lede">${locale === 'sw'
    ? 'Picha hizi ni marejeleo ya dhana pekee; si miradi iliyokamilika wala matangazo ya nyumba.'
    : 'These concepts are architectural references only, not completed projects or property listings.'}</p>
      </div>
      <div class="grid grid--3">
        ${SITE_IMAGES.architectureInspiration.map((item) => `<figure class="inspiration-card">
          <img class="site-photo" src="${item.src}" alt="${esc(item.alt)}" loading="lazy" decoding="async">
          <figcaption><span>${esc(item.title)}</span><small>${locale === 'sw' ? 'Picha ya dhana' : 'Concept image'}</small></figcaption>
        </figure>`).join('')}
      </div>
    </div>
  </section>

  <section class="section bg-paper2 border-y">
    <div class="wrap">
      <div class="section-head">
        <p class="eyebrow">${esc(c(locale, 'packages.eyebrow'))}</p>
        <h2>${esc(c(locale, 'packages.title'))}</h2>
        <p class="lede">${esc(c(locale, 'packages.lede'))}</p>
      </div>
      <div class="grid grid--3">
        ${PACKAGES.map((p) => packageCard(p, locale)).join('')}
      </div>
    </div>
  </section>

  <section class="section">
    <div class="wrap">
      <div class="section-head section-head--split">
        <div>
          <p class="eyebrow">${esc(c(locale, 'home.search.eyebrow'))}</p>
          <h2>${esc(c(locale, 'home.search.title'))}</h2>
        </div>
        <a class="btn btn--primary" href="${localePath('/search', locale)}">${esc(t(locale, 'search.submit'))}</a>
      </div>
      <div class="grid grid--3">
        ${LISTINGS.filter((l) => l.featured).slice(0, 3).map((l) => listingCard(l, locale)).join('')}
      </div>
    </div>
  </section>
`;

  return {
    path: '/house-collections',
    locale,
    navKey: 'homes',
    title: locale === 'sw'
      ? `Mikusanyiko ya nyumba — ${STYLES.length} mitindo ya usanifu | TRIXX`
      : `House collections — ${STYLES.length} architectural styles | TRIXX`,
    description: locale === 'sw'
      ? 'Chunguza mikusanyiko sita ya usanifu ya TRIXX: Pwani, Kikoloni, Mapambo, Kisasa, Bustani na Nyumba ya Ua. Ramani za sakafu, kiwango cha bei na vifaa vya smart.'
      : 'Explore the six TRIXX architectural collections: Swahili Coastal, Victorian, Art Deco, Contemporary, Garden Court and Courtyard Villa. Floor plans, price bands and the smart technology included.',
    jsonLd: [
      breadcrumbLd([{ label: 'Home', href: '/' }, { label: 'House collections', href: '/house-collections' }]),
      {
        '@context': 'https://schema.org',
        '@type': 'ItemList',
        name: 'TRIXX house collections',
        itemListElement: STYLES.map((s, i) => ({
          '@type': 'ListItem',
          position: i + 1,
          name: s.name,
          url: `${SITE.url}/house-collections/${s.slug}`,
        })),
      },
    ],
    body,
  };
}

function stylePage(style, locale) {
  const PACKAGES = packagesFor(locale);
  const STYLES = stylesFor(locale);
  style = STYLES.find((s) => s.slug === style.slug) || style;
  const conceptImage = SITE_IMAGES.architecture[style.slug];
  const homes = LISTINGS.filter((l) => l.style === style.slug).slice(0, 3);
  const plans = style.bedrooms.map((b) => ({
    bedrooms: b,
    area: Math.round(186 + (b - 3) * 62 + (style.slug === 'courtyard-villa' ? 90 : 0)),
    width: 12 + b * 1.1,
  }));

  const body = `
  <section class="collection-hero">
    <div class="art">${conceptImage
    ? `<img class="collection-hero__image" src="${conceptImage}" alt="${esc(style.name)} architectural concept image" fetchpriority="high" decoding="async">`
    : art.houseRender(style.slug, { label: `${style.name} render`, seed: style.slug, w: 1600, h: 900 })}</div>
    <div class="collection-hero__scrim"></div>
    ${conceptImage ? `<span class="concept-image-label concept-image-label--hero">${locale === 'sw' ? 'Picha ya dhana' : 'Concept image'}</span>` : ''}
    <div class="wrap collection-hero__inner">
      ${breadcrumbs([{ label: 'Home', href: '/' }, { label: c(locale, 'collections.eyebrow'), href: '/house-collections' }, { label: style.name }], locale)}
      <p class="eyebrow">${esc(style.swahiliName)} · ${esc(style.plotRange)}</p>
      <h1>${esc(style.name)}</h1>
      <p class="lede">${esc(style.intro)}</p>
    </div>
  </section>

  <section class="section section--tight">
    <div class="wrap">
      <div class="grid grid--4">
        ${statBlock({ value: money(style.priceFrom), label: c(locale, 'collections.priceBand') })}
        ${statBlock({ value: `${style.buildWeeks} wks`, label: c(locale, 'collections.buildTime') })}
        ${statBlock({ value: style.plotRange, label: c(locale, 'collections.plotRange') })}
        ${statBlock({ value: `${style.bedrooms.join('/')} bed`, label: 'Plans available' })}
      </div>
    </div>
  </section>

  <section class="section">
    <div class="wrap">
      <div class="grid grid--sidebar grid--sidebar--right">
        <div>
          <p class="eyebrow">${esc(c(locale, 'collections.whyTitle'))}</p>
          <h2>${esc(style.tagline)}</h2>
          <p>${esc(style.story)}</p>

          <div class="grid grid--3 mt-4">
            ${Object.entries(style.hero).map(([k, v]) => `<div class="note note--teal">
              <span class="mono tiny" style="text-transform:uppercase;letter-spacing:0.14em;color:var(--teal)">${esc(k)}</span>
              <p style="margin:0.4rem 0 0;font-size:0.92rem">${esc(v)}</p>
            </div>`).join('')}
          </div>

          <h3 class="mt-4">${esc(c(locale, 'collections.includedTitle'))}</h3>
          <ul class="grid grid--2" style="list-style:none;padding:0;gap:0.4rem 2rem">
            ${style.included.map((i) => `<li style="display:flex;gap:0.6rem;border-bottom:1px solid var(--line);padding:0.5rem 0"><span style="color:var(--teal)">✓</span><span>${esc(i)}</span></li>`).join('')}
          </ul>

          <h3 class="mt-4">${esc(c(locale, 'collections.materialsTitle'))}</h3>
          <div class="material-list">
            ${style.materials.map((m) => `<span class="tag">${esc(m)}</span>`).join('')}
          </div>

          <h3 class="mt-4">${esc(c(locale, 'collections.locationsTitle'))}</h3>
          <div class="material-list">
            ${style.locations.map((l) => `<span class="tag">${esc(l)}</span>`).join('')}
          </div>
        </div>

        <aside class="stack" style="--stack-gap:1.25rem">
          <div class="panel panel--paper">
            <h3 style="margin-top:0">${esc(style.name)} palette</h3>
            <div class="swatch-band">${style.colors.map((col) => `<i style="background:${col}"></i>`).join('')}</div>
            <p class="tiny muted mt-2">Colour and material direction for this collection. Final specification is set at design stage.</p>
          </div>
          <div class="panel panel--paper">
            <h3 style="margin-top:0">${esc(c(locale, 'collections.bestFor'))}</h3>
            <p class="small">${esc(style.bestFor)}</p>
            <hr>
            <div class="cluster">
              <a class="btn btn--primary btn--block" href="${localePath(`/tools/configurator?style=${style.slug}`, locale)}">${esc(t(locale, 'cta.configure'))}</a>
            </div>
            <div class="cluster mt-2">
              <a class="btn btn--outline btn--block" href="${localePath(`/search?style=${style.slug}`, locale)}">See ${styleCount(style.slug)} listings</a>
            </div>
          </div>
          <div class="panel panel--paper">
            <h3 style="margin-top:0">Smart tiers for this build</h3>
            <ul class="spec-list">
              ${PACKAGES.map((p) => `<li><span>${esc(p.name)}</span><span>${money(p.price)}</span></li>`).join('')}
            </ul>
            <a class="btn btn--quiet btn--sm mt-2" href="${localePath('/smart-packages', locale)}">${esc(t(locale, 'cta.seePackages'))} →</a>
          </div>
        </aside>
      </div>
    </div>
  </section>

  <section class="section bg-paper2 border-y">
    <div class="wrap">
      <div class="section-head">
        <p class="eyebrow">${esc(c(locale, 'collections.plansTitle'))}</p>
        <h2>${locale === 'sw' ? 'Ramani za dhana, chumba kwa chumba' : 'Room-by-room concept plans'}</h2>
        <p class="lede">${locale === 'sw'
    ? 'Chunguza mpangilio wa awali wenye samani kwa kila idadi ya vyumba. Eneo na upana ni makadirio; vipimo, muundo na huduma za mwisho lazima zibuniwe kwa eneo lako na mtaalamu aliyehitimu.'
    : 'Explore a furnished early-stage layout for each bedroom count. Area and width are indicative; final room sizes, structure and services require a site-specific design by a qualified professional.'}</p>
      </div>
      <div class="grid grid--3">
        ${plans.map((p, i) => `<figure class="card card--flat" id="floor-plan-${i + 1}" data-floor-plan data-plan-title="${locale === 'sw' ? `Ramani ya dhana ya vyumba ${p.bedrooms}` : `${p.bedrooms}-bedroom concept plan`}" style="margin:0">
          <div class="card__media card__media--plan" style="border:1px solid var(--line);border-radius:var(--radius-lg)">
            ${art.floorPlan(style.slug, { bedrooms: p.bedrooms, width: p.width, area: p.area, seed: `plan-${i}`, label: `${p.bedrooms} bedroom conceptual floor plan` })}
          </div>
          <figcaption class="card__body" style="padding-inline:0">
            <h3 style="margin:0;font-size:1.1rem">${p.bedrooms}-bedroom concept</h3>
            <div class="card__meta"><span>${num(p.area)} m² indicative area</span><span>${p.width.toFixed(1)} m indicative width</span></div>
            <a class="btn btn--outline btn--sm mt-2" href="#floor-plan-${i + 1}" data-plan-open aria-haspopup="dialog">${locale === 'sw' ? 'Tazama ramani kubwa' : 'View larger plan'}</a>
          </figcaption>
        </figure>`).join('')}
      </div>
      <dialog class="plan-dialog" data-plan-dialog aria-labelledby="plan-dialog-title">
        <div class="plan-dialog__header">
          <h2 id="plan-dialog-title" data-plan-dialog-title>${locale === 'sw' ? 'Ramani ya dhana ya nyumba' : 'Concept floor plan'}</h2>
          <button class="btn btn--outline btn--sm" type="button" data-plan-dialog-close aria-label="${locale === 'sw' ? 'Funga ramani' : 'Close floor plan'}">${locale === 'sw' ? 'Funga' : 'Close'} ×</button>
        </div>
        <p class="plan-dialog__hint">${locale === 'sw' ? 'Telezesha ramani pembeni ili kuona maelezo yote.' : 'On smaller screens, swipe horizontally to inspect the drawing.'}</p>
        <div class="plan-dialog__drawing" data-plan-dialog-drawing></div>
      </dialog>
    </div>
  </section>

  <section class="section">
    <div class="wrap">
      <div class="section-head">
        <p class="eyebrow">360 walkthrough</p>
        <h2>Walk the ${esc(style.name)} before you build it.</h2>
        <p class="lede">Drag the panorama to look around the living volume, or open the full tour viewer for every room.</p>
      </div>
      <div class="viewer" data-tour-viewer data-style="${style.slug}" data-angle="0" data-tour-rooms="${esc(JSON.stringify(ROOM_KEYS.map((k) => c(locale, k))))}">
        <div class="viewer__stage">
          <div class="art" data-tour-stage>${art.tourPanorama(style.slug, { angle: 0, locale, label: `${style.name} 360 tour` })}</div>
          <span class="viewer__label" data-tour-label>Living room</span>
          <span class="viewer__hint">Drag to look around</span>
        </div>
        <div class="tour-pad">
          <button type="button" data-tour-turn="-45">⟲ 45°</button>
          <button type="button" data-tour-turn="45">⟳ 45°</button>
          ${[0, 1, 2, 4].map((i) => `<button type="button" data-tour-room="${esc(c(locale, ROOM_KEYS[i]))}" data-room-index="${i}">${esc(c(locale, ROOM_KEYS[i]))}</button>`).join('')}
        </div>
      </div>
      <div class="cluster mt-3">
        <a class="btn btn--primary" href="${localePath('/book-viewing', locale)}">${esc(t(locale, 'cta.book'))}</a>
        <a class="btn btn--outline" href="${localePath('/tools/virtual-tours', locale)}">${esc(t(locale, 'nav.tours'))}</a>
      </div>
    </div>
  </section>

  <section class="section bg-paper2 border-y">
    <div class="wrap">
      <div class="section-head section-head--split">
        <div>
          <p class="eyebrow">Available now</p>
          <h2>${esc(style.name)} homes on the market</h2>
        </div>
        <a class="btn btn--outline" href="${localePath(`/search?style=${style.slug}`, locale)}">${esc(t(locale, 'cta.viewAll'))} →</a>
      </div>
      <div class="grid grid--3">
        ${homes.map((l) => listingCard(l, locale)).join('')}
      </div>
    </div>
  </section>

  <section class="section">
    <div class="wrap">
      <div class="section-head">
        <p class="eyebrow">Other collections</p>
        <h2>Compare with the rest of the range</h2>
      </div>
      <div class="grid grid--3">
        ${STYLES.filter((s) => s.slug !== style.slug).slice(0, 3).map((s) => styleCard(s, locale)).join('')}
      </div>
    </div>
  </section>
`;

  return {
    path: `/house-collections/${style.slug}`,
    locale,
    navKey: 'homes',
    title: locale === 'sw'
      ? `${style.name} (${style.swahiliName}) — nyumba za TRIXX kuanzia ${money(style.priceFrom)}`
      : `${style.name} homes — from ${money(style.priceFrom)} | TRIXX`,
    description: `${style.tagline} ${style.intro}`.slice(0, 300),
    tourStyle: style.slug,
    jsonLd: [
      breadcrumbLd([
        { label: 'Home', href: '/' },
        { label: 'House collections', href: '/house-collections' },
        { label: style.name, href: `/house-collections/${style.slug}` },
      ]),
      {
        '@context': 'https://schema.org',
        '@type': 'Product',
        name: `TRIXX ${style.name} home`,
        description: style.intro,
        brand: { '@type': 'Brand', name: 'TRIXX' },
        category: 'Residential building',
        offers: {
          '@type': 'AggregateOffer',
          priceCurrency: 'KES',
          lowPrice: style.priceFrom,
          highPrice: style.priceTo,
          availability: 'https://schema.org/InStock',
        },
      },
    ],
    body,
  };
}

module.exports = () => {
  const pages = [collectionsIndex('en'), collectionsIndex('sw')];
  for (const style of stylesFor('en')) {
    pages.push(stylePage(style, 'en'), stylePage(style, 'sw'));
  }
  return pages;
};
