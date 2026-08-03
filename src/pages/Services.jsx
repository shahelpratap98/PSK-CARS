import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import PageHeader from '../components/PageHeader'
import Reveal from '../components/Reveal'
import Seo from '../components/Seo'
import CallToAction from '../components/CallToAction'
import { BUSINESS, SERVICES } from '../siteConfig'

export default function Services() {
  return (
    <>
      <Seo path="/services" />
      <PageHeader
        eyebrow="Services"
        title="Paint, panel, compliance and blasting."
        intro={`Everything happens in the one ${BUSINESS.suburb} workshop, which is the whole point — nothing sits waiting for another shop to finish before it can move.`}
      />

      <section className="px-4 py-16 sm:px-6 md:px-12 md:py-24">
        <div className="mx-auto max-w-7xl divide-y divide-white/10">
          {SERVICES.map((service, i) => (
            <Reveal key={service.slug} delay={i * 60}>
              <Link
                to={`/services/${service.slug}`}
                className="group grid gap-6 py-10 transition-opacity md:grid-cols-12 md:gap-10 md:py-14"
              >
                <div className="md:col-span-1">
                  <span className="text-xs tracking-[0.2em] text-gray-500">{service.number}</span>
                </div>
                <div className="md:col-span-5">
                  <h2
                    className="text-2xl font-normal transition-colors group-hover:text-white md:text-4xl"
                    style={{ letterSpacing: '-0.03em' }}
                  >
                    {service.title}
                  </h2>
                  <p className="mt-3 text-sm text-gray-400 md:text-base">{service.tagline}</p>
                </div>
                <div className="md:col-span-6">
                  <p className="text-sm text-gray-400 md:text-base">{service.summary}</p>
                  <span className="mt-6 inline-flex items-center gap-2 text-sm text-gray-300 transition-colors group-hover:text-white">
                    Read more about {service.title.toLowerCase()}
                    <ArrowRight
                      size={16}
                      className="transition-transform duration-300 group-hover:translate-x-1"
                    />
                  </span>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </section>

      <CallToAction />
    </>
  )
}
