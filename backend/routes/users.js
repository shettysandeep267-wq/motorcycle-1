import express from 'express'
import {
  getUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
  syncUserByClerk,
} from '../controllers/userController.js'

const router = express.Router()

router.post('/sync', syncUserByClerk)
router.get('/', getUsers)
router.get('/:id', getUserById)
router.post('/', createUser)
router.put('/:id', updateUser)
router.delete('/:id', deleteUser)

export default router
