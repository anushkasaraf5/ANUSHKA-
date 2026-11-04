import React, { useState } from 'react';
import Button from './Button';
import { PERSONAL_INFO } from '../constants';
import { Linkedin, CheckCircle, Mail, Copy, Send, AlertCircle, ArrowUpRight } from 'lucide-react';

const Contact: React.FC = () => {
  const [formState, setFormState] = useState({ name: '', email: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMessage(null);

    try {
      const response = await fetch('https://formspree.io/f/xqedykko', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formState),
      });

      if (response.ok) {
        setIsSuccess(true);
        setFormState({ name: '', email: '', message: '' });
      } else {
        setErrorMessage(
          `Unable to send right now. Please write directly to ${PERSONAL_INFO.email}.`
        );
      }
    } catch {
      setErrorMessage(
        `Network error while sending. Please write directly to ${PERSONAL_INFO.email}.`
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(PERSONAL_INFO.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section
      id="contact"
      className="py-24 md:py-32 bg-white dark:bg-stone-900 transition-colors duration-300 border-t border-stone-200/80 dark:border-stone-800"
    >
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left Column: Direct Contact & Links */}
          <div className="md:col-span-5 flex flex-col justify-between space-y-10">
            <div>
              <p className="font-mono text-xs uppercase tracking-widest text-coral mb-3">
                Inquiries &amp; Collaborations
              </p>
              <h2 className="text-4xl md:text-5xl font-editorial font-normal text-charcoal dark:text-white tracking-tight mb-5 leading-[1.08]">
                Let&apos;s start a <span className="italic text-coral">conversation.</span>
              </h2>
              <p className="text-base font-clean text-stone-600 dark:text-stone-400 leading-relaxed">
                Available for internships, systems &amp; product design projects, editorial
                commissions, and research collaborations.
              </p>
            </div>

            <div className="space-y-5">
              {/* Click-to-Copy Email Card */}
              <button
                type="button"
                onClick={copyToClipboard}
                className="w-full text-left group cursor-pointer bg-[#FAF8F6] dark:bg-stone-950 p-5 rounded-2xl border border-stone-200 dark:border-stone-800 hover:border-coral transition-colors flex items-center justify-between gap-4"
              >
                <div className="flex items-center gap-4 min-w-0">
                  <div className="w-11 h-11 bg-white dark:bg-stone-900 rounded-xl border border-stone-200 dark:border-stone-800 flex items-center justify-center text-charcoal dark:text-white group-hover:bg-coral group-hover:text-white group-hover:border-coral transition-colors shrink-0">
                    <Mail size={19} />
                  </div>
                  <div className="min-w-0">
                    <p className="font-mono text-[11px] uppercase tracking-widest text-stone-500 dark:text-stone-400 mb-0.5">
                      {copied ? 'Copied to clipboard' : 'Direct Email'}
                    </p>
                    <p className="text-base sm:text-lg font-clean font-medium text-charcoal dark:text-white truncate">
                      {PERSONAL_INFO.email}
                    </p>
                  </div>
                </div>
                <span className="text-stone-400 group-hover:text-coral transition-colors shrink-0">
                  {copied ? <CheckCircle size={18} className="text-coral" /> : <Copy size={18} />}
                </span>
              </button>

              {/* Verified External Profiles */}
              <div className="pt-2">
                <p className="font-mono text-[11px] uppercase tracking-widest text-stone-400 mb-3">
                  Elsewhere
                </p>
                <div className="flex flex-wrap items-center gap-3">
                  <a
                    href={PERSONAL_INFO.socials.linkedin}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl border border-stone-200 dark:border-stone-800 bg-[#FAF8F6] dark:bg-stone-950 text-sm font-clean font-medium text-charcoal dark:text-stone-200 hover:border-coral hover:text-coral transition-colors whitespace-nowrap shrink-0"
                  >
                    <Linkedin size={16} />
                    <span>LinkedIn</span>
                    <ArrowUpRight size={14} />
                  </a>
                  <a
                    href={`mailto:${PERSONAL_INFO.email}`}
                    className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl border border-stone-200 dark:border-stone-800 bg-[#FAF8F6] dark:bg-stone-950 text-sm font-clean font-medium text-charcoal dark:text-stone-200 hover:border-coral hover:text-coral transition-colors whitespace-nowrap shrink-0"
                  >
                    <Mail size={16} />
                    <span>Compose Mail</span>
                    <ArrowUpRight size={14} />
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Clean Editorial Contact Form */}
          <div className="md:col-span-7">
            <div className="bg-[#FAF8F6] dark:bg-stone-950 p-7 sm:p-10 rounded-2xl border border-stone-200 dark:border-stone-800">
              {isSuccess ? (
                <div className="flex flex-col items-center justify-center py-14 text-center animate-fadeIn">
                  <div className="w-16 h-16 bg-coral/15 rounded-full flex items-center justify-center mb-5 text-coral">
                    <CheckCircle size={32} />
                  </div>
                  <h3 className="text-2xl font-editorial text-charcoal dark:text-white mb-2">
                    Message received
                  </h3>
                  <p className="text-stone-600 dark:text-stone-400 mb-7 max-w-sm text-sm font-clean">
                    Thank you for writing in. Anushka typically responds within 24–48 hours.
                  </p>
                  <Button
                    onClick={() => setIsSuccess(false)}
                    variant="outline"
                    className="rounded-full text-xs"
                  >
                    Send another note
                  </Button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  {errorMessage && (
                    <div className="p-4 rounded-xl bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-900/60 flex items-start gap-3 text-xs sm:text-sm font-clean text-red-700 dark:text-red-300">
                      <AlertCircle size={17} className="shrink-0 mt-0.5" />
                      <span>{errorMessage}</span>
                    </div>
                  )}

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label
                        htmlFor="name"
                        className="block font-mono text-[11px] uppercase tracking-widest text-stone-500 dark:text-stone-400 mb-2"
                      >
                        Name
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        required
                        value={formState.name}
                        onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                        className="w-full bg-white dark:bg-stone-900 text-charcoal dark:text-white border border-stone-200 dark:border-stone-800 rounded-xl px-4 py-3.5 focus:outline-hidden focus:border-coral transition-colors placeholder:text-stone-400 text-sm font-clean"
                        placeholder="Your name"
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="email"
                        className="block font-mono text-[11px] uppercase tracking-widest text-stone-500 dark:text-stone-400 mb-2"
                      >
                        Email
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        required
                        value={formState.email}
                        onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                        className="w-full bg-white dark:bg-stone-900 text-charcoal dark:text-white border border-stone-200 dark:border-stone-800 rounded-xl px-4 py-3.5 focus:outline-hidden focus:border-coral transition-colors placeholder:text-stone-400 text-sm font-clean"
                        placeholder="you@organization.com"
                      />
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="message"
                      className="block font-mono text-[11px] uppercase tracking-widest text-stone-500 dark:text-stone-400 mb-2"
                    >
                      Project or Inquiry
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      required
                      rows={5}
                      value={formState.message}
                      onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                      className="w-full bg-white dark:bg-stone-900 text-charcoal dark:text-white border border-stone-200 dark:border-stone-800 rounded-xl px-4 py-3.5 focus:outline-hidden focus:border-coral transition-colors resize-none placeholder:text-stone-400 text-sm font-clean"
                      placeholder="Tell me a little about the system, publication, or design challenge..."
                    />
                  </div>

                  <div className="pt-2">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full inline-flex items-center justify-center gap-2.5 py-4 px-6 rounded-xl bg-charcoal dark:bg-cream text-white dark:text-stone-950 hover:bg-coral dark:hover:bg-coral dark:hover:text-white font-clean text-sm font-medium transition-colors disabled:opacity-60 cursor-pointer"
                    >
                      {isSubmitting ? (
                        <span>Sending message...</span>
                      ) : (
                        <>
                          <span>Send Message</span>
                          <Send size={15} />
                        </>
                      )}
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;