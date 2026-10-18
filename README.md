# TRIXX Technologies

## TRIXX Architectural Showcase

This repository builds a dependency-free static architectural showcase with:

- Immersive heritage-led homepage, About, all five division pages and leadership.
- Searchable house-concept collection, detail sheets, conceptual floor plans and proposed smart-home tiers.
- Smart Living, Sustainability, project brief builder, partner application, product waitlist, contact form and project/journal page.
- Netlify Forms markup with a honeypot for partner, waitlist and contact submissions. Local preview explicitly prevents submission; on Netlify, submissions are stored in the site dashboard. Email notifications require configuration in Netlify.
- Responsive navigation, accessible keyboard behavior, reduced-motion-aware section reveals and shared-image view transitions, SEO metadata, sitemap, robots file and hosting headers.

The site is intentionally English-only. Existing property portal, tenant, owner and admin source modules are not part of this public showcase. There is no custom backend, administrator login or content management system. All house images and plans remain clearly labelled concepts; project-specific performance and construction details are not claimed.

## Run Locally

Requires Node.js 18 or later. There are no runtime dependencies.

```sh
npm run build
npm run serve
```

The development server listens on `http://localhost:12000` by default. Set `PORT` to choose another port. `npm run dev` rebuilds when source or assets change and serves the site. Run `node verify.js` after a build to check generated links, assets, accessibility scaffolding, metadata and sitemap entries.

## Content and Assets

Corporate page copy and division focus areas currently live in `src/pages/company.js`; the shared site identity is in `src/data/site.js`. Approved concept imagery is referenced in `src/lib/site-images.js`. Replace the initials avatar only when Francesc supplies an approved portrait. Replace concept images only with authentic, approved project imagery or clearly licensed alternatives, and retain accurate image descriptions.

Before launch, confirm the legal entity name, domain, company contact details, social links, Francesc's approved biography, and all published copy. Mission and vision are proposed editable draft copy pending approval. Privacy and terms pages are templates and require review against actual operations; they are not legal advice or a certification of compliance. A phone/WhatsApp number is intentionally omitted until verified.

## Staged Launch Work

1. **Corporate foundation:** implemented as the current static page set.
2. **Brand content:** add the authentic logo, approved founder profile and portrait, verified contact details and actual project images.
3. **Enquiry handling and editing:** enable Netlify Forms on the production site, test honeypot/spam filtering, restrict dashboard access, and configure email notification recipients. Add an authenticated CMS or owner-managed content workflow if non-developer editing is needed.
4. **Launch preparation:** test on real mobile devices, review SEO and privacy content, configure the production domain and deploy over HTTPS. Verify a Google Business Profile with authorized owner access and accurate address/service-area details. Select and configure analytics only after reviewing privacy and consent requirements.
5. **Future expansion:** build dedicated product websites or applications only as divisions are ready.

## External Services Required Before Launch

- A verified production domain and hosting configuration.
- Netlify Forms activation and notification recipients for form submissions.
- Authorized access for Google Business Profile verification and analytics configuration, if wanted.
- Authenticated content management and media storage, if non-developers need to edit content.
- Approved company identity, legal/policy review, founder materials and project assets.