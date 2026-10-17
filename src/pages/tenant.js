'use strict';

const { esc, money, num, formatDate } = require('../lib/util');
const { SITE, t } = require('../data/site');
const { c } = require('../data/copy');
const { LISTINGS } = require('../data/listings');
const art = require('../lib/art');
const { localePath } = require('../templates/layout');
const { breadcrumbs, breadcrumbLd, statBlock } = require('../templates/components');

const LEDGER = [
  { ref: 'RCP-2026-10-0214', date: '2026-10-05', amount: 85000, method: 'M-Pesa', status: 'paid' },
  { ref: 'RCP-2026-09-0198', date: '2026-09-04', amount: 85000, method: 'M-Pesa', status: 'paid' },
  { ref: 'RCP-2026-08-0176', date: '2026-08-05', amount: 85000, method: 'M-Pesa', status: 'paid' },
  { ref: 'RCP-2026-07-0152', date: '2026-07-06', amount: 85000, method: 'Card', status: 'paid' },
  { ref: 'RCP-2026-06-0131', date: '2026-06-05', amount: 42500, method: 'M-Pesa', status: 'part' },
  { ref: 'RCP-2026-06-0130', date: '2026-06-05', amount: 42500, method: 'M-Pesa', status: 'paid' },
];

const REPAIRS = [
  { id: 'MR-2291', title: 'Kitchen tap dripping', raised: '2026-10-12', status: 'resolved', note: 'Cartridge replaced by the plumber. Closed in 31 hours.' },
  { id: 'MR-2288', title: 'Gate motor not responding', raised: '2026-10-04', status: 'resolved', note: 'Battery replaced and remote re-paired.' },
  { id: 'MR-2302', title: 'Bedroom window seal', raised: '2026-10-15', status: 'pending', note: 'Contractor scheduled for 19 October, 10:00.' },
];

