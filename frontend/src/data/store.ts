/**
 * Client-side persistence for the frontend-only Motorcycle app.
 * All reads/writes go through localStorage so changes survive reloads.
 */
import { SEED_PRODUCTS } from './products'
import { SEED_SERVICES } from './services'
import type {
  OrderStatus,
  ServiceRequestStatus,
  StoredOrder,
  StoredServiceRequest,
} from './orders'

export type StoreUpdateKind = 'products' | 'services' | 'orders' | 'serviceRequests'

const LS = {
  products: 'motorcycle_mock_products_v5',
  services: 'motorcycle_mock_services_v5',
  orders: 'motorcycle_mock_orders_v1',
  serviceRequests: 'motorcycle_mock_service_requests_v1',
  users: 'motorcycle_mock_users_v1',
} as const

/** localStorage keys for product/service catalogs — used for cross-tab sync */
export const CATALOG_LOCALSTORAGE_KEYS = {
  products: LS.products,
  services: LS.services,
} as const

export interface ProductDoc {
  _id: string
  name: string
  description: string
  price: number
  category?: string
  image?: string
  stock: number
  specifications?: string
}

export interface ServiceDoc {
  _id: string
  serviceName: string
  description: string
  price: number
  /** Minutes — admin UI */
  duration: number
  image?: string
  category?: string
}

export interface UserRecord {
  _id: string
  clerkId: string
  email: string
  name?: string
  createdAt: string
}

function safeParse<T>(raw: string | null, fallback: T): T {
  if (!raw) return fallback
  try {
    const v = JSON.parse(raw) as T
    return v ?? fallback
  } catch {
    return fallback
  }
}

function saveJson(key: string, value: unknown) {
  try {
    localStorage.setItem(key, JSON.stringify(value))
  } catch {
    /* ignore quota */
  }
}

function notify(kind: StoreUpdateKind) {
  if (typeof window === 'undefined') return
  window.dispatchEvent(
    new CustomEvent('motorcycle_store_update', {
      detail: { kind },
    })
  )
}

function clerkToUserId(clerkId: string): string {
  const safe = clerkId.replace(/[^a-zA-Z0-9_-]/g, '').slice(0, 48)
  return `usr_${safe || 'guest'}`
}

function seedProducts(): ProductDoc[] {
  return SEED_PRODUCTS.map((p) => ({
    _id: p.id,
    name: p.name,
    description: p.description,
    price: p.price,
    category: p.category,
    image: p.image,
    stock: p.stock,
    specifications: p.specifications,
  }))
}

function seedServices(): ServiceDoc[] {
  return SEED_SERVICES.map((s) => ({
    _id: s.id,
    serviceName: s.name,
    description: s.description,
    price: s.price,
    duration: s.durationMinutes,
    image: s.image,
    category: s.category,
  }))
}

export function getProductDocs(): ProductDoc[] {
  const raw = localStorage.getItem(LS.products)
  if (!raw) {
    const initial = seedProducts()
    saveJson(LS.products, initial)
    return initial
  }
  const parsed = safeParse<ProductDoc[]>(raw, [])
  if (!Array.isArray(parsed) || parsed.length === 0) {
    const initial = seedProducts()
    saveJson(LS.products, initial)
    return initial
  }
  return parsed
}

function setProductDocs(products: ProductDoc[]) {
  saveJson(LS.products, products)
  notify('products')
}

export function getServiceDocs(): ServiceDoc[] {
  const raw = localStorage.getItem(LS.services)
  if (!raw) {
    const initial = seedServices()
    saveJson(LS.services, initial)
    return initial
  }
  const parsed = safeParse<ServiceDoc[]>(raw, [])
  if (!Array.isArray(parsed) || parsed.length === 0) {
    const initial = seedServices()
    saveJson(LS.services, initial)
    return initial
  }
  return parsed
}

function setServiceDocs(services: ServiceDoc[]) {
  saveJson(LS.services, services)
  notify('services')
}

