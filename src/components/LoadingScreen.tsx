import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface LoadingScreenProps {
  onComplete: () => void;
}

const LoadingScreen = ({ onComplete }: LoadingScreenProps) => {
  const [phase, setPhase] = useState<'loading' | 'ready' | 'expanding'>('loading');

  useEffect(() => {
    // Simulate loading time (adjust as needed)
    const timer = setTimeout(() => {
      setPhase('ready');
    }, 2500);

    return () => clearTimeout(timer);
  }, []);

  const handleClick = () => {
    if (phase === 'ready') {
      setPhase('expanding');
      setTimeout(onComplete, 800);
    }
  };

  return (
    <AnimatePresence>
      {phase !== 'expanding' ? (
        <motion.div
          className="fixed inset-0 z-[100] bg-background flex items-center justify-center cursor-pointer"
          onClick={handleClick}
          exit={{
            opacity: 0,
            scale: 50,
            transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] }
          }}
        >
          {/* Infinity Symbol - Loading Phase */}
          <AnimatePresence mode="wait">
            {phase === 'loading' && (
              <motion.div
                key="infinity"
                className="relative"
                exit={{
                  scale: 0,
                  opacity: 0,
                  transition: { duration: 0.5, ease: [0.76, 0, 0.24, 1] }
                }}
              >
                <svg
                  width="120"
                  height="60"
                  viewBox="0 0 120 60"
                  fill="none"
                  className="overflow-visible"
                >
                  {/* Infinity path */}
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
                  
                  {/* Glowing dot that traces the path */}
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

            {/* Point - Ready Phase */}
            {phase === 'ready' && (
              <motion.div
                key="point"
                className="relative flex flex-col items-center gap-8"
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ 
                  type: "spring",
                  stiffness: 200,
                  damping: 20
                }}
              >
                {/* Pulsing rings */}
                <div className="relative">
                  <motion.div
                    className="absolute inset-0 rounded-full border border-primary/20"
                    initial={{ scale: 1, opacity: 0.5 }}
                    animate={{ scale: 3, opacity: 0 }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: "easeOut"
                    }}
                    style={{ width: 24, height: 24, marginLeft: -12, marginTop: -12, left: '50%', top: '50%' }}
                  />
                  <motion.div
                    className="absolute inset-0 rounded-full border border-primary/30"
                    initial={{ scale: 1, opacity: 0.5 }}
                    animate={{ scale: 2.5, opacity: 0 }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: "easeOut",
                      delay: 0.5
                    }}
                    style={{ width: 24, height: 24, marginLeft: -12, marginTop: -12, left: '50%', top: '50%' }}
                  />
                  
                  {/* The point */}
                  <motion.div
                    className="w-6 h-6 rounded-full bg-primary shadow-[0_0_30px_hsl(var(--primary)/0.5)]"
                    whileHover={{ 
                      scale: 1.3,
                      boxShadow: "0 0 50px hsl(var(--primary)/0.8)"
                    }}
                    whileTap={{ scale: 0.9 }}
                    transition={{ type: "spring", stiffness: 400, damping: 17 }}
                  />
                </div>

                {/* Subtle hint text */}
                <motion.p
                  className="text-muted-foreground/50 text-sm tracking-[0.3em] uppercase font-light"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3, duration: 0.5 }}
                >
                  Enter
                </motion.p>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      ) : (
        <motion.div
          key="expanding"
          className="fixed inset-0 z-[100] flex items-center justify-center pointer-events-none"
          initial={{ opacity: 1 }}
          animate={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
        >
          <motion.div
            className="w-6 h-6 rounded-full bg-primary"
            initial={{ scale: 1 }}
            animate={{ scale: 100, opacity: 0 }}
            transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default LoadingScreen;
