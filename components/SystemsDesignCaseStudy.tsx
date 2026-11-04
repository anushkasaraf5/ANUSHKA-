import React, { useState } from 'react';
import { Project } from '../types';
import { 
  ZoomIn, ArrowRight, CheckCircle2, AlertTriangle, Layers,
  Users, Database, Smartphone, Bell, Clock, RefreshCw,
  ExternalLink, Sparkles, ChevronRight, FileText, Share2,
  Check, Eye, ShieldCheck, MapPin, Calendar, QrCode,
  Building2, School, Radio, Compass, GitBranch, AlertCircle,
  HelpCircle, BarChart3, UserCheck, MessageSquare, ArrowDown
} from 'lucide-react';
import { RevealOnScroll } from './RevealOnScroll';

interface SystemsDesignProps {
  project: Project;
  setViewingImage: (url: string) => void;
  onNavigateProject?: (projectId: string) => void;
}

export const SystemsDesignCaseStudy: React.FC<SystemsDesignProps> = ({
  project,
  setViewingImage,
  onNavigateProject
}) => {
  // Step 6: Interactive Cartography Map Selection
  const [activeMapTab, setActiveMapTab] = useState<number>(0);

  // Step 8: Interactive Attendee Journey Phase Selection
  const [activeJourneyPhase, setActiveJourneyPhase] = useState<number>(0);

  // Step 8: Live Card Simulation State (Pre-Event, Event Day, Post-Event)
  const [cardSimulationState, setCardSimulationState] = useState<'pre' | 'live' | 'post'>('live');

  // Step 6: Maps Data
  const cartographyMaps = [
    {
      id: "ecosystem",
      number: "01",
      title: "Campus Academic Event Ecosystem",
      badge: "Macro System Blueprint",
      description: "Maps institutional relationships and transmission paths across 5 campus tiers.",
      insight: "Attendees sit at the outermost boundary of the organization, receiving information diluted across 4 separate human intermediaries."
    },
    {
      id: "stakeholders",
      number: "02",
      title: "Stakeholder Power vs. Interest Grid",
      badge: "Governance Analysis",
      description: "Evaluates institutional actors to diagnose systemic decision bottlenecks.",
      insight: "High Power / Low Daily Interest actors (Administration) delay room approvals, paralyzing High Interest / Low Power executors (Student Sub-teams)."
    },
    {
      id: "lifecycle",
      number: "03",
      title: "7-Phase Event Information Flow",
      badge: "Service Lifecycle",
      description: "Chronological mapping from initial faculty ideation through to certification.",
      insight: "Information collapses most acutely at Phase 5 (post-registration communication vacuum) and Phase 7 (delayed certificate fulfillment)."
    },
    {
      id: "taxonomy",
      number: "04",
      title: "Event Information Architecture Taxonomy",
      badge: "Information Hierarchy",
      description: "Deconstructs campus event data into Static, Dynamic, and Actionable modules.",
      insight: "Traditional posters conflate static and dynamic details, rendering printed communications immediately obsolete whenever logistics shift."
    },
    {
      id: "dependencies",
      number: "05",
      title: "Inter-Team Critical Path Dependencies",
      badge: "Workflow Network",
      description: "Cross-functional analysis demonstrating sequential blocking between sub-teams.",
      insight: "PR and Promotion cannot publish official collateral until physical room sanctions are stamped by Administration, shrinking attendee awareness windows."
    },
    {
      id: "opportunities",
      number: "06",
      title: "Pain Point & Opportunity Matrix",
      badge: "Intervention Map",
      description: "Translates observed institutional breakdowns into actionable design interventions.",
      insight: "Establishing a single, authoritative attendee web card solves upstream coordination friction without requiring sub-teams to surrender operational autonomy."
    }
  ];

  // Step 8: Attendee Journey Phases
  const journeyPhases = [
    {
      phase: "01. REGISTER",
      role: "Initial Onboarding",
      action: "Submit Google Form & Confirm",
      details: [
        "Student fills standard institutional registration form",
        "Instant confirmation triggers automated card creation in central database",
        "Unique personal Event Journey Card link dispatched via WhatsApp and SMS"
      ],
      state: "Ticket Provisioned",
      icon: FileText
    },
    {
      phase: "02. GET YOUR CARD",
      role: "First Touchpoint",
      action: "Open Personal Link & Inspect",
      details: [
        "Attendee taps single permanent URL — zero app store download required",
        "Personalized greeting with verified registration badge & unique barcode",
        "Core schedule, venue location, and check-in pass immediately visible"
      ],
      state: "Active Web Card",
      icon: Smartphone
    },
    {
      phase: "03. BEFORE EVENT",
      role: "Preparation Window",
      action: "Explore Details & Guidance",
      details: [
        "Live venue directions, parking maps, and campus block navigation",
        "Speaker bios, session tracks, and required workshop prerequisites",
        "Checklist of what to bring and dress code guidelines"
      ],
      state: "Pre-Event Ready",
      icon: Compass
    },
    {
      phase: "04. EVENT DAY",
      role: "On-Ground Execution",
      action: "Turnstile Check-In & Live Updates",
      details: [
        "Volunteer scans turnstile QR barcode in under 2 seconds",
        "Live schedule tracking highlights active keynote session",
        "Instant coral alert banners broadcast emergency room changes"
      ],
      state: "Live Synchronized",
      icon: QrCode
    },
    {
      phase: "05. POST EVENT",
      role: "Fulfillment Loop",
      action: "Attendance Status & Certificate",
      details: [
        "Verified check-in timestamp marks attendance status automatically",
        "One-click downloadable PDF certificate issued immediately without delay",
        "Built-in post-event feedback form closes the service loop"
      ],
      state: "Service Fulfilled",
      icon: ShieldCheck
    }
  ];

  return (
    <article className="max-w-5xl mx-auto space-y-16 sm:space-y-24 selection:bg-lavender selection:text-white pb-16">
      
      {/* ============================================================= */}
      {/* HERO SECTION: IDENTITY & EDITORIAL PREMISE                    */}
      {/* ============================================================= */}
      <RevealOnScroll direction="up">
        <header className="space-y-8 pt-4">
          
          {/* Editorial Kicker & Scope Metadata */}
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-stone-200 dark:border-stone-800 pb-4 text-xs font-subheading text-stone-600 dark:text-stone-400">
            <div className="flex items-center gap-2.5">
              <span className="w-2 h-2 rounded-full bg-lavender animate-pulse" />
              <span className="font-heading tracking-wider text-charcoal dark:text-white text-sm">
                SYSTEMS & SERVICE DESIGN CASE STUDY
              </span>
            </div>
            <div className="flex items-center gap-2.5 text-[11px]">
              <span>Academic Event Operations</span>
              <span>/</span>
              <span>Attendee-Centric Service Architecture</span>
              <span>/</span>
              <span>By Anushka Saraf</span>
            </div>
          </div>

          {/* Project Title & Narrative Introduction */}
          <div className="space-y-4 max-w-4xl">
            <span className="text-xs font-subheading uppercase tracking-widest text-coral font-bold block">
              Campus Communication Architecture
            </span>
            <h1 className="text-3xl sm:text-5xl md:text-6xl font-heading font-normal text-charcoal dark:text-white leading-[1.08] tracking-tight">
              Event Journey Card: Re-engineering Academic Service Systems
            </h1>
            <p className="text-base sm:text-lg font-subheading text-stone-600 dark:text-stone-300 leading-relaxed max-w-3xl">
              Campus academic events appear simple from the outside, but disguise an intricate web of backstage dependencies across university administration, faculty mentors, volunteer student sub-teams, and hundreds of attendees. When communication breaks down, attendees face missed announcements, venue confusion, and delayed certificates. This systems design case study investigates the structural causes of communication failure and designs the <strong className="text-charcoal dark:text-white font-medium">Event Journey Card</strong> — a single, continuously updated web link that bridges backstage management with an intuitive attendee experience.
            </p>
          </div>

          {/* Authentic Cover Presentation Banner */}
          <div className="space-y-3">
            <div 
              onClick={() => setViewingImage("/assets/projects/systems-design/journey_card_01.png")}
              className="relative w-full aspect-[16/9] sm:aspect-[21/9] rounded-3xl overflow-hidden bg-stone-100 dark:bg-stone-900 border border-stone-200 dark:border-stone-800 shadow-xl cursor-zoom-in group flex items-center justify-center p-3 sm:p-6"
            >
              <img 
                src="/assets/projects/systems-design/journey_card_01.png" 
                alt="Event Journey Card Project Identity Slide" 
                className="w-full h-full object-contain transition-transform duration-700 group-hover:scale-102"
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors flex items-center justify-center pointer-events-none">
                <span className="opacity-0 group-hover:opacity-100 transition-opacity px-4 py-2 rounded-full bg-white/95 dark:bg-stone-900/95 backdrop-blur text-xs font-subheading font-medium text-charcoal dark:text-white shadow-xl flex items-center gap-1.5">
                  <ZoomIn size={14} className="text-lavender" /> Inspect High-Resolution Title Slide
                </span>
              </div>
            </div>
            <div className="flex items-center justify-between text-[11px] font-subheading text-stone-500 px-1">
              <span>Authentic Project Title Identity · Torn Paper & Hand-Drawn Visual Motif</span>
              <span>Click image to inspect in full resolution</span>
            </div>
          </div>

          {/* Quick Step Navigation Index */}
          <div className="p-4 sm:p-5 rounded-2xl bg-stone-100/70 dark:bg-stone-900/70 border border-stone-200 dark:border-stone-800">
            <span className="text-[10px] font-heading text-stone-400 dark:text-stone-500 uppercase tracking-widest block mb-2.5">
              Case Study Roadmap · 8 Systems Steps
            </span>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs font-subheading">
              <a href="#step-1" className="p-2 rounded-xl bg-white dark:bg-stone-850 border border-stone-200 dark:border-stone-750 hover:border-lavender text-stone-700 dark:text-stone-300 flex items-center gap-1.5">
                <span className="font-heading text-lavender font-bold">01</span> Research
              </a>
              <a href="#step-2" className="p-2 rounded-xl bg-white dark:bg-stone-850 border border-stone-200 dark:border-stone-750 hover:border-coral text-stone-700 dark:text-stone-300 flex items-center gap-1.5">
                <span className="font-heading text-coral font-bold">02</span> Problem Statement
              </a>
              <a href="#step-3" className="p-2 rounded-xl bg-white dark:bg-stone-850 border border-stone-200 dark:border-stone-750 hover:border-lavender text-stone-700 dark:text-stone-300 flex items-center gap-1.5">
                <span className="font-heading text-lavender font-bold">03</span> Root Cause
              </a>
              <a href="#step-4" className="p-2 rounded-xl bg-white dark:bg-stone-850 border border-stone-200 dark:border-stone-750 hover:border-coral text-stone-700 dark:text-stone-300 flex items-center gap-1.5">
                <span className="font-heading text-coral font-bold">04</span> Success Metrics
              </a>
              <a href="#step-5" className="p-2 rounded-xl bg-white dark:bg-stone-850 border border-stone-200 dark:border-stone-750 hover:border-lavender text-stone-700 dark:text-stone-300 flex items-center gap-1.5">
                <span className="font-heading text-lavender font-bold">05</span> Proposed Intervention
              </a>
              <a href="#step-6" className="p-2 rounded-xl bg-white dark:bg-stone-850 border border-stone-200 dark:border-stone-750 hover:border-coral text-stone-700 dark:text-stone-300 flex items-center gap-1.5">
                <span className="font-heading text-coral font-bold">06</span> Understanding System
              </a>
              <a href="#step-7" className="p-2 rounded-xl bg-white dark:bg-stone-850 border border-stone-200 dark:border-stone-750 hover:border-lavender text-stone-700 dark:text-stone-300 flex items-center gap-1.5">
                <span className="font-heading text-lavender font-bold">07</span> Found Problem
              </a>
              <a href="#step-8" className="p-2 rounded-xl bg-white dark:bg-stone-850 border border-stone-200 dark:border-stone-750 hover:border-coral text-stone-700 dark:text-stone-300 flex items-center gap-1.5">
                <span className="font-heading text-coral font-bold">08</span> The Changes
              </a>
            </div>
          </div>

        </header>
      </RevealOnScroll>

      {/* ============================================================= */}
      {/* STEP 1: RESEARCH                                              */}
      {/* ============================================================= */}
      <RevealOnScroll direction="up">
        <section id="step-1" className="space-y-8 scroll-mt-20">
          
          <div className="space-y-2 border-l-2 border-lavender pl-4">
            <span className="text-xs font-subheading uppercase tracking-widest text-lavender font-bold block">
              Step 1 of 8 · Empirical Systems Investigation
            </span>
            <h2 className="text-2xl sm:text-4xl font-heading font-normal text-charcoal dark:text-white tracking-tight">
              Step 1: Research
            </h2>
            <p className="text-stone-600 dark:text-stone-300 text-sm sm:text-base max-w-3xl leading-relaxed font-subheading">
              A comprehensive inquiry into campus academic events (symposiums, design conferences, multi-day technical workshops, and guest lectures) to trace communication hand-offs across institutional boundaries.
            </p>
          </div>

          {/* Research Cohorts & Stakeholders Analyzed */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="p-5 rounded-3xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 space-y-3">
              <div className="w-10 h-10 rounded-2xl bg-lavender/10 text-lavender flex items-center justify-center">
                <Building2 size={20} />
              </div>
              <h3 className="text-base font-heading font-normal text-charcoal dark:text-white">
                University Administration
              </h3>
              <p className="text-xs font-subheading text-stone-600 dark:text-stone-400 leading-relaxed">
                Deans, Facility Managers, Finance, and Security. Controls room sanctions, official circulars, and institutional stamping.
              </p>
              <div className="text-[11px] font-subheading text-lavender font-medium">
                Focus: Budget approvals & room access
              </div>
            </div>

            <div className="p-5 rounded-3xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 space-y-3">
              <div className="w-10 h-10 rounded-2xl bg-coral/10 text-coral flex items-center justify-center">
                <School size={20} />
              </div>
              <h3 className="text-base font-heading font-normal text-charcoal dark:text-white">
                Faculty Coordinators
              </h3>
              <p className="text-xs font-subheading text-stone-600 dark:text-stone-400 leading-relaxed">
                Department Heads & Academic Mentors. Mediate between administrative directives and student initiative workflows.
              </p>
              <div className="text-[11px] font-subheading text-coral font-medium">
                Focus: Academic compliance & speakers
              </div>
            </div>

            <div className="p-5 rounded-3xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 space-y-3">
              <div className="w-10 h-10 rounded-2xl bg-lavender/10 text-lavender flex items-center justify-center">
                <Users size={20} />
              </div>
              <h3 className="text-base font-heading font-normal text-charcoal dark:text-white">
                Student Organizing Teams
              </h3>
              <p className="text-xs font-subheading text-stone-600 dark:text-stone-400 leading-relaxed">
                9 functional sub-teams (PR, Design, Logistics, Tech, Hospitality, Stage). Execute daily tasks via informal WhatsApp threads.
              </p>
              <div className="text-[11px] font-subheading text-lavender font-medium">
                Focus: Operations, promotion & check-in
              </div>
            </div>

            <div className="p-5 rounded-3xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 space-y-3">
              <div className="w-10 h-10 rounded-2xl bg-coral/10 text-coral flex items-center justify-center">
                <UserCheck size={20} />
              </div>
              <h3 className="text-base font-heading font-normal text-charcoal dark:text-white">
                Attendees & Participants
              </h3>
              <p className="text-xs font-subheading text-stone-600 dark:text-stone-400 leading-relaxed">
                Internal undergraduate students, postgraduates, and external delegates. At the receiving end of broken communication chains.
              </p>
              <div className="text-[11px] font-subheading text-coral font-medium">
                Focus: Schedule clarity & certificates
              </div>
            </div>
          </div>

          {/* Research Data & Methodological Scope */}
          <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 shadow-sm space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2 border-b border-stone-100 dark:border-stone-800 pb-3">
              <div>
                <span className="text-[11px] font-subheading font-bold text-lavender uppercase tracking-wider">
                  Field Discovery Methodology
                </span>
                <h3 className="text-xl font-heading font-normal text-charcoal dark:text-white mt-0.5">
                  Multi-Perspective Service Systems Audit
                </h3>
              </div>
              <span className="text-xs font-subheading text-stone-500">
                47 In-Depth Interviews · 3 Live Shadowed Events
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              <div className="p-5 rounded-2xl bg-stone-50 dark:bg-stone-850 border border-stone-200/80 dark:border-stone-800 space-y-2">
                <span className="text-2xl font-heading text-lavender font-normal block">
                  120+
                </span>
                <h4 className="text-sm font-heading font-normal text-charcoal dark:text-white">
                  Communication Logs Traced
                </h4>
                <p className="text-xs font-subheading text-stone-600 dark:text-stone-400 leading-relaxed">
                  Tracked WhatsApp group messages, circular paper trails, Google Forms, and post-event certificate complaint logs to pinpoint where communication drops.
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-stone-50 dark:bg-stone-850 border border-stone-200/80 dark:border-stone-800 space-y-2">
                <span className="text-2xl font-heading text-coral font-normal block">
                  84%
                </span>
                <h4 className="text-sm font-heading font-normal text-charcoal dark:text-white">
                  Attendees Missed Key Updates
                </h4>
                <p className="text-xs font-subheading text-stone-600 dark:text-stone-400 leading-relaxed">
                  Of surveyed attendees, 84% reported missing at least one critical schedule shift or venue change due to uncoordinated broadcast channels.
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-stone-50 dark:bg-stone-850 border border-stone-200/80 dark:border-stone-800 space-y-2">
                <span className="text-2xl font-heading text-lavender font-normal block">
                  72h
                </span>
                <h4 className="text-sm font-heading font-normal text-charcoal dark:text-white">
                  Approval Delay Lag
                </h4>
                <p className="text-xs font-subheading text-stone-600 dark:text-stone-400 leading-relaxed">
                  Administrative room and budget approvals routinely took 72+ hours, leaving promotion teams unable to publish accurate posters until days before events.
                </p>
              </div>
            </div>
          </div>

        </section>
      </RevealOnScroll>

      {/* ============================================================= */}
      {/* STEP 2: PROBLEM STATEMENT (NO IMAGE - PURE ARCHITECTURAL)     */}
      {/* ============================================================= */}
      <RevealOnScroll direction="up">
        <section id="step-2" className="space-y-8 scroll-mt-20">
          
          <div className="space-y-2 border-l-2 border-coral pl-4">
            <span className="text-xs font-subheading uppercase tracking-widest text-coral font-bold block">
              Step 2 of 8 · Problem Framing
            </span>
            <h2 className="text-2xl sm:text-4xl font-heading font-normal text-charcoal dark:text-white tracking-tight">
              Step 2: Problem Statement
            </h2>
            <p className="text-stone-600 dark:text-stone-300 text-sm sm:text-base max-w-3xl leading-relaxed font-subheading">
              Framing the core breakdown observed across institutional academic events without relying on superficial symptoms.
            </p>
          </div>

          {/* Pure Typographic Problem Statement Card (No Image) */}
          <div className="p-8 sm:p-12 rounded-3xl bg-white dark:bg-stone-900 border-2 border-coral/30 shadow-lg space-y-8 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-coral/5 rounded-full blur-3xl pointer-events-none" />
            
            <div className="space-y-3">
              <span className="text-xs font-subheading font-bold uppercase tracking-widest text-coral">
                Core Problem Statement
              </span>
              <blockquote className="text-xl sm:text-3xl font-heading font-normal text-charcoal dark:text-white leading-snug tracking-tight">
                "Event information is managed across individual people, disconnected communication channels, and separate stages without a centralized system for ownership, updating, and distribution, causing information to be lost, delayed, or inconsistent from planning through post-event communication."
              </blockquote>
            </div>

            {/* Three Structural Breakdowns */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5 pt-4 border-t border-stone-200 dark:border-stone-800">
              <div className="space-y-2">
                <span className="text-xs font-heading font-bold text-coral">01 · FRAGMENTED CUSTODY</span>
                <h4 className="text-base font-heading font-normal text-charcoal dark:text-white">
                  Information Lives in Heads
                </h4>
                <p className="text-xs font-subheading text-stone-600 dark:text-stone-400 leading-relaxed">
                  Event logistics exist as personal mental notes or unshared chats between key coordinators rather than documented operational guidelines.
                </p>
              </div>

              <div className="space-y-2">
                <span className="text-xs font-heading font-bold text-lavender">02 · CHANNEL CACOPHONY</span>
                <h4 className="text-base font-heading font-normal text-charcoal dark:text-white">
                  Contradictory Signals
                </h4>
                <p className="text-xs font-subheading text-stone-600 dark:text-stone-400 leading-relaxed">
                  Printed posters, forwarded WhatsApp blasts, email circulars, and Google Forms state conflicting timings, leaving attendees puzzled.
                </p>
              </div>

              <div className="space-y-2">
                <span className="text-xs font-heading font-bold text-coral">03 · TEMPORAL DISCONNECT</span>
                <h4 className="text-base font-heading font-normal text-charcoal dark:text-white">
                  Post-Form Blackout
                </h4>
                <p className="text-xs font-subheading text-stone-600 dark:text-stone-400 leading-relaxed">
                  Communication halts the second an attendee hits 'Submit' on Google Forms, leaving a dead zone right up until the auditorium doors open.
                </p>
              </div>
            </div>
          </div>

        </section>
      </RevealOnScroll>

      {/* ============================================================= */}
      {/* STEP 3: ROOT CAUSE (NO IMAGE - PURE ARCHITECTURAL)             */}
      {/* ============================================================= */}
      <RevealOnScroll direction="up">
        <section id="step-3" className="space-y-8 scroll-mt-20">
          
          <div className="space-y-2 border-l-2 border-lavender pl-4">
            <span className="text-xs font-subheading uppercase tracking-widest text-lavender font-bold block">
              Step 3 of 8 · Root Cause Diagnosis
            </span>
            <h2 className="text-2xl sm:text-4xl font-heading font-normal text-charcoal dark:text-white tracking-tight">
              Step 3: Root Cause
            </h2>
            <p className="text-stone-600 dark:text-stone-300 text-sm sm:text-base max-w-3xl leading-relaxed font-subheading">
              Moving past superficial excuses to identify the structural origin of communication failures in campus academic events.
            </p>
          </div>

          {/* Root Cause Core Assertion (No Image) */}
          <div className="p-8 sm:p-12 rounded-3xl bg-lavender/5 dark:bg-lavender/10 border-2 border-lavender/30 space-y-6">
            <div className="space-y-2">
              <span className="text-xs font-subheading font-bold uppercase tracking-widest text-lavender">
                The Fundamental Cause
              </span>
              <h3 className="text-xl sm:text-3xl font-heading font-normal text-charcoal dark:text-white leading-snug">
                Lack of a centralized information management system with clear ownership and defined information flow.
              </h3>
            </div>
            <p className="text-sm font-subheading text-stone-600 dark:text-stone-300 leading-relaxed max-w-3xl">
              Campus events do not collapse from volunteer apathy or poor student intentions. They collapse because the university operates on an ad-hoc, informal human relay without an authoritative system of record. Every team maintains their own isolated mental model of the event.
            </p>

            {/* Root Cause Mechanism Diagram (Native Visual Flow) */}
            <div className="p-6 rounded-2xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 space-y-4">
              <span className="text-[11px] font-heading text-stone-400 dark:text-stone-500 uppercase tracking-widest block">
                The Structural Disintegration Mechanism
              </span>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="p-4 rounded-xl bg-stone-50 dark:bg-stone-850 border border-stone-200/70 dark:border-stone-800 space-y-2">
                  <div className="flex items-center gap-2 text-coral text-xs font-heading font-bold">
                    <AlertTriangle size={15} />
                    <span>01. NO SINGLE TRUTH</span>
                  </div>
                  <h4 className="text-sm font-heading font-normal text-charcoal dark:text-white">
                    Unsynchronized Silos
                  </h4>
                  <p className="text-xs font-subheading text-stone-600 dark:text-stone-400 leading-relaxed">
                    Venue team shifts rooms; Tech team assumes old AV setup; PR team broadcasts third schedule. Zero database coordinates them.
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-stone-50 dark:bg-stone-850 border border-stone-200/70 dark:border-stone-800 space-y-2">
                  <div className="flex items-center gap-2 text-lavender text-xs font-heading font-bold">
                    <GitBranch size={15} />
                    <span>02. TELEPHONE DECAY</span>
                  </div>
                  <h4 className="text-sm font-heading font-normal text-charcoal dark:text-white">
                    Signal Attenuation
                  </h4>
                  <p className="text-xs font-subheading text-stone-600 dark:text-stone-400 leading-relaxed">
                    Updates pass through 4 human intermediaries (Admin → Faculty → Core Team → Attendees), degrading precision at every manual step.
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-stone-50 dark:bg-stone-850 border border-stone-200/70 dark:border-stone-800 space-y-2">
                  <div className="flex items-center gap-2 text-coral text-xs font-heading font-bold">
                    <Clock size={15} />
                    <span>03. ASYNC BOTTLENECK</span>
                  </div>
                  <h4 className="text-sm font-heading font-normal text-charcoal dark:text-white">
                    Delayed Approvals
                  </h4>
                  <p className="text-xs font-subheading text-stone-600 dark:text-stone-400 leading-relaxed">
                    Because approvals are gatekept by busy university deans, changes remain unconfirmed until minutes before start time.
                  </p>
                </div>
              </div>
            </div>
          </div>

        </section>
      </RevealOnScroll>

      {/* ============================================================= */}
      {/* STEP 4: SUCCESS METRICS (REDESIGNED NATIVELY)                  */}
      {/* ============================================================= */}
      <RevealOnScroll direction="up">
        <section id="step-4" className="space-y-8 scroll-mt-20">
          
          <div className="space-y-2 border-l-2 border-coral pl-4">
            <span className="text-xs font-subheading uppercase tracking-widest text-coral font-bold block">
              Step 4 of 8 · Empirical Targets
            </span>
            <h2 className="text-2xl sm:text-4xl font-heading font-normal text-charcoal dark:text-white tracking-tight">
              Step 4: Success Metrics
            </h2>
            <p className="text-stone-600 dark:text-stone-300 text-sm sm:text-base max-w-3xl leading-relaxed font-subheading">
              Four measurable performance benchmarks defined by Anushka Saraf to objectively validate whether the redesigned system resolves the communication breakdown.
            </p>
          </div>

          {/* 4 Quantitative Metrics Cards (Redesigned with custom visual indicators) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            
            {/* Metric 1 */}
            <div className="p-6 rounded-3xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 shadow-sm space-y-3 relative overflow-hidden">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-heading text-lavender font-bold uppercase tracking-wider">
                  AUTONOMY BENCHMARK
                </span>
                <span className="text-[11px] font-subheading text-stone-400">Target</span>
              </div>
              <div className="space-y-1">
                <span className="text-4xl sm:text-5xl font-heading text-lavender font-normal block tabular-nums">
                  ≥ 90%
                </span>
                <h3 className="text-sm font-heading font-normal text-charcoal dark:text-white">
                  Self-Service Information
                </h3>
              </div>
              <p className="text-xs font-subheading text-stone-600 dark:text-stone-400 leading-relaxed">
                Attendees find schedule, venue, speaker, and pass information independently without messaging or calling organizers.
              </p>
              <div className="pt-2 border-t border-stone-100 dark:border-stone-800">
                <div className="w-full bg-stone-100 dark:bg-stone-800 h-2 rounded-full overflow-hidden">
                  <div className="bg-lavender h-full rounded-full" style={{ width: '90%' }} />
                </div>
                <div className="flex justify-between text-[10px] font-subheading text-stone-400 mt-1">
                  <span>Baseline: 34%</span>
                  <span className="text-lavender font-bold">Goal: 90%+</span>
                </div>
              </div>
            </div>

            {/* Metric 2 */}
            <div className="p-6 rounded-3xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 shadow-sm space-y-3 relative overflow-hidden">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-heading text-coral font-bold uppercase tracking-wider">
                  SYNC VELOCITY
                </span>
                <span className="text-[11px] font-subheading text-stone-400">Latency</span>
              </div>
              <div className="space-y-1">
                <span className="text-4xl sm:text-5xl font-heading text-coral font-normal block tabular-nums">
                  ≤ 5 min
                </span>
                <h3 className="text-sm font-heading font-normal text-charcoal dark:text-white">
                  Update Propagation Speed
                </h3>
              </div>
              <p className="text-xs font-subheading text-stone-600 dark:text-stone-400 leading-relaxed">
                Approved logistics and venue shifts reflect across all active attendee cards within five minutes of organizer input.
              </p>
              <div className="pt-2 border-t border-stone-100 dark:border-stone-800">
                <div className="w-full bg-stone-100 dark:bg-stone-800 h-2 rounded-full overflow-hidden">
                  <div className="bg-coral h-full rounded-full" style={{ width: '95%' }} />
                </div>
                <div className="flex justify-between text-[10px] font-subheading text-stone-400 mt-1">
                  <span>Baseline: 4+ hrs</span>
                  <span className="text-coral font-bold">Goal: &lt;5 mins</span>
                </div>
              </div>
            </div>

            {/* Metric 3 */}
            <div className="p-6 rounded-3xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 shadow-sm space-y-3 relative overflow-hidden">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-heading text-lavender font-bold uppercase tracking-wider">
                  QUERY RELIEF
                </span>
                <span className="text-[11px] font-subheading text-stone-400">Load</span>
              </div>
              <div className="space-y-1">
                <span className="text-4xl sm:text-5xl font-heading text-lavender font-normal block tabular-nums">
                  ≥ 50%
                </span>
                <h3 className="text-sm font-heading font-normal text-charcoal dark:text-white">
                  Query Volume Reduction
                </h3>
              </div>
              <p className="text-xs font-subheading text-stone-600 dark:text-stone-400 leading-relaxed">
                Reduction in repetitive panic calls and frantic WhatsApp inquiries regarding basic timings, room numbers, and passes.
              </p>
              <div className="pt-2 border-t border-stone-100 dark:border-stone-800">
                <div className="w-full bg-stone-100 dark:bg-stone-800 h-2 rounded-full overflow-hidden">
                  <div className="bg-lavender h-full rounded-full" style={{ width: '50%' }} />
                </div>
                <div className="flex justify-between text-[10px] font-subheading text-stone-400 mt-1">
                  <span>Legacy: 100+ calls</span>
                  <span className="text-lavender font-bold">Goal: -50%+</span>
                </div>
              </div>
            </div>

            {/* Metric 4 */}
            <div className="p-6 rounded-3xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 shadow-sm space-y-3 relative overflow-hidden">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-heading text-coral font-bold uppercase tracking-wider">
                  LIFECYCLE RETENTION
                </span>
                <span className="text-[11px] font-subheading text-stone-400">Adoption</span>
              </div>
              <div className="space-y-1">
                <span className="text-4xl sm:text-5xl font-heading text-coral font-normal block tabular-nums">
                  ≥ 90%
                </span>
                <h3 className="text-sm font-heading font-normal text-charcoal dark:text-white">
                  Full-Journey Retention
                </h3>
              </div>
              <p className="text-xs font-subheading text-stone-600 dark:text-stone-400 leading-relaxed">
                Attendees retain and utilize their personal web card link across all five phases: registration, pre-event, live day, and certificate.
              </p>
              <div className="pt-2 border-t border-stone-100 dark:border-stone-800">
                <div className="w-full bg-stone-100 dark:bg-stone-800 h-2 rounded-full overflow-hidden">
                  <div className="bg-coral h-full rounded-full" style={{ width: '90%' }} />
                </div>
                <div className="flex justify-between text-[10px] font-subheading text-stone-400 mt-1">
                  <span>Legacy: Dropped at Form</span>
                  <span className="text-coral font-bold">Goal: 90%+</span>
                </div>
              </div>
            </div>

          </div>

        </section>
      </RevealOnScroll>

      {/* ============================================================= */}
      {/* STEP 5: PROPOSED INTERVENTION IN THE SYSTEM                   */}
      {/* ============================================================= */}
      <RevealOnScroll direction="up">
        <section id="step-5" className="space-y-8 scroll-mt-20">
          
          <div className="space-y-2 border-l-2 border-lavender pl-4">
            <span className="text-xs font-subheading uppercase tracking-widest text-lavender font-bold block">
              Step 5 of 8 · Strategic Systems Shift
            </span>
            <h2 className="text-2xl sm:text-4xl font-heading font-normal text-charcoal dark:text-white tracking-tight">
              Step 5: Proposed Intervention in the System
            </h2>
            <p className="text-stone-600 dark:text-stone-300 text-sm sm:text-base max-w-3xl leading-relaxed font-subheading">
              Why an Attendee-First Architecture? Re-engineering the communication paradigm from monolithic management portals to a unified living card.
            </p>
          </div>

          {/* Strategic Rationale Visual Card */}
          <div className="p-8 sm:p-10 rounded-3xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 shadow-md space-y-8">
            <div className="space-y-2">
              <span className="text-[11px] font-subheading font-bold uppercase tracking-widest text-lavender">
                The Core Strategic Pivot
              </span>
              <h3 className="text-xl sm:text-2xl font-heading font-normal text-charcoal dark:text-white">
                "Because the attendee is the single point where all fragmented information becomes visible."
              </h3>
              <p className="text-xs sm:text-sm font-subheading text-stone-600 dark:text-stone-300 leading-relaxed max-w-3xl">
                Traditional campus software attempts to force faculty, students, and administration into heavy enterprise portals that nobody wants to install. Our proposed intervention inverts the system: instead of replacing human sub-teams, connect their independent outputs into one unified living web card owned by the attendee.
              </p>
            </div>

            {/* The 4 Architectural Pillars (Redesigned with custom data visualization) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="p-5 rounded-2xl bg-stone-50 dark:bg-stone-850 border border-stone-200/80 dark:border-stone-800 space-y-2">
                <div className="w-8 h-8 rounded-xl bg-lavender/10 text-lavender flex items-center justify-center font-heading text-sm">
                  01
                </div>
                <h4 className="text-sm font-heading font-normal text-charcoal dark:text-white">
                  Uses Existing Behaviour
                </h4>
                <p className="text-xs font-subheading text-stone-600 dark:text-stone-400 leading-relaxed">
                  Students already register online, open links, and check phones. The card leverages existing habits instead of forcing unlearned behaviors.
                </p>
                <div className="pt-2 text-[10px] font-subheading text-lavender font-bold">
                  Zero Habit Friction
                </div>
              </div>

              <div className="p-5 rounded-2xl bg-stone-50 dark:bg-stone-850 border border-stone-200/80 dark:border-stone-800 space-y-2">
                <div className="w-8 h-8 rounded-xl bg-coral/10 text-coral flex items-center justify-center font-heading text-sm">
                  02
                </div>
                <h4 className="text-sm font-heading font-normal text-charcoal dark:text-white">
                  Zero App Download
                </h4>
                <p className="text-xs font-subheading text-stone-600 dark:text-stone-400 leading-relaxed">
                  Operates as a lightweight responsive web card. Instant loading even on slow campus Wi-Fi networks without App Store barriers.
                </p>
                <div className="pt-2 text-[10px] font-subheading text-coral font-bold">
                  Instant Web Access
                </div>
              </div>

              <div className="p-5 rounded-2xl bg-stone-50 dark:bg-stone-850 border border-stone-200/80 dark:border-stone-800 space-y-2">
                <div className="w-8 h-8 rounded-xl bg-lavender/10 text-lavender flex items-center justify-center font-heading text-sm">
                  03
                </div>
                <h4 className="text-sm font-heading font-normal text-charcoal dark:text-white">
                  Does Not Replace Teams
                </h4>
                <p className="text-xs font-subheading text-stone-600 dark:text-stone-400 leading-relaxed">
                  Sub-teams retain ownership of their operational slice (PR, logistics, venues). The system harmonizes data without micromanaging volunteers.
                </p>
                <div className="pt-2 text-[10px] font-subheading text-lavender font-bold">
                  Sub-Team Autonomy
                </div>
              </div>

              <div className="p-5 rounded-2xl bg-stone-50 dark:bg-stone-850 border border-stone-200/80 dark:border-stone-800 space-y-2">
                <div className="w-8 h-8 rounded-xl bg-coral/10 text-coral flex items-center justify-center font-heading text-sm">
                  04
                </div>
                <h4 className="text-sm font-heading font-normal text-charcoal dark:text-white">
                  Makes System Visible
                </h4>
                <p className="text-xs font-subheading text-stone-600 dark:text-stone-400 leading-relaxed">
                  Transforms fragmented backstage chaos into one cohesive stream for the attendee, from sign-up through to digital certificate issuance.
                </p>
                <div className="pt-2 text-[10px] font-subheading text-coral font-bold">
                  Complete Transparency
                </div>
              </div>
            </div>

            {/* Macro Architectural Paradigm Shift Diagram */}
            <div className="p-6 rounded-2xl bg-stone-100 dark:bg-stone-850 border border-stone-200 dark:border-stone-800 space-y-4">
              <span className="text-[11px] font-heading text-stone-500 uppercase tracking-wider block">
                The Structural Transformation
              </span>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
                <div className="p-4 rounded-xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 space-y-2">
                  <span className="text-xs font-heading font-bold text-coral">LEGACY FRAGMENTED SYSTEM</span>
                  <div className="space-y-1 text-xs font-subheading text-stone-600 dark:text-stone-400">
                    <p className="line-through text-stone-400">Administration → Faculty → WhatsApp Group → Forward → Attendee</p>
                    <p className="text-stone-500">Result: 4 human hops, lost updates, panic queries, unclosed feedback loop.</p>
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-white dark:bg-stone-900 border-2 border-lavender/40 space-y-2">
                  <span className="text-xs font-heading font-bold text-lavender">EVENT JOURNEY CARD SYSTEM</span>
                  <div className="space-y-1 text-xs font-subheading text-charcoal dark:text-white font-medium">
                    <p className="text-lavender">9 Sub-Teams → Unified Event Database → Living Attendee Card</p>
                    <p className="text-stone-600 dark:text-stone-300 text-xs font-normal">Result: 1 authoritative source, sub-5-minute updates, self-service pass & certificate.</p>
                  </div>
                </div>
              </div>
            </div>

          </div>

        </section>
      </RevealOnScroll>

      {/* ============================================================= */}
      {/* STEP 6: UNDERSTANDING THE SYSTEM AND RESEARCHING ABOUT IT     */}
      {/* ============================================================= */}
      <RevealOnScroll direction="up">
        <section id="step-6" className="space-y-8 scroll-mt-20">
          
          <div className="space-y-2 border-l-2 border-coral pl-4">
            <span className="text-xs font-subheading uppercase tracking-widest text-coral font-bold block">
              Step 6 of 8 · Systems Cartography & Modeling
            </span>
            <h2 className="text-2xl sm:text-4xl font-heading font-normal text-charcoal dark:text-white tracking-tight">
              Step 6: Understanding the System and Researching About It
            </h2>
            <p className="text-stone-600 dark:text-stone-300 text-sm sm:text-base max-w-3xl leading-relaxed font-subheading">
              Redesigning all maps, flows, and analytical charts natively into our project color palette and typography to deconstruct the institutional dynamics of campus academic events.
            </p>
          </div>

          {/* Interactive Cartography Console */}
          <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 shadow-xl space-y-6">
            
            {/* Map Tabs Ribbon */}
            <div className="flex flex-wrap gap-2 p-1.5 rounded-2xl bg-stone-100 dark:bg-stone-850 border border-stone-200 dark:border-stone-800">
              {cartographyMaps.map((mapItem, idx) => (
                <button
                  key={mapItem.id}
                  onClick={() => setActiveMapTab(idx)}
                  className={`px-3.5 py-2 rounded-xl text-xs font-subheading font-medium transition-all cursor-pointer flex items-center gap-1.5 ${
                    activeMapTab === idx
                      ? 'bg-charcoal text-white dark:bg-white dark:text-charcoal shadow-sm'
                      : 'text-stone-600 dark:text-stone-400 hover:text-charcoal dark:hover:text-white'
                  }`}
                >
                  <span className={`font-bold ${activeMapTab === idx ? 'text-coral' : 'text-lavender'}`}>
                    {mapItem.number}
                  </span>
                  <span>{mapItem.title.split(' ')[0]} {mapItem.title.split(' ')[1]}</span>
                </button>
              ))}
            </div>

            {/* Selected Map Showcase Viewport */}
            {(() => {
              const currentMap = cartographyMaps[activeMapTab];
              return (
                <div className="space-y-6 animate-fadeIn">
                  
                  {/* Map Header & Meta */}
                  <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2 border-b border-stone-100 dark:border-stone-800 pb-3">
                    <div>
                      <span className="text-[11px] font-subheading font-bold text-lavender uppercase tracking-wider">
                        {currentMap.badge} · Map {currentMap.number} of 06
                      </span>
                      <h3 className="text-xl sm:text-2xl font-heading font-normal text-charcoal dark:text-white mt-0.5">
                        {currentMap.title}
                      </h3>
                    </div>
                    <span className="text-xs font-subheading text-stone-500">
                      Natively Redesigned Systems Visual
                    </span>
                  </div>

                  {/* NATIVE REDESIGNED MAP CANVAS (According to project colors & typography) */}
                  <div className="p-6 sm:p-8 rounded-2xl bg-stone-50 dark:bg-stone-950 border border-stone-200 dark:border-stone-800 min-h-[380px] flex flex-col justify-center">
                    
                    {/* MAP 01: ECOSYSTEM */}
                    {activeMapTab === 0 && (
                      <div className="space-y-6">
                        <div className="flex items-center justify-between text-xs font-subheading text-stone-500 border-b border-stone-200 dark:border-stone-800 pb-2">
                          <span>INSTITUTIONAL RELATIONAL ECOSYSTEM</span>
                          <span className="text-coral">Signal Transmission Hops: 4 Steps Away</span>
                        </div>
                        
                        <div className="space-y-3">
                          {/* Tier 1 */}
                          <div className="p-4 rounded-xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                            <div className="flex items-center gap-3">
                              <span className="w-7 h-7 rounded-lg bg-stone-100 dark:bg-stone-800 text-stone-600 dark:text-stone-300 flex items-center justify-center font-heading text-xs font-bold">T1</span>
                              <div>
                                <h4 className="text-sm font-heading text-charcoal dark:text-white">University Leadership & Administration</h4>
                                <p className="text-xs font-subheading text-stone-500">Dean of Academics, Registrar, Campus Facilities & Security</p>
                              </div>
                            </div>
                            <span className="text-[11px] font-subheading text-coral font-medium">Authorizes Room & Budget</span>
                          </div>

                          {/* Connector 1 */}
                          <div className="flex justify-center -my-1">
                            <div className="w-0.5 h-4 bg-stone-300 dark:bg-stone-700" />
                          </div>

                          {/* Tier 2 */}
                          <div className="p-4 rounded-xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                            <div className="flex items-center gap-3">
                              <span className="w-7 h-7 rounded-lg bg-stone-100 dark:bg-stone-800 text-stone-600 dark:text-stone-300 flex items-center justify-center font-heading text-xs font-bold">T2</span>
                              <div>
                                <h4 className="text-sm font-heading text-charcoal dark:text-white">Faculty Advisors & Department Mentors</h4>
                                <p className="text-xs font-subheading text-stone-500">Validates Academic Themes, Guest Lecturers & Permissions</p>
                              </div>
                            </div>
                            <span className="text-[11px] font-subheading text-lavender font-medium">Bridges Admin & Students</span>
                          </div>

                          {/* Connector 2 */}
                          <div className="flex justify-center -my-1">
                            <div className="w-0.5 h-4 bg-stone-300 dark:bg-stone-700" />
                          </div>

                          {/* Tier 3 */}
                          <div className="p-4 rounded-xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                            <div className="flex items-center gap-3">
                              <span className="w-7 h-7 rounded-lg bg-lavender/20 text-lavender flex items-center justify-center font-heading text-xs font-bold">T3</span>
                              <div>
                                <h4 className="text-sm font-heading text-charcoal dark:text-white">Core Student Organizing Committee</h4>
                                <p className="text-xs font-subheading text-stone-500">Student President, Secretary & Overall Event Leads</p>
                              </div>
                            </div>
                            <span className="text-[11px] font-subheading text-lavender font-medium">Coordinates 9 Sub-Teams</span>
                          </div>

                          {/* Connector 3 */}
                          <div className="flex justify-center -my-1">
                            <div className="w-0.5 h-4 bg-stone-300 dark:bg-stone-700" />
                          </div>

                          {/* Tier 4 */}
                          <div className="p-4 rounded-xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                            <div className="flex items-center gap-3">
                              <span className="w-7 h-7 rounded-lg bg-stone-100 dark:bg-stone-800 text-stone-600 dark:text-stone-300 flex items-center justify-center font-heading text-xs font-bold">T4</span>
                              <div>
                                <h4 className="text-sm font-heading text-charcoal dark:text-white">Functional Student Sub-Teams</h4>
                                <p className="text-xs font-subheading text-stone-500">Registrations, PR, Venues, Logistics, Tech, Hospitality</p>
                              </div>
                            </div>
                            <span className="text-[11px] font-subheading text-coral font-medium">Executes Ground Tasks</span>
                          </div>

                          {/* Connector 4 */}
                          <div className="flex justify-center -my-1">
                            <div className="w-0.5 h-4 bg-coral/40" />
                          </div>

                          {/* Tier 5 (Outermost) */}
                          <div className="p-4 rounded-xl bg-coral/5 dark:bg-coral/10 border-2 border-coral/30 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                            <div className="flex items-center gap-3">
                              <span className="w-7 h-7 rounded-lg bg-coral text-white flex items-center justify-center font-heading text-xs font-bold">T5</span>
                              <div>
                                <h4 className="text-sm font-heading text-charcoal dark:text-white">Attendees & Delegates (Outermost Ring)</h4>
                                <p className="text-xs font-subheading text-stone-500">Students seeking clear timings, locations, and valid certification</p>
                              </div>
                            </div>
                            <span className="text-[11px] font-subheading text-coral font-bold">Point of Information Dilution</span>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* MAP 02: STAKEHOLDERS POWER/INTEREST GRID */}
                    {activeMapTab === 1 && (
                      <div className="space-y-6">
                        <div className="flex items-center justify-between text-xs font-subheading text-stone-500 border-b border-stone-200 dark:border-stone-800 pb-2">
                          <span>STAKEHOLDER POWER VS. INTEREST MATRIX</span>
                          <span className="text-lavender">Institutional Governance Analysis</span>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          {/* High Power, High Interest */}
                          <div className="p-5 rounded-2xl bg-white dark:bg-stone-900 border-2 border-lavender/40 space-y-2">
                            <div className="flex items-center justify-between">
                              <span className="text-[10px] font-heading font-bold text-lavender uppercase tracking-wider">
                                QUADRANT 1 · MANAGE CLOSELY
                              </span>
                              <span className="text-[10px] font-subheading text-stone-400">High Power / High Interest</span>
                            </div>
                            <h4 className="text-sm font-heading text-charcoal dark:text-white">
                              Core Student Leads & Faculty Mentors
                            </h4>
                            <p className="text-xs font-subheading text-stone-600 dark:text-stone-400 leading-relaxed">
                              Carry full operational accountability for the event's academic and logistical success. Require real-time visibility across all 9 sub-teams.
                            </p>
                          </div>

                          {/* High Power, Low Interest */}
                          <div className="p-5 rounded-2xl bg-white dark:bg-stone-900 border-2 border-coral/40 space-y-2">
                            <div className="flex items-center justify-between">
                              <span className="text-[10px] font-heading font-bold text-coral uppercase tracking-wider">
                                QUADRANT 2 · KEEP SATISFIED
                              </span>
                              <span className="text-[10px] font-subheading text-stone-400">High Power / Low Daily Interest</span>
                            </div>
                            <h4 className="text-sm font-heading text-charcoal dark:text-white">
                              University Administration & Facility Deans
                            </h4>
                            <p className="text-xs font-subheading text-stone-600 dark:text-stone-400 leading-relaxed">
                              Hold absolute veto power over auditorium access and budget clearance, yet lack daily operational context — creating severe upstream bottlenecks.
                            </p>
                          </div>

                          {/* Low Power, High Interest */}
                          <div className="p-5 rounded-2xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 space-y-2">
                            <div className="flex items-center justify-between">
                              <span className="text-[10px] font-heading font-bold text-stone-500 uppercase tracking-wider">
                                QUADRANT 3 · KEEP INFORMED
                              </span>
                              <span className="text-[10px] font-subheading text-stone-400">Low Power / High Interest</span>
                            </div>
                            <h4 className="text-sm font-heading text-charcoal dark:text-white">
                              Student Sub-Teams & Attendees
                            </h4>
                            <p className="text-xs font-subheading text-stone-600 dark:text-stone-400 leading-relaxed">
                              Execute the physical tasks or attend the sessions. Highly invested in accurate schedules, yet have zero power to change administrative delays.
                            </p>
                          </div>

                          {/* Low Power, Low Interest */}
                          <div className="p-5 rounded-2xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 space-y-2">
                            <div className="flex items-center justify-between">
                              <span className="text-[10px] font-heading font-bold text-stone-400 uppercase tracking-wider">
                                QUADRANT 4 · MONITOR
                              </span>
                              <span className="text-[10px] font-subheading text-stone-400">Low Power / Low Interest</span>
                            </div>
                            <h4 className="text-sm font-heading text-charcoal dark:text-white">
                              General Campus Population
                            </h4>
                            <p className="text-xs font-subheading text-stone-600 dark:text-stone-400 leading-relaxed">
                              Non-participating students and staff. Need to know only if auditorium corridors or parking areas are blocked by the symposium.
                            </p>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* MAP 03: 7-PHASE INFORMATION FLOW */}
                    {activeMapTab === 2 && (
                      <div className="space-y-6">
                        <div className="flex items-center justify-between text-xs font-subheading text-stone-500 border-b border-stone-200 dark:border-stone-800 pb-2">
                          <span>7-PHASE CHRONOLOGICAL SERVICE LIFECYCLE</span>
                          <span className="text-coral">Breakdown at Phase 5 & 7</span>
                        </div>

                        <div className="space-y-2.5">
                          {[
                            { num: "P1", name: "Ideation & Theme Definition", owner: "Faculty & Core", status: "Smooth" },
                            { num: "P2", name: "Administrative Approvals & Room Sanction", owner: "Dean Office", status: "Bottleneck Lag", alert: true },
                            { num: "P3", name: "Collateral Design & Campus Teasers", owner: "PR Sub-team", status: "Rushed Window" },
                            { num: "P4", name: "Registration Form Launch", owner: "Tech Sub-team", status: "Form Submitted" },
                            { num: "P5", name: "Pre-Event Communication Vacuum", owner: "None (System Gap)", status: "Severe Dropout", alert: true },
                            { num: "P6", name: "Event Day Execution & Turnstile Check-in", owner: "Hospitality & Venue", status: "Panic Queries" },
                            { num: "P7", name: "Post-Event Certificate Distribution", owner: "Core Team", status: "Unclosed Loop", alert: true },
                          ].map((phase, pIdx) => (
                            <div key={pIdx} className={`p-3 rounded-xl border flex items-center justify-between text-xs font-subheading ${
                              phase.alert 
                                ? 'bg-coral/5 dark:bg-coral/10 border-coral/30' 
                                : 'bg-white dark:bg-stone-900 border-stone-200 dark:border-stone-800'
                            }`}>
                              <div className="flex items-center gap-3">
                                <span className={`w-7 h-7 rounded-lg flex items-center justify-center font-heading text-xs font-bold ${
                                  phase.alert ? 'bg-coral text-white' : 'bg-stone-100 dark:bg-stone-800 text-stone-600 dark:text-stone-300'
                                }`}>
                                  {phase.num}
                                </span>
                                <div>
                                  <h4 className="font-heading text-sm text-charcoal dark:text-white">{phase.name}</h4>
                                  <p className="text-[11px] text-stone-500">Lead: {phase.owner}</p>
                                </div>
                              </div>
                              <span className={`text-[11px] font-bold ${phase.alert ? 'text-coral' : 'text-stone-500'}`}>
                                {phase.status}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* MAP 04: TAXONOMY */}
                    {activeMapTab === 3 && (
                      <div className="space-y-6">
                        <div className="flex items-center justify-between text-xs font-subheading text-stone-500 border-b border-stone-200 dark:border-stone-800 pb-2">
                          <span>EVENT INFORMATION ARCHITECTURE TAXONOMY</span>
                          <span className="text-lavender">Data Classification Layer</span>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                          <div className="p-4 rounded-xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 space-y-2">
                            <span className="text-[10px] font-heading font-bold text-stone-500 uppercase">STATIC PARAMETERS</span>
                            <h4 className="text-sm font-heading text-charcoal dark:text-white">Institutional Constants</h4>
                            <ul className="text-xs font-subheading text-stone-600 dark:text-stone-400 space-y-1">
                              <li>• Event Title & Sub-theme</li>
                              <li>• Eligibility & Department</li>
                              <li>• Registration Fee Policy</li>
                              <li>• Primary Event Date</li>
                            </ul>
                            <div className="text-[10px] font-subheading text-stone-400 pt-2 border-t border-stone-100 dark:border-stone-800">
                              Update Rate: Zero to rare
                            </div>
                          </div>

                          <div className="p-4 rounded-xl bg-white dark:bg-stone-900 border-2 border-coral/30 space-y-2">
                            <span className="text-[10px] font-heading font-bold text-coral uppercase">DYNAMIC PARAMETERS</span>
                            <h4 className="text-sm font-heading text-charcoal dark:text-white">Volatile Logistics</h4>
                            <ul className="text-xs font-subheading text-stone-600 dark:text-stone-400 space-y-1">
                              <li>• Room/Auditorium Relocations</li>
                              <li>• Speaker Delay Announcements</li>
                              <li>• Lunch Slot Timing Shifts</li>
                              <li>• Workshop Prerequisites</li>
                            </ul>
                            <div className="text-[10px] font-subheading text-coral font-bold pt-2 border-t border-stone-100 dark:border-stone-800">
                              Update Rate: Highly volatile
                            </div>
                          </div>

                          <div className="p-4 rounded-xl bg-white dark:bg-stone-900 border-2 border-lavender/30 space-y-2">
                            <span className="text-[10px] font-heading font-bold text-lavender uppercase">ACTIONABLE MODULES</span>
                            <h4 className="text-sm font-heading text-charcoal dark:text-white">Attendee Touchpoints</h4>
                            <ul className="text-xs font-subheading text-stone-600 dark:text-stone-400 space-y-1">
                              <li>• Turnstile QR Check-in Code</li>
                              <li>• Campus Navigation Directions</li>
                              <li>• Live Keynote Q&A Submit</li>
                              <li>• Downloadable PDF Certificate</li>
                            </ul>
                            <div className="text-[10px] font-subheading text-lavender font-bold pt-2 border-t border-stone-100 dark:border-stone-800">
                              Update Rate: User-driven lifecycle
                            </div>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* MAP 05: DEPENDENCIES NETWORK */}
                    {activeMapTab === 4 && (
                      <div className="space-y-6">
                        <div className="flex items-center justify-between text-xs font-subheading text-stone-500 border-b border-stone-200 dark:border-stone-800 pb-2">
                          <span>INTER-TEAM CRITICAL PATH DEPENDENCY GRAPH</span>
                          <span className="text-coral">The Sequential Stalling Effect</span>
                        </div>

                        <div className="p-4 rounded-xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 space-y-4">
                          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 text-xs font-subheading">
                            <div className="p-3 rounded-lg bg-stone-100 dark:bg-stone-800 text-center w-full sm:w-1/4">
                              <span className="font-heading text-xs text-charcoal dark:text-white block">Step A: Admin</span>
                              <span className="text-[10px] text-stone-500">Stamps Room Form</span>
                            </div>
                            <ArrowRight size={16} className="text-stone-400 shrink-0 rotate-90 sm:rotate-0" />
                            <div className="p-3 rounded-lg bg-stone-100 dark:bg-stone-800 text-center w-full sm:w-1/4">
                              <span className="font-heading text-xs text-charcoal dark:text-white block">Step B: Design</span>
                              <span className="text-[10px] text-stone-500">Prints Final Posters</span>
                            </div>
                            <ArrowRight size={16} className="text-stone-400 shrink-0 rotate-90 sm:rotate-0" />
                            <div className="p-3 rounded-lg bg-stone-100 dark:bg-stone-800 text-center w-full sm:w-1/4">
                              <span className="font-heading text-xs text-charcoal dark:text-white block">Step C: PR Team</span>
                              <span className="text-[10px] text-stone-500">Launches Promo Campaign</span>
                            </div>
                            <ArrowRight size={16} className="text-stone-400 shrink-0 rotate-90 sm:rotate-0" />
                            <div className="p-3 rounded-lg bg-coral/10 border border-coral/30 text-center w-full sm:w-1/4 text-coral">
                              <span className="font-heading text-xs font-bold block">Attendee Reach</span>
                              <span className="text-[10px]">Compressed to 48 Hours</span>
                            </div>
                          </div>

                          <p className="text-xs font-subheading text-stone-600 dark:text-stone-400 leading-relaxed border-t border-stone-100 dark:border-stone-800 pt-3">
                            Diagnosis: Because the physical poster must have the exact room printed on it, the entire promotional workflow is locked until administrative bureaucracy concludes. If the room changes later, physical posters cannot be edited.
                          </p>
                        </div>
                      </div>
                    )}

                    {/* MAP 06: OPPORTUNITY MATRIX */}
                    {activeMapTab === 5 && (
                      <div className="space-y-6">
                        <div className="flex items-center justify-between text-xs font-subheading text-stone-500 border-b border-stone-200 dark:border-stone-800 pb-2">
                          <span>PAIN POINT TO OPPORTUNITY INTERVENTION MATRIX</span>
                          <span className="text-lavender">How-Might-We Design Transformations</span>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="p-4 rounded-xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 space-y-2">
                            <span className="text-[10px] font-heading text-coral font-bold uppercase">PAIN POINT: INFORMAL RELAYS</span>
                            <h4 className="text-sm font-heading text-charcoal dark:text-white">Reliance on Key Humans</h4>
                            <p className="text-xs font-subheading text-stone-600 dark:text-stone-400 leading-relaxed">
                              HMW make event logistics resilient to individual absences by establishing an authoritative shared database layer?
                            </p>
                          </div>

                          <div className="p-4 rounded-xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 space-y-2">
                            <span className="text-[10px] font-heading text-lavender font-bold uppercase">PAIN POINT: STATIC MEDIA</span>
                            <h4 className="text-sm font-heading text-charcoal dark:text-white">Frozen Printed Posters</h4>
                            <p className="text-xs font-subheading text-stone-600 dark:text-stone-400 leading-relaxed">
                              HMW decouple static event awareness from dynamic daily logistical updates through permanent web links?
                            </p>
                          </div>

                          <div className="p-4 rounded-xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 space-y-2">
                            <span className="text-[10px] font-heading text-coral font-bold uppercase">PAIN POINT: REGISTRATION VOID</span>
                            <h4 className="text-sm font-heading text-charcoal dark:text-white">Post-Form Silence</h4>
                            <p className="text-xs font-subheading text-stone-600 dark:text-stone-400 leading-relaxed">
                              HMW turn the Google Form submission into the starting point of an engaging, continuous attendee relationship?
                            </p>
                          </div>

                          <div className="p-4 rounded-xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 space-y-2">
                            <span className="text-[10px] font-heading text-lavender font-bold uppercase">PAIN POINT: LOST CERTIFICATES</span>
                            <h4 className="text-sm font-heading text-charcoal dark:text-white">Manual Post-Event Chasing</h4>
                            <p className="text-xs font-subheading text-stone-600 dark:text-stone-400 leading-relaxed">
                              HMW automate verified check-ins and certificate issuance on the exact same card to close the trust loop?
                            </p>
                          </div>
                        </div>
                      </div>
                    )}

                  </div>

                  {/* Summary & Takeaway Banner */}
                  <div className="p-5 rounded-2xl bg-stone-50 dark:bg-stone-850 border border-stone-200 dark:border-stone-800 space-y-2">
                    <div className="flex items-center gap-2 text-lavender text-xs font-subheading font-bold">
                      <Sparkles size={14} />
                      <span>Key Cartographic Finding</span>
                    </div>
                    <p className="text-xs sm:text-sm font-subheading text-stone-700 dark:text-stone-300 leading-relaxed">
                      {currentMap.insight}
                    </p>
                  </div>

                </div>
              );
            })()}

          </div>

        </section>
      </RevealOnScroll>

      {/* ============================================================= */}
      {/* STEP 7: FOUND THE PROBLEM                                     */}
      {/* ============================================================= */}
      <RevealOnScroll direction="up">
        <section id="step-7" className="space-y-8 scroll-mt-20">
          
          <div className="space-y-2 border-l-2 border-lavender pl-4">
            <span className="text-xs font-subheading uppercase tracking-widest text-lavender font-bold block">
              Step 7 of 8 · Structural Discovery Synthesis
            </span>
            <h2 className="text-2xl sm:text-4xl font-heading font-normal text-charcoal dark:text-white tracking-tight">
              Step 7: Found the Problem
            </h2>
            <p className="text-stone-600 dark:text-stone-300 text-sm sm:text-base max-w-3xl leading-relaxed font-subheading">
              Synthesizing research interviews across 5 campus cohorts revealed four specific systemic breakdown patterns that repeatedly cripple academic events.
            </p>
          </div>

          {/* The 4 Problem Areas (Natively Redesigned Breakdown Cards) */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            
            {/* Pattern 01 */}
            <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 space-y-4">
              <div className="flex items-center justify-between">
                <span className="w-9 h-9 rounded-2xl bg-lavender/10 text-lavender flex items-center justify-center font-heading text-sm font-bold">
                  01
                </span>
                <span className="text-[11px] font-subheading text-stone-500 uppercase tracking-wider">
                  Institutional Fragility
                </span>
              </div>
              <h3 className="text-xl font-heading font-normal text-charcoal dark:text-white">
                Dependency on Specific People
              </h3>
              <p className="text-xs sm:text-sm font-subheading text-stone-600 dark:text-stone-300 leading-relaxed">
                Planning runs almost entirely on informal connections, personal relationships, and mental notes rather than documented roles or written guidelines. Because operational knowledge stays locked in the heads of a few individuals, workflows grind to a complete halt whenever a key faculty lead or student coordinator is unavailable.
              </p>
              <div className="p-3 rounded-xl bg-stone-50 dark:bg-stone-850 text-xs font-subheading text-lavender font-medium border border-stone-200/60 dark:border-stone-800">
                Systemic Impact: Single-point bottleneck paralyzes all 9 sub-teams simultaneously.
              </div>
            </div>

            {/* Pattern 02 */}
            <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 space-y-4">
              <div className="flex items-center justify-between">
                <span className="w-9 h-9 rounded-2xl bg-coral/10 text-coral flex items-center justify-center font-heading text-sm font-bold">
                  02
                </span>
                <span className="text-[11px] font-subheading text-stone-500 uppercase tracking-wider">
                  Signal Degradation
                </span>
              </div>
              <h3 className="text-xl font-heading font-normal text-charcoal dark:text-white">
                Important Details Get Scrambled
              </h3>
              <p className="text-xs sm:text-sm font-subheading text-stone-600 dark:text-stone-300 leading-relaxed">
                Event updates travel through an extended human chain: from core teams to faculty coordinators, class representatives, and finally attendees — losing accuracy like a game of telephone. Critical deadlines, schedule shifts, and room changes get buried in noisy personal WhatsApp forwards.
              </p>
              <div className="p-3 rounded-xl bg-stone-50 dark:bg-stone-850 text-xs font-subheading text-coral font-medium border border-stone-200/60 dark:border-stone-800">
                Systemic Impact: 90%+ redundant panic queries flood organizers on event morning.
              </div>
            </div>

            {/* Pattern 03 */}
            <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 space-y-4">
              <div className="flex items-center justify-between">
                <span className="w-9 h-9 rounded-2xl bg-lavender/10 text-lavender flex items-center justify-center font-heading text-sm font-bold">
                  03
                </span>
                <span className="text-[11px] font-subheading text-stone-500 uppercase tracking-wider">
                  Upstream Gatekeeping
                </span>
              </div>
              <h3 className="text-xl font-heading font-normal text-charcoal dark:text-white">
                Delayed Decisions, Rushed Announcements
              </h3>
              <p className="text-xs sm:text-sm font-subheading text-stone-600 dark:text-stone-300 leading-relaxed">
                Organizers cannot announce events until upstream permissions like room bookings, budget sanctions, and guest clearances are signed off by university administration. Because approvals move slowly, promotional windows shrink to days, forcing teams to roll out rushed, incomplete teasers.
              </p>
              <div className="p-3 rounded-xl bg-stone-50 dark:bg-stone-850 text-xs font-subheading text-lavender font-medium border border-stone-200/60 dark:border-stone-800">
                Systemic Impact: Prospective attendees remain hesitant to commit to unconfirmed events.
              </div>
            </div>

            {/* Pattern 04 */}
            <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 space-y-4">
              <div className="flex items-center justify-between">
                <span className="w-9 h-9 rounded-2xl bg-coral/10 text-coral flex items-center justify-center font-heading text-sm font-bold">
                  04
                </span>
                <span className="text-[11px] font-subheading text-stone-500 uppercase tracking-wider">
                  Broken Feedback Loop
                </span>
              </div>
              <h3 className="text-xl font-heading font-normal text-charcoal dark:text-white">
                Communication Drops Off After Registration
              </h3>
              <p className="text-xs sm:text-sm font-subheading text-stone-600 dark:text-stone-300 leading-relaxed">
                The attendee journey abruptly breaks right after submitting a Google Form. Students receive no digital passes, no calendar invites, and no schedule updates. This vacuum creates chaotic on-ground check-ins and leads to weeks of students fruitlessly chasing organizers for missing certificates.
              </p>
              <div className="p-3 rounded-xl bg-stone-50 dark:bg-stone-850 text-xs font-subheading text-coral font-medium border border-stone-200/60 dark:border-stone-800">
                Systemic Impact: Zero institutional memory, broken trust, and high post-event friction.
              </div>
            </div>

          </div>

        </section>
      </RevealOnScroll>

      {/* ============================================================= */}
      {/* STEP 8: MOVE FORWARD TO ALL THOSE CHANGES                     */}
      {/* ============================================================= */}
      <RevealOnScroll direction="up">
        <section id="step-8" className="space-y-12 scroll-mt-20">
          
          <div className="space-y-2 border-l-2 border-coral pl-4">
            <span className="text-xs font-subheading uppercase tracking-widest text-coral font-bold block">
              Step 8 of 8 · Systems Redesign & Implementation
            </span>
            <h2 className="text-2xl sm:text-4xl font-heading font-normal text-charcoal dark:text-white tracking-tight">
              Step 8: Move Forward to All Those Changes
            </h2>
            <p className="text-stone-600 dark:text-stone-300 text-sm sm:text-base max-w-3xl leading-relaxed font-subheading">
              Complete redesign of the Attendee Journey, Updated Information Flow, UI Architecture, Proposed Backend System, and Problem Resolution Matrix.
            </p>
          </div>

          {/* ------------------------------------------------------------- */}
          {/* SUB-SECTION 8.1: REDESIGNED ATTENDEE JOURNEY & FLOW           */}
          {/* ------------------------------------------------------------- */}
          <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 shadow-xl space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2 border-b border-stone-100 dark:border-stone-800 pb-3">
              <div>
                <span className="text-[11px] font-subheading font-bold text-lavender uppercase tracking-wider">
                  Redesign 01 · Service Touchpoint Lifecycle
                </span>
                <h3 className="text-xl sm:text-2xl font-heading font-normal text-charcoal dark:text-white mt-0.5">
                  Attendee Journey & Updated Information Flow
                </h3>
              </div>
              <button
                onClick={() => setViewingImage("/assets/projects/systems-design/journey_card_05.png")}
                className="px-3.5 py-1.5 rounded-xl bg-stone-100 dark:bg-stone-800 hover:bg-lavender hover:text-white transition-all text-xs font-subheading font-medium text-charcoal dark:text-white flex items-center gap-1.5 self-start sm:self-auto cursor-pointer"
              >
                <ZoomIn size={13} />
                <span>Zoom Original Slide</span>
              </button>
            </div>

            {/* Native Redesigned Interactive Phase Selector */}
            <div className="space-y-4 pt-1">
              <div className="flex items-center justify-between">
                <span className="text-xs font-heading font-normal text-charcoal dark:text-white tracking-wider">
                  5-PHASE SERVICE LIFECYCLE MODEL
                </span>
                <span className="text-[11px] font-subheading text-stone-500">
                  Select a phase to inspect touchpoint interactions
                </span>
              </div>

              {/* Phase Buttons */}
              <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
                {journeyPhases.map((phaseItem, idx) => (
                  <button
                    key={phaseItem.phase}
                    onClick={() => setActiveJourneyPhase(idx)}
                    className={`p-3 rounded-2xl text-left border transition-all cursor-pointer ${
                      activeJourneyPhase === idx
                        ? 'border-lavender bg-charcoal text-white dark:bg-white dark:text-charcoal shadow-sm ring-1 ring-lavender/40'
                        : 'border-stone-200 dark:border-stone-800 bg-stone-50 dark:bg-stone-950 text-stone-600 dark:text-stone-400 hover:border-lavender/40'
                    }`}
                  >
                    <span className={`text-[10px] font-heading font-bold block ${activeJourneyPhase === idx ? 'text-coral' : 'text-lavender'}`}>
                      {phaseItem.phase.split(' ')[0]}
                    </span>
                    <span className="text-xs font-subheading font-medium truncate block mt-0.5">
                      {phaseItem.phase.split(' ')[1] || phaseItem.phase.split(' ')[0]}
                    </span>
                  </button>
                ))}
              </div>

              {/* Selected Phase Detail Panel */}
              {(() => {
                const currentPhase = journeyPhases[activeJourneyPhase];
                const IconComponent = currentPhase.icon;
                return (
                  <div className="p-6 rounded-2xl bg-stone-50 dark:bg-stone-850 border border-stone-200 dark:border-stone-800 space-y-4">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-stone-200 dark:border-stone-750 pb-3">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-xl bg-lavender/10 text-lavender flex items-center justify-center">
                          <IconComponent size={18} />
                        </div>
                        <div>
                          <span className="text-[11px] font-subheading font-bold text-lavender uppercase tracking-wider">
                            Phase {activeJourneyPhase + 1} · {currentPhase.role}
                          </span>
                          <h4 className="text-base sm:text-lg font-heading font-normal text-charcoal dark:text-white mt-0.5">
                            {currentPhase.action}
                          </h4>
                        </div>
                      </div>
                      <span className="text-xs font-subheading px-3 py-1 rounded-full bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-700 text-charcoal dark:text-white self-start sm:self-auto font-medium">
                        System State: {currentPhase.state}
                      </span>
                    </div>

                    <ul className="grid grid-cols-1 md:grid-cols-3 gap-3">
                      {currentPhase.details.map((bullet, bIdx) => (
                        <li key={bIdx} className="p-3.5 rounded-xl bg-white dark:bg-stone-900 border border-stone-200/80 dark:border-stone-800 text-xs font-subheading text-stone-700 dark:text-stone-300 leading-relaxed flex items-start gap-2">
                          <CheckCircle2 size={14} className="text-lavender shrink-0 mt-0.5" />
                          <span>{bullet}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                );
              })()}

              {/* NATIVE REDESIGNED CLOSED-LOOP PROPAGATION FLOW (E.g. Room Change) */}
              <div className="p-6 rounded-2xl bg-coral/5 dark:bg-coral/10 border border-coral/30 space-y-4">
                <div className="flex items-center gap-2 text-coral text-xs font-subheading font-bold">
                  <RefreshCw size={15} />
                  <span>The Closed-Loop Change Propagation Pattern</span>
                </div>
                
                <p className="text-xs sm:text-sm font-subheading text-stone-700 dark:text-stone-300 leading-relaxed">
                  Real campus scenario: On event morning, the Keynote Auditorium changes from G-Block AV Room to D-Block Auditorium. Here is how the redesigned system propagates the update without rumors:
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-4 gap-3 pt-1">
                  <div className="p-3 rounded-xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 text-center space-y-1">
                    <span className="text-[10px] font-heading text-coral font-bold block">01 · INPUT</span>
                    <h5 className="text-xs font-heading text-charcoal dark:text-white">Venue Coordinator</h5>
                    <p className="text-[11px] font-subheading text-stone-500">Updates room field in backend portal once</p>
                  </div>

                  <div className="p-3 rounded-xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 text-center space-y-1">
                    <span className="text-[10px] font-heading text-lavender font-bold block">02 · SYNC</span>
                    <h5 className="text-xs font-heading text-charcoal dark:text-white">Central Database</h5>
                    <p className="text-[11px] font-subheading text-stone-500">Updates single source of truth in &lt;1 second</p>
                  </div>

                  <div className="p-3 rounded-xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 text-center space-y-1">
                    <span className="text-[10px] font-heading text-coral font-bold block">03 · BROADCAST</span>
                    <h5 className="text-xs font-heading text-charcoal dark:text-white">Priority Push Alert</h5>
                    <p className="text-[11px] font-subheading text-stone-500">Auto-sends WhatsApp/SMS text banner</p>
                  </div>

                  <div className="p-3 rounded-xl bg-white dark:bg-stone-900 border-2 border-lavender/40 text-center space-y-1">
                    <span className="text-[10px] font-heading text-lavender font-bold block">04 · CARD REFRESH</span>
                    <h5 className="text-xs font-heading text-charcoal dark:text-white">Attendee Card</h5>
                    <p className="text-[11px] font-subheading text-lavender font-medium">Room badge displays "D-Block Auditorium"</p>
                  </div>
                </div>
              </div>

            </div>
          </div>

          {/* ------------------------------------------------------------- */}
          {/* SUB-SECTION 8.2: REDESIGNED UI SPEC & INTERFACE PROTOTYPE    */}
          {/* ------------------------------------------------------------- */}
          <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 shadow-xl space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2 border-b border-stone-100 dark:border-stone-800 pb-3">
              <div>
                <span className="text-[11px] font-subheading font-bold text-coral uppercase tracking-wider">
                  Redesign 02 · Interface Architecture
                </span>
                <h3 className="text-xl sm:text-2xl font-heading font-normal text-charcoal dark:text-white mt-0.5">
                  5-Level Progressive UI Architecture & Live Card Experience
                </h3>
              </div>
              <button
                onClick={() => setViewingImage("/assets/projects/systems-design/journey_card_06.png")}
                className="px-3.5 py-1.5 rounded-xl bg-stone-100 dark:bg-stone-800 hover:bg-coral hover:text-white transition-all text-xs font-subheading font-medium text-charcoal dark:text-white flex items-center gap-1.5 self-start sm:self-auto cursor-pointer"
              >
                <ZoomIn size={13} />
                <span>Zoom Original Slide</span>
              </button>
            </div>

            {/* 5-Level Architecture Breakdown Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-5 gap-3">
              <div className="p-4 rounded-2xl bg-stone-50 dark:bg-stone-850 border border-stone-200/80 dark:border-stone-800 space-y-1">
                <span className="text-[10px] font-heading font-bold text-lavender">LEVEL 01</span>
                <h4 className="text-xs font-subheading font-bold text-charcoal dark:text-white">Identity</h4>
                <p className="text-[11px] font-subheading text-stone-500 leading-tight">Name & verified attendee status</p>
              </div>

              <div className="p-4 rounded-2xl bg-stone-50 dark:bg-stone-850 border border-stone-200/80 dark:border-stone-800 space-y-1">
                <span className="text-[10px] font-heading font-bold text-coral">LEVEL 02</span>
                <h4 className="text-xs font-subheading font-bold text-charcoal dark:text-white">Core Details</h4>
                <p className="text-[11px] font-subheading text-stone-500 leading-tight">Date, time, venue & QR check-in</p>
              </div>

              <div className="p-4 rounded-2xl bg-stone-50 dark:bg-stone-850 border border-stone-200/80 dark:border-stone-800 space-y-1">
                <span className="text-[10px] font-heading font-bold text-lavender">LEVEL 03</span>
                <h4 className="text-xs font-subheading font-bold text-charcoal dark:text-white">Journey Info</h4>
                <p className="text-[11px] font-subheading text-stone-500 leading-tight">Schedule, speaker bios, dress code</p>
              </div>

              <div className="p-4 rounded-2xl bg-stone-50 dark:bg-stone-850 border border-stone-200/80 dark:border-stone-800 space-y-1">
                <span className="text-[10px] font-heading font-bold text-coral">LEVEL 04</span>
                <h4 className="text-xs font-subheading font-bold text-charcoal dark:text-white">Live Updates</h4>
                <p className="text-[11px] font-subheading text-stone-500 leading-tight">Dynamic broadcast alert banners</p>
              </div>

              <div className="p-4 rounded-2xl bg-stone-50 dark:bg-stone-850 border border-stone-200/80 dark:border-stone-800 space-y-1">
                <span className="text-[10px] font-heading font-bold text-lavender">LEVEL 05</span>
                <h4 className="text-xs font-subheading font-bold text-charcoal dark:text-white">Post-Event</h4>
                <p className="text-[11px] font-subheading text-stone-500 leading-tight">Attendance stamp & PDF certificate</p>
              </div>
            </div>

            {/* NATIVE HIGH-FIDELITY EVENT JOURNEY CARD PROTOTYPE */}
            <div className="space-y-4 pt-2">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-stone-100 dark:border-stone-800 pb-2">
                <div>
                  <span className="text-xs font-heading text-charcoal dark:text-white tracking-wider">
                    INTERACTIVE EVENT JOURNEY CARD EXPERIENCE
                  </span>
                  <p className="text-[11px] font-subheading text-stone-500">
                    Switch states to observe progressive disclosure across the event lifecycle
                  </p>
                </div>

                {/* State Toggle Buttons */}
                <div className="flex items-center gap-1.5 p-1 rounded-xl bg-stone-100 dark:bg-stone-800 self-start sm:self-auto">
                  <button
                    onClick={() => setCardSimulationState('pre')}
                    className={`px-3 py-1 rounded-lg text-xs font-subheading transition-all cursor-pointer ${
                      cardSimulationState === 'pre'
                        ? 'bg-charcoal text-white dark:bg-white dark:text-charcoal font-bold shadow-sm'
                        : 'text-stone-500 hover:text-charcoal dark:hover:text-white'
                    }`}
                  >
                    Pre-Event
                  </button>
                  <button
                    onClick={() => setCardSimulationState('live')}
                    className={`px-3 py-1 rounded-lg text-xs font-subheading transition-all cursor-pointer ${
                      cardSimulationState === 'live'
                        ? 'bg-coral text-white font-bold shadow-sm'
                        : 'text-stone-500 hover:text-charcoal dark:hover:text-white'
                    }`}
                  >
                    Live Event Day
                  </button>
                  <button
                    onClick={() => setCardSimulationState('post')}
                    className={`px-3 py-1 rounded-lg text-xs font-subheading transition-all cursor-pointer ${
                      cardSimulationState === 'post'
                        ? 'bg-lavender text-white font-bold shadow-sm'
                        : 'text-stone-500 hover:text-charcoal dark:hover:text-white'
                    }`}
                  >
                    Post-Event
                  </button>
                </div>
              </div>

              {/* Mobile Card Mockup Viewport */}
              <div className="max-w-md mx-auto p-5 sm:p-6 rounded-3xl bg-stone-900 text-white shadow-2xl border border-stone-800 space-y-4 relative">
                
                {/* Level 01: Identity Header */}
                <div className="flex items-center justify-between border-b border-stone-800 pb-3">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-full bg-lavender flex items-center justify-center font-heading text-xs text-white font-bold">
                      TS
                    </div>
                    <div>
                      <h5 className="text-sm font-heading tracking-wide">Hi, Tanya Sharma</h5>
                      <span className="text-[10px] font-subheading text-stone-400">UID: DES-2026-4821</span>
                    </div>
                  </div>
                  <span className="text-[10px] font-subheading px-2.5 py-0.5 rounded-full bg-lavender/20 text-lavender border border-lavender/30 font-medium">
                    Verified Delegate
                  </span>
                </div>

                {/* Level 04 (Live State Only): Emergency Alert Banner */}
                {cardSimulationState === 'live' && (
                  <div className="p-3 rounded-xl bg-coral/20 border border-coral text-coral space-y-0.5 animate-pulse">
                    <div className="flex items-center gap-1.5 text-xs font-heading font-bold">
                      <AlertCircle size={14} />
                      <span>LIVE BROADCAST: VENUE RELOCATION</span>
                    </div>
                    <p className="text-[11px] font-subheading text-white leading-tight">
                      Keynote shifted to <strong>D-Block Auditorium</strong>. Turnstile entry at Gate 3.
                    </p>
                  </div>
                )}

                {/* Level 02: Core Event Details */}
                <div className="p-4 rounded-2xl bg-stone-800/80 border border-stone-700/60 space-y-3">
                  <div>
                    <span className="text-[10px] font-heading text-coral uppercase tracking-wider block">
                      CAMPUS DESIGN SYMPOSIUM 2026
                    </span>
                    <h4 className="text-base font-heading font-normal">
                      Systems & Service Futures
                    </h4>
                  </div>

                  <div className="grid grid-cols-2 gap-2 text-xs font-subheading text-stone-300">
                    <div className="flex items-center gap-1.5">
                      <Calendar size={13} className="text-lavender shrink-0" />
                      <span>Oct 24, 2026</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Clock size={13} className="text-coral shrink-0" />
                      <span>09:30 AM IST</span>
                    </div>
                    <div className="flex items-center gap-1.5 col-span-2">
                      <MapPin size={13} className="text-lavender shrink-0" />
                      <span>D-Block Auditorium (Gate 3 Entry)</span>
                    </div>
                  </div>

                  {/* QR Pass */}
                  <div className="p-3 rounded-xl bg-stone-900 border border-stone-700 flex items-center justify-between">
                    <div className="space-y-0.5">
                      <span className="text-[10px] font-heading text-stone-400 block">TURNSTILE FAST-PASS</span>
                      <span className="text-xs font-mono text-stone-300">#PASS-8842-DS</span>
                    </div>
                    <div className="w-12 h-12 bg-white rounded-lg p-1 flex items-center justify-center">
                      <QrCode size={38} className="text-black" />
                    </div>
                  </div>
                </div>

                {/* Level 03 / 05 Content based on state */}
                {cardSimulationState === 'pre' && (
                  <div className="p-3.5 rounded-xl bg-stone-800/60 border border-stone-700/40 space-y-2">
                    <span className="text-[10px] font-heading text-lavender font-bold uppercase">PRE-EVENT PREPARATION</span>
                    <ul className="text-xs font-subheading text-stone-300 space-y-1">
                      <li>✓ Laptop required for afternoon UI workshop</li>
                      <li>✓ Student ID card mandatory for main campus turnstiles</li>
                      <li>✓ Free parking allocated at South Gate Lot B</li>
                    </ul>
                  </div>
                )}

                {cardSimulationState === 'live' && (
                  <div className="p-3.5 rounded-xl bg-stone-800/60 border border-stone-700/40 space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-heading text-coral font-bold uppercase">LIVE SCHEDULE NOW</span>
                      <span className="text-[10px] font-subheading text-stone-400">10:15 AM</span>
                    </div>
                    <div className="p-2.5 rounded-lg bg-stone-900 border border-stone-700 space-y-1">
                      <div className="flex items-center justify-between text-xs">
                        <span className="font-heading text-white">Opening Keynote: Institutional Scale</span>
                        <span className="text-[10px] text-coral font-bold">IN PROGRESS</span>
                      </div>
                      <p className="text-[11px] font-subheading text-stone-400">Dr. Rajesh Varma · Main Stage</p>
                    </div>
                  </div>
                )}

                {cardSimulationState === 'post' && (
                  <div className="p-3.5 rounded-xl bg-lavender/10 border border-lavender/30 space-y-2.5">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-heading text-lavender font-bold uppercase">FULFILLMENT COMPLETE</span>
                      <span className="text-[10px] font-subheading text-stone-400">Verified Oct 24</span>
                    </div>
                    <div className="p-3 rounded-xl bg-stone-900 border border-stone-700 flex items-center justify-between">
                      <div>
                        <h6 className="text-xs font-heading text-white">Official Certificate of Attendance</h6>
                        <span className="text-[10px] font-subheading text-stone-400">Digitally Stamped & Verified</span>
                      </div>
                      <button className="px-3 py-1.5 rounded-lg bg-lavender text-white text-xs font-subheading font-medium flex items-center gap-1 hover:bg-lavender/90">
                        <FileText size={12} />
                        <span>Download PDF</span>
                      </button>
                    </div>
                  </div>
                )}

                <div className="text-center pt-1">
                  <span className="text-[10px] font-subheading text-stone-500">
                    Event Journey Card · Single Permanent URL · No App Required
                  </span>
                </div>

              </div>
            </div>

          </div>

          {/* ------------------------------------------------------------- */}
          {/* SUB-SECTION 8.3: REDESIGNED PROPOSED BACKEND ARCHITECTURE     */}
          {/* ------------------------------------------------------------- */}
          <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 shadow-xl space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2 border-b border-stone-100 dark:border-stone-800 pb-3">
              <div>
                <span className="text-[11px] font-subheading font-bold text-lavender uppercase tracking-wider">
                  Redesign 03 · Macro Pipeline Architecture
                </span>
                <h3 className="text-xl sm:text-2xl font-heading font-normal text-charcoal dark:text-white mt-0.5">
                  Proposed Multi-Team Ingestion & Distribution Backend
                </h3>
              </div>
              <button
                onClick={() => setViewingImage("/assets/projects/systems-design/journey_card_07.png")}
                className="px-3.5 py-1.5 rounded-xl bg-stone-100 dark:bg-stone-800 hover:bg-lavender hover:text-white transition-all text-xs font-subheading font-medium text-charcoal dark:text-white flex items-center gap-1.5 self-start sm:self-auto cursor-pointer"
              >
                <ZoomIn size={13} />
                <span>Zoom Original Slide</span>
              </button>
            </div>

            {/* Native Redesigned Pipeline Diagram */}
            <div className="p-6 rounded-2xl bg-stone-50 dark:bg-stone-950 border border-stone-200 dark:border-stone-800 space-y-6">
              <span className="text-[11px] font-heading text-stone-400 dark:text-stone-500 uppercase tracking-widest block">
                THREE-TIER SYSTEM PIPELINE
              </span>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                
                {/* Stage 1 */}
                <div className="p-5 rounded-2xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 space-y-3">
                  <div className="flex items-center gap-2">
                    <span className="w-6 h-6 rounded-lg bg-stone-100 dark:bg-stone-800 text-stone-600 dark:text-stone-300 flex items-center justify-center font-heading text-xs font-bold">1</span>
                    <span className="text-xs font-heading font-bold text-charcoal dark:text-white">9 Sub-Team Inputs</span>
                  </div>
                  <p className="text-xs font-subheading text-stone-600 dark:text-stone-400 leading-relaxed">
                    Modular submission views. Teams edit only their specific scope:
                  </p>
                  <ul className="text-[11px] font-subheading text-stone-500 space-y-1">
                    <li>• Venue Team → Room & building mappings</li>
                    <li>• Program Team → Live schedule & speaker bios</li>
                    <li>• Registration Team → Form & delegate status</li>
                    <li>• Hospitality Team → Check-in & lunch badges</li>
                  </ul>
                  <div className="text-[10px] font-subheading text-lavender font-medium pt-1">
                    Output: Validated JSON updates
                  </div>
                </div>

                {/* Stage 2 */}
                <div className="p-5 rounded-2xl bg-white dark:bg-stone-900 border-2 border-lavender/40 space-y-3">
                  <div className="flex items-center gap-2">
                    <span className="w-6 h-6 rounded-lg bg-lavender text-white flex items-center justify-center font-heading text-xs font-bold">2</span>
                    <span className="text-xs font-heading font-bold text-lavender">Central Event Database</span>
                  </div>
                  <p className="text-xs font-subheading text-stone-600 dark:text-stone-400 leading-relaxed">
                    The single authoritative source of truth:
                  </p>
                  <ul className="text-[11px] font-subheading text-stone-500 space-y-1">
                    <li>• Relational state machine & version log</li>
                    <li>• Real-time webhook change listeners</li>
                    <li>• Permission verification & admin audit trail</li>
                    <li>• Automated PDF certificate generation engine</li>
                  </ul>
                  <div className="text-[10px] font-subheading text-lavender font-bold pt-1">
                    Latency: &lt;1 second database sync
                  </div>
                </div>

                {/* Stage 3 */}
                <div className="p-5 rounded-2xl bg-white dark:bg-stone-900 border-2 border-coral/40 space-y-3">
                  <div className="flex items-center gap-2">
                    <span className="w-6 h-6 rounded-lg bg-coral text-white flex items-center justify-center font-heading text-xs font-bold">3</span>
                    <span className="text-xs font-heading font-bold text-coral">Attendee Cards & Dispatch</span>
                  </div>
                  <p className="text-xs font-subheading text-stone-600 dark:text-stone-400 leading-relaxed">
                    Multi-channel push and pull delivery:
                  </p>
                  <ul className="text-[11px] font-subheading text-stone-500 space-y-1">
                    <li>• Instant SSR web card rendering</li>
                    <li>• WhatsApp & SMS high-priority notifications</li>
                    <li>• Live client SSE (Server-Sent Events) auto-refresh</li>
                    <li>• One-click PDF download & verification</li>
                  </ul>
                  <div className="text-[10px] font-subheading text-coral font-bold pt-1">
                    Reach: 100% of registered attendees
                  </div>
                </div>

              </div>
            </div>
          </div>

          {/* ------------------------------------------------------------- */}
          {/* SUB-SECTION 8.4: REDESIGNED PROBLEM VS. RESOLUTION MATRIX     */}
          {/* ------------------------------------------------------------- */}
          <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 shadow-xl space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2 border-b border-stone-100 dark:border-stone-800 pb-3">
              <div>
                <span className="text-[11px] font-subheading font-bold text-coral uppercase tracking-wider">
                  Redesign 04 · Comparative Impact Analysis
                </span>
                <h3 className="text-xl sm:text-2xl font-heading font-normal text-charcoal dark:text-white mt-0.5">
                  Systemic Problem vs. Resolution Matrix
                </h3>
              </div>
              <button
                onClick={() => setViewingImage("/assets/projects/systems-design/journey_card_08.png")}
                className="px-3.5 py-1.5 rounded-xl bg-stone-100 dark:bg-stone-800 hover:bg-coral hover:text-white transition-all text-xs font-subheading font-medium text-charcoal dark:text-white flex items-center gap-1.5 self-start sm:self-auto cursor-pointer"
              >
                <ZoomIn size={13} />
                <span>Zoom Original Slide</span>
              </button>
            </div>

            {/* Systematic Resolution Table */}
            <div className="overflow-x-auto pt-1">
              <table className="w-full text-left border-collapse text-xs font-subheading">
                <thead>
                  <tr className="border-b border-stone-200 dark:border-stone-800 text-[11px] font-bold text-stone-400 uppercase tracking-wider">
                    <th className="py-3 pr-4 font-subheading w-1/3 text-coral">Existing Campus Breakdown</th>
                    <th className="py-3 pl-4 font-subheading w-2/3 text-lavender">How Event Journey Card Resolves It</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-stone-100 dark:divide-stone-850">
                  <tr>
                    <td className="py-4 pr-4 font-medium text-charcoal dark:text-white align-top">
                      Dependency on specific people
                    </td>
                    <td className="py-4 pl-4 text-stone-600 dark:text-stone-300 leading-relaxed align-top">
                      Attendees no longer need to track down a particular organizer or faculty lead for answers. All critical logistical information is accessible directly through their permanent personal web card link.
                    </td>
                  </tr>
                  <tr>
                    <td className="py-4 pr-4 font-medium text-charcoal dark:text-white align-top">
                      Important details get scrambled
                    </td>
                    <td className="py-4 pl-4 text-stone-600 dark:text-stone-300 leading-relaxed align-top">
                      Information from all 9 sub-teams is unified into one structured event database instead of being scattered across unverified WhatsApp group forwards, circulars, and word-of-mouth.
                    </td>
                  </tr>
                  <tr>
                    <td className="py-4 pr-4 font-medium text-charcoal dark:text-white align-top">
                      Delayed decisions & rushed announcements
                    </td>
                    <td className="py-4 pl-4 text-stone-600 dark:text-stone-300 leading-relaxed align-top">
                      When an important parameter changes on event morning, the responsible sub-team updates the central database once. The update propagates to all attendee cards in under 5 minutes.
                    </td>
                  </tr>
                  <tr>
                    <td className="py-4 pr-4 font-medium text-charcoal dark:text-white align-top">
                      Communication drops off after registration
                    </td>
                    <td className="py-4 pl-4 text-stone-600 dark:text-stone-300 leading-relaxed align-top">
                      Registration becomes the beginning of the attendee journey rather than the end. The attendee receives continuous guidance before the event, live updates during, and automatic PDF certificate fulfillment after.
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

          </div>

        </section>
      </RevealOnScroll>

      {/* ============================================================= */}
      {/* FINAL REFLECTION: DESIGN TAKEAWAYS (NO THANK YOU SLIDE)       */}
      {/* ============================================================= */}
      <RevealOnScroll direction="up">
        <section className="space-y-8 pt-4">
          
          <div className="space-y-2 border-l-2 border-lavender pl-4">
            <span className="text-xs font-subheading uppercase tracking-widest text-lavender font-bold block">
              Systems Design Synthesis
            </span>
            <h2 className="text-2xl sm:text-4xl font-heading font-normal text-charcoal dark:text-white tracking-tight">
              Service Systems Reflection & Takeaways
            </h2>
            <p className="text-stone-600 dark:text-stone-300 text-sm sm:text-base max-w-3xl leading-relaxed font-subheading">
              Final thoughts on designing for institutional environments and how systems empathy creates resilient communication cultures.
            </p>
          </div>

          {/* 3 Core Designer Takeaways */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            <div className="p-6 rounded-3xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 space-y-2.5">
              <span className="text-xs font-heading text-lavender font-bold">TAKEAWAY 01</span>
              <h4 className="text-base font-heading font-normal text-charcoal dark:text-white">
                Respect Organic Campus Ecosystems
              </h4>
              <p className="text-xs font-subheading text-stone-600 dark:text-stone-300 leading-relaxed">
                Systems fail when they demand radical, top-down behavioral shifts. Delivering featherweight mobile links over existing messaging channels ensures 100% reach without app-store friction.
              </p>
            </div>

            <div className="p-6 rounded-3xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 space-y-2.5">
              <span className="text-xs font-heading text-coral font-bold">TAKEAWAY 02</span>
              <h4 className="text-base font-heading font-normal text-charcoal dark:text-white">
                Empower Sub-teams Through Modularity
              </h4>
              <p className="text-xs font-subheading text-stone-600 dark:text-stone-300 leading-relaxed">
                Rather than attempting to eliminate human student coordinators, good systems design protects their autonomy by providing clear boundaries of operational ownership within a shared data model.
              </p>
            </div>

            <div className="p-6 rounded-3xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 space-y-2.5">
              <span className="text-xs font-heading text-lavender font-bold">TAKEAWAY 03</span>
              <h4 className="text-base font-heading font-normal text-charcoal dark:text-white">
                The Service Loop Closes at Verification
              </h4>
              <p className="text-xs font-subheading text-stone-600 dark:text-stone-300 leading-relaxed">
                An event experience does not terminate when attendees leave the auditorium. Automating attendance verification and one-click certificate fulfillment completes the institutional trust loop.
              </p>
            </div>
          </div>

        </section>
      </RevealOnScroll>

    </article>
  );
};

export default SystemsDesignCaseStudy;
