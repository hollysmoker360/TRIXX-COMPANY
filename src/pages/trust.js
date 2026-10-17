'use strict';

const { esc, money, num, formatDate, readingTime, markdown, excerpt } = require('../lib/util');
const { SITE, t } = require('../data/site');
const { c } = require('../data/copy');
const { stylesFor, packagesFor } = require('../data/catalog');
const {
  TESTIMONIALS, CASE_STUDIES, PRESS, TEAM, MILESTONES, FAQ_GROUPS, BLOG_POSTS,
} = require('../data/listings');
const { PROJECTS } = require('../data/portfolio');
const SITE_IMAGES = require('../lib/site-images');
const {
  TEAM_SW, FAQ_SW, TESTIMONIALS_SW, CASE_STUDIES_SW, PRESS_SW, MILESTONES_SW,
} = require('../data/content-sw');
const art = require('../lib/art');

/* Editorial data in listings.js is authored in English. The Kiswahili pages
   overlay the translations by position (arrays) or slug (case studies) so the
   English source keeps owning the structure. */
const teamFor = (locale) => (locale === 'sw'
  ? TEAM.map((p, i) => ({ ...p, ...(TEAM_SW[i] || {}) }))
  : TEAM);

function teamCard(person, index) {
  return `<article class="card team-card">
    <div class="team-card__mark" aria-hidden="true">${String(index + 1).padStart(2, '0')}</div>
    <div class="card__body card__body--tight">
      <h3 class="card__title">${esc(person.role)}</h3>
      ${person.name ? `<p class="team-card__name">${esc(person.name)}</p>` : ''}
    </div>
  </article>`;
}

const testimonialsFor = (locale) => (locale === 'sw'
  ? TESTIMONIALS.map((x, i) => ({ ...x, ...(TESTIMONIALS_SW[i] || {}) }))
  : TESTIMONIALS);

const faqFor = (locale) => (locale === 'sw'
  ? FAQ_GROUPS.map((g, gi) => ({
    ...g,
    items: g.items.map((item, i) => ({ ...item, ...((FAQ_SW[gi] || [])[i] || {}) })),
  }))
  : FAQ_GROUPS);

const milestonesFor = (locale) => (locale === 'sw'
  ? MILESTONES.map((m, i) => ({ ...m, ...(MILESTONES_SW[i] || {}) }))
  : MILESTONES);

const caseStudiesFor = (locale) => {
  if (locale !== 'sw') return CASE_STUDIES;
  return CASE_STUDIES.map((cs) => {
    const sw = CASE_STUDIES_SW[cs.slug];
    if (!sw) return cs;
    return {
      ...cs,
      title: sw.title,
      summary: sw.summary,
      body: sw.body,
      metrics: cs.metrics.map((m, i) => ({ ...m, label: (sw.metrics && sw.metrics[i]) || m.label })),
    };
  });
};

const pressFor = (locale) => (locale === 'sw'
  ? PRESS.map((p, i) => ({ ...p, ...(PRESS_SW[i] || {}) }))
  : PRESS);
const { localePath } = require('../templates/layout');
const {
  breadcrumbs, breadcrumbLd, statBlock, slideshow, testimonialCard, postCard,
  progressTracker, timeline, listingCard,
} = require('../templates/components');

/* ---------- about ---------- */

