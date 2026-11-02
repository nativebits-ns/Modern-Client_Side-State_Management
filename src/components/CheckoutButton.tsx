import { CheckoutContext } from '../checkout/CheckoutContext'

export function CheckoutButton() {
  const checkout = CheckoutContext.useActorRef()
  const canSubmit = CheckoutContext.useSelector((state) => state.can({ type: 'SUBMIT' }))
  const isSubmitting = CheckoutContext.useSelector((state) => state.matches('submitting'))

  return (
    <button
      type="button"
      onClick={() => checkout.send({ type: 'SUBMIT' })}
      disabled={!canSubmit}
      className="w-full -md bg-black px-3 py-2 font-medium text-white hover:bg-gray-800 disabled:cursor-not-allowed disabled:bg-stone-300 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
    >
      {isSubmitting ? 'Processing payment…' : 'Checkout'}
    </button>
  )
}
