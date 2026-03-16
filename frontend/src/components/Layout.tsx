import { Outlet, useLocation } from 'react-router-dom'
import Navbar from './Navbar'
import Footer from './Footer'
import { CartProvider } from '../context/CartContext'

export default function Layout() {
  const location = useLocation()
  const isLanding = location.pathname === '/'

  return (
    <CartProvider>
      <div className="min-h-screen flex flex-col bg-[#0a0a0a]">
        <Navbar />
        <main className="flex-grow">
          <Outlet />
        </main>
        {!isLanding ? <Footer /> : null}
      </div>
    </CartProvider>
  )
}
