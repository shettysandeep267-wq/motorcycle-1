import SectionHeading from './SectionHeading'

const PLANS = [
  {
    name: 'Hourly',
    price: '₹199',
    unit: '/hour',
    items: ['Helmet included', 'Lock included', 'Free route tips'],
  },
  {
    name: 'Daily',
    price: '₹799',
    unit: '/day',
    highlight: true,
    items: ['Best for sightseeing', 'Priority bike selection', 'Free swaps (same day)'],
  },
  {
    name: 'Weekly',
    price: '₹3999',
    unit: '/week',
    items: ['Perfect for long stays', 'Maintenance included', 'Save 25%+'],
  },
] as const

export default function Pricing() {
  return (
    <section id="pricing" className="py-14 sm:py-18 border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Pricing"
          title="Simple, transparent rentals"
          description="Choose a plan that matches your schedule. No hidden fees — just great bikes."
        />

        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
          {PLANS.map((plan) => (
            <div
              key={plan.name}
              className={`rounded-2xl border shadow-lg p-6 transition duration-300 hover:-translate-y-1 hover:shadow-2xl ${
                plan.highlight
                  ? 'bg-white/10 border-[#ff7a00]/40'
                  : 'bg-black/40 border-white/10'
              }`}
            >
              <div className="flex items-center justify-between gap-3">
                <h3 className="text-white font-semibold text-lg">{plan.name}</h3>
                {plan.highlight ? (
                  <span className="text-xs font-semibold bg-[#ff7a00] text-black px-3 py-1 rounded-full">
                    Most popular
                  </span>
                ) : null}
              </div>
              <div className="mt-4 flex items-end gap-2">
                <div className="text-4xl font-extrabold tracking-tight text-white">{plan.price}</div>
                <div className="text-white/60 mb-1">{plan.unit}</div>
              </div>
              <ul className="mt-5 space-y-2 text-sm text-white/70">
                {plan.items.map((i) => (
                  <li key={i} className="flex gap-2">
                    <span className="text-[#ff7a00]">•</span>
                    <span>{i}</span>
                  </li>
                ))}
              </ul>
              <button className="mt-6 w-full rounded-xl bg-[#ff7a00] text-black font-semibold py-2.5 hover:brightness-110 transition">
                Choose {plan.name}
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

