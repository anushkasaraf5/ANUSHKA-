import React, { useState, useRef } from 'react';
import {
  ArrowRight,
  ArrowLeft,
  Play,
  RotateCcw,
  ZoomIn,
  CheckCircle2,
  AlertCircle,
  GitBranch,
  Database,
  Smartphone,
  Bell,
  Users,
  Sparkles
} from 'lucide-react';

/* ============================================================================
   1. OPPORTUNITY LANDSCAPE CHART (Importance vs. Satisfaction, 0 to 10)
      Inspired by knoor.framer.website/classroom-orange diagonal zone SVG plot
   ============================================================================ */
interface OpportunityNode {
  id: string;
  label: string;
  phase: 'Before Event' | 'Event Day' | 'Post-Event';
  importance: number; // 0 - 10
  satisfaction: number; // 0 - 10
  zone: 'Underserved' | 'Appropriately served' | 'Overserved';
  detail: string;
}

const OPPORTUNITY_NODES: OpportunityNode[] = [
  {
    id: 'venue-shift',
    label: 'Instant room / venue change alerts',
    phase: 'Event Day',
    importance: 9.6,
    satisfaction: 1.7,
    zone: 'Underserved',
    detail: '84% of attendees missed last-minute room relocations buried in forwarded WhatsApp chats.'
  },
  {
    id: 'entry-pass',
    label: 'Immediate post-form entry pass & QR',
    phase: 'Before Event',
    importance: 9.2,
    satisfaction: 2.1,
    zone: 'Underserved',
    detail: 'After submitting a Google Form, students hit a complete communication blackout until event morning.'
  },
  {
    id: 'cert-issue',
    label: 'Verified certificate without chasing',
    phase: 'Post-Event',
    importance: 9.0,
    satisfaction: 1.9,
    zone: 'Underserved',
    detail: 'Students spent weeks messaging coordinators for attendance proof and missing PDF certificates.'
  },
  {
    id: 'live-schedule',
    label: 'Single authoritative live schedule',
    phase: 'Event Day',
    importance: 9.4,
    satisfaction: 2.8,
    zone: 'Underserved',
    detail: 'Printed posters, email circulars, and class groups frequently showed three conflicting start times.'
  },
  {
    id: 'prep-checklist',
    label: 'Know prerequisites & what to bring',
    phase: 'Before Event',
    importance: 8.1,
    satisfaction: 3.1,
    zone: 'Underserved',
    detail: 'Workshop laptop requirements, ID rules, and gate entry instructions rarely reached external delegates.'
  },
  {
    id: 'help-contact',
    label: 'Direct verified helpdesk contact',
    phase: 'Event Day',
    importance: 7.8,
    satisfaction: 3.5,
    zone: 'Underserved',
    detail: 'Attendees relied on personal phone numbers of specific student leads, overwhelming 1–2 individuals.'
  },
  {
    id: 'speaker-context',
    label: 'Speaker profiles & session tracks',
    phase: 'Before Event',
    importance: 7.2,
    satisfaction: 5.8,
    zone: 'Appropriately served',
    detail: 'Departmental social media posts shared basic speaker bios, though disconnected from session timings.'
  },
  {
    id: 'payment-verify',
    label: 'Fee receipt & registration confirmation',
    phase: 'Before Event',
    importance: 8.5,
    satisfaction: 4.9,
    zone: 'Appropriately served',
    detail: 'Finance teams manually reconciled payment screenshots before confirming paid workshop seats.'
  },
  {
    id: 'feedback-loop',
    label: 'Calm post-event feedback capture',
    phase: 'Post-Event',
    importance: 6.8,
    satisfaction: 4.4,
    zone: 'Appropriately served',
    detail: 'Feedback links sent days later suffered low response rates when decoupled from certificate access.'
  },
  {
    id: 'campus-posters',
    label: 'Visual teaser posters on noticeboards',
    phase: 'Before Event',
    importance: 5.4,
    satisfaction: 7.9,
    zone: 'Overserved',
    detail: 'Design sub-teams invested heavy effort in static print posters that became outdated whenever venues shifted.'
  },
  {
    id: 'insta-reels',
    label: 'Hype reels & countdown graphics',
    phase: 'Before Event',
    importance: 4.6,
    satisfaction: 7.4,
    zone: 'Overserved',
    detail: 'High visual polish on social teasers, while core logistical clarity remained underserved.'
  }
];

