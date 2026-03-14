import express from 'express'
import { createBooking, getBookingsByUserId } from '../controllers/bookingController.js'

const router = express.Router()

router.post('/', createBooking)
router.get('/user/:id', getBookingsByUserId)

export default router
