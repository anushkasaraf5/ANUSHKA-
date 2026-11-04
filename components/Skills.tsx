import React from 'react';
import { SKILL_CATEGORIES } from '../constants';
import { 
  PenTool, Layout, Globe, Code, Image as ImageIcon, Palette, 
  MessageSquare, Sparkles, Bot, Cpu, Wand2, Layers, Heart, 
  Flame, Volume2, BookOpen, Brain, TrendingUp, Clock, Award, 
  Users, Sliders, Type as TypeIcon, Smartphone, Grid, Zap, 
  Compass, Search, UserCheck, Share2, Play, FileCode
} from 'lucide-react';

const Skills: React.FC = () => {
  // Categories with custom marquee direction, speed, and accent styling
  const marqueeCategories = [
    {
      id: 'software',
      title: 'Software & Production Tools',
      badge: 'Software Stack',
      direction: 'animate-marquee-left',
      speedStyle: { animationDuration: '32s' },
      accent: 'text-lavender',
      dotColor: 'bg-lavender',
      skills: SKILL_CATEGORIES.find(c => c.title === 'Software')?.skills || []
    },
    {
      id: 'ai',
      title: 'AI & Generative Tools',
      badge: 'Generative AI',
      direction: 'animate-marquee-right',
      speedStyle: { animationDuration: '38s' },
      accent: 'text-sky-400',
      dotColor: 'bg-sky-400',
      skills: SKILL_CATEGORIES.find(c => c.title.includes('AI'))?.skills || []
    },
    {
      id: 'technical',
      title: 'Technical & UI/UX Design',
      badge: 'Product & UX',
      direction: 'animate-marquee-left',
      speedStyle: { animationDuration: '48s' },
      accent: 'text-coral',
      dotColor: 'bg-coral',
      skills: SKILL_CATEGORIES.find(c => c.title === 'Technical')?.skills || []
    },
    {
      id: 'soft',
      title: 'Soft Competencies & Leadership',
      badge: 'Strategy & Leadership',
      direction: 'animate-marquee-right',
      speedStyle: { animationDuration: '30s' },
      accent: 'text-amber-500',
      dotColor: 'bg-amber-500',
      skills: SKILL_CATEGORIES.find(c => c.title.includes('Soft'))?.skills || []
    }
  ];

  // Specific icon for every skill
  const getSkillIcon = (name: string) => {
    const lower = name.toLowerCase();

    // Software
    if (lower.includes('figma')) return <PenTool size={16} />;
    if (lower.includes('framer')) return <Layout size={16} />;
    if (lower.includes('wordpress')) return <Globe size={16} />;
    if (lower.includes('html') || lower.includes('css')) return <Code size={16} />;
    if (lower.includes('photoshop')) return <ImageIcon size={16} />;
    if (lower.includes('illustrator')) return <Palette size={16} />;

    // AI & Gen Tools
    if (lower.includes('chatgpt')) return <MessageSquare size={16} />;
    if (lower.includes('gemini')) return <Sparkles size={16} />;
    if (lower.includes('claude')) return <Bot size={16} />;
    if (lower.includes('ai studio') || lower.includes('google ai')) return <Cpu size={16} />;
    if (lower.includes('canva')) return <Palette size={16} />;
    if (lower.includes('make')) return <Wand2 size={16} />;
    if (lower.includes('stitch')) return <Layers size={16} />;
    if (lower.includes('lovable')) return <Heart size={16} />;
    if (lower.includes('leonardo')) return <ImageIcon size={16} />;
    if (lower.includes('firefly')) return <Flame size={16} />;
    if (lower.includes('eleven')) return <Volume2 size={16} />;
    if (lower.includes('notebook')) return <BookOpen size={16} />;

    // Soft competencies
    if (lower.includes('critical')) return <Brain size={16} />;
    if (lower.includes('analytical')) return <TrendingUp size={16} />;
    if (lower.includes('time')) return <Clock size={16} />;
    if (lower.includes('leadership')) return <Award size={16} />;
    if (lower.includes('team') || lower.includes('coordination')) return <Users size={16} />;

    // Technical
    if (lower.includes('saas') || lower.includes('dashboard')) return <Layout size={16} />;
    if (lower.includes('user centric')) return <Heart size={16} />;
    if (lower.includes('user interface') || lower.includes('(ui)')) return <Sliders size={16} />;
    if (lower.includes('hierarchy') || lower.includes('layout')) return <Layers size={16} />;
    if (lower.includes('typography') || lower.includes('colour')) return <TypeIcon size={16} />;
    if (lower.includes('responsive')) return <Smartphone size={16} />;
    if (lower.includes('grid') || lower.includes('spacing')) return <Grid size={16} />;
    if (lower.includes('interaction')) return <Zap size={16} />;
    if (lower.includes('journey')) return <Compass size={16} />;
    if (lower.includes('architecture') || lower.includes('flows')) return <TrendingUp size={16} />;
    if (lower.includes('wireframing')) return <FileCode size={16} />;
    if (lower.includes('prototyping') && lower.includes('interactive')) return <Play size={16} />;
    if (lower.includes('prototyping')) return <Layers size={16} />;
    if (lower.includes('design systems')) return <Sliders size={16} />;
    if (lower.includes('competitor')) return <Search size={16} />;
    if (lower.includes('persona')) return <UserCheck size={16} />;
    if (lower.includes('affinity')) return <Share2 size={16} />;

    return <Zap size={16} />;
  };

  // Helper to multiply items for infinite continuous loop
  const getInfiniteLoopItems = (items: typeof SKILL_CATEGORIES[0]['skills']) => {
    // Duplicate sufficiently so the width exceeds screens and -50% loop is seamless
    if (items.length < 8) {
      return [...items, ...items, ...items, ...items];
    }
    return [...items, ...items];
  };

  return (
    <section id="skills" className="py-24 md:py-32 bg-cream dark:bg-stone-950 transition-colors duration-300 relative overflow-hidden">
      
      {/* Background Ambience */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[800px] h-[350px] bg-gradient-to-r from-coral/10 via-lavender/10 to-sky-400/10 dark:from-coral/5 dark:via-lavender/5 dark:to-sky-400/5 rounded-full blur-[140px] pointer-events-none opacity-60"></div>

      <div className="container mx-auto px-6 relative z-10 max-w-7xl mb-12">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-8 border-b border-stone-200/80 dark:border-stone-800">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <span className="w-2 h-2 rounded-full bg-coral animate-ping"></span>
              <h2 className="text-[13px] font-highlight font-medium tracking-widest uppercase text-coral dark:text-coral">
                Capabilities & Stack
              </h2>
            </div>
            <h3 className="text-3xl sm:text-4xl md:text-5xl font-heading font-normal text-charcoal dark:text-white tracking-tight">
              Tools & <span className="italic text-coral font-heading">Technologies.</span>
            </h3>
          </div>
          
          <p className="text-[13px] sm:text-sm font-body font-normal text-neutral-gray dark:text-stone-400 max-w-sm">
            Hover over any track to pause the stream and inspect specific capabilities.
          </p>
        </div>

      </div>

      {/* MARQUEE TRACKS CONTAINER (Full width, sleek & low height) */}
      <div className="space-y-7 md:space-y-9 relative">
        
        {/* Left & Right Gradient Horizon Fade Masks */}
        <div className="pointer-events-none absolute left-0 top-0 bottom-0 w-20 sm:w-32 md:w-48 bg-gradient-to-r from-cream dark:from-stone-950 to-transparent z-20"></div>
        <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-20 sm:w-32 md:w-48 bg-gradient-to-l from-cream dark:from-stone-950 to-transparent z-20"></div>

        {marqueeCategories.map((catRow) => {
          const infiniteItems = getInfiniteLoopItems(catRow.skills);

          return (
            <div key={catRow.id} className="relative marquee-pause group">
              
              {/* Category Label Strip */}
              <div className="container mx-auto px-6 mb-2.5 max-w-7xl flex items-center gap-2">
                <span className={`w-1.5 h-1.5 rounded-full ${catRow.dotColor}`}></span>
                <span className="font-mono text-[13px] font-medium uppercase tracking-wider text-stone-500 dark:text-stone-400">
                  {catRow.badge}
                </span>
              </div>

              {/* Infinite Scrolling Track */}
              <div className="overflow-hidden flex py-1">
                <div 
                  className={`${catRow.direction} gap-3 sm:gap-4`}
                  style={catRow.speedStyle}
                >
                  {infiniteItems.map((skill, idx) => {
                    const icon = getSkillIcon(skill.name);

                    return (
                      <div
                        key={`${catRow.id}-${skill.name}-${idx}`}
                        className="inline-flex items-center gap-2.5 sm:gap-3 px-4 sm:px-5 py-2.5 sm:py-3 rounded-2xl bg-white dark:bg-stone-900 border border-stone-200/90 dark:border-stone-800/90 shadow-sm hover:shadow-lg hover:border-coral/50 dark:hover:border-coral/50 hover:-translate-y-0.5 transition-all duration-200 cursor-default shrink-0 group/card"
                      >
                        <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-stone-100 dark:bg-stone-800 text-stone-600 dark:text-stone-300 flex items-center justify-center shrink-0 group-hover/card:bg-coral group-hover/card:text-white transition-colors duration-200">
                          {icon}
                        </div>
                        <span className="text-[13px] sm:text-sm font-medium text-charcoal dark:text-stone-200 group-hover/card:text-coral dark:group-hover/card:text-coral transition-colors duration-200 whitespace-nowrap">
                          {skill.name}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>

            </div>
          );
        })}

      </div>

    </section>
  );
};

export default Skills;
