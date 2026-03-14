import { Link, useLocation } from 'react-router-dom'
import {
  LayoutDashboard,
  Package,
  Wrench,
  ShoppingCart,
  Users,
  Archive,
  LogOut,
  ChevronRight,
} from 'lucide-react'
import { useClerk } from '@clerk/clerk-react'

const menuItems = [
  { path: '/admin/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
  { path: '/admin/products', icon: Package, label: 'Products' },
  { path: '/admin/services', icon: Wrench, label: 'Services & Bookings' },
  { path: '/admin/orders', icon: ShoppingCart, label: 'Orders' },
  { path: '/admin/inventory', icon: Archive, label: 'Inventory' },
  { path: '/admin/customers', icon: Users, label: 'Customers' },
]

interface AdminSidebarProps {
  mobileOpen?: boolean
  onClose?: () => void
}

export default function AdminSidebar({ mobileOpen, onClose }: AdminSidebarProps) {
  const location = useLocation()
  const { signOut } = useClerk()

  const isActive = (path: string) => location.pathname === path

  const handleSignOut = async () => {
    await signOut()
    window.location.href = '/'
  }

  const linkProps = {
    onClick: onClose,
  }

  return (
    <>
      {/* Mobile overlay */}
      {mobileOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={onClose}
          aria-hidden="true"
        />
      )}
      <aside
        className={`
          w-64 bg-white border-r border-gray-200 min-h-[calc(100vh-4rem)] flex flex-col z-50
          fixed left-0 top-16
          transform transition-transform duration-200 ease-out
          lg:translate-x-0
          ${mobileOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
        `}
      >
        <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
          <p className="px-3 mb-3 text-xs font-semibold text-gray-400 uppercase tracking-wider">
            Menu
          </p>
          {menuItems.map((item) => {
            const Icon = item.icon
            const active = isActive(item.path)
            return (
              <Link
                key={item.path}
                to={item.path}
                {...linkProps}
                className={`flex items-center justify-between gap-2 px-3 py-2.5 rounded-lg text-sm font-medium transition ${
                  active
                    ? 'bg-blue-50 text-blue-700'
                    : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                }`}
              >
                <span className="flex items-center gap-3">
                  <Icon className="w-5 h-5 flex-shrink-0" />
                  {item.label}
                </span>
                {active && <ChevronRight className="w-4 h-4 text-blue-600" />}
              </Link>
            )
          })}
        </nav>
        <div className="p-4 border-t border-gray-100">
          <button
            onClick={handleSignOut}
            className="flex items-center gap-3 w-full px-3 py-2.5 rounded-lg text-sm font-medium text-gray-600 hover:bg-red-50 hover:text-red-600 transition"
          >
            <LogOut className="w-5 h-5" />
            Sign out
          </button>
        </div>
      </aside>
    </>
  )
}
