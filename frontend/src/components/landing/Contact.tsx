import SectionHeading from './SectionHeading'

export default function Contact() {
  return (
    <section id="contact" className="py-14 sm:py-18 border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-8 items-start">
          <div>
            <SectionHeading
              eyebrow="Contact"
              title="Let’s get you rolling"
              description="Tell us your dates and preferred bike type. We’ll reply with availability and a quick quote."
            />
            <div className="mt-6 rounded-2xl bg-black/40 border border-white/10 p-6">
              <p className="text-white font-semibold">Motorcycle Shop</p>
              <p className="text-white/60 mt-2 text-sm">
                City Center • Open daily 9:00 AM – 9:00 PM
              </p>
              <p className="text-white/60 mt-4 text-sm">
                <span className="text-white/80 font-semibold">Phone:</span> +91 98765 43210
              </p>
              <p className="text-white/60 mt-1 text-sm">
                <span className="text-white/80 font-semibold">Email:</span> support@motorcycleshop.com
              </p>
            </div>
          </div>

          <div className="rounded-2xl bg-black/40 border border-white/10 p-6 shadow-lg">
            <form className="space-y-4">
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-white/80 mb-1">Name</label>
                  <input
                    type="text"
                    className="w-full rounded-xl border border-white/10 bg-white/5 text-white px-4 py-3 outline-none focus:ring-2 focus:ring-[#ff7a00] transition"
                    placeholder="Your name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-white/80 mb-1">Phone</label>
                  <input
                    type="tel"
                    className="w-full rounded-xl border border-white/10 bg-white/5 text-white px-4 py-3 outline-none focus:ring-2 focus:ring-[#ff7a00] transition"
                    placeholder="+1 (___) ___‑____"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-semibold text-white/80 mb-1">Message</label>
                <textarea
                  rows={4}
                  className="w-full rounded-xl border border-white/10 bg-white/5 text-white px-4 py-3 outline-none focus:ring-2 focus:ring-[#ff7a00] transition resize-none"
                  placeholder="Dates, bike type, tour request…"
                />
              </div>
              <button
                type="button"
                className="w-full rounded-xl bg-[#ff7a00] text-black font-semibold py-3 hover:brightness-110 transition"
              >
                Send message
              </button>
              <p className="text-xs text-white/45">
                This demo form doesn’t submit anywhere yet — it’s UI only.
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}

