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
export const SITE_URL = 'https://pskcars.vercel.app'  // interim Vercel URL
export const STREET_ADDRESS = ''                      // for local search
export const POSTAL_CODE = ''
export const PHONE = ''
```

`SITE_URL` is currently the Vercel deployment URL. It builds every canonical URL, the sitemap and
the Open Graph tags, so **update it the day the custom domain is connected** — otherwise every page
keeps declaring the `.vercel.app` address as canonical and the real domain never accumulates its own
search authority.

The address and phone fields are omitted from the structured data while empty rather than guessed
at, but local search rankings depend on a real address that matches the Google Business Profile
exactly.

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

`npm run optimise:poster` and `npm run encode:video` regenerate the hero assets from the originals
in `assets/`. Neither runs during a normal build — only re-run them if a source asset changes.

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

Built for **Vercel**. Connect the GitHub repo and it detects Vite automatically: build command
`npm run build`, output directory `dist`. The `api/` folder becomes a serverless function with no
extra configuration.

Set the three Resend environment variables in **Settings → Environment Variables** before the first
deploy, or the contact form will return its "not configured" error.

There is deliberately **no SPA rewrite**. Every route is prerendered to a real file, so
`/services/compliance` resolves from `dist/services/compliance/index.html` directly. A catch-all
rewrite to `index.html` would return the home page with HTTP 200 for mistyped URLs, which Google
treats as a soft 404. Instead `dist/404.html` is prerendered and Vercel serves it with a genuine 404
status. `cleanUrls` gives the extensionless paths.

If you ever move off prerendering, that rewrite has to come back or deep links will 404.

On Netlify the function would need moving to `netlify/functions/` and the headers expressing in
`netlify.toml`.

## Assets

The originals live in `assets/` and are never served. `public/` holds only the encoded derivatives.

| Served file | What it is |
| --- | --- |
| `s15-hero.mp4` | Desktop, 1920×1080, silent, loops to its first frame |
| `s15-hero-mobile.mp4` | Phones, 720×1558 portrait, the front-of-car crop baked in |
| `s15-poster.jpg` | Desktop first frame |
| `s15-poster-mobile.jpg` | Cropped to match the portrait video |

The Higgsfield render was 2560×1440 at ~1.65 Mbps, which is around five times under the bitrate that
resolution needs: expensive to decode and visibly full of compression artifacts. It also carried an
AAC track the muted hero never plays. Both encodes drop the audio, and the mobile file bakes in the
crop the CSS used to reach with `scale(1.4)`, so phones no longer decode a 16:9 frame and discard
most of it.

If you replace the source video, keep it at `assets/s15-hero-source.mp4` and re-run
`npm run encode:video`. The crop rectangle in `scripts/encode-video.js` is tuned to this specific
framing and will need adjusting for a different shot.

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
