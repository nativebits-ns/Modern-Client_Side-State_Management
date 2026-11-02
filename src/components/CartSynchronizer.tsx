import { useEffect } from 'react'
import { CheckoutContext } from '../checkout/CheckoutContext'
import { useCartStore } from '../store/cartStore'

export function CartSynchronizer() {
  const checkout = CheckoutContext.useActorRef()

  useEffect(() => {
    checkout.send({ type: 'CART_UPDATED', items: useCartStore.getState().items })
    return useCartStore.subscribe((state, prev) => {
      if (state.items !== prev.items) checkout.send({ type: 'CART_UPDATED', items: state.items })
    })
  }, [checkout])

  return null
}