function aboutPage(locale) {
  const body = `
  <section class="collection-hero">
    <div class="art"><img class="collection-hero__image" src="${SITE_IMAGES.brandVision}" alt="Illustrative concept image for the TRIXX brand vision" fetchpriority="high" decoding="async"></div>
    <div class="collection-hero__scrim"></div>
    <span class="concept-image-label concept-image-label--hero">${locale === 'sw' ? 'Picha ya dhana' : 'Concept image'}</span>
    <div class="wrap collection-hero__inner">
      ${breadcrumbs([{ label: 'Home', href: '/' }, { label: c(locale, 'about.eyebrow') }], locale)}
      <p class="eyebrow">Founded ${SITE.founded} · Nairobi, Kenya</p>
      <h1>${esc(c(locale, 'about.title'))}</h1>
      <p class="lede">${esc(c(locale, 'about.lede'))}</p>
    </div>
  </section>

  <section class="section section--tight">
    <div class="wrap">
      <div class="grid grid--4">
        ${statBlock({ value: '10 yrs', label: 'Building in Kenya' })}
        ${statBlock({ value: '640+', label: 'Homes completed' })}
        ${statBlock({ value: '300+', label: 'Farm plots installed' })}
        ${statBlock({ value: '2,400+', label: 'Live listings' })}
      </div>
    </div>
  </section>

  <section class="section">
    <div class="wrap">
      <div class="grid grid--sidebar grid--sidebar--right">
        <div class="prose">
          <p class="eyebrow">${esc(c(locale, 'about.storyTitle'))}</p>
          <h2>We started with one house and one idea.</h2>
          <p>In 2016 we finished a single house on Kiambu Road with conduit run to every room, a spare route from the roof to the plant position, and a switchboard labelled in plain language. It cost about 4% more than a conventional build of the same size. Nine years later that house has had three rounds of technology added without a single wall being opened, and the owners have never had to move out for an upgrade.</p>
          <p>That 4% is the whole company. Everything TRIXX has built since — the collections, the device schedule, the service spine, the farm controllers — exists to make a building that can absorb change instead of resisting it.</p>

          <h2>What we actually do</h2>
          <p>We are three businesses sharing one engineering standard.</p>
          <ul>
            <li><strong>We build and sell homes.</strong> Six architectural collections, each with a fixed device schedule and a build record that goes to the buyer.</li>
            <li><strong>We list other people's property.</strong> Owner listings, identity-checked and physically inspected, with the same 360 tours and floor plans we give our own homes.</li>
            <li><strong>We run the systems afterwards.</strong> Solar, storage, irrigation, metering, security and the five apps that tie them together.</li>
          </ul>

          <h2>How we work</h2>
          <p>Three habits explain most of our decisions. We measure before we claim — every saving figure on this site comes from installed systems, not a manufacturer's datasheet. We build for the upgrade, because a house outlives the technology inside it. And we tell buyers which properties we built and which we did not, because a verified badge is worthless if it is not honest.</p>

          <h2 id="careers">Working at TRIXX</h2>
          <p>We hire engineers, surveyors, agronomists and support staff, and we promote from the site teams. Roles are advertised on our LinkedIn page. If you have built something in Kenya with your hands, say so in your application — it carries more weight here than a certificate.</p>
        </div>

        <aside class="stack" style="--stack-gap:1.25rem">
          <div class="panel panel--paper">
            <h3 style="margin-top:0">${esc(c(locale, 'about.certsTitle'))}</h3>
            <ul class="spec-list">
              ${SITE.certifications.map((cert) => `<li><span>${esc(cert)}</span><span style="color:var(--teal)">✓</span></li>`).join('')}
            </ul>
          </div>
          <div class="panel panel--paper">
            <h3 style="margin-top:0">${esc(c(locale, 'about.partnersTitle'))}</h3>
            <ul class="spec-list">
              ${SITE.partners.map((p) => `<li><span>${esc(p.name)}<span class="cms-row__meta" style="display:block">${esc(p.role)}</span></span></li>`).join('')}
            </ul>
          </div>
          <figure class="brand-material-card">
            <img src="${SITE_IMAGES.materials}" alt="Concept image showing TRIXX-inspired building materials and textures" loading="lazy" decoding="async">
            <figcaption>${locale === 'sw' ? 'Dhana ya nyenzo na rangi' : 'Concept material palette'}</figcaption>
          </figure>
          <div class="panel panel--ink">
            <h3 style="margin-top:0">Visit us</h3>
            <p class="small" style="color:rgba(244,237,224,0.72)">
              ${esc(SITE.address.line1)}<br>
              ${esc(SITE.address.line2)}<br>
              ${esc(SITE.address.city)} ${esc(SITE.address.postcode)}<br>
              ${esc(SITE.hours)}
            </p>
            <a class="btn btn--brass btn--block mt-3" href="${localePath('/contact', locale)}">${esc(t(locale, 'cta.talkToUs'))}</a>
          </div>
        </aside>
      </div>
    </div>
  </section>

  <section class="section bg-ink">
    <div class="wrap">
      <div class="section-head">
        <p class="eyebrow">${locale === 'sw' ? 'Tunachojenga' : 'What we build'}</p>
        <h2>${locale === 'sw' ? 'Ulimwengu wa TRIXX kwa picha' : 'The TRIXX world in pictures'}</h2>
      </div>
      ${slideshow({
        locale,
        label: locale === 'sw' ? 'Ulimwengu wa TRIXX' : 'The TRIXX world',
        slides: [
          {
            src: SITE_IMAGES.brandVision,
            alt: 'Illustrative concept image for the TRIXX brand vision',
            eyebrow: locale === 'sw' ? 'Maono' : 'Vision',
            title: locale === 'sw' ? 'Nyumba zinazokua na teknolojia' : 'Homes that grow with technology',
            note: locale === 'sw' ? 'Kila nyumba imeandaliwa kupokea maboresho bila kufungua kuta.' : 'Every house is prepared to take upgrades without opening a wall.',
            href: '/house-collections',
          },
          {
            src: SITE_IMAGES.materials,
            alt: 'Concept image showing TRIXX-inspired building materials and textures',
            eyebrow: locale === 'sw' ? 'Nyenzo' : 'Materials',
            title: locale === 'sw' ? 'Nyenzo za kudumu, za hapa nyumbani' : 'Durable, locally sourced materials',
            note: locale === 'sw' ? 'Mawe, mbao na rangi zilizochaguliwa kwa hali ya hewa ya Kenya.' : 'Stone, timber and finishes chosen for the Kenyan climate.',
          },
          {
            src: SITE_IMAGES.technology.infrastructure,
            alt: 'Digital infrastructure concept image',
            eyebrow: locale === 'sw' ? 'Mifumo' : 'Systems',
            title: locale === 'sw' ? 'Mfumo mmoja kwa app zote tano' : 'One platform behind five apps',
            note: locale === 'sw' ? 'Nishati, maji, usalama na malipo vinasimamiwa mahali pamoja.' : 'Energy, water, security and payments managed in one place.',
            href: '/products',
          },
          {
            src: SITE_IMAGES.appDetails.farm,
            alt: 'Illustrative sustainable farming concept, not an installed TRIXX farm',
            eyebrow: locale === 'sw' ? 'Shamba' : 'Farm',
            title: locale === 'sw' ? 'Umwagiliaji unaookoa maji' : 'Irrigation that saves water',
            note: locale === 'sw' ? 'Vidhibiti vya shamba vinavyopima unyevu kabla ya kumwagilia.' : 'Farm controllers that measure soil moisture before they water.',
            href: '/farm-solutions',
          },
          {
            src: SITE_IMAGES.regionalLandscape,
            alt: 'Illustrative regional landscape concept',
            eyebrow: locale === 'sw' ? 'Kenya' : 'Kenya',
            title: locale === 'sw' ? 'Imejengwa kwa ajili ya Kenya' : 'Built for Kenya',
            note: locale === 'sw' ? 'Kutoka Nairobi hadi pwani, tunajenga kwa kila eneo.' : 'From Nairobi to the coast, designed for every region we work in.',
            href: '/contact',
          },
        ],
      })}
    </div>
  </section>

  <section class="section bg-paper2 border-y">
    <div class="wrap">
      <div class="section-head">
        <p class="eyebrow">${esc(c(locale, 'about.milestonesTitle'))}</p>
        <h2>Ten years, in order</h2>
      </div>
      <div class="grid grid--3">
        ${milestonesFor(locale).map((m) => `<div class="panel panel--paper">
          <span class="mono" style="color:var(--brass);font-weight:600">${esc(m.year)}</span>
          <h3 style="margin:0.4rem 0 0.4rem;font-size:1.15rem">${esc(m.title)}</h3>
          <p class="small muted" style="margin:0">${esc(m.body)}</p>
        </div>`).join('')}
      </div>
    </div>
  </section>

  <section class="section">
    <div class="wrap">
      <div class="section-head section-head--split">
        <div>
          <p class="eyebrow">${esc(c(locale, 'about.teamTitle'))}</p>
          <h2>The people who do the work</h2>
        </div>
        <a class="btn btn--outline" href="${localePath('/team', locale)}">${esc(t(locale, 'nav.team'))} →</a>
      </div>
      <div class="grid grid--4">
        ${teamFor(locale).map(teamCard).join('')}
      </div>
    </div>
  </section>

  <section class="section bg-teal">
    <div class="wrap">
      <div class="grid grid--sidebar">
        <div>
          <p class="eyebrow">Our promise</p>
          <h2>What we will always tell you.</h2>
          <ul style="list-style:none;padding:0">
            ${[
              'Whether a property was built by us or listed by someone else',
              'Whether a listing has completed verification',
              'What the smart tier includes, in devices, not adjectives',
              'What a saving is based on, and where it was measured',
              'What a retrofit will realistically cost in your house',
            ].map((item) => `<li style="display:flex;gap:0.7rem;padding:0.6rem 0;border-bottom:1px solid rgba(251,247,239,0.25)"><span style="color:var(--brass-light)">✓</span><span>${esc(item)}</span></li>`).join('')}
          </ul>
        </div>
        <div class="panel panel--paper">
          <h3 style="margin-top:0">Read the detail</h3>
          <ul class="spec-list">
            <li><span><a href="${localePath('/legal/privacy', locale)}">${esc(c(locale, 'legal.privacy'))}</a></span><span>→</span></li>
            <li><span><a href="${localePath('/legal/device-data', locale)}">${esc(c(locale, 'legal.deviceData'))}</a></span><span>→</span></li>
            <li><span><a href="${localePath('/legal/listing-rules', locale)}">${esc(c(locale, 'legal.listingRules'))}</a></span><span>→</span></li>
            <li><span><a href="${localePath('/legal/accessibility', locale)}">${esc(c(locale, 'legal.accessibilityStatement'))}</a></span><span>→</span></li>
            <li><span><a href="${localePath('/portfolio', locale)}">Project portfolio</a></span><span>→</span></li>
          </ul>
        </div>
      </div>
    </div>
  </section>
`;

  return {
    path: '/about',
    locale,
    navKey: 'about',
    title: `${c(locale, 'about.title')} | TRIXX`,
    description: locale === 'sw'
      ? 'TRIXX ilianzishwa Nairobi mwaka 2016. Tunajenga nyumba zinazochukua teknolojia kwa miaka ishirini, tunatangaza mali zilizothibitishwa, na tunaendesha mifumo ya umwagiliaji.'
      : 'TRIXX was founded in Nairobi in 2016 to build houses that absorb technology for twenty years. Today we build smart homes, list verified property and run IoT irrigation across Kenya.',
    jsonLd: [
      breadcrumbLd([{ label: 'Home', href: '/' }, { label: 'About', href: '/about' }]),
      {
        '@context': 'https://schema.org',
        '@type': 'AboutPage',
        name: 'About TRIXX',
        description: 'TRIXX builds smart homes, lists verified property and runs IoT irrigation across Kenya.',
      },
    ],
    body,
  };
}

