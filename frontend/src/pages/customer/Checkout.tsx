import { useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useUser } from '@clerk/clerk-react'
import {
  CreditCard,
  Landmark,
  QrCode,
  Wallet,
  Banknote,
  ShieldCheck,
} from 'lucide-react'
import toast from 'react-hot-toast'
import { useCart } from '../../context/CartContext'
import { createOrder, syncUser } from '../../utils/api'

type PaymentMethod = 'CREDIT_CARD' | 'DEBIT_CARD' | 'UPI' | 'NET_BANKING' | 'COD'

const PAYMENT_METHODS: {
  id: PaymentMethod
  title: string
  subtitle: string
  icon: React.ComponentType<{ className?: string }>
}[] = [
  { id: 'CREDIT_CARD', title: 'Credit Card', subtitle: 'Visa, Mastercard, Amex', icon: CreditCard },
  { id: 'DEBIT_CARD', title: 'Debit Card', subtitle: 'Bank debit cards', icon: Wallet },
  { id: 'UPI', title: 'UPI', subtitle: 'Pay using UPI apps', icon: QrCode },
  { id: 'NET_BANKING', title: 'Net Banking', subtitle: 'All major banks', icon: Landmark },
  { id: 'COD', title: 'Cash on Delivery', subtitle: 'Pay when it arrives', icon: Banknote },
]

export default function Checkout() {
  const navigate = useNavigate()
  const { user } = useUser()
  const { items, clearCart } = useCart()

  const [method, setMethod] = useState<PaymentMethod>('UPI')
  const [submitting, setSubmitting] = useState(false)

  const total = useMemo(
    () => items.reduce((sum, it) => sum + it.price * it.quantity, 0),
    [items]
  )

  const placeOrder = async () => {
    if (items.length === 0) {
      toast.error('Cart is empty')
      navigate('/cart')
      return
    }
    const email = user?.primaryEmailAddress?.emailAddress
    if (!user?.id || !email) {
      toast.error('Please sign in to checkout')
      navigate('/login')
      return
    }

    setSubmitting(true)
    try {
      const syncRes = await syncUser({
        clerkId: user.id,
        name: user.fullName ?? undefined,
        email,
      })
      const userId = syncRes.data?._id
      if (!userId) {
        toast.error('Could not verify your account')
        return
      }

      const payload = {
        userId,
        customerName: user.fullName ?? user.firstName ?? 'Customer',
        customerEmail: email,
        paymentMethod: method,
        products: items.map((it) => ({
          productId: it.id,
          quantity: it.quantity,
          price: it.price,
        })),
        totalPrice: total,
      }

      await createOrder(payload)
      clearCart()
      toast.success('Payment successful. Order placed!')
      navigate('/orders')
    } catch (err: unknown) {
      toast.error(err instanceof Error ? err.message : 'Checkout failed. Please try again.')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 text-white">
      <div className="flex flex-col lg:flex-row gap-6 lg:gap-8">
        {/* Left: Payment */}
        <div className="flex-1">
          <div className="mb-6">
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">Checkout</h1>
            <p className="text-white/60 mt-2">
              Choose a payment method and confirm your purchase.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 gap-4">
            {PAYMENT_METHODS.map((m) => {
              const Icon = m.icon
              const active = method === m.id
              return (
                <button
                  key={m.id}
                  type="button"
                  onClick={() => setMethod(m.id)}
                  className={`text-left rounded-2xl border p-5 transition transform hover:-translate-y-0.5 ${
                    active
                      ? 'bg-white/10 border-[#ff7a00]/60 shadow-[0_0_0_1px_rgba(255,122,0,0.25)]'
                      : 'bg-black/40 border-white/10 hover:bg-white/5'
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <div className={`p-2.5 rounded-xl ${active ? 'bg-[#ff7a00]/15' : 'bg-white/10'}`}>
                      <Icon className={`w-6 h-6 ${active ? 'text-[#ff7a00]' : 'text-white/70'}`} />
                    </div>
                    <div className="min-w-0">
                      <div className="flex items-center justify-between gap-3">
                        <p className="font-semibold text-white">{m.title}</p>
                        {active ? (
                          <span className="text-xs font-semibold bg-[#ff7a00] text-black px-2.5 py-1 rounded-full">
                            Selected
                          </span>
                        ) : null}
                      </div>
                      <p className="text-sm text-white/55 mt-1">{m.subtitle}</p>
                    </div>
                  </div>
                </button>
              )
            })}
          </div>

          <div className="mt-6 rounded-2xl bg-black/40 border border-white/10 p-5 flex items-center gap-3">
            <ShieldCheck className="w-5 h-5 text-[#ff7a00]" />
            <p className="text-sm text-white/70">
              Demo checkout — your order is saved locally in this browser (no server).
            </p>
          </div>

          <div className="mt-6 flex gap-3">
            <button
              type="button"
              onClick={() => navigate('/cart')}
              className="px-5 py-3 rounded-xl bg-white/10 text-white font-semibold hover:bg-white/15 transition"
            >
              Back to Cart
            </button>
            <button
              type="button"
              onClick={placeOrder}
              disabled={submitting}
              className="flex-1 px-5 py-3 rounded-xl bg-[#ff7a00] text-black font-extrabold hover:brightness-110 transition disabled:opacity-60"
            >
              {submitting ? 'Processing…' : `Pay ₹${total.toFixed(0)}`}
            </button>
          </div>
        </div>

        {/* Right: Summary */}
        <aside className="w-full lg:w-[420px]">
          <div className="rounded-2xl bg-black/40 border border-white/10 p-6 shadow-lg">
            <h2 className="text-lg font-extrabold">Order summary</h2>
            <div className="mt-4 space-y-4">
              {items.map((it) => (
                <div key={it.id} className="flex gap-3">
                  <div className="w-14 h-14 rounded-xl bg-white/10 border border-white/10 overflow-hidden flex items-center justify-center">
                    {it.image ? (
                      <img src={it.image} alt={it.name} className="w-full h-full object-cover" />
                    ) : (
                      <span className="text-xs text-white/40">No image</span>
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-white truncate">{it.name}</p>
                    <p className="text-sm text-white/55">
                      ₹{it.price.toFixed(0)} × {it.quantity}
                    </p>
                  </div>
                  <div className="font-semibold text-white">
                    ₹{(it.price * it.quantity).toFixed(0)}
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-6 border-t border-white/10 pt-5 space-y-2 text-sm">
              <div className="flex justify-between text-white/70">
                <span>Subtotal</span>
                <span>₹{total.toFixed(0)}</span>
              </div>
              <div className="flex justify-between text-white/70">
                <span>Shipping</span>
                <span>₹0</span>
              </div>
              <div className="flex justify-between text-white font-extrabold text-base">
                <span>Total</span>
                <span className="text-[#ff7a00]">₹{total.toFixed(0)}</span>
              </div>
            </div>
          </div>
        </aside>
      </div>
    </div>
  )
}

