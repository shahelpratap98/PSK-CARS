import PageHeader from '../components/PageHeader'
import Reveal from '../components/Reveal'
import Seo from '../components/Seo'
import CallToAction from '../components/CallToAction'
import { BUSINESS } from '../siteConfig'

const VALUES = [
  {
    title: 'We would rather tell you no',
    body: 'If a repair is not worth doing, or a vehicle is going to be a fight to certify, we say so before you commit. A job we talk you out of costs us less than one we should never have taken.',
  },
  {
    title: 'The finish is the job',
    body: 'Straight metal and matched paint are not two separate achievements. A repair is finished when you cannot tell where it starts, and not before.',
  },
  {
    title: 'One workshop, one team',
    body: 'Panel, paint, compliance and blasting all happen here. Nothing gets handed between shops, so nothing gets lost in the handover.',
  },
]

export default function OurStory() {
  return (
    <>
      <Seo path="/our-story" />
      <PageHeader
        eyebrow="Our story"
        title="A South Auckland workshop that finishes what it starts."
        intro={`PSK Cars is a ${BUSINESS.suburb} panel and paint workshop. We handle the repair, the finish and the certification, and we are open ${BUSINESS.hoursLong}.`}
      />

      <section className="px-4 py-16 sm:px-6 md:px-12 md:py-24">
        <div className="mx-auto grid max-w-7xl gap-12 md:grid-cols-12">
          <Reveal className="md:col-span-7">
            <div className="space-y-6 text-base text-gray-300 md:text-lg">
              <p>
                Most people who walk into a panel shop are not having a good week. Something has been
                hit, scraped or failed a check, and what they want to know is simple — can it be
                fixed properly, how long will it take, and what is it going to cost.
              </p>
              <p>
                We built PSK Cars around answering those three questions honestly. That means looking
                at the car before quoting, telling you when replacing a panel beats repairing it, and
                being straight about timing rather than promising Friday and meaning the following
                Wednesday.
              </p>
              <p>
                It also means keeping the work in one place. Paint, panel beating, compliance and
                sandblasting all happen in our {BUSINESS.suburb} workshop, so a car does not sit
                waiting for a slot at another shop before the next stage can start. When something
                needs rectifying for certification, we do that here too.
              </p>
              <p>
                We are a workshop, not a call centre. If you want to know how your car is going, you
                can ring us, or message us on WhatsApp and get an answer from the people actually
                doing the work.
              </p>
            </div>
          </Reveal>

          <Reveal className="md:col-span-5" delay={120}>
            <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-7 md:p-9">
              <p className="text-xs tracking-[0.2em] text-gray-500 uppercase">The workshop</p>
              <dl className="mt-6 space-y-5 text-sm">
                <div>
                  <dt className="text-gray-500">Where</dt>
                  <dd className="mt-1 text-base">
                    {BUSINESS.suburb}, {BUSINESS.city}
                  </dd>
                </div>
                <div>
                  <dt className="text-gray-500">Open</dt>
                  <dd className="mt-1 text-base">{BUSINESS.hoursLong}</dd>
                </div>
                <div>
                  <dt className="text-gray-500">What we handle</dt>
                  <dd className="mt-1 text-base">
                    Paint work, panel beating, compliance, sandblasting
                  </dd>
                </div>
              </dl>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="border-t border-white/10 px-4 py-16 sm:px-6 md:px-12 md:py-24">
        <div className="mx-auto max-w-7xl">
          <Reveal>
            <h2
              className="max-w-2xl text-3xl font-normal sm:text-4xl md:text-5xl"
              style={{ letterSpacing: '-0.04em' }}
            >
              How we work.
            </h2>
          </Reveal>
          <div className="mt-14 grid gap-10 md:grid-cols-3">
            {VALUES.map((value, i) => (
              <Reveal key={value.title} delay={i * 100}>
                <div className="border-t border-white/10 pt-6">
                  <h3 className="text-xl font-normal" style={{ letterSpacing: '-0.02em' }}>
                    {value.title}
                  </h3>
                  <p className="mt-3 text-sm text-gray-400 md:text-base">{value.body}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <CallToAction />
    </>
  )
}
