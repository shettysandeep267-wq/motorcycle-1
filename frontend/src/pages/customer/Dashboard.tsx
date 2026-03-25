import { useUser } from '@clerk/clerk-react'
import { Link } from 'react-router-dom'
import { Package, ShoppingCart, Wrench, Clock, ArrowUpRight } from 'lucide-react'
import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { getOrdersByUser, getServiceRequestsByUser, syncUser } from '../../utils/api'

interface Order {
  _id: string
  totalPrice: number
  orderStatus: string
  createdAt: string
}

interface ServiceBooking {
  _id: string
  serviceId?: { _id: string; serviceName?: string }
  serviceType?: string
  bikeModel?: string
  bookingDate: string
  status: string
}

const quickActions = [
  { to: '/products', label: 'Browse', title: 'Products', icon: Package },
  { to: '/cart', label: 'View', title: 'Cart', icon: ShoppingCart },
  { to: '/services', label: 'Book', title: 'Service', icon: Wrench },
  { to: '/orders', label: 'Track', title: 'Orders', icon: Clock },
] as const

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.08, delayChildren: 0.06 },
  },
}

const item = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0 },
}

export default function Dashboard() {
  const { user } = useUser()
  const [recentOrders, setRecentOrders] = useState<Order[]>([])
  const [upcomingServices, setUpcomingServices] = useState<ServiceBooking[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchDashboardData()
  }, [user])

  const fetchDashboardData = async () => {
    try {
      const email = user?.primaryEmailAddress?.emailAddress
      if (!user?.id || !email) {
        setRecentOrders([])
        setUpcomingServices([])
        return
      }

      const syncRes = await syncUser({
        clerkId: user.id,
        name: user.fullName ?? undefined,
        email,
      })
      const userId = syncRes.data?._id
      if (!userId) {
        setRecentOrders([])
        setUpcomingServices([])
        return
      }

      const [ordersRes, bookingsRes] = await Promise.all([
        getOrdersByUser(userId),
        getServiceRequestsByUser(userId),
      ])

      const orders = (ordersRes.data || []) as Order[]
      const bookings = (bookingsRes.data || []) as ServiceBooking[]

      setRecentOrders(orders.slice(0, 5))
      setUpcomingServices(
        bookings
          .filter((b) => {
            const s = (b.status || '').toLowerCase()
            return s === 'booked' || s === 'pending' || s === 'in-progress'
          })
          .slice(0, 3)
      )
    } catch (error) {
      console.error('Error fetching dashboard data:', error)
    } finally {
      setLoading(false)
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-emerald-500/15 text-emerald-300 border-emerald-500/25'
      case 'pending':
        return 'bg-amber-500/15 text-amber-200 border-amber-500/25'
      case 'in-progress':
        return 'bg-sky-500/15 text-sky-200 border-sky-500/25'
      default:
        return 'bg-white/10 text-white/70 border-white/15'
    }
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14 text-white">
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45 }}
        className="mb-10 sm:mb-12"
      >
        <p className="text-[#ff9a4d] text-xs font-bold uppercase tracking-[0.2em]">Your garage</p>
        <h1 className="mt-2 text-3xl sm:text-4xl font-extrabold tracking-tight">
          Welcome back,{' '}
          <span className="bg-gradient-to-r from-white to-white/70 bg-clip-text text-transparent">
            {user?.firstName || user?.emailAddresses[0]?.emailAddress}
          </span>
        </h1>
        <p className="mt-2 text-white/55 max-w-xl">Orders, cart, and workshop bookings in one glance.</p>
      </motion.div>

      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-10 sm:mb-12"
      >
        {quickActions.map((a) => {
          const Icon = a.icon
          return (
            <motion.div key={a.to} variants={item}>
              <Link
                to={a.to}
                className="group flex flex-col rounded-2xl border border-white/[0.1] bg-gradient-to-br from-white/[0.08] to-white/[0.02] p-5 sm:p-6 backdrop-blur-xl shadow-[0_20px_50px_-24px_rgba(0,0,0,0.65)] hover:border-[#ff7a00]/30 hover:shadow-[0_28px_56px_-20px_rgba(255,122,0,0.12)] transition-all duration-300 h-full"
              >
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <p className="text-white/45 text-xs font-semibold uppercase tracking-wider">{a.label}</p>
                    <p className="text-lg sm:text-xl font-bold text-white mt-1">{a.title}</p>
                  </div>
                  <div className="rounded-xl border border-[#ff7a00]/25 bg-[#ff7a00]/10 p-2">
                    <Icon className="w-5 h-5 sm:w-6 sm:h-6 text-[#ff9a4d]" />
                  </div>
                </div>
                <span className="mt-4 inline-flex items-center gap-1 text-xs font-semibold text-[#ff9a4d] opacity-0 group-hover:opacity-100 transition-opacity">
                  Open <ArrowUpRight className="w-3.5 h-3.5" />
                </span>
              </Link>
            </motion.div>
          )
        })}
      </motion.div>

      <div className="grid md:grid-cols-2 gap-5 sm:gap-6">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
          className="rounded-2xl border border-white/[0.1] bg-gradient-to-b from-white/[0.07] to-transparent p-6 sm:p-7 backdrop-blur-xl shadow-xl shadow-black/30"
        >
          <div className="flex justify-between items-center mb-5">
            <h2 className="text-lg font-bold text-white">Recent orders</h2>
            <Link
              to="/orders"
              className="text-sm font-bold text-[#ff9a4d] hover:text-[#ff7a00] inline-flex items-center gap-1"
            >
              View all <ArrowUpRight className="w-4 h-4" />
            </Link>
          </div>
          {loading ? (
            <div className="flex justify-center py-10">
              <div className="h-10 w-10 rounded-full border-2 border-[#ff7a00]/30 border-t-[#ff7a00] animate-spin" />
            </div>
          ) : recentOrders.length === 0 ? (
            <p className="text-white/45 text-sm py-6 text-center">No orders yet—start with the store.</p>
          ) : (
            <div className="space-y-3">
              {recentOrders.map((order) => (
                <div
                  key={order._id}
                  className="rounded-xl border border-white/[0.06] bg-black/25 px-4 py-3 hover:border-white/10 transition"
                >
                  <div className="flex justify-between items-center gap-3">
                    <div>
                      <p className="font-semibold text-white text-sm">
                        #{order._id.slice(-8).toUpperCase()}
                      </p>
                      <p className="text-xs text-white/45 mt-0.5">
                        {new Date(order.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-white tabular-nums">₹{(order.totalPrice ?? 0).toFixed(0)}</p>
                      <span
                        className={`inline-block mt-1 text-[10px] font-bold uppercase tracking-wide px-2 py-0.5 rounded-md border ${getStatusColor(order.orderStatus)}`}
                      >
                        {order.orderStatus}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="rounded-2xl border border-white/[0.1] bg-gradient-to-b from-white/[0.07] to-transparent p-6 sm:p-7 backdrop-blur-xl shadow-xl shadow-black/30"
        >
          <div className="flex flex-wrap justify-between items-center gap-3 mb-5">
            <h2 className="text-lg font-bold text-white">Upcoming services</h2>
            <div className="flex items-center gap-3 text-sm">
              <Link to="/service-bookings" className="text-white/50 hover:text-white font-semibold">
                History
              </Link>
              <Link
                to="/services"
                className="font-bold text-[#ff9a4d] hover:text-[#ff7a00] inline-flex items-center gap-1"
              >
                Book <ArrowUpRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
          {loading ? (
            <div className="flex justify-center py-10">
              <div className="h-10 w-10 rounded-full border-2 border-[#ff7a00]/30 border-t-[#ff7a00] animate-spin" />
            </div>
          ) : upcomingServices.length === 0 ? (
            <p className="text-white/45 text-sm py-6 text-center">No upcoming bookings.</p>
          ) : (
            <div className="space-y-3">
              {upcomingServices.map((booking) => (
                <div
                  key={booking._id}
                  className="rounded-xl border border-white/[0.06] bg-black/25 px-4 py-3 hover:border-white/10 transition"
                >
                  <div className="flex justify-between items-start gap-3">
                    <div>
                      <p className="font-semibold text-white text-sm">
                        {booking.serviceType ?? booking.serviceId?.serviceName ?? 'Service'}
                      </p>
                      {booking.bikeModel ? (
                        <p className="text-xs text-white/45 mt-0.5">Bike: {booking.bikeModel}</p>
                      ) : null}
                      <p className="text-xs text-white/45 mt-1">
                        {new Date(booking.bookingDate).toLocaleString(undefined, {
                          dateStyle: 'medium',
                          timeStyle: 'short',
                        })}
                      </p>
                    </div>
                    <span
                      className={`shrink-0 text-[10px] font-bold uppercase tracking-wide px-2 py-0.5 rounded-md border ${getStatusColor(booking.status)}`}
                    >
                      {booking.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </motion.div>
      </div>
    </div>
  )
}
