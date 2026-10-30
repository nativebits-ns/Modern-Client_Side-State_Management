import { memo } from 'react'
import { formatPrice } from '../lib/format'
import type { Product } from '../types'

export const ProductCard = memo(function ProductCard({ product }: { product: Product }) {
  return (
    <li className="flex flex-col justify-between gap-6 -lg border border-stone-200 bg-white p-4">
      <div>
        <h3 className="font-medium text-stone-900">{product.name}</h3>
        <p className="mt-1 text-stone-600 tabular-nums">{formatPrice(product.price)}</p>
      </div>
    </li>
  )
})
