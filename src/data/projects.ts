export interface Project {
  title: string
  description: string
  image: string
  demoImage: string
  demoVideo: string
  technologies: string[]
  features: string[]
  demoLink: string
  githubLink: string
  period: string
  team: string
}

export const projects: Project[] = [
  {
    title: 'Prep-Algo',
    description: 'A comprehensive platform for practicing algorithm problems with real-time code execution, test cases, and performance analysis. Features interactive coding environment and progress tracking.',
    image: '⚡',
    demoImage: '/prep-algo-demo.png',
    demoVideo: '',
    technologies: ['JavaScript', 'React', 'Node.js', 'Express', 'MongoDB'],
    features: ['Code Execution', 'Test Cases', 'Progress Tracking', 'Performance Analysis'],
    demoLink: 'https://prepalgo.com',
    githubLink: 'https://github.com/arsaikia/prep-algo',
    period: '2023 - Present',
    team: 'Solo Project'
  },
  {
    title: 'Pathfinding Visualizer',
    description: 'Interactive visualization tool for various pathfinding algorithms including Dijkstra, A*, and BFS. Features real-time algorithm execution with customizable grid and obstacles.',
    image: '🧭',
    demoImage: '/pathfinding-demo.png',
    demoVideo: '/pathfinding-demo.mp4',
    technologies: ['JavaScript', 'HTML5', 'CSS3', 'Canvas API'],
    features: ['Multiple Algorithms', 'Real-time Visualization', 'Customizable Grid', 'Performance Metrics'],
    demoLink: '#',
    githubLink: 'https://github.com/arsaikia/Pathfinding_Visualizer',
    period: '2022',
    team: 'Solo Project'
  },
  {
    title: 'Algorithm Visualizer',
    description: 'Educational platform for visualizing sorting and searching algorithms with step-by-step execution and performance comparisons.',
    image: '📊',
    demoImage: '/algorithm-demo.png',
    demoVideo: '/algorithm-demo.mp4',
    technologies: ['JavaScript', 'React', 'D3.js', 'CSS3'],
    features: ['Sorting Algorithms', 'Searching Algorithms', 'Step-by-step Execution', 'Performance Comparison'],
    demoLink: 'https://arsaikia.github.io/AlgorithmVisualizer/',
    githubLink: 'https://github.com/arsaikia/AlgorithmVisualizer',
    period: '2022',
    team: 'Solo Project'
  },
  {
    title: 'Human Activity Recognition',
    description: "Machine Learning project for recognizing human activities using smartphone sensor data. Part of Udacity's Machine Learning Engineer Nanodegree Program.",
    image: '🤖',
    demoImage: '',
    demoVideo: '',
    technologies: ['Python', 'Jupyter Notebook', 'Scikit-learn', 'Pandas', 'NumPy'],
    features: ['Sensor Data Processing', 'Feature Engineering', 'Model Training', 'Activity Classification'],
    demoLink: '#',
    githubLink: 'https://github.com/arsaikia/MLND_Capstone_Human_Activity_Recognition_Using_Smartphones_Sensor_Data',
    period: '2021',
    team: 'Academic Project'
  },
  {
    title: 'Ecommerce application with purchase recommendation system',
    description: 'Web application project demonstrating modern web development practices with responsive design and interactive features.',
    image: '🌐',
    demoImage: '',
    demoVideo: '',
    technologies: ['JavaScript', 'HTML5', 'CSS3', 'Web APIs'],
    features: ['Responsive Design', 'Interactive UI', 'Modern Web Standards', 'Cross-browser Compatibility'],
    demoLink: '#',
    githubLink: 'https://github.com/arsaikia/EWA_Term_Project',
    period: '2021',
    team: 'Academic Project'
  },
  {
    title: 'Hacktober-Bit_Lords',
    description: "First-place winning hackathon project for Code Platoon's Hacktober 2020. Built a solution to help Illinois Joining Forces (IJF) create a more efficient way to gather resource provider data and distribute information to Illinois state Veterans.",
    image: '🏆',
    demoImage: '',
    demoVideo: '',
    technologies: ['JavaScript', 'Python', 'CSS', 'Backend', 'Frontend'],
    features: ['Veteran Resource Management', 'Data Distribution', 'Efficient Referrals', 'Hackathon Winner'],
    demoLink: '#',
    githubLink: 'https://github.com/arsaikia/Hacktober-Bit_Lords-',
    period: 'October 2020',
    team: 'Bit Lords Team (5 members)'
  }
]
