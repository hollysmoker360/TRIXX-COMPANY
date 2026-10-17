'use strict';

const { esc } = require('../lib/util');
const { SITE, t } = require('../data/site');
const { stylesFor, packagesFor } = require('../data/catalog');
const art = require('../lib/art');
const { localePath } = require('../templates/layout');
const { breadcrumbs } = require('../templates/components');

function notFoundPage(locale) {
  const STYLES = stylesFor(locale);
  const body = `
  <section class="section">
    <div class="wrap">
      <div class="section-head">
        <p class="eyebrow">Error 404</p>
        <h1>That page is not here.</h1>
        <p class="lede">The address may have changed, or the listing may have been withdrawn. Try one of these instead.</p>
      </div>

      <div class="grid grid--4">
        <a class="panel panel--paper" href="${localePath('/', locale)}" style="color:inherit">
          <h3 style="margin-top:0;font-size:1.1rem">Home</h3>
          <p class="small muted" style="margin:0">Back to the start.</p>
        </a>
        <a class="panel panel--paper" href="${localePath('/search', locale)}" style="color:inherit">
          <h3 style="margin-top:0;font-size:1.1rem">${esc(t(locale, 'nav.search'))}</h3>
          <p class="small muted" style="margin:0">Every verified listing, with filters and a map.</p>
        </a>
        <a class="panel panel--paper" href="${localePath('/house-collections', locale)}" style="color:inherit">
          <h3 style="margin-top:0;font-size:1.1rem">${esc(t(locale, 'nav.homes'))}</h3>
          <p class="small muted" style="margin:0">Six architectural styles with floor plans.</p>
        </a>
        <a class="panel panel--paper" href="${localePath('/contact', locale)}" style="color:inherit">
          <h3 style="margin-top:0;font-size:1.1rem">${esc(t(locale, 'nav.contact'))}</h3>
          <p class="small muted" style="margin:0">Tell us what you were looking for.</p>
        </a>
      </div>
    </div>
  </section>

  <section class="section bg-paper2 border-y">
    <div class="wrap">
      <div class="section-head">
        <p class="eyebrow">Popular destinations</p>
        <h2>Where most people go next</h2>
      </div>
      <div class="grid grid--3">
        ${STYLES.slice(0, 3).map((style) => `<article class="card">
          <div class="card__media">${art.houseRender(style.slug, { label: `${style.name} home`, seed: style.slug })}</div>
          <div class="card__body">
            <h3 class="card__title" style="font-size:1.05rem"><a href="${localePath(`/house-collections/${style.slug}`, locale)}">${esc(style.name)}</a></h3>
            <p class="small muted" style="margin:0">${esc(style.tagline)}</p>
          </div>
        </article>`).join('')}
      </div>
      <div class="cluster mt-4">
        <a class="btn btn--primary" href="${localePath('/tools/configurator', locale)}">${esc(t(locale, 'cta.configure'))}</a>
        <a class="btn btn--outline" href="${localePath('/smart-packages', locale)}">${esc(t(locale, 'cta.seePackages'))}</a>
        <a class="btn btn--quiet" href="${localePath('/faq', locale)}">${esc(t(locale, 'nav.faq'))}</a>
      </div>
    </div>
  </section>
`;

  return {
    path: '/404',
    locale,
    navKey: 'error',
    // Served by the host for unmatched paths; excluded from the sitemap and
    // from hreflang pairing because it has no canonical address.
    noSitemap: true,
    noHreflang: true,
    title: `Page not found | ${SITE.name}`,
    description: 'That page is not here. Search verified property, explore the house collections or contact TRIXX.',
    noindex: true,
    body,
  };
}

module.exports = () => [notFoundPage('en'), notFoundPage('sw')];
