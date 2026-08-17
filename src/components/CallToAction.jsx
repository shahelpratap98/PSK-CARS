import { Link } from 'react-router-dom'
import { MessageCircle, Phone } from 'lucide-react'
import Reveal from './Reveal'
import { whatsappLink } from '../siteConfig'

export default function CallToAction({
  heading = 'Not sure what your car needs?',
  body = 'Send us a couple of photos and we will tell you honestly what we would do, what it involves and roughly what it costs.',
}) {
  return (
    <section className="border-t border-white/10 px-4 py-20 sm:px-6 md:px-12 md:py-28">
      <Reveal className="mx-auto max-w-3xl text-center">
        <h2
          className="text-3xl font-normal sm:text-4xl md:text-5xl"
          style={{ letterSpacing: '-0.04em' }}
        >
          {heading}
        </h2>
        <p className="mx-auto mt-5 max-w-xl text-base text-gray-400 md:text-lg">{body}</p>
        <div className="mt-9 flex flex-wrap justify-center gap-3 sm:gap-4">
          <Link
            to="/contact"
            className="bg-brand hover:bg-brand-bright flex items-center gap-2 rounded-full px-6 py-2.5 font-medium text-white transition-colors sm:px-8 sm:py-3"
          >
            <span>Get a quote</span>
            <Phone size={18} className="fill-white" />
          </Link>
          <a
            href={whatsappLink()}
            target="_blank"
            rel="noopener noreferrer"
            className="liquid-glass flex items-center gap-2 rounded-full px-6 py-2.5 font-medium sm:px-8 sm:py-3"
          >
            <span>WhatsApp us</span>
            <MessageCircle size={18} />
          </a>
        </div>
      </Reveal>
    </section>
  )
}
