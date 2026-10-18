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

const HOUSE_CONCEPTS = [
  {
    slug: 'moorish-smart-palace',
    name: 'The Moorish Smart Palace',
    tradition: 'Moorish',
    image: images.architectureInspiration[0].src,
    alt: 'Illustrative Moorish-inspired courtyard house with arches and geometric detail',
    story: 'Horseshoe arches, carved timber and a central courtyard create an inward-facing home shaped by shade, water and patterned light.',
    materials: ['Lime plaster', 'Carved timber', 'Patterned stone'],
    features: ['Courtyard light scenes', 'Automated privacy screens', 'Smart-glass study'],
  },
  {
    slug: 'swahili-coastal-residence',
    name: 'The Swahili Coastal Residence',
    tradition: 'Swahili',
    image: images.architecture['swahili-coastal'],
    alt: 'Illustrative Swahili coastal residence with shaded verandas and a planted courtyard',
    story: 'Carved doors, deep verandas and a protected courtyard reinterpret coastal privacy and passive airflow for contemporary family life.',
    materials: ['Coral-stone palette', 'Carved timber', 'Limewash'],
    features: ['Humidity monitoring', 'Rainwater planning', 'Remote security concept'],
  },
  {
    slug: 'african-earth-house',
    name: 'The African Earth House',
    tradition: 'African Vernacular',
    image: images.architectureInspiration[2].src,
    alt: 'Illustrative African-inspired home concept with earth-toned finishes and deep roof shade',
    story: 'Earth-toned walls, local pattern references and generous overhangs ground the home in its landscape and climate.',
    materials: ['Earth-toned render', 'Natural stone', 'Locally sourced timber'],
    features: ['Passive cooling study', 'Solar microgrid concept', 'Greywater reuse planning'],
  },
  {
    slug: 'mediterranean-estate',
    name: 'The Mediterranean Estate',
    tradition: 'Mediterranean',
    image: images.apps.market,
    alt: 'Illustrative luxury villa concept with a warm stone palette and indoor-outdoor living',
    story: 'Stone façades, loggias and shaded terraces frame a relaxed relationship between interior rooms and outdoor living.',
    materials: ['Natural stone', 'Clay-toned roof', 'Bronze-finish metalwork'],
    features: ['Zoned climate concept', 'Occupancy-based lighting', 'Solar-readiness study'],
  },
  {
    slug: 'modern-haveli',
    name: 'The Modern Haveli',
    tradition: 'Haveli',
    image: images.appDetails.home,
    alt: 'Illustrative warm interior concept suggesting a layered courtyard home',
    story: 'Layered courtyards, carved screens and shaded balconies create a sequence from shared spaces to quiet private rooms.',
    materials: ['Carved screenwork', 'Ornamental stone', 'Warm hardwood'],
    features: ['Private access zones', 'Scene-based lighting', 'Water-use monitoring concept'],
  },
  {
    slug: 'neo-gothic-tech-manor',
    name: 'The Neo-Gothic Tech Manor',
    tradition: 'Gothic Revival',
    image: images.architecture.victorian,
    alt: 'Illustrative heritage manor concept with tall windows and detailed masonry',
    story: 'Pointed forms, tall openings and expressive masonry are balanced with a calm, efficient contemporary interior.',
    materials: ['Textured masonry', 'Lead-free metal detailing', 'High-performance glazing concept'],
    features: ['Electrochromic glazing study', 'Zoned environmental control', 'Discreet security concept'],
  },
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

function conceptCard(concept) {
  return `<article class="arch-concept-card">
    <a href="/house-concepts/${concept.slug}" class="arch-concept-card__image" aria-label="Explore ${esc(concept.name)}">
      <img src="${esc(concept.image)}" alt="${esc(concept.alt)}" loading="lazy" decoding="async">
      <span>Concept · not a completed project</span>
    </a>
    <div class="arch-concept-card__copy"><p class="arch-eyebrow">${esc(concept.tradition)}</p><h3><a href="/house-concepts/${concept.slug}">${esc(concept.name)}</a></h3><p>${esc(concept.story)}</p><a class="arch-inline-link" href="/house-concepts/${concept.slug}">Explore design <span aria-hidden="true">→</span></a></div>
  </article>`;
}

function homePage() {
  const body = `
  <section class="arch-home-hero">
    <img class="arch-home-hero__image" src="${esc(images.apps.market)}" alt="Illustrative luxury heritage villa at dusk with arches, warm interior lighting and a courtyard pool; concept render, not a completed TRIXX project" fetchpriority="high" decoding="async">
    <div class="arch-home-hero__overlay"></div>
    <div class="arch-home-hero__brand"><span class="arch-brand-mark" aria-hidden="true">T</span><span><strong>TRIXX</strong><small>HERITAGE · TECHNOLOGY · LIVING</small></span></div>
    <div class="arch-home-hero__copy"><p class="arch-eyebrow">Architecture, rooted in place</p><h1>Heritage<br>meets <em>tomorrow.</em></h1><p>Timeless homes shaped by cultural identity and quietly intelligent living.</p><div class="arch-home-hero__actions"><a class="arch-button arch-button--bronze" href="/house-concepts">Explore house concepts <span aria-hidden="true">→</span></a><a class="arch-button arch-button--line" href="/start-project">Discuss your project</a></div></div>
    <span class="arch-home-hero__disclaimer">Architectural concept render · not a completed TRIXX project</span>
  </section>

  <section class="arch-manifesto"><div class="arch-shell arch-manifesto__inner"><p class="arch-eyebrow">A modern heritage practice</p><h2>Culture gives a home its character.<br><span>Technology gives it another way to care.</span></h2><p>TRIXX explores residential concepts where courtyards, crafted materials and climate-aware design meet thoughtful ideas for comfort, security and resource use.</p></div></section>

  <section class="arch-home-collection"><div class="arch-shell"><div class="arch-heading"><div><p class="arch-eyebrow">The house concepts</p><h2>Many traditions.<br>A distinctly TRIXX point of view.</h2></div><a class="arch-inline-link" href="/house-concepts">View the collection <span aria-hidden="true">→</span></a></div><div class="arch-feature-grid">${HOUSE_CONCEPTS.slice(0, 3).map(conceptCard).join('')}</div></div></section>

  <section class="arch-home-tech"><div class="arch-home-tech__image"><img src="${esc(images.apps.home)}" alt="Illustrative smart-home control concept alongside a heritage-inspired interior" loading="lazy" decoding="async"><span>Technology shown for concept illustration only</span></div><div class="arch-home-tech__copy"><p class="arch-eyebrow">Smart living, quietly integrated</p><h2>More comfort.<br>Less visual noise.</h2><p>Lighting, access, climate and energy concepts designed to support the architecture rather than compete with it.</p><ul><li>Thoughtful lighting and shading</li><li>Comfort and climate zones</li><li>Energy and water awareness</li><li>Security with discreet control</li></ul><a class="arch-inline-link" href="/smart-living">Explore smart living <span aria-hidden="true">→</span></a></div></section>

  <section class="arch-home-sustainability"><div class="arch-shell arch-sustain-grid"><figure><img src="${esc(images.technology.innovation)}" alt="Illustrative architectural study representing passive design and environmental research" loading="lazy" decoding="async"><figcaption>Concept illustration · performance requires project-specific assessment</figcaption></figure><div><p class="arch-eyebrow">Designed with the climate in mind</p><h2>Comfort starts<br>before the switch.</h2><p>Orientation, shade, daylight, ventilation and material choices form the first layer. Renewable energy and water systems can be considered as part of a project-specific design.</p><a class="arch-inline-link" href="/sustainability">Our sustainability approach <span aria-hidden="true">→</span></a></div></div></section>

  <section class="arch-home-process"><div class="arch-shell"><div class="arch-heading"><div><p class="arch-eyebrow">From first thought to project brief</p><h2>A clear path to a considered home.</h2></div><a class="arch-inline-link" href="/start-project">Start a project brief <span aria-hidden="true">→</span></a></div><ol><li><span>01</span><h3>Discovery</h3><p>Plot, people, priorities.</p></li><li><span>02</span><h3>Concept</h3><p>Architectural direction and spatial ideas.</p></li><li><span>03</span><h3>Technical consultation</h3><p>Materials, systems and specialist input.</p></li><li><span>04</span><h3>Budget & approvals</h3><p>Scope, cost planning and required professionals.</p></li><li><span>05</span><h3>Construction planning</h3><p>Next steps defined with qualified partners.</p></li></ol><p class="arch-process-note">Professional architectural, engineering, quantity surveying, approval and construction services depend on confirmed appointments and applicable licensing.</p></div></section>

  <section class="arch-home-cta"><div class="arch-shell"><p class="arch-eyebrow">A home with its own point of view</p><h2>Let’s begin with the place,<br>the people and the possibility.</h2><a class="arch-button arch-button--bronze" href="/start-project">Discuss your project <span aria-hidden="true">→</span></a></div></section>`;

  return pageDocument('/', 'Heritage-Inspired Homes & Smart Living', 'Discover TRIXX heritage-inspired house concepts, intelligent living ideas and a considered approach to residential design.', body);
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

function houseConceptsPage() {
  const cards = HOUSE_CONCEPTS.map((concept) => `<article class="arch-concept-card arch-concept-card--collection" data-concept-card data-tradition="${esc(concept.tradition.toLowerCase())}" data-name="${esc(`${concept.name} ${concept.tradition}`.toLowerCase())}">
    <a href="/house-concepts/${concept.slug}" class="arch-concept-card__image" aria-label="Explore ${esc(concept.name)}"><img src="${esc(concept.image)}" alt="${esc(concept.alt)}" loading="lazy" decoding="async"><span>Concept study</span></a>
    <div class="arch-concept-card__copy"><p class="arch-eyebrow">${esc(concept.tradition)}</p><h2><a href="/house-concepts/${concept.slug}">${esc(concept.name)}</a></h2><p>${esc(concept.story)}</p><ul class="arch-card-specs"><li>Floor area <span>To be developed</span></li><li>Bedrooms <span>Concept brief</span></li><li>Storeys <span>Concept brief</span></li></ul><a class="arch-inline-link" href="/house-concepts/${concept.slug}">View concept <span aria-hidden="true">→</span></a></div>
    <label class="arch-compare"><input type="checkbox" value="${concept.slug}" data-concept-compare> Add to comparison</label>
  </article>`).join('');
  const body = `<section class="arch-page-intro"><div class="arch-shell"><p class="arch-eyebrow">TRIXX · The heritage collection</p><h1>Homes with a sense of place.</h1><p>Explore architectural directions that bring historical character into conversation with modern comfort and considered technology.</p><span class="arch-concept-disclaimer">All designs are conceptual studies. No floor areas, room dimensions, build specifications or performance outcomes are confirmed.</span></div></section>
  <section class="arch-collection"><div class="arch-shell"><div class="arch-collection-toolbar"><label class="arch-search"><span>Search concepts</span><input type="search" placeholder="Search by style or name" data-concept-search></label><label class="arch-filter"><span>Tradition</span><select data-concept-filter><option value="">All traditions</option>${[...new Set(HOUSE_CONCEPTS.map((item) => item.tradition))].map((item) => `<option value="${esc(item.toLowerCase())}">${esc(item)}</option>`).join('')}</select></label><p data-concept-count aria-live="polite">${HOUSE_CONCEPTS.length} concept studies</p></div><div class="arch-collection-grid">${cards}</div><p class="arch-empty" data-concept-empty hidden>No concepts match those filters.</p><section class="arch-compare-panel" data-concept-compare-panel hidden><div class="arch-compare-panel__heading"><div><p class="arch-eyebrow">Compare directions</p><h2>Compare selected concepts</h2></div><button class="arch-compare-clear" type="button" data-concept-clear>Clear selection</button></div><p class="arch-compare-message" data-compare-message role="status" aria-live="polite"></p><div class="arch-compare-table-wrap"><table class="arch-compare-table"><thead><tr><th scope="col">Design attribute</th>${HOUSE_CONCEPTS.map((item) => `<th scope="col" data-compare-column="${item.slug}" hidden>${esc(item.name)}</th>`).join('')}</tr></thead><tbody><tr><th scope="row">Architectural tradition</th>${HOUSE_CONCEPTS.map((item) => `<td data-compare-column="${item.slug}" hidden>${esc(item.tradition)}</td>`).join('')}</tr><tr><th scope="row">Character</th>${HOUSE_CONCEPTS.map((item) => `<td data-compare-column="${item.slug}" hidden>${esc(item.story)}</td>`).join('')}</tr><tr><th scope="row">Materials</th>${HOUSE_CONCEPTS.map((item) => `<td data-compare-column="${item.slug}" hidden>${item.materials.map(esc).join(', ')}</td>`).join('')}</tr><tr><th scope="row">Indicative floor area</th>${HOUSE_CONCEPTS.map((item) => `<td data-compare-column="${item.slug}" hidden>To be confirmed during concept development</td>`).join('')}</tr><tr><th scope="row">Rooms and storeys</th>${HOUSE_CONCEPTS.map((item) => `<td data-compare-column="${item.slug}" hidden>To be defined with the project brief</td>`).join('')}</tr></tbody></table></div><p class="arch-compare-note">Comparison is conceptual. Project dimensions and specifications require design development and professional review.</p></section></div></section>
  <section class="arch-home-cta"><div class="arch-shell"><p class="arch-eyebrow">Start with your place</p><h2>Find the architectural direction<br>that feels like yours.</h2><a class="arch-button arch-button--bronze" href="/start-project">Prepare a project brief <span aria-hidden="true">→</span></a></div></section>`;
  return pageDocument('/house-concepts', 'House Concepts', 'Explore TRIXX heritage-inspired house concepts, architectural traditions, materials and intelligent living ideas.', body);
}

function houseConceptPage(concept) {
  const materials = concept.materials.map((item) => `<li>${esc(item)}</li>`).join('');
  const features = concept.features.map((item) => `<li>${esc(item)}<span>Concept direction</span></li>`).join('');
  const related = HOUSE_CONCEPTS.filter((item) => item.slug !== concept.slug).slice(0, 3);
  const body = `<section class="arch-detail-hero"><img src="${esc(concept.image)}" alt="${esc(concept.alt)}" fetchpriority="high" decoding="async"><div class="arch-detail-hero__shade"></div><div class="arch-shell arch-detail-hero__copy"><a class="arch-back" href="/house-concepts">← All house concepts</a><p class="arch-eyebrow">${esc(concept.tradition)} · Design study</p><h1>${esc(concept.name)}</h1><p>${esc(concept.story)}</p><span class="arch-concept-disclaimer">Illustrative concept · not a completed TRIXX project</span></div></section>
  <section class="arch-detail-body"><div class="arch-shell"><div class="arch-detail-actions"><div><p class="arch-eyebrow">The design story</p><h2>Character that carries through every room.</h2><p>This direction explores how a historical architectural language can inform proportion, shade, material and movement through the home. Details shown here are design intentions, not confirmed construction specifications.</p></div><button class="arch-button arch-button--dark" type="button" data-print-brochure>Print / save concept sheet</button></div>
  <div class="arch-detail-grid"><section class="arch-detail-panel"><p class="arch-eyebrow">Material palette</p><h2>Texture, tone, craft.</h2><ul class="arch-detail-list">${materials}</ul><p class="arch-detail-note">Material selections depend on site, availability, suitability and professional review.</p></section><section class="arch-detail-panel"><p class="arch-eyebrow">Signature features</p><h2>Intelligence, in context.</h2><ul class="arch-detail-features">${features}</ul><p class="arch-detail-note">Compatibility and implementation are not confirmed; these are technology concepts for discussion.</p></section></div>
  <section class="arch-floorplan"><div class="arch-floorplan__intro"><p class="arch-eyebrow">Spatial study</p><h2>A home plan begins with the way you live.</h2><p>This schematic illustrates possible room relationships only. It is not dimensioned, not to scale and not suitable for construction or approvals.</p><div class="arch-floorplan__status">Conceptual floor plan · dimensions pending design</div></div><div class="arch-floorplan__drawing" role="img" aria-label="Schematic conceptual floor plan showing living, dining, kitchen, courtyard, bedrooms and service rooms; not to scale"><div class="arch-room arch-room--living">Living</div><div class="arch-room arch-room--dining">Dining</div><div class="arch-room arch-room--kitchen">Kitchen</div><div class="arch-room arch-room--court">Courtyard</div><div class="arch-room arch-room--bed1">Bedroom</div><div class="arch-room arch-room--bed2">Bedroom</div><div class="arch-room arch-room--bath">Bath</div><div class="arch-room arch-room--service">Service</div></div></section>
  <section class="arch-project-brief-cta"><div><p class="arch-eyebrow">Make it your own</p><h2>Bring your plot, priorities and questions.</h2><p>Prepare a private project brief with your preferred style and requirements. It is generated on your device and is not sent to TRIXX.</p></div><a class="arch-button arch-button--bronze" href="/start-project?style=${concept.slug}">Create a project brief <span aria-hidden="true">→</span></a></section></div></section>
  <section class="arch-related"><div class="arch-shell"><div class="arch-heading"><div><p class="arch-eyebrow">More from the collection</p><h2>Other architectural directions</h2></div></div><div class="arch-feature-grid">${related.map(conceptCard).join('')}</div></div></section>`;
  return pageDocument(`/house-concepts/${concept.slug}`, concept.name, `${concept.story} Explore materials, signature features and a clearly labelled schematic concept plan.`, body);
}

function smartLivingPage() {
  const systems = [
    ['Lighting & scenes', 'Layered, automated lighting concepts that respond to time of day, activity and user preference.', images.apps.home, 'Illustrative home lighting control concept'],
    ['Access & security', 'A considered approach to entry, privacy, alerts and remote access. Specific devices and integrations require confirmation.', images.technology.infrastructure, 'Illustrative connected technology infrastructure'],
    ['Climate & comfort', 'Explore passive design first, then consider zoned climate control and automated shading where appropriate.', images.appDetails.home, 'Illustrative contemporary connected living interior'],
    ['Energy & water', 'Solar, battery storage, energy monitoring, rainwater and smart metering as options for project-specific evaluation.', images.apps.farm, 'Illustrative smart resource management concept'],
  ];
  const cards = systems.map(([title, description, src, alt]) => `<article class="arch-tech-card"><img src="${esc(src)}" alt="${esc(alt)}" loading="lazy" decoding="async"><div><span class="arch-tech-label">Technology direction · not a live product</span><h2>${esc(title)}</h2><p>${esc(description)}</p></div></article>`).join('');
  const body = `<section class="arch-page-intro"><div class="arch-shell"><p class="arch-eyebrow">Smart Living</p><h1>Intelligence that respects the architecture.</h1><p>Showcasing ideas for security, comfort and resource awareness without turning the TRIXX website into a device-control dashboard.</p><span class="arch-concept-disclaimer">All capabilities below are design and development directions. Availability and compatibility have not been verified.</span></div></section><section class="arch-tech-grid-section"><div class="arch-shell arch-tech-grid">${cards}</div></section><section class="arch-tech-principles"><div class="arch-shell"><p class="arch-eyebrow">Design principles</p><div class="arch-tech-principles__grid"><article><h2>Useful before impressive</h2><p>Every proposed system should answer a real comfort, safety or resource need.</p></article><article><h2>Secure by design</h2><p>Access, connectivity, updates and privacy need review before a system is specified.</p></article><article><h2>People stay in control</h2><p>Automation should be understandable, adjustable and able to fail gracefully.</p></article></div></div></section><section class="arch-home-cta"><div class="arch-shell"><p class="arch-eyebrow">Explore architecture with intelligence</p><h2>Technology should belong<br>to the life of the home.</h2><a class="arch-button arch-button--bronze" href="/start-project">Discuss a project <span aria-hidden="true">→</span></a></div></section>`;
  return pageDocument('/smart-living', 'Smart Living', 'Explore TRIXX smart-home technology directions for lighting, access, climate, energy and water.', body);
}

function sustainabilityPage() {
  const strategies = [
    ['Shade & orientation', 'Study site orientation, roof overhangs, verandas and screened openings to manage direct sun and create comfortable transitions.'],
    ['Natural ventilation', 'Consider cross-ventilation, high-level openings and courtyard effects alongside site conditions and specialist input.'],
    ['Daylight & material', 'Use room placement, controlled daylight and suitable material choices to shape a comfortable interior environment.'],
    ['Energy & water options', 'Evaluate solar generation, storage, rainwater capture, metering and reuse according to site feasibility and professional design.'],
  ];
  const body = `<section class="arch-page-intro"><div class="arch-shell"><p class="arch-eyebrow">Sustainability</p><h1>Better performance begins with thoughtful design.</h1><p>We explore passive strategies and responsible material and resource choices before discussing technology options.</p><span class="arch-concept-disclaimer">No measured energy, water, cost or comfort performance is claimed. Outcomes require project-specific calculations and evidence.</span></div></section><section class="arch-sustainability"><div class="arch-shell"><figure class="arch-sustainability__image"><img src="${esc(images.technology.innovation)}" alt="Illustrative architectural research concept representing passive design and resource-conscious planning" fetchpriority="high" decoding="async"><figcaption>Illustrative image · no measured project performance represented</figcaption></figure><div class="arch-strategy-grid">${strategies.map(([title, description], index) => `<article><span>0${index + 1}</span><h2>${esc(title)}</h2><p>${esc(description)}</p></article>`).join('')}</div></div></section><section class="arch-sustainability-note"><div class="arch-shell"><p class="arch-eyebrow">Evidence before claims</p><h2>Climate response is specific to its site.</h2><p>Local climate, orientation, materials, occupancy, construction quality and system performance all matter. TRIXX will publish measured results only when supported by verified project data or clearly stated calculations.</p><a class="arch-inline-link" href="/house-concepts">Explore the house concepts <span aria-hidden="true">→</span></a></div></section>`;
  return pageDocument('/sustainability', 'Sustainability', 'Explore passive design, climate response, material choices and renewable energy options without unsupported performance claims.', body);
}

function startProjectPage() {
  const styleOptions = HOUSE_CONCEPTS.map((concept) => `<option value="${concept.slug}">${esc(concept.name)}</option>`).join('');
  const body = `<section class="arch-page-intro"><div class="arch-shell"><p class="arch-eyebrow">Start a project</p><h1>A considered home begins with a good brief.</h1><p>Share the place, scale and architectural direction you are exploring. This tool prepares a private brief file on your device; it does not send your details to TRIXX or create a project tracker.</p></div></section><section class="arch-brief-section"><div class="arch-shell arch-brief-grid"><form class="arch-brief-form" data-project-brief><div class="arch-brief-form__heading"><p class="arch-eyebrow">Project brief builder</p><h2>Your early requirements</h2></div><label>Plot location or county<input name="location" type="text" maxlength="120" autocomplete="address-level2" placeholder="For example, county or town"></label><div class="arch-form-row"><label>Approximate house size<select name="size" required><option value="">Choose a range</option><option>Under 150 m²</option><option>150–250 m²</option><option>251–400 m²</option><option>Over 400 m²</option><option>Not decided</option></select></label><label>Indicative budget range<select name="budget" required><option value="">Choose a range</option><option>Under KES 10 million</option><option>KES 10–25 million</option><option>KES 25–50 million</option><option>Over KES 50 million</option><option>Not decided</option></select></label></div><label>Preferred architectural direction<select name="style" required><option value="">Choose a concept</option>${styleOptions}<option value="open">Open to discussion</option></select></label><div class="arch-form-row"><label>Bedrooms to explore<select name="bedrooms"><option>2</option><option selected>3</option><option>4</option><option>5 or more</option><option>Not decided</option></select></label><label>Storeys to explore<select name="storeys"><option>Single storey</option><option selected>Two storeys</option><option>Not decided</option></select></label></div><label>What matters most? (optional)<textarea name="priorities" rows="4" maxlength="800" placeholder="Describe priorities such as courtyard living, accessibility, natural ventilation, security or family spaces."></textarea></label><label class="arch-brief-consent"><input name="acknowledged" type="checkbox" required><span>I understand this brief is generated locally and will not be submitted to TRIXX.</span></label><button class="arch-button arch-button--dark" type="submit">Download my project brief</button><p class="arch-brief-message" data-brief-message role="status" aria-live="polite" hidden></p></form><aside class="arch-brief-aside"><p class="arch-eyebrow">What happens next</p><h2>A useful starting point, not a quote.</h2><p>The generated file is a discussion aid. It is not a project reference, cost estimate, design, planning document or service booking.</p><ol><li>Note the site and early requirements.</li><li>Review concept directions and questions.</li><li>Share with your own project advisers or bring it to a future TRIXX consultation.</li></ol><p class="arch-process-note">TRIXX’s enquiry service and verified contact channel are not configured yet. This page does not transmit or retain your input.</p></aside></div></section>`;
  return pageDocument('/start-project', 'Start a Project', 'Prepare a private early-stage residential project brief on your device. It is not submitted to TRIXX.', body);
}

function partnersPage() {
  const roles = [
    ['Architects & designers', 'Explore culturally grounded residential concepts and thoughtful design collaboration.'],
    ['Engineers & technical specialists', 'Help evaluate building systems, environmental controls, energy and water options.'],
    ['Technology providers', 'Discuss compatible, secure and maintainable connected-home capabilities.'],
    ['Material & construction partners', 'Explore suitable materials, sourcing and delivery approaches for future projects.'],
    ['Investors & strategic partners', 'Discuss the TRIXX vision and the responsible development of its architectural and technology direction.'],
  ];
  const body = `<section class="arch-page-intro"><div class="arch-shell"><p class="arch-eyebrow">Partners</p><h1>Build the right things, with the right people.</h1><p>TRIXX welcomes conversations with professionals and organizations whose expertise can strengthen heritage-inspired homes and intelligent living.</p></div></section><section class="arch-partners"><div class="arch-shell"><div class="arch-partner-grid">${roles.map(([title, description], index) => `<article><span>0${index + 1}</span><h2>${esc(title)}</h2><p>${esc(description)}</p></article>`).join('')}</div><p class="arch-concept-disclaimer">No partnerships or investment arrangements are currently represented as established through this page.</p><a class="arch-button arch-button--dark" href="/contact">View contact readiness</a></div></section>`;
  return pageDocument('/partners', 'Partners', 'Explore collaboration opportunities with TRIXX Technologies in architecture, engineering, technology, materials and investment.', body);
}

function projectsPage() {
  const body = `<section class="corp-page-hero"><div class="corp-shell"><p class="corp-kicker">Projects & innovation</p><h1>Development, shared honestly.</h1><p>We will publish approved project and product information with a clear status: concept, in development, prototype or launched.</p></div></section>
  <section class="corp-section"><div class="corp-shell heritage-project-link"><img src="${esc(images.architectureInspiration[0].src)}" alt="Illustrative Moorish courtyard architecture concept" loading="lazy" decoding="async"><div><p class="heritage-kicker">Featured concept study</p><h2>Heritage Meets Tomorrow</h2><p>Four architectural directions bring cultural identity together with considered home technology and material choices.</p><a class="heritage-link" href="/projects/heritage-meets-tomorrow">View the concept board <span aria-hidden="true">→</span></a><span class="heritage-status">Concept study · not a completed TRIXX project</span></div></div></section>
  <section class="arch-journal"><div class="arch-shell"><div class="arch-heading"><div><p class="arch-eyebrow">The architectural journal</p><h2>Ideas for living, building and belonging.</h2></div><span class="arch-concept-disclaimer">Editorial themes · articles pending publication</span></div><div class="arch-journal-grid"><article><span>01 · Heritage</span><h3>What makes a home feel rooted in place?</h3><p>Notes on proportion, craft, shade and the details people carry forward.</p></article><article><span>02 · Smart living</span><h3>Can home technology become quieter?</h3><p>Exploring usability, privacy and integration without adding visual noise.</p></article><article><span>03 · Climate</span><h3>Start with shade, air and daylight.</h3><p>Design questions to ask before specifying mechanical systems.</p></article></div></div></section>
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
    houseConceptsPage(),
    ...HOUSE_CONCEPTS.map(houseConceptPage),
    smartLivingPage(),
    sustainabilityPage(),
    startProjectPage(),
    partnersPage(),
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