import Service from '../models/Service.js'
import ServiceBooking from '../models/ServiceBooking.js'

function normalizeBookingStatus(status) {
  const s = String(status || 'pending').toLowerCase().replace(/\s+/g, '')
  if (s === 'in-progress' || s === 'inprogress') return 'confirmed'
  if (s === 'booked') return 'pending'
  if (s === 'cancelled' || s === 'canceled') return 'completed'
  if (['pending', 'confirmed', 'completed'].includes(s)) return s
  return 'pending'
}

export const getServices = async (req, res) => {
  try {
    const services = await Service.find()
    res.json(services)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

export const getServiceById = async (req, res) => {
  try {
    const service = await Service.findById(req.params.id)
    if (!service) {
      return res.status(404).json({ message: 'Service not found' })
    }
    res.json(service)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

export const createService = async (req, res) => {
  try {
    const payload = { ...req.body }
    if (payload.serviceName && !payload.name) payload.name = payload.serviceName
    delete payload.serviceName
    const service = new Service(payload)
    const savedService = await service.save()
    res.status(201).json(savedService)
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
}

export const updateService = async (req, res) => {
  try {
    const payload = { ...req.body }
    if (payload.serviceName && !payload.name) payload.name = payload.serviceName
    delete payload.serviceName
    const service = await Service.findByIdAndUpdate(req.params.id, payload, {
      new: true,
      runValidators: true,
    })
    if (!service) {
      return res.status(404).json({ message: 'Service not found' })
    }
    res.json(service)
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
}

export const deleteService = async (req, res) => {
  try {
    const service = await Service.findByIdAndDelete(req.params.id)
    if (!service) {
      return res.status(404).json({ message: 'Service not found' })
    }
    res.json({ message: 'Service deleted successfully' })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

export const bookService = async (req, res) => {
  try {
    const body = req.body || {}
    const userRef = body.user || body.userId
    const serviceRef = body.service || body.serviceId
    const dateRaw = body.date || body.bookingDate
    const { time, notes, status } = body

    if (!userRef || !serviceRef || !dateRaw) {
      return res.status(400).json({ message: 'user/userId, service/serviceId, and date/bookingDate are required' })
    }

    const booking = new ServiceBooking({
      user: userRef,
      service: serviceRef,
      date: new Date(dateRaw),
      time: time || '',
      status: normalizeBookingStatus(status),
      notes: notes || '',
    })
    const savedBooking = await booking.save()
    const populated = await ServiceBooking.findById(savedBooking._id).populate('user').populate('service')
    res.status(201).json(populated)
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
}

export const getBookings = async (req, res) => {
  try {
    const bookings = await ServiceBooking.find().populate('user').populate('service')
    res.json(bookings)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

export const updateBooking = async (req, res) => {
  try {
    const patch = { ...req.body }
    if (patch.userId && !patch.user) patch.user = patch.userId
    if (patch.serviceId && !patch.service) patch.service = patch.serviceId
    if (patch.bookingDate && !patch.date) patch.date = patch.bookingDate
    delete patch.userId
    delete patch.serviceId
    delete patch.bookingDate

    const booking = await ServiceBooking.findByIdAndUpdate(req.params.id, patch, {
      new: true,
      runValidators: true,
    })
      .populate('user')
      .populate('service')
    if (!booking) {
      return res.status(404).json({ message: 'Service booking not found' })
    }
    res.json(booking)
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
}
