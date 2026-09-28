/**
 * One accent per career stop, keyed by `ExperienceEntry.id`.
 *
 * Shared by the timeline road and the skills grid so a colour means the same
 * company in both places: a red dot under "GraphQL" reads as Adobe because the
 * road above it is already red. Class names are fully spelled out so Tailwind
 * can extract them (this file is inside the `src/**` content glob).
 */
export type CompanyAccent = {
  /** Gradient shared by the year odometer, the card top-bar and logo fallbacks. */
  gradient: string
  /** Endpoint hexes of `gradient` — the odometer paints a slice per digit. */
  stops: [string, string]
  /** Road trail / marker colour: the gradient's dominant end. */
  hex: string
  text: string
  dot: string
  soft: string
  /** Border + text pairing for an active filter chip. */
  ring: string
}

export const companyAccents: Record<string, CompanyAccent> = {
  adobe: {
    gradient: 'from-red-500 to-orange-500',
    stops: ['#ef4444', '#f97316'],
    hex: '#f97316',
    text: 'text-red-600 dark:text-red-400',
    dot: 'bg-red-500',
    soft: 'bg-red-50 dark:bg-red-950/40',
    ring: 'border-red-400 dark:border-red-500/70',
  },
  manifesthq: {
    gradient: 'from-indigo-500 to-purple-500',
    stops: ['#6366f1', '#a855f7'],
    hex: '#8b5cf6',
    text: 'text-indigo-600 dark:text-indigo-400',
    dot: 'bg-indigo-500',
    soft: 'bg-indigo-50 dark:bg-indigo-950/40',
    ring: 'border-indigo-400 dark:border-indigo-500/70',
  },
  iit: {
    gradient: 'from-amber-500 to-rose-500',
    stops: ['#f59e0b', '#f43f5e'],
    hex: '#f43f5e',
    text: 'text-amber-600 dark:text-amber-400',
    dot: 'bg-amber-500',
    soft: 'bg-amber-50 dark:bg-amber-950/40',
    ring: 'border-amber-400 dark:border-amber-500/70',
  },
  udacity: {
    gradient: 'from-green-500 to-cyan-500',
    stops: ['#22c55e', '#06b6d4'],
    hex: '#10b981',
    text: 'text-green-600 dark:text-green-400',
    dot: 'bg-green-500',
    soft: 'bg-green-50 dark:bg-green-950/40',
    ring: 'border-green-400 dark:border-green-500/70',
  },
  ibm: {
    gradient: 'from-blue-700 to-sky-400',
    stops: ['#1d4ed8', '#38bdf8'],
    hex: '#38bdf8',
    text: 'text-blue-700 dark:text-sky-400',
    dot: 'bg-blue-600',
    soft: 'bg-blue-50 dark:bg-blue-950/40',
    ring: 'border-blue-400 dark:border-blue-500/70',
  },
}

/** Neutral fallback so an unknown id renders rather than crashing. */
export const fallbackAccent: CompanyAccent = {
  gradient: 'from-gray-400 to-gray-600',
  stops: ['#9ca3af', '#4b5563'],
  hex: '#6b7280',
  text: 'text-gray-600 dark:text-gray-400',
  dot: 'bg-gray-500',
  soft: 'bg-gray-50 dark:bg-gray-900/40',
  ring: 'border-gray-400 dark:border-gray-500/70',
}

export const accentFor = (id: string): CompanyAccent => companyAccents[id] ?? fallbackAccent
