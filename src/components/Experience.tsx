import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';
import { experiences } from '@/data/portfolio';
import { X, File, Folder, ChevronRight, ChevronDown } from 'lucide-react';

// VS Code syntax colors
const syntax = {
  keyword: 'text-[#C586C0]',
  function: 'text-[#DCDCAA]',
  string: 'text-[#CE9178]',
  number: 'text-[#B5CEA8]',
  type: 'text-[#4EC9B0]',
  variable: 'text-[#9CDCFE]',
  property: 'text-[#9CDCFE]',
  comment: 'text-[#6A9955]',
  bracket: 'text-[#FFD700]',
  punctuation: 'text-[#D4D4D4]',
  operator: 'text-[#D4D4D4]',
};

interface CodeLineProps {
  lineNum: number;
  children: React.ReactNode;
  isVisible: boolean;
  isActive?: boolean;
  typingProgress?: number;
}

function CodeLine({ lineNum, children, isVisible, isActive, typingProgress = 1 }: CodeLineProps) {
  return (
    <motion.div 
      className={`flex transition-all duration-300 ${
        isActive ? 'bg-[#264f78]/30' : 'hover:bg-[#2a2d3e]'
      } ${isVisible ? 'opacity-100' : 'opacity-0'}`}
      initial={false}
      animate={{ 
        x: isVisible ? 0 : -20,
        opacity: isVisible ? 1 : 0
      }}
      transition={{ duration: 0.3 }}
    >
      <span className={`w-12 text-right pr-4 select-none text-sm shrink-0 font-mono transition-colors ${
        isActive ? 'text-[#c6c6c6]' : 'text-[#858585]'
      }`}>
        {lineNum}
      </span>
      <span className="flex-1 text-sm font-mono whitespace-pre-wrap relative">
        {children}
        {isActive && typingProgress < 1 && (
          <motion.span 
            className="inline-block w-0.5 h-4 bg-[#aeafad] ml-0.5"
            animate={{ opacity: [1, 0] }}
            transition={{ duration: 0.53, repeat: Infinity }}
          />
        )}
      </span>
    </motion.div>
  );
}

interface ExperienceBlockProps {
  experience: typeof experiences[0];
  startLine: number;
  scrollProgress: number;
  blockIndex: number;
  totalBlocks: number;
}

