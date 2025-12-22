import { motion, useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import { experiences } from '@/data/portfolio';
import { Briefcase, ChevronDown, MapPin, Calendar } from 'lucide-react';

function ExperienceCard({ experience, index }: { experience: typeof experiences[0]; index: number }) {
  const [isExpanded, setIsExpanded] = useState(false);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: index % 2 === 0 ? -40 : 40 }}
      animate={isInView ? { opacity: 1, x: 0 } : {}}
      transition={{ delay: index * 0.15, duration: 0.6 }}
      className="relative"
    >
      {/* Timeline connector */}
      <div className="absolute left-0 md:left-1/2 top-0 bottom-0 w-px bg-border md:-translate-x-1/2" />
      
      {/* Timeline dot */}
      <motion.div
        initial={{ scale: 0 }}
        animate={isInView ? { scale: 1 } : {}}
        transition={{ delay: index * 0.15 + 0.2, type: 'spring', stiffness: 300 }}
        className="absolute left-0 md:left-1/2 top-6 w-4 h-4 rounded-full bg-primary border-4 border-background md:-translate-x-1/2 z-10"
      />

      {/* Content card */}
      <div className={`ml-8 md:ml-0 md:w-[calc(50%-2rem)] ${index % 2 === 0 ? 'md:mr-auto' : 'md:ml-auto'}`}>
        <div
          onClick={() => setIsExpanded(!isExpanded)}
          className="group relative p-6 rounded-2xl glass-panel hover:border-primary/30 transition-all duration-300 cursor-pointer"
        >
          {/* Type badge */}
          <div className="absolute top-4 right-4">
            <span className="px-2 py-1 rounded-full bg-primary/10 text-primary text-xs font-mono">
              {experience.type}
            </span>
          </div>

          {/* Header */}
          <div className="mb-4">
            <h3 className="text-xl font-bold group-hover:text-gradient transition-all">
              {experience.role}
            </h3>
            <p className="text-primary font-medium">{experience.company}</p>
            {experience.department && (
              <p className="text-sm text-muted-foreground">{experience.department}</p>
            )}
          </div>

          {/* Meta */}
          <div className="flex flex-wrap gap-4 text-sm text-muted-foreground mb-4">
            <span className="flex items-center gap-1">
              <Calendar className="w-4 h-4" />
              {experience.period}
            </span>
            <span className="flex items-center gap-1">
              <MapPin className="w-4 h-4" />
              {experience.location}
            </span>
          </div>

          {/* Expand indicator */}
          <motion.div
            animate={{ rotate: isExpanded ? 180 : 0 }}
            className="flex items-center gap-2 text-sm text-muted-foreground"
          >
            <ChevronDown className="w-4 h-4" />
            <span>{isExpanded ? 'Hide details' : 'View achievements'}</span>
          </motion.div>

          {/* Expanded content */}
          <motion.div
            initial={false}
            animate={{ height: isExpanded ? 'auto' : 0, opacity: isExpanded ? 1 : 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <div className="pt-4 border-t border-border mt-4">
              {/* Achievements */}
              <ul className="space-y-3 mb-4">
                {experience.achievements.map((achievement, i) => (
                  <li key={i} className="flex gap-3 text-sm text-muted-foreground">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2 shrink-0" />
                    <span>{achievement}</span>
                  </li>
                ))}
              </ul>

              {/* Technologies */}
              <div className="flex flex-wrap gap-2">
                {experience.technologies.map((tech) => (
                  <span
                    key={tech}
                    className="px-2 py-1 rounded-md bg-secondary text-xs font-mono text-muted-foreground"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}

export default function Experience() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="experience" className="section-padding relative">
      <div className="container-max">
        {/* Section header */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-sm font-mono text-primary uppercase tracking-widest">
            03 — Experience
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mt-4 mb-6">
            Career Missions
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Each role has been a mission—pushing boundaries, solving complex problems,
            and building systems that matter.
          </p>
        </motion.div>

        {/* Mission indicator */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="flex items-center justify-center gap-4 mb-12"
        >
          <div className="flex items-center gap-2 px-4 py-2 rounded-full glass-panel">
            <Briefcase className="w-4 h-4 text-primary" />
            <span className="text-sm font-mono">{experiences.length} Missions Completed</span>
          </div>
        </motion.div>

        {/* Timeline */}
        <div className="relative space-y-8 md:space-y-12">
          {experiences.map((experience, index) => (
            <ExperienceCard key={experience.id} experience={experience} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
