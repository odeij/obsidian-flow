import { motion, useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import { skills } from '@/data/portfolio';
import { Cpu, Eye, Server, Cloud } from 'lucide-react';

const categoryIcons: { [key: string]: React.ComponentType<{ className?: string }> } = {
  'AI / ML': Cpu,
  'Computer Vision': Eye,
  'Backend / Systems': Server,
  'DevOps': Cloud,
};

const categoryColors: { [key: string]: string } = {
  'AI / ML': 'from-violet-500 to-purple-500',
  'Computer Vision': 'from-blue-500 to-cyan-500',
  'Backend / Systems': 'from-orange-500 to-amber-500',
  'DevOps': 'from-green-500 to-emerald-500',
};

function SkillBar({ skill, delay, isVisible }: { skill: { name: string; level: number }; delay: number; isVisible: boolean }) {
  return (
    <div className="group">
      <div className="flex justify-between mb-2">
        <span className="text-sm font-medium">{skill.name}</span>
        <motion.span
          initial={{ opacity: 0 }}
          animate={isVisible ? { opacity: 1 } : {}}
          transition={{ delay: delay + 0.3, duration: 0.3 }}
          className="text-xs font-mono text-muted-foreground"
        >
          {skill.level}%
        </motion.span>
      </div>
      <div className="h-2 rounded-full bg-secondary overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          animate={isVisible ? { width: `${skill.level}%` } : {}}
          transition={{ delay, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="h-full rounded-full bg-gradient-to-r from-primary to-purple-500"
        />
      </div>
    </div>
  );
}

function SkillCategory({ category, skillList, index }: { category: string; skillList: { name: string; level: number }[]; index: number }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });
  const Icon = categoryIcons[category] || Cpu;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay: index * 0.1, duration: 0.6 }}
      className="p-6 rounded-2xl glass-panel hover:border-primary/30 transition-all duration-300"
    >
      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <div className={`p-3 rounded-xl bg-gradient-to-br ${categoryColors[category]} bg-opacity-20`}>
          <Icon className="w-5 h-5 text-foreground" />
        </div>
        <h3 className="text-lg font-bold">{category}</h3>
      </div>

      {/* Skills */}
      <div className="space-y-4">
        {skillList.map((skill, i) => (
          <SkillBar
            key={skill.name}
            skill={skill}
            delay={index * 0.1 + i * 0.05}
            isVisible={isInView}
          />
        ))}
      </div>
    </motion.div>
  );
}

export default function Skills() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const [hoveredCategory, setHoveredCategory] = useState<string | null>(null);

  const categories = Object.keys(skills);

  return (
    <section id="skills" className="section-padding relative">
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
            04 — Skills
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mt-4 mb-6">
            Technical Arsenal
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            A comprehensive toolkit spanning the full spectrum of AI engineering,
            from research prototypes to production systems.
          </p>
        </motion.div>

        {/* Skill radar visualization */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="flex justify-center mb-16"
        >
          <div className="relative w-64 h-64">
            {/* Radar circles */}
            {[1, 2, 3, 4].map((ring) => (
              <div
                key={ring}
                className="absolute inset-0 rounded-full border border-border/30"
                style={{
                  transform: `scale(${ring * 0.25})`,
                }}
              />
            ))}

            {/* Category points */}
            {categories.map((category, i) => {
              const angle = (i * 360) / categories.length - 90;
              const radius = 100;
              const x = Math.cos((angle * Math.PI) / 180) * radius;
              const y = Math.sin((angle * Math.PI) / 180) * radius;
              const isHovered = hoveredCategory === category;

              return (
                <motion.div
                  key={category}
                  initial={{ scale: 0, opacity: 0 }}
                  animate={isInView ? { scale: 1, opacity: 1 } : {}}
                  transition={{ delay: 0.3 + i * 0.1, type: 'spring', stiffness: 200 }}
                  onMouseEnter={() => setHoveredCategory(category)}
                  onMouseLeave={() => setHoveredCategory(null)}
                  className="absolute cursor-pointer"
                  style={{
                    left: `calc(50% + ${x}px - 1rem)`,
                    top: `calc(50% + ${y}px - 1rem)`,
                  }}
                >
                  <motion.div
                    animate={{ scale: isHovered ? 1.2 : 1 }}
                    className={`w-8 h-8 rounded-full bg-gradient-to-br ${categoryColors[category]} flex items-center justify-center shadow-lg`}
                  >
                    {(() => {
                      const IconComponent = categoryIcons[category];
                      return <IconComponent className="w-4 h-4 text-white" />;
                    })()}
                  </motion.div>
                  {isHovered && (
                    <motion.div
                      initial={{ opacity: 0, y: 5 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="absolute left-1/2 -translate-x-1/2 top-10 whitespace-nowrap px-2 py-1 rounded bg-card text-xs font-medium"
                    >
                      {category}
                    </motion.div>
                  )}
                </motion.div>
              );
            })}

            {/* Center */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-4 h-4 rounded-full bg-primary animate-pulse" />
            </div>
          </div>
        </motion.div>

        {/* Skill categories grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {categories.map((category, index) => (
            <SkillCategory
              key={category}
              category={category}
              skillList={skills[category as keyof typeof skills]}
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
