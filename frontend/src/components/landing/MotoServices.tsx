import { Link } from 'react-router-dom'
import SectionHeading from './SectionHeading'

const SERVICES = [
  {
    name: 'Full Bike Service',
    price: '₹2500',
    duration: '2 Hours',
    image:
      'https://images.unsplash.com/photo-1519750157634-b6d493a0f77f?auto=format&fit=crop&w=1200&q=80',
  },
  {
    name: 'Engine Repair',
    price: '₹4500',
    duration: '4 Hours',
    image:
      'https://images.unsplash.com/photo-1609639643509-4c3c6bcd1c7c?auto=format&fit=crop&w=1200&q=80',
  },
  {
    name: 'Brake Inspection',
    price: '₹800',
    duration: '30 Minutes',
    image:
      'https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1200&q=80',
  },
] as const

export default function MotoServices() {
  return (
    <section className="py-14 sm:py-18 border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between gap-6 flex-wrap">
          <SectionHeading
            eyebrow="Services"
            title="Repair & maintenance services"
            description="Book trusted services with transparent pricing and convenient scheduling."
          />
          <Link
            to="/services"
            className="inline-flex items-center justify-center rounded-xl bg-white/10 text-white font-semibold px-5 py-2.5 hover:bg-white/15 transition"
          >
            View all services
          </Link>
        </div>

        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {SERVICES.map((s) => (
            <div
              key={s.name}
              className="group bg-black/40 border border-white/10 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl hover:-translate-y-1 transition duration-300 flex flex-col"
            >
              <div className="relative h-48 overflow-hidden">
                <img
                  src={s.image}
                  alt={s.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition duration-500"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
                <div className="absolute left-4 right-4 bottom-4 flex items-center justify-between gap-3">
                  <h3 className="text-white font-semibold text-lg">{s.name}</h3>
                  <span className="text-xs font-semibold bg-white/90 text-black px-3 py-1 rounded-full">
                    {s.duration}
                  </span>
                </div>
              </div>
              <div className="p-4">
                <div className="flex items-center justify-between">
                  <span className="text-white/70 text-sm">Starting at</span>
                  <span className="text-[#ff7a00] font-extrabold">{s.price}</span>
                </div>
                <Link
                  to="/services"
                  className="mt-4 inline-flex w-full items-center justify-center rounded-xl bg-[#ff7a00] text-black font-semibold py-2.5 hover:brightness-110 transition"
                >
                  Book service
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

