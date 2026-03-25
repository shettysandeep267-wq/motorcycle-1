import Order from '../models/Order.js'
import Product from '../models/Product.js'

const populateOrder = (q) => q.populate('user').populate('orderItems.product')

function normalizeOrderLines(rawItems) {
  if (!Array.isArray(rawItems)) return []
  return rawItems.map((p) => ({
    productId: p.productId || p.product,
    quantity: Number(p.quantity ?? p.qty ?? 1),
    price: p.price != null ? Number(p.price) : undefined,
    name: p.name,
    image: p.image,
  }))
}

export const getOrders = async (req, res) => {
  try {
    const orders = await populateOrder(Order.find())
    res.json(orders)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

export const getOrdersByUserId = async (req, res) => {
  try {
    const orders = await populateOrder(Order.find({ user: req.params.id }))
    res.json(orders)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

export const getOrderById = async (req, res) => {
  try {
    const order = await populateOrder(Order.findById(req.params.id))
    if (!order) {
      return res.status(404).json({ message: 'Order not found' })
    }
    res.json(order)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

export const createOrder = async (req, res) => {
  try {
    const body = req.body || {}
    const userRef = body.user || body.userId
    const rawLines = body.orderItems || body.products
    const { totalPrice, isPaid, status } = body

    if (!userRef) return res.status(400).json({ message: 'user or userId is required' })
    if (!Array.isArray(rawLines) || rawLines.length === 0) {
      return res.status(400).json({ message: 'orderItems or products array is required' })
    }

    const normalized = normalizeOrderLines(rawLines)
    const orderItems = []

    for (const line of normalized) {
      if (!line.productId) {
        return res.status(400).json({ message: 'Each line must include product or productId' })
      }
      const prod = await Product.findById(line.productId).select('name price images stock').lean()
      const qty = line.quantity
      const price = line.price != null && !Number.isNaN(line.price) ? line.price : prod?.price ?? 0
      const name = line.name || prod?.name || 'Product'
      const image =
        line.image || (Array.isArray(prod?.images) && prod.images[0] ? prod.images[0] : '')
      orderItems.push({
        product: line.productId,
        name,
        qty,
        price,
        image,
      })
    }

    const computedTotal = orderItems.reduce((sum, item) => sum + item.price * item.qty, 0)

    const order = new Order({
      user: userRef,
      orderItems,
      totalPrice: typeof totalPrice === 'number' && !Number.isNaN(totalPrice) ? totalPrice : computedTotal,
      isPaid: Boolean(isPaid),
      status: status || 'pending',
    })
    const savedOrder = await order.save()
    const full = await Order.findById(savedOrder._id)
      .populate('user')
      .populate('orderItems.product')
    res.status(201).json(full)
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
}

export const updateOrder = async (req, res) => {
  try {
    const patch = { ...req.body }
    if (patch.userId && !patch.user) patch.user = patch.userId
    delete patch.userId
    if (patch.products && !patch.orderItems) patch.orderItems = patch.products
    delete patch.products
    if (patch.orderStatus && !patch.status) patch.status = patch.orderStatus
    delete patch.orderStatus

    const order = await populateOrder(
      Order.findByIdAndUpdate(req.params.id, patch, { new: true, runValidators: true })
    )
    if (!order) {
      return res.status(404).json({ message: 'Order not found' })
    }
    res.json(order)
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
}

export const deleteOrder = async (req, res) => {
  try {
    const order = await Order.findByIdAndDelete(req.params.id)
    if (!order) {
      return res.status(404).json({ message: 'Order not found' })
    }
    res.json({ message: 'Order deleted successfully' })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

export const cancelOrder = async (req, res) => {
  try {
    const { userId } = req.body || {}
    if (!userId) return res.status(400).json({ message: 'userId is required' })

    const order = await Order.findById(req.params.id)
    if (!order) return res.status(404).json({ message: 'Order not found' })

    if (String(order.user) !== String(userId)) {
      return res.status(403).json({ message: 'You can only cancel your own order' })
    }

    if (['shipped', 'delivered', 'cancelled'].includes(order.status)) {
      return res.status(400).json({ message: `Order cannot be cancelled when status is ${order.status}` })
    }

    order.status = 'cancelled'
    const saved = await order.save()
    const full = await Order.findById(saved._id).populate('user').populate('orderItems.product')
    res.json(full)
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
}
