import React, { useState, useEffect } from 'react';
import { ArrowDown, Sparkles, Type, Minimize2, Lightbulb } from 'lucide-react';
import Button from './Button';
import { PERSONAL_INFO } from '../constants';

const Hero: React.FC = () => {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth) * 2 - 1;
      const y = (e.clientY / window.innerHeight) * 2 - 1;
      setMousePos({ x, y });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const handleDownloadResume = () => {
    window.print();
  };

  const scrollToWork = () => {
    const workSection = document.getElementById('work');
    if (workSection) {
      workSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // 3 Design Pillars with updated descriptions and styling
  const pillars = [
    { 
      label: "Type-Led", 
      icon: <Type size={18} />, 
      desc: "Expressive letterforms",
      color: "text-lavender",
      bg: "bg-lavender/10 dark:bg-lavender/20"
    },
    { 
      label: "Minimal", 
      icon: <Minimize2 size={18} />, 
      desc: "Essential clarity",
      color: "text-coral",
      bg: "bg-coral/10 dark:bg-coral/20"
    },
    { 
      label: "Research-Driven", 
      icon: <Lightbulb size={18} />, 
      desc: "Inquiry before form",
      color: "text-sky-400",
      bg: "bg-sky-400/10 dark:bg-sky-400/20"
    }
  ];

  return (
    <section id="hero" className="min-h-screen flex items-center pt-24 pb-12 relative overflow-hidden bg-cream dark:bg-stone-950 transition-colors duration-300">
      
      {/* Parallax Background Blobs */}
      <div 
        className="absolute top-0 -left-20 w-[600px] h-[600px] bg-coral/20 dark:bg-coral/10 rounded-full mix-blend-multiply dark:mix-blend-screen filter blur-[100px] opacity-60 animate-blob transition-transform duration-100 ease-out"
        style={{ transform: `translate(${mousePos.x * -20}px, ${mousePos.y * -20}px)` }}
      ></div>
      <div 
        className="absolute top-1/4 -right-20 w-[500px] h-[500px] bg-lavender/30 dark:bg-lavender/10 rounded-full mix-blend-multiply dark:mix-blend-screen filter blur-[100px] opacity-60 animate-blob animation-delay-2000 transition-transform duration-100 ease-out"
        style={{ transform: `translate(${mousePos.x * 30}px, ${mousePos.y * 30}px)` }}
      ></div>
      <div 
        className="absolute -bottom-32 left-1/3 w-[600px] h-[600px] bg-coral/10 dark:bg-lavender/10 rounded-full mix-blend-multiply dark:mix-blend-screen filter blur-[100px] opacity-60 animate-blob animation-delay-4000 transition-transform duration-100 ease-out"
        style={{ transform: `translate(${mousePos.x * -10}px, ${mousePos.y * -10}px)` }}
      ></div>

      <div className="container mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-12 relative z-10 items-center">
        
        {/* Main Text Content */}
        <div className="lg:col-span-8 lg:col-start-1 flex flex-col justify-center text-left">
          
          {/* Eyebrow */}
          <div className="animate-fadeIn opacity-0 flex items-center gap-2.5 mb-6" style={{ animationDelay: '0.1s' }}>
            <span className="flex items-center justify-center w-8 h-8 rounded-full bg-lavender/20 dark:bg-lavender/10 text-lavender shadow-sm animate-bounce">
              <Sparkles size={14} className="text-lavender" />
            </span>
            <span className="text-sm font-subheading font-medium tracking-widest uppercase text-lavender">
              Communication Design & UI/UX
            </span>
          </div>
          
          <h1 className="animate-fadeIn opacity-0 font-heading font-normal text-charcoal dark:text-cream mb-6 tracking-tight leading-[1.15] overflow-visible" style={{ animationDelay: '0.2s' }}>
            <span className="block text-2xl sm:text-3xl md:text-4xl font-normal text-charcoal/80 dark:text-cream/80 mb-2">Hello, I'm</span>
            <span 
              className="inline-block whitespace-nowrap pt-1 pb-3 pr-4 sm:pr-6 overflow-visible font-normal !font-normal bg-clip-text text-transparent bg-gradient-to-r from-coral via-pink-500 to-lavender animate-gradient transition-all duration-300 text-[2.65rem] sm:text-6xl md:text-7xl lg:text-[5.25rem] xl:text-[6rem] leading-none"
              style={{ 
                fontFamily: 'var(--font-hero-name)',
                fontWeight: 400,
                backgroundSize: '200%', 
                animationDuration: '3s'
              }}
            >
              {PERSONAL_INFO.name}
            </span>
          </h1>
          
          <p className="animate-fadeIn opacity-0 text-xl sm:text-2xl md:text-3xl font-subheading text-neutral-gray dark:text-stone-300 mb-8 max-w-2xl font-normal tracking-wide" style={{ animationDelay: '0.3s' }}>
            {PERSONAL_INFO.title}
          </p>

          {/* REDESIGNED PILLARS LAYOUT (Connected Architectural Segment Dock) */}
          <div className="animate-fadeIn opacity-0 mb-10" style={{ animationDelay: '0.4s' }}>
            <div className="inline-flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4 p-2.5 rounded-2xl bg-white/75 dark:bg-stone-900/75 backdrop-blur-md border border-stone-200/80 dark:border-stone-800 shadow-md shadow-stone-200/40 dark:shadow-none">
              {pillars.map((pillar, idx) => (
                <React.Fragment key={idx}>
                  <div className="flex items-center gap-3 px-3.5 py-2 rounded-xl hover:bg-stone-100/70 dark:hover:bg-stone-800/70 transition-all duration-200 group cursor-default">
                    <div className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 ${pillar.bg} ${pillar.color} group-hover:scale-110 transition-transform shadow-xs`}>
                      {pillar.icon}
                    </div>
                    <div className="flex flex-col">
                      <span className="text-sm font-subheading font-medium text-charcoal dark:text-white leading-tight">
                        {pillar.label}
                      </span>
                      <span className="text-[13px] text-stone-500 dark:text-stone-400 font-normal leading-tight">
                        {pillar.desc}
                      </span>
                    </div>
                  </div>

                  {/* Divider line between segments on desktop */}
                  {idx < pillars.length - 1 && (
                    <div className="h-7 w-px bg-stone-200 dark:bg-stone-800 hidden sm:block"></div>
                  )}
                </React.Fragment>
              ))}
            </div>
          </div>
          
          {/* Action Buttons */}
          <div className="animate-fadeIn opacity-0 flex flex-wrap gap-4" style={{ animationDelay: '0.5s' }}>
            <Button onClick={scrollToWork} size="lg" className="rounded-full px-10 shadow-xl shadow-coral/30 dark:shadow-coral/20 hover:shadow-coral/40 hover:-translate-y-1">
              View Work
            </Button>
            <Button onClick={handleDownloadResume} variant="outline" size="lg" className="rounded-full px-10">
              Download Resume
            </Button>
          </div>
        </div>

        {/* Decorative Graphic Side */}
        <div className="lg:col-span-4 hidden lg:flex justify-center items-center relative animate-fadeIn opacity-0" style={{ animationDelay: '0.6s' }}>
          <div className="relative w-full aspect-square animate-float">
            <div className="absolute inset-0 bg-gradient-to-tr from-lavender/40 to-coral/40 dark:from-lavender/20 dark:to-coral/20 rounded-full animate-morph opacity-80 blur-xl"></div>
            <div className="absolute inset-0 bg-white/30 dark:bg-white/5 backdrop-blur-sm rounded-full animate-morph border border-white/50 dark:border-white/10"></div>
            
            {/* Status Badge */}
            <div 
              className="absolute bottom-10 -left-4 bg-white dark:bg-stone-800 p-5 rounded-3xl shadow-2xl animate-bounce transition-transform duration-100" 
              style={{ animationDuration: '4s', transform: `translate(${mousePos.x * 10}px, ${mousePos.y * 10}px)` }}
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-coral/20 dark:bg-coral/10 flex items-center justify-center text-coral text-xl font-normal">
                  👋
                </div>
                <div>
                  <p className="text-[13px] font-subheading font-normal uppercase text-neutral-gray tracking-wider">Status</p>
                  <p className="text-base font-subheading font-medium text-charcoal dark:text-white">Available for Opportunities</p>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>

      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce text-neutral-gray dark:text-stone-500 cursor-pointer hover:text-coral transition-colors" onClick={scrollToWork}>
        <ArrowDown size={24} />
      </div>

      <style>{`
        @keyframes gradient {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        @keyframes morph {
          0% { border-radius: 60% 40% 30% 70% / 60% 30% 70% 40%; }
          50% { border-radius: 30% 60% 70% 40% / 50% 60% 30% 60%; }
          100% { border-radius: 60% 40% 30% 70% / 60% 30% 70% 40%; }
        }
        .animate-gradient {
          animation: gradient 8s ease infinite;
        }
        .animate-morph {
          animation: morph 8s ease-in-out infinite;
        }
      `}</style>
    </section>
  );
};

export default Hero;