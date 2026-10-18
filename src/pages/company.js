'use strict';

const { esc } = require('../lib/util');
const { SITE } = require('../data/site');
const images = require('../lib/site-images');

const DIVISIONS = [
  {
    slug: 'real-estate-smart-homes',
    name: 'TRIXX Real Estate & Smart Homes',
    short: 'Real Estate & Smart Homes',
    image: images.apps.market,
    imageAlt: 'Concept image illustrating a modern residential property',
    description: 'Bringing together property, architectural concepts and technology-enabled living through solutions designed for modern homes and property projects.',
    audience: 'People exploring residential property, property developers and customers planning technology-enabled homes.',
    problem: 'Property information and home technology can be difficult to consider together. This division explores clearer ways to present property concepts and plan connected living.',
    focus: ['Property showcasing and marketing', 'Architectural concepts and house-plan presentation', 'Smart-home planning and integration', 'Connected residential experiences', 'Energy and water monitoring concepts', 'Property development information and project portfolios'],
    note: 'Architectural, engineering and estate-agency services are not represented as licensed services. Professional arrangements and authorizations must be confirmed before any such service is offered.',
  },
  {
    slug: 'edtech',
    name: 'TRIXX EdTech',
    short: 'EdTech',
    image: images.apps.school,
    imageAlt: 'Concept image illustrating a modern learning environment',
    description: 'Developing digital tools that help schools, teachers, students and parents organize educational activities and communicate more effectively.',
    audience: 'Schools, educators, students and parents looking for better-organized education workflows.',
    problem: 'Education communities often coordinate records, schedules and communication across disconnected processes. TRIXX EdTech explores tools that could bring those activities together.',
    focus: ['School administration', 'Student and staff records', 'Attendance tracking', 'Timetables and academic calendars', 'Assignments and assessments', 'School communications', 'Parent and student portals', 'Online learning and virtual classrooms'],
    note: 'These are product capabilities under consideration or development, not a statement that every feature is available today.',
  },
  {
    slug: 'property-management',
    name: 'TRIXX Property Management',
    short: 'Property Management',
    image: images.apps.rent,
    imageAlt: 'Concept image illustrating a residential community',
    description: 'Helping landlords and property managers simplify rental operations, track payment records and maintain clearer records.',
    audience: 'Landlords and property managers seeking more organized property, tenancy and maintenance records.',
    problem: 'Rental information can be spread across records and conversations. This division explores ways to make recurring property tasks easier to organize and review.',
    focus: ['Property and unit management', 'Tenant records', 'Rent schedules and payment tracking', 'Arrears monitoring', 'Receipts and statements', 'Maintenance requests', 'Lease and payment reminders', 'Expense tracking', 'M-Pesa integration as a planned capability'],
    note: 'Payment records must not be confused with confirmed payments. M-Pesa integration is planned, not represented as implemented. TRIXX will never request or store a tenant’s M-Pesa PIN.',
  },
  {
    slug: 'agritech',
    name: 'TRIXX AgriTech',
    short: 'AgriTech',
    image: images.apps.farm,
    imageAlt: 'Concept image illustrating technology-assisted agriculture',
    description: 'Exploring digital tools that help farmers organize farm activities, monitor costs and make better-informed operational decisions.',
    audience: 'Farmers and agricultural operators who want practical ways to organize field activity and farm records.',
    problem: 'Farm activities, inputs and costs can be hard to track consistently, particularly where connectivity is limited. This division explores field-friendly digital records.',
    focus: ['Farm and crop records', 'Planting and harvesting calendars', 'Farm input inventory', 'Cost and revenue tracking', 'Irrigation planning', 'Pest and disease reporting', 'Weather information integrations', 'Harvest and sales records', 'Offline-friendly field data capture'],
    note: 'No guaranteed yield, profit or scientifically validated farming advice is claimed. Weather integrations and other capabilities depend on future development and third-party services.',
  },
  {
    slug: 'smart-living-iot',
    name: 'TRIXX Smart Living & IoT',
    short: 'Smart Living & IoT',
    image: images.apps.home,
    imageAlt: 'Concept image illustrating a connected home interior',
    description: 'Connecting compatible devices and digital systems to make homes and selected environments easier to monitor and manage.',
    audience: 'Homeowners, property teams and organizations considering compatible connected-device experiences.',
    problem: 'Connected devices can be difficult to manage across separate systems. This division explores practical, security-conscious approaches to monitoring and coordinating compatible devices.',
    focus: ['Smart-device onboarding', 'Device status monitoring', 'Lighting and compatible appliance controls', 'Automation schedules', 'Energy and water usage monitoring', 'Device health and alerts', 'Role-based access', 'Secure remote access', 'Compatible third-party device integrations'],
    note: 'Remote control, automation and integrations are product-development areas and are not represented as available services until implementation and testing are confirmed.',
  },
];

