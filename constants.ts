import { Project, SkillCategory, ExperienceItem, EducationItem, VolunteeringItem, ReferenceItem, AchievementItem } from './types';

export const PERSONAL_INFO = {
  name: "Anushka Saraf",
  title: "Communication Designer",
  phone: "+91 91632 03810",
  email: "anushka.saraf.505@gmail.com",
  linkedin: "anushkasaraf",
  linkedinUrl: "https://www.linkedin.com/in/anushkasaraf5/",
  introQuote: "Curiosity is where my approach to design begins.",
  introBio: "Somewhere between overthinking an idea and wondering why things are the way they are, I find the beginnings of something worth creating. I'm drawn to unexpected connections, overlooked details, and possibilities that aren't immediately obvious. Design gives me a way to bring those thoughts to life, while AI lets me push them further and explore where they might lead.",
  introClosing: "I'm here to keep learning, keep creating, and keep asking, \"What if?\"",
  philosophy: "Somewhere between overthinking an idea and wondering why things are the way they are, I find the beginnings of something worth creating. I'm drawn to unexpected connections, overlooked details, and possibilities that aren't immediately obvious. Design gives me a way to bring those thoughts to life, while AI lets me push them further and explore where they might lead.",
  socials: {
    linkedin: "https://www.linkedin.com/in/anushkasaraf5/",
  }
};

export const SKILL_CATEGORIES: SkillCategory[] = [
  {
    title: "Technical",
    iconName: "Layout",
    skills: [
      { name: "SaaS Interface Design" },
      { name: "User Centric Design" },
      { name: "User Interface (UI) Design" },
      { name: "Visual Hierarchy & Layout Design" },
      { name: "Typography & Colour Theory" },
      { name: "Responsive Interface Design" },
      { name: "Grid Systems & Spacing" },
      { name: "Interaction Design" },
      { name: "User Journey Mapping" },
      { name: "Information Architecture" },
      { name: "User Flows & Task Flows" },
      { name: "Wireframing" },
      { name: "Low and High-Fidelity Prototyping" },
      { name: "Design Systems" },
      { name: "Interactive Prototyping" },
      { name: "Competitor Analysis" },
      { name: "User Persona Development" },
      { name: "Affinity Mapping" },
      { name: "Dashboard Design" }
    ]
  },
  {
    title: "Soft competencies",
    iconName: "HeartHandshake",
    skills: [
      { name: "Critical Thinking" },
      { name: "Analytical Thinking" },
      { name: "Time Management" },
      { name: "Leadership" },
      { name: "Team Coordination" }
    ]
  },
  {
    title: "Software",
    iconName: "PenTool",
    skills: [
      { name: "Figma" },
      { name: "Framer" },
      { name: "Wordpress" },
      { name: "HTML & CSS" },
      { name: "Adobe Photoshop" },
      { name: "Adobe Illustrator" }
    ]
  },
  {
    title: "AI & Generative Tools",
    iconName: "Sparkles",
    skills: [
      { name: "ChatGPT" },
      { name: "Gemini" },
      { name: "Claude" },
      { name: "Google AI Studio" },
      { name: "Canva AI" },
      { name: "Figma make" },
      { name: "Stitch" },
      { name: "Lovable" },
      { name: "Leonardo AI" },
      { name: "Adobe Firefly" },
      { name: "Eleven Labs" },
      { name: "Notebook LM" }
    ]
  }
];

