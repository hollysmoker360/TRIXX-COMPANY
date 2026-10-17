'use strict';

/* Architectural styles TRIXX builds. Each collection page renders its own
   gallery, floor plans, price band and the smart technology fitted as standard. */

const STYLES = [
  {
    slug: 'swahili-coastal',
    name: 'Swahili Coastal',
    swahiliName: 'Pwani',
    tagline: 'Lime-washed walls, carved doors and air that moves.',
    intro: 'The Swahili Coastal house takes the courtyard logic of Lamu and Mombasa old town and rebuilds it for a modern family: deep verandas, coral-stone screen walls, and a baraza bench that catches the sea breeze at four in the afternoon.',
    story: 'We studied eleven surviving Swahili houses between Shela and Old Town Mombasa before drawing the first plan. The lessons were consistent: shade beats air conditioning, a courtyard cools every room that opens onto it, and a carved door is a piece of engineering as much as decoration. Every TRIXX Swahili Coastal home is oriented so the long veranda faces the prevailing monsoon wind, which drops indoor temperatures by 4 to 6 degrees before any mechanical cooling runs.',
    hero: { roofs: 'Makuti thatch over coral rag', walls: 'Hand-trowelled lime plaster', openings: 'Carved mahogany doors and shutters' },
    priceFrom: 18500000,
    priceTo: 46000000,
    plotRange: '0.125 – 0.5 acre',
    buildWeeks: 34,
    bedrooms: [3, 4, 5],
    included: ['Courtyard and water feature', 'Makuti-thatch veranda roof', 'Carved hardwood entry door', 'Coral-stone screen walls', 'Baraza seating bench', 'Rainwater harvesting to 10,000 L'],
    colors: ['#A8452C', '#0E5C56', '#FBF4E7', '#C08A3E'],
    materials: ['Coral rag stone', 'Lime plaster', 'Makuti thatch', 'Mahogany', 'Terrazzo'],
    locations: ['Kilifi', 'Watamu', 'Lamu', 'Diani', 'Malindi'],
    bestFor: 'Coastal families and holiday-let investors who want low cooling bills.',
  },
  {
    slug: 'victorian',
    name: 'Victorian',
    swahiliName: 'Kikoloni',
    tagline: 'High ceilings, gabled roofs and rooms that breathe.',
    intro: 'A colonial-era silhouette with a modern core. Steep gables shed Nairobi rain fast, tall sash windows pull hot air out at the ridge, and the deep eaves keep the afternoon sun off the glass.',
    story: 'The Victorian gable is not nostalgia. It is a rain-shedding machine: a 42-degree pitch moves water off a roof three times faster than a shallow pitch, which matters when Nairobi delivers 40 mm in an hour. We kept the proportions and replaced the internals — lime mortar, insulated roof deck, sealed double glazing and a service core that carries every smart cable without cutting into the original detailing.',
    hero: { roofs: 'Steep gable with clay tile', walls: 'Rendered stone with quoins', openings: 'Sash windows with storm shutters' },
    priceFrom: 24500000,
    priceTo: 58000000,
    plotRange: '0.25 – 0.75 acre',
    buildWeeks: 40,
    bedrooms: [4, 5, 6],
    included: ['Twin gable roof with clay tile', 'Bay window to the lounge', 'Cornice and ceiling rose detail', 'Wraparound veranda', 'Cellar or wine store', 'Mature garden planting'],
    colors: ['#3B4A5A', '#7C3A55', '#F7F3EC', '#8C6A3F'],
    materials: ['Machine-cut stone', 'Clay roof tile', 'Lime mortar', 'Cast iron', 'Oak'],
    locations: ['Karen', 'Lavington', 'Runda', 'Nyali', 'Milimani'],
    bestFor: 'Families who want heritage character on a large garden plot.',
  },
  {
    slug: 'art-deco',
    name: 'Art Deco',
    swahiliName: 'Mapambo',
    tagline: 'Stepped towers, strong lines and brass in the light.',
    intro: 'Art Deco arrived in Nairobi with the cinemas and the office blocks of the 1930s, and it still reads as optimistic. Stepped massing, vertical fins and a corner tower give the house a skyline of its own.',
    story: 'We rebuilt the Deco grammar from measured drawings of three 1930s Nairobi buildings, then simplified it. The stepped setbacks hide the water tanks and solar plant, the vertical fins shade the west glass, and the corner tower carries a stair with a slot window that throws a moving line of light across the hall every afternoon.',
    hero: { roofs: 'Flat with stepped parapet', walls: 'Smooth render with fin detail', openings: 'Steel casement with brass trim' },
    priceFrom: 22000000,
    priceTo: 52000000,
    plotRange: '0.2 – 0.5 acre',
    buildWeeks: 38,
    bedrooms: [3, 4, 5],
    included: ['Stepped corner tower', 'Vertical sun-shade fins', 'Brass stair balustrade', 'Curved glass bay', 'Roof terrace with parapet', 'Terrazzo and brass floors'],
    colors: ['#C4791F', '#1F3A5F', '#FDF8F0', '#D8A33A'],
    materials: ['Smooth render', 'Terrazzo', 'Brass', 'Steel casement', 'Frosted glass'],
    locations: ['Kilimani', 'Parklands', 'Westlands', 'Mombasa Island', 'Nakuru'],
    bestFor: 'Urban plots and buyers who want a landmark on a compact site.',
  },
  {
    slug: 'contemporary',
    name: 'Contemporary',
    swahiliName: 'Kisasa',
    tagline: 'Clean volumes, full-height glass and a smart spine.',
    intro: 'The Contemporary house is our most efficient build. Two interlocking volumes, a cantilevered first floor, and a service spine down the middle that carries power, water, data and every smart device.',
    story: 'The design brief was simple: build a house that can absorb technology for twenty years without being opened up again. The answer is the service spine — a 600 mm vertical duct between the two volumes with removable panels on every floor. Adding a camera, a new circuit or a fibre run takes an afternoon, not a renovation.',
    hero: { roofs: 'Flat with planted terrace', walls: 'Off-shutter concrete and render', openings: 'Full-height glazing with deep reveals' },
    priceFrom: 19800000,
    priceTo: 44000000,
    plotRange: '0.125 – 0.4 acre',
    buildWeeks: 30,
    bedrooms: [3, 4, 5],
    included: ['Cantilevered first floor', 'Full-height glazed living volume', '600 mm service spine', 'Flat roof terrace with planting', 'Concealed LED cove lighting', 'Underfloor conduit for future cabling'],
    colors: ['#0E5C56', '#2C3A3A', '#F2F4F1', '#9AA8A2'],
    materials: ['Off-shutter concrete', 'Powder-coated aluminium', 'Porcelain tile', 'Engineered timber', 'Micro-cement'],
    locations: ['Kiambu Road', 'Syokimau', 'Athi River', 'Naivasha', 'Ruaka'],
    bestFor: 'Fast builds on tight urban plots with heavy technology use.',
  },
  {
    slug: 'garden-court',
    name: 'Garden Court',
    swahiliName: 'Bustani',
    tagline: 'Every room opens onto something growing.',
    intro: 'A low, wide house wrapped around a planted court. The roof is a working garden, the court is a rainwater sink, and the kitchen opens straight onto a productive vegetable bed.',
    story: 'Garden Court started as an answer to a client question: how do you grow food in a town plot without it looking like a farm? The court sits at the centre, planted with fruit trees and a raised bed, and the greywater system feeds it. Households on this plan typically cut vegetable spend by a third within the first year.',
    hero: { roofs: 'Planted green roof over timber deck', walls: 'Stabilised earth block', openings: 'Sliding timber-framed doors' },
    priceFrom: 16900000,
    priceTo: 38500000,
    plotRange: '0.2 – 0.6 acre',
    buildWeeks: 32,
    bedrooms: [3, 4, 4],
    included: ['Central planted courtyard', 'Productive vegetable beds', 'Greywater recycling loop', 'Green roof with drip irrigation', 'Rain garden and swale', 'Composting station'],
    colors: ['#3F6B3A', '#4A5540', '#F8F6EC', '#B08C4F'],
    materials: ['Stabilised earth block', 'Timber decking', 'Rammed earth', 'Clay tile', 'Reclaimed timber'],
    locations: ['Karen', 'Ngong', 'Limuru', 'Nanyuki', 'Karen Plains'],
    bestFor: 'Households that want to grow food and cut water bills.',
  },
  {
    slug: 'courtyard-villa',
    name: 'Courtyard Villa',
    swahiliName: 'Nyumba ya Ua',
    tagline: 'Private, inward-facing and quiet from the street.',
    intro: 'A villa arranged around a private court with a pool, screened from the street by two flanking wings. Guests arrive into the court; the road never touches the living rooms.',
    story: 'Privacy is the whole design. Two single-storey wings frame a central double-height living block, and the only street-facing openings are high clerestory windows. Sound drops by around 15 decibels between the gate and the pool, which is the difference between a busy road and a garden.',
    hero: { roofs: 'Low-pitch standing seam metal', walls: 'Roughcast render and stone', openings: 'Sliding glass to court and pool' },
    priceFrom: 32000000,
    priceTo: 78000000,
    plotRange: '0.4 – 1.25 acre',
    buildWeeks: 46,
    bedrooms: [4, 5, 6],
    included: ['Private courtyard with pool', 'Two flanking guest wings', 'Double-height living volume', 'Outdoor kitchen and pergola', 'Staff quarters and service yard', 'Solar-heated pool'],
    colors: ['#9C5B2E', '#5A4636', '#FCF7EE', '#BE9A5C'],
    materials: ['Roughcast render', 'Nairobi blue stone', 'Standing seam metal', 'Teak', 'Travertine'],
    locations: ['Runda', 'Muthaiga', 'Karen', 'Nyali', 'Tigoni'],
    bestFor: 'Established families who entertain and value privacy.',
  },
];

