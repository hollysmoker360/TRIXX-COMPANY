'use strict';

const { esc, money } = require('../lib/util');
const { SITE, t } = require('../data/site');
const { c } = require('../data/copy');
const { stylesFor, packagesFor, appsFor } = require('../data/catalog');
const { LISTINGS, TESTIMONIALS, BLOG_POSTS } = require('../data/listings');
const art = require('../lib/art');
const { localePath } = require('../templates/layout');
const {
  listingCard, styleCard, statBlock, testimonialCard, postCard, storeButtons,
} = require('../templates/components');

const QUICKLINKS = [
  { href: '/search?purpose=sale', en: ['Buy a home', '26 verified listings'], sw: ['Nunua nyumba', 'Matangazo 26 yaliyothibitishwa'] },
  { href: '/search?purpose=rent', en: ['Rent a home', 'Tenant portal included'], sw: ['Kodisha nyumba', 'Lango la mpangaji linajumuishwa'] },
  { href: '/list-your-property', en: ['List your property', 'Free for 30 days'], sw: ['Tangaza nyumba yako', 'Bure kwa siku 30'] },
  { href: '/products', en: ['Download the apps', 'Android and iOS'], sw: ['Pakua app', 'Android na iOS'] },
];

const TICKER = {
  en: [
    'TRIXX-built homes are commissioned before handover',
    'Every owner listing is identity-checked',
    'Comfort tier cuts power bills by 26%',
    'Farm plots save up to 41% of irrigation water',
    'One login across all five apps',
    '48-hour repair promise for managed rentals',
  ],
  sw: [
    'Nyumba za TRIXX zinakamilishwa kabla ya kukabidhiwa',
    'Kila tangazo la mmiliki linathibitishwa',
    'Kiwango cha Comfort kinapunguza bili ya umeme kwa 26%',
    'Mashamba yanaokoa hadi 41% ya maji ya umwagiliaji',
    'Kuingia kumoja kwa app zote tano',
    'Ahadi ya ukarabati wa saa 48 kwa nyumba zinazosimamiwa',
  ],
};

