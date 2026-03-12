export const personalInfo = {
  name: "Odei Jamaleddine",
  title: "AI & Computer Vision Engineer",
  tagline: "Building adaptive systems at the intersection of AI, vision, and engineering",
  email: "odeijamaleddine@gmail.com",
  phone: "+961 70 724 009",
  location: "Beirut, Lebanon",
  linkedin: "https://linkedin.com/in/odeijamaleddine",
  github: "https://github.com/odeijamaleddine",
};

export const stats = [
  { label: "Years Coding", value: "3+", suffix: "" },
  { label: "Research Papers", value: "1", suffix: " accepted" },
  { label: "Projects Shipped", value: "10", suffix: "+" },
  { label: "Technologies", value: "15", suffix: "+" },
];

export const skills = {
  "AI / ML": [
    { name: "PyTorch", level: 95 },
    { name: "TensorFlow", level: 85 },
    { name: "HuggingFace", level: 80 },
    { name: "MLflow", level: 75 },
    { name: "Reinforcement Learning", level: 70 },
  ],
  "Computer Vision": [
    { name: "OpenCV", level: 90 },
    { name: "3D Segmentation", level: 95 },
    { name: "Point Cloud Processing", level: 90 },
    { name: "Open3D", level: 85 },
    { name: "Image Analysis", level: 88 },
  ],
  "Backend / Systems": [
    { name: "Python", level: 95 },
    { name: "C/C++", level: 85 },
    { name: "SQL", level: 80 },
    { name: "Flask", level: 75 },
    { name: ".NET Core", level: 70 },
  ],
  "DevOps": [
    { name: "Docker", level: 90 },
    { name: "GitHub Actions", level: 85 },
    { name: "CI/CD", level: 85 },
    { name: "DVC", level: 75 },
    { name: "Git", level: 95 },
  ],
};

export const experiences = [
  {
    id: 1,
    role: "AI Researcher - Computer Vision",
    company: "American University Of Beirut",
    department: "VRL",
    location: "Beirut, Lebanon",
    period: "Feb 2025 - Present",
    type: "Research",
    achievements: [
      "First author of HINT-3D, a human-in-the-loop test-time adaptation framework for 3D semantic segmentation, submitted to ICRA 2026",
      "Designed backbone-agnostic test-time adaptation system enabling inference-time model updates from sparse human feedback",
      "Achieved segmentation gains (mIoU ~55%→~90%) by integrating PointSAM for 3D error correction",
      "Built scalable CV pipelines in PyTorch and Open3D for large-scale point cloud inference",
    ],
    technologies: ["PyTorch", "Open3D", "HuggingFace", "Docker", "MLflow"],
  },
  {
    id: 2,
    role: "CTO & ML Engineer",
    company: "MarksmanAI",
    department: "Computer Vision Startup",
    location: "Remote",
    period: "Sep 2025 - Present",
    type: "Leadership",
    achievements: [
      "Leading bullet-hole detection and localization system using OpenCV and PyTorch",
      "Designed end-to-end acquisition rig integrating cameras, microcontrollers, and edge compute",
      "Built complete ML pipeline: data collection, labeling, augmentation, training, evaluation, deployment",
      "Oversaw system architecture and model performance optimization",
    ],
    technologies: ["PyTorch", "OpenCV", "Edge Computing", "Embedded Systems"],
  },
  {
    id: 3,
    role: "Research Intern",
    company: "American University Of Beirut",
    department: "VRL",
    location: "Beirut, Lebanon",
    period: "Jan 2025 - Feb 2025",
    type: "Research",
    achievements: [
      "Implemented standardized data loading and tracking pipelines using MLflow and DVC",
      "Benchmarked large-scale segmentation models on SemanticKITTI and S3DIS",
    ],
    technologies: ["MLflow", "DVC", "Python", "PyTorch"],
  },
];