export const PROJECTS: Project[] = [
  {
    id: "6",
    title: "Visual Transformation",
    category: "Lettering",
    date: "October, 2025",
    description: "A freehand alphabet inspired by nature—drawing from the forms, textures, and growth patterns of trees, plants, vines, or fungi.",
    thumbnailUrl: "https://i.ibb.co/S488Nw33/Gemini-Generated-Image-ey47fwey47fwey47.png",
    details: {
      overview: "Fuchsia is a genus of flowering shrubs and small trees native to Central and South America. Known for their pendulous, ballerina-like blossoms in striking red and purple hues, these plants thrive in cool, shaded, and moist environments. Beyond their beauty, fuchsias symbolize delicacy, elegance, and confiding love.",
      problem: "The challenge was to create a freehand alphabet or font inspired by nature, letting letterforms reflect organic structure and express a chosen theme or emotion through their flow and character.",
      process: "The design process involved translating the biological traits of the Fuchsia plant into typographic forms. From the bell-shaped blossoms to the lance-shaped leaves, every curve mimics organic plant growth.",
      processSteps: [
        { title: "Organic Structure", description: "Drawing from the forms, textures, and growth patterns of trees, plants, vines, or fungi to create a cohesive alphabet." },
        { title: "Fuchsia Inspiration", description: "Analyzing the pendulous, ballerina-like blossoms and their striking red and purple hues to inform the color palette and form." },
        { title: "Anatomy Translation", description: "Translating features like 'drooping buds', 'succulent texture', and 'juicy interior' into letter strokes." },
        { title: "Rhythmic Variation", description: "Creating rhythmic variation to avoid monotony, expressing depth and the layered anatomy of a fuchsia bloom." },
        { title: "Continuous Flow", description: "Using continuous curves to mimic organic plant growth, with twisting branches topped with buds capturing the plant's cascading nature." }
      ],
      conceptNote: "VIVUS, meaning “alive,” is a typeface inspired by the fuchsia flower’s grace and vitality. Its soft yet structured forms reflect harmony between resilience and elegance, using vibrant hues of pink, purple, and green to express growth and transformation.",
      outcome: "A unique typeface 'VIVUS' that captures the essence of the Fuchsia flower. The dual-petal structure hints at an open flower, while the simplest petal gives visual breathing space. The result is a design that is not just a font, but a reflection of organic life.",
      gallery: [
    "https://i.ibb.co/5hpzVw00/assignment-1-13.jpg",
    "https://i.ibb.co/4whQzC5L/assignment-1-16.jpg",
    "https://i.ibb.co/cSgvXp1d/assignment-1-15.jpg",
    "https://i.ibb.co/HL2L9qbN/assignment-1-14.jpg"
       ]
    }
  },  
  {
    id: "1",
    title: "Type & Emotion",
    category: "UX Research",
    date: "August, 2025",
    description: "A research case study on cross-generational emotional responses to multilingual script variations across 47 participants, examining Marwari, Bengali, Telugu, and Tamil typography.",
    thumbnailUrl: "/assets/behance_poster_mockup.jpg",
    details: {
      overview: "An empirical design research study exploring how script variations in multilingual design shape emotional responses across different age groups. Examining Marwari, Bengali, Telugu, and Tamil scripts across 47 participants, this study investigates generational interpretation, abstraction tolerance, and cultural resonance.",
      problem: "There is a lack of empirical understanding of how script variations in multilingual design shape emotional responses across different age groups. Designers often make typographic choices without insight into how these resonate culturally or emotionally, which can lead to disengagement or miscommunication.",
      process: "A quantitative and qualitative study utilizing 4 expressive typographic stimuli without imagery or icons, capturing participant emotional interpretations across 18–25, 26–45, and 46+ age cohorts through Likert and open-ended surveys.",
      processSteps: [
        { title: "01. Research Problem & Objectives", description: "Formulating core inquiries on how script variations emotionally impact diverse generational groups in multilingual contexts." },
        { title: "02. Expressive Script Stimuli", description: "Crafting 4 typographic specimens conveying conceptual messages purely through script form in Marwari, Bengali, Telugu, and Tamil." },
        { title: "03. Stratified Survey (N=47)", description: "Testing emotional interpretations across three age groups: 18–25 (Youth, 70.2%), 26–45 (Middle-aged, 14.9%), and 46+ (Older adults, 14.9%)." },
        { title: "04. Generational & Thematic Analysis", description: "Mapping participant selections across emotional axes: introspection vs. neutrality, symbolism vs. surface, and emotional vs. technical descriptors." },
        { title: "05. Inclusive Typography Poster Deliverable", description: "Synthesizing multi-script integration, typographic emotion mapping, and textured typography into an architectural research poster." }
      ],
      gallery: [
        "/assets/behance_poster_mockup.jpg",
        "/poster_preview.jpg",
        "/assets/aistudio/WhatsApp_Image_2026-11-02_at_10.32.25__1__70aae0e4.jpeg",
        "/assets/aistudio/WhatsApp_Image_2026-11-02_at_10.32.26__2__e6543967.jpeg",
        "/assets/aistudio/WhatsApp_Image_2026-11-02_at_10.32.26__3__d983e353.jpeg",
        "/assets/aistudio/WhatsApp_Image_2026-11-03_at_14.24.26_8cdef135.jpeg"
      ]
    }
  },
  {
    id: "3",
    title: "Event Journey Card: Academic Event System",
    category: "Systems Design",
    date: "September, 2026",
    description: "A comprehensive systems and service design case study diagnosing academic event coordination breakdowns and creating the 'Event Journey Card'—an attendee-first, real-time digital ecosystem connecting administration, organizers, and students.",
    thumbnailUrl: "/assets/projects/systems-design/journey_card_06.png",
    details: {
      overview: "Campus academic events (symposiums, design conferences, workshops) involve complex backstage chain reactions across college authorities, faculty, student sub-teams, and attendees. This project maps institutional touchpoints, diagnoses critical information breakdowns, and delivers a unified service design solution: the Event Journey Card.",
      problem: "The event management system lacks a clear and consistent flow of information across people, teams, and stages, causing critical announcements to get lost, delayed, or inconsistently communicated across fragmented WhatsApp groups, emails, and word of mouth.",
      process: "A 4-stage systems design methodology: System Understanding, Targeted Stakeholder Interviews, Thematic Breakdown Synthesis, and Comprehensive Systems Mapping (Ecosystem, Information Flow, Dependency, and Information Architecture).",
      processSteps: [
        { title: "01. System Understanding & Audit", description: "Audited existing campus communication touchpoints, registration forms, circulars, and departmental event operations." },
        { title: "02. Field Inquiries & Interviews", description: "Conducted semi-structured interviews with organizers (backstage logistics, admin delays) and attendees (registration friction, missing passes)." },
        { title: "03. Thematic Failure Diagnosis", description: "Uncovered 4 core failure areas: Dependency on specific people, Scrambled details, Delayed decisions, and Post-registration communication drop-off." },
        { title: "04. Multi-Layer Systems Mapping", description: "Constructed comprehensive Stakeholder Maps, Ecosystem Maps, Information & Registration Flow Maps, and Dependency Diagrams." },
        { title: "05. Solution: Event Journey Card", description: "Designed an attendee-first, continuously updated digital card paired with a centralized organizer database and verified notification system." }
      ],
      conceptNote: "Because the attendee is the single point where all fragmented information becomes visible, the solution must be attendee-first: a personal web-based card requiring zero app downloads that stays relevant from registration to certificate fulfillment.",
      outcome: "A holistic systems design framework and working digital prototype achieving ≥90% information self-service, ≤5 minute update propagation, ≥50% reduction in inquiry overhead, and rapid post-event certificate delivery.",
      gallery: [
        "/assets/projects/systems-design/journey_card_06.png",
        "/assets/projects/systems-design/systems_slide_01.png",
        "/assets/projects/systems-design/systems_slide_04.png",
        "/assets/projects/systems-design/systems_slide_11.png",
        "/assets/projects/systems-design/systems_slide_15.png",
        "/assets/projects/systems-design/systems_slide_16.png",
        "/assets/projects/systems-design/journey_card_03.png",
        "/assets/projects/systems-design/journey_card_07.png"
      ]
    }
  },
  {
    id: "2",
    title: "Typographic Legacy",
    category: "Typography",
    date: "July, 2025",
    description: "A typographic journey through Indian street lettering, documenting the vibrant visual culture of public spaces through a flipbook-style narrative.",
    thumbnailUrl: "https://i.ibb.co/3mYNnGQj/10.webp",
    details: {
      overview: "Matra Marks is a documentation and meditation on the visual landscape of Indian streets. It assembles a compelling narrative about the life of type in public spaces, celebrating the vibrant, layered world of street lettering—a space where language and craft meet improvisation, identity, and memory.",
      problem: "Letters are everywhere—painted on shutters, stenciled on walls—but we rarely stop to read them as stories. The challenge was to preserve these ephemeral 'matra marks' and decode the cultural context behind every stroke before they vanish, redefining type as memory.",
      process: "The project unfolded through field documentation, zine-making, and community workshops, bridging the gap between analog craft and digital design.",
      processSteps: [
        { title: "Galli Graffiti", description: "Documented the fading art of public lettering across Indian cities, capturing the unique aesthetic decisions of local signmakers in 'Galliyon Se Chhapai'." },
        { title: "Desi Strokes", description: "Experimented with visual forms of onomatopoeic words like boom, crack, and zap, matching their sonic impact with dynamic, exaggerated strokes." },
        { title: "Zine Creation", description: "Produced A6 accordion-fold zines like 'Azulejos of Panjim' to tell layered stories of Portuguese influence and bilingual coexistence in street signs." },
        { title: "Bridging Worlds", description: "Conducted workshops connecting analog skills (embroidery, sketching) with digital outcomes (pixel type), exploring how Latin alphabets might look if shaped by Indic scripts." },
        { title: "Visual Archiving", description: "Compiled a decade-long archive of street lettering to highlight how constraints drive creative ingenuity in vernacular type." }
      ],
      outcome: "A published collection and series of interactive zines that serve as a visual field guide to Indian typography. The work has inspired workshops and discussions on the cultural significance of street lettering.",
      gallery: [
      "https://i.ibb.co/wZSprGqY/1.gif",
      "https://i.ibb.co/5yKRCjY/12.webp",
      "https://i.ibb.co/wFcmPPJz/13.webp",
      "https://i.ibb.co/G46w4hRC/5.webp"
      ],
      flipbook: [
        {
          imageUrl: "https://i.ibb.co/cSnMPWrq/Screenshot-2026-11-02-at-10-28-58.png",
          type: "cover",
          alt: "Matra Marks Front Cover"
        },
        {
          imageUrl: "https://i.ibb.co/hRPH5zPn/Screenshot-2026-11-02-at-10-29-30.png",
          type: "spread",
          alt: "Lettered & Layered Spread"
        },
        {
          imageUrl: "https://i.ibb.co/ccnqMP30/Screenshot-2026-11-02-at-10-29-51.png",
          type: "spread",
          alt: "Desi Strokes Spread"
        },
        {
          imageUrl: "https://i.ibb.co/20y6LQJv/Screenshot-2026-11-02-at-10-30-00.png",
          type: "spread",
          alt: "Galli Graffiti Spread"
        },
        {
          imageUrl: "https://i.ibb.co/JW09mPPs/Screenshot-2026-11-02-at-10-30-41.png",
          type: "back",
          alt: "Matra Marks Back Cover"
        }
      ]
    }
  }
];