const MISSION = 'To develop practical, accessible and responsible technology solutions that help people and organizations work, learn, manage resources and live more effectively.';
const VISION = 'To build a trusted technology group creating useful digital solutions for Africa and beyond.';
const VALUES = [
  'Innovation with purpose',
  'Integrity and transparency',
  'Customer-centered design',
  'Reliability and security',
  'Continuous learning',
  'Responsible growth',
];

function photo(src, alt, className = '') {
  return `<figure class="corp-photo ${className}">
    <img src="${esc(src)}" alt="${esc(alt)}" loading="lazy" decoding="async">
    <figcaption>Concept image · illustrative, not a TRIXX project photograph</figcaption>
  </figure>`;
}

function pageDocument(path, title, description, body) {
  return {
    path,
    locale: 'en',
    noHreflang: true,
    hreflangLocales: ['en'],
    noSitemap: false,
    theme: 'corporate',
    navKey: 'corporate',
    title: `${title} | ${SITE.name}`,
    description,
    body,
  };
}

function divisionCard(division) {
  return `<article class="division-card">
    <a class="division-card__image" href="/divisions/${division.slug}" aria-label="Discover ${esc(division.name)}">
      <img src="${esc(division.image)}" alt="${esc(division.imageAlt)}" loading="lazy" decoding="async">
      <span>Concept image</span>
    </a>
    <div class="division-card__content">
      <p class="corp-kicker">Division 0${DIVISIONS.indexOf(division) + 1}</p>
      <h3><a href="/divisions/${division.slug}">${esc(division.name)}</a></h3>
      <p>${esc(division.description)}</p>
      <a class="corp-text-link" href="/divisions/${division.slug}">Discover more <span aria-hidden="true">→</span></a>
    </div>
  </article>`;
}

