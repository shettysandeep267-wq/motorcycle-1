import mongoose from 'mongoose'

/**
 * Connect to MongoDB (local or MongoDB Atlas).
 * For Atlas: set MONGODB_URI in .env to your Atlas connection string.
 * Example: mongodb+srv://<user>:<password>@cluster0.xxxxx.mongodb.net/<dbname>?retryWrites=true&w=majority
 */
const connectDB = async () => {
  try {
    const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/motorcycle-shop'
    await mongoose.connect(MONGODB_URI)
    console.log('Connected to MongoDB')
  } catch (error) {
    console.error('MongoDB connection error:', error)
    process.exit(1)
  }
}

export default connectDB
