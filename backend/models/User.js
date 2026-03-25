import mongoose from 'mongoose'

const USER_ROLES = ['customer', 'admin']

const userSchema = new mongoose.Schema(
  {
    clerkId: {
      type: String,
      required: [true, 'clerkId is required'],
      unique: true,
      trim: true,
      index: true,
    },
    name: {
      type: String,
      default: '',
      trim: true,
      maxlength: 200,
    },
    email: {
      type: String,
      trim: true,
      lowercase: true,
      maxlength: 320,
    },
    role: {
      type: String,
      enum: USER_ROLES,
      default: 'customer',
      index: true,
    },
    phone: {
      type: String,
      default: '',
      trim: true,
      maxlength: 32,
    },
    address: {
      type: String,
      default: '',
      trim: true,
      maxlength: 2000,
    },
  },
  {
    timestamps: true,
  }
)

userSchema.index({ email: 1 }, { unique: true, sparse: true })

userSchema.pre('validate', function normalizeEmail(next) {
  if (this.email === '') this.set('email', undefined)
  next()
})

const User = mongoose.model('User', userSchema)

export default User
export { USER_ROLES }
