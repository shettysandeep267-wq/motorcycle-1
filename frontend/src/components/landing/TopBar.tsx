import { Facebook, Instagram, Twitter, Youtube } from 'lucide-react'

export default function TopBar() {
  return (
    <div className="bg-[#ff7a00] text-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-9 flex items-center justify-between text-sm">
        <div className="font-medium">
          <span className="opacity-80">Call:</span> <span className="font-semibold">+1 (202) 555-0188</span>
        </div>
        <div className="flex items-center gap-3">
          <a href="#" aria-label="Facebook" className="hover:opacity-80 transition-opacity">
            <Facebook className="w-4 h-4" />
          </a>
          <a href="#" aria-label="Instagram" className="hover:opacity-80 transition-opacity">
            <Instagram className="w-4 h-4" />
          </a>
          <a href="#" aria-label="Twitter" className="hover:opacity-80 transition-opacity">
            <Twitter className="w-4 h-4" />
          </a>
          <a href="#" aria-label="YouTube" className="hover:opacity-80 transition-opacity">
            <Youtube className="w-4 h-4" />
          </a>
        </div>
      </div>
    </div>
  )
}

