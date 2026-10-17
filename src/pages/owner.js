'use strict';

const { esc, money, num, formatDate } = require('../lib/util');
const { SITE, t } = require('../data/site');
const { c } = require('../data/copy');
const { LISTINGS } = require('../data/listings');
const art = require('../lib/art');
const { localePath } = require('../templates/layout');
const { breadcrumbs, breadcrumbLd, statBlock, badges, progressTracker } = require('../templates/components');

/* Sample pipeline for the owner dashboard. Each lead carries a stage so the
   inbox reads like a working sales pipeline rather than a list of messages. */
const LEADS = [
  { id: 'L-4821', name: 'Wanjiru Kamau', listing: 'TX-1000', stage: 'viewing', value: 24500000, source: 'TRIXX Market', when: '2026-10-16', note: 'Viewed on Saturday, asked for the service charge breakdown.' },
  { id: 'L-4820', name: 'Ali Mohamed', listing: 'TX-1006', stage: 'offer', value: 38500000, source: 'Saved search alert', when: '2026-10-15', note: 'Offer at 37.2M subject to mortgage approval.' },
  { id: 'L-4818', name: 'Grace Otieno', listing: 'TX-1012', stage: 'new', value: 1650000, source: 'WhatsApp', when: '2026-10-15', note: 'Asking about the rent and whether the smart tier is included.' },
  { id: 'L-4815', name: 'Samuel Kipchoge', listing: 'TX-1004', stage: 'won', value: 19800000, source: 'Viewing', when: '2026-10-11', note: 'Sale agreed. Awaiting lender valuation.' },
  { id: 'L-4811', name: 'Halima Salim', listing: 'TX-1008', stage: 'lost', value: 46000000, source: 'Referral', when: '2026-10-06', note: 'Bought elsewhere — wanted a larger plot.' },
  { id: 'L-4809', name: 'Daniel Mwenda', listing: 'TX-1015', stage: 'viewing', value: 28000000, source: 'TRIXX Market', when: '2026-10-05', note: 'Second viewing booked with his partner.' },
];

const STAGE_LABEL = {
  new: 'New', viewing: 'Viewing', offer: 'Offer', won: 'Won', lost: 'Lost',
};

const OWNER_LISTINGS = LISTINGS.filter((l) => l.source === 'owner').slice(0, 5);

const INVOICES = [
  { id: 'INV-2026-10-0041', date: '2026-10-01', amount: 4500, status: 'paid', plan: 'Portfolio' },
  { id: 'INV-2026-09-0038', date: '2026-09-01', amount: 4500, status: 'paid', plan: 'Portfolio' },
  { id: 'INV-2026-08-0031', date: '2026-08-01', amount: 4500, status: 'paid', plan: 'Portfolio' },
  { id: 'INV-2026-07-0027', date: '2026-07-01', amount: 1500, status: 'paid', plan: 'Standard' },
  { id: 'INV-2026-06-0019', date: '2026-06-01', amount: 0, status: 'paid', plan: 'Free trial' },
];

