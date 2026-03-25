import bikeSvg from '../../assets/bicycle-black.svg'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ChevronRight, Gauge, Shield } from 'lucide-react'

export default function Hero() {
  return (
    <section className="relative flex-1 overflow-hidden">
      <div
        className="pointer-events-none absolute top-1/4 left-1/2 -translate-x-1/2 w-[min(100vw,900px)] h-[min(100vw,900px)] rounded-full bg-[#ff7a00]/[0.12] blur-[100px]"
        aria-hidden
      />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 min-h-[calc(100vh-3.5rem-4rem)] sm:min-h-[calc(100vh-4rem-4rem)] flex items-center">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center w-full py-12 lg:py-16">
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
              className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.06] px-4 py-1.5 text-xs font-semibold text-white/90 backdrop-blur-md shadow-lg shadow-black/20"
            >
              <Gauge className="w-3.5 h-3.5 text-[#ff7a00]" />
              Premium parts · Pro workshop
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.06, ease: [0.22, 1, 0.36, 1] }}
              className="mt-6 text-4xl sm:text-5xl lg:text-6xl xl:text-[3.5rem] font-extrabold tracking-tight text-white leading-[1.05]"
            >
              Ride harder.{' '}
              <span className="bg-gradient-to-r from-[#ff7a00] via-amber-400 to-[#ff9a4d] bg-clip-text text-transparent">
                Maintain smarter.
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.12 }}
              className="mt-5 text-base sm:text-lg text-white/65 max-w-xl leading-relaxed"
            >
              Motorcycle parts with real specs, live inventory, and a service bay you can book like a
              high-end startup—glass-clear pricing, zero friction.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.18 }}
              className="mt-8 flex flex-col sm:flex-row gap-3 sm:gap-4"
            >
              <Link
                to="/products"
                className="inline-flex items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-[#ff7a00] to-[#ff9336] text-black font-bold px-7 py-3.5 shadow-[0_16px_48px_-12px_rgba(255,122,0,0.5)] hover:brightness-110 transition"
              >
                Shop parts
                <ChevronRight className="w-5 h-5" />
              </Link>
              <Link
                to="/services"
                className="inline-flex items-center justify-center rounded-2xl border border-white/20 bg-white/[0.06] text-white font-semibold px-7 py-3.5 backdrop-blur-md hover:bg-white/[0.1] transition"
              >
                Book service
              </Link>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.35, duration: 0.5 }}
              className="mt-10 flex flex-wrap gap-6 text-sm text-white/55"
            >
              <span className="inline-flex items-center gap-2">
                <Shield className="w-4 h-4 text-emerald-400/90" />
                Verified fitment data
              </span>
              <span className="inline-flex items-center gap-2">
                <Gauge className="w-4 h-4 text-[#ff7a00]" />
                Same-day workshop slots
              </span>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.94, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="relative"
          >
            <div className="absolute -inset-4 sm:-inset-8 bg-gradient-to-br from-[#ff7a00]/20 via-transparent to-violet-500/10 blur-3xl rounded-[2rem]" />
            <div className="relative rounded-3xl border border-white/[0.12] bg-gradient-to-br from-white/[0.1] via-white/[0.03] to-transparent p-6 sm:p-10 shadow-[0_40px_100px_-20px_rgba(0,0,0,0.85),inset_0_1px_0_rgba(255,255,255,0.1)] backdrop-blur-xl">
              <motion.img
                src={bikeSvg}
                alt="Motorcycle illustration"
                className="w-full h-auto max-h-[380px] sm:max-h-[440px] object-contain mx-auto drop-shadow-[0_20px_50px_rgba(0,0,0,0.5)]"
                draggable={false}
                animate={{ y: [0, -6, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
              />
              <div className="mt-6 flex justify-center gap-3">
                <span className="rounded-xl border border-white/10 bg-black/40 px-4 py-2 text-xs font-medium text-white/70 backdrop-blur-sm">
                  Carbon · Alloy · OEM
                </span>
                <span className="rounded-xl border border-[#ff7a00]/30 bg-[#ff7a00]/10 px-4 py-2 text-xs font-semibold text-[#ff9a4d]">
                  New season drop
                </span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
