'use strict';

const { esc, money, num } = require('../lib/util');
const { SITE, t } = require('../data/site');
const { c, ROOM_KEYS } = require('../data/copy');
const { stylesFor, packagesFor, farmFor } = require('../data/catalog');
const { LISTINGS } = require('../data/listings');
const art = require('../lib/art');
const { localePath } = require('../templates/layout');
const { breadcrumbs, breadcrumbLd, statBlock, listingCard, badges } = require('../templates/components');

/* Add-ons are priced per unit and only some are compatible with every tier,
   which the client-side configurator enforces. */
const ADDONS = [
  { slug: 'solar-3', name: 'Solar array 3 kWp', price: 420000, note: 'Roof-mounted array with inverter. Included in Comfort and above.', tiers: ['basic'] },
  { slug: 'battery-5', name: 'Battery storage 5 kWh', price: 380000, note: 'Evening and outage cover. Included in Comfort.', tiers: ['basic'] },
  { slug: 'solar-8', name: 'Solar array 8 kWp', price: 980000, note: 'Full-roof array for whole-home backup. Included in Premium.', tiers: ['basic', 'comfort'] },
  { slug: 'battery-15', name: 'Battery storage 15 kWh', price: 890000, note: 'Whole-home autonomy, typically 19 hours. Included in Premium.', tiers: ['basic', 'comfort'] },
  { slug: 'ev-7', name: 'EV charger 7 kW', price: 265000, note: 'Scheduled charging tied to your generation curve.', tiers: ['basic', 'comfort'] },
  { slug: 'farm-plot', name: 'Farm plot system', price: 520000, note: 'Soil sensors, weather station and zoned drip for up to one acre.', tiers: ['basic', 'comfort'] },
  { slug: 'pool', name: 'Pool heating and filtration automation', price: 340000, note: 'Solar thermal with automated dosing and filtration cycles.', tiers: ['basic', 'comfort'] },
  { slug: 'borehole', name: 'Borehole and tank automation', price: 310000, note: 'Level sensing, quality monitoring and pump protection.', tiers: ['basic', 'comfort'] },
  { slug: 'cameras', name: 'Perimeter camera upgrade', price: 185000, note: 'Eight AI person-detection cameras replacing the standard four.', tiers: ['basic', 'comfort'] },
  { slug: 'green-roof', name: 'Planted roof terrace', price: 295000, note: 'Drainage layers, growing medium and drip irrigation.', tiers: ['basic', 'comfort', 'premium'] },
  { slug: 'staff', name: 'Staff quarters fit-out', price: 410000, note: 'Separate entrance, metering and smart lock.', tiers: ['basic', 'comfort', 'premium'] },
  { slug: 'lift', name: 'Home lift', price: 1650000, note: 'Two-stop hydraulic lift, subject to plan revision.', tiers: ['basic', 'comfort', 'premium'] },
];

