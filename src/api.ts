import type { CheckoutResult, OrderPayload, Product } from './types'

export async function fetchProducts(signal?: AbortSignal): Promise<Product[]> {
  const res = await fetch('/api/products', { signal })
  if (!res.ok) throw new Error(`Could not load products (${res.status})`)
  return res.json()
}

export async function postOrder(order: OrderPayload, signal?: AbortSignal): Promise<CheckoutResult> {
  const res = await fetch('/api/orders', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(order),
    signal,
  })
  if (!res.ok) throw new Error(`Payment failed (${res.status})`)
  return res.json()
}