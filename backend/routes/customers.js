import express from 'express'
import Customer from '../models/Customer.js'
import Order from '../models/Order.js'

const router = express.Router()

// Get all customers
router.get('/', async (req, res) => {
  try {
    const customers = await Customer.find()
    const customersWithOrders = await Promise.all(
      customers.map(async (customer) => {
        const orders = await Order.find({ customerId: customer.clerkId })
        return {
          ...customer.toObject(),
          totalOrders: orders.length,
        }
      })
    )
    res.json(customersWithOrders)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

// Get single customer
router.get('/:id', async (req, res) => {
  try {
    const customer = await Customer.findOne({ clerkId: req.params.id })
    if (!customer) {
      return res.status(404).json({ message: 'Customer not found' })
    }
    res.json(customer)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

// Create or update customer
router.post('/', async (req, res) => {
  try {
    const customer = await Customer.findOneAndUpdate(
      { clerkId: req.body.clerkId },
      req.body,
      { new: true, upsert: true, runValidators: true }
    )
    res.status(201).json(customer)
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
})

// Update customer
router.put('/:id', async (req, res) => {
  try {
    const customer = await Customer.findOneAndUpdate(
      { clerkId: req.params.id },
      req.body,
      { new: true, runValidators: true }
    )
    if (!customer) {
      return res.status(404).json({ message: 'Customer not found' })
    }
    res.json(customer)
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
})

export default router



