import Navigation from '@/components/Navigation';
import Hero from '@/components/Hero';
import About from '@/components/About';
import Projects from '@/components/Projects';
import Experience from '@/components/Experience';
import Skills from '@/components/Skills';
import Education from '@/components/Education';
import Contact from '@/components/Contact';
import ScrollProgress from '@/components/ScrollProgress';
import CustomCursor from '@/components/CustomCursor';

const Index = () => {
  return (
    <div className="noise-overlay relative min-h-screen bg-background text-foreground overflow-x-hidden">
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
    </div>
  );
};

export default Index;
