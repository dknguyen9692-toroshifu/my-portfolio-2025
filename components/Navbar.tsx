import React, { useState, useEffect } from 'react';
import { Menu, X, Linkedin, Instagram } from 'lucide-react';
import { motion, AnimatePresence, Variants } from 'framer-motion';
import { NavItem } from '../types';

const navItems: NavItem[] = [
  { label: 'Work', href: '#work' },
  { label: 'About', href: '#about' },
  { label: 'Experience', href: '#experience' },
  { label: 'Contact', href: '#contact' },
];

interface NavbarProps {
  onNavigate?: (href: string) => void;
  isHome?: boolean;
}

const Navbar: React.FC<NavbarProps> = ({ onNavigate, isHome = true }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMobileMenuOpen]);

  const handleLinkClick = (href: string) => {
    setIsMobileMenuOpen(false);
    
    // If specific navigation handler provided (for cross-view nav), use it
    if (onNavigate) {
      onNavigate(href);
      return;
    }

    // Default scroll behavior if on home
    const element = document.querySelector(href);
    if (element) {
      setTimeout(() => {
        element.scrollIntoView({ behavior: 'smooth' });
      }, 300);
    }
  };

  // Animation Variants
  const menuVariants: Variants = {
    initial: { 
      y: '-100%',
      opacity: 0
    },
    animate: { 
      y: '0%',
      opacity: 1,
      transition: {
        duration: 0.5,
        ease: [0.22, 1, 0.36, 1]
      }
    },
    exit: { 
      y: '-100%',
      opacity: 0,
      transition: {
        duration: 0.4,
        ease: [0.22, 1, 0.36, 1],
        delay: 0.2 // Wait for items to fade out
      }
    }
  };

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    },
    exit: {
      opacity: 0,
      transition: {
        staggerChildren: 0.05,
        staggerDirection: -1
      }
    }
  };

  const itemVariants: Variants = {
    hidden: { y: 20, opacity: 0 },
    show: { 
      y: 0, 
      opacity: 1,
      transition: {
        duration: 0.4,
        ease: "easeOut"
      }
    },
    exit: {
      y: -20,
      opacity: 0,
      transition: {
        duration: 0.3
      }
    }
  };

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
        isScrolled ? 'py-4 bg-background/80 backdrop-blur-md border-b border-white/5' : 'py-8 bg-transparent'
      }`}
    >
      <div className="container mx-auto px-6 md:px-12 flex items-center justify-between">
        
        {/* Updated Logo - Higher Z-index to stay above mobile menu */}
        <div 
          className="z-[60] cursor-pointer group select-none relative" 
          onClick={() => handleLinkClick('#hero')}
        >
          <div className="font-serif text-2xl md:text-3xl tracking-tight flex items-center">
            <span className="font-extrabold text-white tracking-tight">KHIEM</span>
            <span className="font-light text-secondary group-hover:text-white transition-colors duration-500">NGUYEN</span>
          </div>
        </div>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center space-x-8 lg:space-x-12">
          {navItems.map((item) => (
            <button
              key={item.label}
              onClick={() => handleLinkClick(item.href)}
              className="text-sm font-medium uppercase tracking-widest text-secondary hover:text-white transition-colors duration-300 relative group overflow-hidden"
            >
              <span className="relative z-10">{item.label}</span>
              <span className="absolute bottom-0 left-0 w-full h-[1px] bg-white transform scale-x-0 origin-right transition-transform duration-300 group-hover:scale-x-100 group-hover:origin-left"></span>
            </button>
          ))}
          
          <div className="w-[1px] h-5 bg-white/10 mx-2"></div>

          <div className="flex items-center space-x-6">
            <a 
              href="https://www.linkedin.com/in/kylekhiemnguyen/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-secondary hover:text-white transition-colors duration-300"
              aria-label="LinkedIn"
            >
              <Linkedin size={20} strokeWidth={1.5} />
            </a>
            <a 
              href="https://www.instagram.com/narcissistic_uncle" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-secondary hover:text-white transition-colors duration-300"
              aria-label="Instagram"
            >
              <Instagram size={20} strokeWidth={1.5} />
            </a>
          </div>
        </nav>

        {/* Mobile Toggle Button - Animated and High Z-Index */}
        <button 
          className="md:hidden relative z-[60] text-white hover:text-secondary transition-colors w-10 h-10 flex items-center justify-center focus:outline-none"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label="Toggle menu"
        >
          <AnimatePresence mode="wait">
            {isMobileMenuOpen ? (
              <motion.div
                key="close"
                initial={{ rotate: -90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: 90, opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                <X size={24} />
              </motion.div>
            ) : (
              <motion.div
                key="menu"
                initial={{ rotate: 90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: -90, opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                <Menu size={24} />
              </motion.div>
            )}
          </AnimatePresence>
        </button>

        {/* Mobile Menu Overlay */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              variants={menuVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              className="fixed inset-0 bg-background z-50 flex flex-col items-center justify-center md:hidden"
            >
              <motion.nav 
                className="flex flex-col items-center space-y-8"
                variants={containerVariants}
                initial="hidden"
                animate="show"
                exit="exit"
              >
                {navItems.map((item) => (
                  <motion.button
                    key={item.label}
                    variants={itemVariants}
                    onClick={() => handleLinkClick(item.href)}
                    className="font-serif text-5xl text-white/90 hover:text-white transition-colors duration-300 font-bold tracking-tight"
                  >
                    {item.label}
                  </motion.button>
                ))}
                
                <motion.div 
                  variants={itemVariants}
                  className="flex items-center space-x-8 mt-8 pt-8 border-t border-white/10 w-40 justify-center"
                >
                  <a 
                    href="https://www.linkedin.com/in/kylekhiemnguyen/" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-white/50 hover:text-white transition-colors duration-300"
                  >
                    <Linkedin size={32} strokeWidth={1.5} />
                  </a>
                  <a 
                    href="https://www.instagram.com/narcissistic_uncle" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-white/50 hover:text-white transition-colors duration-300"
                  >
                    <Instagram size={32} strokeWidth={1.5} />
                  </a>
                </motion.div>
              </motion.nav>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
};

export default Navbar;