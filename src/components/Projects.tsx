import { ChevronDown, ExternalLink, Github, Play, Trophy, X } from 'lucide-react'
import type { ReactNode } from 'react'
import { useEffect, useRef, useState } from 'react'
import type { Project } from '../data/projects'
import { projects } from '../data/projects'

/**
 * Surface tokens shared with the timeline and skills cards so a project card
 * reads as the same material as the rest of the page.
 */
const glass =
  'rounded-2xl border border-gray-200/70 dark:border-gray-700/60 bg-gray-50/80 dark:bg-gray-900/50 backdrop-blur-md shadow-sm'
const focusRing =
  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-gray-900'

/** Indigo hairline that fades out before the card corners. */
const Hairline = () => (
  <span
    aria-hidden="true"
    className="pointer-events-none absolute inset-x-8 top-0 z-10 h-px bg-gradient-to-r from-transparent via-indigo-400/50 to-transparent dark:via-indigo-300/40"
  />
)

/** Provenance accents mirror `companyAccents.ts`: a colour always means the same source. */
const provenance = {
  udacity: { dot: 'bg-green-500', text: 'text-green-600 dark:text-green-400' },
  iit: { dot: 'bg-amber-500', text: 'text-amber-600 dark:text-amber-400' },
} as const

const ProvenanceBadge = ({ project }: { project: Project }) => {
  if (project.context) {
    const accent = provenance[project.context]
    return (
      <span className={`inline-flex items-center gap-1.5 text-xs ${accent.text}`}>
        <span className={`h-2 w-2 rounded-full ${accent.dot}`} />
        {project.contextLabel}
      </span>
    )
  }
  if (project.award) {
    return (
      <span className="inline-flex items-center gap-1 text-xs font-medium text-amber-700 dark:text-amber-400">
        <Trophy size={14} />
        {project.award}
      </span>
    )
  }
  return null
}

const LiveBadge = ({ project }: { project: Project }) =>
  project.status === 'live' ? (
    <span className="inline-flex items-center gap-1.5 text-xs font-medium text-green-700 dark:text-green-400">
      <span className="live-dot h-1.5 w-1.5 rounded-full bg-green-500" />
      Live
    </span>
  ) : null

const TechChips = ({ project, max = 4 }: { project: Project; max?: number }) => {
  const hidden = project.technologies.length - max
  return (
    <div className="flex flex-wrap gap-1.5">
      {project.technologies.slice(0, max).map((tech) => (
        <span
          key={tech}
          className="rounded-md bg-white/80 px-2 py-0.5 text-xs text-gray-600 ring-1 ring-inset ring-gray-200/80 dark:bg-gray-800/80 dark:text-gray-300 dark:ring-gray-700/60"
        >
          {tech}
        </span>
      ))}
      {hidden > 0 && (
        <span className="px-1.5 py-0.5 text-xs tabular-nums text-gray-400 dark:text-gray-500">+{hidden}</span>
      )}
    </div>
  )
}

const StatPills = ({ project, limit = 3 }: { project: Project; limit?: number }) => (
  <div className="flex flex-wrap gap-2">
    {project.stats.slice(0, limit).map((stat) => (
      <span
        key={stat}
        className="rounded-full bg-indigo-50 px-2.5 py-1 text-xs font-medium text-indigo-700 ring-1 ring-inset ring-indigo-100 dark:bg-indigo-500/10 dark:text-indigo-300 dark:ring-indigo-400/20"
      >
        {stat}
      </span>
    ))}
  </div>
)

const Links = ({ project, size = 'md' }: { project: Project; size?: 'sm' | 'md' }) => {
  const hasLive = project.demoLink !== '#'
  const iconOnly = `inline-flex h-8 w-8 items-center justify-center rounded-lg text-gray-500 transition hover:bg-white hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-white ${focusRing}`
  const pill = `inline-flex h-9 items-center gap-1.5 rounded-full px-3.5 text-sm font-medium transition ${focusRing}`

  return (
    <div className="flex items-center gap-1.5">
      {hasLive && (
        <a
          href={project.demoLink}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`${project.title} live site`}
          className={
            size === 'sm'
              ? iconOnly
              : `${pill} bg-gray-900 text-white hover:bg-gray-700 dark:bg-white dark:text-gray-900 dark:hover:bg-gray-200`
          }
        >
          <ExternalLink size={16} />
          {size === 'md' && 'Live'}
        </a>
      )}
      {project.githubLink && (
        <a
          href={project.githubLink}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`${project.title} source on GitHub`}
          className={
            size === 'sm'
              ? iconOnly
              : `${pill} bg-white/80 text-gray-700 ring-1 ring-inset ring-gray-200 hover:bg-white dark:bg-gray-800/80 dark:text-gray-200 dark:ring-gray-700 dark:hover:bg-gray-800`
          }
        >
          <Github size={16} />
          {size === 'md' && 'Code'}
        </a>
      )}
    </div>
  )
}

