import { useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { Minus, Plus, Trash2, ArrowLeft, ArrowRight, ShoppingBag } from 'lucide-react'
import { useCartStore } from '../stores/cartStore'

export function Cart() {
  const { items, removeItem, updateQuantity, clearCart, totalPrice } = useCartStore()
  const [searchParams] = useSearchParams()
  const [checkoutError, setCheckoutError] = useState<string | null>(null)
  const [isCheckingOut, setIsCheckingOut] = useState(false)
  const isCanceled = searchParams.get('canceled') === 'true'

  const handleCheckout = async () => {
    setCheckoutError(null)
    setIsCheckingOut(true)
    try {
      const response = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          items: items.map(item => ({
            productId: item.product.id,
            productName: item.product.name,
            price: Math.round(item.product.price * 100),
            quantity: item.quantity,
          })),
        }),
      })
      const data = await response.json()
      if (data.url) {
        window.location.href = data.url
      } else if (data.error) {
        setCheckoutError(data.error)
        setIsCheckingOut(false)
      }
    } catch {
      setCheckoutError('Unable to connect to checkout. Please try again.')
      setIsCheckingOut(false)
    }
  }

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-white">
        <div className="container-narrow py-20 md:py-32">
          <div className="max-w-md mx-auto text-center">
            <div className="w-20 h-20 mx-auto mb-6 bg-gray-100 rounded-full flex items-center justify-center">
              <ShoppingBag className="h-8 w-8 text-gray-400" />
            </div>
            <h1 className="text-3xl md:text-4xl mb-4">Your Cart is Empty</h1>
            <p className="text-gray-500 mb-8">
              Looks like you haven't added any candles yet. Explore our collection to find your perfect scent.
            </p>
            <Link to="/catalog" className="btn-primary inline-flex items-center">
              Browse Collection <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-white">
      <div className="container-narrow py-12">
        <nav className="mb-8" aria-label="Breadcrumb">
          <Link to="/catalog" className="inline-flex items-center text-sm text-gray-500 hover:text-[#c9956c] transition-colors">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Continue Shopping
          </Link>
        </nav>

        <h1 className="section-title mb-10">Shopping Cart</h1>

        <div className="grid lg:grid-cols-[1fr_380px] gap-12">
          {/* Cart Items */}
          <div>
            <div className="border-b border-gray-200 pb-4 mb-6 hidden md:grid grid-cols-[2fr_1fr_1fr_auto] gap-4 text-xs font-semibold tracking-[0.15em] uppercase text-gray-500">
              <span>Product</span>
              <span className="text-center">Quantity</span>
              <span className="text-right">Total</span>
              <span className="w-10"></span>
            </div>

            <div className="space-y-6">
              {items.map((item) => (
                <div
                  key={item.product.id}
                  className="border-b border-gray-100 pb-6 grid grid-cols-[80px_1fr] md:grid-cols-[2fr_1fr_1fr_auto] gap-4 items-center"
                >
                  {/* Product Info */}
                  <div className="col-span-2 md:col-span-1 flex items-center gap-4">
                    <Link to={`/product/${item.product.id}`} className="flex-shrink-0">
                      <img
                        src={item.product.image}
                        alt={item.product.name}
                        className="w-20 h-20 object-cover bg-gray-100"
                      />
                    </Link>
                    <div>
                      <Link to={`/product/${item.product.id}`} className="hover:text-[#c9956c] transition-colors">
                        <h3 className="text-lg">{item.product.name}</h3>
                      </Link>
                      <p className="product-meta mt-1">{item.product.scent.join(' · ').toUpperCase()}</p>
                      <p className="text-gray-600 mt-1">${item.product.price.toFixed(2)}</p>
                    </div>
                  </div>

                  {/* Quantity */}
                  <div className="flex items-center justify-center">
                    <div className="flex items-center border border-gray-200">
                      <button
                        onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                        className="p-2 hover:bg-gray-50 transition-colors"
                        aria-label="Decrease quantity"
                      >
                        <Minus className="h-3 w-3" />
                      </button>
                      <span className="px-4 py-2 min-w-[40px] text-center text-sm">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                        className="p-2 hover:bg-gray-50 transition-colors"
                        aria-label="Increase quantity"
                      >
                        <Plus className="h-3 w-3" />
                      </button>
                    </div>
                  </div>

                  {/* Total */}
                  <div className="text-right">
                    <span className="text-lg font-medium">
                      ${(item.product.price * item.quantity).toFixed(2)}
                    </span>
                  </div>

                  {/* Remove */}
                  <button
                    onClick={() => removeItem(item.product.id)}
                    className="p-2 text-gray-400 hover:text-red-500 transition-colors justify-self-end"
                    aria-label={`Remove ${item.product.name}`}
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              ))}
            </div>

            <div className="mt-6 flex justify-between items-center">
              <button
                onClick={clearCart}
                className="text-sm text-gray-500 hover:text-gray-900 transition-colors underline"
              >
                Clear Cart
              </button>
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:sticky lg:top-28 h-fit">
            <div className="bg-[#f8f6f3] p-8">
              <h2 className="text-xl mb-6">Order Summary</h2>

              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Subtotal ({items.reduce((s, i) => s + i.quantity, 0)} items)</span>
                  <span>${totalPrice().toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Shipping</span>
                  <span>{totalPrice() >= 75 ? 'Free' : '$8.95'}</span>
                </div>
                {totalPrice() < 75 && (
                  <p className="text-xs text-[#c9956c]">
                    Add ${(75 - totalPrice()).toFixed(2)} more for free shipping
                  </p>
                )}
              </div>

              <div className="border-t border-gray-300 mt-6 pt-6">
                <div className="flex justify-between text-lg font-medium">
                  <span>Total</span>
                  <span>${(totalPrice() + (totalPrice() >= 75 ? 0 : 8.95)).toFixed(2)}</span>
                </div>
              </div>

              {isCanceled && (
                <p className="text-sm text-amber-600 text-center mb-4">
                  Checkout was canceled. Your cart items are still saved.
                </p>
              )}

              {checkoutError && (
                <p className="text-sm text-red-600 text-center mb-4">
                  {checkoutError}
                </p>
              )}

              <button
                onClick={handleCheckout}
                disabled={isCheckingOut}
                className="btn-primary w-full mt-6 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isCheckingOut ? 'Redirecting to Checkout...' : 'Proceed to Checkout'}
              </button>

              <p className="text-xs text-gray-500 text-center mt-4">
                Secure checkout powered by Stripe
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
