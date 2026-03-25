import { HELMET_PRODUCTS } from './helmets'
import { TIRE_PRODUCTS } from './tires'
import { ENGINE_OIL_PRODUCTS } from './engineOil'
import { BRAKE_PAD_PRODUCTS } from './brakePads'
import { CHAIN_PRODUCTS } from './chains'
import { BATTERY_PRODUCTS } from './batteries'
import { ACCESSORY_PRODUCTS } from './accessories'
import type { ProductSeed } from '../catalog.types'

export const ALL_SEED_PRODUCTS: ProductSeed[] = [
  ...HELMET_PRODUCTS,
  ...TIRE_PRODUCTS,
  ...ENGINE_OIL_PRODUCTS,
  ...BRAKE_PAD_PRODUCTS,
  ...CHAIN_PRODUCTS,
  ...BATTERY_PRODUCTS,
  ...ACCESSORY_PRODUCTS,
]

export { SEED_SERVICES_LIST } from './servicesCatalog'
