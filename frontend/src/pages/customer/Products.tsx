import { useEffect, useMemo, useState } from 'react'
import toast from 'react-hot-toast'
import { getProducts } from '../../utils/api'
import ProductCard from '../../components/ProductCard'
import ProductCardSkeleton from '../../components/ProductCardSkeleton'
import { useCart } from '../../context/CartContext'

interface Product {
  _id: string
  name: string
  description: string
  price: number
  category?: string
  image?: string
  stock: number
}

const FALLBACK_PRODUCTS: Product[] = [
  {
    _id: 'fallback-1',
    name: 'Premium Brake Pad',
    description: 'High-performance brake pads for superior stopping power in all conditions.',
    price: 1200,
    image: '/images/brake-pad.jpg',
    category: 'Brakes',
    stock: 20,
  },
  {
    _id: 'fallback-2',
    name: 'Fully Synthetic Engine Oil',
    description: 'Premium fully synthetic engine oil for smoother rides and longer engine life.',
    price: 900,
    image: '/images/engine-oil.jpg',
    category: 'Oil',
    stock: 50,
  },
  {
    _id: 'fallback-3',
    name: 'Motorcycle Chain Kit',
    description: 'Durable chain kit engineered for reliable power delivery.',
    price: 1800,
    image: '/images/motorcycle-chain.jpg',
    category: 'Chain',
    stock: 15,
  },
  {
    _id: 'fallback-4',
    name: 'Front Tire',
    description: 'High grip front tire for better road control.',
    price: 3200,
    image: '/images/front-tire.jpg',
    category: 'Tire',
    stock: 10,
  },
  {
    _id: 'fallback-5',
    name: 'LED Headlight',
    description: 'Ultra-bright LED headlight for improved night visibility.',
    price: 2100,
    image: '/images/head-light.jpg',
    category: 'Lights',
    stock: 25,
  },
]

export default function Products() {
  const { addToCart } = useCart()
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)

  const fetchProducts = async () => {
    try {
      const res = await getProducts()
      const data = (res.data || []) as Product[]
      if (data.length === 0) {
        setProducts(FALLBACK_PRODUCTS)
        toast('Showing sample products (no products found in DB)')
      } else {
        setProducts(data)
      }
    } catch (err) {
      console.error('Error fetching products:', err)
      setProducts(FALLBACK_PRODUCTS)
      toast.error('Failed to load products, showing sample products instead')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchProducts()
  }, [])

  const handleAddToCart = (p: Product) => {
    addToCart({ id: p._id, name: p.name, price: p.price, image: p.image }, 1)
    toast.success(`${p.name} added to cart`)
  }

  const grid = useMemo(
    () => 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6',
    []
  )

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-10 text-white">
        <div className="h-9 bg-white/10 rounded w-56 animate-pulse mb-6" />
        <div className={grid}>
          {Array.from({ length: 8 }).map((_, i) => (
            <ProductCardSkeleton key={i} />
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-10 text-white">
      <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-white mb-2">
        Motorcycle Products
      </h1>
      <p className="text-white/65 mb-6 sm:mb-8 max-w-2xl">
        Browse premium motorcycle parts with transparent pricing and fast checkout.
      </p>

      <div className={grid}>
        {products.map((p) => (
          <ProductCard key={p._id} product={p} onAddToCart={handleAddToCart} />
        ))}
      </div>

      {products.length === 0 ? (
        <div className="text-center py-12 sm:py-16 bg-white/5 rounded-xl shadow-sm border border-white/10 mt-6">
          <p className="text-white font-semibold mb-1">No products available</p>
          <p className="text-white/60">Please check back soon for new arrivals.</p>
        </div>
      ) : null}
    </div>
  )
}