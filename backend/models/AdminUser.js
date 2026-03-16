import mongoose from 'mongoose'

const adminUserSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
    },
    passwordHash: {
      type: String,
      required: true,
    },
  },
  { timestamps: true, collection: 'admin_users' }
)

const AdminUser = mongoose.model('AdminUser', adminUserSchema)

export default AdminUser

