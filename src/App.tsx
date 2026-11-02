import { useCallback, useState } from 'react'
import { CheckoutContext } from './checkout/CheckoutContext'
import { CartDrawer } from './components/CartDrawer'
import { CartSynchronizer } from './components/CartSynchronizer'
import { Catalog } from './components/Catalog'
import { Header } from './components/Header'
import { OrderCompletionBridge } from './components/OrderCompletionBridge'
import { PaymentPanel } from './components/PaymentPanel'

const App = () => {
  const [drawerOpen, setDrawerOpen] = useState(false)
  const openDrawer = useCallback(() => setDrawerOpen(true), [])
  const closeDrawer = useCallback(() => setDrawerOpen(false), [])

  return (
    <CheckoutContext.Provider>
      <CartSynchronizer />
      <OrderCompletionBridge />
      <div className="min-h-screen bg-stone-50 text-stone-900">
        <Header onCartClick={openDrawer} />
        <main className="mx-auto max-w-5xl px-4 py-8">
          <Catalog />
        </main>
        <PaymentPanel />
        <CartDrawer open={drawerOpen} onClose={closeDrawer} />
      </div>
    </CheckoutContext.Provider>
  )
}

export default App