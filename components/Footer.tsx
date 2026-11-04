import React, { useState } from 'react';
import { PERSONAL_INFO } from '../constants';

const Footer: React.FC = () => {
  return (
    <footer className="bg-charcoal dark:bg-black text-cream py-16 transition-colors duration-300">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-10 border-b border-stone-800 pb-10 mb-10">
           <div>
              <h2 className="text-3xl font-heading font-normal tracking-tighter mb-2">Anushka Saraf.</h2>
              <p className="text-stone-400 font-body font-normal text-sm sm:text-base max-w-sm">
                 Communication Designer based in India. <br/>
                 Creating thoughtful visual experiences.
              </p>
           </div>
           
           <div className="flex flex-col md:items-end">
              <a href={`mailto:${PERSONAL_INFO.email}`} className="text-xl md:text-2xl font-subheading font-medium hover:text-coral transition-colors">
                 {PERSONAL_INFO.email}
              </a>
           </div>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-center text-sm text-stone-500 font-body font-normal">
          <p>© {new Date().getFullYear()} Anushka Saraf. All rights reserved.</p>
          <div className="flex space-x-8 mt-4 md:mt-0 font-subheading uppercase tracking-widest text-[13px]">
            <a href="#" className="hover:text-white transition-colors">Home</a>
            <a href="#work" className="hover:text-white transition-colors">Work</a>
            <a href="#about" className="hover:text-white transition-colors">About</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;