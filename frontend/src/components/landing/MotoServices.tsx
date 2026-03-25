import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'
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

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.05 },
  },
}

const item = {
  hidden: { opacity: 0, y: 22 },
  show: { opacity: 1, y: 0 },
}

export default function MotoServices() {
  return (
    <section className="py-16 sm:py-22 border-t border-white/[0.08]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6">
          <SectionHeading
            eyebrow="Workshop"
            title="Service packages that respect your time"
            description="Transparent durations, upfront pricing, and booking flows designed for riders—not paperwork."
          />
          <Link
            to="/services"
            className="inline-flex items-center justify-center gap-2 self-start sm:self-auto rounded-2xl border border-white/15 bg-white/[0.06] text-white font-semibold px-5 py-2.5 backdrop-blur-md hover:bg-white/[0.1] transition shrink-0"
          >
            All services
            <ArrowUpRight className="w-4 h-4 text-[#ff7a00]" />
          </Link>
        </div>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-50px' }}
          className="mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6"
        >
          {SERVICES.map((s) => (
            <motion.div
              key={s.name}
              variants={item}
              whileHover={{ y: -8, transition: { duration: 0.28 } }}
              className="group flex flex-col rounded-2xl border border-white/[0.1] bg-gradient-to-b from-white/[0.07] to-transparent overflow-hidden shadow-[0_28px_56px_-24px_rgba(0,0,0,0.75)] backdrop-blur-xl hover:border-white/[0.18] transition-colors duration-300"
            >
              <div className="relative h-52 overflow-hidden">
                <img
                  src={s.image}
                  alt={s.name}
                  className="w-full h-full object-cover transition duration-700 group-hover:scale-[1.06]"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent" />
                <div className="absolute left-4 right-4 bottom-4 flex items-end justify-between gap-3">
                  <h3 className="text-white font-bold text-lg sm:text-xl leading-tight drop-shadow-md">
                    {s.name}
                  </h3>
                  <span className="shrink-0 text-[10px] font-bold uppercase tracking-wide bg-white/95 text-black px-3 py-1.5 rounded-full shadow-lg">
                    {s.duration}
                  </span>
                </div>
              </div>
              <div className="p-5 flex flex-col flex-1 border-t border-white/[0.06]">
                <div className="flex items-center justify-between">
                  <span className="text-white/50 text-xs font-medium uppercase tracking-wider">
                    From
                  </span>
                  <span className="text-2xl font-extrabold bg-gradient-to-r from-[#ff7a00] to-amber-300 bg-clip-text text-transparent">
                    {s.price}
                  </span>
                </div>
                <Link
                  to="/services"
                  className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-white/[0.08] border border-white/10 text-white font-semibold py-2.5 hover:bg-[#ff7a00] hover:text-black hover:border-[#ff7a00] transition"
                >
                  Schedule
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
