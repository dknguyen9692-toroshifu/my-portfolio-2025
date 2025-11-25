import React from 'react';
import { motion } from 'framer-motion';

const BackgroundAnimation: React.FC = () => {
  return (
    <div className="fixed inset-0 w-full h-full pointer-events-none select-none overflow-hidden z-0">
        {/* Top Left Glow - Indigo */}
        <motion.div 
          className="absolute top-[-10%] left-[-10%] w-[600px] md:w-[900px] h-[600px] md:h-[900px] bg-indigo-900 rounded-full blur-[120px] opacity-20"
          animate={{ 
            x: [-50, 50, -50],
            y: [-30, 30, -30],
            scale: [1, 1.1, 1],
            opacity: [0.1, 0.2, 0.1]
          }}
          transition={{ 
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        
        {/* Bottom Right Glow - Purple */}
        <motion.div 
          className="absolute bottom-[-10%] right-[-10%] w-[500px] md:w-[800px] h-[500px] md:h-[800px] bg-purple-900 rounded-full blur-[120px] opacity-20"
          animate={{ 
            x: [50, -50, 50],
            y: [30, -30, 30],
            scale: [1.1, 1, 1.1],
            opacity: [0.1, 0.25, 0.1]
          }}
          transition={{ 
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1
          }}
        />

        {/* Center Accent - Blue */}
        <motion.div 
           className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-blue-900 rounded-full blur-[120px] opacity-10"
           animate={{ 
             scale: [0.8, 1.2, 0.8],
             opacity: [0.05, 0.15, 0.05]
           }}
           transition={{ 
             duration: 12,
             repeat: Infinity,
             ease: "easeInOut"
           }}
        />
    </div>
  );
};

export default BackgroundAnimation;