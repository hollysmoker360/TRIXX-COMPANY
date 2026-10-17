'use strict';

const { esc, money, num, formatDate } = require('../lib/util');
const { SITE, t } = require('../data/site');
const { c } = require('../data/copy');
const { stylesFor, packagesFor } = require('../data/catalog');
const { LISTINGS, BLOG_POSTS, TEAM } = require('../data/listings');
const { PROJECTS } = require('../data/portfolio');
const art = require('../lib/art');
const { localePath } = require('../templates/layout');
const { breadcrumbs, breadcrumbLd, statBlock, badges } = require('../templates/components');

const MODERATION_QUEUE = [
  { id: 'TX-1041', title: '4-Bedroom Townhouse in Ruaka', owner: 'Peter Otieno', submitted: '2026-10-16', status: 'pending', note: 'Awaiting title search and physical inspection.' },
  { id: 'TX-1040', title: '3-Bedroom Apartment in Kilimani', owner: 'Nairobi Bluechip Ltd', submitted: '2026-10-15', status: 'pending', note: 'Owner identity confirmed. Surveyor booked for 18 Oct.' },
  { id: 'TX-1039', title: '5-Bedroom House in Karen', owner: 'Greenfield Estates', submitted: '2026-10-14', status: 'live', note: 'Verified and published.' },
  { id: 'TX-1038', title: 'Land parcel in Ngong', owner: 'Unknown poster', submitted: '2026-10-13', status: 'rejected', note: 'No title evidence provided after two requests.' },
  { id: 'TX-1037', title: '2-Bedroom Cottage in Limuru', owner: 'Fatuma Hassan', submitted: '2026-10-12', status: 'live', note: 'Verified. Duplicate of TX-1030 removed.' },
];

const LEADS_ALL = [
  { id: 'L-4821', name: 'Wanjiru Kamau', interest: 'Buying', listing: 'TX-1000', stage: 'viewing', assigned: 'Aisha Mohamed', when: '2026-10-16' },
  { id: 'L-4820', name: 'Ali Mohamed', interest: 'Buying', listing: 'TX-1006', stage: 'offer', assigned: 'Zainab Ali', when: '2026-10-15' },
  { id: 'L-4819', name: 'Ravi Shah', interest: 'Farm', listing: 'Farm survey', stage: 'new', assigned: 'Lucy Njeri', when: '2026-10-15' },
  { id: 'L-4818', name: 'Grace Otieno', interest: 'Renting', listing: 'TX-1012', stage: 'new', assigned: 'Aisha Mohamed', when: '2026-10-15' },
  { id: 'L-4817', name: 'Mary Wambui', interest: 'Building', listing: 'Contemporary 4-bed', stage: 'viewing', assigned: 'Tom Gitau', when: '2026-10-14' },
  { id: 'L-4815', name: 'Samuel Kipchoge', interest: 'Buying', listing: 'TX-1004', stage: 'won', assigned: 'Zainab Ali', when: '2026-10-11' },
  { id: 'L-4811', name: 'Halima Salim', interest: 'Buying', listing: 'TX-1008', stage: 'lost', assigned: 'Zainab Ali', when: '2026-10-06' },
];

const STAGE_LABEL = { new: 'New', viewing: 'Viewing', offer: 'Offer', won: 'Won', lost: 'Lost' };

