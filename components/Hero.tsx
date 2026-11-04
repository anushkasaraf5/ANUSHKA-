import React from 'react';
import { ArrowRight, ArrowUpRight, Printer, Sun, Moon } from 'lucide-react';
import { PERSONAL_INFO } from '../constants';
import { useTheme } from './ThemeContext';

const heroStudioImg = new URL(
  '../src/assets/images/hero_typography_studio_1793744719186.jpg',
  import.meta.url
).href;

const Hero: React.FC = () => {
  const { theme, toggleTheme } = useTheme();

  const openSystemsCaseStudy = () => {
    window.dispatchEvent(new CustomEvent('open-project', { detail: '3' }));
  };

  const scrollToWork = () => {
    const workSection = document.getElementById('work');
    if (workSection) {
      const offset = workSection.getBoundingClientRect().top + window.scrollY - 84;
      window.scrollTo({ top: offset, behavior: 'smooth' });
    }
  };

  const handlePrintResume = () => {
    window.print();
  };

  const focusAreas = [
    {
      index: '01',
      title: 'Systems & Service UX',
      detail: 'Ecosystem mapping, multi-actor flows & institutional tools',
    },
    {
      index: '02',
      title: 'Expressive Typography',
      detail: 'Biomimetic display specimens & Indian street vernacular',
    },
    {
      index: '03',
      title: 'Empirical Design Inquiry',
      detail: 'Quantitative & qualitative research before visual form',
    },
  ];

  return (
    <section
      id="hero"
      className="min-h-[92vh] pt-28 pb-16 md:pt-32 md:pb-24 bg-[#FAF8F6] dark:bg-stone-950 transition-colors duration-300 border-b border-stone-200/80 dark:border-stone-800/80 flex items-center"
    >
      <div className="max-w-7xl mx-auto px-6 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-stretch">
          {/* Left Column: Editorial Typography & Controls */}
          <div className="lg:col-span-7 flex flex-col justify-between">
            <div>
              {/* Kicker + Quiet Reading Theme Switch */}
              <div className="flex flex-wrap items-center justify-between gap-4 pb-6 mb-8 border-b border-stone-200/90 dark:border-stone-800">
                <div className="flex flex-wrap items-center gap-2.5 font-mono text-xs uppercase tracking-widest text-stone-500 dark:text-stone-400">
                  <span className="text-coral font-medium">Communication Design</span>
                  <span aria-hidden="true">·</span>
                  <span>Systems Thinking</span>
                  <span aria-hidden="true">·</span>
                  <span>Typography</span>
                </div>

                <button
                  type="button"
                  onClick={toggleTheme}
                  className="inline-flex items-center gap-1.5 font-mono text-xs text-stone-500 hover:text-charcoal dark:text-stone-400 dark:hover:text-white transition-colors whitespace-nowrap shrink-0 cursor-pointer"
                  aria-label="Switch reading palette"
                >
                  {theme === 'light' ? <Moon size={13} /> : <Sun size={13} />}
                  <span>{theme === 'light' ? 'Dark Mode' : 'Warm Paper'}</span>
                </button>
              </div>

              {/* Editorial Display Headline */}
              <p className="font-clean text-sm font-medium text-stone-500 dark:text-stone-400 mb-3">
                {PERSONAL_INFO.name} — Portfolio &amp; Research Archive
              </p>

              <h1 className="font-editorial font-normal text-charcoal dark:text-cream text-4xl sm:text-5xl md:text-[3.5rem] lg:text-[3.85rem] leading-[1.06] tracking-tight mb-6 max-w-[18ch]">
                Translating complex human systems into{' '}
                <span className="italic text-coral">calm, tactile</span> visual clarity.
              </h1>

              <p className="font-clean text-base sm:text-lg text-stone-600 dark:text-stone-300 leading-relaxed max-w-[58ch] mb-9">
                Communication Design undergraduate at UID, Karnavati University — bridging
                multi-stakeholder systems architecture, interactive UX flows, and typographic craft
                grounded in field inquiry.
              </p>

              {/* Action Row */}
              <div className="flex flex-wrap items-center gap-4 mb-12">
                <button
                  type="button"
                  onClick={openSystemsCaseStudy}
                  className="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-full bg-coral text-white font-clean text-sm font-medium shadow-sm hover:bg-[#d14620] transition-colors whitespace-nowrap shrink-0 cursor-pointer"
                >
                  <span>Read Event System Case Study</span>
                  <ArrowRight size={16} />
                </button>

                <button
                  type="button"
                  onClick={scrollToWork}
                  className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full border border-stone-300 dark:border-stone-700 bg-white dark:bg-stone-900 text-charcoal dark:text-cream font-clean text-sm font-medium hover:border-charcoal dark:hover:border-stone-400 transition-colors whitespace-nowrap shrink-0 cursor-pointer"
                >
                  <span>Browse All Works</span>
                </button>

                <button
                  type="button"
                  onClick={handlePrintResume}
                  className="inline-flex items-center gap-1.5 px-3 py-2 font-clean text-sm font-medium text-stone-500 hover:text-coral dark:text-stone-400 dark:hover:text-coral transition-colors whitespace-nowrap shrink-0 cursor-pointer"
                >
                  <Printer size={15} />
                  <span>Print CV</span>
                </button>
              </div>
            </div>

            {/* Bottom Architectural Practice Pillars (Zero-Pill Unboxed Metadata) */}
            <div className="pt-7 border-t border-stone-200/90 dark:border-stone-800 grid grid-cols-1 sm:grid-cols-3 gap-6">
              {focusAreas.map((area) => (
                <div key={area.index} className="space-y-1">
                  <div className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-widest text-coral">
                    <span>{area.index}</span>
                    <span aria-hidden="true">/</span>
                    <span className="text-charcoal dark:text-stone-200 font-clean font-semibold tracking-normal uppercase text-xs">
                      {area.title}
                    </span>
                  </div>
                  <p className="font-clean text-xs text-stone-500 dark:text-stone-400 leading-relaxed">
                    {area.detail}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column: Full-Height Editorial Studio Visual + Featured Case Study Trigger */}
          <div className="lg:col-span-5 flex">
            <div
              onClick={openSystemsCaseStudy}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  openSystemsCaseStudy();
                }
              }}
              className="group relative w-full min-h-[380px] sm:min-h-[440px] lg:h-full rounded-2xl overflow-hidden border border-stone-200 dark:border-stone-800 bg-stone-200 dark:bg-stone-900 cursor-pointer shadow-sm"
            >
              <img
                src={heroStudioImg}
                alt="Editorial communication design desk with typographic grids and system diagrams"
                className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent" />

              {/* Editorial Caption Placard */}
              <div className="absolute bottom-0 inset-x-0 p-6 text-white flex items-end justify-between gap-4">
                <div className="space-y-1">
                  <p className="font-mono text-[11px] uppercase tracking-widest text-white/75">
                    Featured Systems Case Study · 2026
                  </p>
                  <h2 className="font-editorial text-xl sm:text-2xl leading-snug text-white">
                    Event Journey Card: Academic Event System
                  </h2>
                  <p className="font-clean text-xs text-white/80">
                    Interactive stakeholder maps, swimlane flows &amp; centralized event architecture
                  </p>
                </div>
                <span className="w-10 h-10 rounded-full bg-white/15 backdrop-blur-md border border-white/25 flex items-center justify-center shrink-0 group-hover:bg-coral group-hover:border-coral transition-colors">
                  <ArrowUpRight size={18} />
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;