function ownerDashboard(locale) {
  const pipelineValue = LEADS.filter((l) => l.stage !== 'lost').reduce((s, l) => s + l.value, 0);
  const wonValue = LEADS.filter((l) => l.stage === 'won').reduce((s, l) => s + l.value, 0);

  const adminBar = `<div class="admin-bar">
    <div class="wrap">
      <span>Owner dashboard · demo data</span>
      <span class="cluster" style="gap:1rem">
        <a href="${localePath('/owner/listings', locale)}">Listings</a>
        <a href="${localePath('/owner/billing', locale)}">Billing</a>
        <a href="${localePath('/admin', locale)}">${esc(t(locale, 'nav.admin'))}</a>
      </span>
    </div>
  </div>`;

  const body = `
  <section class="section section--tight">
    <div class="wrap wrap--wide">
      ${breadcrumbs([{ label: 'Home', href: '/' }, { label: c(locale, 'accounts.ownerTitle') }], locale)}
      <div class="split">
        <div>
          <p class="eyebrow">${esc(c(locale, 'accounts.ownerTitle'))}</p>
          <h1>Coastline Properties Ltd</h1>
          <p class="lede">Portfolio plan · 5 of 5 listings used · next invoice ${formatDate('2026-11-01', locale)}</p>
        </div>
        <div class="cluster">
          <a class="btn btn--primary" href="${localePath('/list-your-property', locale)}">Add a listing</a>
          <a class="btn btn--outline" href="${localePath('/owner/billing', locale)}">Billing</a>
        </div>
      </div>

      <div class="kpi-grid mt-4">
        <div class="kpi">
          <span class="kpi__label">Live listings</span>
          <span class="kpi__value">5</span>
          <span class="kpi__delta kpi__delta--up">All verified</span>
        </div>
        <div class="kpi">
          <span class="kpi__label">Enquiries this month</span>
          <span class="kpi__value">38</span>
          <span class="kpi__delta kpi__delta--up">+12 vs September</span>
        </div>
        <div class="kpi">
          <span class="kpi__label">Viewings booked</span>
          <span class="kpi__value">11</span>
          <span class="kpi__delta kpi__delta--up">29% of enquiries</span>
        </div>
        <div class="kpi">
          <span class="kpi__label">Pipeline value</span>
          <span class="kpi__value">${money(pipelineValue)}</span>
          <span class="kpi__delta">6 open leads</span>
        </div>
        <div class="kpi">
          <span class="kpi__label">Closed this month</span>
          <span class="kpi__value">${money(wonValue)}</span>
          <span class="kpi__delta kpi__delta--up">1 sale agreed</span>
        </div>
        <div class="kpi">
          <span class="kpi__label">Listing views</span>
          <span class="kpi__value">4,182</span>
          <span class="kpi__delta kpi__delta--up">+8%</span>
        </div>
      </div>
    </div>
  </section>

  <section class="section section--flush">
    <div class="wrap wrap--wide">
      <div class="dash">
        <nav class="dash__nav" aria-label="Dashboard sections">
          <a href="#pipeline" aria-current="page">Lead inbox</a>
          <a href="#listings">My listings</a>
          <a href="#performance">Performance</a>
          <a href="#billing">Billing</a>
        </nav>

        <div class="stack" style="--stack-gap:2rem">
          <div id="pipeline">
            <div class="section-head section-head--split">
              <div>
                <p class="eyebrow">Lead inbox</p>
                <h2>Every enquiry, first contact to close</h2>
              </div>
              <span class="results-count">6 open leads · 1 won · 1 lost</span>
            </div>
            <div style="overflow-x:auto">
              <table class="data-table">
                <thead>
                  <tr>
                    <th>Lead</th>
                    <th>Listing</th>
                    <th>Stage</th>
                    <th class="num">Value</th>
                    <th>Source</th>
                    <th>Last contact</th>
                  </tr>
                </thead>
                <tbody>
                  ${LEADS.map((lead) => `<tr>
                    <td>
                      <strong>${esc(lead.name)}</strong>
                      <span class="cms-row__meta" style="display:block">${esc(lead.note)}</span>
                    </td>
                    <td class="mono">${esc(lead.listing)}</td>
                    <td><span class="status status--${lead.stage}">${esc(STAGE_LABEL[lead.stage])}</span></td>
                    <td class="num">${money(lead.value)}</td>
                    <td class="small muted">${esc(lead.source)}</td>
                    <td class="small muted">${formatDate(lead.when, locale)}</td>
                  </tr>`).join('')}
                </tbody>
              </table>
            </div>
            <div class="grid grid--4 mt-3">
              ${statBlock({ value: '38', label: 'Enquiries this month' })}
              ${statBlock({ value: '29%', label: 'Enquiry to viewing' })}
              ${statBlock({ value: '9%', label: 'Viewing to offer' })}
              ${statBlock({ value: '23 days', label: 'Median to offer' })}
            </div>
          </div>

          <div id="listings">
            <div class="section-head section-head--split">
              <div>
                <p class="eyebrow">My listings</p>
                <h2>Listing status and performance</h2>
              </div>
              <a class="btn btn--outline btn--sm" href="${localePath('/list-your-property', locale)}">Add a listing</a>
            </div>
            ${OWNER_LISTINGS.map((l) => `<div class="cms-row">
              <div>
                <span class="cms-row__title">${esc(l.title)}</span>
                <span class="cms-row__meta">${esc(l.id)} · ${esc(l.location)}, ${esc(l.county)} · ${l.bedrooms} bd · ${num(l.area)} m²</span>
              </div>
              <div>
                <span class="status status--live">Live</span>
                <span class="cms-row__meta" style="display:block;margin-top:0.3rem">${l.verified ? 'Verified' : 'Verification pending'}</span>
              </div>
              <div>
                <span class="cms-row__meta">${num(l.views)} views</span>
                <span class="cms-row__meta" style="display:block">${l.inquiries} enquiries</span>
              </div>
              <div class="cluster">
                <a class="btn btn--outline btn--sm" href="${localePath(`/listings/${l.slug}`, locale)}">View</a>
                <button class="btn btn--quiet btn--sm" type="button">Edit</button>
              </div>
            </div>`).join('')}
          </div>

          <div id="performance">
            <div class="section-head">
              <p class="eyebrow">Performance</p>
              <h2>Where the enquiries came from</h2>
            </div>
            <div class="grid grid--2">
              <div class="panel panel--paper">
                <h3 style="margin-bottom:0.75rem">Views by source</h3>
                <div class="bars" style="height:6rem">
                  <i style="height:88%"></i><i style="height:64%"></i><i style="height:41%"></i><i style="height:27%"></i><i style="height:14%"></i>
                </div>
                <ul class="spec-list mt-3">
                  <li><span>Search results</span><span>1,842</span></li>
                  <li><span>Saved search alert</span><span>1,106</span></li>
                  <li><span>Map view</span><span>684</span></li>
                  <li><span>Blog and guides</span><span>376</span></li>
                  <li><span>Direct and referral</span><span>174</span></li>
                </ul>
              </div>
              <div class="panel panel--paper">
                <h3 style="margin-bottom:0.75rem">Enquiries by listing</h3>
                <table class="data-table">
                  <thead><tr><th>Listing</th><th class="num">Views</th><th class="num">Enquiries</th><th class="num">Viewings</th></tr></thead>
                  <tbody>
                    ${OWNER_LISTINGS.map((l) => `<tr>
                      <td class="mono">${esc(l.id)}</td>
                      <td class="num">${num(l.views)}</td>
                      <td class="num">${l.inquiries}</td>
                      <td class="num">${Math.max(1, Math.round(l.inquiries / 3))}</td>
                    </tr>`).join('')}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          <div id="billing">
            <div class="section-head section-head--split">
              <div>
                <p class="eyebrow">Billing</p>
                <h2>Subscription and payment history</h2>
              </div>
              <span class="badge badge--teal">Portfolio · ${money(4500)}/month</span>
            </div>
            <div style="overflow-x:auto">
              <table class="data-table">
                <thead>
                  <tr><th>Invoice</th><th>Date</th><th>Plan</th><th class="num">Amount</th><th>Status</th><th></th></tr>
                </thead>
                <tbody>
                  ${INVOICES.map((inv) => `<tr>
                    <td class="mono">${esc(inv.id)}</td>
                    <td class="small muted">${formatDate(inv.date, locale)}</td>
                    <td>${esc(inv.plan)}</td>
                    <td class="num">${money(inv.amount)}</td>
                    <td><span class="status status--${inv.status}">${inv.status === 'paid' ? 'Paid' : 'Due'}</span></td>
                    <td><button class="btn btn--quiet btn--sm" type="button">Receipt</button></td>
                  </tr>`).join('')}
                </tbody>
              </table>
            </div>
            <div class="panel panel--paper mt-3">
              <h3 style="margin-bottom:0.5rem">Payment method</h3>
              <p class="small muted">M-Pesa ···· 4821 and Visa ···· 4417 on file. Payments are taken on the first working day of each month and receipted immediately.</p>
              <div class="cluster mt-2">
                <button class="btn btn--outline btn--sm" type="button">Update payment method</button>
                <button class="btn btn--quiet btn--sm" type="button">Cancel subscription</button>
              </div>
              <p class="tiny muted mt-2">Cancelling removes your listings the same day. There is no notice period and no commission is owed on a sale in progress.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>

  <section class="section bg-paper2 border-y">
    <div class="wrap">
      <div class="section-head">
        <p class="eyebrow">Moderation</p>
        <h2>How our review keeps the verified badge meaningful</h2>
      </div>
      <div class="grid grid--3">
        <div class="panel panel--paper">
          <h3>Title and authority</h3>
          <p class="small muted">We run an official lands search and confirm the person listing is the registered owner or has written authority.</p>
        </div>
        <div class="panel panel--paper">
          <h3>Physical inspection</h3>
          <p class="small muted">A surveyor photographs and measures the property. Listings are measured, not taken on trust.</p>
        </div>
        <div class="panel panel--paper">
          <h3>Ongoing checks</h3>
          <p class="small muted">Listings that stay live are re-checked every six months. Sold or withdrawn listings come down the same day.</p>
        </div>
      </div>
    </div>
  </section>
`;

  return {
    path: '/owner/dashboard',
    locale,
    navKey: 'owner',
    title: 'Owner dashboard — listings, leads and billing | TRIXX',
    description: 'Manage your TRIXX listings, follow every enquiry from first contact to sale, and see subscription billing and payment history in one place.',
    noindex: true,
    adminBar,
    jsonLd: breadcrumbLd([{ label: 'Home', href: '/' }, { label: 'Owner dashboard', href: '/owner/dashboard' }]),
    body,
  };
}

