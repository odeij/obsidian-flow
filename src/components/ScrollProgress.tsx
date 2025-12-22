import { motion, useScroll, useSpring } from 'framer-motion';

export default function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <motion.div
      className="fixed bottom-8 right-8 z-50"
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 1, duration: 0.5 }}
    >
      <div className="relative w-14 h-14">
        {/* Background circle */}
        <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
          <circle
            cx="50"
            cy="50"
            r="45"
            fill="none"
            stroke="currentColor"
            strokeWidth="4"
            className="text-secondary"
          />
          <motion.circle
            cx="50"
            cy="50"
            r="45"
            fill="none"
            stroke="url(#gradient)"
            strokeWidth="4"
            strokeLinecap="round"
            style={{
              pathLength: scrollYProgress,
            }}
            strokeDasharray="283"
            strokeDashoffset="283"
          />
          <defs>
            <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="hsl(250, 89%, 66%)" />
              <stop offset="100%" stopColor="hsl(280, 85%, 55%)" />
            </linearGradient>
          </defs>
        </svg>

        {/* Percentage */}
        <motion.div
          className="absolute inset-0 flex items-center justify-center"
          style={{ opacity: scrollYProgress }}
        >
          <span className="text-xs font-mono text-muted-foreground">
            <motion.span>{/* Dynamic percentage would go here */}</motion.span>
          </span>
        </motion.div>
      </div>
    </motion.div>
  );
}
