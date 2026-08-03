// Turns the client-side SPA into a set of real static HTML pages.
//
// Without this, every route ships the same empty <div id="root"> with a generic
// title, and the per-page title, description, canonical and JSON-LD only appear
// after React runs. Google can usually wait for that; Bing, WhatsApp, Facebook
// and other link-preview scrapers cannot. Since customers share this business
// over WhatsApp, that matters.
import { fileURLToPath, pathToFileURL } from 'node:url'
import { dirname, join } from 'node:path'
import { mkdir, readFile, writeFile } from 'node:fs/promises'

const root = join(dirname(fileURLToPath(import.meta.url)), '..')
const dist = join(root, 'dist')

// The server bundle is built outside dist/ so it never ships to the CDN.
// On Windows a bare absolute path is not a valid ESM specifier.
const { render, ROUTES, SITE_URL } = await import(
  pathToFileURL(join(root, '.ssr', 'entry-server.js')).href
)

const template = await readFile(join(dist, 'index.html'), 'utf8')
const today = new Date().toISOString().slice(0, 10)

for (const route of ROUTES) {
  const { html, head } = render(route.path)

  const page = template
    .replace('<!--app-head-->', head)
    .replace('<div id="root"></div>', `<div id="root">${html}</div>`)

  const outDir = route.path === '/' ? dist : join(dist, route.path)
  await mkdir(outDir, { recursive: true })
  await writeFile(join(outDir, 'index.html'), page, 'utf8')
  console.log(`prerendered ${route.path}`)
}

const urls = ROUTES.map(
  (route) =>
    `  <url>\n    <loc>${SITE_URL}${route.path === '/' ? '/' : route.path}</loc>\n    <lastmod>${today}</lastmod>\n    <priority>${route.priority}</priority>\n  </url>`,
).join('\n')

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>
`

await writeFile(join(dist, 'sitemap.xml'), sitemap, 'utf8')

const robots = `User-agent: *
Allow: /

Sitemap: ${SITE_URL}/sitemap.xml
`
await writeFile(join(dist, 'robots.txt'), robots, 'utf8')

console.log(`wrote sitemap.xml (${ROUTES.length} urls) and robots.txt`)