function ownerBillingPage(locale) {
  const body = `
  <section class="section">
    <div class="wrap wrap--narrow">
      ${breadcrumbs([{ label: 'Home', href: '/' }, { label: 'Owner dashboard', href: '/owner/dashboard' }, { label: 'Billing' }], locale)}
      <div class="section-head">
        <p class="eyebrow">Billing</p>
        <h1>Subscription and payments</h1>
        <p class="lede">Your plan, what it covers, and every invoice we have issued. Payments settle by M-Pesa or card and are receipted immediately.</p>
      </div>

      <div class="panel panel--paper">
        <div class="split">
          <div>
            <span class="badge badge--teal">Current plan</span>
            <h2 style="margin:0.6rem 0 0.2rem">Portfolio</h2>
            <p class="small muted" style="margin:0">Up to 5 live listings · ${money(4500)} per month · renews ${formatDate('2026-11-01', locale)}</p>
          </div>
          <a class="btn btn--outline" href="${localePath('/list-your-property', locale)}">Change plan</a>
        </div>
        <hr>
        <div class="grid grid--3">
          ${statBlock({ value: '5 / 5', label: 'Listings used' })}
          ${statBlock({ value: money(4500), label: 'Monthly charge' })}
          ${statBlock({ value: '0%', label: c(locale, 'listing.statCommission') })}
        </div>
      </div>

      <div class="panel panel--paper mt-3">
        <h3 style="margin-top:0">Payment method</h3>
        <ul class="spec-list">
          <li><span>M-Pesa</span><span>···· 4821 · primary</span></li>
          <li><span>Card</span><span>Visa ···· 4417 · expires 08/28</span></li>
        </ul>
        <div class="cluster mt-3">
          <button class="btn btn--primary btn--sm" type="button">Add a payment method</button>
          <button class="btn btn--outline btn--sm" type="button">Set as primary</button>
        </div>
      </div>

      <div class="panel panel--paper mt-3">
        <h3 style="margin-top:0">Invoices</h3>
        <div style="overflow-x:auto">
          <table class="data-table">
            <thead><tr><th>Invoice</th><th>Date</th><th>Plan</th><th class="num">Amount</th><th>Status</th></tr></thead>
            <tbody>
              ${INVOICES.map((inv) => `<tr>
                <td class="mono">${esc(inv.id)}</td>
                <td class="small muted">${formatDate(inv.date, locale)}</td>
                <td>${esc(inv.plan)}</td>
                <td class="num">${money(inv.amount)}</td>
                <td><span class="status status--paid">Paid</span></td>
              </tr>`).join('')}
            </tbody>
          </table>
        </div>
      </div>

      <div class="note note--teal mt-3">
        <strong>No commission, ever.</strong> TRIXX charges a monthly listing fee only. We take nothing from the sale price, and a listing that is withdrawn mid-month is not billed again.
      </div>
    </div>
  </section>
`;

  return {
    path: '/owner/billing',
    locale,
    navKey: 'owner',
    title: 'Owner billing — subscription and invoices | TRIXX',
    description: 'Your TRIXX listing plan, payment methods and full invoice history.',
    noindex: true,
    jsonLd: breadcrumbLd([{ label: 'Home', href: '/' }, { label: 'Owner dashboard', href: '/owner/dashboard' }, { label: 'Billing', href: '/owner/billing' }]),
    body,
  };
}

