import { useEffect, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { Menu, X, MessageCircle } from 'lucide-react'
import { NAV_LINKS, whatsappLink } from '../siteConfig'

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const { pathname } = useLocation()

  useEffect(() => setMenuOpen(false), [pathname])

  useEffect(() => {
    // Only touch state when the threshold is actually crossed, so scrolling
    // does not queue a React update on every frame.
    let current = false
    const onScroll = () => {
      const next = window.scrollY > 24
      if (next !== current) {
        current = next
        setScrolled(next)
      }
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-500 ${
        // Solid rather than translucent-and-blurred: a backdrop-filter on a
        // fixed header re-blurs the full width against whatever is scrolling
        // underneath, on every single frame of the scroll.
        scrolled || menuOpen ? 'bg-black/95' : 'bg-transparent'
      }`}
    >
      {/* Over the hero the navbar is transparent, and the video's light bar can
          sit directly behind the links — this keeps them readable. */}
      <div
        aria-hidden="true"
        className={`pointer-events-none absolute inset-x-0 top-0 h-28 bg-gradient-to-b from-black/70 to-transparent transition-opacity duration-500 ${
          scrolled || menuOpen ? 'opacity-0' : 'opacity-100'
        }`}
      />

      <div className="relative mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 md:px-12 md:py-6">
        <Link
          to="/"
          className="animate-blur-fade-up flex h-8 items-center text-lg font-semibold tracking-[-0.04em] md:h-10 md:text-xl"
          style={{ animationDelay: '0ms' }}
        >
          PSK CARS
        </Link>

        <nav className="absolute left-1/2 hidden -translate-x-1/2 items-center gap-8 lg:flex">
          {NAV_LINKS.map((link, i) => (
            <NavLink
              key={link.to}
              to={link.to}
              end={link.to === '/'}
              className={({ isActive }) =>
                `animate-blur-fade-up text-sm transition-colors hover:text-white ${
                  isActive ? 'text-white' : 'text-gray-400'
                }`
              }
              style={{ animationDelay: `${100 + i * 50}ms` }}
            >
              {link.label}
            </NavLink>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <a
            href={whatsappLink()}
            target="_blank"
            rel="noopener noreferrer"
            className="liquid-glass animate-blur-fade-up hidden items-center gap-2 rounded-full px-4 py-2 text-sm sm:flex md:px-6"
            style={{ animationDelay: '350ms' }}
          >
            <span>WhatsApp</span>
            <MessageCircle size={18} />
          </a>

          <Link
            to="/contact"
            className="animate-blur-fade-up hidden rounded-full bg-white px-5 py-2 text-sm font-medium text-black transition-colors hover:bg-gray-200 sm:block"
            style={{ animationDelay: '400ms' }}
          >
            Get a quote
          </Link>

          <button
            type="button"
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((open) => !open)}
            className="liquid-glass animate-blur-fade-up relative flex h-10 w-10 items-center justify-center rounded-full lg:hidden"
            style={{ animationDelay: '350ms' }}
          >
            <Menu
              size={18}
              className={`absolute transition-all duration-500 ease-out ${
                menuOpen ? 'rotate-180 scale-50 opacity-0' : 'rotate-0 scale-100 opacity-100'
              }`}
            />
            <X
              size={18}
              className={`absolute transition-all duration-500 ease-out ${
                menuOpen ? 'rotate-0 scale-100 opacity-100' : 'rotate-180 scale-50 opacity-0'
              }`}
            />
          </button>
        </div>
      </div>

      <div
        className={`absolute inset-x-0 top-[72px] border-t border-b border-gray-800 bg-gray-900/95 shadow-2xl backdrop-blur-lg transition-all duration-500 ease-out lg:hidden ${
          menuOpen ? 'translate-y-0 opacity-100' : 'pointer-events-none -translate-y-4 opacity-0'
        }`}
      >
        <nav className="flex flex-col px-4 py-2 sm:px-6">
          {NAV_LINKS.map((link, i) => (
            <NavLink
              key={link.to}
              to={link.to}
              end={link.to === '/'}
              className={({ isActive }) =>
                `rounded-lg px-3 py-3 text-sm transition-all duration-500 ease-out hover:bg-gray-800/50 ${
                  isActive ? 'text-white' : 'text-gray-300'
                } ${menuOpen ? 'translate-x-0 opacity-100' : '-translate-x-4 opacity-0'}`
              }
              style={{ transitionDelay: menuOpen ? `${i * 50}ms` : '0ms' }}
            >
              {link.label}
            </NavLink>
          ))}
        </nav>

        <div className="flex items-center gap-3 border-t border-gray-800 px-4 py-4 sm:hidden sm:px-6">
          <a
            href={whatsappLink()}
            target="_blank"
            rel="noopener noreferrer"
            className="liquid-glass flex flex-1 items-center justify-center gap-2 rounded-full px-4 py-2 text-sm"
          >
            <span>WhatsApp</span>
            <MessageCircle size={18} />
          </a>
          <Link
            to="/contact"
            className="flex-1 rounded-full bg-white px-4 py-2 text-center text-sm font-medium text-black"
          >
            Get a quote
          </Link>
        </div>
      </div>
    </header>
  )
}
