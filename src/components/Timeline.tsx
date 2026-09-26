import { useEffect, useRef, useState } from 'react'
import { Calendar, MapPin, Briefcase, Award, TrendingUp, Users, Target, Code, DollarSign, Zap, Shield, Globe } from 'lucide-react'
import { experience } from '../data/experience'

const iconMap = { TrendingUp, Users, Target, Code, DollarSign, Zap, Shield, Globe } as const
type IconName = keyof typeof iconMap

const renderIcon = (name: IconName) => {
  const Icon = iconMap[name]
  return <Icon className="w-4 h-4" />
}

const Timeline = () => {
  const scrollContainerRef = useRef<HTMLDivElement>(null)
  const cardRefs = useRef<(HTMLDivElement | null)[]>([])

  const [activeIndex, setActiveIndex] = useState(0)
  const [isMobile, setIsMobile] = useState(false)

  const timelineData = experience

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


      setActiveIndex(Math.min(Math.floor(progress * timelineData.length), timelineData.length - 1))
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
    if (!scrollContainerRef.current) return;
    const card = cardRefs.current[index];
    if (card) {
      scrollContainerRef.current.scrollTo({
        top: card.offsetTop,
        behavior: 'smooth',
      });
    }
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
        className='h-[380px] md:h-[480px] overflow-y-auto scrollbar-none scroll-smooth pt-2'
        style={{ scrollBehavior: 'smooth' }}
        data-timeline-container
      >
        <div className={`${isMobile ? 'block' : 'flex'} max-w-6xl mx-auto`}>
          {/* Timeline Content */}
          <div className={`${isMobile ? 'w-full' : 'flex-1 pr-8'}`}>
            {isMobile && <div className="h-4" />}
            <div className={`space-y-8 md:space-y-12 ${isMobile ? 'py-6' : 'py-8'}`}>
              {timelineData.map((item, index) => (
                <div
                  key={item.id}
                  ref={el => { cardRefs.current[index] = el; }}
                  className={``}
                  data-timeline-item={item.id}
                >
                  <div className="group relative">
                    {isMobile && index < timelineData.length - 1 && (
                      <div className="absolute left-4 top-16 w-0.5 h-16 bg-gradient-to-b from-blue-500/20 to-transparent" />
                    )}
                    <div className={`${!isMobile ?
                      `relative overflow-hidden rounded-2xl bg-white/90 dark:bg-gray-800/50 backdrop-blur-md border border-gray-200/60 dark:border-gray-500/50 shadow-sm hover:shadow-md` :
                      ''}`}>
                      <div className={`${!isMobile ? 'p-4' : ''} relative z-10`}>
                        <div className="flex items-start gap-3 mb-3">
                          {((isMobile || !isMobile)) && (
                            <div className="flex-shrink-0 mt-1">
                              {item.company === 'Adobe' ? (
                                <img src="/logo_adobe.png" alt="Adobe" className="w-8 h-8 sm:w-10 sm:h-10 object-contain" />
                              ) : item.company === 'ManifestHQ' ? (
                                <img src="/logo_manifest.png" alt="ManifestHQ" className="w-8 h-8 sm:w-10 sm:h-10 object-contain" />
                              ) : item.company === 'IBM' ? (
                                <img src="/logo_ibm.png" alt="IBM" className="w-8 h-8 sm:w-10 sm:h-10 object-contain" />
                              ) : item.company === 'Udacity' ? (
                                <img src="/logo_udacity.png" alt="Udacity" className="w-8 h-8 sm:w-10 sm:h-10 object-contain" />
                              ) : (
                                <div className={`w-8 h-8 sm:w-10 sm:h-10 rounded-xl bg-gradient-to-r ${item.color} flex items-center justify-center text-white shadow-sm transition-all duration-300`}>
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

                        <div className={`${isMobile ? 'ml-11' : ''} mb-4`}>
                          <p className={`text-gray-600 dark:text-gray-300 leading-relaxed ${isMobile ? 'text-sm' : 'text-base'}`}>
                            {item.description}
                          </p>
                        </div>

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
                                    {renderIcon(achievement.iconName)}
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

                        <div className={`${isMobile ? 'ml-11' : ''}`}>
                          <h4 className={`text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2 ${!isMobile ? 'uppercase tracking-wide' : ''}`}>
                            Technologies
                          </h4>
                          <div className="flex flex-wrap gap-1.5">
                            {item.technologies.map((tech) => (
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
              ))}
            </div>
          </div>

          {!isMobile && (
            <div className="w-36 border-l border-gray-200/30 dark:border-gray-700/30 flex justify-center items-start">
              <div className="sticky top-8 flex flex-col items-center">
                <div className="mb-6 text-center">
                  <h3 className="text-xs font-medium text-gray-500 dark:text-gray-500 uppercase tracking-wider mb-1">
                    Timeline
                  </h3>
                  <div className="w-6 h-px bg-gradient-to-r from-blue-400 to-blue-500 rounded-full mx-auto" />
                </div>

                <div className="space-y-6">
                  {timelineData.map((item, index) => {
                    const isCurrent = activeIndex === index

                    return (
                      <div key={item.id} className="relative">
                        {index < timelineData.length - 1 && (
                          <div className="absolute left-6 top-12 w-px h-12">
                            <div
                              className={`w-full h-full transition-all duration-500 ease-out ${
                                isCurrent
                                  ? 'bg-gradient-to-b from-blue-400 to-blue-300'
                                  : 'bg-gray-200 dark:bg-gray-600'
                              }`}
                            />
                          </div>
                        )}

                        <button
                          onClick={() => scrollToItem(index)}
                          className={`group relative flex items-center gap-3 p-2 rounded-lg transition-all duration-300 ease-out cursor-pointer ${
                            isCurrent
                              ? 'bg-white/80 dark:bg-gray-800/60 backdrop-blur-sm border border-blue-200/40 dark:border-blue-700/30 shadow-sm'
                              : 'hover:bg-white/50 dark:hover:bg-gray-800/30 backdrop-blur-sm border border-transparent hover:border-gray-200/30 dark:hover:border-gray-700/20'
                          }`}
                        >
                          <div className="relative">
                            <div
                              className={`w-3 h-3 rounded-full transition-all duration-300 ease-out ${
                                isCurrent
                                  ? 'bg-blue-500 scale-110 shadow-sm'
                                  : 'bg-gray-300 dark:bg-gray-600 group-hover:bg-gray-400 dark:group-hover:bg-gray-500'
                              }`}
                            />
                            {isCurrent && (
                              <div className="absolute inset-0 w-3 h-3 bg-blue-500 rounded-full animate-ping opacity-50" />
                            )}
                          </div>

                          <div className="text-left min-w-0">
                            <span
                              className={`text-lg font-semibold transition-all duration-300 ${
                                isCurrent
                                  ? 'text-blue-600 dark:text-blue-400'
                                  : 'text-gray-400 dark:text-gray-500 group-hover:text-gray-600 dark:group-hover:text-gray-400'
                              }`}
                            >
                              {item.year}
                            </span>
                            <div
                              className={`text-xs font-medium transition-all duration-300 truncate ${
                                isCurrent
                                  ? 'text-blue-500 dark:text-blue-300'
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
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Timeline
