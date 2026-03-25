import { useMemo, useState } from 'react'
import { createServiceRequest, syncUser } from '../../utils/api'
import ServiceCard from '../../components/ServiceCard'
import toast from 'react-hot-toast'
import { CheckCircle, Calendar, X, Search, Wrench } from 'lucide-react'
import { useUser } from '@clerk/clerk-react'
import { motion, AnimatePresence } from 'framer-motion'
import { SERVICE_CATEGORY_ORDER } from '../../data/services'
import { useCatalogStore } from '../../stores/catalogStore'

interface Service {
  _id: string
  serviceName: string
  description: string
  price: number
  duration: string
  image?: string
  category?: string
}

/** API returns duration in minutes; cards need a readable label */
function formatServiceDuration(minutes: number): string {
  if (!Number.isFinite(minutes) || minutes <= 0) return 'Flexible'
  if (minutes < 60) return `${Math.round(minutes)} min`
  const h = Math.floor(minutes / 60)
  const m = Math.round(minutes % 60)
  if (m === 0) return `${h} hour${h > 1 ? 's' : ''}`
  return `${h}h ${m} min`
}

interface BookingConfirmation {
  serviceName: string
  bookingDate: string
  status: string
}

const FILTERS: Array<'All' | (typeof SERVICE_CATEGORY_ORDER)[number]> = [
  'All',
  ...SERVICE_CATEGORY_ORDER,
]

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.035, delayChildren: 0.05 },
  },
}

const gridItem = {
  hidden: { opacity: 0, y: 26 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.42 },
  },
}

