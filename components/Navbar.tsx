import React, { useState, useEffect } from 'react';
import { Menu, X, ArrowUpRight } from 'lucide-react';

const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 16);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const targetId = href.replace('#', '');
    const element = document.getElementById(targetId);

    if (element) {
      const headerOffset = 88;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.scrollY - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });
      setMobileMenuOpen(false);
    }
  };

  const navLinks = [
    { name: 'Work', href: '#work' },
    { name: 'About', href: '#about' },
    { name: 'Capabilities', href: '#skills' },
    { name: 'Resume', href: '#resume' },
  ];

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? 'bg-[#FAF8F6]/90 dark:bg-stone-950/90 backdrop-blur-md border-b border-stone-200/80 dark:border-stone-800/80 py-3.5'
            : 'bg-transparent py-5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between gap-8">
          {/* Zone 1: Brand Wordmark */}
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: 'smooth' });
              setMobileMenuOpen(false);
            }}
            className="font-editorial text-xl tracking-tight text-charcoal dark:text-cream whitespace-nowrap shrink-0 hover:opacity-80 transition-opacity"
          >
            Anushka Saraf<span className="text-coral">.</span>
          </a>

          {/* Zone 2: Clean Single-Line Navigation Links */}
          <nav aria-label="Primary navigation" className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className="relative font-clean text-sm font-medium text-stone-600 hover:text-charcoal dark:text-stone-400 dark:hover:text-white transition-colors whitespace-nowrap shrink-0 py-1 after:content-[''] after:absolute after:left-0 after:right-0 after:bottom-0 after:h-px after:bg-coral after:scale-x-0 hover:after:scale-x-100 after:transition-transform after:origin-left"
              >
                {link.name}
              </a>
            ))}
          </nav>

          {/* Zone 3: Single Primary Action + Mobile Drawer Trigger */}
          <div className="flex items-center gap-3 shrink-0">
            <a
              href="#contact"
              onClick={(e) => handleNavClick(e, '#contact')}
              className="hidden md:inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-charcoal text-cream dark:bg-cream dark:text-stone-950 font-clean text-xs font-medium tracking-wide hover:bg-coral dark:hover:bg-coral dark:hover:text-white transition-colors whitespace-nowrap shrink-0"
            >
              <span>Get in Touch</span>
              <ArrowUpRight size={14} />
            </a>

            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-lg text-charcoal dark:text-cream border border-stone-200 dark:border-stone-800 bg-white/80 dark:bg-stone-900/80"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Navigation Drawer */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 bg-[#FAF8F6]/98 dark:bg-stone-950/98 backdrop-blur-xl z-40 flex flex-col justify-between px-6 pt-28 pb-12 md:hidden animate-fadeIn">
          <div className="flex flex-col space-y-6">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className="text-3xl font-editorial font-normal tracking-tight text-charcoal dark:text-cream hover:text-coral dark:hover:text-coral transition-colors border-b border-stone-200/70 dark:border-stone-800/70 pb-4"
              >
                {link.name}
              </a>
            ))}
            <a
              href="#contact"
              onClick={(e) => handleNavClick(e, '#contact')}
              className="text-3xl font-editorial italic text-coral tracking-tight pt-2"
            >
              Get in Touch →
            </a>
          </div>

          <p className="font-mono text-xs uppercase tracking-widest text-stone-500">
            Communication Design · Systems · Typography
          </p>
        </div>
      )}
    </>
  );
};

export default Navbar;