import express from 'express'
import Inventory from '../models/Inventory.js'
import Product from '../models/Product.js'

const router = express.Router()

// Get all inventory items
router.get('/', async (req, res) => {
  try {
    const inventory = await Inventory.find().populate('product')
    res.json(inventory)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

// Get single inventory item
router.get('/:id', async (req, res) => {
  try {
    const inventory = await Inventory.findById(req.params.id).populate('product')
    if (!inventory) {
      return res.status(404).json({ message: 'Inventory item not found' })
    }
    res.json(inventory)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

// Update inventory
router.put('/:id', async (req, res) => {
  try {
    const inventory = await Inventory.findByIdAndUpdate(
      req.params.id,
      {
        ...req.body,
        lastUpdated: new Date(),
      },
      { new: true, runValidators: true }
    )
    if (!inventory) {
      return res.status(404).json({ message: 'Inventory item not found' })
    }
    
    // Also update product stock
    await Product.findByIdAndUpdate(inventory.product, {
      stock: inventory.stock,
    })
    
    res.json(inventory)
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
})

// Initialize inventory for a product
router.post('/initialize', async (req, res) => {
  try {
    const { productId, stock, lowStockThreshold } = req.body
    
    const inventory = await Inventory.findOneAndUpdate(
      { product: productId },
      {
        product: productId,
        stock: stock || 0,
        lowStockThreshold: lowStockThreshold || 10,
        lastUpdated: new Date(),
      },
      { new: true, upsert: true }
    )
    
    res.status(201).json(inventory)
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
})

export default router



