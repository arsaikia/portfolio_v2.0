import { ArrowDown, Download, Mail, Github, ExternalLink } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import InteractiveCodeDemo from './InteractiveCodeDemo'

const Hero = () => {
  const heroRef = useRef<HTMLElement>(null)
  const nameRef = useRef<HTMLHeadingElement>(null)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [scrollY, setScrollY] = useState(0)
  const [isLoaded, setIsLoaded] = useState(false)
  const [isTouchDevice, setIsTouchDevice] = useState(false)

  useEffect(() => {
    // Check if device supports touch
    setIsTouchDevice('ontouchstart' in window || navigator.maxTouchPoints > 0)
    
    // Trigger animations on load
    const timer = setTimeout(() => setIsLoaded(true), 100)
    
    // Mouse tracking for cursor-aware elements (only on non-touch devices)
    const handleMouseMove = (e: MouseEvent) => {
      if (heroRef.current && !isTouchDevice) {
        const rect = heroRef.current.getBoundingClientRect()
        setMousePosition({
          x: (e.clientX - rect.left - rect.width / 2) / rect.width,
          y: (e.clientY - rect.top - rect.height / 2) / rect.height
        })
      }
    }

    // Scroll tracking for parallax effects (throttled for performance)
    const handleScroll = () => {
      requestAnimationFrame(() => {
        setScrollY(window.scrollY)
      })
    }

    if (!isTouchDevice) {
      window.addEventListener('mousemove', handleMouseMove)
    }
    window.addEventListener('scroll', handleScroll)
    
    return () => {
      clearTimeout(timer)
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('scroll', handleScroll)
    }
  }, [isTouchDevice])

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  // Calculate scroll effects  
  const heroOpacity = Math.max(1 - scrollY / 800, 0.4) // Gentle fade

  return (
    <section 
      id="hero" 
      ref={heroRef}
      className="relative min-h-screen flex items-center overflow-hidden"
    >
      {/* Animated Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-gray-900 dark:via-blue-900/20 dark:to-purple-900/20">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/5 via-purple-600/5 to-pink-600/5 animate-gradient-shift"></div>
      </div>

      <div 
        className="w-full py-8 sm:py-12 lg:py-16 relative z-10 transition-all duration-1000 ease-out"
        style={{
          opacity: heroOpacity,
        }}
      >
        {/* Main Content - Responsive Layout */}
        <div className="container-max section-padding">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center mb-8 md:mb-12">
            {/* Left Column - Hero Intro */}
            <div className="text-center lg:text-left">
              <div className="space-y-4 sm:space-y-6 mb-6 sm:mb-8">
                <h1 
                  ref={nameRef}
                  className={`text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-tight tracking-tight transition-all duration-1000 ease-out ${
                    isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                  }`}
                >
                  <span className="bg-gradient-to-r from-slate-900 via-blue-700 to-indigo-800 dark:from-white dark:via-blue-200 dark:to-indigo-300 bg-clip-text text-transparent animate-gradient-text hero-name-glow">
                    Arunabh Saikia
                  </span>
                </h1>
                
                <h2 
                  className={`text-lg sm:text-xl md:text-2xl lg:text-3xl font-medium transition-all duration-1000 ease-out delay-300 ${
                    isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                  }`}
                >
                  <span className="bg-gradient-to-r from-gray-600 via-blue-600 to-purple-600 dark:from-gray-300 dark:via-blue-300 dark:to-purple-300 bg-clip-text text-transparent">
                    Senior Software Engineer @Adobe
                  </span>
                </h2>

                <p 
                  className={`text-base sm:text-lg md:text-xl text-gray-600 dark:text-gray-300 leading-relaxed transition-all duration-1000 ease-out delay-500 max-w-lg mx-auto lg:mx-0 ${
                    isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                  }`}
                >
                  I build pixel perfect, accessible, and scalable digital experiences.
                </p>
              </div>

              {/* CTA Buttons */}
              <div className={`flex flex-col xs:flex-row gap-3 sm:gap-4 justify-center lg:justify-start items-stretch xs:items-center mb-6 sm:mb-8 transition-all duration-1000 ease-out delay-700 ${
                isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}>
                <button
                  onClick={() => scrollToSection('projects')}
                  className={`group relative flex items-center justify-center gap-2 border border-gray-400/50 dark:border-gray-500/50 text-gray-800 dark:text-gray-200 bg-white/50 dark:bg-gray-800/50 backdrop-blur-md px-6 sm:px-8 py-3 sm:py-3.5 rounded-2xl font-medium hover:border-gray-500/70 dark:hover:border-gray-400/70 hover:bg-white/70 dark:hover:bg-gray-800/70 transition-all duration-300 shadow-sm hover:shadow-md ${!isTouchDevice ? 'cursor-aware-button' : ''} text-sm sm:text-base`}
                  style={!isTouchDevice ? {
                    transform: `perspective(1000px) rotateX(${mousePosition.y * 5}deg) rotateY(${mousePosition.x * 5}deg) translateZ(0)`,
                  } : {}}
                >
                  <span>View My Work</span>
                  <ExternalLink size={16} className="group-hover:translate-x-0.5 transition-transform duration-200" />
                </button>
                
                <a
                  href="/Arunabh_Saikia_SC_Resumev6.1.pdf"
                  download="Arunabh_Saikia_Resume.pdf"
                  className={`group flex items-center justify-center gap-2 border border-gray-300/60 dark:border-gray-600/60 text-gray-700 dark:text-gray-300 bg-white/40 dark:bg-gray-800/40 backdrop-blur-md px-6 sm:px-8 py-3 sm:py-3.5 rounded-2xl font-medium hover:border-gray-400/80 dark:hover:border-gray-500/80 hover:bg-white/60 dark:hover:bg-gray-800/60 transition-all duration-300 shadow-sm hover:shadow-md ${!isTouchDevice ? 'cursor-aware-button' : ''} text-sm sm:text-base`}
                  style={!isTouchDevice ? {
                    transform: `perspective(1000px) rotateX(${mousePosition.y * 5}deg) rotateY(${mousePosition.x * 5}deg) translateZ(0)`,
                  } : {}}
                >
                  <Download size={16} className="group-hover:-translate-y-0.5 transition-transform duration-200" />
                  <span>Resume</span>
                </a>
              </div>

              {/* Social Links */}
              <div className={`flex justify-center lg:justify-start space-x-4 sm:space-x-6 transition-all duration-1000 ease-out delay-900 ${
                isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}>
                <a
                  href="https://github.com/arsaikia"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 transition-all duration-200 p-2.5 sm:p-3 hover:bg-white/30 dark:hover:bg-gray-800/30 rounded-lg hover:scale-110 backdrop-blur-sm"
                >
                  <Github size={20} className="sm:w-6 sm:h-6" />
                </a>
                <a
                  href="https://www.linkedin.com/in/arsaikia/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 transition-all duration-200 p-2.5 sm:p-3 hover:bg-white/30 dark:hover:bg-gray-800/30 rounded-lg hover:scale-110 backdrop-blur-sm"
                >
                  <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                  </svg>
                </a>
                <a
                  href="mailto:arunabhsaikia.official@gmail.com"
                  className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 transition-all duration-200 p-2.5 sm:p-3 hover:bg-white/30 dark:hover:bg-gray-800/30 rounded-lg hover:scale-110 backdrop-blur-sm"
                >
                  <Mail size={20} className="sm:w-6 sm:h-6" />
                </a>
              </div>
            </div>

            {/* Right Column - Interactive Code Demo */}
            <div 
              className={`transition-all duration-1000 ease-out delay-1000 ${
                isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
            >
              <InteractiveCodeDemo />
            </div>
          </div>

          {/* Scroll Indicator - Centered */}
          <div className="text-center">
            <button
              onClick={() => scrollToSection('about')}
              className={`text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 transition-all duration-1000 ease-out delay-1100 animate-bounce p-2 rounded-lg hover:bg-white/30 dark:hover:bg-gray-800/30 ${
                isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
            >
              <ArrowDown size={20} className="sm:w-6 sm:h-6" />
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Hero 