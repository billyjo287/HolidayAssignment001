import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import Navbar from './components/Navbar.jsx'
import Hero3D from './components/Hero3D.jsx'
import Catalog from './components/Catalog.jsx'
import AddBookForm from './components/AddBookForm.jsx'
import Members from './components/Members.jsx'
import CheckoutModal from './components/CheckoutModal.jsx'
import Dashboard from './components/Dashboard.jsx'
import Footer from './components/Footer.jsx'
import { SAMPLE_BOOKS, SAMPLE_MEMBERS } from './data/sampleBooks.js'
import { loadBooks, saveBooks, loadMembers, saveMembers } from './utils/storage.js'

const pageTransition = {
  initial: { opacity: 0, y: 8 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -8 },
  transition: { duration: 0.25, ease: 'easeOut' },
}

function App() {
  const [view, setView] = useState('home')
  const [books, setBooks] = useState(() => loadBooks(SAMPLE_BOOKS))
  const [members, setMembers] = useState(() => loadMembers(SAMPLE_MEMBERS))
  const [addOpen, setAddOpen] = useState(false)
  const [checkoutBook, setCheckoutBook] = useState(null)

  useEffect(() => {
    saveBooks(books)
  }, [books])

  useEffect(() => {
    saveMembers(members)
  }, [members])

  function confirmCheckout(book, memberId) {
    setBooks((prev) =>
      prev.map((b) =>
        b.id === book.id && b.available > 0 ? { ...b, available: b.available - 1 } : b
      )
    )
    setMembers((prev) =>
      prev.map((m) => (m.id === memberId ? { ...m, booksOut: m.booksOut + 1 } : m))
    )
  }

  function handleReturn(book) {
    setBooks((prev) =>
      prev.map((b) =>
        b.id === book.id && b.available < b.copies ? { ...b, available: b.available + 1 } : b
      )
    )
    setMembers((prev) =>
      prev.map((m) => (m.booksOut > 0 ? { ...m, booksOut: m.booksOut - 1 } : m))
    )
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar view={view} onNavigate={setView} />

      <AnimatePresence mode="wait">
        {view === 'home' && (
          <motion.main key="home" {...pageTransition} className="flex-1 px-6 md:px-10">
            <div className="max-w-6xl mx-auto py-12 md:py-20 grid md:grid-cols-2 gap-10 items-center">
              <div className="text-center md:text-left">
                <p className="call-number text-brass-400 text-sm uppercase tracking-widest mb-4">
                  Stackline · Circulation Desk
                </p>
                <h1 className="font-[var(--font-display)] text-4xl sm:text-5xl md:text-6xl text-parchment-100 leading-[1.05]">
                  The console for a well-kept library.
                </h1>
                <p className="mt-5 text-parchment-300/80 max-w-md mx-auto md:mx-0">
                  Catalog the stacks, track who has what, and see circulation
                  at a glance — drag the shelf to look around.
                </p>
                <button
                  onClick={() => setView('catalog')}
                  className="mt-7 px-5 py-2.5 rounded-full bg-brass-500 text-ink-950 text-sm font-medium hover:bg-brass-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brass-400 transition-colors"
                >
                  Browse the catalog
                </button>
              </div>
              <Hero3D />
            </div>
          </motion.main>
        )}

        {view === 'catalog' && (
          <motion.main key="catalog" {...pageTransition} className="flex-1">
            <Catalog books={books} onCheckout={setCheckoutBook} onAddClick={() => setAddOpen(true)} />
          </motion.main>
        )}

        {view === 'members' && (
          <motion.main key="members" {...pageTransition} className="flex-1">
            <Members members={members} onAddMember={(m) => setMembers((prev) => [...prev, m])} />
          </motion.main>
        )}

        {view === 'dashboard' && (
          <motion.main key="dashboard" {...pageTransition} className="flex-1">
            <Dashboard books={books} members={members} onReturn={handleReturn} />
          </motion.main>
        )}
      </AnimatePresence>

      <Footer />

      <AddBookForm
        open={addOpen}
        onClose={() => setAddOpen(false)}
        onAdd={(book) => setBooks((prev) => [book, ...prev])}
      />

      <CheckoutModal
        book={checkoutBook}
        members={members}
        onClose={() => setCheckoutBook(null)}
        onConfirm={confirmCheckout}
      />
    </div>
  )
}

export default App