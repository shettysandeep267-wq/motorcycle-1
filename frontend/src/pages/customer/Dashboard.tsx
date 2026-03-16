import { useUser } from '@clerk/clerk-react'
import { Link } from 'react-router-dom'
import { Package, ShoppingCart, Wrench, Clock } from 'lucide-react'
import { useState, useEffect } from 'react'
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

      // ensure we have a Mongo User record and use its _id for filtering
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
        return 'bg-green-100 text-green-800'
      case 'pending':
        return 'bg-yellow-100 text-yellow-800'
      case 'in-progress':
        return 'bg-blue-100 text-blue-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 text-white">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white">
          Welcome back, {user?.firstName || user?.emailAddresses[0]?.emailAddress}!
        </h1>
        <p className="mt-2 text-white/65">Here's an overview of your account</p>
      </div>

      {/* Quick Actions */}
      <div className="grid md:grid-cols-4 gap-6 mb-8">
        <Link
          to="/products"
          className="bg-black/40 border border-white/10 rounded-xl shadow-lg p-6 hover:shadow-2xl hover:-translate-y-1 transition"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-white/60 text-sm mb-1">Browse</p>
              <p className="text-xl font-semibold text-white">Products</p>
            </div>
            <Package className="w-8 h-8 text-[#ff7a00]" />
          </div>
        </Link>
        <Link
          to="/cart"
          className="bg-black/40 border border-white/10 rounded-xl shadow-lg p-6 hover:shadow-2xl hover:-translate-y-1 transition"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-white/60 text-sm mb-1">View</p>
              <p className="text-xl font-semibold text-white">Cart</p>
            </div>
            <ShoppingCart className="w-8 h-8 text-[#ff7a00]" />
          </div>
        </Link>
        <Link
          to="/services"
          className="bg-black/40 border border-white/10 rounded-xl shadow-lg p-6 hover:shadow-2xl hover:-translate-y-1 transition"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-white/60 text-sm mb-1">Book</p>
              <p className="text-xl font-semibold text-white">Service</p>
            </div>
            <Wrench className="w-8 h-8 text-[#ff7a00]" />
          </div>
        </Link>
        <Link
          to="/orders"
          className="bg-black/40 border border-white/10 rounded-xl shadow-lg p-6 hover:shadow-2xl hover:-translate-y-1 transition"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-white/60 text-sm mb-1">Track</p>
              <p className="text-xl font-semibold text-white">Orders</p>
            </div>
            <Clock className="w-8 h-8 text-[#ff7a00]" />
          </div>
        </Link>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {/* Recent Orders */}
        <div className="bg-black/40 border border-white/10 rounded-xl shadow-lg p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold text-white">Recent Orders</h2>
            <Link to="/orders" className="text-[#ff7a00] hover:opacity-90 text-sm font-semibold">
              View All
            </Link>
          </div>
          {loading ? (
            <p className="text-white/60">Loading...</p>
          ) : recentOrders.length === 0 ? (
            <p className="text-white/60">No orders yet</p>
          ) : (
            <div className="space-y-3">
              {recentOrders.map((order) => (
                <div key={order._id} className="border-b border-white/10 pb-3 last:border-0">
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="font-medium text-white">
                        Order #{order._id.slice(-8).toUpperCase()}
                      </p>
                      <p className="text-sm text-white/60">
                        {new Date(order.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold text-white">₹{(order.totalPrice ?? 0).toFixed(0)}</p>
                      <span
                        className={`text-xs px-2 py-1 rounded ${getStatusColor(order.orderStatus)}`}
                      >
                        {order.orderStatus}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Upcoming Services */}
        <div className="bg-black/40 border border-white/10 rounded-xl shadow-lg p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold text-white">Upcoming Services</h2>
            <div className="flex items-center gap-4">
              <Link to="/service-bookings" className="text-white/70 hover:text-white text-sm font-semibold">
                View All
              </Link>
              <Link to="/services" className="text-[#ff7a00] hover:opacity-90 text-sm font-semibold">
                Book More
              </Link>
            </div>
          </div>
          {loading ? (
            <p className="text-white/60">Loading...</p>
          ) : upcomingServices.length === 0 ? (
            <p className="text-white/60">No upcoming services</p>
          ) : (
            <div className="space-y-3">
              {upcomingServices.map((booking) => (
                <div key={booking._id} className="border-b border-white/10 pb-3 last:border-0">
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="font-medium text-white">
                        {booking.serviceType ?? booking.serviceId?.serviceName ?? 'Service'}
                      </p>
                      {booking.bikeModel ? (
                        <p className="text-sm text-white/60">Bike: {booking.bikeModel}</p>
                      ) : null}
                      <p className="text-sm text-white/60">
                        {new Date(booking.bookingDate).toLocaleString(undefined, {
                          dateStyle: 'medium',
                          timeStyle: 'short',
                        })}
                      </p>
                    </div>
                    <span className={`text-xs px-2 py-1 rounded ${getStatusColor(booking.status)}`}>
                      {booking.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}



