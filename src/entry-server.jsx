import { renderToString } from 'react-dom/server'
import { StaticRouter } from 'react-router'
import { AppShell } from './App'
import { ROUTES, canonical, routeMeta, schemasFor, OG_IMAGE, SITE_URL } from './seo'

export { ROUTES, SITE_URL }

const escapeAttr = (value = '') =>
  String(value).replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;')

/** JSON-LD must not contain a literal </script>. */
const safeJson = (value) => JSON.stringify(value).replace(/</g, '\\u003c')

export function renderHead(path) {
  const meta = routeMeta(path)
  if (!meta) return ''

  const url = canonical(path)
  const tags = [
    `<title>${escapeAttr(meta.title)}</title>`,
    `<meta name="description" content="${escapeAttr(meta.description)}" />`,
    `<link rel="canonical" href="${url}" />`,
    `<meta property="og:type" content="website" />`,
    `<meta property="og:site_name" content="PSK Cars" />`,
    `<meta property="og:locale" content="en_NZ" />`,
    `<meta property="og:title" content="${escapeAttr(meta.title)}" />`,
    `<meta property="og:description" content="${escapeAttr(meta.description)}" />`,
    `<meta property="og:url" content="${url}" />`,
    `<meta property="og:image" content="${OG_IMAGE}" />`,
    `<meta name="twitter:card" content="summary_large_image" />`,
    `<meta name="twitter:title" content="${escapeAttr(meta.title)}" />`,
    `<meta name="twitter:description" content="${escapeAttr(meta.description)}" />`,
    `<meta name="twitter:image" content="${OG_IMAGE}" />`,
  ]

  // Tagged so the client <Seo> can replace these on navigation instead of
  // appending a second, duplicate set alongside them.
  schemasFor(path).forEach((schema) => {
    tags.push(
      `<script type="application/ld+json" data-route-schema>${safeJson(schema)}</script>`,
    )
  })

  return tags.join('\n    ')
}

export function render(path) {
  return {
    html: renderToString(
      <StaticRouter location={path}>
        <AppShell />
      </StaticRouter>,
    ),
    head: renderHead(path),
  }
}
