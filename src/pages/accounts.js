'use strict';

const { esc, money, num, formatDate } = require('../lib/util');
const { SITE, t } = require('../data/site');
const { c } = require('../data/copy');
const { packagesFor, appsFor } = require('../data/catalog');
const { LISTINGS } = require('../data/listings');
const art = require('../lib/art');
const { localePath } = require('../templates/layout');
const { breadcrumbs, breadcrumbLd, statBlock, storeButtons } = require('../templates/components');

/* Owner subscription plans. Listing is free for thirty days, then a monthly
   plan applies. There is no commission on a sale. */
const OWNER_PLANS = [
  {
    slug: 'standard',
    name: 'Standard',
    price: 1500,
    listings: 1,
    features: ['1 live listing', 'Photo, video and 360 tour', 'Chat with enquiries in the app', 'Monthly performance summary', 'Verified badge after inspection'],
  },
  {
    slug: 'portfolio',
    name: 'Portfolio',
    price: 4500,
    listings: 5,
    popular: true,
    features: ['Up to 5 live listings', 'Everything in Standard', 'Saved-search matching alerts', 'Lead inbox with pipeline stages', 'Priority listing review'],
  },
  {
    slug: 'agency',
    name: 'Agency',
    price: 12000,
    listings: 'Unlimited',
    features: ['Unlimited listings', 'Everything in Portfolio', 'Team accounts and role permissions', 'Bulk listing import', 'Dedicated account manager', 'Monthly billing by invoice'],
  },
];

const VIEWING_SLOTS = ['09:00', '10:00', '11:00', '13:00', '14:00', '15:00', '16:00'];

function loginPage(locale) {
  const APPS = appsFor(locale);
  const PACKAGES = packagesFor(locale);
  const body = `
  <section class="section">
    <div class="wrap wrap--narrow">
      ${breadcrumbs([{ label: 'Home', href: '/' }, { label: t(locale, 'cta.login') }], locale)}
      <div class="section-head">
        <p class="eyebrow">${esc(t(locale, 'cta.login'))}</p>
        <h1>${esc(c(locale, 'accounts.loginTitle'))}</h1>
        <p class="lede">${esc(c(locale, 'accounts.loginNote'))}</p>
      </div>

      <div class="grid grid--2">
        <form class="panel panel--paper" data-form="login" novalidate>
          <div class="field">
            <label for="login-email">${esc(t(locale, 'form.email'))}</label>
            <input id="login-email" type="email" name="email" autocomplete="email" required>
          </div>
          <div class="field">
            <label for="login-pass">Password</label>
            <input id="login-pass" type="password" name="password" autocomplete="current-password" required>
          </div>
          <div class="field field--row">
            <input id="login-remember" type="checkbox" name="remember" checked>
            <label for="login-remember" style="text-transform:none;letter-spacing:0;font-family:var(--text);font-size:0.88rem;color:var(--ink)">Keep me signed in</label>
          </div>
          <button class="btn btn--primary btn--block" type="submit">${esc(t(locale, 'cta.login'))}</button>
          <p class="small mt-2">No account yet? <a href="${localePath('/register', locale)}">${esc(t(locale, 'cta.register'))}</a></p>
          <p class="tiny muted" data-form-msg hidden></p>
        </form>

        <div class="stack" style="--stack-gap:1rem">
          <div class="panel panel--paper">
            <h3 style="margin-top:0">One account, five apps</h3>
            <p class="small muted">This login is the same one used in every TRIXX app. Sign in here and your tenancy, listings and devices follow.</p>
            <ul class="spec-list mt-2">
              ${APPS.map((a) => `<li><span>${esc(a.name)}</span><span class="muted tiny">${esc(a.platforms[0])}</span></li>`).join('')}
            </ul>
          </div>
          <div class="panel panel--ink">
            <h3 style="margin-top:0">Tenant or owner?</h3>
            <p class="small" style="color:rgba(244,237,224,0.72)">Tenants go straight to the portal. Owners get the dashboard with listings, enquiries and billing.</p>
            <div class="cluster mt-3">
              <a class="btn btn--brass btn--sm" href="${localePath('/tenant', locale)}">${esc(t(locale, 'nav.tenant'))}</a>
              <a class="btn btn--outline btn--sm" style="border-color:rgba(244,237,224,0.35);color:var(--paper)" href="${localePath('/owner/dashboard', locale)}">${esc(t(locale, 'nav.owner'))}</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>

  <section class="section bg-paper2 border-y">
    <div class="wrap">
      <div class="section-head">
        <p class="eyebrow">Security</p>
        <h2>How we protect the account</h2>
      </div>
      <div class="grid grid--3">
        <div class="panel panel--paper">
          <h3>Two-factor on request</h3>
          <p class="small muted">Enable an authenticator app or an SMS code for any account that manages property or devices.</p>
        </div>
        <div class="panel panel--paper">
          <h3>Session control</h3>
          <p class="small muted">See every device signed in to your account and end any session you do not recognise.</p>
        </div>
        <div class="panel panel--paper">
          <h3>Data you control</h3>
          <p class="small muted">Export your records or delete the account at any time. <a href="${localePath('/legal/device-data', locale)}">See the device data note</a>.</p>
        </div>
      </div>
    </div>
  </section>
`;

  return {
    path: '/login',
    locale,
    navKey: 'accounts',
    title: `${t(locale, 'cta.login')} — one TRIXX account for the site and all five apps`,
    description: 'Sign in to your TRIXX account. The same login covers the website, TRIXX Home, Farm, Rent, Market and School.',
    noindex: true,
    jsonLd: breadcrumbLd([{ label: 'Home', href: '/' }, { label: 'Log in', href: '/login' }]),
    body,
  };
}

