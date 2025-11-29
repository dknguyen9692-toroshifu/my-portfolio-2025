
import React from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';

const experiences = [
  { role: "Staff product designer", company: "TikTok", period: "Feb 2024 - Present" },
  { role: "Lead product designer", company: "Domino AI", period: "Mar 2023 - Feb 2024" },
  { role: "Lead product designer", company: "Salesforce", period: "Sep 2021 - Feb 2024" },
  { role: "Sr. product designer", company: "Oracle Cloud", period: "Aug 2017 - Sep 2021" },
  { role: "Contract designer", company: "Microsoft", period: "Oct 2016 - June 2017" },
];

const About: React.FC = () => {
  return (
    <section id="about" className="py-24 md:py-40 px-6 md:px-12 bg-transparent relative z-10 overflow-hidden">
      
      {/* Decorative large text background */}
      <div className="absolute top-0 right-0 -mr-20 -mt-20 opacity-[0.03] select-none pointer-events-none">
        <span className="text-[20rem] md:text-[40rem] font-serif font-extrabold leading-none">KN</span>
      </div>

      <div className="container mx-auto max-w-4xl relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12">
          
          <div className="md:col-span-4">
            <h2 className="font-serif text-3xl md:text-4xl text-primary mb-8 sticky top-32 font-bold tracking-tight">
              A little about <br />
              <span className="text-secondary">myself.</span>
            </h2>
          </div>

          <div className="md:col-span-8 space-y-12">
            <motion.div
               initial={{ opacity: 0, y: 20 }}
               whileInView={{ opacity: 1, y: 0 }}
               viewport={{ once: true }}
               transition={{ duration: 0.6 }}
            >
              <p className="text-lg md:text-xl text-secondary leading-relaxed mb-8 font-light">
                I’m a Seattle-based product designer who loves solving complex problems (and occasionally perfecting an Amaretto recipe).
              </p>
              <p className="text-lg md:text-xl text-secondary leading-relaxed font-light">
                I currently lead AI design for TikTok’s internal CRM platform, and previously worked at Domino AI, Mulesoft/Salesforce, and Oracle Cloud Infrastructure. My work spans cloud computing, DevOps, AI/ML, and digital ads. It wasn't my intention, but this journey had nurtured in me a passion to solve UX problems typically characterized by technical complexities.
              </p>
            </motion.div>

             <motion.div
               id="experience"
               initial={{ opacity: 0, y: 20 }}
               whileInView={{ opacity: 1, y: 0 }}
               viewport={{ once: true }}
               transition={{ duration: 0.6, delay: 0.2 }}
               className="pt-12 border-t border-white/5"
            >
              <div>
                 <h4 className="text-white mb-8 font-serif text-xl font-bold">Experience</h4>
                 
                 <div className="space-y-6">
                   {experiences.map((exp, index) => (
                     <div key={index} className="group flex flex-col md:flex-row md:items-baseline justify-between border-b border-white/5 pb-4 last:border-0 last:pb-0">
                        <div className="flex flex-col sm:flex-row sm:items-baseline gap-1 sm:gap-2 mb-1 sm:mb-0">
                          <span className="text-white font-bold text-base tracking-tight">{exp.role}</span>
                          <span className="hidden sm:inline text-secondary/40 text-sm">@</span>
                          <span className="text-secondary text-base group-hover:text-white transition-colors duration-300">{exp.company}</span>
                        </div>
                        <span className="text-secondary/50 text-xs font-light tracking-wide font-mono">{exp.period}</span>
                     </div>
                   ))}
                 </div>
                 
                 <div className="mt-16">
                   <a 
                     href="https://drive.google.com/file/d/13CJxZeaxI_J2mftxnMCb6Avw0kR5L2Jk/view?usp=sharing" 
                     target="_blank"
                     rel="noopener noreferrer"
                     className="inline-flex items-center gap-3 px-8 py-3 border border-white/20 rounded-full text-white text-xs font-bold uppercase tracking-widest hover:bg-white hover:text-black hover:border-transparent transition-all duration-300 group"
                   >
                     SEE FULL RESUME
                     <ArrowUpRight size={16} className="text-white transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
                   </a>
                 </div>

              </div>
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default About;