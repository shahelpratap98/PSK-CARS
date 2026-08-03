import { Link } from 'react-router-dom'
import { ArrowRight, Wrench, ShieldCheck, Sparkles } from 'lucide-react'
import Hero from '../components/Hero'
import Reveal from '../components/Reveal'
import Seo from '../components/Seo'
import CallToAction from '../components/CallToAction'
import { BUSINESS, SERVICES } from '../siteConfig'

const PROMISES = [
  {
    icon: Wrench,
    title: 'Everything under one roof',
    body: 'Panel, paint, compliance and blasting happen in the same workshop, so no one is waiting on another shop to finish first.',
  },
  {
    icon: Sparkles,
    title: 'Finished, not just repaired',
    body: 'Colour is matched to your car rather than the paint code, and the repair is blended so you cannot see where it starts.',
  },
  {
    icon: ShieldCheck,
    title: 'Told what it actually needs',
    body: 'If replacing a panel is better value than repairing it, we will say so before the work starts, not after.',
  },
]

export default function Home() {
  return (
    <>
      <Seo path="/" />
      <Hero />

      <section id="services" className="scroll-mt-24 px-4 py-20 sm:px-6 md:px-12 md:py-28">
        <div className="mx-auto max-w-7xl">
          <Reveal className="max-w-2xl">
            <p className="text-xs tracking-[0.2em] text-gray-500 uppercase">What we do</p>
            <h2
              className="mt-4 text-3xl font-normal sm:text-4xl md:text-5xl"
              style={{ letterSpacing: '-0.04em' }}
            >
              Four things, done properly.
            </h2>
            <p className="mt-5 text-base text-gray-400 md:text-lg">
              We are a {BUSINESS.suburb} workshop, open {BUSINESS.hoursLong}. Whether it is a scraped
              door or a shell that needs taking back to bare metal, it is the same team start to
              finish.
            </p>
          </Reveal>

          <div className="mt-14 grid gap-4 sm:grid-cols-2">
            {SERVICES.map((service, i) => (
              <Reveal key={service.slug} delay={i * 80}>
                <Link
                  to={`/services/${service.slug}`}
                  className="group flex h-full flex-col justify-between rounded-2xl border border-white/10 bg-white/[0.02] p-7 transition-colors duration-300 hover:border-white/25 hover:bg-white/[0.05] md:p-9"
                >
                  <div>
                    <span className="text-xs tracking-[0.2em] text-gray-500">{service.number}</span>
                    <h3
                      className="mt-4 text-2xl font-normal md:text-3xl"
                      style={{ letterSpacing: '-0.03em' }}
                    >
                      {service.title}
                    </h3>
                    <p className="mt-3 text-sm text-gray-400 md:text-base">{service.summary}</p>
                  </div>
                  <span className="mt-8 inline-flex items-center gap-2 text-sm text-gray-300 transition-colors group-hover:text-white">
                    Learn more
                    <ArrowRight
                      size={16}
                      className="transition-transform duration-300 group-hover:translate-x-1"
                    />
                  </span>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-white/10 px-4 py-20 sm:px-6 md:px-12 md:py-28">
        <div className="mx-auto max-w-7xl">
          <Reveal className="max-w-2xl">
            <p className="text-xs tracking-[0.2em] text-gray-500 uppercase">Why PSK</p>
            <h2
              className="mt-4 text-3xl font-normal sm:text-4xl md:text-5xl"
              style={{ letterSpacing: '-0.04em' }}
            >
              The repair should be the boring part.
            </h2>
          </Reveal>

          <div className="mt-14 grid gap-10 md:grid-cols-3">
            {PROMISES.map((promise, i) => {
              const Icon = promise.icon
              return (
                <Reveal key={promise.title} delay={i * 100}>
                  <Icon size={24} className="text-gray-300" />
                  <h3 className="mt-5 text-xl font-normal" style={{ letterSpacing: '-0.02em' }}>
                    {promise.title}
                  </h3>
                  <p className="mt-3 text-sm text-gray-400 md:text-base">{promise.body}</p>
                </Reveal>
              )
            })}
          </div>
        </div>
      </section>

      <CallToAction />
    </>
  )
}
