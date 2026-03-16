import jwt from 'jsonwebtoken'

export function requireAdminAuth(req, res, next) {
  try {
    const header = req.headers.authorization || ''
    const [type, token] = header.split(' ')
    if (type !== 'Bearer' || !token) {
      return res.status(401).json({ message: 'Admin authentication required' })
    }

    // Prefer dedicated admin secret, fall back to existing JWT_SECRET if present
    const secret = process.env.ADMIN_JWT_SECRET || process.env.JWT_SECRET
    if (!secret) {
      return res.status(500).json({ message: 'ADMIN_JWT_SECRET is not configured' })
    }

    const payload = jwt.verify(token, secret)
    req.admin = payload
    next()
  } catch (err) {
    return res.status(401).json({ message: 'Invalid or expired admin token' })
  }
}

