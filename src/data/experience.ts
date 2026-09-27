export interface AchievementData {
  metric: string
  description: string
  iconName: 'DollarSign' | 'Users' | 'Target' | 'TrendingUp' | 'Globe'
}

export interface ResponsibilityData {
  text: string
  iconName: 'Code' | 'Zap' | 'Globe' | 'Target' | 'Shield' | 'Users' | 'TrendingUp'
}

export interface ExperienceEntry {
  id: string
  title: string
  company: string
  period: string
  year: string
  location: string
  description: string
  achievements: AchievementData[]
  responsibilities: ResponsibilityData[]
  technologies: string[]
  type: 'work' | 'education'
  /** Role changes within the same company, oldest first. */
  progression?: { title: string; year: string }[]
  /** Remote role: the rail shows "Remote" instead of the city. */
  remote?: boolean
}

export const experience: ExperienceEntry[] = [
  {
    id: 'adobe',
    title: 'Senior Full Stack Engineer',
    company: 'Adobe',
    period: 'June 2021 - Present',
    year: '2021',
    location: 'San Francisco, CA',
    description: 'I work on the commerce platform behind Adobe Stock: the licensing, checkout, and plans surfaces that sell every asset in the library. When generative AI arrived, I designed the content credentials and indemnification layer that made those assets safe to license.',
    achievements: [
      { metric: '1.5%', description: 'of total stock revenue from AI assets', iconName: 'DollarSign' },
      { metric: '+18%', description: 'Customer retention boost', iconName: 'Users' },
      { metric: '83%', description: 'Reduced integration effort', iconName: 'Target' },
      { metric: '$1.5M', description: 'GNARR boost from Plans page', iconName: 'DollarSign' }
    ],
    responsibilities: [
      { text: 'Designed the CAI content-credentials and indemnification layer for generative assets, the piece that let Adobe stand behind AI-generated work commercially. Licensing went from nothing to 1.5% of total Stock revenue', iconName: 'Code' },
      { text: 'Rebuilt the Checkout API around a single licensing module and a GraphQL contract. Every Stock 2.0 surface now reads content IDs from one place instead of each team wiring up its own', iconName: 'Zap' },
      { text: 'Set technical direction across Stock, Commerce, and platform teams. I wrote the design docs and API contracts other orgs build against, so nobody has to fork their own version of commerce', iconName: 'Users' },
      { text: 'Led the design and delivery of the new checkout flow end to end, front to back, opening it up to new customer segments and several payment providers', iconName: 'Globe' },
      { text: 'Broke checkout into self-contained commerce components that web and desktop both drop in. Teams integrating it spend 83% less effort than they used to', iconName: 'Target' },
      { text: "Rebuilt Adobe Stock's Plans page as a dynamically rendered, accessible experience on Franklin and Adobe Spectrum, worth $1.5M in GNARR", iconName: 'Shield' }
    ],
    technologies: ['TypeScript', 'React', 'Node.js', 'GraphQL', 'Microservices', 'Java', 'Python', 'Express', 'Adobe Spectrum', 'Franklin Framework'],
    type: 'work',
    progression: [
      { title: 'Joined as Full Stack Engineer', year: '2021' },
      { title: 'Promoted', year: '2022' },
      { title: 'Senior Full Stack Engineer', year: '2025' }
    ]
  },
  {
    id: 'manifesthq',
    title: 'Front End Developer',
    company: 'ManifestHQ',
    period: 'May 2020 - May 2021',
    year: '2020',
    location: 'Chicago, IL',
    description: 'I built the web app that moves people\'s 401k savings between providers, and the component library the rest of the product was assembled from.',
    achievements: [
      { metric: '80%', description: 'Reduced transfer time', iconName: 'TrendingUp' },
      { metric: '80%', description: 'Test coverage for UI library', iconName: 'Target' },
      { metric: '100%', description: 'Mobile-first responsive design', iconName: 'Globe' }
    ],
    responsibilities: [
      { text: 'Led the build of a mobile-first React app for 401k retirement transfers, a process that used to take weeks of paperwork and now takes 80% less time', iconName: 'Code' },
      { text: 'Designed the shared UI library, shipped as an npm package with Storybook and 80% test coverage, so every team built from the same components instead of reinventing them', iconName: 'Target' },
      { text: 'Set up continuous deployment from Bitbucket to AWS S3 and wired the React frontend to a Spring Boot backend', iconName: 'Zap' },
      { text: 'Worked directly with the CTO and UX to turn rough product ideas into technical specs we could actually build', iconName: 'Users' }
    ],
    technologies: ['React', 'TypeScript', 'Node.js', 'Storybook', 'AWS S3', 'Styled Components', 'Spring Boot', 'REST APIs', 'Bitbucket'],
    type: 'work'
  },
  {
    id: 'iit',
    title: 'MS in Computer Science',
    company: 'Illinois Tech',
    period: 'July 2019 - July 2021',
    year: '2019',
    location: 'Chicago, IL',
    description: 'I earned my MS in Computer Science while working my first US engineering role full time, so everything I learned in the evening went into production during the day.',
    achievements: [
      { metric: '3.6', description: 'GPA out of 4.0', iconName: 'Target' },
      { metric: '1st', description: 'Hacktober 2021 winner', iconName: 'TrendingUp' }
    ],
    responsibilities: [
      { text: 'Finished an MS in Computer Science at Illinois Institute of Technology with a 3.6/4.0 GPA', iconName: 'Target' },
      { text: 'Took first place at Hacktober 2021, hosted by Code Platoon and Illinois Joining Forces', iconName: 'TrendingUp' },
      { text: 'Joined ManifestHQ as a Front End Developer partway through, and finished the degree while shipping', iconName: 'Code' }
    ],
    technologies: [],
    type: 'education'
  },
  {
    id: 'udacity',
    title: 'Project Reviewer & Classroom Mentor',
    company: 'Udacity',
    period: 'February 2017 - July 2019',
    year: '2017',
    location: 'Bangalore, India',
    remote: true,
    description: 'I reviewed code and mentored students working through Udacity\'s Data Scientist Nanodegree, which is where I learned to give feedback that people can actually act on.',
    achievements: [
      { metric: '500+', description: 'Projects reviewed', iconName: 'Target' },
      { metric: '30', description: 'Students per batch', iconName: 'Users' },
      { metric: '95%', description: 'Student satisfaction', iconName: 'TrendingUp' }
    ],
    responsibilities: [
      { text: "Reviewed 500+ student projects for Udacity's Data Scientist Nanodegree, giving line-level feedback on Python, statistics, and machine learning work", iconName: 'Target' },
      { text: 'Mentored batches of 30 students at a time, holding a 95% satisfaction rating across the program', iconName: 'Users' },
      { text: 'Helped lift engagement and graduation rates by figuring out where students consistently got stuck and addressing it early in the cohort', iconName: 'TrendingUp' },
      { text: 'Contributed to curriculum and assessment design for the Data Science track', iconName: 'Code' }
    ],
    technologies: ['Python', 'Machine Learning', 'Data Science', 'Code Review', 'Mentoring', 'Curriculum Design'],
    type: 'work'
  },
  {
    id: 'ibm',
    title: 'Software Engineer',
    company: 'IBM',
    period: 'March 2016 - July 2019',
    year: '2016',
    location: 'Bangalore, India',
    description: 'I built enterprise applications for telecom clients, and wrote the internal tooling that took the tedious parts of the job off the team\'s plate.',
    achievements: [
      { metric: '70%', description: 'Testing time reduction', iconName: 'TrendingUp' },
      { metric: '90%', description: 'Data validation time saved', iconName: 'Target' },
      { metric: '5+', description: 'Enterprise applications delivered', iconName: 'Globe' }
    ],
    responsibilities: [
      { text: 'Built and shipped 5+ enterprise applications on a microservices architecture, working the full lifecycle from design through release', iconName: 'Code' },
      { text: 'Wrote a web automation framework for a telecom client that cut testing time by 70%, replacing manual regression passes that used to eat entire sprints', iconName: 'Zap' },
      { text: 'Built a custom data management tool in Python and Java that took data validation from days to hours, a 90% cut that sped up every project it touched', iconName: 'Target' },
      { text: 'Wrote the unit, regression, and integration suites the team relied on, and built responsive UI features in React', iconName: 'Shield' },
      { text: 'Pushed the team toward Agile practices across the full SDLC, running the ceremonies and helping the team actually stick with them', iconName: 'Users' }
    ],
    technologies: ['Java', 'Python', 'React', 'Microservices', 'Node.js', 'Express', 'Testing', 'Agile', 'HTML', 'CSS'],
    type: 'work'
  }
]
