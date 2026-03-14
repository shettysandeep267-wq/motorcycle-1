import express from 'express'
import cors from 'cors'
import bodyParser from 'body-parser'
import dotenv from 'dotenv'
import connectDB from './config/db.js'
import productRoutes from './routes/products.js'
import orderRoutes from './routes/orders.js'
import serviceRoutes from './routes/services.js'
import userRoutes from './routes/users.js'
import adminRoutes from './routes/admin.js'
import bookingRoutes from './routes/booking.js'
import customerRoutes from './routes/customers.js'
import inventoryRoutes from './routes/inventory.js'

dotenv.config()

const app = express()
const PORT = process.env.PORT || 5000

// Middleware
app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

// Database
connectDB()

// API Routes
app.use('/api/products', productRoutes)
app.use('/api/orders', orderRoutes)
app.use('/api/services', serviceRoutes)
app.use('/api/users', userRoutes)
app.use('/api/admin', adminRoutes)
app.use('/api/booking', bookingRoutes)
app.use('/api/customers', customerRoutes)
app.use('/api/inventory', inventoryRoutes)

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: 'Server is running' })
})

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack)
  res.status(500).json({ message: 'Something went wrong!', error: err.message })
})

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
})
