import express from 'express'
import { adminLogin, adminMe } from '../controllers/adminAuthController.js'
import { requireAdminAuth } from '../middleware/adminAuth.js'

const router = express.Router()

router.post('/login', adminLogin)
router.get('/me', requireAdminAuth, adminMe)

export default router

