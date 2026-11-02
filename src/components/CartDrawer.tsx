import { useEffect } from 'react'
import { CartErrorBanner } from './CartErrorBanner'
import { CartItemsList } from './CartItemsList'
import { CartTotal } from './CartTotal'
import { CheckoutButton } from './CheckoutButton'

interface CartDrawerProps {
  open: boolean
  onClose: () => void
}

export function CartDrawer({ open, onClose }: CartDrawerProps) {
  useEffect(() => {
    if (!open) return
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [open, onClose])

  return (
    <>
      <div
        onClick={onClose}
        aria-hidden="true"
        className={`fixed inset-0 z-30 bg-stone-900/40 transition-opacity motion-reduce:transition-none ${
          open ? 'opacity-100' : 'pointer-events-none opacity-0'
        }`}
      />

      <aside
        role="dialog"
        aria-label="Shopping cart"
        aria-modal="true"
        inert={!open ? '' : undefined}
        className={`fixed inset-y-0 right-0 z-40 flex w-full max-w-md flex-col bg-white shadow-xl transition-transform duration-300 motion-reduce:transition-none ${
          open ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex items-center justify-between border-b border-stone-200 px-4 py-3">
          <h2 className="text-lg font-semibold text-stone-900">Your cart</h2>
          <button
            type="button"
            onClick={onClose}
            className="-md px-2 py-1 text-sm text-stone-700 hover:bg-stone-100 focus-visible:outline-2 focus-visible:outline-black"
          >
            Close
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-4 py-2">
          <CartItemsList />
        </div>

        <div className="space-y-3 border-t border-stone-200 px-4 py-4">
          <CartTotal />
          <CartErrorBanner />
          <CheckoutButton />
        </div>
      </aside>
    </>
  )
}
