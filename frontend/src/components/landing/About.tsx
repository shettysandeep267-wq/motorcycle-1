import { motion } from 'framer-motion'
import SectionHeading from './SectionHeading'

export default function About() {
  return (
    <section id="about" className="py-16 sm:py-22 border-t border-white/[0.08]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-14 items-start">
          <SectionHeading
            eyebrow="About"
            title="One platform for parts, service, and operations"
            description="Customers get a premium storefront and booking experience. Your team gets admin tools that stay in sync—inventory, orders, and workshop requests in one place."
          />
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="rounded-3xl border border-white/[0.1] bg-gradient-to-br from-white/[0.09] via-white/[0.03] to-transparent p-6 sm:p-8 shadow-[0_32px_64px_-28px_rgba(0,0,0,0.75)] backdrop-blur-xl"
          >
            <div className="grid grid-cols-2 gap-3 sm:gap-4">
              {(
                [
                  ['Products', 'Parts catalog & inventory'],
                  ['Orders', 'Checkout & tracking'],
                  ['Services', 'Repairs & maintenance'],
                  ['Admin', 'Dashboard & ops'],
                ] as const
              ).map(([title, sub]) => (
                <div
                  key={title}
                  className="rounded-2xl border border-white/[0.08] bg-black/30 p-4 sm:p-5 hover:border-[#ff7a00]/20 transition-colors"
                >
                  <p className="text-lg sm:text-xl font-extrabold text-white">{title}</p>
                  <p className="text-white/50 text-xs sm:text-sm mt-1.5 leading-snug">{sub}</p>
                </div>
              ))}
            </div>
            <p className="text-white/55 text-sm mt-6 leading-relaxed">
              Start with{' '}
              <span className="text-[#ff9a4d] font-semibold">Products</span> or book a{' '}
              <span className="text-[#ff9a4d] font-semibold">Service</span>—everything stays connected
              under the hood.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
