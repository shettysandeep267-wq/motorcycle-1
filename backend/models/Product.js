import mongoose from 'mongoose'

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
    min: 0,
  },
  image: {
    type: String,
    default: '',
  },
  stock: {
    type: Number,
    required: true,
    min: 0,
    default: 0,
  },
  category: {
    type: String,
    enum: ['engine', 'body', 'accessories', 'general', 'Brakes', 'Oil'],
    default: 'general',
  },
}, {
  timestamps: true,
})

const Product = mongoose.model('Product', productSchema)

export default Product
