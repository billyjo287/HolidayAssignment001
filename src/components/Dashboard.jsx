import { useMemo } from 'react'
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts'
import { Icon } from '@iconify/react'
import { motion } from 'framer-motion'

function StatCard({ icon, label, value, tone = 'brass', delay = 0 }) {
  const toneClass = {
    brass: 'text-brass-400',
    sage: 'text-sage-400',
    burgundy: 'text-burgundy-400',
  }[tone]

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay }}
      className="rounded-xl border border-ink-700 bg-ink-800/60 p-5"
    >
      <Icon icon={icon} className={`text-2xl ${toneClass} mb-3`} />
      <p className="text-3xl font-[var(--font-display)] text-parchment-100">{value}</p>
      <p className="text-sm text-parchment-300/60 mt-1">{label}</p>
    </motion.div>
  )
}

export default function Dashboard({ books, members, overdueOnly, onToggleOverdue }) {
  const stats = useMemo(() => {
    const totalCopies = books.reduce((sum, b) => sum + b.copies, 0)
    const onLoan = books.reduce((sum, b) => sum + (b.copies - b.available), 0)
    const overdueRisk = books.filter((b) => b.available === 0).length
    return { totalTitles: books.length, totalCopies, onLoan, overdueRisk, members: members.length }
  }, [books, members])

  const visibleBooks = overdueOnly ? books.filter((b) => b.available === 0) : books

  const chartData = useMemo(
    () =>
      visibleBooks
        .map((b) => ({ name: b.title.length > 14 ? b.title.slice(0, 14) + '…' : b.title, onLoan: b.copies - b.available }))
        .filter((d) => d.onLoan > 0),
    [visibleBooks]
  )

  return (
    <section className="max-w-6xl mx-auto px-6 md:px-10 py-12">
      <p className="call-number text-brass-400 text-xs uppercase tracking-widest mb-2">
        At a glance
      </p>
      <div className="flex items-center justify-between mb-8">
        <h2 className="font-[var(--font-display)] text-3xl text-parchment-100">Circulation</h2>
        <button
          onClick={onToggleOverdue}
          className={`text-xs px-3 py-1.5 rounded-full border transition-colors ${
            overdueOnly
              ? 'bg-burgundy-500/20 border-burgundy-400/50 text-burgundy-400'
              : 'border-ink-700 text-parchment-300/60 hover:text-parchment-100'
          }`}
        >
          {overdueOnly ? 'Showing: fully checked-out titles' : 'Show fully checked-out titles only'}
        </button>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
        <StatCard icon="ph:books-duotone" label="Titles in the catalog" value={stats.totalTitles} delay={0} />
        <StatCard icon="ph:stack-duotone" label="Copies on the shelf" value={stats.totalCopies} tone="sage" delay={0.05} />
        <StatCard icon="ph:hand-withdraw-duotone" label="Copies on loan" value={stats.onLoan} delay={0.1} />
        <StatCard icon="ph:identification-card-duotone" label="Enrolled members" value={stats.members} tone="sage" delay={0.15} />
      </div>

      <div className="rounded-xl border border-ink-700 bg-ink-800/60 p-5">
        <h3 className="text-sm text-parchment-300/70 mb-4">Copies currently on loan, by title</h3>
        {chartData.length === 0 ? (
          <p className="text-parchment-300/50 text-sm py-10 text-center">
            Nothing is checked out right now.
          </p>
        ) : (
          <ResponsiveContainer width="100%" height={280}>
            <BarChart data={chartData} margin={{ top: 4, right: 8, left: -20, bottom: 4 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#242838" vertical={false} />
              <XAxis dataKey="name" stroke="#e6d9bd66" fontSize={12} tickLine={false} axisLine={{ stroke: '#242838' }} />
              <YAxis allowDecimals={false} stroke="#e6d9bd66" fontSize={12} tickLine={false} axisLine={false} />
              <Tooltip
                contentStyle={{ background: '#1a1d29', border: '1px solid #242838', borderRadius: 8, color: '#f1e9d8' }}
                cursor={{ fill: '#b08d5714' }}
              />
              <Bar dataKey="onLoan" fill="#b08d57" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        )}
      </div>
    </section>
  )
}