import React, { useState, useEffect } from 'react';

const ScrollProgress: React.FC = () => {
  const [activeSection, setActiveSection] = useState(1);
  const [progressHeight, setProgressHeight] = useState(0);

  const sections = ['hero', 'about', 'skills', 'work', 'resume', 'contact'];
  const totalSections = sections.length;

  useEffect(() => {
    const handleScroll = () => {
      // Calculate total scroll progress
      const totalScroll = document.documentElement.scrollTop;
      const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const scroll = `${totalScroll / windowHeight}`;
      setProgressHeight(Number(scroll));

      // Determine active section
      let current = 1;
      
      // Iterate through sections to find the last one that has passed the threshold
      sections.forEach((sectionId, index) => {
        const element = document.getElementById(sectionId);
        if (element) {
          const rect = element.getBoundingClientRect();
          // If the top of the section is above 50% of the viewport height, 
          // it is considered the current (or passed) section.
          // By iterating through all, 'current' will end up being the last valid section.
          if (rect.top <= window.innerHeight * 0.5) {
            current = index + 1;
          }
        }
      });
      setActiveSection(current);
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial check
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="fixed right-6 bottom-8 z-40 hidden md:flex flex-col items-end gap-2 mix-blend-difference text-white">
      {/* Number Indicator */}
      <div className="font-subheading text-[13px] font-medium tracking-widest mb-1">
        <span className="text-xl">{String(activeSection).padStart(2, '0')}</span>
        <span className="opacity-50 mx-2">/</span>
        <span className="opacity-50">{String(totalSections).padStart(2, '0')}</span>
      </div>

      {/* Progress Bar */}
      <div className="w-32 h-1 bg-white/20 rounded-full overflow-hidden">
        <div 
          className="h-full bg-white transition-all duration-150 ease-out"
          style={{ width: `${progressHeight * 100}%` }}
        ></div>
      </div>
      
      {/* Label */}
      <div className="font-subheading text-[13px] uppercase tracking-widest opacity-60 mt-1">
         {sections[activeSection - 1] || 'Home'}
      </div>
    </div>
  );
};

export default ScrollProgress;