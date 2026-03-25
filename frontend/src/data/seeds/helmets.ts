import type { ProductSeed } from '../catalog.types'

const img = (id: string) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=1400&q=85`

export const HELMET_PRODUCTS: ProductSeed[] = [
  {
    id: 'prod-helm-apex-ece',
    name: 'Apex Rider ECE 22.06 Full-Face Helmet',
    price: 8999,
    category: 'Helmets',
    description:
      'Track-inspired shell with Pinlock-ready visor, emergency cheek pad release, and multi-density EPS for progressive impact absorption.\nWind-tunnel tuned spoilers reduce buffeting on naked bikes and supersports alike.',
    image: img('photo-1558981806-52713904695b'),
    stock: 22,
    specifications: 'ECE 22.06. Weight ~1.48 kg. Sizes XS–XXL.',
  },
  {
    id: 'prod-helm-urban-flip',
    name: 'Urban Glide Flip-Up Modular Helmet',
    price: 6499,
    category: 'Helmets',
    description:
      'P/J certified chin bar with one-hand release—ideal for city commutes and quick fuel stops without removing your lid.\nBuilt-in sun visor and anti-bacterial liner keep comfort high in humid weather.',
    image: img('photo-1558981033-0f030566a44c'),
    stock: 28,
    specifications: 'Polycarbonate shell. Micrometric buckle.',
  },
  {
    id: 'prod-helm-carbon-track',
    name: 'Veloce Carbon Track Day Helmet',
    price: 18999,
    category: 'Helmets',
    description:
      'Hand-laid carbon fibre shell keeps mass low while meeting the same safety standards as pro racing helmets.\nWide eye port fits popular tear-offs; hydration hose routing compatible with endurance kits.',
    image: img('photo-1571008887538-b36bb32f4571'),
    stock: 9,
    specifications: 'Snell M2020D / ECE. Double-D ring.',
  },
  {
    id: 'prod-helm-retro-open',
    name: 'Heritage Open-Face Cruiser Helmet',
    price: 4299,
    category: 'Helmets',
    description:
      'Classic 3/4 profile with faux-leather trim and removable peak for café racers and bobbers.\nDense cheek pads and plush headliner make long highway stretches surprisingly comfortable.',
    image: img('photo-1595433707802-92b2625d81b8'),
    stock: 34,
    specifications: 'DOT. Includes bubble visor.',
  },
  {
    id: 'prod-helm-adventure-dual',
    name: 'Horizon Dual-Sport Peak Helmet',
    price: 11299,
    category: 'Helmets',
    description:
      'Oversized chin venting and removable peak for mixed on-road and light off-road duty.\nGoggle-friendly eye port and Fidlock magnetic strap for gloved hands.',
    image: img('photo-1568772585407-9361d9bf916b'),
    stock: 16,
    specifications: 'Peak & liner tool-free removable.',
  },
  {
    id: 'prod-helm-youth-mx',
    name: 'Junior MX-Style Youth Helmet',
    price: 3499,
    category: 'Helmets',
    description:
      'Sized for young riders with the same ventilation philosophy as adult dirt helmets.\nBright graphics improve visibility at the track; washable liner handles muddy weekends.',
    image: img('photo-1552519507-da3b142c6e3d'),
    stock: 40,
    specifications: 'Youth S–L. ECE youth category.',
  },
]