function homePage() {
  const body = `
  <section class="corp-hero">
    <img class="corp-hero__image" src="${esc(images.homepageHero)}" alt="Illustrative technology and living concept image, not a completed TRIXX project" fetchpriority="high" decoding="async">
    <div class="corp-hero__veil"></div>
    <div class="corp-shell corp-hero__content">
      <p class="corp-kicker">TRIXX Technologies · Kenya</p>
      <h1>Technology that moves life forward.</h1>
      <p>We develop practical digital solutions across real estate, education, property management, agriculture and smart living.</p>
      <div class="corp-actions">
        <a class="corp-button corp-button--gold" href="/divisions">Explore our divisions <span aria-hidden="true">→</span></a>
        <a class="corp-button corp-button--light" href="/contact?interest=partnership">Partner with us</a>
      </div>
      <span class="corp-hero__caption">Illustrative concept image · not a completed TRIXX project</span>
    </div>
  </section>

  <section class="corp-section corp-intro">
    <div class="corp-shell corp-intro__grid">
      <p class="corp-kicker">One company, shared purpose</p>
      <div><h2>One vision. Multiple industries. Practical innovation.</h2>
      <p>TRIXX Technologies is a parent company developing specialized solutions for different industries, guided by usability, responsible innovation, reliability and long-term value.</p></div>
    </div>
  </section>

  <section class="corp-section corp-section--soft" id="divisions">
    <div class="corp-shell">
      <div class="corp-section-heading"><div><p class="corp-kicker">Our divisions</p><h2>Focused on everyday challenges.</h2></div><a class="corp-text-link" href="/divisions">View all divisions <span aria-hidden="true">→</span></a></div>
      <div class="division-grid">${DIVISIONS.map(divisionCard).join('')}</div>
    </div>
  </section>

  <section class="corp-section corp-approach">
    <div class="corp-shell">
      <div class="corp-section-heading"><div><p class="corp-kicker">Our approach</p><h2>Built around real-world problems.</h2></div><p>We aim to build carefully, learn from the people who use our solutions, and grow only when the work is ready.</p></div>
      <ol class="approach-list"><li><span>01</span><h3>Understand</h3><p>Listen to customers and define the problem.</p></li><li><span>02</span><h3>Design</h3><p>Shape a practical solution around real needs.</p></li><li><span>03</span><h3>Build and test</h3><p>Develop the product and check how it works.</p></li><li><span>04</span><h3>Learn</h3><p>Collect feedback and improve thoughtfully.</p></li><li><span>05</span><h3>Grow responsibly</h3><p>Scale when the solution and its support are ready.</p></li></ol>
    </div>
  </section>

  <section class="corp-section corp-projects-preview">
    <div class="corp-shell corp-projects-preview__grid">
      ${photo(images.technology.innovation, 'Illustrative image representing research and technology development')}
      <div><p class="corp-kicker">Projects & innovation</p><h2>Ideas develop through evidence.</h2><p>We will share verified concepts, prototypes and products as their status is confirmed. No completed projects are presented here without approved project information.</p><a class="corp-text-link" href="/projects">Explore projects & innovation <span aria-hidden="true">→</span></a></div>
    </div>
  </section>

  <section class="corp-section corp-leader-preview">
    <div class="corp-shell corp-leader-preview__grid"><div class="corp-avatar" role="img" aria-label="Initials placeholder for Francesc's approved portrait">F</div>
      <div><p class="corp-kicker">Leadership</p><h2>Francesc</h2><p class="corp-leader-preview__title">Founder & CEO, TRIXX Technologies</p><p>His leadership focuses on building a technology company developing solutions across real estate, education, property management, agriculture and smart living.</p><a class="corp-text-link" href="/leadership">Meet our founder <span aria-hidden="true">→</span></a><p class="corp-note">Portrait pending approval. This initials placeholder is not a photograph.</p></div></div>
  </section>

  <section class="corp-cta"><div class="corp-shell corp-cta__inner"><div><p class="corp-kicker">Start a conversation</p><h2>Let’s build something meaningful.</h2><p>Have a project, business challenge or partnership opportunity? Connect with TRIXX Technologies to start a conversation.</p></div><a class="corp-button corp-button--gold" href="/contact">Contact our team <span aria-hidden="true">→</span></a></div></section>`;

  return pageDocument('/', 'Technology that moves life forward', SITE.description, body);
}

function aboutPage() {
  const body = `
  <section class="corp-page-hero"><div class="corp-shell"><p class="corp-kicker">About TRIXX Technologies</p><h1>One parent company. Five areas of focus.</h1><p>We are building a technology group developing specialized solutions for how people live, learn, manage property, farm and interact with connected devices.</p></div></section>
  <section class="corp-section"><div class="corp-shell corp-about-grid"><div><p class="corp-kicker">Our company</p><h2>Practical technology, developed with purpose.</h2></div><div><p>TRIXX Technologies brings related business divisions together under a shared commitment to useful, responsible and maintainable technology. Our initial focus is Kenya, with an ambition to serve other African markets and international customers over time.</p><p>Each division explores a distinct set of customer needs while benefiting from shared learning, product thinking and a consistent approach to trust and usability.</p></div></div></section>
  <section class="corp-section corp-section--soft"><div class="corp-shell corp-purpose-grid"><article><p class="corp-kicker">Mission</p><h2>What we work toward.</h2><p>${esc(MISSION)}</p></article><article><p class="corp-kicker">Vision</p><h2>Where we hope to go.</h2><p>${esc(VISION)}</p></article></div></section>
  <section class="corp-section"><div class="corp-shell"><div class="corp-section-heading"><div><p class="corp-kicker">Our values</p><h2>Principles that guide our work.</h2></div></div><ul class="value-list">${VALUES.map((value, index) => `<li><span>0${index + 1}</span>${esc(value)}</li>`).join('')}</ul></div></section>
  <section class="corp-section corp-section--navy"><div class="corp-shell corp-about-grid"><div><p class="corp-kicker">How we work</p><h2>Shared foundations. Specialized solutions.</h2></div><div><p>We start by understanding a problem, design a practical response, then build, test and learn. The divisions share this approach while developing for their own customers and contexts. Capabilities are described as areas of focus until their implementation is verified.</p><a class="corp-button corp-button--gold" href="/divisions">Meet the divisions <span aria-hidden="true">→</span></a></div></div></section>`;
  return pageDocument('/about', 'About Us', 'Learn about TRIXX Technologies, its mission, vision, values and five areas of focus.', body);
}

