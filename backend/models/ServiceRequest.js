import mongoose from 'mongoose'

// Service requests are customer-facing booking requests stored separately
// from the legacy ServiceBooking collection, per system requirements.
const serviceRequestSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    serviceId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Service',
      required: true,
    },
    // Customer-facing fields (required by system spec)
    customerName: {
      type: String,
      default: '',
      trim: true,
    },
    serviceType: {
      type: String,
      default: '',
      trim: true,
    },
    bikeModel: {
      type: String,
      default: '',
      trim: true,
    },
    bookingDate: {
      type: Date,
      required: true,
    },
    status: {
      type: String,
      enum: [
        // new spec-friendly values
        'Booked',
        'Cancelled',
        // keep legacy values so existing admin flows don't break
        'pending',
        'in-progress',
        'completed',
        'cancelled',
      ],
      default: 'Booked',
    },
  },
  {
    timestamps: true,
    collection: 'service_requests',
  }
)

const ServiceRequest = mongoose.model('ServiceRequest', serviceRequestSchema)

export default ServiceRequest

