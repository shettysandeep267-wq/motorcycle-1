/**
 * repairRemoteImages.js
 *
 * Fixes known-bad remote image URLs stored in MongoDB for Products/Services.
 * This keeps your existing DB connection config (uses connectDB + .env).
 *
 * Run:
 *   cd backend
 *   node scripts/repairRemoteImages.js
 */

import mongoose from 'mongoose'
import dotenv from 'dotenv'
import connectDB from '../config/db.js'
import Product from '../models/Product.js'
import Service from '../models/Service.js'

dotenv.config()

const FIXES = [
  {
    model: Product,
    match: { 'images.0': /ML-chain|chain$/i },
    set: {
      images: [
        'https://images.unsplash.com/photo-1609639643509-4c3c6bcd1c7c?auto=format&fit=crop&w=1200&q=80',
      ],
    },
  },
  {
    model: Product,
    match: { 'images.0': /headlight$/i },
    set: {
      images: [
        'https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1200&q=80',
      ],
    },
  },
]

async function main() {
  await connectDB()

  let total = 0
  for (const f of FIXES) {
    const res = await f.model.updateMany(f.match, { $set: f.set })
    total += res.modifiedCount || 0
    console.log(`[${f.model.modelName}] fixed: ${res.modifiedCount || 0}`)
  }

  // Services (optional): ensure images have params if they are plain unsplash IDs
  const services = await Service.find({}, { image: 1 }).lean()
  const serviceOps = []
  for (const s of services) {
    if (!s.image || typeof s.image !== 'string') continue
    const img = s.image.trim()
    if (!img.startsWith('https://images.unsplash.com/')) continue
    if (img.includes('?')) continue
    serviceOps.push({
      updateOne: {
        filter: { _id: s._id },
        update: { $set: { image: `${img}?auto=format&fit=crop&w=1200&q=80` } },
      },
    })
  }
  if (serviceOps.length) {
    const res = await Service.bulkWrite(serviceOps)
    total += res.modifiedCount || 0
    console.log(`[Service] normalized: ${res.modifiedCount || 0}`)
  }

  console.log(`Done. Total updated: ${total}`)
  await mongoose.connection.close()
}

main().catch(async (err) => {
  console.error('repairRemoteImages failed:', err)
  try {
    await mongoose.connection.close()
  } catch {
    // ignore
  }
  process.exit(1)
})

