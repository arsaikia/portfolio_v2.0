import { useEffect, useState } from 'react'

interface CodeTypewriterProps {
  code: string
  delay?: number
}

const CodeTypewriter = ({ code, delay = 50 }: CodeTypewriterProps) => {
  const [displayedCode, setDisplayedCode] = useState('')
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isComplete, setIsComplete] = useState(false)
  const [currentPhase, setCurrentPhase] = useState(0)

  // Split code into phases for interactive experience
  const phases = code.split('// PHASE_BREAK')

  useEffect(() => {
    const currentPhaseContent = phases[currentPhase] || ''
    
    if (currentIndex < currentPhaseContent.length) {
      const timer = setTimeout(() => {
        setDisplayedCode(currentPhaseContent.slice(0, currentIndex + 1))
        setCurrentIndex(currentIndex + 1)
      }, delay)
      
      return () => clearTimeout(timer)
    } else if (currentPhase < phases.length - 1) {
      // Move to next phase after a pause
      const timer = setTimeout(() => {
        setCurrentPhase(currentPhase + 1)
        setCurrentIndex(0)
        setDisplayedCode('')
      }, 2000) // 2 second pause between phases
      
      return () => clearTimeout(timer)
    } else {
      setIsComplete(true)
    }
  }, [currentIndex, currentPhase, phases, delay])

  // Syntax highlighting for JavaScript/TypeScript
  const highlightCode = (code: string) => {
    return code
      .replace(/(const|let|var|function|return|if|else|for|while|class|export|import|from|interface|type|await|async)/g, 
        '<span class="text-purple-400">$1</span>')
      .replace(/(['"`])((?:(?!\1)[^\\]|\\.)*)(\1)/g, 
        '<span class="text-green-400">$1$2$3</span>')
      .replace(/(\d+)/g, 
        '<span class="text-blue-400">$1</span>')
      .replace(/(\/\/.*)/g, 
        '<span class="text-gray-400">$1</span>')
      .replace(/(console\.log|fetch|JSON\.stringify|map\.has|map\.get|map\.set)(?=\()/g, 
        '<span class="text-yellow-400">$1</span>')
      .replace(/(\w+)(?=\()/g, 
        '<span class="text-yellow-300">$1</span>')
  }

  return (
    <div className="relative bg-gray-900 rounded-lg p-6 font-mono text-sm border border-gray-700 shadow-xl overflow-hidden">
      {/* Terminal Header */}
      <div className="flex items-center gap-2 mb-4 pb-3 border-b border-gray-700">
        <div className="flex gap-2">
          <div className="w-3 h-3 rounded-full bg-red-500"></div>
          <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
          <div className="w-3 h-3 rounded-full bg-green-500"></div>
        </div>
        <span className="text-gray-400 text-xs ml-4">smartRecommendations.js</span>
      </div>

      {/* Code Content */}
      <div className="relative">
        <pre className="text-gray-100 leading-relaxed">
          <code 
            dangerouslySetInnerHTML={{ 
              __html: highlightCode(displayedCode) 
            }}
          />
          {/* Blinking Cursor */}
          <span className={`inline-block w-2 h-5 bg-blue-400 ml-1 ${
            isComplete ? 'animate-pulse' : 'animate-ping'
          }`}></span>
        </pre>
      </div>

      {/* Subtle background effect */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-purple-500/5 to-pink-500/5 pointer-events-none"></div>
    </div>
  )
}

export default CodeTypewriter 