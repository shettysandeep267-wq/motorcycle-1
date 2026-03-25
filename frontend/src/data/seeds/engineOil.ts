import type { ProductSeed } from '../catalog.types'

const img = (id: string) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=1400&q=85`

export const ENGINE_OIL_PRODUCTS: ProductSeed[] = [
  {
    id: 'prod-oil-syn-1040',
    name: 'SynthPro MA2 10W-40 Fully Synthetic 4L',
    price: 2899,
    category: 'Engine oil',
    description:
      'JASO MA2 rated for wet clutches—protects cam journals through stop-go heat cycles.\nShear-stable polymers maintain grade between service intervals.',
    image: img('photo-1604227639211-38b6e2c73c0b'),
    stock: 60,
    specifications: '4 L. API SN. Wet clutch safe.',
  },
  {
    id: 'prod-oil-syn-530',
    name: 'RaceBlend 5W-30 Low-Ash Synthetic',
    price: 3199,
    category: 'Engine oil',
    description:
      'Low SAPS formulation where manufacturer allows thinner grades for cold starts.\nIdeal for modern liquid-cooled singles and parallel twins.',
    image: img('photo-1625047509168-a7026f36de04'),
    stock: 38,
    specifications: '1 L bottles also available.',
  },
  {
    id: 'prod-oil-semi-2040',
    name: 'CommuteGuard Semi-Synthetic 20W-40',
    price: 1299,
    category: 'Engine oil',
    description:
      'Budget-friendly blend for air-cooled commuters and older carbureted bikes.\nDetergent pack fights varnish in short-trip riding.',
    image: img('photo-1619767886558-efdc259cde1a'),
    stock: 72,
    specifications: '900 ml / 1 L options.',
  },
  {
    id: 'prod-oil-breakin',
    name: 'Factory Fill Mineral Break-In Oil 1L',
    price: 499,
    category: 'Engine oil',
    description:
      'Higher zinc additive pack for cam and ring bedding on fresh rebuilds.\nDrain at manufacturer interval before switching to synthetic.',
    image: img('photo-1486262715619-67b85e0b08d3'),
    stock: 88,
    specifications: 'Mineral. Not for catalytic converters long term.',
  },
  {
    id: 'prod-oil-vtwin',
    name: 'ThunderTwin 20W-50 V-Twin Synthetic',
    price: 2199,
    category: 'Engine oil',
    description:
      'Thick film strength for big-bore V-twins and shared sump gearbox designs.\nResists shear down when primary chain contaminates the oil.',
    image: img('photo-1523987355523-c7b5b0dd90a7'),
    stock: 44,
    specifications: '1 US quart / 946 ml.',
  },
  {
    id: 'prod-oil-filter-kit',
    name: 'Oil Service Kit with OEM-Style Filter',
    price: 1599,
    category: 'Engine oil',
    description:
      'Spin-on filter, crush washer, and correct grade oil in one box—fewer parts counter trips.\nFilter media matches OEM bypass pressure.',
    image: img('photo-1609639643509-4c3c6bcd1c7c'),
    stock: 50,
    specifications: 'Check bike-specific SKU.',
  },
]
