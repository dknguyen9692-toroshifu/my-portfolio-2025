
import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';
import { Project, ContentBlock } from '../types';

interface CaseStudyProps {
  project: Project;
  onBack: () => void;
}

const CaseStudy: React.FC<CaseStudyProps> = ({ project, onBack }) => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Safe fallback if caseStudyData is missing
  const contentData = project.caseStudyData || {
    role: "Product Designer",
    product: project.category,
    team: "Design & Engineering",
    content: []
  };

  const formatText = (text: string) => {
    if (!text) return null;

    // Regex to match **bold** OR *italic*
    // Note: The order matters. Check for ** first.
    const regex = /(\*\*.*?\*\*)|(\*.*?\*)/g;
    
    const parts = text.split(regex).filter(part => part !== undefined && part !== '');
    
    return parts.map((part, i) => {
      if (part.startsWith('**') && part.endsWith('**')) {
        return <strong key={i} className="font-bold text-white">{part.slice(2, -2)}</strong>;
      }
      if (part.startsWith('*') && part.endsWith('*')) {
        return <em key={i} className="italic">{part.slice(1, -1)}</em>;
      }
      return part;
    });
  };

  const renderBlock = (block: ContentBlock) => {
    switch (block.type) {
      case 'text':
        return (
          <motion.section 
            key={block.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="grid md:grid-cols-12 gap-6 md:gap-12 mb-20"
          >
            <div className="md:col-span-4">
              {block.title && (
                <h3 className="text-2xl text-white font-bold font-serif sticky top-32">{block.title}</h3>
              )}
            </div>
            <div className="md:col-span-8 space-y-6">
              {block.paragraphs.map((paragraph, index) => (
                <p key={index} className="text-secondary text-lg leading-relaxed">
                  {paragraph}
                </p>
              ))}
            </div>
          </motion.section>
        );
      
      case 'image':
        return (
          <motion.div 
            key={block.id}
            initial={{ opacity: 0, scale: 0.98 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="rounded-xl overflow-hidden aspect-video bg-surface relative mb-20"
          >
             <img 
               src={block.src} 
               alt={block.alt || 'Case study detail'} 
               className="w-full h-full object-cover"
             />
             {block.caption && (
               <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent">
                 <p className="text-white/70 text-xs uppercase tracking-widest">{block.caption}</p>
               </div>
             )}
          </motion.div>
        );

      case 'list':
        const isNumbered = block.style === 'numbered';
        const ListTag = isNumbered ? 'ol' : 'ul';
        const listClass = isNumbered ? 'list-decimal' : 'list-disc';

        return (
           <motion.section 
            key={block.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="grid md:grid-cols-12 gap-6 md:gap-12 mb-20"
          >
            <div className="md:col-span-4">
               {block.title && (
                <h3 className="text-xl text-white font-bold font-serif sticky top-32">{block.title}</h3>
              )}
            </div>
            <div className="md:col-span-8">
               {block.intro && (
                <p className="text-secondary text-lg mb-6 leading-relaxed whitespace-pre-line">
                  {block.intro}
                </p>
               )}
               <ListTag className={`${listClass} list-outside text-secondary space-y-4 ml-4`}>
                {block.items.map((item, index) => {
                  if (typeof item === 'string') {
                    return <li key={index} className="pl-2 leading-relaxed text-lg">{item}</li>;
                  } else {
                     return (
                      <li key={index} className="pl-2 leading-relaxed text-lg">
                        <span className="block text-white font-medium">{item.label}</span>
                        
                        {item.description && (
                          <p className="text-secondary text-lg mt-1 mb-2 leading-relaxed">{item.description}</p>
                        )}
                        
                        {item.subItems && (
                          <ul className="list-disc list-outside ml-6 space-y-2 text-lg text-secondary/80 mt-2">
                            {item.subItems.map((sub, subIdx) => (
                              <li key={subIdx} className="pl-2">{sub}</li>
                            ))}
                          </ul>
                        )}
                      </li>
                     );
                  }
                })}
              </ListTag>
              {block.conclusion && (
                <p className="text-secondary text-lg mt-8 leading-relaxed whitespace-pre-line">
                  {formatText(block.conclusion)}
                </p>
              )}
            </div>
          </motion.section>
        );

      default:
        return null;
    }
  };

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
      <div className="container mx-auto max-w-6xl px-6 md:px-12">
        
        {/* Stats Grid - Constrained to max-w-4xl to match content below */}
        <div className="max-w-4xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-12 border-y border-white/10 py-12 mt-20 md:mt-32 mb-32">
          <div>
            <h4 className="text-secondary text-xs uppercase tracking-widest mb-2">Role</h4>
            <p className="text-white font-medium">{contentData.role}</p>
          </div>
          <div>
            <h4 className="text-secondary text-xs uppercase tracking-widest mb-2">Year</h4>
            <p className="text-white font-medium">{project.year}</p>
          </div>
          <div>
            <h4 className="text-secondary text-xs uppercase tracking-widest mb-2">Product</h4>
            <p className="text-white font-medium">{contentData.product}</p>
          </div>
          <div>
            <h4 className="text-secondary text-xs uppercase tracking-widest mb-2">Team</h4>
            <p className="text-white font-medium">{contentData.team}</p>
          </div>
        </div>

        {/* Dynamic Content Blocks */}
        <div className="max-w-4xl mx-auto">
          {contentData.content.map(block => renderBlock(block))}
        </div>

      </div>
    </div>
  );
};

export default CaseStudy;
