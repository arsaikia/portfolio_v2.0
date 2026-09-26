import { useEffect, useRef, lazy, Suspense } from 'react'
import Header from './components/Header'
import Hero from './components/Hero'
import About from './components/About'
import SEOHead from './components/SEOHead'
import MobileOptimizations from './components/MobileOptimizations'

const Skills = lazy(() => import('./components/Skills'))
const Projects = lazy(() => import('./components/Projects'))
const Contact = lazy(() => import('./components/Contact'))
const Footer = lazy(() => import('./components/Footer'))

function App() {
  const appRef = useRef<HTMLDivElement>(null)
  const rafRef = useRef<number | null>(null)

  useEffect(() => {
    let idleTimer: ReturnType<typeof setTimeout>

    const handleMouseMove = (e: MouseEvent) => {
      if (appRef.current) {
        appRef.current.style.setProperty('--glow-x', `${e.clientX}px`)
        appRef.current.style.setProperty('--glow-y', `${e.clientY}px`)
      }

      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current)
      }

      clearTimeout(idleTimer)
      idleTimer = setTimeout(() => {
        rafRef.current = null
      }, 100)
    }

    window.addEventListener('mousemove', handleMouseMove)

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      clearTimeout(idleTimer)
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
      <SEOHead />
      <MobileOptimizations />
      {/* Global Cursor Glow Effect */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute w-[25rem] h-[25rem] rounded-full glow-effect"></div>
      </div>
      
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:px-4 focus:py-2 focus:bg-blue-600 focus:text-white focus:rounded-lg focus:outline-none"
      >
        Skip to main content
      </a>

      <div className="relative z-10">
        <Header />
        <main id="main-content">
          <Hero />
          <About />
          <Suspense fallback={<div className="py-20" />}>
            <Skills />
          </Suspense>
          <Suspense fallback={<div className="py-20" />}>
            <div data-projects-grid>
              <Projects />
            </div>
          </Suspense>
          <Suspense fallback={<div className="py-20" />}>
            <Contact />
          </Suspense>
        </main>
        <Suspense fallback={null}>
          <Footer />
        </Suspense>
      </div>
    </div>
  )
}

export default App