const PACKAGES = [
  {
    slug: 'basic',
    name: 'Basic',
    tier: 'basic',
    price: 480000,
    monthlySavings: 4200,
    powerSavingPct: 12,
    waterSavingPct: 8,
    devices: 14,
    installDays: 4,
    summary: 'The essentials. Lights, locks and a smart meter you can read from your phone.',
    headline: 'Everything you need to stop worrying about the basics.',
    groups: [
      { title: 'Security', items: ['Smart front door lock with keypad', 'Door and window contact sensors (6)', 'Indoor motion sensor (2)', 'Entry camera doorbell'] },
      { title: 'Lighting and power', items: ['Smart switches (8 circuits)', 'Dimmable living room control', 'Smart energy meter with app reporting'] },
      { title: 'Climate and water', items: ['Smart thermostat (1 zone)', 'Water tank level sensor', 'Leak detection under the sink'] },
      { title: 'Connectivity and support', items: ['TRIXX Home Hub with 4G backup', 'TRIXX Home app for the whole family', '2-year warranty, remote support'] },
    ],
    notIncluded: ['Solar and battery', 'EV charger', 'Farm plot sensors', 'Automated irrigation'],
  },
  {
    slug: 'comfort',
    name: 'Comfort',
    tier: 'comfort',
    price: 1250000,
    monthlySavings: 11500,
    powerSavingPct: 26,
    waterSavingPct: 24,
    devices: 34,
    installDays: 8,
    popular: true,
    summary: 'Adds solar, automated irrigation and proper energy management.',
    headline: 'The package most families choose — solar, irrigation and full automation.',
    groups: [
      { title: 'Security', items: ['Everything in Basic', 'Outdoor cameras with night vision (4)', 'Smart gate motor and intercom', 'Smoke and gas alarms (3)'] },
      { title: 'Lighting and power', items: ['Smart switches (16 circuits)', '3 kWp solar array with 5 kWh battery', 'Circuit-level energy monitoring', 'Appliance scheduling for peak tariffs'] },
      { title: 'Climate and water', items: ['Smart thermostat (3 zones)', 'Automated garden irrigation (4 zones)', 'Rainwater harvesting controller', 'Hot water timer and solar geyser control'] },
      { title: 'Connectivity and support', items: ['TRIXX Home Hub with 4G and fibre failover', 'Guest access and family profiles', 'Voice control for lights and scenes', '4-year warranty, on-site support visits'] },
    ],
    notIncluded: ['EV charger', 'Farm plot sensors', 'Whole-home battery backup beyond 5 kWh'],
  },
  {
    slug: 'premium',
    name: 'Premium',
    tier: 'premium',
    price: 2850000,
    monthlySavings: 24800,
    powerSavingPct: 46,
    waterSavingPct: 38,
    devices: 62,
    installDays: 14,
    summary: 'Full solar and battery, farm plot, EV charging and off-grid resilience.',
    headline: 'Independent power, a monitored farm plot and room to grow.',
    groups: [
      { title: 'Security', items: ['Everything in Comfort', 'Perimeter cameras with AI person detection (8)', 'Biometric entry and visitor log', '24/7 monitored alarm link to response team'] },
      { title: 'Lighting and power', items: ['Smart switches and dimmers (whole house)', '8 kWp solar array with 15 kWh battery', 'Whole-home backup and automatic changeover', '7 kW EV charger with scheduled charging'] },
      { title: 'Climate and water', items: ['Zoned climate control with humidity sensing', 'Pool heating and filtration automation', 'Borehole and tank automation with quality sensing', 'Greywater recycling controller'] },
      { title: 'Farm and garden', items: ['IoT irrigation with soil-moisture sensors (8)', 'Weather station and rain forecast integration', 'Livestock water-level monitoring', 'Harvest and yield logging in TRIXX Farm'] },
      { title: 'Connectivity and support', items: ['TRIXX Home Hub with dual WAN and LTE failover', 'Priority on-site support, 24-hour response', 'Annual system health audit', '6-year warranty'] },
    ],
    notIncluded: [],
  },
];

