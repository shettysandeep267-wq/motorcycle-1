import axios from 'axios'

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api'

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
})

// Request interceptor to add auth token (if using Clerk backend)
// To use Clerk tokens, call getToken() from useAuth() hook in components
// and pass it as a header in individual API calls
api.interceptors.request.use(
  async (config) => {
    // Admin JWT (for /admin dashboard access)
    const adminToken = localStorage.getItem('admin_token')
    if (adminToken) {
      config.headers.Authorization = `Bearer ${adminToken}`
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

// Response interceptor for error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Handle unauthorized access
      console.error('Unauthorized access')
    }
    return Promise.reject(error)
  }
)

// Products
export const getProducts = () => api.get('/products')
export const getProduct = (id: string) => api.get(`/products/${id}`)
export const createProduct = (data: any) => api.post('/products', data)
export const updateProduct = (id: string, data: any) => api.put(`/products/${id}`, data)
export const deleteProduct = (id: string) => api.delete(`/products/${id}`)

// Services
export const getServices = () => api.get('/services')
export const createService = (data: any) => api.post('/services', data)
export const updateService = (id: string, data: any) => api.put(`/services/${id}`, data)
export const deleteService = (id: string) => api.delete(`/services/${id}`)

// Users sync (for booking)
export const syncUser = (data: { clerkId: string; name?: string; email: string }) =>
  api.post('/users/sync', data)

// Orders
export const getOrders = () => api.get('/orders')
export const getOrdersByUser = (userId: string) => api.get(`/orders/user/${userId}`)
export const getOrder = (id: string) => api.get(`/orders/${id}`)
export const createOrder = (data: any) => api.post('/orders', data)
export const updateOrder = (id: string, data: any) => api.put(`/orders/${id}`, data)
export const cancelOrder = (id: string, data: { userId: string }) => api.post(`/orders/${id}/cancel`, data)

// Services Booking (legacy)
export const bookService = (data: any) => api.post('/services/book', data)
// Booking API
export const createBooking = (data: { userId: string; serviceId: string; bookingDate: string; status?: string }) =>
  api.post('/booking', data)
export const getBookingsByUser = (userId: string) => api.get(`/booking/user/${userId}`)
export const getServiceBookings = () => api.get('/services/bookings')
export const updateServiceStatus = (id: string, data: any) => api.put(`/services/bookings/${id}`, data)

// Customers
export const getCustomers = () => api.get('/customers')

// Inventory
export const getInventory = () => api.get('/inventory')
export const updateInventory = (id: string, data: any) => api.put(`/inventory/${id}`, data)

// Admin Dashboard
export const getAdminDashboard = () => api.get('/admin/dashboard')

// Admin auth
export const adminLogin = (data: { adminId: string; password: string }) =>
  api.post('/admin/auth/login', data)
export const adminMe = () => api.get('/admin/auth/me')

// Service requests (admin)
export const getServiceRequests = () => api.get('/service-requests')
export const getServiceRequestsByUser = (userId: string) => api.get(`/service-requests/user/${userId}`)
export const createServiceRequest = (data: {
  userId: string
  serviceId: string
  bookingDate: string
  customerName: string
  serviceType: string
  bikeModel: string
  status?: string
}) => api.post('/service-requests', data)
export const cancelServiceRequest = (id: string, data: { userId: string }) =>
  api.post(`/service-requests/${id}/cancel`, data)

export default api

