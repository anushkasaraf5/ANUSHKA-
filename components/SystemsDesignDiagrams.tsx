import React, { useState } from 'react';
import {
  ArrowRight,
  CheckCircle2,
  AlertCircle,
  RefreshCw,
  ZoomIn,
  QrCode,
  Calendar,
  Clock,
  MapPin,
  FileText,
  Phone,
  Mail,
  ChevronRight
} from 'lucide-react';

interface DiagramZoomProps {
  onZoomSlide?: (url: string) => void;
}

/* ============================================================================
   1. RADIAL BEZIER STAKEHOLDER & ECOSYSTEM MAP
   Inspired by knoor.framer.website/classroom-orange stakeholder network SVG
   Grounded in Anushka Saraf's Stakeholder, Ecosystem & Dependency Maps
   ============================================================================ */

interface StakeholderCluster {
  id: string;
  title: string;
  quadrant: string;
  powerInterest: string;
  children: string[];
  inbound: string;
  outbound: string;
  friction: string;
}

const STAKEHOLDER_CLUSTERS: StakeholderCluster[] = [
  {
    id: 'admin',
    title: 'Institution & Admin',
    quadrant: 'Keep Satisfied',
    powerInterest: 'High Power · Low Daily Interest',
    children: ['Dean & Registrar', 'Room & Budget Sanction', 'Policy Compliance'],
    inbound: 'Receives formal event proposals, room requests, and budget sheets',
    outbound: 'Issues stamped venue permissions, financial clearance, and policies',
    friction: '72+ hour approval lag stalls downstream promotion and venue confirmation.'
  },
  {
    id: 'faculty',
    title: 'Faculty & Departments',
    quadrant: 'Manage Closely',
    powerInterest: 'High Power · High Interest',
    children: ['Academic Mentors', 'Theme Validation', 'Guest Vettings'],
    inbound: 'Receives concept notes, schedule drafts, and escalation requests',
    outbound: 'Provides academic direction, speaker approvals, and admin mediation',
    friction: 'Context stays locked in verbal meetings with individual faculty leads.'
  },
  {
    id: 'speakers',
    title: 'Speakers & Support',
    quadrant: 'Keep Informed',
    powerInterest: 'Low Power · High Interest',
    children: ['Visiting Speakers', 'Campus Facilities', 'Stage & Security'],
    inbound: 'Receives invitations, travel itineraries, AV setup, and hall schedules',
    outbound: 'Delivers keynote sessions, confirms timing, and prepares physical halls',
    friction: 'Last-minute speaker or hall shifts rarely reach all sub-teams in time.'
  },
  {
    id: 'pr',
    title: 'PR & Communication',
    quadrant: 'Keep Informed',
    powerInterest: 'Low Power · High Interest',
    children: ['Design & Posters', 'WhatsApp & Social', 'Notice Boards'],
    inbound: 'Waits on finalized venue, speaker list, and approved schedule',
    outbound: 'Publishes posters, Instagram reels, circulars, and WhatsApp forwards',
    friction: 'Printed posters freeze static details that immediately go stale when rooms shift.'
  },
  {
    id: 'finance',
    title: 'Finance & IT Systems',
    quadrant: 'Manage Closely',
    powerInterest: 'High Power · High Interest',
    children: ['Accounts & Fees', 'Google Forms / Portal', 'AV & Tech Desk'],
    inbound: 'Receives payment receipts, registration entries, and AV requirements',
    outbound: 'Verifies fee reconciliation, exports spreadsheets, and runs projection',
    friction: 'Registration spreadsheets sit disconnected from live event-day changes.'
  },
  {
    id: 'attendees',
    title: 'Attendees & Delegates',
    quadrant: 'Primary Focus',
    powerInterest: 'Low Power · Highest Stake',
    children: ['Campus Students', 'External Delegates', 'Workshop Learners'],
    inbound: 'Receives fragmented posters, forwarded chats, and registration forms',
    outbound: 'Submits forms, attends sessions, requests help, and seeks certificates',
    friction: 'Sits 4 human hops from decisions — experiencing blackout after registration.'
  }
];

