import bikeSvg from '../../assets/bicycle-black.svg'
import { Link } from 'react-router-dom'

export default function Hero() {
  return (
    <section className="flex-1">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 min-h-[calc(100vh-36px-64px)] flex items-center">
        <div className="grid lg:grid-cols-2 gap-10 items-center w-full py-10">
          <div className="animate-fade-up">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-[1.05]">
              Motorcycle Parts &amp; Services Shop
            </h1>
            <p className="mt-5 text-base sm:text-lg text-white/75 max-w-xl">
              Buy motorcycle parts and book repair services online.
            </p>

            <div className="mt-8 flex flex-col sm:flex-row gap-3">
              <Link
                to="/products"
                className="inline-flex items-center justify-center rounded-xl bg-[#ff7a00] text-black font-semibold px-6 py-3 hover:brightness-110 transition"
              >
                Browse Products
              </Link>
              <Link
                to="/services"
                className="inline-flex items-center justify-center rounded-xl border border-white/15 text-white font-semibold px-6 py-3 hover:bg-white/10 transition"
              >
                Book Service
              </Link>
            </div>
          </div>

          <div className="relative animate-fade-up" style={{ animationDelay: '120ms' }}>
            <div className="absolute -inset-6 bg-[#ff7a00]/15 blur-3xl rounded-full" />
            <div className="relative bg-black/40 border border-white/10 rounded-3xl p-6 sm:p-8 shadow-[0_40px_120px_rgba(0,0,0,0.6)]">
              <img
                src={bikeSvg}
                alt="Motorcycle illustration"
                className="w-full h-auto max-h-[420px] object-contain"
                draggable={false}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

