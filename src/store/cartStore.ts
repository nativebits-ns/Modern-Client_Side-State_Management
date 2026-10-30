import { create } from 'zustand'
import { postOrder } from '../api'
import type { CartItem, CheckoutStatus, Product } from '../types'

interface CartActions {
  addItem: (product: Product) => void
  removeItem: (id: string) => void
  increaseItem: (id: string) => void
  reduceItem: (id: string) => void
  checkout: () => Promise<void>
  resetStatus: () => void
}

interface CartStore {
  items: CartItem[]
  status: CheckoutStatus
  error: string | null
  actions: CartActions
}

export const useCartStore = create<CartStore>()((set, get) => ({
  items: [],
  status: 'idle',
  error: null,

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

    checkout: async () => {
      // Read the latest state directly from the store, not from a component closure.
      const state = get()
      if (state.status === 'submitting' || state.items.length === 0) return

      const items = state.items
      const total = selectTotal(state)
      set({ status: 'submitting', error: null })

      try {
        await postOrder({ items, total, createdAt: new Date().toISOString() })
        set({ status: 'success', items: [] })
      } catch (err) {
        set({
          status: 'error',
          error: err instanceof Error ? err.message : 'Something went wrong.',
        })
      }
    },

    resetStatus: () => set({ status: 'idle', error: null }),
  },
}))

export const selectTotal = (state: CartStore): number =>
  state.items.reduce((sum, item) => sum + item.price * item.quantity, 0)

export const selectItemCount = (state: CartStore): number =>
  state.items.reduce((sum, item) => sum + item.quantity, 0)

export const selectIsEmpty = (state: CartStore): boolean => state.items.length === 0

export const selectItems = (state: CartStore): CartItem[] => state.items
