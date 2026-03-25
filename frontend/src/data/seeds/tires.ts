import type { ProductSeed } from '../catalog.types'

const img = (id: string) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=1400&q=85`

export const TIRE_PRODUCTS: ProductSeed[] = [
  {
    id: 'prod-tire-sport-r3',
    name: 'Phantom R-S3 Hypersport Radial Rear',
    price: 11299,
    category: 'Tires',
    description:
      'Dual-compound rear with aggressive shoulder siping for knee-down sessions and fast road riding.\nSilica-rich blend stays predictable in light rain without sacrificing dry grip.',
    image: img('photo-1558618666-fcd25c85cd64'),
    stock: 18,
    specifications: 'Example: 180/55ZR17. Tubeless.',
  },
  {
    id: 'prod-tire-tour-gt',
    name: 'MileCraft GT Touring Front Tire',
    price: 7899,
    category: 'Tires',
    description:
      'Deep central groove evacuates water on monsoon highways while a harder centre strip resists flat spotting.\nStable under full luggage loads and two-up touring.',
    image: img('photo-1605559424843-9e4c228bf1c2'),
    stock: 24,
    specifications: 'Example: 120/70ZR17.',
  },
  {
    id: 'prod-tire-scooter-pair',
    name: 'CityGrip Scooter All-Weather Pair',
    price: 4599,
    category: 'Tires',
    description:
      'Matched front and rear kit for 125–150 cc scooters with wet-grip silica.\nLow rolling resistance helps electric conversions preserve range.',
    image: img('photo-1549317661-bd32c8ce0db2'),
    stock: 55,
    specifications: 'Common: 90/90-12 & 100/90-12.',
  },
  {
    id: 'prod-tire-knobby-soft',
    name: 'Terrain King Soft-Terrain Knobby',
    price: 6899,
    category: 'Tires',
    description:
      'Tall flexible knobs bite loam and sand while a reinforced carcass resists pinch flats on rocky climbs.\nPredictable breakaway when you lean into ruts on enduro loops.',
    image: img('photo-1449426468159-96d0a4513769'),
    stock: 14,
    specifications: '90/90-21 front pattern.',
  },
  {
    id: 'prod-tire-cold-nord',
    name: 'NordGrip Cold-Weather Commuter Tire',
    price: 8299,
    category: 'Tires',
    description:
      'Siping stays flexible near freezing; compound chosen for dewy mountain roads.\nNot studded—pair with cautious riding on true black ice.',
    image: img('photo-1471443675138-891af78efb50'),
    stock: 11,
    specifications: 'Pair pricing. Check fitment.',
  },
  {
    id: 'prod-tire-cruiser-ww',
    name: 'IronLine Wide White-Wall Cruiser Rear',
    price: 13499,
    category: 'Tires',
    description:
      'Wide carcass supports heavy tourers with white-wall aesthetic for classic builds.\nSteel belts resist cupping on long straight highways.',
    image: img('photo-1492144534655-ae79c964c9d7'),
    stock: 8,
    specifications: '200/55R17 style fitments.',
  },
]
