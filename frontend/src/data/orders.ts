/** Types for orders & service requests stored in localStorage (see store). */

export type OrderStatus =
  | 'pending'
  | 'processing'
  | 'shipped'
  | 'completed'
  | 'cancelled'

export interface StoredOrderProductLine {
  productId: string
  name: string
  quantity: number
  price: number
}

export interface StoredOrder {
  _id: string
  userId: string
  customerName: string
  customerEmail: string
  paymentMethod: string
  products: StoredOrderProductLine[]
  totalPrice: number
  orderStatus: OrderStatus
  createdAt: string
}

export type ServiceRequestStatus =
  | 'pending'
  | 'in-progress'
  | 'completed'
  | 'cancelled'

export interface StoredServiceRequest {
  _id: string
  userId: string
  serviceId: string
  bookingDate: string
  customerName: string
  bikeModel: string
  serviceType: string
  status: ServiceRequestStatus
  createdAt: string
}
