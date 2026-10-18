# TRIXX Technologies

## Phase One: Corporate Foundation

This repository currently builds a dependency-free static corporate website with:

- Homepage and About Us.
- An overview and individual pages for the five TRIXX business divisions.
- Projects & Innovation, with no unverified project case studies.
- Francesc's leadership profile using an initials placeholder, not an invented portrait.
- Contact, privacy and terms pages that clearly identify services and details still pending.
- Responsive navigation, accessible keyboard behavior, SEO metadata, sitemap, robots file and hosting headers.

The site is intentionally English-only in this phase. Existing property portal, tenant, owner and admin source modules are not part of the published corporate site. No backend, administrator login, enquiry storage, email service or content management system is configured. The contact page does not accept or discard submissions.

## Run Locally

Requires Node.js 18 or later. There are no runtime dependencies.

```sh
npm run build
npm run serve
```

The development server listens on `http://localhost:12000` by default. Set `PORT` to choose another port. `npm run dev` rebuilds when source or assets change and serves the site. Run `node verify.js` after a build to check generated links, assets, accessibility scaffolding, metadata and sitemap entries.

## Content and Assets

Corporate page copy and division focus areas currently live in `src/pages/company.js`; the shared site identity is in `src/data/site.js`. Approved concept imagery is referenced in `src/lib/site-images.js`. Replace the initials avatar only when Francesc supplies an approved portrait. Replace concept images only with authentic, approved project imagery or clearly licensed alternatives, and retain accurate image descriptions.

Before launch, confirm the legal entity name, domain, company contact details, social links, Francesc's approved biography, and all published copy. Mission and vision are proposed editable draft copy pending approval. Privacy and terms pages are templates and require review against actual operations; they are not legal advice or a certification of compliance.

## Staged Launch Work

1. **Corporate foundation:** implemented as the current static page set.
2. **Brand content:** add the authentic logo, approved founder profile and portrait, verified contact details and actual project images.
3. **Enquiry handling and editing:** configure a secure server-side submission endpoint, spam protection, access-controlled enquiry inbox and transactional email provider. Add an authenticated CMS or owner-managed content workflow before accepting submissions. Do not add client-side credentials or present unconfigured forms as functional.
4. **Launch preparation:** test on real mobile devices, review SEO and privacy content, configure the production domain and deploy over HTTPS.
5. **Future expansion:** build dedicated product websites or applications only as divisions are ready.

## External Services Required Before Launch

- A verified production domain and hosting configuration.
- Secure enquiry storage and notification provider, if enquiries are to be collected online.
- Authenticated content management and media storage, if non-developers need to edit content.
- Approved company identity, legal/policy review, founder materials and project assets.