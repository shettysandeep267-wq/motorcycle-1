import { Clock } from 'lucide-react'

interface Service {
  _id: string
  name: string
  description: string
  price: number
  duration: string
  image?: string
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

  return (
    <div className="group bg-black/40 rounded-xl shadow-lg border border-white/10 overflow-hidden transform transition duration-300 ease-out hover:shadow-2xl hover:-translate-y-1 hover:scale-[1.02] flex flex-col">
      <div className="relative h-44 sm:h-52 bg-gray-100 overflow-hidden">
        <img
          src={service.image || fallbackImage}
          alt={service.name}
          className="h-full w-full object-cover transform transition duration-500 ease-out group-hover:scale-110"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent pointer-events-none" />
        <div className="absolute left-4 right-4 bottom-4 flex items-center justify-between gap-2">
          <h3 className="text-white font-semibold text-base sm:text-lg line-clamp-2">
            {service.name}
          </h3>
          <span className="inline-flex items-center rounded-full bg-white/90 text-black text-xs font-semibold px-3 py-1 shadow-sm">
            ₹{service.price.toFixed(0)}
          </span>
        </div>
      </div>

      <div className="p-4 sm:p-5 flex flex-col flex-1">
        <p className="text-white/60 text-sm sm:text-base mb-3 line-clamp-3">
          {service.description}
        </p>
        <div className="mt-auto space-y-3">
          <div className="inline-flex items-center gap-2 text-xs sm:text-sm text-white/70 bg-white/10 px-3 py-1.5 rounded-full w-fit">
            <Clock className="w-4 h-4 text-[#ff7a00]" />
            <span>{durationLabel}</span>
          </div>
          <button
            onClick={handleBook}
            className="w-full py-2.5 rounded-lg font-semibold bg-[#ff7a00] text-black hover:brightness-110 shadow-sm hover:shadow-md transition"
          >
            Book Service
          </button>
        </div>
      </div>
    </div>
  )
}
