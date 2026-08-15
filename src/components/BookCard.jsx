import { motion } from 'framer-motion'
import { Icon } from '@iconify/react'

export default function BookCard({ book, onCheckout }) {
  const isAvailable = book.available > 0

  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      whileHover={{ y: -4, rotate: -0.4 }}
      transition={{ type: 'spring', stiffness: 260, damping: 22 }}
      className="rounded-xl border border-ink-700 bg-ink-800/60 p-5 flex flex-col gap-3 hover:border-brass-500/60 hover:shadow-[0_10px_30px_-12px_rgba(176,141,87,0.35)] transition-shadow"
    >
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="call-number text-xs text-brass-400/90">{book.callNumber}</p>
          <h3 className="font-[var(--font-display)] text-lg text-parchment-100 leading-snug mt-1">
            {book.title}
          </h3>
          <p className="text-sm text-parchment-300/70 mt-0.5">{book.author}</p>
        </div>
        <Icon icon="ph:books-duotone" className="text-2xl text-parchment-300/40 shrink-0" />
      </div>

      <div className="flex items-center justify-between mt-1">
        <span className="text-xs px-2.5 py-1 rounded-full bg-ink-700 text-parchment-300/80">
          {book.genre}
        </span>
        <span
          className={`text-xs flex items-center gap-1 ${
            isAvailable ? 'text-sage-400' : 'text-burgundy-400'
          }`}
        >
          <Icon icon={isAvailable ? 'ph:check-circle-duotone' : 'ph:x-circle-duotone'} />
          {isAvailable ? `${book.available} of ${book.copies} on shelf` : 'All copies checked out'}
        </span>
      </div>

      <button
        onClick={() => onCheckout(book)}
        disabled={!isAvailable}
        className="mt-2 w-full py-2 rounded-lg text-sm font-medium transition-colors
          disabled:opacity-40 disabled:cursor-not-allowed
          bg-brass-500/15 text-brass-400 hover:bg-brass-500/25
          disabled:hover:bg-brass-500/15"
      >
        {isAvailable ? 'Check out' : 'Join waitlist'}
      </button>
    </motion.article>
  )
}