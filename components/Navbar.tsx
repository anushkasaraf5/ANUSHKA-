import React, { useState, useEffect } from 'react';
import { Menu, X, Sun, Moon } from 'lucide-react';
import { useTheme } from './ThemeContext';

const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const targetId = href.replace('#', '');
    const element = document.getElementById(targetId);
    
    if (element) {
      const headerOffset = 100;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.scrollY - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
      setMobileMenuOpen(false);
    }
  };

  const navLinks = [
    { name: 'About', href: '#about' },
    { name: 'Skills', href: '#skills' },
    { name: 'Work', href: '#work' },
    { name: 'Resume', href: '#resume' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <>
      <nav 
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 flex justify-center ${
          isScrolled ? 'pt-4' : 'pt-6'
        }`}
      >
        <div 
          className={`
            relative px-6 py-3 rounded-full flex items-center justify-between
            transition-all duration-300
            ${isScrolled 
              ? 'w-[90%] md:w-[70%] lg:w-[60%] bg-white/80 dark:bg-stone-900/80 backdrop-blur-md shadow-lg border border-white/20 dark:border-stone-800' 
              : 'w-full container bg-transparent'
            }
          `}
        >
          <a 
            href="#" 
            onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
            className={`text-lg font-heading font-normal tracking-tight uppercase z-50 relative transition-colors ${
              isScrolled ? 'text-charcoal dark:text-cream' : 'text-charcoal dark:text-cream'
            }`}
          >
            AS<span className="text-coral">.</span>
          </a>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-1">
            {navLinks.map((link) => (
              <a 
                key={link.name} 
                href={link.href} 
                onClick={(e) => handleNavClick(e, link.href)}
                className="px-4 py-2 rounded-full font-subheading text-sm font-medium transition-colors text-neutral-gray hover:text-coral hover:bg-cream dark:text-stone-300 dark:hover:text-coral dark:hover:bg-stone-800"
              >
                {link.name}
              </a>
            ))}
            
            <div className="h-4 w-px bg-stone-300 dark:bg-stone-700 mx-2"></div>

            <button 
              onClick={toggleTheme}
              className="ml-1 p-2 rounded-full text-neutral-gray hover:text-coral hover:bg-cream dark:text-stone-300 dark:hover:text-coral dark:hover:bg-stone-800 transition-colors"
              aria-label="Toggle theme"
            >
              {theme === 'light' ? <Moon size={18} /> : <Sun size={18} />}
            </button>
          </div>

          {/* Mobile Toggle */}
          <div className="flex items-center gap-2 md:hidden z-50">
            <button 
              onClick={toggleTheme}
              className="p-2 rounded-full text-charcoal dark:text-cream bg-cream dark:bg-stone-800"
            >
              {theme === 'light' ? <Moon size={18} /> : <Sun size={18} />}
            </button>
            
            <button 
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-full text-charcoal dark:text-cream bg-cream dark:bg-stone-800"
            >
              {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 bg-cream/95 dark:bg-stone-950/95 backdrop-blur-xl z-40 flex flex-col items-center justify-center space-y-6 md:hidden animate-fadeIn">
          {navLinks.map((link) => (
            <a 
              key={link.name} 
              href={link.href} 
              onClick={(e) => handleNavClick(e, link.href)}
              className="text-3xl font-heading font-normal tracking-tight text-charcoal dark:text-cream hover:text-coral dark:hover:text-coral transition-colors"
            >
              {link.name}
            </a>
          ))}
        </div>
      )}
    </>
  );
};

export default Navbar;