function getOrdersInternal(): StoredOrder[] {
  return safeParse<StoredOrder[]>(localStorage.getItem(LS.orders), [])
}

function setOrdersInternal(orders: StoredOrder[]) {
  saveJson(LS.orders, orders)
  notify('orders')
}

function getServiceRequestsInternal(): StoredServiceRequest[] {
  return safeParse<StoredServiceRequest[]>(localStorage.getItem(LS.serviceRequests), [])
}

function setServiceRequestsInternal(rows: StoredServiceRequest[]) {
  saveJson(LS.serviceRequests, rows)
  notify('serviceRequests')
}

function getUsersMap(): Record<string, UserRecord> {
  return safeParse<Record<string, UserRecord>>(localStorage.getItem(LS.users), {})
}

function setUsersMap(m: Record<string, UserRecord>) {
  saveJson(LS.users, m)
}

export function syncClerkUser(input: {
  clerkId: string
  email: string
  name?: string
}): UserRecord {
  const map = getUsersMap()
  const existing = Object.values(map).find((u) => u.clerkId === input.clerkId)
  if (existing) {
    existing.email = input.email
    if (input.name) existing.name = input.name
    map[existing._id] = existing
    setUsersMap(map)
    return existing
  }
  const rec: UserRecord = {
    _id: clerkToUserId(input.clerkId),
    clerkId: input.clerkId,
    email: input.email,
    name: input.name,
    createdAt: new Date().toISOString(),
  }
  map[rec._id] = rec
  setUsersMap(map)
  return rec
}

/** API shape for product list/detail */
export function toApiProduct(p: ProductDoc): ProductDoc {
  return { ...p }
}

export function getProductsApi(): ProductDoc[] {
  return getProductDocs().map(toApiProduct)
}

export function getProductById(id: string): ProductDoc | undefined {
  return getProductDocs().find((p) => p._id === id)
}

export function createProductApi(data: {
  name: string
  description: string
  price: number
  stock: number
  image?: string
  category?: string
}) {
  const products = getProductDocs()
  const _id = `prod_${Date.now()}_${Math.random().toString(36).slice(2, 9)}`
  products.push({
    _id,
    name: data.name,
    description: data.description,
    price: data.price,
    stock: data.stock,
    image: data.image || '',
    category: data.category || 'Accessories',
  })
  setProductDocs(products)
  return toApiProduct(products[products.length - 1])
}

export function updateProductApi(
  id: string,
  data: {
    name: string
    description: string
    price: number
    stock: number
    image?: string
    category?: string
  }
) {
  const products = getProductDocs()
  const i = products.findIndex((p) => p._id === id)
  if (i === -1) throw new Error('Product not found')
  products[i] = {
    ...products[i],
    ...data,
    image: data.image ?? products[i].image,
    category: data.category ?? products[i].category ?? 'Accessories',
  }
  setProductDocs(products)
  return toApiProduct(products[i])
}

export function deleteProductApi(id: string) {
  setProductDocs(getProductDocs().filter((p) => p._id !== id))
}

export function getServicesApiForAdmin(): ServiceDoc[] {
  return getServiceDocs()
}

export function createServiceApi(data: {
  serviceName: string
  description: string
  price: number
  duration: number
  category?: string
  image?: string
}) {
  const list = getServiceDocs()
  const _id = `svc_${Date.now()}_${Math.random().toString(36).slice(2, 9)}`
  list.push({
    _id,
    serviceName: data.serviceName,
    description: data.description,
    price: data.price,
    duration: data.duration,
    category: data.category ?? 'Oil change',
    image: data.image ?? '',
  })
  setServiceDocs(list)
  return list[list.length - 1]
}

