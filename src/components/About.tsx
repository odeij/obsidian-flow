import { motion, useInView, useScroll, useTransform, useMotionValueEvent } from 'framer-motion';
import { useRef, useState } from 'react';
import { stats } from '@/data/portfolio';
import { Cpu, Eye, Brain, Zap } from 'lucide-react';

const iconMap = [Cpu, Eye, Brain, Zap];

const timelineItems = [
  {
    year: '2022',
    title: 'Started the Journey',
    description: 'Began Computer Science studies at Lebanese International University, diving deep into algorithms and systems.',
  },
  {
    year: '2025',
    title: 'Research Breakthrough',
    description: "Joined AUB's Vision & Robotics Lab, working on cutting-edge 3D segmentation and human-AI collaboration.",
  },
  {
    year: 'Now',
    title: 'Building the Future',
    description: 'Leading ML development at MarksmanAI while contributing to academic research at ICRA.',
  },
];

function StatCard({ stat, index }: { stat: typeof stats[0]; index: number }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const Icon = iconMap[index];

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40, scale: 0.95 }}
      animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
      transition={{ delay: index * 0.1, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className="group relative"
    >
      <div className="relative p-6 rounded-2xl glass-panel hover:border-primary/30 transition-all duration-300 hover-lift">
        <div className="absolute inset-0 rounded-2xl bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity" />
        <div className="relative">
          <div className="flex items-center justify-between mb-4">
            <div className="p-2 rounded-lg bg-primary/10">
              <Icon className="w-5 h-5 text-primary" />
            </div>
            <span className="text-xs font-mono text-muted-foreground uppercase tracking-wider">
              {stat.label}
            </span>
          </div>
          <div className="flex items-baseline gap-1">
            <motion.span
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{ delay: index * 0.1 + 0.3, duration: 0.5 }}
              className="text-4xl font-bold text-gradient"
            >
              {stat.value}
            </motion.span>
            <span className="text-lg text-muted-foreground">{stat.suffix}</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

function TimelineNode({ item, index }: { item: typeof timelineItems[0]; index: number }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });
  const isLeft = index % 2 === 0;

  return (
    <div ref={ref} className="relative flex items-start" style={{ minHeight: '120px' }}>
      {/* Center dot - absolutely positioned on the line */}
      <motion.div
        initial={{ scale: 0 }}
        animate={isInView ? { scale: 1 } : {}}
        transition={{ duration: 0.5, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
        className="absolute left-1/2 top-4 -translate-x-1/2 z-10 w-4 h-4 rounded-full bg-primary border-4 border-background shadow-[0_0_12px_hsl(var(--primary)/0.5)]"
      />

      {/* Left side content */}
      <div className="w-1/2 flex justify-end pr-8 md:pr-12">
        {isLeft && (
          <motion.div
            initial={{ opacity: 0, x: -60 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="glass-panel p-5 rounded-2xl max-w-sm hover:border-primary/30 transition-all duration-300 hover-lift text-right"
          >
            <span className="text-xs font-mono text-primary uppercase tracking-wider">{item.year}</span>
            <h3 className="text-lg font-semibold mt-1 mb-2 text-foreground">{item.title}</h3>
            <p className="text-sm text-muted-foreground">{item.description}</p>
          </motion.div>
        )}
      </div>

      {/* Right side content */}
      <div className="w-1/2 pl-8 md:pl-12">
        {!isLeft && (
          <motion.div
            initial={{ opacity: 0, x: 60 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="glass-panel p-5 rounded-2xl max-w-sm hover:border-primary/30 transition-all duration-300 hover-lift"
          >
            <span className="text-xs font-mono text-primary uppercase tracking-wider">{item.year}</span>
            <h3 className="text-lg font-semibold mt-1 mb-2 text-foreground">{item.title}</h3>
            <p className="text-sm text-muted-foreground">{item.description}</p>
          </motion.div>
        )}
      </div>
    </div>
  );
}

export default function About() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const timelineRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: timelineRef,
    offset: ['start 80%', 'end 60%'],
  });

  const lineHeight = useTransform(scrollYProgress, [0, 1], ['0%', '100%']);

  return (
    <section id="about" className="section-padding relative">
      <div className="container-max">
        {/* Section header */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <span className="text-sm font-mono text-primary uppercase tracking-widest">
            01 — About
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mt-4 mb-6">
            The Journey So Far
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl leading-relaxed">
            I'm an AI researcher and engineer focused on pushing the boundaries of computer vision
            and 3D perception. My work spans from academic research in human-in-the-loop machine learning
            to building production-ready vision systems for startups.
          </p>
        </motion.div>

        {/* Stats grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 mb-20">
          {stats.map((stat, index) => (
            <StatCard key={stat.label} stat={stat} index={index} />
          ))}
        </div>

        {/* Timeline */}
        <div ref={timelineRef} className="relative">
          {/* Static faint line */}
          <div className="absolute left-1/2 top-0 bottom-0 w-px -translate-x-1/2 bg-border/30" />
          {/* Animated growing line */}
          <motion.div
            className="absolute left-1/2 top-0 w-px -translate-x-1/2 bg-gradient-to-b from-primary via-primary/70 to-primary/30"
            style={{ height: lineHeight }}
          />

          <div className="space-y-12 py-8">
            {timelineItems.map((item, index) => (
              <TimelineNode key={item.year} item={item} index={index} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}