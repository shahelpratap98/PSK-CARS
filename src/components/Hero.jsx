import { Link } from 'react-router-dom'
import { Star, Clock, MapPin, Phone, ChevronDown, MessageCircle } from 'lucide-react'
import { BUSINESS, whatsappLink } from '../siteConfig'
import { MEDIA_VERSION } from '../seo'

export default function Hero() {
  return (
    <section className="relative isolate flex min-h-svh flex-col justify-end overflow-hidden">
      {/* Two encodes rather than one. Phones get a portrait file with the
          front-of-car framing already cropped in, so the browser is not
          decoding a 16:9 frame and throwing most of it away to reach the same
          shot. Desktop gets the wide 1080p cut with the car right of the copy.
          The matching poster prevents a flash of the wrong framing. */}
      {/* The poster lives here rather than on the video, because a poster
          attribute takes one URL and cannot follow a media query. */}
      <div className="hero-poster pointer-events-none absolute inset-0 -z-30" aria-hidden="true" />

      <video
        className="absolute inset-0 -z-20 h-full w-full object-cover object-center md:[object-position:72%_center]"
        autoPlay
        loop
        muted
        playsInline
        preload="auto"
        disablePictureInPicture
        aria-hidden="true"
      >
        <source src={`/s15-hero-mobile.mp4?v=${MEDIA_VERSION}`} media="(max-width: 767px)" type="video/mp4" />
        <source src={`/s15-hero.mp4?v=${MEDIA_VERSION}`} type="video/mp4" />
      </video>

      {/* Keeps the copy legible without flattening the video: a soft wash from
          the text side on desktop, from the bottom on mobile. */}
      <div className="hero-scrim pointer-events-none absolute inset-0 -z-10" />
      {/* There used to be a full-viewport backdrop-filter here. A backdrop blur
          over a playing video has to be recomputed for every frame of that
          video, across the whole viewport, forever. It was the single most
          expensive thing on the page and it sat under a nearly opaque scrim.
          The scrim below now does the same job for free. */}

      <div className="mx-auto w-full max-w-7xl px-4 pt-32 pb-14 sm:px-6 md:px-12 md:pb-20">
        <div className="max-w-xl lg:max-w-2xl">
          <div
            className="animate-blur-fade-up mb-6 flex flex-wrap items-center gap-3 text-xs sm:gap-6 sm:text-sm md:mb-8"
            style={{ animationDelay: '300ms' }}
          >
            <span className="flex items-center gap-2">
              <Star size={16} className="fill-white sm:h-5 sm:w-5" />
              <span className="font-medium">Trusted {BUSINESS.region} workshop</span>
            </span>
            <span className="flex items-center gap-2">
              <Clock size={16} />
              <span>{BUSINESS.hours}</span>
            </span>
            <span className="flex items-center gap-2">
              <MapPin size={16} />
              <span>
                {BUSINESS.suburb}, {BUSINESS.city}
              </span>
            </span>
          </div>

          <h1
            className="animate-blur-fade-up mb-4 text-4xl font-normal sm:text-5xl md:mb-6 md:text-6xl lg:text-7xl"
            style={{ letterSpacing: '-0.04em', animationDelay: '400ms' }}
          >
            Panel Perfect.
            <br />
            Paint Flawless.
          </h1>

          <p
            className="animate-blur-fade-up mb-8 max-w-lg text-base text-gray-300 sm:text-lg md:mb-10 md:text-xl"
            style={{ animationDelay: '500ms' }}
          >
            Specialist paint work, panel beating, compliance and sandblasting from our{' '}
            {BUSINESS.suburb} workshop in {BUSINESS.region}.
          </p>

          <div className="flex flex-wrap gap-3 sm:gap-4">
            <Link
              to="/contact"
              className="animate-blur-fade-up flex items-center gap-2 rounded-full bg-white px-6 py-2.5 font-medium text-black transition-colors hover:bg-gray-200 sm:px-8 sm:py-3"
              style={{ animationDelay: '600ms' }}
            >
              <span>Get a quote</span>
              <Phone size={18} className="fill-black" />
            </Link>
            <a
              href={whatsappLink()}
              target="_blank"
              rel="noopener noreferrer"
              className="liquid-glass animate-blur-fade-up flex items-center gap-2 rounded-full px-6 py-2.5 font-medium sm:px-8 sm:py-3"
              style={{ animationDelay: '700ms' }}
            >
              <span>WhatsApp us</span>
              <MessageCircle size={18} />
            </a>
          </div>
        </div>
      </div>

      <a
        href="#services"
        aria-label="Scroll to services"
        className="animate-blur-fade-up absolute bottom-6 left-1/2 hidden -translate-x-1/2 items-center gap-2 text-xs tracking-[0.2em] text-gray-400 uppercase transition-colors hover:text-white md:flex"
        style={{ animationDelay: '900ms' }}
      >
        <span>Scroll</span>
        <ChevronDown size={16} className="animate-bounce-slow" />
      </a>
    </section>
  )
}
