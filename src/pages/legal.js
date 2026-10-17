'use strict';

const { esc, formatDate, markdown } = require('../lib/util');
const { SITE, t } = require('../data/site');
const { c } = require('../data/copy');
const { localePath } = require('../templates/layout');
const { breadcrumbs, breadcrumbLd } = require('../templates/components');

const UPDATED = '2026-09-01';

/* Legal content is authored in English and referenced by the Kiswahili pages,
   which state plainly that the English text governs. Machine-translating a
   privacy policy or terms of service would create a document nobody can rely
   on, so we do not pretend to. */
const DOCS = {
  privacy: {
    title: 'Privacy policy',
    intro: 'What we collect, why, how long we keep it and how to make us delete it.',
    body: `
## Who we are

${SITE.legalName}, of ${SITE.address.line1}, ${SITE.address.line2}, ${SITE.address.city} ${SITE.address.postcode}, ${SITE.address.country}, is the data controller for the personal data described in this policy. Our data protection contact is privacy@trixx.co.ke.

## What we collect

**Account data.** Your name, email address, phone number, password hash, preferred language and the role you select when you register.

**Property and tenancy data.** Saved searches, favourites, listings you create, viewings you book, offers and enquiries, tenancy records, rent payments, receipts and maintenance requests.

**Payment data.** We do not store card numbers. Card payments are handled by our payment processor, which returns a token and the last four digits. M-Pesa payments return a transaction reference.

**Device and telemetry data.** If you use a TRIXX smart-home or farm system: device identifiers, firmware version, online and offline state, fault and error events, battery level, energy generation and consumption readings, water flow and soil-moisture readings, and automation execution logs.

**Camera data.** By default, video from TRIXX cameras is recorded to the local hub in your own home and stays there. We do not receive, view or store your video unless you switch on cloud backup. See the camera and device data note for the full position.

**Website data.** Pages viewed, referring source, approximate location derived from IP address, device type and browser. We use this to understand which pages work.

## Why we process it

- To create and secure your account, and to sign you in across the website and the five apps.
- To provide the service you asked for: search, listings, viewings, tenancy management, rent collection, device control and irrigation.
- To verify owner listings, which requires identity and title checks.
- To support you: diagnosing a fault needs device telemetry.
- To meet legal obligations, including tax, anti-money-laundering and tenancy law.
- To send you information you asked for. Marketing is opt-in and every message has a one-click unsubscribe.

We rely on contract for providing the service, legal obligation for tax and tenancy records, legitimate interest for security and fraud prevention, and consent for marketing and for cloud video backup.

## Who we share it with

- **Payment processors** to move money and issue receipts.
- **Cloud infrastructure providers** who host our systems.
- **Device manufacturers and installers** where a fault needs a warranty repair.
- **Landlords and property owners** for the tenancy and listing data that concerns them.
- **Professional advisers and regulators** where the law requires it.

We do not sell personal data. We do not share device telemetry with advertisers, and we do not use camera data for any purpose other than the recording you switched on.

## How long we keep it

- Account data: while the account is open, then 12 months.
- Tenancy and rent records: 7 years, because tax and tenancy law require it.
- Listing records: 3 years after the listing is withdrawn.
- Device telemetry: 24 months at full resolution, then aggregated.
- Camera video: on your local hub, under your control, or in cloud backup for the retention period you choose.
- Website analytics: 14 months.

## Your rights

You can ask for a copy of your data, ask us to correct it, ask us to delete it, object to processing based on legitimate interest, ask us to restrict processing, and ask for portability in a machine-readable format. Email privacy@trixx.co.ke. We respond within 30 days. You can also export your device history, energy logs and receipts as CSV from the app at any time.

If you are unhappy with our response you can complain to the Office of the Data Protection Commissioner in Kenya.

## Security

Transport is encrypted with TLS. Passwords are stored as salted hashes. Access to production data is limited to named staff, logged, and reviewed quarterly. We run annual penetration tests and publish a security contact at security@trixx.co.ke.

## Children

Our services are not directed at children under 18. A school account is created by the school, and guardian data is held on the school's instructions.

## Changes

If we change this policy in a way that affects your rights, we will tell you by email and in the app before the change takes effect. The date at the top of this page always shows the current version.
`,
  },
  terms: {
    title: 'Terms of service',
    intro: 'The agreement between you and TRIXX when you use this website, the apps or our services.',
    body: `
## 1. Who this agreement is with

This agreement is between you and ${SITE.legalName}. By using this website, any TRIXX app or any TRIXX service, you accept these terms. If you do not accept them, do not use the services.

## 2. Your account

You must give accurate information when you register and keep it current. You are responsible for what happens under your account, so keep your password to yourself and tell us immediately if you think someone else has it. You must be 18 or older to hold an account. We may suspend an account that breaches these terms or the listing rules.

## 3. Property listings

**TRIXX-built homes.** A TRIXX-built home is one we developed. It carries a build record describing structure, services and the smart device schedule.

**Owner listings.** These are posted by owners or their agents. We verify identity, title or authority, and the physical property before applying the verified badge. Verification is a check at a point in time, not a guarantee of title, condition or value.

**Your responsibility.** You must satisfy yourself about any property before you commit money. Get your own legal advice, your own survey if you want one, and your own valuation. Nothing on this site is legal, tax or investment advice.

## 4. Prices and costs

Prices shown are indicative and in Kenya Shillings. Build prices exclude land unless stated. Statutory approvals, VAT and any site-specific works are confirmed in a written quote, which is the document that governs a build contract. Rent and sale prices on listings are set by the owner and can change.

## 5. Rent and tenancy

Where TRIXX manages a tenancy, rent is collected and held in a designated client account and released to the landlord in accordance with the tenancy agreement. Rent is due on the day stated in your lease. Repairs are acknowledged within four working hours and targeted for resolution within 48 hours where the issue affects habitability. The tenancy agreement governs the tenancy; these terms do not override it.

## 6. Smart systems and apps

We grant you a personal, non-transferable right to use the apps while your account is open. We may update, change or retire features. Device control depends on your internet connection, your local network and your hardware, and we do not warrant uninterrupted operation. Where a device is covered by a warranty, the warranty terms of the manufacturer and our installation warranty both apply; the longer of the two prevails.

## 7. Acceptable use

Do not post listings you have no authority to post. Do not post false prices, photographs of other properties, or duplicate listings. Do not scrape the site, attempt to access another user's account, interfere with the service, or use it to break the law. Do not use camera or device systems to monitor anyone who has not consented.

## 8. Our liability

We do not exclude liability for death or personal injury caused by our negligence, for fraud, or for anything else the law does not allow us to exclude. Subject to that, our total liability arising from the services is limited to the greater of the fees you paid us in the twelve months before the claim, or KES 100,000. We are not liable for indirect or consequential loss, or for loss of profit, opportunity or data.

## 9. Ending the agreement

You may close your account at any time. We may end or suspend the agreement if you breach it, if we are required to by law, or if we stop providing the service. Clauses that by their nature should survive — liability, governing law, and any accrued payment obligations — survive termination.

## 10. Governing law

These terms are governed by the laws of Kenya, and the courts of Kenya have exclusive jurisdiction. Before starting proceedings, we both agree to try to resolve the dispute through good-faith discussion and, if that fails, mediation.

## 11. Changes

We may change these terms. If a change materially affects your rights we will give you notice by email and in the app before it takes effect. Continuing to use the services after that means you accept the new terms.
`,
  },
  cookies: {
    title: 'Cookie policy',
    intro: 'The cookies and local storage this site uses, and how to control them.',
    body: `
## What we use

**Strictly necessary.** A session cookie keeps you signed in and protects forms against cross-site request forgery. The site will not work without it.

**Local storage, not cookies.** Your saved searches, favourites and property comparison are stored in your browser's local storage, not sent to us as cookies. Clearing your browser data removes them.

**Analytics.** We use first-party analytics to count visits and see which pages are used. We do not run third-party advertising trackers on this site, and we do not sell or share analytics data with advertisers.

## Third parties

Embedded content — for example a map or a video — may set its own cookies when you interact with it. Those are controlled by the provider, not by us, and are only loaded when you choose to load the embed.

## Controlling cookies

Every major browser lets you block or delete cookies and local storage. If you block the strictly necessary cookie you will not be able to sign in. Blocking analytics has no effect on how the site works for you.

## Contact

Questions about cookies: privacy@trixx.co.ke.
`,
  },
  'device-data': {
    title: 'Camera and device data',
    intro: 'Exactly what a TRIXX smart home or farm system sends us, what stays in your house, and the choices you have.',
    body: `
## The short version

Video from your cameras records to the local hub in your home and stays there by default. We receive device health and usage telemetry so we can support you and keep the system running. We do not watch your video, we do not sell device data, and we do not use it for advertising.

## What stays in your home

- Camera video and audio, recorded to the local hub.
- Motion clips and snapshots, unless you enable cloud backup.
- Local automation rules and schedules, which run on the hub even when the internet is down.
- Door lock access codes and biometric templates. Biometric data never leaves the device.

## What we receive

- Device identifiers, model and firmware version.
- Online and offline state, and the timestamp of the last contact.
- Fault and error events, so we can tell you a sensor has failed before you notice.
- Battery level and power state.
- Energy generation, storage and consumption readings.
- Water flow, tank level and soil-moisture readings.
- Automation execution logs, showing which rule ran and when.
- Camera health metadata: whether the camera is online, recording and within storage limits.

We do not receive the contents of your video, your audio, your access codes, or your biometric templates unless you specifically enable cloud video backup or send us a clip when reporting a fault.

## Cloud backup, if you enable it

Cloud video backup is off by default and is a separate choice. If you switch it on you choose the retention period — 7, 30 or 90 days. You can switch it off at any time, and we delete the stored clips within 30 days of you doing so. Clips are encrypted at rest and in transit.

## Who can see telemetry

Named TRIXX support engineers, when a fault or a support request requires it, under a logged access process reviewed quarterly. Aggregated, de-identified figures — for example the average water saving across plots — may be used in reporting, and never in a way that identifies a household.

## Your choices

- **Turn cloud backup off**, or never turn it on.
- **Set your own camera schedule** so cameras only record when you want them to.
- **Export your data** as CSV from the app: device history, energy logs and receipts.
- **Delete your account and data.** We complete deletion within 30 days, except records we must keep for tax and tenancy law, which are listed in the privacy policy.
- **Ask us what we hold** about your account and devices.

## If you employ staff at home

If you run cameras in a home where people work, tell them the cameras are there, where they point and when they record. Kenyan data protection law treats employees' personal data as requiring a lawful basis and transparency, and so do we. Our installation team will show you where to put the recording schedule so that private areas are excluded.

## Contact

Device data questions: privacy@trixx.co.ke. Security reports: security@trixx.co.ke.
`,
  },
  accessibility: {
    title: 'Accessibility statement',
    intro: 'How this site and our apps meet accessibility standards, and how to tell us when they do not.',
    body: `
## Our commitment

We want everyone to be able to find a home, pay rent and manage a property through TRIXX. We build to the Web Content Accessibility Guidelines (WCAG) 2.2 at level AA.

## What we have done

- Every page works with a keyboard alone, with a visible focus indicator.
- Colour contrast meets or exceeds AA for text and for interface components.
- All meaningful images and generated illustrations carry text alternatives.
- Forms have real labels, clear error messages and sensible input types.
- Motion respects the \`prefers-reduced-motion\` setting, and the site works with animations disabled.
- Text scales to 200% without loss of content or function.
- Headings follow a logical order, and each page has a single main landmark.
- The site is usable at mobile widths from 320 pixels upward, since most visitors arrive on a phone.
- Language is declared for both English and Kiswahili pages, and each page links to its translation.

## Known limitations

- The 360° tour viewer relies on pointer dragging. Keyboard arrow keys work, but screen-reader users get the room list as text instead of the panorama. We are working on a described-tour alternative.
- The schematic map view is decorative. The list view carries the same information and is the default on small screens.
- Some older PDF documents are not yet tagged for screen readers. Ask us and we will send an accessible version.

## Telling us about a problem

Email accessibility@trixx.co.ke with the page address and a short description of what happened. We aim to reply within five working days and to fix anything that blocks a core task within 30 days.

## Feedback

If you need information from this site in another format — large print, plain text, or a phone call — ask us and we will provide it at no cost.
`,
  },
  'listing-rules': {
    title: 'Listing rules',
    intro: 'What may be listed, what must be true, and what gets a listing removed.',
    body: `
## Who may list

You may list a property if you are the registered owner, or you hold written authority from the owner, or you are a licensed agent acting for them. We ask for evidence of that before a listing goes live.

## What a listing must contain

- The correct location, at least to estate and town level.
- The true asking price, or the true monthly rent. The price an enquirer is quoted must match the price on the listing.
- The number of bedrooms and bathrooms.
- Photographs of the actual property. Not a similar unit, not a render passed off as a photograph.
- The plot size and the built area, measured rather than estimated.
- The smart tier, if the property is fitted with one, stated in devices rather than adjectives.
- Running costs where they are known: service charge, rates and insurance.
- The date the property becomes available.

## What gets a listing rejected or removed

- No evidence of ownership or authority.
- The same property posted more than once.
- A price that differs from the price quoted to enquirers.
- Photographs that are not of the property.
- A property that is not actually available.
- Claims about the smart specification or amenities that are not fitted.
- Discriminatory wording, including any preference based on ethnicity, religion, disability, family status or nationality.

## Verification

The verified badge means we have checked the title or lease, confirmed the identity of the person listing, and sent a surveyor to photograph and measure the property. We re-check live listings every six months. Verification is a point-in-time check, not a guarantee of title, condition or value.

## Fees

Listing is free for the first 30 days. After that a monthly plan applies: Standard at KES 1,500 for one listing, Portfolio at KES 4,500 for up to five, Agency at KES 12,000 for unlimited listings and a team dashboard. We take no commission on a sale. You can cancel at any time and the listing comes down the same day.

## Enforcement

A first breach usually gets a warning and a request to correct the listing. Serious breaches — a false title claim, or taking money from an enquirer under false pretences — result in immediate removal and account suspension, and we may report the matter to the authorities. You can appeal any decision by emailing listings@trixx.co.ke within 14 days.
`,
  },
};