function ExperienceBlock({ experience, startLine, scrollProgress, blockIndex, totalBlocks }: ExperienceBlockProps) {
  // Each block takes up a portion of scroll
  const blockSize = 1 / (totalBlocks + 1);
  const blockStart = blockIndex * blockSize;
  const blockEnd = (blockIndex + 1) * blockSize;
  
  // Local progress within this block (0 to 1)
  const localProgress = Math.max(0, Math.min(1, (scrollProgress - blockStart) / blockSize));
  
  // Total lines in this block
  const totalLines = 14 + experience.achievements.length + (experience.department ? 1 : 0);
  const visibleLines = Math.ceil(localProgress * totalLines);
  
  let line = startLine;
  const isBlockActive = scrollProgress >= blockStart && scrollProgress <= blockEnd;

  return (
    <div className={`transition-all duration-500 ${isBlockActive ? 'scale-100' : 'scale-[0.98] opacity-70'}`}>
      {/* Object opening */}
      <CodeLine lineNum={line++} isVisible={visibleLines >= 1} isActive={isBlockActive && visibleLines === 1}>
        {'  '}<span className={syntax.bracket}>{'{'}</span>
      </CodeLine>
      
      {/* Role */}
      <CodeLine lineNum={line++} isVisible={visibleLines >= 2} isActive={isBlockActive && visibleLines === 2}>
        {'    '}<span className={syntax.property}>role</span>
        <span className={syntax.punctuation}>:</span>{' '}
        <span className={syntax.string}>"{experience.role}"</span>
        <span className={syntax.punctuation}>,</span>
      </CodeLine>
      
      {/* Company */}
      <CodeLine lineNum={line++} isVisible={visibleLines >= 3} isActive={isBlockActive && visibleLines === 3}>
        {'    '}<span className={syntax.property}>company</span>
        <span className={syntax.punctuation}>:</span>{' '}
        <span className={syntax.string}>"{experience.company}"</span>
        <span className={syntax.punctuation}>,</span>
      </CodeLine>
      
      {/* Department */}
      {experience.department && (
        <CodeLine lineNum={line++} isVisible={visibleLines >= 4} isActive={isBlockActive && visibleLines === 4}>
          {'    '}<span className={syntax.property}>department</span>
          <span className={syntax.punctuation}>:</span>{' '}
          <span className={syntax.string}>"{experience.department}"</span>
          <span className={syntax.punctuation}>,</span>
        </CodeLine>
      )}
      
      {/* Period */}
      <CodeLine lineNum={line++} isVisible={visibleLines >= (experience.department ? 5 : 4)} isActive={isBlockActive && visibleLines === (experience.department ? 5 : 4)}>
        {'    '}<span className={syntax.property}>period</span>
        <span className={syntax.punctuation}>:</span>{' '}
        <span className={syntax.string}>"{experience.period}"</span>
        <span className={syntax.punctuation}>,</span>
      </CodeLine>
      
      {/* Location */}
      <CodeLine lineNum={line++} isVisible={visibleLines >= (experience.department ? 6 : 5)} isActive={isBlockActive && visibleLines === (experience.department ? 6 : 5)}>
        {'    '}<span className={syntax.property}>location</span>
        <span className={syntax.punctuation}>:</span>{' '}
        <span className={syntax.string}>"{experience.location}"</span>
        <span className={syntax.punctuation}>,</span>
      </CodeLine>
      
      {/* Type badge */}
      <CodeLine lineNum={line++} isVisible={visibleLines >= (experience.department ? 7 : 6)} isActive={isBlockActive && visibleLines === (experience.department ? 7 : 6)}>
        {'    '}<span className={syntax.property}>type</span>
        <span className={syntax.punctuation}>:</span>{' '}
        <span className={syntax.type}>{experience.type}</span>
        <span className={syntax.punctuation}>,</span>
      </CodeLine>
      
      {/* Achievements comment */}
      <CodeLine lineNum={line++} isVisible={visibleLines >= (experience.department ? 8 : 7)} isActive={isBlockActive && visibleLines === (experience.department ? 8 : 7)}>
        {'    '}<span className={syntax.comment}>// Key achievements</span>
      </CodeLine>
      
      {/* Achievements array opening */}
      <CodeLine lineNum={line++} isVisible={visibleLines >= (experience.department ? 9 : 8)} isActive={isBlockActive && visibleLines === (experience.department ? 9 : 8)}>
        {'    '}<span className={syntax.property}>achievements</span>
        <span className={syntax.punctuation}>:</span>{' '}
        <span className={syntax.bracket}>[</span>
      </CodeLine>
      
      {/* Achievement items */}
      {experience.achievements.map((achievement, i) => {
        const achievementLineNum = experience.department ? 10 + i : 9 + i;
        return (
          <CodeLine 
            key={i} 
            lineNum={line++} 
            isVisible={visibleLines >= achievementLineNum}
            isActive={isBlockActive && visibleLines === achievementLineNum}
          >
            {'      '}<span className={syntax.string}>"{achievement}"</span>
            {i < experience.achievements.length - 1 && <span className={syntax.punctuation}>,</span>}
          </CodeLine>
        );
      })}
      
      {/* Achievements array closing */}
      <CodeLine 
        lineNum={line++} 
        isVisible={visibleLines >= (experience.department ? 10 : 9) + experience.achievements.length}
        isActive={isBlockActive && visibleLines === (experience.department ? 10 : 9) + experience.achievements.length}
      >
        {'    '}<span className={syntax.bracket}>]</span>
        <span className={syntax.punctuation}>,</span>
      </CodeLine>
      
      {/* Technologies comment */}
      <CodeLine 
        lineNum={line++} 
        isVisible={visibleLines >= (experience.department ? 11 : 10) + experience.achievements.length}
        isActive={isBlockActive && visibleLines === (experience.department ? 11 : 10) + experience.achievements.length}
      >
        {'    '}<span className={syntax.comment}>// Tech stack</span>
      </CodeLine>
      
      {/* Technologies */}
      <CodeLine 
        lineNum={line++} 
        isVisible={visibleLines >= (experience.department ? 12 : 11) + experience.achievements.length}
        isActive={isBlockActive && visibleLines === (experience.department ? 12 : 11) + experience.achievements.length}
      >
        {'    '}<span className={syntax.property}>technologies</span>
        <span className={syntax.punctuation}>:</span>{' '}
        <span className={syntax.bracket}>[</span>
        {experience.technologies.map((tech, i) => (
          <span key={tech}>
            <span className={syntax.string}>"{tech}"</span>
            {i < experience.technologies.length - 1 && <span className={syntax.punctuation}>, </span>}
          </span>
        ))}
        <span className={syntax.bracket}>]</span>
      </CodeLine>
      
      {/* Object closing */}
      <CodeLine 
        lineNum={line++} 
        isVisible={visibleLines >= totalLines}
        isActive={isBlockActive && visibleLines === totalLines}
      >
        {'  '}<span className={syntax.bracket}>{'}'}</span>
        <span className={syntax.punctuation}>,</span>
      </CodeLine>
    </div>
  );
}

