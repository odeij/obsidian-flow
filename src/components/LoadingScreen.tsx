import { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface LoadingScreenProps {
  onComplete: () => void;
}

// Floating particle component
const FloatingParticle = ({ delay, duration, size, initialX, initialY }: {
  delay: number;
  duration: number;
  size: number;
  initialX: number;
  initialY: number;
}) => (
  <motion.div
    className="absolute rounded-full bg-primary/10"
    style={{
      width: size,
      height: size,
      left: `${initialX}%`,
      top: `${initialY}%`,
    }}
    initial={{ opacity: 0, scale: 0 }}
    animate={{
      opacity: [0, 0.6, 0.3, 0.6, 0],
      scale: [0.5, 1, 0.8, 1, 0.5],
      x: [0, 30, -20, 10, 0],
      y: [0, -40, -80, -120, -160],
    }}
    transition={{
      duration,
      delay,
      repeat: Infinity,
      ease: "easeInOut",
    }}
  />
);

const LoadingScreen = ({ onComplete }: LoadingScreenProps) => {
  const [phase, setPhase] = useState<'loading' | 'ready' | 'expanding'>('loading');

  // Generate random particles
  const particles = useMemo(() => 
    Array.from({ length: 20 }, (_, i) => ({
      id: i,
      delay: Math.random() * 3,
      duration: 4 + Math.random() * 4,
      size: 2 + Math.random() * 4,
      initialX: Math.random() * 100,
      initialY: 60 + Math.random() * 40,
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
      setPhase('expanding');
      setTimeout(onComplete, 1200);
    }
  };

  return (
    <AnimatePresence mode="wait">
      {phase !== 'expanding' ? (
        <motion.div
          key="loading-screen"
          className="fixed inset-0 z-[100] bg-background flex items-center justify-center cursor-pointer overflow-hidden"
          onClick={handleClick}
          exit={{
            opacity: 0,
            transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1], delay: 0.4 }
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

          {/* Floating particles */}
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
                className="relative flex flex-col items-center gap-8"
                initial={{ scale: 0, opacity: 0, filter: "blur(10px)" }}
                animate={{ scale: 1, opacity: 1, filter: "blur(0px)" }}
                transition={{ 
                  type: "spring",
                  stiffness: 150,
                  damping: 20,
                  delay: 0.1
                }}
              >
                <div className="relative">
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
          className="fixed inset-0 z-[100] flex items-center justify-center pointer-events-none"
        >
          {/* Expanding circle reveal */}
          <motion.div
            className="absolute rounded-full bg-primary"
            initial={{ width: 24, height: 24, opacity: 1 }}
            animate={{ 
              width: '300vmax', 
              height: '300vmax',
              opacity: [1, 1, 0]
            }}
            transition={{ 
              duration: 1.2, 
              ease: [0.76, 0, 0.24, 1],
              opacity: { duration: 1.2, times: [0, 0.7, 1] }
            }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default LoadingScreen;
