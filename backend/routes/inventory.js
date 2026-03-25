import express from 'express'
import Inventory from '../models/Inventory.js'
import Product from '../models/Product.js'

const router = express.Router()

router.get('/', async (req, res) => {
  try {
    const inventory = await Inventory.find().populate('product')
    res.json(inventory)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

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

router.put('/:id', async (req, res) => {
  try {
    const { quantity, location } = req.body || {}
    const patch = {}
    if (quantity !== undefined) patch.quantity = quantity
    if (location !== undefined) patch.location = location

    const inventory = await Inventory.findByIdAndUpdate(req.params.id, patch, {
      new: true,
      runValidators: true,
    })
    if (!inventory) {
      return res.status(404).json({ message: 'Inventory item not found' })
    }

    await Product.findByIdAndUpdate(inventory.product, {
      stock: inventory.quantity,
    })

    res.json(inventory)
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
})

router.post('/initialize', async (req, res) => {
  try {
    const { productId, quantity, location, stock, lowStockThreshold: _ignored } = req.body || {}
    const qty = quantity != null ? Number(quantity) : stock != null ? Number(stock) : 0

    const inventory = await Inventory.findOneAndUpdate(
      { product: productId },
      {
        product: productId,
        quantity: qty,
        location: location || '',
      },
      { new: true, upsert: true, runValidators: true }
    )

    await Product.findByIdAndUpdate(productId, { stock: inventory.quantity })

    res.status(201).json(inventory)
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
})

export default router