export const projects = [
  {
    id: 1,
    title: "HINT-3D",
    subtitle: "Human-in-the-Loop 3D Segmentation",
    description: "Test-time adaptation framework enabling real-time 3D semantic segmentation improvements through sparse human feedback. Submitted to ICRA 2026.",
    category: "Research",
    image: "hint3d",
    technologies: ["PyTorch", "Open3D", "PointSAM", "Docker"],
    metrics: [
      { label: "mIoU Improvement", value: "~55% → ~90%" },
      { label: "Models Tested", value: "5+" },
      { label: "Conference", value: "ICRA 2026" },
    ],
    links: {
      github: "#",
      paper: "#",
    },
    featured: true,
  },
  {
    id: 2,
    title: "MarksmanAI",
    subtitle: "Real-time Bullet Detection",
    description: "Computer vision system for real-time bullet-hole detection and localization using edge computing and custom hardware.",
    category: "Startup",
    image: "marksman",
    technologies: ["PyTorch", "OpenCV", "Edge Computing", "Embedded"],
    metrics: [
      { label: "Inference Speed", value: "Real-time" },
      { label: "Accuracy", value: "98%+" },
    ],
    links: {
      demo: "#",
    },
    featured: true,
  },
  {
    id: 3,
    title: "Inception",
    subtitle: "Dockerized Web Stack",
    description: "Full web stack deployment (Nginx, WordPress, MariaDB) in a single Docker Compose setup, reducing setup time by 70%.",
    category: "Systems",
    image: "inception",
    technologies: ["Docker", "Nginx", "MariaDB", "WordPress"],
    metrics: [
      { label: "Setup Reduction", value: "70%" },
      { label: "Services", value: "3" },
    ],
    links: {
      github: "#",
    },
    featured: false,
  },
  {
    id: 4,
    title: "MiniShell",
    subtitle: "Unix Shell Implementation",
    description: "Mini Unix Shell with pipelines, robust error handling, valgrind-clean memory, and comprehensive parsing.",
    category: "Systems",
    image: "minishell",
    technologies: ["C", "POSIX", "Unix"],
    metrics: [
      { label: "Memory Leaks", value: "0" },
      { label: "Test Coverage", value: "95%+" },
    ],
    links: {
      github: "#",
    },
    featured: false,
  },
  {
    id: 5,
    title: "GlucoAlert",
    subtitle: "AI Diabetes Prediction",
    description: "AI-based diabetes prediction application with automated CI/CD pipeline and containerized development.",
    category: "AI",
    image: "glucoalert",
    technologies: ["PyTorch", "Streamlit", "GitHub Actions", "Docker"],
    metrics: [
      { label: "Accuracy", value: "92%" },
      { label: "Pipeline", value: "Automated" },
    ],
    links: {
      github: "#",
      demo: "#",
    },
    featured: false,
  },
];

export const education = [
  {
    institution: "American University of Beirut",
    degree: "MSc, Electrical & Computer Engineering (ECE)",
    period: "Jan 2026 - 2028",
    description: "Focus on computer vision, machine learning, embedded systems, 3D segmentation, and deep learning.",
    logo: "aub",
  },
  {
    institution: "Université de Technologie de Compiègne (UTC)",
    degree: "Research Masters, Robotics & Intelligent Systems",
    period: "Apr 2026 - 2027",
    description: "Focus on autonomous systems, perception, and control.",
    logo: "utc",
  },
  {
    institution: "Ecole 42",
    degree: "Software Engineering",
    period: "May 2025 - Present",
    description: "Intensive, project-based curriculum emphasizing low-level programming, algorithms, and peer-to-peer learning.",
    logo: "42",
  },
  {
    institution: "Lebanese International University",
    degree: "BSc, Computer Science",
    period: "Oct 2022 - Feb 2025",
    description: "Foundation in computer science fundamentals, algorithms, and software development.",
    logo: "liu",
  },
];

export const publications = [
  {
    title: "HINT-3D: Human-in-the-Loop Interactive Test-Time Adaptation for 3D Segmentation",
    authors: "Odei Jamaleddine (First Author)",
    venue: "IEEE ICRA 2026",
    status: "Accepted",
    description: "Designed a backbone-agnostic TTA framework enabling safe inference-time updates from sparse human feedback.",
    link: "https://doi.org/10.5281/zenodo.18491843",
  },
];

export const languages = [
  { name: "English", level: "Fluent" },
  { name: "French", level: "Fluent" },
  { name: "Arabic", level: "Native" },
  { name: "Japanese", level: "N5" },
];
