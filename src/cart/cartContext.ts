import { createContext, useContext, type Dispatch } from 'react'
import type { CartAction, CartState } from './cartReducer'

export const CartStateContext = createContext<CartState | null>(null)
export const CartDispatchContext = createContext<Dispatch<CartAction> | null>(null)

export function useCartState(): CartState {
  const state = useContext(CartStateContext)
  if (state === null) {
    throw new Error('useCartState must be used within a <CartProvider>')
  }
  return state
}

export function useCartDispatch(): Dispatch<CartAction> {
  const dispatch = useContext(CartDispatchContext)
  if (dispatch === null) {
    throw new Error('useCartDispatch must be used within a <CartProvider>')
  }
  return dispatch
}
