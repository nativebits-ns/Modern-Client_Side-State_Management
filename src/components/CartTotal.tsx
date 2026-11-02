import { formatPrice } from '../lib/format'
import { selectTotal, useCartStore } from '../store/cartStore'

export function CartTotal() {
  const total = useCartStore(selectTotal)

  return (
    <p className="flex justify-between font-medium text-stone-900">
      <span>Total</span>
      <span className="tabular-nums">{formatPrice(total)}</span>
    </p>
  )
}
