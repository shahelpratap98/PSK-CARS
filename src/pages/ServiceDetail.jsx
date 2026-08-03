import { Link, Navigate, useParams } from 'react-router-dom'
import { ArrowLeft, ArrowRight } from 'lucide-react'
import PageHeader from '../components/PageHeader'
import Reveal from '../components/Reveal'
import Seo from '../components/Seo'
import CallToAction from '../components/CallToAction'
import { SERVICES, getService } from '../siteConfig'

export default function ServiceDetail() {
  const { slug } = useParams()
  const service = getService(slug)

  if (!service) return <Navigate to="/services" replace />

  const index = SERVICES.findIndex((s) => s.slug === slug)
  const next = SERVICES[(index + 1) % SERVICES.length]

  return (
    <>
      <Seo path={`/services/${service.slug}`} />
      <PageHeader
        eyebrow={`Services — ${service.number}`}
        title={service.title}
        intro={service.tagline}
      />

      <section className="px-4 py-16 sm:px-6 md:px-12 md:py-24">
        <div className="mx-auto max-w-7xl">
          <Reveal className="max-w-3xl">
            <p className="text-lg text-gray-300 md:text-xl" style={{ letterSpacing: '-0.01em' }}>
              {service.intro}
            </p>
          </Reveal>

          <div className="mt-16 grid gap-x-10 gap-y-12 md:grid-cols-2 md:mt-20">
            {service.points.map((point, i) => (
              <Reveal key={point.heading} delay={i * 80}>
                <div className="border-t border-white/10 pt-6">
                  <h2 className="text-xl font-normal md:text-2xl" style={{ letterSpacing: '-0.02em' }}>
                    {point.heading}
                  </h2>
                  <p className="mt-3 text-sm text-gray-400 md:text-base">{point.body}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-white/10 px-4 py-16 sm:px-6 md:px-12 md:py-24">
        <div className="mx-auto grid max-w-7xl gap-10 md:grid-cols-3">
          <Reveal>
            <h2
              className="text-2xl font-normal md:text-3xl"
              style={{ letterSpacing: '-0.03em' }}
            >
              Common questions
            </h2>
          </Reveal>
          <div className="md:col-span-2">
            <dl className="divide-y divide-white/10">
              {service.faq.map((item, i) => (
                <Reveal key={item.q} delay={i * 80}>
                  <div className="py-6 first:pt-0">
                    <dt className="text-base font-medium md:text-lg">{item.q}</dt>
                    <dd className="mt-2 text-sm text-gray-400 md:text-base">{item.a}</dd>
                  </div>
                </Reveal>
              ))}
            </dl>
          </div>
        </div>
      </section>

      <section className="border-t border-white/10 px-4 py-10 sm:px-6 md:px-12">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-4">
          <Link
            to="/services"
            className="inline-flex items-center gap-2 text-sm text-gray-400 transition-colors hover:text-white"
          >
            <ArrowLeft size={16} />
            All services
          </Link>
          <Link
            to={`/services/${next.slug}`}
            className="group inline-flex items-center gap-2 text-sm text-gray-400 transition-colors hover:text-white"
          >
            Next: {next.title}
            <ArrowRight
              size={16}
              className="transition-transform duration-300 group-hover:translate-x-1"
            />
          </Link>
        </div>
      </section>

      <CallToAction
        heading={`Need ${service.title.toLowerCase()} done?`}
        body="Send through photos and a short description and we will come back to you with what is involved."
      />
    </>
  )
}
