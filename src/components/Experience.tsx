import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect, useRef } from 'react';
import { experiences } from '@/data/portfolio';
import { X, File, Folder, ChevronDown, Play, Terminal, Building2, Calendar, MapPin } from 'lucide-react';

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
      
      // Hide cursor after line is "typed"
      const cursorTimer = setTimeout(() => {
        setShowCursor(false);
        onComplete?.();
      }, 300);
      
      return () => clearTimeout(cursorTimer);
    }, delay);
    
    return () => clearTimeout(timer);
  }, [delay, onComplete]);

  return (
    <motion.div 
      className="flex hover:bg-[#2a2d3e] transition-colors"
      initial={{ opacity: 0, x: -10 }}
      animate={{ opacity: isVisible ? 1 : 0, x: isVisible ? 0 : -10 }}
      transition={{ duration: 0.15 }}
    >
      <span className="w-10 md:w-12 text-right pr-3 md:pr-4 text-[#858585] select-none text-xs md:text-sm shrink-0 font-mono">
        {lineNum}
      </span>
      <span className="flex-1 text-xs md:text-sm font-mono whitespace-pre-wrap">
        {isVisible && content}
        {showCursor && (
          <motion.span 
            className="inline-block w-0.5 h-4 bg-[#aeafad] ml-0.5"
            animate={{ opacity: [1, 0] }}
            transition={{ duration: 0.4, repeat: Infinity }}
          />
        )}
      </span>
    </motion.div>
  );
}

function ExperienceCard({ 
  experience, 
  isSelected, 
  onClick 
}: { 
  experience: typeof experiences[0]; 
  isSelected: boolean;
  onClick: () => void;
}) {
  return (
    <motion.button
      onClick={onClick}
      className={`w-full text-left p-4 md:p-5 rounded-xl border transition-all duration-300 ${
        isSelected 
          ? 'bg-primary/10 border-primary shadow-lg shadow-primary/20' 
          : 'bg-card/50 border-border/50 hover:border-primary/50 hover:bg-card'
      }`}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <span className={`px-2 py-0.5 text-xs rounded-full ${
              experience.type === 'Research' 
                ? 'bg-blue-500/20 text-blue-400' 
                : 'bg-emerald-500/20 text-emerald-400'
            }`}>
              {experience.type}
            </span>
          </div>
          <h3 className="font-semibold text-foreground text-sm md:text-base truncate">
            {experience.role}
          </h3>
          <div className="flex items-center gap-2 mt-1 text-muted-foreground text-xs md:text-sm">
            <Building2 className="w-3 h-3 shrink-0" />
            <span className="truncate">{experience.company}</span>
          </div>
          <div className="flex items-center gap-3 mt-2 text-muted-foreground/70 text-xs">
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
        
        {isSelected && (
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="shrink-0"
          >
            <Play className="w-5 h-5 text-primary fill-primary" />
          </motion.div>
        )}
      </div>
    </motion.button>
  );
}

