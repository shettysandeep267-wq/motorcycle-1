import type { ProductSeed } from '../catalog.types'

const img = (id: string) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=1400&q=85`

export const CHAIN_PRODUCTS: ProductSeed[] = [
  {
    id: 'prod-chain-520-xring',
    name: 'X-Ring 520 Chain 120 Links Gold',
    price: 3499,
    category: 'Chains',
    description:
      'X-ring seals retain factory grease longer than O-ring designs in dusty conditions.\nPre-stretched and shot-peened plates for fatigue resistance.',
    image: img('photo-1609639643509-4c3c6bcd1c7c'),
    stock: 30,
    specifications: 'Includes clip master link.',
  },
  {
    id: 'prod-chain-530-oring',
    name: 'HeavyTour O-Ring 530 Chain',
    price: 4199,
    category: 'Chains',
    description:
      'Thicker side plates for big-bore tourers and cruisers carrying luggage.\nQuad-staked rivet pins resist side loading.',
    image: img('photo-1519750157634-b6d493a0f77f'),
    stock: 21,
    specifications: '530 pitch. Cut to length.',
  },
  {
    id: 'prod-chain-kit-520',
    name: 'QuickDrive 520 Chain & Sprocket Kit',
    price: 5899,
    category: 'Chains',
    description:
      'Matched front and rear sprockets with correct chain length for your gearing choice.\nHardened steel sprockets resist hooking.',
    image: img('photo-1568772585407-9361d9bf916b'),
    stock: 17,
    specifications: 'Select tooth counts at checkout notes.',
  },
  {
    id: 'prod-chain-lube',
    name: 'AllWeather Teflon Chain Lube 400ml',
    price: 399,
    category: 'Chains',
    description:
      'Dries to a non-flick film—less mess on your rim and swingarm.\nRepels dust after monsoon washes.',
    image: img('photo-1558981806-52713904695b'),
    stock: 120,
    specifications: 'O-ring safe.',
  },
  {
    id: 'prod-chain-cleaner',
    name: 'Foam Blast Chain Degreaser 500ml',
    price: 349,
    category: 'Chains',
    description:
      'Clinging foam lifts grit before you scrub with a brush—reduces grind paste wear.\nBiodegradable surfactants.',
    image: img('photo-1503376780353-7e6692767b70'),
    stock: 85,
    specifications: 'Use before re-lubing.',
  },
  {
    id: 'prod-chain-tool',
    name: 'ProRivet Chain Breaker & Rivet Tool',
    price: 1899,
    category: 'Chains',
    description:
      'Presses rivet pins to factory flare depth for ZJ and RJ master links.\nHardened anvils won’t mushroom soft pins.',
    image: img('photo-1601584115197-04ecc0da31d7'),
    stock: 25,
    specifications: '520–530 compatible.',
  },
]
