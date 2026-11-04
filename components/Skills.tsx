import React from 'react';
import { SKILL_CATEGORIES } from '../constants';
import {
  PenTool,
  Layout,
  Globe,
  Code,
  Image as ImageIcon,
  Palette,
  MessageSquare,
  Sparkles,
  Bot,
  Cpu,
  Wand2,
  Layers,
  Heart,
  Flame,
  Volume2,
  BookOpen,
  Brain,
  TrendingUp,
  Clock,
  Award,
  Users,
  Sliders,
  Type as TypeIcon,
  Smartphone,
  Grid,
  Zap,
  Compass,
  Search,
  UserCheck,
  Share2,
  Play,
  FileCode,
} from 'lucide-react';

const Skills: React.FC = () => {
  const marqueeCategories = [
    {
      id: 'software',
      index: '01',
      badge: 'Software & Production Stack',
      direction: 'animate-marquee-left',
      speedStyle: { animationDuration: '34s' },
      skills: SKILL_CATEGORIES.find((c) => c.title === 'Software')?.skills || [],
    },
    {
      id: 'technical',
      index: '02',
      badge: 'Systems, Product & UI/UX Architecture',
      direction: 'animate-marquee-right',
      speedStyle: { animationDuration: '46s' },
      skills: SKILL_CATEGORIES.find((c) => c.title === 'Technical')?.skills || [],
    },
    {
      id: 'ai',
      index: '03',
      badge: 'Generative & Exploratory Workflows',
      direction: 'animate-marquee-left',
      speedStyle: { animationDuration: '38s' },
      skills: SKILL_CATEGORIES.find((c) => c.title.includes('AI'))?.skills || [],
    },
    {
      id: 'soft',
      index: '04',
      badge: 'Research, Strategy & Collaboration',
      direction: 'animate-marquee-right',
      speedStyle: { animationDuration: '32s' },
      skills: SKILL_CATEGORIES.find((c) => c.title.includes('Soft'))?.skills || [],
    },
  ];

  const getSkillIcon = (name: string) => {
    const lower = name.toLowerCase();
    if (lower.includes('figma')) return <PenTool size={15} />;
    if (lower.includes('framer')) return <Layout size={15} />;
    if (lower.includes('wordpress')) return <Globe size={15} />;
    if (lower.includes('html') || lower.includes('css')) return <Code size={15} />;
    if (lower.includes('photoshop')) return <ImageIcon size={15} />;
    if (lower.includes('illustrator')) return <Palette size={15} />;
    if (lower.includes('chatgpt')) return <MessageSquare size={15} />;
    if (lower.includes('gemini')) return <Sparkles size={15} />;
    if (lower.includes('claude')) return <Bot size={15} />;
    if (lower.includes('ai studio') || lower.includes('google ai')) return <Cpu size={15} />;
    if (lower.includes('canva')) return <Palette size={15} />;
    if (lower.includes('make')) return <Wand2 size={15} />;
    if (lower.includes('stitch')) return <Layers size={15} />;
    if (lower.includes('lovable')) return <Heart size={15} />;
    if (lower.includes('leonardo')) return <ImageIcon size={15} />;
    if (lower.includes('firefly')) return <Flame size={15} />;
    if (lower.includes('eleven')) return <Volume2 size={15} />;
    if (lower.includes('notebook')) return <BookOpen size={15} />;
    if (lower.includes('critical')) return <Brain size={15} />;
    if (lower.includes('analytical')) return <TrendingUp size={15} />;
    if (lower.includes('time')) return <Clock size={15} />;
    if (lower.includes('leadership')) return <Award size={15} />;
    if (lower.includes('team') || lower.includes('coordination')) return <Users size={15} />;
    if (lower.includes('saas') || lower.includes('dashboard')) return <Layout size={15} />;
    if (lower.includes('user centric')) return <Heart size={15} />;
    if (lower.includes('user interface') || lower.includes('(ui)')) return <Sliders size={15} />;
    if (lower.includes('hierarchy') || lower.includes('layout')) return <Layers size={15} />;
    if (lower.includes('typography') || lower.includes('colour')) return <TypeIcon size={15} />;
    if (lower.includes('responsive')) return <Smartphone size={15} />;
    if (lower.includes('grid') || lower.includes('spacing')) return <Grid size={15} />;
    if (lower.includes('interaction')) return <Zap size={15} />;
    if (lower.includes('journey')) return <Compass size={15} />;
    if (lower.includes('architecture') || lower.includes('flows')) return <TrendingUp size={15} />;
    if (lower.includes('wireframing')) return <FileCode size={15} />;
    if (lower.includes('prototyping') && lower.includes('interactive')) return <Play size={15} />;
    if (lower.includes('prototyping')) return <Layers size={15} />;
    if (lower.includes('design systems')) return <Sliders size={15} />;
    if (lower.includes('competitor')) return <Search size={15} />;
    if (lower.includes('persona')) return <UserCheck size={15} />;
    if (lower.includes('affinity')) return <Share2 size={15} />;
    return <Zap size={15} />;
  };

  const getInfiniteLoopItems = (items: (typeof SKILL_CATEGORIES)[0]['skills']) => {
    if (items.length < 8) {
      return [...items, ...items, ...items, ...items];
    }
    return [...items, ...items];
  };

  return (
    <section
      id="skills"
      className="py-24 md:py-28 bg-white dark:bg-stone-950 transition-colors duration-300 relative overflow-hidden border-t border-stone-200/80 dark:border-stone-800/80"
    >
      <div className="max-w-7xl mx-auto px-6 mb-12">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-7 border-b border-stone-200 dark:border-stone-800">
          <div>
            <p className="font-mono text-xs uppercase tracking-widest text-coral mb-2">
              Capabilities &amp; Methods
            </p>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-editorial font-normal text-charcoal dark:text-white tracking-tight">
              Tools, systems &amp; <span className="italic text-coral">craft.</span>
            </h2>
          </div>

          <p className="text-xs sm:text-sm font-clean text-stone-500 dark:text-stone-400 max-w-sm">
            Hover over any capability stream to pause and inspect methods across research, UX
            systems, and visual production.
          </p>
        </div>
      </div>

      <div className="space-y-7 relative">
        <div className="pointer-events-none absolute left-0 top-0 bottom-0 w-16 sm:w-28 md:w-40 bg-gradient-to-r from-white dark:from-stone-950 to-transparent z-20" />
        <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-16 sm:w-28 md:w-40 bg-gradient-to-l from-white dark:from-stone-950 to-transparent z-20" />

        {marqueeCategories.map((catRow) => {
          const infiniteItems = getInfiniteLoopItems(catRow.skills);

          return (
            <div key={catRow.id} className="relative marquee-pause">
              <div className="max-w-7xl mx-auto px-6 mb-2.5 flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-stone-500 dark:text-stone-400">
                <span className="text-coral">{catRow.index}</span>
                <span aria-hidden="true">·</span>
                <span>{catRow.badge}</span>
              </div>

              <div className="overflow-hidden flex py-1">
                <div className={`${catRow.direction} gap-3`} style={catRow.speedStyle}>
                  {infiniteItems.map((skill, idx) => (
                    <div
                      key={`${catRow.id}-${skill.name}-${idx}`}
                      className="inline-flex items-center gap-2.5 px-4 py-2.5 rounded-xl bg-[#FAF8F6] dark:bg-stone-900 border border-stone-200/90 dark:border-stone-800 hover:border-coral/60 dark:hover:border-coral/60 transition-colors cursor-default shrink-0 group/card"
                    >
                      <span className="text-stone-500 dark:text-stone-400 group-hover/card:text-coral transition-colors shrink-0">
                        {getSkillIcon(skill.name)}
                      </span>
                      <span className="text-xs sm:text-sm font-clean font-medium text-charcoal dark:text-stone-200 whitespace-nowrap">
                        {skill.name}
                      </span>
                    </div>
                  ))}
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
