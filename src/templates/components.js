'use strict';

const { esc, money, moneyFull, num, slugify, formatDate } = require('../lib/util');
const { t } = require('../data/site');
const { c } = require('../data/copy');
const { STYLES, PACKAGES, stylesFor } = require('../data/catalog');
const art = require('../lib/art');
const SITE_IMAGES = require('../lib/site-images');
const { localePath } = require('./layout');

const TIER_LABEL = { basic: 'Basic', comfort: 'Comfort', premium: 'Premium' };

function styleName(slug, locale) {
  const s = stylesFor(locale).find((x) => x.slug === slug);
  return s ? s.name : slug;
}

function styleOf(slug) {
  return STYLES.find((x) => x.slug === slug);
}

function badges(listing, locale) {
  const out = [];
  if (listing.source === 'trixx') out.push(`<span class="badge badge--trixx">${esc(t(locale, 'label.trixxBuilt'))}</span>`);
  else out.push(`<span class="badge badge--owner">${esc(t(locale, 'label.ownerListed'))}</span>`);
  if (listing.verified) out.push(`<span class="badge badge--verified">✓ ${esc(t(locale, 'label.verified'))}</span>`);
  return out.join('');
}

/* Property card. `variant` controls the media treatment. */
function listingCard(listing, locale, opts = {}) {
  const price = listing.purpose === 'rent'
    ? `${money(listing.price)}<small> / ${esc(t(locale, 'label.monthly'))}</small>`
    : money(listing.price);

  return `<article class="card" data-listing-card="${listing.id}" data-purpose="${listing.purpose}" data-style="${listing.style}" data-tier="${listing.tier}" data-county="${esc(listing.county)}" data-price="${listing.price}" data-bedrooms="${listing.bedrooms}" data-source="${listing.source}">
  <div class="card__media${opts.tall ? ' card__media--tall' : ''}">
    <div class="card__flags">${badges(listing, locale)}</div>
    ${art.houseRender(listing.style, { label: `${listing.title} exterior render`, seed: listing.id })}
  </div>
  <div class="card__body">
    <div class="card__meta">
      <span>${esc(listing.location)}, ${esc(listing.county)}</span>
      <span>${esc(styleName(listing.style, locale))}</span>
    </div>
    <h3 class="card__title"><a href="${localePath(`/listings/${listing.slug}`, locale)}">${esc(listing.title)}</a></h3>
    <div class="card__price">${price}</div>
    <div class="card__meta">
      <span>${listing.bedrooms} bd</span>
      <span>${listing.bathrooms} ba</span>
      <span>${num(listing.area)} m²</span>
      <span>${esc(TIER_LABEL[listing.tier])} tier</span>
    </div>
    <div class="card__foot">
      <span class="tiny muted mono">${esc(listing.id)}</span>
      <span class="cluster" style="gap:0.4rem">
        <a class="btn btn--outline btn--sm" href="${localePath(`/listings/${listing.slug}`, locale)}">View</a>
        <button class="btn btn--quiet btn--sm" type="button" data-compare-add="${listing.id}" aria-pressed="false">${esc(t(locale, 'search.compare'))}</button>
        <button class="btn btn--quiet btn--sm" type="button" data-fav="${listing.id}" aria-pressed="false" aria-label="Save to favorites">♡</button>
      </span>
    </div>
  </div>
</article>`;
}