/* ---------- team ---------- */

function teamPage(locale) {
  const body = `
  <section class="section">
    <div class="wrap">
      ${breadcrumbs([{ label: 'Home', href: '/' }, { label: c(locale, 'about.eyebrow'), href: '/about' }, { label: t(locale, 'nav.team') }], locale)}
      <div class="section-head">
        <p class="eyebrow">${esc(t(locale, 'nav.team'))}</p>
        <h1>${esc(c(locale, 'team.title'))}</h1>
        <p class="lede">${esc(c(locale, 'team.lede'))}</p>
      </div>

      <div class="grid grid--4">
        ${teamFor(locale).map(teamCard).join('')}
      </div>
      <p class="small muted mt-3">${esc(c(locale, 'team.note'))}</p>
    </div>
  </section>

  <section class="section bg-paper2 border-y">
    <div class="wrap">
      <div class="grid grid--sidebar grid--sidebar--right">
        <div>
          <p class="eyebrow">How we are organised</p>
          <h2>Small teams, named owners.</h2>
          <p>Each site has a named project engineer and a named site foreman, and both numbers go to the client on day one. Support has a rota with names on it. If something goes wrong you know who to call, and so do we.</p>
          <div class="grid grid--3 mt-4">
            ${statBlock({ value: '8', label: 'Leadership team' })}
            ${statBlock({ value: '210', label: 'Staff across sites' })}
            ${statBlock({ value: '6', label: 'Active build sites' })}
          </div>
        </div>
        <div class="panel panel--ink">
          <h3 style="margin-top:0">Work with us</h3>
          <p class="small" style="color:rgba(244,237,224,0.72)">We hire engineers, surveyors, agronomists and support staff, and we promote from the site teams.</p>
          <a class="btn btn--brass btn--block mt-3" href="${localePath('/about#careers', locale)}">See open roles</a>
          <a class="btn btn--outline btn--block mt-2" style="border-color:rgba(244,237,224,0.35);color:var(--paper)" href="${localePath('/contact', locale)}">${esc(t(locale, 'cta.talkToUs'))}</a>
        </div>
      </div>
    </div>
  </section>
`;

  return {
    path: '/team',
    locale,
    navKey: 'about',
    title: `Our team and leadership roles | TRIXX`,
    description: 'Meet TRIXX founder Francesc Orwa and explore the leadership roles guiding the company. Additional team profiles will be added soon.',
    jsonLd: [
      breadcrumbLd([{ label: 'Home', href: '/' }, { label: 'About', href: '/about' }, { label: 'Team', href: '/team' }]),
      {
        '@context': 'https://schema.org',
        '@type': 'Organization',
        name: SITE.legalName,
        employee: TEAM.filter((p) => p.name).map((p) => ({
          '@type': 'Person',
          name: p.name,
          jobTitle: p.role,
        })),
      },
    ],
    body,
  };
}