function CodeEditor({ experience, isTyping }: { experience: typeof experiences[0] | null; isTyping: boolean }) {
  const [key, setKey] = useState(0);
  
  // Reset animation when experience changes
  useEffect(() => {
    setKey(prev => prev + 1);
  }, [experience?.id]);

  if (!experience) {
    return (
      <div className="flex items-center justify-center h-full text-muted-foreground font-mono text-sm">
        <div className="text-center">
          <Terminal className="w-12 h-12 mx-auto mb-4 opacity-30" />
          <p className={syntax.comment}>// Select an experience to view code</p>
        </div>
      </div>
    );
  }

  const baseDelay = 100;
  const lineDelay = 80;
  let line = 1;

  return (
    <div key={key} className="space-y-0">
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
      
      {/* Empty line */}
      <TypewriterLine 
        lineNum={line++} 
        delay={baseDelay + lineDelay * 4} 
        content={<span> </span>} 
      />
      
      {/* Const declaration */}
      <TypewriterLine 
        lineNum={line++} 
        delay={baseDelay + lineDelay * 5} 
        content={
          <>
            <span className={syntax.keyword}>const</span>{' '}
            <span className={syntax.variable}>{experience.company.replace(/\s+/g, '').toLowerCase()}</span>{' '}
            <span className={syntax.operator}>=</span>{' '}
            <span className={syntax.bracket}>{'{'}</span>
          </>
        } 
      />
      
      {/* Role */}
      <TypewriterLine 
        lineNum={line++} 
        delay={baseDelay + lineDelay * 6} 
        content={
          <>
            {'  '}<span className={syntax.property}>role</span>
            <span className={syntax.punctuation}>:</span>{' '}
            <span className={syntax.string}>"{experience.role}"</span>
            <span className={syntax.punctuation}>,</span>
          </>
        } 
      />
      
      {/* Company */}
      <TypewriterLine 
        lineNum={line++} 
        delay={baseDelay + lineDelay * 7} 
        content={
          <>
            {'  '}<span className={syntax.property}>company</span>
            <span className={syntax.punctuation}>:</span>{' '}
            <span className={syntax.string}>"{experience.company}"</span>
            <span className={syntax.punctuation}>,</span>
          </>
        } 
      />
      
      {/* Department if exists */}
      {experience.department && (
        <TypewriterLine 
          lineNum={line++} 
          delay={baseDelay + lineDelay * 8} 
          content={
            <>
              {'  '}<span className={syntax.property}>department</span>
              <span className={syntax.punctuation}>:</span>{' '}
              <span className={syntax.string}>"{experience.department}"</span>
              <span className={syntax.punctuation}>,</span>
            </>
          } 
        />
      )}
      
      {/* Location */}
      <TypewriterLine 
        lineNum={line++} 
        delay={baseDelay + lineDelay * (experience.department ? 9 : 8)} 
        content={
          <>
            {'  '}<span className={syntax.property}>location</span>
            <span className={syntax.punctuation}>:</span>{' '}
            <span className={syntax.string}>"{experience.location}"</span>
            <span className={syntax.punctuation}>,</span>
          </>
        } 
      />
      
      {/* Empty line before achievements */}
      <TypewriterLine 
        lineNum={line++} 
        delay={baseDelay + lineDelay * (experience.department ? 10 : 9)} 
        content={<span> </span>} 
      />
      
      {/* Achievements comment */}
      <TypewriterLine 
        lineNum={line++} 
        delay={baseDelay + lineDelay * (experience.department ? 11 : 10)} 
        content={<span className={syntax.comment}>{'  '}// Key achievements</span>} 
      />
      
      {/* Achievements array */}
      <TypewriterLine 
        lineNum={line++} 
        delay={baseDelay + lineDelay * (experience.department ? 12 : 11)} 
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
          delay={baseDelay + lineDelay * ((experience.department ? 13 : 12) + i)} 
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
        delay={baseDelay + lineDelay * ((experience.department ? 13 : 12) + experience.achievements.length)} 
        content={<>{'  '}<span className={syntax.bracket}>]</span><span className={syntax.punctuation}>,</span></>} 
      />
      
      {/* Empty line */}
      <TypewriterLine 
        lineNum={line++} 
        delay={baseDelay + lineDelay * ((experience.department ? 14 : 13) + experience.achievements.length)} 
        content={<span> </span>} 
      />
      
      {/* Technologies */}
      <TypewriterLine 
        lineNum={line++} 
        delay={baseDelay + lineDelay * ((experience.department ? 15 : 14) + experience.achievements.length)} 
        content={<span className={syntax.comment}>{'  '}// Tech stack</span>} 
      />
      
      <TypewriterLine 
        lineNum={line++} 
        delay={baseDelay + lineDelay * ((experience.department ? 16 : 15) + experience.achievements.length)} 
        content={
          <>
            {'  '}<span className={syntax.property}>technologies</span>
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
      
      {/* Closing brace */}
      <TypewriterLine 
        lineNum={line++} 
        delay={baseDelay + lineDelay * ((experience.department ? 17 : 16) + experience.achievements.length)} 
        content={<span className={syntax.bracket}>{'}'}</span>} 
      />
      
      {/* Empty line */}
      <TypewriterLine 
        lineNum={line++} 
        delay={baseDelay + lineDelay * ((experience.department ? 18 : 17) + experience.achievements.length)} 
        content={<span> </span>} 
      />
      
      {/* Export */}
      <TypewriterLine 
        lineNum={line++} 
        delay={baseDelay + lineDelay * ((experience.department ? 19 : 18) + experience.achievements.length)} 
        content={
          <>
            <span className={syntax.keyword}>export default</span>{' '}
            <span className={syntax.variable}>{experience.company.replace(/\s+/g, '').toLowerCase()}</span>
            <span className={syntax.punctuation}>;</span>
          </>
        } 
      />
    </div>
  );
}

export default function Experience() {
  const [selectedExp, setSelectedExp] = useState<typeof experiences[0] | null>(null);
  const [isTyping, setIsTyping] = useState(false);

  const handleSelectExperience = (exp: typeof experiences[0]) => {
    if (selectedExp?.id === exp.id) return;
    setSelectedExp(exp);
    setIsTyping(true);
  };

  return (
    <section id="experience" className="py-20 md:py-32 px-4 relative">
      <div className="max-w-7xl mx-auto">
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
            Click on an experience to see the code write itself
          </p>
        </motion.div>

        {/* Main content - Cards + Editor */}
        <div className="grid lg:grid-cols-2 gap-6 lg:gap-8">
          {/* Experience Cards */}
          <motion.div 
            className="space-y-4"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex items-center gap-2 mb-4 text-sm text-muted-foreground font-mono">
              <Folder className="w-4 h-4 text-primary" />
              <span>experiences/</span>
            </div>
            
            {experiences.map((exp) => (
              <ExperienceCard
                key={exp.id}
                experience={exp}
                isSelected={selectedExp?.id === exp.id}
                onClick={() => handleSelectExperience(exp)}
              />
            ))}
          </motion.div>

          {/* VS Code Editor */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:sticky lg:top-24 h-fit"
          >
            <div className="rounded-xl overflow-hidden border border-[#3c3c3c] shadow-2xl bg-[#1e1e1e]">
              {/* Title bar */}
              <div className="flex items-center justify-between px-4 py-2 bg-[#323233] border-b border-[#3c3c3c]">
                <div className="flex gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-[#ff5f57]" />
                  <div className="w-3 h-3 rounded-full bg-[#febc2e]" />
                  <div className="w-3 h-3 rounded-full bg-[#28c840]" />
                </div>
                <span className="text-xs text-[#8c8c8c] font-mono">
                  {selectedExp ? `${selectedExp.company.toLowerCase().replace(/\s+/g, '_')}.ts` : 'experience.ts'}
                </span>
                <div className="w-12" />
              </div>
              
              {/* Tabs */}
              <div className="flex bg-[#252526] border-b border-[#3c3c3c] overflow-x-auto">
                <AnimatePresence mode="popLayout">
                  {selectedExp && (
                    <motion.div 
                      key={selectedExp.id}
                      initial={{ opacity: 0, width: 0 }}
                      animate={{ opacity: 1, width: 'auto' }}
                      exit={{ opacity: 0, width: 0 }}
                      className="flex items-center gap-2 px-4 py-2 bg-[#1e1e1e] border-r border-[#3c3c3c] shrink-0"
                    >
                      <File className="w-4 h-4 text-[#519aba]" />
                      <span className="text-sm text-[#d4d4d4] whitespace-nowrap">
                        {selectedExp.company.toLowerCase().replace(/\s+/g, '_')}.ts
                      </span>
                      <X className="w-3 h-3 text-[#8c8c8c]" />
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
              
              {/* Code area */}
              <div className="p-4 min-h-[400px] max-h-[500px] overflow-y-auto">
                <CodeEditor experience={selectedExp} isTyping={isTyping} />
              </div>
              
              {/* Status bar */}
              <div className="flex items-center justify-between px-4 py-1 bg-[#007acc] text-white text-xs">
                <div className="flex items-center gap-4">
                  <span>main</span>
                  <span>TypeScript</span>
                  {isTyping && (
                    <motion.span 
                      className="flex items-center gap-1"
                      animate={{ opacity: [0.5, 1, 0.5] }}
                      transition={{ duration: 1, repeat: Infinity }}
                    >
                      ● Writing...
                    </motion.span>
                  )}
                </div>
                <div className="flex items-center gap-4">
                  <span>UTF-8</span>
                  <span>Spaces: 2</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