function adminDashboard(locale) {
  const STYLES = stylesFor(locale);
  const PACKAGES = packagesFor(locale);
  const adminBar = `<div class="admin-bar">
    <div class="wrap">
      <span>Back office · demo data · signed in as Nadia Kombo</span>
      <span class="cluster" style="gap:1rem">
        <a href="${localePath('/admin', locale)}">Dashboard</a>
        <a href="${localePath('/admin/cms', locale)}">CMS</a>
        <a href="${localePath('/admin/leads', locale)}">Lead inbox</a>
        <a href="${localePath('/admin/moderation', locale)}">Moderation</a>
        <a href="${localePath('/admin/analytics', locale)}">Analytics</a>
      </span>
    </div>
  </div>`;

  const body = `
  <section class="section section--tight">
    <div class="wrap wrap--wide">
      ${breadcrumbs([{ label: 'Home', href: '/' }, { label: t(locale, 'nav.admin') }], locale)}
      <div class="split">
        <div>
          <p class="eyebrow">${esc(c(locale, 'admin.eyebrow'))}</p>
          <h1>${esc(c(locale, 'admin.title'))}</h1>
          <p class="lede">${esc(c(locale, 'admin.lede'))}</p>
        </div>
        <div class="cluster">
          <a class="btn btn--primary" href="${localePath('/admin/cms', locale)}">Add content</a>
          <a class="btn btn--outline" href="${localePath('/admin/leads', locale)}">Open lead inbox</a>
        </div>
      </div>

      <div class="kpi-grid mt-4">
        <div class="kpi">
          <span class="kpi__label">Visitors this month</span>
          <span class="kpi__value">48,210</span>
          <span class="kpi__delta kpi__delta--up">+14% vs September</span>
        </div>
        <div class="kpi">
          <span class="kpi__label">Visit to viewing</span>
          <span class="kpi__value">3.8%</span>
          <span class="kpi__delta kpi__delta--up">+0.4 pts</span>
        </div>
        <div class="kpi">
          <span class="kpi__label">New enquiries</span>
          <span class="kpi__value">1,842</span>
          <span class="kpi__delta kpi__delta--up">+9%</span>
        </div>
        <div class="kpi">
          <span class="kpi__label">Revenue this month</span>
          <span class="kpi__value">${money(18400000)}</span>
          <span class="kpi__delta kpi__delta--up">+21%</span>
        </div>
        <div class="kpi">
          <span class="kpi__label">Listings awaiting review</span>
          <span class="kpi__value">2</span>
          <span class="kpi__delta kpi__delta--down">1 rejected today</span>
        </div>
        <div class="kpi">
          <span class="kpi__label">Owner subscriptions</span>
          <span class="kpi__value">412</span>
          <span class="kpi__delta kpi__delta--up">+18 this month</span>
        </div>
      </div>
    </div>
  </section>

  <section class="section section--flush">
    <div class="wrap wrap--wide">
      <div class="dash">
        <nav class="dash__nav" aria-label="Back office sections">
          <a href="${localePath('/admin', locale)}" aria-current="page">Overview</a>
          <a href="${localePath('/admin/cms', locale)}">Content</a>
          <a href="${localePath('/admin/leads', locale)}">Lead inbox</a>
          <a href="${localePath('/admin/moderation', locale)}">Moderation</a>
          <a href="${localePath('/admin/billing', locale)}">Billing</a>
          <a href="${localePath('/admin/analytics', locale)}">Analytics</a>
        </nav>

        <div class="stack" style="--stack-gap:2rem">
          <div>
            <div class="section-head">
              <p class="eyebrow">Needs attention</p>
              <h2>Today's queue</h2>
            </div>
            <div class="grid grid--2">
              <div class="panel panel--paper">
                <h3 style="margin-bottom:0.75rem">Awaiting review</h3>
                ${MODERATION_QUEUE.filter((m) => m.status === 'pending').map((m) => `<div class="cms-row" style="grid-template-columns:1fr auto">
                  <div>
                    <span class="cms-row__title">${esc(m.title)}</span>
                    <span class="cms-row__meta">${esc(m.id)} · ${esc(m.owner)} · submitted ${formatDate(m.submitted, locale)}</span>
                    <span class="cms-row__meta" style="display:block;margin-top:0.25rem">${esc(m.note)}</span>
                  </div>
                  <a class="btn btn--outline btn--sm" href="${localePath('/admin/moderation', locale)}">Review</a>
                </div>`).join('')}
              </div>
              <div class="panel panel--paper">
                <h3 style="margin-bottom:0.75rem">Unassigned leads</h3>
                ${LEADS_ALL.filter((l) => l.stage === 'new').map((l) => `<div class="cms-row" style="grid-template-columns:1fr auto">
                  <div>
                    <span class="cms-row__title">${esc(l.name)}</span>
                    <span class="cms-row__meta">${esc(l.id)} · ${esc(l.interest)} · ${esc(l.listing)}</span>
                  </div>
                  <button class="btn btn--outline btn--sm" type="button">Assign</button>
                </div>`).join('')}
              </div>
            </div>
          </div>

          <div>
            <div class="section-head">
              <p class="eyebrow">Conversion funnel</p>
              <h2>From visit to sale</h2>
            </div>
            <div class="panel panel--paper">
              <div class="bars" style="height:7rem">
                <i style="height:100%"></i><i style="height:74%"></i><i style="height:41%"></i><i style="height:18%"></i><i style="height:7%"></i>
              </div>
              <table class="data-table mt-3">
                <thead><tr><th>Stage</th><th class="num">Count</th><th class="num">Conversion from previous</th></tr></thead>
                <tbody>
                  <tr><td>Visited the site</td><td class="num">48,210</td><td class="num">—</td></tr>
                  <tr><td>Viewed a listing</td><td class="num">35,674</td><td class="num">74.0%</td></tr>
                  <tr><td>Registered an account</td><td class="num">19,766</td><td class="num">55.4%</td></tr>
                  <tr><td>Booked a viewing</td><td class="num">1,832</td><td class="num">9.3%</td></tr>
                  <tr><td>Closed a sale or lease</td><td class="num">341</td><td class="num">18.6%</td></tr>
                </tbody>
              </table>
            </div>
          </div>

          <div>
            <div class="section-head">
              <p class="eyebrow">Popular styles</p>
              <h2>What buyers actually look at</h2>
            </div>
            <div class="panel panel--paper">
              <table class="data-table">
                <thead><tr><th>Collection</th><th class="num">Views</th><th class="num">Enquiries</th><th class="num">Enquiry rate</th></tr></thead>
                <tbody>
                  ${STYLES.map((s, i) => {
                    const views = 12400 - i * 1450;
                    const enquiries = Math.round(views * (0.031 + i * 0.002));
                    return `<tr>
                      <td><strong>${esc(s.name)}</strong></td>
                      <td class="num">${num(views)}</td>
                      <td class="num">${num(enquiries)}</td>
                      <td class="num">${((enquiries / views) * 100).toFixed(1)}%</td>
                    </tr>`;
                  }).join('')}
                </tbody>
              </table>
            </div>
          </div>

          <div>
            <div class="section-head">
              <p class="eyebrow">Revenue by product</p>
              <h2>Where the money came from</h2>
            </div>
            <div class="grid grid--4">
              ${[
                { label: 'Home sales', value: 12400000, note: '3 completions' },
                { label: 'Smart packages', value: 3860000, note: '11 installations' },
                { label: 'Farm plots', value: 1420000, note: '4 packages' },
                { label: 'Owner subscriptions', value: 720000, note: '412 subscribers' },
              ].map((row) => `<div class="kpi">
                <span class="kpi__label">${esc(row.label)}</span>
                <span class="kpi__value" style="font-size:1.4rem">${money(row.value)}</span>
                <span class="kpi__delta">${esc(row.note)}</span>
              </div>`).join('')}
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
`;

  return {
    path: '/admin',
    locale,
    navKey: 'admin',
    title: 'Back office — content, leads, moderation and analytics | TRIXX',
    description: 'TRIXX back office: manage content without a developer, track every enquiry to sale, moderate listings, run owner billing and read conversion analytics.',
    noindex: true,
    adminBar,
    jsonLd: breadcrumbLd([{ label: 'Home', href: '/' }, { label: 'Admin', href: '/admin' }]),
    body,
  };
}

