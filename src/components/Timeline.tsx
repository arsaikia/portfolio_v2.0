import { useEffect, useRef, useState } from 'react'
import { Calendar, MapPin, Briefcase, Award, ChevronDown, TrendingUp, Users, Target, Code, ExternalLink, ArrowRight, DollarSign, Zap, Shield, Globe } from 'lucide-react'

interface Achievement {
  metric: string
  description: string
  icon: React.ReactNode
}

interface Responsibility {
  text: string
  icon: React.ReactNode
}

interface TimelineData {
  id: string
  title: string
  company: string
  period: string
  year: string
  location: string
  description: string
  achievements: Achievement[]
  responsibilities: Responsibility[]
  technologies: string[]
  type: 'work' | 'education'
  color: string
  accent: string
}

const Timeline = () => {
  const scrollContainerRef = useRef<HTMLDivElement>(null)
  const [scrollProgress, setScrollProgress] = useState(0)
  const [activeIndex, setActiveIndex] = useState(0)
  const [canScrollDown, setCanScrollDown] = useState(true)
  const [isMobile, setIsMobile] = useState(false)
  const [hoveredCard, setHoveredCard] = useState<string | null>(null)

  const timelineData: TimelineData[] = [
    {
      id: 'adobe',
      title: 'Senior Full Stack Engineer',
      company: 'Adobe',
      period: 'June 2021 - Present',
      year: '2021',
      location: 'San Francisco, CA',
      description: 'Engineered core ecommerce solutions for Generative AI assets, modernized customer checkout flows, and led development of modular commerce systems.',
      achievements: [
        { metric: '1.5%', description: 'of total stock revenue from AI assets', icon: <DollarSign className="w-4 h-4" /> },
        { metric: '+18%', description: 'Customer retention boost', icon: <Users className="w-4 h-4" /> },
        { metric: '83%', description: 'Reduced integration effort', icon: <Target className="w-4 h-4" /> },
        { metric: '$1.5M', description: 'GNARR boost from Plans page', icon: <DollarSign className="w-4 h-4" /> }
      ],
      responsibilities: [
        { text: 'Engineered core ecommerce solutions for Generative AI assets, enabling merchandising and licensing which now accounts for 1.5% of total stock revenue', icon: <Code className="w-4 h-4" /> },
        { text: 'Updated Checkout API for real-time content ID fetching via centralized licensing module and GraphQL, ensuring seamless integration across all Stock 2.0 surfaces', icon: <Zap className="w-4 h-4" /> },
        { text: 'Spearheaded comprehensive modernization and redesign of customer checkout flow (frontend & backend), integrating new customer segments and diverse payment providers', icon: <Globe className="w-4 h-4" /> },
        { text: 'Streamlined Adobe Stock\'s checkout integration across web & desktop apps by developing modular, self-contained commerce component system', icon: <Target className="w-4 h-4" /> },
        { text: 'Led modernization of Adobe Stock\'s Plans page to dynamically rendered, accessible platform via Franklin Headless Framework and Adobe Spectrum', icon: <Shield className="w-4 h-4" /> }
      ],
      technologies: ['React', 'Node.js', 'TypeScript', 'GraphQL', 'Adobe Spectrum', 'Franklin Framework', 'Python', 'Java', 'Express', 'Microservices'],
      type: 'work',
      color: 'from-red-500 to-orange-500',
      accent: 'red'
    },
    {
      id: 'manifesthq',
      title: 'Front End Developer',
      company: 'ManifestHQ',
      period: 'May 2020 - May 2021',
      year: '2020',
      location: 'Chicago, IL',
      description: 'Led development of responsive React.js web app for 401k retirement funds transfers, architected reusable UI library.',
      achievements: [
        { metric: '80%', description: 'Reduced transfer time', icon: <TrendingUp className="w-4 h-4" /> },
        { metric: '80%', description: 'Test coverage for UI library', icon: <Target className="w-4 h-4" /> },
        { metric: '100%', description: 'Mobile-first responsive design', icon: <Globe className="w-4 h-4" /> }
      ],
      responsibilities: [
        { text: 'Led development of responsive, mobile-first React.js web app (TypeScript, Node.js, Styled Components) for 401k retirement funds transfers', icon: <Code className="w-4 h-4" /> },
        { text: 'Architected reusable UI library (npm package, Storybook) with comprehensive test coverage, ensuring consistency and maintainability', icon: <Target className="w-4 h-4" /> },
        { text: 'Established and managed continuous deployment pipelines from Bitbucket to AWS S3, integrating React frontend with Spring Boot backend', icon: <Zap className="w-4 h-4" /> },
        { text: 'Translated business & user requirements into technical specifications through collaboration with CTO and UX teams', icon: <Users className="w-4 h-4" /> }
      ],
      technologies: ['React', 'TypeScript', 'Node.js', 'Styled Components', 'Storybook', 'AWS S3', 'Spring Boot', 'REST APIs', 'Bitbucket'],
      type: 'work',
      color: 'from-blue-600 to-indigo-600',
      accent: 'blue'
    },
    {
      id: 'udacity',
      title: 'Project Reviewer & Classroom Mentor',
      company: 'Udacity',
      period: 'February 2017 - July 2019',
      year: '2017',
      location: 'Bangalore, India',
      description: 'Reviewed student projects for Data Scientist Nanodegree and mentored batches of 30 students.',
      achievements: [
        { metric: '500+', description: 'Projects reviewed', icon: <Target className="w-4 h-4" /> },
        { metric: '30', description: 'Students per batch', icon: <Users className="w-4 h-4" /> },
        { metric: '95%', description: 'Student satisfaction', icon: <TrendingUp className="w-4 h-4" /> }
      ],
      responsibilities: [
        { text: 'Reviewed student projects for Udacity\'s Data Scientist Nanodegree, ensuring high-quality deliverables and learning outcomes', icon: <Target className="w-4 h-4" /> },
        { text: 'Mentored batches of 30 students, providing personalized guidance and support throughout their learning journey', icon: <Users className="w-4 h-4" /> },
        { text: 'Improved student engagement and graduation rates through effective teaching methodologies and mentorship', icon: <TrendingUp className="w-4 h-4" /> },
        { text: 'Contributed to curriculum development and assessment strategies for Data Science education', icon: <Code className="w-4 h-4" /> }
      ],
      technologies: ['Python', 'Data Science', 'Machine Learning', 'Mentoring', 'Curriculum Development', 'Assessment'],
      type: 'education',
      color: 'from-purple-600 to-pink-600',
      accent: 'purple'
    },
    {
      id: 'ibm',
      title: 'Software Engineer',
      company: 'IBM',
      period: 'March 2016 - July 2019',
      year: '2016',
      location: 'Bangalore, India',
      description: 'Championed Agile methodologies across full SDLC, pioneered web automation framework.',
      achievements: [
        { metric: '70%', description: 'Testing time reduction', icon: <TrendingUp className="w-4 h-4" /> },
        { metric: '90%', description: 'Data validation time saved', icon: <Target className="w-4 h-4" /> },
        { metric: '5+', description: 'Enterprise applications delivered', icon: <Globe className="w-4 h-4" /> }
      ],
      responsibilities: [
        { text: 'Championed Agile Methodologies across full SDLC, crafting enterprise applications with Microservices architecture and Object-Oriented design', icon: <Code className="w-4 h-4" /> },
        { text: 'Pioneered innovative solutions, including new web automation framework for Telecom Client, shortening testing time by 70%', icon: <Zap className="w-4 h-4" /> },
        { text: 'Authored custom Data Management Tool using Python & Java, minimizing data validation time by 90%, resulting in faster project turnaround', icon: <Target className="w-4 h-4" /> },
        { text: 'Architected and implemented comprehensive Unit, Regression, and Integration test scripts; engineered responsive UI features in React', icon: <Shield className="w-4 h-4" /> }
      ],
      technologies: ['Python', 'Java', 'Node.js', 'Express', 'React', 'Microservices', 'Agile', 'HTML', 'CSS', 'Testing'],
      type: 'work',
      color: 'from-blue-800 to-blue-900',
      accent: 'blue'
    },
  ]

  // Check if mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }
    
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  useEffect(() => {
    const handleScroll = () => {
      if (!scrollContainerRef.current) return
      
      const { scrollTop, scrollHeight, clientHeight } = scrollContainerRef.current
      const maxScroll = scrollHeight - clientHeight
      const progress = maxScroll > 0 ? scrollTop / maxScroll : 0
      
      setScrollProgress(Math.min(progress, 1))
      setActiveIndex(Math.min(Math.floor(progress * timelineData.length), timelineData.length - 1))
      setCanScrollDown(scrollTop < maxScroll - 10)
    }

    const scrollContainer = scrollContainerRef.current
    if (scrollContainer) {
      scrollContainer.addEventListener('scroll', handleScroll)
      handleScroll()
      return () => scrollContainer.removeEventListener('scroll', handleScroll)
    }
  }, [timelineData.length])

  const getIcon = (type: string) => {
    switch (type) {
      case 'work': return <Briefcase className="w-4 h-4" />
      case 'education': return <Award className="w-4 h-4" />
      default: return <Briefcase className="w-4 h-4" />
    }
  }

  const scrollToItem = (index: number) => {
    if (!scrollContainerRef.current) return
    
    const { scrollHeight, clientHeight } = scrollContainerRef.current
    const maxScroll = scrollHeight - clientHeight
    const targetScroll = (index / (timelineData.length - 1)) * maxScroll
    
    scrollContainerRef.current.scrollTo({
      top: targetScroll,
      behavior: 'smooth'
    })
  }

  const getAccentColor = (accent: string, opacity = '500') => {
    const colors = {
      red: `text-red-${opacity} dark:text-red-400`,
      green: `text-green-${opacity} dark:text-green-400`,
      blue: `text-blue-${opacity} dark:text-blue-400`,
      purple: `text-purple-${opacity} dark:text-purple-400`
    }
    return colors[accent as keyof typeof colors] || colors.blue
  }

  return (
    <div className="relative h-full">
      <div
        ref={scrollContainerRef}
        className="h-full overflow-y-auto scrollbar-none"
        style={{ scrollBehavior: 'smooth' }}
        data-timeline-container
      >
        {/* Mobile Timeline Progress Indicator */}
        {isMobile && (
          <div className="sticky top-0 z-10 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm border-b border-gray-200 dark:border-gray-700 p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-gray-600 dark:text-gray-400">
                Career Timeline
              </span>
              <span className="text-xs text-gray-500 dark:text-gray-500">
                {activeIndex + 1} of {timelineData.length}
              </span>
            </div>
            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-1">
              <div
                className="bg-gradient-to-r from-blue-500 to-purple-500 h-1 rounded-full transition-all duration-300"
                style={{ width: `${((activeIndex + 1) / timelineData.length) * 100}%` }}
              />
            </div>
            {/* Mobile Year Buttons */}
            <div className="flex justify-center gap-2 mt-3 overflow-x-auto pb-1">
              {timelineData.map((item, index) => (
                <button
                  key={item.id}
                  onClick={() => scrollToItem(index)}
                  className={`flex-shrink-0 px-3 py-1.5 rounded-full text-xs font-medium transition-all duration-200 ${
                    activeIndex >= index
                      ? 'bg-blue-500 text-white shadow-lg'
                      : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-600'
                  }`}
                >
                  {item.year}
                </button>
              ))}
            </div>
          </div>
        )}

        <div className={`${isMobile ? 'block' : 'flex'} max-w-6xl mx-auto`}>
          {/* Timeline Content */}
          <div className={`${isMobile ? 'w-full' : 'flex-1 pr-8'}`}>
            <div className={`space-y-8 md:space-y-12 ${isMobile ? 'py-6' : 'py-8'}`}>
              {timelineData.map((item, index) => {
                const isActive = activeIndex >= index
                const isHovered = hoveredCard === item.id
                
                return (
                  <div
                    key={item.id}
                    className={`transition-all duration-700 ease-out ${
                      isActive ? 'opacity-100 translate-y-0' : 'opacity-40 translate-y-4'
                    }`}
                    data-timeline-item={item.id}
                    onMouseEnter={() => !isMobile && setHoveredCard(item.id)}
                    onMouseLeave={() => !isMobile && setHoveredCard(null)}
                  >
                    {/* Clean Timeline Card - Matching Hero Design */}
                    <div className="group relative">
                      {/* Mobile Timeline Connector */}
                      {isMobile && index < timelineData.length - 1 && (
                        <div className="absolute left-4 top-16 w-0.5 h-16 bg-gradient-to-b from-blue-500/20 to-transparent" />
                      )}
                      
                      {/* Clean Card Container - Hero-style design */}
                      <div className={`${!isMobile ? 
                        `relative overflow-hidden rounded-2xl bg-white/90 dark:bg-gray-800/50 backdrop-blur-md border border-gray-200/60 dark:border-gray-500/50 transition-all duration-300 hover:border-gray-300/80 dark:hover:border-gray-400/70 hover:bg-white/95 dark:hover:bg-gray-800/70 shadow-sm hover:shadow-lg` : 
                        ''}`}>
                        
                        {/* Card Content */}
                        <div className={`${!isMobile ? 'p-4' : ''} relative z-10`}>
                          {/* Header */}
                          <div className="flex items-start gap-3 mb-3">
                            {/* Year Badge for Mobile */}
                            {isMobile && (
                              <div className="flex-shrink-0 mt-1">
                                <div className={`w-8 h-8 rounded-full bg-gradient-to-r ${item.color} flex items-center justify-center text-white text-xs font-bold shadow-sm`}>
                                  {item.year.slice(-2)}
                                </div>
                              </div>
                            )}
                            
                            {/* Clean Icon for Desktop */}
                            {!isMobile && (
                              <div className="flex-shrink-0">
                                {item.company === 'Adobe' ? (
                                  <img src="/logo_adobe.png" alt="Adobe" className="w-10 h-10 object-contain" />
                                ) : item.company === 'ManifestHQ' ? (
                                  <img src="/logo_manifest.png" alt="ManifestHQ" className="w-10 h-10 object-contain" />
                                ) : item.company === 'IBM' ? (
                                  <img src="/logo_ibm.png" alt="IBM" className="w-10 h-10 object-contain" />
                                ) : item.company === 'Udacity' ? (
                                  <img src="/logo_udacity.png" alt="Udacity" className="w-10 h-10 object-contain" />
                                ) : (
                                  <div className={`w-10 h-10 rounded-xl bg-gradient-to-r ${item.color} flex items-center justify-center text-white shadow-sm transition-all duration-300`}>
                                    {getIcon(item.type)}
                                  </div>
                                )}
                              </div>
                            )}
                            
                            <div className="flex-1 min-w-0">
                              <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 mb-2">
                                <div>
                                  <h3 className={`font-bold ${isMobile ? 'text-lg' : 'text-xl'} text-gray-900 dark:text-white mb-1 transition-colors duration-300`}>
                                    {item.title} <span className={`font-semibold ${getAccentColor(item.accent)}`}>@{item.company}</span>
                                  </h3>
                                </div>
                              </div>
                              
                              {/* Period and Location */}
                              <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 text-sm text-gray-500 dark:text-gray-400 mb-3">
                                <span className="flex items-center gap-1.5">
                                  <Calendar className="w-3 h-3" />
                                  <span className="font-medium">{item.period}</span>
                                </span>
                                <span className="flex items-center gap-1.5">
                                  <MapPin className="w-3 h-3" />
                                  <span>{item.location}</span>
                                </span>
                              </div>
                            </div>
                          </div>

                          {/* Description */}
                          <div className={`${isMobile ? 'ml-11' : ''} mb-4`}>
                            <p className={`text-gray-600 dark:text-gray-300 leading-relaxed ${isMobile ? 'text-sm' : 'text-base'}`}>
                              {item.description}
                            </p>
                          </div>

                          {/* Compact Achievement Cards */}
                          <div className={`${isMobile ? 'ml-11' : ''} mb-4`}>
                            <h4 className={`text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2 ${!isMobile ? 'uppercase tracking-wide' : ''}`}>
                              Key Impact
                            </h4>
                            <div className={`grid ${isMobile ? 'grid-cols-2 gap-2' : 'grid-cols-2 gap-2'}`}>
                              {item.achievements.map((achievement, achievementIndex) => (
                                <div
                                  key={achievementIndex}
                                  className={`group/achievement relative overflow-hidden rounded-lg transition-all duration-300 ${
                                    !isMobile 
                                      ? `bg-gray-50/80 dark:bg-gray-800/40 backdrop-blur-sm border border-gray-200/60 dark:border-gray-600/60 hover:border-gray-300/80 dark:hover:border-gray-500/80 hover:bg-gray-100/90 dark:hover:bg-gray-800/60` 
                                      : 'bg-gray-50 dark:bg-gray-800/50 hover:bg-blue-50 dark:hover:bg-blue-900/20'
                                  } cursor-help p-2`}
                                  title={achievement.description}
                                >
                                  <div className="relative z-10 flex items-center gap-2">
                                    <div className={`flex-shrink-0 p-1 rounded-md bg-white dark:bg-gray-800 shadow-sm ${getAccentColor(item.accent)}`}>
                                      {achievement.icon}
                                    </div>
                                    <div className="min-w-0 flex-1">
                                      <div className={`font-bold text-gray-900 dark:text-white ${isMobile ? 'text-sm' : 'text-sm'} mb-0.5`}>
                                        {achievement.metric}
                                      </div>
                                      <div className={`text-gray-600 dark:text-gray-400 ${isMobile ? 'text-xs' : 'text-xs'} leading-tight`}>
                                        {achievement.description}
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>

                          {/* Compact Technologies */}
                          <div className={`${isMobile ? 'ml-11' : ''}`}>
                            <h4 className={`text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2 ${!isMobile ? 'uppercase tracking-wide' : ''}`}>
                              Technologies
                            </h4>
                            <div className="flex flex-wrap gap-1.5">
                              {item.technologies.map((tech, techIndex) => (
                                <span
                                  key={tech}
                                  className={`px-2 py-1 font-medium rounded-md transition-all duration-200 ${
                                    !isMobile 
                                      ? `bg-gray-100/80 dark:bg-gray-800/40 text-gray-700 dark:text-gray-300 border border-gray-200/60 dark:border-gray-600/60 hover:border-gray-300/80 dark:hover:border-gray-500/80 hover:bg-gray-200/90 dark:hover:bg-gray-800/60` 
                                      : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-blue-100 dark:hover:bg-blue-900/30 hover:text-blue-700 dark:hover:text-blue-300'
                                  } cursor-default text-xs`}
                                >
                                  {tech}
                                </span>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>

          {/* Desktop Year Timeline Selector - Subtle & Enhanced */}
          {!isMobile && (
            <div className="w-36 border-l border-gray-200/30 dark:border-gray-700/30 flex justify-center items-start">
              <div className="sticky top-8 flex flex-col items-center">
                {/* Timeline Header */}
                <div className="mb-6 text-center">
                  <h3 className="text-xs font-medium text-gray-500 dark:text-gray-500 uppercase tracking-wider mb-1">
                    Timeline
                  </h3>
                  <div className="w-6 h-px bg-gradient-to-r from-blue-400 to-blue-500 rounded-full mx-auto" />
                </div>
                
                <div className="space-y-6">
                  {timelineData.map((item, index) => {
                    const isActive = activeIndex >= index
                    const isCurrent = activeIndex === index
                    
                    return (
                      <div key={item.id} className="relative">
                        {/* Subtle Timeline Connector Line */}
                        {index < timelineData.length - 1 && (
                          <div className="absolute left-6 top-12 w-px h-12">
                            <div 
                              className={`w-full h-full transition-all duration-500 ease-out ${
                                isActive 
                                  ? 'bg-gradient-to-b from-blue-400 to-blue-300' 
                                  : 'bg-gray-200 dark:bg-gray-600'
                              }`}
                            />
                          </div>
                        )}
                        
                        {/* Subtle Interactive Year Selector */}
                        <button
                          onClick={() => scrollToItem(index)}
                          className={`group relative flex items-center gap-3 p-2 rounded-lg transition-all duration-300 ease-out cursor-pointer ${
                            isCurrent 
                              ? 'bg-white/80 dark:bg-gray-800/60 backdrop-blur-sm border border-blue-200/40 dark:border-blue-700/30 shadow-sm' 
                              : 'hover:bg-white/50 dark:hover:bg-gray-800/30 backdrop-blur-sm border border-transparent hover:border-gray-200/30 dark:hover:border-gray-700/20'
                          }`}
                        >
                          {/* Subtle Dot Indicator */}
                          <div className="relative">
                            <div 
                              className={`w-3 h-3 rounded-full transition-all duration-300 ease-out ${
                                isCurrent 
                                  ? 'bg-blue-500 scale-110 shadow-sm' 
                                  : isActive 
                                    ? 'bg-blue-400 group-hover:bg-blue-500' 
                                    : 'bg-gray-300 dark:bg-gray-600 group-hover:bg-gray-400 dark:group-hover:bg-gray-500'
                              }`}
                            />
                            {isCurrent && (
                              <div className="absolute inset-0 w-3 h-3 bg-blue-500 rounded-full animate-ping opacity-50" />
                            )}
                          </div>
                          
                          {/* Subtle Year Label */}
                          <div className="text-left min-w-0">
                            <span 
                              className={`text-lg font-semibold transition-all duration-300 ${
                                isCurrent 
                                  ? 'text-blue-600 dark:text-blue-400' 
                                  : isActive 
                                    ? 'text-gray-700 dark:text-gray-300 group-hover:text-blue-600 dark:group-hover:text-blue-400' 
                                    : 'text-gray-400 dark:text-gray-500 group-hover:text-gray-600 dark:group-hover:text-gray-400'
                              }`}
                            >
                              {item.year}
                            </span>
                            <div 
                              className={`text-xs font-medium transition-all duration-300 truncate ${
                                isCurrent 
                                  ? 'text-blue-500 dark:text-blue-300' 
                                  : isActive 
                                    ? 'text-gray-500 dark:text-gray-400 group-hover:text-blue-500 dark:group-hover:text-blue-400' 
                                    : 'text-gray-400 dark:text-gray-500 group-hover:text-gray-500 dark:group-hover:text-gray-500'
                              }`}
                            >
                              {item.company}
                            </div>
                          </div>
                        </button>
                      </div>
                    )
                  })}
                </div>
                
                {/* Timeline Footer */}
                <div className="mt-6 text-center">
                  <div className="w-4 h-px bg-gray-300 dark:bg-gray-600 rounded-full mx-auto" />
                  <p className="text-xs text-gray-400 dark:text-gray-500 mt-1 font-medium">
                    {activeIndex + 1} of {timelineData.length}
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Scroll indicator at bottom */}
        {canScrollDown && (
          <div className="flex justify-center pb-6">
            <div className="flex items-center gap-1 text-xs text-gray-400 dark:text-gray-500">
              <ChevronDown className="w-3 h-3 animate-bounce" />
              {isMobile && <span className="ml-1">Scroll for more</span>}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default Timeline 