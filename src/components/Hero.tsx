import { motion } from 'framer-motion';
import { ChevronDown, Github, Linkedin, Mail } from 'lucide-react';
import { personalInfo } from '@/data/portfolio';

const letterVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.05,
      duration: 0.5,
      ease: [0.16, 1, 0.3, 1],
    },
  }),
};

const fadeUpVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: (delay: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay,
      duration: 0.8,
      ease: [0.16, 1, 0.3, 1],
    },
  }),
};

export default function Hero() {
  const nameLetters = personalInfo.name.split('');

  const scrollToSection = () => {
    const aboutSection = document.getElementById('about');
    aboutSection?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center section-padding overflow-hidden">
      {/* Ambient glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/10 rounded-full blur-[150px] pointer-events-none" />
      
      <div className="container-max text-center relative z-10">
        {/* Status badge */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-panel mb-8"
        >
          <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
          <span className="text-sm text-muted-foreground font-medium">
            Available for opportunities
          </span>
        </motion.div>

        {/* Name with staggered animation */}
        <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight mb-6">
          {nameLetters.map((letter, i) => (
            <motion.span
              key={i}
              custom={i}
              initial="hidden"
              animate="visible"
              variants={letterVariants}
              className={letter === ' ' ? 'inline-block w-4' : 'inline-block'}
            >
              {letter}
            </motion.span>
          ))}
        </h1>

        {/* Title */}
        <motion.div
          custom={0.5}
          initial="hidden"
          animate="visible"
          variants={fadeUpVariants}
          className="mb-6"
        >
          <span className="text-xl md:text-2xl lg:text-3xl font-mono text-gradient font-medium">
            {personalInfo.title}
          </span>
        </motion.div>

        {/* Tagline */}
        <motion.p
          custom={0.7}
          initial="hidden"
          animate="visible"
          variants={fadeUpVariants}
          className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-12 leading-relaxed"
        >
          {personalInfo.tagline}
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          custom={0.9}
          initial="hidden"
          animate="visible"
          variants={fadeUpVariants}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16"
        >
          <motion.button
            onClick={scrollToSection}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="group relative px-8 py-4 rounded-xl font-semibold text-primary-foreground overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-primary to-purple-500 transition-transform group-hover:scale-105" />
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity">
              <div className="absolute inset-0 bg-gradient-to-r from-primary via-purple-500 to-primary bg-[length:200%_100%] animate-shimmer" />
            </div>
            <span className="relative flex items-center gap-2">
              Enter Portfolio
              <ChevronDown className="w-4 h-4 group-hover:translate-y-0.5 transition-transform" />
            </span>
          </motion.button>

          <div className="flex items-center gap-3">
            {[
              { icon: Github, href: personalInfo.github, label: 'GitHub' },
              { icon: Linkedin, href: personalInfo.linkedin, label: 'LinkedIn' },
              { icon: Mail, href: `mailto:${personalInfo.email}`, label: 'Email' },
            ].map(({ icon: Icon, href, label }) => (
              <motion.a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.1, y: -2 }}
                whileTap={{ scale: 0.95 }}
                className="p-3 rounded-xl glass-panel hover:border-primary/50 transition-colors"
                aria-label={label}
              >
                <Icon className="w-5 h-5 text-muted-foreground hover:text-foreground transition-colors" />
              </motion.a>
            ))}
          </div>
        </motion.div>

        {/* Location */}
        <motion.p
          custom={1.1}
          initial="hidden"
          animate="visible"
          variants={fadeUpVariants}
          className="text-sm text-muted-foreground font-mono"
        >
          📍 {personalInfo.location}
        </motion.p>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
          className="w-6 h-10 rounded-full border-2 border-muted-foreground/30 flex items-start justify-center p-2"
        >
          <div className="w-1 h-2 bg-muted-foreground/50 rounded-full" />
        </motion.div>
      </motion.div>
    </section>
  );
}
