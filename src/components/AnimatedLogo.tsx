import { useState } from 'react'

interface AnimatedLogoProps {
  size?: number
  className?: string
}

const AnimatedLogo = ({ size = 64, className = '' }: AnimatedLogoProps) => {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <div 
      className={`relative cursor-pointer transition-transform duration-300 ${isHovered ? 'scale-110' : ''} ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{ width: size, height: size }}
    >
      <svg
        width={size}
        height={size}
        viewBox="0 0 100 100"
        className="drop-shadow-lg"
      >
        {/* Hexagon Background */}
        <polygon
          points="50,5 85,25 85,75 50,95 15,75 15,25"
          fill="currentColor"
          className={`text-blue-600 dark:text-blue-500 transition-all duration-500 ${
            isHovered ? 'text-blue-700 dark:text-blue-400' : ''
          }`}
          style={{
            transformOrigin: '50% 50%',
            animation: isHovered ? 'logo-spin 2s linear infinite' : 'logo-pulse 3s ease-in-out infinite'
          }}
        />
        
        {/* Inner hexagon border */}
        <polygon
          points="50,10 80,27 80,73 50,90 20,73 20,27"
          fill="none"
          stroke="rgba(255,255,255,0.3)"
          strokeWidth="1"
          className="transition-opacity duration-300"
          style={{ opacity: isHovered ? 1 : 0.5 }}
        />
        
        {/* Letter A */}
        <text
          x="50"
          y="65"
          textAnchor="middle"
          dominantBaseline="middle"
          className="fill-white font-bold text-3xl font-mono select-none"
          style={{
            fontSize: '36px',
            fontFamily: 'JetBrains Mono, monospace',
            transformOrigin: '50% 50%',
            animation: isHovered ? 'none' : 'logo-float 2s ease-in-out infinite'
          }}
        >
          A
        </text>
        
        {/* Decorative dots */}
        <circle
          cx="50"
          cy="20"
          r="2"
          fill="rgba(255,255,255,0.6)"
          className="transition-all duration-300"
          style={{
            animation: 'logo-twinkle 1.5s ease-in-out infinite',
            animationDelay: '0s'
          }}
        />
        <circle
          cx="25"
          cy="35"
          r="1.5"
          fill="rgba(255,255,255,0.4)"
          style={{
            animation: 'logo-twinkle 1.5s ease-in-out infinite',
            animationDelay: '0.5s'
          }}
        />
        <circle
          cx="75"
          cy="35"
          r="1.5"
          fill="rgba(255,255,255,0.4)"
          style={{
            animation: 'logo-twinkle 1.5s ease-in-out infinite',
            animationDelay: '1s'
          }}
        />
      </svg>
    </div>
  )
}

export default AnimatedLogo 