export function updateServiceApi(
  id: string,
  data: {
    serviceName: string
    description: string
    price: number
    duration: number
    category?: string
    image?: string
  }
) {
  const list = getServiceDocs()
  const i = list.findIndex((s) => s._id === id)
  if (i === -1) throw new Error('Service not found')
  const next: ServiceDoc = {
    ...list[i],
    serviceName: data.serviceName,
    description: data.description,
    price: data.price,
    duration: data.duration,
  }
  if (data.category !== undefined) next.category = data.category
  if (data.image !== undefined) next.image = data.image
  list[i] = next
  setServiceDocs(list)
  return list[i]
}

export function deleteServiceApi(id: string) {
  setServiceDocs(getServiceDocs().filter((s) => s._id !== id))
}

export function createOrderApi(payload: {
  userId: string
  customerName: string
  customerEmail: string
  paymentMethod: string
  products: { productId: string; quantity: number; price: number }[]
  totalPrice: number
}): StoredOrder {
  const products = getProductDocs()
  const lines: StoredOrder['products'] = []
  for (const line of payload.products) {
    const p = products.find((x) => x._id === line.productId)
    const name = p?.name ?? 'Product'
    lines.push({
      productId: line.productId,
      name,
      quantity: line.quantity,
      price: line.price,
    })
    if (p) {
      p.stock = Math.max(0, p.stock - line.quantity)
    }
  }
  setProductDocs(products)

  const order: StoredOrder = {
    _id: `ord_${Date.now()}_${Math.random().toString(36).slice(2, 9)}`,
    userId: payload.userId,
    customerName: payload.customerName,
    customerEmail: payload.customerEmail,
    paymentMethod: payload.paymentMethod,
    products: lines,
    totalPrice: payload.totalPrice,
    orderStatus: 'pending',
    createdAt: new Date().toISOString(),
  }
  const orders = getOrdersInternal()
  orders.unshift(order)
  setOrdersInternal(orders)
  return order
}

function orderToApi(o: StoredOrder): any {
  return {
    _id: o._id,
    userId: { _id: o.userId, name: o.customerName, email: o.customerEmail },
    products: o.products.map((line) => ({
      productId: { _id: line.productId, name: line.name },
      quantity: line.quantity,
      price: line.price,
    })),
    totalPrice: o.totalPrice,
    orderStatus: o.orderStatus,
    createdAt: o.createdAt,
  }
}

export function getOrdersApi(): any[] {
  return getOrdersInternal().map(orderToApi)
}

export function getOrdersByUserApi(userId: string): any[] {
  return getOrdersInternal()
    .filter((o) => o.userId === userId)
    .map(orderToApi)
}

export function updateOrderApi(id: string, data: { orderStatus?: OrderStatus | string }) {
  const orders = getOrdersInternal()
  const i = orders.findIndex((o) => o._id === id)
  if (i === -1) throw new Error('Order not found')
  if (data.orderStatus) orders[i].orderStatus = data.orderStatus as OrderStatus
  setOrdersInternal(orders)
  return orderToApi(orders[i])
}

export function cancelOrderApi(orderId: string, userId: string) {
  const orders = getOrdersInternal()
  const o = orders.find((x) => x._id === orderId)
  if (!o) throw new Error('Order not found')
  if (o.userId !== userId) throw new Error('Not allowed')
  o.orderStatus = 'cancelled'
  setOrdersInternal(orders)
}

export function createServiceRequestApi(input: {
  userId: string
  serviceId: string
  bookingDate: string
  customerName: string
  bikeModel: string
  serviceType: string
  status?: ServiceRequestStatus
}): StoredServiceRequest {
  const row: StoredServiceRequest = {
    _id: `sr_${Date.now()}_${Math.random().toString(36).slice(2, 9)}`,
    userId: input.userId,
    serviceId: input.serviceId,
    bookingDate: input.bookingDate,
    customerName: input.customerName,
    bikeModel: input.bikeModel,
    serviceType: input.serviceType,
    status: input.status ?? 'pending',
    createdAt: new Date().toISOString(),
  }
  const all = getServiceRequestsInternal()
  all.unshift(row)
  setServiceRequestsInternal(all)
  return row
}

