import { useEffect, useState, useRef } from 'react'
import Prism from 'prismjs'
import 'prismjs/components/prism-javascript'

interface Problem {
  id: string
  title: string
  difficulty: 'Easy' | 'Medium' | 'Hard'
  topic: string
  reason: string
}

const InteractiveCodeDemo = () => {
  const [phase, setPhase] = useState<'loading' | 'recommendations' | 'solving' | 'completed' | 'visit'>('loading')
  const [displayedCode, setDisplayedCode] = useState('')
  const [currentIndex, setCurrentIndex] = useState(0)
  const [selectedProblem, setSelectedProblem] = useState<Problem | null>(null)
  const [showCursor, setShowCursor] = useState(true)
  const codeContainerRef = useRef<HTMLDivElement>(null)

  const problems: Problem[] = [
    {
      id: 'two-sum',
      title: 'Two Sum',
      difficulty: 'Easy',
      topic: 'Arrays & Hashing',
      reason: '🎯 Strengthen weak area: Arrays & Hashing'
    },
    {
      id: 'valid-parentheses',
      title: 'Valid Parentheses',
      difficulty: 'Easy',
      topic: 'Stack',
      reason: '📈 Progressive difficulty in Stack problems'
    },
    {
      id: 'longest-substring',
      title: 'Longest Substring Without Repeating Characters',
      difficulty: 'Medium',
      topic: 'Sliding Window',
      reason: '🔄 Spaced repetition: Last solved 7 days ago'
    }
  ]

  const loadingCode = `// PrepAlgo: Daily Practice Session
fetch('/api/v1/recommendations/user123/daily')
  .then(response => response.json())
  .then(({ title, level, solved, streak, message }) => {
    console.log(\`🎯 \${title}\`);
    console.log(\`Level: \${level} (\${solved} solved)\`);
    console.log(\`Streak: \${streak} days 🔥\`);
    console.log(\`\\n\${message}\`);
  });`

  const getSolutionCode = (problem: Problem) => {
    if (problem.id === 'two-sum') {
      return `
// 🚀 ${problem.title} [${problem.difficulty}]

const twoSum = (nums, target) => {
  const map = new Map();
  
  for (let i = 0; i < nums.length; i++) {
    const complement = target - nums[i];
    if (map.has(complement)) {
      return [map.get(complement), i];
    }
    map.set(nums[i], i);
  }
};

console.log(twoSum([2,7,11,15], 9)); // [0,1] ✅
// Press Enter to submit...`
    } else if (problem.id === 'valid-parentheses') {
      return `
// 🚀 ${problem.title} [${problem.difficulty}]

const isValid = (s) => {
  const stack = [];
  const pairs = { '(': ')', '[': ']', '{': '}' };
  
  for (let char of s) {
    if (pairs[char]) {
      stack.push(char);
    } else {
      const last = stack.pop();
      if (pairs[last] !== char) return false;
    }
  }
  return stack.length === 0;
};

console.log(isValid("()[]{}"));  // true ✅
// Press Enter to submit...`
    } else {
      return `
// 🚀 ${problem.title} [${problem.difficulty}]

const lengthOfLongestSubstring = (s) => {
  let maxLength = 0, start = 0;
  const charMap = new Map();
  
  for (let end = 0; end < s.length; end++) {
    if (charMap.has(s[end])) {
      start = Math.max(charMap.get(s[end]) + 1, start);
    }
    charMap.set(s[end], end);
    maxLength = Math.max(maxLength, end - start + 1);
  }
  return maxLength;
};

console.log(lengthOfLongestSubstring("abcabcbb")); // 3 ✅
// Press Enter to submit...`
    }
  }

  const completedCode = `
// ✅ Solution submitted!

fetch('/api/v1/recommendations/complete', {
  method: 'POST',
  body: JSON.stringify({
    questionId: '${selectedProblem?.id}',
    timeSpent: 420
  })
});

console.log('🎉 Completed! Streak: 8 days');
console.log('📈 ${selectedProblem?.topic} → 87% mastery');
console.log('\\n🚀 Visit prepalgo.com for more!');

// Press Enter to visit platform...`

  // Typewriter effect
  useEffect(() => {
    let code = ''
    if (phase === 'loading') code = loadingCode
    else if (phase === 'solving' && selectedProblem) code = getSolutionCode(selectedProblem)
    else if (phase === 'completed') code = completedCode
    else return

    if (currentIndex < code.length) {
      const timer = setTimeout(() => {
        setDisplayedCode(code.slice(0, currentIndex + 1))
        setCurrentIndex(currentIndex + 1)
      }, 25)
      return () => clearTimeout(timer)
    }
  }, [currentIndex, phase, selectedProblem])

  // Handle keyboard events
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.key === 'Enter') {
        if (phase === 'solving') {
          setPhase('completed')
          setCurrentIndex(0)
          setDisplayedCode('')
        } else if (phase === 'completed') {
          setPhase('visit')
        }
      }
    }

    window.addEventListener('keydown', handleKeyPress)
    return () => window.removeEventListener('keydown', handleKeyPress)
  }, [phase])

  // Cursor blinking
  useEffect(() => {
    const interval = setInterval(() => {
      setShowCursor(prev => !prev)
    }, 500)
    return () => clearInterval(interval)
  }, [])

  // Auto-transition to recommendations after loading
  useEffect(() => {
    if (phase === 'loading' && currentIndex >= loadingCode.length) {
      setTimeout(() => setPhase('recommendations'), 1000)
    }
  }, [phase, currentIndex])

  // Auto-scroll to latest content during typing
  useEffect(() => {
    if (codeContainerRef.current && displayedCode) {
      // Use instant scroll for better performance during rapid typing
      codeContainerRef.current.scrollTop = codeContainerRef.current.scrollHeight
    }
  }, [displayedCode])

  // Auto-scroll when phase changes to show new interactive content
  useEffect(() => {
    if (codeContainerRef.current && (phase === 'recommendations' || phase === 'solving' || phase === 'completed')) {
      // Small delay to ensure content is rendered
      setTimeout(() => {
        if (codeContainerRef.current) {
          codeContainerRef.current.scrollTo({
            top: codeContainerRef.current.scrollHeight,
            behavior: 'smooth'
          })
        }
      }, 100)
    }
  }, [phase])

  // Auto-scroll when instructions appear after problem selection
  useEffect(() => {
    if (codeContainerRef.current && selectedProblem && (phase === 'solving' || phase === 'completed')) {
      // Delay to ensure instructions are rendered
      setTimeout(() => {
        if (codeContainerRef.current) {
          codeContainerRef.current.scrollTo({
            top: codeContainerRef.current.scrollHeight,
            behavior: 'smooth'
          })
        }
      }, 200)
    }
  }, [selectedProblem, phase])

  const handleProblemSelect = (problem: Problem) => {
    setSelectedProblem(problem)
    setPhase('solving')
    setCurrentIndex(0)
            setDisplayedCode('')
  }

  const highlightCode = (code: string) => {
    return Prism.highlight(code, Prism.languages.javascript, 'javascript')
  }

  if (phase === 'visit') {
    return (
      <div className="relative bg-white dark:bg-gray-900 rounded-lg p-4 sm:p-6 font-mono text-xs sm:text-sm border border-gray-300 dark:border-gray-700 shadow-xl overflow-hidden transition-all duration-500 ease-in-out">
        <div className="flex items-center gap-2 mb-3 sm:mb-4 pb-2 sm:pb-3 border-b border-gray-300 dark:border-gray-700">
          <div className="flex gap-2">
            <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-red-500"></div>
            <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-yellow-500"></div>
            <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-green-500"></div>
          </div>
          <span className="text-gray-600 dark:text-gray-400 text-xs ml-2 sm:ml-4">smartRecommendations.js</span>
        </div>
        
        <div className="min-h-[150px] sm:min-h-[200px] max-h-[200px] sm:max-h-[250px] flex items-center justify-center">
          <div className="text-center py-8 sm:py-12">
            <div className="text-3xl sm:text-4xl mb-3 sm:mb-4">🚀</div>
            <h3 className="text-lg sm:text-xl text-gray-900 dark:text-white mb-3 sm:mb-4">Ready to practice more?</h3>
            <p className="text-gray-600 dark:text-gray-300 mb-4 sm:mb-6 text-sm sm:text-base px-4">Experience the full PrepAlgo platform with personalized recommendations</p>
            <a
              href="https://prepalgo.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-blue-600 hover:bg-blue-700 text-white px-4 sm:px-6 py-2.5 sm:py-3 rounded-lg font-medium transition-colors text-sm sm:text-base"
            >
              Visit PrepAlgo Platform
            </a>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="relative bg-white dark:bg-gray-900 rounded-lg p-4 sm:p-6 font-mono text-xs sm:text-sm border border-gray-300 dark:border-gray-700 shadow-xl overflow-hidden transition-all duration-500 ease-in-out">
      {/* Terminal Header */}
      <div className="flex items-center gap-2 mb-3 sm:mb-4 pb-2 sm:pb-3 border-b border-gray-300 dark:border-gray-700">
        <div className="flex gap-2">
          <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-red-500"></div>
          <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-yellow-500"></div>
          <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-green-500"></div>
        </div>
        <span className="text-gray-600 dark:text-gray-400 text-xs ml-2 sm:ml-4">smartRecommendations.js</span>
      </div>

      {/* Code Content */}
      <div ref={codeContainerRef} className="relative min-h-[150px] sm:min-h-[200px] max-h-[200px] sm:max-h-[250px] md:max-h-[280px] overflow-y-auto transition-all duration-300 ease-in-out scroll-smooth">
        <pre className="text-gray-900 dark:text-gray-100 leading-relaxed whitespace-pre-wrap text-xs sm:text-sm">
          <code 
            className="language-javascript"
            dangerouslySetInnerHTML={{ 
              __html: highlightCode(displayedCode) 
            }}
          />
          {/* Blinking Cursor */}
          <span className={`inline-block w-1.5 sm:w-2 h-4 sm:h-5 bg-blue-500 dark:bg-blue-400 ml-1 ${
            showCursor ? 'opacity-100' : 'opacity-0'
          } transition-opacity`}></span>
        </pre>

        {/* Interactive Problem Selection */}
        {phase === 'recommendations' && (
          <div className="mt-4 sm:mt-6 space-y-2 sm:space-y-3 transition-all duration-300 ease-in-out">
            <div className="text-blue-600 dark:text-blue-400 mb-2 sm:mb-3 text-xs sm:text-sm">📝 Select a problem to start:</div>
            {problems.map((problem, index) => (
              <button
                key={problem.id}
                onClick={() => handleProblemSelect(problem)}
                className="w-full text-left p-2.5 sm:p-3 rounded border border-gray-300 dark:border-gray-600 hover:border-blue-500 hover:bg-gray-100 dark:hover:bg-gray-800/50 transition-all group touch-manipulation"
              >
                <div className="flex items-center justify-between flex-wrap gap-2">
                  <div className="flex items-center flex-wrap gap-2">
                    <span className="text-gray-900 dark:text-white font-medium text-xs sm:text-sm">{index + 1}. {problem.title}</span>
                    <span className={`px-1.5 sm:px-2 py-0.5 sm:py-1 rounded text-xs ${
                      problem.difficulty === 'Easy' ? 'bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300' :
                      problem.difficulty === 'Medium' ? 'bg-yellow-100 dark:bg-yellow-900 text-yellow-700 dark:text-yellow-300' :
                      'bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-300'
                    }`}>
                      {problem.difficulty}
                    </span>
                  </div>
                  <div className="text-gray-600 dark:text-gray-400 text-xs">
                    {problem.topic}
                  </div>
                </div>
                <div className="text-gray-600 dark:text-gray-400 text-xs mt-1 leading-relaxed">
                  {problem.reason}
                </div>
              </button>
            ))}
          </div>
        )}

        {/* Instructions */}
        {(phase === 'solving' || phase === 'completed') && (
          <div className="mt-3 sm:mt-4 text-gray-600 dark:text-gray-400 text-xs text-center transition-all duration-300 ease-in-out">
            Press <kbd className="bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 px-1.5 sm:px-2 py-0.5 sm:py-1 rounded text-xs">Enter</kbd> to continue
          </div>
        )}
      </div>

      {/* Subtle background effect */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-purple-500/5 to-pink-500/5 pointer-events-none"></div>
    </div>
  )
}

export default InteractiveCodeDemo 