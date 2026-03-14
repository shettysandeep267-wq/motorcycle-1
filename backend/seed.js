import mongoose from 'mongoose'
import dotenv from 'dotenv'
import connectDB from './config/db.js'
import Product from './models/Product.js'
import Service from './models/Service.js'

dotenv.config()

const seedData = async () => {
  try {
    await connectDB()

    const products = [
      {
        name: 'Brake Pad',
        description: 'High quality brake pad for motorcycles',
        price: 1200,
        category: 'Brakes',
        image: 'https://images.unsplash.com/photo-1580310614729-ccd69652491d',
        stock: 20,
      },
      {
        name: 'Engine Oil',
        description: 'Premium engine oil',
        price: 900,
        category: 'Oil',
        image: 'https://images.unsplash.com/photo-1604227639211-38b6e2c73c0b',
        stock: 50,
      },
      {
        name: 'Motorcycle Chain',
        description: 'Durable motorcycle drive chain for smooth power delivery',
        price: 1800,
        category: 'engine',
        image: 'https://images.unsplash.com/photo-152566676ML-chain',
        stock: 15,
      },
      {
        name: 'Front Tire',
        description: 'All-weather front tire for motorcycles',
        price: 3200,
        category: 'body',
        image: 'https://images.unsplash.com/photo-1518655048521-f130df041f66',
        stock: 10,
      },
      {
        name: 'LED Headlight',
        description: 'Bright and efficient LED headlight for better night visibility',
        price: 2100,
        category: 'accessories',
        image: 'https://images.unsplash.com/photo-1518655048521-headlight',
        stock: 25,
      },
    ]

    const services = [
      {
        serviceName: 'Full Bike Service',
        description: 'Complete motorcycle maintenance including oil change, brake check, and general inspection',
        price: 2500,
        duration: '2 hours',
        image: 'https://images.unsplash.com/photo-1519750157634-b6d493a0f77f',
      },
      {
        serviceName: 'Engine Repair',
        description: 'Engine repair, tuning, and performance optimization',
        price: 4500,
        duration: '4 hours',
        image: 'https://images.unsplash.com/photo-1609639643509-4c3c6bcd1c7c',
      },
      {
        serviceName: 'Oil Change',
        description: 'Engine oil and filter replacement with quality oil',
        price: 800,
        duration: '45 minutes',
        image: 'https://images.unsplash.com/photo-1486262715619-67b85e0b08d3',
      },
      {
        serviceName: 'Brake Inspection',
        description: 'Complete brake system check and adjustment',
        price: 600,
        duration: '1 hour',
        image: 'https://images.unsplash.com/photo-1526498460520-4c246339dccb',
      },
      {
        serviceName: 'Tire Replacement',
        description: 'Front or rear tire replacement and balancing',
        price: 1500,
        duration: '1.5 hours',
        image: 'https://images.unsplash.com/photo-1518655048521-f130df041f66',
      },
    ]

    await Product.deleteMany({})
    await Service.deleteMany({})

    await Product.insertMany(products)
    await Service.insertMany(services)

    console.log('Sample products and services inserted successfully')
  } catch (error) {
    console.error('Error seeding data:', error)
  } finally {
    await mongoose.connection.close()
    process.exit(0)
  }
}

seedData()

