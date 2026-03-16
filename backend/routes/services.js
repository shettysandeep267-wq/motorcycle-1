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
import { requireAdminAuth } from '../middleware/adminAuth.js'

const router = express.Router()

router.get('/', getServices)
// Admin-only: all service bookings
router.get('/bookings', requireAdminAuth, getBookings)
router.get('/:id', getServiceById)
router.post('/', createService)
router.post('/book', bookService)
router.put('/:id', updateService)
router.put('/bookings/:id', requireAdminAuth, updateBooking)
router.delete('/:id', deleteService)

export default router
