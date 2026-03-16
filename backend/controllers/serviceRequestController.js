import ServiceRequest from '../models/ServiceRequest.js'

export const createServiceRequest = async (req, res) => {
  try {
    const { userId, serviceId, bookingDate, status, customerName, serviceType, bikeModel } = req.body
    const doc = new ServiceRequest({
      userId,
      serviceId,
      bookingDate,
      status: status ?? 'Booked',
      customerName,
      serviceType,
      bikeModel,
    })
    const saved = await doc.save()
    await saved.populate('userId')
    await saved.populate('serviceId')
    res.status(201).json(saved)
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
}

export const getServiceRequests = async (req, res) => {
  try {
    const requests = await ServiceRequest.find().sort({ createdAt: -1 }).populate('userId').populate('serviceId')
    res.json(requests)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

export const getServiceRequestsByUserId = async (req, res) => {
  try {
    const requests = await ServiceRequest.find({ userId: req.params.id })
      .sort({ createdAt: -1 })
      .populate('userId')
      .populate('serviceId')
    res.json(requests)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

export const updateServiceRequest = async (req, res) => {
  try {
    const updated = await ServiceRequest.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    ).populate('userId').populate('serviceId')
    if (!updated) return res.status(404).json({ message: 'Service request not found' })
    res.json(updated)
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
}

// Customer: cancel own booking (status update only)
export const cancelServiceRequest = async (req, res) => {
  try {
    const { userId } = req.body || {}
    if (!userId) return res.status(400).json({ message: 'userId is required' })

    const reqDoc = await ServiceRequest.findById(req.params.id)
    if (!reqDoc) return res.status(404).json({ message: 'Service request not found' })

    if (String(reqDoc.userId) !== String(userId)) {
      return res.status(403).json({ message: 'You can only cancel your own booking' })
    }

    if (reqDoc.status === 'Cancelled' || reqDoc.status === 'cancelled') {
      return res.status(400).json({ message: 'Booking is already cancelled' })
    }

    if (reqDoc.status === 'completed') {
      return res.status(400).json({ message: 'Completed booking cannot be cancelled' })
    }

    reqDoc.status = 'Cancelled'
    const saved = await reqDoc.save()
    await saved.populate('userId')
    await saved.populate('serviceId')
    res.json(saved)
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
}