export const EDUCATION: EducationItem[] = [
  {
    degree: "Bachelor of Design (Hons.) Visual Communication",
    institution: "Unitedworld Institute of Design, Gandhinagar, Gujarat",
    year: "2024 – Present"
  },
  {
    degree: "Higher Secondary Education",
    institution: "Lakshmipat Singhania Academy, Kolkata",
    year: "2022 – 2024"
  },
  {
    degree: "Secondary Education",
    institution: "Lakshmipat Singhania Academy, Kolkata",
    year: "2011 – 2022"
  }
];

export interface DetailedExperienceItem extends ExperienceItem {
  bullets: string[];
}

export const WORK_EXPERIENCE: DetailedExperienceItem[] = [
  {
    role: "Graphic Design Intern",
    company: "Lookad (India) Pvt. Ltd. Kolkata",
    period: "May – June 2026",
    description: "Designed digital assets and website layouts using visual hierarchy, typography, and layout principles to create clear, consistent user-facing experiences.",
    bullets: [
      "Designed digital assets and website layouts using visual hierarchy, typography, and layout principles to create clear, consistent user-facing experiences.",
      "Generated and refined AI-assisted visuals for digital communications, integrating them into layouts to support visual storytelling and creative objectives.",
      "Redesigned corporate website pages by refining content organisation, layout structure, and visual consistency across pages.",
      "Collaborated with team members to interpret briefs, incorporate feedback, and deliver revised assets within deadlines.",
      "Managed multiple design tasks and revisions while maintaining visual consistency, attention to detail, and adaptability."
    ]
  }
];

