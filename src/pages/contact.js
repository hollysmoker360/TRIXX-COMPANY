'use strict';

const { esc, money, num } = require('../lib/util');
const { SITE, t } = require('../data/site');
const { c } = require('../data/copy');
const { stylesFor } = require('../data/catalog');
const SITE_IMAGES = require('../lib/site-images');
const { LISTINGS } = require('../data/listings');
const art = require('../lib/art');
const { localePath } = require('../templates/layout');
const { breadcrumbs, breadcrumbLd, statBlock } = require('../templates/components');

function contactPage(locale) {
  const STYLES = stylesFor(locale);
  const body = `
  <section class="section">
    <div class="wrap">
      ${breadcrumbs([{ label: 'Home', href: '/' }, { label: c(locale, 'contact.eyebrow') }], locale)}
      <div class="section-head">
        <p class="eyebrow">${esc(c(locale, 'contact.eyebrow'))}</p>
        <h1>${esc(c(locale, 'contact.title'))}</h1>
        <p class="lede">${esc(c(locale, 'contact.lede'))}</p>
      </div>

      <div class="grid grid--sidebar grid--sidebar--right">
        <div class="stack" style="--stack-gap:1.5rem">
          <form class="panel panel--paper" data-form="contact" novalidate>
            <h2 style="font-size:1.4rem;margin-top:0">${esc(c(locale, 'contact.formTitle'))}</h2>
            <div class="form-grid">
              <div class="field">
                <label for="c-name">${esc(t(locale, 'form.name'))}</label>
                <input id="c-name" type="text" name="name" autocomplete="name" required>
              </div>
              <div class="field">
                <label for="c-phone">${esc(t(locale, 'form.phone'))}</label>
                <input id="c-phone" type="tel" name="phone" autocomplete="tel" required>
              </div>
            </div>
            <div class="field">
              <label for="c-email">${esc(t(locale, 'form.email'))}</label>
              <input id="c-email" type="email" name="email" autocomplete="email" required>
            </div>
            <div class="field">
              <label for="c-interest">I am asking about</label>
              <select id="c-interest" name="interest">
                <option value="buy">Buying a home</option>
                <option value="rent">Renting a home</option>
                <option value="build">Building a home</option>
                <option value="farm">Farm solutions</option>
                <option value="list">Listing my property</option>
                <option value="tenant">A tenancy or repair</option>
                <option value="callback">Requesting a callback</option>
                <option value="press">Press or partnership</option>
              </select>
            </div>
            <div class="field">
              <label for="c-message">${esc(t(locale, 'form.message'))}</label>
              <textarea id="c-message" name="message" placeholder="Tell us what you need, and the best time to reach you." required></textarea>
            </div>
            <div class="field field--row">
              <input id="c-consent" type="checkbox" name="consent" required>
              <label for="c-consent" style="text-transform:none;letter-spacing:0;font-family:var(--text);font-size:0.88rem;color:var(--ink)">I agree to TRIXX storing these details to answer my enquiry, as described in the <a href="${localePath('/legal/privacy', locale)}">privacy policy</a>.</label>
            </div>
            <button class="btn btn--primary btn--lg" type="submit">${esc(t(locale, 'form.send'))}</button>
            <p class="tiny muted mt-2" data-form-msg hidden></p>
          </form>

          <div class="panel panel--paper">
            <h2 style="font-size:1.4rem;margin-top:0">${esc(c(locale, 'contact.callbackTitle'))}</h2>
            <p class="small muted">Prefer to talk? Give us a number and a window and we will call you. No automated call queues.</p>
            <form class="mt-3" data-form="callback" novalidate>
              <div class="form-grid">
                <div class="field">
                  <label for="cb-name">Name</label>
                  <input id="cb-name" type="text" name="name" required>
                </div>
                <div class="field">
                  <label for="cb-phone">Phone</label>
                  <input id="cb-phone" type="tel" name="phone" required>
                </div>
                <div class="field">
                  <label for="cb-when">Best time</label>
                  <select id="cb-when" name="when">
                    <option>Morning (08:30–12:00)</option>
                    <option>Afternoon (12:00–17:30)</option>
                    <option>Evening (17:30–19:00)</option>
                    <option>Saturday morning</option>
                  </select>
                </div>
              </div>
              <button class="btn btn--outline" type="submit">${esc(t(locale, 'cta.callback'))}</button>
              <p class="tiny muted mt-2" data-form-msg hidden></p>
            </form>
          </div>
        </div>

        <aside class="stack" style="--stack-gap:1.25rem">
          <div class="panel panel--ink">
            <h3 style="margin-top:0">Talk to a person now</h3>
            <p class="small" style="color:rgba(244,237,224,0.72)">Call, or start a WhatsApp chat. Both reach the same support team.</p>
            <div class="cluster mt-3">
              <a class="btn btn--brass btn--block" href="tel:${esc(SITE.phone.replace(/\s/g, ''))}">${esc(SITE.phone)}</a>
              <a class="btn btn--outline btn--block" style="border-color:rgba(244,237,224,0.35);color:var(--paper)" href="https://wa.me/${esc(SITE.whatsapp.replace(/\D/g, ''))}">${esc(t(locale, 'cta.whatsapp'))}</a>
            </div>
          </div>

          <div class="panel panel--paper">
            <h3 style="margin-top:0">${esc(c(locale, 'contact.officeTitle'))}</h3>
            <p class="small muted">
              ${esc(SITE.address.line1)}<br>
              ${esc(SITE.address.line2)}<br>
              ${esc(SITE.address.city)} ${esc(SITE.address.postcode)}<br>
              ${esc(SITE.address.country)}
            </p>
            <ul class="spec-list mt-3">
              <li><span>${esc(c(locale, 'contact.hours'))}</span><span>${esc(SITE.hours)}</span></li>
              <li><span>General</span><span><a href="mailto:${esc(SITE.email)}">${esc(SITE.email)}</a></span></li>
              <li><span>Sales</span><span><a href="mailto:${esc(SITE.sales)}">${esc(SITE.sales)}</a></span></li>
              <li><span>Listings</span><span><a href="mailto:listings@trixx.co.ke">listings@trixx.co.ke</a></span></li>
              <li><span>Support</span><span><a href="mailto:support@trixx.co.ke">support@trixx.co.ke</a></span></li>
              <li><span>Privacy</span><span><a href="mailto:privacy@trixx.co.ke">privacy@trixx.co.ke</a></span></li>
              <li><span>Security</span><span><a href="mailto:security@trixx.co.ke">security@trixx.co.ke</a></span></li>
            </ul>
          </div>

          <figure class="brand-material-card">
            <img src="${SITE_IMAGES.regionalLandscape}" alt="Illustrative regional landscape concept; not a photograph of the TRIXX office" loading="lazy" decoding="async">
            <figcaption>${locale === 'sw' ? 'Mandhari ya eneo kwa dhana' : 'Regional concept image'}</figcaption>
          </figure>

          <div class="panel panel--paper">
            <h3 style="margin-top:0">${esc(c(locale, 'contact.followTitle'))}</h3>
            <ul class="spec-list">
              ${SITE.social.map((s) => `<li><span>${esc(s.label)}</span><span><a href="${esc(s.href)}" rel="noopener">${esc(s.handle)}</a></span></li>`).join('')}
            </ul>
          </div>
        </aside>
      </div>
    </div>
  </section>

  <section class="section bg-paper2 border-y">
    <div class="wrap">
      <div class="section-head">
        <p class="eyebrow">Visit a show home</p>
        <h2>See the specification in person</h2>
        <p class="lede">Two show homes are open for viewing: a Swahili Coastal build in Kilifi and a Contemporary build in Athi River. Book a slot and we will meet you there.</p>
      </div>
      <div class="grid grid--2">
        ${STYLES.slice(0, 2).map((style) => `<article class="card">
          <div class="card__media">${art.houseRender(style.slug, { label: `${style.name} show home`, seed: `show-${style.slug}` })}</div>
          <div class="card__body">
            <span class="badge badge--teal">Show home</span>
            <h3 class="card__title" style="margin-top:0.5rem">${esc(style.name)}</h3>
            <p class="small muted" style="margin:0">${esc(style.tagline)}</p>
            <div class="card__foot">
              <span class="mono tiny">${esc(style.locations[0])}</span>
              <a class="btn btn--outline btn--sm" href="${localePath(`/book-viewing?style=${style.slug}`, locale)}">${esc(t(locale, 'cta.book'))}</a>
            </div>
          </div>
        </article>`).join('')}
      </div>
      <div class="grid grid--4 mt-4">
        ${statBlock({ value: '< 1 day', label: 'Reply time' })}
        ${statBlock({ value: '7 days', label: 'Viewings per week' })}
        ${statBlock({ value: '2', label: 'Show homes' })}
        ${statBlock({ value: '0800', label: 'Support line hours' })}
      </div>
    </div>
  </section>
`;

  return {
    path: '/contact',
    locale,
    navKey: 'about',
    title: `${c(locale, 'contact.title')} | TRIXX`,
    description: locale === 'sw'
      ? `Wasiliana na TRIXX: ${SITE.phone}, ${SITE.email}. Ofisi ziko ${SITE.address.line1}, ${SITE.address.city}. Omba kupigiwa simu au anza mazungumzo ya WhatsApp.`
      : `Contact TRIXX: ${SITE.phone}, ${SITE.email}. Office in ${SITE.address.line1}, ${SITE.address.city}. Request a callback or start a WhatsApp chat.`,
    jsonLd: [
      breadcrumbLd([{ label: 'Home', href: '/' }, { label: 'Contact', href: '/contact' }]),
      {
        '@context': 'https://schema.org',
        '@type': 'ContactPage',
        name: 'Contact TRIXX',
        mainEntity: {
          '@type': 'Organization',
          name: SITE.legalName,
          telephone: SITE.phone,
          email: SITE.email,
          address: {
            '@type': 'PostalAddress',
            streetAddress: `${SITE.address.line1}, ${SITE.address.line2}`,
            addressLocality: SITE.address.city,
            postalCode: SITE.address.postcode,
            addressCountry: SITE.address.countryCode,
          },
          openingHours: SITE.hours,
        },
      },
    ],
    body,
  };
}

module.exports = () => [contactPage('en'), contactPage('sw')];
