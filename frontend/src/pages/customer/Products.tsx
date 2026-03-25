import { useMemo, useState } from 'react'
import toast from 'react-hot-toast'
import { motion, AnimatePresence } from 'framer-motion'
import { Search, Sparkles, Package } from 'lucide-react'
import ProductCard from '../../components/ProductCard'
import { useCart } from '../../context/CartContext'
import { PRODUCT_CATEGORY_ORDER } from '../../data/products'
import { useCatalogStore } from '../../stores/catalogStore'

interface Product {
  _id: string
  name: string
  description: string
  price: number
  category?: string
  image?: string
  stock: number
}

const FILTERS: Array<'All' | (typeof PRODUCT_CATEGORY_ORDER)[number]> = [
  'All',
  ...PRODUCT_CATEGORY_ORDER,
]

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.04, delayChildren: 0.06 },
  },
}

const item = {
  hidden: { opacity: 0, y: 28 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.45 },
  },
}

export default function Products() {
  const { addToCart } = useCart()
  const products = useCatalogStore((s) => s.products) as Product[]
  const [search, setSearch] = useState('')
  const [activeCategory, setActiveCategory] = useState<(typeof FILTERS)[number]>('All')

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase()
    return products.filter((p) => {
      const catOk = activeCategory === 'All' || p.category === activeCategory
      const hay = `${p.name} ${p.description} ${p.category ?? ''}`.toLowerCase()
      const searchOk = !q || hay.includes(q)
      return catOk && searchOk
    })
  }, [products, search, activeCategory])

  const handleAddToCart = (p: Product) => {
    addToCart({ id: p._id, name: p.name, price: p.price, image: p.image }, 1)
    toast.success(`${p.name} added to cart`)
  }

  const gridClass =
    'grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-5 sm:gap-6 lg:gap-8'

  return (
    <div className="min-h-screen bg-[#050505] text-white relative overflow-hidden">
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.35]"
        style={{
          backgroundImage:
            'radial-gradient(ellipse 80% 50% at 50% -20%, rgba(255,122,0,0.25), transparent), radial-gradient(ellipse 60% 40% at 100% 50%, rgba(255,255,255,0.06), transparent)',
        }}
      />

      <div className="relative max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-10 pt-10 sm:pt-14 pb-16 sm:pb-24">
        <motion.header
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="mb-10 sm:mb-12"
        >
          <div className="flex flex-wrap items-center gap-2 text-[#ff7a00] text-xs font-bold uppercase tracking-[0.2em] mb-3">
            <Sparkles className="w-4 h-4" />
            <span>Premium parts catalogue</span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white max-w-3xl">
            Gear built for riders who live on two wheels
          </h1>
          <p className="mt-4 text-base sm:text-lg text-white/60 max-w-2xl leading-relaxed">
            Authentic motorcycle helmets, tyres, oils, brakes, chains, batteries, and everyday
            accessories—curated with clear specs and fair pricing.
          </p>

          <div className="mt-8 flex flex-wrap gap-4 sm:gap-6">
            <div className="flex items-center gap-3 rounded-2xl bg-white/[0.06] border border-white/10 px-5 py-3 backdrop-blur-sm">
              <Package className="w-5 h-5 text-[#ff7a00]" />
              <div>
                <p className="text-2xl font-bold tabular-nums">{products.length}</p>
                <p className="text-xs text-white/50 uppercase tracking-wider">SKUs in stock</p>
              </div>
            </div>
            <div className="flex items-center gap-3 rounded-2xl bg-white/[0.06] border border-white/10 px-5 py-3 backdrop-blur-sm">
              <div>
                <p className="text-2xl font-bold tabular-nums">{PRODUCT_CATEGORY_ORDER.length}</p>
                <p className="text-xs text-white/50 uppercase tracking-wider">Categories</p>
              </div>
            </div>
          </div>
        </motion.header>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, delay: 0.08 }}
          className="sticky top-0 z-20 -mx-4 px-4 sm:mx-0 sm:px-0 py-3 sm:py-4 mb-8 bg-[#050505]/85 backdrop-blur-xl border-b border-white/[0.06]"
        >
          <div className="flex flex-col lg:flex-row lg:items-center gap-4 lg:gap-6">
            <div className="relative flex-1 min-w-0">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/35 pointer-events-none" />
              <input
                type="search"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search by name, category, or keyword…"
                className="w-full rounded-2xl border border-white/10 bg-white/[0.06] pl-12 pr-4 py-3.5 text-white placeholder:text-white/35 outline-none focus:ring-2 focus:ring-[#ff7a00]/50 focus:border-[#ff7a00]/40 transition shadow-inner"
                aria-label="Search products"
              />
            </div>
            <div className="flex gap-2 overflow-x-auto pb-1 lg:pb-0 scrollbar-thin [scrollbar-color:rgba(255,255,255,0.15)_transparent]">
              {FILTERS.map((cat) => {
                const active = activeCategory === cat
                return (
                  <motion.button
                    key={cat}
                    type="button"
                    onClick={() => setActiveCategory(cat)}
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.98 }}
                    className={`shrink-0 rounded-full px-4 py-2.5 text-sm font-semibold transition-colors border ${
                      active
                        ? 'bg-[#ff7a00] text-black border-[#ff7a00] shadow-[0_0_24px_rgba(255,122,0,0.35)]'
                        : 'bg-white/[0.05] text-white/80 border-white/10 hover:bg-white/[0.09] hover:border-white/20'
                    }`}
                  >
                    {cat}
                  </motion.button>
                )
              })}
            </div>
          </div>
        </motion.div>

        <AnimatePresence mode="popLayout">
          {filtered.length === 0 ? (
            <motion.div
              key="empty"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="text-center py-20 sm:py-28 rounded-3xl bg-white/[0.03] border border-white/10"
            >
              <p className="text-xl font-semibold text-white mb-2">No matches</p>
              <p className="text-white/55 max-w-md mx-auto px-4">
                Try another category or clear your search—we have {products.length} products in the
                full catalogue.
              </p>
              <button
                type="button"
                onClick={() => {
                  setSearch('')
                  setActiveCategory('All')
                }}
                className="mt-6 rounded-full bg-[#ff7a00] text-black font-bold px-6 py-2.5 hover:brightness-110 transition"
              >
                Reset filters
              </button>
            </motion.div>
          ) : (
            <motion.div
              key="grid"
              variants={container}
              initial="hidden"
              animate="show"
              className={gridClass}
            >
              {filtered.map((p) => (
                <motion.div
                  key={p._id}
                  layout
                  layoutId={p._id}
                  variants={item}
                  whileHover={{ y: -8, transition: { duration: 0.28 } }}
                  className="h-full [perspective:1000px]"
                >
                  <div className="h-full rounded-2xl transition-shadow duration-300 hover:shadow-[0_24px_48px_-12px_rgba(0,0,0,0.7),0_0_0_1px_rgba(255,122,0,0.12)]">
                    <ProductCard product={p} onAddToCart={handleAddToCart} />
                  </div>
                </motion.div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}
