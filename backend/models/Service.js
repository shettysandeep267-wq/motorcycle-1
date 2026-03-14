import mongoose from 'mongoose'

const serviceSchema = new mongoose.Schema({
  serviceName: {
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
  duration: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    default: '',
  },
}, {
  timestamps: true,
})

const Service = mongoose.model('Service', serviceSchema)

export default Service
