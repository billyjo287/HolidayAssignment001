import { useEffect, useState } from 'react'
import Navbar from './components/Navbar.jsx'
import Hero3D from './components/Hero3D.jsx'
import Catalog from './components/Catalog.jsx'
import AddBookForm from './components/AddBookForm.jsx'
import { SAMPLE_BOOKS } from './data/sampleBooks.js'
import { loadBooks, saveBooks } from './utils/storage.js'

function App() {
  const [view, setView] = useState('home')
  const [books, setBooks] = useState(() => loadBooks(SAMPLE_BOOKS))
  const [addOpen, setAddOpen] = useState(false)

  useEffect(() => {
    saveBooks(books)
  }, [books])

  function handleCheckout(book) {
    setBooks((prev) =>
      prev.map((b) =>
        b.id === book.id && b.available > 0 ? { ...b, available: b.available - 1 } : b
      )
    )
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar view={view} onNavigate={setView} />

      {view === 'home' && (
        <main className="flex-1 px-6 md:px-10">
          <div className="max-w-6xl mx-auto py-16 md:py-20 grid md:grid-cols-2 gap-10 items-center">
            <div className="text-center md:text-left">
              <p className="call-number text-brass-400 text-sm uppercase tracking-widest mb-4">
                Stackline · Circulation Desk
              </p>
              <h1 className="font-[var(--font-display)] text-5xl md:text-6xl text-parchment-100 leading-[1.05]">
                The console for a well-kept library.
              </h1>
              <p className="mt-5 text-parchment-300/80 max-w-md mx-auto md:mx-0">
                Catalog the stacks, track who has what, and see circulation
                at a glance — drag the shelf to look around.
              </p>
              <button
                onClick={() => setView('catalog')}
                className="mt-7 px-5 py-2.5 rounded-full bg-brass-500 text-ink-950 text-sm font-medium hover:bg-brass-400 transition-colors"
              >
                Browse the catalog
              </button>
            </div>
            <Hero3D />
          </div>
        </main>
      )}

      {view === 'catalog' && (
        <main className="flex-1">
          <Catalog books={books} onCheckout={handleCheckout} onAddClick={() => setAddOpen(true)} />
        </main>
      )}

      <AddBookForm
        open={addOpen}
        onClose={() => setAddOpen(false)}
        onAdd={(book) => setBooks((prev) => [book, ...prev])}
      />
    </div>
  )
}

export default App