function divisionsPage() {
  const body = `<section class="corp-page-hero"><div class="corp-shell"><p class="corp-kicker">Our divisions</p><h1>Different challenges. One shared purpose.</h1><p>Five areas of focus, brought together by practical and responsible technology development.</p></div></section><section class="corp-section corp-section--soft"><div class="corp-shell"><div class="division-grid division-grid--index">${DIVISIONS.map(divisionCard).join('')}</div></div></section>`;
  return pageDocument('/divisions', 'Our Divisions', 'Explore the five business divisions of TRIXX Technologies.', body);
}

function divisionPage(division) {
  const body = `
  <section class="corp-page-hero corp-page-hero--division"><div class="corp-shell corp-division-hero"><div><a class="corp-back-link" href="/divisions">← All divisions</a><p class="corp-kicker">TRIXX Technologies division</p><h1>${esc(division.name)}</h1><p>${esc(division.description)}</p></div>${photo(division.image, division.imageAlt)}</div></section>
  <section class="corp-section"><div class="corp-shell corp-about-grid"><div><p class="corp-kicker">The opportunity</p><h2>Problems worth solving.</h2></div><div><p>${esc(division.problem)}</p><h3>Who we aim to serve</h3><p>${esc(division.audience)}</p></div></div></section>
  <section class="corp-section corp-section--soft"><div class="corp-shell"><p class="corp-kicker">Areas of focus</p><h2>What this division is exploring.</h2><ul class="focus-list">${division.focus.map((item, index) => `<li><span>0${index + 1}</span>${esc(item)}</li>`).join('')}</ul><p class="corp-note corp-note--wide">${esc(division.note)} These items describe focus or development areas, not a claim that products or services are already operational.</p></div></section>
  <section class="corp-section"><div class="corp-shell corp-faq"><div><p class="corp-kicker">Status & questions</p><h2>Clear about where things stand.</h2><span class="corp-status">Exploration and development areas</span></div><div><details><summary>Are these products and capabilities available now?</summary><p>This website describes areas of focus. Availability will be stated only when a capability has been implemented and verified.</p></details><details><summary>Can I discuss a project or partnership?</summary><p>Yes. The contact page explains the current enquiry channel and what is needed to enable message submission.</p></details><details><summary>Where can I see completed TRIXX projects?</summary><p>Only verified and approved work will be published. No project examples are presented as completed without that confirmation.</p></details></div></div></section>
  <section class="corp-cta"><div class="corp-shell corp-cta__inner"><div><p class="corp-kicker">Interested in ${esc(division.short)}</p><h2>Let’s discuss the opportunity.</h2><p>Tell us what you are exploring. Enquiry submission is not yet configured on this site.</p></div><a class="corp-button corp-button--gold" href="/contact?interest=${encodeURIComponent(division.short)}">Contact TRIXX <span aria-hidden="true">→</span></a></div></section>`;
  return pageDocument(`/divisions/${division.slug}`, division.name, division.description, body);
}

function projectsPage() {
  const body = `<section class="corp-page-hero"><div class="corp-shell"><p class="corp-kicker">Projects & innovation</p><h1>Development, shared honestly.</h1><p>We will publish approved project and product information with a clear status: concept, in development, prototype or launched.</p></div></section>
  <section class="corp-section"><div class="corp-shell heritage-project-link"><img src="${esc(images.architectureInspiration[0].src)}" alt="Illustrative Moorish courtyard architecture concept" loading="lazy" decoding="async"><div><p class="heritage-kicker">Featured concept study</p><h2>Heritage Meets Tomorrow</h2><p>Four architectural directions bring cultural identity together with considered home technology and material choices.</p><a class="heritage-link" href="/projects/heritage-meets-tomorrow">View the concept board <span aria-hidden="true">→</span></a><span class="heritage-status">Concept study · not a completed TRIXX project</span></div></div></section>
  <section class="corp-section corp-section--soft"><div class="corp-shell corp-projects-empty"><p class="corp-status">Project portfolio pending verified content</p><h2>No project case studies are published yet.</h2><p>As project details and images are approved, this page can distinguish completed work from concepts, research and products in development. The images currently used across this site are illustrative concepts, not photographs of completed TRIXX projects.</p><div class="corp-project-areas"><h3>Areas of innovation</h3><ul>${DIVISIONS.map((division) => `<li><a href="/divisions/${division.slug}">${esc(division.short)} <span aria-hidden="true">→</span></a></li>`).join('')}</ul></div></div></section>`;
  return pageDocument('/projects', 'Projects & Innovation', 'Verified projects and product development information from TRIXX Technologies.', body);
}

