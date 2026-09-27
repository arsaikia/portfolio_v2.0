import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import type { CSSProperties } from 'react'
import {
  Calendar,
  MapPin,
  Briefcase,
  Award,
  ChevronDown,
  TrendingUp,
  Users,
  Target,
  Code,
  DollarSign,
  Zap,
  Shield,
  Globe,
} from 'lucide-react'
import { experience } from '../data/experience'
import type { ExperienceEntry } from '../data/experience'

/* -------------------------------------------------------------------------- */
/*  Icon + logo resolution (keeps ../data/experience serialisable)             */
/* -------------------------------------------------------------------------- */

const iconMap = { TrendingUp, Users, Target, Code, DollarSign, Zap, Shield, Globe } as const
type IconName = keyof typeof iconMap

const renderIcon = (name: IconName, className = 'w-4 h-4') => {
  const Icon = iconMap[name]
  return <Icon className={className} />
}

const logoMap: Record<string, string> = {
  Adobe: '/logo_adobe.png',
  ManifestHQ: '/logo_manifest.png',
  IBM: '/logo_ibm.png',
  Udacity: '/logo_udacity.png',
  'Illinois Tech': '/logo_illinoistech.png',
}

const typeIcon = (type: ExperienceEntry['type'], className = 'w-4 h-4') =>
  type === 'education' ? <Award className={className} /> : <Briefcase className={className} />

/* -------------------------------------------------------------------------- */
/*  Accent tokens — fully-spelled class strings.                               */
/*  NOTE: the previous implementation built `text-red-${opacity}` at runtime,  */
/*  which Tailwind cannot statically extract, so those classes never existed.  */
/* -------------------------------------------------------------------------- */

const accentStyles = {
  red: {
    hex: '#ef4444',
    text: 'text-red-600 dark:text-red-400',
    dot: 'bg-red-500',
    soft: 'bg-red-50 dark:bg-red-950/40',
    gradient: 'from-red-500 to-orange-500',
  },
  blue: {
    hex: '#3b82f6',
    text: 'text-blue-600 dark:text-blue-400',
    dot: 'bg-blue-500',
    soft: 'bg-blue-50 dark:bg-blue-950/40',
    gradient: 'from-blue-600 to-indigo-600',
  },
  purple: {
    hex: '#a855f7',
    text: 'text-purple-600 dark:text-purple-400',
    dot: 'bg-purple-500',
    soft: 'bg-purple-50 dark:bg-purple-950/40',
    gradient: 'from-purple-600 to-pink-600',
  },
  green: {
    hex: '#22c55e',
    text: 'text-green-600 dark:text-green-400',
    dot: 'bg-green-500',
    soft: 'bg-green-50 dark:bg-green-950/40',
    gradient: 'from-green-500 to-emerald-500',
  },
  amber: {
    hex: '#f59e0b',
    text: 'text-amber-600 dark:text-amber-400',
    dot: 'bg-amber-500',
    soft: 'bg-amber-50 dark:bg-amber-950/40',
    gradient: 'from-amber-500 to-orange-500',
  },
} as const

type AccentKey = keyof typeof accentStyles
const getAccent = (accent: string) => accentStyles[accent as AccentKey] ?? accentStyles.blue

/* -------------------------------------------------------------------------- */
/*  Motion primitives                                                          */
/* -------------------------------------------------------------------------- */

/** Expo-out: fast start, long soft settle. Used for entrances. */
const EASE_ENTRANCE = 'cubic-bezier(0.22, 1, 0.36, 1)'
/** Standard material-ish curve. Used for state changes / cross-fades. */
const EASE_STATE = 'cubic-bezier(0.4, 0, 0.2, 1)'

/** Space taken by the fixed site header (64px) + sticky "Experience" bar. */
const STICKY_OFFSET = 128
/** Focal line (fraction of viewport height) that picks the active card. */
const FOCAL = 0.55

const prefersReducedMotion = () =>
  typeof window !== 'undefined' &&
  typeof window.matchMedia === 'function' &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches

const useReducedMotion = () => {
  const [reduced, setReduced] = useState(prefersReducedMotion)

  useEffect(() => {
    if (typeof window === 'undefined' || typeof window.matchMedia !== 'function') return
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    const update = () => setReduced(mq.matches)
    update()
    mq.addEventListener('change', update)
    return () => mq.removeEventListener('change', update)
  }, [])

  return reduced
}

const useIsMobile = () => {
  const [isMobile, setIsMobile] = useState(
    () => typeof window !== 'undefined' && window.innerWidth < 768
  )

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768)
    check()
    window.addEventListener('resize', check)
    return () => window.removeEventListener('resize', check)
  }, [])

  return isMobile
}

/* -------------------------------------------------------------------------- */
/*  Metric count-up                                                            */
/* -------------------------------------------------------------------------- */

interface ParsedMetric {
  prefix: string
  value: number
  suffix: string
  decimals: number
}

const parseMetric = (raw: string): ParsedMetric | null => {
  const match = raw.match(/^([^0-9.]*)([0-9]*\.?[0-9]+)(.*)$/)
  if (!match) return null
  const [, prefix, digits, suffix] = match
  return {
    prefix,
    value: Number.parseFloat(digits),
    suffix,
    decimals: (digits.split('.')[1] ?? '').length,
  }
}

