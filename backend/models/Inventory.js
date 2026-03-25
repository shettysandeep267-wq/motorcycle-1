import mongoose from 'mongoose'

const inventorySchema = new mongoose.Schema(
  {
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Product',
      required: true,
      unique: true,
    },
    quantity: {
      type: Number,
      required: true,
      default: 0,
      min: [0, 'Quantity cannot be negative'],
    },
    location: {
      type: String,
      default: '',
      trim: true,
      maxlength: 200,
      index: true,
    },
  },
  {
    timestamps: true,
  }
)

inventorySchema.index({ updatedAt: -1 })

const Inventory = mongoose.model('Inventory', inventorySchema)

export default Inventory
