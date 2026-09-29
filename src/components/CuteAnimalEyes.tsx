import { useEffect, useId, useRef, useState } from 'react'

interface CuteAnimalEyesProps {
  size?: number
  className?: string
  isFocused?: boolean
}

type Mood = 'neutral' | 'happy' | 'yawn' | 'surprised' | 'sleepy'
type Phase = 'awake' | 'yawn' | 'sleep'
interface Particle { id: number; char: string; dx: number; delay: number }

const IDLE_MS = 6000
const YAWN_MS = 1400
const SURPRISE_MS = 700
const BOOP_MS = 350
const BOOP_RESET_MS = 1500
const TOAST_MS = 1100
const MAX_TRAVEL = 5.5

const CuteAnimalEyes = ({ size = 60, className = '', isFocused = false }: CuteAnimalEyesProps) => {
  const clipId = `bear-eyes-${useId().replace(/:/g, '')}`
  const animalRef = useRef<HTMLDivElement>(null)
  const [eyePosition, setEyePosition] = useState({ x: 0, y: 0 })
  const [lid, setLid] = useState(0)
  const [mood, setMood] = useState<Mood>('neutral')
  const [phase, setPhase] = useState<Phase>('awake')
  const [blush, setBlush] = useState(false)
  const [isHovered, setIsHovered] = useState(false)
  const [toast, setToast] = useState({ text: '', visible: false })
  const [particles, setParticles] = useState<Particle[]>([])
  const [wiggle, setWiggle] = useState(0)
  const [spin, setSpin] = useState(0)
  const setAttentiveRef = useRef<(value: boolean) => void>(() => {})
  const isAttentive = isHovered || isFocused

  useEffect(() => {
    const bear = animalRef.current
    if (!bear) return
    const motionPreference = window.matchMedia('(prefers-reduced-motion: reduce)')
    const reduced = () => motionPreference.matches
    const timers = new Map<string, number>()
    const particleTimers = new Set<number>()
    let phaseNow: Phase = 'awake'
    let attentive = false
    let reacting = false
    let boops = 0
    let particleId = 0
    let frame: number | null = null

    const later = (name: string, ms: number, fn: () => void) => {
      window.clearTimeout(timers.get(name))
      timers.set(name, window.setTimeout(fn, ms))
    }
    const toPhase = (next: Phase) => { phaseNow = next; setPhase(next) }
    const settle = () => { setLid(0); setMood(attentive ? 'happy' : 'neutral') }
    const react = (ms: number) => {
      reacting = true
      later('react', ms, () => { reacting = false; if (phaseNow === 'awake') settle() })
    }
    const armIdle = () => later('idle', IDLE_MS, doze)

    function doze() {
      if (attentive || reacting) return armIdle()
      toPhase('yawn')
      setMood('yawn')
      setLid(0.5)
      setEyePosition({ x: 0, y: 0 })
      later('yawn', YAWN_MS, () => {
        if (phaseNow !== 'yawn') return
        toPhase('sleep')
        setMood('sleepy')
        setLid(1)
      })
    }

    const wake = () => {
      if (phaseNow !== 'awake') {
        window.clearTimeout(timers.get('yawn'))
        toPhase('awake')
        setMood('surprised')
        setLid(0)
        react(SURPRISE_MS)
      }
      armIdle()
    }

    const scheduleBlink = () => later('blink', 3000 + Math.random() * 3000, () => {
      if (phaseNow === 'awake' && !reacting && !reduced()) {
        setLid(1)
        later('blinkOpen', 130, () => { if (phaseNow === 'awake' && !reacting) setLid(0) })
      }
      scheduleBlink()
    })

    const say = (text: string) => {
      setToast({ text, visible: true })
      later('toast', TOAST_MS, () => setToast(current => ({ ...current, visible: false })))
    }

    const burst = (chars: string[], count: number) => {
      if (reduced()) return
      const batch = Array.from({ length: count }, (_, i) => ({
        id: ++particleId,
        char: chars[i % chars.length],
        dx: (Math.random() - 0.5) * 50,
        delay: i * 40,
      }))
      setParticles(current => [...current, ...batch])
      const ids = new Set(batch.map(p => p.id))
      const timer = window.setTimeout(() => {
        particleTimers.delete(timer)
        setParticles(current => current.filter(p => !ids.has(p.id)))
      }, 1400)
      particleTimers.add(timer)
    }

    const boop = () => {
      if (phaseNow !== 'awake') {
        boops = 0
        wake()
        say('!')
        return
      }
      armIdle()
      boops++
      later('boopReset', BOOP_RESET_MS, () => { boops = 0; setBlush(false) })
      if (!reduced()) setWiggle(k => k + 1)
      setLid(0.6)
      setMood('happy')
      react(BOOP_MS)
      if (boops === 1) burst(['♥'], 1)
      if (boops === 3) {
        setBlush(true)
        say('hey! 🙈')
        burst(['♥', '♡'], 3)
      }
      if (boops === 7) {
        say('ok ok, back to top ↑')
        burst(['🎉', '✨', '♥', '⭐'], 8)
        if (!reduced()) setSpin(k => k + 1)
        boops = 0
      }
    }

    setAttentiveRef.current = (value: boolean) => {
      attentive = value
      if (value) {
        wake()
        if (!reacting) {
          setMood('happy')
          setEyePosition({ x: 0, y: reduced() ? 0 : 1.5 })
        }
      } else if (!reacting && phaseNow === 'awake') {
        setMood('neutral')
      }
    }

    const handleMouseMove = (e: MouseEvent) => {
      wake()
      if (phaseNow !== 'awake' || attentive || reacting || reduced()) return

      const rect = bear.getBoundingClientRect()
      if (!rect.width || !rect.height) return
      const deltaX = (e.clientX - rect.left - rect.width / 2) * 100 / rect.width
      const deltaY = (e.clientY - rect.top - rect.height / 2) * 100 / rect.height
      const distance = Math.hypot(deltaX, deltaY)
      const travel = Math.min(distance * 0.15, MAX_TRAVEL)
      const x = distance ? deltaX / distance * travel : 0
      const y = distance ? deltaY / distance * travel : 0

      if (frame !== null) cancelAnimationFrame(frame)
      frame = requestAnimationFrame(() => {
        setEyePosition({ x, y })
        frame = null
      })
    }

    const handleMotionChange = () => {
      if (!motionPreference.matches) return
      if (frame !== null) cancelAnimationFrame(frame)
      frame = null
      setEyePosition({ x: 0, y: 0 })
    }

    // Boop from the host control (e.g. the header's back-to-top button) so keyboard activation counts too.
    const clickTarget = bear.closest('button, a') ?? bear

    document.addEventListener('mousemove', handleMouseMove)
    window.addEventListener('keydown', wake)
    window.addEventListener('scroll', wake, { passive: true })
    clickTarget.addEventListener('click', boop)
    motionPreference.addEventListener('change', handleMotionChange)
    scheduleBlink()
    armIdle()

    return () => {
      document.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('keydown', wake)
      window.removeEventListener('scroll', wake)
      clickTarget.removeEventListener('click', boop)
      motionPreference.removeEventListener('change', handleMotionChange)
      timers.forEach(id => window.clearTimeout(id))
      particleTimers.forEach(id => window.clearTimeout(id))
      if (frame !== null) cancelAnimationFrame(frame)
      setAttentiveRef.current = () => {}
    }
  }, [])

  useEffect(() => {
    setAttentiveRef.current(isAttentive)
  }, [isAttentive])

  const handlePointerEnter = (event: React.PointerEvent<HTMLDivElement>) => {
    if (event.pointerType === 'touch') return
    setIsHovered(true)
  }

  const isSleeping = phase === 'sleep'
  const eyesClosed = lid >= 0.95
  const smiling = mood === 'happy' || mood === 'sleepy'
  const mouthOpen = mood === 'yawn' ? 4.5 : mood === 'surprised' ? 2.5 : 0
  const cheek = blush
    ? { fill: '#F87171', r: 4, opacity: 0.8 }
    : { fill: '#F4A460', r: 2, opacity: 0.6 }

  return (
    <div
      ref={animalRef}
      className={`animated-eyes relative ${className}`}
      data-sleeping={isSleeping}
      data-phase={phase}
      data-mood={mood}
      data-blush={blush}
      style={{ width: size, height: size }}
      onPointerEnter={handlePointerEnter}
      onPointerLeave={() => setIsHovered(false)}
      aria-hidden="true"
    >
      <svg
        width={size}
        height={size}
        viewBox="0 0 100 100"
        className="drop-shadow-sm hover:drop-shadow-md transition-all duration-300"
        style={{ overflow: 'visible' }}
      >
        <defs>
          <clipPath id={clipId}>
            <circle cx="38" cy="48" r="12" />
            <circle cx="62" cy="48" r="12" />
          </clipPath>
        </defs>
        <g key={`spin-${spin}`} className={spin ? 'bear-spin' : undefined}>
          <g key={`wiggle-${wiggle}`} className={wiggle ? 'bear-wiggle' : undefined}>
            {/* Bear ears */}
            <g className="bear-ear bear-ear-left">
              <circle cx="25" cy="25" r="12" fill="#8B4513" />
              <circle cx="25" cy="25" r="7" fill="#CD853F" />
            </g>
            <g className="bear-ear bear-ear-right">
              <circle cx="75" cy="25" r="12" fill="#8B4513" />
              <circle cx="75" cy="25" r="7" fill="#CD853F" />
            </g>

            {/* Head and muzzle */}
            <circle cx="50" cy="55" r="35" fill="#DEB887" />
            <ellipse cx="50" cy="68" rx="15" ry="12" fill="#F5DEB3" />

            {/* Eye sockets */}
            <circle cx="38" cy="48" r="12" fill="white" stroke="#E5E5E5" strokeWidth="0.5" />
            <circle cx="62" cy="48" r="12" fill="white" stroke="#E5E5E5" strokeWidth="0.5" />

            {/* Pupils and highlights */}
            <g className="transition-all duration-150 ease-out">
              <circle cx={38 + eyePosition.x} cy={48 + eyePosition.y} r="6" fill="#2D3748" className="transition-all duration-150 ease-out" />
              <circle cx={62 + eyePosition.x} cy={48 + eyePosition.y} r="6" fill="#2D3748" className="transition-all duration-150 ease-out" />
              <circle cx={39.5 + eyePosition.x} cy={46.5 + eyePosition.y} r="2" fill="white" opacity="0.8" className="transition-all duration-150 ease-out" />
              <circle cx={63.5 + eyePosition.x} cy={46.5 + eyePosition.y} r="2" fill="white" opacity="0.8" className="transition-all duration-150 ease-out" />
            </g>

            {/* Eyelids: scale down from the brow to blink, squint, yawn, or sleep */}
            <g clipPath={`url(#${clipId})`}>
              <rect className="bear-lid" x="25" y="35" width="26" height="26" fill="#DEB887" style={{ transform: `scaleY(${lid})` }} />
              <rect className="bear-lid" x="49" y="35" width="26" height="26" fill="#DEB887" style={{ transform: `scaleY(${lid})` }} />
            </g>
            <path
              d="M 28 49 Q 38 53 48 49 M 52 49 Q 62 53 72 49"
              stroke="#8B4513"
              strokeWidth="1.5"
              fill="none"
              strokeLinecap="round"
              opacity={eyesClosed ? 1 : 0}
            />

            {/* Nose */}
            <ellipse cx="50" cy="64" rx="3" ry="2" fill="#8B4513" />

            {/* Mouth */}
            <g opacity={!smiling && !mouthOpen ? 1 : 0} className="transition-all duration-300">
              <path d="M 50 68 Q 45 72 40 70" stroke="#8B4513" strokeWidth="1.5" fill="none" strokeLinecap="round" />
              <path d="M 50 68 Q 55 72 60 70" stroke="#8B4513" strokeWidth="1.5" fill="none" strokeLinecap="round" />
            </g>
            <path
              d="M 42 70 Q 50 76 58 70"
              stroke="#8B4513"
              strokeWidth="1.5"
              fill="none"
              strokeLinecap="round"
              opacity={smiling ? 1 : 0}
              className="transition-all duration-300"
            />
            <ellipse cx="50" cy="72" rx="3" ry={mouthOpen} fill="#8B4513" className="transition-all duration-200" />

            {/* Cheeks */}
            <circle cx="28" cy="58" {...cheek} className="transition-all duration-300" />
            <circle cx="72" cy="58" {...cheek} className="transition-all duration-300" />

            {/* Sleep Z's */}
            <g opacity={isSleeping ? 0.7 : 0} fill="#8B4513" fontFamily="serif" className="transition-all duration-500">
              <text x="78" y="34" fontSize="9" className="animate-pulse">z</text>
              <text x="85" y="25" fontSize="7" className="animate-pulse" style={{ animationDelay: '0.5s' }}>z</text>
              <text x="90" y="17" fontSize="5" className="animate-pulse" style={{ animationDelay: '1s' }}>z</text>
            </g>
          </g>
        </g>
      </svg>

      {particles.map(p => (
        <span
          key={p.id}
          className="bear-particle"
          style={{ '--dx': `${p.dx}px`, animationDelay: `${p.delay}ms` } as React.CSSProperties}
        >
          {p.char}
        </span>
      ))}
      <span
        className={`pointer-events-none absolute left-full top-1/2 ml-2 -translate-y-1/2 whitespace-nowrap rounded-full bg-blue-600 px-2 py-0.5 text-xs font-medium text-white shadow transition-opacity duration-200 ${toast.visible ? 'opacity-100' : 'opacity-0'}`}
      >
        {toast.text}
      </span>
    </div>
  )
}

export default CuteAnimalEyes
