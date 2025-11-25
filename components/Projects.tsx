
import React, { useState, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { Project } from '../types';

const projects: Project[] = [
  {
    id: '1',
    title: 'TikTok',
    category: '',
    image: 'https://i.postimg.cc/J4mFRWx7/tiktok.jpg', 
    year: '2025',
    description: "Bringing agentic AI to the finger tips of TikTok's global sales teams (coming soon)."
  },
  {
    id: '2',
    title: 'Salesforce',
    category: '',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1600&h=1000&auto=format&fit=crop',
    year: '2021 — 2022',
    description: "Mulesoft's next-gen network monitoring experience."
  },
  {
    id: '3',
    title: 'Domino AI',
    category: '',
    image: 'https://images.unsplash.com/photo-1629752187687-3d3c7ea3a21b?q=80&w=1600&h=1000&auto=format&fit=crop',
    year: '2023',
    description: 'Managing environments on Domino Data Platform.'
  },
  {
    id: '4',
    title: 'Oracle Cloud',
    category: '',
    image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=1600&h=1000&auto=format&fit=crop',
    year: '2019 — 2020',
    description: 'Securing the Oracle Cloud.'
  }
];

interface ProjectsProps {
  onCaseStudyClick: (project: Project) => void;
}

// Individual Project Component
const ProjectItem: React.FC<{ 
  project: Project; 
  index: number; 
  onCaseStudyClick: (p: Project) => void;
  setHoveredProject: (id: string | null) => void; 
}> = ({ project, index, onCaseStudyClick, setHoveredProject }) => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });
  
  // Parallax effect: Image moves slightly slower than container
  const y = useTransform(scrollYProgress, [0, 1], ["-10%", "10%"]);

  return (
    <motion.div 
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-10%" }}
      transition={{ duration: 0.8 }}
      className="flex flex-col gap-8 group cursor-pointer"
      onMouseEnter={() => setHoveredProject(project.id)}
      onMouseLeave={() => setHoveredProject(null)}
      onClick={() => onCaseStudyClick(project)}
    >
      {/* Image Container - Taller 16:10 Ratio */}
      <div className="w-full overflow-hidden rounded-sm" ref={ref}>
        <div className="relative overflow-hidden aspect-[16/10] bg-surface">
          <motion.div style={{ y, scale: 1.1 }} className="w-full h-full relative">
             <img 
              src={project.image} 
              alt={project.title}
              width={1600}
              height={1000}
              className="w-full h-full object-cover transition-all duration-700 ease-out hover:opacity-90 group-hover:scale-105"
            />
          </motion.div>
          <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors duration-500" />
        </div>
      </div>

      {/* Text Content - Below Image */}
      <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-4 md:gap-12">
        <div className="md:w-1/2">
          {/* Title Stacked Vertically */}
          <div className="flex flex-col gap-1 mb-2">
            <h3 className="font-serif text-4xl md:text-5xl text-primary font-bold tracking-tight group-hover:text-white transition-colors">
              {project.title}
            </h3>
          </div>
        </div>
        
        <div className="md:w-1/2 flex flex-col items-start md:items-end">
          <p className="text-secondary leading-relaxed mb-6 max-w-md text-lg md:text-xl font-light md:text-right">
            {project.description}
          </p>

          <button 
            onClick={(e) => {
              e.stopPropagation(); // Prevent double triggering if parent is clicked
              onCaseStudyClick(project);
            }}
            className="flex items-center gap-2 text-primary text-xs uppercase tracking-widest group/btn hover:text-white transition-colors w-max border-b border-transparent hover:border-white/20 pb-1"
          >
            See Case Study
            <ArrowUpRight size={14} className="transition-transform duration-300 group-hover/btn:translate-x-1 group-hover/btn:-translate-y-1" />
          </button>
        </div>
      </div>
    </motion.div>
  );
}

const Projects: React.FC<ProjectsProps> = ({ onCaseStudyClick }) => {
  const [hoveredProject, setHoveredProject] = useState<string | null>(null);

  return (
    <section id="work" className="py-24 md:py-40 bg-white/[0.02] relative z-10 px-6 md:px-12 backdrop-blur-[2px]">
      <div className="container mx-auto max-w-6xl">
        <div className="flex flex-col mb-16 md:mb-24">
          <h2 className="font-serif text-4xl md:text-6xl text-primary font-bold tracking-tight mb-4">Sample work</h2>
          <div className="w-full h-[1px] bg-white/10 mt-8"></div>
        </div>

        {/* Single Column Layout */}
        <div className="grid grid-cols-1 gap-y-24 md:gap-y-40">
          {projects.map((project, index) => (
            <ProjectItem 
              key={project.id} 
              project={project} 
              index={index} 
              onCaseStudyClick={onCaseStudyClick}
              setHoveredProject={setHoveredProject}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
