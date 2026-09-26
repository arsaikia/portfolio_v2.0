export interface Skill {
  name: string
  level: number
}

export interface SkillCategory {
  title: string
  skills: Skill[]
}

export const skillCategories: SkillCategory[] = [
  {
    title: 'Frontend Technologies',
    skills: [
      { name: 'React/Next.js', level: 95 },
      { name: 'TypeScript', level: 90 },
      { name: 'JavaScript (ES6+)', level: 95 },
      { name: 'HTML5 & CSS3', level: 90 },
      { name: 'Tailwind CSS', level: 85 },
      { name: 'Vue.js', level: 75 },
    ]
  },
  {
    title: 'Backend Technologies',
    skills: [
      { name: 'Node.js', level: 90 },
      { name: 'Python', level: 85 },
      { name: 'PostgreSQL', level: 85 },
      { name: 'MongoDB', level: 80 },
      { name: 'Redis', level: 75 },
      { name: 'GraphQL', level: 80 },
    ]
  },
  {
    title: 'DevOps & Tools',
    skills: [
      { name: 'AWS/Azure', level: 85 },
      { name: 'Docker', level: 80 },
      { name: 'Kubernetes', level: 70 },
      { name: 'CI/CD', level: 85 },
      { name: 'Git', level: 95 },
      { name: 'Linux', level: 80 },
    ]
  },
  {
    title: 'Architecture & Leadership',
    skills: [
      { name: 'System Design', level: 90 },
      { name: 'Microservices', level: 85 },
      { name: 'Team Leadership', level: 90 },
      { name: 'Code Review', level: 95 },
      { name: 'Mentoring', level: 90 },
      { name: 'Project Management', level: 85 },
    ]
  }
]