/** Neutral hero mesh + dotted grid + monogram, so media-less projects never fall back to emoji. */
const GeneratedCover = ({ project }: { project: Project }) => (
  <div className="relative h-full w-full overflow-hidden bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-100 dark:from-blue-950/60 dark:via-indigo-950/60 dark:to-purple-950/60">
    <div className="dotgrid absolute inset-0 text-indigo-300/50 dark:text-indigo-400/15" />
    <div className="absolute -bottom-16 -right-10 h-72 w-72 rounded-full bg-gradient-to-br from-indigo-400/30 to-purple-400/20 blur-3xl" />
    <div className="absolute inset-0 flex flex-col items-start justify-end p-6">
      <span className="bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-5xl font-extrabold tracking-tight text-transparent dark:from-blue-300 dark:via-indigo-300 dark:to-purple-300">
        {project.mono}
      </span>
      <span className="mt-2 font-mono text-xs text-gray-500 dark:text-gray-400">
        {project.technologies.slice(0, 3).join(' · ')}
      </span>
    </div>
    <div className="absolute right-4 top-4">
      <ProvenanceBadge project={project} />
    </div>
  </div>
)

/** Host + path of the best public link, shown in the frame's address bar. */
const displayUrl = (project: Project) => {
  const raw = project.demoLink && project.demoLink !== '#' ? project.demoLink : project.githubLink
  if (!raw || raw === '#') return null
  try {
    const { host, pathname } = new URL(raw)
    return `${host.replace(/^www\./, '')}${pathname === '/' ? '' : pathname}`
  } catch {
    return null
  }
}

/**
 * Shared window chrome. The three screenshots were captured from apps with very
 * different palettes, so a consistent frame is what makes them read as one set.
 */
const Frame = ({ project, children }: { project: Project; children: ReactNode }) => {
  const url = displayUrl(project)
  return (
    <div className="overflow-hidden rounded-xl border border-gray-200/80 bg-gray-100/90 shadow-sm dark:border-gray-700/60 dark:bg-gray-900/70">
      <div className="flex h-8 items-center gap-1.5 border-b border-gray-200/80 px-3 dark:border-gray-700/60">
        <span aria-hidden="true" className="h-2 w-2 rounded-full bg-gray-300 dark:bg-gray-600" />
        <span aria-hidden="true" className="h-2 w-2 rounded-full bg-gray-300 dark:bg-gray-600" />
        <span aria-hidden="true" className="h-2 w-2 rounded-full bg-gray-300 dark:bg-gray-600" />
        {url && (
          <span className="ml-2 truncate font-mono text-[10px] text-gray-400 dark:text-gray-500">{url}</span>
        )}
      </div>
      {children}
    </div>
  )
}

