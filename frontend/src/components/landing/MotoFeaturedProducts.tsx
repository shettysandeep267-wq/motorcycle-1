import { Link } from 'react-router-dom'
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

export default function MotoFeaturedProducts() {
  return (
    <section className="py-14 sm:py-18 border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between gap-6 flex-wrap">
          <SectionHeading
            eyebrow="Featured products"
            title="Popular motorcycle parts"
            description="Browse parts with clean fitment and trusted quality — ready for your next ride."
          />
          <Link
            to="/products"
            className="inline-flex items-center justify-center rounded-xl bg-white/10 text-white font-semibold px-5 py-2.5 hover:bg-white/15 transition"
          >
            Browse all products
          </Link>
        </div>

        <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {PRODUCTS.map((p) => (
            <div
              key={p.name}
              className="group bg-black/40 border border-white/10 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl hover:-translate-y-1 transition duration-300"
            >
              <div className="relative h-44 sm:h-48 overflow-hidden">
                <img
                  src={p.image}
                  alt={p.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition duration-500"
                  loading="lazy"
                />
                <span className="absolute left-3 top-3 text-xs font-semibold bg-black/70 text-white px-3 py-1 rounded-full">
                  {p.tag}
                </span>
              </div>
              <div className="p-4">
                <div className="flex items-start justify-between gap-3">
                  <h3 className="text-white font-semibold">{p.name}</h3>
                  <span className="text-[#ff7a00] font-bold text-sm">{p.price}</span>
                </div>
                <Link
                  to="/products"
                  className="mt-4 inline-flex w-full items-center justify-center rounded-xl bg-[#ff7a00] text-black font-semibold py-2.5 hover:brightness-110 transition"
                >
                  View product
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

