import { Toaster } from 'react-hot-toast'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './pages/customer/Home'
import Products from './pages/customer/Products'
import ProductDetail from './pages/customer/ProductDetail'
import Cart from './pages/customer/Cart'
import Services from './pages/customer/Services'
import Orders from './pages/customer/Orders'
import Dashboard from './pages/customer/Dashboard'
import Login from './pages/auth/Login'
import Signup from './pages/auth/Signup'
import AdminLogin from './pages/admin/AdminLogin'
import AdminDashboard from './pages/admin/AdminDashboard'
import AdminProducts from './pages/admin/AdminProducts'
import AdminServices from './pages/admin/AdminServices'
import AdminOrders from './pages/admin/AdminOrders'
import AdminCustomers from './pages/admin/AdminCustomers'
import AdminInventory from './pages/admin/AdminInventory'
import Layout from './components/Layout'
import AdminLayout from './components/AdminLayout'
import ProtectedRoute from './components/ProtectedRoute'
import AdminProtectedRoute from './components/AdminProtectedRoute'

function App() {
  return (
    <>
      <Toaster
        position="top-center"
        toastOptions={{
          duration: 4000,
          style: { borderRadius: '12px' },
          success: { iconTheme: { primary: '#22c55e' } },
          error: { iconTheme: { primary: '#ef4444' } },
        }}
      />
      <Router>
      <Routes>
        {/* Auth Routes (include Clerk internal paths like /login/sso-callback) */}
        <Route path="/login/*" element={<Login />} />
        <Route path="/signup/*" element={<Signup />} />

        {/* Customer Routes */}
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="products" element={<Products />} />
          <Route path="products/:id" element={<ProductDetail />} />
          <Route
            path="cart"
            element={
              <ProtectedRoute>
                <Cart />
              </ProtectedRoute>
            }
          />
          <Route
            path="services"
            element={
              <ProtectedRoute>
                <Services />
              </ProtectedRoute>
            }
          />
          <Route
            path="orders"
            element={
              <ProtectedRoute>
                <Orders />
              </ProtectedRoute>
            }
          />
          <Route
            path="dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
        </Route>

        {/* Admin Routes - Protected with Admin Role Check */}
        <Route path="/admin" element={<AdminLayout />}>
          <Route path="login" element={<AdminLogin />} />
          <Route
            path="dashboard"
            element={
              <AdminProtectedRoute>
                <AdminDashboard />
              </AdminProtectedRoute>
            }
          />
          <Route
            path="products"
            element={
              <AdminProtectedRoute>
                <AdminProducts />
              </AdminProtectedRoute>
            }
          />
          <Route
            path="services"
            element={
              <AdminProtectedRoute>
                <AdminServices />
              </AdminProtectedRoute>
            }
          />
          <Route
            path="orders"
            element={
              <AdminProtectedRoute>
                <AdminOrders />
              </AdminProtectedRoute>
            }
          />
          <Route
            path="customers"
            element={
              <AdminProtectedRoute>
                <AdminCustomers />
              </AdminProtectedRoute>
            }
          />
          <Route
            path="inventory"
            element={
              <AdminProtectedRoute>
                <AdminInventory />
              </AdminProtectedRoute>
            }
          />
        </Route>
      </Routes>
    </Router>
    </>
  )
}

export default App

