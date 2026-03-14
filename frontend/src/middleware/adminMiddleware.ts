/**
 * Admin Middleware Utilities
 * 
 * This file contains utility functions for admin role checking
 * that can be used across the application
 */

import { User } from '@clerk/clerk-sdk-node'

/**
 * Check if a user has admin role
 * @param user - Clerk user object
 * @returns boolean indicating if user is admin
 */
export const isUserAdmin = (user: User | null): boolean => {
  if (!user) return false

  // Check publicMetadata for admin role
  const publicMetadata = user.publicMetadata as Record<string, any>
  
  return (
    publicMetadata?.role === 'admin' ||
    publicMetadata?.isAdmin === true ||
    false
  )
}

/**
 * Get user role from Clerk user object
 * @param user - Clerk user object
 * @returns string role name
 */
export const getUserRole = (user: User | null): string => {
  if (!user) return 'user'
  
  const publicMetadata = user.publicMetadata as Record<string, any>
  return (publicMetadata?.role as string) || 'user'
}

/**
 * Middleware function to verify admin access
 * Use this in your backend API routes
 */
export const requireAdmin = (user: User | null): boolean => {
  if (!user) {
    throw new Error('User not authenticated')
  }

  if (!isUserAdmin(user)) {
    throw new Error('Admin access required')
  }

  return true
}



