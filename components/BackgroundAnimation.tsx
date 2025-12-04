import React, { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const BackgroundAnimation: React.FC = () => {
  const { scrollY } = useScroll();
  const containerRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(true);

  // IntersectionObserver to pause animations when not visible
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      { threshold: 0 }
    );

    observer.observe(container);
    return () => observer.disconnect();
  }, []);

  // Create parallax effects for the blobs
  const y1 = useTransform(scrollY, [0, 2000], [0, 400]);
  const y2 = useTransform(scrollY, [0, 2000], [0, -300]);
  const y3 = useTransform(scrollY, [0, 2000], [0, 100]);

  // SVG Noise Pattern
  const noisePattern = `data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='1'/%3E%3C/svg%3E`;

  // Animation config - only animate when visible
  const animateProps = isVisible ? {
    blob1: {
      x: [-50, 50, -50],
      scale: [1, 1.1, 1],
      opacity: [0.1, 0.2, 0.1]
    },
    blob2: {
      x: [50, -50, 50],
      scale: [1.1, 1, 1.1],
      opacity: [0.1, 0.25, 0.1]
    },
    blob3: {
      scale: [0.8, 1.2, 0.8],
      opacity: [0.05, 0.15, 0.05]
    }
  } : {
    blob1: {},
    blob2: {},
    blob3: {}
  };

  return (
    <div ref={containerRef} className="fixed inset-0 w-full h-full pointer-events-none select-none overflow-hidden z-0">
        {/* Noise Overlay */}
        <div
          className="absolute inset-0 z-[1] opacity-[0.04] mix-blend-overlay"
          style={{ backgroundImage: `url("${noisePattern}")` }}
        />

        {/* Top Left Glow - Indigo */}
        <motion.div
          style={{ y: y1 }}
          className="absolute top-[-10%] left-[-10%] w-[600px] md:w-[900px] h-[600px] md:h-[900px] bg-indigo-900 rounded-full blur-[120px] opacity-10"
          animate={animateProps.blob1}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />

        {/* Bottom Right Glow - Purple */}
        <motion.div
          style={{ y: y2 }}
          className="absolute bottom-[-10%] right-[-10%] w-[500px] md:w-[800px] h-[500px] md:h-[800px] bg-purple-900 rounded-full blur-[120px] opacity-10"
          animate={animateProps.blob2}
          transition={{
            duration: 18,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1
          }}
        />

        {/* Center Accent - Blue */}
        <motion.div
           style={{ y: y3 }}
           className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-blue-900 rounded-full blur-[120px] opacity-5"
           animate={animateProps.blob3}
           transition={{
             duration: 20,
             repeat: Infinity,
             ease: "easeInOut"
           }}
        />
    </div>
  );
};

export default BackgroundAnimation;