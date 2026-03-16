/**
 * fixImages.js
 *
 * Updates Product.image for records that have an empty or placeholder image.
 *
 * What it does:
 * - Connects to MongoDB using existing `config/db.js` (reads MONGO_URI from .env)
 * - Finds products where `image` is empty OR looks like a placeholder/example value
 * - Sets `image` to: http://localhost:5000/images/<slugified-product-name>.jpg
 *
 * Notes:
 * - This does NOT download images. You must place the matching .jpg files in `backend/images/`.
 * - Example: "Brake Pad" → `backend/images/brake-pad.jpg`
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
    .replace(/[^a-z0-9\s-]/g, '') // remove punctuation
    .replace(/\s+/g, '-') // spaces → hyphens
    .replace(/-+/g, '-') // collapse hyphens
}

function isPlaceholderImage(value) {
  if (typeof value !== 'string') return true
  const v = value.trim().toLowerCase()
  if (!v) return true

  // Common placeholder/example patterns
  if (v.includes('placeholder')) return true
  if (v.includes('example.com')) return true
  if (v.includes('via.placeholder.com')) return true
  if (v === 'n/a' || v === 'na' || v === 'none') return true
  if (v.endsWith('/no-image') || v.endsWith('/noimage')) return true

  return false
}

async function main() {
  await connectDB()

  const products = await Product.find({}, { name: 1, image: 1 }).lean()

  const updates = []

  for (const p of products) {
    const currentImage = p.image
    if (!isPlaceholderImage(currentImage)) continue

    const slug = slugifyName(p.name)
    if (!slug) continue

    const nextUrl = `${BASE_URL}/images/${slug}.jpg`

    updates.push({
      updateOne: {
        filter: { _id: p._id },
        update: { $set: { image: nextUrl } },
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

