import { Icon } from '@iconify/react'

const NAV_ITEMS = [
  { id: 'home', label: 'Reading Room', icon: 'ph:door-open-duotone' },
  { id: 'catalog', label: 'Catalog', icon: 'ph:books-duotone' },
  { id: 'members', label: 'Members', icon: 'ph:identification-card-duotone' },
  { id: 'dashboard', label: 'Circulation', icon: 'ph:chart-line-up-duotone' },
]

export default function Navbar({ view, onNavigate }) {
  return (
    <header className="sticky top-0 z-40 backdrop-blur bg-ink-900/80 border-b border-ink-700">
      <div className="max-w-6xl mx-auto px-6 md:px-10 h-16 flex items-center justify-between">
        <button
          onClick={() => onNavigate('home')}
          className="flex items-center gap-2 group"
        >
          <Icon icon="ph:bookmark-simple-duotone" className="text-brass-400 text-2xl group-hover:rotate-[-8deg] transition-transform" />
          <span className="font-[var(--font-display)] text-xl text-parchment-100 tracking-tight">
            Stackline
          </span>
        </button>

        <nav className="hidden md:flex items-center gap-1">
          {NAV_ITEMS.map((item) => (
            <button
              key={item.id}
              onClick={() => onNavigate(item.id)}
              className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm transition-colors ${
                view === item.id
                  ? 'bg-brass-500/15 text-brass-400'
                  : 'text-parchment-300/70 hover:text-parchment-100 hover:bg-ink-800'
              }`}
            >
              <Icon icon={item.icon} className="text-lg" />
              {item.label}
            </button>
          ))}
        </nav>

        <div className="md:hidden flex items-center gap-3">
          {NAV_ITEMS.map((item) => (
            <button
              key={item.id}
              onClick={() => onNavigate(item.id)}
              aria-label={item.label}
              className={`p-2 rounded-full ${view === item.id ? 'text-brass-400 bg-brass-500/15' : 'text-parchment-300/70'}`}
            >
              <Icon icon={item.icon} className="text-xl" />
            </button>
          ))}
        </div>
      </div>
    </header>
  )
}