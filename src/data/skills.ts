import { experience } from './experience'
import { projects } from './projects'

/**
 * Skills are evidence, not self-assessment.
 *
 * Two axes, both verifiable:
 *   - `usedAt` gives breadth. One provenance dot per role that shipped it.
 *   - `depth` gives seniority. "Architected" is reserved for things designed
 *     end to end, which is the signal a percentage bar flattens away.
 *
 * First-use year is derived from `experience.ts`, so this section cannot drift
 * from the timeline above it: correct a period there and the proof here follows.
 */
export interface Skill {
  name: string
  /** `ExperienceEntry.id`s where this shipped. Drives the provenance dots. */
  usedAt: string[]
  /**
   * How far this went. `architected` earns a badge and is deliberately rare:
   * it means designing the thing, not consuming it.
   */
  depth?: 'architected'
  /** Also shipped in a side project. See `projects.ts`. */
  inProjects?: boolean
  /** Part of the current day-to-day. */
  current?: boolean
}

export interface SkillGroup {
  title: string
  /** One line on what this group is actually for. */
  blurb: string
  skills: Skill[]
}

/* -------------------------------------------------------------------------- */
/*  Derivations. Single source of truth is experience.ts                       */
/* -------------------------------------------------------------------------- */

const startYearById = new Map(
  experience.map((entry) => [entry.id, Number.parseInt(entry.year, 10)] as const),
)

/** Earliest year any listed role was using this. `null` when unknown. */
export const firstUsedYear = (skill: Skill): number | null => {
  const years = skill.usedAt
    .map((id) => startYearById.get(id))
    .filter((year): year is number => Number.isFinite(year))
  return years.length > 0 ? Math.min(...years) : null
}

/** Work entries referenced by the registry, newest role first. */
export const skillCompanyIds = experience
  .filter((entry) => entry.type === 'work')
  .map((entry) => entry.id)

export const companyNameById = new Map(experience.map((entry) => [entry.id, entry.company] as const))

/** Side projects shipping this skill, for the screen-reader proof line. */
export const projectCountFor = (skill: Skill): number =>
  projects.filter((project) =>
    project.technologies.some((tech) => tech.toLowerCase() === skill.name.toLowerCase()),
  ).length

/* -------------------------------------------------------------------------- */
/*  The registry                                                               */
/*                                                                             */
/*  Deliberately short. A senior profile is judged on what someone owns, not    */
/*  on list length, so this keeps the load-bearing skills and drops the rest:   */
/*  table stakes (Git, HTML), things implied by something stronger already      */
/*  listed (JavaScript under TypeScript, Jenkins under CI/CD) and one-off       */
/*  libraries. Everything here is traceable to `experience.ts` or `projects.ts`.*/
/* -------------------------------------------------------------------------- */

export const skillGroups: SkillGroup[] = [
  {
    title: 'Product engineering',
    blurb: 'Features people rely on, built to be trusted.',
    skills: [
      {
        name: 'Content credentials & indemnification',
        usedAt: ['adobe'],
        depth: 'architected',
        current: true,
      },
      { name: 'Payments & checkout', usedAt: ['adobe'], depth: 'architected', current: true },
      { name: 'Authentication & OAuth', usedAt: ['adobe'], current: true },
      { name: 'Experimentation & feature flags', usedAt: ['adobe'], current: true },
      { name: 'Internationalization', usedAt: ['adobe'], current: true },
    ],
  },
  {
    title: 'Frontend at scale',
    blurb: 'Interfaces other teams build on top of.',
    skills: [
      { name: 'React', usedAt: ['adobe', 'manifesthq', 'ibm'], inProjects: true, current: true },
      { name: 'TypeScript', usedAt: ['adobe', 'manifesthq'], current: true },
      {
        name: 'Design systems',
        usedAt: ['adobe', 'manifesthq'],
        depth: 'architected',
        current: true,
      },
      { name: 'Adobe Spectrum', usedAt: ['adobe'], current: true },
      { name: 'Accessibility', usedAt: ['adobe', 'manifesthq'], current: true },
      { name: 'Automated testing', usedAt: ['adobe', 'manifesthq'], current: true },
    ],
  },
  {
    title: 'Backend & platform',
    blurb: 'The services and pipelines behind the pixels.',
    skills: [
      { name: 'GraphQL', usedAt: ['adobe'], depth: 'architected', current: true },
      { name: 'Microservices', usedAt: ['adobe', 'ibm'], depth: 'architected', current: true },
      { name: 'Node.js', usedAt: ['adobe', 'manifesthq', 'ibm'], inProjects: true, current: true },
      { name: 'PostgreSQL', usedAt: ['adobe'], current: true },
      { name: 'Docker & CI/CD', usedAt: ['adobe', 'manifesthq'], current: true },
      { name: 'Observability', usedAt: ['adobe'], current: true },
    ],
  },
  {
    title: 'Technical leadership',
    blurb: 'The part that scales past my own keyboard.',
    skills: [
      {
        name: 'Cross-org technical direction',
        usedAt: ['adobe'],
        depth: 'architected',
        current: true,
      },
      { name: 'System design', usedAt: ['adobe', 'ibm'], depth: 'architected', current: true },
      { name: 'Design docs & RFCs', usedAt: ['adobe'], depth: 'architected', current: true },
      { name: 'On-call & incident response', usedAt: ['adobe'], current: true },
      { name: 'Mentoring', usedAt: ['udacity'] },
      { name: 'Interviewing & hiring', usedAt: ['adobe'], current: true },
    ],
  },
]

/* -------------------------------------------------------------------------- */
/*  Headline stats, all computed so nothing has to be kept in sync by hand     */
/* -------------------------------------------------------------------------- */

const allSkills = skillGroups.flatMap((group) => group.skills)

export const totalSkillCount = allSkills.length

export const architectedCount = allSkills.filter((skill) => skill.depth === 'architected').length

/** Earliest start year across every role, for the "shipping since" line. */
export const shippingSince = Math.min(
  ...experience
    .filter((entry) => entry.type === 'work')
    .map((entry) => Number.parseInt(entry.year, 10))
    .filter((year) => Number.isFinite(year)),
)