function styleCard(style, locale) {
  const swatches = style.colors.map((c) => `<i style="background:${c}"></i>`).join('');
  const image = SITE_IMAGES.architecture[style.slug];
  return `<article class="card style-card">
  <div class="card__media">
    ${image
    ? `<img class="site-photo" src="${image}" alt="${esc(style.name)} architectural concept image" loading="lazy" decoding="async"><span class="concept-image-label">${locale === 'sw' ? 'Picha ya dhana' : 'Concept image'}</span>`
    : art.houseRender(style.slug, { label: `${style.name} home render`, seed: style.slug })}
  </div>
  <div class="card__body">
    <div class="cluster cluster--between">
      <span class="style-card__swatch" aria-hidden="true">${swatches}</span>
      <span class="style-card__price mono tiny">${style.bedrooms.join(' · ')} ${esc(c(locale, 'label.bedShort'))}</span>
    </div>
    <h3 class="card__title"><a href="${localePath(`/house-collections/${style.slug}`, locale)}">${esc(style.name)}</a></h3>
    <p class="small muted" style="margin:0">${esc(style.tagline)}</p>
    <div class="card__foot">
      <span class="mono tiny">${esc(t(locale, 'label.from'))} ${money(style.priceFrom)}</span>
      <a class="btn btn--outline btn--sm" href="${localePath(`/house-collections/${style.slug}`, locale)}">${esc(t(locale, 'cta.explore'))}</a>
    </div>
  </div>
</article>`;
}

function packageCard(pkg, locale) {
  const groups = pkg.groups.map((g) => `<div class="pkg-card__group">
    <h3>${esc(g.title)}</h3>
    <ul>${g.items.map((i) => `<li>${esc(i)}</li>`).join('')}</ul>
  </div>`).join('');

  const excluded = pkg.notIncluded.length
    ? `<div class="pkg-card__group">
        <h3>${esc(c(locale, 'packages.notIncluded'))}</h3>
        <ul>${pkg.notIncluded.map((i) => `<li style="opacity:0.6"><span>—</span>${esc(i)}</li>`).join('')}</ul>
      </div>`
    : '';

  return `<article class="pkg-card${pkg.popular ? ' pkg-card--featured' : ''}">
  <div class="pkg-card__head">
    <div class="cluster cluster--between">
      <h3 style="margin:0">${esc(pkg.name)}</h3>
      ${pkg.popular ? `<span class="badge badge--teal">${esc(c(locale, 'packages.mostChosen'))}</span>` : ''}
    </div>
    <div class="pkg-card__price mt-2">${money(pkg.price)}</div>
    <p class="small muted" style="margin:0.5rem 0 0">${esc(pkg.summary)}</p>
    <ul class="spec-list mt-2">
      <li><span>${esc(c(locale, 'packages.devices'))}</span><span>${pkg.devices}</span></li>
      <li><span>${esc(c(locale, 'packages.install'))}</span><span>${pkg.installDays} ${esc(c(locale, 'packages.days'))}</span></li>
      <li><span>${esc(c(locale, 'packages.powerSaving'))}</span><span>${pkg.powerSavingPct}%</span></li>
      <li><span>${esc(c(locale, 'packages.waterSaving'))}</span><span>${pkg.waterSavingPct}%</span></li>
    </ul>
  </div>
  <div class="pkg-card__body">
    ${groups}
    ${excluded}
  </div>
  <div class="card__body" style="padding-top:0">
    <a class="btn btn--primary btn--block" href="${localePath(`/tools/configurator?tier=${pkg.slug}`, locale)}">${esc(t(locale, 'cta.configure'))}</a>
  </div>
</article>`;
}

function statBlock(stat) {
  return `<div class="stat">
    <span class="stat__value">${esc(stat.value)}</span>
    <span class="stat__label">${esc(stat.label)}</span>
  </div>`;
}

function testimonialCard(item) {
  const stars = '★'.repeat(item.rating) + '☆'.repeat(5 - item.rating);
  return `<figure class="quote-card">
    <span class="stars" aria-label="${item.rating} out of 5">${stars}</span>
    <blockquote>“${esc(item.quote)}”</blockquote>
    <figcaption>
      ${art.avatar(item.name)}
      <span>
        <strong style="display:block;font-size:0.9rem">${esc(item.name)}</strong>
        <span class="tiny muted">${esc(item.role)}</span>
      </span>
    </figcaption>
  </figure>`;
}