function VSCodeWindow({ children, scrollProgress }: { children: React.ReactNode; scrollProgress: number }) {
  return (
    <div className="rounded-lg overflow-hidden border border-[#3c3c3c] shadow-2xl bg-[#1e1e1e]">
      {/* Title bar */}
      <div className="flex items-center justify-between px-4 py-2 bg-[#323233] border-b border-[#3c3c3c]">
        <div className="flex items-center gap-2">
          <div className="flex gap-1.5">
            <div className="w-3 h-3 rounded-full bg-[#ff5f57]" />
            <div className="w-3 h-3 rounded-full bg-[#febc2e]" />
            <div className="w-3 h-3 rounded-full bg-[#28c840]" />
          </div>
        </div>
        <span className="text-xs text-[#8c8c8c] font-mono">experience.ts — Visual Studio Code</span>
        <div className="w-16" />
      </div>
      
      {/* Tabs */}
      <div className="flex bg-[#252526] border-b border-[#3c3c3c]">
        <div className="flex items-center gap-2 px-4 py-2 bg-[#1e1e1e] border-r border-[#3c3c3c]">
          <File className="w-4 h-4 text-[#519aba]" />
          <span className="text-sm text-[#d4d4d4]">experience.ts</span>
          <X className="w-3 h-3 text-[#8c8c8c] hover:text-white transition-colors cursor-pointer" />
        </div>
        <div className="flex items-center gap-2 px-4 py-2 hover:bg-[#2a2d2e] cursor-pointer transition-colors">
          <File className="w-4 h-4 text-[#e37933]" />
          <span className="text-sm text-[#8c8c8c]">projects.ts</span>
        </div>
      </div>
      
      {/* Main content */}
      <div className="flex">
        {/* Sidebar */}
        <div className="w-48 bg-[#252526] border-r border-[#3c3c3c] hidden md:block">
          <div className="px-2 py-2 text-xs text-[#8c8c8c] uppercase tracking-wider">
            Explorer
          </div>
          <div className="px-2">
            <div className="flex items-center gap-1 py-1 text-sm text-[#d4d4d4]">
              <ChevronDown className="w-4 h-4" />
              <Folder className="w-4 h-4 text-[#dcb67a]" />
              <span>career</span>
            </div>
            <div className="ml-4">
              <div className="flex items-center gap-1 py-1 text-sm bg-[#37373d] rounded px-1">
                <File className="w-4 h-4 text-[#519aba]" />
                <span>experience.ts</span>
              </div>
              <div className="flex items-center gap-1 py-1 text-sm text-[#8c8c8c]">
                <File className="w-4 h-4 text-[#e37933]" />
                <span>projects.ts</span>
              </div>
              <div className="flex items-center gap-1 py-1 text-sm text-[#8c8c8c]">
                <File className="w-4 h-4 text-[#519aba]" />
                <span>skills.ts</span>
              </div>
            </div>
          </div>
        </div>
        
        {/* Code editor */}
        <div className="flex-1 overflow-x-auto">
          <div className="p-4 min-w-[400px]">
            {children}
          </div>
        </div>
        
        {/* Minimap with progress */}
        <div className="w-20 bg-[#1e1e1e] border-l border-[#3c3c3c] hidden lg:block relative">
          <div className="p-2 space-y-0.5">
            {[...Array(40)].map((_, i) => (
              <div 
                key={i} 
                className="h-0.5 rounded transition-colors duration-300" 
                style={{ 
                  width: `${30 + Math.random() * 60}%`,
                  backgroundColor: i / 40 <= scrollProgress ? '#007acc' : '#4c4c4c'
                }} 
              />
            ))}
          </div>
          {/* Viewport indicator */}
          <motion.div 
            className="absolute left-1 right-1 bg-[#add6ff]/10 border border-[#add6ff]/30 rounded-sm"
            style={{
              top: `${scrollProgress * 80 + 8}px`,
              height: '40px'
            }}
          />
        </div>
      </div>
      
      {/* Status bar */}
      <div className="flex items-center justify-between px-4 py-1 bg-[#007acc] text-white text-xs">
        <div className="flex items-center gap-4">
          <span>main</span>
          <span>TypeScript</span>
          <motion.span 
            className="flex items-center gap-1"
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            ● Writing...
          </motion.span>
        </div>
        <div className="flex items-center gap-4">
          <span>Ln {Math.floor(scrollProgress * 60)}, Col 1</span>
          <span>UTF-8</span>
        </div>
      </div>
    </div>
  );
}

