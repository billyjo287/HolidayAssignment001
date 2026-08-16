import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Icon } from '@iconify/react'
import { makeId } from '../utils/storage.js'

const EMPTY = { title: '', author: '', callNumber: '', genre: '', copies: 1 }

export default function AddBookForm({ open, onClose, onAdd }) {
  const [form, setForm] = useState(EMPTY)

  function update(field, value) {
    setForm((f) => ({ ...f, [field]: value }))
  }

  function handleSubmit(e) {
    e.preventDefault()
    if (!form.title.trim() || !form.author.trim()) return
    onAdd({
      id: makeId('bk'),
      title: form.title.trim(),
      author: form.author.trim(),
      callNumber: form.callNumber.trim() || '000.00 XXX',
      genre: form.genre.trim() || 'Uncategorized',
      copies: Number(form.copies) || 1,
      available: Number(form.copies) || 1,
    })
    setForm(EMPTY)
    onClose()
  }

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 bg-ink-950/70 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={onClose}
        >
          <motion.form
            initial={{ opacity: 0, scale: 0.95, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 10 }}
            transition={{ type: 'spring', stiffness: 300, damping: 26 }}
            onClick={(e) => e.stopPropagation()}
            onSubmit={handleSubmit}
            className="w-full max-w-md rounded-2xl bg-ink-800 border border-ink-700 p-6"
          >
            <div className="flex items-center justify-between mb-5">
              <h3 className="font-[var(--font-display)] text-xl text-parchment-100 flex items-center gap-2">
                <Icon icon="ph:book-open-text-duotone" className="text-brass-400" />
                Accession a new title
              </h3>
              <button type="button" onClick={onClose} className="text-parchment-300/60 hover:text-parchment-100">
                <Icon icon="ph:x-bold" />
              </button>
            </div>

            <div className="grid gap-3">
              <Field label="Title" value={form.title} onChange={(v) => update('title', v)} required />
              <Field label="Author" value={form.author} onChange={(v) => update('author', v)} required />
              <div className="grid grid-cols-2 gap-3">
                <Field label="Call number" value={form.callNumber} onChange={(v) => update('callNumber', v)} placeholder="510 SMI" />
                <Field label="Genre" value={form.genre} onChange={(v) => update('genre', v)} placeholder="Mathematics" />
              </div>
              <Field
                label="Copies"
                type="number"
                min={1}
                value={form.copies}
                onChange={(v) => update('copies', v)}
              />
            </div>

            <button
              type="submit"
              className="mt-6 w-full py-2.5 rounded-lg bg-brass-500 text-ink-950 font-medium hover:bg-brass-400 transition-colors"
            >
              Add to catalog
            </button>
          </motion.form>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

function Field({ label, value, onChange, type = 'text', required, ...rest }) {
  return (
    <label className="block">
      <span className="text-xs text-parchment-300/60 mb-1 block">{label}</span>
      <input
        type={type}
        value={value}
        required={required}
        onChange={(e) => onChange(e.target.value)}
        className="w-full px-3 py-2 rounded-lg bg-ink-900 border border-ink-700 text-parchment-100 focus:outline-none focus:ring-2 focus:ring-brass-500/50"
        {...rest}
      />
    </label>
  )
}