function adminCmsPage(locale) {
  const STYLES = stylesFor(locale);
  const PACKAGES = packagesFor(locale);
  const adminBar = adminBarFor(locale, 'cms');

  const body = `
  <section class="section">
    <div class="wrap wrap--wide">
      ${breadcrumbs([{ label: 'Home', href: '/' }, { label: 'Admin', href: '/admin' }, { label: 'Content' }], locale)}
      <div class="section-head">
        <p class="eyebrow">Content management</p>
        <h1>Add and edit content without a developer</h1>
        <p class="lede">Houses, listings, blog posts, prices and page copy are all editable here. Every change is versioned and can be rolled back.</p>
      </div>

      <div class="grid grid--sidebar grid--sidebar--right">
        <div class="stack" style="--stack-gap:1.5rem">
          <div class="panel panel--paper" data-cms-editor>
            <h3 style="margin-top:0">New listing</h3>
            <p class="small muted">Fill the form and watch the card render exactly as a visitor will see it.</p>
            <div class="form-grid mt-2">
              <div class="field">
                <label for="cms-title">Listing title</label>
                <input id="cms-title" type="text" data-cms-field="title" value="4-Bedroom Contemporary in Syokimau">
              </div>
              <div class="field">
                <label for="cms-location">Location</label>
                <input id="cms-location" type="text" data-cms-field="location" value="Syokimau">
              </div>
              <div class="field">
                <label for="cms-style">Style</label>
                <select id="cms-style" data-cms-field="style">
                  ${STYLES.map((s) => `<option value="${s.slug}">${esc(s.name)}</option>`).join('')}
                </select>
              </div>
              <div class="field">
                <label for="cms-tier">Smart tier</label>
                <select id="cms-tier" data-cms-field="tier">
                  ${PACKAGES.map((p) => `<option value="${p.slug}">${esc(p.name)}</option>`).join('')}
                </select>
              </div>
              <div class="field">
                <label for="cms-beds">Bedrooms</label>
                <input id="cms-beds" type="number" min="1" max="10" data-cms-field="bedrooms" value="4">
              </div>
              <div class="field">
                <label for="cms-price">Price (KES)</label>
                <input id="cms-price" type="number" step="50000" data-cms-field="price" value="26500000">
              </div>
            </div>
            <div class="cluster mt-2">
              <button class="btn btn--primary" type="button">Save draft</button>
              <button class="btn btn--outline" type="button">Submit for review</button>
              <button class="btn btn--quiet" type="button">Preview on site</button>
            </div>
          </div>

          <div class="panel panel--paper">
            <h3 style="margin-top:0">Live preview</h3>
            <div data-cms-preview></div>
          </div>

          <div class="panel panel--paper">
            <h3 style="margin-top:0">Existing content</h3>
            <div class="cms-row" style="grid-template-columns:1fr auto auto auto">
              <span class="cms-row__meta" style="font-family:var(--mono);text-transform:uppercase;letter-spacing:0.1em">Item</span>
              <span class="cms-row__meta" style="font-family:var(--mono);text-transform:uppercase;letter-spacing:0.1em">Type</span>
              <span class="cms-row__meta" style="font-family:var(--mono);text-transform:uppercase;letter-spacing:0.1em">Updated</span>
              <span></span>
            </div>
            ${LISTINGS.slice(0, 6).map((l) => `<div class="cms-row" style="grid-template-columns:1fr auto auto auto">
              <div>
                <span class="cms-row__title">${esc(l.title)}</span>
                <span class="cms-row__meta">${esc(l.id)}</span>
              </div>
              <span class="cms-row__meta">Listing</span>
              <span class="cms-row__meta">${formatDate(l.listedAt, locale)}</span>
              <button class="btn btn--quiet btn--sm" type="button">Edit</button>
            </div>`).join('')}
            ${BLOG_POSTS.slice(0, 3).map((p) => `<div class="cms-row" style="grid-template-columns:1fr auto auto auto">
              <div>
                <span class="cms-row__title">${esc(p.title)}</span>
                <span class="cms-row__meta">${esc(p.category)}</span>
              </div>
              <span class="cms-row__meta">Blog post</span>
              <span class="cms-row__meta">${formatDate(p.date, locale)}</span>
              <button class="btn btn--quiet btn--sm" type="button">Edit</button>
            </div>`).join('')}
            ${STYLES.slice(0, 2).map((s) => `<div class="cms-row" style="grid-template-columns:1fr auto auto auto">
              <div>
                <span class="cms-row__title">${esc(s.name)} collection</span>
                <span class="cms-row__meta">${esc(s.tagline)}</span>
              </div>
              <span class="cms-row__meta">Collection</span>
              <span class="cms-row__meta">2026-09-12</span>
              <button class="btn btn--quiet btn--sm" type="button">Edit</button>
            </div>`).join('')}
            ${PROJECTS.slice(0, 2).map((p) => `<div class="cms-row" style="grid-template-columns:1fr auto auto auto">
              <div>
                <span class="cms-row__title">${esc(p.name)}</span>
                <span class="cms-row__meta">${esc(p.location)}</span>
              </div>
              <span class="cms-row__meta">Project</span>
              <span class="cms-row__meta">2026-10-11</span>
              <button class="btn btn--quiet btn--sm" type="button">Edit</button>
            </div>`).join('')}
          </div>
        </div>

        <aside class="stack" style="--stack-gap:1rem">
          <div class="panel panel--paper">
            <h3 style="margin-bottom:0.6rem">What is editable</h3>
            <ul class="spec-list">
              <li><span>Listings</span><span>Create, edit, publish</span></li>
              <li><span>House collections</span><span>Copy, prices, materials</span></li>
              <li><span>Smart packages</span><span>Device lists and prices</span></li>
              <li><span>Blog posts</span><span>Write and schedule</span></li>
              <li><span>Projects</span><span>Progress and photos</span></li>
              <li><span>Team and FAQ</span><span>Bios and answers</span></li>
              <li><span>Page copy</span><span>English and Kiswahili</span></li>
              <li><span>Legal documents</span><span>Versioned</span></li>
            </ul>
          </div>
          <div class="panel panel--paper">
            <h3 style="margin-bottom:0.6rem">Workflow</h3>
            <p class="small muted" style="margin:0">Draft → review → published. Editors cannot publish without review. Every change records who made it and when, and any version can be restored in one click.</p>
          </div>
          <div class="panel panel--ink">
            <h3 style="margin-top:0;color:var(--paper)">Translations</h3>
            <p class="small" style="color:rgba(244,237,224,0.72)">Every field has an English and a Kiswahili value. If a translation is missing the site falls back to English rather than showing an empty space.</p>
          </div>
        </aside>
      </div>
    </div>
  </section>
`;

  return {
    path: '/admin/cms',
    locale,
    navKey: 'admin',
    title: 'Content management — listings, posts and pages | TRIXX',
    description: 'Add houses, listings, blog posts and prices without a developer, with live preview, translation fields and a review workflow.',
    noindex: true,
    adminBar,
    extraScript: '/assets/data/renders.js',
    jsonLd: breadcrumbLd([{ label: 'Home', href: '/' }, { label: 'Admin', href: '/admin' }, { label: 'Content', href: '/admin/cms' }]),
    body,
  };
}

