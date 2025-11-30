
import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, ArrowUp, ArrowDown } from 'lucide-react';
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
                  {formatText(paragraph)}
                </p>
              ))}
            </div>
          </motion.section>
        );

      case 'image':
        const isFullHeight = block.imageStyle === 'full';
        const isTall = block.imageStyle === 'tall';
        let aspectRatioClass = 'aspect-video';
        if (isFullHeight) aspectRatioClass = '';
        if (isTall) aspectRatioClass = 'aspect-[4/3]';

        return (
          <motion.div
            key={block.id}
            initial={{ opacity: 0, scale: 0.98 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className={`rounded-xl overflow-hidden bg-surface relative mb-12 -mt-6 ${aspectRatioClass}`}
          >
            <img
              src={block.src}
              alt={block.alt || 'Case study detail'}
              className={`w-full ${isFullHeight ? 'h-auto' : 'h-full object-cover object-top'}`}
              loading="lazy"
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
                  {formatText(block.intro)}
                </p>
              )}
              <ListTag className={`${listClass} list-outside text-secondary space-y-4 ml-4`}>
                {block.items.map((item, index) => {
                  if (typeof item === 'string') {
                    return <li key={index} className="pl-2 leading-relaxed text-lg">{formatText(item)}</li>;
                  } else {
                    return (
                      <li key={index} className="pl-2 leading-relaxed text-lg">
                        <span className="block text-white font-medium">{formatText(item.label)}</span>

                        {item.description && (
                          <p className="text-secondary text-lg mt-1 mb-2 leading-relaxed">{formatText(item.description)}</p>
                        )}

                        {item.subItems && (
                          <ul className="list-disc list-outside ml-6 space-y-2 text-lg text-secondary/80 mt-2">
                            {item.subItems.map((sub, subIdx) => (
                              <li key={subIdx} className="pl-2">{formatText(sub)}</li>
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

      case 'testimonial':
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
            <div className="md:col-span-8 space-y-12">
              {block.intro && (
                <p className="text-secondary text-lg mb-8 leading-relaxed whitespace-pre-line">
                  {formatText(block.intro)}
                </p>
              )}
              {block.items.map((item, idx) => (
                <div key={idx} className="border-l-2 border-blue-500/50 pl-6 md:pl-8 py-2">
                  <blockquote className="text-2xl md:text-3xl text-blue-400 font-bold mb-4 font-serif leading-tight">
                    {item.quote}
                  </blockquote>
                  <p className="text-lg text-secondary/90 leading-relaxed italic">
                    {item.body}
                  </p>
                </div>
              ))}
            </div>
          </motion.section>
        );

      case 'stats':
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
            <div className="md:col-span-8">
              {block.intro && (
                <p className="text-secondary text-lg mb-10 leading-relaxed whitespace-pre-line">
                  {formatText(block.intro)}
                </p>
              )}

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 mb-10">
                {block.items.map((item, idx) => (
                  <div key={idx} className="bg-white/5 border border-white/10 p-6 rounded-lg flex flex-col justify-between h-full min-h-[160px] hover:bg-white/10 transition-colors duration-300">
                    <span className="text-xs uppercase tracking-widest text-secondary/60 mb-2">{item.category}</span>
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        {item.trend === 'up' && <ArrowUp className="text-green-400 w-6 h-6 md:w-8 md:h-8" />}
                        {item.trend === 'down' && <ArrowDown className="text-green-400 w-6 h-6 md:w-8 md:h-8" />}
                        <span className="block text-3xl md:text-4xl text-white font-bold font-serif text-balance leading-tight">{item.value}</span>
                      </div>
                      <span className="text-sm md:text-base text-secondary">{item.label}</span>
                    </div>
                  </div>
                ))}
              </div>

              {block.conclusion && (
                <p className="text-secondary text-lg leading-relaxed whitespace-pre-line">
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
    <div className="min-h-screen bg-background text-primary pt-24 pb-32">
      {/* Global Background (from App.tsx) is fixed, so this sits on top */}

      <div className="fixed top-8 left-6 md:left-12 z-50">
        <button
          onClick={onBack}
          className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 backdrop-blur-md border border-white/10 hover:bg-white/10 transition-all group text-sm uppercase tracking-widest font-medium"
        >
          <ArrowLeft size={16} className="text-white group-hover:-translate-x-1 transition-transform" />
          Back
        </button>
      </div>

      <div className="container mx-auto px-6 md:px-12 max-w-6xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-20 md:mb-32 mt-12"
        >
          <h1 className="font-serif text-5xl md:text-7xl lg:text-8xl font-bold mb-8 leading-[1.1] tracking-tight">
            {project.title}
          </h1>
          <p className="text-xl md:text-2xl text-secondary max-w-2xl font-light leading-relaxed">
            {project.description}
          </p>
        </motion.div>
      </div>

      {/* Main Hero Image - Full Width */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="w-full mb-20 md:mb-32 bg-surface"
      >
        <img
          src={project.image}
          alt={project.title}
          className="w-full h-auto block"
        />
      </motion.div>

      <div className="container mx-auto px-6 md:px-12 max-w-6xl">
        {/* Stats Grid */}
        <div className="max-w-4xl mx-auto mb-32 border-y border-white/10 py-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
            <div>
              <span className="block text-xs uppercase tracking-widest text-secondary/60 mb-2">Role</span>
              <span className="text-white font-medium">{contentData.role}</span>
            </div>
            <div>
              <span className="block text-xs uppercase tracking-widest text-secondary/60 mb-2">Year</span>
              <span className="text-white font-medium">{project.year}</span>
            </div>
            <div>
              <span className="block text-xs uppercase tracking-widest text-secondary/60 mb-2">Product</span>
              <span className="text-white font-medium">{contentData.product}</span>
            </div>
            <div>
              <span className="block text-xs uppercase tracking-widest text-secondary/60 mb-2">Team</span>
              <span className="text-white font-medium">{contentData.team}</span>
            </div>
          </div>
        </div>

        {/* Dynamic Content Blocks */}
        <div className="max-w-4xl mx-auto">
          {contentData.content.map(block => renderBlock(block))}
        </div>

        {/* Next Project / Footer Nav (Simple placeholder for now) */}
        <div className="max-w-4xl mx-auto mt-32 pt-20 border-t border-white/10 flex justify-center">
          <button
            onClick={onBack}
            className="flex items-center gap-2 px-4 py-2 border border-white/20 rounded-sm hover:bg-white/10 transition-colors duration-300"
          >
            <span className="text-[10px] uppercase tracking-widest text-secondary font-medium">
              Back to all work
            </span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default CaseStudy;
