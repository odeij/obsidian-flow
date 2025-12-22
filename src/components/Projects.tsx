import { motion, useInView, AnimatePresence } from 'framer-motion';
import { useRef, useState } from 'react';
import { projects } from '@/data/portfolio';
import { ArrowUpRight, Github, ExternalLink, FileText, X } from 'lucide-react';

const categories = ['All', 'Research', 'Startup', 'AI', 'Systems'];

function ProjectCard({ project, onClick }: { project: typeof projects[0]; onClick: () => void }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6 }}
      onClick={onClick}
      className={`group relative cursor-pointer ${project.featured ? 'md:col-span-2' : ''}`}
    >
      <div className="relative h-full p-6 rounded-2xl glass-panel hover:border-primary/30 transition-all duration-500 hover-lift overflow-hidden">
        {/* Background gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        
        {/* Featured badge */}
        {project.featured && (
          <div className="absolute top-4 right-4 px-3 py-1 rounded-full bg-primary/20 text-primary text-xs font-mono">
            Featured
          </div>
        )}

        <div className="relative">
          {/* Category */}
          <span className="text-xs font-mono text-primary uppercase tracking-wider">
            {project.category}
          </span>

          {/* Title */}
          <h3 className="text-xl md:text-2xl font-bold mt-2 mb-1 group-hover:text-gradient transition-all duration-300">
            {project.title}
          </h3>
          
          <p className="text-sm text-muted-foreground mb-4">{project.subtitle}</p>
          
          {/* Description */}
          <p className="text-muted-foreground mb-6 line-clamp-2">{project.description}</p>

          {/* Technologies */}
          <div className="flex flex-wrap gap-2 mb-6">
            {project.technologies.slice(0, 4).map((tech) => (
              <span
                key={tech}
                className="px-3 py-1 rounded-full bg-secondary text-xs font-mono text-muted-foreground"
              >
                {tech}
              </span>
            ))}
          </div>

          {/* Metrics preview */}
          {project.metrics.length > 0 && (
            <div className="flex gap-6">
              {project.metrics.slice(0, 2).map((metric) => (
                <div key={metric.label}>
                  <span className="text-lg font-bold text-gradient">{metric.value}</span>
                  <p className="text-xs text-muted-foreground">{metric.label}</p>
                </div>
              ))}
            </div>
          )}

          {/* Hover arrow */}
          <div className="absolute top-6 right-6 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-2 group-hover:translate-x-0">
            <ArrowUpRight className="w-5 h-5 text-primary" />
          </div>
        </div>
      </div>
    </motion.div>
  );
}

function ProjectModal({ project, onClose }: { project: typeof projects[0]; onClose: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/80 backdrop-blur-xl"
    >
      <motion.div
        initial={{ scale: 0.95, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.95, opacity: 0, y: 20 }}
        transition={{ type: 'spring', damping: 25, stiffness: 300 }}
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-3xl max-h-[85vh] overflow-y-auto rounded-3xl glass-panel p-8"
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-6 right-6 p-2 rounded-full hover:bg-secondary transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Category */}
        <span className="text-xs font-mono text-primary uppercase tracking-wider">
          {project.category}
        </span>

        {/* Title */}
        <h2 className="text-3xl md:text-4xl font-bold mt-2 mb-2">{project.title}</h2>
        <p className="text-lg text-muted-foreground mb-6">{project.subtitle}</p>

        {/* Description */}
        <p className="text-foreground/80 mb-8 leading-relaxed">{project.description}</p>

        {/* Metrics */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-8">
          {project.metrics.map((metric) => (
            <div key={metric.label} className="p-4 rounded-xl bg-secondary/50">
              <span className="text-2xl font-bold text-gradient">{metric.value}</span>
              <p className="text-sm text-muted-foreground mt-1">{metric.label}</p>
            </div>
          ))}
        </div>

        {/* Technologies */}
        <div className="mb-8">
          <h3 className="text-sm font-mono text-muted-foreground uppercase tracking-wider mb-3">
            Tech Stack
          </h3>
          <div className="flex flex-wrap gap-2">
            {project.technologies.map((tech) => (
              <span
                key={tech}
                className="px-4 py-2 rounded-full bg-secondary text-sm font-mono"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>

        {/* Links */}
        <div className="flex gap-3">
          {project.links.github && (
            <a
              href={project.links.github}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-5 py-3 rounded-xl bg-secondary hover:bg-secondary/80 transition-colors"
            >
              <Github className="w-4 h-4" />
              <span className="font-medium">View Code</span>
            </a>
          )}
          {project.links.demo && (
            <a
              href={project.links.demo}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-5 py-3 rounded-xl bg-primary text-primary-foreground hover:opacity-90 transition-opacity"
            >
              <ExternalLink className="w-4 h-4" />
              <span className="font-medium">Live Demo</span>
            </a>
          )}
          {project.links.paper && (
            <a
              href={project.links.paper}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-5 py-3 rounded-xl bg-secondary hover:bg-secondary/80 transition-colors"
            >
              <FileText className="w-4 h-4" />
              <span className="font-medium">Read Paper</span>
            </a>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
}

export default function Projects() {
  const [activeCategory, setActiveCategory] = useState('All');
  const [selectedProject, setSelectedProject] = useState<typeof projects[0] | null>(null);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  const filteredProjects = activeCategory === 'All'
    ? projects
    : projects.filter((p) => p.category === activeCategory);

  return (
    <section id="projects" className="section-padding relative">
      <div className="container-max">
        {/* Section header */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <span className="text-sm font-mono text-primary uppercase tracking-widest">
            02 — Projects
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mt-4 mb-6">
            Selected Work
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl">
            From academic research to production systems, here's a selection of projects
            that showcase my expertise in AI, computer vision, and systems engineering.
          </p>
        </motion.div>

        {/* Category filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="flex flex-wrap gap-2 mb-12"
        >
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                activeCategory === category
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-secondary text-muted-foreground hover:text-foreground'
              }`}
            >
              {category}
            </button>
          ))}
        </motion.div>

        {/* Projects grid */}
        <motion.div
          layout
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project) => (
              <ProjectCard
                key={project.id}
                project={project}
                onClick={() => setSelectedProject(project)}
              />
            ))}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* Project Modal */}
      <AnimatePresence>
        {selectedProject && (
          <ProjectModal
            project={selectedProject}
            onClose={() => setSelectedProject(null)}
          />
        )}
      </AnimatePresence>
    </section>
  );
}
