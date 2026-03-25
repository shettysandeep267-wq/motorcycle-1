/**
 * Frontend-only API surface — no network calls. Data lives in localStorage via `src/data/store.ts`.
 * Response shape matches `{ data: T }` so existing pages stay unchanged.
 */
import {
  adminLoginApi,
  adminMeApi,
  cancelOrderApi,
  cancelServiceRequestApi,
  createOrderApi,
  createProductApi,
  createServiceApi,
  createServiceRequestApi,
  deleteProductApi,
  deleteServiceApi,
  getAdminDashboardApi,
  getCustomersApi,
  getInventoryApi,
  getOrdersApi,
  getOrdersByUserApi,
  getProductById,
  getProductsApi,
  getServiceBookingsApi,
  getServiceRequestsApi,
  getServiceRequestsByUserApi,
  getServicesApiForAdmin,
  syncClerkUser,
  updateInventoryApi,
  updateOrderApi,
  updateProductApi,
  updateServiceApi,
  updateServiceBookingStatusApi,
} from '../data/store'

const delay = () => Promise.resolve()

function ok<T>(data: T): Promise<{ data: T }> {
  return delay().then(() => ({ data }))
}

// Products
export const getProducts = () => ok(getProductsApi())
export const getProduct = (id: string) => {
  const p = getProductById(id)
  return delay().then(() => {
    if (!p) throw new Error('Product not found')
    return { data: p }
  })
}
export const createProduct = (data: Parameters<typeof createProductApi>[0]) =>
  ok(createProductApi(data))
export const updateProduct = (id: string, data: Parameters<typeof updateProductApi>[1]) =>
  ok(updateProductApi(id, data))
export const deleteProduct = (id: string) =>
  delay().then(() => {
    deleteProductApi(id)
    return { data: { ok: true } }
  })

/** Admin: duration is minutes (number). Customer pages should format for display. */
export const getServices = () =>
  ok(
    getServicesApiForAdmin().map((s) => ({
      _id: s._id,
      serviceName: s.serviceName,
      description: s.description,
      price: s.price,
      duration: s.duration,
      image: s.image,
      category: s.category ?? 'General',
    }))
  )
export const createService = (data: Parameters<typeof createServiceApi>[0]) => ok(createServiceApi(data))
export const updateService = (id: string, data: Parameters<typeof updateServiceApi>[1]) =>
  ok(updateServiceApi(id, data))
export const deleteService = (id: string) =>
  delay().then(() => {
    deleteServiceApi(id)
    return { data: { ok: true } }
  })

// Users (Clerk sync — local user record)
export const syncUser = (data: { clerkId: string; name?: string; email: string }) =>
  ok(syncClerkUser(data))

// Orders
export const getOrders = () => ok(getOrdersApi())
export const getOrdersByUser = (userId: string) => ok(getOrdersByUserApi(userId))
export const getOrder = (id: string) => {
  const list = getOrdersApi() as { _id: string }[]
  const o = list.find((x) => x._id === id)
  return delay().then(() => {
    if (!o) throw new Error('Order not found')
    return { data: o }
  })
}
export const createOrder = (data: Parameters<typeof createOrderApi>[0]) => ok(createOrderApi(data))
export const updateOrder = (id: string, data: { orderStatus?: string }) => ok(updateOrderApi(id, data))
export const cancelOrder = (id: string, data: { userId: string }) =>
  delay().then(() => {
    cancelOrderApi(id, data.userId)
    return { data: { ok: true } }
  })

// Legacy booking routes — not used by UI; kept for compatibility
export const bookService = (_data: unknown) => ok({ ok: true })
export const createBooking = (_data: unknown) => ok({ ok: true })
export const getBookingsByUser = (_userId: string) => ok([])
export const getServiceBookings = () => ok(getServiceBookingsApi())
export const updateServiceStatus = (id: string, data: { status: string }) =>
  ok(updateServiceBookingStatusApi(id, data))

// Customers & inventory
export const getCustomers = () => ok(getCustomersApi())
export const getInventory = () => ok(getInventoryApi())
export const updateInventory = (id: string, data: { stock: number }) =>
  ok(updateInventoryApi(id, data))

// Admin dashboard & service requests
export const getAdminDashboard = () => ok(getAdminDashboardApi())
export const getServiceRequests = () => ok(getServiceRequestsApi())
export const getServiceRequestsByUser = (userId: string) =>
  ok(getServiceRequestsByUserApi(userId))
export const createServiceRequest = (data: Parameters<typeof createServiceRequestApi>[0]) =>
  ok(createServiceRequestApi(data))
export const cancelServiceRequest = (id: string, data: { userId: string }) =>
  delay().then(() => {
    cancelServiceRequestApi(id, data.userId)
    return { data: { ok: true } }
  })

// Admin auth (JWT replaced by opaque mock token in localStorage)
export const adminLogin = (data: { adminId: string; password: string }) => {
  try {
    const { token } = adminLoginApi(data.adminId, data.password)
    return ok({ token })
  } catch (e) {
    return Promise.reject(e)
  }
}

export const adminMe = () => {
  const t = localStorage.getItem('admin_token')
  if (!t) return Promise.reject(new Error('Unauthorized'))
  return ok(adminMeApi())
}

