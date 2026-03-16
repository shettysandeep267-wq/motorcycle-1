import { Facebook, Instagram, Twitter, Youtube } from 'lucide-react'

export default function LandingFooter() {
  return (
    <footer className="border-t border-white/10 bg-black/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="flex flex-col sm:flex-row gap-6 items-start sm:items-center justify-between">
          <div>
            <p className="text-white font-extrabold tracking-tight text-lg">
              Motorcycle <span className="text-[#ff7a00]">Shop</span>
            </p>
            <p className="text-white/55 text-sm mt-2">
              Motorcycle parts, repairs, and shop management — built for a clean online experience.
            </p>
          </div>
          <div className="flex items-center gap-3">
            <a href="#" aria-label="Facebook" className="text-white/60 hover:text-[#ff7a00] transition">
              <Facebook className="w-5 h-5" />
            </a>
            <a href="#" aria-label="Instagram" className="text-white/60 hover:text-[#ff7a00] transition">
              <Instagram className="w-5 h-5" />
            </a>
            <a href="#" aria-label="Twitter" className="text-white/60 hover:text-[#ff7a00] transition">
              <Twitter className="w-5 h-5" />
            </a>
            <a href="#" aria-label="YouTube" className="text-white/60 hover:text-[#ff7a00] transition">
              <Youtube className="w-5 h-5" />
            </a>
          </div>
        </div>

        <div className="mt-8 flex flex-col sm:flex-row gap-3 items-start sm:items-center justify-between text-sm text-white/45">
          <p>&copy; {new Date().getFullYear()} Motorcycle Shop. All rights reserved.</p>
          <p className="text-white/35">Designed for a clean, modern shop experience.</p>
        </div>
      </div>
    </footer>
  )
}