export const OpportunityLandscapeChart: React.FC = () => {
  const [phaseFilter, setPhaseFilter] = useState<'All' | 'Before Event' | 'Event Day' | 'Post-Event'>('All');
  const [selectedId, setSelectedId] = useState<string>('venue-shift');

  const visibleNodes = phaseFilter === 'All'
    ? OPPORTUNITY_NODES
    : OPPORTUNITY_NODES.filter(n => n.phase === phaseFilter);

  const activeNode = OPPORTUNITY_NODES.find(n => n.id === selectedId) || OPPORTUNITY_NODES[0];

  // Coordinate mapping inside 860 x 440 SVG: plot box x=[76..826] (width 750), y=[28..388] (height 360)
  const mapX = (imp: number) => 76 + (imp / 10) * 750;
  const mapY = (sat: number) => 388 - (sat / 10) * 360;

  return (
    <div className="rounded-2xl border border-stone-200 dark:border-stone-800 bg-white dark:bg-stone-900 p-5 sm:p-8 space-y-6">
      {/* Top Controls & Legend */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-4 border-b border-stone-200/80 dark:border-stone-800">
        <div>
          <p className="text-[13px] font-clean text-stone-500 dark:text-stone-400">
            Importance vs. current satisfaction · Scored 0 to 10 across 47 interviews
          </p>
          <h4 className="text-lg sm:text-xl font-editorial font-normal text-charcoal dark:text-white mt-0.5">
            Needs in the bottom-right were critical yet broken — where Event Journey Card focused first
          </h4>
        </div>

        <div className="flex flex-wrap items-center gap-1.5 p-1 rounded-xl bg-stone-100 dark:bg-stone-850 border border-stone-200/70 dark:border-stone-800 self-start">
          {(['All', 'Before Event', 'Event Day', 'Post-Event'] as const).map(tab => (
            <button
              key={tab}
              onClick={() => setPhaseFilter(tab)}
              className={`px-3 py-1.5 rounded-lg text-[13px] font-clean font-medium transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                phaseFilter === tab
                  ? 'bg-white dark:bg-stone-900 text-charcoal dark:text-white shadow-xs'
                  : 'text-stone-600 dark:text-stone-400 hover:text-charcoal dark:hover:text-white'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {/* SVG Coordinate Plot */}
      <div className="w-full overflow-x-auto">
        <div className="min-w-[680px]">
          <svg
            viewBox="0 0 860 435"
            className="w-full h-auto select-none"
            role="img"
            aria-label="Opportunity landscape scatter plot comparing importance and satisfaction from 0 to 10"
          >
            <defs>
              <linearGradient id="oppAppropriate" x1="0" y1="1" x2="1" y2="0">
                <stop offset="0%" stopColor="#E8552E" stopOpacity="0.04" />
                <stop offset="100%" stopColor="#E8552E" stopOpacity="0.11" />
              </linearGradient>
              <linearGradient id="oppUnderserved" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#E8552E" stopOpacity="0.10" />
                <stop offset="100%" stopColor="#E8552E" stopOpacity="0.24" />
              </linearGradient>
            </defs>

            {/* Zone 1: Overserved (Top-Left Triangle) */}
            <polygon
              points="76,388 76,28 826,28"
              className="fill-stone-100/80 dark:fill-stone-800/35"
            />

            {/* Zone 2: Appropriately Served (Middle Wedge) */}
            <polygon
              points="76,388 826,28 451,388"
              fill="url(#oppAppropriate)"
            />

            {/* Zone 3: Underserved (Bottom-Right Priority Wedge) */}
            <polygon
              points="451,388 826,28 826,388"
              fill="url(#oppUnderserved)"
            />

            {/* Subtle Grid Hairlines */}
            {[2, 4, 6, 8, 10].map(val => {
              const gx = mapX(val);
              const gy = mapY(val);
              return (
                <g key={val}>
                  <line
                    x1={gx}
                    y1={28}
                    x2={gx}
                    y2={388}
                    stroke="currentColor"
                    className="text-stone-200/70 dark:text-stone-800/70"
                    strokeWidth="1"
                  />
                  <line
                    x1={76}
                    y1={gy}
                    x2={826}
                    y2={gy}
                    stroke="currentColor"
                    className="text-stone-200/70 dark:text-stone-800/70"
                    strokeWidth="1"
                  />
                </g>
              );
            })}

            {/* Diagonal Zone Threshold Lines (Knoor style) */}
            <line
              x1="76"
              y1="388"
              x2="826"
              y2="28"
              stroke="#E8552E"
              strokeOpacity="0.55"
              strokeWidth="1.3"
              strokeDasharray="5 5"
            />
            <line
              x1="451"
              y1="388"
              x2="826"
              y2="28"
              stroke="#E8552E"
              strokeOpacity="0.85"
              strokeWidth="1.4"
              strokeDasharray="5 5"
            />
            <line
              x1="610"
              y1="388"
              x2="826"
              y2="180"
              stroke="#E8552E"
              strokeOpacity="0.35"
              strokeWidth="1"
              strokeDasharray="3 6"
            />

            {/* Axes */}
            <line
              x1="76"
              y1="28"
              x2="76"
              y2="388"
              stroke="currentColor"
              className="text-stone-300 dark:text-stone-700"
              strokeWidth="1.4"
            />
            <line
              x1="76"
              y1="388"
              x2="826"
              y2="388"
              stroke="currentColor"
              className="text-stone-300 dark:text-stone-700"
              strokeWidth="1.4"
            />

            {/* Zone Watermark Labels */}
            <text x="112" y="72" className="fill-stone-500 dark:fill-stone-400 text-[12px] font-clean font-medium">
              Overserved
            </text>
            <text x="370" y="218" className="fill-stone-600 dark:fill-stone-300 text-[12px] font-clean font-medium">
              Appropriately served
            </text>
            <text x="655" y="352" className="fill-coral text-[13px] font-clean font-semibold">
              Underserved (Priority Focus)
            </text>

            {/* Y-Axis Labels */}
            <text x="62" y="36" textAnchor="end" className="fill-stone-500 text-[11px] font-mono">10 High</text>
            <text x="62" y="212" textAnchor="end" className="fill-stone-400 text-[11px] font-clean">5</text>
            <text x="62" y="388" textAnchor="end" className="fill-stone-500 text-[11px] font-mono">0 Low</text>
            <text
              x="22"
              y="208"
              textAnchor="middle"
              transform="rotate(-90 22 208)"
              className="fill-stone-600 dark:fill-stone-400 text-[12px] font-clean font-medium tracking-wide"
            >
              Satisfaction Today →
            </text>

            {/* X-Axis Labels */}
            <text x="76" y="410" textAnchor="start" className="fill-stone-500 text-[11px] font-mono">0 Low</text>
            <text x="451" y="410" textAnchor="middle" className="fill-stone-400 text-[11px] font-clean">Importance to Attendee →</text>
            <text x="826" y="410" textAnchor="end" className="fill-stone-500 text-[11px] font-mono">10 High</text>

            {/* Plotted Nodes */}
            {visibleNodes.map((node) => {
              const cx = mapX(node.importance);
              const cy = mapY(node.satisfaction);
              const isSelected = node.id === activeNode.id;
              const isUnderserved = node.zone === 'Underserved';

              return (
                <g
                  key={node.id}
                  onClick={() => setSelectedId(node.id)}
                  onMouseEnter={() => setSelectedId(node.id)}
                  className="cursor-pointer group"
                >
                  {isSelected && (
                    <circle
                      cx={cx}
                      cy={cy}
                      r="15"
                      className="fill-coral/20 stroke-coral"
                      strokeWidth="1.2"
                    />
                  )}
                  <circle
                    cx={cx}
                    cy={cy}
                    r={isSelected ? 7.5 : 6}
                    className={
                      isUnderserved
                        ? 'fill-coral stroke-white dark:stroke-stone-900'
                        : node.zone === 'Appropriately served'
                        ? 'fill-lavender stroke-white dark:stroke-stone-900'
                        : 'fill-stone-500 stroke-white dark:stroke-stone-900'
                    }
                    strokeWidth="2"
                  />
                  {/* Compact Direct Label for Selected or Key Nodes */}
                  {(isSelected || node.id === 'venue-shift' || node.id === 'campus-posters') && (
                    <g transform={`translate(${cx > 640 ? cx - 12 : cx + 12}, ${cy - 8})`}>
                      <rect
                        x={cx > 640 ? -198 : -4}
                        y="-12"
                        width="202"
                        height="22"
                        rx="5"
                        className={`${
                          isSelected
                            ? 'fill-charcoal dark:fill-white'
                            : 'fill-white/95 dark:fill-stone-900/95 stroke-stone-300 dark:stroke-stone-700'
                        }`}
                        strokeWidth={isSelected ? 0 : 1}
                      />
                      <text
                        x={cx > 640 ? -97 : 97}
                        y="3"
                        textAnchor="middle"
                        className={`text-[10.5px] font-clean font-medium ${
                          isSelected
                            ? 'fill-white dark:fill-charcoal'
                            : 'fill-charcoal dark:fill-stone-200'
                        }`}
                      >
                        {node.label.length > 29 ? node.label.slice(0, 28) + '…' : node.label}
                      </text>
                    </g>
                  )}
                </g>
              );
            })}
          </svg>
        </div>
      </div>

      {/* Selected Need Inspector Strip + Quick Need Selector */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 pt-2 border-t border-stone-200/80 dark:border-stone-800 items-start">
        <div className="lg:col-span-5 p-4 rounded-xl bg-stone-50 dark:bg-stone-850 border border-stone-200/80 dark:border-stone-800 space-y-2">
          <div className="flex items-center justify-between text-[13px] font-clean">
            <span className="font-semibold text-coral">{activeNode.zone}</span>
            <span className="font-mono text-stone-500 tabular-nums">
              Imp {activeNode.importance.toFixed(1)} · Sat {activeNode.satisfaction.toFixed(1)}
            </span>
          </div>
          <h5 className="text-base font-editorial text-charcoal dark:text-white">
            {activeNode.label}
          </h5>
          <p className="text-[13px] font-clean text-stone-600 dark:text-stone-300 leading-relaxed">
            {activeNode.detail}
          </p>
        </div>

        {/* 3 Stage Columns of Needs (Knoor style) */}
        <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-3 gap-4">
          {(['Before Event', 'Event Day', 'Post-Event'] as const).map(stage => (
            <div key={stage} className="space-y-2">
              <span className="text-[13px] font-clean font-semibold text-charcoal dark:text-white block border-b border-stone-200 dark:border-stone-800 pb-1">
                {stage}
              </span>
              <div className="space-y-1">
                {OPPORTUNITY_NODES.filter(n => n.phase === stage).map(item => {
                  const active = item.id === activeNode.id;
                  return (
                    <button
                      key={item.id}
                      onClick={() => setSelectedId(item.id)}
                      className={`w-full text-left px-2.5 py-1.5 rounded-lg text-[13px] font-clean transition-colors flex items-start gap-2 cursor-pointer ${
                        active
                          ? 'bg-coral/10 text-coral font-medium'
                          : 'text-stone-600 dark:text-stone-400 hover:bg-stone-100 dark:hover:bg-stone-800/70 hover:text-charcoal dark:hover:text-white'
                      }`}
                    >
                      <span
                        className={`mt-1.5 w-1.5 h-1.5 rounded-full shrink-0 ${
                          item.zone === 'Underserved'
                            ? 'bg-coral'
                            : item.zone === 'Appropriately served'
                            ? 'bg-lavender'
                            : 'bg-stone-400'
                        }`}
                      />
                      <span className="leading-snug">{item.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

/* ============================================================================
   2. HUB-AND-SPOKE ECOSYSTEM MAP & STAKEHOLDER GOVERNANCE MATRIX
      Faithful to Anushka's systems_slide_15.png & systems_slide_14.png
      Styled with Knoor's delicate curved bezier SVG connectors
   ============================================================================ */
interface EcosystemSpoke {
  id: string;
  title: string;
  subtitle: string;
  items: string[];
  outboundToHub: string;
  inboundFromHub: string;
  x: number; // % in 1000x620 viewBox
  y: number;
  anchorX: number;
  anchorY: number;
  hubAttachX: number;
  hubAttachY: number;
}

const ECOSYSTEM_SPOKES: EcosystemSpoke[] = [
  {
    id: 'admin',
    title: 'Institution / Administration',
    subtitle: 'Management, Dean, HOD, Academic Office',
    items: ['Approves events & policies', 'Allocates venue, funds & permissions', 'Ensures academic alignment'],
    outboundToHub: 'Provides official approval & policy guardrails',
    inboundFromHub: 'Submits proposals, budgets & room requests',
    x: 500,
    y: 78,
    anchorX: 500,
    anchorY: 138,
    hubAttachX: 500,
    hubAttachY: 238
  },
  {
    id: 'faculty',
    title: 'Faculty / Academic Depts',
    subtitle: 'Department Mentors & Advisors',
    items: ['Propose ideas & identify need', 'Guide and mentor student leads', 'Validate academic content'],
    outboundToHub: 'Academic guidance & theme sign-off',
    inboundFromHub: 'Progress updates & escalation queries',
    x: 175,
    y: 155,
    anchorX: 315,
    anchorY: 175,
    hubAttachX: 405,
    hubAttachY: 268
  },
  {
    id: 'pr',
    title: 'Communication Team / PR',
    subtitle: 'Design, Social Media, Email, Website',
    items: ['Create posters & digital outreach', 'Publish across Instagram, WhatsApp & boards', 'Handle inbound student queries'],
    outboundToHub: 'Shares reach & engagement questions',
    inboundFromHub: 'Shares event details, changes & deadlines',
    x: 825,
    y: 155,
    anchorX: 685,
    anchorY: 175,
    hubAttachX: 595,
    hubAttachY: 268
  },
  {
    id: 'speakers',
    title: 'Speaker / Guest',
    subtitle: 'Visiting Experts & Panellists',
    items: ['Confirm participation & AV needs', 'Deliver keynote & workshop sessions', 'Engage directly with participants'],
    outboundToHub: 'Confirms availability & tech requirements',
    inboundFromHub: 'Invites, coordinates travel & session brief',
    x: 155,
    y: 335,
    anchorX: 295,
    anchorY: 330,
    hubAttachX: 392,
    hubAttachY: 310
  },
  {
    id: 'partners',
    title: 'External / Partners',
    subtitle: 'Sponsors, Vendors & Catering',
    items: ['Provide sponsorship & print materials', 'Deliver catering & stage hardware', 'Coordinate contracts & logistics'],
    outboundToHub: 'Confirms vendor deliverables & schedules',
    inboundFromHub: 'Coordinates requirements & contracts',
    x: 845,
    y: 335,
    anchorX: 705,
    anchorY: 330,
    hubAttachX: 608,
    hubAttachY: 310
  },
  {
    id: 'support',
    title: 'Support Staff & IT',
    subtitle: 'Facilities, Security, AV & Web Platform',
    items: ['Manage physical auditorium & turnstiles', 'Configure registration forms & mics', 'On-ground troubleshooting'],
    outboundToHub: 'Provides venue access & AV readiness',
    inboundFromHub: 'Submits room setup & tech requirements',
    x: 185,
    y: 515,
    anchorX: 320,
    anchorY: 485,
    hubAttachX: 420,
    hubAttachY: 358
  },
  {
    id: 'participants',
    title: 'Participants (Attendees)',
    subtitle: 'Students, Faculty & External Delegates',
    items: ['Discover event & submit registration', 'Check venue, timings & entry pass', 'Attend sessions & claim certificates'],
    outboundToHub: 'Raises queries, attends & shares feedback',
    inboundFromHub: 'Manages registration, updates & certificates',
    x: 500,
    y: 530,
    anchorX: 500,
    anchorY: 465,
    hubAttachX: 500,
    hubAttachY: 378
  },
  {
    id: 'finance',
    title: 'Finance / Accounts',
    subtitle: 'Budgeting, Fees & Reimbursements',
    items: ['Verify participant fee payments', 'Process vendor purchase requests', 'Audit event financial records'],
    outboundToHub: 'Shares payment verification & clearances',
    inboundFromHub: 'Raises purchase & reimbursement requests',
    x: 815,
    y: 515,
    anchorX: 680,
    anchorY: 485,
    hubAttachX: 580,
    hubAttachY: 358
  }
];

export const StakeholderEcosystemMap: React.FC<{ onZoomOriginal?: (url: string) => void }> = ({ onZoomOriginal }) => {
  const [viewMode, setViewMode] = useState<'ecosystem' | 'governance'>('ecosystem');
  const [activeSpokeId, setActiveSpokeId] = useState<string>('participants');

  const activeSpoke = ECOSYSTEM_SPOKES.find(s => s.id === activeSpokeId) || ECOSYSTEM_SPOKES[6];

  return (
    <div className="rounded-2xl border border-stone-200 dark:border-stone-800 bg-white dark:bg-stone-900 p-5 sm:p-8 space-y-6">
      {/* Header & Mode Switch */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-stone-200/80 dark:border-stone-800">
        <div>
          <p className="text-[13px] font-clean text-stone-500 dark:text-stone-400">
            Institutional Ecosystem & Governance · Click any actor node to trace live handoffs
          </p>
          <h4 className="text-lg sm:text-xl font-editorial font-normal text-charcoal dark:text-white mt-0.5">
            {viewMode === 'ecosystem'
              ? 'Eight campus entities orbit Event Organizers — diluting signals before they reach attendees'
              : 'Stakeholder Onion Ring & Power vs. Interest Matrix'}
          </h4>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <div className="flex items-center gap-1 p-1 rounded-xl bg-stone-100 dark:bg-stone-850 border border-stone-200/70 dark:border-stone-800">
            <button
              onClick={() => setViewMode('ecosystem')}
              className={`px-3 py-1.5 rounded-lg text-[13px] font-clean font-medium transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                viewMode === 'ecosystem'
                  ? 'bg-white dark:bg-stone-900 text-charcoal dark:text-white shadow-xs'
                  : 'text-stone-600 dark:text-stone-400'
              }`}
            >
              Ecosystem Hub Map
            </button>
            <button
              onClick={() => setViewMode('governance')}
              className={`px-3 py-1.5 rounded-lg text-[13px] font-clean font-medium transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                viewMode === 'governance'
                  ? 'bg-white dark:bg-stone-900 text-charcoal dark:text-white shadow-xs'
                  : 'text-stone-600 dark:text-stone-400'
              }`}
            >
              Power × Interest Grid
            </button>
          </div>

          {onZoomOriginal && (
            <button
              onClick={() =>
                onZoomOriginal(
                  viewMode === 'ecosystem'
                    ? '/assets/projects/systems-design/systems_slide_15.png'
                    : '/assets/projects/systems-design/systems_slide_14.png'
                )
              }
              className="px-3 py-2 rounded-xl border border-stone-200 dark:border-stone-700 text-[13px] font-clean text-stone-600 dark:text-stone-300 hover:border-coral hover:text-coral transition-colors flex items-center gap-1.5 whitespace-nowrap shrink-0 cursor-pointer"
            >
              <ZoomIn size={14} />
              <span>Original Map</span>
            </button>
          )}
        </div>
      </div>

      {viewMode === 'ecosystem' ? (
        <div className="space-y-5">
          {/* Interactive Hub-and-Spoke Vector Canvas */}
          <div className="w-full overflow-x-auto rounded-2xl bg-[#FAF8F6] dark:bg-stone-950 border border-stone-200/80 dark:border-stone-800 p-3 sm:p-5">
            <div className="min-w-[820px]">
              <svg
                viewBox="0 0 1000 615"
                className="w-full h-auto select-none"
                role="img"
                aria-label="Campus academic event hub and spoke ecosystem map"
              >
                <defs>
                  <pattern id="ecoGrid" width="24" height="24" patternUnits="userSpaceOnUse">
                    <path
                      d="M 24 0 L 0 0 0 24"
                      fill="none"
                      stroke="currentColor"
                      className="text-stone-200/55 dark:text-stone-800/45"
                      strokeWidth="0.7"
                    />
                  </pattern>
                  <marker id="arrowCoral" viewBox="0 0 10 10" refX="7" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                    <path d="M 0 1.5 L 8 5 L 0 8.5 z" fill="#E8552E" />
                  </marker>
                  <marker id="arrowMuted" viewBox="0 0 10 10" refX="7" refY="5" markerWidth="5" markerHeight="5" orient="auto-start-reverse">
                    <path d="M 0 1.5 L 8 5 L 0 8.5 z" fill="#B6ADA5" />
                  </marker>
                </defs>

                <rect width="1000" height="615" rx="14" fill="url(#ecoGrid)" />

                {/* Peripheral Secondary Inter-Actor Links (Authentic to systems_slide_15.png) */}
                <path
                  d="M 365 78 C 240 78, 195 95, 185 112"
                  fill="none"
                  stroke="#CEC6BE"
                  strokeWidth="1.2"
                  strokeDasharray="4 4"
                />
                <path
                  d="M 635 78 C 760 78, 805 95, 815 112"
                  fill="none"
                  stroke="#CEC6BE"
                  strokeWidth="1.2"
                  strokeDasharray="4 4"
                />
                <path
                  d="M 845 210 L 845 280"
                  fill="none"
                  stroke="#CEC6BE"
                  strokeWidth="1.2"
                  strokeDasharray="4 4"
                />
                <path
                  d="M 165 390 L 175 460"
                  fill="none"
                  stroke="#CEC6BE"
                  strokeWidth="1.2"
                  strokeDasharray="4 4"
                />
                <path
                  d="M 290 365 C 330 435, 370 495, 395 515"
                  fill="none"
                  stroke="#CEC6BE"
                  strokeWidth="1.2"
                  strokeDasharray="4 4"
                />

                {/* Primary Hub-and-Spoke Bezier Connectors */}
                {ECOSYSTEM_SPOKES.map((spoke) => {
                  const isActive = spoke.id === activeSpokeId;
                  const midX = (spoke.anchorX + spoke.hubAttachX) / 2;
                  const midY = (spoke.anchorY + spoke.hubAttachY) / 2;
                  const ctrlX1 = spoke.hubAttachX + (spoke.anchorX - spoke.hubAttachX) * 0.45;
                  const ctrlY1 = spoke.hubAttachY;
                  const ctrlX2 = spoke.anchorX - (spoke.anchorX - spoke.hubAttachX) * 0.35;
                  const ctrlY2 = spoke.anchorY;

                  return (
                    <g key={`edge-${spoke.id}`}>
                      <path
                        d={`M ${spoke.hubAttachX} ${spoke.hubAttachY} C ${ctrlX1} ${ctrlY1}, ${ctrlX2} ${ctrlY2}, ${spoke.anchorX} ${spoke.anchorY}`}
                        fill="none"
                        stroke={isActive ? '#E8552E' : '#C9C0B7'}
                        strokeWidth={isActive ? '2.4' : '1.4'}
                        markerEnd={isActive ? 'url(#arrowCoral)' : 'url(#arrowMuted)'}
                        markerStart={isActive ? 'url(#arrowCoral)' : undefined}
                      />
                      {isActive && (
                        <circle cx={midX} cy={midY} r="4.5" fill="#E8552E" />
                      )}
                    </g>
                  );
                })}

                {/* Central Hub Node: EVENT ORGANIZERS */}
                <g transform="translate(500, 308)">
                  <ellipse
                    cx="0"
                    cy="0"
                    rx="116"
                    ry="70"
                    className="fill-lavender stroke-white dark:stroke-stone-900"
                    strokeWidth="4"
                  />
                  <text
                    x="0"
                    y="-8"
                    textAnchor="middle"
                    className="fill-white text-[16px] font-editorial font-medium"
                  >
                    Event Organizers
                  </text>
                  <text
                    x="0"
                    y="13"
                    textAnchor="middle"
                    className="fill-white/90 text-[11px] font-clean"
                  >
                    Faculty · Student Core · Committees
                  </text>
                  <text
                    x="0"
                    y="31"
                    textAnchor="middle"
                    className="fill-white/75 text-[10px] font-mono"
                  >
                    CENTRAL RELAY HUB
                  </text>
                </g>

                {/* 8 Surrounding Spoke Cards */}
                {ECOSYSTEM_SPOKES.map((spoke) => {
                  const isActive = spoke.id === activeSpokeId;
                  const isParticipants = spoke.id === 'participants';
                  const boxW = 256;
                  const boxH = 104;

                  return (
                    <g
                      key={spoke.id}
                      transform={`translate(${spoke.x - boxW / 2}, ${spoke.y - boxH / 2})`}
                      onClick={() => setActiveSpokeId(spoke.id)}
                      onMouseEnter={() => setActiveSpokeId(spoke.id)}
                      className="cursor-pointer"
                    >
                      <rect
                        width={boxW}
                        height={boxH}
                        rx="12"
                        className={
                          isActive
                            ? 'fill-white dark:fill-stone-900 stroke-coral'
                            : isParticipants
                            ? 'fill-white dark:fill-stone-900 stroke-lavender/60'
                            : 'fill-white dark:fill-stone-900 stroke-stone-300 dark:stroke-stone-700'
                        }
                        strokeWidth={isActive ? '2.2' : '1.2'}
                      />
                      <text
                        x="14"
                        y="24"
                        className={`text-[12.5px] font-clean font-semibold ${
                          isActive ? 'fill-coral' : 'fill-charcoal dark:fill-white'
                        }`}
                      >
                        {spoke.title}
                      </text>
                      <text
                        x="14"
                        y="41"
                        className="fill-stone-500 dark:fill-stone-400 text-[10.5px] font-clean"
                      >
                        {spoke.subtitle}
                      </text>
                      <line
                        x1="14"
                        y1="50"
                        x2={boxW - 14}
                        y2="50"
                        stroke="currentColor"
                        className="text-stone-200 dark:text-stone-800"
                        strokeWidth="1"
                      />
                      <text
                        x="14"
                        y="68"
                        className="fill-stone-600 dark:fill-stone-300 text-[10.5px] font-clean"
                      >
                        • {spoke.items[0]}
                      </text>
                      <text
                        x="14"
                        y="85"
                        className="fill-stone-600 dark:fill-stone-300 text-[10.5px] font-clean"
                      >
                        • {spoke.items[1]}
                      </text>
                    </g>
                  );
                })}
              </svg>
            </div>
          </div>

          {/* Active Handoff Inspector Bar */}
          <div className="p-4 sm:p-5 rounded-xl bg-stone-50 dark:bg-stone-850 border border-stone-200/80 dark:border-stone-800 grid grid-cols-1 md:grid-cols-3 gap-4 items-center">
            <div>
              <span className="text-[12px] font-mono text-coral uppercase">Selected Entity</span>
              <h5 className="text-base font-editorial text-charcoal dark:text-white mt-0.5">
                {activeSpoke.title}
              </h5>
              <p className="text-[13px] font-clean text-stone-500 dark:text-stone-400">
                {activeSpoke.subtitle}
              </p>
            </div>

            <div className="p-3 rounded-lg bg-white dark:bg-stone-900 border border-stone-200/80 dark:border-stone-800">
              <span className="text-[11px] font-mono text-stone-400 block">ORGANIZERS → ENTITY</span>
              <p className="text-[13px] font-clean text-charcoal dark:text-stone-200 mt-0.5">
                {activeSpoke.inboundFromHub}
              </p>
            </div>

            <div className="p-3 rounded-lg bg-white dark:bg-stone-900 border border-stone-200/80 dark:border-stone-800">
              <span className="text-[11px] font-mono text-coral block">ENTITY → ORGANIZERS</span>
              <p className="text-[13px] font-clean text-charcoal dark:text-stone-200 mt-0.5">
                {activeSpoke.outboundToHub}
              </p>
            </div>
          </div>
        </div>
      ) : (
        /* VIEW B: Concentric Onion Ring + 2x2 Power vs Interest Coordinate Grid (systems_slide_14.png) */
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
          {/* Concentric Core vs Peripheral Stakeholder Ring */}
          <div className="lg:col-span-5 rounded-2xl bg-[#FAF8F6] dark:bg-stone-950 border border-stone-200 dark:border-stone-800 p-5 flex flex-col justify-between">
            <div>
              <span className="text-[12px] font-mono text-stone-500 uppercase">Concentric Proximity Model</span>
              <h5 className="text-base font-editorial text-charcoal dark:text-white mt-0.5">
                Core Execution vs. Institutional Boundary
              </h5>
            </div>

            <svg viewBox="0 0 380 360" className="w-full max-w-[340px] mx-auto my-2">
              {/* Outer Peripheral Circle */}
              <circle
                cx="190"
                cy="180"
                r="164"
                className="fill-coral/12 dark:fill-coral/15 stroke-coral/45"
                strokeWidth="1.5"
              />
              <text x="190" y="42" textAnchor="middle" className="fill-coral text-[11px] font-mono font-medium">
                OUTER INSTITUTIONAL BOUNDARY
              </text>
              <text x="190" y="62" textAnchor="middle" className="fill-charcoal dark:fill-stone-200 text-[11px] font-clean">
                University Management · Sponsors · Vendors
              </text>
              <text x="190" y="79" textAnchor="middle" className="fill-stone-600 dark:fill-stone-400 text-[11px] font-clean">
                Government · Non-Participating Campus Students
              </text>

              {/* Inner Core Circle */}
              <circle
                cx="190"
                cy="218"
                r="112"
                className="fill-white dark:fill-stone-900 stroke-lavender"
                strokeWidth="2"
              />
              <text x="190" y="146" textAnchor="middle" className="fill-lavender text-[11px] font-mono font-medium">
                CORE EVENT ACTORS
              </text>
              {[
                'Event Organisers (Core Team)',
                'Faculty / Academic Departments',
                'Administration & Finance',
                'PR, Tech & Student Volunteers',
                'Speakers, Support Staff & Attendees'
              ].map((line, idx) => (
                <text
                  key={idx}
                  x="190"
                  y={172 + idx * 21}
                  textAnchor="middle"
                  className="fill-charcoal dark:fill-stone-200 text-[11px] font-clean"
                >
                  {line}
                </text>
              ))}
            </svg>

            <p className="text-[13px] font-clean text-stone-600 dark:text-stone-400">
              Attendees sit inside the active event core alongside 9 teams, yet depend on approvals from the outer ring.
            </p>
          </div>

          {/* 2x2 Power vs Interest Coordinate Matrix */}
          <div className="lg:col-span-7 rounded-2xl bg-[#FAF8F6] dark:bg-stone-950 border border-stone-200 dark:border-stone-800 p-5 sm:p-6 flex flex-col justify-between space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-[12px] font-mono text-lavender uppercase">2×2 Governance Matrix</span>
                <h5 className="text-base font-editorial text-charcoal dark:text-white mt-0.5">
                  Power vs. Operational Interest
                </h5>
              </div>
              <span className="text-[12px] font-clean text-stone-500">Y: Power · X: Interest</span>
            </div>

            <div className="relative pl-6 pb-6">
              {/* Y Axis Label */}
              <div className="absolute left-0 top-1/2 -translate-y-1/2 -rotate-90 text-[11px] font-mono uppercase tracking-wider text-stone-500">
                Power →
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 border-l-2 border-b-2 border-stone-300 dark:border-stone-700 p-3">
                {/* Top Left: High Power, Low Interest */}
                <div className="p-4 rounded-xl bg-white dark:bg-stone-900 border border-coral/40 space-y-2">
                  <div className="flex items-center justify-between text-[12px] font-clean">
                    <span className="font-semibold text-coral">High Power · Low Interest</span>
                    <span className="font-mono text-stone-400">Bottleneck</span>
                  </div>
                  <ul className="text-[13px] font-clean text-stone-700 dark:text-stone-300 space-y-1">
                    <li>• University Management</li>
                    <li>• External Sponsors</li>
                    <li>• Government / Regulatory</li>
                  </ul>
                  <p className="text-[12px] font-clean text-stone-500 pt-1 border-t border-stone-100 dark:border-stone-800">
                    Gatekeep room & budget approvals without daily event context.
                  </p>
                </div>

                {/* Top Right: High Power, High Interest */}
                <div className="p-4 rounded-xl bg-white dark:bg-stone-900 border border-lavender/50 space-y-2">
                  <div className="flex items-center justify-between text-[12px] font-clean">
                    <span className="font-semibold text-lavender">High Power · High Interest</span>
                    <span className="font-mono text-stone-400">Drivers</span>
                  </div>
                  <ul className="text-[13px] font-clean text-stone-700 dark:text-stone-300 space-y-1">
                    <li>• Event Organisers (Core Team)</li>
                    <li>• Faculty / Academic Departments</li>
                    <li>• Campus Administration & Finance</li>
                  </ul>
                  <p className="text-[12px] font-clean text-stone-500 pt-1 border-t border-stone-100 dark:border-stone-800">
                    Own academic delivery, scheduling decisions, and sign-offs.
                  </p>
                </div>

                {/* Bottom Left: Low Power, Low Interest */}
                <div className="p-4 rounded-xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 space-y-2">
                  <div className="flex items-center justify-between text-[12px] font-clean">
                    <span className="font-semibold text-stone-600 dark:text-stone-300">Low Power · Low Interest</span>
                    <span className="font-mono text-stone-400">Monitor</span>
                  </div>
                  <ul className="text-[13px] font-clean text-stone-700 dark:text-stone-300 space-y-1">
                    <li>• External Vendors</li>
                    <li>• General Students (Non-Participants)</li>
                  </ul>
                  <p className="text-[12px] font-clean text-stone-500 pt-1 border-t border-stone-100 dark:border-stone-800">
                    Affected only by campus corridor or auditorium occupancy.
                  </p>
                </div>

                {/* Bottom Right: Low Power, High Interest */}
                <div className="p-4 rounded-xl bg-coral/5 dark:bg-coral/10 border border-coral/40 space-y-2">
                  <div className="flex items-center justify-between text-[12px] font-clean">
                    <span className="font-semibold text-coral">Low Power · High Interest</span>
                    <span className="font-mono text-coral">Target Users</span>
                  </div>
                  <ul className="text-[13px] font-clean text-stone-700 dark:text-stone-300 space-y-1">
                    <li>• Attendees & External Delegates</li>
                    <li>• PR, Technical & Student Volunteers</li>
                    <li>• Visiting Speakers & Support Staff</li>
                  </ul>
                  <p className="text-[12px] font-clean text-stone-600 dark:text-stone-300 pt-1 border-t border-coral/20">
                    Need instant schedule truth despite zero control over upstream delays.
                  </p>
                </div>
              </div>

              {/* X Axis Label */}
              <div className="text-center text-[11px] font-mono uppercase tracking-wider text-stone-500 mt-2">
                Operational Interest →
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

/* ============================================================================
   3. INTERNAL TEAM COMMUNICATION & DEPENDENCY BUS MAP
      Faithful to Anushka's systems_slide_18.png
   ============================================================================ */
interface InternalTeamNode {
  id: string;
  name: string;
  coreLinkLabel: string;
  tasks: string[];
  peerDependencies: { target: string; label: string }[];
}

const INTERNAL_TEAMS: InternalTeamNode[] = [
  {
    id: 'branding',
    name: 'Branding & PR',
    coreLinkLabel: 'Guidelines & Approvals',
    tasks: ['Visual identity', 'Event posters', 'Social media assets'],
    peerDependencies: [
      { target: 'logistics', label: 'Confirmed venue & print placements' },
      { target: 'registration', label: 'Registration link & form cutoffs' },
      { target: 'documentation', label: 'Visual templates & archive' }
    ]
  },
  {
    id: 'logistics',
    name: 'Logistics',
    coreLinkLabel: 'Venue & Budget Sanctions',
    tasks: ['Venue & space', 'Seating & layout', 'Equipment & tech', 'Transport & movement'],
    peerDependencies: [
      { target: 'branding', label: 'Room capacity & venue confirmation' },
      { target: 'installation', label: 'Space & equipment specs' },
      { target: 'hospitality', label: 'Food & accommodation movement' }
    ]
  },
  {
    id: 'registration',
    name: 'Registration',
    coreLinkLabel: 'Headcount & Changes',
    tasks: ['Registration form', 'Participant data', 'Confirmation & updates', 'Certificates (post-event)'],
    peerDependencies: [
      { target: 'logistics', label: 'Live attendee numbers for seating' },
      { target: 'hospitality', label: 'Delegate food & stay counts' }
    ]
  },
  {
    id: 'documentation',
    name: 'Documentation',
    coreLinkLabel: 'Reporting & Archive',
    tasks: ['Photography', 'Videography', 'Event report', 'Archive & assets'],
    peerDependencies: [
      { target: 'branding', label: 'Live reels & promotional visuals' },
      { target: 'installation', label: 'Stage & lighting framing' }
    ]
  },
  {
    id: 'installation',
    name: 'Installation',
    coreLinkLabel: 'Timeline & Escalation',
    tasks: ['Stage setup', 'Displays / signage', 'Materials / wayfinding', 'AV tech setup'],
    peerDependencies: [
      { target: 'branding', label: 'Print signage dimensions & designs' },
      { target: 'logistics', label: 'Auditorium access window' }
    ]
  },
  {
    id: 'hospitality',
    name: 'Hospitality',
    coreLinkLabel: 'Guest & Catering Scope',
    tasks: ['Guest management', 'Food & refreshments', 'Accommodation', 'On-ground support'],
    peerDependencies: [
      { target: 'logistics', label: 'Vendor & transport arrival times' },
      { target: 'registration', label: 'VIP & external speaker roster' }
    ]
  }
];

export const InternalTeamFlowMap: React.FC<{ onZoomOriginal?: (url: string) => void }> = ({ onZoomOriginal }) => {
  const [selectedTeam, setSelectedTeam] = useState<string>('logistics');
  const currentTeam = INTERNAL_TEAMS.find(t => t.id === selectedTeam) || INTERNAL_TEAMS[1];
  const linkedTargets = new Set(currentTeam.peerDependencies.map(d => d.target));

  return (
    <div className="rounded-2xl border border-stone-200 dark:border-stone-800 bg-white dark:bg-stone-900 p-5 sm:p-8 space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-stone-200/80 dark:border-stone-800">
        <div>
          <p className="text-[13px] font-clean text-stone-500 dark:text-stone-400">
            Internal Sub-Team Dependency Architecture · Click any sub-team to inspect cross-team blocking
          </p>
          <h4 className="text-lg sm:text-xl font-editorial font-normal text-charcoal dark:text-white mt-0.5">
            Why one delayed room approval stalls Branding, Registration, Installation, and Hospitality at once
          </h4>
        </div>
        {onZoomOriginal && (
          <button
            onClick={() => onZoomOriginal('/assets/projects/systems-design/systems_slide_18.png')}
            className="px-3 py-2 rounded-xl border border-stone-200 dark:border-stone-700 text-[13px] font-clean text-stone-600 dark:text-stone-300 hover:border-coral hover:text-coral transition-colors flex items-center gap-1.5 self-start whitespace-nowrap shrink-0 cursor-pointer"
          >
            <ZoomIn size={14} />
            <span>Original Team Map</span>
          </button>
        )}
      </div>

      <div className="w-full overflow-x-auto">
        <div className="min-w-[860px] rounded-2xl bg-[#FAF8F6] dark:bg-stone-950 border border-stone-200/80 dark:border-stone-800 p-6 space-y-2">
          {/* Apex Core Team Card */}
          <div className="max-w-md mx-auto p-4 rounded-xl bg-lavender/10 dark:bg-lavender/15 border border-lavender/40 text-center space-y-1">
            <span className="text-[11px] font-mono uppercase tracking-wider text-lavender font-medium">
              CORE TEAM · EVENT HEAD / FACULTY + COORDINATORS
            </span>
            <p className="text-[13px] font-clean text-charcoal dark:text-stone-200">
              Overall planning · Budget & venue approvals · Aligns all 6 teams · Handles escalation
            </p>
          </div>

          {/* SVG Top Distribution Tree */}
          <svg viewBox="0 0 960 64" className="w-full h-14 overflow-visible">
            <line x1="480" y1="0" x2="480" y2="24" stroke="#8B7CFF" strokeWidth="1.6" />
            <line x1="80" y1="24" x2="880" y2="24" stroke="#C8C0B8" strokeWidth="1.4" />
            {INTERNAL_TEAMS.map((t, idx) => {
              const cx = 80 + idx * 160;
              const isSelected = t.id === selectedTeam;
              const isLinked = linkedTargets.has(t.id);
              return (
                <g key={t.id}>
                  <line
                    x1={cx}
                    y1="24"
                    x2={cx}
                    y2="62"
                    stroke={isSelected ? '#E8552E' : isLinked ? '#6D5AE6' : '#C8C0B8'}
                    strokeWidth={isSelected || isLinked ? '2.2' : '1.3'}
                    strokeDasharray={isSelected ? undefined : '3 3'}
                  />
                  <rect
                    x={cx - 56}
                    y="31"
                    width="112"
                    height="18"
                    rx="4"
                    className="fill-[#FAF8F6] dark:fill-stone-950"
                  />
                  <text
                    x={cx}
                    y="43"
                    textAnchor="middle"
                    className={`text-[10px] font-mono ${
                      isSelected ? 'fill-coral font-medium' : 'fill-stone-500'
                    }`}
                  >
                    {t.coreLinkLabel}
                  </text>
                </g>
              );
            })}
          </svg>

          {/* 6 Sub-Team Columns */}
          <div className="grid grid-cols-6 gap-3">
            {INTERNAL_TEAMS.map((team) => {
              const isSelected = team.id === selectedTeam;
              const isLinked = linkedTargets.has(team.id);

              return (
                <button
                  key={team.id}
                  onClick={() => setSelectedTeam(team.id)}
                  className={`text-left p-3.5 rounded-xl border transition-all cursor-pointer flex flex-col justify-between ${
                    isSelected
                      ? 'bg-white dark:bg-stone-900 border-coral ring-2 ring-coral/20 shadow-sm'
                      : isLinked
                      ? 'bg-white dark:bg-stone-900 border-lavender/60'
                      : 'bg-white/80 dark:bg-stone-900/70 border-stone-200 dark:border-stone-800 hover:border-stone-400'
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between gap-1 mb-2">
                      <span
                        className={`text-[13px] font-clean font-semibold ${
                          isSelected
                            ? 'text-coral'
                            : isLinked
                            ? 'text-lavender'
                            : 'text-charcoal dark:text-white'
                        }`}
                      >
                        {team.name}
                      </span>
                    </div>
                    <ul className="space-y-1 text-[12px] font-clean text-stone-600 dark:text-stone-400">
                      {team.tasks.map((task, i) => (
                        <li key={i} className="leading-snug">• {task}</li>
                      ))}
                    </ul>
                  </div>

                  <div className="mt-3 pt-2 border-t border-stone-100 dark:border-stone-800 text-[11px] font-mono text-stone-400">
                    {isSelected ? 'Selected Focus' : isLinked ? 'Connected Peer' : 'Click to trace'}
                  </div>
                </button>
              );
            })}
          </div>

          {/* SVG Bottom Peer-to-Peer Lateral Dependency Bus */}
          <svg viewBox="0 0 960 68" className="w-full h-16 overflow-visible">
            {INTERNAL_TEAMS.map((team, idx) => {
              const startX = 80 + idx * 160;
              if (team.id !== selectedTeam) return null;
              return team.peerDependencies.map((dep, dIdx) => {
                const targetIdx = INTERNAL_TEAMS.findIndex(t => t.id === dep.target);
                const endX = 80 + targetIdx * 160;
                const busY = 22 + dIdx * 16;
                const midX = (startX + endX) / 2;
                return (
                  <g key={dep.target}>
                    <path
                      d={`M ${startX} 2 L ${startX} ${busY} L ${endX} ${busY} L ${endX} 2`}
                      fill="none"
                      stroke="#E8552E"
                      strokeWidth="1.8"
                      strokeDasharray="4 3"
                    />
                    <circle cx={startX} cy="4" r="3.5" fill="#E8552E" />
                    <circle cx={endX} cy="4" r="3.5" fill="#6D5AE6" />
                    <rect
                      x={midX - 95}
                      y={busY - 8}
                      width="190"
                      height="16"
                      rx="4"
                      className="fill-white dark:fill-stone-900 stroke-coral/40"
                      strokeWidth="1"
                    />
                    <text
                      x={midX}
                      y={busY + 3}
                      textAnchor="middle"
                      className="fill-coral text-[9.5px] font-mono font-medium"
                    >
                      {dep.label}
                    </text>
                  </g>
                );
              });
            })}
          </svg>
        </div>
      </div>
    </div>
  );
};