const Media = ({
  project,
  aspect,
  playing,
  onOpenDemo,
}: {
  project: Project
  aspect: string
  playing: boolean
  onOpenDemo: () => void
}) => {
  if (!project.demoImage) {
    return (
      <div className={`overflow-hidden rounded-xl ${aspect}`}>
        <GeneratedCover project={project} />
      </div>
    )
  }

  // Screenshots sit at reduced saturation so no single palette shouts over the
  // section, then resolve to full colour on hover or while the demo plays.
  const colorRest = playing
    ? 'saturate-100 dark:brightness-100'
    : 'saturate-[.8] group-hover:saturate-100 dark:brightness-[.88] dark:group-hover:brightness-100'

  return (
    <Frame project={project}>
      <div className={`relative overflow-hidden ${aspect}`}>
        <img
          src={project.demoImage}
          alt={`Screenshot of ${project.title}`}
          loading="lazy"
          className={`absolute inset-0 h-full w-full object-cover object-top transition duration-700 ${colorRest} ${
            playing ? 'opacity-0' : 'opacity-100 group-hover:scale-[1.03]'
          }`}
        />
        {project.demoVideo && playing && (
          <video
            src={project.demoVideo}
            autoPlay
            muted
            loop
            playsInline
            className={`absolute inset-0 h-full w-full object-cover object-top transition duration-700 ${colorRest}`}
          />
        )}
        {project.demoVideo && (
          <button
            type="button"
            onClick={onOpenDemo}
            aria-label={`Play the ${project.title} demo`}
            className={`absolute inset-0 ${focusRing}`}
          >
            <span className="absolute bottom-3 left-3 inline-flex items-center gap-1 rounded-full bg-black/55 px-2 py-1 text-[11px] font-medium text-white backdrop-blur-sm transition-opacity duration-300 group-hover:opacity-0">
              <Play size={12} fill="currentColor" />
              Preview
            </span>
          </button>
        )}
        <div className="pointer-events-none absolute inset-0 ring-1 ring-inset ring-black/5 dark:ring-white/5" />
      </div>
    </Frame>
  )
}

const Story = ({ project }: { project: Project }) => {
  const blocks: [string, string, string][] = [
    ['Problem', project.problem, 'border-[1.5px] border-gray-300 dark:border-gray-600'],
    ['What I built', project.built, 'border-[1.5px] border-indigo-400'],
    ['Outcome', project.outcome, 'bg-gradient-to-br from-blue-500 via-indigo-500 to-purple-500'],
  ]
  return (
    <div className="space-y-4">
      {blocks.map(([label, text, marker]) => (
        <div key={label} className="relative pl-5">
          <span aria-hidden="true" className={`absolute left-0 top-1.5 h-2 w-2 rotate-45 rounded-[2px] ${marker}`} />
          <h4 className="text-[11px] font-semibold uppercase tracking-wider text-gray-400 dark:text-gray-500">
            {label}
          </h4>
          <p className="mt-1 text-sm leading-relaxed text-gray-700 dark:text-gray-300">{text}</p>
        </div>
      ))}
    </div>
  )
}