function requestToApi(r: StoredServiceRequest): any {
  const svc = getServiceDocs().find((s) => s._id === r.serviceId)
  const user = Object.values(getUsersMap()).find((u) => u._id === r.userId)
  return {
    _id: r._id,
    userId: user
      ? { _id: user._id, name: user.name, email: user.email }
      : { _id: r.userId },
    serviceId: svc
      ? { _id: svc._id, serviceName: svc.serviceName }
      : { _id: r.serviceId, serviceName: r.serviceType },
    serviceType: r.serviceType,
    bikeModel: r.bikeModel,
    customerName: r.customerName,
    bookingDate: r.bookingDate,
    status: r.status,
    createdAt: r.createdAt,
  }
}

export function getServiceRequestsApi(): any[] {
  return getServiceRequestsInternal().map(requestToApi)
}

export function getServiceRequestsByUserApi(userId: string): any[] {
  return getServiceRequestsInternal()
    .filter((r) => r.userId === userId)
    .map(requestToApi)
}

export function cancelServiceRequestApi(id: string, userId: string) {
  const rows = getServiceRequestsInternal()
  const r = rows.find((x) => x._id === id)
  if (!r) throw new Error('Booking not found')
  if (r.userId !== userId) throw new Error('Not allowed')
  r.status = 'cancelled'
  setServiceRequestsInternal(rows)
}

export function updateServiceBookingStatusApi(id: string, data: { status: string }) {
  const rows = getServiceRequestsInternal()
  const r = rows.find((x) => x._id === id)
  if (!r) throw new Error('Booking not found')
  r.status = data.status as ServiceRequestStatus
  setServiceRequestsInternal(rows)
}

/** Legacy admin “service bookings” list — same data as service requests */
export function getServiceBookingsApi(): any[] {
  return getServiceRequestsApi()
}

export function getInventoryApi(): any[] {
  const products = getProductDocs()
  const now = new Date().toISOString()
  return products.map((p) => ({
    _id: `inv_${p._id}`,
    product: { _id: p._id, name: p.name },
    stock: p.stock,
    lowStockThreshold: 5,
    lastUpdated: now,
  }))
}

export function updateInventoryApi(invId: string, data: { stock: number }) {
  const productId = invId.startsWith('inv_') ? invId.slice(4) : invId
  const products = getProductDocs()
  const p = products.find((x) => x._id === productId)
  if (!p) throw new Error('Inventory item not found')
  p.stock = Math.max(0, data.stock)
  setProductDocs(products)
}

export function getCustomersApi(): any[] {
  const users = Object.values(getUsersMap())
  const orders = getOrdersInternal()
  return users.map((u) => ({
    _id: u._id,
    name: u.name || u.email.split('@')[0],
    email: u.email,
    phone: '',
    createdAt: u.createdAt,
    totalOrders: orders.filter((o) => o.userId === u._id).length,
  }))
}

export function getAdminDashboardApi() {
  const products = getProductDocs()
  const orders = getOrdersInternal()
  const services = getServiceDocs()
  const users = Object.keys(getUsersMap()).length
  const bookings = getServiceRequestsInternal().length

  const statusCount: Record<string, number> = {}
  for (const o of orders) {
    statusCount[o.orderStatus] = (statusCount[o.orderStatus] || 0) + 1
  }
  const ordersByStatus = Object.entries(statusCount).map(([k, count]) => ({
    _id: k,
    count,
  }))

  return {
    products: products.length,
    orders: orders.length,
    services: services.length,
    users,
    bookings,
    ordersByStatus,
  }
}

export function adminLoginApi(adminId: string, password: string): { token: string } {
  if (adminId === 'admin' && password === 'admin123') {
    return { token: `mock_admin_${Date.now()}` }
  }
  throw new Error('Invalid admin ID or password')
}

export function adminMeApi(): { ok: boolean } {
  return { ok: true }
}
