import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowRight, Sparkles } from 'lucide-react'

const copy = {
  products: {
    title: 'Build your perfect setup',
    subtitle:
      'From OEM-grade parts to premium accessories—curated SKUs, live stock, and checkout in seconds.',
    primary: { to: '/products', label: 'Explore catalogue' },
    secondary: { to: '/signup', label: 'Create account' },
  },
  services: {
    title: 'Your bike deserves the pit lane',
    subtitle:
      'Factory-trained techs, transparent pricing, and booking that fits your calendar—not ours.',
    primary: { to: '/services', label: 'Book a service' },
    secondary: { to: '/#contact', label: 'Talk to us' },
  },
} as const

export default function MotoCTA({ variant }: { variant: keyof typeof copy }) {
  const c = copy[variant]
  return (
    <section className="relative py-16 sm:py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
          className="relative overflow-hidden rounded-3xl border border-white/[0.12] bg-gradient-to-br from-white/[0.09] via-white/[0.03] to-transparent p-8 sm:p-12 md:p-14 shadow-[0_32px_64px_-16px_rgba(0,0,0,0.75),inset_0_1px_0_rgba(255,255,255,0.08)] backdrop-blur-xl"
        >
          <div
            className="pointer-events-none absolute -top-24 -right-24 h-64 w-64 rounded-full bg-[#ff7a00]/25 blur-3xl"
            aria-hidden
          />
          <div
            className="pointer-events-none absolute -bottom-32 -left-16 h-72 w-72 rounded-full bg-violet-500/15 blur-3xl"
            aria-hidden
          />
          <div className="relative flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8">
            <div className="max-w-xl">
              <motion.span
                initial={{ opacity: 0, x: -8 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-black/30 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-[#ff7a00]"
              >
                <Sparkles className="w-3.5 h-3.5" />
                Funny Bikes
              </motion.span>
              <h2 className="mt-5 text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-white leading-[1.1]">
                {c.title}
              </h2>
              <p className="mt-4 text-base sm:text-lg text-white/65 leading-relaxed">{c.subtitle}</p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3 shrink-0">
              <Link
                to={c.primary.to}
                className="inline-flex items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-[#ff7a00] to-[#ff9a40] px-7 py-3.5 text-base font-bold text-black shadow-[0_12px_40px_-8px_rgba(255,122,0,0.55)] hover:brightness-110 transition"
              >
                {c.primary.label}
                <ArrowRight className="w-5 h-5" />
              </Link>
              <Link
                to={c.secondary.to}
                className="inline-flex items-center justify-center rounded-2xl border border-white/20 bg-white/[0.06] px-7 py-3.5 text-base font-semibold text-white backdrop-blur-sm hover:bg-white/[0.1] transition"
              >
                {c.secondary.label}
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
