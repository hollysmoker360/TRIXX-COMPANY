'use strict';

const { esc, money } = require('../lib/util');
const { SITE, t } = require('../data/site');
const { c } = require('../data/copy');
const { packagesFor } = require('../data/catalog');
const art = require('../lib/art');
const { localePath } = require('../templates/layout');
const { breadcrumbs, breadcrumbLd, packageCard, statBlock } = require('../templates/components');

/* Rows of the comparison table, derived from the package data so the table can
   never drift from the individual package definitions. */
function comparisonRows(locale) {
  const PACKAGES = packagesFor(locale);
  const featureSets = PACKAGES.map((p) => new Set(p.groups.flatMap((g) => g.items)));
  const titles = [...new Set(PACKAGES.flatMap((p) => p.groups.map((g) => g.title)))];
  const rows = [];

  rows.push({ type: 'group', label: 'At a glance' });
  rows.push({ label: 'Price installed', values: PACKAGES.map((p) => money(p.price)), highlight: true });
  rows.push({ label: 'Devices fitted', values: PACKAGES.map((p) => String(p.devices)) });
  rows.push({ label: 'Installation time', values: PACKAGES.map((p) => `${p.installDays} days`) });
  rows.push({ label: 'Estimated power saving', values: PACKAGES.map((p) => `${p.powerSavingPct}%`), highlight: true });
  rows.push({ label: 'Estimated water saving', values: PACKAGES.map((p) => `${p.waterSavingPct}%`), highlight: true });
  rows.push({ label: 'Estimated monthly saving', values: PACKAGES.map((p) => money(p.monthlySavings)), highlight: true });

  for (const title of titles) {
    rows.push({ type: 'group', label: title });
    const items = [...new Set(PACKAGES.flatMap((p) => (p.groups.find((g) => g.title === title) || { items: [] }).items))];
    for (const item of items) {
      rows.push({
        label: item,
        values: PACKAGES.map((p, i) => {
          const own = (p.groups.find((g) => g.title === title) || { items: [] }).items.includes(item);
          if (own) return '<span style="color:var(--teal)">✓</span>';
          // An item carried forward from a lower tier still counts as included.
          if (featureSets[i].has(item)) return '<span style="color:var(--teal)">✓</span>';
          return '<span class="muted" aria-label="not included">—</span>';
        }),
      });
    }
  }

  return rows;
}