export const EXPERIENCE = WORK_EXPERIENCE;

export const VOLUNTEERING: VolunteeringItem[] = [
  {
    role: "Student Council",
    period: "2025–2026"
  },
  {
    role: "Ahmedabad Design Week 7.0",
    period: "Jan 2026"
  },
  {
    role: "Global Game Jam",
    period: "Jan 2026"
  },
  {
    role: "Infotech Committee Member",
    period: "2022 – 2023 & 2023 – 2024"
  }
];

export const AWARDS_ACHIEVEMENTS: AchievementItem[] = [
  {
    title: "Prashasti Award",
    year: "2023",
    description: "Information and Technology field recognition."
  },
  {
    title: "CyberFair Platinum",
    year: "2023",
    description: "1st position in the International School CyberFair."
  }
];

export const ACHIEVEMENTS = AWARDS_ACHIEVEMENTS;

export const REFERENCES: ReferenceItem[] = [
  {
    name: "Shankar Dayal",
    designation: "Assistant Professor",
    organization: "UID",
    phone: "73970 62231",
    email: "shankar@karnavatiuniversty.edu.in"
  },
  {
    name: "Nikhil Lunia",
    designation: "Chief Operating Officer (COO)",
    organization: "Lookad (India) Pvt. Ltd.",
    phone: "96815 65890",
    email: "nikhil.lunia@digitale.co.in"
  }
];

export const LANGUAGES: string[] = ["English", "Hindi", "Bengali"];

export const INTERESTS: string[] = ["Baking", "Travelling"];

export const CERTIFICATIONS: import('./types').Certification[] = [
  {
    issuer: "LinkedIn Learning",
    courses: [
      "Graphic Design Concepts",
      "Creating Inclusive Content",
      "Ethical, Human-Centric AI Design"
    ]
  }
];