/* ============================================================================
   4. HORIZONTAL SCROLLABLE 7-STAGE JOURNEY & SYSTEM FLOWCHART
      Combines Knoor's "Scroll to explore" swimlane table + Anushka's systems_slide_16.png
   ============================================================================ */
const LEGACY_STAGES = [
  {
    num: '01',
    stage: 'Ideation',
    subtitle: 'Event idea proposed & discussed',
    steps: ['Identify need / opportunity', 'Faculty, student clubs & external pitch', 'Prepare concept note (objectives, theme)'],
    touchpoints: 'In-person faculty meetings · Draft docs',
    painPoint: 'Concept scope stays informal in personal notes without structured handover.',
    opportunity: 'Standardize core event metadata from day one.',
    sentimentY: 52
  },
  {
    num: '02',
    stage: 'Approval & Planning',
    subtitle: 'Proposal reviewed & resources allocated',
    steps: ['Submit proposal for approval', 'Admin reviews budget, venue & permission', 'Assign roles, timeline & logistics'],
    touchpoints: 'Paper circulars · Dean office · Emails',
    painPoint: '72h+ approval bottleneck freezes room confirmation and blocks downstream teams.',
    opportunity: 'Decouple early event page creation from final room assignment.',
    sentimentY: 108,
    critical: true
  },
  {
    num: '03',
    stage: 'Event Details',
    subtitle: 'Content, speaker & logistics finalized',
    steps: ['Confirm speaker & academic input', 'Lock title, date, venue, fees & eligibility', 'Generate registration Google Form link'],
    touchpoints: 'Spreadsheets · Personal WhatsApp threads',
    painPoint: 'Static & volatile details get mixed together with no version control.',
    opportunity: 'Separate static identity from live dynamic schedule modules.',
    sentimentY: 66
  },
  {
    num: '04',
    stage: 'Promotion & Outreach',
    subtitle: 'Information shared with target audience',
    steps: ['PR designs posters & social creatives', 'Publish via Instagram, Email, WhatsApp & boards', 'Reach students, faculty & external peers'],
    touchpoints: 'Printed posters · Instagram · Class groups',
    painPoint: 'Shrunk promo window; printed posters instantly go stale when rooms shift.',
    opportunity: 'Embed one permanent live QR/web link on all promotional media.',
    sentimentY: 58
  },
  {
    num: '05',
    stage: 'Registration',
    subtitle: 'Sign-up, payment check & confirmation',
    steps: ['Discover event & fill Google Form', 'DECISION: Payment required? (Yes → Finance verify / No)', 'Send confirmation + ticket QR if applicable'],
    touchpoints: 'Google Forms · UPI screenshots · Email',
    painPoint: 'Post-form blackout: communication drops off completely after hitting Submit.',
    opportunity: 'Auto-issue personal Event Journey Card URL immediately upon registration.',
    sentimentY: 118,
    hasDiamond: true,
    critical: true
  },
  {
    num: '06',
    stage: 'Event Execution',
    subtitle: 'On-ground setup, check-in & sessions',
    steps: ['Admin, IT & volunteers set up venue + AV', 'Participant check-in (QR / ID / manual sheet)', 'Speakers deliver sessions & live changes happen'],
    touchpoints: 'Gate desks · Manual lists · Panic calls',
    painPoint: '100+ repetitive morning calls asking "Which block?" and "Did timing change?"',
    opportunity: 'Sub-5-minute live broadcast banner + 2-second QR pass on the same link.',
    sentimentY: 96,
    critical: true
  },
  {
    num: '07',
    stage: 'Post-Event',
    subtitle: 'Feedback, certificates & learnings',
    steps: ['Collect participant feedback forms', 'Share photos, recordings & certificates', 'Document insights for future campus events'],
    touchpoints: 'Scattered Drive folders · Follow-up texts',
    painPoint: 'Weeks of students chasing organisers for missing attendance certificates.',
    opportunity: 'Unlock verified 1-tap PDF certificate & calm feedback right on the card.',
    sentimentY: 114,
    critical: true
  }
];