function adminLeadsPage(locale) {
  const adminBar = adminBarFor(locale, 'leads');

  const body = `
  <section class="section">
    <div class="wrap wrap--wide">
      ${breadcrumbs([{ label: 'Home', href: '/' }, { label: 'Admin', href: '/admin' }, { label: 'Lead inbox' }], locale)}
      <div class="section-head">
        <p class="eyebrow">Lead inbox</p>
        <h1>Every enquiry, from first contact to close</h1>
        <p class="lede">Nothing falls through. Each lead has an owner, a stage, a value and a full history of what was said and when.</p>
      </div>

      <div class="kpi-grid mb-4">
        <div class="kpi"><span class="kpi__label">Open leads</span><span class="kpi__value">1,842</span><span class="kpi__delta kpi__delta--up">+9% this month</span></div>
        <div class="kpi"><span class="kpi__label">Awaiting assignment</span><span class="kpi__value">2</span><span class="kpi__delta">Assign within 4 h</span></div>
        <div class="kpi"><span class="kpi__label">Avg. first response</span><span class="kpi__value">1.4 h</span><span class="kpi__delta kpi__delta--up">Target 4 h</span></div>
        <div class="kpi"><span class="kpi__label">Pipeline value</span><span class="kpi__value">${money(486000000)}</span><span class="kpi__delta">All open stages</span></div>
      </div>

      <div class="panel panel--paper">
        <div class="split mb-3">
          <div class="cluster">
            <button class="pill" type="button" aria-pressed="true">All</button>
            ${Object.entries(STAGE_LABEL).map(([key, label]) => `<button class="pill" type="button" aria-pressed="false">${esc(label)}</button>`).join('')}
          </div>
          <button class="btn btn--outline btn--sm" type="button">Export CSV</button>
        </div>
        <div style="overflow-x:auto">
          <table class="data-table">
            <thead>
              <tr><th>Lead</th><th>Interest</th><th>Listing</th><th>Stage</th><th>Assigned</th><th>Last contact</th></tr>
            </thead>
            <tbody>
              ${LEADS_ALL.map((l) => `<tr>
                <td><strong>${esc(l.name)}</strong><span class="cms-row__meta" style="display:block">${esc(l.id)}</span></td>
                <td class="small muted">${esc(l.interest)}</td>
                <td class="mono small">${esc(l.listing)}</td>
                <td><span class="status status--${l.stage}">${esc(STAGE_LABEL[l.stage])}</span></td>
                <td class="small muted">${esc(l.assigned)}</td>
                <td class="small muted">${formatDate(l.when, locale)}</td>
              </tr>`).join('')}
            </tbody>
          </table>
        </div>
      </div>

      <div class="grid grid--2 mt-4">
        <div class="panel panel--paper">
          <h3 style="margin-top:0">Lead history</h3>
          <p class="small muted">Selected: Wanjiru Kamau · L-4821 · TX-1000</p>
          <div class="mt-3">
            ${[
              ['2026-10-10', 'Enquiry received through TRIXX Market. Asked about the service charge.'],
              ['2026-10-10', 'Auto-reply sent with the listing pack and running costs.'],
              ['2026-10-11', 'Assigned to Aisha Mohamed.'],
              ['2026-10-12', 'Call, 14 minutes. Discussed the smart tier and the mortgage options.'],
              ['2026-10-16', 'Viewing completed. Requested the service charge breakdown in writing.'],
              ['2026-10-16', 'Written breakdown sent. Following up on 19 October.'],
            ].map(([date, note]) => `<div class="timeline-item">
              <time>${formatDate(date, locale)}</time>
              <span>${esc(note)}</span>
            </div>`).join('')}
          </div>
          <div class="cluster mt-3">
            <button class="btn btn--primary btn--sm" type="button">Log a call</button>
            <button class="btn btn--outline btn--sm" type="button">Book a viewing</button>
            <button class="btn btn--quiet btn--sm" type="button">Move stage</button>
          </div>
        </div>

        <div class="panel panel--paper">
          <h3 style="margin-top:0">Response targets</h3>
          <table class="data-table">
            <thead><tr><th>Channel</th><th class="num">Target</th><th class="num">Actual</th></tr></thead>
            <tbody>
              <tr><td>Website enquiry</td><td class="num">4 h</td><td class="num">1.4 h</td></tr>
              <tr><td>App chat</td><td class="num">4 h</td><td class="num">0.6 h</td></tr>
              <tr><td>WhatsApp</td><td class="num">2 h</td><td class="num">0.9 h</td></tr>
              <tr><td>Phone callback request</td><td class="num">1 working day</td><td class="num">3.2 h</td></tr>
              <tr><td>Maintenance request</td><td class="num">4 h acknowledgement</td><td class="num">1.1 h</td></tr>
            </tbody>
          </table>
          <p class="tiny muted mt-2">Targets are published to customers on the FAQ and tenant pages, so they are commitments rather than internal hopes.</p>
        </div>
      </div>
    </div>
  </section>
`;

  return {
    path: '/admin/leads',
    locale,
    navKey: 'admin',
    title: 'Lead inbox — enquiry to close | TRIXX',
    description: 'Track every TRIXX enquiry from first contact to sale or lease, with stage, owner, value and full history.',
    noindex: true,
    adminBar,
    jsonLd: breadcrumbLd([{ label: 'Home', href: '/' }, { label: 'Admin', href: '/admin' }, { label: 'Lead inbox', href: '/admin/leads' }]),
    body,
  };
}

