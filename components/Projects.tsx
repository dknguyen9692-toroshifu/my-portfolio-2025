
import React, { useState, useRef, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { ArrowUpRight, Watch, X, MapPin, Camera } from 'lucide-react';
import { Project, WatchStory } from '../types';

// Updated Data with Timeline Order and Watches
const projects: Project[] = [
  {
    id: '1',
    title: 'TikTok',
    category: 'Conversational AI chatbot',
    image: 'https://res.cloudinary.com/dcc0zasye/image/upload/v1764132458/tiktok_qjyhje.png', 
    year: '2025',
    watchYear: '2024-2025',
    description: "Bringing agentic AI to the finger tips of TikTok's global sales teams (coming soon).",
    watches: [
      {
        brand: "Rolex",
        model: "Vintage Datejust Ref. 16220 (made in 1997)",
        purchaseLocation: "Acquired in Ginza, Tokyo",
        story: "Picked up during a cherry blossom trip to Japan, this watch marks the year I went all-in on AI and had the chance to join TikTok’s CRM AI initiative. It was also my wife’s second trimester - another perfect reason for us to slow down, celebrate, and take one more trip together before life changed.",
        reason: "I was drawn to its vintage charm - the softly aged dial, crisp engine-turned bezel, and worn brown leather strap capture time not through perfection, but through the honest way a Rolex matures over decades.",
        mainImage: "https://res.cloudinary.com/dcc0zasye/image/upload/v1764208014/24A5795_scntg1.webp",
        galleryImage: { src: "https://res.cloudinary.com/dcc0zasye/image/upload/v1764213051/24A5817_24db1b46-3386-4e1e-a2a5-11249ee3785d_zllxdc.webp", caption: "On the wrist at a Friendsgiving party." }
      },
      {
        brand: "Seiko",
        model: "Prospex Alpinist SPB121 (brand new)",
        purchaseLocation: "Acquired at Haneda Airport, Tokyo",
        story: "This watch was a late-2024 purchase, right at the end of my first year at TikTok. We were in Japan to celebrate my wife’s new job with our best friends during the peak of late autumn. Another excuse to visit Japan? Absolutely. I had my heart set on a Grand Seiko GMT SBGM221, but luck wasn’t on my side and I couldn’t find one in stock. Then, just as we were about to board our flight at Haneda, this Alpinist suddenly caught my eye...",
        reason: "I was drawn to the Alpinist’s character - the rich green dial, warm gold markers, and brown leather strap evoke the feeling of well-worn trail maps and quiet mountain mornings, the same calm beauty I find in the forests and trails of my home in the Pacific Northwest.",
        mainImage: "https://res.cloudinary.com/dcc0zasye/image/upload/v1764212614/post_7_10441_q0n0ax.jpg",
        galleryImage: { src: "https://res.cloudinary.com/dcc0zasye/image/upload/v1764209206/IMG_0801_ryuezh.jpg", caption: "On the wrist with my wife, Toro, and Toshi at Seattle Japanese Garden." }
      }
    ]
  },
  {
    id: '3', // Swapped ID for order
    title: 'Domino AI',
    category: 'MLOps',
    image: 'https://res.cloudinary.com/dcc0zasye/image/upload/v1764139578/domino_ivfaiz.png',
    year: '2023',
    description: 'Managing environments on Domino AI Platform. A deep dive into the needs of data scientists.',
    watches: [
      {
        brand: "Rolex",
        model: "Vintage Oyster Perpetual Ref. 6558 (made in 1961)",
        purchaseLocation: "Acquired in Kyoto",
        story: "My first vintage luxury watch - and my first timepiece purchased in Japan, a country that truly celebrates vintage craft. I found this 1961 Oyster Perpetual as I wrapped up my time at Domino AI, in the same year ChatGPT kicked off the AI revolution. A timeless watch marking a turning point in a very fast-moving year.",
        reason: "I picked up this Rolex Oyster Perpetual knowing it was made in 1961 - the same year my dad was born. There’s something grounding about wearing a watch that has quietly ticked through the same decades he has. Its clean, understated dial and gentle patina feel less like “vintage character” and more like time itself, carried forward in a way that reminds me of where my story began.",
        mainImage: "https://res.cloudinary.com/dcc0zasye/image/upload/v1764211178/0014-54823_pnyxfq.webp",
        galleryImage: { src: "https://res.cloudinary.com/dcc0zasye/image/upload/v1764214645/cbee3c64-4c0c-4df4-9259-83d305593faf_ikyye0.jpg", caption: "On the wrist with baby Tofu." }
      }
    ]
  },
  {
    id: '2', // Swapped ID for order
    title: 'Salesforce',
    category: 'Network Monitoring & Observability',
    image: 'https://res.cloudinary.com/dcc0zasye/image/upload/v1764132665/salesforce_zftcfi.png',
    year: '2022',
    description: "Mulesoft's next-gen network monitoring experience. Simplifying complex topologies for DevOps engineers.",
    watches: [
      {
        brand: "Tudor",
        model: "Black Bay 58 (brand new)",
        purchaseLocation: "Acquired in Seattle, WA",
        story: "My first serious watch, bought as a wedding gift to myself. In 2022, Vietnam finally reopened after years of Covid lockdown, and I was grateful that my entire family stayed healthy. After so many delays, we finally got to have our wedding - and the Black Bay 58 became the watch that captured that moment.",
        reason: "I was drawn to its identity as a dive watch - the shimmering blue dial, classic bezel design, and the dependable, pressure-tested mechanics echo the depth and stillness of the ocean, one of my first loves in life.",
        mainImage: "https://res.cloudinary.com/dcc0zasye/image/upload/v1764212522/Tudor-Black-Bay-58-Navy-Blue-by-WatchGecko7_txipxg.webp",
        galleryImage: { src: "https://res.cloudinary.com/dcc0zasye/image/upload/v1764212396/IMG_6516_vv5roy.jpg", caption: "On the wrist on one of the most important days of my life." }
      }
    ]
  }
];

interface ProjectsProps {
  onCaseStudyClick: (project: Project) => void;
}

// --- Components ---

const WatchDrawer: React.FC<{ 
  isOpen: boolean; 
  onClose: () => void; 
  watches: WatchStory[] | undefined;
  year: string;
}> = ({ isOpen, onClose, watches, year }) => {
  // Lock body scroll when drawer is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  // Use a portal to render outside the current stacking context (so it's above the Navbar)
  return createPortal(
    <AnimatePresence>
      {isOpen && watches && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[90]"
          />
          
          {/* Drawer Container */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed inset-y-0 right-0 z-[100] w-full md:w-[600px] bg-[#0f0f0f] border-l border-white/10 shadow-2xl flex flex-col overflow-hidden"
          >
            {/* Header / Close Button Area - Fixed at top */}
            <div className="absolute top-0 right-0 z-50 p-6 md:p-8">
              <button 
                onClick={onClose}
                className="flex items-center justify-center p-3 bg-white/10 hover:bg-white text-white hover:text-black border border-white/20 transition-all duration-300 rounded-full shadow-lg group"
                aria-label="Close"
              >
                <X size={24} className="group-hover:rotate-90 transition-transform duration-300" />
              </button>
            </div>

            {/* Scrollable Content Area */}
            <div className="flex-1 overflow-y-auto w-full">
               <div className="px-8 md:px-12 pb-12 pt-6 md:pt-8"> {/* Adjusted padding to align with close button */}
                <div className="mb-12">
                  <span className="block text-secondary text-xs uppercase tracking-widest mb-4 mt-4"> {/* mt-4 to align with button center */}
                    Timepiece Collection
                  </span>
                  <h2 className="font-serif text-4xl md:text-5xl text-white font-bold tracking-tight">
                    {year}
                  </h2>
                </div>

                <div className="space-y-20">
                  {watches.map((watch, idx) => (
                    <div key={idx} className="group">
                      {/* Header */}
                      <div className="flex flex-col gap-2 mb-6">
                        <h3 className="text-2xl text-white font-medium">{watch.brand}</h3>
                        <p className="text-secondary text-lg font-serif italic">{watch.model}</p>
                      </div>

                      {/* Main Image */}
                      <div className="aspect-[4/3] w-full overflow-hidden rounded-sm mb-8 bg-surface">
                        <img 
                          src={watch.mainImage} 
                          alt={`${watch.brand} ${watch.model}`}
                          className="w-full h-full object-cover transition-transform duration-700 hover:scale-105" 
                        />
                      </div>

                      {/* Meta Info */}
                      <div className="flex items-center gap-6 mb-8 text-xs uppercase tracking-widest text-secondary/70 border-b border-white/10 pb-6">
                        <div className="flex items-center gap-2">
                          <MapPin size={14} />
                          {watch.purchaseLocation}
                        </div>
                      </div>

                      {/* Story */}
                      <div className="prose prose-invert max-w-none mb-8">
                        <p className="text-secondary leading-relaxed mb-4">
                          <span className="text-white font-medium block mb-1">The Story</span>
                          {watch.story}
                        </p>
                        <p className="text-secondary leading-relaxed">
                          <span className="text-white font-medium block mb-1">Why this watch?</span>
                          {watch.reason}
                        </p>
                      </div>

                      {/* Gallery Image (Single) */}
                      <div className="space-y-2">
                          <div className="aspect-[4/3] w-full overflow-hidden rounded-sm bg-surface">
                            <img 
                              src={watch.galleryImage.src} 
                              alt={watch.galleryImage.caption}
                              className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                            />
                          </div>
                          <p className="text-[10px] uppercase tracking-wider text-secondary/50 flex items-center gap-1">
                            <Camera size={10} />
                            {watch.galleryImage.caption}
                          </p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-20 pt-12 border-t border-white/5 text-center">
                   <p className="text-secondary/60 text-base italic font-serif">
                     "Time is the only true luxury."
                   </p>
                </div>

              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>,
    document.body
  );
};

// Individual Project Component
const ProjectItem: React.FC<{ 
  project: Project; 
  index: number; 
  onCaseStudyClick: (p: Project) => void; 
  onWatchClick: (p: Project) => void;
  setHoveredProject: (id: string | null) => void; 
}> = ({ project, index, onCaseStudyClick, onWatchClick, setHoveredProject }) => {
  const ref = useRef<HTMLDivElement>(null);
  const [isWatchHovered, setIsWatchHovered] = useState(false);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });
  
  const y = useTransform(scrollYProgress, [0, 1], ["-5%", "5%"]);

  return (
    <div className="relative pl-8 md:pl-16">
      {/* Timeline Node - Adjusted top to align with year */}
      <div className="absolute left-[-5px] top-2 w-[9px] h-[9px] rounded-full bg-surface border border-secondary/50 z-20 group-hover:bg-white group-hover:border-white transition-colors duration-300"></div>

      <motion.div 
        ref={ref}
        initial={{ opacity: 0, x: -20 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, margin: "-10%" }}
        transition={{ duration: 0.8 }}
        className="flex flex-col gap-6 group cursor-pointer"
        onMouseEnter={() => setHoveredProject(project.id)}
        onMouseLeave={() => setHoveredProject(null)}
        onClick={() => onCaseStudyClick(project)}
      >
        {/* Year Label - Timeline style - Clean */}
        <div className="flex items-center gap-4">
           <span className="font-mono text-sm text-secondary/70 group-hover:text-white transition-colors">
            {project.year}
           </span>
        </div>

        {/* Image Container */}
        <div className="w-full overflow-hidden rounded-sm bg-surface">
          <div className="relative overflow-hidden aspect-[16/10]">
            <motion.div style={{ y, scale: 1.05 }} className="w-full h-full relative">
               <img 
                src={project.image} 
                alt={project.title}
                className={`w-full h-full object-cover transition-all duration-700 ease-out hover:opacity-90 ${!isWatchHovered ? 'group-hover:scale-105' : ''}`}
              />
            </motion.div>
            <div className={`absolute inset-0 bg-black/10 transition-colors duration-500 ${!isWatchHovered ? 'group-hover:bg-transparent' : ''}`} />
          </div>
        </div>

        {/* Text Content - Rearranged */}
        <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-4 md:gap-12">
          <div className="md:w-1/2">
            <div className="flex flex-col gap-1 mb-2">
              <h3 className="font-serif text-4xl md:text-5xl text-primary font-bold tracking-tight group-hover:text-white transition-colors">
                {project.title}
              </h3>
               <span className="text-secondary/50 text-sm uppercase tracking-wider">{project.category}</span>
            </div>
          </div>
          
          <div className="md:w-1/2 flex flex-col items-start md:items-end">
            <p className="text-secondary leading-relaxed mb-6 max-w-md text-lg md:text-xl font-light md:text-right">
              {project.description}
            </p>

            {/* Actions Area */}
            <div className="flex flex-col items-end gap-3">
                <button 
                  className="flex items-center gap-2 text-primary text-xs uppercase tracking-widest group/btn hover:text-white transition-colors w-max border-b border-transparent hover:border-white/20 pb-1"
                >
                  See Case Study
                  <ArrowUpRight size={14} className="transition-transform duration-300 group-hover/btn:translate-x-1 group-hover/btn:-translate-y-1" />
                </button>

                {/* Secondary Watch CTA */}
                {project.watches && (
                    <button
                        onClick={(e) => {
                          e.stopPropagation();
                          onWatchClick(project);
                        }}
                        onMouseEnter={() => setIsWatchHovered(true)}
                        onMouseLeave={() => setIsWatchHovered(false)}
                        className="flex items-center gap-2 text-secondary hover:text-white transition-all duration-300 mt-2 group/watch px-3 py-1.5 rounded-md border border-white/10 bg-white/5 hover:bg-white/10 hover:border-white/20 shadow-sm"
                    >
                        <Watch size={14} className="group-hover/watch:-rotate-12 transition-transform duration-300" />
                        <span className="text-[10px] uppercase tracking-widest font-medium">
                          Timepieces of {project.watchYear || project.year}
                        </span>
                    </button>
                )}
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

const Projects: React.FC<ProjectsProps> = ({ onCaseStudyClick }) => {
  const [hoveredProject, setHoveredProject] = useState<string | null>(null);
  const [activeWatchProject, setActiveWatchProject] = useState<Project | null>(null);

  return (
    <>
      <section id="work" className="py-24 md:py-40 bg-white/[0.02] relative z-10 px-6 md:px-12 backdrop-blur-[2px]">
        <div className="container mx-auto max-w-6xl">
          <div className="flex flex-col mb-16 md:mb-24">
            <h2 className="font-serif text-4xl md:text-6xl text-primary font-bold tracking-tight mb-4">Sample work</h2>
            <p className="text-secondary text-lg max-w-2xl leading-relaxed">
              Below are some of my most memorable past works. In addition to user experience design, I am also a passionate watch enthusiast. You can click on the "Timepieces" button under each case study to learn more about the special watches I acquired during that year.
            </p>
          </div>

          {/* Timeline Layout */}
          <div className="relative border-l border-white/10 ml-3 md:ml-0 space-y-24 md:space-y-40 py-8">
            {projects.map((project, index) => (
              <ProjectItem 
                key={project.id} 
                project={project} 
                index={index} 
                onCaseStudyClick={onCaseStudyClick}
                onWatchClick={(p) => setActiveWatchProject(p)}
                setHoveredProject={setHoveredProject}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Watch Drawer Overlay */}
      <WatchDrawer 
        isOpen={!!activeWatchProject} 
        onClose={() => setActiveWatchProject(null)} 
        watches={activeWatchProject?.watches}
        year={activeWatchProject?.watchYear || activeWatchProject?.year || ''}
      />
    </>
  );
};

export default Projects;
