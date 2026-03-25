/**
 * fixImages.js
 *
 * Updates Product `images` for records whose first image is empty or placeholder-like.
 *
 * Run:
 *   cd backend
 *   node fixImages.js
 */

import mongoose from 'mongoose'
import dotenv from 'dotenv'
import connectDB from './config/db.js'
import Product from './models/Product.js'

dotenv.config()

const BASE_URL = process.env.BASE_URL || 'http://localhost:5000'

function slugifyName(name) {
  return String(name || '')
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
}

function isPlaceholderImage(value) {
  if (typeof value !== 'string') return true
  const v = value.trim().toLowerCase()
  if (!v) return true
  if (v.includes('placeholder')) return true
  if (v.includes('example.com')) return true
  if (v.includes('via.placeholder.com')) return true
  if (v === 'n/a' || v === 'na' || v === 'none') return true
  if (v.endsWith('/no-image') || v.endsWith('/noimage')) return true
  return false
}

function primaryImage(product) {
  if (Array.isArray(product.images) && product.images.length > 0) {
    return product.images[0]
  }
  return ''
}

async function main() {
  await connectDB()

  const products = await Product.find({}, { name: 1, images: 1 }).lean()

  const updates = []

  for (const p of products) {
    const current = primaryImage(p)
    if (!isPlaceholderImage(current)) continue

    const slug = slugifyName(p.name)
    if (!slug) continue

    const nextUrl = `${BASE_URL}/images/${slug}.jpg`

    updates.push({
      updateOne: {
        filter: { _id: p._id },
        update: { $set: { images: [nextUrl] } },
      },
    })
  }

  if (updates.length === 0) {
    console.log('No products required image updates.')
  } else {
    const res = await Product.bulkWrite(updates)
    console.log(`Updated ${res.modifiedCount} product image(s).`)
  }

  await mongoose.connection.close()
}

main().catch(async (err) => {
  console.error('fixImages failed:', err)
  try {
    await mongoose.connection.close()
  } catch {
    // ignore
  }
  process.exit(1)
})
