import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

const portraitFallbackImg = new URL(
  '../src/assets/images/designer_studio_portrait_1793744722443.jpg',
  import.meta.url
).href;

const About: React.FC = () => {
  const [imgSrc, setImgSrc] = useState('https://i.ibb.co/fVGJfzzh/Port.png');
  const [activePrompt, setActivePrompt] = useState<number | null>(0);

  const curiosityPrompts = [
    {
      label: 'Overthinking → Systems Strategy',
      content:
        'I treat overthinking not as friction, but as an analytical radar for overlooked dependencies, edge cases, and human nuances that turn fragmented workflows into coherent systems.',
    },
    {
      label: 'Design × Generative Workflows',
      content:
        'Computational tools expand the perimeter of rapid exploration; human editorial judgment, typographic sensitivity, and field empathy decide what deserves to exist.',
    },
    {
      label: 'Indian Street Vernacular',
      content:
        'From hand-painted shop shutters to multilingual public placards, documenting everyday letterforms across Indian streets anchors my visual sensibility.',
    },
  ];

  return (
    <section
      id="about"
      className="py-24 md:py-28 bg-[#FAF8F6] dark:bg-stone-950 transition-colors duration-300 border-t border-stone-200/80 dark:border-stone-800/80"
    >
      <div className="max-w-6xl mx-auto px-6">
        {/* Section Header */}
        <div className="mb-12 flex flex-col md:flex-row md:items-end justify-between gap-4 pb-6 border-b border-stone-200 dark:border-stone-800">
          <div>
            <p className="font-mono text-xs uppercase tracking-widest text-coral mb-2">
              Studio Monograph · Identity
            </p>
            <h2 className="text-3xl sm:text-4xl font-editorial font-normal text-charcoal dark:text-white tracking-tight">
              Curiosity in <span className="italic text-coral">motion.</span>
            </h2>
          </div>
          <p className="font-mono text-xs text-stone-500 dark:text-stone-400">
            Ahmedabad &amp; Kolkata, India · B.Des Communication Design
          </p>
        </div>

        {/* Monograph Two-Column Layout */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-12 items-start">
          {/* Portrait Frame */}
          <div className="md:col-span-4">
            <div className="rounded-2xl overflow-hidden bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 p-3 shadow-xs">
              <div className="overflow-hidden rounded-xl bg-stone-100 dark:bg-stone-800 aspect-[4/5] relative">
                <img
                  src={imgSrc}
                  alt="Anushka Saraf — Communication Designer"
                  referrerPolicy="no-referrer"
                  onError={() => {
                    if (imgSrc !== portraitFallbackImg) {
                      setImgSrc(portraitFallbackImg);
                    }
                  }}
                  className="w-full h-full object-cover object-top transition-transform duration-700 hover:scale-103"
                />
              </div>
              <div className="pt-3 px-1 flex items-center justify-between text-xs font-mono text-stone-500 dark:text-stone-400">
                <span>Anushka Saraf</span>
                <span>UID · 2024–2028</span>
              </div>
            </div>
          </div>

          {/* Editorial Essay & Interactive Notes */}
          <div className="md:col-span-8">
            <div className="p-7 sm:p-9 bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-2xl">
              <div className="flex items-center justify-between pb-4 mb-6 border-b border-stone-100 dark:border-stone-800 font-mono text-xs text-stone-500 dark:text-stone-400">
                <span className="text-coral uppercase tracking-widest">Studio Note 01</span>
                <span>Design Philosophy</span>
              </div>

              <h3 className="text-2xl sm:text-3xl font-editorial font-normal text-charcoal dark:text-white tracking-tight mb-5 leading-snug">
                &ldquo;Curiosity is where my approach to design begins.&rdquo;
              </h3>

              <div className="space-y-4 text-stone-700 dark:text-stone-300 font-clean text-base leading-relaxed">
                <p>
                  Somewhere between questioning why everyday systems fracture and observing how
                  people improvise around them, I find the beginnings of work worth making. Whether
                  mapping nine campus committees behind an academic event or studying emotional
                  perception in letterforms, inquiry always precedes visual form.
                </p>
                <p>
                  I am drawn to unexpected connections, quiet typographic details, and structural
                  clarity — building interfaces, publications, and visual identities that respect a
                  reader&apos;s attention.
                </p>
              </div>

              <div className="mt-6 pt-5 border-t border-stone-100 dark:border-stone-800">
                <p className="font-editorial italic text-lg sm:text-xl text-coral">
                  &ldquo;Here to keep observing, structuring, and asking, &lsquo;What if?&rsquo;&rdquo;
                </p>
              </div>

              {/* Interactive Lenses */}
              <div className="mt-7 pt-6 border-t border-stone-100 dark:border-stone-800">
                <p className="font-mono text-[11px] uppercase tracking-widest text-stone-400 mb-3">
                  Three Working Lenses
                </p>

                <div className="flex flex-wrap gap-2">
                  {curiosityPrompts.map((prompt, pIdx) => {
                    const isOpen = activePrompt === pIdx;
                    return (
                      <button
                        key={prompt.label}
                        type="button"
                        onClick={() => setActivePrompt(isOpen ? null : pIdx)}
                        className={`px-3.5 py-2 rounded-lg text-xs font-clean font-medium transition-colors border cursor-pointer inline-flex items-center gap-1.5 whitespace-nowrap shrink-0 ${
                          isOpen
                            ? 'bg-charcoal text-white border-charcoal dark:bg-cream dark:text-stone-950 dark:border-cream'
                            : 'bg-[#FAF8F6] dark:bg-stone-800/70 text-stone-600 dark:text-stone-300 border-stone-200 dark:border-stone-700 hover:border-coral'
                        }`}
                      >
                        <span>{prompt.label}</span>
                        {isOpen ? <ChevronUp size={13} /> : <ChevronDown size={13} />}
                      </button>
                    );
                  })}
                </div>

                {activePrompt !== null && (
                  <div className="mt-3.5 p-4 rounded-xl bg-[#FAF8F6] dark:bg-stone-800/50 border border-stone-200/80 dark:border-stone-700/70 text-sm font-clean text-stone-600 dark:text-stone-300 leading-relaxed">
                    {curiosityPrompts[activePrompt].content}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;