import React, { useState } from 'react';
import { Project } from '../types';
import {
  ZoomIn,
  ArrowRight,
  CheckCircle2,
  QrCode,
  Bell,
  FileText,
  Compass,
  HelpCircle,
  ShieldCheck
} from 'lucide-react';
import { RevealOnScroll } from './RevealOnScroll';
import {
  StakeholderEcosystemMap,
  OpportunityLandscapeChart,
  OldSystemJourneyMap,
  LivingCardLoopDiagram,
  SystemArchitectureFlowchart,
  AnnotatedEventJourneyCard
} from './SystemsDesignDiagrams';

interface SystemsDesignProps {
  project: Project;
  setViewingImage: (url: string) => void;
  onNavigateProject?: (projectId: string) => void;
}

export const SystemsDesignCaseStudy: React.FC<SystemsDesignProps> = ({
  project,
  setViewingImage
}) => {
  const [compareTab, setCompareTab] = useState<'both' | 'old' | 'new'>('both');

  const npsMentions = [
    { label: 'Missed sudden venue or timing shift', pct: 84 },
    { label: 'Silence right after submitting Google Form', pct: 76 },
    { label: 'Conflicting details across WhatsApp groups', pct: 68 },
    { label: 'Rushed posters from 72h approval delays', pct: 61 },
    { label: 'Chasing organizers weeks later for certificates', pct: 54 }
  ];

  const frustrationScores = [
    { label: 'Knowing if registration actually succeeded', score: 8.8 },
    { label: 'Catching last-minute hall relocations', score: 8.6 },
    { label: 'Receiving participation certificates on time', score: 8.2 },
    { label: 'Waiting on administrative room sanctions', score: 7.9 },
    { label: 'Manual spreadsheet check-in queues', score: 7.2 },
    { label: 'Reaching the right coordinator for help', score: 6.8 }
  ];

  const problemThemes = [
    {
      num: '01',
      title: 'Dependency on specific people',
      desc: 'Planning runs on personal relationships and mental notes rather than written workflows. When one faculty mentor or core student lead is unreachable, every sub-team stalls.'
    },
    {
      num: '02',
      title: 'Important details get scrambled',
      desc: 'Updates pass through four human layers—from core leads to sub-teams, class reps, and students—losing accuracy like a game of telephone across noisy WhatsApp forwards.'
    },
    {
      num: '03',
      title: 'Delayed decisions, rushed announcements',
      desc: 'Promotion cannot begin until room bookings and budgets are physically stamped by administration, compressing awareness windows to bare-minimum teasers.'
    },
    {
      num: '04',
      title: 'Communication drops off after registration',
      desc: 'The moment a student submits a Google Form, communication goes dark—no entry pass, no live schedule link, and weeks of chasing organizers for certificates.'
    }
  ];

  const archetypes = [
    {
      name: 'The first-year explorer',
      desc: 'New to campus blocks and symposiums. Needs clear hall directions, dress/laptop rules, and reassurance that their sign-up worked.'
    },
    {
      name: 'The visiting delegate',
      desc: 'Travels from another college without internal WhatsApp groups or campus Wi-Fi. Needs one link that works immediately in any mobile browser.'
    },
    {
      name: 'The stretched coordinator',
      desc: 'Juggles lectures while running a volunteer sub-team. Needs to update a room or speaker once without answering 100 repetitive calls.'
    },
    {
      name: 'The proof-seeker',
      desc: 'Attends workshops to build academic credits and portfolios. Needs verified attendance and an instant, shareable PDF certificate.'
    }
  ];

  const survivalScenarios = [
    'Auditorium relocated 30 minutes before the opening keynote',
    'Multi-track symposium spanning three campus blocks simultaneously',
    'External student arriving at the gate with slow mobile data and no app',
    'Registration opened before final seminar hall sanction is stamped',
    'Mid-week volunteer handover between student sub-team leads',
    'Post-event certificate verification for 300+ checked-in attendees'
  ];

  const singleJobCards = [
    {
      question: 'Did my registration go through?',
      answer: 'Personal greeting + verified status header ("Hi Tanya · You are registered") appears the second the link opens.',
      metric: 'Status · UID #DS26-1047',
      icon: CheckCircle2
    },
    {
      question: 'How do I get past the auditorium gate?',
      answer: 'High-contrast QR Event Entry Pass sits above the fold for a 2-second volunteer scan instead of paper lists.',
      metric: '< 2 sec gate check-in',
      icon: QrCode
    },
    {
      question: 'Wait, did the venue or date change?',
      answer: 'Dedicated Latest Updates diff cards explicitly pair Old vs. New halls and timings so rumors never take over.',
      metric: 'Old → New diff clarity',
      icon: Bell
    },
    {
      question: 'What do I need to carry tomorrow?',
      answer: 'Before-event checklist spells out ID cards, laptop prerequisites, and gate instructions in plain language.',
      metric: 'Pre-event readiness',
      icon: Compass
    },
    {
      question: 'Where is my participation certificate?',
      answer: 'Gate QR scan automatically locks verified attendance and unlocks a 1-tap PDF certificate on the same link.',
      metric: 'Zero manual chasing',
      icon: FileText
    },
    {
      question: 'Who do I contact if I am stuck?',
      answer: 'Named support email and helpline sit quietly at the foot of the card, one tap away when edge cases arise.',
      metric: 'Direct escalation path',
      icon: HelpCircle
    }
  ];

  const archivalSlides = [
    { title: 'Project Identity', src: '/assets/projects/systems-design/journey_card_01.png' },
    { title: 'Stakeholder Map', src: '/assets/projects/systems-design/systems_slide_14.png' },
    { title: 'Ecosystem Map', src: '/assets/projects/systems-design/systems_slide_15.png' },
    { title: '7-Phase Flow Map', src: '/assets/projects/systems-design/systems_slide_16.png' },
    { title: 'Information Flow', src: '/assets/projects/systems-design/systems_slide_17.png' },
    { title: 'Information Architecture', src: '/assets/projects/systems-design/systems_slide_18.png' },
    { title: 'Internal Team Map', src: '/assets/projects/systems-design/systems_slide_20.png' },
    { title: 'Dependency Map', src: '/assets/projects/systems-design/systems_slide_21.png' },
    { title: 'Updated Journey Flow', src: '/assets/projects/systems-design/journey_card_05.png' },
    { title: 'Card UI Architecture', src: '/assets/projects/systems-design/journey_card_06.png' },
    { title: 'Proposed System', src: '/assets/projects/systems-design/journey_card_07.png' },
    { title: 'Resolution Matrix', src: '/assets/projects/systems-design/journey_card_08.png' }
  ];

  return (
    <article className="max-w-6xl mx-auto space-y-20 sm:space-y-28 pb-16 selection:bg-coral selection:text-white">
      {/* =================================================================== */}
      {/* 01. EDITORIAL HERO & METADATA STRIP                                 */}
      {/* =================================================================== */}
      <RevealOnScroll direction="up">
        <header className="space-y-8 pt-2">
          <div className="max-w-4xl space-y-4">
            <div className="flex flex-wrap items-center gap-2.5 text-[13px] font-subheading text-stone-500 dark:text-stone-400">
              <span className="text-coral font-semibold">Systems & Service Design</span>
              <span aria-hidden="true">·</span>
              <span>Academic Event Operations</span>
              <span aria-hidden="true">·</span>
              <span>{project.date}</span>
            </div>

            <h1 className="text-3xl sm:text-5xl md:text-[56px] font-heading font-normal text-charcoal dark:text-white leading-[1.08] tracking-tight text-balance">
              The decisions behind fixing communication across campus academic events
            </h1>

            <p className="text-base sm:text-lg font-body text-stone-600 dark:text-stone-300 leading-relaxed max-w-3xl">
              Campus symposiums, workshops, and guest lectures look effortless on stage, yet rely on fragile backstage relays across administration, faculty, nine student sub-teams, and hundreds of attendees. I mapped where critical updates broke down and designed the{' '}
              <strong className="text-charcoal dark:text-white font-semibold">
                Event Journey Card
              </strong>
              —one permanent, app-free web link that keeps every attendee aligned from sign-up to certificate download.
            </p>
          </div>

          {/* Clean 4-Column Metadata Row (Unboxed, Hairline Grid) */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 py-5 border-y border-stone-200 dark:border-stone-800">
            <div>
              <h2 className="text-[13px] font-subheading text-stone-400 dark:text-stone-500">
                Role
              </h2>
              <p className="text-sm sm:text-base font-subheading font-semibold text-charcoal dark:text-white mt-0.5">
                Systems & UX Designer
              </p>
            </div>
            <div>
              <h2 className="text-[13px] font-subheading text-stone-400 dark:text-stone-500">
                Research Scope
              </h2>
              <p className="text-sm sm:text-base font-subheading font-semibold text-charcoal dark:text-white mt-0.5 tabular-nums">
                47 Interviews · 3 Events
              </p>
            </div>
            <div>
              <h2 className="text-[13px] font-subheading text-stone-400 dark:text-stone-500">
                System Span
              </h2>
              <p className="text-sm sm:text-base font-subheading font-semibold text-charcoal dark:text-white mt-0.5 tabular-nums">
                Admin, Faculty & 9 Teams
              </p>
            </div>
            <div>
              <h2 className="text-[13px] font-subheading text-stone-400 dark:text-stone-500">
                Platform
              </h2>
              <p className="text-sm sm:text-base font-subheading font-semibold text-charcoal dark:text-white mt-0.5">
                Mobile Web Card & DB
              </p>
            </div>
          </div>

          {/* Hero Showcase Frame */}
          <div
            onClick={() => setViewingImage('/assets/projects/systems-design/journey_card_01.png')}
            className="group relative rounded-3xl overflow-hidden bg-[#F7F5F2] dark:bg-stone-900 border border-stone-200 dark:border-stone-800 p-3 sm:p-6 cursor-zoom-in shadow-sm"
          >
            <div className="aspect-[16/9] sm:aspect-[21/9] rounded-2xl overflow-hidden bg-white dark:bg-stone-950 flex items-center justify-center">
              <img
                src="/assets/projects/systems-design/journey_card_01.png"
                alt="Event Journey Card systems design cover presentation"
                referrerPolicy="no-referrer"
                className="w-full h-full object-contain transition-transform duration-300 group-hover:scale-[1.015]"
              />
            </div>
            <div className="mt-3 px-1 flex items-center justify-between text-[13px] font-subheading text-stone-500 dark:text-stone-400">
              <span>Event Journey Card · Systems & Service Architecture Case Study</span>
              <span className="inline-flex items-center gap-1.5 text-charcoal dark:text-stone-200 font-medium group-hover:text-coral transition-colors">
                <ZoomIn size={14} /> Click to inspect full resolution
              </span>
            </div>
          </div>
        </header>
      </RevealOnScroll>

      {/* =================================================================== */}
      {/* 02. THE PROBLEM: FOUR RECURRING SYSTEM BREAKDOWNS                   */}
      {/* =================================================================== */}
      <RevealOnScroll direction="up">
        <section className="space-y-10">
          <div className="max-w-3xl space-y-3">
            <p className="text-[13px] font-subheading font-semibold text-coral">The problem</p>
            <h2 className="text-2xl sm:text-4xl font-heading font-normal text-charcoal dark:text-white tracking-tight text-balance">
              Teams worked around the clock, yet critical details kept disappearing
            </h2>
            <p className="text-base font-body text-stone-600 dark:text-stone-300 leading-relaxed">
              Campus events did not fail from lack of effort. They failed because event information lived across individual heads, disconnected chat threads, and static posters{' '}
              <span className="text-charcoal dark:text-white font-medium">
                without a single system for ownership, updating, and distribution
              </span>
              . Auditing 120+ communication logs surfaced four structural failure patterns:
            </p>
          </div>

          {/* 4 Numbered Problem Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {problemThemes.map((item) => (
              <div
                key={item.num}
                className="p-6 sm:p-7 rounded-3xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 space-y-3"
              >
                <span className="text-sm font-mono font-semibold text-coral block tabular-nums">
                  {item.num}
                </span>
                <h3 className="text-xl font-heading font-normal text-charcoal dark:text-white">
                  {item.title}
                </h3>
                <p className="text-sm font-body text-stone-600 dark:text-stone-400 leading-relaxed">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </section>
      </RevealOnScroll>

      {/* =================================================================== */}
      {/* 03. WHAT THE DATA TOLD US (QUANTITATIVE BENTO GRID)                 */}
      {/* =================================================================== */}
      <RevealOnScroll direction="up">
        <section className="space-y-8">
          <div className="max-w-3xl space-y-2.5">
            <p className="text-[13px] font-subheading font-semibold text-coral">
              What the data told us
            </p>
            <h2 className="text-2xl sm:text-4xl font-heading font-normal text-charcoal dark:text-white tracking-tight text-balance">
              Measuring where information dropped across 47 interviews
            </h2>
            <p className="text-base font-body text-stone-600 dark:text-stone-300 leading-relaxed">
              Qualitative interviews explained why teams felt stretched. Tracing 120+ message logs and attendee survey responses showed how big each breakdown really was.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-stretch">
            {/* Chart 1: % of Interview Mentions */}
            <div className="lg:col-span-5 p-6 rounded-3xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 flex flex-col justify-between space-y-6">
              <div>
                <h3 className="text-lg font-heading text-charcoal dark:text-white">
                  Where did attendees get stuck?
                </h3>
                <p className="text-[13px] font-subheading text-stone-500">
                  % of surveyed attendees & volunteers reporting issue
                </p>
              </div>

              <div className="space-y-4">
                {npsMentions.map((row) => (
                  <div key={row.label} className="space-y-1.5">
                    <div className="flex items-baseline justify-between gap-2 text-[13px]">
                      <span className="font-body text-charcoal dark:text-stone-200">
                        {row.label}
                      </span>
                      <span className="font-mono font-semibold text-coral tabular-nums">
                        {row.pct}%
                      </span>
                    </div>
                    <div className="h-2 w-full rounded-full bg-stone-100 dark:bg-stone-800 overflow-hidden">
                      <div
                        className="h-full rounded-full bg-coral"
                        style={{ width: `${row.pct}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Chart 2: Channel Fragmentation Ring */}
            <div className="lg:col-span-3 p-6 rounded-3xl bg-[#F7F5F2] dark:bg-stone-900 border border-stone-200 dark:border-stone-800 flex flex-col justify-between space-y-5">
              <div>
                <h3 className="text-lg font-heading text-charcoal dark:text-white">
                  Where updates lived
                </h3>
                <p className="text-[13px] font-subheading text-stone-500">
                  Share of 120+ traced logs
                </p>
              </div>

              <div className="flex justify-center py-1">
                <svg width="156" height="156" viewBox="0 0 160 160">
                  <circle cx="80" cy="80" r="58" fill="none" stroke="#E7E2DC" strokeWidth="18" />
                  {/* 42% WhatsApp */}
                  <circle
                    cx="80"
                    cy="80"
                    r="58"
                    fill="none"
                    stroke="#FF3366"
                    strokeWidth="18"
                    strokeDasharray="153 365"
                    transform="rotate(-90 80 80)"
                  />
                  {/* 24% Static Posters */}
                  <circle
                    cx="80"
                    cy="80"
                    r="58"
                    fill="none"
                    stroke="#8B7CFF"
                    strokeWidth="18"
                    strokeDasharray="87 365"
                    strokeDashoffset="-156"
                    transform="rotate(-90 80 80)"
                  />
                  {/* 19% Verbal */}
                  <circle
                    cx="80"
                    cy="80"
                    r="58"
                    fill="none"
                    stroke="#F59E0B"
                    strokeWidth="18"
                    strokeDasharray="69 365"
                    strokeDashoffset="-246"
                    transform="rotate(-90 80 80)"
                  />
                  <text
                    x="80"
                    y="76"
                    textAnchor="middle"
                    className="fill-charcoal dark:fill-white text-xl font-bold"
                    fontFamily="var(--font-main-heading)"
                  >
                    42%
                  </text>
                  <text
                    x="80"
                    y="95"
                    textAnchor="middle"
                    className="fill-stone-500 text-[11px]"
                    fontFamily="var(--font-sub-heading)"
                  >
                    Chat forwards
                  </text>
                </svg>
              </div>

              <div className="space-y-1.5 text-[13px] font-subheading tabular-nums">
                <div className="flex justify-between">
                  <span className="text-stone-600 dark:text-stone-300">WhatsApp forwards</span>
                  <span className="font-semibold text-coral">42%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-stone-600 dark:text-stone-300">Static posters</span>
                  <span className="font-semibold text-lavender">24%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-stone-600 dark:text-stone-300">Verbal / class reps</span>
                  <span className="font-semibold text-amber-600">19%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-stone-600 dark:text-stone-300">One-way forms</span>
                  <span className="font-semibold text-stone-500">15%</span>
                </div>
              </div>
            </div>

            {/* Chart 3: Frustration Severity 0 to 10 */}
            <div className="lg:col-span-4 p-6 rounded-3xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 flex flex-col justify-between space-y-5">
              <div>
                <h3 className="text-lg font-heading text-charcoal dark:text-white">
                  Biggest pain severity
                </h3>
                <p className="text-[13px] font-subheading text-stone-500">
                  Rated 0 to 10 by students & leads
                </p>
              </div>

              <div className="space-y-3.5">
                {frustrationScores.map((item) => (
                  <div key={item.label} className="space-y-1">
                    <div className="flex items-baseline justify-between gap-2 text-[13px]">
                      <span className="font-body text-stone-700 dark:text-stone-300 truncate">
                        {item.label}
                      </span>
                      <span className="font-mono font-semibold text-charcoal dark:text-white tabular-nums shrink-0">
                        {item.score.toFixed(1)}
                      </span>
                    </div>
                    <div className="h-1.5 w-full rounded-full bg-stone-100 dark:bg-stone-800 overflow-hidden">
                      <div
                        className="h-full rounded-full bg-lavender"
                        style={{ width: `${item.score * 10}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      </RevealOnScroll>

      {/* =================================================================== */}
      {/* 04. WHERE THE OPPORTUNITY WAS (OPPORTUNITY LANDSCAPE MATRIX)        */}
      {/* =================================================================== */}
      <RevealOnScroll direction="up">
        <section className="space-y-6">
          <div className="max-w-3xl space-y-2.5">
            <p className="text-[13px] font-subheading font-semibold text-coral">
              Where the opportunity was
            </p>
            <h2 className="text-2xl sm:text-4xl font-heading font-normal text-charcoal dark:text-white tracking-tight text-balance">
              Pinpointing high-importance, poorly served moments
            </h2>
            <p className="text-base font-body text-stone-600 dark:text-stone-300 leading-relaxed">
              Plotting every attendee need by importance versus current satisfaction made the priority unmistakable: sign-up and posters worked fine, while post-registration confirmation, live room changes, and certificates sat severely underserved.
            </p>
          </div>

          <OpportunityLandscapeChart />
        </section>
      </RevealOnScroll>

      {/* =================================================================== */}
      {/* 05. ECOSYSTEM CARTOGRAPHY, ARCHETYPES & STRESS-TEST SCENARIOS       */}
      {/* =================================================================== */}
      <RevealOnScroll direction="up">
        <section className="space-y-10">
          <div className="max-w-3xl space-y-2.5">
            <p className="text-[13px] font-subheading font-semibold text-coral">
              Understanding the system
            </p>
            <h2 className="text-2xl sm:text-4xl font-heading font-normal text-charcoal dark:text-white tracking-tight text-balance">
              Mapping every actor, dependency, and scenario in the loop
            </h2>
            <p className="text-base font-body text-stone-600 dark:text-stone-300 leading-relaxed">
              Designing for "everyone on campus" produces another portal nobody opens. I grouped every institutional actor by what they control and what they need on event day.
            </p>
          </div>

          {/* Interactive Radial Bezier Stakeholder Map */}
          <StakeholderEcosystemMap onZoomSlide={setViewingImage} />

          {/* 4 Archetypes + 6 Survival Scenarios */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 pt-2">
            <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4">
              {archetypes.map((person) => (
                <div
                  key={person.name}
                  className="p-5 rounded-2xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 space-y-2"
                >
                  <h3 className="text-lg font-heading text-charcoal dark:text-white">
                    {person.name}
                  </h3>
                  <p className="text-[13px] font-body text-stone-600 dark:text-stone-400 leading-relaxed">
                    {person.desc}
                  </p>
                </div>
              ))}
            </div>

            <div className="lg:col-span-5 p-6 rounded-2xl bg-[#F7F5F2] dark:bg-stone-900 border border-stone-200 dark:border-stone-800 space-y-4">
              <div>
                <h3 className="text-lg font-heading text-charcoal dark:text-white">
                  Six scenarios the system had to survive
                </h3>
                <p className="text-[13px] font-body text-stone-500 dark:text-stone-400 mt-0.5">
                  Every layout and data flow was stress-tested against these real campus cases:
                </p>
              </div>
              <ol className="space-y-2">
                {survivalScenarios.map((scenario, idx) => (
                  <li
                    key={scenario}
                    className="flex items-start gap-3 text-[13px] font-body text-charcoal dark:text-stone-200"
                  >
                    <span className="font-mono text-coral font-semibold shrink-0 tabular-nums">
                      0{idx + 1}
                    </span>
                    <span>{scenario}</span>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </section>
      </RevealOnScroll>

      {/* =================================================================== */}
      {/* 06. JOURNEY THROUGH THE OLD SYSTEM & RESEARCH CONCLUSION            */}
      {/* =================================================================== */}
      <RevealOnScroll direction="up">
        <section className="space-y-8">
          <OldSystemJourneyMap onZoomSlide={setViewingImage} />

          {/* Research Conclusion Split Card (Matching classroom-orange conclusion block) */}
          <div className="rounded-3xl bg-[#F7F5F2] dark:bg-stone-900 border border-stone-200 dark:border-stone-800 p-6 sm:p-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-5">
              <div className="aspect-square max-w-[290px] mx-auto rounded-3xl bg-gradient-to-br from-[#FDE8D7] via-[#FFF3EB] to-[#EDE9FE] dark:from-coral/20 dark:via-stone-800 dark:to-lavender/20 border border-stone-200/80 dark:border-stone-700 p-5 grid grid-cols-2 gap-3">
                {[
                  { num: '01', label: 'Register', sub: 'Provision link' },
                  { num: '02', label: 'Prepare', sub: 'Map & rules' },
                  { num: '03', label: 'Attend', sub: 'QR & live diffs' },
                  { num: '04', label: 'Certify', sub: '1-tap proof' }
                ].map((quad) => (
                  <div
                    key={quad.label}
                    className="rounded-2xl bg-white/85 dark:bg-stone-900/85 backdrop-blur-xs p-4 flex flex-col justify-between border border-white/60 dark:border-stone-700"
                  >
                    <span className="text-xs font-mono text-coral font-semibold tabular-nums">
                      {quad.num}
                    </span>
                    <div>
                      <span className="text-base font-heading text-charcoal dark:text-white block">
                        {quad.label}
                      </span>
                      <span className="text-[13px] font-body text-stone-500 dark:text-stone-400">
                        {quad.sub}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="lg:col-span-7 space-y-5">
              <div className="flex items-center gap-2 text-[13px] font-subheading text-stone-500 dark:text-stone-400">
                <span className="text-coral font-semibold">Research conclusion</span>
                <span aria-hidden="true">·</span>
                <span>4 focus stages</span>
              </div>

              <h3 className="text-2xl sm:text-3xl font-heading text-charcoal dark:text-white text-balance">
                Why the intervention had to be attendee-first
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 pt-1">
                <div className="space-y-1.5">
                  <h4 className="text-sm font-subheading font-semibold text-charcoal dark:text-white">
                    Problems to solve
                  </h4>
                  <p className="text-[13px] font-body text-stone-600 dark:text-stone-300 leading-relaxed">
                    Eliminate the post-form blackout, decouple live room changes from printed posters, and harmonize 9 student sub-teams without forcing heavy enterprise software.
                  </p>
                </div>
                <div className="space-y-1.5">
                  <h4 className="text-sm font-subheading font-semibold text-charcoal dark:text-white">
                    Our mission
                  </h4>
                  <p className="text-[13px] font-body text-stone-600 dark:text-stone-300 leading-relaxed">
                    Because the attendee is the single point where all fragmented backstage work becomes visible, give every registrant one living web card that stays accurate from sign-up to certificate.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </RevealOnScroll>

      {/* =================================================================== */}
      {/* 07. THE SYSTEM SHIFT, LIVING LOOP & NODE-AND-BRANCH FLOWCHARTS      */}
      {/* =================================================================== */}
      <RevealOnScroll direction="up">
        <section className="space-y-12">
          <div className="max-w-3xl space-y-2.5">
            <p className="text-[13px] font-subheading font-semibold text-coral">The system shift</p>
            <h2 className="text-2xl sm:text-4xl font-heading font-normal text-charcoal dark:text-white tracking-tight text-balance">
              From scattered chat forwards to one living attendee loop
            </h2>
            <p className="text-base font-body text-stone-600 dark:text-stone-300 leading-relaxed">
              Instead of asking volunteers to abandon their operational autonomy or asking students to install an app for a one-day symposium, the new architecture connects existing sub-team inputs into one personal URL.
            </p>
          </div>

          {/* 4 Strategic Pillars */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              {
                title: 'Uses existing behaviour',
                desc: 'Students already submit forms and tap WhatsApp links—zero new habits to teach.'
              },
              {
                title: 'Zero app download',
                desc: 'Loads instantaneously in any mobile browser even on congested auditorium Wi-Fi.'
              },
              {
                title: 'Protects team autonomy',
                desc: 'Each of the 9 sub-teams updates only their own slice without central bottlenecks.'
              },
              {
                title: 'Closes the proof loop',
                desc: 'QR gate check-in automatically unlocks official PDF certificates right after sessions.'
              }
            ].map((pillar) => (
              <div
                key={pillar.title}
                className="p-5 rounded-2xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 space-y-2"
              >
                <h3 className="text-base font-heading text-charcoal dark:text-white">
                  {pillar.title}
                </h3>
                <p className="text-[13px] font-body text-stone-600 dark:text-stone-400 leading-relaxed">
                  {pillar.desc}
                </p>
              </div>
            ))}
          </div>

          {/* Dashed Loop Diagram + Venue Relocation Trace */}
          <LivingCardLoopDiagram onZoomSlide={setViewingImage} />

          {/* Full Node-and-Branch Flowchart (Attendee User Flow + Backend System Pipeline) */}
          <SystemArchitectureFlowchart onZoomSlide={setViewingImage} />
        </section>
      </RevealOnScroll>

      {/* =================================================================== */}
      {/* 08. HIGH-FIDELITY ANNOTATED DESIGN & BEFORE / AFTER                 */}
      {/* =================================================================== */}
      <RevealOnScroll direction="up">
        <section className="space-y-12">
          <div className="max-w-3xl space-y-2.5">
            <p className="text-[13px] font-subheading font-semibold text-coral">
              High-fidelity design
            </p>
            <h2 className="text-2xl sm:text-4xl font-heading font-normal text-charcoal dark:text-white tracking-tight text-balance">
              Progressive hierarchy designed for noisy auditorium corridors
            </h2>
            <p className="text-base font-body text-stone-600 dark:text-stone-300 leading-relaxed">
              Every decision from our systems maps translated into five clear progressive levels on a single mobile screen.
            </p>
          </div>

          {/* Annotated Interactive Event Journey Card */}
          <AnnotatedEventJourneyCard onZoomSlide={setViewingImage} />

          {/* Before & After Comparison ("Then and now, side by side") */}
          <div className="rounded-3xl bg-[#F7F5F2] dark:bg-stone-900 border border-stone-200 dark:border-stone-800 p-5 sm:p-8 space-y-6">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div>
                <p className="text-[13px] font-subheading font-semibold text-coral">
                  Before & after
                </p>
                <h3 className="text-xl sm:text-3xl font-heading text-charcoal dark:text-white mt-0.5">
                  Then and now: legacy relay vs. Event Journey Card
                </h3>
              </div>

              <div className="inline-flex p-1 rounded-xl bg-white dark:bg-stone-800 border border-stone-200 dark:border-stone-700">
                {[
                  { id: 'both', label: 'Side by side' },
                  { id: 'old', label: 'Legacy system' },
                  { id: 'new', label: 'New system' }
                ].map((mode) => (
                  <button
                    key={mode.id}
                    onClick={() => setCompareTab(mode.id as 'both' | 'old' | 'new')}
                    className={`px-3 py-1.5 rounded-lg text-[13px] font-subheading font-medium transition-colors cursor-pointer whitespace-nowrap shrink-0 ${
                      compareTab === mode.id
                        ? 'bg-charcoal text-white dark:bg-white dark:text-charcoal'
                        : 'text-stone-600 dark:text-stone-400 hover:text-charcoal dark:hover:text-white'
                    }`}
                  >
                    {mode.label}
                  </button>
                ))}
              </div>
            </div>

            <div
              className={`grid grid-cols-1 ${
                compareTab === 'both' ? 'lg:grid-cols-2' : ''
              } gap-6`}
            >
              {compareTab !== 'new' && (
                <div className="rounded-2xl bg-white dark:bg-stone-950 border border-stone-200 dark:border-stone-800 p-5 space-y-4">
                  <div className="flex items-center justify-between">
                    <h4 className="text-lg font-heading text-charcoal dark:text-white">
                      Legacy campus workflow
                    </h4>
                    <button
                      onClick={() =>
                        setViewingImage('/assets/projects/systems-design/systems_slide_21.png')
                      }
                      className="text-[13px] font-subheading text-coral hover:underline flex items-center gap-1 cursor-pointer"
                    >
                      <ZoomIn size={13} /> Zoom dependency map
                    </button>
                  </div>

                  <ol className="space-y-3">
                    {[
                      'Event details live across 9 separate WhatsApp sub-groups with no shared record.',
                      'Printed campus posters lock room names permanently days before the event.',
                      'Submitting a Google Form ends in silence—no entry pass or confirmation badge.',
                      'Morning hall changes trigger 100+ frantic phone calls to student organizers.',
                      'Attendance sheets get misplaced, delaying participation certificates by weeks.'
                    ].map((pt, i) => (
                      <li key={pt} className="flex items-start gap-3 text-[13px] font-body text-stone-600 dark:text-stone-400">
                        <span className="w-5 h-5 rounded-full bg-stone-200 dark:bg-stone-800 text-charcoal dark:text-stone-300 text-[11px] font-bold flex items-center justify-center shrink-0 mt-0.5 tabular-nums">
                          {i + 1}
                        </span>
                        <span>{pt}</span>
                      </li>
                    ))}
                  </ol>
                </div>
              )}

              {compareTab !== 'old' && (
                <div className="rounded-2xl bg-white dark:bg-stone-950 border border-coral/40 p-5 space-y-4">
                  <div className="flex items-center justify-between">
                    <h4 className="text-lg font-heading text-charcoal dark:text-white">
                      Event Journey Card system
                    </h4>
                    <button
                      onClick={() =>
                        setViewingImage('/assets/projects/systems-design/journey_card_08.png')
                      }
                      className="text-[13px] font-subheading text-coral hover:underline flex items-center gap-1 cursor-pointer"
                    >
                      <ZoomIn size={13} /> Zoom resolution slide
                    </button>
                  </div>

                  <ol className="space-y-3">
                    {[
                      '9 sub-teams update scoped fields inside one structured Central Event Database.',
                      'Static awareness posters point via QR to a live, continuously updated web layer.',
                      'Form submission immediately dispatches a personal URL with verified status and QR.',
                      'Room changes display explicit Old vs. New diff cards across all cards in ≤ 5 minutes.',
                      'Gate QR scan verifies attendance and unlocks a 1-tap downloadable PDF certificate.'
                    ].map((pt, i) => (
                      <li key={pt} className="flex items-start gap-3 text-[13px] font-body text-charcoal dark:text-stone-200">
                        <span className="w-5 h-5 rounded-full bg-coral text-white text-[11px] font-bold flex items-center justify-center shrink-0 mt-0.5 tabular-nums">
                          {i + 1}
                        </span>
                        <span>{pt}</span>
                      </li>
                    ))}
                  </ol>
                </div>
              )}
            </div>
          </div>
        </section>
      </RevealOnScroll>

      {/* =================================================================== */}
      {/* 09. UI COMPONENTS: SMALL PIECES, EACH WITH ONE JOB                  */}
      {/* =================================================================== */}
      <RevealOnScroll direction="up">
        <section className="space-y-8">
          <div className="max-w-3xl space-y-2.5">
            <p className="text-[13px] font-subheading font-semibold text-coral">UI components</p>
            <h2 className="text-2xl sm:text-4xl font-heading font-normal text-charcoal dark:text-white tracking-tight text-balance">
              Small pieces, each with one job
            </h2>
            <p className="text-base font-body text-stone-600 dark:text-stone-300 leading-relaxed">
              Every module inside the Event Journey Card follows the same quiet anatomy—one line of context, one verified status or diff, and one clear action—answering the exact question an attendee has in that moment.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {singleJobCards.map((card) => {
              const Icon = card.icon;
              return (
                <div
                  key={card.question}
                  className="p-6 rounded-3xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 flex flex-col justify-between space-y-4"
                >
                  <div className="space-y-3">
                    <div className="w-10 h-10 rounded-xl bg-[#F7F5F2] dark:bg-stone-800 text-coral flex items-center justify-center">
                      <Icon size={18} />
                    </div>
                    <h3 className="text-lg font-heading text-charcoal dark:text-white">
                      {card.question}
                    </h3>
                    <p className="text-[13px] font-body text-stone-600 dark:text-stone-400 leading-relaxed">
                      {card.answer}
                    </p>
                  </div>
                  <div className="pt-3 border-t border-stone-100 dark:border-stone-800 flex items-center justify-between text-[13px] font-subheading text-stone-500 dark:text-stone-400">
                    <span>{card.metric}</span>
                    <ShieldCheck size={15} className="text-lavender" />
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      </RevealOnScroll>

      {/* =================================================================== */}
      {/* 10. OUTCOME BENCHMARKS & ORIGINAL SLIDE ARCHIVE                     */}
      {/* =================================================================== */}
      <RevealOnScroll direction="up">
        <section className="space-y-14">
          <div className="rounded-3xl bg-charcoal dark:bg-stone-900 text-white p-6 sm:p-10 lg:p-12 border border-stone-800 space-y-8">
            <div className="max-w-2xl space-y-2">
              <p className="text-[13px] font-subheading font-semibold text-coral">Outcome</p>
              <h2 className="text-2xl sm:text-4xl font-heading font-normal tracking-wide text-balance">
                The service targets this system was built to hit
              </h2>
              <p className="text-sm sm:text-base font-body text-stone-300 leading-relaxed">
                Moving from scattered chat forwards to a centralized database + living web card turns backstage coordination into measurable clarity for both attendees and volunteer teams.
              </p>
            </div>

            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 pt-4 border-t border-stone-800">
              <div className="space-y-1.5">
                <span className="text-3xl sm:text-5xl font-heading text-coral block tabular-nums">
                  ≥ 90%
                </span>
                <p className="text-sm font-subheading font-medium text-white">
                  Self-service clarity
                </p>
                <p className="text-[13px] font-body text-stone-400">
                  Attendees find schedules, venues, and passes without messaging organizers
                </p>
              </div>

              <div className="space-y-1.5">
                <span className="text-3xl sm:text-5xl font-heading text-white block tabular-nums">
                  ≤ 5 min
                </span>
                <p className="text-sm font-subheading font-medium text-white">
                  Update propagation
                </p>
                <p className="text-[13px] font-body text-stone-400">
                  Approved room or timing changes reflect across all attendee cards
                </p>
              </div>

              <div className="space-y-1.5">
                <span className="text-3xl sm:text-5xl font-heading text-lavender block tabular-nums">
                  ≥ 50%
                </span>
                <p className="text-sm font-subheading font-medium text-white">
                  Fewer panic queries
                </p>
                <p className="text-[13px] font-body text-stone-400">
                  Drop in repetitive morning calls asking where halls or passes are
                </p>
              </div>

              <div className="space-y-1.5">
                <span className="text-3xl sm:text-5xl font-heading text-white block tabular-nums">
                  ≥ 90%
                </span>
                <p className="text-sm font-subheading font-medium text-white">
                  Full-journey retention
                </p>
                <p className="text-[13px] font-body text-stone-400">
                  Single link retained from registration through certificate download
                </p>
              </div>
            </div>
          </div>

          {/* Original Presentation Boards & Maps Archive */}
          <div className="space-y-5">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2">
              <div>
                <p className="text-[13px] font-subheading font-semibold text-coral">
                  Process documentation
                </p>
                <h3 className="text-xl sm:text-3xl font-heading text-charcoal dark:text-white">
                  Original systems boards & presentation slides
                </h3>
              </div>
              <p className="text-[13px] font-subheading text-stone-500">
                Click any board to inspect in full resolution
              </p>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
              {archivalSlides.map((slide) => (
                <button
                  key={slide.src}
                  onClick={() => setViewingImage(slide.src)}
                  className="group text-left rounded-2xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 p-2.5 hover:border-coral transition-colors cursor-zoom-in space-y-2"
                >
                  <div className="aspect-[16/10] rounded-xl overflow-hidden bg-stone-100 dark:bg-stone-950">
                    <img
                      src={slide.src}
                      alt={slide.title}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                  </div>
                  <div className="px-1 flex items-center justify-between gap-2">
                    <span className="text-[13px] font-subheading font-medium text-charcoal dark:text-stone-200 truncate">
                      {slide.title}
                    </span>
                    <ZoomIn
                      size={13}
                      className="text-stone-400 group-hover:text-coral transition-colors shrink-0"
                    />
                  </div>
                </button>
              ))}
            </div>
          </div>
        </section>
      </RevealOnScroll>
    </article>
  );
};

export default SystemsDesignCaseStudy;
