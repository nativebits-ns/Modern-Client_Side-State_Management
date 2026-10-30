import { memo } from 'react'
import { useSetAtom } from 'jotai'
import { addItemAtom } from '../store/cartAtoms'
import { formatPrice } from '../lib/format'
import type { Product } from '../types'

export const ProductCard = memo(function ProductCard({ product }: { product: Product }) {
  const addItem = useSetAtom(addItemAtom)

  return (
    <li className="flex flex-col justify-between gap-6 -lg border border-stone-200 bg-white p-4">
      <div>
        <h3 className="font-medium text-stone-900">{product.name}</h3>
        <p className="mt-1 text-stone-600 tabular-nums">{formatPrice(product.price)}</p>
      </div>
      <button
        type="button"
        onClick={() => addItem(product)}
        className="-md bg-black px-3 py-2 text-sm font-medium text-white hover:bg-gray-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
      >
        Add to cart
      </button>
    </li>
  )
})
