import { motion, useInView } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';
import { experiences } from '@/data/portfolio';
import { X, Minus, Square, ChevronRight, File, Folder } from 'lucide-react';

// VS Code-like syntax highlighting colors
const syntax = {
  keyword: 'text-[#C586C0]',      // pink/purple - const, function, etc
  function: 'text-[#DCDCAA]',      // yellow - function names
  string: 'text-[#CE9178]',        // orange - strings
  number: 'text-[#B5CEA8]',        // green - numbers
  type: 'text-[#4EC9B0]',          // teal - types
  variable: 'text-[#9CDCFE]',      // light blue - variables
  property: 'text-[#9CDCFE]',      // light blue - object properties
  comment: 'text-[#6A9955]',       // green - comments
  bracket: 'text-[#FFD700]',       // gold - brackets
  punctuation: 'text-[#D4D4D4]',   // gray - punctuation
  operator: 'text-[#D4D4D4]',      // gray - operators
};

function TypedText({ text, delay = 0, className = '' }: { text: string; delay?: number; className?: string }) {
  const [displayed, setDisplayed] = useState('');
  const [started, setStarted] = useState(false);
  
  useEffect(() => {
    const timer = setTimeout(() => setStarted(true), delay);
    return () => clearTimeout(timer);
  }, [delay]);
  
  useEffect(() => {
    if (!started) return;
    
    let i = 0;
    const interval = setInterval(() => {
      if (i <= text.length) {
        setDisplayed(text.slice(0, i));
        i++;
      } else {
        clearInterval(interval);
      }
    }, 20);
    
    return () => clearInterval(interval);
  }, [text, started]);
  
  return <span className={className}>{displayed}</span>;
}

function CodeLine({ lineNum, children, delay = 0 }: { lineNum: number; children: React.ReactNode; delay?: number }) {
  const [visible, setVisible] = useState(false);
  
  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), delay);
    return () => clearTimeout(timer);
  }, [delay]);
  
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: visible ? 1 : 0 }}
      className="flex group hover:bg-[#2a2d3e] transition-colors"
    >
      <span className="w-12 text-right pr-4 text-[#858585] select-none text-sm shrink-0 font-mono">
        {lineNum}
      </span>
      <span className="flex-1 text-sm font-mono whitespace-pre-wrap">
        {children}
      </span>
    </motion.div>
  );
}

