/**
 * Optional sample data for the Motorcycle schema (User, Order, ServiceBooking, Inventory).
 * Safe to run after `npm run seed` so Products/Services exist.
 *
 *   cd backend
 *   node scripts/seedMotorcycleSample.js
 */

import mongoose from 'mongoose'
import dotenv from 'dotenv'
import connectDB from '../config/db.js'
import User from '../models/User.js'
import Product from '../models/Product.js'
import Service from '../models/Service.js'
import Order from '../models/Order.js'
import ServiceBooking from '../models/ServiceBooking.js'
import Inventory from '../models/Inventory.js'

dotenv.config()

async function main() {
  await connectDB()

  const [product, service] = await Promise.all([
    Product.findOne().sort({ createdAt: 1 }),
    Service.findOne().sort({ createdAt: 1 }),
  ])

  if (!product || !service) {
    console.log('Skip: run `npm run seed` first to create products and services.')
    await mongoose.connection.close()
    process.exit(0)
    return
  }

  const user = await User.findOneAndUpdate(
    { clerkId: 'clerk_sample_motorcycle_001' },
    {
      clerkId: 'clerk_sample_motorcycle_001',
      name: 'Sample Rider',
      email: 'sample.rider@motorcycle.demo',
      role: 'customer',
      phone: '+919999000000',
      address: 'Sample City, IN',
    },
    { upsert: true, new: true, setDefaultsOnInsert: true }
  )

  await Inventory.findOneAndUpdate(
    { product: product._id },
    { product: product._id, quantity: product.stock, location: 'Warehouse A' },
    { upsert: true, new: true }
  )

  const existingOrder = await Order.findOne({ user: user._id })
  if (!existingOrder) {
    await Order.create({
      user: user._id,
      orderItems: [
        {
          product: product._id,
          name: product.name,
          qty: 1,
          price: product.price,
          image: product.images?.[0] || '',
        },
      ],
      totalPrice: product.price,
      status: 'confirmed',
      isPaid: true,
    })
    console.log('Created sample order.')
  } else {
    console.log('Sample order already exists; skipped.')
  }

  const existingBooking = await ServiceBooking.findOne({ user: user._id })
  if (!existingBooking) {
    const d = new Date()
    d.setDate(d.getDate() + 3)
    await ServiceBooking.create({
      user: user._id,
      service: service._id,
      date: d,
      time: '10:30',
      status: 'pending',
      notes: 'Sample booking from seedMotorcycleSample.js',
    })
    console.log('Created sample service booking.')
  } else {
    console.log('Sample booking already exists; skipped.')
  }

  console.log('Sample data script finished.')
  await mongoose.connection.close()
  process.exit(0)
}

main().catch(async (err) => {
  console.error(err)
  try {
    await mongoose.connection.close()
  } catch {
    // ignore
  }
  process.exit(1)
})