function registerPage(locale) {
  const APPS = appsFor(locale);
  const PACKAGES = packagesFor(locale);
  const body = `
  <section class="section">
    <div class="wrap">
      ${breadcrumbs([{ label: 'Home', href: '/' }, { label: t(locale, 'cta.register') }], locale)}
      <div class="section-head">
        <p class="eyebrow">${esc(t(locale, 'cta.register'))}</p>
        <h1>${esc(c(locale, 'accounts.registerTitle'))}</h1>
        <p class="lede">${esc(c(locale, 'accounts.registerNote'))}</p>
      </div>

      <div class="grid grid--sidebar grid--sidebar--right">
        <form class="panel panel--paper" data-form="register" novalidate>
          <div class="form-grid">
            <div class="field">
              <label for="r-first">First name</label>
              <input id="r-first" type="text" name="first" autocomplete="given-name" required>
            </div>
            <div class="field">
              <label for="r-last">Last name</label>
              <input id="r-last" type="text" name="last" autocomplete="family-name" required>
            </div>
          </div>
          <div class="field">
            <label for="r-email">${esc(t(locale, 'form.email'))}</label>
            <input id="r-email" type="email" name="email" autocomplete="email" required>
          </div>
          <div class="field">
            <label for="r-phone">${esc(t(locale, 'form.phone'))}</label>
            <input id="r-phone" type="tel" name="phone" autocomplete="tel" placeholder="+254 7xx xxx xxx" required>
            <span class="field__hint">Used for viewing confirmations and, if you are a tenant, rent reminders.</span>
          </div>
          <div class="field">
            <label for="r-role">I am here as</label>
            <select id="r-role" name="role">
              <option value="buyer">A buyer or renter looking for a home</option>
              <option value="owner">An owner listing a property</option>
              <option value="tenant">A tenant managing a tenancy</option>
              <option value="investor">An investor or developer</option>
            </select>
          </div>
          <div class="field">
            <label for="r-pass">Password</label>
            <input id="r-pass" type="password" name="password" autocomplete="new-password" minlength="10" required>
            <span class="field__hint">At least 10 characters. A passphrase of four unrelated words is stronger than a short password with symbols.</span>
          </div>
          <div class="field field--row">
            <input id="r-terms" type="checkbox" name="terms" required>
            <label for="r-terms" style="text-transform:none;letter-spacing:0;font-family:var(--text);font-size:0.88rem;color:var(--ink)">I agree to the <a href="${localePath('/legal/terms', locale)}">terms</a> and the <a href="${localePath('/legal/privacy', locale)}">privacy policy</a>.</label>
          </div>
          <div class="field field--row">
            <input id="r-marketing" type="checkbox" name="marketing">
            <label for="r-marketing" style="text-transform:none;letter-spacing:0;font-family:var(--text);font-size:0.88rem;color:var(--ink)">Send me new listings and farm tips once a month.</label>
          </div>
          <button class="btn btn--primary btn--lg btn--block" type="submit">${esc(t(locale, 'cta.register'))}</button>
          <p class="tiny muted mt-2" data-form-msg hidden></p>
        </form>

        <aside class="stack" style="--stack-gap:1rem">
          <div class="panel panel--ink">
            <h3 style="margin-top:0">What you get immediately</h3>
            <ul style="list-style:none;padding:0;font-size:0.9rem">
              ${[
                'Saved searches and favorites that sync to the app',
                'Chat with owners and agents on any listing',
                'Viewing calendar with email and SMS confirmation',
                'A tenant portal if you rent a TRIXX-managed home',
                'A user account already active in Rent and Market',
              ].map((f) => `<li style="display:flex;gap:0.6rem;padding:0.45rem 0;border-bottom:1px solid rgba(244,237,224,0.15)"><span style="color:var(--brass-light)">✓</span><span>${esc(f)}</span></li>`).join('')}
            </ul>
          </div>
          <div class="panel panel--paper">
            <h3 style="margin-bottom:0.5rem">Already registered?</h3>
            <p class="small muted">If you have ever used a TRIXX app, your account already exists. Use the same email to sign in here.</p>
            <a class="btn btn--outline btn--block mt-2" href="${localePath('/login', locale)}">${esc(t(locale, 'cta.login'))}</a>
          </div>
          <div class="panel panel--paper">
            <h3 style="margin-bottom:0.5rem">Get the apps</h3>
            ${storeButtons({ slug: 'home' })}
          </div>
        </aside>
      </div>
    </div>
  </section>
`;

  return {
    path: '/register',
    locale,
    navKey: 'accounts',
    title: `Create a free TRIXX account — one login for the site and all five apps`,
    description: 'Register once and you are already a user in TRIXX Rent and Market. Save searches, chat with owners, book viewings and manage a tenancy.',
    jsonLd: breadcrumbLd([{ label: 'Home', href: '/' }, { label: 'Create account', href: '/register' }]),
    body,
  };
}

