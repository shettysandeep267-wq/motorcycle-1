import { Wrench, ShieldCheck, Timer } from 'lucide-react'
import SectionHeading from './SectionHeading'

const ITEMS = [
  {
    icon: Wrench,
    title: 'Quick tune‑ups',
    desc: 'Brake checks, chain adjustments, and safety inspection while you wait.',
  },
  {
    icon: Timer,
    title: 'Same‑day service',
    desc: 'Fast turnaround for rentals and personal bikes (subject to availability).',
  },
  {
    icon: ShieldCheck,
    title: 'Ride‑ready guarantee',
    desc: 'Every bike leaves the shop checked, cleaned, and ready for the city.',
  },
] as const

export default function Repairs() {
  return (
    <section id="repairs" className="py-14 sm:py-18 border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Repairs"
          title="Repairs & maintenance"
          description="Keep your bike smooth, quiet, and safe. Our mechanics handle everything from quick fixes to full service."
        />

        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
          {ITEMS.map((it) => {
            const Icon = it.icon
            return (
              <div
                key={it.title}
                className="rounded-2xl bg-black/40 border border-white/10 p-6 shadow-lg hover:shadow-2xl hover:-translate-y-1 transition duration-300"
              >
                <div className="w-11 h-11 rounded-xl bg-[#ff7a00]/15 border border-[#ff7a00]/25 flex items-center justify-center">
                  <Icon className="w-6 h-6 text-[#ff7a00]" />
                </div>
                <h3 className="mt-4 text-white font-semibold text-lg">{it.title}</h3>
                <p className="mt-2 text-white/65 text-sm leading-relaxed">{it.desc}</p>
                <button className="mt-5 w-full rounded-xl bg-[#ff7a00] text-black font-semibold py-2.5 hover:brightness-110 transition">
                  Book a repair
                </button>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

