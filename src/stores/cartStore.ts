import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { Product } from '../data/products'

export interface CartItem {
  product: Product
  quantity: number
}

interface CartState {
  items: CartItem[]
  isDrawerOpen: boolean
  addItem: (product: Product, quantity?: number) => void
  removeItem: (productId: string) => void
  updateQuantity: (productId: string, quantity: number) => void
  clearCart: () => void
  openDrawer: () => void
  closeDrawer: () => void
  toggleDrawer: () => void
  totalItems: () => number
  totalPrice: () => number
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      isDrawerOpen: false,

      addItem: (product, quantity = 1) => {
        set((state) => {
          const existing = state.items.find(item => item.product.id === product.id)
          if (existing) {
            return {
              items: state.items.map(item =>
                item.product.id === product.id
                  ? { ...item, quantity: item.quantity + quantity }
                  : item
              ),
              isDrawerOpen: true,
            }
          }
          return {
            items: [...state.items, { product, quantity }],
            isDrawerOpen: true,
          }
        })
      },

      removeItem: (productId) => {
        set((state) => ({
          items: state.items.filter(item => item.product.id !== productId),
        }))
      },

      updateQuantity: (productId, quantity) => {
        if (quantity <= 0) {
          get().removeItem(productId)
          return
        }
        set((state) => ({
          items: state.items.map(item =>
            item.product.id === productId
              ? { ...item, quantity }
              : item
          ),
        }))
      },

      clearCart: () => set({ items: [] }),

      openDrawer: () => set({ isDrawerOpen: true }),
      closeDrawer: () => set({ isDrawerOpen: false }),
      toggleDrawer: () => set((state) => ({ isDrawerOpen: !state.isDrawerOpen })),

      totalItems: () => get().items.reduce((sum, item) => sum + item.quantity, 0),
      totalPrice: () => get().items.reduce((sum, item) => sum + item.product.price * item.quantity, 0),
    }),
    {
      name: 'pure-candles-cart',
      partialize: (state) => ({ items: state.items }),
    }
  )
)