export const LegacyJourneySwimlaneTable: React.FC<{ onZoomOriginal?: (url: string) => void }> = ({ onZoomOriginal }) => {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scrollByAmount = (delta: number) => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: delta, behavior: 'smooth' });
    }
  };

  return (
    <div className="rounded-2xl border border-stone-200 dark:border-stone-800 bg-white dark:bg-stone-900 p-5 sm:p-8 space-y-5">
      {/* Header + Scroll Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-stone-200/80 dark:border-stone-800">
        <div>
          <p className="text-[13px] font-clean text-stone-500 dark:text-stone-400">
            End-to-End Information & Registration System Flow Map · Scroll horizontally to explore all 7 stages
          </p>
          <h4 className="text-lg sm:text-xl font-editorial font-normal text-charcoal dark:text-white mt-0.5">
            Mapping every action, decision diamond, and where the experience collapsed
          </h4>
        </div>

        <div className="flex items-center gap-2 self-start">
          <button
            onClick={() => scrollByAmount(-360)}
            aria-label="Scroll journey left"
            className="p-2 rounded-xl border border-stone-200 dark:border-stone-700 text-stone-600 dark:text-stone-300 hover:border-coral hover:text-coral transition-colors cursor-pointer"
          >
            <ArrowLeft size={16} />
          </button>
          <button
            onClick={() => scrollByAmount(360)}
            aria-label="Scroll journey right"
            className="p-2 rounded-xl border border-stone-200 dark:border-stone-700 text-stone-600 dark:text-stone-300 hover:border-coral hover:text-coral transition-colors cursor-pointer"
          >
            <ArrowRight size={16} />
          </button>
          {onZoomOriginal && (
            <button
              onClick={() => onZoomOriginal('/assets/projects/systems-design/systems_slide_16.png')}
              className="px-3 py-2 rounded-xl border border-stone-200 dark:border-stone-700 text-[13px] font-clean text-stone-600 dark:text-stone-300 hover:border-coral hover:text-coral transition-colors flex items-center gap-1.5 whitespace-nowrap shrink-0 cursor-pointer"
            >
              <ZoomIn size={14} />
              <span>Original Flow Slide</span>
            </button>
          )}
        </div>
      </div>

      {/* Horizontally Scrollable Swimlane Matrix */}
      <div ref={scrollRef} className="w-full overflow-x-auto pb-2 custom-scrollbar">
        <div className="min-w-[1440px] space-y-3">
          {/* ROW 1: STAGE HEADERS */}
          <div className="grid grid-cols-7 gap-3">
            {LEGACY_STAGES.map((s, idx) => (
              <div
                key={s.num}
                className={`p-4 rounded-xl border relative ${
                  s.critical
                    ? 'bg-coral/8 dark:bg-coral/15 border-coral/40'
                    : 'bg-stone-50 dark:bg-stone-850 border-stone-200 dark:border-stone-800'
                }`}
              >
                <div className="flex items-center justify-between text-[12px] font-mono mb-1">
                  <span className={s.critical ? 'text-coral font-semibold' : 'text-stone-500'}>
                    STAGE {s.num}
                  </span>
                  {idx < 6 && <span className="text-stone-400">→</span>}
                </div>
                <h5 className="text-base font-editorial text-charcoal dark:text-white leading-snug">
                  {s.stage}
                </h5>
                <p className="text-[12px] font-clean text-stone-500 dark:text-stone-400 mt-0.5 leading-snug">
                  {s.subtitle}
                </p>
              </div>
            ))}
          </div>

          {/* ROW 2: FLOWCHART STEPS + PAYMENT DECISION DIAMOND */}
          <div className="grid grid-cols-7 gap-3">
            {LEGACY_STAGES.map((s) => (
              <div
                key={`steps-${s.num}`}
                className="p-3.5 rounded-xl bg-[#FAF8F6] dark:bg-stone-950 border border-stone-200/80 dark:border-stone-800 flex flex-col justify-between space-y-2"
              >
                <span className="text-[11px] font-mono uppercase text-stone-400">Process Flow</span>
                <div className="space-y-2">
                  <div className="p-2.5 rounded-lg bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 text-[12px] font-clean text-charcoal dark:text-stone-200 leading-snug">
                    {s.steps[0]}
                  </div>
                  <div className="text-center text-stone-400 text-xs leading-none">↓</div>

                  {s.hasDiamond ? (
                    /* Authentic SVG Decision Diamond from systems_slide_16.png */
                    <div className="py-1">
                      <svg viewBox="0 0 180 94" className="w-full h-auto">
                        <polygon
                          points="90,4 166,42 90,80 14,42"
                          className="fill-coral/15 stroke-coral"
                          strokeWidth="1.5"
                        />
                        <text x="90" y="39" textAnchor="middle" className="fill-charcoal dark:fill-white text-[10px] font-clean font-semibold">
                          Payment
                        </text>
                        <text x="90" y="51" textAnchor="middle" className="fill-charcoal dark:fill-white text-[10px] font-clean font-semibold">
                          Required?
                        </text>
                        <text x="16" y="24" className="fill-coral text-[9.5px] font-mono">Yes → Verify</text>
                        <text x="138" y="24" className="fill-stone-500 text-[9.5px] font-mono">No ↓</text>
                      </svg>
                    </div>
                  ) : (
                    <>
                      <div className="p-2.5 rounded-lg bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 text-[12px] font-clean text-stone-600 dark:text-stone-300 leading-snug">
                        {s.steps[1]}
                      </div>
                      <div className="text-center text-stone-400 text-xs leading-none">↓</div>
                    </>
                  )}

                  <div className="p-2.5 rounded-lg bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 text-[12px] font-clean text-charcoal dark:text-stone-200 leading-snug">
                    {s.steps[2]}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* ROW 3: CONTINUOUS SVG EXPERIENCE / SIGNAL INTEGRITY CURVE */}
          <div className="rounded-xl bg-[#FAF8F6] dark:bg-stone-950 border border-stone-200/80 dark:border-stone-800 px-4 py-3">
            <div className="flex items-center justify-between text-[11px] font-mono text-stone-500 mb-1">
              <span>EXPERIENCE & CLARITY CURVE ACROSS LIFECYCLE</span>
              <span className="text-coral">Red dips mark acute breakdown points</span>
            </div>
            <svg viewBox="0 0 1400 135" className="w-full h-28 overflow-visible">
              <line x1="0" y1="68" x2="1400" y2="68" stroke="#D6CFC8" strokeDasharray="4 4" strokeWidth="1" />
              <path
                d="M 100 52 C 190 52, 220 108, 300 108 C 380 108, 420 66, 500 66 C 580 66, 620 58, 700 58 C 780 58, 820 118, 900 118 C 980 118, 1020 96, 1100 96 C 1180 96, 1220 114, 1300 114"
                fill="none"
                stroke="#E8552E"
                strokeWidth="2.5"
                strokeLinecap="round"
              />
              {LEGACY_STAGES.map((s, idx) => {
                const cx = 100 + idx * 200;
                return (
                  <g key={`pt-${s.num}`}>
                    <circle
                      cx={cx}
                      cy={s.sentimentY}
                      r={s.critical ? 6.5 : 5}
                      fill={s.critical ? '#E8552E' : '#6D5AE6'}
                      stroke="#FFFFFF"
                      strokeWidth="2"
                    />
                    <text
                      x={cx}
                      y={s.sentimentY < 75 ? s.sentimentY - 12 : s.sentimentY + 18}
                      textAnchor="middle"
                      className={`text-[10.5px] font-mono ${
                        s.critical ? 'fill-coral font-semibold' : 'fill-stone-500'
                      }`}
                    >
                      {s.critical ? 'Breakdown Dip' : 'Stable'}
                    </text>
                  </g>
                );
              })}
            </svg>
          </div>

          {/* ROW 4: PAIN POINTS */}
          <div className="grid grid-cols-7 gap-3">
            {LEGACY_STAGES.map((s) => (
              <div
                key={`pain-${s.num}`}
                className="p-3.5 rounded-xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 space-y-1.5"
              >
                <span className="text-[11px] font-mono uppercase text-coral font-medium block">
                  Pain Point
                </span>
                <p className="text-[12.5px] font-clean text-stone-600 dark:text-stone-300 leading-relaxed">
                  {s.painPoint}
                </p>
                <p className="text-[11px] font-clean text-stone-400 pt-1 border-t border-stone-100 dark:border-stone-800">
                  {s.touchpoints}
                </p>
              </div>
            ))}
          </div>

          {/* ROW 5: REDESIGN OPPORTUNITIES */}
          <div className="grid grid-cols-7 gap-3">
            {LEGACY_STAGES.map((s) => (
              <div
                key={`opp-${s.num}`}
                className="p-3.5 rounded-xl bg-lavender/6 dark:bg-lavender/12 border border-lavender/30 space-y-1.5"
              >
                <span className="text-[11px] font-mono uppercase text-lavender font-medium block">
                  Opportunity
                </span>
                <p className="text-[12.5px] font-clean text-charcoal dark:text-stone-200 leading-relaxed">
                  {s.opportunity}
                </p>
              </div>
            ))}
          </div>

          {/* CONTINUOUS FEEDBACK LOOP RETURN LINE (Authentic bottom loop from systems_slide_16.png) */}
          <div className="px-4 py-2.5 rounded-xl border border-dashed border-stone-300 dark:border-stone-700 flex items-center justify-between text-[12px] font-mono text-stone-500">
            <span>↑ Feedback from participants, faculty & stakeholders feeds back into Stage 01 Ideation</span>
            <span>Insights for continuous campus event improvement ←</span>
          </div>
        </div>
      </div>
    </div>
  );
};

/* ============================================================================
   5. INFORMATION ARCHITECTURE TREE & SYSTEM LOOP DIAGRAM
      Faithful to Anushka's systems_slide_20.png + Knoor's "Designing the loop"
   ============================================================================ */
const IA_PILLARS = [
  {
    id: 'event',
    title: '01. EVENT',
    tag: 'Core Identity & Program',
    accent: 'border-lavender/40',
    tagColor: 'text-lavender',
    groups: [
      { name: 'Event Details', leaves: ['Name', 'Date', 'Venue', 'Theme'], volatility: 'Static' },
      { name: 'Program & Schedule', leaves: ['Session', 'Agenda', 'Tracks'], volatility: 'Dynamic' },
      { name: 'Speakers & Content', leaves: ['Bios', 'Abstracts', 'Topics'], volatility: 'Semi-Static' },
      { name: 'Promotional Material', leaves: ['Poster', 'Brochures', 'Assets'], volatility: 'Static' }
    ]
  },
  {
    id: 'registration',
    title: '02. REGISTRATION',
    tag: 'Transactional & Fulfillment',
    accent: 'border-coral/40',
    tagColor: 'text-coral',
    groups: [
      { name: 'Registration Form', leaves: ['Rules', 'Categories', 'Fields'], volatility: 'Static' },
      { name: 'Participant Data', leaves: ['Profile', 'Submissions'], volatility: 'Transactional' },
      { name: 'Fees & Payments', leaves: ['Pricing', 'Receipts', 'Dues'], volatility: 'Transactional' },
      { name: 'Certificates & Confirmation', leaves: ['Certifications', 'Emails', 'Entry IDs'], volatility: 'Fulfillment' }
    ]
  },
  {
    id: 'contents',
    title: '03. EVENT CONTENTS',
    tag: 'Live Attendee Card View',
    accent: 'border-lavender/40',
    tagColor: 'text-lavender',
    groups: [
      { name: 'Speakers / Guest', leaves: ['Speaker Profile', 'Session Topics', 'LinkedIn / Social IDs'], volatility: 'Card Module' },
      { name: 'Schedule', leaves: ['Day-wise Timetable', 'Session Details', 'Add to Calendar'], volatility: 'Live Sync' },
      { name: 'Resource', leaves: ['Brochure / PDF', 'Presentation', 'Reading Material'], volatility: 'Downloadable' },
      { name: 'Announcement', leaves: ['Important Updates', 'Last-Minute Changes', 'Venue & Timing Shifts'], volatility: 'Real-Time Push' }
    ]
  }
];

export const InformationArchitectureTree: React.FC<{ onZoomOriginal?: (url: string) => void }> = ({ onZoomOriginal }) => {
  return (
    <div className="rounded-2xl border border-stone-200 dark:border-stone-800 bg-white dark:bg-stone-900 p-5 sm:p-8 space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-stone-200/80 dark:border-stone-800">
        <div>
          <p className="text-[13px] font-clean text-stone-500 dark:text-stone-400">
            Information Architecture Taxonomy · Separating static constants from live volatile updates
          </p>
          <h4 className="text-lg sm:text-xl font-editorial font-normal text-charcoal dark:text-white mt-0.5">
            Three structured domains feeding one personalized Attendee Card
          </h4>
        </div>
        {onZoomOriginal && (
          <button
            onClick={() => onZoomOriginal('/assets/projects/systems-design/systems_slide_20.png')}
            className="px-3 py-2 rounded-xl border border-stone-200 dark:border-stone-700 text-[13px] font-clean text-stone-600 dark:text-stone-300 hover:border-coral hover:text-coral transition-colors flex items-center gap-1.5 self-start whitespace-nowrap shrink-0 cursor-pointer"
          >
            <ZoomIn size={14} />
            <span>Original IA Blueprint</span>
          </button>
        )}
      </div>

      {/* Root Node + SVG Tree Connector */}
      <div className="rounded-2xl bg-[#FAF8F6] dark:bg-stone-950 border border-stone-200/80 dark:border-stone-800 p-5 sm:p-6">
        <div className="max-w-xs mx-auto py-2.5 px-5 rounded-xl bg-charcoal dark:bg-white text-white dark:text-charcoal text-center font-mono text-xs tracking-wider font-medium">
          INFORMATION ARCHITECTURE
        </div>

        <svg viewBox="0 0 900 46" className="w-full h-10 hidden md:block">
          <path
            d="M 450 0 L 450 20 M 150 20 L 750 20 M 150 20 L 150 46 M 450 20 L 450 46 M 750 20 L 750 46"
            fill="none"
            stroke="#C7BEB6"
            strokeWidth="1.6"
          />
        </svg>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mt-4 md:mt-0">
          {IA_PILLARS.map((pillar) => (
            <div
              key={pillar.id}
              className={`rounded-xl bg-white dark:bg-stone-900 border ${pillar.accent} p-4 sm:p-5 space-y-4`}
            >
              <div className="border-b border-stone-100 dark:border-stone-800 pb-2.5">
                <span className={`text-[11px] font-mono uppercase ${pillar.tagColor}`}>
                  {pillar.tag}
                </span>
                <h5 className="text-base font-editorial text-charcoal dark:text-white mt-0.5">
                  {pillar.title}
                </h5>
              </div>

              <div className="space-y-3.5">
                {pillar.groups.map((grp) => (
                  <div key={grp.name} className="pl-3 border-l border-stone-300 dark:border-stone-700 space-y-1.5">
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-[13px] font-clean font-semibold text-charcoal dark:text-stone-100">
                        {grp.name}
                      </span>
                      <span className="text-[11px] font-mono text-stone-400">
                        {grp.volatility}
                      </span>
                    </div>
                    <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-[12px] font-clean text-stone-600 dark:text-stone-400">
                      {grp.leaves.map((leaf, lIdx) => (
                        <React.Fragment key={leaf}>
                          <span>{leaf}</span>
                          {lIdx < grp.leaves.length - 1 && <span aria-hidden="true" className="text-stone-300 dark:text-stone-700">·</span>}
                        </React.Fragment>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

/* ============================================================================
   6. PROPOSED SYSTEM FAN-IN / FAN-OUT ARCHITECTURE & LIVE VENUE FLOW SIMULATOR
      Faithful to Anushka's journey_card_07.png & journey_card_05.png
   ============================================================================ */
const NINE_TEAMS = [
  { id: 'core', name: 'Core Team', scope: 'Overall Control', dbIdx: 0 },
  { id: 'reg', name: 'Registration Team', scope: 'Registration Data', dbIdx: 4 },
  { id: 'prog', name: 'Program Team', scope: 'Schedule, Sessions', dbIdx: 1 },
  { id: 'venue', name: 'Venue & Logistics', scope: 'Venue, Transport', dbIdx: 3 },
  { id: 'guest', name: 'Guest Team', scope: 'Speakers', dbIdx: 2 },
  { id: 'social', name: 'Social Media Team', scope: 'Announcements', dbIdx: 5 },
  { id: 'tech', name: 'Technical Team', scope: 'Technical Info & AV', dbIdx: 0 },
  { id: 'hosp', name: 'Hospitality', scope: 'Food, Accommodation', dbIdx: 3 },
  { id: 'admin', name: 'Admin', scope: 'Attendance, Certificates', dbIdx: 7 }
];

const DB_TABLES = [
  'Event Details',
  'Program & Schedule',
  'Speaker Details',
  'Logistics & Transport',
  'Registration Data',
  'Announcements',
  'Attendance Data',
  'Certificate',
  'Update History'
];

const VENUE_SHIFT_STEPS = [
  {
    step: '01',
    actor: 'Venue Team',
    title: 'Identifies room change',
    detail: 'Morning clash requires moving from G Block AV Room to D Block Auditorium.'
  },
  {
    step: '02',
    actor: 'Backend System',
    title: 'Updates central database once',
    detail: 'Venue Team edits Logistics & Transport record in the shared organizer dashboard.'
  },
  {
    step: '03',
    actor: 'Diff Engine',
    title: 'Change flagged automatically',
    detail: 'Old: G Block AV Room → New: D Block Auditorium logged in Update History.'
  },
  {
    step: '04',
    actor: 'Peer Sub-Teams',
    title: 'Teams align without phone tag',
    detail: 'Signage, Tech AV, and Hospitality instantly see the new room assignment.'
  },
  {
    step: '05',
    actor: 'Event Journey Card',
    title: 'Live maroon alert card appears',
    detail: 'Every registered attendee card reflects the new venue on the exact same URL.'
  },
  {
    step: '06',
    actor: 'Notification System',
    title: 'Ping sent via WhatsApp / SMS / Email',
    detail: 'Automated nudge points students back to their existing personal card link.'
  },
  {
    step: '07',
    actor: 'Attendee',
    title: 'Arrives at D Block Gate 3 (<5 min)',
    detail: 'Zero panic calls; QR entry pass scans smoothly at the relocated venue.'
  }
];

export const ProposedSystemPipelineFlowchart: React.FC<{ onZoomOriginal?: (url: string) => void }> = ({ onZoomOriginal }) => {
  const [selectedTeamIdx, setSelectedTeamIdx] = useState<number>(3); // Venue & Logistics default
  const [simStep, setSimStep] = useState<number>(4);

  const activeTeam = NINE_TEAMS[selectedTeamIdx];
  const targetDbIdx = activeTeam.dbIdx;

  const advanceSimulation = () => {
    setSimStep(prev => (prev >= VENUE_SHIFT_STEPS.length - 1 ? 0 : prev + 1));
  };

  return (
    <div className="space-y-8">
      {/* PART A: Proposed System Fan-In / Fan-Out Architecture (journey_card_07.png) */}
      <div className="rounded-2xl border border-stone-200 dark:border-stone-800 bg-white dark:bg-stone-900 p-5 sm:p-8 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-stone-200/80 dark:border-stone-800">
          <div>
            <p className="text-[13px] font-clean text-stone-500 dark:text-stone-400">
              Proposed System Flowchart · Click any of the 9 Organising Teams on the left to trace live propagation
            </p>
            <h4 className="text-lg sm:text-xl font-editorial font-normal text-charcoal dark:text-white mt-0.5">
              One structured event database turns nine scattered team inputs into personalized attendee cards
            </h4>
          </div>
          {onZoomOriginal && (
            <button
              onClick={() => onZoomOriginal('/assets/projects/systems-design/journey_card_07.png')}
              className="px-3 py-2 rounded-xl border border-stone-200 dark:border-stone-700 text-[13px] font-clean text-stone-600 dark:text-stone-300 hover:border-coral hover:text-coral transition-colors flex items-center gap-1.5 self-start whitespace-nowrap shrink-0 cursor-pointer"
            >
              <ZoomIn size={14} />
              <span>Original System Diagram</span>
            </button>
          )}
        </div>

        {/* Full Vector Flowchart Canvas */}
        <div className="w-full overflow-x-auto rounded-2xl bg-[#FAF8F6] dark:bg-stone-950 border border-stone-200/80 dark:border-stone-800 p-4 sm:p-6">
          <div className="min-w-[940px]">
            <svg
              viewBox="0 0 1060 590"
              className="w-full h-auto select-none"
              role="img"
              aria-label="Proposed system architecture connecting 9 organizing teams to central event database, attendee cards, and notification channels"
            >
              <defs>
                <marker id="flowArrowActive" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto">
                  <path d="M 0 1.5 L 8.5 5 L 0 8.5 z" fill="#E8552E" />
                </marker>
                <marker id="flowArrowBase" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="5" markerHeight="5" orient="auto">
                  <path d="M 0 1.5 L 8.5 5 L 0 8.5 z" fill="#8E857D" />
                </marker>
              </defs>

              {/* Column Titles */}
              <text x="105" y="26" textAnchor="middle" className="fill-charcoal dark:fill-white text-[13px] font-clean font-semibold">
                Organising Teams (9)
              </text>
              <text x="415" y="26" textAnchor="middle" className="fill-charcoal dark:fill-white text-[13px] font-clean font-semibold">
                Backend System
              </text>
              <text x="715" y="26" textAnchor="middle" className="fill-charcoal dark:fill-white text-[13px] font-clean font-semibold">
                Attendee Cards
              </text>
              <text x="955" y="26" textAnchor="middle" className="fill-charcoal dark:fill-white text-[13px] font-clean font-semibold">
                Event Journey Card
              </text>

              {/* LEFT COLUMN: 9 Organising Teams */}
              {NINE_TEAMS.map((team, idx) => {
                const y = 44 + idx * 48;
                const isSelected = idx === selectedTeamIdx;
                const teamMidY = y + 19;
                const dbTargetY = 86 + targetDbIdx * 38 + 14;

                return (
                  <g key={team.id}>
                    {/* Fan-in Bezier Curve from Team to Event Database */}
                    <path
                      d={`M 196 ${teamMidY} C 258 ${teamMidY}, 256 ${isSelected ? dbTargetY : 254}, 322 ${isSelected ? dbTargetY : 254}`}
                      fill="none"
                      stroke={isSelected ? '#E8552E' : '#CFC7BF'}
                      strokeWidth={isSelected ? '2.4' : '1.2'}
                      markerEnd={isSelected ? 'url(#flowArrowActive)' : undefined}
                    />

                    {/* Clickable Team Pill */}
                    <g
                      onClick={() => setSelectedTeamIdx(idx)}
                      onMouseEnter={() => setSelectedTeamIdx(idx)}
                      className="cursor-pointer"
                    >
                      <rect
                        x="16"
                        y={y}
                        width="180"
                        height="38"
                        rx="8"
                        className={
                          isSelected
                            ? 'fill-coral stroke-coral'
                            : 'fill-white dark:fill-stone-900 stroke-stone-300 dark:stroke-stone-700'
                        }
                        strokeWidth="1.4"
                      />
                      <text
                        x="106"
                        y={y + 16}
                        textAnchor="middle"
                        className={`text-[11px] font-clean font-semibold ${
                          isSelected ? 'fill-white' : 'fill-charcoal dark:fill-white'
                        }`}
                      >
                        {team.name}
                      </text>
                      <text
                        x="106"
                        y={y + 30}
                        textAnchor="middle"
                        className={`text-[9.5px] font-clean ${
                          isSelected ? 'fill-white/90' : 'fill-stone-500 dark:fill-stone-400'
                        }`}
                      >
                        ({team.scope})
                      </text>
                    </g>
                  </g>
                );
              })}

              {/* Edge Annotation 1 */}
              <rect x="210" y="216" width="98" height="44" rx="6" className="fill-[#FAF8F6]/90 dark:fill-stone-950/90" />
              <text x="259" y="233" textAnchor="middle" className="fill-stone-600 dark:fill-stone-300 text-[9.5px] font-clean">
                Each team updates
              </text>
              <text x="259" y="246" textAnchor="middle" className="fill-stone-600 dark:fill-stone-300 text-[9.5px] font-clean">
                owned module only
              </text>

              {/* CENTER COLUMN: Backend System · EVENT DATABASE */}
              <rect
                x="326"
                y="44"
                width="178"
                height="422"
                rx="14"
                className="fill-lavender/12 dark:fill-lavender/15 stroke-lavender/50"
                strokeWidth="1.6"
              />
              <text x="415" y="69" textAnchor="middle" className="fill-lavender text-[11px] font-mono font-semibold tracking-wider">
                EVENT DATABASE
              </text>

              {DB_TABLES.map((tbl, idx) => {
                const ty = 84 + idx * 38;
                const isTarget = idx === targetDbIdx || idx === 8; // Also highlight Update History
                return (
                  <g key={tbl}>
                    <rect
                      x="340"
                      y={ty}
                      width="150"
                      height="29"
                      rx="6"
                      className={
                        isTarget
                          ? 'fill-white dark:fill-stone-900 stroke-coral'
                          : 'fill-white/90 dark:fill-stone-900/80 stroke-lavender/35'
                      }
                      strokeWidth={isTarget ? '1.8' : '1'}
                    />
                    <text
                      x="415"
                      y={ty + 18}
                      textAnchor="middle"
                      className={`text-[10.5px] font-clean ${
                        isTarget ? 'fill-coral font-semibold' : 'fill-charcoal dark:fill-stone-200'
                      }`}
                    >
                      {tbl}
                    </text>
                  </g>
                );
              })}

              {/* Fan-Out Bezier Curves: Database -> Personalized Attendee Cards */}
              {[136, 232, 328].map((cardMidY, i) => (
                <path
                  key={i}
                  d={`M 504 232 C 562 232, 568 ${cardMidY}, 626 ${cardMidY}`}
                  fill="none"
                  stroke="#E8552E"
                  strokeWidth="1.9"
                  markerEnd="url(#flowArrowActive)"
                />
              ))}

              <rect x="515" y="176" width="102" height="42" rx="6" className="fill-[#FAF8F6]/90 dark:fill-stone-950/90" />
              <text x="566" y="192" textAnchor="middle" className="fill-stone-600 dark:fill-stone-300 text-[9.5px] font-clean">
                Verified changes sync
              </text>
              <text x="566" y="205" textAnchor="middle" className="fill-stone-600 dark:fill-stone-300 text-[9.5px] font-clean">
                to all cards (&lt;5 min)
              </text>

              {/* COLUMN 3: Personalized Attendee Cards Container */}
              <rect
                x="630"
                y="76"
                width="170"
                height="312"
                rx="14"
                className="fill-lavender/8 dark:fill-lavender/10 stroke-lavender/35"
                strokeWidth="1.4"
              />
              {['Person 1', 'Person 2', 'Person 3'].map((person, idx) => {
                const py = 98 + idx * 96;
                return (
                  <g key={person}>
                    <rect
                      x="646"
                      y={py}
                      width="138"
                      height="76"
                      rx="10"
                      className="fill-white dark:fill-stone-900 stroke-lavender/50"
                      strokeWidth="1.4"
                    />
                    <text x="715" y={py + 33} textAnchor="middle" className="fill-charcoal dark:fill-white text-[13px] font-editorial">
                      {person}
                    </text>
                    <text x="715" y={py + 52} textAnchor="middle" className="fill-stone-500 text-[10.5px] font-clean">
                      Event Journey Card
                    </text>
                  </g>
                );
              })}

              {/* Connector: Attendee Cards -> Live Card Preview */}
              <path
                d="M 800 232 L 866 232"
                fill="none"
                stroke="#E8552E"
                strokeWidth="2"
                markerEnd="url(#flowArrowActive)"
              />
              <text x="833" y="218" textAnchor="middle" className="fill-stone-500 text-[9.5px] font-clean">
                1 link
              </text>

              {/* COLUMN 4: Miniature Authentic Event Journey Card UI */}
              <g transform="translate(872, 54)">
                <rect
                  width="168"
                  height="356"
                  rx="16"
                  fill="#CFAFB8"
                  stroke="#9E7682"
                  strokeWidth="1.5"
                />
                <text x="14" y="28" fill="#5D1029" className="text-[13px] font-editorial font-semibold">
                  DS 2026
                </text>
                <text x="154" y="26" textAnchor="end" fill="#1E1417" className="text-[12px] font-editorial">
                  Hi Tanya
                </text>
                <text x="154" y="39" textAnchor="end" fill="#4A343B" className="text-[8.5px] font-clean">
                  You are registered
                </text>

                <rect x="10" y="50" width="148" height="38" rx="7" fill="#F4EBEF" />
                <text x="18" y="66" fill="#3A282E" className="text-[8.5px] font-clean">
                  Design Summit · Single Web Link
                </text>
                <text x="18" y="79" fill="#6E525B" className="text-[8px] font-mono">
                  Zero app download
                </text>

                {/* Date / Venue + QR */}
                <rect x="10" y="96" width="148" height="68" rx="8" fill="#F9F4F6" />
                <text x="18" y="114" fill="#2A1B20" className="text-[8.5px] font-clean font-semibold">
                  25 Sept 2026 · 10:00 AM
                </text>
                <text x="18" y="129" fill="#5D1029" className="text-[8.5px] font-clean font-medium">
                  D Block Auditorium
                </text>
                <text x="18" y="146" fill="#6E525B" className="text-[8px] font-mono">
                  Pass #DS26-1047
                </text>
                <rect x="116" y="106" width="34" height="34" rx="4" fill="#FFFFFF" stroke="#5D1029" strokeWidth="1" />
                <rect x="122" y="112" width="9" height="9" fill="#1E1417" />
                <rect x="135" y="112" width="9" height="9" fill="#1E1417" />
                <rect x="122" y="125" width="9" height="9" fill="#1E1417" />
                <rect x="135" y="125" width="5" height="5" fill="#5D1029" />

                {/* 6 Action Tiles */}
                {[0, 1, 2].map(col => (
                  <rect key={`r1-${col}`} x={10 + col * 50} y="172" width="46" height="30" rx="5" fill="#F9F4F6" />
                ))}
                <rect x="10" y="206" width="46" height="30" rx="5" fill="#F9F4F6" />
                <rect x="60" y="206" width="46" height="30" rx="5" fill="#5D1029" />
                <rect x="110" y="206" width="46" height="30" rx="5" fill="#F9F4F6" />
                <text x="83" y="224" textAnchor="middle" fill="#FFFFFF" className="text-[8px] font-clean font-medium">
                  Updates
                </text>

                {/* Maroon Live Update Cards */}
                <rect x="10" y="246" width="148" height="58" rx="8" fill="#F4EBEF" />
                <rect x="16" y="256" width="66" height="40" rx="5" fill="#5D1029" />
                <rect x="86" y="256" width="66" height="40" rx="5" fill="#5D1029" />
                <text x="49" y="273" textAnchor="middle" fill="#FFFFFF" className="text-[8px] font-clean font-semibold">
                  Date Shift
                </text>
                <text x="49" y="286" textAnchor="middle" fill="#F3DCE3" className="text-[7px] font-clean">
                  25 Sept 2026
                </text>
                <text x="119" y="273" textAnchor="middle" fill="#FFFFFF" className="text-[8px] font-clean font-semibold">
                  Venue Shift
                </text>
                <text x="119" y="286" textAnchor="middle" fill="#F3DCE3" className="text-[7px] font-clean">
                  D Block Aud.
                </text>

                <text x="84" y="332" textAnchor="middle" fill="#5D1029" className="text-[9px] font-clean font-bold tracking-wider">
                  SEE YOU THERE !
                </text>
              </g>

              {/* BOTTOM RETURN LOOP: Card Link -> Notification System -> Attendee */}
              <path
                d="M 956 410 L 956 462 C 956 476, 944 478, 860 478 L 832 478"
                fill="none"
                stroke="#E8552E"
                strokeWidth="2"
                markerEnd="url(#flowArrowActive)"
              />
              <text x="952" y="446" textAnchor="end" className="fill-stone-500 text-[10px] font-clean">
                Dispatched as permanent link
              </text>

              {/* Notification System Box */}
              <rect
                x="586"
                y="482"
                width="274"
                height="86"
                rx="12"
                className="fill-lavender/12 dark:fill-lavender/15 stroke-lavender/45"
                strokeWidth="1.5"
              />
              <text x="723" y="506" textAnchor="middle" className="fill-charcoal dark:fill-white text-[12.5px] font-clean font-semibold">
                Notification System
              </text>
              {['SMS', 'WhatsApp', 'Email'].map((ch, idx) => (
                <g key={ch} transform={`translate(${604 + idx * 84}, 520)`}>
                  <rect width="70" height="32" rx="7" className="fill-white dark:fill-stone-900 stroke-lavender/50" strokeWidth="1.2" />
                  <text x="35" y="20" textAnchor="middle" className="fill-charcoal dark:fill-stone-200 text-[11px] font-clean font-medium">
                    {ch}
                  </text>
                </g>
              ))}

              {/* Arrow Notification -> Attendee */}
              <path
                d="M 586 525 L 492 525"
                fill="none"
                stroke="#E8552E"
                strokeWidth="2.2"
                markerEnd="url(#flowArrowActive)"
              />

              {/* Final Attendee Node */}
              <rect
                x="332"
                y="498"
                width="156"
                height="54"
                rx="12"
                className="fill-coral text-white"
              />
              <text x="410" y="523" textAnchor="middle" fill="#FFFFFF" className="text-[14px] font-editorial font-medium">
                Attendee
              </text>
              <text x="410" y="540" textAnchor="middle" fill="#FFE6DF" className="text-[10px] font-clean">
                Self-serves across entire journey
              </text>
            </svg>
          </div>
        </div>
      </div>

      {/* PART B: Interactive Snake Flowchart — Updated Information Flow (journey_card_05.png) */}
      <div className="rounded-2xl border border-stone-200 dark:border-stone-800 bg-white dark:bg-stone-900 p-5 sm:p-8 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-stone-200/80 dark:border-stone-800">
          <div>
            <p className="text-[13px] font-clean text-stone-500 dark:text-stone-400">
              Updated Information Flow · Real-time venue relocation walkthrough
            </p>
            <h4 className="text-lg sm:text-xl font-editorial font-normal text-charcoal dark:text-white mt-0.5">
              What happens when G Block AV Room shifts to D Block Auditorium on event morning
            </h4>
          </div>

          <div className="flex items-center gap-2 self-start">
            <button
              onClick={advanceSimulation}
              className="px-4 py-2 rounded-xl bg-coral text-white text-[13px] font-clean font-medium hover:opacity-90 transition-opacity flex items-center gap-2 whitespace-nowrap shrink-0 cursor-pointer"
            >
              <Play size={14} />
              <span>Step Simulation ({simStep + 1}/7)</span>
            </button>
            <button
              onClick={() => setSimStep(0)}
              aria-label="Reset flow simulation"
              className="p-2 rounded-xl border border-stone-200 dark:border-stone-700 text-stone-600 dark:text-stone-300 hover:border-coral hover:text-coral transition-colors cursor-pointer"
            >
              <RotateCcw size={15} />
            </button>
            {onZoomOriginal && (
              <button
                onClick={() => onZoomOriginal('/assets/projects/systems-design/journey_card_05.png')}
                className="px-3 py-2 rounded-xl border border-stone-200 dark:border-stone-700 text-[13px] font-clean text-stone-600 dark:text-stone-300 hover:border-coral hover:text-coral transition-colors flex items-center gap-1.5 whitespace-nowrap shrink-0 cursor-pointer"
              >
                <ZoomIn size={14} />
                <span>Original Flow</span>
              </button>
            )}
          </div>
        </div>

        {/* Serpentine 2-Row Connected Flowchart (Matching journey_card_05.png) */}
        <div className="space-y-4">
          {/* Top Row: Steps 01 -> 02 -> 03 -> 04 */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-3 relative">
            {VENUE_SHIFT_STEPS.slice(0, 4).map((item, idx) => {
              const reached = idx <= simStep;
              const current = idx === simStep;
              return (
                <div
                  key={item.step}
                  onClick={() => setSimStep(idx)}
                  className={`p-4 rounded-xl border transition-all cursor-pointer relative ${
                    current
                      ? 'bg-coral/8 dark:bg-coral/15 border-coral ring-2 ring-coral/20'
                      : reached
                      ? 'bg-white dark:bg-stone-900 border-lavender/50'
                      : 'bg-stone-50 dark:bg-stone-950 border-stone-200 dark:border-stone-800 opacity-65'
                  }`}
                >
                  <div className="flex items-center justify-between text-[11px] font-mono mb-1.5">
                    <span className={current ? 'text-coral font-semibold' : 'text-lavender'}>
                      {item.step} · {item.actor}
                    </span>
                    {idx < 3 && <span className="hidden md:inline text-stone-400">→</span>}
                  </div>
                  <h5 className="text-sm font-clean font-semibold text-charcoal dark:text-white leading-snug">
                    {item.title}
                  </h5>
                  <p className="text-[12.5px] font-clean text-stone-600 dark:text-stone-400 mt-1 leading-relaxed">
                    {item.detail}
                  </p>
                </div>
              );
            })}
          </div>

          {/* Serpentine Turn Connector */}
          <div className="hidden md:flex justify-end pr-16 text-coral font-mono text-xs items-center gap-2">
            <span>Propagates downstream in &lt;5 minutes</span>
            <span>↓</span>
          </div>

          {/* Bottom Row: Steps 07 <- 06 <- 05 (Right-to-Left Snake Return like journey_card_05.png) */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 md:w-11/12 md:ml-auto">
            {[VENUE_SHIFT_STEPS[6], VENUE_SHIFT_STEPS[5], VENUE_SHIFT_STEPS[4]].map((item) => {
              const realIdx = Number(item.step) - 1;
              const reached = realIdx <= simStep;
              const current = realIdx === simStep;
              return (
                <div
                  key={item.step}
                  onClick={() => setSimStep(realIdx)}
                  className={`p-4 rounded-xl border transition-all cursor-pointer ${
                    current
                      ? 'bg-coral/8 dark:bg-coral/15 border-coral ring-2 ring-coral/20'
                      : reached
                      ? 'bg-white dark:bg-stone-900 border-lavender/50'
                      : 'bg-stone-50 dark:bg-stone-950 border-stone-200 dark:border-stone-800 opacity-65'
                  }`}
                >
                  <div className="flex items-center justify-between text-[11px] font-mono mb-1.5">
                    <span className={current ? 'text-coral font-semibold' : 'text-lavender'}>
                      {item.step} · {item.actor}
                    </span>
                    {item.step !== '07' && <span className="hidden md:inline text-stone-400">←</span>}
                  </div>
                  <h5 className="text-sm font-clean font-semibold text-charcoal dark:text-white leading-snug">
                    {item.title}
                  </h5>
                  <p className="text-[12.5px] font-clean text-stone-600 dark:text-stone-400 mt-1 leading-relaxed">
                    {item.detail}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
