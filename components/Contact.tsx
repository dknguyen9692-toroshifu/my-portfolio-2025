import React from 'react';
import { ArrowRight } from 'lucide-react';
import { SocialLink } from '../types';

const socials: SocialLink[] = [
  { platform: 'LinkedIn', url: 'https://www.linkedin.com/in/kylekhiemnguyen', handle: 'linkedin.com/in/kylekhiemnguyen' },
  { platform: 'Instagram', url: 'https://www.instagram.com/narcissistic_uncle', handle: '@narcissistic_uncle' },
];

const Contact: React.FC = () => {
  return (
    <footer id="contact" className="bg-white/[0.02] backdrop-blur-sm relative z-10 py-24 md:py-32 px-6 md:px-12 border-t border-white/5">
      <div className="container mx-auto max-w-6xl">
        <div className="flex flex-col md:flex-row justify-between gap-16 md:gap-0">
          
          <div className="md:w-1/2">
            <h2 className="font-serif text-5xl md:text-7xl text-primary mb-8 leading-[1.1] font-bold tracking-tight">
              Let's <span className="text-secondary">chat.</span>
            </h2>
            <p className="text-secondary text-lg max-w-md mb-12 font-light">
              Topics that intrigue me include AI-human interactions, user experience, career growth, Arsenal, travel (Japan in particular), and (please) good wine and food. Perhaps you want to collaborate on an exciting project together? Just give me a shout!
            </p>
            
            <a 
              href="mailto:dknguyen.9692@gmail.com" 
              className="inline-flex items-center gap-4 text-xl md:text-3xl text-primary border-b border-white/20 pb-2 hover:border-white transition-all duration-300 group font-medium"
            >
              dknguyen.9692@gmail.com
              <ArrowRight className="transform group-hover:translate-x-2 transition-transform duration-300" />
            </a>
          </div>

          <div className="md:w-1/3 flex flex-col justify-end">
            <div className="grid grid-cols-1 gap-6">
              {socials.map((social) => (
                <a 
                  key={social.platform}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between py-4 border-b border-white/5 group hover:pl-4 transition-all duration-300"
                >
                  <span className="text-lg text-primary font-medium">{social.platform}</span>
                  <span className="text-sm text-secondary group-hover:text-white transition-colors">{social.handle}</span>
                </a>
              ))}
            </div>
            
            <div className="mt-12 pt-8 flex justify-between items-end text-xs text-secondary/50 uppercase tracking-widest">
              <span>© {new Date().getFullYear()} BUILT BY KHIEM</span>
              <span>All rights reserved.</span>
            </div>
          </div>
          
        </div>
      </div>
    </footer>
  );
};

export default Contact;