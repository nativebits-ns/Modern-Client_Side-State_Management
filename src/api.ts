import type { CheckoutResult, OrderPayload, Product } from './types'

export async function fetchProducts(signal?: AbortSignal): Promise<Product[]> {
  const res = await fetch('/api/products', { signal })
  if (!res.ok) throw new Error(`Could not load products (${res.status})`)
  return res.json()
}

export async function postOrder(order: OrderPayload): Promise<CheckoutResult> {
  const res = await fetch('/api/orders', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(order),
  })
  if (!res.ok) throw new Error(`Checkout failed (${res.status})`)
  return res.json()
}
