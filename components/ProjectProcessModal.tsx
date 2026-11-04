import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { 
  X, Maximize2, Minimize2, ZoomIn, ZoomOut, RotateCcw, 
  ChevronLeft, ChevronRight, Grid, Eye, Layers, Sparkles, 
  ExternalLink, Download, Check, Info
} from 'lucide-react';
import { Project, ProcessArtifact } from '../types';
import { PROJECTS } from '../constants';

interface ProjectProcessModalProps {
  project: Project;
  isOpen: boolean;
  onClose: () => void;
  onSelectProject?: (project: Project) => void;
  initialArtifactId?: string;
}

export const ProjectProcessModal: React.FC<ProjectProcessModalProps> = ({
  project,
  isOpen,
  onClose,
  onSelectProject,
  initialArtifactId
}) => {
  // Expand / Contract modal state
  const [isExpanded, setIsExpanded] = useState(false);
  // View mode: 'stage' (single artifact deep inspect) or 'grid' (overview collage)
  const [viewMode, setViewMode] = useState<'stage' | 'grid'>('stage');
  // Active filter category
  const [activeCategory, setActiveCategory] = useState<string>('all');
  // Zoom level for stage view
  const [zoomLevel, setZoomLevel] = useState<number>(1);
  // Stage canvas theme: 'dark', 'light', 'slate'
  const [stageCanvasTheme, setStageCanvasTheme] = useState<'dark' | 'light'>('dark');
  // Copied link indicator
  const [copiedLink, setCopiedLink] = useState(false);

  // Derive all artifacts for current project (fallback to gallery if processArtifacts not provided)
  const allArtifacts = useMemo<ProcessArtifact[]>(() => {
    if (project.processArtifacts && project.processArtifacts.length > 0) {
      return project.processArtifacts;
    }

    // Auto-generate fallback artifacts from project gallery & thumbnail
    const list: ProcessArtifact[] = [
      {
        id: `${project.id}-thumb`,
        title: `${project.title} Primary Mockup`,
        category: 'mockup',
        categoryLabel: 'Cover Mockup',
        imageUrl: project.thumbnailUrl,
        caption: project.description,
        context: project.details.overview,
        tags: [project.category, 'Hero Mockup'],
        isFeatured: true
      }
    ];

    project.details.gallery.forEach((url, i) => {
      list.push({
        id: `${project.id}-gal-${i}`,
        title: `${project.title} Process Artifact 0${i + 1}`,
        category: i % 2 === 0 ? 'process' : 'mockup',
        categoryLabel: i % 2 === 0 ? 'Process & Study' : 'Applied Mockup',
        imageUrl: url,
        caption: project.details.processSteps?.[i]?.description || `Visual study and developmental iteration for ${project.title}.`,
        context: project.details.processSteps?.[i]?.title || 'Design Process Milestone',
        tags: [project.category, `Stage 0${i + 1}`]
      });
    });

    return list;
  }, [project]);

  // Active artifact ID
  const [activeArtifactId, setActiveArtifactId] = useState<string>(
    initialArtifactId || (allArtifacts[0]?.id ?? '')
  );

  // Update active artifact when project or initialArtifactId changes
  useEffect(() => {
    if (initialArtifactId) {
      setActiveArtifactId(initialArtifactId);
    } else if (allArtifacts.length > 0) {
      setActiveArtifactId(allArtifacts[0].id);
    }
    setZoomLevel(1);
  }, [project, initialArtifactId, allArtifacts]);

  // Categories list
  const categories = useMemo(() => {
    const cats = new Set(allArtifacts.map(a => a.category));
    return ['all', ...Array.from(cats)];
  }, [allArtifacts]);

  // Filtered artifacts
  const filteredArtifacts = useMemo(() => {
    if (activeCategory === 'all') return allArtifacts;
    return allArtifacts.filter(a => a.category === activeCategory);
  }, [allArtifacts, activeCategory]);

  // Find active artifact or fallback to first filtered
  const activeArtifact = useMemo(() => {
    const found = allArtifacts.find(a => a.id === activeArtifactId);
    if (found) return found;
    return filteredArtifacts[0] || allArtifacts[0];
  }, [allArtifacts, activeArtifactId, filteredArtifacts]);

  // Find index in filtered list for previous / next
  const activeIndex = useMemo(() => {
    return filteredArtifacts.findIndex(a => a.id === activeArtifact?.id);
  }, [filteredArtifacts, activeArtifact]);

  // Navigate artifacts
  const goToNextArtifact = useCallback(() => {
    if (filteredArtifacts.length <= 1) return;
    const nextIdx = (activeIndex + 1) % filteredArtifacts.length;
    setActiveArtifactId(filteredArtifacts[nextIdx].id);
    setZoomLevel(1);
  }, [activeIndex, filteredArtifacts]);

  const goToPrevArtifact = useCallback(() => {
    if (filteredArtifacts.length <= 1) return;
    const prevIdx = (activeIndex - 1 + filteredArtifacts.length) % filteredArtifacts.length;
    setActiveArtifactId(filteredArtifacts[prevIdx].id);
    setZoomLevel(1);
  }, [activeIndex, filteredArtifacts]);

  // Project quick switcher (prev/next project in overall portfolio)
  const currentProjectIndex = useMemo(() => {
    return PROJECTS.findIndex(p => p.id === project.id);
  }, [project.id]);

  const goToNextProject = () => {
    if (!onSelectProject) return;
    const nextIndex = (currentProjectIndex + 1) % PROJECTS.length;
    onSelectProject(PROJECTS[nextIndex]);
  };

  const goToPrevProject = () => {
    if (!onSelectProject) return;
    const prevIndex = (currentProjectIndex - 1 + PROJECTS.length) % PROJECTS.length;
    onSelectProject(PROJECTS[prevIndex]);
  };

  // Zoom handlers
  const zoomIn = () => setZoomLevel(prev => Math.min(prev + 0.35, 2.5));
  const zoomOut = () => setZoomLevel(prev => Math.max(prev - 0.35, 0.7));
  const resetZoom = () => setZoomLevel(1);

  // Keyboard navigation & Esc handler
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      } else if (e.key === 'ArrowRight') {
        goToNextArtifact();
      } else if (e.key === 'ArrowLeft') {
        goToPrevArtifact();
      } else if (e.key === 'f' || e.key === 'F') {
        setIsExpanded(prev => !prev);
      } else if (e.key === 'g' || e.key === 'G') {
        setViewMode(prev => prev === 'stage' ? 'grid' : 'stage');
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose, goToNextArtifact, goToPrevArtifact]);

  // Lock body scroll when open
  useEffect(() => {
    if (isOpen) {
      const prevOverflow = document.body.style.overflow;
      document.body.style.overflow = 'hidden';
      return () => {
        document.body.style.overflow = prevOverflow;
      };
    }
  }, [isOpen]);

  const copyImageUrl = () => {
    if (!activeArtifact) return;
    navigator.clipboard.writeText(activeArtifact.imageUrl);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 z-[70] flex items-center justify-center p-2 sm:p-4 md:p-6 bg-charcoal/85 dark:bg-black/90 backdrop-blur-md animate-fadeIn"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
      role="dialog"
      aria-modal="true"
      aria-label={`${project.title} Mockups and Process Studio`}
    >
      {/* EXPANDABLE MODAL CONTAINER */}
      <div 
        className={`relative flex flex-col bg-stone-50 dark:bg-stone-900 border border-stone-200 dark:border-stone-800 shadow-2xl transition-all duration-300 ease-out overflow-hidden ${
          isExpanded 
            ? 'w-full h-full rounded-2xl md:rounded-3xl' 
            : 'w-full max-w-6xl h-[88vh] max-h-[860px] rounded-3xl'
        }`}
      >

        {/* 1. TOP CONTROL BAR */}
        <header className="flex-none px-4 sm:px-6 py-3.5 bg-white/95 dark:bg-stone-950/95 backdrop-blur-md border-b border-stone-200 dark:border-stone-800 flex items-center justify-between gap-3 z-30">
          
          {/* Left: Project identity & Quick switcher */}
          <div className="flex items-center gap-3 min-w-0">
            <div className="flex items-center gap-1.5 p-1 rounded-xl bg-stone-100 dark:bg-stone-900 border border-stone-200 dark:border-stone-800">
              <button
                onClick={goToPrevProject}
                title="Previous Project Process"
                className="p-1 rounded-lg hover:bg-stone-200 dark:hover:bg-stone-800 text-stone-600 dark:text-stone-300 transition-colors"
                aria-label="Previous Project"
              >
                <ChevronLeft size={16} />
              </button>
              <button
                onClick={goToNextProject}
                title="Next Project Process"
                className="p-1 rounded-lg hover:bg-stone-200 dark:hover:bg-stone-800 text-stone-600 dark:text-stone-300 transition-colors"
                aria-label="Next Project"
              >
                <ChevronRight size={16} />
              </button>
            </div>

            <div className="min-w-0">
              <div className="flex items-center gap-2">
                <span className="px-2 py-0.5 rounded-full text-[11px] font-subheading font-medium tracking-wider uppercase bg-coral/10 text-coral dark:bg-coral/20">
                  {project.category}
                </span>
                <span className="text-[12px] font-body text-stone-400 hidden sm:inline">
                  {allArtifacts.length} Visual Artifacts
                </span>
              </div>
              <h3 className="font-heading font-normal text-base sm:text-lg text-charcoal dark:text-white truncate">
                {project.title} <span className="font-subheading text-[13px] text-stone-400 font-normal hidden md:inline">• Process & Mockups</span>
              </h3>
            </div>
          </div>

          {/* Center: View Switcher (Stage vs Grid) */}
          <div className="hidden sm:inline-flex items-center p-1 rounded-xl bg-stone-100 dark:bg-stone-900 border border-stone-200 dark:border-stone-800">
            <button
              onClick={() => setViewMode('stage')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[13px] font-subheading font-medium transition-all ${
                viewMode === 'stage'
                  ? 'bg-white dark:bg-stone-800 text-charcoal dark:text-white shadow-xs'
                  : 'text-stone-500 hover:text-charcoal dark:hover:text-white'
              }`}
            >
              <Eye size={14} className={viewMode === 'stage' ? 'text-coral' : ''} />
              <span>Inspection Stage</span>
            </button>
            <button
              onClick={() => setViewMode('grid')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[13px] font-subheading font-medium transition-all ${
                viewMode === 'grid'
                  ? 'bg-white dark:bg-stone-800 text-charcoal dark:text-white shadow-xs'
                  : 'text-stone-500 hover:text-charcoal dark:hover:text-white'
              }`}
            >
              <Grid size={14} className={viewMode === 'grid' ? 'text-coral' : ''} />
              <span>Curated Grid</span>
            </button>
          </div>

          {/* Right: Expand / Fullscreen & Close */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsExpanded(prev => !prev)}
              className="p-2 rounded-xl bg-stone-100 dark:bg-stone-900 border border-stone-200 dark:border-stone-800 text-stone-600 dark:text-stone-300 hover:text-coral transition-colors"
              title={isExpanded ? "Collapse modal (F)" : "Expand to fullscreen (F)"}
              aria-label={isExpanded ? "Collapse to dialog view" : "Expand to fullscreen view"}
            >
              {isExpanded ? <Minimize2 size={16} /> : <Maximize2 size={16} />}
            </button>

            <button
              onClick={onClose}
              className="p-2 rounded-xl bg-stone-100 dark:bg-stone-900 border border-stone-200 dark:border-stone-800 text-stone-500 hover:text-coral hover:bg-coral/10 hover:rotate-90 transition-all duration-300"
              title="Close modal (Esc)"
              aria-label="Close modal"
            >
              <X size={17} />
            </button>
          </div>

        </header>

        {/* 2. SUBHEADER: CATEGORY FILTER TABS */}
        <div className="flex-none px-4 sm:px-6 py-2.5 bg-stone-100/70 dark:bg-stone-950/60 border-b border-stone-200/80 dark:border-stone-800/80 flex items-center justify-between gap-3 overflow-x-auto scrollbar-none">
          <div className="flex items-center gap-1.5 min-w-max">
            {categories.map(cat => {
              const label = cat === 'all' 
                ? 'All Artifacts' 
                : cat === 'mockup' 
                ? 'Mockups & Layouts' 
                : cat === 'process' 
                ? 'Process & Sketches' 
                : cat === 'system' 
                ? 'Systems & Specs' 
                : 'Editorial Spreads';
              const count = cat === 'all' 
                ? allArtifacts.length 
                : allArtifacts.filter(a => a.category === cat).length;

              return (
                <button
                  key={cat}
                  onClick={() => {
                    setActiveCategory(cat);
                    const matching = cat === 'all' ? allArtifacts : allArtifacts.filter(a => a.category === cat);
                    if (matching.length > 0 && !matching.some(m => m.id === activeArtifactId)) {
                      setActiveArtifactId(matching[0].id);
                    }
                  }}
                  className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-[13px] font-subheading font-medium tracking-wide transition-all ${
                    activeCategory === cat
                      ? 'bg-charcoal text-white dark:bg-white dark:text-stone-900 shadow-xs'
                      : 'bg-white/80 dark:bg-stone-800/60 text-stone-600 dark:text-stone-300 hover:bg-white dark:hover:bg-stone-800 border border-stone-200/80 dark:border-stone-700/80'
                  }`}
                >
                  <span>{label}</span>
                  <span className={`text-[11px] px-1.5 py-0.2 rounded-full ${
                    activeCategory === cat 
                      ? 'bg-white/20 dark:bg-stone-900/20 text-white dark:text-stone-900' 
                      : 'bg-stone-200 dark:bg-stone-700 text-stone-600 dark:text-stone-300'
                  }`}>
                    {count}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Mobile view toggle for stage vs grid */}
          <div className="sm:hidden flex items-center gap-1">
            <button
              onClick={() => setViewMode(prev => prev === 'stage' ? 'grid' : 'stage')}
              className="px-2.5 py-1 rounded-lg text-[13px] font-subheading font-medium bg-white dark:bg-stone-800 border border-stone-200 dark:border-stone-700 text-stone-700 dark:text-stone-200"
            >
              {viewMode === 'stage' ? 'View Grid' : 'View Stage'}
            </button>
          </div>
        </div>

        {/* 3. MAIN CONTENT AREA */}
        <div className="flex-1 min-h-0 relative flex flex-col overflow-hidden">
          
          {/* MODE A: STAGE INSPECTION VIEW */}
          {viewMode === 'stage' && activeArtifact && (
            <div className="flex-1 flex flex-col md:flex-row min-h-0 overflow-hidden">
              
              {/* Left / Center: Interactive Presentation Stage */}
              <div className="flex-1 flex flex-col min-h-0 relative">
                
                {/* Floating Canvas Controls on Stage */}
                <div className="absolute top-3 left-3 sm:left-4 z-20 flex items-center gap-1.5 bg-black/60 dark:bg-stone-900/80 backdrop-blur-md p-1 rounded-xl border border-white/10 shadow-lg text-white">
                  <button
                    onClick={zoomOut}
                    className="p-1.5 rounded-lg hover:bg-white/20 transition-colors"
                    title="Zoom Out"
                    aria-label="Zoom out"
                  >
                    <ZoomOut size={15} />
                  </button>
                  <span className="text-[12px] font-mono px-1">
                    {Math.round(zoomLevel * 100)}%
                  </span>
                  <button
                    onClick={zoomIn}
                    className="p-1.5 rounded-lg hover:bg-white/20 transition-colors"
                    title="Zoom In"
                    aria-label="Zoom in"
                  >
                    <ZoomIn size={15} />
                  </button>
                  <div className="h-4 w-px bg-white/20 mx-0.5"></div>
                  <button
                    onClick={resetZoom}
                    className="p-1.5 rounded-lg hover:bg-white/20 transition-colors"
                    title="Reset Zoom"
                    aria-label="Reset zoom"
                  >
                    <RotateCcw size={14} />
                  </button>
                  <div className="h-4 w-px bg-white/20 mx-0.5"></div>
                  <button
                    onClick={() => setStageCanvasTheme(prev => prev === 'dark' ? 'light' : 'dark')}
                    className="px-2 py-1 text-[11px] font-subheading rounded-md hover:bg-white/20 transition-colors"
                    title="Toggle canvas backdrop"
                  >
                    {stageCanvasTheme === 'dark' ? 'Dark Stage' : 'Light Stage'}
                  </button>
                </div>

                {/* Stage Counter Badge */}
                <div className="absolute top-3 right-3 sm:right-4 z-20 flex items-center gap-2 bg-black/60 dark:bg-stone-900/80 backdrop-blur-md px-3 py-1 rounded-xl border border-white/10 shadow-lg text-white text-[12px] font-mono">
                  <span>{activeIndex + 1} / {filteredArtifacts.length}</span>
                </div>

                {/* Navigation Arrows for Stage */}
                {filteredArtifacts.length > 1 && (
                  <>
                    <button
                      onClick={goToPrevArtifact}
                      className="absolute left-3 top-1/2 -translate-y-1/2 z-20 p-2.5 rounded-full bg-black/60 hover:bg-black/85 text-white backdrop-blur-md border border-white/10 shadow-xl transition-all hover:scale-105 active:scale-95"
                      aria-label="Previous visual artifact"
                    >
                      <ChevronLeft size={20} />
                    </button>
                    <button
                      onClick={goToNextArtifact}
                      className="absolute right-3 top-1/2 -translate-y-1/2 z-20 p-2.5 rounded-full bg-black/60 hover:bg-black/85 text-white backdrop-blur-md border border-white/10 shadow-xl transition-all hover:scale-105 active:scale-95"
                      aria-label="Next visual artifact"
                    >
                      <ChevronRight size={20} />
                    </button>
                  </>
                )}

                {/* Canvas Display Viewport */}
                <div 
                  className={`flex-1 min-h-0 flex items-center justify-center p-4 sm:p-8 overflow-auto transition-colors duration-300 relative select-none ${
                    stageCanvasTheme === 'dark'
                      ? 'bg-stone-950 text-white'
                      : 'bg-stone-100 text-stone-900'
                  }`}
                >
                  <div 
                    className="relative max-w-full max-h-full flex items-center justify-center transition-transform duration-200 ease-out"
                    style={{ transform: `scale(${zoomLevel})` }}
                  >
                    <img 
                      src={activeArtifact.imageUrl} 
                      alt={activeArtifact.title}
                      className="max-h-[62vh] max-w-full object-contain rounded-xl shadow-2xl transition-all duration-300 cursor-zoom-in"
                      onClick={() => setZoomLevel(prev => prev > 1.2 ? 1 : 1.7)}
                    />
                  </div>
                </div>

                {/* Bottom Filmstrip Carousel */}
                <div className="flex-none h-20 sm:h-24 bg-stone-900 dark:bg-black border-t border-stone-800 px-3 sm:px-6 py-2.5 flex items-center gap-3 overflow-x-auto scrollbar-none z-20">
                  <div className="flex items-center gap-2.5 min-w-max mx-auto sm:mx-0">
                    {filteredArtifacts.map((art, idx) => {
                      const isSelected = art.id === activeArtifact.id;
                      return (
                        <button
                          key={art.id}
                          onClick={() => {
                            setActiveArtifactId(art.id);
                            setZoomLevel(1);
                          }}
                          className={`relative h-14 sm:h-16 w-20 sm:w-24 rounded-lg overflow-hidden border-2 transition-all flex-none group ${
                            isSelected
                              ? 'border-coral ring-2 ring-coral/40 scale-105'
                              : 'border-stone-700 opacity-60 hover:opacity-100 hover:border-stone-400'
                          }`}
                          title={art.title}
                        >
                          <img 
                            src={art.imageUrl} 
                            alt={art.title} 
                            className="w-full h-full object-cover" 
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent flex items-end p-1">
                            <span className="text-[10px] font-mono text-white/90 truncate">
                              0{idx + 1}
                            </span>
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>

              </div>

              {/* Right: Detailed Context Drawer */}
              <aside className="w-full md:w-80 lg:w-96 flex-none bg-white dark:bg-stone-900 border-t md:border-t-0 md:border-l border-stone-200 dark:border-stone-800 p-5 sm:p-6 overflow-y-auto flex flex-col justify-between gap-6 custom-scrollbar">
                
                <div className="space-y-4">
                  {/* Category Pill and Dimensions */}
                  <div className="flex items-center justify-between gap-2">
                    <span className="px-2.5 py-1 rounded-md text-[11px] font-subheading font-medium uppercase tracking-wider bg-coral/10 text-coral dark:bg-coral/20">
                      {activeArtifact.categoryLabel}
                    </span>
                    {activeArtifact.dimensions && (
                      <span className="text-[12px] font-mono text-stone-400">
                        {activeArtifact.dimensions}
                      </span>
                    )}
                  </div>

                  {/* Title */}
                  <h4 className="font-heading font-normal text-xl text-charcoal dark:text-white leading-snug">
                    {activeArtifact.title}
                  </h4>

                  {/* Caption */}
                  <p className="text-[13px] font-body font-normal text-stone-600 dark:text-stone-300 leading-relaxed">
                    {activeArtifact.caption}
                  </p>

                  {/* Context & Rationale */}
                  {activeArtifact.context && (
                    <div className="rounded-2xl p-4 bg-stone-50 dark:bg-stone-800/60 border border-stone-200 dark:border-stone-700/60 space-y-2">
                      <div className="flex items-center gap-1.5 text-stone-500 dark:text-stone-400 text-[12px] font-subheading font-medium uppercase tracking-wider">
                        <Info size={13} className="text-coral" />
                        <span>Design Context & Rationale</span>
                      </div>
                      <p className="text-[13px] font-body text-stone-600 dark:text-stone-300 leading-relaxed">
                        {activeArtifact.context}
                      </p>
                    </div>
                  )}

                  {/* Tags */}
                  {activeArtifact.tags && activeArtifact.tags.length > 0 && (
                    <div className="space-y-2 pt-2">
                      <span className="text-[11px] font-subheading uppercase tracking-wider text-stone-400 block">
                        Artifact Tags
                      </span>
                      <div className="flex flex-wrap gap-1.5">
                        {activeArtifact.tags.map(tag => (
                          <span 
                            key={tag}
                            className="px-2.5 py-1 rounded-lg text-[12px] font-body bg-stone-100 dark:bg-stone-800 text-stone-600 dark:text-stone-300"
                          >
                            #{tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                {/* Bottom Actions */}
                <div className="pt-4 border-t border-stone-100 dark:border-stone-800 flex flex-col gap-2">
                  <div className="flex items-center gap-2">
                    <a
                      href={activeArtifact.imageUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 flex items-center justify-center gap-2 py-2 px-3 rounded-xl bg-charcoal text-white dark:bg-white dark:text-stone-900 text-[13px] font-subheading font-medium hover:opacity-90 transition-opacity"
                    >
                      <ExternalLink size={14} />
                      <span>Open Full Size</span>
                    </a>
                    
                    <button
                      onClick={copyImageUrl}
                      className="p-2 rounded-xl border border-stone-200 dark:border-stone-700 hover:bg-stone-100 dark:hover:bg-stone-800 text-stone-600 dark:text-stone-300 transition-colors"
                      title="Copy asset link"
                      aria-label="Copy image link"
                    >
                      {copiedLink ? <Check size={16} className="text-emerald-500" /> : <Download size={16} />}
                    </button>
                  </div>
                  
                  <p className="text-[11px] text-center text-stone-400 font-body">
                    Tip: Use <kbd className="px-1 py-0.5 rounded bg-stone-100 dark:bg-stone-800 border border-stone-300 dark:border-stone-700">←</kbd> <kbd className="px-1 py-0.5 rounded bg-stone-100 dark:bg-stone-800 border border-stone-300 dark:border-stone-700">→</kbd> to cycle, <kbd className="px-1 py-0.5 rounded bg-stone-100 dark:bg-stone-800 border border-stone-300 dark:border-stone-700">F</kbd> for fullscreen
                  </p>
                </div>

              </aside>

            </div>
          )}

          {/* MODE B: CURATED GRID VIEW */}
          {viewMode === 'grid' && (
            <div className="flex-1 p-4 sm:p-6 md:p-8 overflow-y-auto custom-scrollbar">
              <div className="max-w-6xl mx-auto space-y-6">
                
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-stone-200 dark:border-stone-800 pb-4">
                  <div>
                    <h4 className="font-heading font-normal text-2xl text-charcoal dark:text-white">
                      Curated Artifact Gallery
                    </h4>
                    <p className="text-[13px] font-body text-stone-500">
                      Showing {filteredArtifacts.length} mockups, sketches, and design system components for {project.title}
                    </p>
                  </div>
                  <button
                    onClick={() => setViewMode('stage')}
                    className="self-start sm:self-auto px-4 py-2 rounded-full bg-coral text-white text-[13px] font-subheading font-medium hover:bg-coral/90 shadow-xs flex items-center gap-1.5 transition-all"
                  >
                    <Eye size={14} />
                    <span>Open in Inspection Stage</span>
                  </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredArtifacts.map((artifact, index) => (
                    <div
                      key={artifact.id}
                      onClick={() => {
                        setActiveArtifactId(artifact.id);
                        setViewMode('stage');
                      }}
                      className="group cursor-pointer rounded-2xl overflow-hidden bg-white dark:bg-stone-800/80 border border-stone-200 dark:border-stone-700/80 shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1 flex flex-col"
                    >
                      <div className="relative aspect-[4/3] overflow-hidden bg-stone-100 dark:bg-stone-900">
                        <img 
                          src={artifact.imageUrl} 
                          alt={artifact.title} 
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                        <div className="absolute top-3 left-3">
                          <span className="px-2.5 py-1 rounded-full text-[11px] font-subheading font-medium uppercase tracking-wider bg-black/60 text-white backdrop-blur-md">
                            {artifact.categoryLabel}
                          </span>
                        </div>
                        <div className="absolute inset-0 bg-charcoal/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                          <span className="px-4 py-2 rounded-full bg-white text-charcoal text-[13px] font-subheading font-medium shadow-lg transform translate-y-2 group-hover:translate-y-0 transition-transform">
                            Inspect Artifact
                          </span>
                        </div>
                      </div>

                      <div className="p-4 flex-1 flex flex-col justify-between gap-2">
                        <div>
                          <div className="flex items-center justify-between gap-2 text-[11px] font-mono text-stone-400 mb-1">
                            <span>Artifact #{index + 1}</span>
                            {artifact.dimensions && <span>{artifact.dimensions}</span>}
                          </div>
                          <h5 className="font-heading font-normal text-base text-charcoal dark:text-white group-hover:text-coral transition-colors line-clamp-1">
                            {artifact.title}
                          </h5>
                          <p className="text-[13px] font-body text-stone-500 line-clamp-2 mt-1">
                            {artifact.caption}
                          </p>
                        </div>

                        {artifact.tags && (
                          <div className="flex flex-wrap gap-1 mt-2">
                            {artifact.tags.slice(0, 3).map(tag => (
                              <span key={tag} className="text-[11px] px-2 py-0.5 rounded bg-stone-100 dark:bg-stone-700/60 text-stone-600 dark:text-stone-300">
                                {tag}
                              </span>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>

              </div>
            </div>
          )}

        </div>

      </div>
    </div>
  );
};

export default ProjectProcessModal;
