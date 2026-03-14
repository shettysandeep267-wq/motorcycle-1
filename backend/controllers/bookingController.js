import ServiceBooking from '../models/ServiceBooking.js'

export const createBooking = async (req, res) => {
  try {
    const { userId, serviceId, bookingDate, status } = req.body
    const booking = new ServiceBooking({ userId, serviceId, bookingDate, status })
    const savedBooking = await booking.save()
    await savedBooking.populate('userId')
    await savedBooking.populate('serviceId')
    res.status(201).json(savedBooking)
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
}

export const getBookingsByUserId = async (req, res) => {
  try {
    const bookings = await ServiceBooking.find({ userId: req.params.id })
      .populate('userId')
      .populate('serviceId')
    res.json(bookings)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}
