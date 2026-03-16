import { Link } from 'react-router-dom'
import SectionHeading from './SectionHeading'

const BIKES = [
  {
    name: 'City Cruiser',
    price: 'From ₹699/day',
    image:
      'https://images.unsplash.com/photo-1485965120184-e220f721d03e?auto=format&fit=crop&w=1200&q=80',
    tag: 'Comfort',
  },
  {
    name: 'Road Pro',
    price: 'From ₹899/day',
    image:
      'https://images.unsplash.com/photo-1525104698733-6a3b87c1d19c?auto=format&fit=crop&w=1200&q=80',
    tag: 'Speed',
  },
  {
    name: 'E‑Bike Explorer',
    price: 'From ₹1199/day',
    image:
      'https://images.unsplash.com/photo-1520975958225-7cc17d26a0c0?auto=format&fit=crop&w=1200&q=80',
    tag: 'Electric',
  },
  {
    name: 'Touring Hybrid',
    price: 'From ₹799/day',
    image:
      'https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1200&q=80',
    tag: 'All‑rounder',
  },
] as const

export default function FeaturedBikes() {
  return (
    <section id="bikes" className="py-14 sm:py-18">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-6 sm:gap-8">
          <div className="flex items-end justify-between gap-6 flex-wrap">
            <SectionHeading
              eyebrow="Featured"
              title="Popular bikes for DC rides"
              description="Pick a bike that fits your pace — from relaxed cruisers to quick road bikes and e‑bikes."
            />
            <Link
              to="/products"
              className="inline-flex items-center justify-center rounded-xl bg-white/10 text-white font-semibold px-5 py-2.5 hover:bg-white/15 transition"
            >
              View all bikes
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {BIKES.map((bike) => (
              <div
                key={bike.name}
                className="group bg-black/40 border border-white/10 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl hover:-translate-y-1 transition duration-300"
              >
                <div className="relative h-44 sm:h-48 overflow-hidden">
                  <img
                    src={bike.image}
                    alt={bike.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition duration-500"
                    loading="lazy"
                  />
                  <span className="absolute left-3 top-3 text-xs font-semibold bg-black/70 text-white px-3 py-1 rounded-full">
                    {bike.tag}
                  </span>
                </div>
                <div className="p-4">
                  <div className="flex items-start justify-between gap-3">
                    <h3 className="text-white font-semibold">{bike.name}</h3>
                    <span className="text-[#ff7a00] font-bold text-sm">{bike.price}</span>
                  </div>
                  <button className="mt-4 w-full rounded-xl bg-[#ff7a00] text-black font-semibold py-2.5 hover:brightness-110 transition">
                    Rent this bike
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

