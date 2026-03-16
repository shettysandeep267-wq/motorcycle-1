import { useState, useEffect } from 'react'
import { getOrders, updateOrder } from '../../utils/api'
import toast from 'react-hot-toast'
import { Package, CheckCircle, Clock, XCircle, Truck, ShoppingCart } from 'lucide-react'

interface OrderItem {
  productId?: { _id: string; name?: string }
  quantity: number
  price: number
}

interface Order {
  _id: string
  userId?: { _id: string; name?: string; email?: string }
  products: OrderItem[]
  totalPrice: number
  orderStatus: string
  createdAt: string
}

export default function AdminOrders() {
  const [orders, setOrders] = useState<Order[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchOrders()
  }, [])

  const fetchOrders = async () => {
    try {
      const response = await getOrders()
      setOrders(response.data || [])
    } catch (error) {
      console.error('Error fetching orders:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleUpdateStatus = async (id: string, orderStatus: string) => {
    try {
      await updateOrder(id, { orderStatus })
      fetchOrders()
      toast.success('Order status updated')
    } catch (error) {
      console.error('Error updating order:', error)
      toast.error('Failed to update order status')
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="w-5 h-5 text-green-600" />
      case 'pending':
        return <Clock className="w-5 h-5 text-amber-500" />
      case 'cancelled':
        return <XCircle className="w-5 h-5 text-red-600" />
      case 'processing':
        return <Package className="w-5 h-5 text-blue-600" />
      case 'shipped':
        return <Truck className="w-5 h-5 text-violet-600" />
      default:
        return <ShoppingCart className="w-5 h-5 text-gray-500" />
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-green-50 text-green-700 border-green-200'
      case 'pending':
        return 'bg-amber-50 text-amber-700 border-amber-200'
      case 'cancelled':
        return 'bg-red-50 text-red-700 border-red-200'
      case 'processing':
        return 'bg-blue-50 text-blue-700 border-blue-200'
      case 'shipped':
        return 'bg-violet-50 text-violet-700 border-violet-200'
      default:
        return 'bg-gray-50 text-gray-700 border-gray-200'
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600" />
      </div>
    )
  }

  return (
    <div className="space-y-8">
      <div className="flex items-center gap-3">
        <div className="p-2 rounded-lg bg-emerald-50">
          <ShoppingCart className="w-6 h-6 text-emerald-600" />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Orders</h1>
          <p className="text-sm text-gray-500">View and update order status</p>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-100">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  Order ID
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  Customer
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  Items
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  Total
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  Date
                </th>
                <th className="px-6 py-3 text-right text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  Update
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {orders.map((order) => (
                <tr key={order._id} className="hover:bg-gray-50/50">
                  <td className="px-6 py-4">
                    <span className="font-mono text-sm text-gray-600">
                      {order._id.slice(-8).toUpperCase()}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div>
                      <p className="font-medium text-gray-900">
                        {order.userId?.name ?? 'Guest'}
                      </p>
                      {order.userId?.email && (
                        <p className="text-sm text-gray-500">{order.userId.email}</p>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="space-y-1">
                      {order.products?.map((item, idx) => (
                        <div key={idx} className="text-sm text-gray-600">
                          {typeof item.productId === 'object' && item.productId?.name
                            ? item.productId.name
                            : 'Product'}{' '}
                          × {item.quantity} — ₹{(item.price * item.quantity).toFixed(0)}
                        </div>
                      ))}
                    </div>
                  </td>
                  <td className="px-6 py-4 font-semibold text-gray-900">
                    ₹{order.totalPrice?.toFixed(0) ?? '0'}
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium border ${getStatusColor(
                        order.orderStatus
                      )}`}
                    >
                      {getStatusIcon(order.orderStatus)}
                      {order.orderStatus}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500">
                    {new Date(order.createdAt).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 text-right">
                    <select
                      value={order.orderStatus}
                      onChange={(e) => handleUpdateStatus(order._id, e.target.value)}
                      className="border border-gray-200 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    >
                      <option value="pending">Pending</option>
                      <option value="processing">Processing</option>
                      <option value="shipped">Shipped</option>
                      <option value="completed">Completed</option>
                      <option value="cancelled">Cancelled</option>
                    </select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {orders.length === 0 && (
          <div className="text-center py-12 text-gray-500">No orders found.</div>
        )}
      </div>
    </div>
  )
}
