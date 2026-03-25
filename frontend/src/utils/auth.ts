import { useUser } from '@clerk/clerk-react'

/**
 * Check if the current user has admin role
 * Admin role is stored in the user's publicMetadata or organizationMemberships
 */
export const useIsAdmin = () => {
  const { user } = useUser()
  
  if (!user) return false
  
  // Check publicMetadata for admin role
  const isAdmin = user.publicMetadata?.role === 'admin' || 
                  user.publicMetadata?.isAdmin === true ||
                  user.organizationMemberships?.some(
                    (membership) => membership.organization.slug === 'admin'
                  )
  
  return isAdmin
}

/**
 * Get user role from Clerk
 */
export const getUserRole = (user: any): string => {
  if (!user) return 'user'
  
  return (user.publicMetadata?.role as string) || 'user'
}



