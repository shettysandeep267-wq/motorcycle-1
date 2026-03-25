import mongoose from 'mongoose'

/** Core lifecycle + cancelled for customer/admin operations */
const ORDER_STATUSES = ['pending', 'confirmed', 'shipped', 'delivered', 'cancelled']

const orderItemSchema = new mongoose.Schema(
  {
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Product',
      required: true,
    },
    name: {
      type: String,
      required: true,
      trim: true,
      maxlength: 300,
    },
    qty: {
      type: Number,
      required: true,
      min: [1, 'Quantity must be at least 1'],
    },
    price: {
      type: Number,
      required: true,
      min: [0, 'Line price cannot be negative'],
    },
    image: {
      type: String,
      default: '',
      trim: true,
      maxlength: 2048,
    },
  },
  { _id: false }
)

const orderSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      index: true,
    },
    orderItems: {
      type: [orderItemSchema],
      required: true,
      validate: {
        validator(v) {
          return Array.isArray(v) && v.length > 0
        },
        message: 'Order must include at least one line item',
      },
    },
    totalPrice: {
      type: Number,
      required: true,
      min: [0, 'totalPrice cannot be negative'],
    },
    status: {
      type: String,
      enum: ORDER_STATUSES,
      default: 'pending',
      index: true,
    },
    isPaid: {
      type: Boolean,
      default: false,
      index: true,
    },
  },
  {
    timestamps: true,
  }
)

orderSchema.index({ createdAt: -1 })
orderSchema.index({ user: 1, status: 1 })

const Order = mongoose.model('Order', orderSchema)

export default Order
export { ORDER_STATUSES }
