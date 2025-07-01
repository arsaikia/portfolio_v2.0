import { ExternalLink, Github, Calendar, Users } from 'lucide-react'

const Projects = () => {
  const projects = [
    {
      title: 'E-Commerce Platform',
      description: 'Full-stack e-commerce solution with React, Node.js, and PostgreSQL. Features include user authentication, payment processing, order management, and admin dashboard.',
      image: '🛒',
      technologies: ['React', 'Node.js', 'PostgreSQL', 'Stripe', 'Redis'],
      features: ['Payment Integration', 'Real-time Updates', 'Admin Dashboard', 'Mobile Responsive'],
      demoLink: '#',
      githubLink: '#',
      period: '2023 - Present',
      team: '4 developers'
    },
    {
      title: 'Task Management SaaS',
      description: 'Collaborative task management application with real-time updates, team workspaces, and advanced project tracking capabilities.',
      image: '📋',
      technologies: ['Next.js', 'TypeScript', 'Prisma', 'WebSocket', 'AWS'],
      features: ['Real-time Collaboration', 'Team Workspaces', 'Analytics Dashboard', 'API Integration'],
      demoLink: '#',
      githubLink: '#',
      period: '2022 - 2023',
      team: '6 developers'
    },
    {
      title: 'Data Visualization Dashboard',
      description: 'Interactive dashboard for business intelligence with complex data visualizations, filtering, and export capabilities.',
      image: '📊',
      technologies: ['Vue.js', 'D3.js', 'Python', 'FastAPI', 'MongoDB'],
      features: ['Interactive Charts', 'Data Export', 'Real-time Analytics', 'Custom Filters'],
      demoLink: '#',
      githubLink: '#',
      period: '2022',
      team: '3 developers'
    },
    {
      title: 'Learning Management System',
      description: 'Comprehensive LMS with course creation, student progress tracking, video streaming, and interactive assessments.',
      image: '🎓',
      technologies: ['React', 'Express', 'MongoDB', 'AWS S3', 'Socket.io'],
      features: ['Video Streaming', 'Progress Tracking', 'Interactive Quizzes', 'Certificate Generation'],
      demoLink: '#',
      githubLink: '#',
      period: '2021 - 2022',
      team: '5 developers'
    },
    {
      title: 'IoT Monitoring System',
      description: 'Real-time IoT device monitoring system with data collection, alerting, and predictive analytics capabilities.',
      image: '🌐',
      technologies: ['React', 'Node.js', 'InfluxDB', 'MQTT', 'Docker'],
      features: ['Real-time Monitoring', 'Alert System', 'Data Analytics', 'Device Management'],
      demoLink: '#',
      githubLink: '#',
      period: '2021',
      team: '4 developers'
    },
    {
      title: 'Social Media Analytics',
      description: 'Social media analytics platform with sentiment analysis, engagement tracking, and automated reporting.',
      image: '📱',
      technologies: ['Angular', 'Python', 'TensorFlow', 'PostgreSQL', 'Celery'],
      features: ['Sentiment Analysis', 'Automated Reports', 'Engagement Metrics', 'Multi-platform Support'],
      demoLink: '#',
      githubLink: '#',
      period: '2020 - 2021',
      team: '3 developers'
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
            A showcase of my recent work spanning various domains and technologies. 
            Each project demonstrates different aspects of my technical expertise.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <div key={index} className="card overflow-hidden group hover:scale-105 transition-all duration-300">
              {/* Project Image/Icon */}
              <div className="h-48 bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 flex items-center justify-center">
                <div className="text-6xl">{project.image}</div>
              </div>

              <div className="p-6">
                {/* Project Header */}
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

                {/* Project Meta */}
                <div className="flex items-center space-x-4 text-sm text-gray-500 dark:text-gray-400 mb-3">
                  <div className="flex items-center space-x-1">
                    <Calendar size={14} />
                    <span>{project.period}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Users size={14} />
                    <span>{project.team}</span>
                  </div>
                </div>

                {/* Description */}
                <p className="text-gray-600 dark:text-gray-300 text-sm mb-4 leading-relaxed">
                  {project.description}
                </p>

                {/* Key Features */}
                <div className="mb-4">
                  <h4 className="text-sm font-semibold text-gray-900 dark:text-white mb-2">
                    Key Features:
                  </h4>
                  <div className="flex flex-wrap gap-1">
                    {project.features.map((feature, featureIndex) => (
                      <span
                        key={featureIndex}
                        className="text-xs bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300 px-2 py-1 rounded"
                      >
                        {feature}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Technologies */}
                <div>
                  <h4 className="text-sm font-semibold text-gray-900 dark:text-white mb-2">
                    Technologies:
                  </h4>
                  <div className="flex flex-wrap gap-1">
                    {project.technologies.map((tech, techIndex) => (
                      <span
                        key={techIndex}
                        className="text-xs bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 px-2 py-1 rounded"
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

        {/* Call to Action */}
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
    </section>
  )
}

export default Projects 