function adminModerationPage(locale) {
  const adminBar = adminBarFor(locale, 'moderation');

  const body = `
  <section class="section">
    <div class="wrap wrap--wide">
      ${breadcrumbs([{ label: 'Home', href: '/' }, { label: 'Admin', href: '/admin' }, { label: 'Moderation' }], locale)}
      <div class="section-head">
        <p class="eyebrow">Listing moderation</p>
        <h1>Approve, reject and monitor listings</h1>
        <p class="lede">Nothing goes live without a title check, an identity check and a physical inspection. This queue is where that happens.</p>
      </div>

      <div class="grid grid--4 mb-4">
        ${statBlock({ value: '2', label: 'Awaiting review' })}
        ${statBlock({ value: '1.1 days', label: 'Median review time' })}
        ${statBlock({ value: '6%', label: 'Rejection rate' })}
        ${statBlock({ value: '412', label: 'Listings live' })}
      </div>

      <div class="panel panel--paper">
        <h3 style="margin-top:0">Queue</h3>
        ${MODERATION_QUEUE.map((m) => `<div class="cms-row" style="grid-template-columns:1fr auto auto auto">
          <div>
            <span class="cms-row__title">${esc(m.title)}</span>
            <span class="cms-row__meta">${esc(m.id)} · ${esc(m.owner)} · submitted ${formatDate(m.submitted, locale)}</span>
            <span class="cms-row__meta" style="display:block;margin-top:0.3rem">${esc(m.note)}</span>
          </div>
          <span class="status status--${m.status === 'live' ? 'live' : m.status === 'rejected' ? 'lost' : 'pending'}">${m.status === 'live' ? 'Live' : m.status === 'rejected' ? 'Rejected' : 'Pending'}</span>
          <span class="cms-row__meta">${m.status === 'pending' ? '2 checks outstanding' : m.status === 'live' ? 'Verified' : 'No title evidence'}</span>
          <div class="cluster">
            ${m.status === 'pending' ? '<button class="btn btn--primary btn--sm" type="button">Approve</button><button class="btn btn--outline btn--sm" type="button">Reject</button>' : '<button class="btn btn--quiet btn--sm" type="button">Open</button>'}
          </div>
        </div>`).join('')}
      </div>

      <div class="grid grid--2 mt-4">
        <div class="panel panel--paper">
          <h3 style="margin-top:0">Verification checklist</h3>
          <p class="small muted">A listing cannot be approved until every item is recorded as checked.</p>
          <ul class="spec-list mt-2">
            ${[
              ['Official lands search completed', true],
              ['Owner identity document verified', true],
              ['Written authority held if an agent is listing', true],
              ['Surveyor has photographed the property', false],
              ['Floor plan measured and recorded', false],
              ['Price confirmed with the owner in writing', true],
              ['Smart tier checked against the device schedule', false],
              ['Listing photographs checked against the property', false],
            ].map(([item, done]) => `<li><span>${esc(item)}</span><span style="color:${done ? 'var(--olive)' : 'var(--amber)'}">${done ? '✓ Done' : '○ Pending'}</span></li>`).join('')}
          </ul>
        </div>

        <div class="panel panel--paper">
          <h3 style="margin-top:0">Recent moderation actions</h3>
          <div class="mt-2">
            ${[
              ['2026-10-16', 'TX-1038 rejected — no title evidence after two requests.'],
              ['2026-10-15', 'TX-1030 removed — duplicate of TX-1037.'],
              ['2026-10-14', 'TX-1039 approved and published.'],
              ['2026-10-13', 'Owner account suspended — third duplicate listing in 30 days.'],
              ['2026-10-11', 'TX-1031 price corrected after owner confirmed a typo.'],
            ].map(([date, note]) => `<div class="timeline-item">
              <time>${formatDate(date, locale)}</time>
              <span>${esc(note)}</span>
            </div>`).join('')}
          </div>
        </div>
      </div>
    </div>
  </section>
`;

  return {
    path: '/admin/moderation',
    locale,
    navKey: 'admin',
    title: 'Listing moderation — verification and approval | TRIXX',
    description: 'The TRIXX moderation queue: title checks, identity checks, physical inspections and listing approval.',
    noindex: true,
    adminBar,
    jsonLd: breadcrumbLd([{ label: 'Home', href: '/' }, { label: 'Admin', href: '/admin' }, { label: 'Moderation', href: '/admin/moderation' }]),
    body,
  };
}

