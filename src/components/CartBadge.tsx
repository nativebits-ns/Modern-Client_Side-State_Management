import { useCartState } from '../cart/cartContext'

export function CartBadge({ onClick }: { onClick: () => void }) {
  const items = useCartState()
  const count = items.reduce((sum, item) => sum + item.quantity, 0)

  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={`Open cart, ${count} ${count === 1 ? 'item' : 'items'}`}
      className="relative inline-flex items-center gap-2 -md border border-stone-300 px-3 py-2 text-sm font-medium text-stone-900 hover:bg-stone-100 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
    >
      <svg viewBox="0 0 24 24" className="size-5" fill="none" stroke="currentColor" strokeWidth="1.75" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 4h2l2.4 11.2a1 1 0 0 0 1 .8h8.4a1 1 0 0 0 1-.8L19 8H6" />
        <circle cx="9" cy="20" r="1.2" />
        <circle cx="17" cy="20" r="1.2" />
      </svg>
      Cart
      <span className="min-w-6 -full bg-black px-1.5 py-0.5 text-center text-xs font-semibold text-white">
        {count}
      </span>
    </button>
  )
}
