import { memo } from 'react'
import { formatPrice } from '../lib/format'
import { useAtomValue, useSetAtom } from 'jotai'
import {
  addItemAtom,
  cartIsEmptyAtom,
  cartItemsAtom,
  decreaseItemAtom,
  removeItemAtom,
} from '../store/cartAtoms'
import type { CartItem } from '../types'

const CartItemRow = memo(function CartItemRow({ item }: { item: CartItem }) {
  const addItem = useSetAtom(addItemAtom)
  const decreaseItem = useSetAtom(decreaseItemAtom)
  const removeItem = useSetAtom(removeItemAtom)

  return (
    <li className="flex items-center justify-between gap-4 py-4">
      <div className="flex-1 min-w-0">
        <p className="font-medium text-stone-900 truncate">{item.name}</p>
        <p className="text-sm text-stone-500 tabular-nums">{formatPrice(item.price)} each</p>
      </div>

      <div className="flex items-center gap-2 -md border border-stone-300 p-1">
        <button
          type="button"
          onClick={() => decreaseItem(item.id)}
          aria-label={`Decrease quantity of ${item.name}`}
          className="flex h-7 w-7 items-center justify-center  text-stone-600 transition-colors hover:bg-stone-100 focus-visible:outline-2 focus-visible:outline-stone-900"
        >
          -
        </button>
        <span className="w-6 text-center text-sm font-medium text-stone-900 tabular-nums">
          {item.quantity}
        </span>
        <button
          type="button"
          onClick={() => addItem(item)}
          aria-label={`Increase quantity of ${item.name}`}
          className="flex h-7 w-7 items-center justify-center  text-stone-600 transition-colors hover:bg-stone-100 focus-visible:outline-2 focus-visible:outline-stone-900"
        >
          +
        </button>
      </div>

      <div className="flex flex-col items-end gap-1 min-w-[5rem]">
        <p className="font-semibold tabular-nums text-stone-900">
          {formatPrice(item.price * item.quantity)}
        </p>
        <button
          type="button"
          onClick={() => removeItem(item.id)}
          aria-label={`Remove ${item.name} from cart`}
          className="text-xs text-stone-500 underline-offset-2 hover:text-red-600 hover:underline focus-visible:outline-2 focus-visible:outline-red-600"
        >
          Remove
        </button>
      </div>
    </li>
  )
})

export function CartItemsList() {
  const items = useAtomValue(cartItemsAtom)
  const isEmpty = useAtomValue(cartIsEmptyAtom)

  if (isEmpty) {
    return (
      <div className="-lg border border-dashed border-stone-300 p-8 text-center">
        <p className="text-stone-600">Your cart is empty. Add a product from the catalog.</p>
      </div>
    )
  }

  return (
    <ul className="divide-y divide-stone-200">
      {items.map((item) => (
        <CartItemRow key={item.id} item={item} />
      ))}
    </ul>
  )
}
