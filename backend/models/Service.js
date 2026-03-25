import mongoose from 'mongoose'

const serviceSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Service name is required'],
      trim: true,
      maxlength: 200,
    },
    description: {
      type: String,
      default: '',
      trim: true,
      maxlength: 8000,
    },
    price: {
      type: Number,
      required: [true, 'Price is required'],
      min: [0, 'Price cannot be negative'],
    },
    duration: {
      type: String,
      default: '',
      trim: true,
      maxlength: 120,
    },
    category: {
      type: String,
      default: '',
      trim: true,
      maxlength: 80,
      index: true,
    },
    image: {
      type: String,
      default: '',
      trim: true,
      maxlength: 2048,
    },
    isPopular: {
      type: Boolean,
      default: false,
      index: true,
    },
  },
  {
    timestamps: true,
  }
)

serviceSchema.index({ isPopular: 1, category: 1 })

const Service = mongoose.model('Service', serviceSchema)

export default Service
