import { useMemo, useState } from 'react'
import { AnimatePresence } from 'framer-motion'
import { Icon } from '@iconify/react'
import BookCard from './BookCard.jsx'

export default function Catalog({ books, onCheckout, onAddClick }) {
  const [query, setQuery] = useState('')
  const [genre, setGenre] = useState('all')

  const genres = useMemo(
    () => ['all', ...new Set(books.map((b) => b.genre))],
    [books]
  )

  const filtered = useMemo(() => {
    return books.filter((b) => {
      const matchesGenre = genre === 'all' || b.genre === genre
      const q = query.trim().toLowerCase()
      const matchesQuery =
        !q ||
        b.title.toLowerCase().includes(q) ||
        b.author.toLowerCase().includes(q) ||
        b.callNumber.toLowerCase().includes(q)
      return matchesGenre && matchesQuery
    })
  }, [books, query, genre])

  return (
    <section className="max-w-6xl mx-auto px-6 md:px-10 py-12">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
        <div>
          <p className="call-number text-brass-400 text-xs uppercase tracking-widest mb-2">
            The Stacks
          </p>
          <h2 className="font-[var(--font-display)] text-3xl text-parchment-100">Catalog</h2>
        </div>
        <button
          onClick={onAddClick}
          className="flex items-center gap-2 px-4 py-2 rounded-full bg-brass-500 text-ink-950 text-sm font-medium hover:bg-brass-400 transition-colors self-start"
        >
          <Icon icon="ph:plus-bold" />
          Add a book
        </button>
      </div>

      <div className="flex flex-col sm:flex-row gap-3 mb-8">
        <div className="relative flex-1">
          <Icon icon="ph:magnifying-glass" className="absolute left-3.5 top-1/2 -translate-y-1/2 text-parchment-300/50" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search title, author, or call number…"
            className="w-full pl-10 pr-4 py-2.5 rounded-lg bg-ink-800 border border-ink-700 text-parchment-100 placeholder:text-parchment-300/40 focus:outline-none focus:ring-2 focus:ring-brass-500/50"
          />
        </div>
        <select
          value={genre}
          onChange={(e) => setGenre(e.target.value)}
          className="px-4 py-2.5 rounded-lg bg-ink-800 border border-ink-700 text-parchment-200 focus:outline-none focus:ring-2 focus:ring-brass-500/50"
        >
          {genres.map((g) => (
            <option key={g} value={g}>
              {g === 'all' ? 'All genres' : g}
            </option>
          ))}
        </select>
      </div>

      {filtered.length === 0 ? (
        <div className="text-center py-20 text-parchment-300/60">
          <Icon icon="ph:magnifying-glass-minus" className="text-4xl mx-auto mb-3" />
          <p>Nothing on the shelf matches that search.</p>
        </div>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          <AnimatePresence>
            {filtered.map((book) => (
              <BookCard key={book.id} book={book} onCheckout={onCheckout} />
            ))}
          </AnimatePresence>
        </div>
      )}
    </section>
  )
}