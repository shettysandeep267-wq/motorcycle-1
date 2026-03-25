import { Outlet, useLocation } from 'react-router-dom'
import Navbar from './Navbar'
import Footer from './Footer'
import { CartProvider } from '../context/CartContext'

export default function Layout() {
  const location = useLocation()
  const isLanding = location.pathname === '/'

  return (
    <CartProvider>
      <div className="min-h-screen flex flex-col bg-[#030303] text-white relative">
        {!isLanding ? (
          <div
            className="pointer-events-none fixed inset-0 -z-10"
            aria-hidden
            style={{
              backgroundImage:
                'radial-gradient(ellipse 90% 60% at 50% -15%, rgba(255,122,0,0.1), transparent 50%), radial-gradient(ellipse 50% 40% at 100% 0%, rgba(139,92,246,0.06), transparent)',
            }}
          />
        ) : null}
        <Navbar />
        <main className="flex-grow">
          <Outlet />
        </main>
        {!isLanding ? <Footer /> : null}
      </div>
    </CartProvider>
  )
}
