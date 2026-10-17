'use strict';

const { esc, money, num } = require('../lib/util');
const { SITE, t } = require('../data/site');
const { c } = require('../data/copy');
const { farmFor } = require('../data/catalog');
const SITE_IMAGES = require('../lib/site-images');
const art = require('../lib/art');
const { localePath } = require('../templates/layout');
const { breadcrumbs, breadcrumbLd, statBlock, storeButtons } = require('../templates/components');

function farmPage(locale) {
  const FARM = farmFor(locale);
  const body = `
  <section class="collection-hero">
    <div class="art"><img class="collection-hero__image" src="${SITE_IMAGES.appDetails.farm}" alt="Illustrative sustainable farming concept, not an installed TRIXX farm" fetchpriority="high" decoding="async"></div>
    <div class="collection-hero__scrim"></div>
    <span class="concept-image-label concept-image-label--hero">${locale === 'sw' ? 'Picha ya dhana' : 'Concept image'}</span>
    <div class="wrap collection-hero__inner">
      ${breadcrumbs([{ label: 'Home', href: '/' }, { label: c(locale, 'farm.eyebrow') }], locale)}
      <p class="eyebrow">IoT irrigation · Soil sensing · Plot packages</p>
      <h1>${esc(c(locale, 'farm.title'))}</h1>
      <p class="lede">${esc(c(locale, 'farm.lede'))}</p>
    </div>
  </section>

  <section class="section section--tight">
    <div class="wrap">
      <div class="grid grid--4">
        ${statBlock({ value: '41%', label: c(locale, 'home.farm.waterPeak') })}
        ${statBlock({ value: '12 hrs', label: c(locale, 'home.farm.labour') })}
        ${statBlock({ value: '300+', label: c(locale, 'home.farm.plots') })}
        ${statBlock({ value: '11 mo', label: c(locale, 'home.farm.payback') })}
      </div>
    </div>
  </section>

  <section class="section">
    <div class="wrap">
      <div class="section-head">
        <p class="eyebrow">${esc(c(locale, 'farm.howTitle'))}</p>
        <h2>Five steps from a guess to a measured system</h2>
        <p class="lede">Nothing here needs a phone in your hand. The controller holds the whole schedule locally and keeps running if the network drops.</p>
      </div>
      <div class="grid grid--2">
        ${FARM.howItWorks.map((step) => `<article class="panel panel--paper">
          <span class="mono" style="font-size:1.6rem;color:var(--brass);font-weight:600">${esc(step.step)}</span>
          <h3 style="margin-top:0.5rem">${esc(step.title)}</h3>
          <p class="small muted" style="margin:0">${esc(step.body)}</p>
        </article>`).join('')}
      </div>
    </div>
  </section>

  <section class="section bg-paper2 border-y">
    <div class="wrap">
      <div class="section-head">
        <p class="eyebrow">${esc(c(locale, 'farm.plotsTitle'))}</p>
        <h2>Three plot packages, priced by area and zone count</h2>
        <p class="lede">Prices cover supply, installation and commissioning. A survey and zone plan come first, and the quote is fixed after that.</p>
      </div>
      <div class="grid grid--3">
        ${FARM.plotPackages.map((p) => `<article class="pkg-card${p.popular ? ' pkg-card--featured' : ''}">
          <div class="pkg-card__head">
            <div class="cluster cluster--between">
              <h3 style="margin:0">${esc(p.name)}</h3>
              ${p.popular ? `<span class="badge badge--teal">${esc(c(locale, 'packages.mostChosen'))}</span>` : ''}
            </div>
            <p class="mono tiny muted" style="margin:0.4rem 0 0">${esc(p.size)}</p>
            <div class="pkg-card__price mt-2">${money(p.price)}</div>
            <ul class="spec-list mt-2">
              <li><span>${esc(c(locale, 'farm.zones'))}</span><span>${p.zones}</span></li>
              <li><span>${esc(c(locale, 'farm.sensors'))}</span><span>${p.sensors}</span></li>
              <li><span>${esc(c(locale, 'farm.waterSaving'))}</span><span>${esc(p.waterSaving)}</span></li>
              <li><span>${esc(c(locale, 'farm.labourSaving'))}</span><span>${esc(p.labourSaving)}</span></li>
            </ul>
          </div>
          <div class="pkg-card__body">
            <div class="pkg-card__group">
              <h3>Included</h3>
              <ul>${p.includes.map((i) => `<li>${esc(i)}</li>`).join('')}</ul>
            </div>
          </div>
          <div class="card__body" style="padding-top:0">
            <a class="btn btn--primary btn--block" href="${localePath('/contact?interest=farm', locale)}">Request a survey</a>
          </div>
        </article>`).join('')}
      </div>
    </div>
  </section>

  <section class="section">
    <div class="wrap">
      <div class="section-head">
        <p class="eyebrow">${esc(c(locale, 'farm.savingsTitle'))}</p>
        <h2>Measured results across installed plots</h2>
        <p class="lede">These are averages from controllers we commissioned, not projections. Your soil type and pump capacity will move the numbers.</p>
      </div>
      <div style="overflow-x:auto">
        <table class="data-table">
          <thead>
            <tr>
              <th>Crop</th>
              <th>Water</th>
              <th>Labour</th>
              <th>Payback</th>
            </tr>
          </thead>
          <tbody>
            ${FARM.savings.map((row) => `<tr>
              <td><strong>${esc(row.crop)}</strong></td>
              <td>${esc(row.water)}</td>
              <td>${esc(row.labour)}</td>
              <td class="mono">${esc(row.payback)}</td>
            </tr>`).join('')}
          </tbody>
        </table>
      </div>
    </div>
  </section>

  <section class="section bg-ink">
    <div class="wrap">
      <div class="grid grid--sidebar grid--sidebar--right">
        <div>
          <p class="eyebrow">${esc(c(locale, 'farm.exampleTitle'))}</p>
          <h2>${esc(FARM.example.title)}</h2>
          <p class="lede">A Family Plot installed on an existing one-acre kale operation in Kiambu. The controller and sensors were the only new hardware; the drip lines were already in place.</p>
          <ul class="spec-list mt-4" style="border-top:1px solid rgba(244,237,224,0.2)">
            ${FARM.example.rows.map((r) => `<li style="border-bottom-color:rgba(244,237,224,0.15)"><span style="color:rgba(244,237,224,0.65)">${esc(r.label)}</span><span style="color:var(--paper)">${esc(r.value)}</span></li>`).join('')}
          </ul>
        </div>
        <div class="phone-frame">${art.appScreen('farm', { label: 'TRIXX Farm app water and zone dashboard' })}</div>
      </div>
    </div>
  </section>

  <section class="section">
    <div class="wrap">
      <div class="grid grid--sidebar grid--sidebar--right">
        <div>
          <p class="eyebrow">What we check before quoting</p>
          <h2>A controller cannot fix a pump that is too small.</h2>
          <ul style="list-style:none;padding:0">
            ${[
              'Pressure at the furthest emitter, measured, not assumed',
              'Pump flow rate against the number of zones you plan',
              'Water source: mains, borehole, tank or river, and its reliability',
              'Soil type at three depths, because sandy and clay beds differ',
              'Existing drip lines and their emitter spacing',
              'Power supply at the pump position, and whether solar is worth it',
            ].map((item) => `<li style="display:flex;gap:0.7rem;padding:0.6rem 0;border-bottom:1px solid var(--line)"><span style="color:var(--olive)">✓</span><span>${esc(item)}</span></li>`).join('')}
          </ul>
        </div>
        <aside class="panel panel--paper">
          <h3 style="margin-top:0">Book a farm survey</h3>
          <p class="small muted">We visit, measure and give you a zone plan and a fixed price. No charge for the survey within 60 km of Nairobi.</p>
          <a class="btn btn--primary btn--block mt-3" href="${localePath('/contact?interest=farm', locale)}">${esc(t(locale, 'cta.talkToUs'))}</a>
          <a class="btn btn--outline btn--block mt-2" href="${localePath('/tools/savings-calculator#farm', locale)}">${esc(t(locale, 'cta.calculate'))}</a>
          <hr>
          <h3>Get the app</h3>
          ${storeButtons({ slug: 'farm' })}
        </aside>
      </div>
    </div>
  </section>
`;

  return {
    path: '/farm-solutions',
    locale,
    navKey: 'products',
    title: locale === 'sw'
      ? 'Suluhisho za shamba — umwagiliaji wa IoT na vifurushi vya mashamba | TRIXX'
      : 'Farm solutions — IoT irrigation and plot packages | TRIXX',
    description: locale === 'sw'
      ? 'Umwagiliaji wa IoT wa TRIXX: sensor za unyevu wa udongo, udhibiti unaotegemea hali ya hewa, na vifurushi vya mashamba kuanzia KES 185,000. Akiba hadi 41% ya maji.'
      : 'TRIXX IoT irrigation: soil-moisture sensing, weather-aware control and plot packages from KES 185,000. Up to 41% less water and 12 hours a week of labour saved.',
    jsonLd: [
      breadcrumbLd([{ label: 'Home', href: '/' }, { label: 'Farm solutions', href: '/farm-solutions' }]),
      {
        '@context': 'https://schema.org',
        '@type': 'ItemList',
        name: 'TRIXX farm plot packages',
        itemListElement: FARM.plotPackages.map((p, i) => ({
          '@type': 'ListItem',
          position: i + 1,
          item: {
            '@type': 'Product',
            name: `TRIXX ${p.name}`,
            description: `${p.size} irrigation package with ${p.zones} zones and ${p.sensors} sensors.`,
            offers: { '@type': 'Offer', priceCurrency: 'KES', price: p.price },
          },
        })),
      },
    ],
    body,
  };
}

module.exports = () => [farmPage('en'), farmPage('sw')];
