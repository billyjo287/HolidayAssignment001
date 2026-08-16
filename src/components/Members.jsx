import { useState } from 'react'
import { motion } from 'framer-motion'
import { Icon } from '@iconify/react'
import { makeId } from '../utils/storage.js'

export default function Members({ members, onAddMember }) {
  const [name, setName] = useState('')

  function handleSubmit(e) {
    e.preventDefault()
    if (!name.trim()) return
    onAddMember({
      id: makeId('mem'),
      name: name.trim(),
      memberSince: new Date().toISOString().slice(0, 10),
      booksOut: 0,
    })
    setName('')
  }

  return (
    <section className="max-w-6xl mx-auto px-6 md:px-10 py-12">
      <p className="call-number text-brass-400 text-xs uppercase tracking-widest mb-2">
        Ledger
      </p>
      <h2 className="font-[var(--font-display)] text-3xl text-parchment-100 mb-8">Members</h2>

      <form onSubmit={handleSubmit} className="flex gap-3 mb-8 max-w-sm">
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="New member's name"
          className="flex-1 px-3 py-2 rounded-lg bg-ink-800 border border-ink-700 text-parchment-100 placeholder:text-parchment-300/40 focus:outline-none focus:ring-2 focus:ring-brass-500/50"
        />
        <button
          type="submit"
          className="px-4 py-2 rounded-lg bg-brass-500 text-ink-950 text-sm font-medium hover:bg-brass-400 transition-colors"
        >
          Enroll
        </button>
      </form>

      <div className="rounded-xl border border-ink-700 overflow-hidden">
        <table className="w-full text-left text-sm">
          <thead className="bg-ink-800 text-parchment-300/60">
            <tr>
              <th className="py-3 px-4 font-normal">Name</th>
              <th className="py-3 px-4 font-normal">Member since</th>
              <th className="py-3 px-4 font-normal">Books out</th>
            </tr>
          </thead>
          <tbody>
            {members.map((m, i) => (
              <motion.tr
                key={m.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: i * 0.03 }}
                className="border-t border-ink-700 hover:bg-ink-800/50"
              >
                <td className="py-3 px-4 text-parchment-100 flex items-center gap-2">
                  <Icon icon="ph:user-circle-duotone" className="text-brass-400/80 text-lg" />
                  {m.name}
                </td>
                <td className="py-3 px-4 call-number text-parchment-300/70">{m.memberSince}</td>
                <td className="py-3 px-4">
                  <span className={m.booksOut > 0 ? 'text-brass-400' : 'text-parchment-300/50'}>
                    {m.booksOut}
                  </span>
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  )
}