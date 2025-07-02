import { useEffect, useRef, useState } from 'react'

const Skills = () => {
  const [isVisible, setIsVisible] = useState(false)
  const [animatedSkills, setAnimatedSkills] = useState<{[key: string]: boolean}>({})
  const sectionRef = useRef<HTMLDivElement>(null)

  const skillCategories = [
    {
      title: 'Frontend Technologies',
      skills: [
        { name: 'React/Next.js', level: 95 },
        { name: 'TypeScript', level: 90 },
        { name: 'JavaScript (ES6+)', level: 95 },
        { name: 'HTML5 & CSS3', level: 90 },
        { name: 'Tailwind CSS', level: 85 },
        { name: 'Vue.js', level: 75 },
      ]
    },
    {
      title: 'Backend Technologies',
      skills: [
        { name: 'Node.js', level: 90 },
        { name: 'Python', level: 85 },
        { name: 'PostgreSQL', level: 85 },
        { name: 'MongoDB', level: 80 },
        { name: 'Redis', level: 75 },
        { name: 'GraphQL', level: 80 },
      ]
    },
    {
      title: 'DevOps & Tools',
      skills: [
        { name: 'AWS/Azure', level: 85 },
        { name: 'Docker', level: 80 },
        { name: 'Kubernetes', level: 70 },
        { name: 'CI/CD', level: 85 },
        { name: 'Git', level: 95 },
        { name: 'Linux', level: 80 },
      ]
    },
    {
      title: 'Architecture & Leadership',
      skills: [
        { name: 'System Design', level: 90 },
        { name: 'Microservices', level: 85 },
        { name: 'Team Leadership', level: 90 },
        { name: 'Code Review', level: 95 },
        { name: 'Mentoring', level: 90 },
        { name: 'Project Management', level: 85 },
      ]
    }
  ]

  // Intersection Observer for scroll-triggered animations
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          // Trigger staggered skill animations
          skillCategories.forEach((category, categoryIndex) => {
            category.skills.forEach((skill, skillIndex) => {
              const delay = (categoryIndex * 200) + (skillIndex * 100)
              setTimeout(() => {
                setAnimatedSkills(prev => ({
                  ...prev,
                  [`${category.title}-${skill.name}`]: true
                }))
              }, delay)
            })
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
      id="skills" 
      className="py-20 bg-gray-50/70 dark:bg-gray-800/70 backdrop-blur-sm"
    >
      <div className="container-max section-padding">
        {/* Animated Header */}
        <div className={`text-center mb-12 sm:mb-16 transition-all duration-1000 ease-out ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-3 sm:mb-4">
            Technical Skills
          </h2>
          <p className="text-base sm:text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto px-4 sm:px-0">
            A comprehensive overview of my technical expertise and proficiency levels 
            across different technologies and domains.
          </p>
        </div>

        {/* Animated Skill Categories */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
          {skillCategories.map((category, categoryIndex) => (
            <div 
              key={categoryIndex} 
              className={`card p-4 sm:p-6 transition-all duration-700 ease-out ${
                isVisible 
                  ? 'opacity-100 translate-y-0' 
                  : 'opacity-0 translate-y-12'
              }`}
              style={{ 
                transitionDelay: `${categoryIndex * 200}ms` 
              }}
            >
              <h3 className="text-lg sm:text-xl font-semibold text-gray-900 dark:text-white mb-4 sm:mb-6">
                {category.title}
              </h3>
              <div className="space-y-3 sm:space-y-4">
                {category.skills.map((skill, skillIndex) => {
                  const skillKey = `${category.title}-${skill.name}`
                  const isAnimated = animatedSkills[skillKey]
                  
                  return (
                    <div 
                      key={skillIndex} 
                      className={`space-y-2 transition-all duration-500 ease-out ${
                        isAnimated ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-4'
                      }`}
                      style={{ 
                        transitionDelay: `${(categoryIndex * 200) + (skillIndex * 100)}ms` 
                      }}
                    >
                      <div className="flex justify-between items-center">
                        <span className="text-sm sm:text-base text-gray-700 dark:text-gray-300 font-medium">
                          {skill.name}
                        </span>
                        <span className="text-xs sm:text-sm text-gray-500 dark:text-gray-400">
                          {isAnimated ? skill.level : 0}%
                        </span>
                      </div>
                      <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 overflow-hidden">
                        <div
                          className={`bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full transition-all duration-1000 ease-out ${
                            isAnimated ? 'w-full' : 'w-0'
                          }`}
                          style={{ 
                            width: isAnimated ? `${skill.level}%` : '0%',
                            transitionDelay: `${(categoryIndex * 200) + (skillIndex * 100) + 200}ms`
                          }}
                        />
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          ))}
        </div>

        {/* Animated Additional Info */}
        <div className={`mt-8 sm:mt-12 text-center transition-all duration-1000 ease-out ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`} style={{ transitionDelay: '800ms' }}>
          <div className="card p-4 sm:p-6 max-w-4xl mx-auto">
            <h3 className="text-lg sm:text-xl font-semibold text-gray-900 dark:text-white mb-3 sm:mb-4">
              Always Learning
            </h3>
            <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300">
              Technology evolves rapidly, and I'm committed to continuous learning. Currently exploring 
              AI/ML integration, advanced cloud architectures, and emerging frontend frameworks. 
              I regularly contribute to open-source projects and attend tech conferences to stay current.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Skills 