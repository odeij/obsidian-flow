import { motion, AnimatePresence } from 'framer-motion';
import { X, Check, Clock, Loader2 } from 'lucide-react';
import { useEffect, useState } from 'react';

interface Project {
  name: string;
  status: 'completed' | 'doing' | 'todo';
  description?: string;
  skills?: string[];
}

interface Rank {
  level: number;
  projects: Project[];
}

const ranks: Rank[] = [
  {
    level: 0,
    projects: [
      { name: 'Libft', status: 'completed', description: 'Custom C library with essential functions', skills: ['C', 'Memory Management', 'Makefile'] }
    ]
  },
  {
    level: 1,
    projects: [
      { name: 'Born2beRoot', status: 'completed', description: 'Linux system administration & virtualization', skills: ['Linux', 'VM', 'Security'] },
      { name: 'ft_printf', status: 'completed', description: 'Recreation of printf function', skills: ['C', 'Variadic Functions'] },
      { name: 'get_next_line', status: 'completed', description: 'Line-by-line file reading function', skills: ['C', 'File Descriptors', 'Static Variables'] }
    ]
  },
  {
    level: 2,
    projects: [
      { name: 'so_long', status: 'completed', description: '2D game using MiniLibX', skills: ['C', 'Graphics', 'Game Logic'] },
      { name: 'pipex', status: 'completed', description: 'Unix pipe mechanism recreation', skills: ['C', 'Pipes', 'Processes'] },
      { name: 'minitalk', status: 'completed', description: 'Client-server communication with signals', skills: ['C', 'Unix Signals'] },
      { name: 'push_swap', status: 'completed', description: 'Sorting algorithm optimization', skills: ['C', 'Algorithms', 'Stacks'] },
      { name: 'FdF', status: 'completed', description: '3D wireframe landscape viewer', skills: ['C', 'Graphics', '3D Math'] }
    ]
  },
  {
    level: 3,
    projects: [
      { name: 'Philosophers', status: 'completed', description: 'Dining philosophers problem with threads', skills: ['C', 'Threads', 'Mutexes'] },
      { name: 'Minishell', status: 'completed', description: 'Custom Unix shell implementation', skills: ['C', 'Parsing', 'Processes', 'Signals'] }
    ]
  },
  {
    level: 4,
    projects: [
      { name: 'CPP 00-04', status: 'doing', description: 'C++ fundamentals and OOP concepts', skills: ['C++', 'OOP', 'STL'] },
      { name: 'NetPractice', status: 'todo', description: 'Network configuration exercises', skills: ['Networking', 'TCP/IP'] },
      { name: 'MiniRT', status: 'todo', description: 'Raytracing renderer', skills: ['C', 'Math', 'Graphics'] }
    ]
  },
  {
    level: 5,
    projects: [
      { name: 'CPP 05-09', status: 'todo', description: 'Advanced C++ concepts', skills: ['C++', 'Templates', 'Containers'] },
      { name: 'Inception', status: 'doing', description: 'Docker infrastructure setup', skills: ['Docker', 'Docker Compose', 'DevOps'] },
      { name: 'webserv', status: 'todo', description: 'HTTP server from scratch', skills: ['C++', 'HTTP', 'Sockets'] }
    ]
  },
  {
    level: 6,
    projects: [
      { name: 'ft_transcendence', status: 'todo', description: 'Full-stack web application', skills: ['TypeScript', 'NestJS', 'React', 'WebSocket'] }
    ]
  }
];

interface SolarSystemModalProps {
  onClose: () => void;
}