/* ---------- portfolio ---------- */

function portfolioPage(locale) {
  const STYLES = stylesFor(locale);
  const complete = PROJECTS.filter((p) => p.status === 'complete');
  const building = PROJECTS.filter((p) => p.status === 'building');

  const projectCard = (project) => `<article class="card">
    <div class="card__media">
      ${art.houseRender(project.style, { label: `${project.name} completed`, seed: project.slug })}
    </div>
    <div class="card__body">
      <div class="cluster cluster--between">
        <span class="badge ${project.status === 'complete' ? 'badge--teal' : ''}">${project.status === 'complete' ? 'Complete' : `${project.progress}% built`}</span>
        <span class="tiny mono muted">${esc(project.units)} ${project.units === 1 ? 'home' : 'homes'}</span>
      </div>
      <h3 class="card__title"><a href="#${esc(project.slug)}">${esc(project.name)}</a></h3>
      <p class="small muted" style="margin:0">${esc(project.summary)}</p>
      <div class="card__meta">
        <span>${esc(project.location)}</span>
        <span>${esc(STYLES.find((s) => s.slug === project.style).name)}</span>
      </div>
      ${project.status === 'building' ? `<div class="progress-bar mt-2"><i style="width:${project.progress}%"></i></div>` : ''}
      <div class="card__foot">
        <span class="tiny mono">${project.status === 'complete' ? `Completed ${formatDate(project.completed, locale)}` : `Due ${formatDate(project.expected, locale)}`}</span>
        <a class="btn btn--outline btn--sm" href="#${esc(project.slug)}">Details</a>
      </div>
    </div>
  </article>`;

  const projectDetail = (project) => `<article class="panel panel--paper" id="${esc(project.slug)}" style="scroll-margin-top:6rem">
    <div class="split">
      <div>
        <span class="badge ${project.status === 'complete' ? 'badge--teal' : ''}">${project.status === 'complete' ? 'Complete' : `${project.progress}% built`}</span>
        <h3 style="margin:0.6rem 0 0.3rem">${esc(project.name)}</h3>
        <p class="small muted" style="margin:0">${esc(project.location)} · ${esc(STYLES.find((s) => s.slug === project.style).name)} · ${esc(project.tier[0].toUpperCase() + project.tier.slice(1))} tier</p>
      </div>
      <div class="mono tiny muted">${project.status === 'complete' ? `Completed ${formatDate(project.completed, locale)}` : `Started ${formatDate(project.started, locale)} · due ${formatDate(project.expected, locale)}`}</div>
    </div>

    <div class="bda mt-3">
      <figure>
        <div class="art">${art.progressFrame('before', { style: project.style, seed: project.slug, label: `${project.name} before works` })}</div>
        <figcaption><span>Before</span><b>${formatDate(project.timeline[0].date, locale)}</b></figcaption>
      </figure>
      <figure>
        <div class="art">${art.progressFrame('during', { style: project.style, seed: project.slug, label: `${project.name} during construction` })}</div>
        <figcaption><span>During</span><b>${formatDate(project.timeline[1].date, locale)}</b></figcaption>
      </figure>
      <figure>
        <div class="art">${art.progressFrame('after', { style: project.style, seed: project.slug, label: `${project.name} completed` })}</div>
        <figcaption><span>After</span><b>${project.timeline[project.timeline.length - 1].date ? formatDate(project.timeline[project.timeline.length - 1].date, locale) : 'In progress'}</b></figcaption>
      </figure>
    </div>

    <div class="grid grid--sidebar grid--sidebar--right mt-3">
      <div>
        <h3>Progress record</h3>
        ${project.phases ? progressTracker(project.phases) : progressTracker([
          { name: 'Site and foundations', done: true },
          { name: 'Structure to roof', done: true },
          { name: 'Services and conduit', done: true },
          { name: 'Smart device fit-out', done: true },
          { name: 'Landscaping and handover', done: true },
        ])}
        <h3 class="mt-4">Site diary</h3>
        ${timeline(project.timeline)}
      </div>
      <div>
        <h3>Results</h3>
        <ul class="spec-list">
          ${project.metrics.map((m) => `<li><span>${esc(m.label)}</span><span>${esc(m.value)}</span></li>`).join('')}
        </ul>
        <a class="btn btn--outline btn--sm mt-3" href="${localePath(`/house-collections/${project.style}`, locale)}">See the ${esc(STYLES.find((s) => s.slug === project.style).name)} collection</a>
      </div>
    </div>
  </article>`;

  const body = `
  <section class="section">
    <div class="wrap">
      ${breadcrumbs([{ label: 'Home', href: '/' }, { label: t(locale, 'nav.portfolio') }], locale)}
      <div class="section-head">
        <p class="eyebrow">${esc(c(locale, 'portfolio.eyebrow'))}</p>
        <h1>${esc(c(locale, 'portfolio.title'))}</h1>
        <p class="lede">${esc(c(locale, 'portfolio.lede'))}</p>
      </div>

      <div class="grid grid--4 mb-4">
        ${statBlock({ value: '640+', label: 'Homes completed' })}
        ${statBlock({ value: '6', label: 'Active sites' })}
        ${statBlock({ value: '34 wks', label: 'Fastest programme' })}
        ${statBlock({ value: '0', label: 'Handovers late in 2026' })}
      </div>

      <div class="section-head">
        <p class="eyebrow">${esc(c(locale, 'portfolio.building'))}</p>
        <h2>${esc(c(locale, 'portfolio.buildingTitle'))}</h2>
      </div>
      <div class="grid grid--3">${building.map(projectCard).join('')}</div>
    </div>
  </section>

  <section class="section bg-paper2 border-y">
    <div class="wrap wrap--wide">
      <div class="section-head">
        <p class="eyebrow">${esc(c(locale, 'portfolio.recordsTitle'))}</p>
        <h2>${esc(c(locale, 'portfolio.recordsTitle'))}</h2>
        <p class="lede">${esc(c(locale, 'portfolio.lede'))}</p>
      </div>
      <div class="stack" style="--stack-gap:2rem">
        ${PROJECTS.map(projectDetail).join('')}
      </div>
    </div>
  </section>

  <section class="section">
    <div class="wrap">
      <div class="section-head">
        <p class="eyebrow">${esc(c(locale, 'portfolio.complete'))}</p>
        <h2>${esc(c(locale, 'portfolio.completeTitle'))}</h2>
      </div>
      <div class="grid grid--3">${complete.map(projectCard).join('')}</div>
    </div>
  </section>

  <section class="section bg-paper2 border-y">
    <div class="wrap">
      <div class="section-head">
        <p class="eyebrow">${esc(c(locale, 'portfolio.complete'))}</p>
        <h2>${esc(c(locale, 'portfolio.caseTitle'))}</h2>
      </div>
      <div class="grid grid--3">
        ${caseStudiesFor(locale).map((cs) => `<article class="card">
          <div class="card__media">${art.houseRender(cs.style, { label: cs.title, seed: cs.slug })}</div>
          <div class="card__body">
            <h3 class="card__title" style="font-size:1.1rem">${esc(cs.title)}</h3>
            <p class="small muted" style="margin:0">${esc(cs.summary)}</p>
            <ul class="spec-list mt-2">
              ${cs.metrics.map((m) => `<li><span>${esc(m.label)}</span><span>${esc(m.value)}</span></li>`).join('')}
            </ul>
            <p class="small muted mt-2" style="margin:0">${esc(cs.body)}</p>
          </div>
        </article>`).join('')}
      </div>
    </div>
  </section>

  <section class="section">
    <div class="wrap">
      <div class="section-head">
        <p class="eyebrow">${esc(c(locale, 'home.voices.eyebrow'))}</p>
        <h2>${esc(c(locale, 'home.voices.title'))}</h2>
      </div>
      <div class="grid grid--3">${testimonialsFor(locale).map(testimonialCard).join('')}</div>
    </div>
  </section>

  <section class="section bg-paper2 border-y" id="press">
    <div class="wrap">
      <div class="section-head">
        <p class="eyebrow">Press mentions</p>
        <h2>Where TRIXX has been written about</h2>
      </div>
      <div class="panel panel--paper">
        ${pressFor(locale).map((item) => `<div class="cms-row">
          <div>
            <a class="cms-row__title" href="${esc(item.href)}" rel="noopener">${esc(item.title)}</a>
            <span class="cms-row__meta">${esc(item.outlet)}</span>
          </div>
          <div><span class="cms-row__meta">${formatDate(item.date, locale)}</span></div>
          <div></div>
          <div><a class="btn btn--quiet btn--sm" href="${esc(item.href)}" rel="noopener">Read →</a></div>
        </div>`).join('')}
      </div>
      <p class="tiny muted mt-3">Press enquiries: <a href="mailto:press@trixx.co.ke">press@trixx.co.ke</a></p>
    </div>
  </section>
`;

  return {
    path: '/portfolio',
    locale,
    navKey: 'about',
    title: `Project portfolio — before, during and after | TRIXX`,
    description: 'TRIXX project records: completed homes and live builds with before, during and after photographs, a phase-by-phase progress tracker and measured results.',
    jsonLd: [
      breadcrumbLd([{ label: 'Home', href: '/' }, { label: 'Portfolio', href: '/portfolio' }]),
      {
        '@context': 'https://schema.org',
        '@type': 'ItemList',
        name: 'TRIXX projects',
        itemListElement: PROJECTS.map((p, i) => ({
          '@type': 'ListItem',
          position: i + 1,
          name: p.name,
          url: `${SITE.url}/portfolio#${p.slug}`,
        })),
      },
    ],
    body,
  };
}