function ExperienceCode({ experience, startLine, baseDelay }: { 
  experience: typeof experiences[0]; 
  startLine: number;
  baseDelay: number;
}) {
  const lineDelay = 80;
  let line = startLine;
  
  return (
    <>
      {/* Object opening */}
      <CodeLine lineNum={line++} delay={baseDelay}>
        <span className={syntax.bracket}>{'{'}</span>
      </CodeLine>
      
      {/* Role */}
      <CodeLine lineNum={line++} delay={baseDelay + lineDelay}>
        {'  '}<span className={syntax.property}>role</span>
        <span className={syntax.punctuation}>:</span>{' '}
        <span className={syntax.string}>"{experience.role}"</span>
        <span className={syntax.punctuation}>,</span>
      </CodeLine>
      
      {/* Company */}
      <CodeLine lineNum={line++} delay={baseDelay + lineDelay * 2}>
        {'  '}<span className={syntax.property}>company</span>
        <span className={syntax.punctuation}>:</span>{' '}
        <span className={syntax.string}>"{experience.company}"</span>
        <span className={syntax.punctuation}>,</span>
      </CodeLine>
      
      {/* Department */}
      {experience.department && (
        <CodeLine lineNum={line++} delay={baseDelay + lineDelay * 3}>
          {'  '}<span className={syntax.property}>department</span>
          <span className={syntax.punctuation}>:</span>{' '}
          <span className={syntax.string}>"{experience.department}"</span>
          <span className={syntax.punctuation}>,</span>
        </CodeLine>
      )}
      
      {/* Period */}
      <CodeLine lineNum={line++} delay={baseDelay + lineDelay * 4}>
        {'  '}<span className={syntax.property}>period</span>
        <span className={syntax.punctuation}>:</span>{' '}
        <span className={syntax.string}>"{experience.period}"</span>
        <span className={syntax.punctuation}>,</span>
      </CodeLine>
      
      {/* Location */}
      <CodeLine lineNum={line++} delay={baseDelay + lineDelay * 5}>
        {'  '}<span className={syntax.property}>location</span>
        <span className={syntax.punctuation}>:</span>{' '}
        <span className={syntax.string}>"{experience.location}"</span>
        <span className={syntax.punctuation}>,</span>
      </CodeLine>
      
      {/* Type */}
      <CodeLine lineNum={line++} delay={baseDelay + lineDelay * 6}>
        {'  '}<span className={syntax.property}>type</span>
        <span className={syntax.punctuation}>:</span>{' '}
        <span className={syntax.type}>{experience.type}</span>
        <span className={syntax.punctuation}>,</span>
      </CodeLine>
      
      {/* Achievements comment */}
      <CodeLine lineNum={line++} delay={baseDelay + lineDelay * 7}>
        {'  '}<span className={syntax.comment}>// Key achievements</span>
      </CodeLine>
      
      {/* Achievements array */}
      <CodeLine lineNum={line++} delay={baseDelay + lineDelay * 8}>
        {'  '}<span className={syntax.property}>achievements</span>
        <span className={syntax.punctuation}>:</span>{' '}
        <span className={syntax.bracket}>[</span>
      </CodeLine>
      
      {experience.achievements.map((achievement, i) => (
        <CodeLine key={i} lineNum={line++} delay={baseDelay + lineDelay * (9 + i)}>
          {'    '}<span className={syntax.string}>"{achievement}"</span>
          {i < experience.achievements.length - 1 && <span className={syntax.punctuation}>,</span>}
        </CodeLine>
      ))}
      
      <CodeLine lineNum={line++} delay={baseDelay + lineDelay * (9 + experience.achievements.length)}>
        {'  '}<span className={syntax.bracket}>]</span>
        <span className={syntax.punctuation}>,</span>
      </CodeLine>
      
      {/* Technologies comment */}
      <CodeLine lineNum={line++} delay={baseDelay + lineDelay * (10 + experience.achievements.length)}>
        {'  '}<span className={syntax.comment}>// Tech stack used</span>
      </CodeLine>
      
      {/* Technologies */}
      <CodeLine lineNum={line++} delay={baseDelay + lineDelay * (11 + experience.achievements.length)}>
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
      </CodeLine>
      
      {/* Object closing */}
      <CodeLine lineNum={line++} delay={baseDelay + lineDelay * (12 + experience.achievements.length)}>
        <span className={syntax.bracket}>{'}'}</span>
        <span className={syntax.punctuation}>,</span>
      </CodeLine>
    </>
  );
}

