import React, { useState } from 'react';
import Button from './Button';
import { PERSONAL_INFO } from '../constants';
import { Linkedin, Dribbble, CheckCircle, Mail, Copy, Send } from 'lucide-react';

const Contact: React.FC = () => {
  const [formState, setFormState] = useState({ name: '', email: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [copied, setCopied] = useState(false);
  const [activeField, setActiveField] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      const response = await fetch("https://formspree.io/f/xqedykko", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(formState)
      });

      if (response.ok) {
        setIsSuccess(true);
        setFormState({ name: '', email: '', message: '' });
      } else {
        console.error("Form submission failed");
        alert("Something went wrong. Please try again later.");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("Something went wrong. Please try again later.");
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
    <section id="contact" className="py-32 bg-white dark:bg-stone-900 relative transition-colors duration-300 overflow-hidden">
       {/* Blobs */}
       <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-lavender/20 dark:bg-lavender/10 rounded-full blur-[120px] pointer-events-none opacity-60 animate-pulse"></div>
       <div className="absolute top-20 left-20 w-[400px] h-[400px] bg-coral/20 dark:bg-coral/10 rounded-full blur-[100px] pointer-events-none opacity-40"></div>

      <div className="container mx-auto px-6 max-w-6xl relative z-10">
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-16">
            
            {/* Info Side */}
            <div className="flex flex-col justify-between space-y-12">
              <div className="animate-fadeIn">
                <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-coral/10 dark:bg-coral/20 text-coral dark:text-coral rounded-full font-subheading text-[13px] font-medium tracking-widest uppercase mb-8 shadow-sm">
                   <span className="relative flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-coral opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-coral"></span>
                    </span>
                   Open to Work
                </div>
                <h3 className="text-4xl md:text-6xl font-heading font-normal text-charcoal dark:text-white tracking-tighter mb-6 leading-tight">
                  Let's start a <br />
                  <span className="font-heading italic bg-clip-text text-transparent bg-gradient-to-r from-coral to-lavender animate-gradient bg-[length:200%_auto]">conversation.</span>
                </h3>
                <p className="text-base font-body font-normal text-neutral-gray dark:text-stone-400 mb-10 max-w-md leading-relaxed">
                  Whether you have a project in mind, need a design partner, or just want to chat about visuals & design — I'm all ears.
                </p>
              </div>
              
              <div className="space-y-6">
                {/* Interactive Email Card */}
                <div 
                    onClick={copyToClipboard}
                    className="group relative cursor-pointer bg-cream dark:bg-black p-6 rounded-3xl border border-stone-100 dark:border-stone-800 shadow-xl shadow-stone-200/50 dark:shadow-none hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 overflow-hidden"
                >
                    <div className="absolute top-0 right-0 p-4 opacity-0 group-hover:opacity-100 transition-opacity text-stone-400">
                        {copied ? <CheckCircle size={20} className="text-lavender" /> : <Copy size={20} />}
                    </div>
                    
                    <div className="flex items-center gap-5">
                        <div className="w-14 h-14 bg-white dark:bg-stone-900 rounded-2xl flex items-center justify-center text-charcoal dark:text-white group-hover:bg-coral group-hover:text-white transition-all duration-300 shadow-inner">
                            <Mail size={24} />
                        </div>
                        <div>
                            <p className="font-subheading text-[13px] font-medium uppercase text-neutral-gray group-hover:text-coral transition-colors mb-1">
                                {copied ? 'Copied to clipboard!' : 'Drop me a line'}
                            </p>
                            <p className="text-xl md:text-2xl font-normal text-charcoal dark:text-white font-subheading tracking-tight">
                                {PERSONAL_INFO.email}
                            </p>
                        </div>
                    </div>
                    {/* Hover Gradient */}
                    <div className="absolute inset-0 bg-gradient-to-r from-coral/0 via-coral/0 to-coral/5 group-hover:via-coral/5 transition-all duration-500 pointer-events-none"></div>
                </div>

                {/* Social Links */}
                <div>
                   <p className="font-subheading text-[13px] font-medium uppercase text-neutral-gray mb-4 pl-2">Find me on</p>
                   <div className="flex gap-4">
                      {[
                        { icon: Linkedin, href: PERSONAL_INFO.socials.linkedin, color: "hover:bg-[#0077b5] hover:border-[#0077b5]" },
                        { icon: Dribbble, href: PERSONAL_INFO.socials.behance, color: "hover:bg-[#ea4c89] hover:border-[#ea4c89]" }
                      ].map((Social, i) => (
                        <a 
                          key={i} 
                          href={Social.href} 
                          target="_blank"
                          rel="noreferrer"
                          className={`w-14 h-14 border border-stone-200 dark:border-stone-800 bg-white dark:bg-black rounded-2xl flex items-center justify-center text-neutral-gray hover:text-white transition-all duration-300 hover:-translate-y-2 hover:shadow-lg ${Social.color} group`}
                        >
                          <Social.icon size={24} className="group-hover:scale-110 transition-transform" />
                        </a>
                      ))}
                   </div>
                </div>
              </div>
            </div>

            {/* Form Side */}
            <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-br from-lavender/30 to-coral/30 dark:from-lavender/10 dark:to-coral/10 rounded-[3rem] transform rotate-3 scale-95 opacity-50 blur-xl animate-pulse"></div>
                
                <div className="bg-cream dark:bg-stone-900/80 backdrop-blur-xl p-8 md:p-12 rounded-[2.5rem] border border-stone-100 dark:border-stone-800 relative shadow-2xl transition-transform hover:scale-[1.01] duration-500">
                    
                    {isSuccess ? (
                        <div className="flex flex-col items-center justify-center h-[400px] text-center animate-fadeIn">
                            <div className="w-24 h-24 bg-coral/20 dark:bg-coral/10 rounded-full flex items-center justify-center mb-6 text-coral shadow-lg shadow-coral/20 dark:shadow-none animate-[popIn_0.6s_ease-out]">
                                <CheckCircle size={48} />
                            </div>
                            <h4 className="text-3xl font-heading font-normal text-charcoal dark:text-white mb-2">Message Sent!</h4>
                            <p className="text-neutral-gray dark:text-stone-400 mb-8 max-w-xs mx-auto text-sm font-body font-normal">
                                Thanks for reaching out. I'll get back to you within 24 hours.
                            </p>
                            <Button onClick={() => setIsSuccess(false)} variant="outline" className="rounded-full hover:bg-white dark:hover:bg-stone-800 text-charcoal font-subheading font-medium text-sm">
                                Send another
                            </Button>
                        </div>
                    ) : (
                        <form onSubmit={handleSubmit} className="space-y-6 relative z-10">
                            <div className="group">
                                <label htmlFor="name" className={`block font-subheading text-[13px] font-medium uppercase tracking-wide ml-3 mb-2 transition-colors ${activeField === 'name' ? 'text-coral' : 'text-neutral-gray dark:text-stone-400'}`}>Name</label>
                                <div className="relative">
                                    <input 
                                    type="text" 
                                    id="name"
                                    name="name"
                                    required
                                    value={formState.name}
                                    onFocus={() => setActiveField('name')}
                                    onBlur={() => setActiveField(null)}
                                    onChange={(e) => setFormState({...formState, name: e.target.value})}
                                    className="w-full bg-white dark:bg-stone-800 text-charcoal dark:text-white border border-stone-200 dark:border-stone-700 rounded-2xl p-4 sm:p-5 pl-6 focus:outline-hidden focus:ring-2 focus:ring-coral/20 focus:border-coral transition-all placeholder:text-stone-300 text-sm font-body font-normal"
                                    placeholder="Jane Doe"
                                    />
                                    <div className={`absolute bottom-0 left-6 right-6 h-0.5 bg-coral transform scale-x-0 transition-transform duration-300 origin-left ${activeField === 'name' ? 'scale-x-100' : ''}`}></div>
                                </div>
                            </div>
                        
                            <div className="group">
                                <label htmlFor="email" className={`block font-subheading text-[13px] font-medium uppercase tracking-wide ml-3 mb-2 transition-colors ${activeField === 'email' ? 'text-coral' : 'text-neutral-gray dark:text-stone-400'}`}>Email</label>
                                <div className="relative">
                                    <input 
                                    type="email" 
                                    id="email"
                                    name="email"
                                    required
                                    value={formState.email}
                                    onFocus={() => setActiveField('email')}
                                    onBlur={() => setActiveField(null)}
                                    onChange={(e) => setFormState({...formState, email: e.target.value})}
                                    className="w-full bg-white dark:bg-stone-800 text-charcoal dark:text-white border border-stone-200 dark:border-stone-700 rounded-2xl p-4 sm:p-5 pl-6 focus:outline-hidden focus:ring-2 focus:ring-coral/20 focus:border-coral transition-all placeholder:text-stone-300 text-sm font-body font-normal"
                                    placeholder="jane@example.com"
                                    />
                                     <div className={`absolute bottom-0 left-6 right-6 h-0.5 bg-coral transform scale-x-0 transition-transform duration-300 origin-left ${activeField === 'email' ? 'scale-x-100' : ''}`}></div>
                                </div>
                            </div>
                        
                            <div className="group">
                                <label htmlFor="message" className={`block font-subheading text-[13px] font-medium uppercase tracking-wide ml-3 mb-2 transition-colors ${activeField === 'message' ? 'text-coral' : 'text-neutral-gray dark:text-stone-400'}`}>Message</label>
                                <div className="relative">
                                    <textarea 
                                    id="message"
                                    name="message"
                                    required
                                    rows={4}
                                    value={formState.message}
                                    onFocus={() => setActiveField('message')}
                                    onBlur={() => setActiveField(null)}
                                    onChange={(e) => setFormState({...formState, message: e.target.value})}
                                    className="w-full bg-white dark:bg-stone-800 text-charcoal dark:text-white border border-stone-200 dark:border-stone-700 rounded-2xl p-4 sm:p-5 pl-6 focus:outline-hidden focus:ring-2 focus:ring-coral/20 focus:border-coral transition-all resize-none placeholder:text-stone-300 text-sm font-body font-normal"
                                    placeholder="How can we help each other?"
                                    />
                                     <div className={`absolute bottom-6 left-6 right-6 h-0.5 bg-coral transform scale-x-0 transition-transform duration-300 origin-left ${activeField === 'message' ? 'scale-x-100' : ''}`}></div>
                                </div>
                            </div>

                            <div className="pt-4">
                                <Button 
                                    type="submit" 
                                    disabled={isSubmitting} 
                                    className="w-full justify-center py-5 text-base rounded-2xl shadow-xl shadow-coral/30 dark:shadow-none hover:shadow-2xl hover:shadow-coral/40 hover:-translate-y-1 bg-coral text-white dark:bg-white dark:text-black group overflow-hidden relative border-none"
                                >
                                    <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:animate-shimmer"></div>
                                    <span className="flex items-center gap-3 relative z-10 font-subheading font-medium">
                                        {isSubmitting ? (
                                            <>
                                                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                                                Sending...
                                            </>
                                        ) : (
                                            <>
                                                Send Message 
                                                <Send size={18} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                                            </>
                                        )}
                                    </span>
                                </Button>
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