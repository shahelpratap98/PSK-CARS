import { useEffect } from 'react'
import { canonical, routeMeta, schemasFor } from '../seo'

const upsertMeta = (selector, attrs) => {
  let tag = document.head.querySelector(selector)
  if (!tag) {
    tag = document.createElement('meta')
    document.head.appendChild(tag)
  }
  Object.entries(attrs).forEach(([key, value]) => tag.setAttribute(key, value))
}

/**
 * Keeps head tags in step with the current route on client-side navigation.
 * The prerender step writes the same tags into each page's static HTML, so
 * crawlers and link previews see them without running any JavaScript.
 */
export default function Seo({ path }) {
  const meta = routeMeta(path)
  const title = meta?.title
  const description = meta?.description
  const url = canonical(path)
  const schemaJson = JSON.stringify(schemasFor(path))

  useEffect(() => {
    if (title) document.title = title

    if (description) {
      upsertMeta('meta[name="description"]', { name: 'description', content: description })
      upsertMeta('meta[property="og:description"]', {
        property: 'og:description',
        content: description,
      })
    }

    if (title) {
      upsertMeta('meta[property="og:title"]', { property: 'og:title', content: title })
    }

    upsertMeta('meta[property="og:url"]', { property: 'og:url', content: url })

    let link = document.head.querySelector('link[rel="canonical"]')
    if (!link) {
      link = document.createElement('link')
      link.setAttribute('rel', 'canonical')
      document.head.appendChild(link)
    }
    link.setAttribute('href', url)
  }, [title, description, url])

  useEffect(() => {
    const parsed = JSON.parse(schemaJson)
    document.head.querySelectorAll('script[data-route-schema]').forEach((node) => node.remove())

    parsed.forEach((schema) => {
      const script = document.createElement('script')
      script.type = 'application/ld+json'
      script.setAttribute('data-route-schema', '')
      script.textContent = JSON.stringify(schema)
      document.head.appendChild(script)
    })
  }, [schemaJson])

  return null
}
