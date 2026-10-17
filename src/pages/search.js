'use strict';

const { esc, money, num, slugify } = require('../lib/util');
const { SITE, t } = require('../data/site');
const { c } = require('../data/copy');
const { stylesFor, packagesFor } = require('../data/catalog');
const { LISTINGS, COUNTIES } = require('../data/listings');
const art = require('../lib/art');
const { localePath } = require('../templates/layout');
const { listingCard, breadcrumbs, breadcrumbLd } = require('../templates/components');

const SORTS = [
  { key: 'new', labelKey: 'search.sortNew' },
  { key: 'price-asc', labelKey: 'search.sortPriceLow' },
  { key: 'price-desc', labelKey: 'search.sortPriceHigh' },
  { key: 'beds', labelKey: 'search.sortBeds' },
];

function counties() {
  return [...new Set(LISTINGS.map((l) => l.county))].sort();
}

function townsFor(county) {
  return [...new Set(LISTINGS.filter((l) => l.county === county).map((l) => l.location))].sort();
}

function priceBounds() {
  const prices = LISTINGS.map((l) => l.price);
  return { min: Math.min(...prices), max: Math.max(...prices) };
}

/* A compact, crawlable set of landing pages: one per county and one per
   style-plus-county pair, so local searches land somewhere real. */
