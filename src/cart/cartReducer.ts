import type { CartItem, Product } from '../types'

export type CartState = CartItem[]

export type CartAction =
  | { type: 'ADD_ITEM'; product: Product }
  | { type: 'REMOVE_ITEM'; id: string }
  | { type: 'REDUCE_ITEM'; id: string }
  | { type: 'INCREASE_ITEM'; id: string }

export const initialCartState: CartState = []

export function cartReducer(state: CartState, action: CartAction): CartState {
  switch (action.type) {
    case 'ADD_ITEM': {
      const { product } = action
      if (!state.some((item) => item.id === product.id)) {
        return [...state, { ...product, quantity: 1 }]
      }
      return state.map((item) =>
        item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item,
      )
    }
    case 'REMOVE_ITEM': {
      const next = state.filter((item) => item.id !== action.id)
      return next.length === state.length ? state : next
    }
   case 'INCREASE_ITEM': {
      return state.map((item) =>
        item.id === action.id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      )
    }
    case 'REDUCE_ITEM': {
      return state
        .map((item) =>
          item.id === action.id
            ? { ...item, quantity: item.quantity - 1 }
            : item
        )
        .filter((item) => item.quantity > 0)
      }
  }
}
