import { Catalog } from './components/Catalog'
import { Header } from './components/Header'

const App = () => {
  return (
    <div className="min-h-screen bg-stone-50 text-stone-900">
      <Header />
      <main className="mx-auto max-w-5xl px-4 py-8">
        <Catalog />
      </main>
    </div>
  )
}

export default App
