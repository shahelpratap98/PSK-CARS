import { BUSINESS, BUSINESS_EMAIL, SERVICES, WHATSAPP_NUMBER } from './siteConfig'

// ---------------------------------------------------------------------------
// The Vercel deployment URL, used until the custom domain is live. This builds
// every canonical URL, the sitemap and the Open Graph tags, so update it the
// day the real domain is connected — otherwise canonicals keep pointing here
// and the custom domain will not accumulate its own search authority.
// ---------------------------------------------------------------------------
export const SITE_URL = 'https://pskcars.vercel.app'

// TODO: add the workshop's street address. Google's local pack leans heavily on
// a consistent name/address/phone across the site, the Google Business Profile
// and directory listings. Left empty it is simply omitted from the structured
// data rather than guessed at.
export const STREET_ADDRESS = ''
export const POSTAL_CODE = ''
export const PHONE = ''

export const OG_IMAGE = `${SITE_URL}/s15-poster.jpg`

// Root keeps its trailing slash so the canonical matches the sitemap entry.
export const canonical = (path) => `${SITE_URL}${path === '/' ? '/' : path}`

const SERVICE_LIST = SERVICES.map((s) => s.title).join(', ')

/** Every indexable route, used for meta, the sitemap and prerendering. */
export const ROUTES = [
  {
    path: '/',
    priority: '1.0',
    title: `${BUSINESS.name} | Panel Beating & Paint, ${BUSINESS.suburb} Auckland`,
    description: `Panel beating, paint work, compliance and sandblasting in ${BUSINESS.suburb}, ${BUSINESS.city}. Colour-matched repairs finished in house. Open ${BUSINESS.hoursLong}.`,
  },
  {
    path: '/services',
    priority: '0.9',
    title: `Panel & Paint Services in ${BUSINESS.suburb} | ${BUSINESS.name}`,
    description: `${SERVICE_LIST} in ${BUSINESS.suburb}, ${BUSINESS.city}. One team handles the repair, the finish and the certification.`,
  },
  ...SERVICES.map((service) => ({
    path: `/services/${service.slug}`,
    priority: '0.8',
    title: `${service.title} in ${BUSINESS.suburb}, Auckland | ${BUSINESS.name}`,
    description: service.summary,
  })),
  {
    path: '/our-story',
    priority: '0.6',
    title: `About ${BUSINESS.name} | ${BUSINESS.suburb} Panel & Paint Workshop`,
    description: `${BUSINESS.name} is a ${BUSINESS.suburb} panel and paint workshop handling repair, finish and certification under one roof. Open ${BUSINESS.hoursLong}.`,
  },
  {
    path: '/contact',
    priority: '0.9',
    title: `Contact ${BUSINESS.name} | ${BUSINESS.suburb}, Auckland`,
    description: `Get a quote from ${BUSINESS.name} in ${BUSINESS.suburb}. Send through your repair details or message the workshop directly on WhatsApp. Open ${BUSINESS.hoursLong}.`,
  },
]

export const routeMeta = (path) => ROUTES.find((r) => r.path === path)

/** Only include contact fields that have actually been filled in. */
const filled = (object) =>
  Object.fromEntries(Object.entries(object).filter(([, value]) => value !== '' && value != null))

const localBusinessSchema = () =>
  filled({
    '@context': 'https://schema.org',
    '@type': 'AutoBodyShop',
    '@id': `${SITE_URL}/#business`,
    name: BUSINESS.name,
    url: SITE_URL,
    image: OG_IMAGE,
    description: `Panel beating, paint work, compliance and sandblasting workshop in ${BUSINESS.suburb}, ${BUSINESS.city}.`,
    email: BUSINESS_EMAIL.startsWith('REPLACE_ME') ? '' : BUSINESS_EMAIL,
    telephone: PHONE,
    address: filled({
      '@type': 'PostalAddress',
      streetAddress: STREET_ADDRESS,
      addressLocality: BUSINESS.suburb,
      addressRegion: BUSINESS.city,
      postalCode: POSTAL_CODE,
      addressCountry: 'NZ',
    }),
    areaServed: [
      { '@type': 'City', name: 'Auckland' },
      { '@type': 'AdministrativeArea', name: 'South Auckland' },
      { '@type': 'AdministrativeArea', name: 'Manukau' },
    ],
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
        opens: '08:00',
        closes: '17:00',
      },
    ],
    sameAs: WHATSAPP_NUMBER.startsWith('64000') ? [] : [`https://wa.me/${WHATSAPP_NUMBER}`],
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Panel and paint services',
      itemListElement: SERVICES.map((service) => ({
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: service.title,
          description: service.summary,
          url: canonical(`/services/${service.slug}`),
        },
      })),
    },
  })

const serviceSchema = (service) => ({
  '@context': 'https://schema.org',
  '@type': 'Service',
  name: service.title,
  description: service.summary,
  url: canonical(`/services/${service.slug}`),
  serviceType: service.title,
  provider: { '@id': `${SITE_URL}/#business` },
  areaServed: { '@type': 'City', name: 'Auckland' },
})

const faqSchema = (faq) => ({
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: faq.map((item) => ({
    '@type': 'Question',
    name: item.q,
    acceptedAnswer: { '@type': 'Answer', text: item.a },
  })),
})

const breadcrumbSchema = (trail) => ({
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: trail.map((crumb, i) => ({
    '@type': 'ListItem',
    position: i + 1,
    name: crumb.name,
    item: canonical(crumb.path),
  })),
})

/**
 * The JSON-LD a given route should carry. Both the runtime <Seo> component and
 * the build-time prerenderer read this, so the static HTML and the client-side
 * navigation can never disagree about a page's structured data.
 */
export const schemasFor = (path) => {
  if (path === '/') return [localBusinessSchema()]

  if (path === '/services') {
    return [
      breadcrumbSchema([
        { name: 'Home', path: '/' },
        { name: 'Services', path: '/services' },
      ]),
    ]
  }

  if (path.startsWith('/services/')) {
    const service = SERVICES.find((s) => `/services/${s.slug}` === path)
    if (!service) return []
    return [
      serviceSchema(service),
      faqSchema(service.faq),
      breadcrumbSchema([
        { name: 'Home', path: '/' },
        { name: 'Services', path: '/services' },
        { name: service.title, path },
      ]),
    ]
  }

  const meta = routeMeta(path)
  if (!meta) return []

  return [
    breadcrumbSchema([
      { name: 'Home', path: '/' },
      { name: path === '/our-story' ? 'Our story' : 'Contact', path },
    ]),
  ]
}