/* URL slugs carry hyphens; copy keys are camelCase. */
const COPY_KEY = {
  'device-data': 'deviceData',
  'listing-rules': 'listingRules',
};

function legalPage(slug, locale) {
  const doc = DOCS[slug];
  const others = Object.entries(DOCS).filter(([key]) => key !== slug);
  /* Titles and intros are short enough to translate faithfully; the body stays
     English because a translated contract is not a contract anyone can rely on. */
  const docTitle = c(locale, `legalDoc.${COPY_KEY[slug] || slug}.title`);
  const docIntro = c(locale, `legalDoc.${COPY_KEY[slug] || slug}.intro`);
  const otherTitle = (key) => c(locale, `legalDoc.${COPY_KEY[key] || key}.title`);

  const body = `
  <section class="section">
    <div class="wrap">
      ${breadcrumbs([{ label: 'Home', href: '/' }, { label: docTitle }], locale)}
      <div class="grid grid--sidebar grid--sidebar--right">
        <div class="prose">
          <p class="eyebrow">${esc(c(locale, 'legalDoc.eyebrow'))}</p>
          <h1>${esc(docTitle)}</h1>
          <p class="lede">${esc(docIntro)}</p>
          <p class="tiny muted">${esc(c(locale, 'legalDoc.updated'))} ${formatDate(UPDATED, locale)}</p>
          ${locale === 'sw' ? `<div class="note note--terra mt-3">
            <strong>${esc(c(locale, 'langNotice.title'))}</strong> ${esc(c(locale, 'langNotice.body'))}
          </div>` : ''}
          <hr>
          ${markdown(doc.body)}
        </div>

        <aside class="stack" style="--stack-gap:1rem">
          <div class="panel panel--paper">
            <h3 style="margin-bottom:0.6rem">${esc(c(locale, 'legalDoc.other'))}</h3>
            <ul style="list-style:none;padding:0;margin:0;font-size:0.88rem">
              ${others.map(([key, other]) => `<li style="padding:0.4rem 0;border-bottom:1px solid var(--line)"><a href="${localePath(`/legal/${key}`, locale)}">${esc(otherTitle(key))}</a></li>`).join('')}
              <li style="padding:0.4rem 0"><a href="${localePath('/faq', locale)}">${esc(t(locale, 'nav.faq'))}</a></li>
            </ul>
          </div>
          <div class="panel panel--ink">
            <h3 style="margin-top:0;color:var(--paper)">${esc(c(locale, 'legalDoc.questions'))}</h3>
            <p class="small" style="color:rgba(244,237,224,0.72)">${esc(c(locale, 'legalDoc.writeTo'))} <a href="mailto:${esc(SITE.email)}">${esc(SITE.email)}</a> ${esc(c(locale, 'legalDoc.answer'))}</p>
            <a class="btn btn--brass btn--block mt-2" href="${localePath('/contact', locale)}">${esc(t(locale, 'cta.talkToUs'))}</a>
          </div>
        </aside>
      </div>
    </div>
  </section>
`;

  return {
    path: `/legal/${slug}`,
    locale,
    navKey: 'legal',
    title: `${docTitle} | TRIXX`,
    description: docIntro,
    jsonLd: breadcrumbLd([{ label: 'Home', href: '/' }, { label: docTitle, href: `/legal/${slug}` }]),
    body,
  };
}

module.exports = () => {
  const pages = [];
  for (const slug of Object.keys(DOCS)) {
    pages.push(legalPage(slug, 'en'), legalPage(slug, 'sw'));
  }
  return pages;
};
