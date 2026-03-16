import express from 'express'
import {
  getDashboardStats,
  getRecentOrders,
  getRecentBookings,
} from '../controllers/adminController.js'
import { requireAdminAuth } from '../middleware/adminAuth.js'

const router = express.Router()

router.get('/dashboard', requireAdminAuth, getDashboardStats)
router.get('/stats', requireAdminAuth, getDashboardStats)
router.get('/recent-orders', requireAdminAuth, getRecentOrders)
router.get('/recent-bookings', requireAdminAuth, getRecentBookings)

export default router