const Projects = () => {
  const featured = projects.find((project) => project.tier === 'featured') ?? projects[0]
  const notable = projects.filter((project) => project.tier === 'notable')
  const archive = projects.filter((project) => project.tier === 'archive')

  const [hovered, setHovered] = useState<string | null>(null)
  const [selectedDemo, setSelectedDemo] = useState<Project | null>(null)
  const [openStory, setOpenStory] = useState<string | null>(null)
  const [isMobile, setIsMobile] = useState(false)
  const [visibleProjects, setVisibleProjects] = useState<Set<string>>(new Set())
  const cardRefs = useRef<Map<string, HTMLElement>>(new Map())

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768)
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  useEffect(() => {
    if (!isMobile) return
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const id = entry.target.getAttribute('data-project-id')
          if (!id) return
          setVisibleProjects((current) => {
            const next = new Set(current)
            if (entry.isIntersecting) next.add(id)
            else next.delete(id)
            return next
          })
        })
      },
      { threshold: 0.5 },
    )
    cardRefs.current.forEach((node) => observer.observe(node))
    return () => observer.disconnect()
  }, [isMobile])

  useEffect(() => {
    if (!selectedDemo) return
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setSelectedDemo(null)
    }
    document.addEventListener('keydown', onKeyDown)
    return () => document.removeEventListener('keydown', onKeyDown)
  }, [selectedDemo])

  const isPlaying = (project: Project) =>
    Boolean(project.demoVideo) && (isMobile ? visibleProjects.has(project.title) : hovered === project.title)

  const registerCard = (project: Project) => (node: HTMLElement | null) => {
    if (node) cardRefs.current.set(project.title, node)
    else cardRefs.current.delete(project.title)
  }

  return (
    <section
      id="projects"
      className="relative overflow-hidden border-b border-gray-200/60 bg-white py-20 dark:border-gray-800/60 dark:bg-gray-950"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-32 left-1/2 h-[24rem] w-[48rem] -translate-x-1/2 rounded-full bg-gradient-to-br from-blue-100/60 via-indigo-100/40 to-transparent blur-3xl dark:from-blue-900/20 dark:via-indigo-900/20 dark:to-transparent"
      />

      <div className="relative container-max section-padding">
        <div className="mb-12 text-center">
          <h2 className="mb-6 text-3xl font-bold text-gray-900 dark:text-white md:text-4xl">Projects</h2>
          <p className="mx-auto max-w-3xl text-base leading-relaxed text-gray-600 dark:text-gray-300 sm:text-lg">
            Things I built{' '}
            <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text font-semibold text-transparent dark:from-blue-300 dark:via-indigo-300 dark:to-purple-300">
              outside the day job
            </span>
            : a <span className="font-semibold text-gray-900 dark:text-white">live algorithm practice platform</span>,
            two visualizers, an ML classifier, and a{' '}
            <span className="font-semibold text-gray-900 dark:text-white">first-place hackathon</span> build.
          </p>
        </div>

        <div className="mx-auto max-w-6xl space-y-6">
          <article
            ref={registerCard(featured)}
            data-project-id={featured.title}
            className={`group relative overflow-hidden p-2 transition-all duration-500 hover:shadow-xl sm:p-3 ${glass}`}
            onMouseEnter={() => setHovered(featured.title)}
            onMouseLeave={() => setHovered(null)}
          >
            <Hairline />
            <div className="grid items-center gap-6 md:grid-cols-12 md:gap-10">
              <div className="md:col-span-7">
                <Media
                  project={featured}
                  aspect="aspect-[16/10]"
                  playing={isPlaying(featured)}
                  onOpenDemo={() => setSelectedDemo(featured)}
                />
              </div>
              <div className="px-4 pb-5 md:col-span-5 md:px-0 md:py-6 md:pr-6">
                <div className="flex flex-wrap items-center gap-3 text-xs text-gray-500 dark:text-gray-400">
                  <span className="font-semibold uppercase tracking-wider text-indigo-600 dark:text-indigo-300">
                    Featured
                  </span>
                  <span className="h-3 w-px bg-gray-300 dark:bg-gray-600" />
                  <LiveBadge project={featured} />
                  <span className="h-3 w-px bg-gray-300 dark:bg-gray-600" />
                  <time className="tabular-nums">{featured.period}</time>
                  <span className="hidden sm:inline">· {featured.role}</span>
                </div>
                <h3 className="mt-3 text-2xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-3xl">
                  {featured.title}
                </h3>
                <div className="mt-4">
                  <StatPills project={featured} />
                </div>
                <div className="mt-6">
                  <Story project={featured} />
                </div>
                <div className="mt-6 flex flex-wrap items-center justify-between gap-4">
                  <TechChips project={featured} max={3} />
                  <Links project={featured} />
                </div>
              </div>
            </div>
          </article>

          <div className="grid gap-6 sm:grid-cols-2">
            {notable.map((project, index) => {
              const expanded = openStory === project.title
              return (
                <article
                  key={project.title}
                  ref={registerCard(project)}
                  data-project-id={project.title}
                  className={`group relative flex flex-col overflow-hidden p-2 transition-all duration-500 hover:-translate-y-0.5 hover:shadow-xl ${glass}`}
                  onMouseEnter={() => setHovered(project.title)}
                  onMouseLeave={() => setHovered(null)}
                >
                  <Hairline />
                  <Media
                    project={project}
                    aspect="aspect-[16/9]"
                    playing={isPlaying(project)}
                    onOpenDemo={() => setSelectedDemo(project)}
                  />
                  <div className="flex flex-1 flex-col px-4 pb-4 pt-5">
                    <div className="flex items-center gap-3 text-xs text-gray-500 dark:text-gray-400">
                      <span className="font-semibold tabular-nums text-gray-400 dark:text-gray-500">
                        0{index + 2}
                      </span>
                      <span className="h-px w-6 bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500" />
                      <time className="tabular-nums">{project.period}</time>
                      <span>· {project.role}</span>
                    </div>
                    <div className="mt-3 flex items-start justify-between gap-3">
                      <h3 className="text-xl font-bold tracking-tight text-gray-900 dark:text-white">
                        {project.title}
                      </h3>
                      <Links project={project} size="sm" />
                    </div>
                    <div className="mt-3">
                      <StatPills project={project} limit={2} />
                    </div>
                    <p className="mt-4 flex-1 text-sm leading-relaxed text-gray-700 dark:text-gray-300">
                      {project.outcome}
                    </p>
                    <button
                      type="button"
                      aria-expanded={expanded}
                      onClick={() => setOpenStory(expanded ? null : project.title)}
                      className={`mt-4 inline-flex w-fit items-center gap-1.5 rounded text-xs font-semibold text-indigo-600 hover:underline dark:text-indigo-300 ${focusRing}`}
                    >
                      <ChevronDown size={14} className={`transition-transform ${expanded ? 'rotate-180' : ''}`} />
                      {expanded ? 'Hide case study' : 'View case study'}
                    </button>
                    {expanded && (
                      <div className="mt-4">
                        <Story project={project} />
                      </div>
                    )}
                    <div className="mt-5">
                      <TechChips project={project} max={3} />
                    </div>
                  </div>
                </article>
              )
            })}
          </div>

          <div className={`relative overflow-hidden ${glass}`}>
            <Hairline />
            <div className="flex items-baseline justify-between px-6 pb-2 pt-6 sm:px-7">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">More work</h3>
              <span className="text-xs tabular-nums text-gray-400 dark:text-gray-500">{archive.length}</span>
            </div>
            <ul className="divide-y divide-gray-200/70 px-6 pb-4 dark:divide-gray-700/50 sm:px-7">
              {archive.map((project) => (
                <li
                  key={project.title}
                  className="group/row grid grid-cols-[3rem_1fr_auto] items-start gap-x-4 gap-y-1 py-4 sm:grid-cols-[3.5rem_1fr_auto_auto] sm:items-center"
                >
                  <time className="pt-0.5 text-xs tabular-nums text-gray-400 dark:text-gray-500 sm:pt-0">
                    {project.year}
                  </time>
                  <div className="min-w-0">
                    <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
                      <h4 className="text-[0.95rem] font-medium text-gray-800 group-hover/row:text-gray-900 dark:text-gray-200 dark:group-hover/row:text-white">
                        {project.title}
                      </h4>
                      <ProvenanceBadge project={project} />
                    </div>
                    <p className="mt-0.5 text-sm text-gray-500 dark:text-gray-400">{project.outcome}</p>
                  </div>
                  <div className="hidden sm:block">
                    <TechChips project={project} max={2} />
                  </div>
                  <Links project={project} size="sm" />
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-10 text-center">
          <a
            href="https://github.com/arsaikia"
            target="_blank"
            rel="noopener noreferrer"
            className={`inline-flex items-center gap-2 rounded text-sm font-medium text-indigo-600 transition-colors hover:text-indigo-800 dark:text-indigo-300 dark:hover:text-indigo-200 ${focusRing}`}
          >
            <Github size={18} />
            Everything else is on GitHub →
          </a>
        </div>
      </div>

      {selectedDemo && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="project-demo-title"
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm"
          onClick={() => setSelectedDemo(null)}
        >
          <div
            className="w-full max-w-4xl overflow-hidden rounded-2xl bg-white shadow-2xl dark:bg-gray-900"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="flex items-center justify-between border-b border-gray-200 p-5 dark:border-gray-700">
              <h3 id="project-demo-title" className="text-xl font-semibold text-gray-900 dark:text-white">
                {selectedDemo.title} — Demo
              </h3>
              <button
                type="button"
                aria-label="Close demo"
                onClick={() => setSelectedDemo(null)}
                className={`rounded-lg p-2 text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-800 ${focusRing}`}
              >
                <X size={22} />
              </button>
            </div>
            <div className="p-5">
              <video
                src={selectedDemo.demoVideo}
                autoPlay
                muted
                loop
                controls
                playsInline
                className="max-h-[55vh] w-full rounded-lg bg-black object-contain"
              />
              <div className="mt-5 flex flex-wrap items-center justify-between gap-4">
                <TechChips project={selectedDemo} max={selectedDemo.technologies.length} />
                <Links project={selectedDemo} />
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  )
}

export default Projects
