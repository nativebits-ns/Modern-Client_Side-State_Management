import { atom } from 'jotai'
import type { CartItem, Product } from '../types'

export const cartItemsAtom = atom<CartItem[]>([])

export const cartCountAtom = atom((get) =>
  get(cartItemsAtom).reduce((sum, item) => sum + item.quantity, 0),
)

export const cartTotalAtom = atom((get) =>
  get(cartItemsAtom).reduce((sum, item) => sum + item.price * item.quantity, 0),
)

export const cartIsEmptyAtom = atom((get) => get(cartItemsAtom).length === 0)

export const addItemAtom = atom(null, (get, set, product: Product) => {
  const items = get(cartItemsAtom)
  if (!items.some((item) => item.id === product.id)) {
    set(cartItemsAtom, [
      ...items,
      { id: product.id, name: product.name, price: product.price, quantity: 1 },
    ])
    return
  }
  set(
    cartItemsAtom,
    items.map((item) =>
      item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item,
    ),
  )
})

export const decreaseItemAtom = atom(null, (get, set, id: string) => {
  set(
    cartItemsAtom,
    get(cartItemsAtom)
      .map((item) => (item.id === id ? { ...item, quantity: item.quantity - 1 } : item))
      .filter((item) => item.quantity > 0),
  )
})

export const removeItemAtom = atom(null, (get, set, id: string) => {
  const items = get(cartItemsAtom)
  const next = items.filter((item) => item.id !== id)
  if (next.length !== items.length) set(cartItemsAtom, next)
})

export const clearCartAtom = atom(null, (get, set) => {
  if (get(cartItemsAtom).length > 0) set(cartItemsAtom, [])
})
