import { Clock, ArrowRight } from 'lucide-react'

interface Service {
  _id: string
  name: string
  description: string
  price: number
  duration: string
  image?: string
  category?: string
}

interface ServiceCardProps {
  service: Service
  onBook?: (service: Service) => void
}

export default function ServiceCard({ service, onBook }: ServiceCardProps) {
  const handleBook = () => {
    if (onBook) onBook(service)
  }

  const durationLabel = service.duration || 'Flexible duration'

  const fallbackImage =
    'https://images.unsplash.com/photo-1519750157634-b6d493a0f77f?auto=format&fit=crop&w=900&q=80'

  const inlineFallback =
    "data:image/svg+xml,%3Csvg%20xmlns='http://www.w3.org/2000/svg'%20width='1200'%20height='800'%20viewBox='0%200%201200%20800'%3E%3Cdefs%3E%3ClinearGradient%20id='g'%20x1='0'%20y1='0'%20x2='1'%20y2='1'%3E%3Cstop%20offset='0'%20stop-color='%230a0a0a'/%3E%3Cstop%20offset='1'%20stop-color='%231b1b1b'/%3E%3C/linearGradient%3E%3C/defs%3E%3Crect%20width='1200'%20height='800'%20fill='url(%23g)'/%3E%3Cpath%20d='M320%20560l160-180%20120%20120%20210-250%20270%20310H320z'%20fill='%23ffffff22'/%3E%3Ccircle%20cx='820'%20cy='290'%20r='56'%20fill='%23ffffff22'/%3E%3Ctext%20x='50%25'%20y='52%25'%20dominant-baseline='middle'%20text-anchor='middle'%20font-family='Arial'%20font-size='42'%20fill='%23ff7a00'%3EService%3C/text%3E%3Ctext%20x='50%25'%20y='59%25'%20dominant-baseline='middle'%20text-anchor='middle'%20font-family='Arial'%20font-size='26'%20fill='%23ffffff88'%3EImage%20unavailable%3C/text%3E%3C/svg%3E"

  return (
    <div className="group relative h-full flex flex-col rounded-2xl border border-white/[0.1] bg-gradient-to-b from-white/[0.07] via-white/[0.02] to-transparent shadow-[0_28px_56px_-24px_rgba(0,0,0,0.8)] backdrop-blur-xl overflow-hidden transition-all duration-300 hover:border-[#ff7a00]/25 hover:shadow-[0_36px_72px_-28px_rgba(255,122,0,0.14)]">
      <div className="relative h-44 sm:h-52 bg-zinc-900/80 overflow-hidden">
        <img
          src={service.image || fallbackImage}
          alt={service.name}
          className="h-full w-full object-cover transform transition duration-700 ease-out group-hover:scale-[1.06]"
          loading="lazy"
          referrerPolicy="no-referrer"
          onError={(e) => {
            const img = e.currentTarget
            if (img.src === inlineFallback) return
            img.src = inlineFallback
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/15 to-black/30 pointer-events-none" />
        {service.category ? (
          <span className="absolute left-3 top-3 z-10 inline-flex rounded-full border border-white/15 bg-black/50 text-white text-[10px] sm:text-xs font-bold uppercase tracking-wide px-2.5 py-1 backdrop-blur-md">
            {service.category}
          </span>
        ) : null}
        <div className="absolute left-4 right-4 bottom-4 flex items-end justify-between gap-2">
          <h3 className="text-white font-bold text-base sm:text-lg line-clamp-2 drop-shadow-lg pr-2">
            {service.name}
          </h3>
          <span className="shrink-0 inline-flex items-center rounded-xl border border-white/20 bg-white/95 text-black text-xs font-extrabold px-3 py-1.5 shadow-lg backdrop-blur-sm">
            ₹{service.price.toFixed(0)}
          </span>
        </div>
      </div>

      <div className="p-4 sm:p-5 flex flex-col flex-1 border-t border-white/[0.06]">
        <p className="text-white/55 text-sm sm:text-base mb-4 line-clamp-3 leading-relaxed">
          {service.description}
        </p>
        <div className="mt-auto space-y-3">
          <div className="inline-flex items-center gap-2 text-xs sm:text-sm text-[#ff9a4d]/90 bg-[#ff7a00]/10 border border-[#ff7a00]/20 px-3 py-1.5 rounded-full w-fit font-medium">
            <Clock className="w-4 h-4" />
            <span>{durationLabel}</span>
          </div>
          <button
            type="button"
            onClick={handleBook}
            className="w-full py-3 rounded-xl font-bold text-sm sm:text-base bg-gradient-to-r from-[#ff7a00] to-[#ff9336] text-black hover:brightness-110 shadow-lg shadow-[#ff7a00]/20 transition flex items-center justify-center gap-2 group/btn"
          >
            Book service
            <ArrowRight className="w-4 h-4 transition-transform group-hover/btn:translate-x-0.5" />
          </button>
        </div>
      </div>
    </div>
  )
}
