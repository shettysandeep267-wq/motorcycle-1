import mongoose from 'mongoose'

const PRODUCT_CATEGORIES = [
  'helmet',
  'tire',
  'oil',
  'brake',
  'chain',
  'battery',
  'accessory',
]

function slugify(text) {
  return String(text || '')
    .trim()
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '')
}

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Product name is required'],
      trim: true,
      maxlength: 200,
    },
    slug: {
      type: String,
      required: [true, 'Slug is required'],
      unique: true,
      trim: true,
      lowercase: true,
      maxlength: 220,
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
    category: {
      type: String,
      required: true,
      enum: PRODUCT_CATEGORIES,
      index: true,
    },
    brand: {
      type: String,
      default: '',
      trim: true,
      maxlength: 120,
    },
    stock: {
      type: Number,
      default: 0,
      min: [0, 'Stock cannot be negative'],
    },
    images: {
      type: [String],
      default: [],
      validate: {
        validator(arr) {
          return arr.length <= 24
        },
        message: 'Too many image URLs',
      },
    },
    ratings: {
      type: Number,
      default: 0,
      min: 0,
      max: 5,
    },
    numReviews: {
      type: Number,
      default: 0,
      min: 0,
    },
    isFeatured: {
      type: Boolean,
      default: false,
      index: true,
    },
  },
  {
    timestamps: true,
  }
)

productSchema.index({ category: 1, isFeatured: 1 })
productSchema.index({ name: 'text', description: 'text' })

productSchema.pre('validate', async function ensureSlug(next) {
  if (this.slug && this.slug.length > 0) {
    return next()
  }
  const base = slugify(this.name) || 'product'
  let candidate = base
  let n = 0
  const Product = mongoose.model('Product')
  while (n < 50) {
    const exists = await this.constructor
      .findOne({
        slug: candidate,
        _id: { $ne: this._id },
      })
      .select('_id')
      .lean()
    if (!exists) {
      this.slug = candidate
      return next()
    }
    n += 1
    candidate = `${base}-${n}`
  }
  this.slug = `${base}-${Date.now()}`
  return next()
})

const Product = mongoose.model('Product', productSchema)

export default Product
export { PRODUCT_CATEGORIES }