/* ---------- blog ---------- */

function blogIndex(locale) {
  const [featured, ...rest] = BLOG_POSTS;
  const categories = [...new Set(BLOG_POSTS.map((p) => p.category))];

  const body = `
  <section class="section">
    <div class="wrap">
      ${breadcrumbs([{ label: 'Home', href: '/' }, { label: t(locale, 'nav.blog') }], locale)}
      <div class="section-head">
        <p class="eyebrow">${esc(t(locale, 'nav.blog'))}</p>
        <h1>${esc(c(locale, 'blog.title'))}</h1>
        <p class="lede">${esc(c(locale, 'blog.lede'))}</p>
      </div>

      <div class="material-list mb-4">
        ${categories.map((cat) => `<span class="tag">${esc(cat)}</span>`).join('')}
      </div>

      <article class="grid grid--sidebar grid--sidebar--right mb-4">
        <div class="card__media" style="border:1px solid var(--line);border-radius:var(--radius-lg);overflow:hidden">
          ${art.houseRender(featured.style, { label: featured.title, seed: featured.slug })}
        </div>
        <div>
          <span class="badge badge--teal">Latest</span>
          <div class="post-card__meta mt-2">
            <span>${esc(featured.category)}</span>
            <span>${formatDate(featured.date, locale)}</span>
            <span>${readingTime(featured.body)} min read</span>
          </div>
          <h2 style="margin:0.6rem 0 0.6rem"><a href="${localePath(`/blog/${featured.slug}`, locale)}">${esc(featured.title)}</a></h2>
          <p class="lede">${esc(featured.excerpt)}</p>
          <a class="btn btn--primary mt-3" href="${localePath(`/blog/${featured.slug}`, locale)}">Read the guide</a>
        </div>
      </article>

      <div class="grid grid--3">
        ${rest.map((p) => postCard(p, locale)).join('')}
      </div>
    </div>
  </section>

  <section class="section bg-paper2 border-y">
    <div class="wrap">
      <div class="grid grid--sidebar grid--sidebar--right">
        <div>
          <p class="eyebrow">Get the monthly note</p>
          <h2>One email a month, no drip sequence.</h2>
          <p>New listings that match what you are looking for, new releases, and one farm tip worth using. Unsubscribe in one click.</p>
          <form class="newsletter" data-form="newsletter" style="max-width:32rem" novalidate>
            <label class="visually-hidden" for="blog-nl">Email address</label>
            <input id="blog-nl" type="email" name="email" placeholder="you@example.com" required style="background:var(--paper);border-color:var(--line-strong);color:var(--ink)">
            <button class="btn btn--primary" type="submit">${esc(t(locale, 'footer.subscribe'))}</button>
          </form>
          <p class="tiny muted mt-2" data-form-msg hidden></p>
        </div>
        <div class="panel panel--paper">
          <h3 style="margin-top:0">Popular topics</h3>
          <div class="material-list">
            ${['Smart home cost', 'Solar payback', 'Soil moisture', 'Tenancy deposits', 'Title search', 'Coastal cooling'].map((topic) => `<span class="tag">${esc(topic)}</span>`).join('')}
          </div>
        </div>
      </div>
    </div>
  </section>
`;

  return {
    path: '/blog',
    locale,
    navKey: 'about',
    title: `Blog and guides — buying, renting, smart homes and farm tips | TRIXX`,
    description: 'Practical guides from TRIXX on buying and renting property in Kenya, smart-home costs and solar payback, soil-moisture irrigation and farm economics.',
    jsonLd: [
      breadcrumbLd([{ label: 'Home', href: '/' }, { label: 'Blog', href: '/blog' }]),
      {
        '@context': 'https://schema.org',
        '@type': 'Blog',
        name: 'TRIXX Blog and Guides',
        url: `${SITE.url}/blog`,
        blogPost: BLOG_POSTS.map((p) => ({
          '@type': 'BlogPosting',
          headline: p.title,
          datePublished: p.date,
          author: { '@type': 'Person', name: p.author },
          url: `${SITE.url}/blog/${p.slug}`,
        })),
      },
    ],
    body,
  };
}

