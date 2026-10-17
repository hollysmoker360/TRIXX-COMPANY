'use strict';

const { ROOM_KEYS } = require('./copy');

/* Property listings. `source` separates TRIXX-built homes from listings posted
   by other owners; `verified` is only true once our team has checked title,
   ownership and the physical property. */

const COUNTIES = {
  Nairobi: ['Karen', 'Lavington', 'Runda', 'Kilimani', 'Westlands', 'Parklands', 'Muthaiga', 'Syokimau', 'Ruaka'],
  Mombasa: ['Nyali', 'Bamburi', 'Mombasa Island', 'Diani'],
  Kilifi: ['Kilifi', 'Watamu', 'Malindi'],
  Kiambu: ['Kiambu Road', 'Limuru', 'Tigoni', 'Ngong'],
  Machakos: ['Athi River'],
  Nakuru: ['Nakuru', 'Milimani'],
  Laikipia: ['Nanyuki'],
  Lamu: ['Lamu', 'Shela'],
  Kajiado: ['Ngong', 'Kitengela'],
};

const AMENITY_POOL = [
  'Solar array', 'Battery backup', 'EV charger', 'Borehole', 'Rainwater harvesting',
  'Automated irrigation', 'Smart gate', 'CCTV with AI detection', 'Fibre internet',
  'Backup generator', 'Swimming pool', 'Garden court', 'Staff quarters', 'Guest wing',
  'Outdoor kitchen', 'Gym room', 'Home office', 'Underfloor heating', 'Water treatment',
  'Green roof', 'Composting station', 'Playground', 'Basketball half-court', 'Wine store',
];

const NEIGHBORHOOD_NOTES = [
  'Tarmac access all the way, with a police post 900 m away.',
  'Mains water plus a working borehole on the plot.',
  'Three international schools within a 12-minute drive.',
  'Fibre is live on the street; KPLC three-phase is already connected.',
  'Quiet cul-de-sac with a neighbourhood association and night patrol.',
  'Ten minutes to the mall, fifteen to the nearest hospital.',
  'Matatu route at the junction; twenty-five minutes to the CBD off-peak.',
  'Mature indigenous trees on the boundary, seasonal stream at the rear.',
  'Gated estate with a shared borehole and refuse collection.',
  'Walking distance to a market and a health centre.',
];

const OWNERS = [
  { name: 'Amina Bakari', type: 'Individual owner', since: 2021 },
  { name: 'Coastline Properties Ltd', type: 'Agency', since: 2019 },
  { name: 'Joseph Mwangi', type: 'Individual owner', since: 2022 },
  { name: 'Greenfield Estates', type: 'Agency', since: 2018 },
  { name: 'Fatuma Hassan', type: 'Individual owner', since: 2023 },
  { name: 'Rift Valley Homes', type: 'Agency', since: 2020 },
  { name: 'Peter Otieno', type: 'Individual owner', since: 2021 },
  { name: 'Nairobi Bluechip Ltd', type: 'Agency', since: 2017 },
];

const TITLE_PREFIX = {
  'swahili-coastal': 'Coastal',
  victorian: 'Victorian',
  'art-deco': 'Deco',
  contemporary: 'Contemporary',
  'garden-court': 'Garden Court',
  'courtyard-villa': 'Courtyard',
};

const LAYOUTS = [
  { bedrooms: 3, bathrooms: 2, area: 186, plot: '0.125 acre' },
  { bedrooms: 3, bathrooms: 3, area: 204, plot: '0.2 acre' },
  { bedrooms: 4, bathrooms: 3, area: 268, plot: '0.25 acre' },
  { bedrooms: 4, bathrooms: 4, area: 312, plot: '0.4 acre' },
  { bedrooms: 5, bathrooms: 4, area: 385, plot: '0.5 acre' },
  { bedrooms: 5, bathrooms: 5, area: 430, plot: '0.75 acre' },
  { bedrooms: 6, bathrooms: 5, area: 520, plot: '1 acre' },
];

const STYLE_ORDER = ['swahili-coastal', 'contemporary', 'victorian', 'art-deco', 'garden-court', 'courtyard-villa'];
const TIER_ORDER = ['basic', 'comfort', 'premium'];
const LOCATION_FLAT = Object.entries(COUNTIES).flatMap(([county, towns]) => towns.map((town) => ({ county, town })));

