import ServiceBooking from '../models/ServiceBooking.js'
import ServiceRequest from '../models/ServiceRequest.js'

function normalizeBookingStatus(status) {
  const s = String(status || 'pending').toLowerCase().replace(/\s+/g, '')
  if (s === 'in-progress' || s === 'inprogress') return 'confirmed'
  if (s === 'booked') return 'pending'
  if (s === 'cancelled' || s === 'canceled') return 'completed'
  if (['pending', 'confirmed', 'completed'].includes(s)) return s
  return 'pending'
}

export const createBooking = async (req, res) => {
  try {
    const body = req.body || {}
    const userRef = body.user || body.userId
    const serviceRef = body.service || body.serviceId
    const dateRaw = body.date || body.bookingDate
    const { time, notes, status, customerName, serviceType, bikeModel } = body

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

    await ServiceRequest.create({
      userId: userRef,
      serviceId: serviceRef,
      bookingDate: new Date(dateRaw),
      status: status || 'Booked',
      customerName: customerName || '',
      serviceType: serviceType || '',
      bikeModel: bikeModel || '',
    })

    const populated = await ServiceBooking.findById(savedBooking._id)
      .populate('user')
      .populate('service')
    res.status(201).json(populated)
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
}

export const getBookingsByUserId = async (req, res) => {
  try {
    const bookings = await ServiceBooking.find({ user: req.params.id })
      .populate('user')
      .populate('service')
    res.json(bookings)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}
