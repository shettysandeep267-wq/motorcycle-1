import { useState, useEffect } from 'react'
import { getInventory, updateInventory } from '../../utils/api'
import toast from 'react-hot-toast'
import { Package, AlertTriangle, CheckCircle } from 'lucide-react'

interface InventoryItem {
  _id: string
  product: {
    _id: string
    name: string
  }
  stock: number
  lowStockThreshold: number
  lastUpdated: string
}

export default function AdminInventory() {
  const [inventory, setInventory] = useState<InventoryItem[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchInventory()
  }, [])

  const fetchInventory = async () => {
    try {
      const response = await getInventory()
      setInventory(response.data || [])
    } catch (error) {
      console.error('Error fetching inventory:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleUpdateStock = async (id: string, newStock: number) => {
    try {
      await updateInventory(id, { stock: newStock })
      fetchInventory()
      toast.success('Stock updated')
    } catch (error) {
      console.error('Error updating inventory:', error)
      toast.error('Failed to update inventory')
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600" />
      </div>
    )
  }

  return (
    <div className="space-y-8">
      <div className="flex items-center gap-3">
        <div className="p-2 rounded-lg bg-violet-50">
          <Package className="w-6 h-6 text-violet-600" />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Inventory</h1>
          <p className="text-sm text-gray-500">Manage stock levels and low-stock alerts</p>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-100">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  Product
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  Current Stock
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  Low Stock Threshold
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  Last Updated
                </th>
                <th className="px-6 py-3 text-right text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  Update Stock
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {inventory.map((item) => {
                const isLowStock = item.stock <= item.lowStockThreshold
                return (
                  <tr
                    key={item._id}
                    className={isLowStock ? 'bg-red-50/50 hover:bg-red-50/70' : 'hover:bg-gray-50/50'}
                  >
                    <td className="px-6 py-4 font-medium text-gray-900">
                      {item.product?.name ?? '—'}
                    </td>
                    <td className="px-6 py-4">
                      <span className="font-semibold text-gray-900">{item.stock}</span>
                    </td>
                    <td className="px-6 py-4 text-gray-600">{item.lowStockThreshold}</td>
                    <td className="px-6 py-4">
                      {isLowStock ? (
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-red-50 text-red-700">
                          <AlertTriangle className="w-3.5 h-3.5" />
                          Low Stock
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-green-50 text-green-700">
                          <CheckCircle className="w-3.5 h-3.5" />
                          In Stock
                        </span>
                      )}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-500">
                      {new Date(item.lastUpdated).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <input
                        type="number"
                        min="0"
                        value={item.stock}
                        onChange={(e) => {
                          const val = parseInt(e.target.value, 10)
                          if (!Number.isNaN(val) && val >= 0) {
                            handleUpdateStock(item._id, val)
                          }
                        }}
                        className="w-20 border border-gray-200 rounded-lg px-2 py-1.5 text-sm text-center focus:ring-2 focus:ring-violet-500 focus:border-violet-500"
                      />
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
        {inventory.length === 0 && (
          <div className="text-center py-12 text-gray-500">
            No inventory items. Add products first, then initialize inventory from the backend if
            needed.
          </div>
        )}
      </div>
    </div>
  )
}