function configuratorPage(locale) {
  const STYLES = stylesFor(locale);
  const PACKAGES = packagesFor(locale);
  const body = `
  <section class="section section--tight">
    <div class="wrap">
      ${breadcrumbs([{ label: 'Home', href: '/' }, { label: t(locale, 'nav.tools'), href: '/tools/configurator' }, { label: c(locale, 'home.tools.configurator') }], locale)}
      <div class="section-head">
        <p class="eyebrow">${esc(c(locale, 'home.tools.eyebrow'))}</p>
        <h1>${esc(c(locale, 'home.tools.configurator'))}</h1>
        <p class="lede">${esc(c(locale, 'home.tools.configuratorNote'))}</p>
      </div>
    </div>
  </section>

  <section class="section section--flush">
    <div class="wrap wrap--wide">
      <div class="cfg" data-configurator>
        <div class="cfg__stage">
          <div class="cfg__preview" data-cfg-preview>
            ${art.houseRender('swahili-coastal', { label: 'Configured home preview', seed: 'cfg' })}
          </div>
          <div class="cluster cluster--between">
            <div class="cluster">
              <span class="badge" data-cfg-badge-style>Swahili Coastal</span>
              <span class="badge badge--teal" data-cfg-badge-tier>Comfort</span>
              <span class="badge" data-cfg-badge-beds>4 bedrooms</span>
            </div>
            <button class="btn btn--quiet btn--sm" type="button" data-cfg-reset>${esc(t(locale, 'search.reset'))}</button>
          </div>

          <div class="cfg-step">
            <div class="cfg-step__head">
              <span class="cfg-step__num">01</span>
              <h3>${esc(t(locale, 'search.style'))}</h3>
            </div>
            <div class="opt-grid" role="group" aria-label="${esc(t(locale, 'search.style'))}">
              ${STYLES.map((s, i) => `<button class="opt" type="button" data-cfg-style="${s.slug}" data-base="${s.priceFrom}" aria-pressed="${i === 0 ? 'true' : 'false'}">
                <span class="opt__name">${esc(s.name)}</span>
                <span class="opt__meta">${esc(s.plotRange)} · ${s.buildWeeks} wks</span>
                <span class="opt__price">from ${money(s.priceFrom)}</span>
              </button>`).join('')}
            </div>
          </div>

          <div class="cfg-step">
            <div class="cfg-step__head">
              <span class="cfg-step__num">02</span>
              <h3>${esc(t(locale, 'search.tier'))}</h3>
            </div>
            <div class="opt-grid" role="group" aria-label="${esc(t(locale, 'search.tier'))}">
              ${PACKAGES.map((p, i) => `<button class="opt" type="button" data-cfg-tier="${p.slug}" data-price="${p.price}" data-power="${p.powerSavingPct}" data-water="${p.waterSavingPct}" aria-pressed="${p.popular ? 'true' : 'false'}">
                <span class="opt__name">${esc(p.name)}</span>
                <span class="opt__meta">${p.devices} devices · ${p.installDays} day install</span>
                <span class="opt__price">${money(p.price)}</span>
              </button>`).join('')}
            </div>
          </div>

          <div class="cfg-step">
            <div class="cfg-step__head">
              <span class="cfg-step__num">03</span>
              <h3>Bedrooms</h3>
            </div>
            <div class="opt-grid" role="group" aria-label="Bedrooms">
              ${[3, 4, 5, 6].map((b, i) => `<button class="opt" type="button" data-cfg-beds="${b}" data-price="${(b - 3) * 3200000}" aria-pressed="${b === 4 ? 'true' : 'false'}">
                <span class="opt__name">${b} bedrooms</span>
                <span class="opt__meta">${num(186 + (b - 3) * 62)} m² typical</span>
                <span class="opt__price">${b === 3 ? 'Included' : `+ ${money((b - 3) * 3200000)}`}</span>
              </button>`).join('')}
            </div>
          </div>

          <div class="cfg-step">
            <div class="cfg-step__head">
              <span class="cfg-step__num">04</span>
              <h3>Add-ons</h3>
            </div>
            <div class="addon-list">
              ${ADDONS.map((a) => `<label class="addon" data-on="false" data-addon="${a.slug}" data-price="${a.price}" data-tiers="${a.tiers.join(',')}">
                <input type="checkbox" data-addon-input="${a.slug}">
                <span class="addon__body">
                  <span class="addon__top">
                    <span class="addon__name">${esc(a.name)}</span>
                    <span class="addon__price">+ ${money(a.price)}</span>
                  </span>
                  <span class="addon__note">${esc(a.note)}</span>
                </span>
              </label>`).join('')}
            </div>
          </div>

          <div class="note note--teal">
            <strong>How the price works.</strong> The style sets the base build cost, the tier adds the installed smart specification, bedrooms add floor area, and add-ons are priced individually. Land is not included. VAT and statutory approvals are shown separately in the written quote.
          </div>
        </div>

        <aside class="cfg__summary">
          <p class="eyebrow" style="color:var(--brass-light)">Your configuration</p>
          <div class="cfg__price" data-cfg-price>${money(18500000 + 1250000 + 3200000)}</div>
          <p class="tiny" style="color:rgba(244,237,224,0.6);margin-top:0.4rem" data-cfg-summary-line>Swahili Coastal · Comfort · 4 bedrooms</p>

          <div class="cfg__lines" data-cfg-lines>
            <div class="cfg__line"><span>Base build — Swahili Coastal</span><strong>${money(18500000)}</strong></div>
            <div class="cfg__line"><span>Comfort tier</span><strong>${money(1250000)}</strong></div>
            <div class="cfg__line"><span>4 bedrooms</span><strong>${money(3200000)}</strong></div>
          </div>

          <hr style="border-color:rgba(244,237,224,0.2)">

          <div class="cfg__lines">
            <div class="cfg__line"><span>Estimated power saving</span><strong data-cfg-power>26%</strong></div>
            <div class="cfg__line"><span>Estimated water saving</span><strong data-cfg-water>24%</strong></div>
            <div class="cfg__line"><span>Estimated monthly saving</span><strong data-cfg-monthly>${money(11500)}</strong></div>
            <div class="cfg__line"><span>Build programme</span><strong data-cfg-weeks>34 weeks</strong></div>
          </div>

          <hr style="border-color:rgba(244,237,224,0.2)">

          <div class="cfg__lines">
            <div class="cfg__line cfg__line--sub"><span>VAT (16%)</span><strong data-cfg-vat>${money(Math.round((18500000 + 1250000 + 3200000) * 0.16))}</strong></div>
            <div class="cfg__line cfg__line--sub"><span>Approvals and statutory fees</span><strong data-cfg-fees>${money(285000)}</strong></div>
          </div>

          <div class="co__total" style="display:flex;justify-content:space-between;align-items:baseline;gap:1rem;margin-top:1rem;padding-top:1rem;border-top:1px solid rgba(244,237,224,0.3)">
            <span style="font-family:var(--mono);font-size:0.66rem;letter-spacing:0.16em;text-transform:uppercase;color:var(--brass-light)">Total incl. VAT</span>
            <strong style="font-family:var(--display);font-size:1.7rem;color:var(--paper)" data-cfg-total>${money(Math.round((18500000 + 1250000 + 3200000) * 1.16 + 285000))}</strong>
          </div>

          <div class="cluster mt-3">
            <button class="btn btn--outline btn--sm btn--block" type="button" onclick="window.print()" style="border-color:rgba(244,237,224,0.35);color:var(--paper)">Print / Export Summary</button>
          </div>
          <a class="btn btn--brass btn--block mt-3" href="${localePath('/contact?interest=build', locale)}">Request a written quote</a>
          <a class="btn btn--outline btn--block mt-2" style="border-color:rgba(244,237,224,0.35);color:var(--paper)" href="${localePath('/book-viewing', locale)}">${esc(t(locale, 'cta.book'))}</a>
          <p class="tiny mt-3" style="color:rgba(244,237,224,0.5)">Indicative pricing. A written quote follows a site survey and confirms plot conditions, access and approvals.</p>
        </aside>
      </div>
    </div>
  </section>
`;

  return {
    path: '/tools/configurator',
    locale,
    navKey: 'tools',
    title: locale === 'sw'
      ? 'Kisanidi cha nyumba smart — chagua mtindo, kiwango na bei ya papo hapo | TRIXX'
      : 'Smart home configurator — pick a style, tier and see the live price | TRIXX',
    description: locale === 'sw'
      ? 'Sanidi nyumba yako ya TRIXX: chagua kati ya mitindo sita, viwango vitatu vya smart, vyumba na nyongeza, na uone bei ikibadilika papo hapo.'
      : 'Configure your TRIXX home: choose from six architectural styles, three smart tiers, bedroom counts and add-ons, and watch the price, savings and build programme update live.',
    extraScript: '/assets/data/renders.js',
    jsonLd: [
      breadcrumbLd([{ label: 'Home', href: '/' }, { label: 'Configurator', href: '/tools/configurator' }]),
      {
        '@context': 'https://schema.org',
        '@type': 'WebApplication',
        name: 'TRIXX Smart Home Configurator',
        applicationCategory: 'DesignApplication',
        operatingSystem: 'Web',
        offers: { '@type': 'Offer', price: '0', priceCurrency: 'KES' },
      },
    ],
    body,
  };
}