function heritageBoardPage() {
  const concepts = [
    {
      number: '01',
      name: 'The Moorish Smart Palace',
      lineage: 'Andalusian · Moorish',
      image: images.architectureInspiration[0].src,
      alt: 'Illustrative Moorish-inspired courtyard house with arches and a central reflecting pool',
      description: 'Horseshoe arches, geometric screens and a planted courtyard create a calm centre for family life.',
      technology: 'Adaptive courtyard lighting · smart glass · automated privacy screens',
    },
    {
      number: '02',
      name: 'The Swahili Coastal Residence',
      lineage: 'Swahili · Indian Ocean coast',
      image: images.architecture['swahili-coastal'],
      alt: 'Illustrative Swahili coastal residence with shaded verandas and tropical planting',
      description: 'Carved timber, shaded verandas and an inward-facing courtyard reinterpret coastal privacy and passive cooling.',
      technology: 'Humidity sensing · smart ventilation · rainwater storage',
    },
    {
      number: '03',
      name: 'The African Earth House',
      lineage: 'African vernacular · earth craft',
      image: images.architectureInspiration[2].src,
      alt: 'Illustrative earth-toned home concept with deep roof overhangs and natural textures',
      description: 'Earth-toned surfaces, local material expression and deep overhangs bring landscape and living space closer.',
      technology: 'Solar microgrid · greywater reuse · indoor air-quality sensing',
    },
    {
      number: '04',
      name: 'The Mediterranean Estate',
      lineage: 'Mediterranean · contemporary villa',
      image: images.apps.market,
      alt: 'Illustrative contemporary estate concept with warm lighting and broad indoor-outdoor glazing',
      description: 'Stone, clay-toned finishes and open-air terraces meet a restrained, contemporary approach to comfort.',
      technology: 'Predictive climate control · motorized shutters · solar generation',
    },
  ];

  const conceptCards = concepts.map((concept) => `<article class="heritage-concept">
    <div class="heritage-concept__image"><img src="${esc(concept.image)}" alt="${esc(concept.alt)}" loading="lazy" decoding="async"><span class="heritage-concept__number">${concept.number}</span><span class="heritage-concept__tag">Concept render</span></div>
    <div class="heritage-concept__body"><p class="heritage-kicker">${esc(concept.lineage)}</p><h3>${esc(concept.name)}</h3><p>${esc(concept.description)}</p><div class="heritage-concept__tech"><span>Intelligent layer</span><p>${esc(concept.technology)}</p></div></div>
  </article>`).join('');

  const systems = [
    ['01', 'Energy, in balance', 'Solar generation, battery storage and clear energy monitoring, shaped around the rhythms of the home.'],
    ['02', 'Water, thoughtfully used', 'Rainwater harvesting, smart metering and courtyard irrigation designed to support responsible use.'],
    ['03', 'Comfort that responds', 'Automated lighting, zoned climate control and responsive shading tuned to occupancy and daylight.'],
    ['04', 'A considered layer of care', 'Secure access, discreet alerts, AI-assisted routines and wellness sensing, with people always in control.'],
  ].map(([number, title, description]) => `<article class="heritage-system"><span>${number}</span><h3>${title}</h3><p>${description}</p></article>`).join('');

  const body = `
  <article class="heritage-board">
    <section class="heritage-hero">
      <img class="heritage-hero__image" src="${esc(images.apps.market)}" alt="Illustrative luxury villa concept at dusk, not a completed TRIXX project" fetchpriority="high" decoding="async">
      <div class="heritage-hero__shade"></div>
      <div class="heritage-hero__top"><a href="/projects" class="heritage-wordmark">TRIXX <span>TECHNOLOGIES</span></a><span>ARCHITECTURAL CONCEPT SERIES&nbsp; / &nbsp;01</span></div>
      <div class="heritage-hero__copy"><p class="heritage-kicker">Architecture · intelligence · belonging</p><h1>Heritage<br><em>Meets</em> Tomorrow</h1><p>Homes that carry the character of place into a more thoughtful, connected future.</p><a class="heritage-button" href="#concepts">Explore four directions <span aria-hidden="true">↓</span></a></div>
      <span class="heritage-hero__note">Concept render · design exploration, not a completed TRIXX project</span>
      <span class="heritage-hero__index">01 <i>/</i> 04</span>
    </section>

    <section class="heritage-intro">
      <div class="heritage-shell heritage-intro__inner"><p class="heritage-kicker">A design philosophy</p><h2>Let tradition set the tone.<br><span>Let technology take care of the rest.</span></h2><p>TRIXX explores homes where the intelligence is quiet and the identity is unmistakable: thick textured walls, crafted timber, courtyards and shade, supported by comfort, security and resource awareness.</p><div class="heritage-principles"><span>Rooted in place</span><span>Quietly intelligent</span><span>Made for well-being</span></div></div>
    </section>

    <section class="heritage-concepts" id="concepts"><div class="heritage-shell"><div class="heritage-heading"><div><p class="heritage-kicker">Four architectural directions</p><h2>Distinct histories.<br>One forward-looking home.</h2></div><span class="heritage-status">Concept studies · not built projects</span></div><div class="heritage-concept-grid">${conceptCards}</div></div></section>

    <section class="heritage-living"><div class="heritage-shell heritage-living__grid"><figure class="heritage-living__image"><img src="${esc(images.appDetails.home)}" alt="Illustrative connected living room concept with natural materials and a garden view" loading="lazy" decoding="async"><figcaption>Interior atmosphere · illustrative concept</figcaption></figure><div class="heritage-living__copy"><p class="heritage-kicker">The modern ritual</p><h2>Technology should feel like hospitality.</h2><p>A well-designed home notices what matters, then stays out of the way. Light shifts gently. Temperature feels considered. Private spaces remain private. Controls stay understandable.</p><div class="heritage-control"><img src="${esc(images.apps.home)}" alt="Illustrative smart-home control interface concept, not a live TRIXX product" loading="lazy" decoding="async"><div><span class="heritage-control__label">A single, considered interface</span><p>Lighting scenes · climate zones · secure access · home status</p><small>Interface concept · no live product implied</small></div></div></div></div></section>

    <section class="heritage-systems"><div class="heritage-shell"><div class="heritage-heading"><div><p class="heritage-kicker">Intelligence with purpose</p><h2>A lighter footprint.<br>A more intuitive home.</h2></div><p>Each system is an exploration of how technology can support comfort, stewardship and peace of mind without competing with the architecture.</p></div><div class="heritage-system-grid">${systems}</div><div class="heritage-courtyard"><img src="${esc(images.regionalLandscape)}" alt="Illustrative Kenyan landscape concept evoking a planted courtyard and regional context" loading="lazy" decoding="async"><div><p class="heritage-kicker">Landscape as living infrastructure</p><h3>Courtyards for shade, gathering and renewal.</h3><p>Native and climate-aware planting, permeable surfaces, rainwater capture and subtle path lighting bring landscape into the daily experience.</p></div></div></div></section>

    <section class="heritage-materials"><div class="heritage-shell heritage-materials__grid"><div><p class="heritage-kicker">Material direction</p><h2>Craft you can feel.<br>Comfort that lasts.</h2><p>Natural stone, limewash, carved timber and tactile earth tones form a restrained palette. Durable, locally appropriate materials are a design aspiration to be confirmed for each project.</p><div class="heritage-swatches"><span><i style="--swatch:#262624"></i>Basalt charcoal</span><span><i style="--swatch:#e7ddca"></i>Warm ivory</span><span><i style="--swatch:#a66e3e"></i>Bronze</span><span><i style="--swatch:#806d54"></i>Carved timber</span></div></div><figure class="heritage-materials__image"><img src="${esc(images.materials)}" alt="Illustrative palette of natural stone and tactile architectural finishes" loading="lazy" decoding="async"><figcaption>Material palette reference · concept direction</figcaption></figure></div></section>

    <section class="heritage-closing"><div class="heritage-shell"><p class="heritage-kicker">TRIXX · Heritage + Technology</p><p class="heritage-equation">Traditional Values <span>+</span> Modern Innovation <span>=</span> <strong>A Better Tomorrow</strong></p><div class="heritage-closing__foot"><span>Design exploration · Kenya</span><a href="/projects">Back to projects & innovation <span aria-hidden="true">→</span></a></div></div></section>
    <p class="heritage-disclaimer">All images and descriptions on this board are illustrative design concepts. They do not represent completed TRIXX projects, installed technologies, or confirmed construction specifications.</p>
  </article>`;
  return pageDocument('/projects/heritage-meets-tomorrow', 'Heritage Meets Tomorrow', 'A TRIXX architectural concept board exploring four heritage-inspired homes with intelligent technology, sustainable systems and contemporary comfort.', body);
}

