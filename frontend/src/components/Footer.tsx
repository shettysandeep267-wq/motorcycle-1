import { Link } from 'react-router-dom'
import { Facebook, Twitter, Instagram, Mail, Phone, MapPin } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="bg-black/60 text-white mt-auto border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <h3 className="text-xl font-extrabold tracking-tight mb-4">
              Funny <span className="text-[#ff7a00]">Bikes</span>
            </h3>
            <p className="text-white/60 mb-4">
              Your trusted partner for rentals, repairs, and quality parts. Clean rides and expert service.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-white/60 hover:text-white transition">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="text-white/60 hover:text-white transition">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" className="text-white/60 hover:text-white transition">
                <Instagram className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-white/60 hover:text-white transition">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/products" className="text-white/60 hover:text-white transition">
                  Products
                </Link>
              </li>
              <li>
                <Link to="/services" className="text-white/60 hover:text-white transition">
                  Services
                </Link>
              </li>
              <li>
                <Link to="/orders" className="text-white/60 hover:text-white transition">
                  Orders
                </Link>
              </li>
            </ul>
          </div>

          {/* Customer Service */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Customer Service</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/dashboard" className="text-white/60 hover:text-white transition">
                  My Account
                </Link>
              </li>
              <li>
                <a href="#" className="text-white/60 hover:text-white transition">
                  Shipping Info
                </a>
              </li>
              <li>
                <a href="#" className="text-white/60 hover:text-white transition">
                  Returns
                </a>
              </li>
              <li>
                <a href="#" className="text-white/60 hover:text-white transition">
                  FAQ
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Contact Us</h4>
            <ul className="space-y-3">
              <li className="flex items-center space-x-2">
                <MapPin className="w-5 h-5 text-white/50" />
                <span className="text-white/60">123 City St, Washington DC</span>
              </li>
              <li className="flex items-center space-x-2">
                <Phone className="w-5 h-5 text-white/50" />
                <span className="text-white/60">+1 (202) 555-0188</span>
              </li>
              <li className="flex items-center space-x-2">
                <Mail className="w-5 h-5 text-white/50" />
                <span className="text-white/60">hello@funnybikes.com</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 mt-8 pt-8 text-center text-white/50">
          <p>&copy; {new Date().getFullYear()} Funny Bikes. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}



