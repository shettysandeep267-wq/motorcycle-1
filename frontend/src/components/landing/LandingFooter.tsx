import { Facebook, Instagram, Twitter, Youtube } from 'lucide-react'
import { Link } from 'react-router-dom'

export default function LandingFooter() {
  return (
    <footer className="border-t border-white/[0.08] bg-gradient-to-b from-black/40 to-black/80 backdrop-blur-xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-14">
        <div className="flex flex-col lg:flex-row gap-10 items-start lg:items-center justify-between">
          <div className="max-w-md">
            <p className="text-white font-extrabold tracking-tight text-xl">
              Funny <span className="bg-gradient-to-r from-[#ff7a00] to-amber-300 bg-clip-text text-transparent">Bikes</span>
            </p>
            <p className="text-white/50 text-sm mt-3 leading-relaxed">
              Premium motorcycle parts, workshop services, and a customer experience that feels like a
              funded startup—not a legacy form.
            </p>
            <div className="mt-5 flex flex-wrap gap-x-6 gap-y-2 text-sm">
              <Link to="/products" className="text-white/60 hover:text-[#ff9a4d] transition">
                Products
              </Link>
              <Link to="/services" className="text-white/60 hover:text-[#ff9a4d] transition">
                Services
              </Link>
              <Link to="/#about" className="text-white/60 hover:text-[#ff9a4d] transition">
                About
              </Link>
              <Link to="/#contact" className="text-white/60 hover:text-[#ff9a4d] transition">
                Contact
              </Link>
            </div>
          </div>
          <div className="flex items-center gap-3">
            {(
              [
                ['Facebook', Facebook],
                ['Instagram', Instagram],
                ['Twitter', Twitter],
                ['YouTube', Youtube],
              ] as const
            ).map(([label, Icon]) => (
              <a
                key={label}
                href="#"
                aria-label={label}
                className="flex h-11 w-11 items-center justify-center rounded-xl border border-white/10 bg-white/[0.05] text-white/55 hover:text-[#ff7a00] hover:border-[#ff7a00]/30 transition"
              >
                <Icon className="w-5 h-5" />
              </a>
            ))}
          </div>
        </div>

        <div className="mt-10 pt-8 border-t border-white/[0.06] flex flex-col sm:flex-row gap-3 items-start sm:items-center justify-between text-sm text-white/40">
          <p>&copy; {new Date().getFullYear()} Funny Bikes. All rights reserved.</p>
          <p className="text-white/30">Built for riders who notice the details.</p>
        </div>
      </div>
    </footer>
  )
}