export default function Services() {
  const { user } = useUser()
  const rawServices = useCatalogStore((s) => s.services)
  const services = useMemo<Service[]>(
    () =>
      rawServices.map((s) => ({
        _id: s._id,
        serviceName: s.serviceName,
        description: s.description,
        price: s.price,
        duration: formatServiceDuration(s.duration),
        image: s.image,
        category: s.category,
      })),
    [rawServices]
  )
  const [selectedService, setSelectedService] = useState<Service | null>(null)
  const [showBookingForm, setShowBookingForm] = useState(false)
  const [confirmation, setConfirmation] = useState<BookingConfirmation | null>(null)
  const [search, setSearch] = useState('')
  const [activeCategory, setActiveCategory] = useState<(typeof FILTERS)[number]>('All')
  const [bookingData, setBookingData] = useState({
    customerName: '',
    bikeModel: '',
    date: '',
    time: '',
  })

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase()
    return services.filter((s) => {
      const catOk = activeCategory === 'All' || s.category === activeCategory
      const hay = `${s.serviceName} ${s.description} ${s.category ?? ''}`.toLowerCase()
      const searchOk = !q || hay.includes(q)
      return catOk && searchOk
    })
  }, [services, search, activeCategory])

  const handleBookService = (service: Service) => {
    setSelectedService(service)
    setShowBookingForm(true)
    setConfirmation(null)
    setBookingData({
      customerName: user?.fullName ?? '',
      bikeModel: '',
      date: '',
      time: '',
    })
  }

  const handleSubmitBooking = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!selectedService) return
    if (!bookingData.customerName.trim()) {
      toast.error('Please enter customer name')
      return
    }
    if (!bookingData.bikeModel.trim()) {
      toast.error('Please enter bike model')
      return
    }
    if (!bookingData.date) {
      toast.error('Please select a booking date')
      return
    }

    const isoDate = new Date(
      `${bookingData.date}T${bookingData.time || '10:00'}`
    ).toISOString()

    const prettyDate = new Date(isoDate).toLocaleString(undefined, {
      dateStyle: 'full',
      timeStyle: 'short',
    })

    try {
      const email = user?.primaryEmailAddress?.emailAddress
      if (!user?.id || !email) {
        toast.error('Please sign in')
        return
      }

      const syncRes = await syncUser({
        clerkId: user.id,
        name: user.fullName ?? undefined,
        email,
      })
      const userId = syncRes.data?._id
      if (!userId) {
        toast.error('Could not verify your account')
        return
      }

      await createServiceRequest({
        userId,
        serviceId: selectedService._id,
        bookingDate: isoDate,
        customerName: bookingData.customerName.trim(),
        bikeModel: bookingData.bikeModel.trim(),
        serviceType: selectedService.serviceName,
        status: 'pending',
      })

      setConfirmation({
        serviceName: selectedService.serviceName,
        bookingDate: prettyDate,
        status: 'pending',
      })
      setShowBookingForm(false)
      toast.success('Service booked successfully!')
    } catch (error: unknown) {
      const msg = error instanceof Error ? error.message : 'Failed to book service'
      toast.error(msg)
    }
  }

  const closeConfirmation = () => setConfirmation(null)

  const gridClass =
    'grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5 sm:gap-6 lg:gap-8'

  return (
    <div className="min-h-screen bg-[#050505] text-white relative overflow-hidden">
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.32]"
        style={{
          backgroundImage:
            'radial-gradient(ellipse 70% 45% at 20% 0%, rgba(255,122,0,0.2), transparent), radial-gradient(ellipse 50% 40% at 90% 60%, rgba(255,255,255,0.05), transparent)',
        }}
      />

      <div className="relative max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-10 pt-10 sm:pt-14 pb-16 sm:pb-24">
        <motion.header
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.48 }}
          className="mb-10 sm:mb-12"
        >
          <div className="flex flex-wrap items-center gap-2 text-[#ff7a00] text-xs font-bold uppercase tracking-[0.2em] mb-3">
            <Wrench className="w-4 h-4" />
            <span>Workshop & service bay</span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white max-w-3xl">
            Factory-grade care for every motorcycle
          </h1>
          <p className="mt-4 text-base sm:text-lg text-white/60 max-w-2xl leading-relaxed">
            From quick oil changes to full servicing, engine and brake work, tyres, detailing, and
            custom installs—book online with transparent pricing.
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <div className="rounded-2xl bg-white/[0.06] border border-white/10 px-5 py-3 backdrop-blur-sm">
              <p className="text-2xl font-bold tabular-nums">{services.length}</p>
              <p className="text-xs text-white/50 uppercase tracking-wider">Service packages</p>
            </div>
            <div className="rounded-2xl bg-white/[0.06] border border-white/10 px-5 py-3 backdrop-blur-sm">
              <p className="text-2xl font-bold tabular-nums">{SERVICE_CATEGORY_ORDER.length}</p>
              <p className="text-xs text-white/50 uppercase tracking-wider">Specialties</p>
            </div>
          </div>
        </motion.header>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.06 }}
          className="sticky top-0 z-20 -mx-4 px-4 sm:mx-0 sm:px-0 py-3 sm:py-4 mb-8 bg-[#050505]/88 backdrop-blur-xl border-b border-white/[0.06]"
        >
          <div className="flex flex-col lg:flex-row lg:items-center gap-4 lg:gap-6">
            <div className="relative flex-1 min-w-0">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/35 pointer-events-none" />
              <input
                type="search"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search services, e.g. oil, brake, tyre, wash…"
                className="w-full rounded-2xl border border-white/10 bg-white/[0.06] pl-12 pr-4 py-3.5 text-white placeholder:text-white/35 outline-none focus:ring-2 focus:ring-[#ff7a00]/50 focus:border-[#ff7a00]/40 transition"
                aria-label="Search services"
              />
            </div>
            <div className="flex gap-2 overflow-x-auto pb-1 lg:pb-0">
              {FILTERS.map((cat) => {
                const active = activeCategory === cat
                return (
                  <motion.button
                    key={cat}
                    type="button"
                    onClick={() => setActiveCategory(cat)}
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.98 }}
                    className={`shrink-0 rounded-full px-3.5 sm:px-4 py-2.5 text-xs sm:text-sm font-semibold border transition-colors ${
                      active
                        ? 'bg-[#ff7a00] text-black border-[#ff7a00] shadow-[0_0_20px_rgba(255,122,0,0.3)]'
                        : 'bg-white/[0.05] text-white/80 border-white/10 hover:bg-white/[0.09]'
                    }`}
                  >
                    {cat}
                  </motion.button>
                )
              })}
            </div>
          </div>
        </motion.div>

        {showBookingForm && selectedService && (
          <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4 backdrop-blur-sm">
            <div className="bg-[#0a0a0a] border border-white/10 rounded-xl shadow-xl max-w-md w-full mx-auto p-6 text-white">
              <h2 className="text-xl font-bold mb-4">Book {selectedService.serviceName}</h2>
              <form onSubmit={handleSubmitBooking} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-white/80 mb-1">Customer Name</label>
                  <input
                    type="text"
                    value={bookingData.customerName}
                    onChange={(e) => setBookingData((p) => ({ ...p, customerName: e.target.value }))}
                    className="w-full border border-white/10 bg-white/5 text-white rounded-lg px-3 py-2.5 focus:ring-2 focus:ring-[#ff7a00] focus:border-[#ff7a00] outline-none transition"
                    placeholder="Enter your name"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-white/80 mb-1">Bike Model</label>
                  <input
                    type="text"
                    value={bookingData.bikeModel}
                    onChange={(e) => setBookingData((p) => ({ ...p, bikeModel: e.target.value }))}
                    className="w-full border border-white/10 bg-white/5 text-white rounded-lg px-3 py-2.5 focus:ring-2 focus:ring-[#ff7a00] focus:border-[#ff7a00] outline-none transition"
                    placeholder="e.g. Pulsar 150, Splendor, R15"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-white/80 mb-1">Date</label>
                  <input
                    type="date"
                    value={bookingData.date}
                    onChange={(e) => setBookingData((p) => ({ ...p, date: e.target.value }))}
                    className="w-full border border-white/10 bg-white/5 text-white rounded-lg px-3 py-2.5 focus:ring-2 focus:ring-[#ff7a00] focus:border-[#ff7a00] outline-none transition"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-white/80 mb-1">Time</label>
                  <input
                    type="time"
                    value={bookingData.time}
                    onChange={(e) => setBookingData((p) => ({ ...p, time: e.target.value }))}
                    className="w-full border border-white/10 bg-white/5 text-white rounded-lg px-3 py-2.5 focus:ring-2 focus:ring-[#ff7a00] focus:border-[#ff7a00] outline-none transition"
                    required
                  />
                </div>
                <div className="flex gap-3 pt-2">
                  <button
                    type="button"
                    onClick={() => setShowBookingForm(false)}
                    className="flex-1 py-2.5 rounded-lg font-medium border border-white/10 text-white/80 hover:bg-white/10 transition"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="flex-1 py-2.5 rounded-lg font-semibold bg-[#ff7a00] text-black hover:brightness-110 flex items-center justify-center gap-2 transition"
                  >
                    Book
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {confirmation && (
          <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4 backdrop-blur-sm">
            <div className="bg-[#0a0a0a] border border-white/10 rounded-xl shadow-xl max-w-md w-full mx-auto p-6 text-white">
              <div className="text-center">
                <div className="mx-auto w-14 h-14 rounded-full bg-green-100 flex items-center justify-center mb-4">
                  <CheckCircle className="w-8 h-8 text-green-600" />
                </div>
                <h2 className="text-xl font-bold text-white mb-2">Booking confirmed</h2>
                <p className="text-white/70 mb-4">{confirmation.serviceName}</p>
                <div className="flex items-center justify-center gap-2 text-white/80 mb-6">
                  <Calendar className="w-5 h-5 text-white/40" />
                  <span>{confirmation.bookingDate}</span>
                </div>
                <p className="text-sm text-white/60 mb-6">Status: {confirmation.status}</p>
                <button
                  onClick={closeConfirmation}
                  className="w-full py-2.5 rounded-lg font-semibold bg-[#ff7a00] text-black hover:brightness-110 flex items-center justify-center gap-2 transition"
                >
                  <X className="w-4 h-4" />
                  Close
                </button>
              </div>
            </div>
          </div>
        )}

        <AnimatePresence mode="popLayout">
          {filtered.length === 0 ? (
            <motion.div
              key="empty"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="text-center py-20 rounded-3xl bg-white/[0.03] border border-white/10"
            >
              <p className="text-xl font-semibold text-white mb-2">No services match</p>
              <p className="text-white/55 max-w-md mx-auto px-4 mb-6">
                Adjust filters or search—we list {services.length} workshop packages.
              </p>
              <button
                type="button"
                onClick={() => {
                  setSearch('')
                  setActiveCategory('All')
                }}
                className="rounded-full bg-[#ff7a00] text-black font-bold px-6 py-2.5 hover:brightness-110 transition"
              >
                Reset filters
              </button>
            </motion.div>
          ) : (
            <motion.div
              key="grid"
              variants={container}
              initial="hidden"
              animate="show"
              className={gridClass}
            >
              {filtered.map((service) => (
                <motion.div
                  key={service._id}
                  layout
                  layoutId={`svc-${service._id}`}
                  variants={gridItem}
                  whileHover={{ y: -8, transition: { duration: 0.28 } }}
                  className="h-full"
                >
                  <div className="h-full rounded-2xl transition-shadow duration-300 hover:shadow-[0_24px_48px_-12px_rgba(0,0,0,0.65),0_0_0_1px_rgba(255,122,0,0.1)]">
                    <ServiceCard
                      service={{
                        _id: service._id,
                        name: service.serviceName,
                        description: service.description,
                        price: service.price,
                        duration: service.duration,
                        image: service.image,
                        category: service.category,
                      }}
                      onBook={(s) =>
                        handleBookService({
                          _id: s._id,
                          serviceName: s.name,
                          description: s.description,
                          price: s.price,
                          duration: s.duration,
                          image: s.image,
                          category: s.category,
                        })
                      }
                    />
                  </div>
                </motion.div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}
