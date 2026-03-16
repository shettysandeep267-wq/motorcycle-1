import { useState, useEffect } from 'react'
import { createServiceRequest, getServices, syncUser } from '../../utils/api'
import ServiceCard from '../../components/ServiceCard'
import ServiceCardSkeleton from '../../components/ServiceCardSkeleton'
import toast from 'react-hot-toast'
import { CheckCircle, Calendar, X } from 'lucide-react'
import { useUser } from '@clerk/clerk-react'

interface Service {
  _id: string
  serviceName: string
  description: string
  price: number
  duration: string
  image?: string
}

const DUMMY_SERVICES: Service[] = [
  {
    _id: 'dummy-1',
    serviceName: 'Full Bike Service',
    description:
      'Complete motorcycle maintenance including oil change, brake inspection, chain lubrication and full safety check.',
    price: 2500,
    duration: '2 Hours',
    image: 'https://images.unsplash.com/photo-1519750157634-b6d493a0f77f?auto=format&fit=crop&w=1200&q=80',
  },
  {
    _id: 'dummy-2',
    serviceName: 'Engine Repair',
    description: 'Engine diagnostics, repair and tuning for smoother, more reliable performance.',
    price: 4500,
    duration: '4 Hours',
    image: 'https://images.unsplash.com/photo-1609639643509-4c3c6bcd1c7c?auto=format&fit=crop&w=1200&q=80',
  },
  {
    _id: 'dummy-3',
    serviceName: 'Brake Inspection',
    description: 'Detailed inspection of brake pads, discs and fluid for safe stopping power.',
    price: 800,
    duration: '30 Minutes',
    image: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1200&q=80',
  },
  {
    _id: 'dummy-4',
    serviceName: 'Oil Change Service',
    description: 'Quick engine oil and filter change using high-quality motorcycle oil.',
    price: 600,
    duration: '20 Minutes',
    image: 'https://images.unsplash.com/photo-1515923256482-1c04580b477c?auto=format&fit=crop&w=1200&q=80',
  },
]

interface BookingConfirmation {
  serviceName: string
  bookingDate: string
  status: string
}

interface LocalBooking {
  id: string
  serviceId: string
  serviceName: string
  bookingDate: string
}

export default function Services() {
  const { user } = useUser()
  const [services, setServices] = useState<Service[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedService, setSelectedService] = useState<Service | null>(null)
  const [showBookingForm, setShowBookingForm] = useState(false)
  const [confirmation, setConfirmation] = useState<BookingConfirmation | null>(null)
  const [bookings, setBookings] = useState<LocalBooking[]>([])
  const [bookingData, setBookingData] = useState({
    customerName: '',
    bikeModel: '',
    date: '',
    time: '',
  })

  useEffect(() => {
    fetchServices()
  }, [])

  const fetchServices = async () => {
    try {
      const response = await getServices()
      const data = (response.data || []) as Service[]
      if (data.length === 0) {
        setServices(DUMMY_SERVICES)
      } else {
        setServices(data)
      }
    } catch (error) {
      console.error('Error fetching services:', error)
      toast.error('Failed to load services, showing sample services instead')
      setServices(DUMMY_SERVICES)
    } finally {
      setLoading(false)
    }
  }

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

      const created = await createServiceRequest({
        userId,
        serviceId: selectedService._id,
        bookingDate: isoDate,
        customerName: bookingData.customerName.trim(),
        bikeModel: bookingData.bikeModel.trim(),
        serviceType: selectedService.serviceName,
        status: 'Booked',
      })

      const newBooking: LocalBooking = {
        id: created.data?._id ?? (crypto.randomUUID ? crypto.randomUUID() : `${Date.now()}`),
        serviceId: selectedService._id,
        serviceName: selectedService.serviceName,
        bookingDate: isoDate,
      }
      setBookings((prev) => [newBooking, ...prev])

      setConfirmation({
        serviceName: selectedService.serviceName,
        bookingDate: prettyDate,
        status: 'Booked',
      })
      setShowBookingForm(false)
      toast.success('Service booked successfully!')
    } catch (error: any) {
      toast.error(error?.response?.data?.message || 'Failed to book service')
    }
  }

  const closeConfirmation = () => setConfirmation(null)

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-10 text-white">
        <div className="h-9 bg-white/10 rounded w-56 animate-pulse mb-6" />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {Array.from({ length: 6 }).map((_, i) => (
            <ServiceCardSkeleton key={i} />
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-10 text-white">
      <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-white mb-2">
        Motorcycle Services
      </h1>
      <p className="text-white/65 mb-6 sm:mb-8 max-w-2xl">
        Book trusted bike repair and maintenance services with transparent pricing and convenient
        online scheduling.
      </p>

      {/* Booking form modal */}
      {showBookingForm && selectedService && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
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
                  className="flex-1 py-2.5 rounded-lg font-semibold bg-[#ff7a00] text-black hover:brightness-110 disabled:opacity-50 flex items-center justify-center gap-2 transition"
                >
                  Book
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Confirmation modal */}
      {confirmation && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
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

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
        {services.map((service) => (
          <ServiceCard
            key={service._id}
            service={{
              ...service,
              name: service.serviceName,
            }}
            onBook={handleBookService}
          />
        ))}
      </div>

      {services.length === 0 && (
        <div className="text-center py-12 sm:py-16 bg-white/5 rounded-xl shadow-sm border border-white/10 mt-6">
          <p className="text-white font-semibold mb-1">No services available</p>
          <p className="text-white/60">Please check back soon for new service slots.</p>
        </div>
      )}
    </div>
  )
}
