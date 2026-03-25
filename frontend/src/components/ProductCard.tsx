import { Link } from 'react-router-dom'
import { ShoppingCart, Sparkles } from 'lucide-react'

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
  const fallbackSrc =
    "data:image/svg+xml,%3Csvg%20xmlns='http://www.w3.org/2000/svg'%20width='1200'%20height='800'%20viewBox='0%200%201200%20800'%3E%3Cdefs%3E%3ClinearGradient%20id='g'%20x1='0'%20y1='0'%20x2='1'%20y2='1'%3E%3Cstop%20offset='0'%20stop-color='%230a0a0a'/%3E%3Cstop%20offset='1'%20stop-color='%231b1b1b'/%3E%3C/linearGradient%3E%3C/defs%3E%3Crect%20width='1200'%20height='800'%20fill='url(%23g)'/%3E%3Cpath%20d='M320%20560l160-180%20120%20120%20210-250%20270%20310H320z'%20fill='%23ffffff22'/%3E%3Ccircle%20cx='820'%20cy='290'%20r='56'%20fill='%23ffffff22'/%3E%3Ctext%20x='50%25'%20y='52%25'%20dominant-baseline='middle'%20text-anchor='middle'%20font-family='Arial'%20font-size='42'%20fill='%23ff7a00'%3EMotorcycle%20Part%3C/text%3E%3Ctext%20x='50%25'%20y='59%25'%20dominant-baseline='middle'%20text-anchor='middle'%20font-family='Arial'%20font-size='26'%20fill='%23ffffff88'%3EImage%20unavailable%3C/text%3E%3C/svg%3E"
  const imageSrc = product.image && product.image.trim() ? product.image : fallbackSrc

  return (
    <div className="group relative h-full flex flex-col rounded-2xl border border-white/[0.1] bg-gradient-to-b from-white/[0.08] via-white/[0.03] to-transparent shadow-[0_24px_48px_-20px_rgba(0,0,0,0.75)] backdrop-blur-xl overflow-hidden transition-all duration-300 hover:border-[#ff7a00]/30 hover:shadow-[0_32px_64px_-24px_rgba(255,122,0,0.12)]">
      <div
        className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{
          background:
            'radial-gradient(ellipse 80% 60% at 50% -20%, rgba(255,122,0,0.12), transparent 55%)',
        }}
      />
      <Link to={`/products/${product._id}`} className="block relative">
        <div className="relative h-48 sm:h-56 bg-zinc-900/80 overflow-hidden">
          <img
            src={imageSrc}
            alt={product.name}
            className="h-full w-full object-cover transform transition duration-700 ease-out group-hover:scale-[1.07]"
            loading="lazy"
            referrerPolicy="no-referrer"
            onError={(e) => {
              const img = e.currentTarget
              if (img.src.endsWith(fallbackSrc)) return
              img.src = fallbackSrc
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/20 pointer-events-none" />
          <span className="absolute left-3 top-3 inline-flex items-center gap-1 rounded-full border border-white/10 bg-black/55 text-white text-[10px] sm:text-xs font-bold uppercase tracking-wider px-3 py-1 backdrop-blur-md">
            <Sparkles className="w-3 h-3 text-[#ff9a4d]" />
            {categoryLabel}
          </span>
        </div>
      </Link>
      <div className="relative p-4 sm:p-5 flex flex-col flex-1">
        <h3 className="font-bold text-white mb-1 line-clamp-1 text-sm sm:text-base tracking-tight">
          {product.name}
        </h3>
        <p className="text-white/50 text-xs sm:text-sm mb-3 line-clamp-2 leading-relaxed">
          {product.description}
        </p>
        <div className="mt-auto">
          <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
            <span className="text-xl sm:text-2xl font-extrabold bg-gradient-to-r from-[#ff7a00] to-amber-300 bg-clip-text text-transparent tabular-nums">
              ₹{product.price.toFixed(0)}
            </span>
            <span
              className={`text-[10px] sm:text-xs font-bold px-2.5 py-1 rounded-full border ${
                product.stock > 0
                  ? 'bg-emerald-500/15 text-emerald-300 border-emerald-500/25'
                  : 'bg-rose-500/15 text-rose-300 border-rose-500/25'
              }`}
            >
              {product.stock > 0 ? `${product.stock} in stock` : 'Out of stock'}
            </span>
          </div>
          <div className="flex gap-2">
            <Link
              to={`/products/${product._id}`}
              className="flex-1 text-center py-2.5 rounded-xl text-xs sm:text-sm font-semibold border border-white/12 bg-white/[0.06] text-white/90 hover:bg-white/[0.1] hover:border-white/20 transition"
            >
              Details
            </Link>
            {product.stock > 0 && (
              <button
                type="button"
                onClick={handleAddToCart}
                className="inline-flex items-center justify-center gap-1.5 py-2.5 px-3 sm:px-4 rounded-xl text-xs sm:text-sm font-bold bg-gradient-to-r from-[#ff7a00] to-[#ff9336] text-black hover:brightness-110 shadow-md shadow-[#ff7a00]/20 transition"
              >
                <ShoppingCart className="w-4 h-4" />
                Add
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
