import { useState } from 'react'
import { Link } from 'react-router-dom'
import { SignedIn, SignedOut, UserButton, SignInButton } from '@clerk/clerk-react'
import { ShoppingCart, Menu, X } from 'lucide-react'

interface NavbarProps {
  cartCount?: number
}

export default function Navbar({ cartCount = 0 }: NavbarProps) {
  const [mobileOpen, setMobileOpen] = useState(false)

  const navLinks = [
    { to: '/', label: 'Home' },
    { to: '/products', label: 'Parts' },
    { to: '/services', label: 'Services' },
  ]

  const authLinks = [
    { to: '/dashboard', label: 'Dashboard' },
    { to: '/orders', label: 'Orders' },
  ]

  return (
    <nav className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-14 sm:h-16">
          <Link to="/" className="text-xl sm:text-2xl font-bold text-blue-600">
            Motorcycle Shop
          </Link>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-6">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className="text-gray-600 hover:text-blue-600 font-medium transition"
              >
                {link.label}
              </Link>
            ))}
            <SignedIn>
              {authLinks.map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  className="text-gray-600 hover:text-blue-600 font-medium transition"
                >
                  {link.label}
                </Link>
              ))}
            </SignedIn>
          </div>

          <div className="flex items-center gap-2 sm:gap-4">
            <SignedIn>
              <Link to="/cart" className="relative p-2 text-gray-600 hover:text-blue-600 rounded-lg">
                <ShoppingCart className="w-6 h-6" />
                {cartCount > 0 && (
                  <span className="absolute top-0.5 right-0.5 bg-red-500 text-white text-xs rounded-full min-w-[18px] h-[18px] flex items-center justify-center px-1">
                    {cartCount}
                  </span>
                )}
              </Link>
            </SignedIn>
            <SignedIn>
              <UserButton afterSignOutUrl="/" />
            </SignedIn>
            <SignedOut>
              <SignInButton mode="modal">
                <button className="bg-blue-600 text-white px-3 py-2 sm:px-4 sm:py-2 rounded-lg font-medium hover:bg-blue-700 text-sm sm:text-base">
                  Sign In
                </button>
              </SignInButton>
            </SignedOut>

            {/* Mobile menu button */}
            <button
              type="button"
              onClick={() => setMobileOpen((o) => !o)}
              className="md:hidden p-2 rounded-lg text-gray-600 hover:bg-gray-100"
              aria-label="Toggle menu"
            >
              {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden border-t border-gray-100 bg-white">
          <div className="px-4 py-3 space-y-1">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                onClick={() => setMobileOpen(false)}
                className="block py-2.5 px-3 rounded-lg text-gray-700 hover:bg-gray-50 font-medium"
              >
                {link.label}
              </Link>
            ))}
            <SignedIn>
              {authLinks.map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  onClick={() => setMobileOpen(false)}
                  className="block py-2.5 px-3 rounded-lg text-gray-700 hover:bg-gray-50 font-medium"
                >
                  {link.label}
                </Link>
              ))}
              <Link
                to="/cart"
                onClick={() => setMobileOpen(false)}
                className="block py-2.5 px-3 rounded-lg text-gray-700 hover:bg-gray-50 font-medium"
              >
                Cart {cartCount > 0 && `(${cartCount})`}
              </Link>
            </SignedIn>
          </div>
        </div>
      )}
    </nav>
  )
}
