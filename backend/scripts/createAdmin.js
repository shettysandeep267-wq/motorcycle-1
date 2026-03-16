/**
 * Create an admin user (admin_users).
 *
 * Usage:
 *   cd backend
 *   node scripts/createAdmin.js <adminId> <password>
 *
 * Example:
 *   node scripts/createAdmin.js admin123 MyStrongPassword
 */

import dotenv from 'dotenv'
import mongoose from 'mongoose'
import bcrypt from 'bcryptjs'
import connectDB from '../config/db.js'
import AdminUser from '../models/AdminUser.js'

dotenv.config()

async function main() {
  const [, , adminId, password] = process.argv
  if (!adminId || !password) {
    console.error('Missing args. Example: node scripts/createAdmin.js admin123 MyStrongPassword')
    process.exit(1)
  }

  await connectDB()

  const username = String(adminId).toLowerCase().trim()
  const existing = await AdminUser.findOne({ username })
  if (existing) {
    console.log('Admin user already exists:', username)
    await mongoose.connection.close()
    return
  }

  const passwordHash = await bcrypt.hash(password, 12)
  await AdminUser.create({ username, passwordHash })

  console.log('Admin user created:', username)
  await mongoose.connection.close()
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