export default function SolarSystemModal({ onClose }: SolarSystemModalProps) {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [hoveredProject, setHoveredProject] = useState<Project | null>(null);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        if (selectedProject) {
          setSelectedProject(null);
        } else {
          onClose();
        }
      }
    };
    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, [onClose, selectedProject]);

  const getStatusIcon = (status: Project['status']) => {
    switch (status) {
      case 'completed':
        return <Check className="w-3 h-3" />;
      case 'doing':
        return <Loader2 className="w-3 h-3 animate-spin" />;
      case 'todo':
        return <Clock className="w-3 h-3" />;
    }
  };

  const getStatusColor = (status: Project['status']) => {
    switch (status) {
      case 'completed':
        return 'bg-emerald-500 shadow-emerald-500/50';
      case 'doing':
        return 'bg-amber-500 shadow-amber-500/50';
      case 'todo':
        return 'bg-muted-foreground/50';
    }
  };

  const getPlanetSize = (status: Project['status']) => {
    switch (status) {
      case 'completed':
        return 'w-10 h-10 md:w-12 md:h-12';
      case 'doing':
        return 'w-9 h-9 md:w-11 md:h-11';
      case 'todo':
        return 'w-8 h-8 md:w-10 md:h-10';
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/80 backdrop-blur-md"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        transition={{ type: 'spring', damping: 25, stiffness: 300 }}
        className="relative w-full max-w-5xl max-h-[85vh] rounded-2xl glass-panel overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-border/50">
          <div className="flex items-center gap-3">
            <span className="text-2xl font-bold text-primary">42</span>
            <div>
              <h3 className="font-bold">École 42 Galaxy</h3>
              <p className="text-xs text-muted-foreground">Project progression through ranks</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-lg hover:bg-secondary transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Solar System Container */}
        <div className="relative p-6 overflow-auto max-h-[calc(85vh-80px)]">
          {/* Legend */}
          <div className="flex flex-wrap gap-4 mb-6 text-xs">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-emerald-500" />
              <span>Completed</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-amber-500" />
              <span>In Progress</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-muted-foreground/50" />
              <span>Upcoming</span>
            </div>
          </div>

          {/* Solar System - Circular Orbits */}
          <div className="relative flex items-center justify-center min-h-[500px] py-8">
            {/* Central Sun (42 Logo) */}
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 60, repeat: Infinity, ease: 'linear' }}
                className="relative"
              >
                <div className="absolute inset-0 bg-primary/40 rounded-full blur-xl scale-150" />
                <div className="relative w-16 h-16 rounded-full bg-gradient-to-br from-primary to-primary/60 border-2 border-primary/50 flex items-center justify-center shadow-2xl shadow-primary/30">
                  <span className="text-xl font-bold text-primary-foreground">42</span>
                </div>
              </motion.div>
            </div>

            {/* Orbital Rings */}
            {ranks.map((rank, rankIndex) => {
              const orbitRadius = 70 + rankIndex * 55;
              const orbitDuration = 30 + rankIndex * 15; // Outer orbits slower
              const projectCount = rank.projects.length;

              return (
                <div key={rank.level} className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
                  {/* Orbit Path */}
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: rankIndex * 0.1 }}
                    className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border border-primary/10"
                    style={{
                      width: orbitRadius * 2,
                      height: orbitRadius * 2,
                    }}
                  />

                  {/* Rank Label */}
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: rankIndex * 0.1 + 0.3 }}
                    className="absolute text-[10px] font-mono text-primary/50"
                    style={{
                      left: `calc(50% + ${orbitRadius}px + 8px)`,
                      top: '50%',
                      transform: 'translateY(-50%)',
                    }}
                  >
                    R{rank.level}
                  </motion.div>

                  {/* Orbiting Planets Container */}
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{
                      duration: orbitDuration,
                      repeat: Infinity,
                      ease: 'linear',
                    }}
                    className="absolute left-1/2 top-1/2"
                    style={{
                      width: orbitRadius * 2,
                      height: orbitRadius * 2,
                      marginLeft: -orbitRadius,
                      marginTop: -orbitRadius,
                    }}
                  >
                    {rank.projects.map((project, projectIndex) => {
                      const angle = (projectIndex / projectCount) * 360;
                      const radians = (angle * Math.PI) / 180;
                      const x = Math.cos(radians) * orbitRadius;
                      const y = Math.sin(radians) * orbitRadius;

                      return (
                        <motion.div
                          key={project.name}
                          initial={{ scale: 0, opacity: 0 }}
                          animate={{ scale: 1, opacity: 1 }}
                          transition={{
                            delay: rankIndex * 0.1 + projectIndex * 0.05 + 0.2,
                            type: 'spring',
                            stiffness: 200,
                          }}
                          className="absolute"
                          style={{
                            left: `calc(50% + ${x}px)`,
                            top: `calc(50% + ${y}px)`,
                            transform: 'translate(-50%, -50%)',
                          }}
                        >
                          {/* Counter-rotate to keep planet upright */}
                          <motion.button
                            animate={{ rotate: -360 }}
                            transition={{
                              duration: orbitDuration,
                              repeat: Infinity,
                              ease: 'linear',
                            }}
                            whileHover={{ scale: 1.3 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => setSelectedProject(project)}
                            onMouseEnter={() => setHoveredProject(project)}
                            onMouseLeave={() => setHoveredProject(null)}
                            className={`
                              relative ${getPlanetSize(project.status)} rounded-full 
                              ${getStatusColor(project.status)} 
                              shadow-lg cursor-pointer transition-shadow duration-300
                              flex items-center justify-center
                              ${project.status === 'completed' ? 'ring-2 ring-emerald-400/30' : ''}
                              ${project.status === 'doing' ? 'ring-2 ring-amber-400/30' : ''}
                            `}
                          >
                            {/* Planet glow */}
                            {project.status === 'completed' && (
                              <div className="absolute inset-0 rounded-full bg-emerald-400/30 blur-md" />
                            )}
                            {project.status === 'doing' && (
                              <motion.div
                                animate={{ opacity: [0.3, 0.6, 0.3] }}
                                transition={{ duration: 2, repeat: Infinity }}
                                className="absolute inset-0 rounded-full bg-amber-400/30 blur-md"
                              />
                            )}

                            {/* Status icon */}
                            <span className="relative text-white z-10">
                              {getStatusIcon(project.status)}
                            </span>

                            {/* Tooltip */}
                            <AnimatePresence>
                              {hoveredProject?.name === project.name && (
                                <motion.div
                                  initial={{ opacity: 0, y: 5, scale: 0.9 }}
                                  animate={{ opacity: 1, y: 0, scale: 1 }}
                                  exit={{ opacity: 0, y: 5, scale: 0.9 }}
                                  className="absolute -top-12 left-1/2 -translate-x-1/2 px-3 py-1.5 bg-background/95 border border-border rounded-lg text-xs whitespace-nowrap z-50 shadow-xl"
                                >
                                  <div className="font-medium">{project.name}</div>
                                  <div className={`text-[10px] ${
                                    project.status === 'completed' ? 'text-emerald-400' :
                                    project.status === 'doing' ? 'text-amber-400' : 'text-muted-foreground'
                                  }`}>
                                    {project.status === 'completed' ? '✓ Completed' :
                                     project.status === 'doing' ? '◐ In Progress' : '○ Upcoming'}
                                  </div>
                                </motion.div>
                              )}
                            </AnimatePresence>
                          </motion.button>
                        </motion.div>
                      );
                    })}
                  </motion.div>
                </div>
              );
            })}
          </div>

          {/* Project Detail Panel */}
          <AnimatePresence>
            {selectedProject && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                className="mt-6 p-5 rounded-xl bg-secondary/50 border border-border/50"
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div className={`w-4 h-4 rounded-full ${getStatusColor(selectedProject.status)}`} />
                    <h4 className="text-lg font-bold">{selectedProject.name}</h4>
                    <span className={`
                      text-xs px-2 py-0.5 rounded-full
                      ${selectedProject.status === 'completed' ? 'bg-emerald-500/20 text-emerald-400' : ''}
                      ${selectedProject.status === 'doing' ? 'bg-amber-500/20 text-amber-400' : ''}
                      ${selectedProject.status === 'todo' ? 'bg-muted text-muted-foreground' : ''}
                    `}>
                      {selectedProject.status === 'completed' ? 'Completed' : 
                       selectedProject.status === 'doing' ? 'In Progress' : 'Upcoming'}
                    </span>
                  </div>
                  <button
                    onClick={() => setSelectedProject(null)}
                    className="p-1 rounded hover:bg-background/50 transition-colors"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>

                {selectedProject.description && (
                  <p className="text-sm text-muted-foreground mb-4">
                    {selectedProject.description}
                  </p>
                )}

                {selectedProject.skills && selectedProject.skills.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {selectedProject.skills.map((skill) => (
                      <span
                        key={skill}
                        className="text-xs px-2 py-1 rounded-full bg-primary/10 text-primary font-mono"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </motion.div>
  );
}
