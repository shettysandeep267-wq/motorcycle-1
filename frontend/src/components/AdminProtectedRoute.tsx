import type { ReactNode } from 'react'
import { useEffect, useState } from 'react'
import { Navigate } from 'react-router-dom'
import { adminMe } from '../utils/api'

interface AdminProtectedRouteProps {
  children: ReactNode
}

export default function AdminProtectedRoute({ children }: AdminProtectedRouteProps) {
  const token = localStorage.getItem('admin_token')
  const [checking, setChecking] = useState(true)
  const [ok, setOk] = useState(false)

  useEffect(() => {
    let mounted = true
    const run = async () => {
      if (!token) {
        if (mounted) {
          setOk(false)
          setChecking(false)
        }
        return
      }
      try {
        await adminMe()
        if (mounted) setOk(true)
      } catch {
        localStorage.removeItem('admin_token')
        if (mounted) setOk(false)
      } finally {
        if (mounted) setChecking(false)
      }
    }
    run()
    return () => {
      mounted = false
    }
  }, [token])

  if (!token) return <Navigate to="/admin/login" replace />

  if (checking) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#ff7a00]" />
      </div>
    )
  }

  if (!ok) return <Navigate to="/admin/login" replace />

  return <>{children}</>
}