function ownerListingsPage(locale) {
  const body = `
  <section class="section">
    <div class="wrap wrap--wide">
      ${breadcrumbs([{ label: 'Home', href: '/' }, { label: 'Owner dashboard', href: '/owner/dashboard' }, { label: 'Listings' }], locale)}
      <div class="split">
        <div>
          <p class="eyebrow">My listings</p>
          <h1>Manage your listings</h1>
          <p class="lede">Edit, pause or withdraw any listing. Changes go live immediately; withdrawals remove the listing from search the same day.</p>
        </div>
        <a class="btn btn--primary" href="${localePath('/list-your-property', locale)}">Add a listing</a>
      </div>

      <div class="panel panel--paper mt-4">
        ${OWNER_LISTINGS.map((l) => `<div class="cms-row">
          <div>
            <span class="cms-row__title">${esc(l.title)}</span>
            <span class="cms-row__meta">${esc(l.id)} · ${money(l.price)}${l.purpose === 'rent' ? ' per month' : ''}</span>
            <div class="cluster" style="margin-top:0.4rem">${badges(l, locale)}</div>
          </div>
          <div>
            <span class="status status--live">Live</span>
          </div>
          <div>
            <span class="cms-row__meta">${num(l.views)} views · ${l.inquiries} enquiries</span>
          </div>
          <div class="cluster">
            <button class="btn btn--outline btn--sm" type="button">Edit</button>
            <button class="btn btn--quiet btn--sm" type="button">Pause</button>
            <button class="btn btn--quiet btn--sm" type="button">Withdraw</button>
          </div>
        </div>`).join('')}
      </div>

      <div class="panel panel--paper mt-3">
        <h3 style="margin-top:0">Listing quality checklist</h3>
        <p class="small muted">Listings that complete every item get roughly three times the enquiries of those that do not.</p>
        <ul class="grid grid--2" style="list-style:none;padding:0;gap:0.3rem 2rem">
          ${[
            'At least eight photographs including the front elevation',
            'A floor plan with dimensions',
            'A 360 tour of the main living space',
            'The smart tier stated explicitly',
            'Honest neighbourhood notes, including noise and access',
            'Running costs: service charge, rates and insurance',
            'Availability date',
            'A written description that names the plot size',
          ].map((item) => `<li style="display:flex;gap:0.55rem;padding:0.4rem 0;border-bottom:1px solid var(--line);font-size:0.88rem"><span style="color:var(--teal)">✓</span><span>${esc(item)}</span></li>`).join('')}
        </ul>
      </div>
    </div>
  </section>
`;

  return {
    path: '/owner/listings',
    locale,
    navKey: 'owner',
    title: 'My listings — manage and edit | TRIXX',
    description: 'Edit, pause or withdraw your TRIXX listings and check each one against the listing quality checklist.',
    noindex: true,
    jsonLd: breadcrumbLd([{ label: 'Home', href: '/' }, { label: 'Owner dashboard', href: '/owner/dashboard' }, { label: 'Listings', href: '/owner/listings' }]),
    body,
  };
}

module.exports = () => [
  ownerDashboard('en'), ownerDashboard('sw'),
  ownerListingsPage('en'), ownerListingsPage('sw'),
  ownerBillingPage('en'), ownerBillingPage('sw'),
];
