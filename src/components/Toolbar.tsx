import { CartBadge } from './CartBadge'

export function Toolbar({ onCartClick }: { onCartClick: () => void }) {
  return (
    <div className="flex items-center gap-3">
      <CartBadge onClick={onCartClick} />
    </div>
  )
}
