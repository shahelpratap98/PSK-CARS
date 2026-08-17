import { Link } from 'react-router-dom'
import { MessageCircle, Mail, MapPin, Clock } from 'lucide-react'
import { BUSINESS, BUSINESS_EMAIL, NAV_LINKS, SERVICES, whatsappLink } from '../siteConfig'

export default function Footer() {
  return (
    <footer className="border-t border-white/10 bg-black px-4 py-14 sm:px-6 md:px-12">
      <div className="mx-auto grid max-w-7xl gap-10 md:grid-cols-4">
        <div className="md:col-span-1">
          <div className="flex items-center gap-3">
            <img
              src="/brand/psk-logo.png"
              alt=""
              width={253}
              height={237}
              className="h-12 w-auto"
            />
            <p className="text-lg font-semibold tracking-[-0.04em]">PSK CARS</p>
          </div>
          <p className="mt-3 max-w-xs text-sm text-gray-400">
            Paint work, panel beating, compliance and sandblasting from our {BUSINESS.suburb}{' '}
            workshop in {BUSINESS.region}.
          </p>
        </div>

        <div>
          <p className="text-xs tracking-[0.2em] text-gray-500 uppercase">Pages</p>
          <ul className="mt-4 space-y-2.5 text-sm">
            {NAV_LINKS.map((link) => (
              <li key={link.to}>
                <Link to={link.to} className="text-gray-400 transition-colors hover:text-white">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="text-xs tracking-[0.2em] text-gray-500 uppercase">Services</p>
          <ul className="mt-4 space-y-2.5 text-sm">
            {SERVICES.map((service) => (
              <li key={service.slug}>
                <Link
                  to={`/services/${service.slug}`}
                  className="text-gray-400 transition-colors hover:text-white"
                >
                  {service.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="text-xs tracking-[0.2em] text-gray-500 uppercase">Get in touch</p>
          <ul className="mt-4 space-y-3 text-sm text-gray-400">
            <li>
              <a
                href={`mailto:${BUSINESS_EMAIL}`}
                className="flex items-center gap-2 transition-colors hover:text-white"
              >
                <Mail size={16} />
                <span className="break-all">{BUSINESS_EMAIL}</span>
              </a>
            </li>
            <li>
              <a
                href={whatsappLink()}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 transition-colors hover:text-white"
              >
                <MessageCircle size={16} />
                <span>Message us on WhatsApp</span>
              </a>
            </li>
            <li className="flex items-center gap-2">
              <MapPin size={16} />
              <span>
                {BUSINESS.suburb}, {BUSINESS.city}
              </span>
            </li>
            <li className="flex items-center gap-2">
              <Clock size={16} />
              <span>{BUSINESS.hours}</span>
            </li>
          </ul>
        </div>
      </div>

      <div className="mx-auto mt-12 max-w-7xl border-t border-white/10 pt-6 text-xs text-gray-500">
        © {new Date().getFullYear()} PSK Cars. All rights reserved.
      </div>
    </footer>
  )
}
