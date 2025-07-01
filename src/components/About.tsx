import { Code, Users, Award, Briefcase } from 'lucide-react'

const About = () => {
  const achievements = [
    {
      icon: <Code className="w-6 h-6" />,
      title: '100+ Projects',
      description: 'Successfully delivered web applications ranging from startups to enterprise solutions'
    },
    {
      icon: <Users className="w-6 h-6" />,
      title: 'Team Leadership',
      description: 'Led and mentored teams of 5-10 developers across multiple projects'
    },
    {
      icon: <Award className="w-6 h-6" />,
      title: 'Technical Excellence',
      description: 'Consistently delivered high-quality, scalable solutions with 99.9% uptime'
    },
    {
      icon: <Briefcase className="w-6 h-6" />,
      title: '8+ Years Experience',
      description: 'Proven track record in full-stack development and system architecture'
    }
  ]

  return (
    <section id="about" className="py-20 bg-white/70 dark:bg-gray-900/70 backdrop-blur-sm">
      <div className="container-max section-padding">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            About Me
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Passionate software engineer with a proven track record of building scalable applications 
            and leading high-performing development teams.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
          {/* Left Column - Text Content */}
          <div className="space-y-6">
            <h3 className="text-2xl font-semibold text-gray-900 dark:text-white">
              My Journey
            </h3>
            <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
              I started my journey as a software engineer 8 years ago, driven by a passion for 
              creating digital solutions that make a real impact. Over the years, I've evolved 
              from writing my first lines of code to architecting complex systems and leading 
              engineering teams.
            </p>
            <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
              My expertise spans full-stack development, with a particular focus on modern web 
              technologies. I believe in writing clean, maintainable code and following best 
              practices that ensure long-term success of projects.
            </p>
            <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
              When I'm not coding, I enjoy mentoring junior developers, contributing to open-source 
              projects, and staying up-to-date with the latest technology trends.
            </p>
          </div>

          {/* Right Column - Image Placeholder */}
          <div className="flex justify-center">
            <div className="w-80 h-80 bg-gradient-to-br from-blue-100 to-purple-100 dark:from-blue-900 dark:to-purple-900 rounded-2xl flex items-center justify-center">
              <div className="text-6xl text-blue-500 dark:text-blue-400">
                👨‍💻
              </div>
            </div>
          </div>
        </div>

        {/* Achievements Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {achievements.map((achievement, index) => (
            <div key={index} className="card p-6 text-center hover:scale-105 transition-transform">
              <div className="flex justify-center mb-4 text-blue-600 dark:text-blue-400">
                {achievement.icon}
              </div>
              <h4 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                {achievement.title}
              </h4>
              <p className="text-gray-600 dark:text-gray-300 text-sm">
                {achievement.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default About 