function leadershipPage() {
  const body = `<section class="corp-page-hero"><div class="corp-shell"><p class="corp-kicker">Leadership</p><h1>Building with a clear purpose.</h1></div></section>
  <section class="corp-section"><div class="corp-shell corp-leadership"><div class="corp-avatar corp-avatar--large" role="img" aria-label="Initials placeholder for Francesc’s approved portrait">F</div><div><p class="corp-kicker">Founder & CEO</p><h2>Francesc</h2><p class="corp-leader-preview__title">TRIXX Technologies</p><p>Francesc is the Founder and CEO of TRIXX Technologies. His leadership focuses on building a technology company developing solutions across real estate, education, property management, agriculture and smart living.</p><p class="corp-note">This is initial website copy pending Francesc’s review and approval. Portrait, full biography and other profile details will be added only when approved. This initials placeholder is not a photograph.</p></div></div></section>`;
  return pageDocument('/leadership', 'Leadership', 'Meet Francesc, Founder and CEO of TRIXX Technologies.', body);
}

function contactPage() {
  const interests = DIVISIONS.map((division) => `<li>${esc(division.short)}</li>`).join('');
  const body = `<section class="corp-page-hero"><div class="corp-shell"><p class="corp-kicker">Contact</p><h1>Start a conversation.</h1><p>We welcome business, product and partnership enquiries across the TRIXX Technologies divisions.</p></div></section>
  <section class="corp-section"><div class="corp-shell corp-contact-grid"><div><p class="corp-kicker">Enquiries</p><h2>Enquiry handling is being prepared.</h2><p>This website does not yet have a configured enquiry inbox or secure submission service. No information entered on this page would be delivered, so we have not included a non-working form.</p><p>Verified contact details and a working enquiry channel will be added before this page is used to collect personal information.</p></div><aside class="corp-contact-aside"><h3>Areas of interest</h3><ul>${interests}<li>Partnerships</li><li>General enquiries</li></ul><p>For privacy or data requests, the company’s verified contact channel must be published before launch.</p></aside></div></section>`;
  return pageDocument('/contact', 'Contact', 'Information about contacting TRIXX Technologies and current enquiry-channel status.', body);
}

