import SectionHeading from './SectionHeading'

export default function About() {
  return (
    <section id="about" className="py-14 sm:py-18 border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-8 items-start">
          <SectionHeading
            eyebrow="About"
            title="All‑in‑one motorcycle shop management"
            description="Buy parts online and book repair services with a clean customer flow. Admins can manage inventory, orders, services, and bookings from one dashboard."
          />
          <div className="rounded-2xl bg-black/40 border border-white/10 p-6 shadow-lg">
            <div className="grid grid-cols-2 gap-4">
              <div className="rounded-xl bg-white/5 border border-white/10 p-4">
                <p className="text-2xl font-extrabold text-white">Products</p>
                <p className="text-white/60 text-sm mt-1">Parts catalog & inventory</p>
              </div>
              <div className="rounded-xl bg-white/5 border border-white/10 p-4">
                <p className="text-2xl font-extrabold text-white">Orders</p>
                <p className="text-white/60 text-sm mt-1">Checkout & order tracking</p>
              </div>
              <div className="rounded-xl bg-white/5 border border-white/10 p-4">
                <p className="text-2xl font-extrabold text-white">Services</p>
                <p className="text-white/60 text-sm mt-1">Repair & maintenance booking</p>
              </div>
              <div className="rounded-xl bg-white/5 border border-white/10 p-4">
                <p className="text-2xl font-extrabold text-white">Admin</p>
                <p className="text-white/60 text-sm mt-1">Dashboard & operations</p>
              </div>
            </div>
            <p className="text-white/60 text-sm mt-5 leading-relaxed">
              Start by browsing <span className="text-[#ff7a00] font-semibold">Products</span> or book a{' '}
              <span className="text-[#ff7a00] font-semibold">Service</span> — everything stays connected.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

