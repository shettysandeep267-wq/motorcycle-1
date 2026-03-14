import { useState, useEffect, useMemo } from 'react'
import { getProducts } from '../../utils/api'
import ProductCard from '../../components/ProductCard'
import ProductCardSkeleton from '../../components/ProductCardSkeleton'
import { Search, Filter } from 'lucide-react'
import toast from 'react-hot-toast'

interface Product {
  _id: string
  name: string
  description: string
  price: number
  image?: string
  category?: string
  stock: number
}

const CATEGORIES = [
  { value: 'all', label: 'All' },
  { value: 'engine', label: 'Engine' },
  { value: 'body', label: 'Body Parts' },
  { value: 'accessories', label: 'Accessories' },
  { value: 'general', label: 'General' },
]

const FALLBACK_PRODUCTS: Product[] = [
  {
    _id: 'fallback-1',
    name: 'Premium Brake Pad',
    description: 'High-performance brake pads for superior stopping power in all conditions.',
    price: 1200,
    image: 'https://images.unsplash.com/photo-1580310614729-ccd69652491d?auto=format&fit=crop&w=900&q=80',
    category: 'engine',
    stock: 20,
  },
  {
    _id: 'fallback-2',
    name: 'Fully Synthetic Engine Oil',
    description: 'Premium fully synthetic engine oil for smoother rides and longer engine life.',
    price: 900,
    image: 'https://images.unsplash.com/photo-1604227639211-38b6e2c73c0b?auto=format&fit=crop&w=900&q=80',
    category: 'engine',
    stock: 50,
  },
  {
    _id: 'fallback-3',
    name: 'Motorcycle Chain Kit',
    description: 'Durable chain kit engineered for reliable power delivery.',
    price: 1800,
    image: 'https://images.unsplash.com/photo-1515775538093-d2dd73ffc4cc?auto=format&fit=crop&w=900&q=80',
    category: 'body',
    stock: 15,
  },
  {
    _id: 'fallback-4',
    name: 'All-Weather Front Tire',
    description: 'All-weather tire with excellent grip on both wet and dry roads.',
    price: 3200,
    image: 'https://images.unsplash.com/photo-1518655048521-f130df041f66?auto=format&fit=crop&w=900&q=80',
    category: 'body',
    stock: 10,
  },
  {
    _id: 'fallback-5',
    name: 'LED Headlight Upgrade',
    description: 'Ultra-bright LED headlight for improved night visibility and style.',
    price: 2100,
    image: 'https://images.unsplash.com/photo-1523419409543-3e4f83b9b8f2?auto=format&fit=crop&w=900&q=80',
    category: 'accessories',
    stock: 25,
  },
]

export default function Products() {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState('')
  const [categoryFilter, setCategoryFilter] = useState('all')

  useEffect(() => {
    fetchProducts()
  }, [])

  const fetchProducts = async () => {
    try {
      const response = await getProducts()
      const data = (response.data || []) as Product[]
      setProducts(data.length > 0 ? data : FALLBACK_PRODUCTS)
    } catch (error) {
      console.error('Error fetching products:', error)
      toast.error('Failed to load products')
    } finally {
      setLoading(false)
    }
  }

  const filteredProducts = useMemo(() => {
    let result = products
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase()
      result = result.filter(
        (p) =>
          p.name.toLowerCase().includes(q) || p.description.toLowerCase().includes(q)
      )
    }
    if (categoryFilter !== 'all') {
      result = result.filter((p) => (p.category || 'general') === categoryFilter)
    }
    return result
  }, [products, searchQuery, categoryFilter])

  const handleAddToCart = (product: Product) => {
    toast.success(`${product.name} added to cart`)
  }

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-10">
        <div className="h-9 bg-gray-200 rounded w-48 animate-pulse mb-6" />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
          {Array.from({ length: 8 }).map((_, i) => (
            <ProductCardSkeleton key={i} />
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-10">
      <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-6">Motorcycle Parts</h1>

      {/* Search and filters */}
      <div className="flex flex-col sm:flex-row gap-4 mb-6 sm:mb-8">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="search"
            placeholder="Search products..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 sm:py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
        <div className="flex items-center gap-2 flex-wrap">
          <Filter className="w-5 h-5 text-gray-500 flex-shrink-0" />
          <div className="flex flex-wrap gap-2">
            {CATEGORIES.map((cat) => (
              <button
                key={cat.value}
                onClick={() => setCategoryFilter(cat.value)}
                className={`px-3 py-2 rounded-lg text-sm font-medium transition ${
                  categoryFilter === cat.value
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Products grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
        {filteredProducts.map((product) => (
          <ProductCard
            key={product._id}
            product={{ ...product, category: product.category || 'general' }}
            onAddToCart={handleAddToCart}
          />
        ))}
      </div>

      {filteredProducts.length === 0 && (
        <div className="text-center py-12 sm:py-16">
          <p className="text-gray-500">No products match your search or filter.</p>
        </div>
      )}
    </div>
  )
}
