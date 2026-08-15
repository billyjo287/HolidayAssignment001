import { useState } from 'react'
import Navbar from './components/Navbar.jsx'
import Hero3D from './components/Hero3D.jsx'

function App() {
  const [view, setView] = useState('home')

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar view={view} onNavigate={setView} />
      <main className="flex-1 px-6 md:px-10">
        <div className="max-w-6xl mx-auto py-16 md:py-20 grid md:grid-cols-2 gap-10 items-center">
          <div className="text-center md:text-left">
            <p className="call-number text-brass-400 text-sm uppercase tracking-widest mb-4">
              Stackline · Circulation Desk
            </p>
            <h1 className="font-[var(--font-display)] text-5xl md:text-6xl text-parchment-100 leading-[1.05]">
              The console for a well-kept library.
            </h1>
            <p className="mt-5 text-parchment-300/80 max-w-md mx-auto md:mx-0">
              Catalog the stacks, track who has what, and see circulation
              at a glance — drag the shelf to look around.
            </p>
          </div>
          <Hero3D />
        </div>
      </main>
    </div>
  )
}

export default App