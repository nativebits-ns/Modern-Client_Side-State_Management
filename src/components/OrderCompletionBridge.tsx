import { useEffect } from 'react'
import { CheckoutContext } from '../checkout/CheckoutContext'
import { useCartStore } from '../store/cartStore'

export function OrderCompletionBridge() {
  const checkout = CheckoutContext.useActorRef()

  useEffect(() => {
    const subscription = checkout.on('ORDER_COMPLETED', () => {
      useCartStore.getState().actions.clearCart()
    })
    return () => subscription.unsubscribe()
  }, [checkout])

  return null
}