function searchPage(locale, opts = {}) {
  const STYLES = stylesFor(locale);
  const PACKAGES = packagesFor(locale);
  const bounds = priceBounds();
  const countyList = counties();
  const preset = opts.preset || {};
  const titleSuffix = preset.county ? ` in ${preset.county}` : '';
  const styleSuffix = preset.style ? ` — ${STYLES.find((s) => s.slug === preset.style).name}` : '';

  const filtered = LISTINGS.filter((l) => {
    if (preset.county && l.county !== preset.county) return false;
    if (preset.style && l.style !== preset.style) return false;
    if (preset.purpose && l.purpose !== preset.purpose) return false;
    return true;
  });

  const mapListings = filtered.slice(0, 14).map((l) => ({ ...l, priceShort: money(l.price).replace('KES ', '') }));

  const body = `
  <section class="section section--tight">
    <div class="wrap">
      ${breadcrumbs([{ label: 'Home', href: '/' }, { label: c(locale, 'search.title') }], locale)}
      <div class="section-head">
        <p class="eyebrow">${esc(c(locale, 'search.title'))}</p>
        <h1>${esc(c(locale, 'search.title'))}${esc(titleSuffix)}${esc(styleSuffix)}</h1>
        <p class="lede">${esc(c(locale, 'search.lede'))}</p>
      </div>
    </div>
  </section>

  <section class="section section--flush">
    <div class="wrap wrap--wide">
      <form class="searchbar" data-search-form data-live="true" action="${localePath('/search', locale)}" method="get" id="filters">
        <div class="searchbar__fields">
          <div class="field" style="margin:0">
            <label for="f-purpose">${esc(t(locale, 'search.purpose'))}</label>
            <select id="f-purpose" name="purpose" data-filter="purpose">
              <option value="">${esc(t(locale, 'search.any'))}</option>
              <option value="sale"${preset.purpose === 'sale' ? ' selected' : ''}>${esc(t(locale, 'search.forSale'))}</option>
              <option value="rent"${preset.purpose === 'rent' ? ' selected' : ''}>${esc(t(locale, 'search.forRent'))}</option>
            </select>
          </div>
          <div class="field" style="margin:0">
            <label for="f-county">${esc(t(locale, 'search.location'))}</label>
            <select id="f-county" name="county" data-filter="county">
              <option value="">${esc(t(locale, 'search.anyLocation'))}</option>
              ${countyList.map((county) => `<option value="${esc(county)}"${preset.county === county ? ' selected' : ''}>${esc(county)}</option>`).join('')}
            </select>
          </div>
          <div class="field" style="margin:0">
            <label for="f-min">${esc(t(locale, 'search.price'))} — min</label>
            <input id="f-min" type="number" name="min" min="${bounds.min}" max="${bounds.max}" step="500000" value="${esc(preset.min || '')}" placeholder="${num(bounds.min)}" data-filter="min">
          </div>
          <div class="field" style="margin:0">
            <label for="f-max">${esc(t(locale, 'search.price'))} — max</label>
            <input id="f-max" type="number" name="max" min="${bounds.min}" max="${bounds.max}" step="500000" value="${esc(preset.max || '')}" placeholder="${num(bounds.max)}" data-filter="max">
          </div>
          <div class="field" style="margin:0">
            <label for="f-beds">${esc(t(locale, 'search.bedrooms'))}</label>
            <select id="f-beds" name="bedrooms" data-filter="bedrooms">
              <option value="">${esc(t(locale, 'search.any'))}</option>
              ${[3, 4, 5, 6].map((b) => `<option value="${b}">${b}+</option>`).join('')}
            </select>
          </div>
          <div class="field" style="margin:0">
            <label for="f-style">${esc(t(locale, 'search.style'))}</label>
            <select id="f-style" name="style" data-filter="style">
              <option value="">${esc(t(locale, 'search.any'))}</option>
              ${STYLES.map((s) => `<option value="${s.slug}"${preset.style === s.slug ? ' selected' : ''}>${esc(s.name)}</option>`).join('')}
            </select>
          </div>
          <div class="field" style="margin:0">
            <label for="f-tier">${esc(t(locale, 'search.tier'))}</label>
            <select id="f-tier" name="tier" data-filter="tier">
              <option value="">${esc(t(locale, 'search.any'))}</option>
              ${PACKAGES.map((p) => `<option value="${p.slug}">${esc(p.name)}</option>`).join('')}
            </select>
          </div>
        </div>

        <fieldset class="filter-group mt-3">
          <legend>Listing source</legend>
          <div class="pill-row">
            <button class="pill" type="button" data-source-filter="all" aria-pressed="true">All listings</button>
            <button class="pill" type="button" data-source-filter="trixx" aria-pressed="false">${esc(t(locale, 'label.trixxBuilt'))}</button>
            <button class="pill" type="button" data-source-filter="owner" aria-pressed="false">${esc(t(locale, 'label.ownerListed'))}</button>
            <button class="pill" type="button" data-source-filter="verified" aria-pressed="false">${esc(t(locale, 'label.verified'))} only</button>
          </div>
        </fieldset>

        <div class="searchbar__actions">
          <button class="btn btn--primary" type="submit">${esc(t(locale, 'search.submit'))}</button>
          <button class="btn btn--outline" type="reset" data-filter-reset>${esc(t(locale, 'search.reset'))}</button>
          <button class="btn btn--quiet" type="button" data-save-search>${esc(t(locale, 'search.saveSearch'))}</button>
          <span class="tiny muted" data-save-search-msg hidden></span>
        </div>
      </form>
    </div>
  </section>

  <section class="section">
    <div class="wrap wrap--wide">
      <div class="results-bar">
        <div>
          <span class="results-count" data-results-count>${filtered.length} ${esc(t(locale, 'search.results'))}</span>
          <div class="cluster mt-1">
            <label class="visually-hidden" for="sort">${esc(t(locale, 'search.sort'))}</label>
            <select id="sort" data-sort style="max-width:14rem">
              ${SORTS.map((s) => `<option value="${s.key}">${esc(t(locale, s.labelKey))}</option>`).join('')}
            </select>
          </div>
        </div>
        <div class="view-toggle" role="group" aria-label="View">
          <button type="button" data-view="list" aria-pressed="true">${esc(t(locale, 'search.listView'))}</button>
          <button type="button" data-view="map" aria-pressed="false">${esc(t(locale, 'search.mapView'))}</button>
        </div>
      </div>

      <div data-view-panel="map" hidden>
        <div class="map-wrap">
          ${art.mapView(mapListings, { label: 'Map of matching properties' })}
        </div>
        <p class="tiny muted mt-2">Pin colour shows the smart tier: <span style="color:var(--terracotta)">basic</span>, <span style="color:var(--amber)">comfort</span>, <span style="color:var(--teal)">premium</span>. Select a pin to open the listing.</p>
      </div>

      <div class="listings-grid" data-results-grid>
        ${filtered.map((l) => listingCard(l, locale)).join('')}
      </div>

      <p class="panel center mt-4" data-empty-state hidden>${esc(t(locale, 'search.none'))}</p>

      <div class="grid grid--sidebar mt-4">
        <aside class="panel panel--paper">
          <h3 style="margin-top:0">${esc(c(locale, 'search.savedTitle'))}</h3>
          <p class="small muted">${esc(c(locale, 'search.savedNote'))}</p>
          <div class="chip-list mt-3" data-saved-searches>
            <p class="tiny muted" data-saved-empty>No saved searches yet. Apply a filter and press “${esc(t(locale, 'search.saveSearch'))}”.</p>
          </div>
          <hr>
          <h3 style="margin-bottom:0.6rem">${esc(t(locale, 'search.favorites'))}</h3>
          <div class="chip-list" data-favorites>
            <p class="tiny muted" data-favorites-empty>No favorites yet. Use the ♡ button on any listing.</p>
          </div>
        </aside>

        <div class="panel panel--paper">
          <h3 style="margin-top:0">${esc(c(locale, 'search.compareTitle'))}</h3>
          <p class="small muted">${esc(c(locale, 'search.compareNote'))}</p>
          <p class="tiny muted" data-compare-empty>${esc(c(locale, 'search.compareEmpty'))}</p>
          <div class="cluster mt-3">
            <a class="btn btn--primary" href="${localePath('/compare', locale)}">${esc(c(locale, 'search.compareTitle'))}</a>
            <a class="btn btn--outline" href="${localePath('/book-viewing', locale)}">${esc(t(locale, 'cta.book'))}</a>
          </div>
        </div>
      </div>
    </div>
  </section>

  <section class="section bg-paper2 border-y">
    <div class="wrap">
      <div class="section-head">
        <p class="eyebrow">Browse by area</p>
        <h2>Local search pages</h2>
      </div>
      <div class="material-list">
        ${counties().map((county) => `<a class="tag" href="${localePath(`/search/${slugify(county)}`, locale)}">${esc(county)} <span class="muted">(${LISTINGS.filter((l) => l.county === county).length})</span></a>`).join('')}
      </div>
      <div class="section-head mt-4">
        <p class="eyebrow">Browse by style</p>
        <h2>Style landing pages</h2>
      </div>
      <div class="material-list">
        ${STYLES.map((s) => `<a class="tag" href="${localePath(`/house-collections/${s.slug}`, locale)}">${esc(s.name)} <span class="muted">(${LISTINGS.filter((l) => l.style === s.slug).length})</span></a>`).join('')}
      </div>
    </div>
  </section>
`;

  const path = preset.county
    ? `/search/${slugify(preset.county)}`
    : preset.style
      ? `/search/style/${preset.style}`
      : '/search';

  const title = preset.county
    ? (locale === 'sw' ? `Nyumba ${preset.county} — kununua na kukodisha | TRIXX` : `Property for sale and rent in ${preset.county} | TRIXX`)
    : (locale === 'sw' ? 'Tafuta mali — chuja kwa bei, vyumba na mtindo | TRIXX' : 'Search property — filter by price, bedrooms and style | TRIXX');

  return {
    path,
    locale,
    navKey: 'search',
    title,
    description: preset.county
      ? `Browse ${filtered.length} verified homes for sale and rent in ${preset.county}, Kenya. Filter by price, bedrooms, architectural style and smart-home tier.`
      : (locale === 'sw'
        ? 'Tafuta mali kote Kenya kwa mahali, bei, vyumba, mtindo na kiwango cha smart. Matangazo yaliyothibitishwa na ramani.'
        : 'Search verified property across Kenya by location, price, bedrooms, architectural style and smart-home tier. Map view, saved searches and side-by-side comparison.'),
    jsonLd: [
      breadcrumbLd([{ label: 'Home', href: '/' }, { label: 'Search', href: '/search' }]),
      {
        '@context': 'https://schema.org',
        '@type': 'ItemList',
        name: preset.county ? `Property in ${preset.county}` : 'Property search results',
        numberOfItems: filtered.length,
        itemListElement: filtered.slice(0, 20).map((l, i) => ({
          '@type': 'ListItem',
          position: i + 1,
          url: `${SITE.url}/listings/${l.slug}`,
          name: l.title,
        })),
      },
    ],
    body,
  };
}

module.exports = () => {
  const pages = [searchPage('en'), searchPage('sw')];
  // Crawlable local landing pages, one per county in both locales.
  for (const county of counties()) {
    pages.push(searchPage('en', { preset: { county } }), searchPage('sw', { preset: { county } }));
  }
  return pages;
};
