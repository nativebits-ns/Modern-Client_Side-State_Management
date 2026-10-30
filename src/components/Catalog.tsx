import { memo, useEffect, useState } from 'react'
import { fetchProducts } from '../api'
import type { Product } from '../types'
import { ProductCard } from './ProductCard'

type CatalogState =
  | { status: 'loading' }
  | { status: 'error'; message: string }
  | { status: 'success'; products: Product[] }

export const Catalog = memo(function Catalog() {
  const [state, setState] = useState<CatalogState>({ status: 'loading' })

  useEffect(() => {
    const controller = new AbortController()

    fetchProducts(controller.signal)
      .then((products) => setState({ status: 'success', products }))
      .catch((error: unknown) => {
        if (controller.signal.aborted) return
        setState({
          status: 'error',
          message: error instanceof Error ? error.message : 'Something went wrong.',
        })
      })

    return () => controller.abort()
  }, [])

  if (state.status === 'loading') {
    return <p role="status" className="text-stone-600">Loading products…</p>
  }
  if (state.status === 'error') {
    return (
      <p role="alert" className="text-red-700">
        {state.message}. Check that the API is running with <code>npm run server</code>.
      </p>
    )
  }

  return (
    <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {state.products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </ul>
  )
})
