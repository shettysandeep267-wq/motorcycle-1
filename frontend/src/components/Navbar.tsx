import { useState } from 'react'
import { Link } from 'react-router-dom'
import { SignedIn, SignedOut, UserButton } from '@clerk/clerk-react'
import { ShoppingCart, Menu, X } from 'lucide-react'
import { useCart } from '../context/CartContext'

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const { totalQuantity } = useCart()

  const navLinks = [
    { to: '/', label: 'Home' },
    { to: '/products', label: 'Products' },
    { to: '/services', label: 'Services' },
    { to: '/dashboard', label: 'Dashboard' },
  ]

  return (
    <nav className="bg-black/40 border-b border-white/10 sticky top-0 z-50 backdrop-blur supports-[backdrop-filter]:bg-black/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center h-14 sm:h-16">
          <Link to="/" className="text-xl sm:text-2xl font-extrabold tracking-tight text-white">
            Funny <span className="text-[#ff7a00]">Bikes</span>
          </Link>

          {/* Desktop nav */}
          <div className="hidden md:flex flex-1 items-center justify-center">
            <div className="flex items-center gap-6 lg:gap-8 flex-wrap justify-center">
              {navLinks.map((link) => (
                <Link
                  key={link.label}
                  to={link.to}
                  className="text-sm font-semibold text-white/70 hover:text-[#ff7a00] transition-colors"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          <div className="ml-auto flex items-center gap-2 sm:gap-4">
            <SignedIn>
              <Link to="/cart" className="relative p-2 text-white/80 hover:text-white rounded-lg hover:bg-white/10 transition">
                <ShoppingCart className="w-6 h-6" />
                {totalQuantity > 0 && (
                  <span className="absolute top-0.5 right-0.5 bg-[#ff7a00] text-black text-xs rounded-full min-w-[18px] h-[18px] flex items-center justify-center px-1 font-semibold">
                    {totalQuantity}
                  </span>
                )}
              </Link>
            </SignedIn>
            <SignedIn>
              <UserButton afterSignOutUrl="/" />
            </SignedIn>
            <SignedOut>
              <Link
                to="/login"
                className="bg-[#ff7a00] text-black px-3 py-2 sm:px-4 sm:py-2 rounded-lg font-semibold hover:brightness-110 text-sm sm:text-base transition"
              >
                Login
              </Link>
            </SignedOut>

            {/* Mobile menu button */}
            <button
              type="button"
              onClick={() => setMobileOpen((o) => !o)}
              className="md:hidden p-2 rounded-lg text-white/80 hover:text-white hover:bg-white/10 transition"
              aria-label="Toggle menu"
            >
              {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden border-t border-white/10 bg-black/60">
          <div className="px-4 py-3 space-y-1">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                onClick={() => setMobileOpen(false)}
                className="block py-2.5 px-3 rounded-lg text-white/70 hover:text-[#ff7a00] hover:bg-white/10 font-semibold transition"
              >
                {link.label}
              </Link>
            ))}
            <SignedIn>
              <Link
                to="/cart"
                onClick={() => setMobileOpen(false)}
                className="block py-2.5 px-3 rounded-lg text-white/70 hover:text-[#ff7a00] hover:bg-white/10 font-semibold transition"
              >
                Cart {totalQuantity > 0 && `(${totalQuantity})`}
              </Link>
            </SignedIn>
          </div>
        </div>
      )}
    </nav>
  )
}
