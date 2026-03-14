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
    const order = new Order(req.body)
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