function notFoundPage() {
  const body = `<section class="corp-page-hero"><div class="corp-shell"><p class="corp-kicker">404 · Page not found</p><h1>This page is not here.</h1><p>The address may have changed or the page may not exist.</p><a class="corp-button corp-button--gold" href="/">Return to the homepage <span aria-hidden="true">→</span></a></div></section>`;
  return { ...pageDocument('/404', 'Page not found', 'The requested TRIXX Technologies page could not be found.', body), noindex: true, noSitemap: true };
}

function legalPage(path, title, description, detail) {
  const body = `<section class="corp-page-hero"><div class="corp-shell"><p class="corp-kicker">${esc(title)}</p><h1>${esc(title)} template</h1><p>${esc(description)}</p></div></section><section class="corp-section"><div class="corp-shell corp-legal-draft"><p class="corp-status">Draft · review required before launch</p><h2>Company and policy details pending approval.</h2><p>${esc(detail)}</p><p>This page is a content template, not legal advice or a claim of certified compliance. The published policy must be reviewed against TRIXX Technologies’ actual services, data practices, retention periods and contact arrangements.</p></div></section>`;
  return pageDocument(path, title, description, body);
}

function companyPages() {
  return [
    homePage(),
    aboutPage(),
    divisionsPage(),
    ...DIVISIONS.map(divisionPage),
    projectsPage(),
    heritageBoardPage(),
    leadershipPage(),
    contactPage(),
    notFoundPage(),
    legalPage('/legal/privacy', 'Privacy Policy', 'Privacy policy template pending operational and legal review.', 'Add the data controller, collected information, processing purposes, lawful bases, recipients, retention and data-subject request process after they are verified.'),
    legalPage('/legal/terms', 'Terms of Use', 'Terms template pending review against the actual TRIXX website and services.', 'Add approved terms covering the website, intellectual property, permitted use, disclaimers and applicable jurisdiction.'),
  ];
}

module.exports = companyPages;