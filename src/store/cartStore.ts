import { create } from 'zustand'
import { getCartTotal } from '../lib/cart'
import type { CartItem, Product } from '../types'

interface CartActions {
  addItem: (product: Product) => void
  removeItem: (id: string) => void
  increaseItem: (id: string) => void
  reduceItem: (id: string) => void
  clearCart: () => void
}

interface CartStore {
  items: CartItem[]
  actions: CartActions
}

export const useCartStore = create<CartStore>()((set) => ({
  items: [],

  actions: {
    addItem: (product) =>
      set((state) => {
        if (!state.items.some((item) => item.id === product.id)) {
          return { items: [...state.items, { ...product, quantity: 1 }] }
        }
        return {
          items: state.items.map((item) =>
            item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item,
          ),
        }
      }),

    removeItem: (id) =>
      set((state) => {
        const items = state.items.filter((item) => item.id !== id)
        return items.length === state.items.length ? state : { items }
      }),

    increaseItem: (id) =>
      set((state) => ({
        items: state.items.map((item) =>
          item.id === id ? { ...item, quantity: item.quantity + 1 } : item,
        ),
      })),

    reduceItem: (id) =>
      set((state) => ({
        items: state.items
          .map((item) => (item.id === id ? { ...item, quantity: item.quantity - 1 } : item))
          .filter((item) => item.quantity > 0),
      })),

    clearCart: () => set((state) => (state.items.length === 0 ? state : { items: [] })),
  },
}))

export const selectTotal = (state: CartStore): number => getCartTotal(state.items)

export const selectItemCount = (state: CartStore): number =>
  state.items.reduce((sum, item) => sum + item.quantity, 0)

export const selectIsEmpty = (state: CartStore): boolean => state.items.length === 0

export const selectItems = (state: CartStore): CartItem[] => state.items