interface CountUpMetricProps {
  raw: string
  active: boolean
  reduced: boolean
}

/** Animates a metric string ("$1.5M", "+18%", "500+") once, when it scrolls in. */
const CountUpMetric = ({ raw, active, reduced }: CountUpMetricProps) => {
  const parsed = useMemo(() => parseMetric(raw), [raw])
  const [display, setDisplay] = useState(0)
  const startedRef = useRef(false)

  useEffect(() => {
    if (!parsed || !active || startedRef.current) return

    if (reduced) {
      startedRef.current = true
      setDisplay(parsed.value)
      return
    }

    startedRef.current = true
    let finished = false
    let raf = 0
    const duration = 900
    const start = performance.now()

    const tick = (now: number) => {
      const t = Math.min((now - start) / duration, 1)
      const eased = 1 - Math.pow(1 - t, 3)
      setDisplay(parsed.value * eased)
      if (t < 1) {
        raf = requestAnimationFrame(tick)
      } else {
        finished = true
      }
    }

    raf = requestAnimationFrame(tick)

    return () => {
      cancelAnimationFrame(raf)
      // Allow a retry if the effect was torn down mid-flight (e.g. StrictMode).
      if (!finished) startedRef.current = false
    }
  }, [parsed, active, reduced])

  if (!parsed) return <>{raw}</>

  return (
    <>
      {parsed.prefix}
      {display.toFixed(parsed.decimals)}
      {parsed.suffix}
    </>
  )
}

/* -------------------------------------------------------------------------- */
/*  Sticky company rail (desktop)                                              */
/* -------------------------------------------------------------------------- */

interface CompanyRailProps {
  items: ExperienceEntry[]
  activeIndex: number
  progress: number
  reduced: boolean
  onSelect: (index: number) => void
}

