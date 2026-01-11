import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import { experiences } from '@/data/portfolio';
import { X, Building2, Calendar, MapPin, Sparkles, Zap, Award, ChevronRight } from 'lucide-react';

function DetailModal({ 
  experience, 
  onClose 
}: { 
  experience: typeof experiences[0]; 
  onClose: () => void;
}) {
  // Close on escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, [onClose]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-background/90 backdrop-blur-md" />
      
      {/* Modal Window */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
        className="relative w-full max-w-lg overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Glow effect */}
        <div className="absolute -inset-1 bg-gradient-to-r from-primary/20 via-primary/10 to-primary/20 rounded-2xl blur-xl opacity-60" />
        
        {/* Card */}
        <div className="relative bg-card/95 backdrop-blur-sm rounded-2xl border border-border/50 overflow-hidden">
          {/* Header */}
          <div className="relative px-6 pt-6 pb-4">
            {/* Close button */}
            <button 
              onClick={onClose}
              className="absolute top-4 right-4 p-2 rounded-full bg-muted/50 hover:bg-muted transition-colors group"
            >
              <X className="w-4 h-4 text-muted-foreground group-hover:text-foreground transition-colors" />
            </button>
            
            {/* Type badge */}
            <motion.div 
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="inline-flex items-center gap-1.5 mb-4"
            >
              <span className={`px-3 py-1 text-xs font-medium rounded-full ${
                experience.type === 'Research' 
                  ? 'bg-blue-500/15 text-blue-400 border border-blue-500/20' 
                  : experience.type === 'Leadership'
                  ? 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/20'
                  : 'bg-purple-500/15 text-purple-400 border border-purple-500/20'
              }`}>
                <Sparkles className="w-3 h-3 inline mr-1" />
                {experience.type}
              </span>
              {experience.department && (
                <span className="text-xs text-muted-foreground px-2">
                  {experience.department}
                </span>
              )}
            </motion.div>
            
            {/* Title */}
            <motion.h3 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15 }}
              className="text-xl md:text-2xl font-bold text-foreground mb-2"
            >
              {experience.role}
            </motion.h3>
            
            {/* Company & Meta */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="flex flex-wrap items-center gap-4 text-muted-foreground text-sm"
            >
              <span className="flex items-center gap-1.5">
                <Building2 className="w-4 h-4 text-primary/70" />
                {experience.company}
              </span>
              <span className="flex items-center gap-1.5">
                <Calendar className="w-4 h-4 text-primary/70" />
                {experience.period}
              </span>
              <span className="flex items-center gap-1.5">
                <MapPin className="w-4 h-4 text-primary/70" />
                {experience.location}
              </span>
            </motion.div>
          </div>
          
          {/* Divider */}
          <div className="mx-6 h-px bg-gradient-to-r from-transparent via-border to-transparent" />
          
          {/* Achievements */}
          <div className="px-6 py-5">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.25 }}
              className="flex items-center gap-2 mb-4"
            >
              <Award className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium text-foreground">Key Achievements</span>
            </motion.div>
            
            <div className="space-y-3">
              {experience.achievements.map((achievement, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 + i * 0.08 }}
                  className="flex items-start gap-3 group"
                >
                  <span className="shrink-0 mt-1.5 w-1.5 h-1.5 rounded-full bg-primary/60 group-hover:bg-primary transition-colors" />
                  <p className="text-sm text-muted-foreground leading-relaxed group-hover:text-foreground transition-colors">
                    {achievement}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
          
          {/* Tech Stack */}
          <div className="px-6 pb-6">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="flex items-center gap-2 mb-3"
            >
              <Zap className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium text-foreground">Tech Stack</span>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.55 }}
              className="flex flex-wrap gap-2"
            >
              {experience.technologies.map((tech, i) => (
                <motion.span
                  key={tech}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.6 + i * 0.05 }}
                  className="px-3 py-1.5 text-xs font-medium bg-muted/50 hover:bg-muted text-muted-foreground hover:text-foreground rounded-lg border border-border/50 hover:border-primary/30 transition-all cursor-default"
                >
                  {tech}
                </motion.span>
              ))}
            </motion.div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

function ExperienceCard({ 
  experience, 
  isActive, 
  onClick 
}: { 
  experience: typeof experiences[0]; 
  isActive: boolean;
  onClick: () => void;
}) {
  return (
    <motion.button
      onClick={onClick}
      className={`w-full text-left p-4 md:p-5 rounded-xl border transition-all duration-300 ${
        isActive 
          ? 'bg-primary/10 border-primary shadow-lg shadow-primary/20' 
          : 'bg-card/50 border-border/50 hover:border-primary/50 hover:bg-card'
      }`}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      whileHover={{ scale: 1.01 }}
      whileTap={{ scale: 0.99 }}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-2">
            <span className={`px-2 py-0.5 text-xs rounded-full ${
              experience.type === 'Research' 
                ? 'bg-blue-500/20 text-blue-400' 
                : experience.type === 'Leadership'
                ? 'bg-emerald-500/20 text-emerald-400'
                : 'bg-purple-500/20 text-purple-400'
            }`}>
              {experience.type}
            </span>
            {experience.department && (
              <span className="text-xs text-muted-foreground">
                {experience.department}
              </span>
            )}
          </div>
          <h3 className="font-semibold text-foreground text-base md:text-lg">
            {experience.role}
          </h3>
          <div className="flex items-center gap-2 mt-1 text-muted-foreground text-sm">
            <Building2 className="w-4 h-4 shrink-0" />
            <span>{experience.company}</span>
          </div>
          <div className="flex flex-wrap items-center gap-3 mt-2 text-muted-foreground/70 text-xs">
            <span className="flex items-center gap-1">
              <Calendar className="w-3 h-3" />
              {experience.period}
            </span>
            <span className="flex items-center gap-1">
              <MapPin className="w-3 h-3" />
              {experience.location}
            </span>
          </div>
        </div>
        
        <div className="shrink-0 text-xs text-muted-foreground font-mono">
          Click to view →
        </div>
      </div>
    </motion.button>
  );
}

export default function Experience() {
  const [selectedExperience, setSelectedExperience] = useState<typeof experiences[0] | null>(null);

  return (
    <section id="experience" className="py-20 md:py-32 px-4 relative">
      <div className="max-w-3xl mx-auto">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <span className="text-sm font-mono text-primary uppercase tracking-widest">
            03 — Experience
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mt-4 mb-4">
            Career<span className="text-gradient">.execute()</span>
          </h2>
          <p className="text-muted-foreground text-sm md:text-base">
            Click on any experience to view the code
          </p>
        </motion.div>

        {/* Experience Cards */}
        <div className="space-y-3">
          {experiences.map((exp) => (
            <ExperienceCard
              key={exp.id}
              experience={exp}
              isActive={selectedExperience?.id === exp.id}
              onClick={() => setSelectedExperience(exp)}
            />
          ))}
        </div>
      </div>

      {/* Modal */}
      <AnimatePresence>
        {selectedExperience && (
          <DetailModal 
            experience={selectedExperience} 
            onClose={() => setSelectedExperience(null)} 
          />
        )}
      </AnimatePresence>
    </section>
  );
}