function buildListings() {
  const listings = [];
  const total = 26;

  for (let i = 0; i < total; i += 1) {
    const loc = LOCATION_FLAT[(i * 5 + 3) % LOCATION_FLAT.length];
    const style = STYLE_ORDER[i % STYLE_ORDER.length];
    const layout = LAYOUTS[i % LAYOUTS.length];
    const tier = TIER_ORDER[i % TIER_ORDER.length];
    const forRent = i % 3 === 2;
    const trixxBuilt = i % 5 !== 4;
    const owner = OWNERS[i % OWNERS.length];

    const baseSale = 15500000 + (layout.bedrooms - 3) * 4200000 + (layout.area - 186) * 62000;
    const styleLift = { 'courtyard-villa': 1.35, victorian: 1.16, 'art-deco': 1.08, 'swahili-coastal': 1.04, 'garden-court': 0.97, contemporary: 1.0 }[style];
    const tierLift = { basic: 1, comfort: 1.06, premium: 1.14 }[tier];
    const price = Math.round((baseSale * styleLift * tierLift) / 50000) * 50000;
    const rent = Math.round(price * 0.0062 / 5000) * 5000;

    const amenities = AMENITY_POOL.filter((_, idx) => (idx + i) % 3 === 0).slice(0, 9);
    if (tier === 'premium' && !amenities.includes('Solar array')) amenities.unshift('Solar array');
    if (tier !== 'basic' && !amenities.includes('Battery backup')) amenities.push('Battery backup');

    const id = `TX-${String(1000 + i)}`;
    const title = `${TITLE_PREFIX[style]} ${layout.bedrooms}-Bedroom ${forRent ? 'to Let' : 'Home'} in ${loc.town}`;

    listings.push({
      id,
      slug: `${String(id).toLowerCase()}-${loc.town.toLowerCase().replace(/\s+/g, '-')}-${style}`,
      title,
      purpose: forRent ? 'rent' : 'sale',
      price: forRent ? rent : price,
      salePrice: price,
      rentPerMonth: rent,
      currency: 'KES',
      county: loc.county,
      location: loc.town,
      style,
      styleName: style,
      tier,
      bedrooms: layout.bedrooms,
      bathrooms: layout.bathrooms,
      area: layout.area,
      plot: layout.plot,
      built: 2017 + (i % 9),
      source: trixxBuilt ? 'trixx' : 'owner',
      verified: trixxBuilt || i % 2 === 0,
      featured: i % 6 === 0,
      amenities,
      neighborhood: NEIGHBORHOOD_NOTES[i % NEIGHBORHOOD_NOTES.length],
      owner: trixxBuilt ? { name: 'TRIXX Smart Living', type: 'Developer', since: 2016 } : owner,
      agent: trixxBuilt ? 'TRIXX Sales Team' : owner.name,
      availableFrom: `2026-${String((i % 12) + 1).padStart(2, '0')}-01`,
      description: trixxBuilt
        ? `A TRIXX-built ${style.replace('-', ' ')} home in ${loc.town}, ${loc.county}. Built to the ${tier} smart specification with the full device schedule fitted and commissioned before handover. The plot is ${layout.plot} with ${layout.area} square metres under roof across ${layout.bedrooms} bedrooms and ${layout.bathrooms} bathrooms.`
        : `A ${layout.bedrooms}-bedroom ${style.replace('-', ' ')} home in ${loc.town}, ${loc.county}, listed by ${owner.name}. The property has been checked for ownership and condition by the TRIXX listing team. The plot is ${layout.plot} with ${layout.area} square metres under roof.`,
      highlights: [
        `${layout.bedrooms} bedrooms, ${layout.bathrooms} bathrooms`,
        `${layout.area} m² under roof on ${layout.plot}`,
        `${tier[0].toUpperCase() + tier.slice(1)} smart tier fitted`,
        `${loc.town}, ${loc.county}`,
      ],
      monthlyCosts: {
        serviceCharge: Math.round((price * 0.00012) / 500) * 500,
        insurance: Math.round((price * 0.0004) / 500) * 500,
        rates: Math.round((price * 0.00009) / 500) * 500,
      },
      inquiries: 4 + ((i * 7) % 40),
      views: 120 + ((i * 137) % 2400),
      listedAt: `2026-0${(i % 9) + 1}-${String((i % 27) + 1).padStart(2, '0')}`,
      tourRooms: ROOM_KEYS.slice(),
      media: {
        photos: 8 + (i % 7),
        video: true,
        tour: true,
        floorPlan: true,
      },
    });
  }
  return listings;
}

const LISTINGS = buildListings();

const TESTIMONIALS = [
  { name: 'Wanjiru Kamau', role: 'Homeowner, Kiambu Road', quote: 'We moved into a Comfort-spec Contemporary in March. The solar covers the whole house and the pump, and our KPLC bill went from about 9,000 to under 2,000 a month. The app told us the water tank was low before we noticed.', rating: 5 },
  { name: 'Ali Mohamed', role: 'Homeowner, Nyali', quote: 'The Swahili Coastal plan is the only one I have seen that actually keeps the house cool without running air conditioning all day. The veranda is where we live now.', rating: 5 },
  { name: 'Grace Otieno', role: 'Tenant, Kilimani', quote: 'Paying rent through TRIXX Rent means I get a receipt in the same minute and the repair I logged on Tuesday was fixed on Thursday. No more arguing about what was paid.', rating: 4 },
  { name: 'Samuel Kipchoge', role: 'Farmer, Nanyuki', quote: 'Two acres of avocado on the Family Plot package. We use about a third less water and I stopped spending every morning moving pipes. Payback came in under a year.', rating: 5 },
  { name: 'Halima Salim', role: 'Investor, Diani', quote: 'I bought two coastal units to let. The build record and the smart-tier documentation made the mortgage straightforward, and the tenant portal means I am not chasing anyone for receipts.', rating: 5 },
  { name: 'Daniel Mwenda', role: 'Landlord, Syokimau', quote: 'Listing on TRIXX Market brought twenty-two enquiries in a week, all identity-checked. The owner dashboard shows me exactly which ones turned into viewings.', rating: 4 },
];

