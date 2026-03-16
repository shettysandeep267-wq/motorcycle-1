import { ShoppingBag, Wrench, BadgeCheck } from 'lucide-react'
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

export default function HowItWorks() {
  return (
    <section className="py-14 sm:py-18 border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="How it works"
          title="Order parts or book repairs in minutes"
          description="A simple flow designed for a shop management system — fast for customers, clear for admins."
        />

        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
          {STEPS.map((s) => {
            const Icon = s.icon
            return (
              <div
                key={s.title}
                className="rounded-2xl bg-black/40 border border-white/10 p-6 shadow-lg hover:shadow-2xl hover:-translate-y-1 transition duration-300"
              >
                <div className="w-11 h-11 rounded-xl bg-[#ff7a00]/15 border border-[#ff7a00]/25 flex items-center justify-center">
                  <Icon className="w-6 h-6 text-[#ff7a00]" />
                </div>
                <h3 className="mt-4 text-white font-semibold text-lg">{s.title}</h3>
                <p className="mt-2 text-white/65 text-sm leading-relaxed">{s.desc}</p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

