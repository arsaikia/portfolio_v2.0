import './App.css'
import { useEffect, useRef } from 'react'
import Header from './components/Header'
import Hero from './components/Hero'
import About from './components/About'
import Skills from './components/Skills'
import Projects from './components/Projects'
import Contact from './components/Contact'
import Footer from './components/Footer'

function App() {
  const appRef = useRef<HTMLDivElement>(null)
  const rafRef = useRef<number | null>(null)

  useEffect(() => {
    let mouseX = 0
    let mouseY = 0

    const handleMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX
      mouseY = e.clientY
    }

    const updateGlowPosition = () => {
      if (appRef.current) {
        appRef.current.style.setProperty('--glow-x', `${mouseX}px`)
        appRef.current.style.setProperty('--glow-y', `${mouseY}px`)
      }
      rafRef.current = requestAnimationFrame(updateGlowPosition)
    }

    // Add event listener to the window for global tracking
    window.addEventListener('mousemove', handleMouseMove)
    
    // Start the animation loop
    updateGlowPosition()
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current)
      }
    }
  }, [])

  return (
    <div 
      ref={appRef}
      className="min-h-screen app-glow"
      style={{
        '--glow-x': '50%',
        '--glow-y': '50%'
      } as React.CSSProperties}
    >
      {/* Global Cursor Glow Effect */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute w-[25rem] h-[25rem] rounded-full glow-effect"></div>
      </div>
      
      <div className="relative z-10">
        <Header />
        <main>
          <Hero />
          <About />
          <Skills />
          <Projects />
          <Contact />
        </main>
        <Footer />
      </div>
    </div>
  )
}

export default App