function adminBillingPage(locale) {
  const adminBar = adminBarFor(locale, 'billing');

  const body = `
  <section class="section">
    <div class="wrap wrap--wide">
      ${breadcrumbs([{ label: 'Home', href: '/' }, { label: 'Admin', href: '/admin' }, { label: 'Billing' }], locale)}
      <div class="section-head">
        <p class="eyebrow">Owner subscriptions and payments</p>
        <h1>Billing, collection and reconciliation</h1>
        <p class="lede">Owner subscriptions, rent collection and smart-package invoices, with the reconciliation that shows whether the money actually arrived.</p>
      </div>

      <div class="kpi-grid mb-4">
        <div class="kpi"><span class="kpi__label">Subscription revenue</span><span class="kpi__value">${money(720000)}</span><span class="kpi__delta kpi__delta--up">+4.6% MoM</span></div>
        <div class="kpi"><span class="kpi__label">Active subscribers</span><span class="kpi__value">412</span><span class="kpi__delta kpi__delta--up">+18</span></div>
        <div class="kpi"><span class="kpi__label">Failed payments</span><span class="kpi__value">9</span><span class="kpi__delta kpi__delta--down">Retry scheduled</span></div>
        <div class="kpi"><span class="kpi__label">Rent collected</span><span class="kpi__value">${money(14200000)}</span><span class="kpi__delta kpi__delta--up">98.2% on time</span></div>
      </div>

      <div class="grid grid--2">
        <div class="panel panel--paper">
          <h3 style="margin-top:0">Revenue by plan</h3>
          <table class="data-table">
            <thead><tr><th>Plan</th><th class="num">Subscribers</th><th class="num">Monthly</th><th class="num">Churn</th></tr></thead>
            <tbody>
              <tr><td>Standard</td><td class="num">218</td><td class="num">${money(327000)}</td><td class="num">2.1%</td></tr>
              <tr><td>Portfolio</td><td class="num">164</td><td class="num">${money(738000)}</td><td class="num">1.4%</td></tr>
              <tr><td>Agency</td><td class="num">30</td><td class="num">${money(360000)}</td><td class="num">0.6%</td></tr>
            </tbody>
          </table>
          <p class="tiny muted mt-2">Total ${money(1425000)} per month across 412 subscribers, before any rent collection fees.</p>
        </div>

        <div class="panel panel--paper">
          <h3 style="margin-top:0">Recent invoices</h3>
          <table class="data-table">
            <thead><tr><th>Invoice</th><th>Account</th><th class="num">Amount</th><th>Status</th></tr></thead>
            <tbody>
              ${[
                ['INV-2026-10-0041', 'Coastline Properties Ltd', 4500, 'paid'],
                ['INV-2026-10-0040', 'Greenfield Estates', 12000, 'paid'],
                ['INV-2026-10-0039', 'Fatuma Hassan', 1500, 'pending'],
                ['INV-2026-10-0038', 'Rift Valley Homes', 4500, 'paid'],
                ['INV-2026-10-0037', 'Joseph Mwangi', 1500, 'pending'],
                ['INV-2026-10-0036', 'Nairobi Bluechip Ltd', 12000, 'paid'],
              ].map(([id, account, amount, status]) => `<tr>
                <td class="mono small">${esc(id)}</td>
                <td class="small">${esc(account)}</td>
                <td class="num">${money(amount)}</td>
                <td><span class="status status--${status === 'paid' ? 'paid' : 'pending'}">${status === 'paid' ? 'Paid' : 'Due'}</span></td>
              </tr>`).join('')}
            </tbody>
          </table>
        </div>
      </div>

      <div class="panel panel--paper mt-4">
        <h3 style="margin-top:0">Payment reports</h3>
        <div class="grid grid--4">
          ${statBlock({ value: '98.2%', label: 'Rent collected on time' })}
          ${statBlock({ value: 'KES 4.1M', label: 'Held in client account' })}
          ${statBlock({ value: '12 days', label: 'Avg. time to landlord payout' })}
          ${statBlock({ value: '0', label: 'Unreconciled items' })}
        </div>
        <div class="cluster mt-3">
          <button class="btn btn--primary btn--sm" type="button">Export ledger (CSV)</button>
          <button class="btn btn--outline btn--sm" type="button">Run reconciliation</button>
          <button class="btn btn--quiet btn--sm" type="button">View payout schedule</button>
        </div>
      </div>
    </div>
  </section>
`;

  return {
    path: '/admin/billing',
    locale,
    navKey: 'admin',
    title: 'Billing — owner subscriptions and payment reports | TRIXX',
    description: 'Owner subscription billing, rent collection and reconciliation reports in the TRIXX back office.',
    noindex: true,
    adminBar,
    jsonLd: breadcrumbLd([{ label: 'Home', href: '/' }, { label: 'Admin', href: '/admin' }, { label: 'Billing', href: '/admin/billing' }]),
    body,
  };
}

