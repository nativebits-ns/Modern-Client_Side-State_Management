import { useReducer, type ReactNode } from 'react'
import { CartDispatchContext, CartStateContext } from './cartContext'
import { cartReducer, initialCartState } from './cartReducer'

export function CartProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(cartReducer, initialCartState)

  return (
    <CartStateContext.Provider value={state}>
      <CartDispatchContext.Provider value={dispatch}>
        {children}
      </CartDispatchContext.Provider>
    </CartStateContext.Provider>
  )
}