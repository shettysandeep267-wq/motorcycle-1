import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import {
  Package,
  ShoppingCart,
  Users,
  Wrench,
  DollarSign,
  Calendar,
  ArrowRight,
  TrendingUp,
} from 'lucide-react'
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
} from 'recharts'
import { getAdminDashboard, getOrders } from '../../utils/api'

const STATUS_COLORS: Record<string, string> = {
  pending: '#eab308',
  processing: '#3b82f6',
  shipped: '#8b5cf6',
  completed: '#22c55e',
  cancelled: '#ef4444',
}

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    products: 0,
    orders: 0,
    services: 0,
    users: 0,
    bookings: 0,
    totalRevenue: 0,
  })
  const [ordersByStatus, setOrdersByStatus] = useState<{ _id: string; count: number }[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchDashboard()
  }, [])

  const fetchDashboard = async () => {
    try {
      const [dashboardRes, ordersRes] = await Promise.all([
        getAdminDashboard(),
        getOrders(),
      ])
      const d = dashboardRes.data
      const totalRevenue = (ordersRes.data || []).reduce(
        (sum: number, o: { totalPrice?: number }) => sum + (o.totalPrice || 0),
        0
      )
      setStats({
        products: d.products ?? 0,
        orders: d.orders ?? 0,
        services: d.services ?? 0,
        users: d.users ?? 0,
        bookings: d.bookings ?? 0,
        totalRevenue,
      })
      setOrdersByStatus(Array.isArray(d.ordersByStatus) ? d.ordersByStatus : [])
    } catch (error) {
      console.error('Error fetching dashboard:', error)
    } finally {
      setLoading(false)
    }
  }

  const chartData = ordersByStatus.map((item) => ({
    name: item._id.charAt(0).toUpperCase() + item._id.slice(1),
    count: item.count,
    fill: STATUS_COLORS[item._id] || '#94a3b8',
  }))

  const statCards = [
    {
      title: 'Products',
      value: stats.products,
      icon: Package,
      link: '/admin/products',
      color: 'bg-blue-500',
      light: 'bg-blue-50',
      text: 'text-blue-600',
    },
    {
      title: 'Orders',
      value: stats.orders,
      icon: ShoppingCart,
      link: '/admin/orders',
      color: 'bg-emerald-500',
      light: 'bg-emerald-50',
      text: 'text-emerald-600',
    },
    {
      title: 'Revenue',
      value: `$${stats.totalRevenue.toFixed(2)}`,
      icon: DollarSign,
      link: '/admin/orders',
      color: 'bg-violet-500',
      light: 'bg-violet-50',
      text: 'text-violet-600',
    },
    {
      title: 'Services',
      value: stats.services,
      icon: Wrench,
      link: '/admin/services',
      color: 'bg-amber-500',
      light: 'bg-amber-50',
      text: 'text-amber-600',
    },
    {
      title: 'Bookings',
      value: stats.bookings,
      icon: Calendar,
      link: '/admin/services',
      color: 'bg-rose-500',
      light: 'bg-rose-50',
      text: 'text-rose-600',
    },
    {
      title: 'Users',
      value: stats.users,
      icon: Users,
      link: '/admin/customers',
      color: 'bg-cyan-500',
      light: 'bg-cyan-50',
      text: 'text-cyan-600',
    },
  ]

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600" />
      </div>
    )
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-500 mt-1">Overview of your motorcycle shop</p>
      </div>

      {/* Stat cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
        {statCards.map((stat) => {
          const Icon = stat.icon
          return (
            <Link
              key={stat.title}
              to={stat.link}
              className="bg-white rounded-xl shadow-sm border border-gray-100 p-5 hover:shadow-md hover:border-gray-200 transition-all group"
            >
              <div className="flex items-start justify-between">
                <div className={`p-2.5 rounded-lg ${stat.light}`}>
                  <Icon className={`w-6 h-6 ${stat.text}`} />
                </div>
                <ArrowRight className="w-4 h-4 text-gray-300 group-hover:text-gray-500 group-hover:translate-x-0.5 transition" />
              </div>
              <p className="text-2xl font-bold text-gray-900 mt-3">{stat.value}</p>
              <p className="text-sm text-gray-500 mt-0.5">{stat.title}</p>
            </Link>
          )
        })}
      </div>

      {/* Charts row */}
      <div className="grid lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-center gap-2 mb-6">
            <TrendingUp className="w-5 h-5 text-blue-600" />
            <h2 className="text-lg font-semibold text-gray-900">Orders by Status</h2>
          </div>
          {chartData.length > 0 ? (
            <ResponsiveContainer width="100%" height={280}>
              <BarChart data={chartData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                <XAxis dataKey="name" tick={{ fontSize: 12 }} stroke="#64748b" />
                <YAxis tick={{ fontSize: 12 }} stroke="#64748b" />
                <Tooltip
                  contentStyle={{ borderRadius: '8px', border: '1px solid #e2e8f0' }}
                  formatter={(value: number) => [value, 'Orders']}
                />
                <Bar dataKey="count" radius={[4, 4, 0, 0]}>
                  {chartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.fill} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          ) : (
            <div className="h-[280px] flex items-center justify-center text-gray-400">
              No order data yet
            </div>
          )}
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-6">Order Status Distribution</h2>
          {chartData.length > 0 ? (
            <ResponsiveContainer width="100%" height={280}>
              <PieChart>
                <Pie
                  data={chartData}
                  dataKey="count"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius={90}
                  label={({ name, count }) => `${name}: ${count}`}
                >
                  {chartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.fill} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{ borderRadius: '8px', border: '1px solid #e2e8f0' }}
                  formatter={(value: number, name: string) => [value, name]}
                />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          ) : (
            <div className="h-[280px] flex items-center justify-center text-gray-400">
              No order data yet
            </div>
          )}
        </div>
      </div>

      {/* Quick actions */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h2>
        <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-4">
          <Link
            to="/admin/products"
            className="flex items-center gap-3 p-4 rounded-lg border border-gray-100 hover:bg-gray-50 hover:border-blue-200 transition"
          >
            <Package className="w-5 h-5 text-blue-600" />
            <span className="font-medium">Add Product</span>
          </Link>
          <Link
            to="/admin/services"
            className="flex items-center gap-3 p-4 rounded-lg border border-gray-100 hover:bg-gray-50 hover:border-amber-200 transition"
          >
            <Wrench className="w-5 h-5 text-amber-600" />
            <span className="font-medium">Manage Services</span>
          </Link>
          <Link
            to="/admin/orders"
            className="flex items-center gap-3 p-4 rounded-lg border border-gray-100 hover:bg-gray-50 hover:border-emerald-200 transition"
          >
            <ShoppingCart className="w-5 h-5 text-emerald-600" />
            <span className="font-medium">View Orders</span>
          </Link>
          <Link
            to="/admin/inventory"
            className="flex items-center gap-3 p-4 rounded-lg border border-gray-100 hover:bg-gray-50 hover:border-violet-200 transition"
          >
            <Package className="w-5 h-5 text-violet-600" />
            <span className="font-medium">Manage Inventory</span>
          </Link>
        </div>
      </div>
    </div>
  )
}
