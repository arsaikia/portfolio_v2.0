import { ExternalLink, Github, Calendar, Users, Play, X } from 'lucide-react'
import { useState, useEffect } from 'react'

const Projects = () => {
  const [hoveredProject, setHoveredProject] = useState<number | null>(null)
  const [selectedDemo, setSelectedDemo] = useState<number | null>(null)
  const [isMobile, setIsMobile] = useState(false)

  // Check if mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }
    
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])



  const projects = [
    {
      title: 'Prep-Algo',
      description: 'A comprehensive platform for practicing algorithm problems with real-time code execution, test cases, and performance analysis. Features interactive coding environment and progress tracking.',
      image: '⚡',
      demoImage: '/prep-algo-demo.png',
      demoVideo: '/prep-algo-demo.mp4',
      technologies: ['JavaScript', 'React', 'Node.js', 'Express', 'MongoDB'],
      features: ['Code Execution', 'Test Cases', 'Progress Tracking', 'Performance Analysis'],
      demoLink: 'https://prepalgo.com',
      githubLink: 'https://github.com/arsaikia/prep-algo',
      period: '2023 - Present',
      team: 'Solo Project'
    },
    {
      title: 'Pathfinding Visualizer',
      description: 'Interactive visualization tool for various pathfinding algorithms including Dijkstra, A*, and BFS. Features real-time algorithm execution with customizable grid and obstacles.',
      image: '🧭',
      demoImage: '/pathfinding-demo.gif',
      demoVideo: '/pathfinding-demo.mp4',
      technologies: ['JavaScript', 'HTML5', 'CSS3', 'Canvas API'],
      features: ['Multiple Algorithms', 'Real-time Visualization', 'Customizable Grid', 'Performance Metrics'],
      demoLink: '#',
      githubLink: 'https://github.com/arsaikia/Pathfinding_Visualizer',
      period: '2022',
      team: 'Solo Project'
    },
    {
      title: 'Algorithm Visualizer',
      description: 'Educational platform for visualizing sorting and searching algorithms with step-by-step execution and performance comparisons.',
      image: '📊',
      demoImage: '/algorithm-demo.png',
      demoVideo: '/algorithm-demo.mp4',
      technologies: ['JavaScript', 'React', 'D3.js', 'CSS3'],
      features: ['Sorting Algorithms', 'Searching Algorithms', 'Step-by-step Execution', 'Performance Comparison'],
      demoLink: '#',
      githubLink: 'https://github.com/arsaikia/AlgorithmVisualizer',
      period: '2022',
      team: 'Solo Project'
    },
    {
      title: 'Human Activity Recognition',
      description: 'Machine Learning project for recognizing human activities using smartphone sensor data. Part of Udacity\'s Machine Learning Engineer Nanodegree Program.',
      image: '🤖',
      demoImage: '/ml-demo.png',
      demoVideo: '/ml-demo.mp4',
      technologies: ['Python', 'Jupyter Notebook', 'Scikit-learn', 'Pandas', 'NumPy'],
      features: ['Sensor Data Processing', 'Feature Engineering', 'Model Training', 'Activity Classification'],
      demoLink: '#',
      githubLink: 'https://github.com/arsaikia/MLND_Capstone_Human_Activity_Recognition_Using_Smartphones_Sensor_Data',
      period: '2021',
      team: 'Academic Project'
    },
    {
      title: 'EWA Term Project',
      description: 'Web application project demonstrating modern web development practices with responsive design and interactive features.',
      image: '🌐',
      demoImage: '/ewa-demo.png',
      demoVideo: '/ewa-demo.mp4',
      technologies: ['JavaScript', 'HTML5', 'CSS3', 'Web APIs'],
      features: ['Responsive Design', 'Interactive UI', 'Modern Web Standards', 'Cross-browser Compatibility'],
      demoLink: '#',
      githubLink: 'https://github.com/arsaikia/EWA_Term_Project',
      period: '2021',
      team: 'Academic Project'
    },
    {
      title: 'Hacktober-Bit_Lords',
      description: 'First-place winning hackathon project for Code Platoon\'s Hacktober 2020. Built a solution to help Illinois Joining Forces (IJF) create a more efficient way to gather resource provider data and distribute information to Illinois state Veterans.',
      image: '🏆',
      demoImage: '/hackathon-demo.png',
      demoVideo: '/hackathon-demo.mp4',
      technologies: ['JavaScript', 'Python', 'CSS', 'Backend', 'Frontend'],
      features: ['Veteran Resource Management', 'Data Distribution', 'Efficient Referrals', 'Hackathon Winner'],
      demoLink: '#',
      githubLink: 'https://github.com/arsaikia/Hacktober-Bit_Lords-',
      period: 'October 2020',
      team: 'Bit Lords Team (5 members)'
    }
  ]

  return (
    <section id="projects" className="py-20 bg-white/70 dark:bg-gray-900/70 backdrop-blur-sm">
      <div className="container-max section-padding">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Featured Projects
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
              className="group relative overflow-hidden card"
              onMouseEnter={() => !isMobile && setHoveredProject(index)}
              onMouseLeave={() => !isMobile && setHoveredProject(null)}
            >
              <div className="h-48 bg-gradient-to-br from-gray-50/80 to-blue-50/60 dark:from-blue-900/20 dark:to-purple-900/20 flex items-center justify-center relative overflow-hidden">
                {project.demoImage && (
                  <img 
                    src={project.demoImage.replace('.gif', '.png')} 
                    alt={`${project.title}`}
                    className={`w-full h-full object-cover transition-all duration-300 ${!isMobile && hoveredProject === index ? 'opacity-0 scale-95' : 'opacity-100 scale-100'}`}
                  />
                )}
                
                {!project.demoImage && (
                  <div className={`text-6xl transition-all duration-300 ${!isMobile && hoveredProject === index ? 'opacity-0 scale-75' : 'opacity-100 scale-100'}`}>
                    {project.image}
                  </div>
                )}
                
                {!isMobile && (
                  <div className={`absolute inset-0 transition-all duration-300 ${hoveredProject === index ? 'opacity-100' : 'opacity-0'}`}>
                    {project.demoImage && (
                      <img 
                        src={project.demoImage} 
                        alt={`${project.title} Demo`}
                        className="w-full h-full object-cover"
                      />
                    )}
                    
                    <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
                      <button 
                        onClick={(e) => {
                          e.stopPropagation()
                          setSelectedDemo(index)
                        }}
                        className="text-center text-white hover:scale-110 transition-transform duration-200"
                      >
                        <Play size={48} className="mx-auto mb-2 opacity-80" />
                        <p className="text-sm font-medium">View Demo</p>
                      </button>
                    </div>
                    
                    <div className="absolute top-3 right-3 flex space-x-2">
                      <button 
                        onClick={(e) => {
                          e.stopPropagation()
                          setSelectedDemo(index)
                        }}
                        className="bg-white/20 backdrop-blur-sm rounded-full p-2 hover:bg-white/30 transition-colors"
                        title="Play Demo"
                      >
                        <Play size={16} className="text-white" />
                      </button>
                    </div>
                  </div>
                )}

                {isMobile && project.demoImage && (
                  <div className="absolute inset-0 bg-black/20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <button 
                      onClick={(e) => {
                        e.stopPropagation()
                        const img = e.currentTarget.parentElement?.previousElementSibling as HTMLImageElement
                        if (img) {
                          if (img.src.includes('.png')) {
                            img.src = img.src.replace('.png', '.gif')
                          } else {
                            img.src = img.src.replace('.gif', '.png')
                          }
                        }
                      }}
                      className="text-center text-white"
                    >
                      <Play size={32} className="mx-auto mb-1 opacity-80" />
                      <p className="text-xs font-medium">Play Demo</p>
                    </button>
                  </div>
                )}
              </div>

              <div className="p-6">
                <div className="flex items-start justify-between mb-3">
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                    {project.title}
                  </h3>
                  <div className="flex space-x-2">
                    <a
                      href={project.demoLink}
                      className="p-2 text-gray-500 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                      title="Live Demo"
                    >
                      <ExternalLink size={18} />
                    </a>
                    <a
                      href={project.githubLink}
                      className="p-2 text-gray-500 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                      title="Source Code"
                    >
                      <Github size={18} />
                    </a>
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
                    alt={`${projects[selectedDemo].title} Demo`}
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
                  {projects[selectedDemo].demoLink !== '#' && (
                    <a
                      href={projects[selectedDemo].demoLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors text-sm"
                    >
                      <ExternalLink size={16} />
                      Live Demo
                    </a>
                  )}
                  <a
                    href={projects[selectedDemo].githubLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-lg transition-colors text-sm"
                  >
                    <Github size={16} />
                    View Code
                  </a>
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