import express from 'express'
import {
  getServices,
  getServiceById,
  createService,
  updateService,
  deleteService,
  bookService,
  getBookings,
  updateBooking,
} from '../controllers/serviceController.js'

const router = express.Router()

router.get('/', getServices)
router.get('/bookings', getBookings)
router.get('/:id', getServiceById)
router.post('/', createService)
router.post('/book', bookService)
router.put('/:id', updateService)
router.put('/bookings/:id', updateBooking)
router.delete('/:id', deleteService)

export default router
