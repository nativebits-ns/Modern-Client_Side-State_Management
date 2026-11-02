import { CheckoutContext } from '../checkout/CheckoutContext'
import { CartErrorBanner } from './CartErrorBanner'

const STATUS_LABEL: Record<string, string> = {
  reviewing: 'Waiting for payment',
  submitting: 'Processing payment…',
  success: 'Payment complete',
}

function PaymentStatus() {
  const value = CheckoutContext.useSelector((state) => String(state.value))
  return (
    <p role="status" className="text-sm text-stone-700">
      {STATUS_LABEL[value] ?? value}
    </p>
  )
}

function SubmitPaymentButton() {
  const checkout = CheckoutContext.useActorRef()
  const canSubmit = CheckoutContext.useSelector((state) => state.can({ type: 'SUBMIT' }))

  return (
    <button
      type="button"
      onClick={() => checkout.send({ type: 'SUBMIT' })}
      disabled={!canSubmit}
      className="flex-1 -md bg-black px-3 py-2 text-sm font-medium text-white hover:bg-gray-800 disabled:cursor-not-allowed disabled:bg-stone-300 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
    >
      Submit Payment
    </button>
  )
}

function CancelButton() {
  const checkout = CheckoutContext.useActorRef()
  const canCancel = CheckoutContext.useSelector((state) => state.can({ type: 'CANCEL' }))

  return (
    <button
      type="button"
      onClick={() => checkout.send({ type: 'CANCEL' })}
      disabled={!canCancel}
      className="flex-1 -md border border-stone-300 px-3 py-2 text-sm font-medium text-stone-800 hover:bg-stone-100 disabled:cursor-not-allowed disabled:text-stone-400 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
    >
      Cancel
    </button>
  )
}

function NewOrderButton() {
  const checkout = CheckoutContext.useActorRef()
  const isSuccess = CheckoutContext.useSelector((state) => state.matches('success'))
  if (!isSuccess) return null

  return (
    <button
      type="button"
      onClick={() => checkout.send({ type: 'RESET' })}
      className="w-full -md border border-stone-300 px-3 py-2 text-sm font-medium text-stone-800 hover:bg-stone-100"
    >
      Start new order
    </button>
  )
}

export function PaymentPanel() {
  return (
    <section
      aria-label="Payment"
      className="fixed bottom-4 left-4 z-50 w-72 space-y-3 -lg border border-stone-200 bg-white p-4 shadow-lg"
    >
      <h2 className="text-sm font-semibold text-stone-900">Payment</h2>
      <PaymentStatus />
      <CartErrorBanner />
      <div className="flex gap-2">
        <SubmitPaymentButton />
        <CancelButton />
      </div>
      <NewOrderButton />
    </section>
  )
}
