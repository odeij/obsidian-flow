import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { education, languages } from '@/data/portfolio';
import { GraduationCap, BookOpen, Globe } from 'lucide-react';

export default function Education() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
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
          {education.map((edu, index) => (
            <motion.div
              key={edu.institution}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: index * 0.15, duration: 0.6 }}
              className="group relative p-6 rounded-2xl glass-panel hover:border-primary/30 transition-all duration-300 hover-lift"
            >
              {/* Icon */}
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-xl bg-primary/10 shrink-0">
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
                </div>
              </div>

              {/* Decorative line */}
              <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            </motion.div>
          ))}
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
  );
}
