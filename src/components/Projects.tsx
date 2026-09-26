import { ExternalLink, Github, Calendar, Users, Play, X, Code2 } from 'lucide-react'
import { useState, useEffect, useRef } from 'react'
import { projects } from '../data/projects'

const Projects = () => {
  const [hoveredProject, setHoveredProject] = useState<number | null>(null)
  const [selectedDemo, setSelectedDemo] = useState<number | null>(null)
  const [isMobile, setIsMobile] = useState(false)
  const [visibleProjects, setVisibleProjects] = useState<Set<number>>(new Set())
  const projectRefs = useRef<(HTMLDivElement | null)[]>([])

  // Check if mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }

    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  // Intersection Observer for mobile autoplay
  useEffect(() => {
    if (!isMobile) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const index = parseInt(entry.target.getAttribute('data-index') || '0')
          setVisibleProjects(prev => {
            const newSet = new Set(prev)
            if (entry.isIntersecting) {
              newSet.add(index)
            } else {
              newSet.delete(index)
            }
            return newSet
          })
        })
      },
      { threshold: 0.5 }
    )

    projectRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref)
    })

    return () => observer.disconnect()
  }, [isMobile])

  return (
    <section id="projects" className="py-20 bg-white/70 dark:bg-gray-900/70 backdrop-blur-sm">
      <div className="container-max section-padding">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            A few interesting projects
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            A showcase of my key projects demonstrating technical expertise across algorithms, 
            visualization, and impactful solutions.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {projects.map((project, index) => (
            <div 
              key={index} 
              ref={(el) => { projectRefs.current[index] = el }}
              data-index={index}
              className="group relative overflow-hidden card"
              onMouseEnter={() => !isMobile && setHoveredProject(index)}
              onMouseLeave={() => !isMobile && setHoveredProject(null)}
            >
              <div className="h-48 bg-gradient-to-br from-gray-50/80 to-blue-50/60 dark:from-blue-900/20 dark:to-purple-900/20 flex items-center justify-center relative overflow-hidden">
                {/* Cover Image or Demo */}
                {project.demoImage || project.demoVideo ? (
                  <>
                    {isMobile && visibleProjects.has(index) && project.demoVideo ? (
                      <video
                        src={project.demoVideo}
                        autoPlay
                        muted
                        loop
                        playsInline
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <img
                        src={project.demoImage || project.demoVideo}
                        alt={`Screenshot of ${project.title} - ${project.description.split('.')[0]}`}
                        loading="lazy"
                        width={400}
                        height={192}
                        className={`w-full h-full object-cover transition-all duration-300 ${!isMobile && hoveredProject === index && project.demoVideo ? 'opacity-0 scale-95' : 'opacity-100 scale-100'}`}
                      />
                    )}
                  </>
                ) : project.image ? (
                  <div className="flex flex-col items-center justify-center w-full h-full text-5xl text-gray-400 dark:text-gray-600">
                    <span className="text-6xl">{project.image}</span>
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center w-full h-full text-5xl text-gray-400 dark:text-gray-600">
                    <Code2 size={48} />
                  </div>
                )}
                {/* Play Demo Button (Desktop) - Only show if demo video exists */}
                {!isMobile && hoveredProject === index && project.demoVideo && (
                  <div className="absolute inset-0 transition-all duration-300 opacity-100">
                    <video
                      src={project.demoVideo}
                      autoPlay
                      muted
                      loop
                      playsInline
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
                      <button 
                        onClick={(e) => {
                          e.stopPropagation()
                          setSelectedDemo(index)
                        }}
                        className="text-center text-white hover:scale-110 transition-transform duration-200"
                      >
                        <Play size={48} className="mx-auto mb-2 opacity-80" />
                        <p className="text-sm font-medium">Play Demo</p>
                      </button>
                    </div>
                  </div>
                )}
              </div>

              <div className="p-6">
                <div className="flex items-start justify-between mb-3">
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                    {project.title}
                  </h3>
                  <div className="flex space-x-2">
                    {/* Visit Website Link */}
                    {project.demoLink && project.demoLink !== '#' && (
                      <a
                        href={project.demoLink}
                        className="p-2 text-gray-500 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                        title="Visit Website"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <ExternalLink size={18} />
                      </a>
                    )}
                    {/* GitHub Link */}
                    {project.githubLink && (
                      <a
                        href={project.githubLink}
                        className="p-2 text-gray-500 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                        title="Source Code"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <Github size={18} />
                      </a>
                    )}
                  </div>
                </div>

                <div className="flex items-center space-x-4 text-sm text-gray-500 dark:text-gray-400 mb-4">
                  <div className="flex items-center space-x-1">
                    <Calendar size={14} />
                    <span>{project.period}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Users size={14} />
                    <span>{project.team}</span>
                  </div>
                </div>

                <p className="text-gray-600 dark:text-gray-300 text-sm mb-4 leading-relaxed">
                  {project.description}
                </p>

                <div className="mb-4">
                  <h4 className="text-sm font-semibold text-gray-900 dark:text-white mb-2">
                    Technologies:
                  </h4>
                  <div className="flex flex-wrap gap-1">
                    {project.technologies.map((tech, techIndex) => (
                      <span
                        key={techIndex}
                        className="text-xs bg-gray-100 dark:bg-gray-700/80 text-gray-700 dark:text-gray-300 px-2 py-1 rounded-md border border-gray-200 dark:border-gray-600/30 shadow-sm"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <a
            href="https://github.com/arsaikia"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-medium transition-colors"
          >
            <Github size={20} />
            View All Projects on GitHub
          </a>
        </div>
      </div>

      {/* Demo Modal - Desktop Only */}
      {!isMobile && selectedDemo !== null && (
        <div 
          className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50"
          onClick={() => setSelectedDemo(null)}
          style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0 }}
        >
          <div 
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white dark:bg-gray-900 rounded-2xl shadow-2xl w-11/12 max-w-4xl"
            onClick={(e) => e.stopPropagation()}
            style={{ 
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              maxHeight: '80vh',
              overflow: 'hidden'
            }}
          >
            {/* Modal Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                {projects[selectedDemo].title} - Demo
              </h3>
              <button
                onClick={() => setSelectedDemo(null)}
                className="p-2 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 transition-colors"
              >
                <X size={24} />
              </button>
            </div>

            {/* Modal Content */}
            <div className="p-6" style={{ maxHeight: 'calc(80vh - 80px)', overflow: 'hidden' }}>
              {/* Demo Image/GIF */}
              {projects[selectedDemo].demoImage && (
                <div className="flex items-center justify-center mb-6">
                  <img 
                    src={projects[selectedDemo].demoImage} 
                    alt={`Demo screenshot of ${projects[selectedDemo].title}`}
                    loading="lazy"
                    className="max-w-full max-h-[30vh] object-contain rounded-lg"
                  />
                </div>
              )}
              
              {/* Project Info */}
              <div>
                <p className="text-gray-600 dark:text-gray-300 mb-4 text-sm">
                  {projects[selectedDemo].description}
                </p>
                
                {/* Technologies */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {projects[selectedDemo].technologies.map((tech, techIndex) => (
                    <span
                      key={techIndex}
                      className="text-xs bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300 px-3 py-1 rounded-full"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
                
                {/* Action Buttons */}
                <div className="flex gap-4">
                  {projects[selectedDemo]?.demoLink && projects[selectedDemo]?.demoLink !== '#' && (
                    <a
                      href={projects[selectedDemo].demoLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors text-sm"
                    >
                      <ExternalLink size={16} />
                      Visit Website
                    </a>
                  )}
                  {projects[selectedDemo]?.githubLink && (
                    <a
                      href={projects[selectedDemo].githubLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-lg transition-colors text-sm"
                    >
                      <Github size={16} />
                      View Code
                    </a>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  )
}

export default Projects 