import { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { SignedIn, SignedOut, UserButton } from '@clerk/clerk-react'
import { ShoppingCart, Menu, X } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { useCart } from '../context/CartContext'

const navLinks = [
  { to: '/', label: 'Home', end: true },
  { to: '/products', label: 'Products' },
  { to: '/services', label: 'Services' },
  { to: '/dashboard', label: 'Dashboard' },
] as const

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const { totalQuantity } = useCart()

  return (
    <nav className="sticky top-0 z-50 border-b border-white/[0.08] bg-[#030303]/75 backdrop-blur-xl supports-[backdrop-filter]:bg-[#030303]/55 shadow-[0_8px_32px_-8px_rgba(0,0,0,0.5)]">
      <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-[#ff7a00]/35 to-transparent pointer-events-none" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center h-14 sm:h-16">
          <Link
            to="/"
            className="text-lg sm:text-xl font-extrabold tracking-tight text-white shrink-0 group"
          >
            <span className="bg-gradient-to-r from-white to-white/80 bg-clip-text group-hover:from-white group-hover:to-white transition">
              Funny{' '}
            </span>
            <span className="bg-gradient-to-r from-[#ff7a00] to-amber-300 bg-clip-text text-transparent">
              Bikes
            </span>
          </Link>

          <div className="hidden md:flex flex-1 justify-center px-4">
            <div className="flex items-center gap-1 rounded-2xl border border-white/[0.08] bg-white/[0.04] p-1 backdrop-blur-md shadow-inner shadow-black/20">
              {navLinks.map((link) => (
                <NavLink
                  key={link.to}
                  to={link.to}
                  end={'end' in link ? link.end : false}
                  className={({ isActive }) =>
                    `relative px-4 py-2 rounded-xl text-sm font-semibold transition-all ${
                      isActive
                        ? 'text-black bg-gradient-to-r from-[#ff7a00] to-[#ff9336] shadow-md shadow-[#ff7a00]/25'
                        : 'text-white/70 hover:text-white hover:bg-white/[0.06]'
                    }`
                  }
                >
                  {link.label}
                </NavLink>
              ))}
            </div>
          </div>

          <div className="ml-auto flex items-center gap-1.5 sm:gap-3">
            <SignedIn>
              <Link
                to="/cart"
                className="relative flex h-10 w-10 sm:h-11 sm:w-11 items-center justify-center rounded-xl border border-white/10 bg-white/[0.05] text-white/85 hover:bg-white/[0.1] hover:border-[#ff7a00]/25 transition"
                aria-label="Cart"
              >
                <ShoppingCart className="w-5 h-5" />
                {totalQuantity > 0 && (
                  <span className="absolute -top-1 -right-1 min-w-[1.125rem] h-[1.125rem] flex items-center justify-center px-1 rounded-full bg-gradient-to-r from-[#ff7a00] to-[#ff9336] text-black text-[10px] font-bold shadow-lg shadow-[#ff7a00]/40">
                    {totalQuantity > 99 ? '99+' : totalQuantity}
                  </span>
                )}
              </Link>
            </SignedIn>
            <SignedIn>
              <div className="rounded-xl border border-white/10 bg-white/[0.05] p-0.5 pl-1">
                <UserButton afterSignOutUrl="/" />
              </div>
            </SignedIn>
            <SignedOut>
              <Link
                to="/login"
                className="rounded-xl bg-gradient-to-r from-[#ff7a00] to-[#ff9336] text-black px-4 py-2 sm:px-5 sm:py-2.5 text-sm font-bold hover:brightness-110 shadow-md shadow-[#ff7a00]/25 transition"
              >
                Login
              </Link>
            </SignedOut>

            <button
              type="button"
              onClick={() => setMobileOpen((o) => !o)}
              className="md:hidden flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/[0.05] text-white/85 hover:bg-white/[0.1] transition"
              aria-label="Toggle menu"
              aria-expanded={mobileOpen}
            >
              {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
            className="md:hidden overflow-hidden border-t border-white/[0.08] bg-[#050505]/95 backdrop-blur-xl"
          >
            <div className="px-4 py-4 space-y-1">
              {navLinks.map((link, i) => (
                <motion.div
                  key={link.to}
                  initial={{ opacity: 0, x: -8 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                >
                  <NavLink
                    to={link.to}
                    end={'end' in link ? link.end : false}
                    onClick={() => setMobileOpen(false)}
                    className={({ isActive }) =>
                      `block py-3 px-4 rounded-xl font-semibold transition ${
                        isActive
                          ? 'bg-[#ff7a00]/15 text-[#ff9a4d]'
                          : 'text-white/70 hover:bg-white/[0.06]'
                      }`
                    }
                  >
                    {link.label}
                  </NavLink>
                </motion.div>
              ))}
              <SignedIn>
                <Link
                  to="/cart"
                  onClick={() => setMobileOpen(false)}
                  className="block py-3 px-4 rounded-xl text-white/70 hover:bg-white/[0.06] font-semibold"
                >
                  Cart {totalQuantity > 0 && `(${totalQuantity})`}
                </Link>
              </SignedIn>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  )
}