export const StakeholderEcosystemMap: React.FC<DiagramZoomProps> = ({ onZoomSlide }) => {
  const [selectedId, setSelectedId] = useState<string>('attendees');
  const activeCluster = STAKEHOLDER_CLUSTERS.find((c) => c.id === selectedId) || STAKEHOLDER_CLUSTERS[5];

  const isSelected = (id: string) => selectedId === id;

  return (
    <div className="space-y-5">
      {/* Main Radial Network Canvas */}
      <div className="rounded-3xl bg-[#F7F5F2] dark:bg-stone-900/90 border border-stone-200/90 dark:border-stone-800 p-5 sm:p-8 overflow-hidden">
        <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
          <div>
            <p className="text-[13px] font-subheading font-medium text-stone-500 dark:text-stone-400">
              Interactive Ecosystem & Governance Map · Click any group to trace dependencies
            </p>
          </div>
          {onZoomSlide && (
            <div className="flex items-center gap-2">
              <button
                onClick={() => onZoomSlide('/assets/projects/systems-design/systems_slide_15.png')}
                className="px-3 py-1.5 rounded-lg bg-white dark:bg-stone-800 border border-stone-200 dark:border-stone-700 text-[13px] font-subheading text-charcoal dark:text-stone-200 hover:border-coral transition-colors flex items-center gap-1.5 cursor-pointer whitespace-nowrap shrink-0"
              >
                <ZoomIn size={13} className="text-coral" />
                <span>Original Ecosystem Map</span>
              </button>
              <button
                onClick={() => onZoomSlide('/assets/projects/systems-design/systems_slide_14.png')}
                className="px-3 py-1.5 rounded-lg bg-white dark:bg-stone-800 border border-stone-200 dark:border-stone-700 text-[13px] font-subheading text-charcoal dark:text-stone-200 hover:border-coral transition-colors hidden sm:flex items-center gap-1.5 cursor-pointer whitespace-nowrap shrink-0"
              >
                <ZoomIn size={13} className="text-lavender" />
                <span>Stakeholder Grid</span>
              </button>
            </div>
          )}
        </div>

        {/* Desktop Interactive SVG + Node Overlay */}
        <div className="hidden lg:block relative w-full h-[460px] select-none">
          <svg
            viewBox="0 0 960 460"
            fill="none"
            className="absolute inset-0 w-full h-full pointer-events-none"
            aria-hidden="true"
          >
            {/* Center to Top-Left (Admin) */}
            <path
              d="M 400 212 C 330 212, 330 88, 265 88"
              stroke={isSelected('admin') ? '#FF3366' : '#D8CCC2'}
              strokeWidth={isSelected('admin') ? '2.2' : '1.4'}
              strokeLinecap="round"
            />
            <path
              d="M 145 88 C 118 88, 118 58, 95 58 M 145 88 L 95 88 M 145 88 C 118 88, 118 118, 95 118"
              stroke={isSelected('admin') ? '#FF3366' : '#E2D8CF'}
              strokeWidth="1.2"
              strokeLinecap="round"
            />

            {/* Center to Mid-Left (Faculty) */}
            <path
              d="M 385 230 L 265 230"
              stroke={isSelected('faculty') ? '#FF3366' : '#D8CCC2'}
              strokeWidth={isSelected('faculty') ? '2.2' : '1.4'}
              strokeLinecap="round"
            />
            <path
              d="M 145 230 C 118 230, 118 200, 95 200 M 145 230 L 95 230 M 145 230 C 118 230, 118 260, 95 260"
              stroke={isSelected('faculty') ? '#FF3366' : '#E2D8CF'}
              strokeWidth="1.2"
              strokeLinecap="round"
            />

            {/* Center to Bottom-Left (Speakers & Support) */}
            <path
              d="M 400 248 C 330 248, 330 372, 265 372"
              stroke={isSelected('speakers') ? '#FF3366' : '#D8CCC2'}
              strokeWidth={isSelected('speakers') ? '2.2' : '1.4'}
              strokeLinecap="round"
            />
            <path
              d="M 145 372 C 118 372, 118 342, 95 342 M 145 372 L 95 372 M 145 372 C 118 372, 118 402, 95 402"
              stroke={isSelected('speakers') ? '#FF3366' : '#E2D8CF'}
              strokeWidth="1.2"
              strokeLinecap="round"
            />

            {/* Center to Top-Right (PR & Comms) */}
            <path
              d="M 560 212 C 630 212, 630 88, 695 88"
              stroke={isSelected('pr') ? '#FF3366' : '#D8CCC2'}
              strokeWidth={isSelected('pr') ? '2.2' : '1.4'}
              strokeLinecap="round"
            />
            <path
              d="M 815 88 C 842 88, 842 58, 865 58 M 815 88 L 865 88 M 815 88 C 842 88, 842 118, 865 118"
              stroke={isSelected('pr') ? '#FF3366' : '#E2D8CF'}
              strokeWidth="1.2"
              strokeLinecap="round"
            />

            {/* Center to Mid-Right (Finance & IT) */}
            <path
              d="M 575 230 L 695 230"
              stroke={isSelected('finance') ? '#FF3366' : '#D8CCC2'}
              strokeWidth={isSelected('finance') ? '2.2' : '1.4'}
              strokeLinecap="round"
            />
            <path
              d="M 815 230 C 842 230, 842 200, 865 200 M 815 230 L 865 230 M 815 230 C 842 230, 842 260, 865 260"
              stroke={isSelected('finance') ? '#FF3366' : '#E2D8CF'}
              strokeWidth="1.2"
              strokeLinecap="round"
            />

            {/* Center to Bottom-Right (Attendees) */}
            <path
              d="M 560 248 C 630 248, 630 372, 695 372"
              stroke={isSelected('attendees') ? '#FF3366' : '#D8CCC2'}
              strokeWidth={isSelected('attendees') ? '2.4' : '1.6'}
              strokeDasharray={isSelected('attendees') ? 'none' : '4 4'}
              strokeLinecap="round"
            />
            <path
              d="M 815 372 C 842 372, 842 342, 865 342 M 815 372 L 865 372 M 815 372 C 842 372, 842 402, 865 402"
              stroke={isSelected('attendees') ? '#FF3366' : '#E2D8CF'}
              strokeWidth="1.2"
              strokeLinecap="round"
            />
          </svg>

          {/* Center Core Hub */}
          <div
            style={{ left: '50%', top: '50%', transform: 'translate(-50%, -50%)' }}
            className="absolute w-[196px] rounded-2xl bg-charcoal dark:bg-white text-white dark:text-charcoal px-4 py-4 text-center shadow-lg border border-charcoal dark:border-stone-200 z-10"
          >
            <span className="text-[13px] font-subheading text-coral font-medium block">
              Central Hub
            </span>
            <span className="text-base font-heading block leading-snug mt-0.5">
              Event Organizers
            </span>
            <span className="text-[13px] font-body text-stone-300 dark:text-stone-600 block mt-0.5">
              Core Leads & 9 Sub-Teams
            </span>
          </div>

          {/* Left Column Clusters */}
          {[
            { cluster: STAKEHOLDER_CLUSTERS[0], top: '88px' },
            { cluster: STAKEHOLDER_CLUSTERS[1], top: '230px' },
            { cluster: STAKEHOLDER_CLUSTERS[2], top: '372px' }
          ].map(({ cluster, top }) => {
            const active = isSelected(cluster.id);
            return (
              <React.Fragment key={cluster.id}>
                <button
                  onClick={() => setSelectedId(cluster.id)}
                  style={{ left: '145px', top, transform: 'translateY(-50%)' }}
                  className={`absolute w-[132px] px-3 py-2.5 rounded-xl text-center transition-all cursor-pointer border ${
                    active
                      ? 'bg-coral text-white border-coral shadow-md scale-[1.03]'
                      : 'bg-white dark:bg-stone-800 text-charcoal dark:text-stone-100 border-stone-200/90 dark:border-stone-700 hover:border-coral/60'
                  }`}
                >
                  <span className="text-[13px] font-subheading font-semibold leading-tight block">
                    {cluster.title}
                  </span>
                </button>
                {cluster.children.map((leaf, idx) => {
                  const offsets = [-30, 0, 30];
                  return (
                    <div
                      key={leaf}
                      onClick={() => setSelectedId(cluster.id)}
                      style={{
                        left: '0px',
                        top: `calc(${top} + ${offsets[idx]}px)`,
                        transform: 'translateY(-50%)'
                      }}
                      className={`absolute w-[98px] text-right pr-2 text-[13px] font-body cursor-pointer transition-colors truncate ${
                        active
                          ? 'text-charcoal dark:text-white font-medium'
                          : 'text-stone-500 dark:text-stone-400 hover:text-charcoal dark:hover:text-stone-200'
                      }`}
                      title={leaf}
                    >
                      {leaf}
                    </div>
                  );
                })}
              </React.Fragment>
            );
          })}

          {/* Right Column Clusters */}
          {[
            { cluster: STAKEHOLDER_CLUSTERS[3], top: '88px' },
            { cluster: STAKEHOLDER_CLUSTERS[4], top: '230px' },
            { cluster: STAKEHOLDER_CLUSTERS[5], top: '372px' }
          ].map(({ cluster, top }) => {
            const active = isSelected(cluster.id);
            return (
              <React.Fragment key={cluster.id}>
                <button
                  onClick={() => setSelectedId(cluster.id)}
                  style={{ left: '683px', top, transform: 'translateY(-50%)' }}
                  className={`absolute w-[132px] px-3 py-2.5 rounded-xl text-center transition-all cursor-pointer border ${
                    active
                      ? 'bg-coral text-white border-coral shadow-md scale-[1.03]'
                      : 'bg-white dark:bg-stone-800 text-charcoal dark:text-stone-100 border-stone-200/90 dark:border-stone-700 hover:border-coral/60'
                  }`}
                >
                  <span className="text-[13px] font-subheading font-semibold leading-tight block">
                    {cluster.title}
                  </span>
                </button>
                {cluster.children.map((leaf, idx) => {
                  const offsets = [-30, 0, 30];
                  return (
                    <div
                      key={leaf}
                      onClick={() => setSelectedId(cluster.id)}
                      style={{
                        left: '862px',
                        top: `calc(${top} + ${offsets[idx]}px)`,
                        transform: 'translateY(-50%)'
                      }}
                      className={`absolute w-[98px] text-left pl-2 text-[13px] font-body cursor-pointer transition-colors truncate ${
                        active
                          ? 'text-charcoal dark:text-white font-medium'
                          : 'text-stone-500 dark:text-stone-400 hover:text-charcoal dark:hover:text-stone-200'
                      }`}
                      title={leaf}
                    >
                      {leaf}
                    </div>
                  );
                })}
              </React.Fragment>
            );
          })}
        </div>

        {/* Mobile / Tablet Responsive Fallback Selector */}
        <div className="lg:hidden space-y-3">
          <div className="p-4 rounded-2xl bg-charcoal text-white text-center">
            <span className="text-[13px] text-coral font-subheading block">Central Hub</span>
            <span className="text-lg font-heading">Event Organizers · Core & 9 Sub-Teams</span>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
            {STAKEHOLDER_CLUSTERS.map((cluster) => (
              <button
                key={cluster.id}
                onClick={() => setSelectedId(cluster.id)}
                className={`p-3 rounded-xl border text-left transition-colors cursor-pointer ${
                  selectedId === cluster.id
                    ? 'bg-coral text-white border-coral'
                    : 'bg-white dark:bg-stone-800 text-charcoal dark:text-stone-200 border-stone-200 dark:border-stone-700'
                }`}
              >
                <span className="text-sm font-subheading font-semibold block">{cluster.title}</span>
                <span
                  className={`text-[13px] block mt-0.5 ${
                    selectedId === cluster.id ? 'text-white/85' : 'text-stone-500 dark:text-stone-400'
                  }`}
                >
                  {cluster.quadrant}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Active Stakeholder Diagnostic Readout */}
        <div className="mt-6 pt-6 border-t border-stone-200/80 dark:border-stone-800 grid grid-cols-1 md:grid-cols-3 gap-5">
          <div>
            <div className="flex items-center gap-2 text-[13px] font-subheading text-stone-500 dark:text-stone-400">
              <span>{activeCluster.quadrant}</span>
              <span aria-hidden="true">·</span>
              <span>{activeCluster.powerInterest}</span>
            </div>
            <h4 className="text-lg font-heading text-charcoal dark:text-white mt-1">
              {activeCluster.title}
            </h4>
            <p className="text-[13px] font-body text-coral mt-1.5 leading-relaxed">
              {activeCluster.friction}
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-white dark:bg-stone-800/70 border border-stone-200/80 dark:border-stone-700/70">
            <span className="text-[13px] font-subheading font-semibold text-charcoal dark:text-white block mb-1">
              Needs from Organizers
            </span>
            <p className="text-[13px] font-body text-stone-600 dark:text-stone-300 leading-relaxed">
              {activeCluster.inbound}
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-white dark:bg-stone-800/70 border border-stone-200/80 dark:border-stone-700/70">
            <span className="text-[13px] font-subheading font-semibold text-charcoal dark:text-white block mb-1">
              Feeds Back into System
            </span>
            <p className="text-[13px] font-body text-stone-600 dark:text-stone-300 leading-relaxed">
              {activeCluster.outbound}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

/* ============================================================================
   2. OPPORTUNITY LANDSCAPE MATRIX (IMPORTANCE VS SATISFACTION 0-10)
   Directly inspired by knoor.framer.website/classroom-orange Opportunity SVG
   ============================================================================ */

interface OpportunityNeed {
  num: number;
  stage: 'Before Event' | 'Event Day' | 'Post-Event';
  label: string;
  importance: number; // 0-10
  satisfaction: number; // 0-10
  zone: 'Underserved' | 'Appropriately served';
  note: string;
}

const OPPORTUNITY_NEEDS: OpportunityNeed[] = [
  {
    num: 1,
    stage: 'Before Event',
    label: 'Submit initial registration form',
    importance: 7.4,
    satisfaction: 7.6,
    zone: 'Appropriately served',
    note: 'Google Forms already handles basic sign-up smoothly across campus.'
  },
  {
    num: 2,
    stage: 'Before Event',
    label: 'Discover event theme via posters & reels',
    importance: 6.2,
    satisfaction: 6.8,
    zone: 'Appropriately served',
    note: 'Campus teaser posters and Instagram reels generate strong initial awareness.'
  },
  {
    num: 3,
    stage: 'Before Event',
    label: 'Receive an instant entry pass & confirmation',
    importance: 9.1,
    satisfaction: 2.3,
    zone: 'Underserved',
    note: 'Communication drops to zero right after hitting Submit on Google Forms.'
  },
  {
    num: 4,
    stage: 'Before Event',
    label: 'Check one trusted schedule & prep checklist',
    importance: 8.6,
    satisfaction: 3.1,
    zone: 'Underserved',
    note: 'Timings and laptop prerequisites get buried across conflicting WhatsApp chats.'
  },
  {
    num: 5,
    stage: 'Event Day',
    label: 'Attend speaker sessions inside auditorium',
    importance: 8.0,
    satisfaction: 7.4,
    zone: 'Appropriately served',
    note: 'Once seated inside the right hall, academic sessions run smoothly.'
  },
  {
    num: 6,
    stage: 'Event Day',
    label: 'Know immediately when room or timing shifts',
    importance: 9.6,
    satisfaction: 1.8,
    zone: 'Underserved',
    note: '84% of surveyed students missed at least one venue or schedule change.'
  },
  {
    num: 7,
    stage: 'Event Day',
    label: 'Verify gate entry without paper sheet queues',
    importance: 8.4,
    satisfaction: 3.4,
    zone: 'Underserved',
    note: 'Manual spreadsheet lookup at auditorium doors creates 20-minute bottlenecks.'
  },
  {
    num: 8,
    stage: 'Post-Event',
    label: 'Track verified attendance record',
    importance: 8.7,
    satisfaction: 2.5,
    zone: 'Underserved',
    note: 'Students have no visibility into whether their attendance sheet was logged.'
  },
  {
    num: 9,
    stage: 'Post-Event',
    label: 'Download official certificate without chasing leads',
    importance: 9.4,
    satisfaction: 2.0,
    zone: 'Underserved',
    note: 'Students spend weeks messaging organizers for missing participation PDFs.'
  }
];

export const OpportunityLandscapeChart: React.FC = () => {
  const [activePin, setActivePin] = useState<number>(6);
  const selectedNeed = OPPORTUNITY_NEEDS.find((n) => n.num === activePin) || OPPORTUNITY_NEEDS[5];

  // Plot coordinates inside SVG viewBox 0..852 x 0..440
  // X: 72 .. 820 (Importance 0..10)
  // Y: 388 .. 28 (Satisfaction 0..10)
  const toX = (imp: number) => 72 + (imp / 10) * 748;
  const toY = (sat: number) => 388 - (sat / 10) * 360;

  return (
    <div className="rounded-3xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 p-5 sm:p-8 space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2">
        <div>
          <h4 className="text-lg sm:text-xl font-heading text-charcoal dark:text-white">
            Opportunity landscape
          </h4>
          <p className="text-[13px] font-subheading text-stone-500 dark:text-stone-400">
            Importance vs satisfaction today, scored 0 to 10 across 47 interviews
          </p>
        </div>
        <span className="text-[13px] font-subheading text-coral font-medium">
          Click any numbered pin (1–9) to inspect
        </span>
      </div>

      {/* SVG Diagonal Opportunity Matrix */}
      <div className="w-full overflow-x-auto">
        <div className="min-w-[620px]">
          <svg viewBox="0 0 852 436" className="w-full h-auto select-none">
            <defs>
              <linearGradient id="oppAppropriate" x1="0" x2="1" y1="1" y2="0">
                <stop offset="0" stopColor="#FF3366" stopOpacity="0.04" />
                <stop offset="1" stopColor="#FF3366" stopOpacity="0.11" />
              </linearGradient>
              <linearGradient id="oppUnderserved" x1="0" x2="1" y1="1" y2="0">
                <stop offset="0" stopColor="#FF3366" stopOpacity="0.12" />
                <stop offset="1" stopColor="#FF3366" stopOpacity="0.26" />
              </linearGradient>
            </defs>

            {/* Top-left Overserved Zone */}
            <path fill="#F6F4F2" className="dark:fill-stone-800/50" d="M 72 388 L 820 28 L 72 28 Z" />
            {/* Middle Appropriately Served Wedge */}
            <path fill="url(#oppAppropriate)" d="M 72 388 L 820 28 L 446 388 Z" />
            {/* Bottom-right Underserved Priority Wedge */}
            <path fill="url(#oppUnderserved)" d="M 446 388 L 820 28 L 820 388 Z" />

            {/* Diagonal Threshold Rays */}
            <path
              d="M 72 388 L 820 28 M 446 388 L 820 28"
              stroke="#FF3366"
              strokeOpacity="0.55"
              strokeDasharray="5 5"
              strokeWidth="1.3"
            />
            <path
              d="M 560 388 L 820 138 M 665 388 L 820 238"
              stroke="#FF3366"
              strokeOpacity="0.3"
              strokeDasharray="3 6"
              strokeWidth="1.1"
            />

            {/* Axes */}
            <path
              d="M 72 28 L 72 388 L 820 388"
              stroke="#D4CFC9"
              strokeWidth="1.4"
              fill="none"
            />

            {/* Zone Labels */}
            <text x="190" y="135" className="fill-stone-400 text-[13px]" fontFamily="var(--font-sub-heading)">
              Overserved
            </text>
            <text x="370" y="235" className="fill-stone-600 dark:fill-stone-300 text-[13px]" fontFamily="var(--font-sub-heading)">
              Appropriately served
            </text>
            <text x="645" y="348" className="fill-[#FF3366] font-semibold text-[14px]" fontFamily="var(--font-sub-heading)">
              Underserved (Focus Zone)
            </text>

            {/* Y Axis Labels */}
            <text x="44" y="38" textAnchor="end" className="fill-stone-500 text-[12px] tabular-nums">
              10 High
            </text>
            <text x="44" y="212" textAnchor="end" className="fill-stone-500 text-[12px]">
              Satisfaction
            </text>
            <text x="44" y="388" textAnchor="end" className="fill-stone-500 text-[12px] tabular-nums">
              0 Low
            </text>

            {/* X Axis Labels */}
            <text x="72" y="416" className="fill-stone-500 text-[12px] tabular-nums">
              0 Low
            </text>
            <text x="446" y="416" textAnchor="middle" className="fill-stone-600 dark:fill-stone-300 text-[12px] font-medium">
              Importance →
            </text>
            <text x="820" y="416" textAnchor="end" className="fill-stone-500 text-[12px] tabular-nums">
              10 High
            </text>

            {/* Plotted Need Pins */}
            {OPPORTUNITY_NEEDS.map((item) => {
              const cx = toX(item.importance);
              const cy = toY(item.satisfaction);
              const isSelected = activePin === item.num;
              const isUnderserved = item.zone === 'Underserved';

              return (
                <g
                  key={item.num}
                  onClick={() => setActivePin(item.num)}
                  className="cursor-pointer"
                >
                  {isSelected && (
                    <circle
                      cx={cx}
                      cy={cy}
                      r={21}
                      fill={isUnderserved ? '#FF3366' : '#8B7CFF'}
                      fillOpacity="0.2"
                    />
                  )}
                  <circle
                    cx={cx}
                    cy={cy}
                    r={isSelected ? 15 : 13}
                    fill={isUnderserved ? '#FF3366' : '#121212'}
                    stroke="#FFFFFF"
                    strokeWidth="2.2"
                  />
                  <text
                    x={cx}
                    y={cy + 4}
                    textAnchor="middle"
                    fill="#FFFFFF"
                    fontSize="12"
                    fontWeight="700"
                    fontFamily="var(--font-sub-heading)"
                  >
                    {item.num}
                  </text>
                </g>
              );
            })}
          </svg>
        </div>
      </div>

      {/* Selected Pin Callout Bar */}
      <div className="p-4 sm:p-5 rounded-2xl bg-[#F7F5F2] dark:bg-stone-800/80 border border-stone-200/90 dark:border-stone-700 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-start gap-3.5">
          <span
            className={`w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-bold shrink-0 mt-0.5 tabular-nums ${
              selectedNeed.zone === 'Underserved' ? 'bg-coral' : 'bg-charcoal dark:bg-stone-700'
            }`}
          >
            {selectedNeed.num}
          </span>
          <div>
            <div className="flex flex-wrap items-center gap-2 text-[13px] font-subheading text-stone-500 dark:text-stone-400">
              <span>{selectedNeed.stage}</span>
              <span aria-hidden="true">·</span>
              <span className={selectedNeed.zone === 'Underserved' ? 'text-coral font-semibold' : ''}>
                {selectedNeed.zone}
              </span>
            </div>
            <h5 className="text-base font-heading text-charcoal dark:text-white mt-0.5">
              {selectedNeed.label}
            </h5>
            <p className="text-[13px] font-body text-stone-600 dark:text-stone-300 mt-0.5">
              {selectedNeed.note}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-5 shrink-0 pl-11 sm:pl-0 tabular-nums">
          <div>
            <span className="text-[13px] text-stone-500 dark:text-stone-400 block">Importance</span>
            <span className="text-xl font-heading text-charcoal dark:text-white">
              {selectedNeed.importance.toFixed(1)}/10
            </span>
          </div>
          <div className="h-8 w-px bg-stone-300 dark:bg-stone-700" />
          <div>
            <span className="text-[13px] text-stone-500 dark:text-stone-400 block">Satisfaction</span>
            <span className="text-xl font-heading text-coral">
              {selectedNeed.satisfaction.toFixed(1)}/10
            </span>
          </div>
        </div>
      </div>

      {/* 3-Column Stage Index Legend (Exact classroom-orange pattern) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 pt-2">
        {(['Before Event', 'Event Day', 'Post-Event'] as const).map((stageName) => (
          <div key={stageName} className="space-y-2.5">
            <h5 className="text-sm font-heading text-charcoal dark:text-white border-b border-stone-200 dark:border-stone-800 pb-1.5">
              {stageName}
            </h5>
            <div className="space-y-1.5">
              {OPPORTUNITY_NEEDS.filter((n) => n.stage === stageName).map((item) => {
                const isSelected = activePin === item.num;
                return (
                  <button
                    key={item.num}
                    onClick={() => setActivePin(item.num)}
                    className={`w-full text-left px-2.5 py-1.5 rounded-xl transition-colors flex items-center gap-2.5 cursor-pointer ${
                      isSelected
                        ? 'bg-coral/10 text-charcoal dark:text-white font-medium'
                        : 'hover:bg-stone-100 dark:hover:bg-stone-800/60 text-stone-600 dark:text-stone-400'
                    }`}
                  >
                    <span
                      className={`w-5 h-5 rounded-full text-[11px] font-bold flex items-center justify-center shrink-0 tabular-nums ${
                        item.zone === 'Underserved'
                          ? 'bg-coral text-white'
                          : 'bg-stone-200 dark:bg-stone-700 text-charcoal dark:text-stone-200'
                      }`}
                    >
                      {item.num}
                    </span>
                    <span className="text-[13px] font-subheading truncate">{item.label}</span>
                  </button>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

/* ============================================================================
   3. MULTI-LANE HORIZONTAL JOURNEY MAP ("JOURNEY THROUGH THE OLD SYSTEM")
   Directly modeled on knoor.framer.website/classroom-orange Swimlane Table
   Grounded in Anushka's 7-Phase System Flow & Channel Map
   ============================================================================ */

type SentimentMood = 'happy' | 'neutral' | 'frustrated';

const SentimentFace: React.FC<{ mood: SentimentMood }> = ({ mood }) => {
  if (mood === 'happy') {
    return (
      <div className="inline-flex items-center gap-2">
        <svg width="34" height="34" viewBox="0 0 36 36" fill="none">
          <circle cx="18" cy="18" r="16" fill="#DCFCE7" stroke="#22C55E" strokeWidth="1.6" />
          <circle cx="13" cy="15" r="1.7" fill="#15803D" />
          <circle cx="23" cy="15" r="1.7" fill="#15803D" />
          <path d="M12 21.5C13.5 24.2 16 25 18 25C20 25 22.5 24.2 24 21.5" stroke="#15803D" strokeWidth="1.8" strokeLinecap="round" />
        </svg>
        <span className="text-[13px] font-subheading text-emerald-700 dark:text-emerald-400">Clear</span>
      </div>
    );
  }
  if (mood === 'neutral') {
    return (
      <div className="inline-flex items-center gap-2">
        <svg width="34" height="34" viewBox="0 0 36 36" fill="none">
          <circle cx="18" cy="18" r="16" fill="#FEF3C7" stroke="#F59E0B" strokeWidth="1.6" />
          <circle cx="13" cy="15" r="1.7" fill="#B45309" />
          <circle cx="23" cy="15" r="1.7" fill="#B45309" />
          <path d="M13 22.5H23" stroke="#B45309" strokeWidth="1.8" strokeLinecap="round" />
        </svg>
        <span className="text-[13px] font-subheading text-amber-700 dark:text-amber-400">Uncertain</span>
      </div>
    );
  }
  return (
    <div className="inline-flex items-center gap-2">
      <svg width="34" height="34" viewBox="0 0 36 36" fill="none">
        <circle cx="18" cy="18" r="16" fill="#FFE4E6" stroke="#FF3366" strokeWidth="1.6" />
        <circle cx="13" cy="15" r="1.7" fill="#BE123C" />
        <circle cx="23" cy="15" r="1.7" fill="#BE123C" />
        <path d="M12.5 24.5C14 22 16 21.2 18 21.2C20 21.2 22 22 23.5 24.5" stroke="#BE123C" strokeWidth="1.8" strokeLinecap="round" />
      </svg>
      <span className="text-[13px] font-subheading text-coral font-medium">Frustrated</span>
    </div>
  );
};

const JOURNEY_STAGES = [
  {
    stage: '01 · Ideation',
    action: 'Faculty & student clubs propose event theme and prepare concept note',
    touchpoints: 'Verbal meetings · Personal notes',
    pain: 'Context lives in verbal conversations with zero shared written brief',
    mood: 'happy' as SentimentMood,
    opportunity: 'Structured event brief template in a shared workspace'
  },
  {
    stage: '02 · Approval',
    action: 'Submit room, speaker & budget proposal to Administration & Dean',
    touchpoints: 'Physical files · Office visits · Emails',
    pain: '72+ hour approval lag blocks downstream teams from locking schedules',
    mood: 'frustrated' as SentimentMood,
    opportunity: 'Decouple static event registration from volatile room assignment'
  },
  {
    stage: '03 · Event Details',
    action: 'Sub-teams finalize speakers, tracks, fees, and hall logistics',
    touchpoints: '9 separate WhatsApp sub-groups',
    pain: 'Venue team updates room while PR team still uses yesterday’s draft',
    mood: 'neutral' as SentimentMood,
    opportunity: 'Modular sub-team input fields feeding one central database'
  },
  {
    stage: '04 · Promotion',
    action: 'Publish campus posters, social media reels, and class forwards',
    touchpoints: 'Printed posters · Instagram · Class reps',
    pain: 'Rushed awareness window; printed posters freeze details permanently',
    mood: 'neutral' as SentimentMood,
    opportunity: 'QR posters pointing to a live, updatable web destination'
  },
  {
    stage: '05 · Registration',
    action: 'Student fills Google Form and pays fee (if applicable); waits for event day',
    touchpoints: 'Google Form · UPI screenshot',
    pain: 'Complete communication blackout after hitting Submit — no pass or link',
    mood: 'frustrated' as SentimentMood,
    opportunity: 'Auto-provision personal Event Journey Card URL upon sign-up'
  },
  {
    stage: '06 · Event Day',
    action: 'Finds auditorium, stands in check-in queue, navigates schedule changes',
    touchpoints: 'Phone calls · Word of mouth · Paper lists',
    pain: '84% miss sudden venue/time shifts; organizers flooded with 100+ panic calls',
    mood: 'frustrated' as SentimentMood,
    opportunity: '2-second QR gate scan + high-contrast live venue diff banners'
  },
  {
    stage: '07 · Post-Event',
    action: 'Submits feedback and waits weeks for participation certificate',
    touchpoints: 'Chasing student leads on WhatsApp',
    pain: 'Attendance logs get misplaced; certificates delayed or never delivered',
    mood: 'frustrated' as SentimentMood,
    opportunity: 'Verified check-in automatically unlocks 1-tap PDF certificate'
  }
];

export const OldSystemJourneyMap: React.FC<DiagramZoomProps> = ({ onZoomSlide }) => {
  return (
    <div className="rounded-3xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 p-5 sm:p-8 space-y-5">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h4 className="text-lg sm:text-xl font-heading text-charcoal dark:text-white">
            End-to-end journey through the legacy campus event system
          </h4>
          <p className="text-[13px] font-subheading text-stone-500 dark:text-stone-400">
            Mapped across all 7 stages from faculty ideation to certificate fulfillment
          </p>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-[13px] font-subheading text-coral font-medium flex items-center gap-1">
            <span>Scroll to explore</span>
            <ArrowRight size={14} />
          </span>
          {onZoomSlide && (
            <button
              onClick={() => onZoomSlide('/assets/projects/systems-design/systems_slide_16.png')}
              className="px-3 py-1.5 rounded-lg bg-stone-100 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 text-[13px] font-subheading text-charcoal dark:text-stone-200 hover:border-coral transition-colors flex items-center gap-1.5 cursor-pointer whitespace-nowrap shrink-0"
            >
              <ZoomIn size={13} className="text-coral" />
              <span>Original Flow Map</span>
            </button>
          )}
        </div>
      </div>

      {/* Horizontal Scrollable Matrix */}
      <div className="overflow-x-auto pb-3 custom-scrollbar">
        <table className="min-w-[1180px] w-full border-separate border-spacing-2.5 text-left">
          <thead>
            <tr>
              <th className="w-[135px] sticky left-0 z-10 bg-white dark:bg-stone-900 py-2.5 px-3 text-[13px] font-subheading font-semibold text-stone-400">
                Stages
              </th>
              {JOURNEY_STAGES.map((col) => (
                <th
                  key={col.stage}
                  className="w-[165px] py-2.5 px-3.5 rounded-xl bg-charcoal dark:bg-stone-800 text-white text-[13px] font-subheading font-semibold"
                >
                  {col.stage}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="align-top text-[13px]">
            {/* Row 1: Actions */}
            <tr>
              <td className="sticky left-0 z-10 bg-white dark:bg-stone-900 py-3 px-3 font-subheading font-semibold text-charcoal dark:text-stone-200">
                Actions
              </td>
              {JOURNEY_STAGES.map((col) => (
                <td
                  key={col.stage}
                  className="p-3.5 rounded-xl bg-[#F7F5F2] dark:bg-stone-800/60 text-stone-700 dark:text-stone-300 font-body leading-relaxed"
                >
                  {col.action}
                </td>
              ))}
            </tr>

            {/* Row 2: Touchpoints */}
            <tr>
              <td className="sticky left-0 z-10 bg-white dark:bg-stone-900 py-3 px-3 font-subheading font-semibold text-charcoal dark:text-stone-200">
                Touchpoints
              </td>
              {JOURNEY_STAGES.map((col) => (
                <td
                  key={col.stage}
                  className="p-3.5 rounded-xl bg-stone-50 dark:bg-stone-800/40 border border-stone-200/70 dark:border-stone-800 text-stone-600 dark:text-stone-400 font-subheading"
                >
                  {col.touchpoints}
                </td>
              ))}
            </tr>

            {/* Row 3: Pain Points */}
            <tr>
              <td className="sticky left-0 z-10 bg-white dark:bg-stone-900 py-3 px-3 font-subheading font-semibold text-coral">
                Pain points
              </td>
              {JOURNEY_STAGES.map((col) => (
                <td
                  key={col.stage}
                  className={`p-3.5 rounded-xl font-body leading-relaxed border ${
                    col.mood === 'frustrated'
                      ? 'bg-coral/5 dark:bg-coral/10 border-coral/30 text-charcoal dark:text-stone-100'
                      : 'bg-stone-50 dark:bg-stone-800/40 border-stone-200/70 dark:border-stone-800 text-stone-600 dark:text-stone-300'
                  }`}
                >
                  {col.pain}
                </td>
              ))}
            </tr>

            {/* Row 4: Sentiment */}
            <tr>
              <td className="sticky left-0 z-10 bg-white dark:bg-stone-900 py-3 px-3 font-subheading font-semibold text-charcoal dark:text-stone-200">
                Experience
              </td>
              {JOURNEY_STAGES.map((col) => (
                <td
                  key={col.stage}
                  className="p-3 rounded-xl bg-stone-50/70 dark:bg-stone-800/30 border border-stone-200/60 dark:border-stone-800"
                >
                  <SentimentFace mood={col.mood} />
                </td>
              ))}
            </tr>

            {/* Row 5: Opportunity */}
            <tr>
              <td className="sticky left-0 z-10 bg-white dark:bg-stone-900 py-3 px-3 font-subheading font-semibold text-lavender">
                Opportunity
              </td>
              {JOURNEY_STAGES.map((col) => (
                <td
                  key={col.stage}
                  className="p-3.5 rounded-xl bg-lavender/8 dark:bg-lavender/15 border border-lavender/30 text-charcoal dark:text-stone-100 font-subheading leading-relaxed"
                >
                  {col.opportunity}
                </td>
              ))}
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

/* ============================================================================
   4. DESIGNING THE LIVING CARD LOOP + VENUE CHANGE PROPAGATION FLOWCHART
   Modeled on knoor.framer.website/classroom-orange GuDPgFWrKtypBLOZrsZ0vmMU4Y.svg
   Grounded in Anushka's journey_card_05.png (Attendee Journey & Updated Flow)
   ============================================================================ */

export const LivingCardLoopDiagram: React.FC<DiagramZoomProps> = ({ onZoomSlide }) => {
  const [activeStep, setActiveStep] = useState<number>(2);

  const propagationSteps = [
    {
      step: '01',
      actor: 'Venue Team',
      title: 'Logs room change once',
      detail: 'Venue coordinator updates hall from G-Block AV Room to D-Block Auditorium in the backend sheet.'
    },
    {
      step: '02',
      actor: 'Event Database',
      title: 'Flags live parameter diff',
      detail: 'System records Old: G-Block AV Room → New: D-Block Auditorium with an instant audit timestamp.'
    },
    {
      step: '03',
      actor: 'Other Sub-Teams',
      title: 'Align logistics automatically',
      detail: 'Tech, Hospitality, and Signage sub-teams see the updated auditorium without playing telephone.'
    },
    {
      step: '04',
      actor: 'Event Journey Card',
      title: 'Refreshes the same link',
      detail: 'Every attendee’s personal card highlights the Venue Change banner in coral within 5 minutes.'
    },
    {
      step: '05',
      actor: 'Notification Ping',
      title: 'SMS / WhatsApp nudge sent',
      detail: 'Registered students receive a concise ping pointing right back to their existing personal card URL.'
    }
  ];

  return (
    <div className="space-y-6">
      {/* Top Loop Architecture Card */}
      <div className="rounded-3xl bg-[#F7F5F2] dark:bg-stone-900 border border-stone-200 dark:border-stone-800 p-5 sm:p-8 space-y-6">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <h4 className="text-lg sm:text-xl font-heading text-charcoal dark:text-white">
              One permanent URL across five progressive stages
            </h4>
            <p className="text-[13px] font-subheading text-stone-500 dark:text-stone-400">
              Register → Get Your Card → Before Event → Event Day → Post-Event Fulfillment
            </p>
          </div>
          {onZoomSlide && (
            <button
              onClick={() => onZoomSlide('/assets/projects/systems-design/journey_card_05.png')}
              className="px-3 py-1.5 rounded-lg bg-white dark:bg-stone-800 border border-stone-200 dark:border-stone-700 text-[13px] font-subheading text-charcoal dark:text-stone-200 hover:border-coral transition-colors flex items-center gap-1.5 cursor-pointer whitespace-nowrap shrink-0"
            >
              <ZoomIn size={13} className="text-coral" />
              <span>Original Journey Slide</span>
            </button>
          )}
        </div>

        {/* Dashed Orthogonal Loop SVG + 5 Stage Columns */}
        <div className="overflow-x-auto pb-2">
          <div className="min-w-[820px] space-y-2">
            {/* Top Dashed Jump Connectors (Exact Classroom Loop Motif) */}
            <svg viewBox="0 0 860 44" fill="none" className="w-full h-11 overflow-visible">
              <defs>
                <marker id="loopArrowCoral" markerWidth="7" markerHeight="7" refX="7" refY="3.5" orient="auto">
                  <path d="M0 0.5 L7 3.5 L0 6.5 Z" fill="#FF3366" />
                </marker>
                <marker id="loopArrowLav" markerWidth="7" markerHeight="7" refX="7" refY="3.5" orient="auto">
                  <path d="M0 0.5 L7 3.5 L0 6.5 Z" fill="#8B7CFF" />
                </marker>
              </defs>
              {[86, 260, 434, 608].map((startX, i) => (
                <path
                  key={startX}
                  d={`M ${startX} 40 V 18 Q ${startX} 8 ${startX + 10} 8 H ${startX + 154} Q ${startX + 164} 8 ${startX + 164} 18 V 36`}
                  stroke={i < 3 ? '#FF3366' : '#8B7CFF'}
                  strokeWidth="1.5"
                  strokeDasharray="5 4"
                  markerEnd={i < 3 ? 'url(#loopArrowCoral)' : 'url(#loopArrowLav)'}
                />
              ))}
            </svg>

            {/* 5 Stage Columns */}
            <div className="grid grid-cols-5 gap-3">
              {[
                {
                  stage: '01 · Register',
                  items: ['Submit Google Form', 'Instant confirmation', 'Personal link generated'],
                  accent: 'border-stone-200 dark:border-stone-700'
                },
                {
                  stage: '02 · Get Your Card',
                  items: ['Tap SMS / WhatsApp URL', 'Zero app download', 'Verified status & QR pass'],
                  accent: 'border-stone-200 dark:border-stone-700'
                },
                {
                  stage: '03 · Before Event',
                  items: ['Venue & campus map', 'Day-wise schedule', 'Entry rules & checklist'],
                  accent: 'border-stone-200 dark:border-stone-700'
                },
                {
                  stage: '04 · Event Day',
                  items: ['2s QR gate check-in', 'Live venue/time diffs', 'Active session tracker'],
                  accent: 'border-coral/50 ring-1 ring-coral/20'
                },
                {
                  stage: '05 · Post-Event',
                  items: ['Attendance auto-stamped', '1-tap PDF certificate', 'In-flow feedback form'],
                  accent: 'border-lavender/50 ring-1 ring-lavender/20'
                }
              ].map((col) => (
                <div
                  key={col.stage}
                  className={`rounded-2xl bg-white dark:bg-stone-800/90 border ${col.accent} p-4 space-y-2.5 shadow-xs`}
                >
                  <div className="text-[13px] font-subheading font-semibold text-charcoal dark:text-white pb-2 border-b border-stone-100 dark:border-stone-700">
                    {col.stage}
                  </div>
                  <div className="space-y-1.5">
                    {col.items.map((item) => (
                      <div
                        key={item}
                        className="px-2.5 py-2 rounded-xl bg-[#F7F5F2] dark:bg-stone-900/70 text-[13px] font-body text-stone-700 dark:text-stone-300"
                      >
                        {item}
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            {/* Bottom Bracket Spans */}
            <svg viewBox="0 0 860 36" fill="none" className="w-full h-9">
              <path d="M 12 4 V 12 H 334 V 4" stroke="#E5B8C5" strokeWidth="1.4" strokeLinecap="round" />
              <text x="173" y="28" textAnchor="middle" className="fill-stone-500 text-[12px]" fontFamily="var(--font-sub-heading)">
                Onboarding & Provisioning
              </text>

              <path d="M 352 4 V 12 H 682 V 4" stroke="#FF3366" strokeWidth="1.4" strokeLinecap="round" />
              <text x="517" y="28" textAnchor="middle" className="fill-[#FF3366] text-[12px] font-semibold" fontFamily="var(--font-sub-heading)">
                Dynamic Live Information Layer
              </text>

              <path d="M 700 4 V 12 H 848 V 4" stroke="#8B7CFF" strokeWidth="1.4" strokeLinecap="round" />
              <text x="774" y="28" textAnchor="middle" className="fill-[#8B7CFF] text-[12px] font-semibold" fontFamily="var(--font-sub-heading)">
                Closed Proof Loop
              </text>
            </svg>
          </div>
        </div>
      </div>

      {/* Interactive Updated Information Flow: Real-World Room Relocation Trace */}
      <div className="rounded-3xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 p-5 sm:p-8 space-y-5">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <h4 className="text-lg font-heading text-charcoal dark:text-white">
              Updated information flow: When a venue changes on event morning
            </h4>
            <p className="text-[13px] font-subheading text-stone-500 dark:text-stone-400">
              Scenario trace: G-Block AV Room relocated to D-Block Auditorium · Click any node
            </p>
          </div>
          <button
            onClick={() => setActiveStep((prev) => (prev + 1) % propagationSteps.length)}
            className="px-3.5 py-1.5 rounded-xl bg-charcoal dark:bg-white text-white dark:text-charcoal text-[13px] font-subheading font-medium hover:opacity-90 transition-opacity flex items-center gap-1.5 cursor-pointer whitespace-nowrap shrink-0"
          >
            <RefreshCw size={13} />
            <span>Trace Next Step</span>
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-5 gap-3">
          {propagationSteps.map((item, idx) => {
            const isCurrent = activeStep === idx;
            const isPassed = idx <= activeStep;
            return (
              <button
                key={item.step}
                onClick={() => setActiveStep(idx)}
                className={`relative text-left p-4 rounded-2xl border transition-all cursor-pointer ${
                  isCurrent
                    ? 'bg-coral/8 dark:bg-coral/15 border-coral shadow-sm'
                    : isPassed
                    ? 'bg-[#F7F5F2] dark:bg-stone-800/80 border-stone-300 dark:border-stone-700'
                    : 'bg-stone-50/60 dark:bg-stone-900 border-stone-200/70 dark:border-stone-800 opacity-75'
                }`}
              >
                <div className="flex items-center justify-between text-[13px] font-subheading mb-1.5">
                  <span className={isCurrent ? 'text-coral font-bold' : 'text-stone-400'}>
                    {item.step}
                  </span>
                  <span className="text-stone-500 dark:text-stone-400 truncate ml-2">
                    {item.actor}
                  </span>
                </div>
                <p className="text-sm font-heading text-charcoal dark:text-white leading-snug">
                  {item.title}
                </p>
              </button>
            );
          })}
        </div>

        <div className="p-4 sm:p-5 rounded-2xl bg-[#F7F5F2] dark:bg-stone-800/70 border border-stone-200/80 dark:border-stone-700 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <span className="text-[13px] font-subheading text-coral font-semibold">
              Step {propagationSteps[activeStep].step} · {propagationSteps[activeStep].actor}
            </span>
            <p className="text-sm sm:text-base font-body text-charcoal dark:text-stone-200 mt-0.5">
              {propagationSteps[activeStep].detail}
            </p>
          </div>
          <div className="px-3.5 py-2 rounded-xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-700 text-[13px] font-mono text-charcoal dark:text-stone-200 shrink-0 tabular-nums">
            Old: G-Block AV → New: D-Block Aud
          </div>
        </div>
      </div>
    </div>
  );
};

/* ============================================================================
   5. ARCHITECTURAL NODE-AND-BRANCH SYSTEM & USER FLOWCHART
   Modeled 1:1 on knoor.framer.website/classroom-orange User Flow Canvas:
   - Soft warm-stone canvas (#F3F1EE)
   - Circular peach/coral start & milestone nodes
   - Dashed-border grouped containers with uppercase micro-headers & white inner cards
   - Orthogonal 90-degree SVG connectors & rotated coral diamond decision nodes
   ============================================================================ */

const DecisionDiamond: React.FC<{ label: string }> = ({ label }) => (
  <div className="inline-flex items-center gap-2.5 pt-2">
    <span className="w-5 h-5 rotate-45 rounded-[4px] bg-gradient-to-br from-[#FF7A4D] to-[#FF3366] shadow-xs shrink-0 block" />
    <span className="text-[13px] font-subheading font-medium text-[#C2410C] dark:text-coral whitespace-nowrap">
      {label}
    </span>
  </div>
);

export const SystemArchitectureFlowchart: React.FC<DiagramZoomProps> = ({ onZoomSlide }) => {
  const [flowView, setFlowView] = useState<'attendee' | 'backend'>('attendee');

  return (
    <div className="rounded-3xl bg-[#F3F1EE] dark:bg-[#141416] border border-stone-200/90 dark:border-stone-800 p-5 sm:p-8 md:p-10 space-y-8">
      {/* Header + Segmented View Switcher */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h4 className="text-xl sm:text-2xl font-heading text-charcoal dark:text-white">
            {flowView === 'attendee'
              ? 'Event Journey Card user & information architecture flow'
              : 'Multi-team backend ingestion & card distribution pipeline'}
          </h4>
          <p className="text-[13px] font-subheading text-stone-600 dark:text-stone-400 mt-0.5">
            {flowView === 'attendee'
              ? 'From form submission to certificate download: every path, decision trigger, and information module'
              : 'How 9 independent student sub-teams feed one verified event database without central bottlenecks'}
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <div className="inline-flex p-1 rounded-xl bg-white/90 dark:bg-stone-900 border border-stone-200 dark:border-stone-800">
            <button
              onClick={() => setFlowView('attendee')}
              className={`px-3.5 py-1.5 rounded-lg text-[13px] font-subheading font-medium transition-colors cursor-pointer whitespace-nowrap shrink-0 ${
                flowView === 'attendee'
                  ? 'bg-charcoal text-white dark:bg-white dark:text-charcoal shadow-xs'
                  : 'text-stone-600 dark:text-stone-400 hover:text-charcoal dark:hover:text-white'
              }`}
            >
              Attendee User Flow
            </button>
            <button
              onClick={() => setFlowView('backend')}
              className={`px-3.5 py-1.5 rounded-xl text-[13px] font-subheading font-medium transition-colors cursor-pointer whitespace-nowrap shrink-0 ${
                flowView === 'backend'
                  ? 'bg-charcoal text-white dark:bg-white dark:text-charcoal shadow-xs'
                  : 'text-stone-600 dark:text-stone-400 hover:text-charcoal dark:hover:text-white'
              }`}
            >
              Backend System Flow
            </button>
          </div>

          {onZoomSlide && (
            <button
              onClick={() =>
                onZoomSlide(
                  flowView === 'attendee'
                    ? '/assets/projects/systems-design/systems_slide_18.png'
                    : '/assets/projects/systems-design/journey_card_07.png'
                )
              }
              className="px-3 py-2 rounded-xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 text-[13px] font-subheading text-charcoal dark:text-stone-200 hover:border-coral transition-colors flex items-center gap-1.5 cursor-pointer whitespace-nowrap shrink-0"
            >
              <ZoomIn size={13} className="text-coral" />
              <span>Original Diagram</span>
            </button>
          )}
        </div>
      </div>

      {/* ===================================================================
          VIEW A: ATTENDEE USER & IA FLOWCHART (Classroom-Orange Node Style)
         =================================================================== */}
      {flowView === 'attendee' ? (
        <div className="overflow-x-auto pb-2">
          <div className="min-w-[920px] flex flex-col items-center">
            {/* Top Entry Circle Node */}
            <div className="w-36 h-36 rounded-full bg-gradient-to-b from-[#FFE6DC] to-[#FFD6C6] dark:from-coral/25 dark:to-coral/15 border border-[#F5BFA8] dark:border-coral/40 shadow-sm flex items-center justify-center p-4 text-center">
              <span className="text-[13px] font-subheading font-semibold text-[#5C2410] dark:text-white leading-snug">
                Student submits Registration Form
              </span>
            </div>

            {/* Vertical Arrow */}
            <svg width="24" height="36" viewBox="0 0 24 36" fill="none">
              <path d="M12 0V30" stroke="#C8B9B0" strokeWidth="1.5" />
              <path d="M8 27L12 33L16 27" fill="#C8B9B0" />
            </svg>

            {/* Second Circle Node */}
            <div className="w-40 h-40 rounded-full bg-gradient-to-b from-[#FFE6DC] to-[#FFD6C6] dark:from-coral/25 dark:to-coral/15 border border-[#F5BFA8] dark:border-coral/40 shadow-sm flex items-center justify-center p-4 text-center">
              <span className="text-[13px] font-subheading font-semibold text-[#5C2410] dark:text-white leading-snug">
                Opens personal Event Journey Card URL
              </span>
            </div>

            {/* Orthogonal 3-Branch Tree Connector */}
            <svg width="860" height="46" viewBox="0 0 860 46" fill="none" className="w-full max-w-[860px]">
              <path d="M430 0V20 M145 20H715 M145 20V38 M430 20V38 M715 20V38" stroke="#C8B9B0" strokeWidth="1.5" />
              <path d="M141 36L145 43L149 36Z M426 36L430 43L434 36Z M711 36L715 43L719 36Z" fill="#C8B9B0" />
            </svg>

            {/* Tier 1: Three Dashed Functional Containers */}
            <div className="grid grid-cols-3 gap-6 w-full max-w-[920px] items-start">
              {/* Group 1: Core Pass */}
              <div className="flex flex-col items-center">
                <div className="w-full rounded-2xl border-[1.5px] border-dashed border-[#E5B89B] dark:border-stone-700 bg-[#FAF8F6] dark:bg-stone-900/80 p-4 space-y-3">
                  <span className="text-[13px] font-subheading font-bold text-[#C2410C] dark:text-coral block">
                    Identity & Entry Pass
                  </span>
                  <div className="grid grid-cols-2 gap-2.5">
                    {[
                      'Verified registration status',
                      'Unique UID & QR pass',
                      'Event date & timing',
                      'Assigned hall & gate'
                    ].map((card) => (
                      <div
                        key={card}
                        className="p-3 rounded-xl bg-white dark:bg-stone-800 border border-stone-200/70 dark:border-stone-700 text-[13px] font-body text-charcoal dark:text-stone-200 text-center shadow-2xs leading-snug flex items-center justify-center min-h-[60px]"
                      >
                        {card}
                      </div>
                    ))}
                  </div>
                </div>
                <svg width="20" height="24" viewBox="0 0 20 24" fill="none">
                  <path d="M10 0V18" stroke="#C8B9B0" strokeWidth="1.5" />
                  <path d="M6 16L10 22L14 16Z" fill="#C8B9B0" />
                </svg>
                <DecisionDiamond label="Payment / ID verified" />
              </div>

              {/* Group 2: Live Updates */}
              <div className="flex flex-col items-center">
                <div className="w-full rounded-2xl border-[1.5px] border-dashed border-[#E5B89B] dark:border-stone-700 bg-[#FAF8F6] dark:bg-stone-900/80 p-4 space-y-3">
                  <span className="text-[13px] font-subheading font-bold text-[#C2410C] dark:text-coral block">
                    Live Updates & Alerts
                  </span>
                  <div className="grid grid-cols-2 gap-2.5">
                    {[
                      'Venue relocation diff',
                      'Schedule shift alert',
                      'SMS / WhatsApp ping',
                      'Same-link refresh'
                    ].map((card) => (
                      <div
                        key={card}
                        className="p-3 rounded-xl bg-white dark:bg-stone-800 border border-stone-200/70 dark:border-stone-700 text-[13px] font-body text-charcoal dark:text-stone-200 text-center shadow-2xs leading-snug flex items-center justify-center min-h-[60px]"
                      >
                        {card}
                      </div>
                    ))}
                  </div>
                </div>
                <svg width="20" height="24" viewBox="0 0 20 24" fill="none">
                  <path d="M10 0V18" stroke="#C8B9B0" strokeWidth="1.5" />
                  <path d="M6 16L10 22L14 16Z" fill="#C8B9B0" />
                </svg>
                <DecisionDiamond label="Logistics changed?" />
              </div>

              {/* Group 3: Support & Guidance */}
              <div className="flex flex-col items-center">
                <div className="w-full rounded-2xl border-[1.5px] border-dashed border-[#E5B89B] dark:border-stone-700 bg-[#FAF8F6] dark:bg-stone-900/80 p-4 space-y-3">
                  <span className="text-[13px] font-subheading font-bold text-[#C2410C] dark:text-coral block">
                    Guidance & Support
                  </span>
                  <div className="grid grid-cols-2 gap-2.5">
                    {[
                      'Campus block directions',
                      'What to bring list',
                      'Dress & laptop rules',
                      '1-tap helpline contact'
                    ].map((card) => (
                      <div
                        key={card}
                        className="p-3 rounded-xl bg-white dark:bg-stone-800 border border-stone-200/70 dark:border-stone-700 text-[13px] font-body text-charcoal dark:text-stone-200 text-center shadow-2xs leading-snug flex items-center justify-center min-h-[60px]"
                      >
                        {card}
                      </div>
                    ))}
                  </div>
                </div>
                <svg width="20" height="24" viewBox="0 0 20 24" fill="none">
                  <path d="M10 0V18" stroke="#C8B9B0" strokeWidth="1.5" />
                  <path d="M6 16L10 22L14 16Z" fill="#C8B9B0" />
                </svg>
                <DecisionDiamond label="Attendee question?" />
              </div>
            </div>

            {/* Transition Connector to 4-Column Information Architecture Fan-Out */}
            <svg width="860" height="58" viewBox="0 0 860 58" fill="none" className="w-full max-w-[860px] mt-1">
              <path d="M430 4V26 M110 26H750 M110 26V48 M323 26V48 M537 26V48 M750 26V48" stroke="#C8B9B0" strokeWidth="1.5" />
              <path d="M106 46L110 53L114 46Z M319 46L323 53L327 46Z M533 46L537 53L541 46Z M746 46L750 53L754 46Z" fill="#C8B9B0" />
            </svg>

            {/* Tier 2: Four Information Architecture Columns (from systems_slide_18.png) */}
            <div className="grid grid-cols-4 gap-4 w-full max-w-[920px] items-start">
              {[
                {
                  header: 'Event Overview',
                  tint: 'bg-[#FDE8D7] dark:bg-coral/20 text-[#7C2D12] dark:text-stone-100 border-[#F5C6A5] dark:border-coral/40',
                  cards: [
                    'Event title & academic theme',
                    'Session agenda & tracks',
                    'Speaker profiles & topics',
                    'Brochure & reading material'
                  ]
                },
                {
                  header: 'Registration & Pass',
                  tint: 'bg-[#FDE8D7] dark:bg-coral/20 text-[#7C2D12] dark:text-stone-100 border-[#F5C6A5] dark:border-coral/40',
                  cards: [
                    'Form rules & categories',
                    'Fee & payment receipt',
                    'Turnstile QR entry code',
                    'Add to personal calendar'
                  ]
                },
                {
                  header: 'On-Ground Execution',
                  tint: 'bg-[#EDE9FE] dark:bg-lavender/20 text-[#4C1D95] dark:text-stone-100 border-[#C4B5FD] dark:border-lavender/40',
                  cards: [
                    '2-second volunteer QR scan',
                    'Active keynote indicator',
                    'Old vs New hall diff card',
                    'Emergency coordinator desk'
                  ]
                },
                {
                  header: 'Post-Event Proof',
                  tint: 'bg-[#EDE9FE] dark:bg-lavender/20 text-[#4C1D95] dark:text-stone-100 border-[#C4B5FD] dark:border-lavender/40',
                  cards: [
                    'Attendance status locked',
                    'Verified PDF certificate',
                    'Post-event feedback form',
                    'Session photos & archive'
                  ]
                }
              ].map((col) => (
                <div key={col.header} className="flex flex-col items-center space-y-3">
                  <div className={`px-4 py-1.5 rounded-xl border text-[13px] font-subheading font-semibold ${col.tint}`}>
                    {col.header}
                  </div>
                  <div className="w-full rounded-2xl border-[1.5px] border-dashed border-[#DFC7B8] dark:border-stone-700 bg-[#FAF8F6] dark:bg-stone-900/80 p-3.5 space-y-2.5">
                    {col.cards.map((item) => (
                      <div
                        key={item}
                        className="p-3 rounded-xl bg-white dark:bg-stone-800 border border-stone-200/70 dark:border-stone-700 text-[13px] font-body text-charcoal dark:text-stone-200 text-center shadow-2xs"
                      >
                        {item}
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            {/* Bottom Convergence to Certificate Outcome */}
            <svg width="860" height="54" viewBox="0 0 860 54" fill="none" className="w-full max-w-[860px]">
              <path d="M323 0V24 H537 V0 M430 24V46" stroke="#C8B9B0" strokeWidth="1.5" />
              <path d="M426 44L430 51L434 44Z" fill="#C8B9B0" />
            </svg>

            <div className="px-5 py-2 rounded-xl bg-[#FFE6DC] dark:bg-coral/20 border border-[#F5BFA8] dark:border-coral/40 text-[13px] font-subheading font-semibold text-[#5C2410] dark:text-white">
              Verified check-in completes the service loop
            </div>

            <svg width="24" height="30" viewBox="0 0 24 30" fill="none">
              <path d="M12 0V24" stroke="#C8B9B0" strokeWidth="1.5" />
              <path d="M8 22L12 28L16 22Z" fill="#C8B9B0" />
            </svg>

            <div className="w-36 h-36 rounded-full bg-gradient-to-b from-[#EDE9FE] to-[#DDD6FE] dark:from-lavender/30 dark:to-lavender/15 border border-[#C4B5FD] dark:border-lavender/40 shadow-sm flex items-center justify-center p-4 text-center">
              <span className="text-[13px] font-subheading font-semibold text-[#3B0764] dark:text-white leading-snug">
                Instant PDF Certificate & Feedback
              </span>
            </div>
          </div>
        </div>
      ) : (
        /* ===================================================================
            VIEW B: BACKEND MULTI-TEAM PIPELINE (Anushka's Proposed System)
           =================================================================== */
        <div className="overflow-x-auto pb-2">
          <div className="min-w-[940px] space-y-6">
            <div className="grid grid-cols-12 gap-4 items-center">
              {/* Col 1-3: 9 Organizing Teams */}
              <div className="col-span-3 space-y-2">
                <span className="text-[13px] font-subheading font-semibold text-stone-500 dark:text-stone-400 block mb-2">
                  9 Organising Sub-Teams
                </span>
                {[
                  ['Core Team', 'Overall control'],
                  ['Registration Team', 'Participant data'],
                  ['Program Team', 'Schedule & sessions'],
                  ['Venue & Logistics', 'Halls & transport'],
                  ['Guest Team', 'Speakers & hosts'],
                  ['Social Media Team', 'Announcements'],
                  ['Technical Team', 'AV & portal'],
                  ['Hospitality', 'Food & stay'],
                  ['Admin', 'Attendance & certs']
                ].map(([team, scope]) => (
                  <div
                    key={team}
                    className="px-3.5 py-2 rounded-xl bg-white dark:bg-stone-900 border border-stone-200/90 dark:border-stone-800 flex items-center justify-between shadow-2xs"
                  >
                    <span className="text-[13px] font-subheading font-semibold text-charcoal dark:text-white">
                      {team}
                    </span>
                    <span className="text-[13px] font-body text-stone-500 dark:text-stone-400">
                      {scope}
                    </span>
                  </div>
                ))}
              </div>

              {/* Manifold Connector 1 */}
              <div className="col-span-1 flex flex-col items-center justify-center text-center">
                <svg viewBox="0 0 80 380" className="w-full h-[360px]" fill="none">
                  {[24, 66, 108, 150, 190, 230, 272, 314, 356].map((y) => (
                    <path
                      key={y}
                      d={`M 2 ${y} C 42 ${y}, 36 190, 74 190`}
                      stroke="#D4C5BC"
                      strokeWidth="1.4"
                    />
                  ))}
                  <path d="M 70 185 L 78 190 L 70 195 Z" fill="#FF3366" />
                </svg>
                <span className="text-[13px] font-body text-stone-500 leading-tight">
                  Scoped updates
                </span>
              </div>

              {/* Col 5-7: Central Event Database */}
              <div className="col-span-4 rounded-2xl border-[1.5px] border-dashed border-lavender/60 bg-[#FAF8FF] dark:bg-stone-900 p-4 space-y-2.5">
                <div className="flex items-center justify-between pb-1">
                  <span className="text-[13px] font-subheading font-bold text-lavender">
                    Central Event Database
                  </span>
                  <span className="text-[13px] font-body text-stone-500">Single source of truth</span>
                </div>
                <div className="grid grid-cols-1 gap-2">
                  {[
                    'Event Details & Theme',
                    'Program & Live Schedule',
                    'Speaker Bios & Topics',
                    'Logistics, Halls & Gates',
                    'Verified Registration Data',
                    'Live Announcements & Diffs',
                    'QR Attendance Logs',
                    'Automated Certificate Engine',
                    'Timestamped Audit History'
                  ].map((mod) => (
                    <div
                      key={mod}
                      className="px-3 py-2 rounded-xl bg-white dark:bg-stone-800 border border-lavender/25 dark:border-stone-700 text-[13px] font-subheading text-charcoal dark:text-stone-200 text-center shadow-2xs"
                    >
                      {mod}
                    </div>
                  ))}
                </div>
              </div>

              {/* Connector 2 */}
              <div className="col-span-1 flex flex-col items-center justify-center text-center">
                <svg viewBox="0 0 80 220" className="w-full h-[200px]" fill="none">
                  <path d="M 2 110 C 38 110, 40 40, 74 40" stroke="#FF3366" strokeWidth="1.5" />
                  <path d="M 2 110 L 74 110" stroke="#FF3366" strokeWidth="1.5" />
                  <path d="M 2 110 C 38 110, 40 180, 74 180" stroke="#FF3366" strokeWidth="1.5" />
                  <path d="M69 36L77 40L69 44Z M69 106L77 110L69 114Z M69 176L77 180L69 184Z" fill="#FF3366" />
                </svg>
                <span className="text-[13px] font-body text-coral font-medium leading-tight">
                  &lt; 5 min sync
                </span>
              </div>

              {/* Col 9-12: Personal Attendee Cards + Notification Loop */}
              <div className="col-span-3 space-y-4">
                <div className="rounded-2xl border-[1.5px] border-dashed border-[#E5B89B] dark:border-stone-700 bg-[#FAF8F6] dark:bg-stone-900 p-4 space-y-2.5">
                  <span className="text-[13px] font-subheading font-bold text-[#C2410C] dark:text-coral block">
                    Personal Attendee Cards
                  </span>
                  {['Tanya · DES-1047', 'Rohan · DES-1048', 'Meera · DES-1049'].map((person) => (
                    <div
                      key={person}
                      className="p-3 rounded-xl bg-white dark:bg-stone-800 border border-stone-200 dark:border-stone-700 flex items-center justify-between"
                    >
                      <div>
                        <span className="text-[13px] font-subheading font-semibold text-charcoal dark:text-white block">
                          {person}
                        </span>
                        <span className="text-[13px] font-body text-stone-500">
                          Permanent web link
                        </span>
                      </div>
                      <QrCode size={18} className="text-coral shrink-0" />
                    </div>
                  ))}
                </div>

                <div className="rounded-2xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 p-4 space-y-2.5">
                  <span className="text-[13px] font-subheading font-semibold text-charcoal dark:text-white block">
                    Notification Dispatch Loop
                  </span>
                  <div className="grid grid-cols-3 gap-2 text-center">
                    {['SMS', 'WhatsApp', 'Email'].map((ch) => (
                      <div
                        key={ch}
                        className="py-2 px-2 rounded-lg bg-[#F7F5F2] dark:bg-stone-800 text-[13px] font-subheading font-medium text-charcoal dark:text-stone-200"
                      >
                        {ch}
                      </div>
                    ))}
                  </div>
                  <p className="text-[13px] font-body text-stone-500 dark:text-stone-400 leading-snug">
                    Sends alert with the exact same personal card link whenever critical logistics change.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

/* ============================================================================
   6. ANNOTATED HIGH-FIDELITY EVENT JOURNEY CARD + INTERACTIVE PROTOTYPE
   Modeled on knoor.framer.website/classroom-orange "Built for one glance"
   numbered 1-5 pin annotations + interactive state switcher
   ============================================================================ */

export const AnnotatedEventJourneyCard: React.FC<DiagramZoomProps> = ({ onZoomSlide }) => {
  const [activePin, setActivePin] = useState<number>(4);
  const [lifecycleMode, setLifecycleMode] = useState<'pre' | 'live' | 'post'>('live');

  const callouts = [
    {
      num: 1,
      title: 'Personal identity, immediately assured',
      desc: 'Greets the attendee by name ("Hi Tanya · You are registered") so students never wonder if their Google Form went through.'
    },
    {
      num: 2,
      title: 'Core details & QR pass in one block',
      desc: 'Date, time, hall location, and scannable Event Entry Pass QR sit above the fold for 2-second turnstile entry.'
    },
    {
      num: 3,
      title: 'Six journey modules, one tap away',
      desc: 'Schedule, Speakers, Guidelines, What to bring, Updates, and More stay cleanly organized without cluttering the pass.'
    },
    {
      num: 4,
      title: 'Explicit Old vs. New diff cards',
      desc: 'When dates or halls change, high-contrast burgundy/coral cards show both Old and New values so rumors cannot spread.'
    },
    {
      num: 5,
      title: 'Post-event proof & human support',
      desc: 'After check-in, the exact same URL unlocks a verified PDF certificate alongside direct organizer email and phone support.'
    }
  ];

  const handleSelectPin = (num: number) => {
    setActivePin(num);
    if (num === 3) setLifecycleMode('pre');
    if (num === 4) setLifecycleMode('live');
    if (num === 5) setLifecycleMode('post');
  };

  return (
    <div className="rounded-3xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 p-5 sm:p-8 lg:p-10 space-y-8">
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-stone-100 dark:border-stone-800 pb-5">
        <div>
          <h4 className="text-xl sm:text-2xl font-heading text-charcoal dark:text-white">
            The Event Journey Card, built for one glance
          </h4>
          <p className="text-[13px] font-subheading text-stone-500 dark:text-stone-400 mt-0.5">
            Click numbered pins (1–5) or switch lifecycle states to inspect how the card adapts
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <div className="inline-flex p-1 rounded-xl bg-stone-100 dark:bg-stone-800">
            {[
              { id: 'pre', label: 'Before Event' },
              { id: 'live', label: 'Event Day' },
              { id: 'post', label: 'Post-Event' }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setLifecycleMode(tab.id as 'pre' | 'live' | 'post')}
                className={`px-3 py-1.5 rounded-lg text-[13px] font-subheading font-medium transition-colors cursor-pointer whitespace-nowrap shrink-0 ${
                  lifecycleMode === tab.id
                    ? 'bg-charcoal text-white dark:bg-white dark:text-charcoal shadow-2xs'
                    : 'text-stone-600 dark:text-stone-400 hover:text-charcoal dark:hover:text-white'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {onZoomSlide && (
            <button
              onClick={() => onZoomSlide('/assets/projects/systems-design/journey_card_06.png')}
              className="px-3 py-2 rounded-xl bg-stone-100 dark:bg-stone-800 text-[13px] font-subheading text-charcoal dark:text-stone-200 hover:bg-coral hover:text-white transition-colors flex items-center gap-1.5 cursor-pointer whitespace-nowrap shrink-0"
            >
              <ZoomIn size={13} />
              <span>Original UI Spec</span>
            </button>
          )}
        </div>
      </div>

      {/* Split Layout: Annotated Mobile Card Mockup (Left) + 5 Callout Explanations (Right) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
        {/* Authentic Recreated Design Summit 2026 Card (Matching journey_card_06.png) */}
        <div className="lg:col-span-6 flex justify-center">
          <div className="relative w-full max-w-[390px] rounded-[28px] bg-[#D6BACB] text-[#2A1221] p-5 shadow-xl border border-[#C5A3B8] space-y-4">
            {/* Pin 1: Header */}
            <div
              onClick={() => handleSelectPin(1)}
              className={`relative rounded-2xl p-2 -m-2 transition-all cursor-pointer ${
                activePin === 1 ? 'ring-2 ring-[#6D0F38] bg-white/25' : ''
              }`}
            >
              <span className="absolute -left-3 -top-2 w-6 h-6 rounded-full bg-[#6D0F38] text-white text-xs font-bold flex items-center justify-center shadow-md tabular-nums">
                1
              </span>
              <div className="flex items-start justify-between gap-2 pt-1">
                <div className="flex items-center gap-2">
                  <span className="text-2xl font-serif font-bold tracking-tight text-[#6D0F38]">
                    DS
                  </span>
                  <span className="text-[12px] leading-tight text-[#4A253B] border-l border-[#9E7B91] pl-2">
                    Design
                    <br />
                    Summit 2026
                  </span>
                </div>
                <div className="text-right">
                  <h5 className="text-xl font-serif text-[#230E1B] leading-tight">Hi Tanya</h5>
                  <span className="text-[13px] text-[#4A253B]">
                    {lifecycleMode === 'post' ? 'Attendance verified' : 'You are registered'}
                  </span>
                </div>
              </div>
            </div>

            {/* Event Intro Note */}
            <div className="rounded-2xl bg-[#F6EDF2] p-3.5 text-[13px] text-[#3B1E30] leading-snug">
              Design Summit 2026 brings students, designers, and educators together to exchange ideas and build creative futures.
            </div>

            {/* Pin 2: Core Details + QR Pass */}
            <div
              onClick={() => handleSelectPin(2)}
              className={`relative rounded-2xl bg-[#F6EDF2] p-3.5 transition-all cursor-pointer ${
                activePin === 2 ? 'ring-2 ring-[#6D0F38]' : ''
              }`}
            >
              <span className="absolute -left-3 -top-2 w-6 h-6 rounded-full bg-[#6D0F38] text-white text-xs font-bold flex items-center justify-center shadow-md tabular-nums">
                2
              </span>
              <div className="grid grid-cols-12 gap-3 items-center">
                <div className="col-span-7 space-y-2.5 border-r border-[#DEC9D6] pr-2 text-[13px]">
                  <div className="flex items-start gap-2">
                    <Calendar size={14} className="text-[#6D0F38] mt-0.5 shrink-0" />
                    <div>
                      <span className="font-semibold block leading-tight">25 September 2026</span>
                      <span className="text-[#6E4F63] text-[12px]">Thursday</span>
                    </div>
                  </div>
                  <div className="flex items-start gap-2">
                    <Clock size={14} className="text-[#6D0F38] mt-0.5 shrink-0" />
                    <div>
                      <span className="font-semibold block leading-tight">10:00 AM – 4:00 PM</span>
                      <span className="text-[#6E4F63] text-[12px]">IST</span>
                    </div>
                  </div>
                  <div className="flex items-start gap-2">
                    <MapPin size={14} className="text-[#6D0F38] mt-0.5 shrink-0" />
                    <div>
                      <span className="font-semibold block leading-tight">
                        {lifecycleMode === 'pre' ? 'G Block AV Room' : 'D Block Auditorium'}
                      </span>
                      <span className="text-[#6E4F63] text-[12px]">KU, Gandhinagar</span>
                    </div>
                  </div>
                </div>

                <div className="col-span-5 flex flex-col items-center text-center space-y-1">
                  <div className="p-2 bg-white rounded-xl border border-[#E2CFD9]">
                    <QrCode size={52} className="text-[#1F0D18]" />
                  </div>
                  <span className="text-[12px] font-mono text-[#4A253B] tabular-nums">DS26-1047</span>
                  <span className="px-2.5 py-0.5 rounded-full bg-[#6D0F38] text-white text-[11px] font-medium">
                    Event Entry Pass
                  </span>
                </div>
              </div>
            </div>

            {/* Pin 3: 6 Action Tiles */}
            <div
              onClick={() => handleSelectPin(3)}
              className={`relative rounded-2xl transition-all cursor-pointer ${
                activePin === 3 ? 'ring-2 ring-[#6D0F38] p-1.5 -m-1.5' : ''
              }`}
            >
              <span className="absolute -left-3 -top-2 w-6 h-6 rounded-full bg-[#6D0F38] text-white text-xs font-bold flex items-center justify-center shadow-md z-10 tabular-nums">
                3
              </span>
              <div className="grid grid-cols-3 gap-2 text-center text-[13px]">
                {[
                  { label: 'Schedule', active: lifecycleMode === 'pre' },
                  { label: 'Speakers', active: false },
                  { label: 'Guidelines', active: false },
                  { label: 'What to bring', active: false },
                  { label: 'Updates', active: lifecycleMode === 'live' },
                  { label: 'Certificate', active: lifecycleMode === 'post' }
                ].map((tile) => (
                  <div
                    key={tile.label}
                    className={`py-2.5 px-2 rounded-xl font-subheading font-medium transition-colors ${
                      tile.active
                        ? 'bg-[#6D0F38] text-white shadow-xs'
                        : 'bg-[#F6EDF2] text-[#3B1E30]'
                    }`}
                  >
                    {tile.label}
                  </div>
                ))}
              </div>
            </div>

            {/* Pin 4 / Pin 5 Dynamic Section */}
            {lifecycleMode !== 'post' ? (
              <div
                onClick={() => handleSelectPin(4)}
                className={`relative rounded-2xl bg-[#F6EDF2] p-3.5 space-y-2.5 transition-all cursor-pointer ${
                  activePin === 4 ? 'ring-2 ring-[#6D0F38]' : ''
                }`}
              >
                <span className="absolute -left-3 -top-2 w-6 h-6 rounded-full bg-[#6D0F38] text-white text-xs font-bold flex items-center justify-center shadow-md tabular-nums">
                  4
                </span>
                <div className="flex items-center justify-between">
                  <span className="text-[13px] font-subheading font-bold text-[#2A1221]">
                    {lifecycleMode === 'live' ? 'Latest Updates (Live)' : 'Pre-Event Checklist'}
                  </span>
                  <span className="text-[12px] text-[#6D0F38] font-medium">Updated 3m ago</span>
                </div>

                {lifecycleMode === 'live' ? (
                  <div className="grid grid-cols-2 gap-2">
                    <div className="rounded-xl bg-[#6D0F38] text-white p-2.5 space-y-0.5">
                      <span className="text-[13px] font-semibold block">Date Change</span>
                      <span className="text-[12px] text-white/80 block">Old: 15 Sept 2026</span>
                      <span className="text-[12px] font-medium block">New: 25 Sept 2026</span>
                    </div>
                    <div className="rounded-xl bg-[#6D0F38] text-white p-2.5 space-y-0.5">
                      <span className="text-[13px] font-semibold block">Venue Change</span>
                      <span className="text-[12px] text-white/80 block">Old: G Block AV</span>
                      <span className="text-[12px] font-medium block">New: D Block Aud</span>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-1.5 text-[13px] text-[#3B1E30]">
                    <p>· Carry University ID card for Gate 2 verification</p>
                    <p>· Bring laptop + charger for afternoon studio sprint</p>
                  </div>
                )}
              </div>
            ) : (
              <div
                onClick={() => handleSelectPin(5)}
                className={`relative rounded-2xl bg-[#6D0F38] text-white p-4 space-y-2.5 transition-all cursor-pointer ${
                  activePin === 5 ? 'ring-2 ring-white' : ''
                }`}
              >
                <span className="absolute -left-3 -top-2 w-6 h-6 rounded-full bg-charcoal text-white text-xs font-bold flex items-center justify-center shadow-md tabular-nums">
                  5
                </span>
                <div className="flex items-center justify-between">
                  <span className="text-[13px] font-semibold">Attendance Verified · 10:04 AM</span>
                  <CheckCircle2 size={16} />
                </div>
                <p className="text-[13px] text-white/85">
                  Your participation certificate for Design Summit 2026 is ready to download.
                </p>
                <div className="py-2 px-3 rounded-xl bg-white text-[#6D0F38] text-[13px] font-subheading font-semibold flex items-center justify-center gap-1.5">
                  <FileText size={14} />
                  <span>Download Official PDF Certificate</span>
                </div>
              </div>
            )}

            {/* Pin 5: Footer Help */}
            <div
              onClick={() => handleSelectPin(5)}
              className={`relative rounded-2xl bg-[#F6EDF2] p-3 text-[13px] text-[#3B1E30] space-y-1 transition-all cursor-pointer ${
                activePin === 5 && lifecycleMode !== 'post' ? 'ring-2 ring-[#6D0F38]' : ''
              }`}
            >
              {lifecycleMode !== 'post' && (
                <span className="absolute -left-3 -top-2 w-6 h-6 rounded-full bg-[#6D0F38] text-white text-xs font-bold flex items-center justify-center shadow-md tabular-nums">
                  5
                </span>
              )}
              <span className="font-semibold block">Need Help?</span>
              <div className="flex flex-wrap items-center justify-between gap-2 text-[12px] text-[#5B374D]">
                <span className="inline-flex items-center gap-1">
                  <Mail size={12} /> support@ds26.in
                </span>
                <span className="inline-flex items-center gap-1 tabular-nums">
                  <Phone size={12} /> +91 98765 43210
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: 1-5 Numbered Breakdown Cards (Classroom-Orange Anatomy Pattern) */}
        <div className="lg:col-span-6 space-y-3">
          {callouts.map((item) => {
            const active = activePin === item.num;
            return (
              <button
                key={item.num}
                onClick={() => handleSelectPin(item.num)}
                className={`w-full text-left p-4 sm:p-5 rounded-2xl border transition-all cursor-pointer flex items-start gap-4 ${
                  active
                    ? 'bg-[#F7F5F2] dark:bg-stone-800 border-coral shadow-xs'
                    : 'bg-white dark:bg-stone-900 border-stone-200/80 dark:border-stone-800 hover:border-stone-300 dark:hover:border-stone-700'
                }`}
              >
                <span
                  className={`w-7 h-7 rounded-full text-xs font-bold flex items-center justify-center shrink-0 mt-0.5 tabular-nums ${
                    active
                      ? 'bg-coral text-white'
                      : 'bg-stone-100 dark:bg-stone-800 text-charcoal dark:text-stone-300'
                  }`}
                >
                  {item.num}
                </span>
                <div className="space-y-1">
                  <h5 className="text-base font-heading text-charcoal dark:text-white">
                    {item.title}
                  </h5>
                  <p className="text-[13px] font-body text-stone-600 dark:text-stone-400 leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};
