import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import { experiences } from '@/data/portfolio';
import { File, X, Building2, Calendar, MapPin } from 'lucide-react';

// VS Code syntax colors
const syntax = {
  keyword: 'text-[#C586C0]',
  string: 'text-[#CE9178]',
  type: 'text-[#4EC9B0]',
  variable: 'text-[#9CDCFE]',
  property: 'text-[#9CDCFE]',
  comment: 'text-[#6A9955]',
  bracket: 'text-[#FFD700]',
  punctuation: 'text-[#D4D4D4]',
  operator: 'text-[#D4D4D4]',
};

interface TypewriterLineProps {
  content: React.ReactNode;
  lineNum: number;
  delay: number;
  onComplete?: () => void;
}

function TypewriterLine({ content, lineNum, delay, onComplete }: TypewriterLineProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [showCursor, setShowCursor] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
      setShowCursor(true);
      
      const cursorTimer = setTimeout(() => {
        setShowCursor(false);
        onComplete?.();
      }, 250);
      
      return () => clearTimeout(cursorTimer);
    }, delay);
    
    return () => clearTimeout(timer);
  }, [delay, onComplete]);

  return (
    <motion.div 
      className="flex hover:bg-[#2a2d3e] transition-colors"
      initial={{ opacity: 0, x: -10 }}
      animate={{ opacity: isVisible ? 1 : 0, x: isVisible ? 0 : -10 }}
      transition={{ duration: 0.12 }}
    >
      <span className="w-8 md:w-10 text-right pr-2 md:pr-3 text-[#858585] select-none text-xs shrink-0 font-mono">
        {lineNum}
      </span>
      <span className="flex-1 text-xs font-mono whitespace-pre-wrap">
        {isVisible && content}
        {showCursor && (
          <motion.span 
            className="inline-block w-0.5 h-3.5 bg-[#aeafad] ml-0.5"
            animate={{ opacity: [1, 0] }}
            transition={{ duration: 0.4, repeat: Infinity }}
          />
        )}
      </span>
    </motion.div>
  );
}

