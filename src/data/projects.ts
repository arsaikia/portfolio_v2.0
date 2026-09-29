export interface Project {
  tier: 'featured' | 'notable' | 'archive'
  title: string
  description: string
  problem: string
  built: string
  outcome: string
  stats: string[]
  /** Short calendar year used by the compact "More work" rows. */
  year: string
  /** Monogram for projects without a screenshot. */
  mono: string
  /** Who I was on the project, shown next to the date. */
  role: string
  /** Drives the pulsing "Live" badge. */
  status?: 'live'
  /** Provenance accent key, shared with `companyAccents.ts`. */
  context?: 'udacity' | 'iit'
  /** Human label for `context`, e.g. "Illinois Tech". */
  contextLabel?: string
  /** Award badge used when there is no `context`. */
  award?: string
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
    tier: 'featured',
    title: 'Prep-Algo',
    description: 'A comprehensive platform for practicing algorithm problems with real-time code execution, test cases, and performance analysis. Features interactive coding environment and progress tracking.',
    problem: 'Most practice sites stop at “accepted”. I wanted per-test feedback and a history of how solutions improve.',
    built: 'A code execution backend, test-case runner, and React workspace with progress tracking backed by MongoDB.',
    outcome: 'Live in production at prepalgo.com and used for daily practice.',
    stats: ['Test-case runner', 'In-browser execution', 'Progress tracking'],
    year: '2023',
    mono: 'PA',
    role: 'Solo · design → deploy',
    status: 'live',
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
    tier: 'notable',
    title: 'Pathfinding Visualizer',
    description: 'Interactive visualization tool for various pathfinding algorithms including Dijkstra, A*, and BFS. Features real-time algorithm execution with customizable grid and obstacles.',
    problem: 'Graph search is easy to recite and hard to picture. Textbook diagrams hide why A* beats Dijkstra.',
    built: 'A Canvas-rendered grid that animates each algorithm step by step, with a customizable grid and obstacles.',
    outcome: 'The same maze makes the difference visible: A* explores far fewer nodes than BFS.',
    stats: ['3 algorithms', 'Canvas API', 'Performance metrics'],
    year: '2022',
    mono: 'PV',
    role: 'Solo',
    image: '🧭',
    demoImage: '/pathfinding-demo.png',
    demoVideo: '/pathfinding-demo.mp4',
    technologies: ['JavaScript', 'HTML5', 'CSS3', 'Canvas API'],
    features: ['Multiple Algorithms', 'Real-time Visualization', 'Customizable Grid', 'Performance Metrics'],
    demoLink: 'https://algo-visualizer-three-dun.vercel.app/pathfinding',
    githubLink: 'https://github.com/arsaikia/Pathfinding_Visualizer',
    period: '2022',
    team: 'Solo Project'
  },
  {
    tier: 'notable',
    title: 'Algorithm Visualizer',
    description: 'Educational platform for visualizing sorting and searching algorithms with step-by-step execution and performance comparisons.',
    problem: 'Big-O notation does not show what an algorithm actually does. Learners need to see the swaps.',
    built: 'A React + D3 visualizer with step-by-step execution and performance comparison across algorithms.',
    outcome: 'Free learning tool, now rebuilt in TypeScript and live on Vercel.',
    stats: ['React + D3', 'Step-through', 'Deployed'],
    year: '2022',
    mono: 'AV',
    role: 'Solo',
    image: '📊',
    demoImage: '/algorithm-demo.png',
    demoVideo: '/algorithm-demo.mp4',
    technologies: ['JavaScript', 'React', 'D3.js', 'CSS3'],
    features: ['Sorting Algorithms', 'Searching Algorithms', 'Step-by-step Execution', 'Performance Comparison'],
    demoLink: 'https://algo-visualizer-three-dun.vercel.app/sorting',
    githubLink: 'https://github.com/arsaikia/AlgorithmVisualizer',
    period: '2022',
    team: 'Solo Project'
  },
  {
    tier: 'archive',
    title: 'Human Activity Recognition',
    description: "Machine Learning project for recognizing human activities using smartphone sensor data. Part of Udacity's Machine Learning Engineer Nanodegree Program.",
    problem: 'Raw smartphone sensor signals need a useful representation before a model can classify activity.',
    built: 'A machine learning pipeline covering sensor data processing, feature engineering, and model training.',
    outcome: 'Capstone project for Udacity’s Machine Learning Engineer Nanodegree.',
    stats: ['Python', 'Scikit-learn', 'Capstone'],
    year: '2021',
    mono: 'HAR',
    role: 'Capstone',
    context: 'udacity',
    contextLabel: 'Udacity',
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
    tier: 'archive',
    title: 'Ecommerce application with purchase recommendation system',
    description: 'Web application project demonstrating modern web development practices with responsive design and interactive features.',
    problem: 'A shopping experience needs clear product discovery and responsive interactions across screen sizes.',
    built: 'A responsive ecommerce interface with a purchase recommendation system and interactive UI.',
    outcome: 'Academic project exploring modern web development practices.',
    stats: ['Responsive UI', 'Recommendations', 'Web APIs'],
    year: '2021',
    mono: 'EC',
    role: 'Term project',
    context: 'iit',
    contextLabel: 'Illinois Tech',
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
    tier: 'archive',
    title: 'Hacktober-Bit_Lords',
    description: "First-place winning hackathon project for Code Platoon's Hacktober 2020. Built a solution to help Illinois Joining Forces (IJF) create a more efficient way to gather resource provider data and distribute information to Illinois state Veterans.",
    problem: 'Illinois Joining Forces needed a more efficient way to gather provider data and route resources to veterans.',
    built: 'A team-built resource management and distribution workflow for provider information and referrals.',
    outcome: 'First-place winner at Code Platoon’s Hacktober 2020.',
    stats: ['1st place', 'Team of 5', 'Veteran resources'],
    year: '2020',
    mono: 'BL',
    role: 'Team of 5',
    award: '1st place',
    image: '🏆',
    demoImage: '',
    demoVideo: '',
    technologies: ['JavaScript', 'Python', 'CSS', 'Backend', 'Frontend'],
    features: ['Veteran Resource Management', 'Data Distribution', 'Efficient Referrals', 'Hackathon Winner'],
    demoLink: '#',
    githubLink: 'https://github.com/arsaikia/Hacktober-Bit_Lords-',
    period: 'October 2020',
    team: 'Bit Lords Team (5 members)'
  },
  {
    tier: 'archive',
    title: 'Real-time Transit & Crime Streaming Pipelines',
    description: "Streaming data pipelines built for Udacity's Data Streaming Nanodegree: a Kafka event pipeline showing Chicago Transit Authority train status in real time, and Spark Structured Streaming analytics over San Francisco crime incidents.",
    problem: 'Batch jobs cannot show what is happening right now. Transit status and incident data need to be processed as events arrive.',
    built: 'Kafka producers, Kafka Connect, REST Proxy and Faust stream processors feeding a live CTA dashboard, plus a Kafka → Spark Structured Streaming job aggregating SF crime data.',
    outcome: 'Two end-to-end streaming pipelines for Udacity’s Data Streaming Nanodegree.',
    stats: ['Kafka', 'Spark Streaming', '2 pipelines'],
    year: '2019',
    mono: 'KS',
    role: 'Nanodegree',
    context: 'udacity',
    contextLabel: 'Udacity',
    image: '🚆',
    demoImage: '',
    demoVideo: '',
    technologies: ['Python', 'Apache Kafka', 'Kafka Connect', 'Faust', 'Spark Structured Streaming'],
    features: ['Event Streaming', 'Stream Processing', 'Real-time Dashboard', 'Streaming Aggregations'],
    demoLink: '#',
    githubLink: 'https://github.com/arsaikia/KAFKA',
    period: '2019',
    team: 'Academic Project'
  },
  {
    tier: 'archive',
    title: 'Classical AI Agents: Sudoku & Planning',
    description: "Search- and logic-based agents built for Udacity's Artificial Intelligence Nanodegree: a diagonal Sudoku solver and a forward-planning agent for air cargo logistics.",
    problem: 'Puzzles and logistics problems have huge search spaces. Brute force does not scale without good constraints and heuristics.',
    built: 'A Sudoku solver using constraint propagation (elimination, only-choice, naked twins) with depth-first search, and a planning agent comparing uninformed and heuristic search over planning graphs.',
    outcome: 'Solves diagonal Sudoku puzzles and benchmarks planning heuristics across problem sizes.',
    stats: ['Constraint propagation', 'A* heuristics', 'Planning graphs'],
    year: '2018',
    mono: 'AI',
    role: 'Nanodegree',
    context: 'udacity',
    contextLabel: 'Udacity',
    image: '🧩',
    demoImage: '',
    demoVideo: '',
    technologies: ['Python', 'Search Algorithms', 'Symbolic Logic'],
    features: ['Constraint Propagation', 'Depth-first Search', 'Heuristic Search', 'Planning Graphs'],
    demoLink: '#',
    githubLink: 'https://github.com/arsaikia/Build-a-Sudoku-Solver',
    period: '2018',
    team: 'Academic Project'
  },
  {
    tier: 'archive',
    title: 'Neural Style Transfer',
    description: 'Deep learning notebook that transfers the artistic style of one image onto the content of another using a pretrained convolutional network.',
    problem: 'Content and style are entangled in pixels. Separating them needs representations learned by a deep network.',
    built: 'A Keras/TensorFlow implementation that optimizes a generated image against content and style losses from a pretrained CNN.',
    outcome: 'Generates stylized images from any content/style image pair.',
    stats: ['Keras', 'Pretrained CNN', 'Style + content loss'],
    year: '2017',
    mono: 'NST',
    role: 'Solo',
    image: '🎨',
    demoImage: '',
    demoVideo: '',
    technologies: ['Python', 'Keras', 'TensorFlow', 'NumPy', 'SciPy'],
    features: ['Content Loss', 'Style Loss', 'Image Optimization', 'Transfer Learning'],
    demoLink: '#',
    githubLink: 'https://github.com/arsaikia/Neural-Style-Transfer-for-Images',
    period: '2017',
    team: 'Solo Project'
  }
]
