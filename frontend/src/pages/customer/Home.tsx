import { Link } from 'react-router-dom'
import { Wrench, ShoppingBag, Calendar } from 'lucide-react'

export default function Home() {
  return (
    <div>
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-12 sm:py-16 lg:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">Motorcycle Parts & Services</h1>
          <p className="text-base sm:text-lg lg:text-xl mb-6 sm:mb-8">Your one-stop shop for all motorcycle needs</p>
          <div className="flex flex-col sm:flex-row justify-center gap-3 sm:gap-4">
            <Link
              to="/products"
              className="bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100"
            >
              Shop Parts
            </Link>
            <Link
              to="/services"
              className="bg-blue-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-400"
            >
              Book Service
            </Link>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8">
          <div className="text-center p-6 bg-white rounded-lg shadow-md">
            <ShoppingBag className="w-12 h-12 text-blue-600 mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">Quality Parts</h3>
            <p className="text-gray-600">
              Browse our extensive collection of genuine motorcycle parts
            </p>
          </div>
          <div className="text-center p-6 bg-white rounded-lg shadow-md">
            <Wrench className="w-12 h-12 text-blue-600 mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">Expert Service</h3>
            <p className="text-gray-600">
              Professional repair and maintenance services for your motorcycle
            </p>
          </div>
          <div className="text-center p-6 bg-white rounded-lg shadow-md">
            <Calendar className="w-12 h-12 text-blue-600 mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">Easy Booking</h3>
            <p className="text-gray-600">
              Book your service appointment online with just a few clicks
            </p>
          </div>
        </div>
      </div>

      {/* Popular Products Preview */}
      <div className="bg-gray-100 py-10 sm:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl font-bold mb-6 sm:mb-8 text-center">Popular Parts</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {[1, 2, 3, 4].map((item) => (
              <div key={item} className="bg-white rounded-lg shadow-md overflow-hidden">
                <div className="h-48 bg-gray-200"></div>
                <div className="p-4">
                  <h3 className="font-semibold mb-2">Product {item}</h3>
                  <p className="text-gray-600 text-sm mb-2">$99.99</p>
                  <Link
                    to="/products"
                    className="text-blue-600 hover:underline text-sm"
                  >
                    View Details →
                  </Link>
                </div>
              </div>
            ))}
          </div>
          <div className="text-center mt-8">
            <Link
              to="/products"
              className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 inline-block"
            >
              View All Products
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}



