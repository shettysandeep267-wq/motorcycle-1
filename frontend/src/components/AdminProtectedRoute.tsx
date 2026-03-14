import { ReactNode } from 'react'
import { useUser, RedirectToSignIn } from '@clerk/clerk-react'
import { Navigate, useNavigate } from 'react-router-dom'
import { useIsAdmin } from '../utils/auth'

interface AdminProtectedRouteProps {
  children: ReactNode
}

/**
 * Protected route component that ensures only admin users can access
 * Admin role is checked from Clerk user metadata
 */
export default function AdminProtectedRoute({ children }: AdminProtectedRouteProps) {
  const { isLoaded, isSignedIn, user } = useUser()
  const isAdmin = useIsAdmin()
  const navigate = useNavigate()

  // Show loading state while checking authentication
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

  // Redirect to sign in if not authenticated
  if (!isSignedIn) {
    return <RedirectToSignIn />
  }

  // Check if user has admin role
  if (!isAdmin) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="max-w-md w-full bg-white rounded-lg shadow-md p-8 text-center">
          <div className="mb-4">
            <svg
              className="mx-auto h-12 w-12 text-red-500"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
              />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Access Denied</h2>
          <p className="text-gray-600 mb-6">
            You don't have permission to access this page. Admin role is required.
          </p>
          <div className="space-y-2">
            <p className="text-sm text-gray-500">
              Current user: {user?.emailAddresses[0]?.emailAddress}
            </p>
            <p className="text-sm text-gray-500">
              Role: {user?.publicMetadata?.role || 'user'}
            </p>
            <button
              onClick={() => navigate('/')}
              className="mt-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
              Go to Home
            </button>
          </div>
        </div>
      </div>
    )
  }

  // User is authenticated and has admin role
  return <>{children}</>
}

