import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'
import SectionHeading from './SectionHeading'

const PRODUCTS = [
  {
    name: 'Motorcycle Brake Pad',
    price: '₹1200',
    image:
      'https://images.unsplash.com/photo-1605559424843-9e4c228bf1c2?auto=format&fit=crop&w=1200&q=80',
    tag: 'Brakes',
  },
  {
    name: 'Premium Engine Oil',
    price: '₹900',
    image:
      'https://images.unsplash.com/photo-1625047509168-a7026f36de04?auto=format&fit=crop&w=1200&q=80',
    tag: 'Oil',
  },
  {
    name: 'LED Headlight',
    price: '₹1800',
    image:
      'https://images.unsplash.com/photo-1619767886558-efdc259cde1a?auto=format&fit=crop&w=1200&q=80',
    tag: 'Lights',
  },
  {
    name: 'Bike Chain Set',
    price: '₹2200',
    image:
      'https://images.unsplash.com/photo-1609639643509-4c3c6bcd1c7c?auto=format&fit=crop&w=1200&q=80',
    tag: 'Chain',
  },
] as const

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.08, delayChildren: 0.06 },
  },
}

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
}

export default function MotoFeaturedProducts() {
  return (
    <section className="py-16 sm:py-22 border-t border-white/[0.08]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6">
          <SectionHeading
            eyebrow="Featured products"
            title="Curated for serious riders"
            description="Hand-picked SKUs with imagery you can trust—same catalogue standards as our full store."
          />
          <Link
            to="/products"
            className="inline-flex items-center justify-center gap-2 self-start sm:self-auto rounded-2xl border border-white/15 bg-white/[0.06] text-white font-semibold px-5 py-2.5 backdrop-blur-md hover:bg-white/[0.1] transition shrink-0"
          >
            View all
            <ArrowUpRight className="w-4 h-4 text-[#ff7a00]" />
          </Link>
        </div>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-50px' }}
          className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6"
        >
          {PRODUCTS.map((p) => (
            <motion.div
              key={p.name}
              variants={item}
              whileHover={{ y: -6, transition: { duration: 0.25 } }}
              className="group relative rounded-2xl border border-white/[0.1] bg-gradient-to-b from-white/[0.08] to-white/[0.02] overflow-hidden shadow-[0_24px_48px_-20px_rgba(0,0,0,0.7)] backdrop-blur-xl hover:border-[#ff7a00]/30 hover:shadow-[0_32px_64px_-24px_rgba(255,122,0,0.15)] transition-colors duration-300"
            >
              <div className="relative h-48 sm:h-52 overflow-hidden">
                <img
                  src={p.image}
                  alt={p.name}
                  className="w-full h-full object-cover transition duration-700 ease-out group-hover:scale-110"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-90" />
                <span className="absolute left-3 top-3 text-[10px] sm:text-xs font-bold uppercase tracking-wider bg-black/50 text-white px-3 py-1 rounded-full border border-white/10 backdrop-blur-md">
                  {p.tag}
                </span>
                <span className="absolute right-3 bottom-3 text-lg font-extrabold text-white drop-shadow-lg">
                  {p.price}
                </span>
              </div>
              <div className="p-4 sm:p-5">
                <h3 className="text-white font-bold text-base leading-snug">{p.name}</h3>
                <Link
                  to="/products"
                  className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#ff7a00] to-[#ff9336] text-black font-bold py-2.5 text-sm hover:brightness-110 transition"
                >
                  Open store
                  <ArrowUpRight className="w-4 h-4" />
                </Link>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
