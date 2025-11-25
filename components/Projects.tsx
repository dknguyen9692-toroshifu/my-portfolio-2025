import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { Project } from '../types';

const projects: Project[] = [
  {
    id: '1',
    title: 'TikTok',
    category: '',
    image: 'https://picsum.photos/800/600?random=1',
    year: '2025',
    description: "Bringing agentic AI to the finger tips of TikTok's global sales teams (coming soon)."
  },
  {
    id: '2',
    title: 'Salesforce',
    category: '',
    image: 'https://picsum.photos/800/600?random=2',
    year: '2021 — 2022',
    description: "Mulesoft's next-gen network monitoring experience."
  },
  {
    id: '3',
    title: 'Domino AI',
    category: '',
    image: 'https://picsum.photos/800/600?random=3',
    year: '2023',
    description: 'Managing environments on Domino Data Platform.'
  },
  {
    id: '4',
    title: 'Oracle Cloud',
    category: '',
    image: 'https://picsum.photos/800/600?random=4',
    year: '2019 — 2020',
    description: 'Securing the Oracle Cloud.'
  }
];

interface ProjectsProps {
  onCaseStudyClick: (project: Project) => void;
}

const Projects: React.FC<ProjectsProps> = ({ onCaseStudyClick }) => {
  const [hoveredProject, setHoveredProject] = useState<string | null>(null);

  return (
    <section id="work" className="py-24 md:py-32 bg-white/[0.02] relative z-10 px-6 md:px-12 backdrop-blur-[2px]">
      <div className="container mx-auto max-w-6xl">
        <div className="flex flex-col md:flex-row justify-between items-end mb-20">
          <h2 className="font-serif text-4xl md:text-5xl text-primary font-bold tracking-tight">Sample work</h2>
        </div>

        <div className="space-y-12 md:space-y-32">
          {projects.map((project, index) => (
            <motion.div 
              key={project.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8 }}
              className={`flex flex-col ${index % 2 === 1 ? 'md:flex-row-reverse' : 'md:flex-row'} gap-8 md:gap-20 items-center group cursor-pointer`}
              onMouseEnter={() => setHoveredProject(project.id)}
              onMouseLeave={() => setHoveredProject(null)}
              onClick={() => onCaseStudyClick(project)}
            >
              {/* Image Container */}
              <div className="w-full md:w-3/5 overflow-hidden">
                <div className="relative overflow-hidden aspect-[4/3]">
                  <motion.img 
                    src={project.image} 
                    alt={project.title}
                    className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-500" />
                </div>
              </div>

              {/* Text Content */}
              <div className="w-full md:w-2/5 flex flex-col justify-center">
                <span className="text-xs text-secondary uppercase tracking-widest mb-4 flex items-center gap-2">
                  {project.category && (
                    <>
                      {project.category}
                      <span className="w-8 h-[1px] bg-secondary/50"></span>
                    </>
                  )}
                  {project.year}
                </span>
                <h3 className="font-serif text-3xl md:text-5xl text-primary mb-6 font-bold tracking-tight group-hover:text-white transition-colors">
                  {project.title}
                </h3>
                <p className="text-secondary leading-relaxed mb-8">
                  {project.description}
                </p>
                <button 
                  onClick={(e) => {
                    e.stopPropagation(); // Prevent double triggering if parent is clicked
                    onCaseStudyClick(project);
                  }}
                  className="flex items-center gap-2 text-primary text-sm uppercase tracking-widest group/btn hover:text-white transition-colors"
                >
                  See Case Study
                  <ArrowUpRight size={16} className="transition-transform duration-300 group-hover/btn:translate-x-1 group-hover/btn:-translate-y-1" />
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;