const CASE_STUDIES = [
  {
    slug: 'karen-garden-court-water',
    title: 'Cutting a Karen household water bill by 38%',
    summary: 'A Garden Court build with greywater recycling and soil-moisture irrigation reduced metered water use by 38% in the first year while doubling the vegetable yield from the court.',
    metrics: [
      { label: 'Water reduction', value: '38%' },
      { label: 'Vegetable spend cut', value: 'KES 96,000/yr' },
      { label: 'Yield increase', value: '2.1×' },
    ],
    body: 'The household moved in during a dry January. The court was planted with kale, spinach and two avocado saplings, and the greywater loop was commissioned in week three. Over twelve months the metered draw fell from an estimated 640 m³ to 397 m³. The family reports that the court now supplies most of their vegetables and that the drip system runs itself.',
    style: 'garden-court',
  },
  {
    slug: 'nyali-solar-independence',
    title: 'A Nyali villa that runs on its own roof',
    summary: 'An 8 kWp array with 15 kWh of storage on a Swahili Coastal build carried the household through 94% of the year without grid draw, including the pool pump.',
    metrics: [
      { label: 'Grid independence', value: '94%' },
      { label: 'Annual power saving', value: 'KES 341,000' },
      { label: 'Payback', value: '4.6 years' },
    ],
    body: 'Coastal humidity and salt air are hard on equipment, so the array was mounted on marine-grade rails with a 300 mm standoff for airflow. The pool pump runs on a midday schedule that tracks generation. Across the year the house drew 610 kWh from the grid, all of it at night in the two cloudiest weeks of the long rains.',
    style: 'swahili-coastal',
  },
  {
    slug: 'kiambu-road-smart-retrofit',
    title: 'Retrofitting a 1998 house to Comfort specification',
    summary: 'A ten-year-old house with no conduit was brought to full Comfort specification in eleven days without opening a single finished wall.',
    metrics: [
      { label: 'Retrofit time', value: '11 days' },
      { label: 'Power bill cut', value: '31%' },
      { label: 'Occupied throughout', value: 'Yes' },
    ],
    body: 'The family did not want to move out. We used surface trunking matched to the skirting colour, wireless relays in the ceiling void, and a battery system in the garage. The only visible new hardware is the hub and the inverter. The house was occupied for the whole installation.',
    style: 'contemporary',
  },
];

const PRESS = [
  { outlet: 'Business Daily', date: '2026-06-14', title: 'TRIXX opens smart-home factory in Athi River', href: 'https://www.businessdailyafrica.com/' },
  { outlet: 'The Standard', date: '2026-04-02', title: 'How soil sensors are changing smallholder irrigation', href: 'https://www.standardmedia.co.ke/' },
  { outlet: 'Nation', date: '2026-02-19', title: 'Coastal design that cools without air conditioning', href: 'https://nation.africa/' },
  { outlet: 'TechCabal', date: '2025-11-08', title: 'TRIXX Rent crosses 40,000 monthly transactions', href: 'https://techcabal.com/' },
  { outlet: 'Daily Nation Property', date: '2025-09-27', title: 'Owner listings get an identity check', href: 'https://nation.africa/' },
];

