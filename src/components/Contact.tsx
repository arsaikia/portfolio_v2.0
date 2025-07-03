import { Mail, Phone, Linkedin, Github } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'

const Contact = () => {
  const [isVisible, setIsVisible] = useState(false)
  const [animatedItems, setAnimatedItems] = useState<{[key: string]: boolean}>({})
  const sectionRef = useRef<HTMLDivElement>(null)

  const contactInfo = [
    {
      icon: <Mail className="w-6 h-6" />,
      title: 'Email',
      value: 'arunabhsaikia.official@gmail.com',
      link: 'mailto:arunabhsaikia.official@gmail.com'
    },
    {
      icon: <Phone className="w-6 h-6" />,
      title: 'Phone',
      value: '+1 (312) 539-7699',
      link: 'tel:+13125397699'
    }
  ]

  const socialLinks = [
    { icon: <Linkedin className="w-6 h-6" />, name: 'LinkedIn', url: 'https://www.linkedin.com/in/arsaikia/' },
    { icon: <Github className="w-6 h-6" />, name: 'GitHub', url: 'https://github.com/arsaikia/' },
  ]

  // Intersection Observer for scroll-triggered animations
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          // Trigger staggered animations
          contactInfo.forEach((_, index) => {
            setTimeout(() => {
              setAnimatedItems(prev => ({
                ...prev,
                [`contact-${index}`]: true
              }))
            }, index * 200)
          })
          
          socialLinks.forEach((_, index) => {
            setTimeout(() => {
              setAnimatedItems(prev => ({
                ...prev,
                [`social-${index}`]: true
              }))
            }, (contactInfo.length * 200) + (index * 150))
          })
        }
      },
      { threshold: 0.3 }
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [])

  return (
    <section 
      ref={sectionRef}
      id="contact" 
      className="py-12 sm:py-16 bg-gray-50/80 dark:bg-gray-800/70 backdrop-blur-sm"
    >
      <div className="container-max section-padding">
        {/* Animated Header */}
        <div className={`text-center mb-8 sm:mb-12 transition-all duration-1000 ease-out ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-3 sm:mb-4">
            <span className="bg-gradient-to-r from-slate-900 via-blue-700 to-indigo-800 dark:from-white dark:via-blue-200 dark:to-indigo-300 bg-clip-text text-transparent">
              Get In Touch
            </span>
          </h2>
          <p className="text-base sm:text-lg text-gray-600 dark:text-gray-300 max-w-2xl sm:max-w-3xl mx-auto px-4">
            I'm always interested in hearing about new opportunities, interesting projects, 
            or just having a chat about technology. Let's connect!
          </p>
        </div>

        <div className="max-w-4xl mx-auto px-4">
          <div className={`transition-all duration-700 ease-out ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
          }`}>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
              {/* Contact Information */}
              <div className="space-y-6">
                <h3 className="text-xl sm:text-2xl font-semibold text-gray-900 dark:text-white">
                  Contact Information
                </h3>
                <div className="space-y-4">
                  {contactInfo.map((info, index) => {
                    const itemKey = `contact-${index}`
                    const isAnimated = animatedItems[itemKey]
                    
                    return (
                      <a
                        key={index}
                        href={info.link}
                        className={`flex items-center space-x-4 p-4 sm:p-5 rounded-xl hover:bg-white/40 dark:hover:bg-gray-800/40 transition-all duration-500 ease-out group border border-transparent hover:border-gray-300/60 dark:hover:border-gray-600/60 ${
                          isAnimated ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-4'
                        }`}
                        style={{ transitionDelay: `${index * 200}ms` }}
                      >
                        <div className="flex-shrink-0 p-2 bg-blue-50 dark:bg-blue-900/20 rounded-lg text-blue-600 dark:text-blue-400 group-hover:scale-110 transition-transform duration-300">
                          {info.icon}
                        </div>
                        <div className="min-w-0 flex-1">
                          <h4 className="font-semibold text-gray-900 dark:text-white text-base sm:text-lg mb-1">
                            {info.title}
                          </h4>
                          <p className="text-gray-600 dark:text-gray-300 text-sm sm:text-base break-all">
                            {info.value}
                          </p>
                        </div>
                      </a>
                    )
                  })}
                </div>
              </div>

              {/* Social Links */}
              <div className="space-y-6">
                <h3 className="text-xl sm:text-2xl font-semibold text-gray-900 dark:text-white">
                  Connect With Me
                </h3>
                <div className="space-y-4">
                  <div className="flex flex-wrap gap-3 sm:gap-4">
                    {socialLinks.map((social, index) => {
                      const itemKey = `social-${index}`
                      const isAnimated = animatedItems[itemKey]
                      
                      return (
                        <a
                          key={index}
                          href={social.url}
                          className={`flex items-center space-x-3 p-4 sm:p-5 bg-white/40 dark:bg-gray-800/40 backdrop-blur-md border border-gray-300/60 dark:border-gray-600/60 rounded-xl text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-white/60 dark:hover:bg-gray-800/60 hover:border-gray-400/80 dark:hover:border-gray-500/80 transition-all duration-500 ease-out hover:scale-105 shadow-sm hover:shadow-md ${
                            isAnimated ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
                          }`}
                          title={social.name}
                          style={{ transitionDelay: `${(contactInfo.length * 200) + (index * 150)}ms` }}
                          tabIndex={0}
                          aria-label={social.name}
                        >
                          <div className="flex-shrink-0">
                            {social.icon}
                          </div>
                          <span className="font-medium text-sm sm:text-base">{social.name}</span>
                        </a>
                      )
                    })}
                  </div>
                  <p className="text-gray-600 dark:text-gray-300 text-sm sm:text-base leading-relaxed">
                    Follow me on social media for updates on my latest projects and tech insights.
                  </p>
                </div>
              </div>
            </div>

            {/* Availability */}
            <div className={`mt-8 sm:mt-12 pt-6 sm:pt-8 border-t border-gray-300/60 dark:border-gray-600/60 transition-all duration-700 ease-out ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`} style={{ transitionDelay: '600ms' }}>
              <div className="flex items-center space-x-3 mb-3">
                <div className="relative">
                  <div className="w-4 h-4 bg-green-500 rounded-full animate-pulse"></div>
                  <div className="absolute inset-0 w-4 h-4 bg-green-400 rounded-full animate-ping"></div>
                </div>
                <span className="text-green-600 dark:text-green-400 font-semibold text-sm sm:text-base">
                  Available for new opportunities
                </span>
              </div>
              <p className="text-gray-600 dark:text-gray-300 text-sm sm:text-base leading-relaxed">
                I'm currently open to discussing new full-time positions, consulting 
                opportunities, or interesting project collaborations.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Contact 