import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { useRef, useState, MouseEvent } from 'react';
import { skills } from '@/data/portfolio';
import { Cpu, Eye, Server, Cloud, Sparkles, Zap } from 'lucide-react';

const categoryIcons: { [key: string]: React.ComponentType<{ className?: string }> } = {
  'AI / ML': Cpu,
  'Computer Vision': Eye,
  'Backend / Systems': Server,
  'DevOps': Cloud,
};

const categoryColors: { [key: string]: { gradient: string; glow: string; bg: string } } = {
  'AI / ML': { 
    gradient: 'from-violet-500 to-purple-500', 
    glow: 'shadow-violet-500/50',
    bg: 'bg-violet-500/10'
  },
  'Computer Vision': { 
    gradient: 'from-blue-500 to-cyan-500', 
    glow: 'shadow-blue-500/50',
    bg: 'bg-blue-500/10'
  },
  'Backend / Systems': { 
    gradient: 'from-orange-500 to-amber-500', 
    glow: 'shadow-orange-500/50',
    bg: 'bg-orange-500/10'
  },
  'DevOps': { 
    gradient: 'from-green-500 to-emerald-500', 
    glow: 'shadow-green-500/50',
    bg: 'bg-green-500/10'
  },
};

// Interactive skill pill with magnetic hover
function SkillPill({ 
  skill, 
  categoryColor, 
  delay,
  isExpanded,
  onClick
}: { 
  skill: { name: string; level: number }; 
  categoryColor: typeof categoryColors[string];
  delay: number;
  isExpanded: boolean;
  onClick: () => void;
}) {
  const ref = useRef<HTMLButtonElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  
  // Magnetic effect
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  
  const springConfig = { damping: 15, stiffness: 300 };
  const xSpring = useSpring(x, springConfig);
  const ySpring = useSpring(y, springConfig);

  const handleMouseMove = (e: MouseEvent<HTMLButtonElement>) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    const deltaX = (e.clientX - centerX) * 0.3;
    const deltaY = (e.clientY - centerY) * 0.3;
    
    x.set(deltaX);
    y.set(deltaY);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
    setIsHovered(false);
  };

  return (
    <motion.button
      ref={ref}
      onClick={onClick}
      initial={{ opacity: 0, scale: 0, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ delay, type: 'spring', stiffness: 200, damping: 20 }}
      style={{ x: xSpring, y: ySpring }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      className={`relative group cursor-pointer ${isExpanded ? 'z-10' : ''}`}
    >
      <motion.div
        animate={{ 
          scale: isHovered ? 1.1 : 1,
          boxShadow: isHovered ? '0 10px 40px rgba(0,0,0,0.3)' : '0 4px 20px rgba(0,0,0,0.2)'
        }}
        className={`px-4 py-2 rounded-full border transition-all duration-300 ${
          isExpanded 
            ? `bg-gradient-to-r ${categoryColor.gradient} border-transparent text-white` 
            : `bg-card/80 border-border/50 hover:border-primary/50`
        }`}
      >
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium whitespace-nowrap">{skill.name}</span>
          {isHovered && !isExpanded && (
            <motion.span
              initial={{ opacity: 0, width: 0 }}
              animate={{ opacity: 1, width: 'auto' }}
              exit={{ opacity: 0, width: 0 }}
              className="text-xs font-mono text-primary"
            >
              {skill.level}%
            </motion.span>
          )}
        </div>
        
        {/* Progress indicator */}
        {isExpanded && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            className="mt-2"
          >
            <div className="h-1.5 rounded-full bg-white/20 overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${skill.level}%` }}
                transition={{ delay: 0.2, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                className="h-full rounded-full bg-white"
              />
            </div>
            <span className="text-xs mt-1 block text-white/80">{skill.level}% proficiency</span>
          </motion.div>
        )}
      </motion.div>
      
      {/* Glow effect on hover */}
      {isHovered && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.5 }}
          className={`absolute inset-0 rounded-full blur-xl bg-gradient-to-r ${categoryColor.gradient} -z-10`}
        />
      )}
    </motion.button>
  );
}

