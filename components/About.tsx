import React, { useState } from 'react';
import { Sparkles, Star, ChevronDown, ChevronUp } from 'lucide-react';

const About: React.FC = () => {
  const profileImage = "https://i.ibb.co/fVGJfzzh/Port.png";

  // Interactive curiosity sparks state
  const [activePrompt, setActivePrompt] = useState<number | null>(null);

  const curiosityPrompts = [
    {
      label: "Overthinking → Strategy",
      content: "I treat overthinking not as friction, but as a radar for overlooked angles, edge cases, and human nuances that elevate good design into unforgettable design."
    },
    {
      label: "Design × AI Synergy",
      content: "AI exponentially expands the perimeter of exploratory possibilities; human intuition, taste, and empathy decide what actually matters."
    },
    {
      label: "Street Vernacular",
      content: "From painted shutters to handwritten signs, observing everyday typography in public spaces fuels my creative problem-solving."
    }
  ];

  return (
    <section id="about" className="py-16 md:py-20 bg-cream dark:bg-stone-950 transition-colors duration-300 relative overflow-hidden">
      
      {/* Background Soft Glows (Subtle, scaled down) */}
      <div className="absolute top-10 right-10 w-[350px] h-[350px] bg-coral/10 dark:bg-coral/5 rounded-full blur-[100px] pointer-events-none opacity-50"></div>
      <div className="absolute bottom-5 left-10 w-[300px] h-[300px] bg-lavender/15 dark:bg-lavender/5 rounded-full blur-[100px] pointer-events-none opacity-50"></div>

      <div className="container mx-auto px-4 sm:px-6 relative z-10 max-w-4xl">
        
        {/* Compact Section Header */}
        <div className="mb-10 text-center max-w-xl mx-auto">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-coral/10 dark:bg-coral/20 border border-coral/20 dark:border-coral/30 text-coral text-[13px] font-medium tracking-widest uppercase mb-2.5">
            <Sparkles size={13} />
            <span>Studio Journal & Identity</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-heading font-normal text-charcoal dark:text-white tracking-tight">
            Curiosity in <span className="italic text-coral font-heading">Motion.</span>
          </h2>
        </div>

        {/* COMPACT SCRAPBOOK COLLAGE (Clean, scaled-down side-by-side) */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 sm:gap-8 items-center">
          
          {/* LEFT: COMPACT POLAROID / CUTOUT PHOTO (4 COLS) */}
          <div className="md:col-span-4 flex justify-center">
            <div className="relative group w-full max-w-[240px] sm:max-w-[260px]">
              
              {/* Washi Tape Accent at Top */}
              <div className="absolute -top-2.5 left-1/2 -translate-x-1/2 w-20 h-5 bg-coral/35 dark:bg-coral/45 backdrop-blur-xs border-y border-dashed border-white/60 -rotate-3 z-30 pointer-events-none shadow-xs"></div>

              {/* Photo Frame Container */}
              <div className="p-2.5 bg-white dark:bg-stone-900 rounded-2xl border border-stone-200 dark:border-stone-800 shadow-xl shadow-stone-200/50 dark:shadow-black/60 -rotate-2 group-hover:rotate-0 transition-transform duration-300 relative">
                
                {/* Floating Typographic Stickers */}
                <div className="absolute -top-2 -right-2 z-30 select-none text-coral text-base animate-pulse">
                  ✨
                </div>

                <div className="absolute top-5 -left-2 z-30 bg-charcoal text-white dark:bg-white dark:text-black font-heading font-normal text-[13px] px-2 py-0.5 rounded shadow-sm rotate-[-8deg] select-none">
                  Aa.
                </div>

                <div className="absolute bottom-10 -right-2 z-30 bg-sky-500 text-white font-heading font-normal text-[13px] px-2 py-0.5 rounded shadow-sm rotate-[6deg] select-none">
                  Ee.
                </div>

                {/* Profile Image with subtle corner rounding */}
                <div className="overflow-hidden rounded-xl bg-stone-100 dark:bg-stone-800 relative aspect-[4/5] flex items-center justify-center">
                  <img 
                    src={profileImage} 
                    alt="Anushka Saraf" 
                    className="w-full h-full object-cover object-top hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none"></div>

                  <div className="absolute bottom-2 left-2 right-2 flex items-center justify-between text-white text-[13px] z-20">
                    <span className="bg-black/60 backdrop-blur-md px-2.5 py-1 rounded-full border border-white/20 font-normal">
                      In the Studio
                    </span>
                    <span className="font-mono bg-black/60 backdrop-blur-md px-2 py-1 rounded-full border border-white/20 text-[13px]">
                      @anushkasaraf
                    </span>
                  </div>
                </div>

              </div>

            </div>
          </div>

          {/* RIGHT: COMPACT EDITORIAL JOURNAL CARD (8 COLS) */}
          <div className="md:col-span-8">
            <div className="p-6 sm:p-7 bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-3xl shadow-lg shadow-stone-200/40 dark:shadow-black/50 relative">
              
              {/* Corner Washi Tape Accent */}
              <div className="absolute -top-2.5 right-8 w-16 h-4.5 bg-lavender/30 dark:bg-lavender/40 border-x border-dashed border-white/50 rotate-3 pointer-events-none"></div>

              {/* Journal Entry Header */}
              <div className="flex items-center justify-between pb-3 mb-4 border-b border-stone-100 dark:border-stone-800 text-[13px]">
                <span className="font-mono font-medium text-coral uppercase tracking-wider">
                  STUDIO LOG • VOL. 01
                </span>
                <span className="font-mono text-stone-400">
                  Creative Approach
                </span>
              </div>

              {/* Headline */}
              <h3 className="text-xl sm:text-2xl font-heading font-normal text-charcoal dark:text-white tracking-tight mb-4 leading-snug">
                "Curiosity is where my approach to design begins."
              </h3>

              {/* Body Text with Interactive Highlighters - Strictly text-base (16px), unbolded font-normal */}
              <div className="space-y-3.5 text-stone-700 dark:text-stone-300 font-body text-base font-normal leading-relaxed">
                <p>
                  Somewhere between{' '}
                  <span className="bg-coral/15 dark:bg-coral/25 text-coral dark:text-coral font-medium px-1.5 py-0.5 rounded cursor-help transition-all hover:bg-coral/30" title="Digging deep into every creative problem">
                    overthinking an idea
                  </span>{' '}
                  and wondering why things are the way they are, I find the beginnings of something worth creating.
                </p>

                <p>
                  I'm drawn to{' '}
                  <span className="bg-lavender/20 dark:bg-lavender/30 text-lavender font-medium px-1.5 py-0.5 rounded cursor-help transition-all hover:bg-lavender/40" title="Connecting disparate inspirations">
                    unexpected connections
                  </span>
                  ,{' '}
                  <span className="bg-amber-400/20 dark:bg-amber-400/30 text-amber-600 dark:text-amber-400 font-medium px-1.5 py-0.5 rounded cursor-help transition-all hover:bg-amber-400/40" title="Subtle gestures in typography & space">
                    overlooked details
                  </span>
                  , and possibilities that aren't immediately obvious.
                </p>

                <p>
                  Design gives me a way to bring those thoughts to life, while{' '}
                  <span className="bg-sky-400/20 dark:bg-sky-400/30 text-sky-600 dark:text-sky-400 font-medium px-1.5 py-0.5 rounded cursor-help transition-all hover:bg-sky-400/40" title="Expanding the boundary of imagination">
                    AI lets me push them further
                  </span>{' '}
                  and explore where they might lead.
                </p>
              </div>

              {/* Closing Handwriting Signature */}
              <div className="mt-6 pt-4 border-t border-stone-100 dark:border-stone-800 flex items-center justify-between">
                <p className="font-handwriting text-xl sm:text-2xl text-coral dark:text-coral font-normal">
                  "I'm here to keep learning, keep creating, and keep asking, 'What if?'"
                </p>
                <Star size={14} className="text-amber-400 fill-amber-400 shrink-0 ml-2" />
              </div>

              {/* Interactive "Curiosity Sparks" Pills (Compact & Expandable) */}
              <div className="mt-5 pt-4 border-t border-stone-100 dark:border-stone-800/80">
                <span className="block text-[13px] font-mono uppercase tracking-wider text-stone-400 mb-2.5">
                  Interactive Sparks:
                </span>
                
                <div className="flex flex-wrap gap-2">
                  {curiosityPrompts.map((prompt, pIdx) => {
                    const isOpen = activePrompt === pIdx;

                    return (
                      <button
                        key={pIdx}
                        onClick={() => setActivePrompt(isOpen ? null : pIdx)}
                        className={`px-3.5 py-1.5 rounded-xl text-[13px] font-medium transition-all duration-200 border cursor-pointer flex items-center gap-1.5 ${
                          isOpen
                            ? 'bg-charcoal text-white border-charcoal dark:bg-white dark:text-stone-900 dark:border-white shadow-xs'
                            : 'bg-stone-50 dark:bg-stone-800/80 text-stone-600 dark:text-stone-300 border-stone-200/80 dark:border-stone-700/80 hover:border-coral dark:hover:border-coral'
                        }`}
                      >
                        <span>{prompt.label}</span>
                        {isOpen ? <ChevronUp size={13} /> : <ChevronDown size={13} className="opacity-60" />}
                      </button>
                    );
                  })}
                </div>

                {activePrompt !== null && (
                  <div className="mt-3 p-3.5 rounded-xl bg-stone-50 dark:bg-stone-800/60 border border-stone-200/70 dark:border-stone-700/60 text-sm font-body font-normal text-stone-600 dark:text-stone-300 leading-relaxed animate-fadeIn">
                    {curiosityPrompts[activePrompt].content}
                  </div>
                )}
              </div>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
};

export default About;