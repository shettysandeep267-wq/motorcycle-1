import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { adminLogin } from '../../utils/api'
import toast from 'react-hot-toast'

export default function AdminLogin() {
  const navigate = useNavigate()
  const [credentials, setCredentials] = useState({
    adminId: '',
    password: '',
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const res = await adminLogin(credentials)
      const token = res.data?.token
      if (!token) {
        toast.error('Login failed')
        return
      }
      localStorage.setItem('admin_token', token)
      toast.success('Admin login successful')
      navigate('/admin/dashboard')
    } catch (err: any) {
      toast.error(err?.response?.data?.message || 'Invalid admin ID or password')
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0a0a0a] px-4">
      <div className="max-w-md w-full bg-black/40 border border-white/10 rounded-xl shadow-lg p-8 text-white">
        <h2 className="text-2xl font-extrabold mb-6 text-center">Admin Login</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block mb-2 text-white/80 font-semibold">Admin ID</label>
            <input
              type="text"
              value={credentials.adminId}
              onChange={(e) => setCredentials({ ...credentials, adminId: e.target.value })}
              className="w-full border border-white/10 bg-white/5 rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-[#ff7a00]"
              required
            />
          </div>
          <div>
            <label className="block mb-2 text-white/80 font-semibold">Password</label>
            <input
              type="password"
              value={credentials.password}
              onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
              className="w-full border border-white/10 bg-white/5 rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-[#ff7a00]"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-[#ff7a00] text-black px-4 py-2 rounded-lg font-semibold hover:brightness-110 transition"
          >
            Login
          </button>
        </form>
        <p className="mt-4 text-sm text-white/60 text-center">
          Use your Admin ID and password to access the dashboard.
        </p>
      </div>
    </div>
  )
}

