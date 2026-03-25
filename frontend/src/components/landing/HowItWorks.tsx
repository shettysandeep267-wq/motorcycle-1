import { ShoppingBag, Wrench, BadgeCheck } from 'lucide-react'
import { motion } from 'framer-motion'
import SectionHeading from './SectionHeading'

const STEPS = [
  {
    icon: ShoppingBag,
    title: 'Browse products',
    desc: 'Search parts, check price and stock, then add items to your cart.',
  },
  {
    icon: BadgeCheck,
    title: 'Checkout & order',
    desc: 'Review your cart and place your order — your items will appear in order history.',
  },
  {
    icon: Wrench,
    title: 'Book a service',
    desc: 'Choose a service, pick a date, confirm booking, and get ready for the workshop.',
  },
] as const

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.12, delayChildren: 0.06 },
  },
}

const card = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
}

export default function HowItWorks() {
  return (
    <section className="py-16 sm:py-22 border-t border-white/[0.08]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="How it works"
          title="Three steps. Zero drama."
          description="A flow built like a modern product: fast for riders, clear for your team, beautiful on every screen."
        />

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-40px' }}
          className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-5 sm:gap-6"
        >
          {STEPS.map((s, i) => {
            const Icon = s.icon
            return (
              <motion.div
                key={s.title}
                variants={card}
                whileHover={{ y: -6, transition: { duration: 0.25 } }}
                className="relative rounded-2xl border border-white/[0.1] bg-gradient-to-br from-white/[0.08] to-transparent p-6 sm:p-8 shadow-[0_20px_50px_-24px_rgba(0,0,0,0.65)] backdrop-blur-xl overflow-hidden group"
              >
                <span className="absolute top-4 right-4 text-5xl font-black text-white/[0.04] select-none">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <div className="relative w-12 h-12 rounded-2xl bg-gradient-to-br from-[#ff7a00]/25 to-[#ff7a00]/5 border border-[#ff7a00]/25 flex items-center justify-center shadow-inner">
                  <Icon className="w-6 h-6 text-[#ff9a4d]" />
                </div>
                <h3 className="mt-5 text-white font-bold text-lg">{s.title}</h3>
                <p className="mt-2 text-white/55 text-sm leading-relaxed">{s.desc}</p>
              </motion.div>
            )
          })}
        </motion.div>
      </div>
    </section>
  )
}
