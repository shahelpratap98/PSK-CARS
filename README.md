# PSK Cars

Website for **PSK Cars** — an automotive workshop in Manukau, Auckland, specialising in paint work,
panel beating, compliance and sandblasting. Open Monday to Friday, 8am–5pm.

## Before this goes live

Placeholders in [`src/siteConfig.js`](src/siteConfig.js):

```js
export const BUSINESS_EMAIL = 'REPLACE_ME@example.co.nz'
export const WHATSAPP_NUMBER = '6400000000'
```

The WhatsApp number is international format with no `+`, spaces or leading zero — drop the leading
`0` and prefix `64`, so the NZ mobile `021 234 5678` becomes `64212345678`.

And in [`src/seo.js`](src/seo.js):

```js
export const SITE_URL = 'https://www.pskcars.co.nz'  // must be the real domain
export const STREET_ADDRESS = ''                     // for local search
export const POSTAL_CODE = ''
export const PHONE = ''
```

`SITE_URL` builds every canonical URL, the sitemap and the Open Graph tags, so a wrong value points
search engines and link previews at the wrong place. The address and phone fields are omitted from
the structured data while empty rather than guessed at, but local search rankings depend on a real
address that matches the Google Business Profile exactly.

## Stack

- React 19 + Vite 6, React Router 7
- Tailwind CSS 4 (via `@tailwindcss/vite`)
- `lucide-react` icons, Inter from Google Fonts
- Resend for contact form delivery, via a serverless function

## Getting started

```bash
npm install
npm run dev
```

`npm run build` runs three steps: the client build, an SSR build of `src/entry-server.jsx` into
`.ssr/` (outside `dist/` so it is never served), and `scripts/prerender.js`, which writes a real
static HTML file per route plus `sitemap.xml` and `robots.txt` into `dist/`.

`npm run optimise:poster` regenerates `public/s15-poster.jpg` from the full-resolution still in
`assets/`. Only needed if the source still changes.

Note that `npm run dev` serves the front end only — `/api/contact` does not exist locally, so the
form will show its error state. To exercise the form end to end, run `vercel dev` (with the
environment variables below set in `.env.local`) or test on a deployed preview.

## Pages

| Route | Page |
| --- | --- |
| `/` | Home — video hero, services grid, why-us, CTA |
| `/services` | All four services |
| `/services/:slug` | One service — `paint-work`, `panel-beating`, `compliance`, `sandblasting` |
| `/our-story` | About the workshop |
| `/contact` | Contact form and WhatsApp |

All page copy and the service content live in `src/siteConfig.js`. Adding a service there adds it to
the nav lists, the services index, the footer and its own detail page automatically.

## Contact form

The form posts JSON to `/api/contact` ([`api/contact.js`](api/contact.js)), which sends the enquiry
through Resend to the business inbox. It needs three environment variables — see
[`.env.example`](.env.example):

| Variable | What it is |
| --- | --- |
| `RESEND_API_KEY` | From <https://resend.com/api-keys> |
| `CONTACT_TO_EMAIL` | Where enquiries land |
| `CONTACT_FROM_EMAIL` | Sender address on a domain verified in Resend |

Set these in the Vercel project under **Settings → Environment Variables**. Until the domain is
verified in Resend you can send from `onboarding@resend.dev`, which only delivers to your own Resend
account email.

The endpoint has a honeypot field for bots and validates name, email and message server-side. The
client only shows "sent" on a genuine `{ ok: true }` JSON response — a host that answers `/api/`
with the SPA shell will correctly surface an error rather than silently swallowing an enquiry.

## SEO

The site is prerendered. Each route ships as real HTML with its own title, meta description,
canonical URL, Open Graph and Twitter tags and JSON-LD, all present before any JavaScript runs.
That matters here because Bing and every link-preview scraper (WhatsApp, Facebook, LinkedIn) do not
execute JavaScript, and this business gets shared over WhatsApp.

- **Route metadata and structured data** live in [`src/seo.js`](src/seo.js). `ROUTES` drives the
  titles, descriptions, sitemap and prerender list; `schemasFor(path)` decides a page's JSON-LD.
  Both the runtime `<Seo>` component and the build-time prerenderer read `schemasFor`, so static
  HTML and client-side navigation cannot disagree.
- **Structured data**: `AutoBodyShop` with opening hours, area served and a service catalogue on the
  home page; `Service` plus `FAQPage` plus `BreadcrumbList` on each service page; `BreadcrumbList`
  elsewhere. Fields with no real value (street address, phone, email) are omitted rather than
  invented, so nothing false ships. Validate at <https://validator.schema.org> after launch.
- **Adding a service** to `SERVICES` in `src/siteConfig.js` automatically gives it a page, a sitemap
  entry, prerendered HTML, breadcrumbs and FAQ structured data.

Not done, and worth doing once the site is live: create and verify the Google Business Profile (the
single biggest local ranking factor, and the reason the street address placeholder matters), submit
`sitemap.xml` in Google Search Console, and get consistent name/address/phone listings on NZ
directories. Keyword research was not performed — it needs real search volume data, which is not
available in this project.

## Deployment

Built for **Vercel**: `vercel.json` rewrites everything except `/api/*` to `index.html` so deep links
like `/services/compliance` resolve. Connect the GitHub repo, set the three environment variables,
and deploy — the `api/` folder becomes the serverless function automatically.

On Netlify the function would need moving to `netlify/functions/` and the rewrite expressing in
`netlify.toml`.

## Assets

`public/s15-hero.mp4` is the hero background video (10s, 2560×1440, silent, loops back to its first
frame). `public/s15-poster.png` is its first frame, used as the `<video poster>`.

## Notable implementation details

- **Hero legibility.** The copy sits in a left column and the video's `object-position` pushes the
  car to the right, so text and car do not overlap. `.hero-scrim` washes from the left on desktop
  and from the bottom on mobile, where the layout stacks.
- **`.liquid-glass`** is the glass pill treatment. Its thin glowing edge is a `::before` gradient
  masked with `mask-composite: exclude` so only the border shows.
- **`.animate-blur-fade-up`** is the entrance animation. Above the fold it runs on load with
  staggered `animationDelay`; further down the page `Reveal` holds elements in `.pre-reveal` until an
  IntersectionObserver brings them into view.
- Reduced-motion users skip the animations and smooth scrolling entirely.

## Still to do

The Search and account buttons from the original hero concept were dropped — the nav is now Home,
Services, Our story, Contact plus WhatsApp and a quote CTA. Service page copy is written from the
four service descriptions and should be checked by the owner for accuracy before launch, especially
the compliance claims.
