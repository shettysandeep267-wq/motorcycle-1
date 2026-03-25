import type { ProductSeed } from '../catalog.types'

const img = (id: string) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=1400&q=85`

export const BATTERY_PRODUCTS: ProductSeed[] = [
  {
    id: 'prod-batt-lifepo4',
    name: 'LithiumPro 12V LiFePO4 Lightweight Battery',
    price: 8999,
    category: 'Batteries',
    description:
      'Up to 70% lighter than lead-acid—easier flick starts on tall dirt bikes.\nBuilt-in BMS protects from over-discharge when accessories drain overnight.',
    image: img('photo-1619406559346-1690fcd05804'),
    stock: 15,
    specifications: 'CCA per size chart. BMS protected.',
  },
  {
    id: 'prod-batt-agm',
    name: 'PowerCell AGM Maintenance-Free 12V9Ah',
    price: 3299,
    category: 'Batteries',
    description:
      'Absorbed glass mat design resists vibration on bad roads and unpaved shortcuts.\nSealed—mount at modest angles.',
    image: img('photo-1597424210664-1d9d1b2c97f3'),
    stock: 33,
    specifications: 'YTX9-BS equivalent common.',
  },
  {
    id: 'prod-batt-gel',
    name: 'GelRide Deep-Cycle 12V12Ah',
    price: 4199,
    category: 'Batteries',
    description:
      'Gel electrolyte reduces stratification on bikes with heavy accessory loads.\nSlower self-discharge for occasional weekend riders.',
    image: img('photo-1616423641348-2769747938c7'),
    stock: 22,
    specifications: 'Verify terminal layout vs tray.',
  },
  {
    id: 'prod-batt-tender',
    name: 'SmartPulse 4-Stage Battery Tender',
    price: 2499,
    category: 'Batteries',
    description:
      'Float maintenance mode keeps chemistry healthy during storage months.\nSpark-proof leads and reverse polarity protection.',
    image: img('photo-1625047509168-a7026f36de04'),
    stock: 40,
    specifications: '12V lead-acid & AGM.',
  },
  {
    id: 'prod-batt-terminal',
    name: 'Anti-Corrosion Brass Terminal Kit',
    price: 299,
    category: 'Batteries',
    description:
      'Marine-grade grease and felt washers fight green corrosion in humid coast cities.\nFits most Japanese bolt patterns.',
    image: img('photo-1580310614729-ccd69652491d'),
    stock: 70,
    specifications: 'Washers + grease tub.',
  },
  {
    id: 'prod-batt-jump',
    name: 'MicroBoost Lithium Jump Pack',
    price: 5999,
    category: 'Batteries',
    description:
      'Pocketable pack starts parallel twins when the main battery gives up mid-tour.\nUSB-C PD out charges phones fast.',
    image: img('photo-1549317661-bd32c8ce0db2'),
    stock: 18,
    specifications: 'Peak amps on label.',
  },
]
