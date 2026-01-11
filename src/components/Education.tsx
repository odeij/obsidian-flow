import { motion, useInView, AnimatePresence } from 'framer-motion';
import { useRef, useState } from 'react';
import { education, languages } from '@/data/portfolio';
import { GraduationCap, Globe, ChevronRight } from 'lucide-react';
import SolarSystemModal from './SolarSystemModal';

export default function Education() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const [showSolarSystem, setShowSolarSystem] = useState(false);

  const handleCardClick = (institution: string) => {
    if (institution === 'Ecole 42') {
      setShowSolarSystem(true);
    }
  };

  return (
    <>
      <AnimatePresence>
        {showSolarSystem && (
          <SolarSystemModal onClose={() => setShowSolarSystem(false)} />
        )}
      </AnimatePresence>
    <section id="education" className="section-padding relative">
      <div className="container-max">
        {/* Section header */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <span className="text-sm font-mono text-primary uppercase tracking-widest">
            05 — Education
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mt-4 mb-6">
            Academic Foundation
          </h2>
        </motion.div>

        {/* Education cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
          {education.map((edu, index) => {
            const isClickable = edu.institution === 'Ecole 42';
            
            return (
              <motion.button
                key={edu.institution}
                initial={{ opacity: 0, y: 40 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: index * 0.15, duration: 0.6 }}
                onClick={() => handleCardClick(edu.institution)}
                className={`
                  group relative p-6 rounded-2xl glass-panel text-left
                  transition-all duration-300 hover-lift w-full
                  ${isClickable ? 'hover:border-primary/50 cursor-pointer' : 'hover:border-primary/30'}
                `}
              >
                {/* Clickable indicator */}
                {isClickable && (
                  <div className="absolute top-4 right-4 flex items-center gap-1 text-xs text-primary opacity-60 group-hover:opacity-100 transition-opacity">
                    <span className="hidden sm:inline">View Projects</span>
                    <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </div>
                )}

                {/* Icon */}
                <div className="flex items-start gap-4">
                  <div className={`
                    p-3 rounded-xl bg-primary/10 shrink-0 transition-all duration-300
                    ${isClickable ? 'group-hover:bg-primary/20 group-hover:scale-110' : ''}
                  `}>
                    {edu.logo === '42' ? (
                      <span className="text-xl font-bold text-primary">42</span>
                    ) : (
                      <GraduationCap className="w-6 h-6 text-primary" />
                    )}
                  </div>

                  <div className="flex-1">
                    <h3 className="text-xl font-bold group-hover:text-gradient transition-all">
                      {edu.institution}
                    </h3>
                    <p className="text-primary font-medium mb-2">{edu.degree}</p>
                    <p className="text-sm text-muted-foreground mb-4">{edu.period}</p>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {edu.description}
                    </p>
                    
                    {isClickable && (
                      <div className="mt-3 flex items-center gap-2 text-xs text-muted-foreground">
                        <div className="w-2 h-2 rounded-full bg-emerald-500" />
                        <span>9 projects completed</span>
                        <div className="w-2 h-2 rounded-full bg-amber-500 ml-2" />
                        <span>2 in progress</span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Decorative line */}
                <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              </motion.button>
            );
          })}
        </div>

        {/* Languages */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="p-6 rounded-2xl glass-panel"
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 rounded-lg bg-primary/10">
              <Globe className="w-5 h-5 text-primary" />
            </div>
            <h3 className="text-lg font-bold">Languages</h3>
          </div>

          <div className="flex flex-wrap gap-4">
            {languages.map((lang, index) => (
              <motion.div
                key={lang.name}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={isInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ delay: 0.5 + index * 0.1, duration: 0.4 }}
                className="flex items-center gap-3 px-4 py-3 rounded-xl bg-secondary/50"
              >
                <span className="font-medium">{lang.name}</span>
                <span className="text-xs font-mono text-muted-foreground px-2 py-1 rounded-full bg-background/50">
                  {lang.level}
                </span>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
    </>
  );
}
