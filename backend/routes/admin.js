import express from 'express'
import {
  getDashboardStats,
  getRecentOrders,
  getRecentBookings,
} from '../controllers/adminController.js'

const router = express.Router()

router.get('/dashboard', getDashboardStats)
router.get('/stats', getDashboardStats)
router.get('/recent-orders', getRecentOrders)
router.get('/recent-bookings', getRecentBookings)

export default router