function bookViewingPage(locale) {
  const APPS = appsFor(locale);
  const PACKAGES = packagesFor(locale);
  const featured = LISTINGS.slice(0, 6);

  const body = `
  <section class="section">
    <div class="wrap">
      ${breadcrumbs([{ label: 'Home', href: '/' }, { label: c(locale, 'accounts.bookTitle') }], locale)}
      <div class="section-head">
        <p class="eyebrow">${esc(c(locale, 'accounts.bookTitle'))}</p>
        <h1>${esc(c(locale, 'accounts.bookTitle'))}</h1>
        <p class="lede">${esc(c(locale, 'accounts.bookNote'))}</p>
      </div>

      <form class="grid grid--sidebar grid--sidebar--right" data-form="viewing" novalidate>
        <div class="stack" style="--stack-gap:1.25rem">
          <div class="calendar" data-calendar>
            <div class="calendar__head">
              <button class="btn btn--quiet btn--sm" type="button" data-calendar-prev aria-label="Previous month">←</button>
              <strong data-calendar-title>—</strong>
              <button class="btn btn--quiet btn--sm" type="button" data-calendar-next aria-label="Next month">→</button>
            </div>
            <div class="calendar__grid" data-calendar-grid></div>
          </div>

          <div>
            <h3 style="font-size:1.15rem">Available times</h3>
            <div class="slot-row" data-slot-row></div>
          </div>

          <div class="panel panel--paper">
            <h3 style="font-size:1.15rem;margin-top:0">Your details</h3>
            <div class="form-grid">
              <div class="field">
                <label for="v-name">${esc(t(locale, 'form.name'))}</label>
                <input id="v-name" type="text" name="name" autocomplete="name" required>
              </div>
              <div class="field">
                <label for="v-phone">${esc(t(locale, 'form.phone'))}</label>
                <input id="v-phone" type="tel" name="phone" autocomplete="tel" required>
              </div>
            </div>
            <div class="field">
              <label for="v-email">${esc(t(locale, 'form.email'))}</label>
              <input id="v-email" type="email" name="email" autocomplete="email" required>
            </div>
            <div class="field">
              <label for="v-property">Property</label>
              <select id="v-property" name="property">
                <option value="">Show me whatever fits my budget</option>
                ${featured.map((l) => `<option value="${l.id}">${esc(l.id)} — ${esc(l.title)}</option>`).join('')}
              </select>
            </div>
            <div class="field">
              <label for="v-notes">Anything we should know</label>
              <textarea id="v-notes" name="notes" placeholder="Access requirements, preferred language, who is coming with you…"></textarea>
            </div>
            <input type="hidden" name="slot" data-booking-value>
            <p class="small muted" data-booking-summary>No date selected yet.</p>
            <button class="btn btn--primary btn--lg btn--block mt-2" type="submit">${esc(t(locale, 'cta.book'))}</button>
            <p class="tiny muted mt-2" data-form-msg hidden></p>
          </div>
        </div>

        <aside class="stack" style="--stack-gap:1rem">
          <div class="panel panel--paper">
            <h3 style="margin-top:0">Prefer to talk?</h3>
            <p class="small muted">Request a callback and we will call you at a time that suits, or start a WhatsApp chat right now.</p>
            <div class="cluster mt-3">
              <a class="btn btn--primary btn--block" href="${localePath('/contact?interest=callback', locale)}">${esc(t(locale, 'cta.callback'))}</a>
              <a class="btn btn--brass btn--block" href="https://wa.me/${esc(SITE.whatsapp.replace(/\D/g, ''))}">${esc(t(locale, 'cta.whatsapp'))}</a>
            </div>
          </div>
          <div class="panel panel--paper">
            <h3 style="margin-bottom:0.5rem">What happens next</h3>
            <ol style="padding-left:1.1rem;font-size:0.88rem;margin:0">
              <li>We confirm the slot by email and SMS within one working hour.</li>
              <li>You get the full address, the agent's name and a contact number.</li>
              <li>Bring photo ID if you intend to make an offer the same day.</li>
              <li>After the viewing we send a written summary with the costs.</li>
            </ol>
          </div>
          <div class="panel panel--paper">
            <h3 style="margin-bottom:0.5rem">${esc(t(locale, 'contact.hours'))}</h3>
            <p class="small muted" style="margin:0">${esc(SITE.hours)}<br>Viewings run seven days a week, ${VIEWING_SLOTS[0]} to ${VIEWING_SLOTS[VIEWING_SLOTS.length - 1]}.</p>
          </div>
        </aside>
      </form>
    </div>
  </section>

  <section class="section bg-paper2 border-y">
    <div class="wrap">
      <div class="section-head">
        <p class="eyebrow">Or start from a home</p>
        <h2>Popular properties to view this week</h2>
      </div>
      <div class="grid grid--3">
        ${featured.slice(0, 3).map((l) => `<article class="card">
          <div class="card__media">${art.houseRender(l.style, { label: l.title, seed: l.id })}</div>
          <div class="card__body">
            <h3 class="card__title" style="font-size:1.05rem"><a href="${localePath(`/listings/${l.slug}`, locale)}">${esc(l.title)}</a></h3>
            <div class="card__price">${money(l.price)}</div>
            <div class="card__foot">
              <span class="mono tiny">${esc(l.id)}</span>
              <a class="btn btn--outline btn--sm" href="${localePath(`/book-viewing?listing=${l.id}`, locale)}">${esc(t(locale, 'cta.book'))}</a>
            </div>
          </div>
        </article>`).join('')}
      </div>
    </div>
  </section>
`;

  return {
    path: '/book-viewing',
    locale,
    navKey: 'accounts',
    title: `${c(locale, 'accounts.bookTitle')} — pick a date and time | TRIXX`,
    description: 'Book a property viewing with TRIXX. Choose a date and a time slot on the calendar, or request a callback or a WhatsApp chat instead.',
    jsonLd: breadcrumbLd([{ label: 'Home', href: '/' }, { label: 'Book a viewing', href: '/book-viewing' }]),
    body,
  };
}