/* ---------- live demo ---------- */

const DEMO_ROOMS = [
  { name: 'Living room', devices: [['Lights', 'switch', true], ['Ceiling fan', 'switch', true], ['Blinds', 'switch', false]] },
  { name: 'Kitchen', devices: [['Lights', 'switch', true], ['Appliance circuit', 'switch', false], ['Leak sensor', 'sensor', true]] },
  { name: 'Primary bedroom', devices: [['Lights', 'dimmer', true], ['Climate zone', 'climate', true], ['Blackout blind', 'switch', false]] },
  { name: 'Front door', devices: [['Door lock', 'lock', true], ['Doorbell camera', 'camera', true], ['Porch light', 'switch', false]] },
  { name: 'Garden', devices: [['Irrigation zone 1', 'switch', false], ['Irrigation zone 2', 'switch', false], ['Soil moisture', 'sensor', true]] },
  { name: 'Plant room', devices: [['Solar inverter', 'sensor', true], ['Battery', 'sensor', true], ['Water tank level', 'sensor', true]] },
];

function liveDemoPage(locale) {
  const initialEnergy = [42, 38, 35, 31, 28, 26, 30, 44, 58, 62, 55, 47];

  const body = `
  <section class="section section--tight">
    <div class="wrap">
      ${breadcrumbs([{ label: 'Home', href: '/' }, { label: t(locale, 'nav.tools'), href: '/tools/live-demo' }, { label: c(locale, 'home.tools.demo') }], locale)}
      <div class="section-head">
        <p class="eyebrow">${esc(c(locale, 'home.tools.eyebrow'))}</p>
        <h1>${esc(c(locale, 'home.tools.demo'))}</h1>
        <p class="lede">${esc(c(locale, 'home.tools.demoNote'))} This is a simulated house running on sample data — nothing here touches a real property.</p>
      </div>
    </div>
  </section>

  <section class="section section--flush">
    <div class="wrap wrap--wide">
      <div class="demo" data-demo>
        <div class="demo__rail">
          <p class="eyebrow eyebrow--plain">Rooms</p>
          ${DEMO_ROOMS.map((room, i) => `<button class="demo__room" type="button" data-demo-room="${i}" aria-pressed="${i === 0 ? 'true' : 'false'}">
            <span>${esc(room.name)}</span>
            <span class="dr__count">${room.devices.length} devices</span>
          </button>`).join('')}
          <div class="panel panel--paper mt-2">
            <h3 style="margin-bottom:0.5rem">Away mode</h3>
            <p class="tiny muted">Arms cameras, locks the door, closes blinds and drops the climate setpoint.</p>
            <button class="switch mt-2" type="button" role="switch" aria-checked="false" data-demo-away aria-label="Away mode"></button>
          </div>
        </div>

        <div class="demo__panel">
          <div class="cluster cluster--between" style="margin-bottom:1.25rem">
            <div>
              <h2 style="color:var(--paper);margin:0;font-size:1.5rem" data-demo-room-name>Living room</h2>
              <p class="mono tiny" style="color:rgba(244,237,224,0.6);margin:0.3rem 0 0">Simulated house · Nairobi · 17 Oct 2026, 14:32</p>
            </div>
            <span class="badge badge--teal">Demo data</span>
          </div>

          <div class="demo__grid">
            <div class="tile tile--wide">
              <div class="tile__top">
                <span class="tile__name">Energy — last 12 months</span>
                <span class="tile__state">Solar + grid</span>
              </div>
              <div class="bars" data-demo-bars>
                ${initialEnergy.map((v, i) => `<i style="height:${v}%" class="${i === 11 ? 'now' : ''}"></i>`).join('')}
              </div>
              <div class="cluster cluster--between">
                <span class="tile__unit">kWh per month</span>
                <span class="tile__unit"><span data-demo-energy>2,140</span> kWh this year</span>
              </div>
            </div>

            <div class="tile">
              <div class="tile__top">
                <span class="tile__name">Solar generation</span>
                <span class="tile__state">Live</span>
              </div>
              <div class="gauge" data-demo-gauge>
                <svg viewBox="0 0 100 100" width="136" height="136" aria-hidden="true">
                  <circle class="gauge__track" cx="50" cy="50" r="42"></circle>
                  <circle class="gauge__fill" cx="50" cy="50" r="42" stroke-dasharray="264" stroke-dashoffset="92" data-demo-gauge-fill></circle>
                </svg>
                <div class="gauge__label">
                  <strong data-demo-solar>4.2</strong>
                  <span>kW now</span>
                </div>
              </div>
              <span class="tile__unit" style="text-align:center;display:block">Battery <span data-demo-battery>78</span>% · grid draw 0.4 kW</span>
            </div>

            <div class="tile">
              <div class="tile__top">
                <span class="tile__name">Water</span>
                <span class="tile__state">Tank</span>
              </div>
              <div class="gauge">
                <svg viewBox="0 0 100 100" width="136" height="136" aria-hidden="true">
                  <circle class="gauge__track" cx="50" cy="50" r="42"></circle>
                  <circle class="gauge__fill" cx="50" cy="50" r="42" stroke-dasharray="264" stroke-dashoffset="58" data-demo-water-gauge style="stroke:var(--brass-light)"></circle>
                </svg>
                <div class="gauge__label">
                  <strong data-demo-water>78</strong>
                  <span>% full</span>
                </div>
              </div>
              <span class="tile__unit" style="text-align:center;display:block">Irrigation next cycle 05:30</span>
            </div>

            <div data-demo-devices style="display:contents"></div>
          </div>

          <div class="demo__log" data-demo-log aria-live="polite">
            <span><b>14:32</b> Away mode disarmed</span>
            <span><b>14:28</b> Irrigation zone 1 completed — 412 litres</span>
            <span><b>13:55</b> Battery reached 78%</span>
          </div>

          <div class="cluster mt-3">
            <a class="btn btn--brass" href="${localePath('/products/home', locale)}">${esc(t(locale, 'nav.products'))}</a>
            <a class="btn btn--outline" style="border-color:rgba(244,237,224,0.35);color:var(--paper)" href="${localePath('/tools/savings-calculator', locale)}">${esc(t(locale, 'cta.calculate'))}</a>
            <a class="btn btn--quiet" style="color:rgba(244,237,224,0.8)" href="${localePath('/book-viewing', locale)}">${esc(t(locale, 'cta.book'))}</a>
          </div>
        </div>
      </div>
    </div>
  </section>

  <section class="section bg-paper2 border-y">
    <div class="wrap">
      <div class="grid grid--sidebar grid--sidebar--right">
        <div>
          <p class="eyebrow">What you are looking at</p>
          <h2>The same controls your household gets on day one.</h2>
          <p>This demo runs the real interface logic on a simulated house. Every device you toggle behaves the way the installed system behaves: the energy chart responds to the load, the solar gauge tracks generation, and the log records what changed.</p>
          <div class="grid grid--3 mt-4">
            ${statBlock({ value: '62', label: 'Devices in a Premium home' })}
            ${statBlock({ value: '< 90 h', label: 'Cooling hours per year' })}
            ${statBlock({ value: '19 h', label: 'Backup autonomy' })}
          </div>
        </div>
        <div class="phone-frame">${art.appScreen('home', { label: 'TRIXX Home app screen' })}</div>
      </div>
    </div>
  </section>
`;

  return {
    path: '/tools/live-demo',
    locale,
    navKey: 'tools',
    title: locale === 'sw'
      ? 'Onyesho la moja kwa moja — jaribu dashibodi ya nyumba smart | TRIXX'
      : 'Live demo — try the smart home dashboard before you buy | TRIXX',
    description: locale === 'sw'
      ? 'Dashibodi ya nyumba smart inayofanya kazi: washa taa, fungua kufuli, angalia grafu za nishati na ufuatilie umwagiliaji kwenye nyumba iliyoiga.'
      : 'A working smart-home dashboard: switch lights, lock doors, watch energy graphs and track irrigation on a simulated TRIXX house. No signup required.',
    jsonLd: [
      breadcrumbLd([{ label: 'Home', href: '/' }, { label: 'Live demo', href: '/tools/live-demo' }]),
      {
        '@context': 'https://schema.org',
        '@type': 'WebApplication',
        name: 'TRIXX Live Demo Dashboard',
        applicationCategory: 'UtilitiesApplication',
        operatingSystem: 'Web',
        offers: { '@type': 'Offer', price: '0', priceCurrency: 'KES' },
      },
    ],
    body,
  };
}

