import type { ProductSeed } from '../catalog.types'

const img = (id: string) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=1400&q=85`

export const ACCESSORY_PRODUCTS: ProductSeed[] = [
  {
    id: 'prod-acc-tank-bag',
    name: 'MagMount Expandable Magnetic Tank Bag',
    price: 4499,
    category: 'Accessories',
    description:
      'Rare-earth magnets with scratch-free base for steel tanks—map pocket fits large phones.\nExpands for rain liner and gloves.',
    image: img('photo-1628527304949-56f8299ce4c3'),
    stock: 26,
    specifications: 'Not for plastic tanks.',
  },
  {
    id: 'prod-acc-phone',
    name: 'RAM-Style Fork Stem Phone Mount',
    price: 1899,
    category: 'Accessories',
    description:
      'Rubberised X-grip holds phones from 5.5–6.8" with vibration damping.\nStem cap bolt replaces stock hardware.',
    image: img('photo-1511707171634-5f897ff02aa9'),
    stock: 55,
    specifications: 'Check stem diameter.',
  },
  {
    id: 'prod-acc-heated-grip',
    name: 'DualZone Heated Grip Kit with Controller',
    price: 3299,
    category: 'Accessories',
    description:
      'Five heat steps per side for numb-finger mornings in the hills.\nGlue-on or clamp styles—follow included wiring diagram.',
    image: img('photo-1571008887538-b36bb32f4571'),
    stock: 20,
    specifications: '22 mm bars typical.',
  },
  {
    id: 'prod-acc-disk-lock',
    name: 'NeonAlert Disc Lock with Reminder Cable',
    price: 1299,
    category: 'Accessories',
    description:
      'Bright body deters opportunistic theft; 110 dB alarm on motion.\nFluorescent cable reminds you before rolling away.',
    image: img('photo-1558981033-0f030566a44c'),
    stock: 48,
    specifications: '6 mm pin. Carry pouch.',
  },
  {
    id: 'prod-acc-cover',
    name: 'StormShield Outdoor Bike Cover XL',
    price: 2199,
    category: 'Accessories',
    description:
      'Silver UV top layer reflects heat; heat-welded seams survive monsoon gusts.\nGrommets for lock chain routing.',
    image: img('photo-1558618666-fcd25c85cd64'),
    stock: 31,
    specifications: 'Fits most adventure bikes.',
  },
  {
    id: 'prod-acc-gps',
    name: 'RiderNav Waterproof GPS Mount Case',
    price: 999,
    category: 'Accessories',
    description:
      'Touch-through TPU window with sun hood for glare-free navigation.\nQuarter-turn mount fits common ball bases.',
    image: img('photo-1506905925346-21bda4d32df4'),
    stock: 62,
    specifications: 'Max phone 170 × 85 mm.',
  },
]