function tenantPortal(locale) {
  const tenancy = {
    property: LISTINGS.find((l) => l.purpose === 'rent') || LISTINGS[0],
    unit: 'Unit 4B',
    rent: 85000,
    deposit: 170000,
    dueDay: 5,
    leaseStart: '2025-11-01',
    leaseEnd: '2026-10-31',
    balance: 0,
  };

  const adminBar = `<div class="admin-bar">
    <div class="wrap">
      <span>Tenant portal · demo data</span>
      <span class="cluster" style="gap:1rem">
        <a href="${localePath('/tenant', locale)}">Overview</a>
        <a href="${localePath('/tenant#repairs', locale)}">Repairs</a>
        <a href="${localePath('/login', locale)}">${esc(t(locale, 'cta.login'))}</a>
      </span>
    </div>
  </div>`;

  const body = `
  <section class="section section--tight">
    <div class="wrap wrap--wide">
      ${breadcrumbs([{ label: 'Home', href: '/' }, { label: c(locale, 'accounts.portalTitle') }], locale)}
      <div class="split">
        <div>
          <p class="eyebrow">${esc(c(locale, 'accounts.portalTitle'))}</p>
          <h1>${esc(tenancy.unit)}, ${esc(tenancy.property.location)}</h1>
          <p class="lede">${esc(tenancy.property.id)} · lease ${formatDate(tenancy.leaseStart, locale)} to ${formatDate(tenancy.leaseEnd, locale)}</p>
        </div>
        <div class="cluster">
          <a class="btn btn--primary" href="#pay">Pay rent</a>
          <a class="btn btn--outline" href="#repairs">Log a repair</a>
        </div>
      </div>

      <div class="kpi-grid mt-4">
        <div class="kpi">
          <span class="kpi__label">Balance</span>
          <span class="kpi__value">${money(tenancy.balance)}</span>
          <span class="kpi__delta kpi__delta--up">Up to date</span>
        </div>
        <div class="kpi">
          <span class="kpi__label">Monthly rent</span>
          <span class="kpi__value">${money(tenancy.rent)}</span>
          <span class="kpi__delta">Due on the ${tenancy.dueDay}th</span>
        </div>
        <div class="kpi">
          <span class="kpi__label">Deposit held</span>
          <span class="kpi__value">${money(tenancy.deposit)}</span>
          <span class="kpi__delta">Refundable within 30 days</span>
        </div>
        <div class="kpi">
          <span class="kpi__label">Open repairs</span>
          <span class="kpi__value">1</span>
          <span class="kpi__delta">Booked for 19 Oct</span>
        </div>
        <div class="kpi">
          <span class="kpi__label">Lease ends</span>
          <span class="kpi__value">${formatDate(tenancy.leaseEnd, locale).split(' ').slice(1).join(' ')}</span>
          <span class="kpi__delta">Renewal offered</span>
        </div>
      </div>
    </div>
  </section>

  <section class="section section--flush">
    <div class="wrap wrap--wide">
      <div class="dash">
        <nav class="dash__nav" aria-label="Portal sections">
          <a href="#pay" aria-current="page">Pay rent</a>
          <a href="#ledger">Receipts and ledger</a>
          <a href="#repairs">Maintenance</a>
          <a href="#lease">My lease</a>
        </nav>

        <div class="stack" style="--stack-gap:2rem">
          <div id="pay" class="panel panel--paper">
            <div class="section-head">
              <p class="eyebrow">Pay rent</p>
              <h2>Pay by M-Pesa or card</h2>
              <p class="lede">A receipt is issued the moment payment settles, usually in under thirty seconds.</p>
            </div>
            <div class="grid grid--2">
              <form data-form="rent" novalidate>
                <div class="field">
                  <label for="pay-amount">Amount (KES)</label>
                  <input id="pay-amount" type="number" name="amount" value="${tenancy.rent}" min="1000" step="500" required>
                  <span class="field__hint">Rent is ${money(tenancy.rent)}. Paying more credits the following month.</span>
                </div>
                <div class="field">
                  <label for="pay-method">Payment method</label>
                  <select id="pay-method" name="method">
                    <option value="mpesa">M-Pesa ···· 4821</option>
                    <option value="card">Visa ···· 4417</option>
                  </select>
                </div>
                <div class="field">
                  <label for="pay-month">Rent period</label>
                  <select id="pay-month" name="month">
                    <option value="2026-11">November 2026</option>
                    <option value="2026-12">December 2026</option>
                    <option value="2027-01">January 2027</option>
                  </select>
                </div>
                <button class="btn btn--primary btn--lg btn--block" type="submit">Pay ${money(tenancy.rent)}</button>
                <p class="tiny muted mt-2" data-form-msg hidden></p>
              </form>

              <div class="panel panel--ink" style="align-self:start">
                <h3 style="margin-top:0">Your tenancy</h3>
                <ul class="spec-list" style="border-top:1px solid rgba(244,237,224,0.2)">
                  <li style="border-bottom-color:rgba(244,237,224,0.15)"><span style="color:rgba(244,237,224,0.65)">Property</span><span style="color:var(--paper)">${esc(tenancy.property.id)}</span></li>
                  <li style="border-bottom-color:rgba(244,237,224,0.15)"><span style="color:rgba(244,237,224,0.65)">Unit</span><span style="color:var(--paper)">${esc(tenancy.unit)}</span></li>
                  <li style="border-bottom-color:rgba(244,237,224,0.15)"><span style="color:rgba(244,237,224,0.65)">Rent</span><span style="color:var(--paper)">${money(tenancy.rent)}</span></li>
                  <li style="border-bottom-color:rgba(244,237,224,0.15)"><span style="color:rgba(244,237,224,0.65)">Due day</span><span style="color:var(--paper)">${tenancy.dueDay}th</span></li>
                  <li style="border-bottom:0"><span style="color:rgba(244,237,224,0.65)">Landlord</span><span style="color:var(--paper)">${esc(tenancy.property.agent)}</span></li>
                </ul>
                <p class="tiny mt-3" style="color:rgba(244,237,224,0.6)">Rent is held in a designated client account and released to the landlord on the fifth working day.</p>
              </div>
            </div>
          </div>

          <div id="ledger">
            <div class="section-head section-head--split">
              <div>
                <p class="eyebrow">Receipts and ledger</p>
                <h2>Every payment, receipted</h2>
              </div>
              <button class="btn btn--outline btn--sm" type="button">Export CSV</button>
            </div>
            <div style="overflow-x:auto">
              <table class="data-table">
                <thead><tr><th>Receipt</th><th>Date</th><th class="num">Amount</th><th>Method</th><th>Status</th><th></th></tr></thead>
                <tbody>
                  ${LEDGER.map((row) => `<tr>
                    <td class="mono">${esc(row.ref)}</td>
                    <td class="small muted">${formatDate(row.date, locale)}</td>
                    <td class="num">${money(row.amount)}</td>
                    <td class="small muted">${esc(row.method)}</td>
                    <td><span class="status status--${row.status === 'paid' ? 'paid' : 'pending'}">${row.status === 'paid' ? 'Paid' : 'Part payment'}</span></td>
                    <td><button class="btn btn--quiet btn--sm" type="button">Download</button></td>
                  </tr>`).join('')}
                </tbody>
              </table>
            </div>
            <div class="grid grid--3 mt-3">
              ${statBlock({ value: money(85000), label: 'Paid this year' })}
              ${statBlock({ value: '0', label: 'Late payments' })}
              ${statBlock({ value: money(tenancy.deposit), label: 'Deposit held' })}
            </div>
          </div>

          <div id="repairs">
            <div class="section-head section-head--split">
              <div>
                <p class="eyebrow">Maintenance</p>
                <h2>Log a repair and follow it</h2>
                <p class="lede">We acknowledge within four working hours and target 48 hours for anything that affects habitability. You see every status change.</p>
              </div>
            </div>

            <form class="panel panel--paper" data-form="repair" novalidate>
              <div class="form-grid">
                <div class="field">
                  <label for="mr-title">What needs fixing</label>
                  <input id="mr-title" type="text" name="title" placeholder="e.g. Kitchen tap dripping" required>
                </div>
                <div class="field">
                  <label for="mr-area">Where</label>
                  <select id="mr-area" name="area">
                    <option>Kitchen</option>
                    <option>Bathroom</option>
                    <option>Bedroom</option>
                    <option>Living area</option>
                    <option>Gate and parking</option>
                    <option>Common area</option>
                  </select>
                </div>
                <div class="field">
                  <label for="mr-urgency">Urgency</label>
                  <select id="mr-urgency" name="urgency">
                    <option value="normal">Normal — within 48 hours</option>
                    <option value="soon">Soon — within 5 working days</option>
                    <option value="urgent">Urgent — affects habitability</option>
                  </select>
                </div>
                <div class="field">
                  <label for="mr-access">Access</label>
                  <select id="mr-access" name="access">
                    <option>I will be home</option>
                    <option>Key with the caretaker</option>
                    <option>Call before arriving</option>
                  </select>
                </div>
              </div>
              <div class="field">
                <label for="mr-detail">Detail</label>
                <textarea id="mr-detail" name="detail" placeholder="When it started, what you have already tried, and anything the contractor should know."></textarea>
                <span class="field__hint">Attach photos from the app. Photos cut the average resolution time by about a third.</span>
              </div>
              <button class="btn btn--primary btn--lg" type="submit">Submit request</button>
              <p class="tiny muted mt-2" data-form-msg hidden></p>
            </form>

            <div class="panel panel--paper mt-3">
              <h3 style="margin-top:0">Your requests</h3>
              ${REPAIRS.map((r) => `<div class="timeline-item">
                <time>${formatDate(r.raised, locale)}</time>
                <span>
                  <strong>${esc(r.title)}</strong>
                  <span class="cms-row__meta" style="display:block">${esc(r.id)} · ${esc(r.note)}</span>
                  <span class="status status--${r.status === 'resolved' ? 'won' : 'pending'}" style="margin-top:0.4rem;display:inline-block">${r.status === 'resolved' ? 'Resolved' : 'Scheduled'}</span>
                </span>
              </div>`).join('')}
            </div>
          </div>

          <div id="lease">
            <div class="section-head">
              <p class="eyebrow">My lease</p>
              <h2>Lease documents and renewal</h2>
            </div>
            <div class="grid grid--2">
              <div class="panel panel--paper">
                <h3 style="margin-bottom:0.6rem">Documents</h3>
                <ul class="spec-list">
                  <li><span>Tenancy agreement</span><span><button class="btn btn--quiet btn--sm" type="button">Download</button></span></li>
                  <li><span>Move-in inventory</span><span><button class="btn btn--quiet btn--sm" type="button">Download</button></span></li>
                  <li><span>Deposit receipt</span><span><button class="btn btn--quiet btn--sm" type="button">Download</button></span></li>
                  <li><span>Building rules</span><span><button class="btn btn--quiet btn--sm" type="button">Download</button></span></li>
                </ul>
              </div>
              <div class="panel panel--paper">
                <h3 style="margin-bottom:0.6rem">Renewal</h3>
                <p class="small muted">Your lease ends ${formatDate(tenancy.leaseEnd, locale)}. We have offered a twelve-month renewal at the same rent, held for you until ${formatDate('2026-11-15', locale)}.</p>
                <div class="cluster mt-2">
                  <button class="btn btn--primary btn--sm" type="button">Accept renewal</button>
                  <button class="btn btn--outline btn--sm" type="button">Discuss terms</button>
                </div>
                <hr>
                <h3 style="margin-bottom:0.6rem">Move-out</h3>
                <p class="small muted" style="margin:0">Give 60 days written notice. The deposit is refunded within 30 days of the move-out inspection.</p>
                <button class="btn btn--quiet btn--sm mt-2" type="button">Start notice</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>

  <section class="section bg-paper2 border-y">
    <div class="wrap">
      <div class="grid grid--sidebar grid--sidebar--right">
        <div>
          <p class="eyebrow">Same records in the app</p>
          <h2>The portal and TRIXX Rent share one ledger.</h2>
          <p>A payment made here appears in the landlord's dashboard immediately, and a repair logged in the app appears here. There is no separate system to reconcile and no paper receipt to keep.</p>
          <div class="grid grid--3 mt-4">
            ${statBlock({ value: '< 30 s', label: 'Payment settlement' })}
            ${statBlock({ value: 'Instant', label: 'Receipt delivery' })}
            ${statBlock({ value: '86%', label: 'Repairs closed in 48 h' })}
          </div>
        </div>
        <div class="phone-frame">${art.appScreen('rent', { label: 'TRIXX Rent app screen' })}</div>
      </div>
    </div>
  </section>
`;

  return {
    path: '/tenant',
    locale,
    navKey: 'tenant',
    title: 'Tenant portal — pay rent, receipts and repairs | TRIXX',
    description: 'Pay rent by M-Pesa or card, download instant receipts, follow your balance and submit maintenance requests from the web or the app.',
    noindex: true,
    adminBar,
    jsonLd: breadcrumbLd([{ label: 'Home', href: '/' }, { label: 'Tenant portal', href: '/tenant' }]),
    body,
  };
}

module.exports = () => [tenantPortal('en'), tenantPortal('sw')];
