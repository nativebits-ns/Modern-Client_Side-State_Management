import { CheckoutContext } from '../checkout/CheckoutContext'

export function CartErrorBanner() {
  const error = CheckoutContext.useSelector((state) => state.context.error)
  if (!error) return null

  return (
    <p role="alert" className="-md border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">
      {error}
    </p>
  )
}
