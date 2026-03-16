import express from 'express'
import {
  getOrders,
  getOrdersByUserId,
  getOrderById,
  createOrder,
  updateOrder,
  deleteOrder,
  cancelOrder,
} from '../controllers/orderController.js'
import { requireAdminAuth } from '../middleware/adminAuth.js'

const router = express.Router()

// Admin-only: all orders
router.get('/', requireAdminAuth, getOrders)
router.get('/user/:id', getOrdersByUserId)
router.get('/:id', getOrderById)
router.post('/', createOrder)
// Customer cancel (requires userId in body)
router.post('/:id/cancel', cancelOrder)
router.put('/:id', requireAdminAuth, updateOrder)
router.delete('/:id', requireAdminAuth, deleteOrder)

export default router
