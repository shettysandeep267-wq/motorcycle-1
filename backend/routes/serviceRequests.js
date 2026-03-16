import express from 'express'
import {
  createServiceRequest,
  getServiceRequests,
  getServiceRequestsByUserId,
  updateServiceRequest,
  cancelServiceRequest,
} from '../controllers/serviceRequestController.js'
import { requireAdminAuth } from '../middleware/adminAuth.js'

const router = express.Router()

// service_requests
router.get('/', requireAdminAuth, getServiceRequests)
router.get('/user/:id', getServiceRequestsByUserId)
router.post('/', createServiceRequest)
router.post('/:id/cancel', cancelServiceRequest)
router.put('/:id', requireAdminAuth, updateServiceRequest)

export default router

