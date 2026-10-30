import { useCallback, useState } from 'react'
import { CartModal } from './components/CartModal'
import { Catalog } from './components/Catalog'
import { Header } from './components/Header'

const App = () => {
  const [modalOpen, setModalOpen] = useState(false)
  const openModal = useCallback(() => setModalOpen(true), [])
  const closeModal = useCallback(() => setModalOpen(false), [])

  return (
    <div className="min-h-screen bg-stone-50 text-stone-900">
      <Header onCartClick={openModal} />
      <main className="mx-auto max-w-5xl px-4 py-8">
        <Catalog />
      </main>
      <CartModal open={modalOpen} onClose={closeModal} />
    </div>
  )
}

export default App
