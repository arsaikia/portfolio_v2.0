import { useState, useEffect, useRef } from 'react'

interface CuteAnimalEyesProps {
  size?: number
  className?: string
}

const CuteAnimalEyes = ({ size = 60, className = '' }: CuteAnimalEyesProps) => {
  const [eyePosition, setEyePosition] = useState({ left: { x: 0, y: 0 }, right: { x: 0, y: 0 } })
  const [isHovered, setIsHovered] = useState(false)
  const animalRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!animalRef.current || isHovered) return

      const rect = animalRef.current.getBoundingClientRect()
      const animalCenter = {
        x: rect.left + rect.width / 2,
        y: rect.top + rect.height / 2
      }

      // Calculate distance and angle for mouse position
      const deltaX = e.clientX - animalCenter.x
      const deltaY = e.clientY - animalCenter.y
      
      // Limit the eye movement within the eye socket
      const maxDistance = size * 0.12
      const distance = Math.min(Math.sqrt(deltaX * deltaX + deltaY * deltaY), maxDistance * 6)
      const limitedDistance = Math.min(distance * 0.2, maxDistance)
      
      const angle = Math.atan2(deltaY, deltaX)
      
      const eyeX = Math.cos(angle) * limitedDistance
      const eyeY = Math.sin(angle) * limitedDistance

      setEyePosition({
        left: { x: eyeX, y: eyeY },
        right: { x: eyeX, y: eyeY }
      })
    }

    document.addEventListener('mousemove', handleMouseMove)
    return () => document.removeEventListener('mousemove', handleMouseMove)
  }, [size, isHovered])

  const handleMouseEnter = () => {
    setIsHovered(true)
    // Center the eyes when hovering
    setEyePosition({
      left: { x: 0, y: 0 },
      right: { x: 0, y: 0 }
    })
  }

  const handleMouseLeave = () => {
    setIsHovered(false)
  }

  return (
    <div 
      ref={animalRef}
      className={`animated-eyes ${className} cursor-pointer`}
      style={{ width: size, height: size }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <svg
        width={size}
        height={size}
        viewBox="0 0 100 100"
        className="drop-shadow-sm hover:drop-shadow-md transition-all duration-300"
      >
        {/* Bear ears */}
        <circle
          cx="25"
          cy="25"
          r="12"
          fill="#8B4513"
          className="transition-all duration-300"
        />
        <circle
          cx="75"
          cy="25"
          r="12"
          fill="#8B4513"
          className="transition-all duration-300"
        />
        
        {/* Inner ears */}
        <circle
          cx="25"
          cy="25"
          r="7"
          fill="#CD853F"
        />
        <circle
          cx="75"
          cy="25"
          r="7"
          fill="#CD853F"
        />

        {/* Bear head */}
        <circle
          cx="50"
          cy="55"
          r="35"
          fill="#DEB887"
          className="transition-all duration-300"
        />
        
        {/* Bear muzzle */}
        <ellipse
          cx="50"
          cy="68"
          rx="15"
          ry="12"
          fill="#F5DEB3"
        />

        {/* Left eye socket */}
        <circle
          cx="38"
          cy="48"
          r="12"
          fill="white"
          stroke="#E5E5E5"
          strokeWidth="0.5"
        />
        
        {/* Right eye socket */}
        <circle
          cx="62"
          cy="48"
          r="12"
          fill="white"
          stroke="#E5E5E5"
          strokeWidth="0.5"
        />

        {/* Animated left pupil - hidden when hovering */}
        <circle
          cx={38 + eyePosition.left.x}
          cy={48 + eyePosition.left.y}
          r="6"
          fill="#2D3748"
          className="transition-all duration-300 ease-out"
          style={{ opacity: isHovered ? 0 : 1 }}
        >
          {/* Pupil highlight */}
          <animate
            attributeName="r"
            values="6;6.3;6"
            dur="3s"
            repeatCount="indefinite"
          />
        </circle>
        
        {/* Left eye highlight - hidden when hovering */}
        <circle
          cx={38 + eyePosition.left.x + 1.5}
          cy={48 + eyePosition.left.y - 1.5}
          r="2"
          fill="white"
          opacity={isHovered ? 0 : 0.8}
          className="transition-all duration-300 ease-out"
        />

        {/* Animated right pupil - hidden when hovering */}
        <circle
          cx={62 + eyePosition.right.x}
          cy={48 + eyePosition.right.y}
          r="6"
          fill="#2D3748"
          className="transition-all duration-300 ease-out"
          style={{ opacity: isHovered ? 0 : 1 }}
        >
          {/* Pupil highlight */}
          <animate
            attributeName="r"
            values="6;6.3;6"
            dur="3s"
            repeatCount="indefinite"
          />
        </circle>
        
        {/* Right eye highlight - hidden when hovering */}
        <circle
          cx={62 + eyePosition.right.x + 1.5}
          cy={48 + eyePosition.right.y - 1.5}
          r="2"
          fill="white"
          opacity={isHovered ? 0 : 0.8}
          className="transition-all duration-300 ease-out"
        />

        {/* Closed eyes (eyelids) - shown when hovering */}
        <ellipse
          cx="38"
          cy="48"
          rx="10"
          ry={isHovered ? "2" : "0"}
          fill="#CD853F"
          className="transition-all duration-300 ease-out"
        />
        <ellipse
          cx="62"
          cy="48"
          rx="10"
          ry={isHovered ? "2" : "0"}
          fill="#CD853F"
          className="transition-all duration-300 ease-out"
        />

        {/* Eyelashes for extra cuteness when sleeping */}
        <g opacity={isHovered ? 1 : 0} className="transition-all duration-300">
          {/* Left eyelashes */}
          <path
            d="M 30 45 L 28 42"
            stroke="#8B4513"
            strokeWidth="1"
            strokeLinecap="round"
          />
          <path
            d="M 34 43 L 32 40"
            stroke="#8B4513"
            strokeWidth="1"
            strokeLinecap="round"
          />
          <path
            d="M 42 43 L 44 40"
            stroke="#8B4513"
            strokeWidth="1"
            strokeLinecap="round"
          />
          
          {/* Right eyelashes */}
          <path
            d="M 58 43 L 56 40"
            stroke="#8B4513"
            strokeWidth="1"
            strokeLinecap="round"
          />
          <path
            d="M 66 43 L 68 40"
            stroke="#8B4513"
            strokeWidth="1"
            strokeLinecap="round"
          />
          <path
            d="M 70 45 L 72 42"
            stroke="#8B4513"
            strokeWidth="1"
            strokeLinecap="round"
          />
        </g>

        {/* Nose */}
        <ellipse
          cx="50"
          cy="64"
          rx="3"
          ry="2"
          fill="#8B4513"
        />

        {/* Mouth - changes to sleepy smile when hovering */}
        <g>
          {/* Normal mouth - hidden when hovering */}
          <g opacity={isHovered ? 0 : 1} className="transition-all duration-300">
            <path
              d="M 50 68 Q 45 72 40 70"
              stroke="#8B4513"
              strokeWidth="1.5"
              fill="none"
              strokeLinecap="round"
            />
            <path
              d="M 50 68 Q 55 72 60 70"
              stroke="#8B4513"
              strokeWidth="1.5"
              fill="none"
              strokeLinecap="round"
            />
          </g>
          
          {/* Sleepy smile - shown when hovering */}
          <path
            d="M 42 70 Q 50 74 58 70"
            stroke="#8B4513"
            strokeWidth="1.5"
            fill="none"
            strokeLinecap="round"
            opacity={isHovered ? 1 : 0}
            className="transition-all duration-300"
          />
        </g>

        {/* Cheek spots (optional cute detail) */}
        <circle
          cx="28"
          cy="58"
          r="2"
          fill="#F4A460"
          opacity={isHovered ? 0.8 : 0.6}
          className="transition-all duration-300"
        />
        <circle
          cx="72"
          cy="58"
          r="2"
          fill="#F4A460"
          opacity={isHovered ? 0.8 : 0.6}
          className="transition-all duration-300"
        />

        {/* Sleep "Z" symbols when hovering */}
        <g opacity={isHovered ? 0.7 : 0} className="transition-all duration-500 delay-300">
          <text
            x="75"
            y="35"
            fontSize="8"
            fill="#8B4513"
            fontFamily="serif"
            className="animate-pulse"
          >
            z
          </text>
          <text
            x="80"
            y="28"
            fontSize="6"
            fill="#8B4513"
            fontFamily="serif"
            className="animate-pulse"
            style={{ animationDelay: '0.5s' }}
          >
            z
          </text>
          <text
            x="85"
            y="22"
            fontSize="4"
            fill="#8B4513"
            fontFamily="serif"
            className="animate-pulse"
            style={{ animationDelay: '1s' }}
          >
            z
          </text>
        </g>
      </svg>
    </div>
  )
}

export default CuteAnimalEyes 