function VSCodeWindow({ children }: { children: React.ReactNode }) {
  const [activeTab, setActiveTab] = useState(0);
  
  return (
    <div className="rounded-lg overflow-hidden border border-[#3c3c3c] shadow-2xl bg-[#1e1e1e]">
      {/* Title bar */}
      <div className="flex items-center justify-between px-4 py-2 bg-[#323233] border-b border-[#3c3c3c]">
        <div className="flex items-center gap-2">
          <div className="flex gap-1.5">
            <button className="w-3 h-3 rounded-full bg-[#ff5f57] hover:brightness-110 transition-all" />
            <button className="w-3 h-3 rounded-full bg-[#febc2e] hover:brightness-110 transition-all" />
            <button className="w-3 h-3 rounded-full bg-[#28c840] hover:brightness-110 transition-all" />
          </div>
        </div>
        <span className="text-xs text-[#8c8c8c] font-mono">experience.ts — Odei Jamaleddine</span>
        <div className="w-16" />
      </div>
      
      {/* Tabs */}
      <div className="flex bg-[#252526] border-b border-[#3c3c3c]">
        <div 
          className="flex items-center gap-2 px-4 py-2 bg-[#1e1e1e] border-r border-[#3c3c3c] cursor-pointer"
        >
          <File className="w-4 h-4 text-[#519aba]" />
          <span className="text-sm text-[#d4d4d4]">experience.ts</span>
          <X className="w-3 h-3 text-[#8c8c8c] hover:text-white transition-colors" />
        </div>
        <div 
          className="flex items-center gap-2 px-4 py-2 hover:bg-[#2a2d2e] cursor-pointer transition-colors"
        >
          <File className="w-4 h-4 text-[#e37933]" />
          <span className="text-sm text-[#8c8c8c]">projects.ts</span>
        </div>
      </div>
      
      {/* Main content area */}
      <div className="flex">
        {/* Sidebar - File explorer */}
        <div className="w-48 bg-[#252526] border-r border-[#3c3c3c] hidden md:block">
          <div className="px-2 py-2 text-xs text-[#8c8c8c] uppercase tracking-wider">
            Explorer
          </div>
          <div className="px-2">
            <div className="flex items-center gap-1 py-1 text-sm text-[#d4d4d4]">
              <ChevronRight className="w-4 h-4" />
              <Folder className="w-4 h-4 text-[#dcb67a]" />
              <span>src</span>
            </div>
            <div className="ml-4">
              <div className="flex items-center gap-1 py-1 text-sm text-[#d4d4d4]">
                <ChevronRight className="w-4 h-4" />
                <Folder className="w-4 h-4 text-[#dcb67a]" />
                <span>data</span>
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
        </div>
        
        {/* Code editor */}
        <div className="flex-1 overflow-x-auto">
          <div className="p-4 min-w-[500px]">
            {children}
          </div>
        </div>
        
        {/* Minimap */}
        <div className="w-24 bg-[#1e1e1e] border-l border-[#3c3c3c] hidden lg:block opacity-50">
          <div className="p-2 space-y-0.5">
            {[...Array(30)].map((_, i) => (
              <div key={i} className="h-0.5 bg-[#4c4c4c] rounded" style={{ width: `${30 + Math.random() * 60}%` }} />
            ))}
          </div>
        </div>
      </div>
      
      {/* Status bar */}
      <div className="flex items-center justify-between px-4 py-1 bg-[#007acc] text-white text-xs">
        <div className="flex items-center gap-4">
          <span>main</span>
          <span>TypeScript</span>
        </div>
        <div className="flex items-center gap-4">
          <span>Ln 1, Col 1</span>
          <span>UTF-8</span>
          <span>Spaces: 2</span>
        </div>
      </div>
    </div>
  );
}

