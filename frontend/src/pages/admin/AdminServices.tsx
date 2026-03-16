import { useState, useEffect } from 'react'
import {
  getServices,
  createService,
  updateService,
  deleteService,
  getServiceBookings,
  updateServiceStatus,
} from '../../utils/api'
import toast from 'react-hot-toast'
import { Plus, Edit, Trash2, Wrench, Calendar } from 'lucide-react'

interface Service {
  _id: string
  serviceName: string
  description: string
  price: number
  duration: number
}

interface ServiceBooking {
  _id: string
  serviceId?: { _id: string; serviceName?: string }
  userId?: { _id: string; name?: string; email?: string }
  bookingDate: string
  status: string
}

export default function AdminServices() {
  const [services, setServices] = useState<Service[]>([])
  const [bookings, setBookings] = useState<ServiceBooking[]>([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [editingService, setEditingService] = useState<Service | null>(null)
  const [formData, setFormData] = useState({
    serviceName: '',
    description: '',
    price: '',
    duration: '',
  })

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async () => {
    try {
      const [servicesRes, bookingsRes] = await Promise.all([
        getServices(),
        getServiceBookings(),
      ])
      setServices(servicesRes.data || [])
      setBookings(bookingsRes.data || [])
    } catch (error) {
      console.error('Error fetching data:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const serviceData = {
        serviceName: formData.serviceName,
        description: formData.description,
        price: parseFloat(formData.price),
        duration: parseInt(formData.duration, 10),
      }
      if (editingService) {
        await updateService(editingService._id, serviceData)
      } else {
        await createService(serviceData)
      }
      fetchData()
      resetForm()
      toast.success(editingService ? 'Service updated' : 'Service created')
    } catch (error) {
      console.error('Error saving service:', error)
      toast.error('Failed to save service')
    }
  }

  const handleEdit = (service: Service) => {
    setEditingService(service)
    setFormData({
      serviceName: service.serviceName,
      description: service.description,
      price: service.price.toString(),
      duration: service.duration.toString(),
    })
    setShowForm(true)
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this service?')) return
    try {
      await deleteService(id)
      fetchData()
      toast.success('Service deleted')
    } catch (error) {
      console.error('Error deleting service:', error)
      toast.error('Failed to delete service')
    }
  }

  const handleUpdateBookingStatus = async (id: string, status: string) => {
    try {
      await updateServiceStatus(id, { status })
      fetchData()
      toast.success('Booking status updated')
    } catch (error) {
      console.error('Error updating booking status:', error)
      toast.error('Failed to update status')
    }
  }

  const resetForm = () => {
    setFormData({ serviceName: '', description: '', price: '', duration: '' })
    setEditingService(null)
    setShowForm(false)
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-green-50 text-green-700'
      case 'in-progress':
        return 'bg-blue-50 text-blue-700'
      case 'cancelled':
        return 'bg-red-50 text-red-700'
      default:
        return 'bg-amber-50 text-amber-700'
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600" />
      </div>
    )
  }

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-amber-50">
            <Wrench className="w-6 h-6 text-amber-600" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Services & Bookings</h1>
            <p className="text-sm text-gray-500">Manage service packages and view bookings</p>
          </div>
        </div>
        <button
          onClick={() => setShowForm(true)}
          className="inline-flex items-center gap-2 bg-amber-600 text-white px-4 py-2.5 rounded-lg font-medium hover:bg-amber-700 transition"
        >
          <Plus className="w-5 h-5" />
          Add Service
        </button>
      </div>

      {showForm && (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">
            {editingService ? 'Edit Service' : 'Add New Service'}
          </h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Service Name</label>
                <input
                  type="text"
                  value={formData.serviceName}
                  onChange={(e) => setFormData({ ...formData, serviceName: e.target.value })}
                  className="w-full border border-gray-200 rounded-lg px-3 py-2 focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Price (₹)</label>
                <input
                  type="number"
                  step="0.01"
                  min="0"
                  value={formData.price}
                  onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                  className="w-full border border-gray-200 rounded-lg px-3 py-2 focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Duration (min)</label>
                <input
                  type="number"
                  min="1"
                  value={formData.duration}
                  onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
                  className="w-full border border-gray-200 rounded-lg px-3 py-2 focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
                  required
                />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full border border-gray-200 rounded-lg px-3 py-2 focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
                  rows={3}
                  required
                />
              </div>
            </div>
            <div className="flex gap-3">
              <button
                type="submit"
                className="bg-amber-600 text-white px-5 py-2.5 rounded-lg font-medium hover:bg-amber-700"
              >
                {editingService ? 'Update' : 'Create'}
              </button>
              <button
                type="button"
                onClick={resetForm}
                className="bg-gray-100 text-gray-700 px-5 py-2.5 rounded-lg font-medium hover:bg-gray-200"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      <div className="grid lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-100">
            <h2 className="text-lg font-semibold text-gray-900">Service Packages</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase">
                    Name
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase">
                    Price
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase">
                    Duration
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-semibold text-gray-500 uppercase">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {services.map((service) => (
                  <tr key={service._id} className="hover:bg-gray-50/50">
                    <td className="px-6 py-4 font-medium text-gray-900">{service.serviceName}</td>
                    <td className="px-6 py-4">₹{service.price.toFixed(0)}</td>
                    <td className="px-6 py-4 text-gray-600">{service.duration} min</td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => handleEdit(service)}
                          className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition"
                        >
                          <Edit className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDelete(service._id)}
                          className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {services.length === 0 && (
            <div className="px-6 py-8 text-center text-gray-500">No services yet.</div>
          )}
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-100 flex items-center gap-2">
            <Calendar className="w-5 h-5 text-gray-500" />
            <h2 className="text-lg font-semibold text-gray-900">Service Bookings</h2>
          </div>
          <div className="p-4 max-h-[420px] overflow-y-auto space-y-3">
            {bookings.map((booking) => (
              <div
                key={booking._id}
                className="p-4 rounded-lg border border-gray-100 hover:border-gray-200 transition"
              >
                <div className="flex justify-between items-start gap-3 mb-2">
                  <div>
                    <p className="font-medium text-gray-900">
                      {booking.serviceId?.serviceName ?? 'Service'}
                    </p>
                    <p className="text-sm text-gray-500">
                      {booking.userId?.name ?? 'Guest'}
                      {booking.userId?.email && ` · ${booking.userId.email}`}
                    </p>
                    <p className="text-sm text-gray-500 mt-1">
                      {new Date(booking.bookingDate).toLocaleDateString(undefined, {
                        dateStyle: 'medium',
                        timeStyle: 'short',
                      })}
                    </p>
                  </div>
                  <select
                    value={booking.status}
                    onChange={(e) => handleUpdateBookingStatus(booking._id, e.target.value)}
                    className={`text-xs font-medium px-2.5 py-1.5 rounded-lg border-0 ${getStatusColor(
                      booking.status
                    )}`}
                  >
                    <option value="pending">Pending</option>
                    <option value="in-progress">In Progress</option>
                    <option value="completed">Completed</option>
                    <option value="cancelled">Cancelled</option>
                  </select>
                </div>
              </div>
            ))}
            {bookings.length === 0 && (
              <div className="py-8 text-center text-gray-500">No bookings yet.</div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
