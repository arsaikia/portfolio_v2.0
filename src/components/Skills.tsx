import { useEffect, useMemo, useRef, useState } from 'react'
import { Layers, Server, ShieldCheck, Users } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import { accentFor } from '../data/companyAccents'
import {
  architectedCount,
  companyNameById,
  firstUsedYear,
  projectCountFor,
  shippingSince,
  skillCompanyIds,
  skillGroups,
  totalSkillCount,
} from '../data/skills'
import type { Skill } from '../data/skills'

/**
 * Skills as proof rather than self-rating.
 *
 * Two readable axes. Provenance dots show how far a skill travelled across
 * roles, in that role's timeline colour. An "architected" badge, kept rare on
 * purpose, marks the things designed end to end. Picking a company dims the
 * rest, which turns the section into "what did he actually do at Adobe?".
 */

const ALL = 'all'

/**
 * Group glyphs. Deliberately one neutral indigo tile for every group: company
 * colours are reserved for provenance, so a tile never reads as "Adobe".
 */
const groupIcons: Record<string, LucideIcon> = {
  'Product engineering': ShieldCheck,
  'Frontend at scale': Layers,
  'Backend & platform': Server,
  'Technical leadership': Users,
}

/** Filled dot = shipped in a paid role. Ring = shipped in a side project. */
const ProvenanceDots = ({ skill }: { skill: Skill }) => (
  <span className="flex items-center gap-1" aria-hidden="true">
    {skillCompanyIds
      .filter((id) => skill.usedAt.includes(id))
      .map((id) => (
        <span key={id} className={`w-2 h-2 rounded-full ${accentFor(id).dot}`} />
      ))}
    {skill.inProjects && (
      <span className="w-2 h-2 rounded-full border-[1.5px] border-gray-400 dark:border-gray-500" />
    )}
  </span>
)

/**
 * Option A1, the leading depth marker. Every row gets one so the left edge
 * reads as a column: filled diamond = designed end to end, outline = shipped.
 */
const DepthMarker = ({ architected }: { architected: boolean }) => (
  <span aria-hidden="true" className="flex w-3 h-3 shrink-0 items-center justify-center">
    <span
      className={`w-2 h-2 rotate-45 rounded-[2px] ${
        architected
          ? 'bg-gradient-to-br from-blue-500 via-indigo-500 to-purple-500 dark:from-blue-400 dark:via-indigo-400 dark:to-purple-400 shadow-[0_0_0_3px] shadow-indigo-500/15 dark:shadow-indigo-400/20'
          : 'border-[1.5px] border-gray-300 dark:border-gray-600'
      }`}
    />
  </span>
)

/** Emphasised term in the headline sentence, borrowing the Hero gradient text. */
const Term = ({ children, accent = false }: { children: string; accent?: boolean }) => (
  <span
    className={
      accent
        ? 'font-semibold bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 dark:from-blue-300 dark:via-indigo-300 dark:to-purple-300 bg-clip-text text-transparent'
        : 'font-semibold text-gray-900 dark:text-white'
    }
  >
    {children}
  </span>
)