const CompanyRail = ({ items, activeIndex, progress, reduced, onSelect }: CompanyRailProps) => {
  const duration = reduced ? 0 : 520
  const railRef = useRef<HTMLDivElement>(null)
  const [top, setTop] = useState(STICKY_OFFSET)

  /* Keep the rail vertically centred in the space below the sticky bars */
  useEffect(() => {
    const el = railRef.current
    if (!el) return
    const update = () => {
      const free = window.innerHeight - STICKY_OFFSET
      setTop(STICKY_OFFSET + Math.max(0, (free - el.offsetHeight) / 2))
    }
    update()
    window.addEventListener('resize', update)
    const ro = typeof ResizeObserver !== 'undefined' ? new ResizeObserver(update) : null
    ro?.observe(el)
    return () => {
      window.removeEventListener('resize', update)
      ro?.disconnect()
    }
  }, [])

  return (
    <div ref={railRef} className="sticky self-start" style={{ top }}>
      {/* Cross-fading company panel. Panels share one grid cell so the rail
          sizes itself to the tallest entry — no magic height, no layout shift. */}
      <div className="grid">
        {items.map((item, index) => {
          const accent = getAccent(item.accent)
          const isActive = index === activeIndex

          return (
            <div
              key={item.id}
              aria-hidden={!isActive}
              className="col-start-1 row-start-1"
              style={{
                opacity: isActive ? 1 : 0,
                transform: isActive ? 'translateY(0) scale(1)' : 'translateY(10px) scale(0.985)',
                pointerEvents: isActive ? 'auto' : 'none',
                transitionProperty: 'opacity, transform',
                transitionDuration: `${duration}ms`,
                transitionTimingFunction: EASE_STATE,
                willChange: 'opacity, transform',
              }}
            >
              <div className="flex items-center gap-3 mb-4">
                {logoMap[item.company] ? (
                  <img
                    src={logoMap[item.company]}
                    alt=""
                    aria-hidden="true"
                    className="w-11 h-11 object-contain"
                    loading="lazy"
                    decoding="async"
                  />
                ) : (
                  <div
                    className={`w-11 h-11 rounded-xl bg-gradient-to-r ${accent.gradient} flex items-center justify-center text-white shadow-sm`}
                  >
                    {typeIcon(item.type, 'w-5 h-5')}
                  </div>
                )}

                {index === 0 && (
                  <span
                    className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold ${accent.soft} ${accent.text}`}
                  >
                    <span className="relative flex h-1.5 w-1.5">
                      {!reduced && (
                        <span
                          className={`absolute inline-flex h-full w-full rounded-full ${accent.dot} opacity-60 animate-ping`}
                        />
                      )}
                      <span className={`relative inline-flex h-1.5 w-1.5 rounded-full ${accent.dot}`} />
                    </span>
                    Current
                  </span>
                )}
              </div>

              <div
                className={`text-6xl font-black leading-none tracking-tight bg-gradient-to-r ${accent.gradient} bg-clip-text text-transparent mb-3`}
              >
                {item.year}
              </div>

              <div className="text-lg font-bold text-gray-900 dark:text-white leading-snug mb-1">
                {item.company}
              </div>
              <div className="text-sm font-medium text-gray-600 dark:text-gray-300 leading-snug">
                {item.title}
              </div>

            </div>
          )
        })}
      </div>

      <RoadNav
        items={items}
        activeIndex={activeIndex}
        progress={progress}
        reduced={reduced}
        onSelect={onSelect}
      />
    </div>
  )
}

/* -------------------------------------------------------------------------- */
/*  Winding road nav: gradient trail + travelling marker                       */
/* -------------------------------------------------------------------------- */

const STOP_GAP = 76
const ROAD_W = 56
const ROAD_CX = ROAD_W / 2
/** Hand-tuned, irregular stop offsets so the road meanders instead of zig-zagging evenly. */
const STOP_OFFSETS = [-9, 7, -2, 12, -6, 4, -11]
/** Small drift between stops so each bend has a different shape. */
const WANDER = [0, 5, -4, 2, -6, 3, -2]
/** Length of the faded dotted tail after the last stop (earlier, unlisted history). */
const TAIL = 64

type Pt = { x: number; y: number }

const stopX = (i: number) => ROAD_CX + STOP_OFFSETS[i % STOP_OFFSETS.length]
const stopY = (i: number) => STOP_GAP / 2 + i * STOP_GAP

/** Catmull-Rom spline through the points, emitted as cubic Béziers. */
const smoothPath = (pts: Pt[]) => {
  if (pts.length === 0) return ''
  let d = `M ${pts[0].x} ${pts[0].y}`
  for (let i = 0; i < pts.length - 1; i++) {
    const p0 = pts[i - 1] ?? pts[i]
    const p1 = pts[i]
    const p2 = pts[i + 1]
    const p3 = pts[i + 2] ?? p2
    const c1x = p1.x + (p2.x - p0.x) / 6
    const c1y = p1.y + (p2.y - p0.y) / 6
    const c2x = p2.x - (p3.x - p1.x) / 6
    const c2y = p2.y - (p3.y - p1.y) / 6
    d += ` C ${c1x.toFixed(2)} ${c1y.toFixed(2)}, ${c2x.toFixed(2)} ${c2y.toFixed(2)}, ${p2.x} ${p2.y}`
  }
  return d
}

const roadPoints = (count: number): Pt[] => {
  const pts: Pt[] = []
  for (let i = 0; i < count; i++) {
    if (i > 0) {
      pts.push({
        x: (stopX(i - 1) + stopX(i)) / 2 + WANDER[i % WANDER.length],
        y: (stopY(i - 1) + stopY(i)) / 2,
      })
    }
    pts.push({ x: stopX(i), y: stopY(i) })
  }
  return pts
}

const buildRoad = (count: number) => smoothPath(roadPoints(count))

/** Dots continuing past the last stop and fading out, hinting at earlier, unlisted roles. */
const TAIL_DOTS = 6
const buildTail = (count: number) => {
  const last = count - 1
  const x = stopX(last)
  const y = stopY(last)
  const dx = count > 1 ? x - (stopX(last - 1) + stopX(last)) / 2 : 0
  // Cubic Bézier from the last stop drifting back toward the centre
  const p1 = { x: x + dx * 0.6, y: y + TAIL * 0.4 }
  const p2 = { x: ROAD_CX, y: y + TAIL * 0.6 }
  const p3 = { x: ROAD_CX - 2, y: y + TAIL }
  return Array.from({ length: TAIL_DOTS }, (_, k) => {
    const t = (k + 1) / TAIL_DOTS
    const u = 1 - t
    return {
      x: u * u * u * x + 3 * u * u * t * p1.x + 3 * u * t * t * p2.x + t * t * t * p3.x,
      y: u * u * u * y + 3 * u * u * t * p1.y + 3 * u * t * t * p2.y + t * t * t * p3.y,
      r: 1.9 - k * 0.2,
      opacity: +(0.85 - k * 0.13).toFixed(2),
    }
  })
}

/* Travel icons (drawn pointing right, +x = direction of travel; ~14px before scaling) */
const ICON_SCALE = 1.5
const ARROW_PATH = 'M6.5 0 L-4.5 -5 L-2.2 0 L-4.5 5 Z'
const PLANE_PATH =
  'M7 0 L2 -1.3 L-1.2 -6.2 L-2.8 -6.2 L-0.8 -1.3 L-4.4 -1.1 L-5.8 -3.2 L-6.9 -3.2 L-6.1 0 L-6.9 3.2 L-5.8 3.2 L-4.4 1.1 L-0.8 1.3 L-2.8 6.2 L-1.2 6.2 L2 1.3 Z'
const FOOTPRINTS = 6
/** Fraction of a leg (either side of a stop) over which icons cross-fade. */
const SWAP_WINDOW = 0.14

type LegIcon = 'arrow' | 'plane' | 'cap'
const cityOf = (location: string) => location.split(',')[0].trim()

/** One icon per leg (items newest first): plane when the city changes, cap graduating into work, else walking. */
const legIcons = (items: ExperienceEntry[]): LegIcon[] =>
  items.slice(0, -1).map((item, i) => {
    const next = items[i + 1]
    if (cityOf(item.location) !== cityOf(next.location)) return 'plane'
    if (next.type === 'education' && item.type === 'work') return 'cap'
    return 'arrow'
  })

const smoothstep = (t: number) => t * t * (3 - 2 * t)
/** Shortest-arc angle interpolation, in degrees. */
const lerpAngle = (from: number, to: number, k: number) => from + ((((to - from + 540) % 360) + 360) % 360 - 180) * k

interface RoadNavProps {
  items: ExperienceEntry[]
  activeIndex: number
  /** Fractional stop index: 0 = first stop, items.length - 1 = last stop. */
  progress: number
  reduced: boolean
  onSelect: (index: number) => void
}

const RoadNav = ({ items, activeIndex, progress, reduced, onSelect }: RoadNavProps) => {
  const d = useMemo(() => buildRoad(items.length), [items.length])
  const tail = useMemo(() => buildTail(items.length), [items.length])
  const height = stopY(items.length - 1) + STOP_GAP / 2
  const trailRef = useRef<SVGPathElement>(null)
  const markerRef = useRef<SVGGElement>(null)
  const arrowRef = useRef<SVGGElement>(null)
  const planeRef = useRef<SVGGElement>(null)
  const capRef = useRef<SVGGElement>(null)
  const shadowRef = useRef<SVGEllipseElement>(null)
  const printsRef = useRef<SVGGElement>(null)
  const legs = useMemo(() => legIcons(items), [items])
  const stopLengths = useRef<number[]>([])
  const total = useRef(0)
  const current = useRef(progress)
  const target = useRef(progress)

  /* Cache path length at each stop (y is monotonic along the road) */
  useEffect(() => {
    const path = trailRef.current
    if (!path || typeof path.getTotalLength !== 'function') return
    const len = path.getTotalLength()
    total.current = len
    stopLengths.current = items.map((_, i) => {
      let lo = 0
      let hi = len
      for (let k = 0; k < 24; k++) {
        const m = (lo + hi) / 2
        if (path.getPointAtLength(m).y < stopY(i)) lo = m
        else hi = m
      }
      return (lo + hi) / 2
    })
  }, [d, items])

  /* Spring the marker toward the scroll target; paint via refs (no re-render) */
  useEffect(() => {
    target.current = progress
  }, [progress])

  useEffect(() => {
    const path = trailRef.current
    const marker = markerRef.current
    if (!path || !marker || typeof path.getPointAtLength !== 'function') return

    let raf = 0
    let prevLen: number | null = null
    let dir = 1
    let rot = 90
    let walk = 0
    const mix: Record<LegIcon, number> = { arrow: 1, plane: 0, cap: 0 }

    const paint = () => {
      const stops = stopLengths.current
      if (stops.length === 0 || total.current === 0) return
      const L = total.current
      const p = Math.max(0, Math.min(items.length - 1, current.current))
      const i = Math.min(Math.floor(p), items.length - 2)
      const f = p - i
      const len = items.length > 1 ? stops[i] + (stops[i + 1] - stops[i]) * f : 0
      const pt = path.getPointAtLength(len)
      path.style.strokeDashoffset = String(L - len)
      marker.setAttribute('transform', `translate(${pt.x} ${pt.y})`)
      if (legs.length === 0) return

      // Direction of travel along the road
      const ahead = path.getPointAtLength(Math.min(L, len + 1.5))
      const behind = path.getPointAtLength(Math.max(0, len - 1.5))
      const angle = (Math.atan2(ahead.y - behind.y, ahead.x - behind.x) * 180) / Math.PI
      const dl = prevLen === null ? 0 : len - prevLen
      prevLen = len
      if (Math.abs(dl) > 0.05) dir = dl > 0 ? 1 : -1
      rot = reduced ? (dir > 0 ? angle : angle + 180) : lerpAngle(rot, dir > 0 ? angle : angle + 180, 0.2)

      // Each leg holds one icon; swap only around the stops
      const nearest = Math.round(p)
      const offset = p - nearest
      const before = legs[Math.max(0, Math.min(legs.length - 1, nearest - 1))]
      const after = legs[Math.max(0, Math.min(legs.length - 1, nearest))]
      const t = Math.abs(offset) >= SWAP_WINDOW ? (offset < 0 ? 0 : 1) : (offset + SWAP_WINDOW) / (2 * SWAP_WINDOW)
      const want: Record<LegIcon, number> = { arrow: 0, plane: 0, cap: 0 }
      want[before] += 1 - smoothstep(t)
      want[after] += smoothstep(t)
      ;(Object.keys(mix) as LegIcon[]).forEach((k) => {
        mix[k] = reduced ? want[k] : mix[k] + (want[k] - mix[k]) * 0.25
      })

      const now = performance.now() / 600
      const bank = reduced ? 0 : Math.max(-1, Math.min(1, dl * 1.5)) * 8
      const lift = mix.plane * 8
      const size = (w: number) => ICON_SCALE * (0.6 + 0.4 * w)

      arrowRef.current?.setAttribute('opacity', mix.arrow.toFixed(3))
      arrowRef.current?.setAttribute('transform', `rotate(${rot}) scale(${size(mix.arrow)})`)
      planeRef.current?.setAttribute('opacity', mix.plane.toFixed(3))
      planeRef.current?.setAttribute('transform', `translate(0 ${-lift}) rotate(${rot + bank}) scale(${size(mix.plane)})`)
      capRef.current?.setAttribute('opacity', mix.cap.toFixed(3))
      capRef.current?.setAttribute(
        'transform',
        reduced
          ? `scale(${size(mix.cap)})`
          : `translate(0 ${Math.sin(now) * 0.6}) rotate(${-8 + Math.sin(now * 0.8) * 3}) scale(${size(mix.cap)})`,
      )
      shadowRef.current?.setAttribute('opacity', (0.16 * mix.plane).toFixed(3))
      shadowRef.current?.setAttribute('rx', String((5 - 2 * mix.plane) * ICON_SCALE))

      // Trail while moving: footprints behind the arrow, round puffs behind the plane / cap
      const prints = printsRef.current
      if (prints) {
        walk += ((Math.abs(dl) > 0.02 && !reduced ? 1 : 0) - walk) * 0.08
        const rad = ((angle + 90) * Math.PI) / 180
        const feet = mix.arrow
        const rx = (1.2 + 0.4 * feet).toFixed(2)
        const ry = (1.2 + 1.2 * feet).toFixed(2)
        Array.from(prints.children).forEach((el, k) => {
          const q = path.getPointAtLength(Math.max(0, Math.min(L, len - dir * (13 + k * 5))))
          const side = (k % 2 ? 1 : -1) * 2.2 * feet
          const x = q.x + Math.cos(rad) * side
          const y = q.y + Math.sin(rad) * side - lift * (1 - k / FOOTPRINTS)
          el.setAttribute('rx', rx)
          el.setAttribute('ry', ry)
          el.setAttribute('cx', x.toFixed(2))
          el.setAttribute('cy', y.toFixed(2))
          el.setAttribute('transform', `rotate(${angle + 90} ${x.toFixed(2)} ${y.toFixed(2)})`)
          el.setAttribute('opacity', ((0.5 - k * 0.075) * walk).toFixed(3))
        })
      }
    }

    const loop = () => {
      const delta = target.current - current.current
      current.current = reduced || Math.abs(delta) < 0.001 ? target.current : current.current + delta * 0.14
      paint()
      raf = requestAnimationFrame(loop)
    }

    // Wait a frame so stop lengths are measured first
    raf = requestAnimationFrame(loop)
    return () => cancelAnimationFrame(raf)
  }, [items.length, legs, reduced])

  const activeHex = getAccent(items[activeIndex]?.accent ?? 'blue').hex

  return (
    <nav className="relative mt-8" aria-label="Jump to role" style={{ height, marginBottom: TAIL - STOP_GAP / 2 }}>
      <svg
        className="absolute left-0 top-0 overflow-visible pointer-events-none"
        width={ROAD_W}
        height={height}
        aria-hidden="true"
      >

        {/* Road: faint track with a dotted centre line */}
        <path d={d} fill="none" strokeWidth={4} strokeLinecap="round" className="stroke-gray-200/50 dark:stroke-gray-700/40" />
        <path
          d={d}
          fill="none"
          strokeWidth={1}
          strokeDasharray="1 6"
          strokeLinecap="round"
          className="stroke-gray-400/35 dark:stroke-gray-500/35"
        />

        {/* Faded dotted tail: earlier history not shown */}
        <g className="fill-gray-400 dark:fill-gray-500">
          {tail.map((dot, k) => (
            <circle key={k} cx={dot.x} cy={dot.y} r={dot.r} opacity={dot.opacity} />
          ))}
        </g>

        {/* Travelled trail (dash offset driven from the rAF loop) */}
        <path
          ref={trailRef}
          d={d}
          fill="none"
          stroke={activeHex}
          strokeOpacity={0.3}
          strokeWidth={2}
          style={{ transition: reduced ? 'none' : `stroke 420ms ${EASE_STATE}` }}
          strokeLinecap="round"
          strokeDasharray="10000"
          strokeDashoffset="10000"
        />

        {/* Stops */}
        {items.map((item, i) => {
          const hex = getAccent(item.accent).hex
          const isActive = i === activeIndex
          return (
            <g key={item.id} transform={`translate(${stopX(i)} ${stopY(i)})`}>
              <circle
                r={isActive ? 7 : 0}
                fill={hex}
                opacity={0.12}
                style={{ transition: reduced ? 'none' : `r 420ms ${EASE_STATE}` }}
              />
              <circle
                r={2.75}
                strokeWidth={1.1}
                className={isActive ? '' : 'fill-gray-50 dark:fill-gray-900 stroke-gray-300 dark:stroke-gray-600'}
                style={{
                  ...(isActive ? { fill: hex, stroke: hex } : {}),
                  transition: reduced ? 'none' : `fill 320ms ${EASE_STATE}, stroke 320ms ${EASE_STATE}`,
                }}
              />
            </g>
          )
        })}

        {/* Footprints behind the walking marker */}
        <g ref={printsRef} fill={activeHex} style={{ transition: reduced ? 'none' : `fill 420ms ${EASE_STATE}` }}>
          {Array.from({ length: FOOTPRINTS }, (_, k) => (
            <ellipse key={k} rx={1.6} ry={2.4} opacity={0} />
          ))}
        </g>

        {/* Travelling marker: arrow (walking) ⇄ plane (relocation) ⇄ cap (school) */}
        <g
          ref={markerRef}
          transform={`translate(${stopX(0)} ${stopY(0)})`}
          fill={activeHex}
          style={{ transition: reduced ? 'none' : `fill 420ms ${EASE_STATE}` }}
        >
          <ellipse ref={shadowRef} rx={7.5} ry={1.8} opacity={0} className="fill-gray-900 dark:fill-black" />
          <g ref={arrowRef} transform={`rotate(90) scale(${ICON_SCALE})`}>
            <path d={ARROW_PATH} strokeWidth={1.2} strokeLinejoin="round" className="stroke-gray-50 dark:stroke-gray-900" />
          </g>
          <g ref={planeRef} opacity={0}>
            <path d={PLANE_PATH} strokeWidth={0.8} className="stroke-gray-50 dark:stroke-gray-900" />
          </g>
          <g ref={capRef} opacity={0}>
            <path d="M0 -4.5 L7.5 -1.2 L0 2.1 L-7.5 -1.2 Z" />
            <path d="M-4.2 0.4 L-4.2 3.2 Q0 5.4 4.2 3.2 L4.2 0.4 L0 2.3 Z" opacity={0.85} />
            <path d="M5.6 -0.6 L5.6 3.6" fill="none" strokeWidth={1} stroke={activeHex} />
            <circle cx={5.6} cy={4} r={0.9} />
          </g>
        </g>
      </svg>

      <ul className="relative list-none">
        {items.map((item, index) => {
          const accent = getAccent(item.accent)
          const isActive = index === activeIndex
          return (
            <li key={item.id} style={{ height: STOP_GAP }} className="flex items-center">
              <button
                type="button"
                onClick={() => onSelect(index)}
                aria-current={isActive ? 'true' : undefined}
                className="group flex items-center w-full h-full text-left rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-gray-900"
                style={{ paddingLeft: stopX(index) + 22 }}
              >
                <span className="sr-only">Jump to </span>
                <span
                  className="flex flex-col min-w-0"
                  style={{
                    transform: isActive && !reduced ? 'translateX(3px)' : 'translateX(0)',
                    transition: reduced ? 'none' : `transform 420ms ${EASE_STATE}`,
                  }}
                >
                  <span
                    className={`text-sm font-semibold truncate ${
                      isActive
                        ? accent.text
                        : 'text-gray-500 dark:text-gray-400 group-hover:text-gray-700 dark:group-hover:text-gray-300'
                    }`}
                    style={{ transition: reduced ? 'none' : `color 320ms ${EASE_STATE}` }}
                  >
                    {item.company}
                  </span>
                  <span className="text-xs text-gray-400 dark:text-gray-500 truncate">{item.period}</span>
                  <span className="text-[11px] text-gray-400/80 dark:text-gray-500/80 truncate">
                    {item.remote ? 'Remote' : cityOf(item.location)}
                  </span>
                </span>
              </button>
            </li>
          )
        })}
      </ul>
    </nav>
  )
}

/* -------------------------------------------------------------------------- */
/*  Experience card                                                            */
/* -------------------------------------------------------------------------- */

interface ExperienceCardProps {
  item: ExperienceEntry
  index: number
  isMobile: boolean
  reduced: boolean
  revealed: boolean
  isActive: boolean
  registerRef: (el: HTMLLIElement | null) => void
}

const ExperienceCard = ({
  item,
  index,
  isMobile,
  reduced,
  revealed,
  isActive,
  registerRef,
}: ExperienceCardProps) => {
  const dimmed = !isMobile && !isActive
  const accent = getAccent(item.accent)
  const [open, setOpen] = useState(false)
  const panelId = `experience-${item.id}-responsibilities`
  const headingId = `experience-${item.id}-heading`

  const revealStyle: CSSProperties | undefined = reduced
    ? undefined
    : {
        opacity: revealed ? 1 : 0,
        transform: revealed ? 'translateY(0)' : 'translateY(24px)',
        transitionProperty: 'opacity, transform',
        transitionDuration: '760ms',
        transitionDelay: `${Math.min(index, 3) * 90}ms`,
        transitionTimingFunction: EASE_ENTRANCE,
        willChange: revealed ? 'auto' : 'opacity, transform',
      }

  return (
    <li ref={registerRef} data-timeline-item={item.id} className="scroll-mt-36" style={revealStyle}>
      <article
        aria-labelledby={headingId}
        className="relative overflow-hidden rounded-2xl bg-white/90 dark:bg-gray-800/50 backdrop-blur-md border border-gray-200/60 dark:border-gray-700/60 shadow-sm hover:shadow-lg hover:!opacity-100 p-5 sm:p-6"
        style={{
          opacity: dimmed ? 0.55 : 1,
          transitionProperty: 'opacity, box-shadow',
          transitionDuration: reduced ? '0ms' : '420ms',
          transitionTimingFunction: EASE_STATE,
        }}
      >
        <div
          className={`absolute inset-x-0 top-0 h-0.5 bg-gradient-to-r ${accent.gradient}`}
          aria-hidden="true"
        />

        {/* Mobile keeps a per-card header since the sticky rail is desktop-only */}
        {isMobile && (
          <div className="flex items-start gap-3 mb-4">
            {logoMap[item.company] ? (
              <img
                src={logoMap[item.company]}
                alt=""
                aria-hidden="true"
                className="w-10 h-10 object-contain flex-shrink-0"
                loading="lazy"
                decoding="async"
              />
            ) : (
              <div
                className={`w-10 h-10 flex-shrink-0 rounded-xl bg-gradient-to-r ${accent.gradient} flex items-center justify-center text-white`}
              >
                {typeIcon(item.type)}
              </div>
            )}
            <div className="min-w-0">
              <div className={`text-xs font-bold ${accent.text} mb-0.5`}>{item.year}</div>
              <div className="text-base font-bold text-gray-900 dark:text-white leading-snug">
                {item.company}
              </div>
            </div>
          </div>
        )}

        <h3
          id={headingId}
          className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white mb-2 leading-snug"
        >
          {item.title}{' '}
          <span className={`font-semibold ${accent.text}`}>@{item.company}</span>
        </h3>

        <div className="flex flex-col sm:flex-row sm:items-center gap-1.5 sm:gap-4 text-sm text-gray-500 dark:text-gray-400 mb-4">
          <span className="flex items-center gap-1.5">
            <Calendar className="w-3 h-3 flex-shrink-0" aria-hidden="true" />
            <time className="font-medium">{item.period}</time>
          </span>
          <span className="flex items-center gap-1.5">
            <MapPin className="w-3 h-3 flex-shrink-0" aria-hidden="true" />
            <span>{item.location}</span>
          </span>
        </div>

        {item.progression && item.progression.length > 1 && (
          <ol className="flex items-start mb-5 list-none" aria-label={`Roles at ${item.company}`}>
            {item.progression.map((step, i, steps) => {
              const isLast = i === steps.length - 1
              return (
                <li key={step.year} className="relative flex-1 min-w-0 pr-3">
                  {!isLast && (
                    <span
                      className="absolute left-3 right-0 top-[4px] h-px bg-gray-200 dark:bg-gray-700"
                      aria-hidden="true"
                    />
                  )}
                  <span
                    className={`relative block w-2.5 h-2.5 rounded-full ${
                      isLast ? accent.dot : 'bg-gray-300 dark:bg-gray-600'
                    }`}
                    aria-hidden="true"
                  />
                  <span
                    className={`block mt-2 text-xs font-semibold tabular-nums ${
                      isLast ? accent.text : 'text-gray-400 dark:text-gray-500'
                    }`}
                  >
                    {step.year}
                  </span>
                  <span
                    className={`block text-xs leading-snug ${
                      isLast ? 'text-gray-900 dark:text-white font-medium' : 'text-gray-500 dark:text-gray-400'
                    }`}
                  >
                    {step.title}
                  </span>
                </li>
              )
            })}
          </ol>
        )}

        <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300 leading-relaxed mb-5">
          {item.description}
        </p>

        {/* Key impact */}
        <h4 className="text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wide mb-2">
          Key Impact
        </h4>
        <ul className="grid grid-cols-2 gap-2 mb-5">
          {item.achievements.map((achievement) => (
            <li
              key={achievement.description}
              className={`rounded-lg bg-gray-50/80 dark:bg-gray-800/40 border border-gray-200/60 dark:border-gray-700/60 p-2.5 ${
                reduced ? '' : 'transition-colors duration-300'
              } hover:border-gray-300/80 dark:hover:border-gray-600/80`}
            >
              <div className="flex items-start gap-2">
                <span
                  className={`flex-shrink-0 p-1 rounded-md bg-white dark:bg-gray-800 shadow-sm ${accent.text}`}
                  aria-hidden="true"
                >
                  {renderIcon(achievement.iconName)}
                </span>
                <span className="min-w-0">
                  <span className="block text-sm font-bold text-gray-900 dark:text-white tabular-nums">
                    <CountUpMetric raw={achievement.metric} active={revealed} reduced={reduced} />
                  </span>
                  <span className="block text-xs text-gray-600 dark:text-gray-400 leading-tight">
                    {achievement.description}
                  </span>
                </span>
              </div>
            </li>
          ))}
        </ul>

        {/* Responsibilities disclosure — grid-rows trick avoids measuring height in JS */}
        <button
          type="button"
          onClick={() => setOpen((prev) => !prev)}
          aria-expanded={open}
          aria-controls={panelId}
          className={`group inline-flex items-center gap-1.5 text-xs font-semibold ${accent.text} rounded-md mb-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-gray-800`}
        >
          {open ? 'Hide details' : `${item.type === 'education' ? 'Highlights' : 'What I did'} (${item.responsibilities.length})`}
          <ChevronDown
            className="w-3.5 h-3.5"
            aria-hidden="true"
            style={{
              transform: open ? 'rotate(180deg)' : 'rotate(0deg)',
              transitionProperty: 'transform',
              transitionDuration: reduced ? '0ms' : '320ms',
              transitionTimingFunction: EASE_STATE,
            }}
          />
        </button>

        <div
          id={panelId}
          className="grid"
          style={{
            gridTemplateRows: open ? '1fr' : '0fr',
            transitionProperty: 'grid-template-rows',
            transitionDuration: reduced ? '0ms' : '440ms',
            transitionTimingFunction: EASE_STATE,
          }}
        >
          <div className="overflow-hidden">
            <ul className="space-y-2 pt-3 pb-1">
              {item.responsibilities.map((responsibility) => (
                <li key={responsibility.text} className="flex items-start gap-2">
                  <span className={`flex-shrink-0 mt-0.5 ${accent.text}`} aria-hidden="true">
                    {renderIcon(responsibility.iconName, 'w-3.5 h-3.5')}
                  </span>
                  <span className="text-xs sm:text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
                    {responsibility.text}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Technologies */}
        {item.technologies.length > 0 && (
          <>
            <h4 className="text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wide mt-5 mb-2">
              Technologies
            </h4>
            <ul className="flex flex-wrap gap-1.5">
              {item.technologies.map((tech) => (
                <li
                  key={tech}
                  className={`px-2 py-1 text-xs font-medium rounded-md bg-gray-100/80 dark:bg-gray-800/40 text-gray-700 dark:text-gray-300 border border-gray-200/60 dark:border-gray-700/60 ${
                    reduced ? '' : 'transition-colors duration-200'
                  } hover:border-gray-300/80 dark:hover:border-gray-600/80`}
                >
                  {tech}
                </li>
              ))}
            </ul>
          </>
        )}
      </article>
    </li>
  )
}

/* -------------------------------------------------------------------------- */
/*  Timeline                                                                   */
/* -------------------------------------------------------------------------- */

const Timeline = () => {
  const timelineData = experience

  const listRef = useRef<HTMLOListElement>(null)
  const cardRefs = useRef<(HTMLLIElement | null)[]>([])

  const [activeIndex, setActiveIndex] = useState(0)
  const [revealed, setRevealed] = useState<boolean[]>(() => timelineData.map(() => false))
  const [progress, setProgress] = useState(0)

  const isMobile = useIsMobile()
  const reduced = useReducedMotion()

  const registerRef = useCallback(
    (index: number) => (el: HTMLLIElement | null) => {
      cardRefs.current[index] = el
    },
    []
  )

  /* Reveal-on-scroll (staggered via per-card transition-delay) */
  useEffect(() => {
    if (reduced) {
      setRevealed(timelineData.map(() => true))
      return
    }

    if (typeof IntersectionObserver === 'undefined') {
      setRevealed(timelineData.map(() => true))
      return
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return
          const index = cardRefs.current.indexOf(entry.target as HTMLLIElement)
          if (index === -1) return
          setRevealed((prev) => {
            if (prev[index]) return prev
            const next = [...prev]
            next[index] = true
            return next
          })
          observer.unobserve(entry.target)
        })
      },
      { threshold: 0.15, rootMargin: '0px 0px -8% 0px' }
    )

    cardRefs.current.forEach((el) => el && observer.observe(el))
    return () => observer.disconnect()
  }, [timelineData, reduced])

  /* Active card → drives the sticky rail */
  useEffect(() => {
    if (typeof IntersectionObserver === 'undefined') return

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((entry) => entry.isIntersecting)
        if (visible.length === 0) return
        const index = cardRefs.current.indexOf(visible[0].target as HTMLLIElement)
        if (index !== -1) setActiveIndex(index)
      },
      { rootMargin: `-${Math.round(FOCAL * 100)}% 0px -${Math.round((1 - FOCAL) * 100) - 1}% 0px`, threshold: 0 }
    )

    cardRefs.current.forEach((el) => el && observer.observe(el))
    return () => observer.disconnect()
  }, [timelineData])

  /* Interpolated rail progress (rAF-throttled, passive) */
  useEffect(() => {
    if (isMobile) return

    let raf = 0

    const compute = () => {
      raf = 0
      const cards = cardRefs.current
      if (cards.length === 0) return
      const focal = window.innerHeight * FOCAL
      // Each card's centre maps to its stop; interpolate between neighbours
      const centres = cards.map((c) => {
        if (!c) return 0
        const r = c.getBoundingClientRect()
        return r.top + r.height / 2
      })
      let p = 0
      if (focal >= centres[centres.length - 1]) p = centres.length - 1
      else if (focal > centres[0]) {
        const i = centres.findIndex((y, k) => k < centres.length - 1 && focal >= y && focal < centres[k + 1])
        p = i + (focal - centres[i]) / (centres[i + 1] - centres[i])
      }
      setProgress(Math.round(p * 1000) / 1000)
      // Desktop: keep the highlighted stop in lock-step with the marker
      setActiveIndex(Math.round(p))
    }

    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(compute)
    }

    compute()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)

    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
      if (raf) cancelAnimationFrame(raf)
    }
  }, [isMobile])

  const scrollToIndex = useCallback(
    (index: number) => {
      setActiveIndex(index)
      cardRefs.current[index]?.scrollIntoView({
        behavior: reduced ? 'auto' : 'smooth',
        block: 'center',
      })
    },
    [reduced]
  )

  return (
    <div className="relative">
      <div className="grid gap-8 md:grid-cols-[minmax(0,240px)_minmax(0,1fr)] md:gap-12">
        {!isMobile && (
          <CompanyRail
            items={timelineData}
            activeIndex={activeIndex}
            progress={progress}
            reduced={reduced}
            onSelect={scrollToIndex}
          />
        )}

        <ol ref={listRef} className="space-y-6 md:space-y-8 list-none">
          {timelineData.map((item, index) => (
            <ExperienceCard
              key={item.id}
              item={item}
              index={index}
              isMobile={isMobile}
              reduced={reduced}
              revealed={revealed[index] ?? false}
              isActive={index === activeIndex}
              registerRef={registerRef(index)}
            />
          ))}
        </ol>
      </div>
    </div>
  )
}

export default Timeline
