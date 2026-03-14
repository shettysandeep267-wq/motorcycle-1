import Service from '../models/Service.js'
import ServiceBooking from '../models/ServiceBooking.js'

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
    const service = new Service(req.body)
    const savedService = await service.save()
    res.status(201).json(savedService)
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
}

export const updateService = async (req, res) => {
  try {
    const service = await Service.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    )
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

export const getBookings = async (req, res) => {
  try {
    const bookings = await ServiceBooking.find().populate('userId').populate('serviceId')
    res.json(bookings)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

export const updateBooking = async (req, res) => {
  try {
    const booking = await ServiceBooking.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    ).populate('userId').populate('serviceId')
    if (!booking) {
      return res.status(404).json({ message: 'Service booking not found' })
    }
    res.json(booking)
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
}
