import type { Product } from './types'

export async function fetchProducts(signal?: AbortSignal): Promise<Product[]> {
  const res = await fetch('/api/products', { signal })
  if (!res.ok) throw new Error(`Could not load products (${res.status})`)
  return res.json()
}
