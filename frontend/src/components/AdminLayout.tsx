import { useState } from 'react'
import { Outlet, Link } from 'react-router-dom'
import { SignedIn, UserButton, useUser } from '@clerk/clerk-react'
import { Menu } from 'lucide-react'
import AdminSidebar from './AdminSidebar'
import { useIsAdmin } from '../utils/auth'

export default function AdminLayout() {
  const { user } = useUser()
  const isAdmin = useIsAdmin()
  const [sidebarOpen, setSidebarOpen] = useState(false)

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b border-gray-200 fixed top-0 left-0 right-0 z-50 h-14 sm:h-16">
        <div className="h-full px-4 sm:px-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => setSidebarOpen((o) => !o)}
              className="lg:hidden p-2 rounded-lg text-gray-600 hover:bg-gray-100"
              aria-label="Toggle menu"
            >
              <Menu className="w-6 h-6" />
            </button>
            <Link
              to="/admin/dashboard"
              className="text-lg sm:text-xl font-bold text-gray-900 hover:text-blue-600 transition"
            >
              Admin Panel
            </Link>
            {isAdmin && (
              <span className="text-xs font-medium bg-emerald-100 text-emerald-700 px-2 py-1 rounded hidden sm:inline">
                Admin
              </span>
            )}
          </div>
          <div className="flex items-center gap-2 sm:gap-4">
            <Link
              to="/"
              className="text-sm font-medium text-gray-500 hover:text-gray-900"
            >
              View store
            </Link>
            <SignedIn>
              <span className="text-sm text-gray-500 hidden md:inline truncate max-w-[120px]">
                {user?.emailAddresses[0]?.emailAddress}
              </span>
              <UserButton afterSignOutUrl="/" />
            </SignedIn>
          </div>
        </div>
      </header>
      <div className="flex pt-14 sm:pt-16">
        <AdminSidebar
          mobileOpen={sidebarOpen}
          onClose={() => setSidebarOpen(false)}
        />
        <main className="flex-1 min-w-0 lg:ml-64 min-h-[calc(100vh-4rem)] p-4 sm:p-6 lg:p-8">
          <Outlet />
        </main>
      </div>
    </div>
  )
}
