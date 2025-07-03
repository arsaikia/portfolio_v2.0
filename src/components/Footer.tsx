import { Heart, ArrowUp } from 'lucide-react'

const Footer = () => {
  const currentYear = new Date().getFullYear()

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <footer className="bg-gray-900 dark:bg-gray-950 text-white py-6">
      <div className="container-max section-padding">
        <div className="flex flex-col md:flex-row justify-center md:justify-between items-center space-y-4 md:space-y-0">
          {/* Navigation Links */}
          <div className="flex space-x-6">
            {['About', 'Skills', 'Projects', 'Contact'].map((link) => (
              <button
                key={link}
                onClick={() => {
                  const element = document.getElementById(link.toLowerCase())
                  if (element) {
                    element.scrollIntoView({ behavior: 'smooth' })
                  }
                }}
                className="text-gray-400 hover:text-white transition-colors text-sm"
              >
                {link}
              </button>
            ))}
          </div>

          {/* Tech Stack Credit */}
          <div className="flex items-center space-x-2 text-gray-400 text-sm">
            <span>Made with</span>
            <Heart size={14} className="text-red-500" />
            <span>using React, TypeScript & Tailwind CSS</span>
          </div>

          {/* Copyright & Back to Top */}
          <div className="flex items-center justify-center space-x-4 w-full md:w-auto">
            <p className="text-gray-400 text-sm">
              &copy; {currentYear} Arunabh Saikia. All rights reserved.
            </p>
            
            <button
              onClick={scrollToTop}
              className="flex items-center justify-center p-2 bg-gray-800 hover:bg-gray-700 rounded-lg transition-colors group"
              title="Back to top"
            >
              <ArrowUp size={18} className="group-hover:scale-110 transition-transform" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer 