import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import AdminUser from '../models/AdminUser.js'

export const adminLogin = async (req, res) => {
  try {
    const { adminId, password } = req.body
    if (!adminId || !password) {
      return res.status(400).json({ message: 'adminId and password are required' })
    }

    const user = await AdminUser.findOne({ username: String(adminId).toLowerCase().trim() })
    if (!user) return res.status(401).json({ message: 'Invalid credentials' })

    const ok = await bcrypt.compare(password, user.passwordHash)
    if (!ok) return res.status(401).json({ message: 'Invalid credentials' })

    // Prefer dedicated admin secret, fall back to existing JWT_SECRET if present
    const secret = process.env.ADMIN_JWT_SECRET || process.env.JWT_SECRET
    if (!secret) return res.status(500).json({ message: 'ADMIN_JWT_SECRET is not configured' })

    const token = jwt.sign(
      { adminUserId: user._id.toString(), username: user.username },
      secret,
      { expiresIn: '7d' }
    )

    res.json({ token, username: user.username })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

export const adminMe = async (req, res) => {
  res.json({ admin: req.admin })
}

