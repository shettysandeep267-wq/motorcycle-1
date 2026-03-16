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
  // Use an inline SVG placeholder so fallback always loads
  const fallbackSrc =
    "data:image/svg+xml,%3Csvg%20xmlns='http://www.w3.org/2000/svg'%20width='1200'%20height='800'%20viewBox='0%200%201200%20800'%3E%3Cdefs%3E%3ClinearGradient%20id='g'%20x1='0'%20y1='0'%20x2='1'%20y2='1'%3E%3Cstop%20offset='0'%20stop-color='%230a0a0a'/%3E%3Cstop%20offset='1'%20stop-color='%231b1b1b'/%3E%3C/linearGradient%3E%3C/defs%3E%3Crect%20width='1200'%20height='800'%20fill='url(%23g)'/%3E%3Cpath%20d='M320%20560l160-180%20120%20120%20210-250%20270%20310H320z'%20fill='%23ffffff22'/%3E%3Ccircle%20cx='820'%20cy='290'%20r='56'%20fill='%23ffffff22'/%3E%3Ctext%20x='50%25'%20y='52%25'%20dominant-baseline='middle'%20text-anchor='middle'%20font-family='Arial'%20font-size='42'%20fill='%23ff7a00'%3EMotorcycle%20Part%3C/text%3E%3Ctext%20x='50%25'%20y='59%25'%20dominant-baseline='middle'%20text-anchor='middle'%20font-family='Arial'%20font-size='26'%20fill='%23ffffff88'%3EImage%20unavailable%3C/text%3E%3C/svg%3E"
  const imageSrc = product.image && product.image.trim() ? product.image : fallbackSrc

  return (
    <div className="group bg-black/40 rounded-xl shadow-lg border border-white/10 overflow-hidden transform transition duration-300 ease-out hover:shadow-2xl hover:-translate-y-1 hover:scale-[1.02]">
      <Link to={`/products/${product._id}`} className="block">
        <div className="relative h-48 sm:h-56 bg-gray-100 overflow-hidden">
          <img
            src={imageSrc}
            alt={product.name}
            className="h-full w-full object-cover transform transition duration-500 ease-out group-hover:scale-110"
            loading="lazy"
            referrerPolicy="no-referrer"
            onError={(e) => {
              const img = e.currentTarget
              if (img.src.endsWith(fallbackSrc)) return
              img.src = fallbackSrc
            }}
          />
          <span className="absolute left-3 top-3 inline-flex items-center rounded-full bg-black/70 text-white text-xs font-medium px-3 py-1 backdrop-blur-sm">
            {categoryLabel}
          </span>
        </div>
      </Link>
      <div className="p-4 sm:p-5 flex flex-col h-full">
          <h3 className="font-semibold text-white mb-1 line-clamp-1 text-sm sm:text-base">
            {product.name}
          </h3>
          <p className="text-white/60 text-xs sm:text-sm mb-3 line-clamp-2">
            {product.description}
          </p>
          <div className="mt-auto">
            <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
              <span className="text-lg sm:text-xl font-bold text-[#ff7a00]">
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
                className="flex-1 text-center py-2 rounded-lg text-xs sm:text-sm font-medium bg-white/10 text-white hover:bg-white/15 transition-colors"
              >
                View Details
              </Link>
              {product.stock > 0 && (
                <button
                  onClick={handleAddToCart}
                  className="inline-flex items-center justify-center gap-1 py-2 px-3 rounded-lg text-xs sm:text-sm font-semibold bg-[#ff7a00] text-black hover:brightness-110 shadow-sm hover:shadow-md transition"
                >
                  <ShoppingCart className="w-4 h-4" />
                  Add to Cart
                </button>
              )}
            </div>
          </div>
      </div>
    </div>
  )
}