export default function Experience() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  
  let currentLine = 1;
  const linesPerExperience = (exp: typeof experiences[0]) => 
    14 + exp.achievements.length + (exp.department ? 1 : 0);

  return (
    <section id="experience" className="py-20 md:py-32 px-4 relative">
      <div className="max-w-6xl mx-auto">
        {/* Section header */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <span className="text-sm font-mono text-primary uppercase tracking-widest">
            03 — Experience
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mt-4 mb-6">
            Career<span className="text-gradient">.execute()</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto font-mono">
            <span className={syntax.comment}>// Loading career data...</span>
          </p>
        </motion.div>

        {/* VS Code Editor */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.3, duration: 0.8 }}
        >
          <VSCodeWindow>
            {/* File header comment */}
            <CodeLine lineNum={currentLine++} delay={0}>
              <span className={syntax.comment}>/**</span>
            </CodeLine>
            <CodeLine lineNum={currentLine++} delay={50}>
              <span className={syntax.comment}> * @file experience.ts</span>
            </CodeLine>
            <CodeLine lineNum={currentLine++} delay={100}>
              <span className={syntax.comment}> * @author Odei Jamaleddine</span>
            </CodeLine>
            <CodeLine lineNum={currentLine++} delay={150}>
              <span className={syntax.comment}> * @description Professional experience and career history</span>
            </CodeLine>
            <CodeLine lineNum={currentLine++} delay={200}>
              <span className={syntax.comment}> */</span>
            </CodeLine>
            
            {/* Empty line */}
            <CodeLine lineNum={currentLine++} delay={250}>
              {' '}
            </CodeLine>
            
            {/* Interface definition */}
            <CodeLine lineNum={currentLine++} delay={300}>
              <span className={syntax.keyword}>interface</span>{' '}
              <span className={syntax.type}>Experience</span>{' '}
              <span className={syntax.bracket}>{'{'}</span>
            </CodeLine>
            <CodeLine lineNum={currentLine++} delay={350}>
              {'  '}<span className={syntax.property}>role</span>
              <span className={syntax.punctuation}>:</span>{' '}
              <span className={syntax.type}>string</span>
              <span className={syntax.punctuation}>;</span>
            </CodeLine>
            <CodeLine lineNum={currentLine++} delay={400}>
              {'  '}<span className={syntax.property}>company</span>
              <span className={syntax.punctuation}>:</span>{' '}
              <span className={syntax.type}>string</span>
              <span className={syntax.punctuation}>;</span>
            </CodeLine>
            <CodeLine lineNum={currentLine++} delay={450}>
              {'  '}<span className={syntax.property}>achievements</span>
              <span className={syntax.punctuation}>:</span>{' '}
              <span className={syntax.type}>string[]</span>
              <span className={syntax.punctuation}>;</span>
            </CodeLine>
            <CodeLine lineNum={currentLine++} delay={500}>
              {'  '}<span className={syntax.property}>technologies</span>
              <span className={syntax.punctuation}>:</span>{' '}
              <span className={syntax.type}>string[]</span>
              <span className={syntax.punctuation}>;</span>
            </CodeLine>
            <CodeLine lineNum={currentLine++} delay={550}>
              <span className={syntax.bracket}>{'}'}</span>
            </CodeLine>
            
            {/* Empty line */}
            <CodeLine lineNum={currentLine++} delay={600}>
              {' '}
            </CodeLine>
            
            {/* Export statement */}
            <CodeLine lineNum={currentLine++} delay={650}>
              <span className={syntax.keyword}>export const</span>{' '}
              <span className={syntax.variable}>experiences</span>
              <span className={syntax.punctuation}>:</span>{' '}
              <span className={syntax.type}>Experience[]</span>{' '}
              <span className={syntax.operator}>=</span>{' '}
              <span className={syntax.bracket}>[</span>
            </CodeLine>
            
            {/* Experience objects */}
            {experiences.map((exp, index) => {
              const startLine = currentLine;
              currentLine += linesPerExperience(exp);
              return (
                <ExperienceCode 
                  key={exp.id} 
                  experience={exp} 
                  startLine={startLine}
                  baseDelay={700 + index * 800}
                />
              );
            })}
            
            {/* Closing bracket */}
            <CodeLine lineNum={currentLine++} delay={700 + experiences.length * 800}>
              <span className={syntax.bracket}>]</span>
              <span className={syntax.punctuation}>;</span>
            </CodeLine>
            
            {/* Empty line */}
            <CodeLine lineNum={currentLine++} delay={750 + experiences.length * 800}>
              {' '}
            </CodeLine>
            
            {/* Export default */}
            <CodeLine lineNum={currentLine++} delay={800 + experiences.length * 800}>
              <span className={syntax.keyword}>export default</span>{' '}
              <span className={syntax.variable}>experiences</span>
              <span className={syntax.punctuation}>;</span>
            </CodeLine>
          </VSCodeWindow>
        </motion.div>
      </div>
    </section>
  );
}
