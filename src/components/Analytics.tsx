import { useEffect, useRef } from 'react'

interface AnalyticsEvent {
  event: string
  section?: string
  value?: number
  timestamp: number
  userAgent: string
  viewport: string
}

const Analytics = () => {
  const sessionStart = useRef<number>(Date.now())
  const sectionTimes = useRef<{ [key: string]: number }>({})
  const currentSection = useRef<string>('')
  
  // Track page views
  useEffect(() => {
    trackEvent('page_view', 'hero')
    trackPerformanceMetrics()
  }, [])

  // Track section visibility
  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: '-20% 0px -20% 0px',
      threshold: 0.5
    }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        const sectionId = entry.target.id
        
        if (entry.isIntersecting) {
          // Track time spent in previous section
          if (currentSection.current) {
            const timeSpent = Date.now() - sectionTimes.current[currentSection.current]
            trackEvent('section_time', currentSection.current, timeSpent)
          }
          
          // Start tracking new section
          currentSection.current = sectionId
          sectionTimes.current[sectionId] = Date.now()
          trackEvent('section_view', sectionId)
        }
      })
    }, observerOptions)

    // Observe all main sections
    const sections = ['hero', 'about', 'skills', 'projects', 'contact']
    sections.forEach(sectionId => {
      const element = document.getElementById(sectionId)
      if (element) observer.observe(element)
    })

    return () => observer.disconnect()
  }, [])

  // Track scroll depth
  useEffect(() => {
    let maxScrollDepth = 0
    const trackScrollDepth = () => {
      const scrollTop = window.pageYOffset
      const docHeight = document.documentElement.scrollHeight - window.innerHeight
      const scrollPercent = Math.round((scrollTop / docHeight) * 100)
      
      if (scrollPercent > maxScrollDepth) {
        maxScrollDepth = scrollPercent
        
        // Track milestones
        const milestones = [25, 50, 75, 90, 100]
        const milestone = milestones.find(m => scrollPercent >= m && maxScrollDepth - scrollPercent < 10)
        
        if (milestone) {
          trackEvent('scroll_depth', 'page', milestone)
        }
      }
    }

    const throttledScrollTracker = throttle(trackScrollDepth, 500)
    window.addEventListener('scroll', throttledScrollTracker)
    
    return () => window.removeEventListener('scroll', throttledScrollTracker)
  }, [])

  // Track button clicks and interactions
  useEffect(() => {
    const trackClicks = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      
      // Track CTA buttons
      if (target.matches('button, a[href]')) {
        const text = target.textContent || target.getAttribute('aria-label') || 'unknown'
        const href = target.getAttribute('href')
        
        if (href?.includes('resume') || text.toLowerCase().includes('resume')) {
          trackEvent('resume_download', 'cta')
        } else if (href?.includes('github')) {
          trackEvent('github_click', 'social')
        } else if (href?.includes('linkedin')) {
          trackEvent('linkedin_click', 'social')
        } else if (href?.includes('mailto')) {
          trackEvent('email_click', 'contact')
        } else {
          trackEvent('button_click', getCurrentSection(), undefined, { buttonText: text })
        }
      }
    }

    document.addEventListener('click', trackClicks)
    return () => document.removeEventListener('click', trackClicks)
  }, [])

  // Track timeline interactions
  useEffect(() => {
    const trackTimelineInteractions = (e: Event) => {
      const target = e.target as HTMLElement
      
      if (target.closest('[data-timeline-item]')) {
        const timelineItem = target.closest('[data-timeline-item]')?.getAttribute('data-timeline-item')
        trackEvent('timeline_interaction', 'timeline', undefined, { item: timelineItem })
      }
    }

    document.addEventListener('click', trackTimelineInteractions)
    return () => document.removeEventListener('click', trackTimelineInteractions)
  }, [])

  const trackEvent = (event: string, section?: string, value?: number, customData?: any) => {
    const analyticsEvent: AnalyticsEvent = {
      event,
      section,
      value,
      timestamp: Date.now(),
      userAgent: navigator.userAgent,
      viewport: `${window.innerWidth}x${window.innerHeight}`
    }

    // Store in localStorage for now (replace with your analytics service)
    const events = JSON.parse(localStorage.getItem('portfolio_analytics') || '[]')
    events.push({ ...analyticsEvent, ...customData })
    localStorage.setItem('portfolio_analytics', JSON.stringify(events.slice(-100))) // Keep last 100 events

    // Log for development (remove in production)
    if (process.env.NODE_ENV === 'development') {
      console.log('📊 Analytics Event:', analyticsEvent)
    }

    // Send to external analytics services
    // trackToGoogleAnalytics(analyticsEvent)
    // trackToHotjar(analyticsEvent)
  }

  const trackPerformanceMetrics = () => {
    // Track page load performance
    window.addEventListener('load', () => {
      setTimeout(() => {
        const perfData = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming
        
        trackEvent('performance', 'page_load', perfData.loadEventEnd - perfData.fetchStart)
        trackEvent('performance', 'dom_ready', perfData.domContentLoadedEventEnd - perfData.fetchStart)
        trackEvent('performance', 'first_paint', performance.getEntriesByName('first-paint')[0]?.startTime)
      }, 0)
    })

    // Track Core Web Vitals
    if ('web-vital' in window) {
      // This would require web-vitals library
      // import { getLCP, getFID, getCLS } from 'web-vitals'
      // getLCP(metric => trackEvent('web_vital', 'lcp', metric.value))
      // getFID(metric => trackEvent('web_vital', 'fid', metric.value))
      // getCLS(metric => trackEvent('web_vital', 'cls', metric.value))
    }
  }

  const getCurrentSection = (): string => {
    const sections = ['hero', 'about', 'skills', 'projects', 'contact']
    
    for (const sectionId of sections) {
      const element = document.getElementById(sectionId)
      if (element) {
        const rect = element.getBoundingClientRect()
        if (rect.top <= window.innerHeight / 2 && rect.bottom >= window.innerHeight / 2) {
          return sectionId
        }
      }
    }
    
    return 'unknown'
  }

  // Utility function for throttling
  const throttle = (func: Function, limit: number) => {
    let inThrottle: boolean
    return function(this: any, ...args: any[]) {
      if (!inThrottle) {
        func.apply(this, args)
        inThrottle = true
        setTimeout(() => inThrottle = false, limit)
      }
    }
  }

  // Track session end
  useEffect(() => {
    const handleBeforeUnload = () => {
      const sessionDuration = Date.now() - sessionStart.current
      trackEvent('session_end', 'page', sessionDuration)
    }

    window.addEventListener('beforeunload', handleBeforeUnload)
    return () => window.removeEventListener('beforeunload', handleBeforeUnload)
  }, [])

  return null // This component doesn't render anything
}

export default Analytics 