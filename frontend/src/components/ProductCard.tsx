import { Link } from 'react-router-dom'
import { ShoppingCart } from 'lucide-react'

interface Product {
  _id: string
  name: string
  description: string
  price: number
  image?: string
  category?: string
  stock: number
}

interface ProductCardProps {
  product: Product
  onAddToCart?: (product: Product) => void
}

export default function ProductCard({ product, onAddToCart }: ProductCardProps) {
  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (onAddToCart && product.stock > 0) onAddToCart(product)
  }

  const categoryLabel = product.category ? product.category : 'General'

  return (
    <div className="group bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden transform transition duration-300 ease-out hover:shadow-2xl hover:-translate-y-1 hover:scale-[1.02]">
      <Link to={`/products/${product._id}`} className="block h-full">
        <div className="relative h-48 sm:h-56 bg-gray-100 overflow-hidden">
          {product.image ? (
            <img
              src={product.image}
              alt={product.name}
              className="h-full w-full object-cover transform transition duration-500 ease-out group-hover:scale-110"
              loading="lazy"
            />
          ) : (
            <div className="h-full w-full flex items-center justify-center text-gray-400 text-sm">
              No image available
            </div>
          )}
          <span className="absolute left-3 top-3 inline-flex items-center rounded-full bg-black/70 text-white text-xs font-medium px-3 py-1 backdrop-blur-sm">
            {categoryLabel}
          </span>
        </div>
        <div className="p-4 sm:p-5 flex flex-col h-full">
          <h3 className="font-semibold text-gray-900 mb-1 line-clamp-1 text-sm sm:text-base">
            {product.name}
          </h3>
          <p className="text-gray-500 text-xs sm:text-sm mb-3 line-clamp-2">
            {product.description}
          </p>
          <div className="mt-auto">
            <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
              <span className="text-lg sm:text-xl font-bold text-blue-600">
                ₹{product.price.toFixed(0)}
              </span>
              <span
                className={`text-xs px-2 py-1 rounded-full ${
                  product.stock > 0 ? 'bg-emerald-100 text-emerald-700' : 'bg-rose-100 text-rose-700'
                }`}
              >
                {product.stock > 0 ? `${product.stock} in stock` : 'Out of stock'}
              </span>
            </div>
            <div className="flex gap-2">
              <Link
                to={`/products/${product._id}`}
                className="flex-1 text-center py-2 rounded-lg text-xs sm:text-sm font-medium bg-gray-100 text-gray-800 hover:bg-gray-200 transition-colors"
              >
                View Details
              </Link>
              {product.stock > 0 && (
                <button
                  onClick={handleAddToCart}
                  className="inline-flex items-center justify-center gap-1 py-2 px-3 rounded-lg text-xs sm:text-sm font-semibold bg-blue-600 text-white hover:bg-blue-700 shadow-sm hover:shadow-md transition"
                >
                  <ShoppingCart className="w-4 h-4" />
                  Add to Cart
                </button>
              )}
            </div>
          </div>
        </div>
      </Link>
    </div>
  )
}
