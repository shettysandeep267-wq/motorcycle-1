import Product from '../models/Product.js'
import Order from '../models/Order.js'
import Service from '../models/Service.js'
import User from '../models/User.js'
import ServiceBooking from '../models/ServiceBooking.js'

export const getDashboardStats = async (req, res) => {
  try {
    const [productCount, orderCount, serviceCount, userCount, bookingCount] = await Promise.all([
      Product.countDocuments(),
      Order.countDocuments(),
      Service.countDocuments(),
      User.countDocuments(),
      ServiceBooking.countDocuments(),
    ])

    const ordersByStatus = await Order.aggregate([
      { $group: { _id: '$status', count: { $sum: 1 } } },
    ])

    res.json({
      products: productCount,
      orders: orderCount,
      services: serviceCount,
      users: userCount,
      bookings: bookingCount,
      ordersByStatus,
    })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

export const getRecentOrders = async (req, res) => {
  try {
    const limit = parseInt(req.query.limit, 10) || 10
    const orders = await Order.find()
      .sort({ createdAt: -1 })
      .limit(limit)
      .populate('user')
      .populate('orderItems.product')
    res.json(orders)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

export const getRecentBookings = async (req, res) => {
  try {
    const limit = parseInt(req.query.limit, 10) || 10
    const bookings = await ServiceBooking.find()
      .sort({ createdAt: -1 })
      .limit(limit)
      .populate('user')
      .populate('service')
    res.json(bookings)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}
