import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Icon } from '@iconify/react'

export default function CheckoutModal({ book, members, onClose, onConfirm }) {
  const [memberId, setMemberId] = useState('')

  function handleConfirm() {
    if (!memberId) return
    onConfirm(book, memberId)
    setMemberId('')
    onClose()
  }

  return (
    <AnimatePresence>
      {book && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 bg-ink-950/70 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={onClose}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 10 }}
            transition={{ type: 'spring', stiffness: 300, damping: 26 }}
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-sm rounded-2xl bg-ink-800 border border-ink-700 p-6"
          >
            <div className="flex items-center gap-2 mb-1">
              <Icon icon="ph:hand-withdraw-duotone" className="text-brass-400 text-xl" />
              <h3 className="font-[var(--font-display)] text-xl text-parchment-100">Check out</h3>
            </div>
            <p className="text-sm text-parchment-300/70 mb-5">{book?.title}</p>

            <label className="block mb-5">
              <span className="text-xs text-parchment-300/60 mb-1 block">Borrower</span>
              <select
                value={memberId}
                onChange={(e) => setMemberId(e.target.value)}
                className="w-full px-3 py-2 rounded-lg bg-ink-900 border border-ink-700 text-parchment-100 focus:outline-none focus:ring-2 focus:ring-brass-500/50"
              >
                <option value="">Select a member…</option>
                {members.map((m) => (
                  <option key={m.id} value={m.id}>
                    {m.name}
                  </option>
                ))}
              </select>
            </label>

            <div className="flex gap-3">
              <button
                onClick={onClose}
                className="flex-1 py-2 rounded-lg border border-ink-700 text-parchment-300/80 hover:bg-ink-700 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirm}
                disabled={!memberId}
                className="flex-1 py-2 rounded-lg bg-brass-500 text-ink-950 font-medium hover:bg-brass-400 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
              >
                Confirm
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}