// Interactive category card with 3D tilt effect
function SkillCategory({ 
  category, 
  skillList, 
  index 
}: { 
  category: string; 
  skillList: { name: string; level: number }[]; 
  index: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [expandedSkill, setExpandedSkill] = useState<string | null>(null);
  const [isHovered, setIsHovered] = useState(false);
  
  const Icon = categoryIcons[category] || Cpu;
  const colors = categoryColors[category];

  // 3D tilt effect
  const rotateX = useMotionValue(0);
  const rotateY = useMotionValue(0);
  
  const springConfig = { damping: 20, stiffness: 300 };
  const rotateXSpring = useSpring(rotateX, springConfig);
  const rotateYSpring = useSpring(rotateY, springConfig);
  
  // Glow position
  const glowX = useMotionValue(50);
  const glowY = useMotionValue(50);

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;
    
    rotateX.set((y - 0.5) * -10);
    rotateY.set((x - 0.5) * 10);
    
    glowX.set(x * 100);
    glowY.set(y * 100);
  };

  const handleMouseLeave = () => {
    rotateX.set(0);
    rotateY.set(0);
    setIsHovered(false);
  };

  const glowBackground = useTransform(
    [glowX, glowY],
    ([x, y]) => `radial-gradient(circle at ${x}% ${y}%, hsl(var(--primary) / 0.15), transparent 50%)`
  );

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ delay: index * 0.1, duration: 0.6 }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      style={{ 
        rotateX: rotateXSpring, 
        rotateY: rotateYSpring,
        transformPerspective: 1000,
      }}
      className="relative group"
    >
      <motion.div 
        className={`p-6 rounded-2xl border border-border/50 bg-card/50 backdrop-blur-sm transition-all duration-300 ${
          isHovered ? 'border-primary/30' : ''
        }`}
        style={{ background: isHovered ? glowBackground : undefined }}
      >
        {/* Header */}
        <div className="flex items-center gap-3 mb-6">
          <motion.div 
            animate={{ 
              scale: isHovered ? 1.1 : 1,
              rotate: isHovered ? 5 : 0
            }}
            className={`p-3 rounded-xl bg-gradient-to-br ${colors.gradient} shadow-lg ${colors.glow}`}
          >
            <Icon className="w-5 h-5 text-white" />
          </motion.div>
          <div>
            <h3 className="text-lg font-bold">{category}</h3>
            <p className="text-xs text-muted-foreground">{skillList.length} skills</p>
          </div>
          {isHovered && (
            <motion.div
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              className="ml-auto"
            >
              <Sparkles className="w-4 h-4 text-primary animate-pulse" />
            </motion.div>
          )}
        </div>

        {/* Skill pills */}
        <div className="flex flex-wrap gap-2">
          {skillList.map((skill, i) => (
            <SkillPill
              key={skill.name}
              skill={skill}
              categoryColor={colors}
              delay={index * 0.1 + i * 0.05}
              isExpanded={expandedSkill === skill.name}
              onClick={() => setExpandedSkill(expandedSkill === skill.name ? null : skill.name)}
            />
          ))}
        </div>

        {/* Animated corner accent */}
        <motion.div
          animate={{ 
            opacity: isHovered ? 1 : 0,
            scale: isHovered ? 1 : 0.8
          }}
          className={`absolute -top-1 -right-1 w-16 h-16 bg-gradient-to-br ${colors.gradient} rounded-full blur-2xl opacity-30`}
        />
      </motion.div>
    </motion.div>
  );
}

// Interactive floating orb
function FloatingOrb({ category, index, total }: { category: string; index: number; total: number }) {
  const [isHovered, setIsHovered] = useState(false);
  const colors = categoryColors[category];
  const Icon = categoryIcons[category];
  
  const angle = (index * 360) / total - 90;
  const radius = 90;
  const x = Math.cos((angle * Math.PI) / 180) * radius;
  const y = Math.sin((angle * Math.PI) / 180) * radius;

  return (
    <motion.div
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ delay: 0.3 + index * 0.15, type: 'spring', stiffness: 200 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="absolute cursor-pointer"
      style={{
        left: `calc(50% + ${x}px - 1.5rem)`,
        top: `calc(50% + ${y}px - 1.5rem)`,
      }}
    >
      <motion.div
        animate={{ 
          scale: isHovered ? 1.3 : 1,
          y: isHovered ? -5 : 0
        }}
        whileTap={{ scale: 0.9 }}
        transition={{ type: 'spring', stiffness: 400, damping: 15 }}
        className={`w-12 h-12 rounded-full bg-gradient-to-br ${colors.gradient} flex items-center justify-center shadow-xl ${colors.glow} cursor-pointer relative`}
      >
        <Icon className="w-5 h-5 text-white" />
        
        {/* Pulse ring */}
        <motion.div
          animate={{ 
            scale: [1, 1.5, 1],
            opacity: [0.5, 0, 0.5]
          }}
          transition={{ duration: 2, repeat: Infinity, delay: index * 0.3 }}
          className={`absolute inset-0 rounded-full bg-gradient-to-br ${colors.gradient}`}
        />
      </motion.div>
      
      {/* Tooltip */}
      <motion.div
        initial={{ opacity: 0, y: 10, scale: 0.8 }}
        animate={{ 
          opacity: isHovered ? 1 : 0, 
          y: isHovered ? 0 : 10,
          scale: isHovered ? 1 : 0.8
        }}
        className="absolute left-1/2 -translate-x-1/2 top-14 whitespace-nowrap px-3 py-1.5 rounded-lg bg-card border border-border text-xs font-medium shadow-lg z-10"
      >
        <span className="flex items-center gap-1.5">
          <Zap className="w-3 h-3 text-primary" />
          {category}
        </span>
      </motion.div>
    </motion.div>
  );
}

export default function Skills() {
  const categories = Object.keys(skills);
  const [activeOrb, setActiveOrb] = useState<string | null>(null);

  return (
    <section id="skills" className="section-padding relative overflow-hidden">
      <div className="container-max">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
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
            Hover, click, and interact with each skill to explore proficiency levels
          </p>
        </motion.div>

        {/* Interactive radar visualization */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="flex justify-center mb-16"
        >
          <div className="relative w-56 h-56">
            {/* Animated radar circles */}
            {[1, 2, 3, 4].map((ring) => (
              <motion.div
                key={ring}
                initial={{ scale: 0, opacity: 0 }}
                whileInView={{ scale: ring * 0.25, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: ring * 0.1, duration: 0.5 }}
                className="absolute inset-0 rounded-full border border-primary/20"
              />
            ))}
            
            {/* Rotating scanner line */}
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
              className="absolute inset-0 flex items-center justify-center"
            >
              <div className="w-1/2 h-0.5 bg-gradient-to-r from-primary to-transparent origin-left" />
            </motion.div>

            {/* Category orbs */}
            {categories.map((category, i) => (
              <FloatingOrb
                key={category}
                category={category}
                index={i}
                total={categories.length}
              />
            ))}

            {/* Center pulse */}
            <div className="absolute inset-0 flex items-center justify-center">
              <motion.div 
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="w-4 h-4 rounded-full bg-primary shadow-lg shadow-primary/50"
              />
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