/* ---------- savings calculator ---------- */

function savingsCalculatorPage(locale) {
  const PACKAGES = packagesFor(locale);
  const FARM = farmFor(locale);
  const body = `
  <section class="section section--tight">
    <div class="wrap">
      ${breadcrumbs([{ label: 'Home', href: '/' }, { label: t(locale, 'nav.tools'), href: '/tools/savings-calculator' }, { label: c(locale, 'home.tools.savings') }], locale)}
      <div class="section-head">
        <p class="eyebrow">${esc(c(locale, 'home.tools.eyebrow'))}</p>
        <h1>${esc(c(locale, 'home.tools.savings'))}</h1>
        <p class="lede">${esc(c(locale, 'home.tools.savingsNote'))}</p>
      </div>
    </div>
  </section>

  <section class="section section--flush" id="home">
    <div class="wrap wrap--wide">
      <div class="calc-grid" data-savings>
        <div class="panel panel--paper">
          <h2 style="font-size:1.35rem;margin-top:0">Your household</h2>
          <div class="range-field">
            <div class="rf__top">
              <label for="s-power">Monthly power bill (KES)</label>
              <output data-out-power>9,000</output>
            </div>
            <input id="s-power" type="range" min="1000" max="60000" step="500" value="9000" data-power-bill>
          </div>
          <div class="range-field">
            <div class="rf__top">
              <label for="s-water">Monthly water bill (KES)</label>
              <output data-out-water>3,500</output>
            </div>
            <input id="s-water" type="range" min="500" max="40000" step="250" value="3500" data-water-bill>
          </div>
          <div class="range-field">
            <div class="rf__top">
              <label for="s-borehole">Monthly pump or borehole running cost (KES)</label>
              <output data-out-pump>1,200</output>
            </div>
            <input id="s-borehole" type="range" min="0" max="25000" step="100" value="1200" data-pump-cost>
          </div>

          <h2 style="font-size:1.35rem;margin-top:2rem">Choose a tier</h2>
          <div class="opt-grid" role="group" aria-label="Tier">
            ${PACKAGES.map((p, i) => `<button class="opt" type="button" data-tier="${p.slug}" data-price="${p.price}" data-power="${p.powerSavingPct}" data-water="${p.waterSavingPct}" data-monthly="${p.monthlySavings}" aria-pressed="${p.popular ? 'true' : 'false'}">
              <span class="opt__name">${esc(p.name)}</span>
              <span class="opt__meta">${p.devices} devices · ${p.installDays} day install</span>
              <span class="opt__price">${money(p.price)}</span>
            </button>`).join('')}
          </div>
          <p class="tiny muted mt-3">Saving percentages are measured averages from installed TRIXX homes, not projections. Your roof orientation, tariff and habits will move them.</p>
        </div>

        <div class="calc-output">
          <p class="eyebrow" style="color:var(--brass-light)">Estimated result</p>
          <div class="co__row"><span>Tier selected</span><strong data-s-tier>Comfort</strong></div>
          <div class="co__row"><span>Power saving</span><strong data-s-power>26%</strong></div>
          <div class="co__row"><span>Water saving</span><strong data-s-water>24%</strong></div>
          <div class="co__row"><span>Power saved per month</span><strong data-s-power-money>—</strong></div>
          <div class="co__row"><span>Water and pump saved per month</span><strong data-s-water-money>—</strong></div>
          <div class="co__row"><span>Total saved per month</span><strong data-s-total>—</strong></div>
          <div class="co__row"><span>Total saved per year</span><strong data-s-year>—</strong></div>
          <div class="co__total">
            <span>Payback</span>
            <strong data-s-payback>—</strong>
          </div>
          <p class="tiny mt-3" style="color:rgba(244,237,224,0.6)">Payback is the installation cost divided by the monthly saving. It excludes any increase in property value, which in our experience exceeds the installation cost at resale.</p>
          <a class="btn btn--brass btn--block mt-3" href="${localePath('/tools/configurator', locale)}">${esc(t(locale, 'cta.configure'))}</a>
        </div>
      </div>
    </div>
  </section>

  <section class="section bg-paper2 border-y" id="farm">
    <div class="wrap wrap--wide">
      <div class="section-head">
        <p class="eyebrow">${esc(c(locale, 'farm.plotsTitle'))}</p>
        <h2>Farm plot savings calculator</h2>
        <p class="lede">Enter your irrigation water and labour cost and see what a TRIXX plot package returns.</p>
      </div>

      <div class="calc-grid" data-farm-calc>
        <div class="panel panel--paper">
          <div class="range-field">
            <div class="rf__top">
              <label for="f-area">Plot area (acres)</label>
              <output data-out-area>1</output>
            </div>
            <input id="f-area" type="range" min="0.25" max="10" step="0.25" value="1" data-farm-area>
          </div>
          <div class="range-field">
            <div class="rf__top">
              <label for="f-water-cost">Irrigation water cost per month (KES)</label>
              <output data-out-fwater>24,000</output>
            </div>
            <input id="f-water-cost" type="range" min="1000" max="400000" step="1000" value="24000" data-farm-water>
          </div>
          <div class="range-field">
            <div class="rf__top">
              <label for="f-labour-cost">Irrigation labour cost per month (KES)</label>
              <output data-out-flabour>18,000</output>
            </div>
            <input id="f-labour-cost" type="range" min="0" max="200000" step="1000" value="18000" data-farm-labour>
          </div>
          <h2 style="font-size:1.35rem;margin-top:2rem">Plot package</h2>
          <div class="opt-grid" role="group" aria-label="Plot package">
            ${[['starter-plot', 'Starter Plot', 185000, 28, 45], ['family-plot', 'Family Plot', 520000, 36, 65], ['estate-plot', 'Estate Plot', 1450000, 41, 75]].map(([slug, name, price, water, labour], i) => `<button class="opt" type="button" data-farm-tier="${slug}" data-price="${price}" data-water="${water}" data-labour="${labour}" aria-pressed="${i === 1 ? 'true' : 'false'}">
            <span class="opt__name">${esc(name)}</span>
            <span class="opt__meta">${water}% water · ${labour}% labour</span>
            <span class="opt__price">${money(price)}</span>
          </button>`).join('')}
          </div>
        </div>

        <div class="calc-output">
          <p class="eyebrow" style="color:var(--brass-light)">Estimated result</p>
          <div class="co__row"><span>Package</span><strong data-f-tier>Family Plot</strong></div>
          <div class="co__row"><span>Water saved per month</span><strong data-f-water-money>—</strong></div>
          <div class="co__row"><span>Labour saved per month</span><strong data-f-labour-money>—</strong></div>
          <div class="co__row"><span>Total saved per month</span><strong data-f-total>—</strong></div>
          <div class="co__row"><span>Total saved per year</span><strong data-f-year>—</strong></div>
          <div class="co__total">
            <span>Payback</span>
            <strong data-f-payback>—</strong>
          </div>
          <a class="btn btn--brass btn--block mt-3" href="${localePath('/contact?interest=farm', locale)}">Request a farm survey</a>
        </div>
      </div>
    </div>
  </section>

  <section class="section">
    <div class="wrap">
      <div class="section-head">
        <p class="eyebrow">${esc(c(locale, 'farm.savingsTitle'))}</p>
        <h2>What other plots achieved</h2>
      </div>
      <div style="overflow-x:auto">
        <table class="data-table">
          <thead><tr><th>Crop</th><th>Water</th><th>Labour</th><th>Payback</th></tr></thead>
          <tbody>
            ${FARM.savings.map((row) => `<tr>
              <td><strong>${esc(row.crop)}</strong></td><td>${esc(row.water)}</td><td>${esc(row.labour)}</td><td class="mono">${esc(row.payback)}</td>
            </tr>`).join('')}
          </tbody>
        </table>
      </div>
    </div>
  </section>
`;

  return {
    path: '/tools/savings-calculator',
    locale,
    navKey: 'tools',
    title: locale === 'sw'
      ? 'Kikokotoo cha akiba — umeme, maji na umwagiliaji | TRIXX'
      : 'Savings calculator — power, water and irrigation savings | TRIXX',
    description: locale === 'sw'
      ? 'Weka bili yako ya umeme, maji na pampu, chagua kiwango cha smart au kifurushi cha shamba, na uone akiba ya kila mwezi na muda wa malipo.'
      : 'Enter your power, water and pump costs, choose a smart tier or farm plot package, and see the estimated monthly saving and payback period.',
    jsonLd: [
      breadcrumbLd([{ label: 'Home', href: '/' }, { label: 'Savings calculator', href: '/tools/savings-calculator' }]),
      {
        '@context': 'https://schema.org',
        '@type': 'WebApplication',
        name: 'TRIXX Savings Calculator',
        applicationCategory: 'FinanceApplication',
        operatingSystem: 'Web',
        offers: { '@type': 'Offer', price: '0', priceCurrency: 'KES' },
      },
    ],
    body,
  };
}

