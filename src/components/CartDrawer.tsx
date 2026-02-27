import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { X, Minus, Plus, Trash2, ShoppingBag, ArrowRight } from 'lucide-react'
import { useCartStore } from '../stores/cartStore'

export function CartDrawer() {
  const { items, isDrawerOpen, closeDrawer, removeItem, updateQuantity, totalPrice, totalItems } = useCartStore()

  // Lock body scroll when drawer is open
  useEffect(() => {
    if (isDrawerOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [isDrawerOpen])

  // Close on escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeDrawer()
    }
    if (isDrawerOpen) {
      document.addEventListener('keydown', handleEscape)
    }
    return () => document.removeEventListener('keydown', handleEscape)
  }, [isDrawerOpen, closeDrawer])

  return (
    <>
      {/* Backdrop */}
      <div
        className={`fixed inset-0 bg-black/40 z-[60] transition-opacity duration-300 ${
          isDrawerOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        onClick={closeDrawer}
        aria-hidden="true"
      />

      {/* Drawer */}
      <div
        className={`fixed top-0 right-0 h-full w-full max-w-md bg-white z-[70] shadow-2xl transform transition-transform duration-300 ease-in-out ${
          isDrawerOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
        role="dialog"
        aria-modal="true"
        aria-label="Shopping cart"
      >
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200">
            <h2 className="text-lg font-medium flex items-center gap-2">
              <ShoppingBag className="h-5 w-5" />
              Cart ({totalItems()})
            </h2>
            <button
              onClick={closeDrawer}
              className="p-2 hover:bg-gray-100 transition-colors"
              aria-label="Close cart"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Items */}
          {items.length === 0 ? (
            <div className="flex-1 flex items-center justify-center px-6">
              <div className="text-center">
                <div className="w-16 h-16 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
                  <ShoppingBag className="h-6 w-6 text-gray-400" />
                </div>
                <p className="text-gray-500 mb-4">Your cart is empty</p>
                <button onClick={closeDrawer} className="text-[#c9956c] hover:underline text-sm">
                  Continue Shopping
                </button>
              </div>
            </div>
          ) : (
            <div className="flex-1 overflow-y-auto px-6 py-4">
              <div className="space-y-4">
                {items.map((item) => (
                  <div key={item.product.id} className="flex gap-4 pb-4 border-b border-gray-100">
                    <Link to={`/product/${item.product.id}`} onClick={closeDrawer} className="flex-shrink-0">
                      <img
                        src={item.product.image}
                        alt={item.product.name}
                        className="w-20 h-20 object-cover bg-gray-100"
                      />
                    </Link>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2">
                        <Link
                          to={`/product/${item.product.id}`}
                          onClick={closeDrawer}
                          className="hover:text-[#c9956c] transition-colors"
                        >
                          <h3 className="text-sm font-medium truncate">{item.product.name}</h3>
                        </Link>
                        <button
                          onClick={() => removeItem(item.product.id)}
                          className="p-1 text-gray-400 hover:text-red-500 transition-colors flex-shrink-0"
                          aria-label={`Remove ${item.product.name}`}
                        >
                          <Trash2 className="h-3.5 w-3.5" />
                        </button>
                      </div>
                      <p className="text-xs text-gray-400 mt-0.5">
                        ${item.product.price.toFixed(2)} each
                      </p>
                      <div className="flex items-center justify-between mt-2">
                        <div className="flex items-center border border-gray-200">
                          <button
                            onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                            className="p-1.5 hover:bg-gray-50 transition-colors"
                            aria-label="Decrease quantity"
                          >
                            <Minus className="h-3 w-3" />
                          </button>
                          <span className="px-3 py-1 text-xs min-w-[32px] text-center">{item.quantity}</span>
                          <button
                            onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                            className="p-1.5 hover:bg-gray-50 transition-colors"
                            aria-label="Increase quantity"
                          >
                            <Plus className="h-3 w-3" />
                          </button>
                        </div>
                        <span className="text-sm font-medium">
                          ${(item.product.price * item.quantity).toFixed(2)}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Footer */}
          {items.length > 0 && (
            <div className="border-t border-gray-200 px-6 py-4 space-y-4">
              {totalPrice() < 75 && (
                <p className="text-xs text-center text-[#c9956c]">
                  Add ${(75 - totalPrice()).toFixed(2)} more for free shipping
                </p>
              )}
              <div className="flex justify-between text-lg font-medium">
                <span>Subtotal</span>
                <span>${totalPrice().toFixed(2)}</span>
              </div>
              <Link
                to="/cart"
                onClick={closeDrawer}
                className="btn-primary w-full flex items-center justify-center gap-2"
              >
                View Cart <ArrowRight className="h-4 w-4" />
              </Link>
              <p className="text-xs text-gray-400 text-center">
                Shipping & taxes calculated at checkout
              </p>
            </div>
          )}
        </div>
      </div>
    </>
  )
}