function CodeEditorModal({ 
  experience, 
  onClose 
}: { 
  experience: typeof experiences[0]; 
  onClose: () => void;
}) {
  const [key, setKey] = useState(0);
  
  useEffect(() => {
    setKey(prev => prev + 1);
  }, [experience.id]);

  // Close on escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, [onClose]);

  const baseDelay = 50;
  const lineDelay = 60;
  let line = 1;

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
      <div className="absolute inset-0 bg-background/80 backdrop-blur-sm" />
      
      {/* Modal Window */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.9, y: 20 }}
        transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
        className="relative w-full max-w-2xl max-h-[80vh] rounded-xl overflow-hidden border border-[#3c3c3c] bg-[#1e1e1e] shadow-2xl shadow-primary/10"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Title bar */}
        <div className="flex items-center justify-between px-4 py-2.5 bg-[#323233] border-b border-[#3c3c3c]">
          <div className="flex items-center gap-3">
            <div className="flex gap-1.5">
              <button 
                onClick={onClose}
                className="w-3 h-3 rounded-full bg-[#ff5f57] hover:bg-[#ff5f57]/80 transition-colors"
              />
              <div className="w-3 h-3 rounded-full bg-[#febc2e]" />
              <div className="w-3 h-3 rounded-full bg-[#28c840]" />
            </div>
            <div className="flex items-center gap-2 ml-2">
              <File className="w-4 h-4 text-[#519aba]" />
              <span className="text-sm text-[#d4d4d4] font-mono">
                {experience.company.toLowerCase().replace(/\s+/g, '_')}.ts
              </span>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <motion.span 
              className="text-xs text-[#4ec9b0] font-mono flex items-center gap-1.5"
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              <span className="w-2 h-2 rounded-full bg-[#4ec9b0]" />
              typing...
            </motion.span>
            <button 
              onClick={onClose}
              className="p-1 rounded hover:bg-[#404040] transition-colors"
            >
              <X className="w-4 h-4 text-[#858585]" />
            </button>
          </div>
        </div>
        
        {/* Code area */}
        <div key={key} className="p-4 max-h-[60vh] overflow-y-auto space-y-0">
          {/* Comment header */}
          <TypewriterLine 
            lineNum={line++} 
            delay={baseDelay} 
            content={<span className={syntax.comment}>/**</span>} 
          />
          <TypewriterLine 
            lineNum={line++} 
            delay={baseDelay + lineDelay} 
            content={<span className={syntax.comment}> * {experience.role} @ {experience.company}</span>} 
          />
          <TypewriterLine 
            lineNum={line++} 
            delay={baseDelay + lineDelay * 2} 
            content={<span className={syntax.comment}> * {experience.period}</span>} 
          />
          <TypewriterLine 
            lineNum={line++} 
            delay={baseDelay + lineDelay * 3} 
            content={<span className={syntax.comment}> */</span>} 
          />
          
          <TypewriterLine 
            lineNum={line++} 
            delay={baseDelay + lineDelay * 4} 
            content={<span> </span>} 
          />
          
          {/* Interface declaration */}
          <TypewriterLine 
            lineNum={line++} 
            delay={baseDelay + lineDelay * 5} 
            content={
              <>
                <span className={syntax.keyword}>interface</span>{' '}
                <span className={syntax.type}>Experience</span>{' '}
                <span className={syntax.bracket}>{'{'}</span>
              </>
            } 
          />
          
          <TypewriterLine 
            lineNum={line++} 
            delay={baseDelay + lineDelay * 6} 
            content={
              <>
                {'  '}<span className={syntax.property}>role</span>
                <span className={syntax.punctuation}>:</span>{' '}
                <span className={syntax.type}>string</span>
                <span className={syntax.punctuation}>;</span>
              </>
            } 
          />
          
          <TypewriterLine 
            lineNum={line++} 
            delay={baseDelay + lineDelay * 7} 
            content={
              <>
                {'  '}<span className={syntax.property}>achievements</span>
                <span className={syntax.punctuation}>:</span>{' '}
                <span className={syntax.type}>string[]</span>
                <span className={syntax.punctuation}>;</span>
              </>
            } 
          />
          
          <TypewriterLine 
            lineNum={line++} 
            delay={baseDelay + lineDelay * 8} 
            content={
              <>
                {'  '}<span className={syntax.property}>stack</span>
                <span className={syntax.punctuation}>:</span>{' '}
                <span className={syntax.type}>string[]</span>
                <span className={syntax.punctuation}>;</span>
              </>
            } 
          />
          
          <TypewriterLine 
            lineNum={line++} 
            delay={baseDelay + lineDelay * 9} 
            content={<span className={syntax.bracket}>{'}'}</span>} 
          />
          
          <TypewriterLine 
            lineNum={line++} 
            delay={baseDelay + lineDelay * 10} 
            content={<span> </span>} 
          />
          
          {/* Const declaration */}
          <TypewriterLine 
            lineNum={line++} 
            delay={baseDelay + lineDelay * 11} 
            content={
              <>
                <span className={syntax.keyword}>const</span>{' '}
                <span className={syntax.variable}>{experience.company.replace(/\s+/g, '').toLowerCase()}</span>
                <span className={syntax.punctuation}>:</span>{' '}
                <span className={syntax.type}>Experience</span>{' '}
                <span className={syntax.operator}>=</span>{' '}
                <span className={syntax.bracket}>{'{'}</span>
              </>
            } 
          />
          
          <TypewriterLine 
            lineNum={line++} 
            delay={baseDelay + lineDelay * 12} 
            content={
              <>
                {'  '}<span className={syntax.property}>role</span>
                <span className={syntax.punctuation}>:</span>{' '}
                <span className={syntax.string}>"{experience.role}"</span>
                <span className={syntax.punctuation}>,</span>
              </>
            } 
          />
          
          <TypewriterLine 
            lineNum={line++} 
            delay={baseDelay + lineDelay * 13} 
            content={<span> </span>} 
          />
          
          <TypewriterLine 
            lineNum={line++} 
            delay={baseDelay + lineDelay * 14} 
            content={<span className={syntax.comment}>{'  '}// Key achievements</span>} 
          />
          
          <TypewriterLine 
            lineNum={line++} 
            delay={baseDelay + lineDelay * 15} 
            content={
              <>
                {'  '}<span className={syntax.property}>achievements</span>
                <span className={syntax.punctuation}>:</span>{' '}
                <span className={syntax.bracket}>[</span>
              </>
            } 
          />
          
          {experience.achievements.map((achievement, i) => (
            <TypewriterLine 
              key={i}
              lineNum={line++} 
              delay={baseDelay + lineDelay * (16 + i)} 
              content={
                <>
                  {'    '}<span className={syntax.string}>"{achievement}"</span>
                  {i < experience.achievements.length - 1 && <span className={syntax.punctuation}>,</span>}
                </>
              } 
            />
          ))}
          
          <TypewriterLine 
            lineNum={line++} 
            delay={baseDelay + lineDelay * (16 + experience.achievements.length)} 
            content={<>{'  '}<span className={syntax.bracket}>]</span><span className={syntax.punctuation}>,</span></>} 
          />
          
          <TypewriterLine 
            lineNum={line++} 
            delay={baseDelay + lineDelay * (17 + experience.achievements.length)} 
            content={<span> </span>} 
          />
          
          <TypewriterLine 
            lineNum={line++} 
            delay={baseDelay + lineDelay * (18 + experience.achievements.length)} 
            content={<span className={syntax.comment}>{'  '}// Tech stack</span>} 
          />
          
          <TypewriterLine 
            lineNum={line++} 
            delay={baseDelay + lineDelay * (19 + experience.achievements.length)} 
            content={
              <>
                {'  '}<span className={syntax.property}>stack</span>
                <span className={syntax.punctuation}>:</span>{' '}
                <span className={syntax.bracket}>[</span>
                {experience.technologies.map((tech, i) => (
                  <span key={tech}>
                    <span className={syntax.string}>"{tech}"</span>
                    {i < experience.technologies.length - 1 && <span className={syntax.punctuation}>, </span>}
                  </span>
                ))}
                <span className={syntax.bracket}>]</span>
              </>
            } 
          />
          
          <TypewriterLine 
            lineNum={line++} 
            delay={baseDelay + lineDelay * (20 + experience.achievements.length)} 
            content={<span className={syntax.bracket}>{'}'}</span>} 
          />
          
          <TypewriterLine 
            lineNum={line++} 
            delay={baseDelay + lineDelay * (21 + experience.achievements.length)} 
            content={<span> </span>} 
          />
          
          <TypewriterLine 
            lineNum={line++} 
            delay={baseDelay + lineDelay * (22 + experience.achievements.length)} 
            content={
              <>
                <span className={syntax.keyword}>export default</span>{' '}
                <span className={syntax.variable}>{experience.company.replace(/\s+/g, '').toLowerCase()}</span>
                <span className={syntax.punctuation}>;</span>
              </>
            } 
          />
        </div>
        
        {/* Status bar */}
        <div className="flex items-center justify-between px-4 py-1.5 bg-[#007acc] text-white text-xs">
          <div className="flex items-center gap-4">
            <span>TypeScript</span>
            <span>UTF-8</span>
          </div>
          <span>Ln {line - 1}, Col 1</span>
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
          <CodeEditorModal 
            experience={selectedExperience} 
            onClose={() => setSelectedExperience(null)} 
          />
        )}
      </AnimatePresence>
    </section>
  );
}
