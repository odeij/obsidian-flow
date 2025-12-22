import { motion, useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import { personalInfo } from '@/data/portfolio';
import { Send, Github, Linkedin, Mail, MapPin, ArrowUpRight } from 'lucide-react';

export default function Contact() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const [isHovered, setIsHovered] = useState(false);

  return (
    <section id="contact" className="section-padding relative min-h-screen flex items-center">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-t from-primary/5 via-transparent to-transparent pointer-events-none" />

      <div className="container-max w-full">
        {/* Section header */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-sm font-mono text-primary uppercase tracking-widest">
            06 — Contact
          </span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mt-4 mb-6">
            Let's Build Something<br />
            <span className="text-gradient">Extraordinary</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-xl mx-auto">
            Open to research collaborations, technical roles, and challenging projects.
            Let's discuss how we can push boundaries together.
          </p>
        </motion.div>

        {/* Main CTA */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="flex justify-center mb-12"
        >
          <motion.a
            href={`mailto:${personalInfo.email}`}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="group relative inline-flex items-center gap-3 px-8 py-5 rounded-2xl overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-primary to-purple-500 transition-transform duration-500 group-hover:scale-105" />
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity">
              <div className="absolute inset-0 bg-gradient-to-r from-primary via-purple-500 to-primary bg-[length:200%_100%] animate-shimmer" />
            </div>
            
            <span className="relative text-lg font-semibold text-primary-foreground">
              Get in Touch
            </span>
            <motion.div
              animate={{ x: isHovered ? 5 : 0, y: isHovered ? -5 : 0 }}
              transition={{ type: 'spring', stiffness: 300 }}
              className="relative"
            >
              <Send className="w-5 h-5 text-primary-foreground" />
            </motion.div>
          </motion.a>
        </motion.div>

        {/* Contact links */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.4, duration: 0.5 }}
          className="flex flex-wrap justify-center gap-4 mb-16"
        >
          {[
            { icon: Mail, label: 'Email', value: personalInfo.email, href: `mailto:${personalInfo.email}` },
            { icon: Github, label: 'GitHub', value: 'GitHub', href: personalInfo.github },
            { icon: Linkedin, label: 'LinkedIn', value: 'LinkedIn', href: personalInfo.linkedin },
          ].map(({ icon: Icon, label, value, href }) => (
            <motion.a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ y: -4 }}
              className="group flex items-center gap-3 px-6 py-4 rounded-xl glass-panel hover:border-primary/30 transition-all duration-300"
            >
              <Icon className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
              <span className="font-medium">{value}</span>
              <ArrowUpRight className="w-4 h-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
            </motion.a>
          ))}
        </motion.div>

        {/* Location */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.6, duration: 0.5 }}
          className="flex justify-center"
        >
          <div className="flex items-center gap-2 text-muted-foreground">
            <MapPin className="w-4 h-4" />
            <span className="font-mono text-sm">{personalInfo.location}</span>
          </div>
        </motion.div>

        {/* Footer */}
        <motion.footer
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.8, duration: 0.5 }}
          className="mt-24 pt-8 border-t border-border/50 text-center"
        >
          <p className="text-sm text-muted-foreground">
            Designed & Built with precision by{' '}
            <span className="text-foreground font-medium">{personalInfo.name}</span>
          </p>
          <p className="text-xs text-muted-foreground/50 mt-2 font-mono">
            © {new Date().getFullYear()} All rights reserved.
          </p>
        </motion.footer>
      </div>
    </section>
  );
}
