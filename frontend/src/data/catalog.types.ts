export interface ProductSeed {
  id: string
  name: string
  price: number
  category: string
  description: string
  image: string
  stock: number
  specifications?: string
}

export interface ServiceSeed {
  id: string
  name: string
  price: number
  description: string
  duration: string
  durationMinutes: number
  image: string
  category: string
}

export const PRODUCT_CATEGORY_ORDER = [
  'Helmets',
  'Tires',
  'Engine oil',
  'Brake pads',
  'Chains',
  'Batteries',
  'Accessories',
] as const

export const SERVICE_CATEGORY_ORDER = [
  'Oil change',
  'Full servicing',
  'Engine repair',
  'Brake repair',
  'Tire replacement',
  'Bike washing',
  'Custom modification',
] as const
