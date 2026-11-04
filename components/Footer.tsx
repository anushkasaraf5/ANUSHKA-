import React from 'react';
import { Sun, Moon } from 'lucide-react';
import { PERSONAL_INFO } from '../constants';
import { useTheme } from './ThemeContext';

const Footer: React.FC = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <footer className="bg-stone-950 text-cream py-16 border-t border-stone-800">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-10 border-b border-stone-800/90 pb-10 mb-8">
          <div>
            <h2 className="text-3xl font-editorial font-normal tracking-tight mb-2 text-white">
              Anushka Saraf<span className="text-coral">.</span>
            </h2>
            <p className="text-stone-400 font-clean text-sm max-w-md leading-relaxed">
              Communication Design · Systems Thinking, Interactive UX &amp; Typography. Based in
              India.
            </p>
          </div>

          <div className="flex flex-col md:items-end gap-3">
            <a
              href={`mailto:${PERSONAL_INFO.email}`}
              className="text-lg md:text-xl font-clean font-medium text-white hover:text-coral transition-colors"
            >
              {PERSONAL_INFO.email}
            </a>
            <button
              type="button"
              onClick={toggleTheme}
              className="inline-flex items-center gap-2 font-mono text-xs text-stone-400 hover:text-white transition-colors cursor-pointer"
            >
              {theme === 'light' ? <Moon size={13} /> : <Sun size={13} />}
              <span>Switch to {theme === 'light' ? 'Dark' : 'Warm Paper'} Theme</span>
            </button>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-stone-500 font-clean">
          <p>© {new Date().getFullYear()} Anushka Saraf. All rights reserved.</p>
          <div className="flex items-center gap-6 font-mono uppercase tracking-widest text-[11px]">
            <a href="#" className="hover:text-white transition-colors">
              Top
            </a>
            <a href="#work" className="hover:text-white transition-colors">
              Work
            </a>
            <a href="#about" className="hover:text-white transition-colors">
              About
            </a>
            <a href="#resume" className="hover:text-white transition-colors">
              Resume
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;