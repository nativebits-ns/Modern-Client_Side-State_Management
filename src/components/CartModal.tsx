import { useEffect } from 'react'
import { useAtomValue, useSetAtom } from 'jotai'
import { cartIsEmptyAtom, cartTotalAtom, clearCartAtom } from '../store/cartAtoms'
import { formatPrice } from '../lib/format'
import { CartItemsList } from './CartItemsList'

interface CartModalProps {
  open: boolean
  onClose: () => void
}

export function CartModal({ open, onClose }: CartModalProps) {
  const total = useAtomValue(cartTotalAtom)
  const isEmpty = useAtomValue(cartIsEmptyAtom)
  const clearCart = useSetAtom(clearCartAtom)

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

      <div
        className={`fixed inset-0 z-40 flex items-center justify-center p-4 transition-all duration-300 motion-reduce:transition-none ${
          open ? 'opacity-100 scale-100' : 'pointer-events-none opacity-0 scale-95'
        }`}
      >
        <aside
          role="dialog"
          aria-label="Shopping cart"
          aria-modal="true"
          inert={!open ? '' : undefined}
          className="flex max-h-[85vh] w-full max-w-md flex-col -lg bg-white shadow-xl"
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
            <p className="flex justify-between font-medium text-stone-900">
              <span>Total</span>
              <span className="tabular-nums">{formatPrice(total)}</span>
            </p>
            <button
              type="button"
              onClick={() => clearCart()}
              disabled={isEmpty}
              className="w-full -md bg-black px-3 py-2 font-medium text-white hover:bg-gray-800 disabled:cursor-not-allowed disabled:bg-stone-300 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
            >
              Clear cart
            </button>
          </div>
        </aside>
      </div>
    </>
  )
}
