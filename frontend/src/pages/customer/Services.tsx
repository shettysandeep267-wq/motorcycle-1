import { useState, useEffect } from 'react'
import { useUser } from '@clerk/clerk-react'
import { getServices, createBooking, syncUser } from '../../utils/api'
import ServiceCard from '../../components/ServiceCard'
import ServiceCardSkeleton from '../../components/ServiceCardSkeleton'
import LoadingSpinner from '../../components/LoadingSpinner'
import toast from 'react-hot-toast'
import { CheckCircle, Calendar, X } from 'lucide-react'

interface Service {
  _id: string
  serviceName: string
  description: string
  price: number
  duration: string
  image?: string
}

interface BookingConfirmation {
  serviceName: string
  bookingDate: string
  status: string
}

export default function Services() {
  const { user } = useUser()
  const [services, setServices] = useState<Service[]>([])
  const [loading, setLoading] = useState(true)
  const [submitting, setSubmitting] = useState(false)
  const [selectedService, setSelectedService] = useState<Service | null>(null)
  const [showBookingForm, setShowBookingForm] = useState(false)
  const [confirmation, setConfirmation] = useState<BookingConfirmation | null>(null)
  const [bookingData, setBookingData] = useState({
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
        setServices([
          {
            _id: 'fallback-s1',
            serviceName: 'Full Bike Service',
            description:
              'Complete motorcycle maintenance including oil change, brake inspection, chain lubrication and full safety check.',
            price: 2500,
            duration: '2 hours',
            image:
              'https://images.unsplash.com/photo-1519750157634-b6d493a0f77f?auto=format&fit=crop&w=900&q=80',
          },
          {
            _id: 'fallback-s2',
            serviceName: 'Engine Tune & Repair',
            description: 'Engine diagnostics, tuning and repair for smoother power delivery.',
            price: 4500,
            duration: '4 hours',
            image:
              'https://images.unsplash.com/photo-1609639643509-4c3c6bcd1c7c?auto=format&fit=crop&w=900&q=80',
          },
          {
            _id: 'fallback-s3',
            serviceName: 'Brake Service',
            description: 'Brake pads check, fluid top-up and complete brake system inspection.',
            price: 1200,
            duration: '1.5 hours',
            image:
              'https://images.unsplash.com/photo-1526498460520-4c246339dccb?auto=format&fit=crop&w=900&q=80',
          },
          {
            _id: 'fallback-s4',
            serviceName: 'Tire Change & Alignment',
            description: 'Front or rear tire change with balancing and alignment check.',
            price: 1500,
            duration: '1.5 hours',
            image:
              'https://images.unsplash.com/photo-1518655048521-f130df041f66?auto=format&fit=crop&w=900&q=80',
          },
          {
            _id: 'fallback-s5',
            serviceName: 'Express Oil Change',
            description: 'Quick engine oil and filter replacement with premium oil.',
            price: 800,
            duration: '45 minutes',
            image:
              'https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?auto=format&fit=crop&w=900&q=80',
          },
        ])
      } else {
        setServices(data)
      }
    } catch (error) {
      console.error('Error fetching services:', error)
      toast.error('Failed to load services')
    } finally {
      setLoading(false)
    }
  }

  const handleBookService = (service: Service) => {
    setSelectedService(service)
    setShowBookingForm(true)
    setConfirmation(null)
    setBookingData({ date: '', time: '' })
  }

  const handleSubmitBooking = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!selectedService) return
    setSubmitting(true)
    try {
      const email = user?.primaryEmailAddress?.emailAddress
      if (!email) {
        toast.error('Please sign in to book a service')
        return
      }
      let userId: string | null = null
      try {
        const syncRes = await syncUser({
          clerkId: user!.id,
          name: user!.fullName ?? undefined,
          email,
        })
        userId = syncRes.data?._id
      } catch {
        toast.error('Could not verify your account')
        setSubmitting(false)
        return
      }
      if (!userId) {
        toast.error('Could not verify your account')
        setSubmitting(false)
        return
      }
      const bookingDate = new Date(`${bookingData.date}T${bookingData.time}`).toISOString()
      await createBooking({
        userId,
        serviceId: selectedService._id,
        bookingDate,
        status: 'pending',
      })
      setConfirmation({
        serviceName: selectedService.serviceName,
        bookingDate: new Date(bookingDate).toLocaleString(undefined, {
          dateStyle: 'full',
          timeStyle: 'short',
        }),
        status: 'pending',
      })
      setShowBookingForm(false)
      toast.success('Service booked successfully!')
    } catch (error) {
      console.error('Error booking service:', error)
      toast.error('Failed to book service. Please try again.')
    } finally {
      setSubmitting(false)
    }
  }

  const closeConfirmation = () => setConfirmation(null)

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-10">
        <div className="h-9 bg-gray-200 rounded w-56 animate-pulse mb-6" />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {Array.from({ length: 6 }).map((_, i) => (
            <ServiceCardSkeleton key={i} />
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-10">
      <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">Motorcycle Services</h1>
      <p className="text-gray-600 mb-6 sm:mb-8 max-w-2xl">
        Book trusted bike repair and maintenance services with transparent pricing and convenient
        online scheduling.
      </p>

      {/* Booking form modal */}
      {showBookingForm && selectedService && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-xl max-w-md w-full mx-auto p-6">
            <h2 className="text-xl font-bold mb-4">Book {selectedService.serviceName}</h2>
            <form onSubmit={handleSubmitBooking} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Date</label>
                <input
                  type="date"
                  value={bookingData.date}
                  onChange={(e) => setBookingData((p) => ({ ...p, date: e.target.value }))}
                  className="w-full border border-gray-200 rounded-lg px-3 py-2.5 focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Time</label>
                <input
                  type="time"
                  value={bookingData.time}
                  onChange={(e) => setBookingData((p) => ({ ...p, time: e.target.value }))}
                  className="w-full border border-gray-200 rounded-lg px-3 py-2.5 focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
              <div className="flex gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setShowBookingForm(false)}
                  className="flex-1 py-2.5 rounded-lg font-medium border border-gray-200 text-gray-700 hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={submitting}
                  className="flex-1 py-2.5 rounded-lg font-medium bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50 flex items-center justify-center gap-2"
                >
                  {submitting ? <LoadingSpinner size="sm" /> : null}
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
          <div className="bg-white rounded-xl shadow-xl max-w-md w-full mx-auto p-6">
            <div className="text-center">
              <div className="mx-auto w-14 h-14 rounded-full bg-green-100 flex items-center justify-center mb-4">
                <CheckCircle className="w-8 h-8 text-green-600" />
              </div>
              <h2 className="text-xl font-bold text-gray-900 mb-2">Booking confirmed</h2>
              <p className="text-gray-600 mb-4">{confirmation.serviceName}</p>
              <div className="flex items-center justify-center gap-2 text-gray-700 mb-6">
                <Calendar className="w-5 h-5 text-gray-400" />
                <span>{confirmation.bookingDate}</span>
              </div>
              <p className="text-sm text-gray-500 mb-6">Status: {confirmation.status}</p>
              <button
                onClick={closeConfirmation}
                className="w-full py-2.5 rounded-lg font-medium bg-blue-600 text-white hover:bg-blue-700 flex items-center justify-center gap-2"
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
    </div>
  )
}