function blogPostPage(post, locale) {
  const related = BLOG_POSTS.filter((p) => p.slug !== post.slug).slice(0, 3);

  const body = `
  <section class="section">
    <div class="wrap">
      ${breadcrumbs([{ label: 'Home', href: '/' }, { label: t(locale, 'nav.blog'), href: '/blog' }, { label: post.category }], locale)}
      <div class="wrap--narrow" style="padding:0;max-width:52rem">
        <div class="post-card__meta">
          <span>${esc(post.category)}</span>
          <span>${formatDate(post.date, locale)}</span>
          <span>${readingTime(post.body)} min read</span>
        </div>
        <h1 style="font-size:clamp(2rem,1.4rem+2.6vw,3.4rem);margin:0.75rem 0 1rem">${esc(post.title)}</h1>
        <p class="lede">${esc(post.excerpt)}</p>
        ${locale === 'sw' ? `<div class="note note--teal mt-2">
          <p class="small" style="margin:0"><strong>${esc(c(locale, 'langNotice.title'))}</strong> ${esc(c(locale, 'langNotice.body'))}</p>
        </div>` : ''}
        <div class="cluster mt-3">
          ${art.avatar(post.author, { cls: 'avatar-art' })}
          <span>
            <strong style="display:block;font-size:0.92rem">${esc(post.author)}</strong>
            <span class="tiny muted">TRIXX</span>
          </span>
        </div>
      </div>
    </div>
  </section>

  <section class="section section--flush">
    <div class="wrap">
      <div class="wrap--narrow" style="padding:0">
        <div class="card__media" style="border:1px solid var(--line);border-radius:var(--radius-lg);overflow:hidden;margin-bottom:2.5rem">
          ${art.houseRender(post.style, { label: post.title, seed: post.slug, w: 1600, h: 900 })}
        </div>
        <div class="prose">
          ${markdown(post.body)}
        </div>

        <div class="panel panel--paper mt-4">
          <h3 style="margin-top:0">Next step</h3>
          <p class="small muted">If this raised a question about your own house or plot, our team will answer it without a sales pitch.</p>
          <div class="cluster mt-2">
            <a class="btn btn--primary" href="${localePath('/contact', locale)}">${esc(t(locale, 'cta.talkToUs'))}</a>
            <a class="btn btn--outline" href="${localePath('/tools/savings-calculator', locale)}">${esc(t(locale, 'cta.calculate'))}</a>
            <a class="btn btn--quiet" href="${localePath('/book-viewing', locale)}">${esc(t(locale, 'cta.book'))}</a>
          </div>
        </div>
      </div>
    </div>
  </section>

  <section class="section bg-paper2 border-y">
    <div class="wrap">
      <div class="section-head section-head--split">
        <div>
          <p class="eyebrow">Keep reading</p>
          <h2>Related guides</h2>
        </div>
        <a class="btn btn--outline" href="${localePath('/blog', locale)}">${esc(t(locale, 'nav.blog'))} →</a>
      </div>
      <div class="grid grid--3">${related.map((p) => postCard(p, locale)).join('')}</div>
    </div>
  </section>
`;

  return {
    path: `/blog/${post.slug}`,
    locale,
    navKey: 'about',
    ogType: 'article',
    title: `${post.title} | TRIXX`,
    description: post.excerpt,
    jsonLd: [
      breadcrumbLd([
        { label: 'Home', href: '/' },
        { label: 'Blog', href: '/blog' },
        { label: post.title, href: `/blog/${post.slug}` },
      ]),
      {
        '@context': 'https://schema.org',
        '@type': 'BlogPosting',
        headline: post.title,
        description: post.excerpt,
        datePublished: post.date,
        author: { '@type': 'Person', name: post.author },
        publisher: { '@type': 'Organization', name: SITE.legalName },
        mainEntityOfPage: { '@type': 'WebPage', '@id': `${SITE.url}/blog/${post.slug}` },
      },
    ],
    body,
  };
}

