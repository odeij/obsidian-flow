import { useState, useEffect, useMemo, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface LoadingScreenProps {
  onComplete: () => void;
}

// Interactive floating particle component
const FloatingParticle = ({ delay, duration, size, initialX, initialY }: {
  delay: number;
  duration: number;
  size: number;
  initialX: number;
  initialY: number;
}) => {
  const [isHovered, setIsHovered] = useState(false);
  
  return (
    <motion.div
      className="absolute rounded-full cursor-pointer"
      style={{
        width: size,
        height: size,
        left: `${initialX}%`,
        top: `${initialY}%`,
      }}
      initial={{ opacity: 0, scale: 0 }}
      animate={{
        opacity: isHovered ? 1 : [0, 0.6, 0.3, 0.6, 0],
        scale: isHovered ? 2 : [0.5, 1, 0.8, 1, 0.5],
        x: isHovered ? 0 : [0, 30, -20, 10, 0],
        y: isHovered ? 0 : [0, -40, -80, -120, -160],
        boxShadow: isHovered 
          ? '0 0 30px 8px hsl(var(--primary)/0.8)' 
          : '0 0 0px 0px transparent',
      }}
      transition={{
        duration: isHovered ? 0.3 : duration,
        delay: isHovered ? 0 : delay,
        repeat: isHovered ? 0 : Infinity,
        ease: "easeInOut",
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <motion.div 
        className="w-full h-full rounded-full"
        animate={{
          background: isHovered 
            ? 'radial-gradient(circle, hsl(var(--primary)) 0%, hsl(var(--primary)/0.5) 50%, transparent 70%)'
            : 'radial-gradient(circle, hsl(var(--primary)/0.4) 0%, hsl(var(--primary)/0.1) 50%, transparent 70%)',
        }}
        transition={{ duration: 0.3 }}
      />
    </motion.div>
  );
};

const LoadingScreen = ({ onComplete }: LoadingScreenProps) => {
  const [phase, setPhase] = useState<'loading' | 'ready' | 'expanding'>('loading');
  const buttonRef = useRef<HTMLDivElement>(null);
  const [expandOrigin, setExpandOrigin] = useState({ x: 50, y: 50 });

  // Generate random particles covering the whole screen
  const particles = useMemo(() => 
    Array.from({ length: 35 }, (_, i) => ({
      id: i,
      delay: Math.random() * 3,
      duration: 5 + Math.random() * 5,
      size: 3 + Math.random() * 6,
      initialX: Math.random() * 100,
      initialY: Math.random() * 100,
    })), []
  );

  useEffect(() => {
    const timer = setTimeout(() => {
      setPhase('ready');
    }, 2500);

    return () => clearTimeout(timer);
  }, []);

  const handleClick = () => {
    if (phase === 'ready') {
      // Calculate expand origin from button position
      if (buttonRef.current) {
        const rect = buttonRef.current.getBoundingClientRect();
        const x = ((rect.left + rect.width / 2) / window.innerWidth) * 100;
        const y = ((rect.top + rect.height / 2) / window.innerHeight) * 100;
        setExpandOrigin({ x, y });
      }
      setPhase('expanding');
      setTimeout(onComplete, 1400);
    }
  };

  return (
    <AnimatePresence mode="wait">
      {phase !== 'expanding' ? (
        <motion.div
          key="loading-screen"
          className="fixed inset-0 z-[100] bg-background flex items-center justify-center overflow-hidden"
          exit={{
            opacity: 0,
            transition: { duration: 0.6, ease: [0.76, 0, 0.24, 1], delay: 0.8 }
          }}
        >
          {/* Ambient gradient background */}
          <motion.div
            className="absolute inset-0 opacity-30"
            style={{
              background: 'radial-gradient(ellipse at 50% 50%, hsl(var(--primary)/0.15) 0%, transparent 70%)',
            }}
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.2, 0.4, 0.2],
            }}
            transition={{
              duration: 6,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />

          {/* Secondary gradient pulse */}
          <motion.div
            className="absolute inset-0 opacity-20"
            style={{
              background: 'radial-gradient(ellipse at 30% 70%, hsl(var(--primary)/0.1) 0%, transparent 50%)',
            }}
            animate={{
              scale: [1.2, 1, 1.2],
              opacity: [0.1, 0.3, 0.1],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 1,
            }}
          />

          {/* Tertiary ambient glow */}
          <motion.div
            className="absolute inset-0 opacity-15"
            style={{
              background: 'radial-gradient(ellipse at 70% 30%, hsl(var(--primary)/0.08) 0%, transparent 60%)',
            }}
            animate={{
              scale: [1, 1.3, 1],
              opacity: [0.15, 0.25, 0.15],
            }}
            transition={{
              duration: 7,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 2,
            }}
          />

          {/* Interactive floating particles */}
          {particles.map((particle) => (
            <FloatingParticle key={particle.id} {...particle} />
          ))}

          {/* Infinity Symbol - Loading Phase */}
          <AnimatePresence mode="wait">
            {phase === 'loading' && (
              <motion.div
                key="infinity"
                className="relative"
                exit={{
                  scale: 0,
                  opacity: 0,
                  filter: "blur(10px)",
                  transition: { duration: 0.6, ease: [0.76, 0, 0.24, 1] }
                }}
              >
                <svg
                  width="120"
                  height="60"
                  viewBox="0 0 120 60"
                  fill="none"
                  className="overflow-visible"
                >
                  <motion.path
                    d="M30 30C30 16.2 41.2 5 55 5C68.8 5 80 16.2 80 30C80 43.8 91.2 55 105 55C118.8 55 130 43.8 130 30C130 16.2 118.8 5 105 5C91.2 5 80 16.2 80 30C80 43.8 68.8 55 55 55C41.2 55 30 43.8 30 30Z"
                    stroke="url(#infinityGradient)"
                    strokeWidth="2"
                    strokeLinecap="round"
                    fill="none"
                    initial={{ pathLength: 0, opacity: 0 }}
                    animate={{ 
                      pathLength: 1, 
                      opacity: 1,
                    }}
                    transition={{
                      pathLength: { duration: 2, ease: "easeInOut" },
                      opacity: { duration: 0.5 }
                    }}
                  />
                  
                  <motion.circle
                    r="4"
                    fill="hsl(var(--primary))"
                    filter="url(#glow)"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: [0, 1, 1, 0] }}
                    transition={{
                      duration: 2,
                      times: [0, 0.1, 0.9, 1],
                      ease: "easeInOut"
                    }}
                  >
                    <animateMotion
                      dur="2s"
                      repeatCount="1"
                      path="M30 30C30 16.2 41.2 5 55 5C68.8 5 80 16.2 80 30C80 43.8 91.2 55 105 55C118.8 55 130 43.8 130 30C130 16.2 118.8 5 105 5C91.2 5 80 16.2 80 30C80 43.8 68.8 55 55 55C41.2 55 30 43.8 30 30Z"
                    />
                  </motion.circle>

                  <defs>
                    <linearGradient id="infinityGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity="0.3" />
                      <stop offset="50%" stopColor="hsl(var(--primary))" stopOpacity="1" />
                      <stop offset="100%" stopColor="hsl(var(--primary))" stopOpacity="0.3" />
                    </linearGradient>
                    <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
                      <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
                      <feMerge>
                        <feMergeNode in="coloredBlur"/>
                        <feMergeNode in="SourceGraphic"/>
                      </feMerge>
                    </filter>
                  </defs>
                </svg>
              </motion.div>
            )}

            {phase === 'ready' && (
              <motion.div
                key="point"
                ref={buttonRef}
                className="relative flex flex-col items-center gap-8 cursor-pointer"
                initial={{ scale: 0, opacity: 0, filter: "blur(10px)" }}
                animate={{ scale: 1, opacity: 1, filter: "blur(0px)" }}
                transition={{ 
                  type: "spring",
                  stiffness: 150,
                  damping: 20,
                  delay: 0.1
                }}
                onClick={handleClick}
              >
                <div className="relative">
                  {/* Outer pulsing rings */}
                  <motion.div
                    className="absolute rounded-full border border-primary/20"
                    style={{ width: 80, height: 80, left: -28, top: -28 }}
                    initial={{ scale: 0.5, opacity: 0 }}
                    animate={{ scale: [0.5, 1.5, 0.5], opacity: [0, 0.3, 0] }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                  />
                  <motion.div
                    className="absolute rounded-full border border-primary/15"
                    style={{ width: 120, height: 120, left: -48, top: -48 }}
                    initial={{ scale: 0.5, opacity: 0 }}
                    animate={{ scale: [0.5, 1.3, 0.5], opacity: [0, 0.2, 0] }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      ease: "easeInOut",
                      delay: 0.5
                    }}
                  />
                  <motion.div
                    className="absolute rounded-full border border-primary/10"
                    style={{ width: 160, height: 160, left: -68, top: -68 }}
                    initial={{ scale: 0.5, opacity: 0 }}
                    animate={{ scale: [0.5, 1.2, 0.5], opacity: [0, 0.15, 0] }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      ease: "easeInOut",
                      delay: 1
                    }}
                  />
                  
                  {/* Main enter button */}
                  <motion.div
                    className="w-6 h-6 rounded-full bg-primary shadow-[0_0_40px_hsl(var(--primary)/0.6)]"
                    whileHover={{ 
                      scale: 1.4,
                      boxShadow: "0 0 60px hsl(var(--primary)/0.9)"
                    }}
                    whileTap={{ scale: 0.9 }}
                    transition={{ type: "spring", stiffness: 400, damping: 17 }}
                  />
                </div>

                <motion.p
                  className="text-muted-foreground/40 text-xs tracking-[0.4em] uppercase font-light"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4, duration: 0.6 }}
                >
                  Enter
                </motion.p>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      ) : (
        <motion.div
          key="expanding-overlay"
          className="fixed inset-0 z-[100] pointer-events-none overflow-hidden"
          initial={{ opacity: 1 }}
          animate={{ opacity: 1 }}
        >
          {/* Full screen expanding circle from click origin */}
          <motion.div
            className="absolute rounded-full"
            style={{
              left: `${expandOrigin.x}%`,
              top: `${expandOrigin.y}%`,
              x: '-50%',
              y: '-50%',
              background: 'radial-gradient(circle, hsl(var(--primary)) 0%, hsl(var(--background)) 30%)',
            }}
            initial={{ 
              width: 24, 
              height: 24, 
              opacity: 1,
            }}
            animate={{ 
              width: '350vmax', 
              height: '350vmax',
              opacity: [1, 1, 0],
            }}
            transition={{ 
              width: { duration: 1.4, ease: [0.22, 1, 0.36, 1] },
              height: { duration: 1.4, ease: [0.22, 1, 0.36, 1] },
              opacity: { duration: 1.4, times: [0, 0.6, 1], ease: 'easeOut' },
            }}
          />
          
          {/* Inner glow ring */}
          <motion.div
            className="absolute rounded-full border-2 border-primary/50"
            style={{
              left: `${expandOrigin.x}%`,
              top: `${expandOrigin.y}%`,
              x: '-50%',
              y: '-50%',
            }}
            initial={{ 
              width: 24, 
              height: 24, 
              opacity: 1,
            }}
            animate={{ 
              width: '360vmax', 
              height: '360vmax',
              opacity: [1, 0.5, 0],
            }}
            transition={{ 
              width: { duration: 1.5, ease: [0.22, 1, 0.36, 1], delay: 0.05 },
              height: { duration: 1.5, ease: [0.22, 1, 0.36, 1], delay: 0.05 },
              opacity: { duration: 1.5, times: [0, 0.5, 1], ease: 'easeOut', delay: 0.05 },
            }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default LoadingScreen;