function listPropertyPage(locale) {
  const APPS = appsFor(locale);
  const PACKAGES = packagesFor(locale);
  const body = `
  <section class="section">
    <div class="wrap">
      ${breadcrumbs([{ label: 'Home', href: '/' }, { label: c(locale, 'accounts.listTitle') }], locale)}
      <div class="section-head">
        <p class="eyebrow">${esc(c(locale, 'accounts.listTitle'))}</p>
        <h1>${esc(c(locale, 'accounts.listTitle'))}</h1>
        <p class="lede">${esc(c(locale, 'accounts.listNote'))}</p>
      </div>

      <div class="grid grid--4 mb-4">
        ${statBlock({ value: '30 days', label: c(locale, 'listing.statFreePeriod') })}
        ${statBlock({ value: '0%', label: c(locale, 'listing.statCommission') })}
        ${statBlock({ value: '23 days', label: c(locale, 'listing.statMedian') })}
        ${statBlock({ value: '100%', label: c(locale, 'listing.statVerified') })}
      </div>

      <div class="grid grid--3">
        ${OWNER_PLANS.map((plan) => `<article class="pkg-card${plan.popular ? ' pkg-card--featured' : ''}">
          <div class="pkg-card__head">
            <div class="cluster cluster--between">
              <h3 style="margin:0">${esc(plan.name)}</h3>
              ${plan.popular ? `<span class="badge badge--teal">${esc(c(locale, 'packages.mostChosen'))}</span>` : ''}
            </div>
            <div class="pkg-card__price mt-2">${money(plan.price)}<small class="mono" style="font-size:0.8rem;color:var(--ink-mute)"> / month</small></div>
            <p class="small muted" style="margin:0.5rem 0 0">${esc(String(plan.listings))} live ${String(plan.listings) === '1' ? 'listing' : 'listings'}</p>
          </div>
          <div class="pkg-card__body">
            <div class="pkg-card__group">
              <h3>Included</h3>
              <ul>${plan.features.map((f) => `<li>${esc(f)}</li>`).join('')}</ul>
            </div>
          </div>
          <div class="card__body" style="padding-top:0">
            <a class="btn ${plan.popular ? 'btn--primary' : 'btn--outline'} btn--block" href="${localePath('/owner/dashboard', locale)}">Choose ${esc(plan.name)}</a>
          </div>
        </article>`).join('')}
      </div>

      <div class="panel panel--paper mt-4">
        <h3 style="margin-top:0">How listing works</h3>
        <div class="grid grid--4">
          ${[
            ['01', 'Create the listing', 'Add photos, the floor plan, the price and the smart tier. It takes about fifteen minutes.'],
            ['02', 'We review it', 'Our team checks the title, your identity and the property. Most listings are live within one working day.'],
            ['03', 'Enquiries arrive', 'Buyers and tenants chat through the app or request a viewing. Everything lands in your lead inbox.'],
            ['04', 'You pay monthly', 'Secure card or M-Pesa payment, invoiced monthly. Cancel any time and the listing comes down the same day.'],
          ].map(([num, title, text]) => `<div>
            <span class="mono" style="color:var(--brass);font-weight:600">${num}</span>
            <h3 style="margin:0.4rem 0 0.3rem">${esc(title)}</h3>
            <p class="small muted" style="margin:0">${esc(text)}</p>
          </div>`).join('')}
        </div>
      </div>

      <form class="panel panel--paper mt-4" data-form="listing" novalidate>
        <h3 style="margin-top:0">Start a listing</h3>
        <p class="small muted">Send us the basics and we will set the listing up with you, or create the account first and do it yourself in the dashboard.</p>
        <div class="form-grid">
          <div class="field">
            <label for="lp-name">${esc(t(locale, 'form.name'))}</label>
            <input id="lp-name" type="text" name="name" required>
          </div>
          <div class="field">
            <label for="lp-email">${esc(t(locale, 'form.email'))}</label>
            <input id="lp-email" type="email" name="email" required>
          </div>
          <div class="field">
            <label for="lp-phone">${esc(t(locale, 'form.phone'))}</label>
            <input id="lp-phone" type="tel" name="phone" required>
          </div>
          <div class="field">
            <label for="lp-type">Property type</label>
            <select id="lp-type" name="type">
              <option>Apartment</option>
              <option>Townhouse</option>
              <option>Standalone house</option>
              <option>Land or plot</option>
              <option>Commercial</option>
              <option>Farm</option>
            </select>
          </div>
          <div class="field">
            <label for="lp-purpose">For sale or rent</label>
            <select id="lp-purpose" name="purpose">
              <option value="sale">For sale</option>
              <option value="rent">For rent</option>
            </select>
          </div>
          <div class="field">
            <label for="lp-price">Asking price (KES)</label>
            <input id="lp-price" type="number" name="price" min="100000" step="50000" required>
          </div>
        </div>
        <div class="field">
          <label for="lp-address">Location</label>
          <input id="lp-address" type="text" name="address" placeholder="Estate, street and town" required>
        </div>
        <div class="field">
          <label for="lp-notes">Description</label>
          <textarea id="lp-notes" name="notes" placeholder="Bedrooms, bathrooms, plot size, smart tier if any, and what makes it worth seeing."></textarea>
        </div>
        <button class="btn btn--primary btn--lg" type="submit">Submit for review</button>
        <p class="tiny muted mt-2" data-form-msg hidden></p>
      </form>
    </div>
  </section>

  <section class="section bg-paper2 border-y">
    <div class="wrap">
      <div class="grid grid--sidebar grid--sidebar--right">
        <div>
          <p class="eyebrow">${esc(c(locale, 'legal.listingRules'))}</p>
          <h2>What we reject, and why</h2>
          <p>We moderate every listing before it goes live, and we suspend accounts that repeatedly breach the rules. This is what keeps buyers trusting the verified badge.</p>
          <ul style="list-style:none;padding:0">
            ${[
              'Listings where the person posting cannot show a title, lease or written authority',
              'The same property posted more than once to game search results',
              'Prices that differ from the price quoted to enquirers',
              'Photographs that are not of the property being listed',
              'Properties that are not actually available',
              'Listings that misrepresent the smart tier or the amenities fitted',
            ].map((item) => `<li style="display:flex;gap:0.7rem;padding:0.6rem 0;border-bottom:1px solid var(--line)"><span style="color:var(--terracotta)">×</span><span>${esc(item)}</span></li>`).join('')}
          </ul>
          <p class="small muted mt-3"><a href="${localePath('/legal/listing-rules', locale)}">Read the full listing rules →</a></p>
        </div>
        <aside class="panel panel--ink">
          <h3 style="margin-top:0">Owner dashboard</h3>
          <p class="small" style="color:rgba(244,237,224,0.72)">Manage listings, follow every enquiry from first contact to sale, and see your billing history in one place.</p>
          <a class="btn btn--brass btn--block mt-3" href="${localePath('/owner/dashboard', locale)}">Open the dashboard</a>
        </aside>
      </div>
    </div>
  </section>
`;

  return {
    path: '/list-your-property',
    locale,
    navKey: 'accounts',
    title: `${c(locale, 'accounts.listTitle')} — free for 30 days, no commission | TRIXX`,
    description: 'List your property on TRIXX Market. Free for thirty days, then from KES 1,500 a month. No commission on a sale, identity-verified owners and a lead inbox that tracks every enquiry.',
    jsonLd: [
      breadcrumbLd([{ label: 'Home', href: '/' }, { label: 'List your property', href: '/list-your-property' }]),
      ...OWNER_PLANS.map((plan) => ({
        '@context': 'https://schema.org',
        '@type': 'Product',
        name: `TRIXX ${plan.name} listing plan`,
        description: `${plan.listings} live listings with photo, video and 360 tour.`,
        offers: { '@type': 'Offer', priceCurrency: 'KES', price: plan.price, availability: 'https://schema.org/InStock' },
      })),
    ],
    body,
  };
}

module.exports = () => [
  loginPage('en'), loginPage('sw'),
  registerPage('en'), registerPage('sw'),
  bookViewingPage('en'), bookViewingPage('sw'),
  listPropertyPage('en'), listPropertyPage('sw'),
];
