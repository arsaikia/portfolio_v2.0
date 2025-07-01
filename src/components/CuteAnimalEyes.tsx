import { useState, useEffect, useRef } from 'react'

interface CuteAnimalEyesProps {
  size?: number
  className?: string
}

const CuteAnimalEyes = ({ size = 60, className = '' }: CuteAnimalEyesProps) => {
  const [eyePosition, setEyePosition] = useState({ left: { x: 0, y: 0 }, right: { x: 0, y: 0 } })
  const animalRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!animalRef.current) return

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
  }, [size])

  return (
    <div 
      ref={animalRef}
      className={`animated-eyes ${className}`}
      style={{ width: size, height: size }}
    >
      <svg
        width={size}
        height={size}
        viewBox="0 0 100 100"
        className="drop-shadow-sm hover:drop-shadow-md transition-all duration-200"
      >
        {/* Bear ears */}
        <circle
          cx="25"
          cy="25"
          r="12"
          fill="#8B4513"
          className="transition-all duration-200"
        />
        <circle
          cx="75"
          cy="25"
          r="12"
          fill="#8B4513"
          className="transition-all duration-200"
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
          className="transition-all duration-200"
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

        {/* Animated left pupil */}
        <circle
          cx={38 + eyePosition.left.x}
          cy={48 + eyePosition.left.y}
          r="6"
          fill="#2D3748"
          className="transition-all duration-100 ease-out"
        >
          {/* Pupil highlight */}
          <animate
            attributeName="r"
            values="6;6.3;6"
            dur="3s"
            repeatCount="indefinite"
          />
        </circle>
        
        {/* Left eye highlight */}
        <circle
          cx={38 + eyePosition.left.x + 1.5}
          cy={48 + eyePosition.left.y - 1.5}
          r="2"
          fill="white"
          opacity="0.8"
          className="transition-all duration-100 ease-out"
        />

        {/* Animated right pupil */}
        <circle
          cx={62 + eyePosition.right.x}
          cy={48 + eyePosition.right.y}
          r="6"
          fill="#2D3748"
          className="transition-all duration-100 ease-out"
        >
          {/* Pupil highlight */}
          <animate
            attributeName="r"
            values="6;6.3;6"
            dur="3s"
            repeatCount="indefinite"
          />
        </circle>
        
        {/* Right eye highlight */}
        <circle
          cx={62 + eyePosition.right.x + 1.5}
          cy={48 + eyePosition.right.y - 1.5}
          r="2"
          fill="white"
          opacity="0.8"
          className="transition-all duration-100 ease-out"
        />

        {/* Nose */}
        <ellipse
          cx="50"
          cy="64"
          rx="3"
          ry="2"
          fill="#8B4513"
        />

        {/* Mouth */}
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

        {/* Cheek spots (optional cute detail) */}
        <circle
          cx="28"
          cy="58"
          r="2"
          fill="#F4A460"
          opacity="0.6"
        />
        <circle
          cx="72"
          cy="58"
          r="2"
          fill="#F4A460"
          opacity="0.6"
        />
      </svg>
    </div>
  )
}

export default CuteAnimalEyes 