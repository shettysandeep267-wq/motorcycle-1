import { useCallback, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { ShoppingCart } from 'lucide-react'
import toast from 'react-hot-toast'
import { useCart } from '../../context/CartContext'
import { useCatalogStore } from '../../stores/catalogStore'

interface Product {
  _id: string
  name: string
  description: string
  price: number
  image?: string
  category?: string
  stock: number
  specifications?: string
}

export default function ProductDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const product = useCatalogStore(
    useCallback(
      (state) => (id ? state.products.find((p) => p._id === id) ?? null : null),
      [id]
    )
  ) as Product | null
  const [quantity, setQuantity] = useState(1)
  const { addToCart } = useCart()

  const handleAddToCart = () => {
    if (!product) return
    addToCart(
      {
        id: product._id,
        name: product.name,
        price: product.price,
        image: product.image,
      },
      quantity
    )
    toast.success(`${product.name} added to cart`)
  }

  if (!product) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center">Product not found</div>
      </div>
    )
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <button
        onClick={() => navigate(-1)}
        className="text-blue-600 hover:underline mb-4"
      >
        ← Back to Products
      </button>

      <div className="grid md:grid-cols-2 gap-8">
        {/* Product Image */}
        <div className="bg-white rounded-lg shadow-md p-4">
          <div className="h-96 bg-gray-200 flex items-center justify-center rounded">
            {product.image ? (
              <img
                src={product.image}
                alt={product.name}
                className="h-full w-full object-cover rounded"
                loading="lazy"
                referrerPolicy="no-referrer"
                onError={(e) => {
                  e.currentTarget.src =
                    "data:image/svg+xml,%3Csvg%20xmlns='http://www.w3.org/2000/svg'%20width='1200'%20height='800'%20viewBox='0%200%201200%20800'%3E%3Cdefs%3E%3ClinearGradient%20id='g'%20x1='0'%20y1='0'%20x2='1'%20y2='1'%3E%3Cstop%20offset='0'%20stop-color='%23f3f4f6'/%3E%3Cstop%20offset='1'%20stop-color='%23e5e7eb'/%3E%3C/linearGradient%3E%3C/defs%3E%3Crect%20width='1200'%20height='800'%20fill='url(%23g)'/%3E%3Ctext%20x='50%25'%20y='50%25'%20dominant-baseline='middle'%20text-anchor='middle'%20font-family='Arial'%20font-size='34'%20fill='%236b7280'%3EImage%20unavailable%3C/text%3E%3C/svg%3E"
                }}
              />
            ) : (
              <span className="text-gray-400">No Image Available</span>
            )}
          </div>
        </div>

        {/* Product Details */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h1 className="text-3xl font-bold mb-4">{product.name}</h1>
          <p className="text-gray-600 mb-4">{product.description}</p>
          
          <div className="mb-4">
            <span className="text-3xl font-bold text-blue-600">₹{product.price}</span>
          </div>

          <div className="mb-4">
            <span className={`inline-block px-3 py-1 rounded ${
              product.stock > 0 ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
            }`}>
              {product.stock > 0 ? 'In Stock' : 'Out of Stock'}
            </span>
          </div>

          {product.specifications && (
            <div className="mb-6">
              <h3 className="font-semibold mb-2">Specifications:</h3>
              <p className="text-gray-600">{product.specifications}</p>
            </div>
          )}

          {product.stock > 0 && (
            <div className="mb-6">
              <label className="block mb-2">Quantity:</label>
              <input
                type="number"
                min="1"
                max={product.stock}
                value={quantity}
                onChange={(e) => setQuantity(parseInt(e.target.value))}
                className="border rounded px-3 py-2 w-20"
              />
            </div>
          )}

          <button
            onClick={handleAddToCart}
            disabled={product.stock === 0}
            className="w-full bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
          >
            <ShoppingCart className="w-5 h-5" />
            <span>Add to Cart</span>
          </button>
        </div>
      </div>
    </div>
  )
}



