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
    description: 'Engineered core ecommerce solutions for Generative AI assets, modernized customer checkout flows, and led development of modular commerce systems.',
    achievements: [
      { metric: '1.5%', description: 'of total stock revenue from AI assets', iconName: 'DollarSign' },
      { metric: '+18%', description: 'Customer retention boost', iconName: 'Users' },
      { metric: '83%', description: 'Reduced integration effort', iconName: 'Target' },
      { metric: '$1.5M', description: 'GNARR boost from Plans page', iconName: 'DollarSign' }
    ],
    responsibilities: [
      { text: 'Engineered core ecommerce solutions for Generative AI assets, enabling merchandising and licensing which now accounts for 1.5% of total stock revenue', iconName: 'Code' },
      { text: 'Updated Checkout API for real-time content ID fetching via centralized licensing module and GraphQL, ensuring seamless integration across all Stock 2.0 surfaces', iconName: 'Zap' },
      { text: 'Spearheaded comprehensive modernization and redesign of customer checkout flow (frontend & backend), integrating new customer segments and diverse payment providers', iconName: 'Globe' },
      { text: "Streamlined Adobe Stock's checkout integration across web & desktop apps by developing modular, self-contained commerce component system", iconName: 'Target' },
      { text: "Led modernization of Adobe Stock's Plans page to dynamically rendered, accessible platform via Franklin Headless Framework and Adobe Spectrum", iconName: 'Shield' }
    ],
    technologies: ['React', 'Node.js', 'TypeScript', 'GraphQL', 'Adobe Spectrum', 'Franklin Framework', 'Python', 'Java', 'Express', 'Microservices'],
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
    description: 'Led development of responsive React.js web app for 401k retirement funds transfers, architected reusable UI library.',
    achievements: [
      { metric: '80%', description: 'Reduced transfer time', iconName: 'TrendingUp' },
      { metric: '80%', description: 'Test coverage for UI library', iconName: 'Target' },
      { metric: '100%', description: 'Mobile-first responsive design', iconName: 'Globe' }
    ],
    responsibilities: [
      { text: 'Led development of responsive, mobile-first React.js web app (TypeScript, Node.js, Styled Components) for 401k retirement funds transfers', iconName: 'Code' },
      { text: 'Architected reusable UI library (npm package, Storybook) with comprehensive test coverage, ensuring consistency and maintainability', iconName: 'Target' },
      { text: 'Established and managed continuous deployment pipelines from Bitbucket to AWS S3, integrating React frontend with Spring Boot backend', iconName: 'Zap' },
      { text: 'Translated business & user requirements into technical specifications through collaboration with CTO and UX teams', iconName: 'Users' }
    ],
    technologies: ['React', 'TypeScript', 'Node.js', 'Styled Components', 'Storybook', 'AWS S3', 'Spring Boot', 'REST APIs', 'Bitbucket'],
    type: 'work'
  },
  {
    id: 'iit',
    title: 'MS in Computer Science',
    company: 'Illinois Tech',
    period: 'July 2019 - July 2021',
    year: '2019',
    location: 'Chicago, IL',
    description: 'Graduate degree in Computer Science at Illinois Institute of Technology, completed alongside my first US engineering role.',
    achievements: [
      { metric: '3.6', description: 'GPA out of 4.0', iconName: 'Target' },
      { metric: '1st', description: 'Hacktober 2021 winner', iconName: 'TrendingUp' }
    ],
    responsibilities: [
      { text: 'Completed an MS in Computer Science at Illinois Institute of Technology with a 3.6/4.0 GPA', iconName: 'Target' },
      { text: 'Won Hacktober 2021, hosted by Code Platoon and Illinois Joining Forces (IJF)', iconName: 'TrendingUp' },
      { text: 'Started as a Front End Developer at ManifestHQ while completing the degree', iconName: 'Code' }
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
    description: 'Reviewed student projects for Data Scientist Nanodegree and mentored batches of 30 students.',
    achievements: [
      { metric: '500+', description: 'Projects reviewed', iconName: 'Target' },
      { metric: '30', description: 'Students per batch', iconName: 'Users' },
      { metric: '95%', description: 'Student satisfaction', iconName: 'TrendingUp' }
    ],
    responsibilities: [
      { text: "Reviewed student projects for Udacity's Data Scientist Nanodegree, ensuring high-quality deliverables and learning outcomes", iconName: 'Target' },
      { text: 'Mentored batches of 30 students, providing personalized guidance and support throughout their learning journey', iconName: 'Users' },
      { text: 'Improved student engagement and graduation rates through effective teaching methodologies and mentorship', iconName: 'TrendingUp' },
      { text: 'Contributed to curriculum development and assessment strategies for Data Science education', iconName: 'Code' }
    ],
    technologies: ['Python', 'Data Science', 'Machine Learning', 'Mentoring', 'Curriculum Development', 'Assessment'],
    type: 'work'
  },
  {
    id: 'ibm',
    title: 'Software Engineer',
    company: 'IBM',
    period: 'March 2016 - July 2019',
    year: '2016',
    location: 'Bangalore, India',
    description: 'Championed Agile methodologies across full SDLC, pioneered web automation framework.',
    achievements: [
      { metric: '70%', description: 'Testing time reduction', iconName: 'TrendingUp' },
      { metric: '90%', description: 'Data validation time saved', iconName: 'Target' },
      { metric: '5+', description: 'Enterprise applications delivered', iconName: 'Globe' }
    ],
    responsibilities: [
      { text: 'Championed Agile Methodologies across full SDLC, crafting enterprise applications with Microservices architecture and Object-Oriented design', iconName: 'Code' },
      { text: 'Pioneered innovative solutions, including new web automation framework for Telecom Client, shortening testing time by 70%', iconName: 'Zap' },
      { text: 'Authored custom Data Management Tool using Python & Java, minimizing data validation time by 90%, resulting in faster project turnaround', iconName: 'Target' },
      { text: 'Architected and implemented comprehensive Unit, Regression, and Integration test scripts; engineered responsive UI features in React', iconName: 'Shield' }
    ],
    technologies: ['Python', 'Java', 'Node.js', 'Express', 'React', 'Microservices', 'Agile', 'HTML', 'CSS', 'Testing'],
    type: 'work'
  }
]
