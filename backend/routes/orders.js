import express from 'express'
import {
  getOrders,
  getOrdersByUserId,
  getOrderById,
  createOrder,
  updateOrder,
  deleteOrder,
} from '../controllers/orderController.js'

const router = express.Router()

router.get('/', getOrders)
router.get('/user/:id', getOrdersByUserId)
router.get('/:id', getOrderById)
router.post('/', createOrder)
router.put('/:id', updateOrder)
router.delete('/:id', deleteOrder)

export default router