const APP_SLUGS = ['home', 'farm', 'rent', 'market', 'school'];

const APPS = [
  {
    slug: 'home',
    name: 'TRIXX Home',
    accent: '#0B7167',
    tagline: 'Control lights, locks, climate and power from one screen.',
    description: 'TRIXX Home is the control room for your house. It reads your solar, watches your tank, arms your cameras and lets you hand a temporary key to a cleaner or a contractor without ever cutting a metal one.',
    features: [
      'Lights, sockets and scenes room by room',
      'Live solar generation, battery state and grid draw',
      'Camera streams and motion history',
      'Digital keys with expiry for staff and guests',
      'Automations: sunrise lighting, away mode, water-tank alerts',
      'Works offline on the local hub when the internet drops',
    ],
    stats: [
      { label: 'Devices supported', value: '180+' },
      { label: 'Average setup time', value: '9 min' },
      { label: 'Rating', value: '4.8 / 5' },
    ],
    sizes: '24 MB Android · 61 MB iOS',
    platforms: ['Android 8.0+', 'iOS 14+', 'Web dashboard'],
  },
  {
    slug: 'farm',
    name: 'TRIXX Farm',
    accent: '#2F6B4F',
    tagline: 'Irrigate on soil moisture, not on guesswork.',
    description: 'TRIXX Farm turns a plot into a managed system. Sensors report moisture at three depths, the controller waters only when the soil asks, and every litre and hour is logged so you can see what the season actually cost.',
    features: [
      'Soil-moisture and temperature sensing at 3 depths',
      'Zone irrigation schedules with weather-aware skipping',
      'Water and pump-hour accounting per zone',
      'Livestock water level and trough monitoring',
      'Planting calendar with yield logging',
      'Offline schedule that runs without network',
    ],
    stats: [
      { label: 'Water saved', value: 'up to 41%' },
      { label: 'Labour saved', value: 'up to 12 hrs/wk' },
      { label: 'Zones per controller', value: '16' },
    ],
    sizes: '18 MB Android · 44 MB iOS',
    platforms: ['Android 8.0+', 'iOS 14+', 'Web dashboard'],
  },
  {
    slug: 'rent',
    name: 'TRIXX Rent',
    accent: '#9C741A',
    tagline: 'Pay rent, get receipts, log a repair — in three taps.',
    description: 'TRIXX Rent removes the monthly argument. Rent is invoiced, paid by M-Pesa or card, receipted instantly and reconciled against the lease. Maintenance requests carry photos and a status the tenant can follow.',
    features: [
      'Rent invoicing with M-Pesa and card payment',
      'Instant digital receipts and running balance',
      'Maintenance requests with photos and status tracking',
      'Lease documents and renewal reminders',
      'Deposit ledger and move-out checklist',
      'Landlord and tenant views of the same record',
    ],
    stats: [
      { label: 'Payment settlement', value: 'under 30 s' },
      { label: 'Receipt delivery', value: 'instant' },
      { label: 'Repairs resolved in 48 h', value: '86%' },
    ],
    sizes: '21 MB Android · 52 MB iOS',
    platforms: ['Android 8.0+', 'iOS 14+', 'Web portal'],
  },
  {
    slug: 'market',
    name: 'TRIXX Market',
    accent: '#956344',
    tagline: 'Buy and sell property with verified people.',
    description: 'TRIXX Market is the listing side of the business. Every owner is identity-checked, every TRIXX-built home carries its build record, and buyers chat directly with the seller instead of through a chain of brokers.',
    features: [
      'Verified owner and agent profiles',
      'Search by location, price, style and smart tier',
      'Chat with the owner or agent in the app',
      'Saved searches with new-match alerts',
      'Photo, video and 360 tour on every listing',
      'Mortgage and payment calculator in-app',
    ],
    stats: [
      { label: 'Live listings', value: '2,400+' },
      { label: 'Identity-verified owners', value: '100%' },
      { label: 'Median time to offer', value: '23 days' },
    ],
    sizes: '26 MB Android · 58 MB iOS',
    platforms: ['Android 8.0+', 'iOS 14+', 'Web portal'],
  },
  {
    slug: 'school',
    name: 'TRIXX School',
    accent: '#34465B',
    tagline: 'Fees, timetables and reports for parents and schools.',
    description: 'TRIXX School connects a school to its parents. Fees are invoiced and receipted, timetables and results are published to the right guardians only, and announcements reach everyone who needs them without a paper trail.',
    features: [
      'Fee invoicing, M-Pesa payment and receipts',
      'Timetable and term calendar',
      'Report cards and assessment history',
      'Attendance and transport notifications',
      'Guardian-only announcements',
      'Bursary and payment-plan tracking',
    ],
    stats: [
      { label: 'Schools onboarded', value: '38' },
      { label: 'Fee collection time cut', value: 'by 64%' },
      { label: 'Guardians active', value: '21,000+' },
    ],
    sizes: '19 MB Android · 47 MB iOS',
    platforms: ['Android 8.0+', 'iOS 14+', 'Web portal'],
  },
];