function postCard(post, locale) {
  const style = styleOf(post.style);
  return `<article class="card">
    <div class="card__media">
      ${art.houseRender(post.style, { label: post.title, seed: post.slug })}
    </div>
    <div class="card__body">
      <div class="post-card__meta">
        <span>${esc(post.category)}</span>
        <span>${formatDate(post.date, locale)}</span>
      </div>
      <h3 class="card__title"><a href="${localePath(`/blog/${post.slug}`, locale)}">${esc(post.title)}</a></h3>
      <p class="small muted" style="margin:0">${esc(post.excerpt)}</p>
      <div class="card__foot">
        <span class="tiny mono">${esc(post.author)}</span>
        <a class="btn btn--outline btn--sm" href="${localePath(`/blog/${post.slug}`, locale)}">Read</a>
      </div>
    </div>
  </article>`;
}

function storeButtons(app) {
  const android = `https://play.google.com/store/apps/details?id=ke.co.trixx.${app.slug}`;
  const ios = `https://apps.apple.com/ke/app/trixx-${app.slug}/id0000000000`;
  return `<div class="store-btns">
    <a class="store-btn" href="${android}" rel="noopener">
      <span aria-hidden="true">▶</span>
      <span><small>Get it on</small><b>Google Play</b></span>
    </a>
    <a class="store-btn" href="${ios}" rel="noopener">
      <span aria-hidden="true"></span>
      <span><small>Download on the</small><b>App Store</b></span>
    </a>
  </div>`;
}

/* Collapse whitespace in generated SVG before it is written to a data file.
   The markup is machine-generated, so dropping the server-side indentation is
   safe and roughly halves the byte count. */
function minifySvg(svg) {
  return String(svg)
    .replace(/>\s+</g, '><')
    .replace(/\s{2,}/g, ' ')
    .trim();
}

/* Tour frames are large (eight angles per style), so they ship as separate
   lazily-loaded scripts rather than inline. The viewer injects one only when
   a tour is actually opened. */
function tourAssetPath(style) {
  return `/assets/data/tour-${style}.js`;
}

function breadcrumbs(trail, locale) {
  const items = trail.map((item, i) => {
    const last = i === trail.length - 1;
    const label = esc(item.label);
    return last
      ? `<span aria-current="page">${label}</span>`
      : `<a href="${localePath(item.href, locale)}">${label}</a>`;
  }).join('<span aria-hidden="true"> / </span>');

  return `<nav class="tiny mono" aria-label="Breadcrumb" style="margin-bottom:1.5rem;color:var(--ink-mute)">${items}</nav>`;
}

function breadcrumbLd(trail) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: trail.map((item, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: item.label,
      item: `https://trixx.co.ke${item.href}`,
    })),
  };
}

function progressTracker(phases) {
  return `<div class="tracker">${phases.map((p, i) => `<div class="tracker__step" data-done="${!!p.done}" data-active="${!!p.active}">
    <span class="tracker__dot">${p.done ? '✓' : String(i + 1).padStart(2, '0')}</span>
    <span>
      <span class="tracker__name">${esc(p.name)}</span>
      ${p.partial ? '<span class="tracker__note">Partly complete</span>' : ''}
      ${p.active && !p.done ? '<span class="tracker__note">In progress now</span>' : ''}
    </span>
  </div>`).join('')}</div>`;
}

function timeline(items) {
  return `<div>${items.map((item) => `<div class="timeline-item">
    <time datetime="${esc(item.date)}">${formatDate(item.date)}</time>
    <span>${esc(item.note)}</span>
  </div>`).join('')}</div>`;
}

module.exports = {
  TIER_LABEL, styleName, styleOf, badges, listingCard, styleCard, packageCard,
  statBlock, testimonialCard, postCard, storeButtons, breadcrumbs,
  breadcrumbLd, progressTracker, timeline, minifySvg, tourAssetPath,
};
