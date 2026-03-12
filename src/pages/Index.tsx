import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Navigation from '@/components/Navigation';
import Hero from '@/components/Hero';
import About from '@/components/About';
import Projects from '@/components/Projects';
import Experience from '@/components/Experience';
import Skills from '@/components/Skills';
import Publications from '@/components/Publications';
import Education from '@/components/Education';
import Contact from '@/components/Contact';
import ScrollProgress from '@/components/ScrollProgress';
import CustomCursor from '@/components/CustomCursor';
import LoadingScreen from '@/components/LoadingScreen';

const Index = () => {
  const [showPortfolio, setShowPortfolio] = useState(false);

  return (
    <>
      {/* Loading Screen */}
      <AnimatePresence>
        {!showPortfolio && (
          <LoadingScreen onComplete={() => setShowPortfolio(true)} />
        )}
      </AnimatePresence>

      {/* Portfolio Content */}
      <AnimatePresence>
        {showPortfolio && (
          <motion.div
            className="noise-overlay relative min-h-screen bg-background text-foreground overflow-x-hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ 
              duration: 1,
              delay: 0.8,
              ease: [0.22, 1, 0.36, 1]
            }}
          >
            {/* Custom cursor (desktop only) */}
            <CustomCursor />

            {/* Navigation */}
            <Navigation />

            {/* Scroll progress indicator */}
            <ScrollProgress />

            {/* Main content */}
            <main>
              <Hero />
              <About />
              <Projects />
              <Experience />
              <Skills />
              <Education />
              <Contact />
            </main>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Index;