function packagesPage(locale) {
  const PACKAGES = packagesFor(locale);
  const rows = comparisonRows(locale);

  const body = `
  <section class="section">
    <div class="wrap">
      ${breadcrumbs([{ label: 'Home', href: '/' }, { label: c(locale, 'packages.eyebrow') }], locale)}
      <div class="section-head">
        <p class="eyebrow">${esc(c(locale, 'packages.eyebrow'))}</p>
        <h1>${esc(c(locale, 'packages.title'))}</h1>
        <p class="lede">${esc(c(locale, 'packages.lede'))}</p>
      </div>

      <div class="grid grid--3">
        ${PACKAGES.map((p) => packageCard(p, locale)).join('')}
      </div>
    </div>
  </section>

  <section class="section bg-paper2 border-y">
    <div class="wrap wrap--wide">
      <div class="section-head">
        <p class="eyebrow">${esc(c(locale, 'packages.compareTitle'))}</p>
        <h2>Every line item, every tier</h2>
        <p class="lede">A tick means the item is fitted and commissioned in that tier. Tiers are cumulative: Comfort includes everything in Basic, and Premium includes everything in Comfort.</p>
      </div>

      <div style="overflow-x:auto">
        <table class="pkg-table pkg-table--desktop">
          <colgroup>
            <col>
            ${PACKAGES.map((p) => `<col class="${p.popular ? 'highlight' : ''}">`).join('')}
          </colgroup>
          <thead>
            <tr>
              <th class="feature-col">${esc(c(locale, 'packages.whatIncluded'))}</th>
              ${PACKAGES.map((p) => `<th class="${p.popular ? 'highlight' : ''}">
                <span class="pkg-name">${esc(p.name)}</span>
                <span class="pkg-price">${money(p.price)}</span>
                <span class="pkg-sum">${esc(p.summary)}</span>
                ${p.popular ? `<span class="badge badge--teal" style="margin-top:0.5rem">${esc(c(locale, 'packages.mostChosen'))}</span>` : ''}
              </th>`).join('')}
            </tr>
          </thead>
          <tbody>
            ${rows.map((row) => {
              if (row.type === 'group') return `<tr class="grp-row"><td colspan="${PACKAGES.length + 1}">${esc(row.label)}</td></tr>`;
              return `<tr>
                <td class="row-head">${esc(row.label)}</td>
                ${row.values.map((v, i) => `<td class="${PACKAGES[i].popular ? 'highlight' : ''}">${v}</td>`).join('')}
              </tr>`;
            }).join('')}
            <tr class="grp-row"><td colspan="${PACKAGES.length + 1}">${esc(c(locale, 'packages.notIncluded'))}</td></tr>
            <tr>
              <td class="row-head">Not in this tier</td>
              ${PACKAGES.map((p) => `<td class="${p.popular ? 'highlight' : ''}">${p.notIncluded.length ? esc(p.notIncluded.join('; ')) : '<span style="color:var(--teal)">Nothing excluded</span>'}</td>`).join('')}
            </tr>
            <tr>
              <td class="row-head"></td>
              ${PACKAGES.map((p) => `<td class="${p.popular ? 'highlight' : ''}">
                <a class="btn btn--primary btn--sm btn--block" href="${localePath(`/tools/configurator?tier=${p.slug}`, locale)}">${esc(t(locale, 'cta.configure'))}</a>
              </td>`).join('')}
            </tr>
          </tbody>
        </table>
      </div>

      <!-- Small screens get a stacked card per tier instead of a scrolled table. -->
      <div class="pkg-table--mobile">
        <div class="grid">
          ${PACKAGES.map((p) => packageCard(p, locale)).join('')}
        </div>
      </div>
    </div>
  </section>

  <section class="section">
    <div class="wrap">
      <div class="grid grid--sidebar grid--sidebar--right">
        <div>
          <h2>${esc(c(locale, 'packages.retrofitTitle'))}</h2>
          <p>${esc(c(locale, 'packages.retrofitNote'))}</p>
          <div class="grid grid--3 mt-4">
            ${statBlock({ value: '11 days', label: 'Fastest full retrofit' })}
            ${statBlock({ value: '0 walls', label: 'Opened in that retrofit' })}
            ${statBlock({ value: '31%', label: 'Power bill cut' })}
          </div>
        </div>
        <aside class="panel panel--ink">
          <h3 style="margin-top:0">Run the numbers</h3>
          <p class="small" style="color:rgba(244,237,224,0.72)">Enter your own power and water bill and see the monthly saving for each tier, with payback in months.</p>
          <a class="btn btn--brass btn--block mt-3" href="${localePath('/tools/savings-calculator', locale)}">${esc(t(locale, 'cta.calculate'))}</a>
          <a class="btn btn--outline btn--block mt-2" style="border-color:rgba(244,237,224,0.35);color:var(--paper)" href="${localePath('/tools/configurator', locale)}">${esc(t(locale, 'cta.configure'))}</a>
        </aside>
      </div>
    </div>
  </section>

  <section class="section bg-ink">
    <div class="wrap">
      <div class="grid grid--sidebar">
        <div>
          <p class="eyebrow">What the tier actually changes</p>
          <h2>The device schedule is fixed before we pour concrete.</h2>
          <p class="lede">The tier decides conduit, cable routes, inverter position and battery space. Deciding at design stage is what keeps a later upgrade to days instead of weeks.</p>
          <div class="cluster mt-3">
            <a class="btn btn--brass" href="${localePath('/contact', locale)}">${esc(t(locale, 'cta.talkToUs'))}</a>
            <a class="btn btn--outline" style="border-color:rgba(244,237,224,0.35);color:var(--paper)" href="${localePath('/book-viewing', locale)}">${esc(t(locale, 'cta.book'))}</a>
          </div>
        </div>
        <div class="phone-frame">${art.appScreen('home', { label: 'TRIXX Home app energy dashboard' })}</div>
      </div>
    </div>
  </section>
`;

  return {
    path: '/smart-packages',
    locale,
    navKey: 'products',
    title: locale === 'sw'
      ? 'Vifurushi vya smart — Basic, Comfort na Premium | TRIXX'
      : 'Smart packages — Basic, Comfort and Premium compared | TRIXX',
    description: locale === 'sw'
      ? 'Linganisha vifurushi vitatu vya smart vya TRIXX: vifaa, muda wa uwekaji, akiba ya umeme na maji, na kinachojumuishwa kwa kila kiwango.'
      : 'Compare the three TRIXX smart home packages: devices, installation time, power and water savings, and exactly what is included in Basic, Comfort and Premium.',
    jsonLd: [
      breadcrumbLd([{ label: 'Home', href: '/' }, { label: 'Smart packages', href: '/smart-packages' }]),
      ...PACKAGES.map((p) => ({
        '@context': 'https://schema.org',
        '@type': 'Product',
        name: `TRIXX ${p.name} smart home package`,
        description: p.summary,
        brand: { '@type': 'Brand', name: 'TRIXX' },
        offers: {
          '@type': 'Offer',
          priceCurrency: 'KES',
          price: p.price,
          availability: 'https://schema.org/InStock',
        },
      })),
    ],
    body,
  };
}

module.exports = () => [packagesPage('en'), packagesPage('sw')];