const FARM = {
  intro: 'A TRIXX farm plot is a measured system, not a guess. Soil sensors decide when to water, the controller runs the zones, and the app shows you the litres and the hours you did not spend.',
  howItWorks: [
    { step: '01', title: 'Soil sensing', body: 'Capacitive probes at 150 mm, 300 mm and 600 mm report moisture and temperature every fifteen minutes. The controller waters the root zone, not the surface.' },
    { step: '02', title: 'Weather-aware control', body: 'The controller pulls a local forecast. If 8 mm of rain is expected within twelve hours, the morning cycle is skipped and logged as a saving.' },
    { step: '03', title: 'Zoned delivery', body: 'Drip lines run in zones by crop and soil type. Each zone has its own valve, flow meter and schedule, so a sandy bed and a clay bed are never watered the same way.' },
    { step: '04', title: 'Pump and tank protection', body: 'Level sensors stop the pump running dry, and pressure monitoring flags a burst line within minutes instead of at the end of the day.' },
    { step: '05', title: 'Proof in the app', body: 'Litres used, hours saved, pump run-time and yield per bed land in TRIXX Farm. At the end of the season you can see what the plot actually cost to run.' },
  ],
  plotPackages: [
    { slug: 'starter-plot', name: 'Starter Plot', size: '0.25 acre', price: 185000, zones: 2, sensors: 3, waterSaving: '28%', labourSaving: '6 hrs/week', includes: ['2 irrigation zones with drip lines', '3 soil-moisture sensors', 'Weather-aware controller', 'Rainwater tank level sensor', 'TRIXX Farm app access'] },
    { slug: 'family-plot', name: 'Family Plot', size: '1 acre', price: 520000, zones: 6, sensors: 8, waterSaving: '36%', labourSaving: '10 hrs/week', popular: true, includes: ['6 irrigation zones with drip and micro-sprinkler', '8 soil-moisture sensors', 'Weather station and rain gauge', 'Pump protection and flow metering', 'Livestock water monitoring', 'TRIXX Farm app with yield logging'] },
    { slug: 'estate-plot', name: 'Estate Plot', size: '5 acres and above', price: 1450000, zones: 16, sensors: 20, waterSaving: '41%', labourSaving: '12 hrs/week', includes: ['Up to 16 irrigation zones', '20 soil, flow and pressure sensors', 'Borehole and tank automation', 'Fertigation dosing control', 'Per-zone water and cost accounting', 'Annual agronomy review visit'] },
  ],
  savings: [
    { crop: 'Tomatoes under drip', water: '42% less water', labour: '11 hrs/week saved', payback: '14 months' },
    { crop: 'Kale and spinach beds', water: '34% less water', labour: '8 hrs/week saved', payback: '11 months' },
    { crop: 'Maize, rain-fed with top-up', water: '26% less water', labour: '6 hrs/week saved', payback: '19 months' },
    { crop: 'Avocado orchard', water: '38% less water', labour: '9 hrs/week saved', payback: '16 months' },
  ],
  example: {
    title: 'One acre of kale in Kiambu, twelve months',
    rows: [
      { label: 'Water used before', value: '1,140,000 litres' },
      { label: 'Water used after', value: '752,000 litres' },
      { label: 'Water cost before', value: 'KES 285,000' },
      { label: 'Water cost after', value: 'KES 188,000' },
      { label: 'Irrigation labour before', value: '14 hrs/week' },
      { label: 'Irrigation labour after', value: '4 hrs/week' },
      { label: 'Season yield change', value: '+17%' },
      { label: 'Payback on Family Plot', value: '11 months' },
    ],
  },
};