const TEAM = [
  { name: 'Nadia Kombo', role: 'Founder and Chief Executive', bio: 'Trained as a structural engineer and spent nine years in coastal construction before founding TRIXX in 2016. Nadia led the design of the Swahili Coastal range.', focus: 'Design and strategy' },
  { name: 'Brian Wekesa', role: 'Chief Technology Officer', bio: 'Built the TRIXX Home and Farm platforms. Previously ran IoT deployments for a regional utility, and holds the patents behind our soil-moisture controller.', focus: 'Platforms and IoT' },
  { name: 'Zainab Ali', role: 'Head of Property', bio: 'Runs listings, valuation and the verification team. Zainab has valued more than 3,000 residential properties across the coast and Nairobi.', focus: 'Listings and valuation' },
  { name: 'Tom Gitau', role: 'Head of Construction', bio: 'Manages the build programme across six sites. Tom introduced the service-spine standard that lets us retrofit technology without opening walls.', focus: 'Build programme' },
  { name: 'Lucy Njeri', role: 'Head of Farm Solutions', bio: 'An agronomist who designed the plot packages and the zone-planning method. Lucy runs the annual agronomy review visits.', focus: 'Irrigation and agronomy' },
  { name: 'Peter Mwaura', role: 'Head of Finance', bio: 'Structures the mortgage partnerships and owner subscription billing. Peter built the payment reconciliation behind TRIXX Rent.', focus: 'Finance and billing' },
  { name: 'Aisha Mohamed', role: 'Head of Customer Experience', bio: 'Owns the viewing calendar, the lead inbox and the 48-hour repair promise. Aisha has run the support desk since 2019.', focus: 'Service and support' },
  { name: 'Kevin Odhiambo', role: 'Head of Security and Compliance', bio: 'Handles device-data governance, camera policy and the audit programme. Kevin wrote our privacy position on camera and sensor data.', focus: 'Compliance and privacy' },
];

const MILESTONES = [
  { year: '2016', title: 'TRIXX founded in Nairobi', body: 'Started with three people, one completed house in Kiambu and a promise to wire every build for the future.' },
  { year: '2018', title: 'First Swahili Coastal range completed', body: 'Six homes in Kilifi and Watamu, and the design language that still defines the coastal collection.' },
  { year: '2020', title: 'TRIXX Home launched', body: 'The first version of the smart-home app shipped to 400 households on our own builds.' },
  { year: '2022', title: 'Farm solutions and TRIXX Farm', body: 'Soil-moisture irrigation moved from a pilot in Nanyuki to a full product line.' },
  { year: '2024', title: 'Market and Rent launched', body: 'The property marketplace opened to owner listings, with identity verification from day one.' },
  { year: '2026', title: 'Athi River smart-device factory', body: 'Opened a local assembly line for hubs, sensors and controllers, cutting lead times to nine days.' },
];

const FAQ_GROUPS = [
  {
    title: 'Buying',
    items: [
      { q: 'What does the smart tier actually change in the house?', a: 'The tier decides which devices are fitted and commissioned before handover. Basic covers lights, locks, sensors and metering. Comfort adds solar with storage, automated irrigation and zoned climate control. Premium adds whole-home battery backup, an EV charger, a monitored farm plot and priority support. The full device schedule for each tier is on the smart packages page.' },
      { q: 'Is the smart equipment included in the house price?', a: 'Yes. Every TRIXX-built home is priced with its tier included and commissioned. There is no separate installation invoice and no subscription for the core app features.' },
      { q: 'Can I change the tier after handover?', a: 'Yes. Our builds carry a service spine and spare conduit, so an upgrade from Basic to Comfort is typically four to eight days of work with the house occupied. Upgrading to Premium needs more space for the battery bank, which we plan for at design stage.' },
      { q: 'How do you verify an owner listing?', a: 'We check the title or lease, confirm the identity of the person listing, and send a surveyor to photograph and measure the property. Only then does the listing carry the verified badge. Listings that have not completed this are labelled as owner listings without the badge.' },
      { q: 'Do you help with a mortgage?', a: 'We work with Stanbic and two other lenders. Our team prepares the build record, valuation pack and smart-tier documentation that lenders ask for, and we can introduce you to a mortgage advisor at no cost.' },
    ],
  },
  {
    title: 'Renting and tenant services',
    items: [
      { q: 'How do I pay rent?', a: 'Through TRIXX Rent in the app or the tenant portal on this site, by M-Pesa or card. You get a digital receipt immediately and your balance updates in the same minute.' },
      { q: 'How fast are repairs handled?', a: 'You log the request with photos in the app or the portal. We acknowledge within four working hours and target a 48-hour resolution for anything that affects habitability. The status is visible to you the whole time.' },
      { q: 'Does my login work across the apps?', a: 'Yes. One TRIXX account covers the website and all five apps. Register here once and you are already a user in Rent, Market, Home, Farm and School.' },
    ],
  },
  {
    title: 'Farm solutions',
    items: [
      { q: 'Will the irrigation work without internet?', a: 'Yes. The controller holds the full schedule locally and keeps running on soil-moisture triggers if the connection drops. It syncs the log when it reconnects.' },
      { q: 'How much water will I actually save?', a: 'Between 26% and 42% depending on crop and soil, measured across our installed plots. The savings calculator on this site uses those measured figures and lets you enter your own water cost.' },
      { q: 'Do you install on land you did not develop?', a: 'Yes. Farm plot packages are installed on any plot with a water source and a pump. We survey first and give you a zone plan before quoting.' },
    ],
  },
  {
    title: 'Technology, data and privacy',
    items: [
      { q: 'What camera and device data do you collect?', a: 'Cameras record to your local hub by default, and video stays there unless you switch on cloud backup. We receive device health, fault and usage metadata — for example that a sensor went offline or a battery dropped below 20% — so we can support you. We do not watch or review your video, and we do not sell device data to anyone. Full detail is in the privacy policy and the device data note.' },
      { q: 'Can I export or delete my data?', a: 'Yes. You can export your device history, energy logs and receipts as CSV from the app, and you can ask us to delete your account and associated data. We complete deletion requests within 30 days, except records we must keep for tax and lease law.' },
      { q: 'What happens if the internet goes down?', a: 'The hub runs automations, lighting, locks and irrigation locally. The app will not reach the house until the connection returns, but the house keeps working.' },
    ],
  },
  {
    title: 'Listing your property',
    items: [
      { q: 'What does it cost to list?', a: 'Listing is free for the first thirty days. After that you choose a plan: Standard at KES 1,500 a month for one listing, Portfolio at KES 4,500 a month for up to five, or Agency at KES 12,000 a month for unlimited listings and a team dashboard. There is no commission on a sale.' },
      { q: 'Can I edit or withdraw a listing?', a: 'Yes, at any time from the owner dashboard. Withdrawn listings stop showing immediately and are removed from search results.' },
      { q: 'Do you moderate listings?', a: 'Every listing is reviewed before it goes live. We reject duplicate, misleading or unverifiable listings, and we suspend accounts that repeatedly breach the listing rules.' },
    ],
  },
];

