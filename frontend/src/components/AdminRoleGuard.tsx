import { ReactNode, useEffect } from 'react'
import { useUser } from '@clerk/clerk-react'
import { useNavigate } from 'react-router-dom'
import { useIsAdmin } from '../utils/auth'

interface AdminRoleGuardProps {
  children: ReactNode
}

/**
 * Middleware component to guard admin routes
 * Redirects non-admin users away from admin pages
 */
export default function AdminRoleGuard({ children }: AdminRoleGuardProps) {
  const { isLoaded, isSignedIn } = useUser()
  const isAdmin = useIsAdmin()
  const navigate = useNavigate()

  useEffect(() => {
    if (isLoaded && isSignedIn && !isAdmin) {
      // Redirect non-admin users to home page
      navigate('/', { replace: true })
    }
  }, [isLoaded, isSignedIn, isAdmin, navigate])

  if (!isLoaded) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    )
  }

  if (!isSignedIn || !isAdmin) {
    return null // Will redirect via useEffect
  }

  return <>{children}</>
}



