import { useState } from 'react'
import Navbar from './components/Navbar.jsx'

function App() {
  const [view, setView] = useState('home')

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar view={view} onNavigate={setView} />
      <main className="flex-1 px-6 md:px-10">
        <div className="max-w-6xl mx-auto py-24 text-center">
          <p className="call-number text-brass-400 text-sm uppercase tracking-widest mb-4">
            Stackline · Circulation Desk
          </p>
          <h1 className="font-[var(--font-display)] text-5xl md:text-6xl text-parchment-100">
            The console for a well-kept library.
          </h1>
        </div>
      </main>
    </div>
  )
}

export default App