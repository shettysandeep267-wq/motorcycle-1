import mongoose from 'mongoose'

const BOOKING_STATUSES = ['pending', 'confirmed', 'completed']

const serviceBookingSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      index: true,
    },
    service: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Service',
      required: true,
      index: true,
    },
    date: {
      type: Date,
      required: [true, 'Booking date is required'],
      index: true,
    },
    time: {
      type: String,
      default: '',
      trim: true,
      maxlength: 32,
    },
    status: {
      type: String,
      enum: BOOKING_STATUSES,
      default: 'pending',
      index: true,
    },
    notes: {
      type: String,
      default: '',
      trim: true,
      maxlength: 4000,
    },
  },
  {
    timestamps: true,
  }
)

serviceBookingSchema.index({ user: 1, date: 1 })
serviceBookingSchema.index({ service: 1, date: 1 })

const ServiceBooking = mongoose.model('ServiceBooking', serviceBookingSchema)

export default ServiceBooking
export { BOOKING_STATUSES }