const BLOG_POSTS = [
  {
    slug: 'how-much-does-a-smart-home-cost-in-kenya',
    title: 'How much does a smart home actually cost in Kenya?',
    date: '2026-09-18',
    category: 'Buying',
    author: 'Peter Mwaura',
    style: 'contemporary',
    excerpt: 'Device prices have fallen but installation and integration still drive the number. Here is what each tier really costs, and where the money goes.',
    body: `Most buyers ask for a single figure. The honest answer is that a smart home costs what a kitchen costs — it depends on how much you build in, and whether the wiring was planned before the walls went up.

## Where the money goes

- **Devices** are roughly 45% of the total. Switches, locks, sensors, cameras, the hub and the meters.
- **Power and storage** is the biggest variable. A 3 kWp array with 5 kWh of battery is a different order of spend from 8 kWp with 15 kWh.
- **Installation and commissioning** is about 20%, and it is where cheap quotes hide costs. Retrofit work in a finished house can be double the planned-install figure.
- **Integration** is the part people forget. Someone has to make the lights, the inverter and the irrigation controller agree with each other.

## What the tiers cost

Our Basic tier lands at KES 480,000, Comfort at KES 1,250,000 and Premium at KES 2,850,000. Those are installed and commissioned prices, not device-only prices.

## The retrofit trap

If you are buying an existing house, ask one question before anything else: is there conduit and a service route from the roof to the plant room? If the answer is no, budget for surface trunking or accept a slower, more expensive installation. A house built after 2015 usually has enough spare capacity. A 1990s build rarely does.

## What to skip first

If the budget is tight, skip the pool automation and the video doorbell before you skip the battery. Storage is what turns a solar array from a daytime discount into real independence.

## What each tier includes, in plain terms

**Basic (KES 480,000 installed).** Smart switches on the main circuits, a smart lock on the front door, door and window sensors, a hub, and metering on power and water. You get control and visibility. You do not get storage, so a grid outage still takes the lights with it.

**Comfort (KES 1,250,000 installed).** Everything in Basic, plus a 3 kWp solar array, 5 kWh of battery, automated irrigation for a small plot, and zoned climate control. This is the tier most families choose, because it covers a typical outage and still runs the fridge and the borehole pump.

**Premium (KES 2,850,000 installed).** Everything in Comfort, scaled up: 8 kWp of solar, 15 kWh of battery, an EV charger, a monitored farm plot and priority service. This tier is aimed at houses that run a home office, a borehole and an irrigation system at the same time.

## Costs people do not plan for

Three items show up late and surprise buyers. The first is the **plant room**: batteries and inverters need ventilated, dry space, and a 1950s house often has none. The second is **earthing and surge protection**, which a solar installer will insist on and which is not part of the device list. The third is **commissioning time** — a day or two of an engineer's time to make the app, the inverter and the irrigation controller behave as one system.

## How to compare two quotes

Ask for the device schedule by model number, not by category. "Smart lighting" can mean a KES 3,000 switch or a KES 22,000 one, and the difference matters at year three when you are replacing them. Ask what happens to the system when the internet is down, because a well-built system keeps working locally and a cheap one does not. Finally, ask who owns the data and whether you can export it. If the answer is a shrug, keep looking.

## What it saves

A Comfort tier house in Nairobi typically cuts grid consumption by 38% to 46% in the first year, and water use by a quarter once irrigation is automated. Premium houses with a monitored plot report labour savings of about 30 hours a month during the growing season. Those figures come from our own metering across 60-odd installations, not from a brochure.`,
  },
  {
    slug: 'swahili-coastal-design-that-cools-without-ac',
    title: 'Coastal design that cools without air conditioning',
    date: '2026-08-27',
    category: 'Design',
    author: 'Nadia Kombo',
    style: 'swahili-coastal',
    excerpt: 'Shade, airflow and thermal mass do more than a compressor. The physics behind the coastal range, and how to copy it anywhere.',
    body: `Air conditioning treats a symptom. A Swahili coastal house treats the cause, and it does so with three moves that cost almost nothing at build stage.

## Orient the long wall to the monsoon

The kaskazi and kusi winds reverse twice a year. A veranda on the long axis with openings on both sides gives you cross-ventilation in both seasons. We model this before we draw a single room.

## Build shade, not glass

Every square metre of west-facing glass adds heat. Deep verandas, screen walls and shutters cut the load before it reaches the room. Coral-stone screens block direct sun but let air and light through.

## Let mass do the work

Lime plaster over coral rag stone absorbs heat during the day and releases it at night. The house drifts a few degrees behind the outside temperature instead of fighting it.

## The measured result

Across our coastal builds, indoor temperatures run 4 to 6 degrees below comparable unshaded houses, and mechanical cooling runs under 90 hours a year.

## The moves that do the work

**Deep verandahs on the east and west.** The sun rises and sets low, and a two-metre verandah keeps that light off the wall glass entirely. A one-metre verandah, which is what most plans show, does almost nothing.

**High ceilings with cross ventilation.** Warm air needs somewhere to go. A 3.4-metre ceiling with vents at the ridge and low-level inlets on the sea side moves air through the house without a fan. Dropping to 2.7 metres for cost kills the effect.

**Thermal mass in the right place.** Coral rag and limestone walls hold the cool of the night and release it through the day. This only works if the walls are shaded, which is why the verandah matters more than the wall thickness.

**Courtyards as chimneys.** A planted courtyard draws hot air up and out, and pulls cooler air in from the shaded side. It also gives you a private outdoor room, which is what buyers on the coast actually want.

## What does not work

Glass walls facing the sea look wonderful in a render and behave like an oven by ten in the morning. Tinted glass reduces the glare but still admits the heat, and you have paid for it. Air conditioning sized to fight a badly oriented house will run all day and still lose.

## The numbers from our Kilifi builds

We monitor four coastal houses of similar floor area. The two built to the orientation above ran 4 to 6 degrees cooler at 3pm than the two built to a standard plan with the same wall material. Mechanical cooling in the first pair ran under 90 hours across the year, against 640 hours in the second. At current tariffs that is roughly KES 74,000 a year, before you count the equipment you did not have to buy.`,
  },
  {
    slug: 'soil-moisture-irrigation-what-it-saves',
    title: 'Soil-moisture irrigation: what it saves and when it pays back',
    date: '2026-08-05',
    category: 'Farm tips',
    author: 'Lucy Njeri',
    style: 'garden-court',
    excerpt: 'Measured results from installed plots across four crops, with the payback arithmetic you can check against your own water bill.',
    body: `We have soil-moisture controllers running on more than 300 plots. The measured savings are consistent enough to plan against.

## The numbers by crop

- **Tomatoes under drip:** 42% less water, 11 hours a week of labour saved, 14-month payback.
- **Kale and spinach beds:** 34% less water, 8 hours a week, 11-month payback.
- **Maize with top-up irrigation:** 26% less water, 6 hours a week, 19-month payback.
- **Avocado orchard:** 38% less water, 9 hours a week, 16-month payback.

## Why the labour saving matters more than the water

Water is often cheap or free from a borehole. Labour is not. Moving pipes for two hours every morning is 500 hours a year. That is the number that usually justifies the controller.

## The trap: watering by schedule

A timer that waters for twenty minutes every day over-waters after rain and under-waters in a dry spell. Moisture sensing is what turns a timer into a system.

## What to check before buying

Confirm you have consistent pressure at the furthest emitter, and that your pump can run the zones you plan. A controller cannot fix a pump that is too small.

## Why a timer wastes water

A timer waters because the clock says so. A soil-moisture controller waters because the root zone is actually dry. In a Kenyan long-rains season that difference is large: a timer running on its dry-season schedule will irrigate through a week of rain, and the water goes past the roots into the groundwater.

The sensors matter more than the controller. One probe at 20 centimetres and one at 40 centimetres per zone gives you a real picture. A single shallow probe tells you the surface is dry, which it will be by mid-morning even when the root zone is fine.

## What our plots saved

Across nine farm plots in Kiambu and Nakuru, switching from timer control to moisture-triggered control cut water use by 31% in the first season and 38% by the second, once the schedules had learned the soil. Pump running hours fell by about a third, which matters because pumps and their fuel or power are the second-largest cost after labour.

Labour is where the bigger number sits. Someone has to walk the lines, open valves and check for blockages. With moisture control and pressure-compensating emitters, one person can manage four times the area. On a two-acre plot that is roughly 26 hours a month returned to other work.

## Where automation does not help

Automation will not fix a sloping field with uneven pressure, and it will not fix soil that has no organic matter to hold water. If your soil is compacted, water runs off before it infiltrates, and no controller can change that. Fix the soil first with compost and mulch; the sensors will then have something worth measuring.

Automation also will not fix a pump that is too small for the zones you plan. Measure the flow at the furthest emitter before you buy anything. A controller is the cheapest part of the system and the least able to compensate for a weak one.`,
  },
  {
    slug: 'first-time-buyer-guide-kenya',
    title: 'A first-time buyer guide that skips the sales talk',
    date: '2026-07-22',
    category: 'Buying',
    author: 'Zainab Ali',
    style: 'victorian',
    excerpt: 'Title, access, water, power, drainage, neighbours. The seven checks that decide whether a house is a home or a problem.',
    body: `Before you fall in love with a kitchen, spend a morning on the boring questions.

## 1. The title

Get an official search from the lands registry. Confirm the seller is the registered owner and that there is no charge you did not know about. If a spouse has a matrimonial interest, get written consent.

## 2. Access

Is the access road tarmac, murram or a right of way over someone else's land? A right of way that is not registered is a future argument.

## 3. Water

Ask for three months of bills, or if there is a borehole, ask for a pump test and a water quality result. A dry borehole is an expensive surprise.

## 4. Power

Check whether the connection is single or three-phase, and what the transformer capacity is on the street. Three-phase matters if you plan solar or an EV charger.

## 5. Drainage

Visit during heavy rain if you can. Look at where water goes and whether the neighbouring plot drains toward you.

## 6. Neighbours and noise

Drive past at 7 a.m. and at 9 p.m. A quiet afternoon can be a loud evening.

## 7. Growth potential

Check the zoning. A four-storey apartment block next door changes the value and the light in your garden.

## Before you view anything

Get your financing in order first, because a seller who has another offer will not wait for you to find out what a bank will lend. In Kenya a mortgage typically needs a 10% to 20% deposit, and the lender will want three months of statements, proof of income and a valuation they commission themselves. That process takes four to eight weeks. Start it before you fall in love with a house.

Ask for the title and read it. Confirm the name on the title matches the person selling, and that the title is not charged to a lender who has not been paid off. A search at the lands office costs little and settles the question. If a seller resists a search, that is your answer.

## At the viewing

Visit twice, once in the morning and once in the late afternoon. Light, noise and traffic change completely between the two. Check water pressure by running two taps at once. Look at the ceiling for water stains and ask when the roof was last replaced. Open the electrical panel: a modern board with an earth leakage breaker is a good sign, and a tangle of old fuses is a cost you will inherit.

Walk the boundary with the title in hand. Fences move. A neighbour's wall that sits half a metre inside your plot is a problem you want to find now, not after you have paid.

## The paperwork that protects you

Insist on a sale agreement drawn by an advocate, not a handwritten note. It should name the price, the deposit, the completion date and what happens if either side walks away. Pay the deposit through a bank or an advocate's client account, never in cash, and keep the receipt.

Land rates and rent, service charges and any outstanding utility bills should be settled before completion. Ask for clearance certificates. A seller who says they will sort it out afterwards usually does not.

## Costs beyond the price

Budget for stamp duty, legal fees, the valuation and the transfer. Together these commonly add 6% to 9% to the purchase price. If you are buying off-plan, ask what the service charge will be once the development is occupied, because the figure quoted during construction is often half the real one.`,
  },
  {
    slug: 'renting-in-nairobi-what-to-check',
    title: 'Renting in Nairobi: what to check before you pay a deposit',
    date: '2026-07-03',
    category: 'Renting',
    author: 'Aisha Mohamed',
    style: 'art-deco',
    excerpt: 'Deposits, inventory, service charge and who fixes the water pump. A short checklist that prevents most disputes.',
    body: `Most tenancy disputes start with an assumption nobody wrote down.

## Get the inventory in writing

Walk the house with the landlord or agent and photograph every room, the meter readings and the state of the fittings. Both parties sign. This single step prevents most deposit arguments.

## Understand the service charge

Ask what it covers and what it has been for the last two years. A charge that excludes security or garbage is not the number you were quoted.

## Fix the water question

Who repairs the pump, the tank or the borehole? What is the process and the expected response time? Get it in the lease.

## Check the deposit terms

How much, what it can be deducted for, and how long a refund takes. Thirty days is reasonable. Ninety days is not.

## Confirm the rent payment channel

Pay through a channel that gives you a receipt the same day. A cash payment with a handwritten note is a dispute waiting to happen.

## Check the person, not just the flat

Ask who the landlord is and whether the agent has a written mandate to let the property. Agencies in Nairobi operate on commission, and an agent who cannot show a mandate may not have authority to take your deposit at all. If the landlord is abroad, ask who holds power of attorney and see the document.

Ask for the landlord's identity and the property's rate records. A landlord who cannot produce either is one to avoid. This is not suspicion for its own sake: the most common rental fraud in Nairobi is a person letting a flat they do not own, collecting two or three deposits, and disappearing.

## What to inspect properly

Test the water. Turn on the shower and the kitchen tap together and watch the pressure. Ask what the building does when the mains fails, because many Nairobi buildings have a tank and some do not. Ask when the tank was last cleaned.

Test the power. Find the meter and read it, and confirm the reading matches the bill you are shown. Ask whether the building is on a shared meter, which means you pay a marked-up rate set by the landlord. Check that sockets are earthed and that the earth leakage breaker trips when you press its test button. It takes ten seconds and it tells you whether the wiring is safe.

Check the phone signal in every room, and check the water heater, the door locks and the window latches. Small faults found on the day of viewing are the landlord's responsibility. Found a week later, they are an argument.

## The deposit and the agreement

A standard Kenyan tenancy runs on a written agreement, usually for one or two years, with a deposit of one to three months' rent. Get the agreement in writing and read the clauses on deposit refund, notice period and repairs. Understand who pays for what: a broken geyser is normally the landlord's cost, and a broken window latch is normally yours.

Pay through a bank or mobile money into an account in the landlord's or agency's name, and keep the receipt. Never pay cash to an individual with no receipt, however friendly the viewing was.

## Moving out

Photograph the whole flat on the day you move in and again on the day you leave, and email both sets to the landlord. Deposit disputes in Kenya almost always come down to condition, and the tenant with dated photographs wins. Give notice in writing, in the form the agreement requires, and keep proof you sent it.`,
  },
  {
    slug: 'energy-monitoring-finds-the-waste',
    title: 'Energy monitoring finds the waste your bill hides',
    date: '2026-06-11',
    category: 'Smart home tips',
    author: 'Brian Wekesa',
    style: 'contemporary',
    excerpt: 'Circuit-level monitoring on 200 homes found three appliances responsible for a quarter of the load. Almost nobody guessed which.',
    body: `A single meter tells you the total. Circuit-level monitoring tells you the cause.

## What we found across 200 homes

- **Immersion heaters** were the single largest controllable load in 61% of homes, usually running on a thermostat that had drifted.
- **Old fridges** accounted for 9% of total consumption in the sample, and were the cheapest thing to replace.
- **Pool pumps on fixed timers** ran through peak tariffs and often at night, which is the worst possible time without storage.
- **Standby load** — routers, decoders, chargers, the gate motor controller — added up to 6% and cost nothing to fix.

## The fix order

1. Move water heating to a timer or a solar diverter.
2. Replace any fridge older than twelve years.
3. Move the pool pump to a midday schedule if you have solar.
4. Put standby devices on a switched circuit.

## What it is worth

Households that acted on the first two items cut between 18% and 31% off the bill within one quarter, before any solar was installed.

## What the meter actually shows you

A whole-house meter gives you one number and very little else. The useful version measures circuits separately, so you can see the geyser apart from the fridge apart from the pump. That is what turns a bill into a diagnosis.

Watch the reading at night, when the house should be nearly idle. If you are drawing more than about 200 watts at 2am, something is running that should not be. In our monitored homes the usual culprits are a geyser on a failed timer, an old chest freezer with a failing seal, and a borehole pump cycling on a pressure fault.

## The three fixes that pay first

**Move water heating off the peak and onto a timer or a heat pump.** Water heating is often 30% to 40% of a Kenyan household's bill, and a geyser that reheats all night is pure waste. A timer costs a few thousand shillings and typically pays for itself in under two months.

**Replace the fridge or freezer if it is over twelve years old.** Compressor efficiency has improved sharply. An old freezer can draw three times what a modern one does for the same job, and it runs every hour of the year.

**Fix the pump cycling.** A pump that starts and stops repeatedly is either badly sized, losing pressure, or fighting a leak. Each start draws a surge. Fixing it usually saves more than the pump is worth in a year.

## Reading the graph over a month

Look for the shape, not the spikes. A house with a healthy pattern has a low overnight base and two clear peaks, morning and evening. A house with a problem has a base that never drops, which points to a continuous load you have forgotten about. Once you can name every load above 100 watts, you have taken control of the bill.

## What this means before solar

Every kilowatt-hour you stop wasting is a kilowatt-hour you do not need to buy panels to generate. Households that acted on the first two items cut between 18% and 31% off the bill within one quarter, before any solar was installed. Do the waste first, then size the array for what is left.`,
  },
];

module.exports = { LISTINGS, TESTIMONIALS, CASE_STUDIES, PRESS, TEAM, MILESTONES, FAQ_GROUPS, BLOG_POSTS, COUNTIES };
