import { motion, useScroll, useTransform } from 'framer-motion';
import { ChevronDown, Github, Linkedin, Mail, Sparkles } from 'lucide-react';
import { personalInfo } from '@/data/portfolio';
import { Suspense, useRef } from 'react';
import HeroNeuralNetwork from './HeroNeuralNetwork';

const letterVariants = {
  hidden: { 
    opacity: 0, 
    y: 80,
    rotateX: -90,
  },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    rotateX: 0,
    transition: {
      delay: 0.8 + i * 0.04,
      duration: 0.8,
      ease: [0.16, 1, 0.3, 1],
    },
  }),
};

const titleVariants = {
  hidden: { 
    opacity: 0, 
    y: 40,
    filter: 'blur(10px)',
  },
  visible: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: {
      delay: 1.4,
      duration: 1,
      ease: [0.16, 1, 0.3, 1],
    },
  },
};

const taglineVariants = {
  hidden: { 
    opacity: 0, 
    y: 30,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      delay: 1.7,
      duration: 0.8,
      ease: [0.16, 1, 0.3, 1],
    },
  },
};

const ctaVariants = {
  hidden: { 
    opacity: 0, 
    scale: 0.9,
  },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      delay: 2,
      duration: 0.6,
      ease: [0.16, 1, 0.3, 1],
    },
  },
};

const socialVariants = {
  hidden: { opacity: 0, x: -20 },
  visible: (i: number) => ({
    opacity: 1,
    x: 0,
    transition: {
      delay: 2.2 + i * 0.1,
      duration: 0.5,
      ease: [0.16, 1, 0.3, 1],
    },
  }),
};

export default function Hero() {
  const containerRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  });

  const y = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  const nameLetters = personalInfo.name.split('');

  const scrollToSection = () => {
    const aboutSection = document.getElementById('about');
    if (aboutSection) {
      aboutSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section 
      ref={containerRef}
      className="relative min-h-screen flex flex-col items-center justify-center section-padding overflow-hidden"
    >
      {/* Interactive Neural Network Background */}
      <Suspense fallback={null}>
        <HeroNeuralNetwork />
      </Suspense>

      {/* Ambient glow effects */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/20 rounded-full blur-[180px] pointer-events-none animate-pulse-slow" />
      <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-purple-500/10 rounded-full blur-[120px] pointer-events-none" />

      <motion.div 
        style={{ y, opacity }}
        className="container-max text-center relative z-10"
      >
        {/* Status badge */}
        <motion.div
          initial={{ opacity: 0, y: -20, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ delay: 0.3, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-panel mb-8 group cursor-default"
        >
          <motion.span 
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ repeat: Infinity, duration: 2 }}
            className="w-2 h-2 bg-green-500 rounded-full shadow-lg shadow-green-500/50"
          />
          <span className="text-sm text-muted-foreground font-medium">
            Open to opportunities
          </span>
          <Sparkles className="w-3 h-3 text-primary opacity-0 group-hover:opacity-100 transition-opacity" />
        </motion.div>

        {/* Name with staggered 3D animation */}
        <h1 className="text-5xl md:text-7xl lg:text-8xl xl:text-9xl font-bold tracking-tight mb-6 perspective-1000">
          <span className="sr-only">{personalInfo.name}</span>
          <span aria-hidden="true" className="inline-block">
            {nameLetters.map((letter, i) => (
              <motion.span
                key={i}
                custom={i}
                initial="hidden"
                animate="visible"
                variants={letterVariants}
                className={`inline-block ${letter === ' ' ? 'w-4 md:w-6' : ''} hover:text-gradient transition-colors duration-300`}
                style={{ transformStyle: 'preserve-3d' }}
              >
                {letter === ' ' ? '\u00A0' : letter}
              </motion.span>
            ))}
          </span>
        </h1>

        {/* Title with blur reveal */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={titleVariants}
          className="mb-6 overflow-hidden"
        >
          <span className="text-xl md:text-2xl lg:text-3xl font-mono text-gradient font-semibold tracking-wide">
            {personalInfo.title}
          </span>
        </motion.div>

        {/* Tagline with fade up */}
        <motion.p
          initial="hidden"
          animate="visible"
          variants={taglineVariants}
          className="text-base md:text-lg lg:text-xl text-muted-foreground max-w-2xl mx-auto mb-12 leading-relaxed"
        >
          {personalInfo.tagline}
        </motion.p>

        {/* CTA Buttons with scale animation */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={ctaVariants}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12"
        >
          {/* Primary CTA - Enter Portfolio */}
          <motion.button
            onClick={scrollToSection}
            whileHover={{ scale: 1.03, y: -2 }}
            whileTap={{ scale: 0.97 }}
            className="group relative px-8 py-4 rounded-2xl font-semibold text-primary-foreground overflow-hidden shadow-2xl shadow-primary/25"
          >
            {/* Animated gradient background */}
            <motion.div 
              className="absolute inset-0 bg-gradient-to-r from-primary via-purple-500 to-primary bg-[length:200%_100%]"
              animate={{ backgroundPosition: ['0% 0%', '200% 0%'] }}
              transition={{ repeat: Infinity, duration: 3, ease: 'linear' }}
            />
            
            {/* Shine effect */}
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
              <div className="absolute inset-0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/20 to-transparent" />
            </div>
            
            <span className="relative flex items-center gap-3">
              <span>Enter Portfolio</span>
              <motion.span
                animate={{ y: [0, 3, 0] }}
                transition={{ repeat: Infinity, duration: 1.5, ease: 'easeInOut' }}
              >
                <ChevronDown className="w-5 h-5" />
              </motion.span>
            </span>
          </motion.button>

          {/* Social Links */}
          <div className="flex items-center gap-3">
            {[
              { icon: Github, href: personalInfo.github, label: 'GitHub' },
              { icon: Linkedin, href: personalInfo.linkedin, label: 'LinkedIn' },
              { icon: Mail, href: `mailto:${personalInfo.email}`, label: 'Email' },
            ].map(({ icon: Icon, href, label }, index) => (
              <motion.a
                key={label}
                custom={index}
                initial="hidden"
                animate="visible"
                variants={socialVariants}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.15, y: -3 }}
                whileTap={{ scale: 0.95 }}
                className="p-3.5 rounded-xl glass-panel hover:border-primary/50 hover:bg-primary/10 transition-all duration-300 group"
                aria-label={label}
              >
                <Icon className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors duration-300" />
              </motion.a>
            ))}
          </div>
        </motion.div>

        {/* Location */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.5, duration: 0.8 }}
          className="text-sm text-muted-foreground/70 font-mono tracking-wider"
        >
          📍 {personalInfo.location}
        </motion.p>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.8, duration: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <motion.button
          onClick={scrollToSection}
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
          className="w-7 h-12 rounded-full border-2 border-muted-foreground/30 flex items-start justify-center p-2 hover:border-primary/50 transition-colors cursor-pointer"
          aria-label="Scroll to content"
        >
          <motion.div 
            animate={{ opacity: [0.3, 1, 0.3], y: [0, 8, 0] }}
            transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
            className="w-1.5 h-3 bg-muted-foreground/60 rounded-full"
          />
        </motion.button>
      </motion.div>
    </section>
  );
}
