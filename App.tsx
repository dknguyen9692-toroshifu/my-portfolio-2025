import React, { useEffect, useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Projects from './components/Projects';
import About from './components/About';
import LifeSnapshots from './components/LifeSnapshots';
import Contact from './components/Contact';
import BackgroundAnimation from './components/BackgroundAnimation';
import CaseStudy from './components/CaseStudy';
import BackgroundMusic from './components/BackgroundMusic';
import { Project } from './types';

type ViewState = 'home' | 'case-study';

function App() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [view, setView] = useState<ViewState>('home');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  useEffect(() => {
    const mouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: e.clientX,
        y: e.clientY
      });
    };

    window.addEventListener("mousemove", mouseMove);
    return () => window.removeEventListener("mousemove", mouseMove);
  }, []);

  // Handle switching to a specific project
  const handleCaseStudyClick = (project: Project) => {
    setSelectedProject(project);
    setView('case-study');
  };

  // Handle navigation from Navbar
  const handleNavigation = (href: string) => {
    if (view === 'case-study') {
      setView('home');
      setSelectedProject(null);
      // Wait for re-render before scrolling
      setTimeout(() => {
        const element = document.querySelector(href);
        element?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } else {
      const element = document.querySelector(href);
      element?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleBackToHome = () => {
    setView('home');
    setSelectedProject(null);
    window.scrollTo(0, 0);
  };

  return (
    <div className="min-h-screen text-primary selection:bg-white selection:text-black relative overflow-x-hidden">

      {/* Global Background Animation */}
      <BackgroundAnimation />

      {/* Background Music Player */}
      <BackgroundMusic />

      {/* Custom Cursor Element */}
      <div
        className="fixed top-0 left-0 w-8 h-8 border border-white rounded-full pointer-events-none z-[100] -translate-x-1/2 -translate-y-1/2 mix-blend-difference hidden md:block transition-transform duration-100 ease-linear"
        style={{
          left: mousePosition.x,
          top: mousePosition.y,
        }}
      />
      <div
        className="fixed top-0 left-0 w-1 h-1 bg-white rounded-full pointer-events-none z-[100] -translate-x-1/2 -translate-y-1/2 mix-blend-difference hidden md:block"
        style={{
          left: mousePosition.x,
          top: mousePosition.y,
        }}
      />

      <Navbar onNavigate={handleNavigation} isHome={view === 'home'} />

      {view === 'home' ? (
        <main className="relative z-10">
          <Hero />
          <Projects onCaseStudyClick={handleCaseStudyClick} />
          <About />
          <LifeSnapshots />
        </main>
      ) : (
        selectedProject && (
          <CaseStudy
            project={selectedProject}
            onBack={handleBackToHome}
          />
        )
      )}

      {view === 'home' && <Contact />}
    </div>
  );
}

export default App;