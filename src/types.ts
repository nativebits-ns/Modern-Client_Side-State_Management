export interface Product {
  id: string
  name: string
  price: number
}

export interface CartItem extends Product {
  quantity: number
}

export interface CheckoutResult {
  id: string
  items: CartItem[]
  total: number
  createdAt: string
}

export type OrderPayload = Omit<CheckoutResult, 'id'>

export type CheckoutStatus = 'idle' | 'submitting' | 'success' | 'error'
