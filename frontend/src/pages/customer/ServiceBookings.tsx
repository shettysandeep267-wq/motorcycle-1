import { useEffect, useState } from 'react'
import { useUser } from '@clerk/clerk-react'
import toast from 'react-hot-toast'
import { Calendar, Wrench } from 'lucide-react'
import { cancelServiceRequest, getServiceRequestsByUser, syncUser } from '../../utils/api'

type ServiceRequest = {
  _id: string
  customerName?: string
  serviceType?: string
  bikeModel?: string
  bookingDate?: string
  status?: string
  serviceId?: { serviceName?: string }
  createdAt?: string
}

const statusBadge = (status?: string) => {
  const s = (status || '').toLowerCase()
  if (s === 'cancelled') return 'bg-red-500/10 text-red-300 border border-red-500/20'
  if (s === 'booked' || s === 'pending') return 'bg-amber-500/10 text-amber-300 border border-amber-500/20'
  if (s === 'in-progress') return 'bg-blue-500/10 text-blue-300 border border-blue-500/20'
  if (s === 'completed') return 'bg-green-500/10 text-green-300 border border-green-500/20'
  return 'bg-white/10 text-white/70 border border-white/10'
}

export default function ServiceBookings() {
  const { user } = useUser()
  const [loading, setLoading] = useState(true)
  const [items, setItems] = useState<ServiceRequest[]>([])
  const [cancellingId, setCancellingId] = useState<string | null>(null)

  const fetchBookings = async () => {
    try {
      const email = user?.primaryEmailAddress?.emailAddress
      if (!user?.id || !email) {
        setItems([])
        return
      }
      const syncRes = await syncUser({
        clerkId: user.id,
        name: user.fullName ?? undefined,
        email,
      })
      const userId = syncRes.data?._id
      if (!userId) {
        setItems([])
        return
      }
      const res = await getServiceRequestsByUser(userId)
      setItems(Array.isArray(res.data) ? res.data : [])
    } catch (err: unknown) {
      toast.error(err instanceof Error ? err.message : 'Failed to load service bookings')
      setItems([])
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchBookings()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user?.id])

  const handleCancel = async (id: string) => {
    try {
      const email = user?.primaryEmailAddress?.emailAddress
      if (!user?.id || !email) {
        toast.error('Please sign in')
        return
      }
      setCancellingId(id)
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
      await cancelServiceRequest(id, { userId })
      toast.success('Booking cancelled')
      await fetchBookings()
    } catch (err: unknown) {
      toast.error(err instanceof Error ? err.message : 'Failed to cancel booking')
    } finally {
      setCancellingId(null)
    }
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-10 text-white">
      <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-white mb-2">
        My Service Bookings
      </h1>
      <p className="text-white/65 mb-6 sm:mb-8 max-w-2xl">
        View your booked services and cancel if needed.
      </p>

      {loading ? (
        <div className="space-y-3">
          {Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className="bg-white/5 border border-white/10 rounded-xl p-5 animate-pulse">
              <div className="h-5 w-44 bg-white/10 rounded mb-3" />
              <div className="h-4 w-72 bg-white/10 rounded" />
            </div>
          ))}
        </div>
      ) : items.length === 0 ? (
        <div className="bg-white/5 border border-white/10 rounded-xl p-10 text-center">
          <Wrench className="w-12 h-12 text-white/30 mx-auto mb-3" />
          <div className="text-white font-semibold">No service bookings yet</div>
          <div className="text-white/60 text-sm mt-1">Book a service and it will appear here.</div>
        </div>
      ) : (
        <div className="space-y-4">
          {items.map((r) => {
            const displayService = r.serviceType || r.serviceId?.serviceName || 'Service'
            const displayDate = r.bookingDate
              ? new Date(r.bookingDate).toLocaleString(undefined, { dateStyle: 'full', timeStyle: 'short' })
              : '-'
            const s = (r.status || '').toLowerCase()
            const canCancel =
              s === 'booked' || s === 'pending' || s === 'in-progress'
            const isCancelled = s === 'cancelled'
            return (
              <div key={r._id} className="bg-white/5 border border-white/10 rounded-xl p-5">
                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3">
                  <div>
                    <div className="text-lg font-semibold text-white">{displayService}</div>
                    <div className="text-sm text-white/70 mt-1">
                      <span className="text-white/50">Bike:</span> {r.bikeModel || '-'}
                    </div>
                    <div className="text-sm text-white/70 mt-1 flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-white/40" />
                      <span>{displayDate}</span>
                    </div>
                    <div className="text-sm text-white/70 mt-1">
                      <span className="text-white/50">Customer:</span> {r.customerName || '-'}
                    </div>
                  </div>

                  <div className="flex flex-col items-start sm:items-end gap-3">
                    <span className={`px-3 py-1.5 rounded-full text-sm font-semibold ${statusBadge(r.status)}`}>
                      {r.status || 'Booked'}
                    </span>
                    {canCancel && !isCancelled ? (
                      <button
                        onClick={() => handleCancel(r._id)}
                        disabled={cancellingId === r._id}
                        className="px-4 py-2 rounded-lg font-semibold border border-red-500/30 text-red-200 hover:bg-red-500/10 disabled:opacity-60"
                      >
                        {cancellingId === r._id ? 'Cancelling…' : 'Cancel Booking'}
                      </button>
                    ) : null}
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}