function homePage(locale) {
  const STYLES = stylesFor(locale);
  const PACKAGES = packagesFor(locale);
  const APPS = appsFor(locale);
  const featured = LISTINGS.filter((l) => l.featured).slice(0, 3);
  const trixxBuilt = LISTINGS.filter((l) => l.source === 'trixx').slice(0, 3);
  const posts = BLOG_POSTS.slice(0, 3);
  const hero = LISTINGS[0];
  const ticker = TICKER[locale] || TICKER.en;
  const pick = (row) => (locale === 'sw' ? row.sw : row.en);

  const body = `
  <section class="hero">
    <div class="hero__media">${art.houseRender('swahili-coastal', { label: 'A TRIXX Swahili Coastal home at dusk', seed: 'hero', w: 1600, h: 900 })}</div>
    <div class="hero__scrim"></div>
    <div class="wrap hero__inner">
      <p class="eyebrow">${esc(c(locale, 'home.eyebrow'))}</p>
      <h1 class="balance">${esc(c(locale, 'home.title'))}</h1>
      <p class="hero__promise">${esc(c(locale, 'home.promise'))}</p>
      <p class="lede">${esc(c(locale, 'home.lede'))}</p>
      <div class="hero__actions cluster">
        <a class="btn btn--primary btn--lg" href="${localePath('/search?purpose=sale', locale)}">${esc(t(locale, 'cta.buy'))}</a>
        <a class="btn btn--outline btn--lg" style="border-color:rgba(251,247,239,0.5);color:var(--paper)" href="${localePath('/tools/live-demo', locale)}">${esc(t(locale, 'cta.tryDemo'))}</a>
        <a class="btn btn--quiet btn--lg" style="color:rgba(251,247,239,0.85)" href="${localePath('/book-viewing', locale)}">${esc(t(locale, 'cta.book'))} →</a>
      </div>
    </div>
    <div class="hero__rail">
      <div class="hero__rail-card">
        <strong>${esc(c(locale, 'home.rail.building'))}</strong>
        <span>${esc(c(locale, 'home.rail.buildingValue'))}</span>
      </div>
      <div class="hero__rail-card">
        <strong>${esc(c(locale, 'home.rail.tier'))}</strong>
        <span>${esc(c(locale, 'home.rail.tierValue'))}</span>
      </div>
      <div class="hero__rail-card">
        <strong>${esc(c(locale, 'home.rail.verified'))}</strong>
        <span>${esc(hero.title)} — ${money(hero.price)}</span>
      </div>
    </div>
  </section>

  <nav class="quicklinks" aria-label="Quick actions">
    ${QUICKLINKS.map((q) => `<a href="${localePath(q.href, locale)}">
      <span class="ql__label">${esc(pick(q)[0])}</span>
      <span class="ql__note">${esc(pick(q)[1])}</span>
    </a>`).join('')}
  </nav>

  <div class="ticker" aria-hidden="true">
    <div class="ticker__track">
      ${ticker.concat(ticker).map((item) => `<span class="ticker__item">${esc(item)}</span>`).join('')}
    </div>
  </div>

  <section class="section">
    <div class="wrap">
      <div class="section-head section-head--split">
        <div>
          <p class="eyebrow">${esc(c(locale, 'home.collections.eyebrow'))}</p>
          <h2>${esc(c(locale, 'home.collections.title'))}</h2>
          <p class="lede">${esc(c(locale, 'home.collections.lede'))}</p>
        </div>
        <a class="btn btn--outline" href="${localePath('/house-collections', locale)}">${esc(t(locale, 'cta.viewAll'))} →</a>
      </div>
      <div class="grid grid--3">${STYLES.slice(0, 3).map((s) => styleCard(s, locale)).join('')}</div>
      <div class="grid grid--3 mt-3">${STYLES.slice(3).map((s) => styleCard(s, locale)).join('')}</div>
    </div>
  </section>

  <section class="section bg-paper2 border-y">
    <div class="wrap">
      <div class="grid grid--sidebar grid--sidebar--right">
        <div>
          <p class="eyebrow">${esc(c(locale, 'home.packages.eyebrow'))}</p>
          <h2>${esc(c(locale, 'home.packages.title'))}</h2>
          <p class="lede">${esc(c(locale, 'home.packages.lede'))}</p>
          <div class="grid grid--3 mt-4">
            ${PACKAGES.map((p) => statBlock({ value: `${p.powerSavingPct}%`, label: `${p.name} ${c(locale, 'home.packages.powerLabel')}` })).join('')}
          </div>
          <div class="grid grid--3 mt-3">
            ${PACKAGES.map((p) => statBlock({ value: `${p.waterSavingPct}%`, label: `${p.name} ${c(locale, 'home.packages.waterLabel')}` })).join('')}
          </div>
          <div class="cluster mt-4">
            <a class="btn btn--primary" href="${localePath('/smart-packages', locale)}">${esc(t(locale, 'cta.seePackages'))}</a>
            <a class="btn btn--outline" href="${localePath('/tools/savings-calculator', locale)}">${esc(t(locale, 'cta.calculate'))}</a>
          </div>
        </div>
        <div class="panel panel--paper">
          <h3 style="margin-top:0">${esc(c(locale, 'home.packages.tableTitle'))}</h3>
          <table class="data-table">
            <thead><tr><th>Tier</th><th class="num">${esc(c(locale, 'packages.devices'))}</th><th class="num">${esc(c(locale, 'packages.install'))}</th><th class="num">${esc(t(locale, 'search.price'))}</th></tr></thead>
            <tbody>
              ${PACKAGES.map((p) => `<tr>
                <td><strong>${esc(p.name)}</strong></td>
                <td class="num">${p.devices}</td>
                <td class="num">${p.installDays} ${esc(c(locale, 'packages.days'))}</td>
                <td class="num">${money(p.price)}</td>
              </tr>`).join('')}
            </tbody>
          </table>
          <p class="tiny muted mt-2">${esc(c(locale, 'home.packages.note'))}</p>
        </div>
      </div>
    </div>
  </section>

  <section class="section">
    <div class="wrap">
      <div class="section-head section-head--split">
        <div>
          <p class="eyebrow">${esc(c(locale, 'home.search.eyebrow'))}</p>
          <h2>${esc(c(locale, 'home.search.title'))}</h2>
          <p class="lede">${esc(c(locale, 'home.search.lede'))}</p>
        </div>
        <a class="btn btn--outline" href="${localePath('/search', locale)}">${esc(t(locale, 'nav.search'))} →</a>
      </div>

      <form class="searchbar" data-search-form action="${localePath('/search', locale)}" method="get">
        <div class="searchbar__fields">
          <div class="field" style="margin:0">
            <label for="h-purpose">${esc(t(locale, 'search.purpose'))}</label>
            <select id="h-purpose" name="purpose">
              <option value="">${esc(t(locale, 'search.any'))}</option>
              <option value="sale">${esc(t(locale, 'search.forSale'))}</option>
              <option value="rent">${esc(t(locale, 'search.forRent'))}</option>
            </select>
          </div>
          <div class="field" style="margin:0">
            <label for="h-county">${esc(t(locale, 'search.location'))}</label>
            <select id="h-county" name="county">
              <option value="">${esc(t(locale, 'search.anyLocation'))}</option>
              ${[...new Set(LISTINGS.map((l) => l.county))].map((county) => `<option value="${esc(county)}">${esc(county)}</option>`).join('')}
            </select>
          </div>
          <div class="field" style="margin:0">
            <label for="h-beds">${esc(t(locale, 'search.bedrooms'))}</label>
            <select id="h-beds" name="bedrooms">
              <option value="">${esc(t(locale, 'search.any'))}</option>
              ${[3, 4, 5, 6].map((b) => `<option value="${b}">${b}+</option>`).join('')}
            </select>
          </div>
          <div class="field" style="margin:0">
            <label for="h-style">${esc(t(locale, 'search.style'))}</label>
            <select id="h-style" name="style">
              <option value="">${esc(t(locale, 'search.any'))}</option>
              ${STYLES.map((s) => `<option value="${s.slug}">${esc(s.name)}</option>`).join('')}
            </select>
          </div>
          <div class="field" style="margin:0">
            <label for="h-tier">${esc(t(locale, 'search.tier'))}</label>
            <select id="h-tier" name="tier">
              <option value="">${esc(t(locale, 'search.any'))}</option>
              ${PACKAGES.map((p) => `<option value="${p.slug}">${esc(p.name)}</option>`).join('')}
            </select>
          </div>
        </div>
        <div class="searchbar__actions">
          <button class="btn btn--primary" type="submit">${esc(t(locale, 'search.submit'))}</button>
        </div>
      </form>

      <div class="grid grid--3 mt-4">${featured.map((l) => listingCard(l, locale)).join('')}</div>
    </div>
  </section>

  <section class="section bg-teal">
    <div class="wrap">
      <div class="grid grid--sidebar">
        <div>
          <p class="eyebrow">${esc(c(locale, 'home.farm.eyebrow'))}</p>
          <h2>${esc(c(locale, 'home.farm.title'))}</h2>
          <p class="lede">${esc(c(locale, 'home.farm.lede'))}</p>
          <div class="grid grid--4 mt-4">
            ${statBlock({ value: '41%', label: c(locale, 'home.farm.waterPeak') })}
            ${statBlock({ value: '12 hrs', label: c(locale, 'home.farm.labour') })}
            ${statBlock({ value: '11 mo', label: c(locale, 'home.farm.payback') })}
            ${statBlock({ value: '300+', label: c(locale, 'home.farm.plots') })}
          </div>
          <div class="cluster mt-4">
            <a class="btn btn--brass" href="${localePath('/farm-solutions', locale)}">${esc(t(locale, 'nav.farm'))} →</a>
            <a class="btn btn--outline" style="border-color:rgba(251,247,239,0.5);color:var(--paper)" href="${localePath('/tools/savings-calculator#farm', locale)}">${esc(t(locale, 'cta.calculate'))}</a>
          </div>
        </div>
        <div class="phone-frame">${art.appScreen('farm', { label: 'TRIXX Farm app showing irrigation zones' })}</div>
      </div>
    </div>
  </section>

  <section class="section">
    <div class="wrap">
      <div class="section-head section-head--split">
        <div>
          <p class="eyebrow">${esc(c(locale, 'home.apps.eyebrow'))}</p>
          <h2>${esc(c(locale, 'home.apps.title'))}</h2>
          <p class="lede">${esc(c(locale, 'home.apps.lede'))}</p>
        </div>
        <a class="btn btn--outline" href="${localePath('/products', locale)}">${esc(t(locale, 'nav.products'))} →</a>
      </div>
      <div class="grid grid--3">
        ${APPS.map((app) => `<article class="card">
          <div class="card__body">
            <span class="badge" style="border-color:${app.accent};color:${app.accent};align-self:flex-start">${esc(app.name)}</span>
            <h3 class="card__title" style="font-size:1.05rem"><a href="${localePath(`/products/${app.slug}`, locale)}">${esc(app.tagline)}</a></h3>
            <ul class="spec-list">${app.stats.map((s) => `<li><span>${esc(s.label)}</span><span>${esc(s.value)}</span></li>`).join('')}</ul>
            <div class="card__foot">
              <span class="tiny muted">${esc(app.sizes)}</span>
              <a class="btn btn--outline btn--sm" href="${localePath(`/products/${app.slug}`, locale)}">${esc(t(locale, 'cta.explore'))}</a>
            </div>
          </div>
        </article>`).join('')}
      </div>
      <div class="panel mt-4 cluster cluster--between">
        <div>
          <h3 style="margin:0">${esc(c(locale, 'home.apps.installTitle'))}</h3>
          <p class="small muted" style="margin:0.4rem 0 0">${esc(c(locale, 'home.apps.installNote'))}</p>
        </div>
        ${storeButtons({ slug: 'home' })}
      </div>
    </div>
  </section>

  <section class="section bg-paper2 border-y">
    <div class="wrap">
      <div class="section-head">
        <p class="eyebrow">${esc(c(locale, 'home.built.eyebrow'))}</p>
        <h2>${esc(c(locale, 'home.built.title'))}</h2>
        <p class="lede">${esc(c(locale, 'home.built.lede'))}</p>
      </div>
      <div class="grid grid--3">${trixxBuilt.map((l) => listingCard(l, locale)).join('')}</div>
    </div>
  </section>

  <section class="section">
    <div class="wrap">
      <div class="section-head">
        <p class="eyebrow">${esc(c(locale, 'home.voices.eyebrow'))}</p>
        <h2>${esc(c(locale, 'home.voices.title'))}</h2>
      </div>
      <div class="grid grid--3">${TESTIMONIALS.slice(0, 3).map(testimonialCard).join('')}</div>
    </div>
  </section>

  <section class="section bg-ink">
    <div class="wrap">
      <div class="grid grid--sidebar grid--sidebar--right">
        <div>
          <p class="eyebrow">${esc(c(locale, 'home.tools.eyebrow'))}</p>
          <h2>${esc(c(locale, 'home.tools.title'))}</h2>
          <p class="lede">${esc(c(locale, 'home.tools.lede'))}</p>
          <div class="grid grid--3 mt-4">
            <a href="${localePath('/tools/configurator', locale)}" style="color:inherit">
              <h3 style="color:var(--paper)">${esc(c(locale, 'home.tools.configurator'))}</h3>
              <p class="small" style="color:rgba(244,237,224,0.7)">${esc(c(locale, 'home.tools.configuratorNote'))}</p>
            </a>
            <a href="${localePath('/tools/live-demo', locale)}" style="color:inherit">
              <h3 style="color:var(--paper)">${esc(c(locale, 'home.tools.demo'))}</h3>
              <p class="small" style="color:rgba(244,237,224,0.7)">${esc(c(locale, 'home.tools.demoNote'))}</p>
            </a>
            <a href="${localePath('/tools/savings-calculator', locale)}" style="color:inherit">
              <h3 style="color:var(--paper)">${esc(c(locale, 'home.tools.savings'))}</h3>
              <p class="small" style="color:rgba(244,237,224,0.7)">${esc(c(locale, 'home.tools.savingsNote'))}</p>
            </a>
          </div>
        </div>
        <div class="panel panel--ink" style="border-color:rgba(244,237,224,0.2)">
          <h3 style="margin-top:0">${esc(c(locale, 'home.book.title'))}</h3>
          <p class="small" style="color:rgba(244,237,224,0.72)">${esc(c(locale, 'home.book.note'))}</p>
          <div class="cluster mt-3">
            <a class="btn btn--brass" href="${localePath('/book-viewing', locale)}">${esc(t(locale, 'cta.book'))}</a>
            <a class="btn btn--outline" style="border-color:rgba(244,237,224,0.35);color:var(--paper)" href="https://wa.me/${esc(SITE.whatsapp.replace(/\D/g, ''))}">${esc(t(locale, 'cta.whatsapp'))}</a>
          </div>
          <hr style="border-color:rgba(244,237,224,0.15)">
          <p class="tiny" style="color:rgba(244,237,224,0.6)">${esc(SITE.address.line1)}, ${esc(SITE.address.line2)}<br>${esc(SITE.hours)}</p>
        </div>
      </div>
    </div>
  </section>

  <section class="section">
    <div class="wrap">
      <div class="section-head section-head--split">
        <div>
          <p class="eyebrow">${esc(c(locale, 'home.blog.eyebrow'))}</p>
          <h2>${esc(c(locale, 'home.blog.title'))}</h2>
        </div>
        <a class="btn btn--outline" href="${localePath('/blog', locale)}">${esc(t(locale, 'nav.blog'))} →</a>
      </div>
      <div class="grid grid--3">${posts.map((p) => postCard(p, locale)).join('')}</div>
    </div>
  </section>
`;

  return {
    path: '/',
    locale,
    navKey: 'home',
    title: locale === 'sw'
      ? `${SITE.name} — Nyumba smart, mali na mifumo ya shamba Kenya`
      : `${SITE.name} — Smart homes, property and farm systems in Kenya`,
    description: locale === 'sw'
      ? 'TRIXX inajenga nyumba smart na inauza, inakodisha na kusimamia mali kote Kenya — na app zilizounganishwa kwa Home, Farm, Rent, Market na School.'
      : SITE.description,
    jsonLd: [
      {
        '@context': 'https://schema.org',
        '@type': 'Organization',
        name: SITE.legalName,
        url: SITE.url,
        email: SITE.email,
        telephone: SITE.phone,
        foundingDate: String(SITE.founded),
        description: SITE.description,
        address: {
          '@type': 'PostalAddress',
          streetAddress: `${SITE.address.line1}, ${SITE.address.line2}`,
          addressLocality: SITE.address.city,
          postalCode: SITE.address.postcode,
          addressCountry: SITE.address.countryCode,
        },
        sameAs: SITE.social.map((s) => s.href),
      },
      {
        '@context': 'https://schema.org',
        '@type': 'WebSite',
        name: SITE.name,
        url: SITE.url,
        potentialAction: {
          '@type': 'SearchAction',
          target: `${SITE.url}/search?q={search_term_string}`,
          'query-input': 'required name=search_term_string',
        },
      },
    ],
    body,
  };
}

module.exports = () => [homePage('en'), homePage('sw')];