export default function Experience() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });
  
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });
  
  const [progress, setProgress] = useState(0);
  
  useEffect(() => {
    const unsubscribe = smoothProgress.on("change", (v) => {
      setProgress(v);
    });
    return () => unsubscribe();
  }, [smoothProgress]);

  // Calculate line numbers
  let currentLine = 1;
  const linesPerExperience = (exp: typeof experiences[0]) => 
    14 + exp.achievements.length + (exp.department ? 1 : 0);

  // Header lines visible based on progress
  const headerVisible = progress > 0.05;
  const interfaceVisible = progress > 0.08;
  const arrayStartVisible = progress > 0.12;

  return (
    <section 
      id="experience" 
      ref={containerRef}
      className="min-h-[300vh] relative py-20 md:py-32 px-4"
    >
      {/* Sticky container */}
      <div className="sticky top-20 max-w-6xl mx-auto">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-8"
        >
          <span className="text-sm font-mono text-primary uppercase tracking-widest">
            03 — Experience
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mt-4 mb-4">
            Career<span className="text-gradient">.execute()</span>
          </h2>
          <p className="text-muted-foreground font-mono text-sm">
            <span className={syntax.comment}>// Scroll to write code</span>
          </p>
        </motion.div>

        {/* VS Code Editor */}
        <VSCodeWindow scrollProgress={progress}>
          {/* File header */}
          <CodeLine lineNum={currentLine++} isVisible={headerVisible}>
            <span className={syntax.comment}>/**</span>
          </CodeLine>
          <CodeLine lineNum={currentLine++} isVisible={headerVisible}>
            <span className={syntax.comment}> * @file experience.ts</span>
          </CodeLine>
          <CodeLine lineNum={currentLine++} isVisible={headerVisible}>
            <span className={syntax.comment}> * @description Professional experience timeline</span>
          </CodeLine>
          <CodeLine lineNum={currentLine++} isVisible={headerVisible}>
            <span className={syntax.comment}> */</span>
          </CodeLine>
          
          <CodeLine lineNum={currentLine++} isVisible={headerVisible}>
            {' '}
          </CodeLine>
          
          {/* Interface */}
          <CodeLine lineNum={currentLine++} isVisible={interfaceVisible}>
            <span className={syntax.keyword}>interface</span>{' '}
            <span className={syntax.type}>Experience</span>{' '}
            <span className={syntax.bracket}>{'{'}</span>
          </CodeLine>
          <CodeLine lineNum={currentLine++} isVisible={interfaceVisible}>
            {'  '}<span className={syntax.property}>role</span>
            <span className={syntax.punctuation}>:</span>{' '}
            <span className={syntax.type}>string</span>
            <span className={syntax.punctuation}>;</span>
          </CodeLine>
          <CodeLine lineNum={currentLine++} isVisible={interfaceVisible}>
            {'  '}<span className={syntax.property}>company</span>
            <span className={syntax.punctuation}>:</span>{' '}
            <span className={syntax.type}>string</span>
            <span className={syntax.punctuation}>;</span>
          </CodeLine>
          <CodeLine lineNum={currentLine++} isVisible={interfaceVisible}>
            {'  '}<span className={syntax.property}>achievements</span>
            <span className={syntax.punctuation}>:</span>{' '}
            <span className={syntax.type}>string[]</span>
            <span className={syntax.punctuation}>;</span>
          </CodeLine>
          <CodeLine lineNum={currentLine++} isVisible={interfaceVisible}>
            <span className={syntax.bracket}>{'}'}</span>
          </CodeLine>
          
          <CodeLine lineNum={currentLine++} isVisible={interfaceVisible}>
            {' '}
          </CodeLine>
          
          {/* Export const */}
          <CodeLine lineNum={currentLine++} isVisible={arrayStartVisible}>
            <span className={syntax.keyword}>export const</span>{' '}
            <span className={syntax.variable}>experiences</span>
            <span className={syntax.punctuation}>:</span>{' '}
            <span className={syntax.type}>Experience[]</span>{' '}
            <span className={syntax.operator}>=</span>{' '}
            <span className={syntax.bracket}>[</span>
          </CodeLine>
          
          {/* Experience blocks */}
          {experiences.map((exp, index) => {
            const startLine = currentLine;
            currentLine += linesPerExperience(exp);
            return (
              <ExperienceBlock
                key={exp.id}
                experience={exp}
                startLine={startLine}
                scrollProgress={progress}
                blockIndex={index}
                totalBlocks={experiences.length}
              />
            );
          })}
          
          {/* Closing */}
          <CodeLine lineNum={currentLine++} isVisible={progress > 0.85}>
            <span className={syntax.bracket}>]</span>
            <span className={syntax.punctuation}>;</span>
          </CodeLine>
          
          <CodeLine lineNum={currentLine++} isVisible={progress > 0.9}>
            {' '}
          </CodeLine>
          
          <CodeLine lineNum={currentLine++} isVisible={progress > 0.92}>
            <span className={syntax.keyword}>export default</span>{' '}
            <span className={syntax.variable}>experiences</span>
            <span className={syntax.punctuation}>;</span>
          </CodeLine>
        </VSCodeWindow>
        
        {/* Scroll hint */}
        <motion.div 
          className="text-center mt-6 text-muted-foreground/50 text-sm font-mono"
          animate={{ opacity: progress < 0.3 ? 1 : 0 }}
        >
          ↓ Scroll to write code ↓
        </motion.div>
      </div>
    </section>
  );
}
