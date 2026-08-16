import { Icon } from '@iconify/react'

export default function Footer() {
  return (
    <footer className="border-t border-ink-700 mt-auto">
      <div className="max-w-6xl mx-auto px-6 md:px-10 py-6 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-parchment-300/50">
        <span className="flex items-center gap-1.5">
          <Icon icon="ph:bookmark-simple-duotone" className="text-brass-500/70" />
          Stackline — a quiet console for the stacks.
        </span>
        <span className="call-number">Stored locally in this browser</span>
      </div>
    </footer>
  )
}