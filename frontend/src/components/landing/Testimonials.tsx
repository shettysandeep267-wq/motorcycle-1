import { motion } from 'framer-motion'
import { Quote, Star } from 'lucide-react'
import SectionHeading from './SectionHeading'

const REVIEWS = [
  {
    name: 'Arjun Mehta',
    role: 'Touring rider, Pune',
    text: 'Ordered chain kit and pads—shipped fast, fitment was spot on. The product pages actually show specs that matter.',
    rating: 5,
  },
  {
    name: 'Priya Nair',
    role: 'Weekend track days',
    text: 'Booked a full service online. Transparent pricing, no upsell nonsense. Felt like dealing with a premium garage.',
    rating: 5,
  },
  {
    name: 'Rahul Verma',
    role: 'City commuter',
    text: 'Cart + checkout is smooth. Customer dashboard makes it easy to see orders and upcoming workshop slots.',
    rating: 5,
  },
] as const

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.08 },
  },
}

const card = {
  hidden: { opacity: 0, y: 22 },
  show: { opacity: 1, y: 0 },
}

export default function Testimonials() {
  return (
    <section className="py-16 sm:py-22 border-t border-white/[0.08] relative">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#ff7a00]/[0.03] to-transparent pointer-events-none" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <SectionHeading
          eyebrow="Social proof"
          title="Trusted by riders who push hard"
          description="Real feedback from customers who care about quality parts, honest service, and a digital experience that keeps up."
        />

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-60px' }}
          className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-5 sm:gap-6"
        >
          {REVIEWS.map((r) => (
            <motion.article
              key={r.name}
              variants={card}
              className="group relative flex flex-col rounded-2xl border border-white/[0.1] bg-gradient-to-b from-white/[0.08] to-white/[0.02] p-6 sm:p-7 shadow-[0_20px_50px_-20px_rgba(0,0,0,0.65)] backdrop-blur-xl hover:border-[#ff7a00]/25 hover:shadow-[0_28px_60px_-24px_rgba(255,122,0,0.12)] transition-colors duration-300"
            >
              <Quote className="w-9 h-9 text-[#ff7a00]/40 mb-4" aria-hidden />
              <div className="flex gap-0.5 mb-4">
                {Array.from({ length: r.rating }).map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-[#ff7a00] text-[#ff7a00]" />
                ))}
              </div>
              <p className="text-white/80 text-sm sm:text-base leading-relaxed flex-1">&ldquo;{r.text}&rdquo;</p>
              <div className="mt-6 pt-5 border-t border-white/[0.08]">
                <p className="font-semibold text-white">{r.name}</p>
                <p className="text-xs text-white/50 mt-0.5">{r.role}</p>
              </div>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
