import Product, { PRODUCT_CATEGORIES } from '../models/Product.js'

const CATEGORY_ALIASES = {
  brakes: 'brake',
  brake: 'brake',
  helmet: 'helmet',
  tire: 'tire',
  tyres: 'tire',
  oil: 'oil',
  chain: 'chain',
  battery: 'battery',
  accessory: 'accessory',
  accessories: 'accessory',
  engine: 'chain',
  body: 'tire',
  general: 'accessory',
}

function normalizeProductPayload(body) {
  const out = { ...body }
  if (out.image && (!out.images || !Array.isArray(out.images) || out.images.length === 0)) {
    out.images = [out.image]
  }
  delete out.image

  if (out.category) {
    const key = String(out.category).trim().toLowerCase()
    out.category = CATEGORY_ALIASES[key] || key
    if (!PRODUCT_CATEGORIES.includes(out.category)) {
      out.category = 'accessory'
    }
  }

  return out
}

export const getProducts = async (req, res) => {
  try {
    const products = await Product.find()
    res.json(products)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

export const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id)
    if (!product) {
      return res.status(404).json({ message: 'Product not found' })
    }
    res.json(product)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

export const createProduct = async (req, res) => {
  try {
    const product = new Product(normalizeProductPayload(req.body || {}))
    const savedProduct = await product.save()
    res.status(201).json(savedProduct)
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
}

export const updateProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndUpdate(
      req.params.id,
      normalizeProductPayload(req.body || {}),
      { new: true, runValidators: true }
    )
    if (!product) {
      return res.status(404).json({ message: 'Product not found' })
    }
    res.json(product)
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
}

export const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id)
    if (!product) {
      return res.status(404).json({ message: 'Product not found' })
    }
    res.json({ message: 'Product deleted successfully' })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}