/* ---------- virtual tours ---------- */

function virtualToursPage(locale) {
  const STYLES = stylesFor(locale);
  const body = `
  <section class="section section--tight">
    <div class="wrap">
      ${breadcrumbs([{ label: 'Home', href: '/' }, { label: t(locale, 'nav.tools'), href: '/tools/virtual-tours' }, { label: t(locale, 'nav.tours') }], locale)}
      <div class="section-head">
        <p class="eyebrow">${esc(c(locale, 'home.tools.eyebrow'))}</p>
        <h1>${esc(t(locale, 'nav.tours'))}</h1>
        <p class="lede">Walk every collection before you commit to a viewing. Drag the panorama to look around, use the room buttons to jump, or step through the 45° turns.</p>
      </div>
    </div>
  </section>

  ${STYLES.map((style, i) => `
  <section class="section${i % 2 === 1 ? ' bg-paper2 border-y' : ''}">
    <div class="wrap">
      <div class="section-head section-head--split">
        <div>
          <p class="eyebrow">${esc(style.name)} · ${esc(style.swahiliName)}</p>
          <h2>${esc(style.tagline)}</h2>
        </div>
        <a class="btn btn--outline" href="${localePath(`/house-collections/${style.slug}`, locale)}">Collection details →</a>
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
          ${ROOM_KEYS.map((key, i) => `<button type="button" data-tour-room="${esc(c(locale, key))}" data-room-index="${i}">${esc(c(locale, key))}</button>`).join('')}
        </div>
      </div>
      <div class="cluster mt-3">
        <a class="btn btn--primary" href="${localePath(`/book-viewing?style=${style.slug}`, locale)}">${esc(t(locale, 'cta.book'))}</a>
        <a class="btn btn--outline" href="${localePath(`/search?style=${style.slug}`, locale)}">See listings</a>
        <a class="btn btn--quiet" href="${localePath(`/tools/configurator?style=${style.slug}`, locale)}">${esc(t(locale, 'cta.configure'))}</a>
      </div>
    </div>
  </section>`).join('')}

  <section class="section bg-ink">
    <div class="wrap center">
      <p class="eyebrow" style="justify-content:center">Next step</p>
      <h2>See one in person.</h2>
      <p class="lede" style="margin-inline:auto">A tour shows the layout. A viewing shows the light, the noise and the neighbours. Book a slot and we will meet you there.</p>
      <div class="cluster cluster--center mt-3">
        <a class="btn btn--brass btn--lg" href="${localePath('/book-viewing', locale)}">${esc(t(locale, 'cta.book'))}</a>
        <a class="btn btn--outline btn--lg" style="border-color:rgba(244,237,224,0.35);color:var(--paper)" href="${localePath('/contact', locale)}">${esc(t(locale, 'cta.callback'))}</a>
      </div>
    </div>
  </section>
`;

  return {
    path: '/tools/virtual-tours',
    locale,
    navKey: 'tools',
    title: locale === 'sw'
      ? 'Ziara za mtandaoni — tembea nyumba za TRIXX kwa 360° | TRIXX'
      : 'Virtual tours — 360° walkthroughs of every TRIXX collection | TRIXX',
    description: locale === 'sw'
      ? 'Ziara za 360° za mikusanyiko yote sita ya TRIXX. Buruta picha kuangalia pande zote au ruka kwenye chumba unachotaka.'
      : '360° walkthroughs of all six TRIXX house collections. Drag the panorama to look around, or jump straight to the room you want to see.',
    jsonLd: [
      breadcrumbLd([{ label: 'Home', href: '/' }, { label: 'Virtual tours', href: '/tools/virtual-tours' }]),
      {
        '@context': 'https://schema.org',
        '@type': 'ItemList',
        name: 'TRIXX virtual tours',
        itemListElement: STYLES.map((s, i) => ({
          '@type': 'ListItem',
          position: i + 1,
          name: `${s.name} 360 tour`,
          url: `${SITE.url}/house-collections/${s.slug}`,
        })),
      },
    ],
    body,
  };
}

