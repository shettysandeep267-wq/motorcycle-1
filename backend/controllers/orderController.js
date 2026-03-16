import Order from '../models/Order.js'

export const getOrders = async (req, res) => {
  try {
    const orders = await Order.find().populate('userId').populate('products.productId')
    res.json(orders)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

export const getOrdersByUserId = async (req, res) => {
  try {
    const orders = await Order.find({ userId: req.params.id })
      .populate('userId')
      .populate('products.productId')
    res.json(orders)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

export const getOrderById = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id).populate('userId').populate('products.productId')
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
    const {
      userId,
      customerName,
      customerEmail,
      products,
      totalPrice,
      paymentMethod,
    } = req.body || {}

    if (!userId) return res.status(400).json({ message: 'userId is required' })
    if (!Array.isArray(products) || products.length === 0) {
      return res.status(400).json({ message: 'products are required' })
    }

    const normalizedProducts = products.map((p) => ({
      productId: p.productId,
      quantity: Number(p.quantity || 1),
      price: Number(p.price || 0),
    }))

    const computedTotal = normalizedProducts.reduce(
      (sum, p) => sum + p.price * p.quantity,
      0
    )

    const order = new Order({
      userId,
      customerName: customerName || '',
      customerEmail: customerEmail || '',
      products: normalizedProducts,
      totalPrice: typeof totalPrice === 'number' ? totalPrice : computedTotal,
      paymentMethod,
    })
    const savedOrder = await order.save()
    await savedOrder.populate('userId')
    await savedOrder.populate('products.productId')
    res.status(201).json(savedOrder)
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
}

export const updateOrder = async (req, res) => {
  try {
    const order = await Order.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    ).populate('userId').populate('products.productId')
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

// Customer: cancel own order (basic ownership check by userId)
export const cancelOrder = async (req, res) => {
  try {
    const { userId } = req.body || {}
    if (!userId) return res.status(400).json({ message: 'userId is required' })

    const order = await Order.findById(req.params.id)
    if (!order) return res.status(404).json({ message: 'Order not found' })

    if (String(order.userId) !== String(userId)) {
      return res.status(403).json({ message: 'You can only cancel your own order' })
    }

    if (order.orderStatus === 'cancelled' || order.orderStatus === 'completed' || order.orderStatus === 'shipped') {
      return res.status(400).json({ message: `Order cannot be cancelled when status is ${order.orderStatus}` })
    }

    order.orderStatus = 'cancelled'
    const saved = await order.save()
    await saved.populate('userId')
    await saved.populate('products.productId')
    res.json(saved)
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
}
