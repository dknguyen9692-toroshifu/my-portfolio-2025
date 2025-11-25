import React from 'react';
import { motion } from 'framer-motion';

// Using Unsplash images to match the aesthetic (Corgis, Travel, Lifestyle)
const snapshots = [
  "https://images.unsplash.com/photo-1612536053388-75b9d2e05a8d?q=80&w=800&auto=format&fit=crop", // Corgi / Dog
  "https://images.unsplash.com/photo-1504196606672-aef5c9cefc92?q=80&w=800&auto=format&fit=crop", // Forest / Hiking
  "https://images.unsplash.com/photo-1510915361894-db8b60106cb1?q=80&w=800&auto=format&fit=crop", // Music / Guitar
  "https://images.unsplash.com/photo-1596436889106-be35e843f974?q=80&w=800&auto=format&fit=crop", // Travel / Architecture
  "https://images.unsplash.com/photo-1548199973-03cce0bbc87b?q=80&w=800&auto=format&fit=crop", // Another Dog
  "https://images.unsplash.com/photo-1501504905252-473c47e087f8?q=80&w=800&auto=format&fit=crop", // Coffee / Lifestyle
  "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?q=80&w=800&auto=format&fit=crop", // Nature
  "https://images.unsplash.com/photo-1516961642265-531546e84af2?q=80&w=800&auto=format&fit=crop", // Camera / Photography
  "https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?q=80&w=800&auto=format&fit=crop", // Mountains
  "https://images.unsplash.com/photo-1534067783741-5127692bb454?q=80&w=800&auto=format&fit=crop", // Beach
  "https://images.unsplash.com/photo-1555597673-b21d5c935865?q=80&w=800&auto=format&fit=crop", // City street
  "https://images.unsplash.com/photo-1517849845537-4d257902454a?q=80&w=800&auto=format&fit=crop", // Dog
];

const LifeSnapshots: React.FC = () => {
  return (
    <section id="life" className="py-24 md:py-32 px-6 md:px-12 bg-transparent relative z-10">
      <div className="container mx-auto max-w-[90rem]"> {/* Wider container for this section */}
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-24">
          
          {/* Left Side - Typography */}
          <div className="lg:w-1/3 shrink-0">
            <div className="sticky top-32">
               {/* Heavy top border line to match reference */}
               <div className="w-full h-[2px] bg-primary mb-8 origin-left transform transition-all duration-1000"></div>
               
               <h2 className="font-serif text-5xl md:text-6xl lg:text-7xl text-primary font-bold tracking-tight leading-none mb-6">
                Life <br className="hidden lg:block" /> snapshots
              </h2>
            </div>
          </div>

          {/* Right Side - Image Grid */}
          <div className="lg:w-2/3">
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {snapshots.map((src, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="aspect-square overflow-hidden rounded-xl relative group cursor-pointer"
                >
                  <img 
                    src={src} 
                    alt={`Life snapshot ${index + 1}`} 
                    className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                    loading="lazy"
                  />
                  {/* Subtle overlay */}
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />
                </motion.div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default LifeSnapshots;