const { STYLES_SW, PACKAGES_SW, APPS_SW, FARM_SW } = require('./catalog-sw');

/* Locale-aware accessors. English stays the structural source of truth; the
   Kiswahili overlay in catalog-sw.js replaces only the prose, matched by slug
   for objects and by position for arrays. */

const TIER_NAME_SW = { basic: 'Msingi', comfort: 'Faraja', premium: 'Bora' };

/* Display name of a smart tier. Used for badges and spec notes. */
function tierName(tier, locale) {
  if (locale === 'sw') return TIER_NAME_SW[tier] || tier;
  return { basic: 'Basic', comfort: 'Comfort', premium: 'Premium' }[tier] || tier;
}

function stylesFor(locale) {
  if (locale !== 'sw') return STYLES;
  return STYLES.map((s) => ({ ...s, ...(STYLES_SW[s.slug] || {}) }));
}

function packagesFor(locale) {
  if (locale !== 'sw') return PACKAGES;
  return PACKAGES.map((p) => {
    const sw = PACKAGES_SW[p.slug];
    if (!sw) return p;
    return {
      ...p,
      ...sw,
      groups: p.groups.map((g, i) => {
        const gsw = (sw.groups || [])[i] || {};
        return { title: gsw.title || g.title, items: gsw.items || g.items };
      }),
    };
  });
}

