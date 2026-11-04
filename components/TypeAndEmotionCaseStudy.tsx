import React, { useState } from 'react';
import { Project } from '../types';
import { 
  ZoomIn, ArrowRight, Eye, BookOpen, Users, Compass, Target, 
  Activity, Quote, Layers, Palette, Lightbulb, ExternalLink, 
  Sparkles, ChevronDown, CheckCircle2, AlertCircle, FileText, 
  Sliders, Search, LayoutGrid, Info, ArrowUpRight, Maximize2, 
  BarChart2, BarChart3, PieChart, Tag, RefreshCw, MapPin, 
  Calendar, Award, HeartHandshake, EyeOff, Check, UserCheck,
  TrendingUp, SplitSquareVertical, Camera, ArrowRightCircle
} from 'lucide-react';
import { RevealOnScroll } from './RevealOnScroll';
import { ParallaxImage } from './ParallaxImage';

interface TypeAndEmotionProps {
  project: Project;
  setViewingImage: (url: string) => void;
  onNavigateProject?: (projectId: string) => void;
}

// --------------------------------------------------------------------------
// BESPOKE SVG DONUT CHART (Compact & Responsive in Coral & Lavender)
// --------------------------------------------------------------------------
interface DonutSegment {
  label: string;
  percent: number;
  color: string;
  hoverColor: string;
  count?: number;
}

const CustomSvgDonut: React.FC<{
  data: DonutSegment[];
  activeIdx: number | null;
  onHover: (idx: number | null) => void;
  centerTitle?: string;
  centerSubtitle?: string;
}> = ({ data, activeIdx, onHover, centerTitle, centerSubtitle }) => {
  const size = 220;
  const strokeWidth = 28;
  const radius = (size - strokeWidth) / 2;
  const center = size / 2;
  const circumference = 2 * Math.PI * radius;

  let accumulatedPercent = 0;
  const segments = data.map((item, index) => {
    const strokeDasharray = `${(item.percent / 100) * circumference} ${circumference}`;
    const strokeDashoffset = -((accumulatedPercent / 100) * circumference);
    accumulatedPercent += item.percent;
    return {
      ...item,
      strokeDasharray,
      strokeDashoffset,
      index
    };
  });

  const activeItem = activeIdx !== null ? data[activeIdx] : null;

  return (
    <div className="relative flex flex-col items-center justify-center shrink-0">
      <svg 
        width={size} 
        height={size} 
        viewBox={`0 0 ${size} ${size}`} 
        className="transform -rotate-90 filter drop-shadow-xs transition-transform duration-500"
      >
        <circle
          cx={center}
          cy={center}
          r={radius}
          fill="none"
          stroke="currentColor"
          strokeWidth={strokeWidth}
          className="text-stone-100 dark:text-stone-800"
        />

        {segments.map((seg) => {
          const isSelected = activeIdx === seg.index;
          return (
            <circle
              key={seg.label}
              cx={center}
              cy={center}
              r={radius}
              fill="none"
              stroke={seg.color}
              strokeWidth={isSelected ? strokeWidth + 6 : strokeWidth}
              strokeDasharray={seg.strokeDasharray}
              strokeDashoffset={seg.strokeDashoffset}
              strokeLinecap="round"
              className="cursor-pointer transition-all duration-300 hover:opacity-95"
              onMouseEnter={() => onHover(seg.index)}
              onMouseLeave={() => onHover(null)}
              style={{
                filter: isSelected ? 'drop-shadow(0 4px 8px rgba(255, 51, 102, 0.3))' : undefined,
                transition: 'stroke-width 0.2s ease, filter 0.2s ease'
              }}
            />
          );
        })}
      </svg>

      {/* Center Readout Overlay */}
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center pointer-events-none px-4">
        {activeItem ? (
          <div className="animate-fadeIn space-y-0.5">
            <span className="text-2xl sm:text-3xl font-heading font-normal text-charcoal dark:text-white tabular-nums tracking-tight">
              {activeItem.percent}%
            </span>
            <span className="block text-[11px] font-subheading font-medium text-coral line-clamp-2 max-w-[130px]">
              {activeItem.label}
            </span>
          </div>
        ) : (
          <div className="space-y-0.5">
            <span className="text-xl sm:text-2xl font-heading font-normal text-charcoal dark:text-white tabular-nums">
              {centerTitle || "N=47"}
            </span>
            <span className="block text-[11px] font-subheading text-stone-500 dark:text-stone-400">
              {centerSubtitle || "Responses"}
            </span>
            <span className="block text-[10px] font-subheading text-coral font-medium uppercase tracking-wider">
              Hover Slices
            </span>
          </div>
        )}
      </div>
    </div>
  );
};

// --------------------------------------------------------------------------
// BESPOKE SVG RADAR / SPIDER COMPASS CHART FOR USER PERSONAS
// --------------------------------------------------------------------------
interface RadarDimension {
  name: string;
  shortName: string;
  youth: number;
  senior: number;
  delta: string;
  insight: string;
}

const PERSONA_RADAR_DIMENSIONS: RadarDimension[] = [
  {
    name: "Abstraction Tolerance",
    shortName: "Abstraction",
    youth: 92,
    senior: 18,
    delta: "+74% Youth",
    insight: "Youth celebrate ambiguous glyphs and distortion; older readers experience quick cognitive fatigue."
  },
  {
    name: "Baseline & Shirorekha Sanctity",
    shortName: "Baseline",
    youth: 24,
    senior: 94,
    delta: "+70% Senior",
    insight: "Seniors require unbroken shirorekha and horizontal alignment for emotional trust."
  },
  {
    name: "Subconscious Projection",
    shortName: "Projection",
    youth: 88,
    senior: 22,
    delta: "+66% Youth",
    insight: "Youth project personal angst into unfamiliar scripts without needing semantics."
  },
  {
    name: "Heritage Scaffolding",
    shortName: "Heritage",
    youth: 36,
    senior: 90,
    delta: "+54% Senior",
    insight: "Seniors need traditional cultural anchors (temple bells, block prints) for psychological comfort."
  },
  {
    name: "Semantic Reading Need",
    shortName: "Semantics",
    youth: 18,
    senior: 86,
    delta: "+68% Senior",
    insight: "Seniors require literal reading comprehension; youth connect purely visually."
  }
];

const PersonaRadarChart: React.FC<{
  activeArchetype: 'all' | 'explorer' | 'custodian';
  activeDimension: number | null;
  onHoverDimension: (idx: number | null) => void;
}> = ({ activeArchetype, activeDimension, onHoverDimension }) => {
  const size = 300;
  const center = size / 2;
  const radius = 95;
  const total = PERSONA_RADAR_DIMENSIONS.length;

  const getCoordinates = (value: number, index: number) => {
    const angle = -Math.PI / 2 + (index * (2 * Math.PI / total));
    const r = (value / 100) * radius;
    const x = center + r * Math.cos(angle);
    const y = center + r * Math.sin(angle);
    return { x, y, angle };
  };

  // Concentric polygon web rings (20%, 40%, 60%, 80%, 100%)
  const rings = [0.25, 0.5, 0.75, 1.0];

  const ringPolygons = rings.map((level) => {
    return PERSONA_RADAR_DIMENSIONS.map((_, i) => {
      const { x, y } = getCoordinates(level * 100, i);
      return `${x},${y}`;
    }).join(' ');
  });

  // Youth polygon (Coral)
  const youthPoints = PERSONA_RADAR_DIMENSIONS.map((dim, i) => {
    const { x, y } = getCoordinates(dim.youth, i);
    return `${x},${y}`;
  }).join(' ');

  // Senior polygon (Lavender)
  const seniorPoints = PERSONA_RADAR_DIMENSIONS.map((dim, i) => {
    const { x, y } = getCoordinates(dim.senior, i);
    return `${x},${y}`;
  }).join(' ');

  const showYouth = activeArchetype === 'all' || activeArchetype === 'explorer';
  const showSenior = activeArchetype === 'all' || activeArchetype === 'custodian';

  return (
    <div className="relative flex flex-col items-center justify-center">
      <svg 
        width={size} 
        height={size} 
        viewBox={`0 0 ${size} ${size}`} 
        className="overflow-visible select-none max-w-full"
      >
        {/* Web Rings */}
        {ringPolygons.map((pts, idx) => (
          <polygon
            key={idx}
            points={pts}
            fill="none"
            stroke="currentColor"
            strokeWidth={idx === rings.length - 1 ? 1.5 : 0.8}
            className="text-stone-200 dark:text-stone-800"
            strokeDasharray={idx < rings.length - 1 ? "3 3" : undefined}
          />
        ))}

        {/* Radial Spokes */}
        {PERSONA_RADAR_DIMENSIONS.map((_, i) => {
          const { x, y } = getCoordinates(100, i);
          const isSelected = activeDimension === i;
          return (
            <line
              key={i}
              x1={center}
              y1={center}
              x2={x}
              y2={y}
              stroke="currentColor"
              strokeWidth={isSelected ? 2 : 0.8}
              className={isSelected ? "text-coral" : "text-stone-200 dark:text-stone-800"}
            />
          );
        })}

        {/* Senior Polygon (Lavender) */}
        {showSenior && (
          <polygon
            points={seniorPoints}
            fill="#8B7CFF"
            fillOpacity={activeArchetype === 'custodian' ? 0.38 : 0.22}
            stroke="#8B7CFF"
            strokeWidth={activeArchetype === 'custodian' ? 3 : 2}
            className="transition-all duration-300"
          />
        )}

        {/* Youth Polygon (Coral) */}
        {showYouth && (
          <polygon
            points={youthPoints}
            fill="#FF3366"
            fillOpacity={activeArchetype === 'explorer' ? 0.38 : 0.22}
            stroke="#FF3366"
            strokeWidth={activeArchetype === 'explorer' ? 3 : 2}
            className="transition-all duration-300"
          />
        )}

        {/* Interactive Vertex Dots & Outer Labels */}
        {PERSONA_RADAR_DIMENSIONS.map((dim, i) => {
          const youthCoord = getCoordinates(dim.youth, i);
          const seniorCoord = getCoordinates(dim.senior, i);
          const outerCoord = getCoordinates(126, i);
          const isHovered = activeDimension === i;

          return (
            <g 
              key={i} 
              className="cursor-pointer"
              onMouseEnter={() => onHoverDimension(i)}
              onMouseLeave={() => onHoverDimension(null)}
            >
              {/* Senior Anchor Dot */}
              {showSenior && (
                <circle
                  cx={seniorCoord.x}
                  cy={seniorCoord.y}
                  r={isHovered ? 5.5 : 4}
                  fill="#8B7CFF"
                  stroke="#FFFFFF"
                  strokeWidth={1.5}
                  className="transition-all duration-200"
                />
              )}

              {/* Youth Anchor Dot */}
              {showYouth && (
                <circle
                  cx={youthCoord.x}
                  cy={youthCoord.y}
                  r={isHovered ? 5.5 : 4}
                  fill="#FF3366"
                  stroke="#FFFFFF"
                  strokeWidth={1.5}
                  className="transition-all duration-200"
                />
              )}

              {/* Outer Dimension Label */}
              <text
                x={outerCoord.x}
                y={outerCoord.y}
                textAnchor="middle"
                dominantBaseline="central"
                className={`text-[10px] font-subheading transition-colors font-medium ${
                  isHovered 
                    ? 'fill-coral font-bold' 
                    : 'fill-stone-600 dark:fill-stone-400'
                }`}
              >
                {dim.shortName}
              </text>
            </g>
          );
        })}
      </svg>
    </div>
  );
};

