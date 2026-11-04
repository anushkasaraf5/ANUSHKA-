import React, { useState, useMemo, useEffect, useRef } from 'react';
import { PROJECTS } from '../constants';
import { Project } from '../types';
import { 
  X, ArrowLeft, ZoomIn, CheckCircle2, Monitor, Smartphone, Tablet, 
  BarChart3, Users, Sliders, Sparkles, Compass, Lock, Globe, RefreshCw, 
  Palette, Type, Check, Copy, BookOpen, ExternalLink, Calendar, Tag,
  Eye, MousePointer, Layers, ArrowRight, CornerDownRight, Maximize2,
  FileText, Activity, Quote, Target, Award, Lightbulb, Search,
  Menu, Sun, Moon
} from 'lucide-react';
import { useTheme } from './ThemeContext';
import ImageViewer from './ImageViewer';
import Flipbook from './Flipbook';
import { RevealOnScroll } from './RevealOnScroll';
import { ParallaxImage } from './ParallaxImage';
import TypeAndEmotionCaseStudy from './TypeAndEmotionCaseStudy';
import SystemsDesignCaseStudy from './SystemsDesignCaseStudy';

// --- CONFIGURATION ---
const IMAGE_ASPECT_RATIO = 'aspect-[4/3]';

const Projects: React.FC = () => {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [projectHistory, setProjectHistory] = useState<string[]>([]);
  const [projectMobileMenuOpen, setProjectMobileMenuOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState('All');
  const [viewingImage, setViewingImage] = useState<string | null>(null);
  const { theme, toggleTheme } = useTheme();

  // Prevent body scroll when modal is open
  useEffect(() => {
    if (selectedProject) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }

    return () => {
       document.body.style.overflow = 'auto';
    };
  }, [selectedProject]);

  const openProject = (project: Project, replace = false) => {
    const overlay = document.getElementById('project-overlay');
    if (overlay) overlay.scrollTop = 0;
    if (selectedProject && selectedProject.id !== project.id && !replace) {
      setProjectHistory(prev => [...prev, selectedProject.id]);
    } else if (!selectedProject) {
      setProjectHistory([]);
    }
    setSelectedProject(project);
    setProjectMobileMenuOpen(false);
  };

  const handleBack = () => {
    setProjectMobileMenuOpen(false);
    if (projectHistory.length > 0) {
      const prevId = projectHistory[projectHistory.length - 1];
      setProjectHistory(prev => prev.slice(0, -1));
      const target = PROJECTS.find(p => p.id === prevId);
      if (target) {
        const overlay = document.getElementById('project-overlay');
        if (overlay) overlay.scrollTop = 0;
        setSelectedProject(target);
        return;
      }
    }
    closeProject();
  };

  const closeProject = () => {
    setSelectedProject(null);
    setProjectHistory([]);
    setProjectMobileMenuOpen(false);
  };

  const handleNavClick = (e: React.MouseEvent, href: string) => {
    e.preventDefault();
    closeProject();
    setTimeout(() => {
      const targetId = href.replace('#', '');
      const element = document.getElementById(targetId);
      if (element) {
        const headerOffset = 100;
        const elementPosition = element.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.scrollY - headerOffset;
        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }
    }, 60);
  };

  const categories = useMemo(() => {
    return ['All', ...Array.from(new Set(PROJECTS.map(p => p.category)))];
  }, []);

  const filteredProjects = useMemo(() => {
    if (activeCategory === 'All') return PROJECTS;
    return PROJECTS.filter(p => p.category === activeCategory);
  }, [activeCategory]);

  const otherProjects = useMemo(() => {
    if (!selectedProject) return [];
    return PROJECTS.filter(p => p.id !== selectedProject.id).slice(0, 3);
  }, [selectedProject]);

  return (
    <section id="work" className="py-28 md:py-32 bg-white dark:bg-stone-950 transition-colors duration-300 relative overflow-hidden">
      
      {/* Ambient background glows */}
      <div className="absolute top-0 right-0 w-[550px] h-[550px] bg-lavender/20 dark:bg-lavender/10 rounded-full blur-[120px] pointer-events-none opacity-50 dark:opacity-60 animate-blob"></div>
      <div className="absolute bottom-0 left-0 w-[550px] h-[550px] bg-coral/10 dark:bg-coral/10 rounded-full blur-[120px] pointer-events-none opacity-50 dark:opacity-60 animate-blob animation-delay-2000"></div>

      <div className="container mx-auto px-6 relative z-10 max-w-7xl">
        <div className="flex flex-col md:flex-row justify-between items-end mb-12">
          <div className="animate-fadeIn">
            <div className="flex items-center gap-2 mb-3">
               <span className="h-px w-6 bg-neutral-gray dark:bg-stone-500"></span>
               <h2 className="text-[13px] font-subheading font-medium tracking-widest uppercase text-coral dark:text-coral">Portfolio</h2>
            </div>
            <h3 className="text-3xl md:text-5xl font-heading font-normal text-charcoal dark:text-white tracking-tight">Selected Works</h3>
          </div>
          
          <div className="flex flex-wrap gap-2.5 mt-6 md:mt-0 justify-end animate-fadeIn" style={{ animationDelay: '0.2s' }}>
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-5 py-2 rounded-full font-subheading text-[13px] font-medium tracking-wider transition-all duration-300 border cursor-pointer ${
                  activeCategory === cat
                    ? 'bg-charcoal text-white border-charcoal dark:bg-white dark:text-stone-900 dark:border-white shadow-md scale-105'
                    : 'bg-cream text-neutral-gray border-stone-200 hover:border-charcoal hover:text-charcoal dark:border-stone-700 dark:bg-stone-900/50 dark:text-stone-400 dark:hover:text-white dark:hover:border-white hover:scale-105'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 md:gap-8">
          {filteredProjects.map((project, index) => (
            <ProjectCard 
              key={`${activeCategory}-${project.id}`} 
              project={project} 
              onClick={() => openProject(project)}
              index={index}
            />
          ))}
        </div>
      </div>

      {/* BESPOKE PROJECT DETAIL OVERLAY */}
      {selectedProject && (
        <div id="project-overlay" className="fixed inset-0 z-[60] bg-[#fafafa] dark:bg-stone-950 overflow-y-auto animate-fadeIn custom-scrollbar">
            
            {/* Project Navigation Bar (Identical style to main navbar + Back & Close options) */}
            <div className="sticky top-0 left-0 right-0 z-50 pt-3 sm:pt-5 pb-2 px-3 sm:px-6 flex justify-center pointer-events-none bg-gradient-to-b from-[#fafafa] via-[#fafafa]/90 to-transparent dark:from-stone-950 dark:via-stone-950/90 dark:to-transparent">
              <nav 
                aria-label="Project navigation"
                className="pointer-events-auto relative px-3.5 sm:px-6 py-2 sm:py-2.5 rounded-full flex items-center justify-between transition-all duration-300 w-full sm:w-[94%] md:w-[85%] lg:w-[75%] max-w-5xl bg-white/90 dark:bg-stone-900/90 backdrop-blur-md shadow-lg border border-stone-200/80 dark:border-stone-800"
              >
                
                {/* Left: Brand AS. + Back Option */}
                <div className="flex items-center gap-2 sm:gap-3 z-10">
                  <a 
                    href="#" 
                    onClick={(e) => {
                      e.preventDefault();
                      closeProject();
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    className="text-base sm:text-lg font-heading font-normal tracking-tight uppercase transition-colors text-charcoal dark:text-cream hover:opacity-80"
                    title="Anushka Saraf Portfolio"
                  >
                    AS<span className="text-coral">.</span>
                  </a>

                  <div className="h-4 w-px bg-stone-300 dark:bg-stone-700"></div>

                  {/* BACK OPTION */}
                  <button 
                    onClick={handleBack}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-full font-subheading text-xs sm:text-sm font-medium text-neutral-gray hover:text-coral hover:bg-cream dark:text-stone-300 dark:hover:text-coral dark:hover:bg-stone-800 transition-colors group cursor-pointer"
                    title={projectHistory.length > 0 ? "Back to previous project" : "Back to portfolio"}
                  >
                    <ArrowLeft size={16} className="group-hover:-translate-x-0.5 transition-transform" />
                    <span>Back</span>
                  </button>
                </div>

                {/* Center: Desktop Nav Links (Identical to Main Navbar with Work active) */}
                <div className="hidden md:flex items-center space-x-1">
                  {[
                    { name: 'About', href: '#about' },
                    { name: 'Skills', href: '#skills' },
                    { name: 'Work', href: '#work' },
                    { name: 'Resume', href: '#resume' },
                    { name: 'Contact', href: '#contact' },
                  ].map((link) => {
                    const isWork = link.name === 'Work';
                    return (
                      <a 
                        key={link.name} 
                        href={link.href} 
                        onClick={(e) => handleNavClick(e, link.href)}
                        className={`px-3.5 py-1.5 rounded-full font-subheading text-xs sm:text-sm font-medium transition-colors cursor-pointer ${
                          isWork
                            ? 'text-coral bg-coral/10 dark:text-coral dark:bg-stone-800/90 font-semibold'
                            : 'text-neutral-gray hover:text-coral hover:bg-cream dark:text-stone-300 dark:hover:text-coral dark:hover:bg-stone-800'
                        }`}
                      >
                        {link.name}
                      </a>
                    );
                  })}
                </div>

                {/* Right: Theme Toggle + CLOSE OPTION (+ Mobile Menu Toggle) */}
                <div className="flex items-center gap-1.5 sm:gap-2 z-10">
                  <button 
                    onClick={toggleTheme}
                    className="p-2 rounded-full text-neutral-gray hover:text-coral hover:bg-cream dark:text-stone-300 dark:hover:text-coral dark:hover:bg-stone-800 transition-colors cursor-pointer"
                    aria-label="Toggle theme"
                  >
                    {theme === 'light' ? <Moon size={18} /> : <Sun size={18} />}
                  </button>

                  <div className="h-4 w-px bg-stone-300 dark:bg-stone-700"></div>

                  {/* CLOSE OPTION */}
                  <button 
                    onClick={closeProject}
                    className="flex items-center gap-1.5 px-3 sm:px-3.5 py-1.5 rounded-full font-subheading text-xs sm:text-sm font-medium bg-stone-100 hover:bg-coral/10 hover:text-coral dark:bg-stone-800 dark:hover:bg-stone-700 text-charcoal dark:text-white dark:hover:text-coral transition-colors group cursor-pointer border border-stone-200/80 dark:border-stone-700/80"
                    title="Close project view"
                    aria-label="Close project view"
                  >
                    <X size={15} className="group-hover:rotate-90 transition-transform duration-200" />
                    <span>Close</span>
                  </button>

                  {/* Mobile Menu Toggle for small screens */}
                  <button 
                    onClick={() => setProjectMobileMenuOpen(!projectMobileMenuOpen)}
                    className="p-2 rounded-full text-charcoal dark:text-cream bg-cream dark:bg-stone-800 md:hidden ml-0.5 cursor-pointer"
                    aria-label="Toggle navigation menu"
                  >
                    {projectMobileMenuOpen ? <X size={16} /> : <Menu size={16} />}
                  </button>
                </div>
              </nav>
            </div>

            {/* Mobile Menu Overlay for Project view */}
            {projectMobileMenuOpen && (
              <div className="fixed inset-0 bg-cream/95 dark:bg-stone-950/95 backdrop-blur-xl z-[70] flex flex-col items-center justify-center space-y-6 md:hidden animate-fadeIn">
                {[
                  { name: 'About', href: '#about' },
                  { name: 'Skills', href: '#skills' },
                  { name: 'Work', href: '#work' },
                  { name: 'Resume', href: '#resume' },
                  { name: 'Contact', href: '#contact' },
                ].map((link) => (
                  <a 
                    key={link.name} 
                    href={link.href} 
                    onClick={(e) => handleNavClick(e, link.href)}
                    className="text-3xl font-heading font-normal tracking-tight text-charcoal dark:text-cream hover:text-coral dark:hover:text-coral transition-colors"
                  >
                    {link.name}
                  </a>
                ))}
                <div className="pt-4 flex items-center gap-4">
                  <button 
                    onClick={handleBack}
                    className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-stone-200 dark:bg-stone-800 text-charcoal dark:text-cream font-subheading text-xs tracking-wider uppercase"
                  >
                    <ArrowLeft size={15} />
                    <span>Back</span>
                  </button>
                  <button 
                    onClick={closeProject}
                    className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-coral text-white font-subheading text-xs tracking-wider uppercase"
                  >
                    <X size={15} />
                    <span>Close</span>
                  </button>
                </div>
              </div>
            )}

            {/* ROUTE TO BESPOKE LAYOUT ACCORDING TO PROJECT */}
            <main className="max-w-[84rem] mx-auto px-4 sm:px-6 md:px-10 py-10 sm:py-16">
              {selectedProject.id === '1' ? (
                <TypeAndEmotionCaseStudy 
                  project={selectedProject} 
                  setViewingImage={setViewingImage} 
                  onNavigateProject={(id) => {
                    const target = PROJECTS.find(p => p.id === id);
                    if (target) openProject(target);
                  }}
                />
              ) : selectedProject.id === '3' ? (
                <SystemsDesignCaseStudy 
                  project={selectedProject} 
                  setViewingImage={setViewingImage} 
                  onNavigateProject={(id) => {
                    const target = PROJECTS.find(p => p.id === id);
                    if (target) openProject(target);
                  }}
                />
              ) : selectedProject.id === '6' ? (
                <VivusTypefaceCaseStudy project={selectedProject} setViewingImage={setViewingImage} />
              ) : selectedProject.id === '2' ? (
                <MatraMarksCaseStudy project={selectedProject} setViewingImage={setViewingImage} />
              ) : (
                <DefaultCaseStudy project={selectedProject} setViewingImage={setViewingImage} />
              )}

              {/* Bottom "Discover More" Section */}
              <div className="border-t border-stone-200 dark:border-stone-800 pt-16 mt-20">
                {otherProjects.length > 0 && (
                  <div className="mb-14">
                    <div className="flex items-center justify-between mb-8">
                      <div>
                        <h4 className="text-[13px] font-subheading font-medium uppercase tracking-widest text-coral mb-1">More Work</h4>
                        <h3 className="text-2xl sm:text-3xl font-heading font-normal text-charcoal dark:text-white">Explore Other Projects</h3>
                      </div>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                      {otherProjects.map((project, idx) => (
                        <ProjectCard 
                          key={`other-${project.id}`} 
                          project={project} 
                          onClick={() => openProject(project)}
                          index={idx}
                        />
                      ))}
                    </div>
                  </div>
                )}
                
                <div className="flex justify-center">
                  <button 
                    onClick={closeProject}
                    className="group relative px-8 py-3 bg-charcoal dark:bg-white text-white dark:text-stone-900 rounded-full font-subheading font-medium shadow-lg hover:-translate-y-0.5 hover:shadow-xl transition-all text-sm overflow-hidden flex items-center gap-2.5"
                  >
                    <ArrowLeft size={15} className="group-hover:-translate-x-1 transition-transform" />
                    <span>Return to Selected Works</span>
                  </button>
                </div>
              </div>
            </main>
        </div>
      )}

      {viewingImage && (
        <ImageViewer 
          src={viewingImage} 
          alt="Project Image" 
          onClose={() => setViewingImage(null)} 
        />
      )}
    </section>
  );
};

/* PROJECT 1: TYPE & EMOTION - Restructured into Research Case Study format in ./TypeAndEmotionCaseStudy.tsx */

/* =========================================================================
   PROJECT 6: VISUAL TRANSFORMATION - VIVUS (Type Specimen & Design System)
   - Layout Tailored for: Visual Designer, Typeface Design System, Display Craft
   - Micro-interactions:
     1. Live Interactive Type Tester (Scale, Tracking, Pangram pills)
     2. Specimen Color Palette Switcher (Dark, Light, Fuchsia, Stem)
     3. 1-Click Copy Hex Code on Design Tokens
     4. High-impact MacBook Pro Display mockup + Zoomable Spreads
   ========================================================================= */
const VivusTypefaceCaseStudy: React.FC<{ project: Project; setViewingImage: (url: string) => void }> = ({ project, setViewingImage }) => {
  // Live Type Tester Playground States
  const [testText, setTestText] = useState("VIVUS: Biomimetic Typography");
  const [fontSize, setFontSize] = useState(44);
  const [letterSpacing, setLetterSpacing] = useState(0);
  const [specimenTheme, setSpecimenTheme] = useState<'dark' | 'fuchsia' | 'light'>('dark');
  const [copiedColor, setCopiedColor] = useState<string | null>(null);

  const pangrams = [
    "VIVUS: Harmony of Resilience & Elegance",
    "Sphinx of black quartz, judge my vow.",
    "Cascading floral letterforms in bloom.",
    "ABCDEFGHIJKLM NOPQRSTUVWXYZ 1234567890"
  ];

  const colorTokens = [
    { name: "Fuchsia Bloom", hex: "#E0115F", role: "Primary Botanical Accent" },
    { name: "Deep Violet", hex: "#4B0082", role: "Secondary Depth & Shading" },
    { name: "Stem Emerald", hex: "#2E8B57", role: "Organic Foliage Accent" },
    { name: "Charcoal Ink", hex: "#1C1917", role: "Optical Print Baseline" }
  ];

  const handleCopyColor = (hex: string) => {
    navigator.clipboard.writeText(hex);
    setCopiedColor(hex);
    setTimeout(() => setCopiedColor(null), 1800);
  };

  return (
    <div className="space-y-16 sm:space-y-24">
      
      {/* 1. Header & Specimen Spec */}
      <RevealOnScroll direction="up">
        <div className="space-y-4">
          <div className="flex flex-wrap items-center gap-3 text-[13px] font-body font-normal text-stone-500 dark:text-stone-400">
            <span className="text-pink-500 font-subheading font-medium uppercase tracking-widest">Typeface Design System</span>
            <span aria-hidden="true">·</span>
            <span>{project.date}</span>
            <span aria-hidden="true">·</span>
            <span>Biomimicry & Display Typography</span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-heading font-normal text-charcoal dark:text-white leading-[1.1] tracking-tight">
            VIVUS: Biomimetic Typography & Digital Specimen
          </h1>

          <p className="text-base font-body font-normal text-stone-600 dark:text-stone-300 max-w-3xl leading-relaxed">
            {project.description}
          </p>
        </div>
      </RevealOnScroll>

      {/* 2. Interactive Type Tester Sandbox (Visual Designer Playground) */}
      <RevealOnScroll direction="up">
        <div className="rounded-3xl border border-stone-200 dark:border-stone-800 bg-white dark:bg-stone-900 shadow-xl overflow-hidden p-6 sm:p-8 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-stone-100 dark:border-stone-800 pb-5">
            <div>
              <div className="flex items-center gap-2">
                <Sliders size={18} className="text-pink-500" />
                <h3 className="text-xl sm:text-2xl font-heading font-normal text-charcoal dark:text-white">Interactive Type Tester</h3>
              </div>
              <p className="text-[13px] font-body font-normal text-stone-500 mt-0.5">Test custom text strings and adjust typography scale</p>
            </div>

            {/* Quick Presets */}
            <div className="flex flex-wrap items-center gap-2">
              {pangrams.map((p, i) => (
                <button
                  key={i}
                  onClick={() => setTestText(p)}
                  className="px-3.5 py-1.5 rounded-full text-[13px] font-subheading font-medium bg-stone-100 dark:bg-stone-800 hover:bg-stone-200 dark:hover:bg-stone-700 text-stone-600 dark:text-stone-300 transition-colors"
                >
                  Preset 0{i + 1}
                </button>
              ))}
            </div>
          </div>

          {/* Controls Bar: Sliders & Theme Switch */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 bg-stone-50 dark:bg-stone-800/40 p-4 sm:p-5 rounded-2xl">
            <div className="space-y-1.5">
              <div className="flex justify-between text-[13px] font-body font-normal text-stone-500">
                <span>Font Size</span>
                <span className="font-mono">{fontSize}px</span>
              </div>
              <input 
                type="range" 
                min="24" 
                max="80" 
                value={fontSize} 
                onChange={(e) => setFontSize(Number(e.target.value))}
                className="w-full accent-pink-500 cursor-pointer"
              />
            </div>

            <div className="space-y-1.5">
              <div className="flex justify-between text-[13px] font-body font-normal text-stone-500">
                <span>Letter Spacing</span>
                <span className="font-mono">{letterSpacing}px</span>
              </div>
              <input 
                type="range" 
                min="-2" 
                max="10" 
                value={letterSpacing} 
                onChange={(e) => setLetterSpacing(Number(e.target.value))}
                className="w-full accent-pink-500 cursor-pointer"
              />
            </div>

            <div className="space-y-1.5">
              <div className="flex justify-between text-[13px] font-body font-normal text-stone-500">
                <span>Specimen Canvas Mode</span>
              </div>
              <div className="inline-flex w-full p-1 rounded-xl bg-stone-200/80 dark:bg-stone-700/80">
                <button
                  onClick={() => setSpecimenTheme('dark')}
                  className={`flex-1 py-1 rounded-lg text-[13px] font-subheading font-medium transition-all ${
                    specimenTheme === 'dark' ? 'bg-black text-white shadow-xs' : 'text-stone-600 dark:text-stone-300'
                  }`}
                >
                  Dark
                </button>
                <button
                  onClick={() => setSpecimenTheme('fuchsia')}
                  className={`flex-1 py-1 rounded-lg text-[13px] font-subheading font-medium transition-all ${
                    specimenTheme === 'fuchsia' ? 'bg-[#E0115F] text-white shadow-xs' : 'text-stone-600 dark:text-stone-300'
                  }`}
                >
                  Fuchsia
                </button>
                <button
                  onClick={() => setSpecimenTheme('light')}
                  className={`flex-1 py-1 rounded-lg text-[13px] font-subheading font-medium transition-all ${
                    specimenTheme === 'light' ? 'bg-white text-stone-900 shadow-xs' : 'text-stone-600 dark:text-stone-300'
                  }`}
                >
                  Light
                </button>
              </div>
            </div>
          </div>

          {/* Live Editable Text Input & Display Area */}
          <div className="space-y-3">
            <input 
              type="text" 
              value={testText} 
              onChange={(e) => setTestText(e.target.value)}
              placeholder="Type anything to test the typeface..."
              className="w-full px-4 py-3 rounded-xl border border-stone-200 dark:border-stone-700 bg-white dark:bg-stone-900 text-sm font-body font-normal focus:outline-hidden focus:ring-2 focus:ring-pink-400"
            />

            <div 
              className={`min-h-[180px] p-8 rounded-2xl border transition-colors flex items-center justify-center text-center overflow-x-auto select-all ${
                specimenTheme === 'dark' 
                  ? 'bg-stone-950 text-white border-stone-800' 
                  : specimenTheme === 'fuchsia' 
                  ? 'bg-[#E0115F] text-white border-pink-400' 
                  : 'bg-stone-50 text-stone-900 border-stone-200'
              }`}
              style={{
                fontFamily: 'var(--font-heading)',
                fontSize: `${fontSize}px`,
                letterSpacing: `${letterSpacing}px`,
                lineHeight: 1.2
              }}
            >
              <span>{testText || 'Type your message...'}</span>
            </div>
          </div>
        </div>
      </RevealOnScroll>

      {/* 3. MacBook Pro Laptop Mockup: Primary Specimen Spread */}
      <RevealOnScroll direction="up">
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div>
              <span className="text-[13px] font-subheading font-medium text-pink-500 uppercase tracking-widest">
                Display & Vector Craftsmanship
              </span>
              <h2 className="text-2xl sm:text-3xl font-heading font-normal text-charcoal dark:text-white">
                MacBook Pro Specimen Spread
              </h2>
            </div>
            <span className="text-[13px] font-body font-normal text-stone-500 flex items-center gap-1.5">
              <Monitor size={15} className="text-pink-500" /> Click to inspect high-resolution vector layout
            </span>
          </div>

          {/* Laptop Mockup */}
          <div 
            onClick={() => setViewingImage(project.details.gallery[0])}
            className="group cursor-zoom-in max-w-5xl mx-auto transition-transform duration-300 hover:scale-[1.01]"
          >
            {/* Screen */}
            <div className="rounded-t-2xl sm:rounded-t-3xl p-3 sm:p-5 bg-stone-900 border-t-2 border-x-2 border-stone-700/80 shadow-2xl overflow-hidden">
              <div className="w-2.5 h-2.5 rounded-full bg-stone-800 mx-auto mb-2 border border-stone-700"></div>
              <div className="relative rounded-lg overflow-hidden bg-black aspect-[16/10]">
                <img 
                  src={project.details.gallery[0]} 
                  alt="VIVUS Type Specimen Spread on Laptop" 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/25 transition-colors flex items-center justify-center">
                  <div className="opacity-0 group-hover:opacity-100 transition-opacity bg-white/95 dark:bg-stone-900/90 backdrop-blur px-5 py-2.5 rounded-full text-[13px] font-subheading font-medium tracking-wider shadow-xl flex items-center gap-2 text-charcoal dark:text-white">
                    <ZoomIn size={15} className="text-pink-500" /> View Full Specimen Spread
                  </div>
                </div>
              </div>
            </div>

            {/* Laptop Base */}
            <div className="h-4 sm:h-5 bg-stone-700 rounded-b-2xl sm:rounded-b-3xl border-t border-stone-600 flex justify-center items-start shadow-xl">
              <div className="w-24 sm:w-32 h-1.5 bg-stone-500 rounded-b-md"></div>
            </div>
          </div>
        </div>
      </RevealOnScroll>

      {/* 4. Multi-Angle Editorial Spreads Gallery */}
      <RevealOnScroll direction="up">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <span className="text-[13px] font-subheading font-medium text-pink-500 uppercase tracking-widest">
                Editorial Application
              </span>
              <h2 className="text-2xl sm:text-3xl font-heading font-normal text-charcoal dark:text-white">
                Multi-Page Specimen Spreads
              </h2>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {project.details.gallery.slice(1).map((imgUrl, idx) => {
              const speeds = [0.09, 0.16, 0.11];
              return (
                <div 
                  key={idx}
                  onClick={() => setViewingImage(imgUrl)}
                  className="group cursor-zoom-in rounded-2xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 shadow-md p-3 sm:p-4 hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
                >
                  <div className="relative rounded-xl overflow-hidden aspect-[4/3] bg-stone-100 dark:bg-stone-950">
                    <ParallaxImage 
                      src={imgUrl} 
                      alt={`Editorial Spread ${idx + 2}`} 
                      speed={speeds[idx % speeds.length]}
                      containerClassName="w-full h-full"
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    >
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/25 transition-colors flex items-center justify-center">
                        <div className="opacity-0 group-hover:opacity-100 transition-opacity bg-white/95 dark:bg-stone-900/90 px-3.5 py-1.5 rounded-full text-[13px] font-subheading font-medium text-charcoal dark:text-white shadow-md flex items-center gap-1.5">
                          <ZoomIn size={13} className="text-pink-500" /> Zoom
                        </div>
                      </div>
                    </ParallaxImage>
                  </div>
                  <div className="mt-3 px-1 flex justify-between items-center">
                    <span className="font-subheading font-medium text-sm text-charcoal dark:text-white">Specimen Spread 0{idx + 2}</span>
                    <span className="text-[13px] font-body font-normal text-stone-500">Editorial Vector</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </RevealOnScroll>

      {/* 5. Design System Color Tokens with 1-Click Copy */}
      <RevealOnScroll direction="up">
        <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 shadow-lg space-y-5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Palette size={20} className="text-pink-500" />
              <h3 className="text-xl sm:text-2xl font-heading font-normal text-charcoal dark:text-white">
                Color Tokens & Palette Architecture
              </h3>
            </div>
            <span className="text-[13px] font-body font-normal text-stone-400 hidden sm:inline">
              Click swatch to copy hex
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {colorTokens.map((token, i) => {
              const isCopied = copiedColor === token.hex;

              return (
                <div 
                  key={i}
                  onClick={() => handleCopyColor(token.hex)}
                  className="p-4 rounded-2xl bg-stone-50 dark:bg-stone-800/60 border border-stone-200 dark:border-stone-700 hover:border-pink-500 transition-all cursor-pointer group space-y-2 relative"
                >
                  <div 
                    className="w-full h-14 rounded-xl shadow-xs transition-transform group-hover:scale-105"
                    style={{ backgroundColor: token.hex }}
                  ></div>

                  <div className="flex items-center justify-between">
                    <p className="text-sm font-subheading font-medium text-charcoal dark:text-white">
                      {token.name}
                    </p>
                    {isCopied ? (
                      <span className="text-[13px] font-subheading font-medium text-pink-500">Copied!</span>
                    ) : (
                      <Copy size={13} className="text-stone-400 opacity-0 group-hover:opacity-100 transition-opacity" />
                    )}
                  </div>

                  <p className="text-[13px] font-mono text-stone-500">
                    {token.hex}
                  </p>
                  <p className="text-[13px] font-body font-normal text-stone-500 leading-tight">
                    {token.role}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </RevealOnScroll>

    </div>
  );
};

/* =========================================================================
   PROJECT 2: TYPOGRAPHIC LEGACY - MATRA MARKS (Indian Vernacular Streets)
   - Layout Tailored for: Cultural Visual Archive, Tactile Zine, Street Exhibition
   - Micro-interactions:
     1. Interactive Zine Studio Desk Flipbook
     2. Interactive Street Photography Lightbox Gallery
     3. Street Pigment Palette with 1-Click Copy
   ========================================================================= */
const MatraMarksCaseStudy: React.FC<{ project: Project; setViewingImage: (url: string) => void }> = ({ project, setViewingImage }) => {
  const [activeSignIndex, setActiveSignIndex] = useState(0);

  const streetPigments = [
    { name: "Galli Marigold", hex: "#E67E22", note: "Hand-painted shutter numbers" },
    { name: "Azulejo Cobalt", hex: "#1B4F72", note: "Portuguese glazed tile signage" },
    { name: "Terracotta Clay", hex: "#C0392B", note: "Public wall stencil lettering" },
    { name: "Chai Brass", hex: "#B7950B", note: "Cast metallic street placards" }
  ];

  return (
    <div className="space-y-16 sm:space-y-24">
      
      {/* 1. Header & Publication Kicker */}
      <RevealOnScroll direction="up">
        <div className="space-y-4">
          <div className="flex flex-wrap items-center gap-3 text-[13px] font-body font-normal text-stone-500 dark:text-stone-400">
            <span className="text-amber-600 font-subheading font-medium uppercase tracking-widest">Vernacular Type Archive & Publication</span>
            <span aria-hidden="true">·</span>
            <span>{project.date}</span>
            <span aria-hidden="true">·</span>
            <span>Interactive Digital Zine & Field Research</span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-heading font-normal text-charcoal dark:text-white leading-[1.1] tracking-tight">
            {project.title}: Matra Marks of Indian Vernacular Streets
          </h1>

          <p className="text-base font-body font-normal text-stone-600 dark:text-stone-300 max-w-3xl leading-relaxed">
            {project.description}
          </p>
        </div>
      </RevealOnScroll>

      {/* 2. Interactive Digital Flipbook Studio Desk Mockup */}
      {project.details.flipbook && (
        <RevealOnScroll direction="up">
          <div className="space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div>
                <span className="text-[13px] font-subheading font-medium text-amber-600 uppercase tracking-widest">
                  Tactile Publication
                </span>
                <h2 className="text-2xl sm:text-3xl font-heading font-normal text-charcoal dark:text-white">
                  The Matra Marks Zine Studio Desk
                </h2>
              </div>
              <span className="text-[13px] font-body font-normal text-stone-500 flex items-center gap-1.5">
                <BookOpen size={15} className="text-amber-600" /> Click page edges to flip physical spreads
              </span>
            </div>

            {/* Studio Desk Presentation Container */}
            <div className="rounded-[32px] p-4 sm:p-10 bg-gradient-to-b from-stone-100 to-stone-200 dark:from-stone-900 dark:to-stone-950 border border-stone-300/80 dark:border-stone-800 shadow-2xl">
              <Flipbook pages={project.details.flipbook} />
            </div>
          </div>
        </RevealOnScroll>
      )}

      {/* 3. Vernacular Street Gallery Lightbox (Photographic Exhibition) */}
      <RevealOnScroll direction="up">
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div>
              <span className="text-[13px] font-subheading font-medium text-amber-600 uppercase tracking-widest">
                Archival Street Documentation
              </span>
              <h2 className="text-2xl sm:text-3xl font-heading font-normal text-charcoal dark:text-white">
                Street Photography & Painted Signage
              </h2>
            </div>
            <span className="text-[13px] font-body font-normal text-stone-500">
              Photographic field documentation across public alleys & shutters
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {project.details.gallery.map((imgUrl, idx) => (
              <div 
                key={idx}
                onClick={() => setViewingImage(imgUrl)}
                className="group cursor-zoom-in rounded-2xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 p-3 shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
              >
                {/* Museum-style mounting frame */}
                <div className="relative rounded-xl overflow-hidden aspect-[4/5] bg-stone-950">
                  <img 
                    src={imgUrl} 
                    alt={`Vernacular Street Artifact ${idx + 1}`} 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/25 transition-colors flex items-center justify-center">
                    <div className="opacity-0 group-hover:opacity-100 transition-opacity bg-white/95 dark:bg-stone-900/90 px-3.5 py-1.5 rounded-full text-[13px] font-subheading font-medium text-charcoal dark:text-white shadow-md flex items-center gap-1.5">
                      <ZoomIn size={13} className="text-amber-600" /> Inspect Artifact
                    </div>
                  </div>
                </div>

                {/* Museum Placard */}
                <div className="pt-3 px-1 space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="font-subheading font-medium text-sm text-charcoal dark:text-white">
                      {idx === 0 ? 'Kinetic Sign Painting' : idx === 1 ? 'Azulejos Heritage' : idx === 2 ? 'Galli Shutter Lettering' : 'Vernacular Street Type'}
                    </span>
                    <span className="text-[13px] font-mono text-amber-600 font-medium">0{idx + 1}</span>
                  </div>
                  <p className="text-[13px] font-body font-normal text-stone-500 leading-tight">
                    {idx === 0 ? 'Animated documentation of hand-lettered brush strokes' : 'Bilingual Portuguese-Indic street signage'}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </RevealOnScroll>

      {/* 4. Street Pigment Palette Architecture */}
      <RevealOnScroll direction="up">
        <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 shadow-md space-y-4">
          <div className="flex items-center gap-2">
            <Compass size={20} className="text-amber-600" />
            <h3 className="text-xl sm:text-2xl font-heading font-normal text-charcoal dark:text-white">
              Indian Street Pigments Archive
            </h3>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-2">
            {streetPigments.map((pigment, idx) => (
              <div key={idx} className="p-4 rounded-xl bg-stone-50 dark:bg-stone-800/60 border border-stone-200 dark:border-stone-700 space-y-1.5">
                <div className="w-full h-12 rounded-lg shadow-xs" style={{ backgroundColor: pigment.hex }}></div>
                <p className="text-sm font-subheading font-medium text-charcoal dark:text-white">{pigment.name}</p>
                <p className="text-[13px] font-mono text-stone-500">{pigment.hex}</p>
                <p className="text-[13px] font-body font-normal text-stone-500 leading-tight">{pigment.note}</p>
              </div>
            ))}
          </div>
        </div>
      </RevealOnScroll>

    </div>
  );
};

/* =========================================================================
   FALLBACK / DEFAULT CASE STUDY LAYOUT
   ========================================================================= */
const DefaultCaseStudy: React.FC<{ project: Project; setViewingImage: (url: string) => void }> = ({ project, setViewingImage }) => {
  return (
    <div className="space-y-12">
      <div>
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-heading font-normal text-charcoal dark:text-white leading-[1.1] tracking-tight mb-3">
          {project.title}
        </h1>
        <p className="text-base font-body font-normal text-stone-600 dark:text-stone-400">
          {project.description}
        </p>
      </div>

      <div 
        onClick={() => setViewingImage(project.thumbnailUrl)}
        className="cursor-zoom-in rounded-2xl overflow-hidden shadow-xl aspect-[16/9] bg-stone-900"
      >
        <img src={project.thumbnailUrl} alt={project.title} className="w-full h-full object-cover" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="p-6 rounded-2xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800">
          <h3 className="text-xl font-subheading font-medium mb-2 text-charcoal dark:text-white">The Challenge</h3>
          <p className="text-sm font-body font-normal text-stone-600 dark:text-stone-400 leading-relaxed">{project.details.problem}</p>
        </div>
        <div className="p-6 rounded-2xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800">
          <h3 className="text-xl font-subheading font-medium mb-2 text-charcoal dark:text-white">The Outcome</h3>
          <p className="text-sm font-body font-normal text-stone-600 dark:text-stone-400 leading-relaxed">{project.details.outcome}</p>
        </div>
      </div>
    </div>
  );
};

// 3D Tilt & Parallax Project Card Component
interface ProjectCardProps {
  project: Project;
  onClick: () => void;
  index: number;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project, onClick, index }) => {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [transform, setTransform] = useState("perspective(1000px) rotateX(0deg) rotateY(0deg) scale(1)");
  const [glarePosition, setGlarePosition] = useState({ x: 50, y: 50 });
  const [parallaxY, setParallaxY] = useState(0);

  // Scroll-triggered IntersectionObserver for smooth fade-in and subtle scale-up
  useEffect(() => {
    const element = wrapperRef.current;
    if (!element) return;

    // Honor prefers-reduced-motion for accessibility
    if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setIsVisible(true);
      return;
    }

    if (typeof IntersectionObserver === 'undefined') {
      setIsVisible(true);
      return;
    }

    const overlay = document.getElementById('project-overlay');
    const isInsideOverlay = Boolean(overlay && overlay.contains(element));

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            observer.unobserve(entry.target);
          }
        });
      },
      {
        root: isInsideOverlay ? overlay : null,
        rootMargin: isInsideOverlay ? '0px 0px -20px 0px' : '0px 0px -30px 0px',
        threshold: 0.15,
      }
    );

    observer.observe(element);

    return () => {
      if (element) {
        observer.unobserve(element);
      }
    };
  }, []);

  useEffect(() => {
    let ticking = false;

    const updateParallax = () => {
      if (!cardRef.current) return;
      const rect = cardRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      
      // Calculate when card is in or near viewport
      if (rect.bottom > -60 && rect.top < windowHeight + 60) {
        const cardCenter = rect.top + rect.height / 2;
        const viewportCenter = windowHeight / 2;
        // Normalized distance from viewport center: -1 (at top) to +1 (at bottom)
        const normalized = (cardCenter - viewportCenter) / (viewportCenter + 1);
        // Subtle, smooth parallax offset: ranges between -18px and +18px
        const offset = Math.max(-20, Math.min(20, normalized * -18));
        setParallaxY(offset);
      }
      ticking = false;
    };

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(updateParallax);
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleScroll, { passive: true });
    
    const overlay = document.getElementById('project-overlay');
    if (overlay) {
      overlay.addEventListener('scroll', handleScroll, { passive: true });
    }

    updateParallax();

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
      if (overlay) {
        overlay.removeEventListener('scroll', handleScroll);
      }
    };
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const { left, top, width, height } = cardRef.current.getBoundingClientRect();
    const x = e.clientX - left;
    const y = e.clientY - top;
    
    const xPct = x / width;
    const yPct = y / height;
    
    const xRot = (0.5 - yPct) * 10;
    const yRot = (xPct - 0.5) * 10;
    
    setTransform(`perspective(1000px) rotateX(${xRot}deg) rotateY(${yRot}deg) scale(1.03)`);
    setGlarePosition({ x: xPct * 100, y: yPct * 100 });
  };

  const handleMouseLeave = () => {
    setTransform("perspective(1000px) rotateX(0deg) rotateY(0deg) scale(1)");
    setGlarePosition({ x: 50, y: 50 });
  };

  return (
    <div
      ref={wrapperRef}
      className="w-full h-full will-change-[opacity,transform]"
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? 'scale(1) translateY(0)' : 'scale(0.94) translateY(28px)',
        transition: 'opacity 0.75s cubic-bezier(0.16, 1, 0.3, 1), transform 0.75s cubic-bezier(0.16, 1, 0.3, 1)',
        transitionDelay: `${(index % 3) * 100}ms`,
      }}
    >
      <div 
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className="group cursor-pointer flex flex-col gap-3 h-full"
        onClick={onClick}
        style={{ 
          transform,
          transition: 'transform 0.15s ease-out',
        }}
      >
        <div className={`${IMAGE_ASPECT_RATIO} w-full relative overflow-hidden rounded-2xl bg-stone-200 dark:bg-stone-800 shadow-sm group-hover:shadow-xl group-hover:shadow-lavender/20 dark:group-hover:shadow-lavender/10 transition-all duration-500 border-2 border-white dark:border-stone-800`}>
          {/* Parallax Image Layer */}
          <div 
            className="absolute -top-[12%] -bottom-[12%] inset-x-0 w-full h-[124%] will-change-transform transition-transform duration-300 ease-out"
            style={{
              transform: `translate3d(0, ${parallaxY}px, 0)`
            }}
          >
            <img 
              src={project.thumbnailUrl} 
              alt={project.title} 
              className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-108 will-change-transform"
            />
          </div>
          
          {/* Hover Overlay */}
          <div className="absolute inset-0 bg-charcoal/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center z-10">
             <div className="translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                <span className="px-5 py-2.5 bg-white/95 backdrop-blur text-charcoal font-subheading font-medium text-[13px] tracking-wider rounded-full shadow-lg">
                  View Project
                </span>
             </div>
          </div>

          {/* Glare Effect */}
          <div 
             className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20 mix-blend-overlay"
             style={{
                background: `radial-gradient(circle at ${glarePosition.x}% ${glarePosition.y}%, rgba(255,255,255,0.4) 0%, transparent 80%)`
             }}
          />
        </div>
        <div className="px-1 transform transition-transform duration-300 group-hover:translate-x-1">
          <div className="flex justify-between items-start">
            <h4 className="font-heading font-normal text-xl leading-tight text-charcoal dark:text-white group-hover:text-coral dark:group-hover:text-coral transition-colors">
              {project.title}
            </h4>
          </div>
          <div className="flex items-center gap-2 mt-1 text-[13px] font-body font-normal text-stone-500 dark:text-stone-400">
             <span>{project.category}</span>
             <span aria-hidden="true">·</span>
             <span>{project.date}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Projects;