const Skills = () => {
  const [isVisible, setIsVisible] = useState(false)
  const [activeCompany, setActiveCompany] = useState<string>(ALL)
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const node = sectionRef.current
    if (!node) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          observer.disconnect()
        }
      },
      { threshold: 0.1 },
    )

    observer.observe(node)
    return () => observer.disconnect()
  }, [])

  /** Skills per company, so a filter chip can show what it will leave behind. */
  const countByCompany = useMemo(() => {
    const counts = new Map<string, number>()
    for (const group of skillGroups) {
      for (const skill of group.skills) {
        for (const id of skill.usedAt) {
          counts.set(id, (counts.get(id) ?? 0) + 1)
        }
      }
    }
    return counts
  }, [])

  const matches = (skill: Skill) => activeCompany === ALL || skill.usedAt.includes(activeCompany)

  const filterLabel =
    activeCompany === ALL
      ? `Showing all ${totalSkillCount} skills.`
      : `Showing ${countByCompany.get(activeCompany) ?? 0} skills used at ${
          companyNameById.get(activeCompany) ?? activeCompany
        }.`

  return (
    <section
      ref={sectionRef}
      id="skills"
      aria-labelledby="skills-heading"
      className="relative py-20 overflow-hidden bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm border-b border-gray-200/60 dark:border-gray-700/40"
    >
      {/* Soft wash in the Hero palette */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-32 left-1/2 -translate-x-1/2 w-[48rem] h-[24rem] rounded-full bg-gradient-to-br from-blue-100/60 via-indigo-100/40 to-transparent dark:from-blue-900/20 dark:via-indigo-900/20 dark:to-transparent blur-3xl"
      />

      <div className="relative container-max section-padding">
        {/* Header with the headline sentence */}
        <div
          className={`text-center mb-10 transition-all duration-700 ease-out motion-reduce:transition-none ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
          }`}
        >
          <h2
            id="skills-heading"
            className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-6"
          >
            Skills
          </h2>
          <p className="text-base sm:text-lg leading-relaxed text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            I build <Term accent>products and platforms</Term> end to end, from{' '}
            <Term>React</Term> interfaces to <Term>scalable backend systems</Term> and the tooling
            that keeps them running, and I have been shipping to production{' '}
            <Term>{`since ${shippingSince}`}</Term>.
          </p>
          <p className="mt-4 text-sm text-gray-500 dark:text-gray-400">
            Every skill is tied to a role that shipped it, and{' '}
            <span className="font-medium text-gray-700 dark:text-gray-300">
              {architectedCount} of them
            </span>{' '}
            I designed end to end.
          </p>
        </div>

        {/* Company filter: one segmented glass track, dots match the timeline road */}
        <div
          className={`flex justify-center transition-all duration-700 ease-out motion-reduce:transition-none ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
          }`}
          style={{ transitionDelay: isVisible ? '100ms' : '0ms' }}
        >
          <div
            role="group"
            aria-label="Filter skills by where I used them"
            className="flex w-max max-w-full items-center gap-1 overflow-x-auto scrollbar-none rounded-full p-1 bg-gray-100/80 dark:bg-gray-900/60 ring-1 ring-inset ring-gray-200/80 dark:ring-gray-700/60 backdrop-blur-md"
          >
            {[ALL, ...skillCompanyIds].map((id) => {
              const isAll = id === ALL
              const isActive = activeCompany === id
              const count = isAll ? totalSkillCount : (countByCompany.get(id) ?? 0)
              if (count === 0) return null
              const accent = isAll ? null : accentFor(id)

              return (
                <button
                  key={id}
                  type="button"
                  onClick={() => setActiveCompany(isActive || isAll ? ALL : id)}
                  aria-pressed={isActive}
                  className={`inline-flex shrink-0 items-center gap-2 h-9 min-h-0 min-w-0 px-3.5 rounded-full text-sm font-medium whitespace-nowrap transition-all duration-200 motion-reduce:transition-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-indigo-500 ${
                    isActive
                      ? 'bg-white dark:bg-gray-700 text-gray-900 dark:text-white shadow-sm ring-1 ring-gray-200/80 dark:ring-gray-600/60'
                      : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-white/60 dark:hover:bg-gray-800/60'
                  }`}
                >
                  {accent && (
                    <span className={`w-2 h-2 rounded-full ${accent.dot}`} aria-hidden="true" />
                  )}
                  {isAll ? 'All' : (companyNameById.get(id) ?? id)}
                  <span
                    className={`text-xs tabular-nums ${
                      isActive
                        ? (accent?.text ?? 'text-indigo-600 dark:text-indigo-300')
                        : 'text-gray-400 dark:text-gray-500'
                    }`}
                  >
                    {count}
                  </span>
                </button>
              )
            })}
          </div>
        </div>

        <p className="sr-only" aria-live="polite">
          {filterLabel}
        </p>

        {/* Legend: depth on the left of each row, provenance on the right */}
        <p className="mt-4 mb-10 flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-xs text-gray-500 dark:text-gray-400">
          <span className="inline-flex items-center gap-1.5">
            <DepthMarker architected />
            architected
          </span>
          <span className="inline-flex items-center gap-1.5">
            <DepthMarker architected={false} />
            shipped
          </span>
          <span className="h-3 w-px bg-gray-300 dark:bg-gray-600" aria-hidden="true" />
          <span className="inline-flex items-center gap-2">
            <span className="flex items-center gap-1" aria-hidden="true">
              {skillCompanyIds.slice(0, 3).map((id) => (
                <span key={id} className={`w-2 h-2 rounded-full ${accentFor(id).dot}`} />
              ))}
            </span>
            where I shipped it
          </span>
          <span className="inline-flex items-center gap-2">
            <span
              className="w-2 h-2 rounded-full border-[1.5px] border-gray-400 dark:border-gray-500"
              aria-hidden="true"
            />
            side project
          </span>
        </p>

        {/* Groups */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
          {skillGroups.map((group, groupIndex) => {
            const visibleCount = group.skills.filter(matches).length
            const Icon = groupIcons[group.title] ?? Layers

            return (
              <div
                key={group.title}
                className={`relative overflow-hidden rounded-2xl border border-gray-200/70 dark:border-gray-700/60 bg-gray-50/80 dark:bg-gray-900/50 backdrop-blur-md shadow-sm hover:shadow-lg hover:border-gray-300/80 dark:hover:border-gray-600/70 transition-all duration-500 ease-out motion-reduce:transition-none ${
                  isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                }`}
                style={{ transitionDelay: isVisible ? `${150 + groupIndex * 80}ms` : '0ms' }}
              >
                {/* Glass highlight along the top edge */}
                <span
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-x-8 top-0 h-px bg-gradient-to-r from-transparent via-indigo-400/50 to-transparent dark:via-indigo-300/40"
                />
                {/* Group header */}
                <div className="flex items-start gap-4 px-6 sm:px-7 pt-6 sm:pt-7 pb-4">
                  <span
                    aria-hidden="true"
                    className="flex w-10 h-10 shrink-0 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600 ring-1 ring-inset ring-indigo-100 dark:bg-indigo-500/10 dark:text-indigo-300 dark:ring-indigo-400/20"
                  >
                    <Icon className="w-5 h-5" strokeWidth={2} />
                  </span>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-baseline justify-between gap-3">
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                        {group.title}
                      </h3>
                      <span
                        className="shrink-0 text-xs tabular-nums text-gray-400 dark:text-gray-500"
                        aria-hidden="true"
                      >
                        {activeCompany === ALL
                          ? group.skills.length
                          : `${visibleCount} / ${group.skills.length}`}
                      </span>
                    </div>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-0.5">
                      {group.blurb}
                    </p>
                  </div>
                </div>

                <ul className="px-6 sm:px-7 pb-5 sm:pb-6 divide-y divide-gray-200/70 dark:divide-gray-700/50">
                  {group.skills.map((skill) => {
                    const year = firstUsedYear(skill)
                    const isMatch = matches(skill)
                    const roles = skill.usedAt.map((id) => companyNameById.get(id) ?? id)
                    const projectCount = skill.inProjects ? projectCountFor(skill) : 0

                    const proof = [
                      skill.depth === 'architected' ? 'Architected end to end' : null,
                      roles.length > 0 ? `used at ${roles.join(', ')}` : null,
                      projectCount > 0
                        ? `${projectCount} side project${projectCount === 1 ? '' : 's'}`
                        : skill.inProjects
                          ? 'side projects'
                          : null,
                      year ? `first shipped ${year}` : null,
                      skill.current ? 'still in use today' : null,
                    ]
                      .filter(Boolean)
                      .join('. ')

                    return (
                      <li
                        key={skill.name}
                        className={`group/row flex items-center justify-between gap-4 py-2.5 transition-opacity duration-300 motion-reduce:transition-none ${
                          isMatch ? 'opacity-100' : 'opacity-30 dark:opacity-40'
                        }`}
                      >
                        {/* Label side: depth marker, then what it is */}
                        <span className="flex items-center gap-3 min-w-0">
                          <DepthMarker architected={skill.depth === 'architected'} />
                          <span className="text-sm sm:text-[0.95rem] text-gray-700 dark:text-gray-300 font-medium group-hover/row:text-gray-900 dark:group-hover/row:text-white transition-colors">
                            {skill.name}
                          </span>
                        </span>

                        {/* Proof side: where and since when */}
                        <span className="flex items-center gap-3 shrink-0">
                          <ProvenanceDots skill={skill} />
                          <span className="text-xs text-gray-500 dark:text-gray-400 tabular-nums w-[4.5rem] text-right">
                            {year ? `since ${year}` : 'side projects'}
                          </span>
                        </span>

                        <span className="sr-only">{proof}.</span>
                      </li>
                    )
                  })}
                </ul>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

export default Skills
