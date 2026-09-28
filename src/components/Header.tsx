import { useState, useEffect, useRef, useCallback } from 'react'
import { Menu, X, Sun, Moon } from 'lucide-react'
import CuteAnimalEyes from './CuteAnimalEyes'
import { useActiveSection } from '../hooks/useActiveSection'

const NAV_ITEMS = [
  { name: 'About', href: 'about' },
  { name: 'Skills', href: 'skills' },
  { name: 'Projects', href: 'projects' },
  { name: 'Contact', href: 'contact' },
]

const SECTION_IDS = NAV_ITEMS.map((item) => item.href)

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isDarkMode, setIsDarkMode] = useState(false)
  const menuRef = useRef<HTMLDivElement>(null)
  const menuButtonRef = useRef<HTMLButtonElement>(null)
  const activeSection = useActiveSection(SECTION_IDS)

  const handleMenuKeyDown = useCallback((e: KeyboardEvent) => {
    if (!isMenuOpen || !menuRef.current) return
    if (e.key === 'Escape') {
      setIsMenuOpen(false)
      menuButtonRef.current?.focus()
      return
    }
    if (e.key !== 'Tab') return

    const focusableElements = menuRef.current.querySelectorAll<HTMLElement>(
      'button, a[href], [tabindex]:not([tabindex="-1"])'
    )
    const first = focusableElements[0]
    const last = focusableElements[focusableElements.length - 1]

    if (e.shiftKey && document.activeElement === first) {
      e.preventDefault()
      last.focus()
    } else if (!e.shiftKey && document.activeElement === last) {
      e.preventDefault()
      first.focus()
    }
  }, [isMenuOpen])

  useEffect(() => {
    if (isMenuOpen) {
      document.addEventListener('keydown', handleMenuKeyDown)
    }
    return () => document.removeEventListener('keydown', handleMenuKeyDown)
  }, [isMenuOpen, handleMenuKeyDown])

  useEffect(() => {
    // Check if user has explicitly set a preference
    const userPreference = localStorage.getItem('darkMode')
    
    if (userPreference === null) {
      // No preference set, default to dark mode
      setIsDarkMode(true)
      localStorage.setItem('darkMode', 'true')
      document.documentElement.classList.add('dark')
    } else {
      // Use user's saved preference
      const isDark = userPreference === 'true'
      setIsDarkMode(isDark)
      if (isDark) {
        document.documentElement.classList.add('dark')
      }
    }
  }, [])

  const toggleDarkMode = () => {
    const newDarkMode = !isDarkMode
    setIsDarkMode(newDarkMode)
    localStorage.setItem('darkMode', newDarkMode.toString())
    if (newDarkMode) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
      element.scrollIntoView({ behavior: prefersReducedMotion ? 'auto' : 'smooth' })
    }
    setIsMenuOpen(false)
  }

  const navItems = NAV_ITEMS

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border-b border-gray-200 dark:border-gray-700">
      <div className="container-hero section-padding">
        <div className="flex items-center justify-between h-16">
          {/* Logo with Cute Animal Eyes */}
          <div className="flex-shrink-0">
            <button
              onClick={() => scrollToSection('hero')}
              className="group hover:scale-110 transition-all duration-200 p-2"
            >
              <CuteAnimalEyes size={60} />
            </button>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            {navItems.map((item) => {
              const isActive = activeSection === item.href
              return (
                <button
                  key={item.name}
                  onClick={() => scrollToSection(item.href)}
                  aria-current={isActive ? 'true' : undefined}
                  className={`relative font-medium transition-colors after:absolute after:-bottom-1 after:left-0 after:h-0.5 after:rounded-full after:bg-blue-600 after:transition-all after:duration-200 dark:after:bg-blue-400 ${
                    isActive
                      ? 'text-blue-600 dark:text-blue-400 after:w-full'
                      : 'text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 after:w-0 hover:after:w-full'
                  }`}
                >
                  {item.name}
                </button>
              )
            })}
          </nav>

          {/* Dark Mode Toggle & Mobile Menu */}
          <div className="flex items-center space-x-4">
            <button
              onClick={toggleDarkMode}
              aria-label={isDarkMode ? 'Switch to light mode' : 'Switch to dark mode'}
              className="flex items-center justify-center p-2 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
            >
              {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
            </button>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <button
                ref={menuButtonRef}
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                aria-expanded={isMenuOpen}
                aria-controls="mobile-menu"
                aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
                className="p-2 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
              >
                {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden" ref={menuRef} id="mobile-menu" role="navigation" aria-label="Mobile navigation">
            <div className="px-2 pt-2 pb-3 space-y-1 bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700">
              {navItems.map((item) => {
                const isActive = activeSection === item.href
                return (
                  <button
                    key={item.name}
                    onClick={() => scrollToSection(item.href)}
                    aria-current={isActive ? 'true' : undefined}
                    className={`block w-full px-3 py-2 text-left font-medium transition-colors border-l-2 ${
                      isActive
                        ? 'border-blue-600 dark:border-blue-400 text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-500/10'
                        : 'border-transparent text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400'
                    }`}
                  >
                    {item.name}
                  </button>
                )
              })}
            </div>
          </div>
        )}
      </div>
    </header>
  )
}

export default Header 