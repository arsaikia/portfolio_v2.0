import { useEffect, useState } from 'react'

const MobileOptimizations = () => {
  const [isMobile, setIsMobile] = useState(false)
  const [touchSupport, setTouchSupport] = useState(false)

  useEffect(() => {
    // Detect mobile and touch devices
    const checkDevice = () => {
      const mobile = window.innerWidth <= 768 || /Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)
      const touch = 'ontouchstart' in window || navigator.maxTouchPoints > 0
      
      setIsMobile(mobile)
      setTouchSupport(touch)
      
      // Add classes to body for CSS targeting
      document.body.classList.toggle('is-mobile', mobile)
      document.body.classList.toggle('has-touch', touch)
    }

    checkDevice()
    window.addEventListener('resize', checkDevice)
    
    return () => window.removeEventListener('resize', checkDevice)
  }, [])

  // Improved touch scrolling for timeline
  useEffect(() => {
    if (!touchSupport) return

    const timelineContainer = document.querySelector('[data-timeline-container]')
    if (!timelineContainer) return

    let startY = 0
    let scrollTop = 0
    let isScrolling = false

    const handleTouchStart = (e: Event) => {
      const touchEvent = e as TouchEvent
      startY = touchEvent.touches[0].clientY
      scrollTop = timelineContainer.scrollTop
      isScrolling = true
    }

    const handleTouchMove = (e: Event) => {
      if (!isScrolling) return
      
      const touchEvent = e as TouchEvent
      const currentY = touchEvent.touches[0].clientY
      const deltaY = startY - currentY
      
      timelineContainer.scrollTop = scrollTop + deltaY
      e.preventDefault()
    }

    const handleTouchEnd = () => {
      isScrolling = false
    }

    timelineContainer.addEventListener('touchstart', handleTouchStart, { passive: false })
    timelineContainer.addEventListener('touchmove', handleTouchMove, { passive: false })
    timelineContainer.addEventListener('touchend', handleTouchEnd)

    return () => {
      timelineContainer.removeEventListener('touchstart', handleTouchStart)
      timelineContainer.removeEventListener('touchmove', handleTouchMove)
      timelineContainer.removeEventListener('touchend', handleTouchEnd)
    }
  }, [touchSupport])

  // Swipe navigation for projects
  useEffect(() => {
    if (!touchSupport) return

    const projectsGrid = document.querySelector('[data-projects-grid]')
    if (!projectsGrid) return

    let startX = 0
    let currentX = 0
    let isDragging = false

    const handleTouchStart = (e: Event) => {
      const touchEvent = e as TouchEvent
      startX = touchEvent.touches[0].clientX
      isDragging = true
    }

    const handleTouchMove = (e: Event) => {
      if (!isDragging) return
      const touchEvent = e as TouchEvent
      currentX = touchEvent.touches[0].clientX
    }

    const handleTouchEnd = () => {
      if (!isDragging) return
      
      const deltaX = startX - currentX
      const threshold = 50

      if (Math.abs(deltaX) > threshold) {
        // Could implement project carousel navigation here
        console.log('Swipe detected:', deltaX > 0 ? 'left' : 'right')
      }

      isDragging = false
    }

    projectsGrid.addEventListener('touchstart', handleTouchStart)
    projectsGrid.addEventListener('touchmove', handleTouchMove)
    projectsGrid.addEventListener('touchend', handleTouchEnd)

    return () => {
      projectsGrid.removeEventListener('touchstart', handleTouchStart)
      projectsGrid.removeEventListener('touchmove', handleTouchMove)
      projectsGrid.removeEventListener('touchend', handleTouchEnd)
    }
  }, [touchSupport])

  // Optimize animations for mobile
  useEffect(() => {
    if (isMobile) {
      // Reduce animations on mobile for better performance
      document.documentElement.style.setProperty('--animation-duration', '0.3s')
      document.documentElement.style.setProperty('--transition-duration', '0.2s')
    } else {
      document.documentElement.style.setProperty('--animation-duration', '0.6s')
      document.documentElement.style.setProperty('--transition-duration', '0.3s')
    }
  }, [isMobile])

  // Handle orientation changes
  useEffect(() => {
    const handleOrientationChange = () => {
      // Force layout recalculation after orientation change
      setTimeout(() => {
        window.dispatchEvent(new Event('resize'))
      }, 100)
    }

    window.addEventListener('orientationchange', handleOrientationChange)
    return () => window.removeEventListener('orientationchange', handleOrientationChange)
  }, [])

  // Prevent zoom on double tap for form inputs
  useEffect(() => {
    if (!touchSupport) return

    const preventZoom = (e: TouchEvent) => {
      if (e.touches.length > 1) {
        e.preventDefault()
      }
    }

    const handleTouch = (e: TouchEvent) => {
      const target = e.target as HTMLElement
      if (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA') {
        // Allow normal touch behavior for form inputs
        return
      }
      
      // Prevent double-tap zoom on other elements
      let lastTouchEnd = 0
      const now = (new Date()).getTime()
      if (now - lastTouchEnd <= 300) {
        e.preventDefault()
      }
      lastTouchEnd = now
    }

    document.addEventListener('touchstart', preventZoom, { passive: false })
    document.addEventListener('touchend', handleTouch, { passive: false })

    return () => {
      document.removeEventListener('touchstart', preventZoom)
      document.removeEventListener('touchend', handleTouch)
    }
  }, [touchSupport])

  return null
}

export default MobileOptimizations 