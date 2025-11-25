import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';
import { Project } from '../types';

interface CaseStudyProps {
  project: Project;
  onBack: () => void;
}

const CaseStudy: React.FC<CaseStudyProps> = ({ project, onBack }) => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="relative z-10 bg-background min-h-screen pb-24">
      {/* Back Button */}
      <div className="fixed top-24 left-6 md:left-12 z-50">
        <button 
          onClick={onBack}
          className="flex items-center gap-2 text-secondary hover:text-white transition-colors duration-300 uppercase tracking-widest text-xs font-bold group bg-black/20 backdrop-blur-md px-4 py-2 rounded-full border border-white/5"
        >
          <ArrowLeft size={16} className="transition-transform group-hover:-translate-x-1" />
          Back
        </button>
      </div>

      {/* Hero Header */}
      <header className="pt-40 pb-20 px-6 md:px-12 container mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <span className="block text-secondary text-sm uppercase tracking-widest mb-6">
            Case Study • {project.year}
          </span>
          <h1 className="font-serif text-5xl md:text-7xl lg:text-8xl text-primary font-bold tracking-tight mb-8">
            {project.title}
          </h1>
          <p className="text-xl md:text-2xl text-secondary max-w-3xl leading-relaxed">
            {project.description}
          </p>
        </motion.div>
      </header>

      {/* Hero Image */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="w-full h-[60vh] md:h-[80vh] overflow-hidden"
      >
        <img 
          src={project.image} 
          alt={project.title} 
          className="w-full h-full object-cover"
        />
      </motion.div>

      {/* Content Body */}
      <div className="container mx-auto max-w-4xl px-6 md:px-12 py-24 md:py-32 space-y-24">
        
        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 border-y border-white/10 py-12">
          <div>
            <h4 className="text-secondary text-xs uppercase tracking-widest mb-2">Role</h4>
            <p className="text-white font-medium">Product Design</p>
          </div>
          <div>
            <h4 className="text-secondary text-xs uppercase tracking-widest mb-2">Year</h4>
            <p className="text-white font-medium">{project.year}</p>
          </div>
          <div>
            <h4 className="text-secondary text-xs uppercase tracking-widest mb-2">Platform</h4>
            <p className="text-white font-medium">Web & Mobile</p>
          </div>
          <div>
            <h4 className="text-secondary text-xs uppercase tracking-widest mb-2">Team</h4>
            <p className="text-white font-medium">Design & Eng</p>
          </div>
        </div>

        {/* Challenge Section */}
        <motion.section 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="grid md:grid-cols-12 gap-12"
        >
          <div className="md:col-span-4">
            <h3 className="text-2xl text-white font-bold font-serif">The Challenge</h3>
          </div>
          <div className="md:col-span-8">
            <p className="text-secondary text-lg leading-relaxed mb-6">
              In a rapidly evolving digital landscape, {project.title} needed a solution that would not only address immediate operational inefficiencies but also scale for future growth. The existing systems were fragmented, leading to data silos and a disjointed user experience.
            </p>
            <p className="text-secondary text-lg leading-relaxed">
              Our primary goal was to unify these disparate workflows into a cohesive, intuitive interface that empowered users to make data-driven decisions with confidence and speed.
            </p>
          </div>
        </motion.section>

        {/* Large Detail Image */}
        <div className="rounded-xl overflow-hidden aspect-video bg-surface relative">
           <img 
             src={`https://picsum.photos/1200/800?random=${project.id}b`} 
             alt="Interface Detail" 
             className="w-full h-full object-cover opacity-80 hover:opacity-100 transition-opacity duration-500"
           />
        </div>

        {/* Solution Section */}
        <motion.section 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="grid md:grid-cols-12 gap-12"
        >
          <div className="md:col-span-4">
            <h3 className="text-2xl text-white font-bold font-serif">The Solution</h3>
          </div>
          <div className="md:col-span-8">
            <p className="text-secondary text-lg leading-relaxed mb-6">
              We approached the problem by adopting a user-centric design methodology. Through extensive research and prototyping, we identified key friction points and reimagined the core navigation structure.
            </p>
            <ul className="list-disc list-inside text-secondary space-y-4 mb-6 ml-4">
              <li>Streamlined dashboard for real-time analytics.</li>
              <li>Modular component architecture for consistent UI.</li>
              <li>Enhanced accessibility compliance (WCAG 2.1 AA).</li>
            </ul>
            <p className="text-secondary text-lg leading-relaxed">
              The final delivery resulted in a 40% increase in user engagement and a significant reduction in task completion time.
            </p>
          </div>
        </motion.section>

      </div>
    </div>
  );
};

export default CaseStudy;