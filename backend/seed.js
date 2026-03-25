import mongoose from 'mongoose'
import dotenv from 'dotenv'
import connectDB from './config/db.js'
import Product from './models/Product.js'
import Service from './models/Service.js'

console.log('Seed script started...')

dotenv.config()

const seedData = async () => {
  try {
    await connectDB()

    const products = [
      {
        name: 'Brake Pad',
        slug: 'brake-pad',
        description: 'High quality brake pad for motorcycles',
        price: 1200,
        category: 'brake',
        brand: 'RidePro',
        images: ['/images/brake-pad.jpg'],
        stock: 20,
        isFeatured: true,
      },
      {
        name: 'Engine Oil',
        slug: 'engine-oil',
        description: 'Premium engine oil for motorcycles',
        price: 900,
        category: 'oil',
        brand: 'LubeMax',
        images: ['/images/engine-oil.jpg'],
        stock: 50,
        isFeatured: true,
      },
      {
        name: 'Motorcycle Chain',
        slug: 'motorcycle-chain',
        description: 'Durable motorcycle drive chain',
        price: 1800,
        category: 'chain',
        brand: 'TorqueLine',
        images: ['/images/chain.jpg'],
        stock: 15,
      },
      {
        name: 'Front Tire',
        slug: 'front-tire',
        description: 'All-weather front tire for motorcycles',
        price: 3200,
        category: 'tire',
        brand: 'GripTrail',
        images: ['/images/tire.jpg'],
        stock: 10,
      },
      {
        name: 'LED Headlight',
        slug: 'led-headlight',
        description: 'Bright LED headlight for night riding',
        price: 2100,
        category: 'accessory',
        brand: 'BeamTech',
        images: ['/images/headlight.jpg'],
        stock: 25,
        isFeatured: true,
      },
    ]

    const services = [
      {
        name: 'Full Bike Service',
        description: 'Complete motorcycle maintenance',
        price: 2500,
        duration: '2 hours',
        category: 'Maintenance',
        image: '/images/bike-service.jpg',
        isPopular: true,
      },
      {
        name: 'Engine Repair',
        description: 'Engine repair and tuning',
        price: 4500,
        duration: '4 hours',
        category: 'Engine',
        image: '/images/engine-repair.jpg',
        isPopular: true,
      },
      {
        name: 'Oil Change',
        description: 'Engine oil replacement',
        price: 800,
        duration: '45 minutes',
        category: 'Maintenance',
        image: '/images/oil-change.jpg',
      },
      {
        name: 'Brake Inspection',
        description: 'Complete brake system inspection',
        price: 600,
        duration: '1 hour',
        category: 'Brakes',
        image: '/images/brake-inspection.jpg',
      },
    ]

    await Product.deleteMany({})
    await Service.deleteMany({})

    await Product.insertMany(products)
    await Service.insertMany(services)

    console.log('Products and Services inserted successfully')
  } catch (error) {
    console.error('Seeding error:', error)
  } finally {
    await mongoose.connection.close()
    process.exit(0)
  }
}

seedData()
