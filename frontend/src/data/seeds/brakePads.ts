import type { ProductSeed } from '../catalog.types'

const img = (id: string) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=1400&q=85`

export const BRAKE_PAD_PRODUCTS: ProductSeed[] = [
  {
    id: 'prod-brake-sinter-front',
    name: 'SinterMax Front Brake Pad Set',
    price: 1399,
    category: 'Brake pads',
    description:
      'High-friction sintered compound for strong wet and dry bite on stainless rotors.\nIncludes anti-squeal shims where the caliper design allows.',
    image: img('photo-1580310614729-ccd69652491d'),
    stock: 46,
    specifications: 'One axle set. Check caliper model.',
  },
  {
    id: 'prod-brake-ceramic-rear',
    name: 'CeramiQuiet Rear Organic Pads',
    price: 999,
    category: 'Brake pads',
    description:
      'Low dust and low noise for daily commuters who prioritise smooth stops.\nGentle on rotors—ideal for smaller rear discs.',
    image: img('photo-1601362840469-51e4d8d58785'),
    stock: 52,
    specifications: 'Organic compound. Bedding required.',
  },
  {
    id: 'prod-brake-ss-scooter',
    name: 'ScootStop Sintered Scooter Pads',
    price: 749,
    category: 'Brake pads',
    description:
      'Compact pad shape for leading-link and floating scooter calipers.\nHolds performance in monsoon spray and flooded city streets.',
    image: img('photo-1621905251918-48416bd8575a'),
    stock: 66,
    specifications: 'Fits many 110–125 cc models.',
  },
  {
    id: 'prod-brake-race-ebc',
    name: 'TrackLine HH Sintered Racing Pads',
    price: 2499,
    category: 'Brake pads',
    description:
      'HH-rated friction for track days and canyon runs when stock pads fade.\nRequires rotor temperature awareness—street noise may increase.',
    image: img('photo-1593941707874-ef5410c5ef69'),
    stock: 19,
    specifications: 'Race use. Inspect rotors often.',
  },
  {
    id: 'prod-brake-fluid-dot4',
    name: 'HyperBoil DOT 4 Racing Brake Fluid 500ml',
    price: 449,
    category: 'Brake pads',
    description:
      'High dry boiling point for spirited riding and mountain descents.\nReplace every 2 years or after track events.',
    image: img('photo-1581092160562-40aa08f20a70'),
    stock: 95,
    specifications: 'DOT 4. Do not mix with mineral oil systems.',
  },
  {
    id: 'prod-brake-line-kit',
    name: 'Steel-Flex Braided Front Line Kit',
    price: 4299,
    category: 'Brake pads',
    description:
      'Stainless braided hose with PVC jacket reduces expansion for firmer lever feel.\nIncludes banjo bolts and copper washers.',
    image: img('photo-1518611012118-696072aa579a'),
    stock: 12,
    specifications: 'Bike-specific lengths.',
  },
]