function appsFor(locale) {
  if (locale !== 'sw') return APPS;
  return APPS.map((a) => {
    const sw = APPS_SW[a.slug];
    if (!sw) return a;
    return {
      ...a,
      ...sw,
      stats: a.stats.map((st, i) => ({ ...st, ...((sw.stats || [])[i] || {}) })),
    };
  });
}

function farmFor(locale) {
  if (locale !== 'sw') return FARM;
  return {
    ...FARM,
    intro: FARM_SW.intro,
    howItWorks: FARM.howItWorks.map((h, i) => ({ ...h, ...((FARM_SW.howItWorks || [])[i] || {}) })),
    plotPackages: FARM.plotPackages.map((p) => ({ ...p, ...((FARM_SW.plotPackages || {})[p.slug] || {}) })),
    savings: FARM.savings.map((row, i) => ({ ...row, ...((FARM_SW.savings || [])[i] || {}) })),
    example: {
      ...FARM.example,
      title: FARM_SW.example.title,
      rows: FARM.example.rows.map((r, i) => ({ ...r, label: (FARM_SW.example.rows || [])[i] || r.label })),
    },
  };
}

module.exports = {
  STYLES, PACKAGES, APPS, APP_SLUGS, FARM,
  stylesFor, packagesFor, appsFor, farmFor, tierName,
};
