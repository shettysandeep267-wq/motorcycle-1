import { useUser } from '@clerk/clerk-react'
import { Link } from 'react-router-dom'
import { Package, ShoppingCart, Wrench, Clock } from 'lucide-react'
import { useState, useEffect } from 'react'
import { getOrders, getServiceBookings } from '../../utils/api'

interface Order {
  _id: string
  orderNumber: string
  total: number
  status: string
  createdAt: string
}

interface ServiceBooking {
  _id: string
  service: {
    name: string
  }
  date: string
  time: string
  status: string
}

export default function Dashboard() {
  const { user } = useUser()
  const [recentOrders, setRecentOrders] = useState<Order[]>([])
  const [upcomingServices, setUpcomingServices] = useState<ServiceBooking[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchDashboardData()
  }, [])

  const fetchDashboardData = async () => {
    try {
      const [ordersRes, servicesRes] = await Promise.all([
        getOrders(),
        getServiceBookings(),
      ])
      
      // Filter orders for current user (in real app, backend should filter)
      setRecentOrders(ordersRes.data.slice(0, 5))
      setUpcomingServices(servicesRes.data.filter((s: ServiceBooking) => 
        s.status === 'pending' || s.status === 'in-progress'
      ).slice(0, 3))
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
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">
          Welcome back, {user?.firstName || user?.emailAddresses[0]?.emailAddress}!
        </h1>
        <p className="mt-2 text-gray-600">Here's an overview of your account</p>
      </div>

      {/* Quick Actions */}
      <div className="grid md:grid-cols-4 gap-6 mb-8">
        <Link
          to="/products"
          className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm mb-1">Browse</p>
              <p className="text-xl font-semibold">Products</p>
            </div>
            <Package className="w-8 h-8 text-blue-600" />
          </div>
        </Link>
        <Link
          to="/cart"
          className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm mb-1">View</p>
              <p className="text-xl font-semibold">Cart</p>
            </div>
            <ShoppingCart className="w-8 h-8 text-blue-600" />
          </div>
        </Link>
        <Link
          to="/services"
          className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm mb-1">Book</p>
              <p className="text-xl font-semibold">Service</p>
            </div>
            <Wrench className="w-8 h-8 text-blue-600" />
          </div>
        </Link>
        <Link
          to="/orders"
          className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm mb-1">Track</p>
              <p className="text-xl font-semibold">Orders</p>
            </div>
            <Clock className="w-8 h-8 text-blue-600" />
          </div>
        </Link>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {/* Recent Orders */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">Recent Orders</h2>
            <Link to="/orders" className="text-blue-600 hover:underline text-sm">
              View All
            </Link>
          </div>
          {loading ? (
            <p className="text-gray-600">Loading...</p>
          ) : recentOrders.length === 0 ? (
            <p className="text-gray-600">No orders yet</p>
          ) : (
            <div className="space-y-3">
              {recentOrders.map((order) => (
                <div key={order._id} className="border-b pb-3 last:border-0">
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="font-medium">Order #{order.orderNumber}</p>
                      <p className="text-sm text-gray-600">
                        {new Date(order.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold">${order.total.toFixed(2)}</p>
                      <span className={`text-xs px-2 py-1 rounded ${getStatusColor(order.status)}`}>
                        {order.status}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Upcoming Services */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">Upcoming Services</h2>
            <Link to="/services" className="text-blue-600 hover:underline text-sm">
              Book More
            </Link>
          </div>
          {loading ? (
            <p className="text-gray-600">Loading...</p>
          ) : upcomingServices.length === 0 ? (
            <p className="text-gray-600">No upcoming services</p>
          ) : (
            <div className="space-y-3">
              {upcomingServices.map((booking) => (
                <div key={booking._id} className="border-b pb-3 last:border-0">
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="font-medium">{booking.service.name}</p>
                      <p className="text-sm text-gray-600">
                        {new Date(booking.date).toLocaleDateString()} at {booking.time}
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



