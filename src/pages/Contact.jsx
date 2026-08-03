import { useState } from 'react'
import { MessageCircle, Mail, MapPin, Clock, Loader2, Check, AlertCircle } from 'lucide-react'
import PageHeader from '../components/PageHeader'
import Reveal from '../components/Reveal'
import Seo from '../components/Seo'
import { BUSINESS, BUSINESS_EMAIL, SERVICES, whatsappLink } from '../siteConfig'

const FIELD =
  'w-full rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 text-sm text-white placeholder-gray-500 transition-colors outline-none focus:border-white/40 focus:bg-white/[0.06]'

export default function Contact() {
  const [status, setStatus] = useState('idle') // idle | sending | sent | error
  const [error, setError] = useState('')

  const onSubmit = async (event) => {
    event.preventDefault()
    const form = event.currentTarget
    const data = Object.fromEntries(new FormData(form))

    // Bots fill every field they find; humans never see this one.
    if (data.website) return

    setStatus('sending')
    setError('')

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })

      // A misconfigured host can answer /api/contact with the SPA's index.html
      // and a 200. Only a real JSON acknowledgement counts as sent, otherwise a
      // dropped enquiry would look to the customer like a delivered one.
      const body = await response.json().catch(() => null)

      if (!response.ok || !body?.ok) {
        throw new Error(
          body?.error || 'We could not send that just now. Please try again, or email us directly.',
        )
      }

      form.reset()
      setStatus('sent')
    } catch (err) {
      setError(err.message)
      setStatus('error')
    }
  }

  return (
    <>
      <Seo path="/contact" />
      <PageHeader
        eyebrow="Contact"
        title="Tell us what happened to it."
        intro="Send through the details and a couple of photos if you have them, or message the owner directly on WhatsApp — whichever is easier."
      />

      <section className="px-4 py-16 sm:px-6 md:px-12 md:py-24">
        <div className="mx-auto grid max-w-7xl gap-12 md:grid-cols-12 md:gap-16">
          <Reveal className="md:col-span-7">
            <h2 className="text-2xl font-normal md:text-3xl" style={{ letterSpacing: '-0.03em' }}>
              Send us a message
            </h2>
            <p className="mt-3 text-sm text-gray-400">
              This goes straight to the workshop inbox. We usually reply the same working day.
            </p>

            <form onSubmit={onSubmit} className="mt-8 space-y-4">
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label htmlFor="name" className="mb-2 block text-sm text-gray-400">
                    Your name
                  </label>
                  <input id="name" name="name" required className={FIELD} placeholder="Jane Smith" />
                </div>
                <div>
                  <label htmlFor="phone" className="mb-2 block text-sm text-gray-400">
                    Phone
                  </label>
                  <input
                    id="phone"
                    name="phone"
                    type="tel"
                    className={FIELD}
                    placeholder="021 234 5678"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="email" className="mb-2 block text-sm text-gray-400">
                  Email
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  className={FIELD}
                  placeholder="you@example.co.nz"
                />
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label htmlFor="vehicle" className="mb-2 block text-sm text-gray-400">
                    Vehicle
                  </label>
                  <input
                    id="vehicle"
                    name="vehicle"
                    className={FIELD}
                    placeholder="2004 Nissan Silvia"
                  />
                </div>
                <div>
                  <label htmlFor="service" className="mb-2 block text-sm text-gray-400">
                    What do you need?
                  </label>
                  <select id="service" name="service" defaultValue="" className={FIELD}>
                    <option value="" className="bg-gray-900">
                      Not sure yet
                    </option>
                    {SERVICES.map((service) => (
                      <option key={service.slug} value={service.title} className="bg-gray-900">
                        {service.title}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label htmlFor="message" className="mb-2 block text-sm text-gray-400">
                  What happened?
                </label>
                <textarea
                  id="message"
                  name="message"
                  required
                  rows={5}
                  className={FIELD}
                  placeholder="Reversed into a pole — rear quarter is dented and the paint has come off."
                />
              </div>

              <input
                type="text"
                name="website"
                tabIndex={-1}
                autoComplete="off"
                aria-hidden="true"
                className="absolute left-[-9999px] h-0 w-0 opacity-0"
              />

              <div className="flex flex-wrap items-center gap-4 pt-2">
                <button
                  type="submit"
                  disabled={status === 'sending'}
                  className="flex items-center gap-2 rounded-full bg-white px-7 py-3 font-medium text-black transition-colors hover:bg-gray-200 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {status === 'sending' ? (
                    <>
                      <Loader2 size={18} className="animate-spin" />
                      <span>Sending…</span>
                    </>
                  ) : (
                    <span>Send message</span>
                  )}
                </button>

                {status === 'sent' && (
                  <p className="flex items-center gap-2 text-sm text-green-400">
                    <Check size={16} />
                    Thanks — we have got it and will be in touch.
                  </p>
                )}
                {status === 'error' && (
                  <p className="flex items-center gap-2 text-sm text-red-400">
                    <AlertCircle size={16} />
                    {error}
                  </p>
                )}
              </div>

              {status === 'error' && (
                <p className="text-sm text-gray-500">
                  You can also email us directly at{' '}
                  <a href={`mailto:${BUSINESS_EMAIL}`} className="text-gray-300 underline">
                    {BUSINESS_EMAIL}
                  </a>
                  .
                </p>
              )}
            </form>
          </Reveal>

          <Reveal className="md:col-span-5" delay={120}>
            <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-7 md:p-9">
              <h2 className="text-2xl font-normal md:text-3xl" style={{ letterSpacing: '-0.03em' }}>
                Rather just message?
              </h2>
              <p className="mt-3 text-sm text-gray-400">
                WhatsApp the owner directly. Photos of the damage help more than anything else you
                could write.
              </p>
              <a
                href={whatsappLink()}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-7 flex w-full items-center justify-center gap-2 rounded-full bg-[#25D366] px-6 py-3 font-medium text-black transition-opacity hover:opacity-90"
              >
                <MessageCircle size={18} />
                <span>Message us on WhatsApp</span>
              </a>

              <dl className="mt-9 space-y-5 border-t border-white/10 pt-7 text-sm">
                <div className="flex items-start gap-3">
                  <Mail size={16} className="mt-0.5 shrink-0 text-gray-500" />
                  <div>
                    <dt className="text-gray-500">Email</dt>
                    <dd className="mt-1">
                      <a href={`mailto:${BUSINESS_EMAIL}`} className="break-all hover:underline">
                        {BUSINESS_EMAIL}
                      </a>
                    </dd>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <MapPin size={16} className="mt-0.5 shrink-0 text-gray-500" />
                  <div>
                    <dt className="text-gray-500">Workshop</dt>
                    <dd className="mt-1">
                      {BUSINESS.suburb}, {BUSINESS.city}
                    </dd>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Clock size={16} className="mt-0.5 shrink-0 text-gray-500" />
                  <div>
                    <dt className="text-gray-500">Open</dt>
                    <dd className="mt-1">{BUSINESS.hoursLong}</dd>
                  </div>
                </div>
              </dl>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  )
}