// --------------------------------------------------------------------------
// MAIN COMPONENT
// --------------------------------------------------------------------------
export const TypeAndEmotionCaseStudy: React.FC<TypeAndEmotionProps> = ({ 
  project, 
  setViewingImage,
  onNavigateProject 
}) => {
  // Navigation & interaction states
  const [activeScriptIdx, setActiveScriptIdx] = useState<number>(0);
  const [activeSurveyQ, setActiveSurveyQ] = useState<number>(0);
  const [activeHoverSlice, setActiveHoverSlice] = useState<number | null>(null);
  const [activeCognitiveLens, setActiveCognitiveLens] = useState<'youth' | 'senior'>('youth');
  const [activeArchetype, setActiveArchetype] = useState<'all' | 'explorer' | 'custodian'>('all');
  const [activeRadarDimension, setActiveRadarDimension] = useState<number | null>(null);

  // Exactly 4 Multilingual Script Stimuli as investigated in the research
  const fourScriptPosters = [
    {
      id: "marwari",
      number: "01",
      name: "Marwari",
      region: "Western Indic · Rajasthan",
      script: "Devanagari (Marwari Dialect)",
      headline: "स मनरडी बता बोली कोनी जा सका",
      translation: "Not all words can be spoken aloud",
      colorTheme: "from-coral/10 to-lavender/5",
      accentColor: "#FF3366",
      posterImage: "/assets/aistudio/WhatsApp_Image_2026-11-02_at_10.32.26__3__d983e353.jpeg",
      posterCaption: "Marwari Poster Specimen: Traditional hand block-print floral motif ground paired with robust Devanagari shirorekha letterforms",
      anatomy: "Continuous top shirorekha head stroke, balanced organic loop curvature, and high-contrast ochre strokes grounded over Rajasthani fabric block prints.",
      perceptualFinding: "Older respondents (46+) felt instant cultural safety and regional familiarity; youth (18–25) treated it as a poetic, nostalgic artifact.",
      emotionalScore: 8.6,
      legibilityScore: 7.8,
      ageQuotes: {
        youth: "It feels like a secret diary entry written in an ancient ancestral courtyard.",
        senior: "The top line is clean and steady. The block print makes it feel like home."
      }
    },
    {
      id: "bengali",
      number: "02",
      name: "Bengali",
      region: "Eastern Indic · West Bengal",
      script: "Bengali (Eastern Indic)",
      headline: "মনের সব কথা বোঝা যায় না",
      translation: "All thoughts of the heart cannot be understood",
      colorTheme: "from-coral/10 to-lavender/5",
      accentColor: "#8B7CFF",
      posterImage: "/assets/aistudio/WhatsApp_Image_2026-11-02_at_10.32.25__1__70aae0e4.jpeg",
      posterCaption: "Bengali Poster Specimen: Linear headline anchor with sharp triangular tension and fluid descending drop strokes",
      anatomy: "Pronounced linear top bar anchors, triangular junction strokes, and fluid organic terminal drops in terracotta vermilion.",
      perceptualFinding: "Interpreted by 18–25 youth as high emotional suppression and internal conflict ('calm outside, emotions inside').",
      emotionalScore: 8.2,
      legibilityScore: 6.5,
      ageQuotes: {
        youth: "The sharp triangular angles feel like suppressed heartbreak trying to break through.",
        senior: "The strokes are dramatic, but unless I slow down, the syllables blend together."
      }
    },
    {
      id: "telugu",
      number: "03",
      name: "Telugu",
      region: "Dravidian · Andhra Pradesh & Telangana",
      script: "Telugu (Dravidian)",
      headline: "ప్రతి భావాన్ని మాటల్లో చెప్పలేం",
      translation: "Not every emotion can be put into words",
      colorTheme: "from-coral/10 to-lavender/5",
      accentColor: "#FF3366",
      posterImage: "/assets/aistudio/WhatsApp_Image_2026-11-03_at_14.24.26_8cdef135.jpeg",
      posterCaption: "Telugu Poster Specimen: Circular talakattu glyph loops floating over delicate kolam sacred geometry linework",
      anatomy: "Curvilinear glyph loops with distinct top talakattu ticks set against an oceanic ground with kolam floor art.",
      perceptualFinding: "Younger readers felt mystery and quiet isolation; older non-speakers perceived it as visually sterile without semantic cues.",
      emotionalScore: 7.4,
      legibilityScore: 5.4,
      ageQuotes: {
        youth: "The rounded curves look like quiet tears or ripples on calm water.",
        senior: "Pretty shapes, but without knowing the letters it offers no guidance."
      }
    },
    {
      id: "tamil",
      number: "04",
      name: "Tamil",
      region: "Classical Dravidian · Tamil Nadu",
      script: "Tamil (Classical Dravidian)",
      headline: "ஒவ்வொரு உணர்வுக்கும் வார்த்தைகள் தேவையில்லை",
      translation: "Words are not necessary for every emotion",
      colorTheme: "from-coral/10 to-lavender/5",
      accentColor: "#8B7CFF",
      posterImage: "/assets/aistudio/WhatsApp_Image_2026-11-02_at_10.32.26__2__e6543967.jpeg",
      posterCaption: "Tamil Poster Specimen: Geometric angular letterforms juxtaposed against suspended brass temple bells",
      anatomy: "Sharp angular character architecture, rhythmic vertical stems, and serene temple bell imagery in muted slate charcoal.",
      perceptualFinding: "Universally associated with quiet dignity, contemplative restraint, and sacred solemnity across all age cohorts.",
      emotionalScore: 7.9,
      legibilityScore: 7.2,
      ageQuotes: {
        youth: "The temple bell with the strict type creates an eerie, sacred silence.",
        senior: "The temple bell conveys immediate reverence; the lettering feels upright and solemn."
      }
    }
  ];

  // Exactly the 6 Survey Questions with complete stratified data
  const sixSurveyQuestions = [
    {
      id: "q1",
      number: "Q1",
      title: "Marwari Script Perception",
      shortLabel: "Marwari (Q1)",
      scriptInfo: "Devanagari · 'स मनरडी बता बोली कोनी जा सका'",
      dominantInsight: "Block-print background established immediate cultural trust across older cohorts, while youth decoded dialect as intimate spoken lore.",
      distribution: [
        { label: "Clean & structured", percent: 34.0, color: "#8B7CFF", hoverColor: "#7464FA" },
        { label: "Symbolic secret meaning", percent: 31.9, color: "#FF3366", hoverColor: "#E02254" },
        { label: "Lost in thought / introspective", percent: 17.0, color: "#A89CFF", hoverColor: "#9385F5" },
        { label: "Reaching out in silence", percent: 17.0, color: "#FF6690", hoverColor: "#FA4D7B" }
      ],
      cohortResonance: [
        { 
          response: "Clean & structured layout", 
          youthPct: 15, 
          seniorPct: 85, 
          dominant: "Senior Anchor",
          note: "Shirorekha horizontal stability gave older readers reassurance."
        },
        { 
          response: "Symbolic secret meaning", 
          youthPct: 78, 
          seniorPct: 22, 
          dominant: "Youth Favorite",
          note: "Youth decoded regional dialect as intimate poetic narrative."
        },
        { 
          response: "Lost in thought / introspective", 
          youthPct: 82, 
          seniorPct: 18, 
          dominant: "Youth Favorite",
          note: "Young adults projected nostalgic personal introspection."
        },
        { 
          response: "Reaching out in silence", 
          youthPct: 52, 
          seniorPct: 48, 
          dominant: "Cross-Cohort",
          note: "Equal emotional pull across both younger and older audiences."
        }
      ]
    },
    {
      id: "q2",
      number: "Q2",
      title: "Bengali Emotional Evocation",
      shortLabel: "Bengali (Q2)",
      scriptInfo: "Eastern Indic · 'মনের সব কথা বোঝা যায় না'",
      dominantInsight: "Highest emotional evocation among youth (42.6% felt secret intentional depth), while seniors evaluated it on decorative neatness.",
      distribution: [
        { label: "Full of hidden meaning / intentional", percent: 42.6, color: "#FF3366", hoverColor: "#E02254" },
        { label: "Visually neat / no strong emotion", percent: 38.3, color: "#8B7CFF", hoverColor: "#7464FA" },
        { label: "Lost in thought / suppressed", percent: 14.9, color: "#FF6690", hoverColor: "#FA4D7B" },
        { label: "Silent plea / wanting to be heard", percent: 4.2, color: "#A89CFF", hoverColor: "#9385F5" }
      ],
      cohortResonance: [
        { 
          response: "Hidden symbolic depth", 
          youthPct: 84, 
          seniorPct: 16, 
          dominant: "Youth Favorite",
          note: "Sharp triangular angles read as emotional tension & sorrow."
        },
        { 
          response: "Visually neat, no emotion", 
          youthPct: 24, 
          seniorPct: 76, 
          dominant: "Senior Anchor",
          note: "Older adults evaluated it strictly on typographical neatness."
        },
        { 
          response: "Lost in thought / suppressed", 
          youthPct: 79, 
          seniorPct: 21, 
          dominant: "Youth Favorite",
          note: "Fluid descending drop strokes read as quiet internal conflict."
        },
        { 
          response: "Silent plea / wanting to be heard", 
          youthPct: 55, 
          seniorPct: 45, 
          dominant: "Cross-Cohort",
          note: "Subtle longing perceived across both generations."
        }
      ]
    },
    {
      id: "q3",
      number: "Q3",
      title: "Telugu Mood Communication",
      shortLabel: "Telugu (Q3)",
      scriptInfo: "Dravidian Script · 'ప్రతి భావాన్ని మాటల్లో చెప్పలేం'",
      dominantInsight: "Curvilinear glyph loops provoked sharp polarity: deep intrigue for youth vs. emotional disconnect for older non-speakers.",
      distribution: [
        { label: "Emotionally stuck / trying to emerge", percent: 36.2, color: "#FF3366", hoverColor: "#E02254" },
        { label: "Sterile / neat without emotional pull", percent: 34.0, color: "#8B7CFF", hoverColor: "#7464FA" },
        { label: "Mysterious / hiding secret depth", percent: 14.9, color: "#FF6690", hoverColor: "#FA4D7B" },
        { label: "Distant / given up being heard", percent: 14.9, color: "#A89CFF", hoverColor: "#9385F5" }
      ],
      cohortResonance: [
        { 
          response: "Emotionally stuck / trapped", 
          youthPct: 86, 
          seniorPct: 14, 
          dominant: "Youth Favorite",
          note: "Tight loops felt like psychological containment to young readers."
        },
        { 
          response: "Sterile / disconnected", 
          youthPct: 18, 
          seniorPct: 82, 
          dominant: "Senior Challenge",
          note: "Non-Telugu seniors found rounded circular glyphs cold & alienating."
        },
        { 
          response: "Mysterious / secret depth", 
          youthPct: 74, 
          seniorPct: 26, 
          dominant: "Youth Favorite",
          note: "Kolam sacred geometric linework added mystical intrigue."
        },
        { 
          response: "Distant / given up being heard", 
          youthPct: 45, 
          seniorPct: 55, 
          dominant: "Cross-Cohort",
          note: "Both cohorts sensed an aura of quiet detachment."
        }
      ]
    },
    {
      id: "q4",
      number: "Q4",
      title: "Tamil Sensory Interpretation",
      shortLabel: "Tamil (Q4)",
      scriptInfo: "Classical Dravidian · 'ஒவ்வொரு உணர்வுக்கும் வார்த்தைகள் தேவையில்லை'",
      dominantInsight: "Suspended temple bell imagery bridged the generational divide with shared contemplative stillness.",
      distribution: [
        { label: "Metaphorical story beneath surface", percent: 36.2, color: "#FF3366", hoverColor: "#E02254" },
        { label: "Calm outside, emotions inside", percent: 27.7, color: "#8B7CFF", hoverColor: "#7464FA" },
        { label: "Quiet isolation in silence", percent: 19.1, color: "#FF6690", hoverColor: "#FA4D7B" },
        { label: "Minimal & distant", percent: 17.0, color: "#A89CFF", hoverColor: "#9385F5" }
      ],
      cohortResonance: [
        { 
          response: "Metaphorical narrative", 
          youthPct: 80, 
          seniorPct: 20, 
          dominant: "Youth Favorite",
          note: "Youth projected profound ritualistic narrative depth into the type."
        },
        { 
          response: "Calm outside, emotions inside", 
          youthPct: 82, 
          seniorPct: 18, 
          dominant: "Youth Favorite",
          note: "Highest projection into the silence of suspended temple bells."
        },
        { 
          response: "Quiet isolation", 
          youthPct: 48, 
          seniorPct: 52, 
          dominant: "Cross-Cohort",
          note: "Slate-gray architectural mood felt universally serene."
        },
        { 
          response: "Minimal & distant", 
          youthPct: 20, 
          seniorPct: 80, 
          dominant: "Senior Anchor",
          note: "Seniors noted architectural discipline and upright character stems."
        }
      ]
    },
    {
      id: "q5",
      number: "Q5",
      title: "Overall Participant Experience",
      shortLabel: "Experience (Q5)",
      scriptInfo: "Emotional engagement evaluation across the entire poster series",
      dominantInsight: "40.4% found the stimuli visually captivating; 70.2% of youth engaged in deep personal reflection.",
      distribution: [
        { label: "Visually interesting / liked looking", percent: 40.4, color: "#FF3366", hoverColor: "#E02254" },
        { label: "Mixed / some resonant, some distant", percent: 27.7, color: "#8B7CFF", hoverColor: "#7464FA" },
        { label: "Thought-provoking / reflective", percent: 17.0, color: "#FF6690", hoverColor: "#FA4D7B" },
        { label: "Hard to relate / disconnected", percent: 14.9, color: "#A89CFF", hoverColor: "#9385F5" }
      ],
      cohortResonance: [
        { 
          response: "Thought-provoking / reflective", 
          youthPct: 85, 
          seniorPct: 15, 
          dominant: "Youth Favorite",
          note: "70.2% of young adults reported sustained emotional introspection."
        },
        { 
          response: "Visually interesting", 
          youthPct: 62, 
          seniorPct: 38, 
          dominant: "Universal",
          note: "Universal visual attraction across all age demographics."
        },
        { 
          response: "Mixed resonance", 
          youthPct: 42, 
          seniorPct: 58, 
          dominant: "Cross-Cohort",
          note: "Middle-aged readers exhibited highest contextual balance."
        },
        { 
          response: "Hard to relate", 
          youthPct: 15, 
          seniorPct: 85, 
          dominant: "Senior Challenge",
          note: "Older adults disconnect when scripts cannot be spoken or read."
        }
      ]
    },
    {
      id: "q6",
      number: "Q6",
      title: "Primary Visual Hook That Stood Out",
      shortLabel: "Standout Hook (Q6)",
      scriptInfo: "What captured participant attention first when scanning the posters?",
      dominantInsight: "Visual composition and script morphology hooked attention 4× more frequently than semantic message.",
      distribution: [
        { label: "A design element / composition", percent: 40.4, color: "#FF3366", hoverColor: "#E02254" },
        { label: "A language / script form", percent: 29.8, color: "#8B7CFF", hoverColor: "#7464FA" },
        { label: "A message or conceptual meaning", percent: 21.3, color: "#FF6690", hoverColor: "#FA4D7B" },
        { label: "Font / background interplay", percent: 8.5, color: "#A89CFF", hoverColor: "#9385F5" }
      ],
      cohortResonance: [
        { 
          response: "Design element / layout", 
          youthPct: 65, 
          seniorPct: 35, 
          dominant: "Visual Hook",
          note: "Initial optical fixation was overwhelmingly compositional."
        },
        { 
          response: "Language / script form", 
          youthPct: 32, 
          seniorPct: 68, 
          dominant: "Senior Anchor",
          note: "Older readers looked first to identify their mother tongue."
        },
        { 
          response: "Message / meaning", 
          youthPct: 81, 
          seniorPct: 19, 
          dominant: "Youth Hook",
          note: "Youth actively attempted to solve the emotional mystery."
        },
        { 
          response: "Font / background contrast", 
          youthPct: 50, 
          seniorPct: 50, 
          dominant: "Universal",
          note: "Consistent secondary aesthetic baseline across all respondents."
        }
      ]
    }
  ];

  const currentPoster = fourScriptPosters[activeScriptIdx];
  const currentSurvey = sixSurveyQuestions[activeSurveyQ];

  return (
    <article className="max-w-5xl mx-auto space-y-16 sm:space-y-24 selection:bg-coral selection:text-white">
      
      {/* ------------------------------------------------------------- */}
      {/* 00. EDITORIAL HERO & PROLOGUE                                 */}
      {/* ------------------------------------------------------------- */}
      <RevealOnScroll direction="up">
        <header className="space-y-6 pt-2">
          
          {/* Top Status & Context: Clean Research Case Study tag */}
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-stone-200 dark:border-stone-800 pb-3 text-xs font-subheading">
            <div className="flex items-center gap-2.5">
              <span className="w-2.5 h-2.5 rounded-full bg-coral animate-ping"></span>
              <span className="font-semibold uppercase tracking-wider text-coral">
                UX & Design Research Case Study
              </span>
            </div>
            <div className="text-stone-400 dark:text-stone-500">
              Multilingual Typographic Semiotics · Mixed-Methods Study
            </div>
          </div>

          {/* Main Title & Editorial Provocation */}
          <div className="space-y-3">
            <span className="text-xs font-subheading uppercase tracking-widest text-lavender font-bold">
              Cognitive Semiotics & Multilingual Typography
            </span>
            <h1 className="text-3xl sm:text-5xl md:text-6xl font-heading font-normal text-charcoal dark:text-white leading-[1.08] tracking-tight">
              Type & Emotion: How Multilingual Scripts Evoke Generational Mental Models
            </h1>
            <p className="text-base sm:text-lg font-subheading text-stone-600 dark:text-stone-300 max-w-3xl leading-relaxed">
              When Indian readers encounter scripts they cannot speak or read, does the pure anatomy of the letterforms evoke subconscious emotion? An empirical investigation into cross-generational perception across Marwari, Bengali, Telugu, and Tamil typography.
            </p>
          </div>

          {/* 3 Project Fact Cards in Branding Scheme */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="p-3.5 rounded-2xl bg-white dark:bg-stone-900 border border-stone-200/90 dark:border-stone-800 shadow-xs space-y-0.5">
              <span className="text-[11px] font-subheading font-bold text-coral uppercase tracking-wider block">Role</span>
              <div className="text-sm font-subheading font-medium text-charcoal dark:text-white">Lead Design Researcher</div>
              <p className="text-xs font-subheading text-stone-500">Field Inquiries, Typographic Stimuli & Synthesis</p>
            </div>

            <div className="p-3.5 rounded-2xl bg-white dark:bg-stone-900 border border-stone-200/90 dark:border-stone-800 shadow-xs space-y-0.5">
              <span className="text-[11px] font-subheading font-bold text-coral uppercase tracking-wider block">Cohort Scope</span>
              <div className="text-sm font-subheading font-medium text-charcoal dark:text-white">N=47 Stratified</div>
              <p className="text-xs font-subheading text-stone-500">18–25 (70.2%) · 26–45 (14.9%) · 46+ (14.9%)</p>
            </div>

            <div className="p-3.5 rounded-2xl bg-white dark:bg-stone-900 border border-stone-200/90 dark:border-stone-800 shadow-xs space-y-0.5">
              <span className="text-[11px] font-subheading font-bold text-coral uppercase tracking-wider block">Scripts Tested</span>
              <div className="text-sm font-subheading font-medium text-charcoal dark:text-white">4 Indic Scripts</div>
              <p className="text-xs font-subheading text-stone-500">Marwari, Bengali, Telugu, Tamil</p>
            </div>
          </div>

          {/* EXECUTIVE SUMMARY */}
          <div className="p-5 rounded-3xl bg-coral/5 dark:bg-coral/10 border border-coral/25 space-y-3">
            <div className="flex items-center gap-2 text-xs font-subheading font-bold text-coral uppercase tracking-wider">
              <Sparkles size={14} />
              <span>Executive Summary</span>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs font-body">
              <div className="p-3.5 rounded-2xl bg-white dark:bg-stone-900 border border-coral/15 space-y-1 shadow-xs">
                <span className="font-subheading text-coral font-bold text-[11px] uppercase block">The Core Question</span>
                <p className="text-stone-700 dark:text-stone-300 leading-relaxed font-body">
                  Can pure typographic form communicate mood when the reader cannot read the language?
                </p>
              </div>

              <div className="p-3.5 rounded-2xl bg-white dark:bg-stone-900 border border-coral/15 space-y-1 shadow-xs">
                <span className="font-subheading text-lavender font-bold text-[11px] uppercase block">The Empirical Gap</span>
                <p className="text-stone-700 dark:text-stone-300 leading-relaxed font-body">
                  Youth project deep personal angst into abstract curves; seniors require baseline discipline and cultural anchors.
                </p>
              </div>

              <div className="p-3.5 rounded-2xl bg-white dark:bg-stone-900 border border-coral/15 space-y-1 shadow-xs">
                <span className="font-subheading text-coral font-bold text-[11px] uppercase block">The Actionable Outcome</span>
                <p className="text-stone-700 dark:text-stone-300 leading-relaxed font-body">
                  A 3-part framework for inclusive multilingual public typography tested across 47 participants.
                </p>
              </div>
            </div>
          </div>
        </header>
      </RevealOnScroll>

      {/* ------------------------------------------------------------- */}
      {/* 01. THE PROBLEM: SIX DIMENSIONS OF GENERATIONAL DISCONNECT    */}
      {/* ------------------------------------------------------------- */}
      <RevealOnScroll direction="up">
        <section className="space-y-5">
          <div className="flex items-center gap-3">
            <span className="px-3 py-1 rounded-full text-xs font-subheading font-bold bg-charcoal text-white dark:bg-white dark:text-charcoal uppercase tracking-wider">
              01 · Problem Framing
            </span>
            <span className="text-xs font-subheading font-semibold text-coral uppercase tracking-wider">
              Research Inquiry
            </span>
          </div>

          <div className="space-y-2">
            <h2 className="text-2xl sm:text-3xl font-heading font-normal text-charcoal dark:text-white tracking-tight">
              Six dimensions where typographic perception fractures across age groups
            </h2>
            <p className="text-stone-600 dark:text-stone-300 text-sm max-w-3xl leading-relaxed font-subheading">
              When Indian audiences encounter public typography in scripts they cannot read, visual cues trigger subconscious emotional judgments along six distinct fault lines.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3.5 pt-1">
            {[
              {
                num: "01",
                title: "The Legibility vs. Emotion Paradox",
                desc: "Youth embraced abstract curves and layered visual ambiguity, while older readers experienced cognitive fatigue and emotional detachment when letters lost baseline stability.",
                color: "text-coral"
              },
              {
                num: "02",
                title: "Emotional Projection without Semantics",
                desc: "Young non-speakers projected deep emotional states ('silent plea', 'internal struggle') onto unfamiliar scripts, while older non-speakers classified them as sterile and unapproachable.",
                color: "text-lavender"
              },
              {
                num: "03",
                title: "Symbolism vs. Surface Reality",
                desc: "Dense symbolic layouts intrigued younger viewers searching for hidden narratives, whereas older respondents interpreted minimalism as emptiness rather than intentional restraint.",
                color: "text-coral"
              },
              {
                num: "04",
                title: "Fragility of Cultural Relatability",
                desc: "Without recognizable cultural scaffolds (such as block-print textiles or temple bells), older audiences disengaged completely, feeling cultural distance from the design.",
                color: "text-lavender"
              },
              {
                num: "05",
                title: "Emotional vs. Technical Lexicon",
                desc: "Youth articulated subjective sensations ('lost in thought', 'calm outside, emotions inside'); older viewers used technical, detached observations ('clean font', 'neat layout').",
                color: "text-coral"
              },
              {
                num: "06",
                title: "The Risk of Aesthetic Alienation",
                desc: "Polished modern aesthetics acted as an eye-catching hook across all age groups, but visual neatness alone failed to convert into lasting emotional resonance for older viewers.",
                color: "text-lavender"
              }
            ].map((prob) => (
              <div 
                key={prob.num}
                className="p-4 sm:p-5 rounded-2xl bg-white dark:bg-stone-900 border border-stone-200/80 dark:border-stone-800 shadow-xs hover:border-coral/50 transition-all duration-300 space-y-2 group"
              >
                <div className={`text-xl sm:text-2xl font-heading font-normal ${prob.color}`}>
                  {prob.num}
                </div>
                <h3 className="text-sm font-subheading font-medium text-charcoal dark:text-white group-hover:text-coral transition-colors">
                  {prob.title}
                </h3>
                <p className="text-xs font-body text-stone-600 dark:text-stone-300 leading-relaxed">
                  {prob.desc}
                </p>
              </div>
            ))}
          </div>
        </section>
      </RevealOnScroll>

      {/* ------------------------------------------------------------- */}
      {/* 02. COMPACT EMPIRICAL DATA: DONUT + RESPONSE INSIGHT BENTO    */}
      {/* ------------------------------------------------------------- */}
      <RevealOnScroll direction="up">
        <section className="space-y-6">
          <div className="flex items-center gap-3">
            <span className="px-3 py-1 rounded-full text-xs font-subheading font-bold bg-charcoal text-white dark:bg-white dark:text-charcoal uppercase tracking-wider">
              02 · Empirical Data
            </span>
            <span className="text-xs font-subheading font-semibold text-coral uppercase tracking-wider">
              Survey Analytics
            </span>
          </div>

          <div className="space-y-2">
            <h2 className="text-2xl sm:text-3xl font-heading font-normal text-charcoal dark:text-white tracking-tight">
              Interactive survey analytics across all six inquiry questions
            </h2>
            <p className="text-stone-600 dark:text-stone-300 text-sm max-w-3xl leading-relaxed font-subheading">
              Explore participant responses from N=47 stratified participants across the 4 script posters, overall emotional experience, and visual standout factors.
            </p>
          </div>

          {/* Question Selector Tabs */}
          <div className="flex flex-wrap gap-1.5 p-1 rounded-2xl bg-stone-100 dark:bg-stone-900 border border-stone-200 dark:border-stone-800">
            {sixSurveyQuestions.map((q, idx) => (
              <button
                key={q.id}
                onClick={() => {
                  setActiveSurveyQ(idx);
                  setActiveHoverSlice(null);
                }}
                className={`px-3 py-1.5 rounded-xl text-xs font-subheading font-medium transition-all cursor-pointer flex items-center gap-1.5 ${
                  activeSurveyQ === idx
                    ? 'bg-charcoal text-white dark:bg-white dark:text-charcoal shadow-xs scale-102'
                    : 'text-stone-600 dark:text-stone-400 hover:text-charcoal dark:hover:text-white'
                }`}
              >
                <span className="text-coral font-bold">{q.number}</span>
                <span>{q.shortLabel}</span>
              </button>
            ))}
          </div>

          {/* Compact Single-Frame Visualisation Card */}
          <div className="p-5 sm:p-7 rounded-3xl bg-white dark:bg-stone-900 border border-stone-200/90 dark:border-stone-800 shadow-sm space-y-6">
            
            {/* Header with Question details */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-stone-100 dark:border-stone-800 pb-3">
              <div>
                <span className="text-[11px] font-subheading text-coral font-bold uppercase tracking-wider block">
                  {currentSurvey.number} · {currentSurvey.title}
                </span>
                <h3 className="text-lg sm:text-xl font-heading font-normal text-charcoal dark:text-white mt-0.5">
                  {currentSurvey.scriptInfo}
                </h3>
              </div>
              <div className="px-3 py-1 rounded-full bg-coral/10 text-coral text-xs font-subheading font-medium flex items-center gap-1.5 self-start sm:self-auto">
                <Sparkles size={12} />
                <span>N=47 Stratified</span>
              </div>
            </div>

            {/* Compact 2-Column Split: Donut on Left, Compact Matrix on Right */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
              
              {/* Left Pane: Donut Chart + Compact Legend */}
              <div className="lg:col-span-5 flex flex-col items-center space-y-4">
                <CustomSvgDonut 
                  data={currentSurvey.distribution}
                  activeIdx={activeHoverSlice}
                  onHover={setActiveHoverSlice}
                  centerTitle="47 Responses"
                  centerSubtitle={currentSurvey.shortLabel}
                />

                {/* Compact Legend Grid */}
                <div className="grid grid-cols-2 gap-2 w-full text-xs font-subheading pt-1">
                  {currentSurvey.distribution.map((item, idx) => (
                    <div
                      key={item.label}
                      onMouseEnter={() => setActiveHoverSlice(idx)}
                      onMouseLeave={() => setActiveHoverSlice(null)}
                      className={`p-2 rounded-xl border transition-all cursor-pointer flex items-center justify-between ${
                        activeHoverSlice === idx 
                          ? 'border-coral bg-coral/5 shadow-xs' 
                          : 'border-stone-200/60 dark:border-stone-800 bg-stone-50/50 dark:bg-stone-850'
                      }`}
                    >
                      <div className="flex items-center gap-1.5 min-w-0 pr-1">
                        <span 
                          className="w-2.5 h-2.5 rounded-full shrink-0" 
                          style={{ backgroundColor: item.color }}
                        />
                        <span className="text-[11px] text-stone-700 dark:text-stone-300 truncate">
                          {item.label}
                        </span>
                      </div>
                      <span className="font-bold text-[11px] text-charcoal dark:text-white shrink-0">
                        {item.percent}%
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Right Pane: COHORT RESPONSE INSIGHT BENTO (No heatmaps, no progress bars!) */}
              <div className="lg:col-span-7 space-y-3">
                <div className="flex items-center justify-between border-b border-stone-100 dark:border-stone-800 pb-1.5">
                  <span className="text-xs font-subheading font-bold text-stone-400 uppercase tracking-wider">
                    Stratified Response Insights (N=47)
                  </span>
                  
                  {/* Clean Cohort Legend */}
                  <div className="flex items-center gap-3 text-[11px] font-subheading">
                    <span className="flex items-center gap-1 text-coral font-medium">
                      <span className="w-2 h-2 rounded-full bg-coral"></span> Youth 18–25
                    </span>
                    <span className="flex items-center gap-1 text-lavender font-medium">
                      <span className="w-2 h-2 rounded-full bg-lavender"></span> Senior 46+
                    </span>
                  </div>
                </div>

                {/* 2x2 Modern Insight Bento Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {currentSurvey.cohortResonance.map((item, i) => {
                    const isHovered = activeHoverSlice === i;
                    const sliceColor = currentSurvey.distribution[i]?.color || '#FF3366';
                    const overallPct = currentSurvey.distribution[i]?.percent || 0;

                    return (
                      <div 
                        key={i}
                        onMouseEnter={() => setActiveHoverSlice(i)}
                        onMouseLeave={() => setActiveHoverSlice(null)}
                        className={`p-3.5 rounded-2xl border transition-all duration-200 cursor-pointer flex flex-col justify-between space-y-2 ${
                          isHovered
                            ? 'border-coral bg-coral/5 dark:bg-coral/10 shadow-sm ring-1 ring-coral/30'
                            : 'border-stone-200/80 dark:border-stone-800 bg-stone-50/70 dark:bg-stone-950/40 hover:border-stone-300'
                        }`}
                      >
                        <div className="flex items-start justify-between gap-2">
                          <div className="flex items-center gap-1.5 min-w-0">
                            <span 
                              className="w-2.5 h-2.5 rounded-full shrink-0" 
                              style={{ backgroundColor: sliceColor }} 
                            />
                            <h4 className="text-xs font-subheading font-medium text-charcoal dark:text-white line-clamp-1">
                              {item.response}
                            </h4>
                          </div>
                          <span className="text-base font-heading font-normal text-charcoal dark:text-white shrink-0">
                            {overallPct}%
                          </span>
                        </div>

                        {/* Clean Symmetrical Metric Tags (No heatmap bars!) */}
                        <div className="flex items-center justify-between text-[11px] font-subheading py-1 px-2.5 rounded-xl bg-white dark:bg-stone-900 border border-stone-200/70 dark:border-stone-800">
                          <span className="text-coral font-medium">Youth: <strong>{item.youthPct}%</strong></span>
                          <span className="text-stone-300 dark:text-stone-700">·</span>
                          <span className="text-lavender font-medium">Senior: <strong>{item.seniorPct}%</strong></span>
                          <span className="text-[10px] font-subheading uppercase px-1.5 py-0.5 rounded-md bg-stone-100 dark:bg-stone-800 text-stone-600 dark:text-stone-300 font-bold ml-1">
                            {item.dominant}
                          </span>
                        </div>

                        <p className="text-[11px] font-body text-stone-500 italic line-clamp-2">
                          "{item.note}"
                        </p>
                      </div>
                    );
                  })}
                </div>

                {/* Compact Takeaway Callout */}
                <div className="p-3 rounded-xl bg-coral/5 dark:bg-coral/10 border border-coral/20 flex items-center gap-2.5">
                  <Lightbulb size={15} className="text-coral shrink-0" />
                  <p className="text-xs text-stone-700 dark:text-stone-300 leading-snug font-body">
                    <strong>Takeaway:</strong> {currentSurvey.dominantInsight}
                  </p>
                </div>

              </div>

            </div>

          </div>

          {/* THEMATIC DIVERGENCE SPECTRUM (3 Typographic Metric Cards - No Heatmaps!) */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {[
              {
                theme: "Symbolism vs. Surface",
                divergence: "+56% Youth Delta",
                youth: 88,
                senior: 32,
                desc: "Youth seek layered metaphors and hidden narratives; seniors prioritize literal surface clarity.",
              },
              {
                theme: "Emotional vs. Technical Lexicon",
                divergence: "+58% Youth Delta",
                youth: 82,
                senior: 24,
                desc: "Youth describe feelings ('calm outside, crying inside'); seniors describe layout ('clean font, straight margins').",
              },
              {
                theme: "Emotional Depth vs. Visual Neatness",
                divergence: "+12% Senior Delta",
                youth: 74,
                senior: 86,
                desc: "Visual neatness alone satisfies older adults but leaves younger readers emotionally underwhelmed.",
              }
            ].map((item, idx) => (
              <div 
                key={idx}
                className="p-4 rounded-2xl bg-white dark:bg-stone-900 border border-stone-200/90 dark:border-stone-800 shadow-xs space-y-3"
              >
                <div className="flex items-center justify-between">
                  <h4 className="text-sm font-subheading font-medium text-charcoal dark:text-white">
                    {item.theme}
                  </h4>
                  <span className="text-[10px] font-subheading font-bold text-coral px-2 py-0.5 rounded-md bg-coral/10">
                    {item.divergence}
                  </span>
                </div>

                <p className="text-xs text-stone-500 leading-relaxed font-body">
                  {item.desc}
                </p>

                {/* Typographic Comparison Metrics (No bars or heatmaps!) */}
                <div className="flex items-center justify-between pt-2 border-t border-stone-100 dark:border-stone-800">
                  <div className="flex items-center gap-2">
                    <div className="px-2.5 py-1 rounded-xl bg-coral/10 text-coral text-xs font-subheading">
                      <span className="text-[10px] uppercase text-stone-400 block font-normal">Youth (18–25)</span>
                      <span className="text-base font-heading font-normal">{item.youth}%</span>
                    </div>
                    <span className="text-stone-300 dark:text-stone-700 font-light text-sm">vs</span>
                    <div className="px-2.5 py-1 rounded-xl bg-lavender/10 text-lavender text-xs font-subheading">
                      <span className="text-[10px] uppercase text-stone-400 block font-normal">Senior (46+)</span>
                      <span className="text-base font-heading font-normal">{item.senior}%</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="text-[10px] uppercase text-stone-400 block font-subheading">Generational Delta</span>
                    <span className="text-xs font-heading font-normal text-coral">{item.divergence}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      </RevealOnScroll>

      {/* ------------------------------------------------------------- */}
      {/* 03. TRIADIC SYSTEMS CONCEPT MAP                               */}
      {/* ------------------------------------------------------------- */}
      <RevealOnScroll direction="up">
        <section className="space-y-5">
          <div className="flex items-center gap-3">
            <span className="px-3 py-1 rounded-full text-xs font-subheading font-bold bg-charcoal text-white dark:bg-white dark:text-charcoal uppercase tracking-wider">
              03 · Structural Framework
            </span>
            <span className="text-xs font-subheading font-semibold text-coral uppercase tracking-wider">
              Cognitive Triad
            </span>
          </div>

          <div className="space-y-2">
            <h2 className="text-2xl sm:text-3xl font-heading font-normal text-charcoal dark:text-white tracking-tight">
              The triadic model of multilingual script perception
            </h2>
            <p className="text-stone-600 dark:text-stone-300 text-sm max-w-3xl leading-relaxed font-subheading">
              How typography functions across three interconnected poles: Visual Form & Style, Cultural & Emotional Meaning, and Functional Usability.
            </p>
          </div>

          <div className="p-5 sm:p-7 rounded-3xl bg-white dark:bg-stone-900 border border-stone-200/90 dark:border-stone-800 shadow-sm space-y-5">
            
            {/* Model Lens Switcher */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-stone-100 dark:border-stone-800 pb-3">
              <div>
                <span className="text-xs font-subheading text-stone-400 uppercase tracking-wider block">
                  Interactive Cognitive Lens
                </span>
                <h3 className="text-base sm:text-lg font-heading font-normal text-charcoal dark:text-white">
                  Triadic Vector Tension: Form · Meaning · Usability
                </h3>
              </div>

              <div className="inline-flex p-1 rounded-xl bg-stone-100 dark:bg-stone-800 self-start sm:self-auto">
                <button
                  onClick={() => setActiveCognitiveLens('youth')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-subheading font-medium transition-all cursor-pointer flex items-center gap-1.5 ${
                    activeCognitiveLens === 'youth'
                      ? 'bg-coral text-white shadow-xs'
                      : 'text-stone-600 dark:text-stone-400 hover:text-charcoal dark:hover:text-white'
                  }`}
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-white"></span>
                  <span>Youth Lens (18–25)</span>
                </button>
                <button
                  onClick={() => setActiveCognitiveLens('senior')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-subheading font-medium transition-all cursor-pointer flex items-center gap-1.5 ${
                    activeCognitiveLens === 'senior'
                      ? 'bg-lavender text-white shadow-xs'
                      : 'text-stone-600 dark:text-stone-400 hover:text-charcoal dark:hover:text-white'
                  }`}
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-white"></span>
                  <span>Senior Lens (46+)</span>
                </button>
              </div>
            </div>

            {/* Triadic Architecture Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              
              {/* Node 1: Visual Form & Style */}
              <div className={`p-4 rounded-2xl border transition-all duration-300 space-y-2 ${
                activeCognitiveLens === 'youth'
                  ? 'border-coral bg-coral/5 shadow-xs ring-1 ring-coral/30'
                  : 'border-stone-200 dark:border-stone-800 bg-stone-50/50 dark:bg-stone-950/60 opacity-80'
              }`}>
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-subheading font-bold text-coral uppercase tracking-wider">Pillar A</span>
                  <span className="text-[10px] font-subheading text-stone-400">Morphology</span>
                </div>
                <h4 className="text-sm font-subheading font-semibold text-charcoal dark:text-white">
                  Visual Form & Style
                </h4>
                <ul className="text-xs text-stone-600 dark:text-stone-300 space-y-0.5 font-body">
                  <li>• Stroke weight & contrast</li>
                  <li>• Curvilinear vs. angular loops</li>
                  <li>• Baseline & shirorekha flow</li>
                </ul>
              </div>

              {/* Node 2: Cultural & Emotional Meaning */}
              <div className={`p-4 rounded-2xl border transition-all duration-300 space-y-2 ${
                activeCognitiveLens === 'youth'
                  ? 'border-lavender bg-lavender/10 shadow-xs ring-1 ring-lavender/40'
                  : 'border-coral bg-coral/10 shadow-xs ring-1 ring-coral/40'
              }`}>
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-subheading font-bold text-lavender uppercase tracking-wider">Pillar B</span>
                  <span className="text-[10px] font-subheading text-stone-400">Semiotics</span>
                </div>
                <h4 className="text-sm font-subheading font-semibold text-charcoal dark:text-white">
                  Cultural & Emotional Meaning
                </h4>
                <ul className="text-xs text-stone-600 dark:text-stone-300 space-y-0.5 font-body">
                  <li>• Ancestral memory & nostalgia</li>
                  <li>• Sacred motifs (temple bells)</li>
                  <li>• Projected internal feelings</li>
                </ul>
              </div>

              {/* Node 3: Functional Usability */}
              <div className={`p-4 rounded-2xl border transition-all duration-300 space-y-2 ${
                activeCognitiveLens === 'senior'
                  ? 'border-lavender bg-lavender/10 shadow-xs ring-1 ring-lavender/40'
                  : 'border-stone-200 dark:border-stone-800 bg-stone-50/50 dark:bg-stone-950/60 opacity-80'
              }`}>
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-subheading font-bold text-lavender uppercase tracking-wider">Pillar C</span>
                  <span className="text-[10px] font-subheading text-stone-400">Legibility</span>
                </div>
                <h4 className="text-sm font-subheading font-semibold text-charcoal dark:text-white">
                  Functional Usability
                </h4>
                <ul className="text-xs text-stone-600 dark:text-stone-300 space-y-0.5 font-body">
                  <li>• Recognition speed & decoding</li>
                  <li>• Phonetic alignment</li>
                  <li>• Legibility across distance</li>
                </ul>
              </div>

            </div>

            {/* Cognitive Lens Summary Banner */}
            <div className={`p-3.5 rounded-2xl border transition-colors ${
              activeCognitiveLens === 'youth'
                ? 'bg-coral/5 border-coral/20 text-charcoal dark:text-stone-200'
                : 'bg-lavender/10 border-lavender/30 text-charcoal dark:text-stone-200'
            }`}>
              <p className="text-xs font-body leading-relaxed">
                {activeCognitiveLens === 'youth' ? (
                  <span>
                    <strong>Youth Lens (18–25):</strong> Participants orbit primarily between <em>Visual Form & Style</em> and <em>Cultural & Emotional Meaning</em>. They treat letterforms as an expressive visual medium; lack of literal readability is an invitation for personal emotional projection.
                  </span>
                ) : (
                  <span>
                    <strong>Senior Lens (46+):</strong> Participants anchor deeply in <em>Functional Usability</em> and demand <em>Cultural Safety</em>. If traditional baselines and recognizable motifs are stripped away, cognitive fatigue and emotional mistrust follow immediately.
                  </span>
                )}
              </p>
            </div>
          </div>
        </section>
      </RevealOnScroll>

      {/* ------------------------------------------------------------- */}
      {/* 04. QUALITATIVE AFFINITY MAPPING & FIELD VOICES               */}
      {/* ------------------------------------------------------------- */}
      <RevealOnScroll direction="up">
        <section className="space-y-4">
          <div className="flex items-center gap-3">
            <span className="px-3 py-1 rounded-full text-xs font-subheading font-bold bg-charcoal text-white dark:bg-white dark:text-charcoal uppercase tracking-wider">
              04 · Qualitative Voice
            </span>
            <span className="text-xs font-subheading font-semibold text-coral uppercase tracking-wider">
              Affinity Synthesis
            </span>
          </div>

          <div className="space-y-1">
            <h2 className="text-2xl sm:text-3xl font-heading font-normal text-charcoal dark:text-white tracking-tight">
              Clustered field voices: What participants told us
            </h2>
            <p className="text-stone-600 dark:text-stone-300 text-sm max-w-3xl leading-relaxed font-subheading">
              Verbatim quotes recorded during in-person and digital testing sessions, clustered into four foundational perceptual mindsets.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 pt-1">
            
            {/* Cluster 1: Projection */}
            <div className="p-4 rounded-2xl bg-coral/5 dark:bg-coral/10 border border-coral/25 shadow-xs space-y-2.5">
              <span className="text-[11px] font-subheading font-bold text-coral uppercase tracking-wider block">
                Cluster 1 · Projection
              </span>
              <h3 className="text-xs font-subheading font-semibold text-charcoal dark:text-white">
                Emotional Projection without Semantics
              </h3>
              <p className="text-xs font-body italic text-stone-700 dark:text-stone-300">
                "I can't read Telugu, but the curved glyphs felt like someone crying quietly without making a sound."
              </p>
              <span className="block text-[10px] font-subheading text-stone-400">— Respondent #14, Age 21</span>
            </div>

            {/* Cluster 2: Legibility Anxiety */}
            <div className="p-4 rounded-2xl bg-lavender/10 dark:bg-lavender/15 border border-lavender/30 shadow-xs space-y-2.5">
              <span className="text-[11px] font-subheading font-bold text-lavender uppercase tracking-wider block">
                Cluster 2 · Baseline Sanctity
              </span>
              <h3 className="text-xs font-subheading font-semibold text-charcoal dark:text-white">
                Legibility Anxiety & Structural Need
              </h3>
              <p className="text-xs font-body italic text-stone-700 dark:text-stone-300">
                "If I cannot pronounce the words, it just feels like decorative wallpaper, not real communication."
              </p>
              <span className="block text-[10px] font-subheading text-stone-400">— Respondent #08, Age 52</span>
            </div>

            {/* Cluster 3: Cultural Anchors */}
            <div className="p-4 rounded-2xl bg-coral/5 dark:bg-coral/10 border border-coral/25 shadow-xs space-y-2.5">
              <span className="text-[11px] font-subheading font-bold text-coral uppercase tracking-wider block">
                Cluster 3 · Heritage Grounding
              </span>
              <h3 className="text-xs font-subheading font-semibold text-charcoal dark:text-white">
                Cultural Texture & Scaffolds
              </h3>
              <p className="text-xs font-body italic text-stone-700 dark:text-stone-300">
                "The block-print background in the Marwari poster reminded me of my grandmother's home in Jaipur."
              </p>
              <span className="block text-[10px] font-subheading text-stone-400">— Respondent #41, Age 38</span>
            </div>

            {/* Cluster 4: Language Gap */}
            <div className="p-4 rounded-2xl bg-lavender/10 dark:bg-lavender/15 border border-lavender/30 shadow-xs space-y-2.5">
              <span className="text-[11px] font-subheading font-bold text-lavender uppercase tracking-wider block">
                Cluster 4 · Vocabulary Gap
              </span>
              <h3 className="text-xs font-subheading font-semibold text-charcoal dark:text-white">
                Emotional vs. Technical Lexicon
              </h3>
              <p className="text-xs font-body italic text-stone-700 dark:text-stone-300">
                "Young people say 'it feels sad or lonely'; older people say 'it is neat, but plain'."
              </p>
              <span className="block text-[10px] font-subheading text-stone-400">— Observer Field Note</span>
            </div>

          </div>
        </section>
      </RevealOnScroll>

      {/* ------------------------------------------------------------- */}
      {/* 05. REDESIGNED USER PERSONAS: 5-AXIS SEMIOTIC RADAR COMPASS   */}
      {/* ------------------------------------------------------------- */}
      <RevealOnScroll direction="up">
        <section className="space-y-6">
          <div className="flex items-center gap-3">
            <span className="px-3 py-1 rounded-full text-xs font-subheading font-bold bg-charcoal text-white dark:bg-white dark:text-charcoal uppercase tracking-wider">
              05 · User Personas
            </span>
            <span className="text-xs font-subheading font-semibold text-coral uppercase tracking-wider">
              Semiotic Radar Compass
            </span>
          </div>

          <div className="space-y-2">
            <h2 className="text-2xl sm:text-3xl font-heading font-normal text-charcoal dark:text-white tracking-tight">
              Two polarizing archetypes: The Explorer vs. The Custodian
            </h2>
            <p className="text-stone-600 dark:text-stone-300 text-sm max-w-3xl leading-relaxed font-subheading">
              Synthesizing demographic survey data into a multi-dimensional perceptual radar comparing how Indian audiences decode expressive typography without semantic comprehension.
            </p>
          </div>

          {/* Archetype Filter Tabs */}
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs font-subheading text-stone-400 mr-1">Radar View:</span>
            <button
              onClick={() => setActiveArchetype('all')}
              className={`px-3 py-1.5 rounded-full text-xs font-subheading font-medium transition-all cursor-pointer flex items-center gap-1.5 ${
                activeArchetype === 'all'
                  ? 'bg-charcoal text-white dark:bg-white dark:text-charcoal shadow-xs'
                  : 'bg-stone-100 dark:bg-stone-800 text-stone-600 dark:text-stone-400 hover:text-charcoal dark:hover:text-white'
              }`}
            >
              <span>Compare Both Archetypes</span>
            </button>
            <button
              onClick={() => setActiveArchetype('explorer')}
              className={`px-3 py-1.5 rounded-full text-xs font-subheading font-medium transition-all cursor-pointer flex items-center gap-1.5 ${
                activeArchetype === 'explorer'
                  ? 'bg-coral text-white shadow-xs'
                  : 'bg-coral/10 text-coral hover:bg-coral/20'
              }`}
            >
              <span className="w-2 h-2 rounded-full bg-coral"></span>
              <span>The Interpretive Explorer (Youth 70.2%)</span>
            </button>
            <button
              onClick={() => setActiveArchetype('custodian')}
              className={`px-3 py-1.5 rounded-full text-xs font-subheading font-medium transition-all cursor-pointer flex items-center gap-1.5 ${
                activeArchetype === 'custodian'
                  ? 'bg-lavender text-white shadow-xs'
                  : 'bg-lavender/10 text-lavender hover:bg-lavender/20'
              }`}
            >
              <span className="w-2 h-2 rounded-full bg-lavender"></span>
              <span>The Clarity-Forward Custodian (Senior 14.9%)</span>
            </button>
          </div>

          {/* Unified Persona Radar Frame */}
          <div className="p-5 sm:p-7 rounded-3xl bg-white dark:bg-stone-900 border border-stone-200/90 dark:border-stone-800 shadow-sm space-y-6">
            
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              
              {/* Left Column: 5-Axis SVG Radar Chart */}
              <div className="lg:col-span-5 flex flex-col items-center space-y-4">
                <div className="w-full flex items-center justify-between border-b border-stone-100 dark:border-stone-800 pb-2">
                  <span className="text-xs font-subheading font-bold text-stone-400 uppercase tracking-wider">
                    5-Axis Cognitive Radar
                  </span>
                  <span className="text-[11px] font-subheading text-coral font-medium">
                    Hover vertex for delta
                  </span>
                </div>

                <PersonaRadarChart 
                  activeArchetype={activeArchetype}
                  activeDimension={activeRadarDimension}
                  onHoverDimension={setActiveRadarDimension}
                />

                {/* Trait Inspector Readout */}
                <div className="w-full p-3.5 rounded-2xl bg-stone-50/90 dark:bg-stone-950/60 border border-stone-200/80 dark:border-stone-800 min-h-[82px] flex flex-col justify-center transition-all">
                  {activeRadarDimension !== null ? (
                    <div className="space-y-1 animate-fadeIn">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-subheading font-bold text-charcoal dark:text-white">
                          {PERSONA_RADAR_DIMENSIONS[activeRadarDimension].name}
                        </span>
                        <span className="text-[10px] font-subheading font-bold text-coral px-2 py-0.5 rounded-md bg-coral/10">
                          {PERSONA_RADAR_DIMENSIONS[activeRadarDimension].delta}
                        </span>
                      </div>
                      <div className="flex items-center gap-3 text-[11px] font-subheading">
                        <span className="text-coral">
                          Youth: <strong>{PERSONA_RADAR_DIMENSIONS[activeRadarDimension].youth}%</strong>
                        </span>
                        <span className="text-stone-300 dark:text-stone-700">·</span>
                        <span className="text-lavender">
                          Senior: <strong>{PERSONA_RADAR_DIMENSIONS[activeRadarDimension].senior}%</strong>
                        </span>
                      </div>
                      <p className="text-[11px] font-body text-stone-500 italic">
                        "{PERSONA_RADAR_DIMENSIONS[activeRadarDimension].insight}"
                      </p>
                    </div>
                  ) : (
                    <div className="flex items-center gap-2 text-stone-400 dark:text-stone-500 text-xs font-subheading">
                      <Compass size={16} className="text-coral shrink-0" />
                      <span>Hover any vertex on the radar to inspect exact trait divergence.</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Right Column: Two Editorial Archetype Profile Cards */}
              <div className="lg:col-span-7 space-y-4">
                
                {/* Archetype 01: Youth Explorer */}
                <div 
                  onClick={() => setActiveArchetype(activeArchetype === 'explorer' ? 'all' : 'explorer')}
                  className={`p-4 sm:p-5 rounded-2xl border transition-all duration-300 cursor-pointer space-y-3 ${
                    activeArchetype === 'explorer' || activeArchetype === 'all'
                      ? 'border-coral bg-coral/5 dark:bg-coral/10 shadow-xs ring-1 ring-coral/20'
                      : 'border-stone-200/80 dark:border-stone-800 bg-stone-50/50 dark:bg-stone-950/40 opacity-60'
                  }`}
                >
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-coral"></span>
                        <span className="text-[10px] font-subheading font-bold text-coral uppercase tracking-wider">
                          Archetype 01 · 18–25 Cohort (70.2% Sample)
                        </span>
                      </div>
                      <h3 className="text-lg sm:text-xl font-heading font-normal text-charcoal dark:text-white mt-0.5">
                        The Interpretive Explorer
                      </h3>
                    </div>
                    <span className="text-xs font-subheading font-bold text-coral px-2.5 py-1 rounded-full bg-coral/15">
                      Subjective Mode
                    </span>
                  </div>

                  <p className="text-xs font-body text-stone-600 dark:text-stone-300 leading-relaxed">
                    Treats letterforms as evocative visual poems. Projects personal emotional tension into unfamiliar script curves without requiring semantic readability or phonetic deciphering.
                  </p>

                  <div className="p-2.5 rounded-xl bg-white/90 dark:bg-stone-900/90 border border-coral/20 text-xs italic text-coral font-body">
                    "I don't need to read every word to feel what it's crying out."
                  </div>

                  {/* 3 Key Semiotic Drivers */}
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    <span className="text-[10px] font-subheading px-2 py-0.5 rounded-md bg-white dark:bg-stone-850 text-stone-700 dark:text-stone-300 border border-coral/15">
                      ✓ Ambiguity Tolerance 92%
                    </span>
                    <span className="text-[10px] font-subheading px-2 py-0.5 rounded-md bg-white dark:bg-stone-850 text-stone-700 dark:text-stone-300 border border-coral/15">
                      ✓ Emotional Projection 88%
                    </span>
                    <span className="text-[10px] font-subheading px-2 py-0.5 rounded-md bg-white dark:bg-stone-850 text-stone-700 dark:text-stone-300 border border-coral/15">
                      ✓ Form Over Semantic Lexicon
                    </span>
                  </div>
                </div>

                {/* Archetype 02: Senior Custodian */}
                <div 
                  onClick={() => setActiveArchetype(activeArchetype === 'custodian' ? 'all' : 'custodian')}
                  className={`p-4 sm:p-5 rounded-2xl border transition-all duration-300 cursor-pointer space-y-3 ${
                    activeArchetype === 'custodian' || activeArchetype === 'all'
                      ? 'border-lavender bg-lavender/10 dark:bg-lavender/15 shadow-xs ring-1 ring-lavender/20'
                      : 'border-stone-200/80 dark:border-stone-800 bg-stone-50/50 dark:bg-stone-950/40 opacity-60'
                  }`}
                >
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-lavender"></span>
                        <span className="text-[10px] font-subheading font-bold text-lavender uppercase tracking-wider">
                          Archetype 02 · 46+ Cohort (14.9% Sample)
                        </span>
                      </div>
                      <h3 className="text-lg sm:text-xl font-heading font-normal text-charcoal dark:text-white mt-0.5">
                        The Clarity-Forward Custodian
                      </h3>
                    </div>
                    <span className="text-xs font-subheading font-bold text-lavender px-2.5 py-1 rounded-full bg-lavender/20">
                      Structural Anchor
                    </span>
                  </div>

                  <p className="text-xs font-body text-stone-600 dark:text-stone-300 leading-relaxed">
                    Values baseline sanctity, recognizable ligatures, and cultural scaffolds. Experiences psychological disconnection when typography breaks horizontal flow or omits traditional motifs.
                  </p>

                  <div className="p-2.5 rounded-xl bg-white/90 dark:bg-stone-900/90 border border-lavender/25 text-xs italic text-lavender dark:text-purple-300 font-body">
                    "If typography sacrifices clarity for style, it loses trust."
                  </div>

                  {/* 3 Key Semiotic Drivers */}
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    <span className="text-[10px] font-subheading px-2 py-0.5 rounded-md bg-white dark:bg-stone-850 text-stone-700 dark:text-stone-300 border border-lavender/20">
                      ✓ Baseline Sanctity 94%
                    </span>
                    <span className="text-[10px] font-subheading px-2 py-0.5 rounded-md bg-white dark:bg-stone-850 text-stone-700 dark:text-stone-300 border border-lavender/20">
                      ✓ Heritage Scaffolding 90%
                    </span>
                    <span className="text-[10px] font-subheading px-2 py-0.5 rounded-md bg-white dark:bg-stone-850 text-stone-700 dark:text-stone-300 border border-lavender/20">
                      ✓ Semantic Verification 86%
                    </span>
                  </div>
                </div>

              </div>

            </div>

          </div>
        </section>
      </RevealOnScroll>

      {/* ------------------------------------------------------------- */}
      {/* 06. TYPOGRAPHIC SPECIMENS: THE FOUR SCRIPT STIMULI           */}
      {/* ------------------------------------------------------------- */}
      <RevealOnScroll direction="up">
        <section className="space-y-6">
          <div className="flex items-center gap-3">
            <span className="px-3 py-1 rounded-full text-xs font-subheading font-bold bg-charcoal text-white dark:bg-white dark:text-charcoal uppercase tracking-wider">
              06 · Typographic Stimuli
            </span>
            <span className="text-xs font-subheading font-semibold text-coral uppercase tracking-wider">
              Specimen Exploration
            </span>
          </div>

          <div className="space-y-2">
            <h2 className="text-2xl sm:text-3xl font-heading font-normal text-charcoal dark:text-white tracking-tight">
              Anatomy and emotional resonance of the four tested scripts
            </h2>
            <p className="text-stone-600 dark:text-stone-300 text-sm max-w-3xl leading-relaxed font-subheading">
              Inspect the four multilingual posters created without icons or explicit imagery, relying strictly on letterform anatomy, regional motifs, and spatial tension.
            </p>
          </div>

          {/* 4 Poster Tabs */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            {fourScriptPosters.map((poster, idx) => (
              <button
                key={poster.id}
                onClick={() => setActiveScriptIdx(idx)}
                className={`p-3 rounded-2xl border text-left transition-all cursor-pointer ${
                  activeScriptIdx === idx
                    ? 'border-coral bg-charcoal text-white dark:border-white dark:bg-white dark:text-stone-900 shadow-md scale-102 ring-1 ring-coral/40'
                    : 'border-stone-200 dark:border-stone-800 bg-white dark:bg-stone-900 text-stone-600 dark:text-stone-300 hover:border-coral'
                }`}
              >
                <span className="text-[10px] font-subheading block opacity-70">Specimen {poster.number}</span>
                <span className="text-sm font-subheading font-medium block mt-0.5">{poster.name}</span>
                <span className="text-[10px] font-subheading opacity-75 line-clamp-1">{poster.region}</span>
              </button>
            ))}
          </div>

          {/* Active Poster Detailed Inspection Card */}
          <div className="p-5 sm:p-7 rounded-3xl bg-white dark:bg-stone-900 border border-stone-200/90 dark:border-stone-800 shadow-sm space-y-5">
            <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1.5 border-b border-stone-100 dark:border-stone-800 pb-3">
              <div>
                <span className="text-[11px] font-subheading font-bold text-coral uppercase tracking-wider">
                  Specimen {currentPoster.number} · {currentPoster.name} Script
                </span>
                <h3 className="text-xl sm:text-2xl font-heading font-normal text-charcoal dark:text-white mt-0.5">
                  "{currentPoster.headline}"
                </h3>
                <p className="text-xs font-subheading text-stone-500 italic mt-0.5">
                  Translation: "{currentPoster.translation}"
                </p>
              </div>
              <span className="px-3 py-1 rounded-full text-xs font-subheading font-semibold bg-stone-100 dark:bg-stone-800 text-stone-700 dark:text-stone-300">
                {currentPoster.script}
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-12 gap-5 items-center">
              
              {/* Poster Image Frame with Scroll-Triggered Parallax */}
              <div className="md:col-span-5 flex justify-center">
                <div 
                  onClick={() => setViewingImage(currentPoster.posterImage)}
                  className="relative w-full max-w-[250px] aspect-[3/4] rounded-2xl bg-stone-100 dark:bg-stone-950 p-2 border border-stone-200 dark:border-stone-800 shadow-xs cursor-zoom-in group overflow-hidden"
                >
                  <ParallaxImage 
                    src={currentPoster.posterImage} 
                    alt={currentPoster.name} 
                    speed={0.14}
                    containerClassName="w-full h-full rounded-xl"
                    className="w-full h-full object-contain transition-transform duration-300 group-hover:scale-102"
                  >
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors flex items-center justify-center">
                      <span className="opacity-0 group-hover:opacity-100 transition-opacity px-3 py-1 rounded-full bg-white/95 dark:bg-stone-900/95 text-xs font-subheading font-medium text-charcoal dark:text-white shadow-md flex items-center gap-1">
                        <ZoomIn size={11} className="text-coral" /> Zoom
                      </span>
                    </div>
                  </ParallaxImage>
                </div>
              </div>

              {/* Anatomy & Findings */}
              <div className="md:col-span-7 space-y-3 text-xs font-body">
                <div className="p-3.5 rounded-2xl bg-stone-50/80 dark:bg-stone-950/60 border border-stone-200/80 dark:border-stone-800 space-y-0.5">
                  <span className="text-[10px] font-subheading font-bold text-coral uppercase tracking-wider block">
                    Typographic Anatomy & Strategy
                  </span>
                  <p className="text-stone-700 dark:text-stone-300 leading-relaxed font-body">
                    {currentPoster.anatomy}
                  </p>
                </div>

                <div className="p-3.5 rounded-2xl bg-stone-50/80 dark:bg-stone-950/60 border border-stone-200/80 dark:border-stone-800 space-y-0.5">
                  <span className="text-[10px] font-subheading font-bold text-lavender uppercase tracking-wider block">
                    Generational Perceptual Finding
                  </span>
                  <p className="text-stone-700 dark:text-stone-300 leading-relaxed font-body">
                    {currentPoster.perceptualFinding}
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-2.5 pt-0.5">
                  <div className="p-2.5 rounded-xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800">
                    <span className="text-[10px] font-subheading text-stone-400 block uppercase">Emotional Evocation</span>
                    <span className="text-lg font-heading text-coral font-bold">{currentPoster.emotionalScore} / 10</span>
                  </div>
                  <div className="p-2.5 rounded-xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800">
                    <span className="text-[10px] font-subheading text-stone-400 block uppercase">Semantic Legibility</span>
                    <span className="text-lg font-heading text-lavender font-bold">{currentPoster.legibilityScore} / 10</span>
                  </div>
                </div>

                {/* Cohort Voice Callouts */}
                <div className="space-y-1.5 pt-0.5 text-xs font-body">
                  <div className="p-2.5 rounded-xl bg-coral/5 border border-coral/15 flex items-start gap-1.5">
                    <span className="font-subheading text-coral font-bold shrink-0">Youth:</span>
                    <span className="italic text-stone-600 dark:text-stone-300">"{currentPoster.ageQuotes.youth}"</span>
                  </div>
                  <div className="p-2.5 rounded-xl bg-lavender/10 border border-lavender/20 flex items-start gap-1.5">
                    <span className="font-subheading text-lavender font-bold shrink-0">Senior:</span>
                    <span className="italic text-stone-600 dark:text-stone-300">"{currentPoster.ageQuotes.senior}"</span>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </section>
      </RevealOnScroll>

      {/* ------------------------------------------------------------- */}
      {/* 07. EXHIBITION SHOWCASE: CLEAN PREMIUM MOCKUP                 */}
      {/* ------------------------------------------------------------- */}
      <RevealOnScroll direction="up">
        <section className="space-y-5">
          <div className="space-y-2">
            <span className="text-xs font-subheading font-semibold text-coral uppercase tracking-wider block">
              Exhibition Showcase
            </span>
            <h2 className="text-2xl sm:text-3xl font-heading font-normal text-charcoal dark:text-white tracking-tight">
              Research Poster in Exhibition Space
            </h2>
            <p className="text-stone-600 dark:text-stone-300 text-sm max-w-3xl leading-relaxed font-subheading">
              The research culminated in a comprehensive multilingual typography poster synthesizing field findings, quantitative distributions, and inclusive design principles.
            </p>
          </div>

          {/* Clean Behance-Style Mockup Card with Scroll-Triggered Parallax */}
          <div className="rounded-3xl bg-white dark:bg-stone-900 border border-stone-200/90 dark:border-stone-800 shadow-xl overflow-hidden group">
            <div 
              onClick={() => setViewingImage('/assets/behance_poster_mockup.jpg')}
              className="relative w-full aspect-[4/3] sm:aspect-[16/10] max-h-[600px] bg-stone-100 dark:bg-stone-950 flex items-center justify-center p-2 sm:p-4 cursor-zoom-in overflow-hidden"
            >
              <ParallaxImage
                src="/assets/behance_poster_mockup.jpg" 
                alt="Research Poster in Studio Gallery Exhibition" 
                speed={0.12}
                containerClassName="w-full h-full rounded-2xl"
                className="w-full h-full object-contain rounded-2xl shadow-md transition-transform duration-700 group-hover:scale-[1.01]"
              >
                {/* Clean minimal hover hint */}
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/15 transition-colors flex items-center justify-center pointer-events-none">
                  <span className="opacity-0 group-hover:opacity-100 transition-opacity px-4 py-2 rounded-full bg-white/95 dark:bg-stone-900/95 backdrop-blur text-xs font-subheading font-medium text-charcoal dark:text-white shadow-xl flex items-center gap-1.5">
                    <ZoomIn size={14} className="text-coral" /> Click to View Fullscreen
                  </span>
                </div>
              </ParallaxImage>
            </div>
          </div>
        </section>
      </RevealOnScroll>

      {/* ------------------------------------------------------------- */}
      {/* 08. THREE ACTIONABLE PRINCIPLES & CONCLUSION                  */}
      {/* ------------------------------------------------------------- */}
      <RevealOnScroll direction="up">
        <section className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-stone-900 border border-stone-200/90 dark:border-stone-800 shadow-sm space-y-6">
          <div className="space-y-2">
            <span className="text-xs font-subheading font-bold text-coral uppercase tracking-wider block">
              Design Research Conclusion & Future Scope
            </span>
            <h2 className="text-2xl sm:text-3xl font-heading font-normal text-charcoal dark:text-white tracking-tight">
              Three actionable principles for inclusive multilingual typography
            </h2>
            <p className="text-stone-600 dark:text-stone-300 text-xs sm:text-sm max-w-2xl leading-relaxed font-subheading">
              How designers, brand strategists, and public wayfinding architects can build emotionally resonant typography without alienating older audiences.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-1">
            
            {/* Principle 01 */}
            <div className="space-y-2.5 p-4 rounded-2xl bg-stone-50/80 dark:bg-stone-950/60 border border-stone-200/80 dark:border-stone-800 hover:border-coral/40 transition-colors">
              <div className="w-8 h-8 rounded-full bg-coral/15 text-coral flex items-center justify-center font-heading font-bold text-xs border border-coral/30">
                01
              </div>
              <h3 className="text-sm font-subheading font-medium text-charcoal dark:text-white">
                Multi-Script Integration
              </h3>
              <p className="text-xs text-stone-600 dark:text-stone-300 leading-relaxed font-body">
                Arrange scripts side-by-side, intertwined, or rhythmically stacked to connect visually rather than isolating languages into separate functional columns.
              </p>
            </div>

            {/* Principle 02 */}
            <div className="space-y-2.5 p-4 rounded-2xl bg-stone-50/80 dark:bg-stone-950/60 border border-stone-200/80 dark:border-stone-800 hover:border-lavender/40 transition-colors">
              <div className="w-8 h-8 rounded-full bg-lavender/15 text-lavender flex items-center justify-center font-heading font-bold text-xs border border-lavender/30">
                02
              </div>
              <h3 className="text-sm font-subheading font-medium text-charcoal dark:text-white">
                Typographic Emotion Mapping
              </h3>
              <p className="text-xs text-stone-600 dark:text-stone-300 leading-relaxed font-body">
                Leverage stroke thickness, character spacing, baseline cadence, and contrast to evoke nuanced emotional feelings before the linguistic text is even read.
              </p>
            </div>

            {/* Principle 03 */}
            <div className="space-y-2.5 p-4 rounded-2xl bg-stone-50/80 dark:bg-stone-950/60 border border-stone-200/80 dark:border-stone-800 hover:border-coral/40 transition-colors">
              <div className="w-8 h-8 rounded-full bg-coral/15 text-coral flex items-center justify-center font-heading font-bold text-xs border border-coral/30">
                03
              </div>
              <h3 className="text-sm font-subheading font-medium text-charcoal dark:text-white">
                Textured Typography Scaffolding
              </h3>
              <p className="text-xs text-stone-600 dark:text-stone-300 leading-relaxed font-body">
                Satisfy younger audiences' hunger for depth and abstraction while simultaneously providing familiar cultural textures (block prints, temple geometries) to give older readers reassurance.
              </p>
            </div>

          </div>
        </section>
      </RevealOnScroll>

    </article>
  );
};

export default TypeAndEmotionCaseStudy;
