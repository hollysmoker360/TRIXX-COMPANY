'use strict';

const { esc, money, num, moneyFull, slugify, formatDate } = require('../lib/util');
const { SITE, t } = require('../data/site');
const { c, ROOM_KEYS } = require('../data/copy');
const { stylesFor, packagesFor } = require('../data/catalog');
const { LISTINGS } = require('../data/listings');
const art = require('../lib/art');
const { localePath } = require('../templates/layout');
const {
  listingCard, badges, breadcrumbs, breadcrumbLd, styleName, TIER_LABEL,
} = require('../templates/components');

const RATE = 0.115;      // indicative annual mortgage rate
const TERM_YEARS = 20;

/* Amortising monthly repayment for a fixed-rate loan. */
function repayment(principal, annualRate, years) {
  const monthly = annualRate / 12;
  const n = years * 12;
  if (principal <= 0) return 0;
  return (principal * monthly) / (1 - Math.pow(1 + monthly, -n));
}

function listingPage(listing, locale) {
  const STYLES = stylesFor(locale);
  const PACKAGES = packagesFor(locale);
  const style = STYLES.find((s) => s.slug === listing.style);
  const isRent = listing.purpose === 'rent';
  const deposit = Math.round(listing.salePrice * 0.2);
  const loan = listing.salePrice - deposit;
  const monthly = Math.round(repayment(loan, RATE, TERM_YEARS));
  const totalCosts = monthly + listing.monthlyCosts.serviceCharge + listing.monthlyCosts.insurance + listing.monthlyCosts.rates;

  const similar = LISTINGS
    .filter((l) => l.id !== listing.id && (l.style === listing.style || l.county === listing.county))
    .slice(0, 3);

  const gallery = [
    { label: 'Front elevation', art: art.houseRender(listing.style, { seed: `${listing.id}-front`, label: `${listing.title} front elevation` }) },
    { label: 'Rear and garden', art: art.houseRender(listing.style, { seed: `${listing.id}-rear`, label: `${listing.title} rear elevation` }) },
    { label: 'Street view', art: art.houseRender(listing.style, { seed: `${listing.id}-street`, label: `${listing.title} from the street` }) },
    { label: 'Floor plan', art: art.floorPlan(listing.style, { bedrooms: listing.bedrooms, width: 12 + listing.bedrooms * 1.1, label: `${listing.title} floor plan` }) },
  ];

  const body = `
  <section class="section section--tight">
    <div class="wrap">
      ${breadcrumbs([
        { label: 'Home', href: '/' },
        { label: c(locale, 'search.title'), href: '/search' },
        { label: listing.location, href: `/search/${slugify(listing.county)}` },
        { label: listing.id },
      ], locale)}

      <div class="listing-hero">
        <div class="stack" style="--stack-gap:1.25rem">
          <div class="viewer" data-tour-viewer data-style="${listing.style}" data-angle="0" data-tour-rooms="${esc(JSON.stringify(ROOM_KEYS.map((k) => c(locale, k))))}">
            <div class="viewer__stage">
              <div class="art" data-tour-stage>${art.tourPanorama(listing.style, { angle: 0, locale, label: `${listing.title} 360 tour` })}</div>
              <span class="viewer__label" data-tour-label>${esc(c(locale, 'listing.tourDefaultRoom'))}</span>
              <span class="viewer__hint">${esc(c(locale, 'listing.viewerHint'))}</span>
            </div>
            <div class="viewer__tabs" role="tablist" aria-label="Media">
              <button type="button" role="tab" aria-selected="true" data-media="tour">${esc(c(locale, 'listing.media.tour'))}</button>
              <button type="button" role="tab" aria-selected="false" data-media="gallery">${esc(c(locale, 'listing.media.gallery'))}</button>
              <button type="button" role="tab" aria-selected="false" data-media="plan">${esc(c(locale, 'listing.media.plan'))}</button>
            </div>
            <div class="tour-pad" data-tour-controls>
              <button type="button" data-tour-turn="-45">⟲ 45°</button>
              <button type="button" data-tour-turn="45">⟳ 45°</button>
              ${listing.tourRooms.map((r, i) => { const label = esc(c(locale, r)); return `<button type="button" data-tour-room="${label}" data-room-index="${i}">${label}</button>`; }).join('')}
            </div>
          </div>

          <div class="thumb-row" data-thumbs>
            ${gallery.map((g, i) => `<button class="thumb" type="button" data-thumb="${i}" aria-pressed="${i === 0 ? 'true' : 'false'}" aria-label="${esc(g.label)}">
              ${g.art}
            </button>`).join('')}
          </div>

          <div>
            <div class="cluster" style="margin-bottom:0.75rem">${badges(listing, locale)}
              <span class="badge">${esc(TIER_LABEL[listing.tier])} tier</span>
              <span class="badge">${esc(styleName(listing.style))}</span>
            </div>
            <h1 style="font-size:clamp(1.7rem,1.2rem+2.2vw,2.6rem)">${esc(listing.title)}</h1>
            <p class="mono tiny muted">${esc(listing.id)} · ${esc(listing.location)}, ${esc(listing.county)} · listed ${formatDate(listing.listedAt, locale)}</p>
            <p class="lede">${esc(listing.description)}</p>
          </div>

          <div class="listing-facts">
            <div><span class="lf__label">${esc(t(locale, 'search.bedrooms'))}</span><span class="lf__value">${listing.bedrooms}</span></div>
            <div><span class="lf__label">${esc(t(locale, 'label.bathrooms'))}</span><span class="lf__value">${listing.bathrooms}</span></div>
            <div><span class="lf__label">${esc(c(locale, 'listing.factArea'))}</span><span class="lf__value">${num(listing.area)} m²</span></div>
            <div><span class="lf__label">${esc(t(locale, 'label.plot'))}</span><span class="lf__value">${esc(listing.plot)}</span></div>
            <div><span class="lf__label">${esc(t(locale, 'label.built'))}</span><span class="lf__value">${listing.built}</span></div>
          </div>

          <div class="grid grid--2">
            <div>
              <h2 style="font-size:1.4rem">${esc(t(locale, 'label.amenities'))}</h2>
              <div class="tags">
                ${listing.amenities.map((a) => `<span class="tag">${esc(a)}</span>`).join('')}
              </div>
            </div>
            <div>
              <h2 style="font-size:1.4rem">${esc(t(locale, 'label.neighborhood'))}</h2>
              <p class="small muted">${esc(listing.neighborhood)}</p>
            </div>
          </div>

          <div class="panel panel--paper">
            <h2 style="font-size:1.4rem;margin-top:0">${esc(c(locale, 'listing.smartSpec'))}</h2>
            <p class="small muted">${esc(c(locale, 'listing.smartSpecNote'))} <strong>${esc(TIER_LABEL[listing.tier])}</strong>${esc(c(locale, 'listing.smartSpecNote2'))} ${esc(PACKAGES.find((p) => p.slug === listing.tier).summary)}</p>
            <ul class="grid grid--2" style="list-style:none;padding:0;gap:0.3rem 2rem">
              ${PACKAGES.find((p) => p.slug === listing.tier).groups.flatMap((g) => g.items).slice(0, 8).map((i) => `<li style="display:flex;gap:0.55rem;font-size:0.88rem;padding:0.3rem 0;border-bottom:1px solid var(--line)"><span style="color:var(--teal)">✓</span><span>${esc(i)}</span></li>`).join('')}
            </ul>
            <a class="btn btn--outline btn--sm mt-2" href="${localePath('/smart-packages', locale)}">${esc(t(locale, 'cta.seePackages'))} →</a>
          </div>

          <div class="panel panel--paper" id="calculator">
            <h2 style="font-size:1.4rem;margin-top:0">${esc(c(locale, isRent ? 'listing.paymentSummary' : 'listing.mortgageCalc'))}</h2>
            <div class="calc-grid">
              <div>
                <div class="range-field">
                  <div class="rf__top">
                    <label for="calc-deposit">${esc(c(locale, 'listing.calcDeposit'))} (${Math.round(deposit / listing.salePrice * 100)}%)</label>
                    <output data-calc-deposit-out>${money(deposit)}</output>
                  </div>
                  <input id="calc-deposit" type="range" min="${Math.round(listing.salePrice * 0.05)}" max="${Math.round(listing.salePrice * 0.6)}" step="50000" value="${deposit}"
                    data-calc-deposit data-price="${listing.salePrice}" data-rate="${RATE}" data-years="${TERM_YEARS}"
                    data-service="${listing.monthlyCosts.serviceCharge}" data-insurance="${listing.monthlyCosts.insurance}" data-rates="${listing.monthlyCosts.rates}">
                </div>
                <div class="range-field">
                  <div class="rf__top">
                    <label for="calc-term">${esc(c(locale, 'listing.calcTerm'))}</label>
                    <output data-calc-term-out>${TERM_YEARS}</output>
                  </div>
                  <input id="calc-term" type="range" min="5" max="25" step="1" value="${TERM_YEARS}" data-calc-term>
                </div>
                <div class="range-field">
                  <div class="rf__top">
                    <label for="calc-rate">${esc(c(locale, 'listing.calcRate'))}</label>
                    <output data-calc-rate-out>${(RATE * 100).toFixed(1)}</output>
                  </div>
                  <input id="calc-rate" type="range" min="6" max="18" step="0.1" value="${(RATE * 100).toFixed(1)}" data-calc-rate>
                </div>
                <p class="tiny muted">${esc(c(locale, 'listing.calcDisclaimer'))}</p>
              </div>
              <div class="calc-output">
                <div class="co__row"><span>${esc(c(locale, 'listing.calcPrice'))}</span><strong>${money(listing.salePrice)}</strong></div>
                <div class="co__row"><span>${esc(c(locale, 'listing.calcDeposit'))}</span><strong data-calc-deposit>${money(deposit)}</strong></div>
                <div class="co__row"><span>${esc(c(locale, 'listing.calcLoan'))}</span><strong data-calc-loan>${money(loan)}</strong></div>
                <div class="co__row"><span>${esc(c(locale, 'listing.calcMonthly'))}</span><strong data-calc-monthly>${money(monthly)}</strong></div>
                <div class="co__row"><span>${esc(c(locale, 'listing.calcService'))}</span><strong>${money(listing.monthlyCosts.serviceCharge)}</strong></div>
                <div class="co__row"><span>${esc(c(locale, 'listing.calcInsurance'))}</span><strong>${money(listing.monthlyCosts.insurance)}</strong></div>
                <div class="co__row"><span>${esc(c(locale, 'listing.calcRates'))}</span><strong>${money(listing.monthlyCosts.rates)}</strong></div>
                <div class="co__total">
                  <span>${esc(c(locale, 'listing.calcTotal'))}</span>
                  <strong data-calc-total>${money(totalCosts)}</strong>
                </div>
              </div>
            </div>
          </div>

          <div class="panel panel--paper">
            <h2 style="font-size:1.4rem;margin-top:0">${esc(c(locale, listing.source === 'trixx' ? 'listing.chatWithTeam' : 'listing.chatWithOwner'))}</h2>
            <p class="small muted">${esc(c(locale, 'listing.chatGate'))}</p>
            <div class="chat mt-3" data-chat data-listing="${esc(listing.id)}">
              <div class="chat__log" data-chat-log>
                <div class="bubble bubble--them">
                  ${esc(c(locale, 'listing.chatGreeting'))} ${esc(listing.id)} ${esc(c(locale, 'search.inWord'))} ${esc(listing.location)}. ${listing.source === 'trixx' ? esc(c(locale, 'listing.chatTeamRole')) : `${esc(c(locale, 'listing.chatOwnerRole'))} ${esc(listing.owner.name)}, ${esc(c(locale, 'listing.chatOwnerRole2'))}`} ${esc(c(locale, 'listing.chatAsk'))}
                  <time>09:12</time>
                </div>
              </div>
              <form class="chat__compose" data-chat-form>
                <label class="visually-hidden" for="chat-input">${esc(c(locale, 'listing.chatMessage'))}</label>
                <input id="chat-input" type="text" data-chat-input placeholder="${esc(c(locale, 'listing.chatPlaceholder'))}" autocomplete="off">
                <button class="btn btn--primary btn--sm" type="submit">${esc(c(locale, 'listing.chatSend'))}</button>
              </form>
            </div>
            <p class="tiny muted mt-2">${esc(c(locale, 'listing.chatDemo'))}</p>
          </div>
        </div>

        <aside class="listing-side">
          <div class="panel panel--paper">
            <div class="listing-price">${money(listing.price)}${isRent ? `<small class="mono" style="font-size:0.8rem;color:var(--ink-mute)"> / ${esc(t(locale, 'label.monthly'))}</small>` : ''}</div>
            ${!isRent ? `<p class="small muted" style="margin:0.5rem 0 0">${esc(c(locale, 'listing.mortgageEstimate'))} ${money(monthly)} ${esc(c(locale, 'listing.mortgageEstimate2'))} ${TERM_YEARS} ${esc(c(locale, 'listing.mortgageEstimate3'))} ${Math.round(deposit / listing.salePrice * 100)}% ${esc(c(locale, 'listing.mortgageEstimate4'))}</p>` : ''}
            <div class="cluster mt-3">
              <a class="btn btn--primary btn--block" href="${localePath(`/book-viewing?listing=${listing.id}`, locale)}">${esc(t(locale, 'cta.book'))}</a>
              <a class="btn btn--outline btn--block" href="${localePath('/contact?interest=callback', locale)}">${esc(t(locale, 'cta.callback'))}</a>
              <a class="btn btn--brass btn--block" href="https://wa.me/${esc(SITE.whatsapp.replace(/\D/g, ''))}?text=${encodeURIComponent(`Hello TRIXX, I am interested in ${listing.id} — ${listing.title}`)}">${esc(t(locale, 'cta.whatsapp'))}</a>
            </div>
            <hr>
            <ul class="spec-list">
              <li><span>${esc(c(locale, 'listing.specReference'))}</span><span>${esc(listing.id)}</span></li>
              <li><span>${esc(c(locale, 'listing.specPurpose'))}</span><span>${isRent ? esc(t(locale, 'search.forRent')) : esc(t(locale, 'search.forSale'))}</span></li>
              <li><span>${esc(c(locale, 'listing.specSource'))}</span><span>${listing.source === 'trixx' ? esc(t(locale, 'label.trixxBuilt')) : esc(t(locale, 'label.ownerListed'))}</span></li>
              <li><span>${esc(c(locale, 'listing.specVerified'))}</span><span>${esc(c(locale, listing.verified ? 'listing.yes' : 'listing.pending'))}</span></li>
              <li><span>${esc(c(locale, 'listing.specAvailable'))}</span><span>${formatDate(listing.availableFrom, locale)}</span></li>
            </ul>
          </div>

          <div class="panel panel--paper">
            <div class="owner-card">
              ${art.avatar(listing.agent, { cls: 'avatar-art' })}
              <div>
                <strong style="display:block">${esc(listing.agent)}</strong>
                <span class="tiny muted">${esc(listing.owner.type)} · ${esc(c(locale, 'listing.since'))} ${listing.owner.since}</span>
              </div>
            </div>
            <hr>
            <h3 style="margin-bottom:0.5rem">${esc(c(locale, 'listing.bookViewing'))}</h3>
            <p class="tiny muted">${esc(c(locale, 'listing.viewingHours'))}</p>
            <a class="btn btn--outline btn--block" href="${localePath(`/book-viewing?listing=${listing.id}`, locale)}">${esc(c(locale, 'listing.openCalendar'))}</a>
          </div>

          <div class="panel panel--paper">
            <h3 style="margin-bottom:0.6rem">${esc(c(locale, 'listing.runningCosts'))}</h3>
            <ul class="spec-list">
              <li><span>Service charge</span><span>${money(listing.monthlyCosts.serviceCharge)}</span></li>
              <li><span>Insurance</span><span>${money(listing.monthlyCosts.insurance)}</span></li>
              <li><span>County rates</span><span>${money(listing.monthlyCosts.rates)}</span></li>
              <li><span>${esc(c(locale, 'listing.tierRunningCost'))}</span><span>${money(PACKAGES.find((p) => p.slug === listing.tier).monthlySavings)} ${esc(c(locale, 'listing.savedSuffix'))}</span></li>
            </ul>
            <p class="tiny muted mt-2">${esc(c(locale, 'listing.runningCostsNote'))}</p>
          </div>

          <div class="panel panel--paper">
            <h3 style="margin-bottom:0.6rem">${esc(c(locale, 'listing.compare'))}</h3>
            <p class="tiny muted">${esc(c(locale, 'listing.compareNote'))}</p>
            <div class="cluster">
              <button class="btn btn--outline btn--sm" type="button" data-compare-add="${listing.id}" aria-pressed="false">${esc(t(locale, 'search.compare'))}</button>
              <button class="btn btn--outline btn--sm" type="button" data-fav="${listing.id}" aria-pressed="false">♡ ${esc(t(locale, 'search.favorites'))}</button>
              <button class="btn btn--quiet btn--sm" type="button" data-share>${esc(c(locale, 'listing.share'))}</button>
            </div>
          </div>
        </aside>
      </div>
    </div>
  </section>

  <section class="section bg-paper2 border-y">
    <div class="wrap">
      <div class="section-head section-head--split">
        <div>
          <p class="eyebrow">${esc(c(locale, 'listing.similar'))}</p>
          <h2>${esc(c(locale, 'listing.similarOthers'))}</h2>
        </div>
        <a class="btn btn--outline" href="${localePath('/search', locale)}">${esc(t(locale, 'nav.search'))} →</a>
      </div>
      <div class="grid grid--3">${similar.map((l) => listingCard(l, locale)).join('')}</div>
    </div>
  </section>
`;

  return {
    path: `/listings/${listing.slug}`,
    locale,
    navKey: 'search',
    title: `${listing.title} — ${listing.id} | TRIXX`,
    description: listing.description.slice(0, 300),
    ogType: 'article',
    tourStyle: listing.style,
    mobileBar: `<div class="mobile-bar">
      <a class="btn btn--primary" href="${localePath(`/book-viewing?listing=${listing.id}`, locale)}">${esc(t(locale, 'cta.book'))}</a>
      <a class="btn btn--brass" href="https://wa.me/${esc(SITE.whatsapp.replace(/\D/g, ''))}">${esc(t(locale, 'cta.whatsapp'))}</a>
    </div>`,
    jsonLd: [
      breadcrumbLd([
        { label: 'Home', href: '/' },
        { label: 'Search', href: '/search' },
        { label: listing.location, href: `/search/${slugify(listing.county)}` },
        { label: listing.id, href: `/listings/${listing.slug}` },
      ]),
      {
        '@context': 'https://schema.org',
        '@type': 'RealEstateListing',
        name: listing.title,
        description: listing.description,
        url: `${SITE.url}/listings/${listing.slug}`,
        datePosted: listing.listedAt,
        numberOfBedrooms: listing.bedrooms,
        numberOfBathroomsTotal: listing.bathrooms,
        floorSize: { '@type': 'QuantitativeValue', value: listing.area, unitCode: 'MTK' },
        address: {
          '@type': 'PostalAddress',
          addressLocality: listing.location,
          addressRegion: listing.county,
          addressCountry: 'KE',
        },
        offers: {
          '@type': 'Offer',
          price: listing.price,
          priceCurrency: 'KES',
          availability: 'https://schema.org/InStock',
          businessFunction: isRent ? 'http://purl.org/goodrelations/v1#LeaseOut' : 'http://purl.org/goodrelations/v1#Sell',
        },
      },
    ],
    body,
  };
}

module.exports = () => {
  const pages = [];
  for (const listing of LISTINGS) {
    pages.push(listingPage(listing, 'en'), listingPage(listing, 'sw'));
  }
  return pages;
};