function adminAnalyticsPage(locale) {
  const STYLES = stylesFor(locale);
  const adminBar = adminBarFor(locale, 'analytics');

  const body = `
  <section class="section">
    <div class="wrap wrap--wide">
      ${breadcrumbs([{ label: 'Home', href: '/' }, { label: 'Admin', href: '/admin' }, { label: 'Analytics' }], locale)}
      <div class="section-head">
        <p class="eyebrow">Analytics</p>
        <h1>Visitors, popular styles, conversion and revenue</h1>
        <p class="lede">The four questions we ask of the data: are people arriving, what do they look at, do they convert, and what did it earn.</p>
      </div>

      <div class="grid grid--2">
        <div class="panel panel--paper">
          <h3 style="margin-top:0">Visitors</h3>
          <div class="bars" style="height:6rem">
            <i style="height:62%"></i><i style="height:71%"></i><i style="height:68%"></i><i style="height:82%"></i><i style="height:79%"></i><i style="height:91%"></i><i style="height:100%"></i><i style="height:94%"></i><i style="height:88%"></i><i style="height:96%"></i><i style="height:89%"></i><i style="height:93%"></i>
          </div>
          <table class="data-table mt-3">
            <thead><tr><th>Metric</th><th class="num">This month</th><th class="num">Last month</th><th class="num">Change</th></tr></thead>
            <tbody>
              <tr><td>Unique visitors</td><td class="num">48,210</td><td class="num">42,291</td><td class="num">+14.0%</td></tr>
              <tr><td>Mobile share</td><td class="num">81%</td><td class="num">78%</td><td class="num">+3 pts</td></tr>
              <tr><td>Average session</td><td class="num">4 m 12 s</td><td class="num">3 m 48 s</td><td class="num">+10.5%</td></tr>
              <tr><td>Bounce rate</td><td class="num">38%</td><td class="num">44%</td><td class="num">−6 pts</td></tr>
            </tbody>
          </table>
        </div>

        <div class="panel panel--paper">
          <h3 style="margin-top:0">Popular styles</h3>
          <table class="data-table">
            <thead><tr><th>Collection</th><th class="num">Views</th><th class="num">Saved</th><th class="num">Viewings</th></tr></thead>
            <tbody>
              ${STYLES.map((s, i) => `<tr>
                <td><strong>${esc(s.name)}</strong></td>
                <td class="num">${num(12400 - i * 1450)}</td>
                <td class="num">${num(840 - i * 96)}</td>
                <td class="num">${num(212 - i * 24)}</td>
              </tr>`).join('')}
            </tbody>
          </table>
          <p class="tiny muted mt-2">Swahili Coastal leads on views and on saves. Art Deco converts best relative to views, which matches the urban plot sizes we see most demand for.</p>
        </div>

        <div class="panel panel--paper">
          <h3 style="margin-top:0">Conversion from visit to viewing</h3>
          <table class="data-table">
            <thead><tr><th>Channel</th><th class="num">Visits</th><th class="num">Viewings</th><th class="num">Rate</th></tr></thead>
            <tbody>
              <tr><td>Organic search</td><td class="num">21,480</td><td class="num">968</td><td class="num">4.5%</td></tr>
              <tr><td>Direct</td><td class="num">9,120</td><td class="num">412</td><td class="num">4.5%</td></tr>
              <tr><td>Saved search alerts</td><td class="num">6,740</td><td class="num">318</td><td class="num">4.7%</td></tr>
              <tr><td>Paid social</td><td class="num">7,210</td><td class="num">96</td><td class="num">1.3%</td></tr>
              <tr><td>Referral</td><td class="num">3,660</td><td class="num">38</td><td class="num">1.0%</td></tr>
            </tbody>
          </table>
          <p class="tiny muted mt-2">Paid social brings volume but converts at a quarter of the rate of organic search. Budget follows the rate, not the volume.</p>
        </div>

        <div class="panel panel--paper">
          <h3 style="margin-top:0">Revenue by product</h3>
          <table class="data-table">
            <thead><tr><th>Product</th><th class="num">Revenue</th><th class="num">Units</th><th class="num">Avg. value</th></tr></thead>
            <tbody>
              <tr><td>Home sales</td><td class="num">${money(12400000)}</td><td class="num">3</td><td class="num">${money(4133333)}</td></tr>
              <tr><td>Smart packages</td><td class="num">${money(3860000)}</td><td class="num">11</td><td class="num">${money(350909)}</td></tr>
              <tr><td>Farm plots</td><td class="num">${money(1420000)}</td><td class="num">4</td><td class="num">${money(355000)}</td></tr>
              <tr><td>Owner subscriptions</td><td class="num">${money(720000)}</td><td class="num">412</td><td class="num">${money(1748)}</td></tr>
            </tbody>
          </table>
          <div class="cluster mt-3">
            <button class="btn btn--primary btn--sm" type="button">Export report</button>
            <button class="btn btn--outline btn--sm" type="button">Schedule weekly email</button>
          </div>
        </div>
      </div>

      <div class="panel panel--paper mt-4">
        <h3 style="margin-top:0">Local search performance</h3>
        <p class="small muted">Local landing pages carry the organic traffic. These are the counties that convert.</p>
        <table class="data-table mt-2">
          <thead><tr><th>Landing page</th><th class="num">Impressions</th><th class="num">Clicks</th><th class="num">Viewings</th></tr></thead>
          <tbody>
            ${['Nairobi', 'Mombasa', 'Kiambu', 'Kilifi', 'Machakos', 'Nakuru'].map((county, i) => `<tr>
              <td><a href="${localePath(`/search/${county.toLowerCase()}`, locale)}">Property in ${esc(county)}</a></td>
              <td class="num">${num(38200 - i * 4600)}</td>
              <td class="num">${num(4100 - i * 480)}</td>
              <td class="num">${num(184 - i * 26)}</td>
            </tr>`).join('')}
          </tbody>
        </table>
      </div>
    </div>
  </section>
`;

  return {
    path: '/admin/analytics',
    locale,
    navKey: 'admin',
    title: 'Analytics — visitors, styles, conversion and revenue | TRIXX',
    description: 'TRIXX analytics: visitor numbers, popular house styles, conversion from visit to viewing, and revenue by product.',
    noindex: true,
    adminBar,
    jsonLd: breadcrumbLd([{ label: 'Home', href: '/' }, { label: 'Admin', href: '/admin' }, { label: 'Analytics', href: '/admin/analytics' }]),
    body,
  };
}

function adminBarFor(locale, current) {
  const links = [
    ['Dashboard', '/admin', 'dashboard'],
    ['CMS', '/admin/cms', 'cms'],
    ['Lead inbox', '/admin/leads', 'leads'],
    ['Moderation', '/admin/moderation', 'moderation'],
    ['Billing', '/admin/billing', 'billing'],
    ['Analytics', '/admin/analytics', 'analytics'],
  ];
  return `<div class="admin-bar">
    <div class="wrap">
      <span>Back office · demo data</span>
      <span class="cluster" style="gap:1rem">
        ${links.map(([label, href, key]) => `<a href="${localePath(href, locale)}"${key === current ? ' style="color:var(--paper)"' : ''}>${esc(label)}</a>`).join('')}
      </span>
    </div>
  </div>`;
}

module.exports = () => [
  adminDashboard('en'), adminDashboard('sw'),
  adminCmsPage('en'), adminCmsPage('sw'),
  adminLeadsPage('en'), adminLeadsPage('sw'),
  adminModerationPage('en'), adminModerationPage('sw'),
  adminBillingPage('en'), adminBillingPage('sw'),
  adminAnalyticsPage('en'), adminAnalyticsPage('sw'),
];
