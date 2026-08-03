import Reveal from './Reveal'

export default function PageHeader({ eyebrow, title, intro }) {
  return (
    <section className="relative overflow-hidden border-b border-white/10 px-4 pt-36 pb-16 sm:px-6 md:px-12 md:pt-44 md:pb-24">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-40 left-1/2 h-96 w-[46rem] -translate-x-1/2 rounded-full bg-white/[0.06] blur-3xl"
      />
      <div className="relative mx-auto max-w-7xl">
        <Reveal immediate>
          {eyebrow && <p className="text-xs tracking-[0.2em] text-gray-500 uppercase">{eyebrow}</p>}
          <h1
            className="mt-4 max-w-3xl text-4xl font-normal sm:text-5xl md:text-6xl"
            style={{ letterSpacing: '-0.04em' }}
          >
            {title}
          </h1>
          {intro && <p className="mt-6 max-w-2xl text-base text-gray-400 md:text-lg">{intro}</p>}
        </Reveal>
      </div>
    </section>
  )
}
