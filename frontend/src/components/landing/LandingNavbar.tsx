import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Menu, X } from 'lucide-react'

const NAV_ITEMS = [
  { label: 'Home', to: '/', type: 'route' },
  { label: 'Products', to: '/products', type: 'route' },
  { label: 'Services', to: '/services', type: 'route' },
  { label: 'About', href: '#about', type: 'hash' },
  { label: 'Contact', href: '#contact', type: 'hash' },
  { label: 'Login', to: '/login', type: 'route' },
] as const

export default function LandingNavbar() {
  const [open, setOpen] = useState(false)

  return (
    <header className="border-b border-white/10 backdrop-blur supports-[backdrop-filter]:bg-black/30 bg-black/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <Link to="/" className="text-xl sm:text-2xl font-extrabold tracking-tight text-white">
          Motorcycle <span className="text-[#ff7a00]">Shop</span>
        </Link>

        <nav className="hidden md:flex items-center gap-8">
          {NAV_ITEMS.map((item) => (
            item.type === 'hash' ? (
              <a
                key={item.label}
                href={item.href}
                className="text-sm font-semibold text-white/70 hover:text-[#ff7a00] transition-colors"
              >
                {item.label}
              </a>
            ) : (
              <Link
                key={item.label}
                to={item.to}
                className="text-sm font-semibold text-white/70 hover:text-[#ff7a00] transition-colors"
              >
                {item.label}
              </Link>
            )
          ))}
        </nav>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          className="md:hidden p-2 rounded-lg text-white/80 hover:text-white hover:bg-white/10 transition"
          aria-label="Toggle menu"
        >
          {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {open ? (
        <div className="md:hidden border-t border-white/10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex flex-col gap-1">
            {NAV_ITEMS.map((item) => (
              item.type === 'hash' ? (
                <a
                  key={item.label}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="py-2.5 px-3 rounded-lg text-white/70 hover:text-[#ff7a00] hover:bg-white/10 transition font-semibold"
                >
                  {item.label}
                </a>
              ) : (
                <Link
                  key={item.label}
                  to={item.to}
                  onClick={() => setOpen(false)}
                  className="py-2.5 px-3 rounded-lg text-white/70 hover:text-[#ff7a00] hover:bg-white/10 transition font-semibold"
                >
                  {item.label}
                </Link>
              )
            ))}
          </div>
        </div>
      ) : null}
    </header>
  )
}

