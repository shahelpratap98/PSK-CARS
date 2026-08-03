import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import PageHeader from '../components/PageHeader'
import Reveal from '../components/Reveal'
import { NAV_LINKS, SERVICES } from '../siteConfig'

export default function NotFound() {
  return (
    <>
      <PageHeader
        eyebrow="404"
        title="That page has moved on."
        intro="The link you followed does not point anywhere on this site. Everything we do is one of the four below."
      />

      <section className="px-4 py-16 sm:px-6 md:px-12 md:py-24">
        <div className="mx-auto max-w-7xl">
          <Reveal immediate>
            <div className="grid gap-4 sm:grid-cols-2">
              {SERVICES.map((service) => (
                <Link
                  key={service.slug}
                  to={`/services/${service.slug}`}
                  className="group flex items-center justify-between rounded-2xl border border-white/10 bg-white/[0.02] p-7 transition-colors duration-300 hover:border-white/25 hover:bg-white/[0.05]"
                >
                  <span className="text-xl" style={{ letterSpacing: '-0.02em' }}>
                    {service.title}
                  </span>
                  <ArrowRight
                    size={18}
                    className="text-gray-400 transition-transform duration-300 group-hover:translate-x-1 group-hover:text-white"
                  />
                </Link>
              ))}
            </div>

            <nav className="mt-12 flex flex-wrap gap-x-8 gap-y-3 border-t border-white/10 pt-8 text-sm">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  className="text-gray-400 transition-colors hover:text-white"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </Reveal>
        </div>
      </section>
    </>
  )
}
