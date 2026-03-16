import SectionHeading from './SectionHeading'

const TOURS = [
  {
    title: 'Monuments at Sunset',
    time: '2 hours',
    desc: 'Golden hour ride past the National Mall with photo stops.',
  },
  {
    title: 'Georgetown & Waterfront',
    time: '90 minutes',
    desc: 'A relaxed loop with riverside views and charming streets.',
  },
  {
    title: 'Capitol Highlights',
    time: '2.5 hours',
    desc: 'See the Capitol, museums, and hidden local gems.',
  },
] as const

export default function Tours() {
  return (
    <section id="tours" className="py-14 sm:py-18 border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Tours"
          title="Guided rides for every pace"
          description="Join our small-group tours led by local guides. Great for first-time visitors."
        />

        <div className="mt-8 grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
          {TOURS.map((t) => (
            <div
              key={t.title}
              className="rounded-2xl bg-black/40 border border-white/10 p-6 shadow-lg hover:shadow-2xl hover:-translate-y-1 transition duration-300"
            >
              <div className="flex items-start justify-between gap-3">
                <h3 className="text-white font-semibold text-lg">{t.title}</h3>
                <span className="text-xs font-semibold text-white/80 bg-white/10 px-3 py-1 rounded-full">
                  {t.time}
                </span>
              </div>
              <p className="mt-3 text-white/65 text-sm leading-relaxed">{t.desc}</p>
              <button className="mt-5 w-full rounded-xl bg-white/10 text-white font-semibold py-2.5 hover:bg-white/15 transition">
                View details
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

