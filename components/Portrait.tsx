import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const Portrait: React.FC = () => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });
  
  const y = useTransform(scrollYProgress, [0, 1], ["-5%", "5%"]);

  return (
    <section className="py-24 md:py-40 px-6 relative z-10 bg-transparent flex justify-center">
      <motion.div
        ref={ref}
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        whileInView={{ opacity: 1, scale: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="w-full max-w-md relative aspect-[3/4] md:aspect-[4/5] overflow-hidden rounded-lg group"
      >
        <div className="absolute inset-0 bg-secondary/10 group-hover:bg-transparent transition-colors duration-500 z-10 pointer-events-none mix-blend-overlay" />
        <motion.div style={{ y, scale: 1.1 }} className="w-full h-full">
            <img 
              src="https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=800&auto=format&fit=crop" 
              alt="Portrait" 
              className="w-full h-full object-cover transition-transform duration-1000 ease-out group-hover:scale-105 filter grayscale-[20%] group-hover:grayscale-0"
            />
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Portrait;