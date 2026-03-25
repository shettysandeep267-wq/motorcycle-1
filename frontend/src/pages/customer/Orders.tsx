import { useState, useEffect } from 'react'
import { useUser } from '@clerk/clerk-react'
import { getOrdersByUser, getOrders, cancelOrder, syncUser } from '../../utils/api'
import { Package, CheckCircle, Clock, XCircle, Truck, ShoppingCart } from 'lucide-react'
import PageSkeleton from '../../components/PageSkeleton'
import toast from 'react-hot-toast'

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

export default function Orders() {
  const { user } = useUser()
  const [orders, setOrders] = useState<Order[]>([])
  const [loading, setLoading] = useState(true)
  const [cancellingId, setCancellingId] = useState<string | null>(null)

  useEffect(() => {
    fetchOrders()
  }, [user])

  const fetchOrders = async () => {
    try {
      let response
      if (user?.id && user?.primaryEmailAddress?.emailAddress) {
        try {
          const syncRes = await syncUser({
            clerkId: user.id,
            name: user.fullName ?? undefined,
            email: user.primaryEmailAddress.emailAddress,
          })
          const userId = syncRes.data?._id
          if (userId) {
            response = await getOrdersByUser(userId)
          } else {
            response = await getOrders()
          }
        } catch {
          response = await getOrders()
        }
      } else {
        response = await getOrders()
      }
      setOrders(response.data || [])
    } catch (error) {
      console.error('Error fetching orders:', error)
      toast.error('Failed to load order history')
      setOrders([])
    } finally {
      setLoading(false)
    }
  }

  const handleCancel = async (orderId: string) => {
    if (!user?.id || !user?.primaryEmailAddress?.emailAddress) {
      toast.error('Please sign in')
      return
    }
    setCancellingId(orderId)
    try {
      const syncRes = await syncUser({
        clerkId: user.id,
        name: user.fullName ?? undefined,
        email: user.primaryEmailAddress.emailAddress,
      })
      const userId = syncRes.data?._id
      if (!userId) {
        toast.error('Could not verify your account')
        return
      }
      await cancelOrder(orderId, { userId })
      toast.success('Order cancelled')
      await fetchOrders()
    } catch (err: unknown) {
      toast.error(err instanceof Error ? err.message : 'Failed to cancel order')
    } finally {
      setCancellingId(null)
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0" />
      case 'pending':
        return <Clock className="w-5 h-5 text-amber-500 flex-shrink-0" />
      case 'cancelled':
        return <XCircle className="w-5 h-5 text-red-600 flex-shrink-0" />
      case 'processing':
        return <Package className="w-5 h-5 text-blue-600 flex-shrink-0" />
      case 'shipped':
        return <Truck className="w-5 h-5 text-violet-600 flex-shrink-0" />
      default:
        return <ShoppingCart className="w-5 h-5 text-gray-500 flex-shrink-0" />
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-green-100 text-green-800'
      case 'pending':
        return 'bg-amber-100 text-amber-800'
      case 'cancelled':
        return 'bg-red-100 text-red-800'
      case 'processing':
        return 'bg-blue-100 text-blue-800'
      case 'shipped':
        return 'bg-violet-100 text-violet-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  if (loading) {
    return <PageSkeleton lines={6} />
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-10">
      <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">Order History</h1>
      <p className="text-gray-500 mb-6 sm:mb-8">View and track your orders</p>

      {orders.length === 0 ? (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8 sm:p-12 text-center">
          <Package className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <p className="text-gray-600 mb-2">You have no orders yet</p>
          <p className="text-sm text-gray-500">Orders you place will appear here.</p>
        </div>
      ) : (
        <div className="space-y-4 sm:space-y-6">
          {orders.map((order) => (
            <div
              key={order._id}
              className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 sm:p-6"
            >
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-3 mb-4">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">
                    Order #{order._id.slice(-8).toUpperCase()}
                  </h3>
                  <p className="text-sm text-gray-500">
                    {new Date(order.createdAt).toLocaleDateString(undefined, {
                      dateStyle: 'medium',
                    })}
                  </p>
                </div>
                <span
                  className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-medium w-fit ${getStatusColor(
                    order.orderStatus
                  )}`}
                >
                  {getStatusIcon(order.orderStatus)}
                  {order.orderStatus}
                </span>
              </div>

              <div className="border-t border-gray-100 pt-4">
                <div className="space-y-2 mb-4">
                  {order.products?.map((item, index) => (
                    <div
                      key={index}
                      className="flex justify-between text-sm text-gray-600"
                    >
                      <span>
                        {typeof item.productId === 'object' && item.productId?.name
                          ? item.productId.name
                          : 'Product'}{' '}
                        × {item.quantity}
                      </span>
                      <span>₹{(item.price * item.quantity).toFixed(0)}</span>
                    </div>
                  ))}
                </div>
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3 border-t border-gray-100 pt-3">
                  <div className="flex items-center justify-between sm:justify-start gap-3">
                    <span className="font-semibold text-gray-900">Total</span>
                    <span className="text-lg font-bold text-blue-600">
                      ₹{(order.totalPrice ?? 0).toFixed(0)}
                    </span>
                  </div>
                  {(order.orderStatus === 'pending' || order.orderStatus === 'processing') && (
                    <button
                      onClick={() => handleCancel(order._id)}
                      disabled={cancellingId === order._id}
                      className="sm:w-auto w-full px-4 py-2 rounded-lg font-semibold border border-red-200 text-red-700 hover:bg-red-50 disabled:opacity-60"
                    >
                      {cancellingId === order._id ? 'Cancelling…' : 'Cancel Order'}
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
