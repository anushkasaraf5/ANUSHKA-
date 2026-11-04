import React from 'react';
import { 
  PERSONAL_INFO,
  EDUCATION, 
  WORK_EXPERIENCE, 
  VOLUNTEERING, 
  AWARDS_ACHIEVEMENTS, 
  REFERENCES, 
  LANGUAGES, 
  INTERESTS, 
  SKILL_CATEGORIES 
} from '../constants';
import Button from './Button';
import { Download, ArrowUp, Briefcase, Mail, Phone, Linkedin } from 'lucide-react';

const Resume: React.FC = () => {
  const handleDownloadResume = () => {
    // Triggers the browser print dialog, configured for standard A4 single page save
    window.print();
  };

  const scrollToPortfolio = () => {
     const workSection = document.getElementById('work');
     if (workSection) {
        workSection.scrollIntoView({ behavior: 'smooth' });
     }
  };

  return (
    <section id="resume" className="py-20 print:py-0 print:bg-white bg-cream dark:bg-stone-950 transition-colors duration-300 relative">
      <div className="container mx-auto px-4 sm:px-6 print:px-0 print:w-full print:max-w-none">
        
        {/* Section Header & Download Action */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-12 animate-fadeIn print:hidden max-w-[210mm] mx-auto">
          <div>
            <h2 className="text-[13px] font-alasassy font-medium tracking-widest uppercase text-coral mb-1">Curriculum Vitae</h2>
            <h3 className="text-3xl md:text-5xl font-alasassy font-normal text-charcoal dark:text-white tracking-tight">Resume & Qualifications</h3>
          </div>
          <div className="mt-5 md:mt-0 flex gap-4">
            <Button className="gap-2 rounded-full group overflow-hidden relative bg-charcoal text-white hover:bg-stone-800 shadow-md" onClick={handleDownloadResume}>
              <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
              <Download size={18} className="group-hover:animate-bounce" />
              <span className="relative z-10 font-alasassy font-medium text-sm">Download Resume (PDF)</span>
            </Button>
          </div>
        </div>

        {/* RESUME A4 SHEET CONTAINER */}
        <div className="resume-sheet bg-white dark:bg-stone-900 shadow-2xl shadow-stone-300/60 dark:shadow-black/60 rounded-2xl print:rounded-none border border-stone-200 print:border-none dark:border-stone-800 max-w-[210mm] mx-auto transition-colors duration-300 overflow-hidden animate-fadeIn text-left">
          
          <div className="grid grid-cols-1 md:grid-cols-12 print:grid-cols-12 min-h-[297mm]">
            
            {/* LEFT COLUMN: DARK SIDEBAR */}
            <div className="md:col-span-4 print:col-span-4 bg-black text-white p-6 sm:p-7 md:p-8 print:p-6 flex flex-col justify-between">
              <div>
                {/* Header Name & Title */}
                <div className="mb-6">
                  <h1 className="text-3xl sm:text-4xl print:text-3xl font-alasassy font-normal uppercase tracking-tight text-[#4ba3c7] leading-[1.05]">
                    ANUSHKA<br />SARAF
                  </h1>
                  <p className="text-stone-200 text-sm sm:text-base print:text-sm font-alasassy font-normal mt-2.5">
                    Communication Designer
                  </p>
                </div>

                {/* Contact Information */}
                <div className="flex flex-col gap-2.5 text-[13px] font-fresca font-normal text-stone-300 mb-8 pb-6 border-b border-stone-800">
                  <a 
                    href={`mailto:${PERSONAL_INFO.email}`} 
                    className="flex items-center gap-2.5 hover:text-[#4ba3c7] transition-colors underline decoration-stone-600 underline-offset-2"
                  >
                    <Mail size={14} className="shrink-0 text-[#4ba3c7]" />
                    <span className="truncate">{PERSONAL_INFO.email}</span>
                  </a>
                  <a 
                    href={`tel:${PERSONAL_INFO.phone.replace(/\s+/g, '')}`} 
                    className="flex items-center gap-2.5 hover:text-[#4ba3c7] transition-colors"
                  >
                    <Phone size={14} className="shrink-0 text-[#4ba3c7]" />
                    <span>{PERSONAL_INFO.phone}</span>
                  </a>
                  <a 
                    href={PERSONAL_INFO.linkedinUrl} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="flex items-center gap-2.5 hover:text-[#4ba3c7] transition-colors underline decoration-stone-600 underline-offset-2"
                  >
                    <Linkedin size={14} className="shrink-0 text-[#4ba3c7]" />
                    <span>{PERSONAL_INFO.linkedin}</span>
                  </a>
                </div>

                {/* Skills */}
                <div className="flex flex-col space-y-3.5">
                  <h3 className="text-lg sm:text-xl print:text-base font-alasassy font-normal text-[#4ba3c7] tracking-tight">Skills</h3>

                  {SKILL_CATEGORIES.map((category, catIdx) => (
                    <div key={catIdx} className="space-y-1">
                      <h4 className="text-[13px] sm:text-sm print:text-[13px] font-alasassy font-medium text-white tracking-wide">
                        {category.title}
                      </h4>
                      <ul className="text-[13px] font-fresca font-normal text-stone-300 space-y-0.5 leading-snug">
                        {category.skills.map((skill, sIdx) => (
                          <li key={sIdx} className="flex items-start gap-1.5">
                            <span className="text-stone-400 select-none leading-tight">•</span>
                            <span>{skill.name}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>

            </div>

            {/* RIGHT COLUMN: MAIN CONTENT */}
            <div className="md:col-span-8 print:col-span-8 bg-white text-stone-900 p-6 sm:p-7 md:p-8 print:p-6 flex flex-col justify-between space-y-5 print:space-y-4">
              
              {/* Intro / Philosophy Statement */}
              <div className="border-l-2 border-stone-800 pl-4 py-0.5 text-stone-800">
                <p className="font-alasassy font-medium text-[13px] sm:text-sm print:text-[13px] text-stone-900 mb-1.5">
                  {PERSONAL_INFO.introQuote}
                </p>
                <p className="font-fresca font-normal text-[13px] sm:text-sm print:text-[13px] leading-relaxed text-stone-700 mb-1.5">
                  {PERSONAL_INFO.introBio}
                </p>
                <p className="font-alasassy font-medium text-[13px] sm:text-sm print:text-[13px] text-stone-900">
                  {PERSONAL_INFO.introClosing}
                </p>
              </div>

              {/* Education */}
              <div>
                <h3 className="text-lg sm:text-xl print:text-base font-alasassy font-normal text-[#0284c7] mb-2.5">
                  Education
                </h3>
                <div className="space-y-2.5 print:space-y-2">
                  {EDUCATION.map((edu, idx) => (
                    <div key={idx} className="leading-snug">
                      <p className="font-alasassy font-medium text-[13px] sm:text-sm print:text-[13px] text-stone-900">
                        {edu.degree}
                      </p>
                      <p className="font-fresca font-normal text-[13px] text-stone-600">
                        {edu.institution}
                      </p>
                      <p className="font-fresca font-normal text-[13px] text-stone-500">
                        {edu.year}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Work Experience */}
              <div>
                <h3 className="text-lg sm:text-xl print:text-base font-alasassy font-normal text-[#0284c7] mb-2.5">
                  Work Experience
                </h3>
                {WORK_EXPERIENCE.map((exp, idx) => (
                  <div key={idx}>
                    <div className="flex flex-col sm:flex-row justify-between sm:items-baseline gap-0.5 mb-1.5">
                      <p className="text-[13px] sm:text-sm print:text-[13px]">
                        <span className="font-alasassy font-medium text-stone-900">{exp.role}: </span>
                        <span className="font-alasassy font-normal text-stone-700">{exp.company}</span>
                      </p>
                      <span className="font-fresca font-normal text-[13px] text-stone-600 shrink-0">
                        {exp.period}
                      </span>
                    </div>
                    <ul className="text-[13px] font-fresca font-normal text-stone-700 space-y-1 pl-3 leading-relaxed">
                      {exp.bullets.map((bullet, bIdx) => (
                        <li key={bIdx} className="flex items-start gap-1.5">
                          <span className="text-stone-500 select-none">•</span>
                          <span>{bullet}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>

              {/* Volunteering */}
              <div>
                <h3 className="text-lg sm:text-xl print:text-base font-alasassy font-normal text-[#0284c7] mb-2">
                  Volunteering
                </h3>
                <div className="space-y-1 text-[13px]">
                  {VOLUNTEERING.map((item, idx) => (
                    <div key={idx} className="flex justify-between items-baseline font-fresca font-normal">
                      <span className="font-alasassy font-medium text-[13px] sm:text-sm print:text-[13px] text-stone-800">{item.role}</span>
                      <span className="font-fresca font-normal text-stone-600 text-right shrink-0">{item.period}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Awards & Achievements */}
              <div>
                <h3 className="text-lg sm:text-xl print:text-base font-alasassy font-normal text-[#0284c7] mb-2">
                  Awards & Achievements
                </h3>
                <div className="space-y-2 text-[13px]">
                  {AWARDS_ACHIEVEMENTS.map((award, idx) => (
                    <div key={idx} className="leading-snug font-fresca font-normal">
                      <div className="flex justify-between items-baseline">
                        <span className="font-alasassy font-medium text-[13px] sm:text-sm print:text-[13px] text-stone-900">{award.title}</span>
                        <span className="font-fresca font-normal text-stone-600">{award.year}</span>
                      </div>
                      <p className="text-[13px] font-fresca font-normal text-stone-700 mt-0.5 leading-snug">{award.description}</p>
                      {award.email && (
                        <p className="text-[13px] font-fresca font-normal text-stone-500 mt-0.5">{award.email}</p>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* References */}
              <div>
                <h3 className="text-lg sm:text-xl print:text-base font-alasassy font-normal text-[#0284c7] mb-2">
                  References
                </h3>
                <div className="space-y-1.5 text-[13px] font-fresca font-normal">
                  {REFERENCES.map((ref, idx) => (
                    <div key={idx} className="leading-snug">
                      <p className="font-alasassy font-medium text-[13px] sm:text-sm print:text-[13px] text-stone-900">
                        {idx + 1}. {ref.name}- {ref.designation} | {ref.organization}
                      </p>
                      <p className="text-stone-600 pl-3 text-[13px] font-fresca font-normal">
                        <span>{ref.phone}</span> |{' '}
                        <a 
                          href={`mailto:${ref.email}`} 
                          className="hover:text-[#0284c7] underline decoration-stone-300 underline-offset-2 transition-colors"
                        >
                          {ref.email}
                        </a>
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Languages & Interests */}
              <div className="grid grid-cols-2 gap-4 pt-1 border-t border-stone-100 font-fresca font-normal">
                <div>
                  <h3 className="text-lg sm:text-xl print:text-base font-alasassy font-normal text-[#0284c7] mb-1.5">Languages</h3>
                  <ul className="text-[13px] font-fresca font-normal text-stone-700 space-y-0.5">
                    {LANGUAGES.map((lang, idx) => (
                      <li key={idx} className="flex items-center gap-1.5">
                        <span className="text-stone-400 select-none">•</span>
                        <span>{lang}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h3 className="text-lg sm:text-xl print:text-base font-alasassy font-normal text-[#0284c7] mb-1.5">Interests</h3>
                  <ul className="text-[13px] font-fresca font-normal text-stone-700 space-y-0.5">
                    {INTERESTS.map((interest, idx) => (
                      <li key={idx} className="flex items-center gap-1.5">
                        <span className="text-stone-400 select-none">•</span>
                        <span>{interest}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

            </div>

          </div>
        </div>

        {/* Back to Portfolio Button */}
        <div className="flex justify-center mt-12 print:hidden">
          <button 
            onClick={scrollToPortfolio}
            className="group relative inline-flex items-center gap-3 px-8 py-3.5 bg-transparent border-2 border-charcoal dark:border-white text-charcoal dark:text-white rounded-full font-bold text-base overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-0.5"
          >
            <div className="absolute inset-0 bg-charcoal dark:bg-white translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out"></div>
            <div className="relative flex items-center gap-2.5 z-10 group-hover:text-white dark:group-hover:text-charcoal transition-colors duration-300">
              <Briefcase size={18} />
              <span className="font-alasassy">Back to Portfolio</span>
              <ArrowUp size={18} className="group-hover:-translate-y-0.5 transition-transform duration-300"/>
            </div>
          </button>
        </div>

      </div>
    </section>
  );
};

export default Resume;