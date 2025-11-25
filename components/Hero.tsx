import React from 'react';
import { motion } from 'framer-motion';
import { ArrowDown } from 'lucide-react';

const Hero: React.FC = () => {
  return (
    <section id="hero" className="min-h-screen flex flex-col justify-center px-6 md:px-12 pt-20 relative overflow-hidden bg-transparent">
      <div className="container mx-auto max-w-6xl relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 100 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <span className="block text-secondary text-sm md:text-base mb-6 uppercase tracking-widest">
            Hello there!
          </span>
          <h1 className="font-serif text-4xl md:text-6xl lg:text-8xl font-bold leading-[1.1] text-primary mb-8 tracking-tight">
            I'm a designer <br />
            with a passion for <br />
            <span className="text-secondary/80">complex</span> stuff
          </h1>
          <p className="max-w-xl text-secondary text-lg md:text-xl leading-relaxed">
            I love making sense out of complex systems and processes through the creation of delightful, intuitive, and functional experiences.
          </p>
        </motion.div>
      </div>

      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 1 }}
        className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4 cursor-pointer z-10"
        onClick={() => document.getElementById('work')?.scrollIntoView({ behavior: 'smooth' })}
      >
        <span className="text-xs uppercase tracking-widest text-secondary">Scroll</span>
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
        >
          <ArrowDown size={20} className="text-primary" />
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Hero;