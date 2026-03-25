import { motion } from 'framer-motion'
import SectionHeading from './SectionHeading'

export default function Contact() {
  return (
    <section id="contact" className="py-16 sm:py-22 border-t border-white/[0.08]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-12 items-start">
          <div>
            <SectionHeading
              eyebrow="Contact"
              title="Let’s get you rolling"
              description="Tell us your dates and bike type. We’ll reply with availability and a quick quote."
            />
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mt-6 rounded-2xl border border-white/[0.1] bg-gradient-to-br from-white/[0.07] to-transparent p-6 backdrop-blur-xl shadow-xl shadow-black/30"
            >
              <p className="text-white font-bold text-lg">Funny Bikes Workshop</p>
              <p className="text-white/55 mt-2 text-sm">City Center • Open daily 9:00 AM – 9:00 PM</p>
              <p className="text-white/55 mt-4 text-sm">
                <span className="text-white/85 font-semibold">Phone:</span> +91 98765 43210
              </p>
              <p className="text-white/55 mt-1 text-sm">
                <span className="text-white/85 font-semibold">Email:</span> support@motorcycleshop.com
              </p>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.06 }}
            className="rounded-3xl border border-white/[0.1] bg-gradient-to-b from-white/[0.06] to-transparent p-6 sm:p-8 backdrop-blur-xl shadow-[0_28px_60px_-24px_rgba(0,0,0,0.7)]"
          >
            <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-white/70 mb-1.5 uppercase tracking-wider">
                    Name
                  </label>
                  <input
                    type="text"
                    className="w-full rounded-xl border border-white/10 bg-black/40 text-white px-4 py-3 outline-none focus:ring-2 focus:ring-[#ff7a00]/50 focus:border-[#ff7a00]/40 transition placeholder:text-white/30"
                    placeholder="Your name"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-white/70 mb-1.5 uppercase tracking-wider">
                    Phone
                  </label>
                  <input
                    type="tel"
                    className="w-full rounded-xl border border-white/10 bg-black/40 text-white px-4 py-3 outline-none focus:ring-2 focus:ring-[#ff7a00]/50 focus:border-[#ff7a00]/40 transition placeholder:text-white/30"
                    placeholder="+91 …"
                  />
                </div>
              </div>
              <div>
                <label className="block text-xs font-semibold text-white/70 mb-1.5 uppercase tracking-wider">
                  Message
                </label>
                <textarea
                  rows={4}
                  className="w-full rounded-xl border border-white/10 bg-black/40 text-white px-4 py-3 outline-none focus:ring-2 focus:ring-[#ff7a00]/50 focus:border-[#ff7a00]/40 transition resize-none placeholder:text-white/30"
                  placeholder="Dates, bike model, parts needed…"
                />
              </div>
              <button
                type="button"
                className="w-full rounded-xl bg-gradient-to-r from-[#ff7a00] to-[#ff9336] text-black font-bold py-3.5 hover:brightness-110 transition shadow-lg shadow-[#ff7a00]/20"
              >
                Send message
              </button>
              <p className="text-[11px] text-white/40 text-center">
                Demo UI only—this form does not submit to a server.
              </p>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