/* ---------- FAQ ---------- */

function faqPage(locale) {
  const PACKAGES = packagesFor(locale);
  const total = FAQ_GROUPS.reduce((n, g) => n + g.items.length, 0);

  const body = `
  <section class="section">
    <div class="wrap">
      ${breadcrumbs([{ label: 'Home', href: '/' }, { label: t(locale, 'nav.faq') }], locale)}
      <div class="section-head">
        <p class="eyebrow">${esc(c(locale, 'faq.eyebrow'))}</p>
        <h1>${esc(c(locale, 'faq.title'))}</h1>
        <p class="lede">${esc(c(locale, 'faq.lede'))}</p>
      </div>

      <div class="grid grid--sidebar grid--sidebar--right">
        <div>
          ${faqFor(locale).map((group) => `<div class="faq-group">
            <h2>${esc(group.title)}</h2>
            ${group.items.map((item) => `<details class="faq">
              <summary>${esc(item.q)}</summary>
              <div><p>${esc(item.a)}</p></div>
            </details>`).join('')}
          </div>`).join('')}
        </div>

        <aside class="stack" style="--stack-gap:1rem">
          <div class="panel panel--ink">
            <h3 style="margin-top:0">${esc(c(locale, 'faq.stuck'))}</h3>
            <p class="small" style="color:rgba(244,237,224,0.72)">${esc(c(locale, 'faq.stuckNote'))}</p>
            <a class="btn btn--brass btn--block mt-3" href="${localePath('/contact', locale)}">${esc(t(locale, 'cta.talkToUs'))}</a>
            <a class="btn btn--outline btn--block mt-2" style="border-color:rgba(244,237,224,0.35);color:var(--paper)" href="https://wa.me/${esc(SITE.whatsapp.replace(/\D/g, ''))}">${esc(t(locale, 'cta.whatsapp'))}</a>
          </div>
          <div class="panel panel--paper">
            <h3 style="margin-bottom:0.6rem">${esc(c(locale, 'faq.jump'))}</h3>
            <ul style="list-style:none;padding:0;margin:0;font-size:0.88rem">
              ${faqFor(locale).map((g) => `<li style="padding:0.35rem 0;border-bottom:1px solid var(--line)"><a href="#${g.title.toLowerCase().replace(/[^a-z]+/g, '-')}">${esc(g.title)}</a></li>`).join('')}
            </ul>
          </div>
          <div class="panel panel--paper">
            <h3 style="margin-bottom:0.6rem">${esc(c(locale, 'legal.andData'))}</h3>
            <ul style="list-style:none;padding:0;margin:0;font-size:0.88rem">
              <li style="padding:0.35rem 0"><a href="${localePath('/legal/privacy', locale)}">${esc(c(locale, 'legal.privacy'))}</a></li>
              <li style="padding:0.35rem 0"><a href="${localePath('/legal/device-data', locale)}">${esc(c(locale, 'legal.deviceData'))}</a></li>
              <li style="padding:0.35rem 0"><a href="${localePath('/legal/terms', locale)}">${esc(c(locale, 'legal.terms'))}</a></li>
              <li style="padding:0.35rem 0"><a href="${localePath('/legal/listing-rules', locale)}">${esc(c(locale, 'legal.listingRules'))}</a></li>
            </ul>
          </div>
        </aside>
      </div>
    </div>
  </section>
`;

  return {
    path: '/faq',
    locale,
    navKey: 'about',
    title: `FAQ — buying, renting, farm solutions and device data | TRIXX`,
    description: 'Answers on TRIXX smart tiers, verifying owner listings, mortgages, rent payment, repairs, irrigation savings, and exactly what camera and device data we collect.',
    jsonLd: [
      breadcrumbLd([{ label: 'Home', href: '/' }, { label: 'FAQ', href: '/faq' }]),
      {
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: faqFor(locale).flatMap((g) => g.items.map((item) => ({
          '@type': 'Question',
          name: item.q,
          acceptedAnswer: { '@type': 'Answer', text: item.a },
        }))),
      },
    ],
    body,
  };
}

module.exports = () => [
  aboutPage('en'), aboutPage('sw'),
  teamPage('en'), teamPage('sw'),
  portfolioPage('en'), portfolioPage('sw'),
  blogIndex('en'), blogIndex('sw'),
  ...BLOG_POSTS.flatMap((p) => [blogPostPage(p, 'en'), blogPostPage(p, 'sw')]),
  faqPage('en'), faqPage('sw'),
];