/* ---------- compare ---------- */

const COMPARE_SPECS = [
  ['Reference', (l) => l.id],
  ['Price', (l) => money(l.price)],
  ['Purpose', (l) => (l.purpose === 'rent' ? 'For rent' : 'For sale')],
  ['Location', (l) => `${l.location}, ${l.county}`],
  ['Style', (l) => l.style.replace(/-/g, ' ').replace(/\b\w/g, (ch) => ch.toUpperCase())],
  ['Bedrooms', (l) => String(l.bedrooms)],
  ['Bathrooms', (l) => String(l.bathrooms)],
  ['Area', (l) => `${num(l.area)} m²`],
  ['Plot', (l) => l.plot],
  ['Built', (l) => String(l.built)],
  ['Smart tier', (l) => l.tier[0].toUpperCase() + l.tier.slice(1)],
  ['Source', (l) => (l.source === 'trixx' ? 'TRIXX built' : 'Owner listing')],
  ['Verified', (l) => (l.verified ? 'Yes' : 'Pending')],
  ['Amenities', (l) => l.amenities.slice(0, 5).join(', ')],
];

function comparePage(locale) {
  const STYLES = stylesFor(locale);
  const presets = LISTINGS.slice(0, 3);

  const body = `
  <section class="section section--tight">
    <div class="wrap">
      ${breadcrumbs([{ label: 'Home', href: '/' }, { label: c(locale, 'search.compareTitle') }], locale)}
      <div class="section-head">
        <p class="eyebrow">${esc(t(locale, 'nav.compare'))}</p>
        <h1>${esc(c(locale, 'search.compareTitle'))}</h1>
        <p class="lede">${esc(c(locale, 'search.compareNote'))}</p>
      </div>
    </div>
  </section>

  <section class="section section--flush">
    <div class="wrap wrap--wide">
      <div class="panel panel--paper mb-4">
        <p class="small muted" style="margin:0">Selection is stored in your browser. Add or remove properties from any listing card, then return here.</p>
        <div class="cluster mt-3">
          <a class="btn btn--primary" href="${localePath('/search', locale)}">Add more properties</a>
          <button class="btn btn--outline" type="button" data-compare-clear>Clear selection</button>
        </div>
      </div>

      <div data-compare-root>
        <div class="compare-grid" data-compare-grid>
          ${presets.map((l) => `<div class="compare-col" data-compare-col="${l.id}">
            <div class="compare-col__head">
              ${art.houseRender(l.style, { label: `${l.title} render`, seed: l.id })}
              <h3 style="margin:0.75rem 0 0;font-size:1.05rem"><a href="${localePath(`/listings/${l.slug}`, locale)}">${esc(l.title)}</a></h3>
              <div class="cluster" style="margin-top:0.5rem">${badges(l, locale)}</div>
            </div>
            <dl>
              ${COMPARE_SPECS.map(([label, fn]) => `<dt>${esc(label)}</dt><dd>${esc(fn(l))}</dd>`).join('')}
            </dl>
          </div>`).join('')}
        </div>

        <p class="panel center" data-compare-blank hidden>${esc(c(locale, 'search.compareEmpty'))}</p>
      </div>

      <div class="panel panel--paper mt-4">
        <h2 style="font-size:1.35rem;margin-top:0">Reading the comparison</h2>
        <div class="grid grid--3">
          <div>
            <h3>Source matters</h3>
            <p class="small muted">A TRIXX-built home carries its build record and a commissioned device schedule. An owner listing is identity-checked but built by someone else, and we say so.</p>
          </div>
          <div>
            <h3>Smart tier is the running cost</h3>
            <p class="small muted">Two homes at the same price can differ by tens of thousands a month in power and water. Compare the tier column before the price column.</p>
          </div>
          <div>
            <h3>Verified means checked</h3>
            <p class="small muted">We confirm title, ownership and the physical property before the badge appears. A listing without it has not completed that process yet.</p>
          </div>
        </div>
      </div>
    </div>
  </section>

  <section class="section bg-paper2 border-y">
    <div class="wrap">
      <div class="section-head section-head--split">
        <div>
          <p class="eyebrow">Need a second opinion</p>
          <h2>Book viewings back to back.</h2>
        </div>
        <a class="btn btn--primary" href="${localePath('/book-viewing', locale)}">${esc(t(locale, 'cta.book'))}</a>
      </div>
      <div class="grid grid--3">${presets.map((l) => listingCard(l, locale)).join('')}</div>
    </div>
  </section>
`;

  return {
    path: '/compare',
    locale,
    navKey: 'tools',
    title: locale === 'sw'
      ? 'Linganisha mali — hadi nyumba tatu kando kwa kando | TRIXX'
      : 'Compare properties — up to three homes side by side | TRIXX',
    description: locale === 'sw'
      ? 'Linganisha hadi nyumba tatu za TRIXX kwa bei, eneo, vyumba, kiwango cha smart, vifaa na chanzo cha tangazo.'
      : 'Compare up to three TRIXX properties side by side across price, area, bedrooms, smart tier, amenities and listing source.',
    jsonLd: breadcrumbLd([{ label: 'Home', href: '/' }, { label: 'Compare', href: '/compare' }]),
    compareBar: `<div class="compare-bar" data-compare-bar data-open="false">
      <span class="tiny mono" style="letter-spacing:0.12em;text-transform:uppercase">Compare</span>
      <span class="compare-bar__items" data-compare-items></span>
      <a class="btn btn--brass btn--sm" href="${localePath('/compare', locale)}">Open comparison</a>
    </div>`,
    body,
  };
}

module.exports = () => [
  configuratorPage('en'), configuratorPage('sw'),
  liveDemoPage('en'), liveDemoPage('sw'),
  savingsCalculatorPage('en'), savingsCalculatorPage('sw'),
  virtualToursPage('en'), virtualToursPage('sw'),
  comparePage('en'), comparePage('sw'),
];
