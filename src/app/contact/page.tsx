'use client';

import { useState, FormEvent, useEffect } from 'react';
import Link from 'next/link';
import { JetBrains_Mono, Inter } from 'next/font/google';
import { Send, ArrowRight, Mail, Linkedin, Phone, Download } from 'lucide-react';

const jetbrains = JetBrains_Mono({ subsets: ['latin'] });
const inter = Inter({ subsets: ['latin'] });

export default function ContactPage() {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [photoData, setPhotoData] = useState<string | null>(null);
  const [showSaveTooltip, setShowSaveTooltip] = useState(false);
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [activeField, setActiveField] = useState<string | null>(null);
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    // Check if user is on mobile device
    const checkMobile = () => {
      const isMobileDevice = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
      setIsMobile(isMobileDevice);
    };

    checkMobile();
    loadPhoto();
  }, []);

  const loadPhoto = async () => {
    try {
      const response = await fetch('/optimized/zack.webp');
      const blob = await response.blob();
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64data = reader.result as string;
        setPhotoData(base64data.split(',')[1]);
      };
      reader.readAsDataURL(blob);
    } catch (error) {
      console.error('Error loading photo:', error);
    }
  };

  const handleSaveContact = async () => {
    const photoString = photoData ? `
PHOTO;ENCODING=b;TYPE=JPEG:${photoData}` : '';

    const vcard = `BEGIN:VCARD
VERSION:3.0
FN:Zack Hitchcock
N:Hitchcock;Zack;;;
TITLE:Software Engineer${photoString}
TEL:+16175865962
EMAIL:hitchcockzack@gmail.com
URL:https://hitchcode.com
URL;type=LinkedIn:www.linkedin.com/in/zack-hitchcock-17841a219/
END:VCARD`;

    const blob = new Blob([vcard], { type: 'text/vcard' });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'zack-hitchcock.vcf');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    // Hide tooltip after successful save
    setShowSaveTooltip(false);
  };

  const validateForm = () => {
    const errors: Record<string, string> = {};
    if (!formState.name.trim()) errors.name = "Name is required";
    if (!formState.email.trim()) {
      errors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formState.email)) {
      errors.email = "Email is invalid";
    }
    if (!formState.message.trim()) errors.message = "Message is required";

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!validateForm()) return;

    setIsSubmitting(true);

    const form = event.target as HTMLFormElement;
    const formData = new FormData(form);

    try {
      const response = await fetch('https://formspree.io/f/xeojpvbo', {
        method: 'POST',
        body: formData,
        headers: {
          'Accept': 'application/json'
        }
      });

      if (response.ok) {
        setIsSubmitted(true);
        setFormState({ name: '', email: '', message: '' });
      } else {
        console.error('Form submission failed');
      }
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormState(prev => ({ ...prev, [name]: value }));

    // Clear error when user types
    if (formErrors[name]) {
      setFormErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const handleFocus = (fieldName: string) => {
    setActiveField(fieldName);
  };

  const handleBlur = () => {
    setActiveField(null);
  };

  return (
    <div className={`min-h-screen w-full bg-black text-white flex flex-col ${inter.className}`}>
      {/* Subtle background pattern */}
      <div className="fixed inset-0 z-0 opacity-10 pointer-events-none">
        <div className="h-full w-full bg-[linear-gradient(to_right,#ffffff_1px,transparent_1px),linear-gradient(to_bottom,#ffffff_1px,transparent_1px)] bg-[size:80px_80px]" />
      </div>

      {/* Global accent lines */}
      <div className="fixed top-0 left-0 w-4 h-screen bg-gradient-to-b from-blue-600/30 via-purple-600/30 to-transparent z-0" />
      <div className="fixed top-0 right-0 w-4 h-screen bg-gradient-to-b from-transparent via-purple-600/30 to-blue-600/30 z-0" />

      {/* Main content */}
      <main className="flex-1 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {/* Page heading with subtle decoration */}
          <div className="relative mb-12 md:mb-20">
            <div className="absolute -top-6 left-0 w-12 h-12 rounded-full bg-blue-500/10 blur-xl" />
            <div className="absolute top-8 right-20 w-20 h-20 rounded-full bg-purple-500/10 blur-xl" />

            <h1 className={`${jetbrains.className} text-3xl md:text-5xl font-bold relative z-10 inline-block`}>
              <span className="bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">Contact</span>
            </h1>
            <div className="mt-2 h-1 w-12 bg-gradient-to-r from-blue-500 to-purple-500" />

            <p className="mt-6 text-gray-400 max-w-2xl text-lg leading-relaxed">
              Have a wild idea? Facing a frustrating problem? Just curious about something?
              <span className="text-white font-medium"> I'd love to hear from you.</span> No question is too big, too small, or too unusual.
            </p>
            <p className="mt-3 text-gray-500">
              Whether it's a full project, a quick consultation, or just brainstorming — let's talk.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
            {/* Left column: Contact form */}
            <div>
              <div className="bg-gradient-to-br from-gray-900/50 to-gray-800/30 backdrop-blur-sm rounded-xl overflow-hidden border border-white/10 shadow-xl">
                {/* Form header */}
                <div className="px-6 py-5 border-b border-white/10 flex items-center justify-between">
                  <h2 className="font-medium">Send a message</h2>
                  <div className="flex space-x-1">
                    <div className="w-3 h-3 rounded-full bg-red-500/80" />
                    <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                    <div className="w-3 h-3 rounded-full bg-green-500/80" />
                  </div>
                </div>

                {/* Form content */}
                {!isSubmitted ? (
                  <div className="p-6">
                    <form onSubmit={handleSubmit} className="space-y-5">
                      {/* Name field */}
                      <div className="space-y-1">
                        <div className="flex items-center justify-between">
                          <label
                            htmlFor="name"
                            className={`text-sm font-medium ${activeField === 'name' ? 'text-blue-400' : 'text-gray-300'}`}
                          >
                            Name
                          </label>
                          {formErrors.name && <span className="text-xs text-red-400">{formErrors.name}</span>}
                        </div>
                        <div className={`relative rounded-md transition-all ${formErrors.name ? 'shadow-[0_0_0_1px] shadow-red-500/50' : activeField === 'name' ? 'shadow-[0_0_0_1px] shadow-blue-500/50' : 'border border-white/10'}`}>
                          <input
                            type="text"
                            id="name"
                            name="name"
                            value={formState.name}
                            onChange={handleInputChange}
                            onFocus={() => handleFocus('name')}
                            onBlur={handleBlur}
                            className="block w-full bg-white/5 rounded-md py-2.5 px-3 text-sm placeholder:text-gray-500 focus:outline-none"
                            placeholder="John Doe"
                          />
                        </div>
                      </div>

                      {/* Email field */}
                      <div className="space-y-1">
                        <div className="flex items-center justify-between">
                          <label
                            htmlFor="email"
                            className={`text-sm font-medium ${activeField === 'email' ? 'text-blue-400' : 'text-gray-300'}`}
                          >
                            Email
                          </label>
                          {formErrors.email && <span className="text-xs text-red-400">{formErrors.email}</span>}
                        </div>
                        <div className={`relative rounded-md transition-all ${formErrors.email ? 'shadow-[0_0_0_1px] shadow-red-500/50' : activeField === 'email' ? 'shadow-[0_0_0_1px] shadow-blue-500/50' : 'border border-white/10'}`}>
                          <input
                            type="email"
                            id="email"
                            name="email"
                            value={formState.email}
                            onChange={handleInputChange}
                            onFocus={() => handleFocus('email')}
                            onBlur={handleBlur}
                            className="block w-full bg-white/5 rounded-md py-2.5 px-3 text-sm placeholder:text-gray-500 focus:outline-none"
                            placeholder="your@email.com"
                          />
                        </div>
                      </div>

                      {/* Message field */}
                      <div className="space-y-1">
                        <div className="flex items-center justify-between">
                          <label
                            htmlFor="message"
                            className={`text-sm font-medium ${activeField === 'message' ? 'text-blue-400' : 'text-gray-300'}`}
                          >
                            Message
                          </label>
                          {formErrors.message && <span className="text-xs text-red-400">{formErrors.message}</span>}
                        </div>
                        <div className={`relative rounded-md transition-all ${formErrors.message ? 'shadow-[0_0_0_1px] shadow-red-500/50' : activeField === 'message' ? 'shadow-[0_0_0_1px] shadow-blue-500/50' : 'border border-white/10'}`}>
                          <textarea
                            id="message"
                            name="message"
                            value={formState.message}
                            onChange={handleInputChange}
                            onFocus={() => handleFocus('message')}
                            onBlur={handleBlur}
                            rows={5}
                            className="block w-full bg-white/5 rounded-md py-2.5 px-3 text-sm placeholder:text-gray-500 focus:outline-none resize-none"
                            placeholder="What's on your mind? Any idea, question, or problem you'd like to discuss..."
                          />
                        </div>
                      </div>

                      {/* Submit button */}
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full rounded-md py-2.5 px-3.5 text-sm font-medium
                          bg-gradient-to-r from-blue-600 to-purple-600
                          hover:from-blue-500 hover:to-purple-500
                          active:from-blue-700 active:to-purple-700
                          transition-all duration-300 flex items-center justify-center"
                      >
                        {isSubmitting ? (
                          <>
                            <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                            Sending...
                          </>
                        ) : (
                          <>
                            Send Message
                            <Send className="ml-2 h-4 w-4" />
                          </>
                        )}
                      </button>
                    </form>
                  </div>
                ) : (
                  <div className="p-12 flex flex-col items-center text-center">
                    <div className="w-16 h-16 rounded-full flex items-center justify-center bg-green-500/20 mb-6">
                      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M20 6L9 17L4 12" stroke="#4ADE80" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </div>
                    <h3 className="text-xl font-medium mb-2">Message Sent</h3>
                    <p className="text-gray-400 mb-6">Thank you for reaching out. I'll respond to your message as soon as possible.</p>
                    <button
                      onClick={() => setIsSubmitted(false)}
                      className="text-sm px-4 py-2 border border-white/20 rounded-md hover:bg-white/5 transition-colors"
                    >
                      Send another message
                    </button>
                  </div>
                )}
              </div>
            </div>

            {/* Right column: Contact details, digital business card */}
            <div className="space-y-10">
              {/* Contact details card */}
              <div className="bg-gradient-to-br from-gray-900/50 to-gray-800/30 backdrop-blur-sm rounded-xl border border-white/10 p-6 shadow-xl">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-lg font-medium">Contact Details</h3>
                  {/* Mobile-only save contact button with tooltip */}
                  {isMobile && (
                    <div className="relative">
                      <button
                        onClick={handleSaveContact}
                        onMouseEnter={() => setShowSaveTooltip(true)}
                        onMouseLeave={() => setShowSaveTooltip(false)}
                        onTouchStart={() => setShowSaveTooltip(true)}
                        onTouchEnd={() => setTimeout(() => setShowSaveTooltip(false), 2000)}
                        className="p-2 rounded-full bg-blue-500/10 hover:bg-blue-500/20 transition-colors group"
                        aria-label="Save contact to phone"
                      >
                        <Download className="h-4 w-4 text-blue-400 group-hover:text-blue-300" />
                      </button>

                      {/* Tooltip */}
                      {showSaveTooltip && (
                        <div className="absolute -top-10 right-0 bg-gray-900 text-white text-xs px-2 py-1 rounded shadow-lg whitespace-nowrap z-50">
                          Save to contacts
                          <div className="absolute top-full right-2 w-0 h-0 border-l-2 border-r-2 border-t-2 border-l-transparent border-r-transparent border-t-gray-900"></div>
                        </div>
                      )}
                    </div>
                  )}
                </div>

                <div className="space-y-5">
                  <div className="flex items-start">
                    <div className="flex-shrink-0 w-10 h-10 rounded-full bg-blue-500/10 flex items-center justify-center">
                      <Mail className="h-5 w-5 text-blue-400" />
                    </div>
                    <div className="ml-4">
                      <p className="text-sm font-medium text-gray-300">Email</p>
                      <a href="mailto:hitchcockzack@gmail.com" className="text-sm text-gray-400 hover:text-white transition-colors">
                        hitchcockzack@gmail.com
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <div className="flex-shrink-0 w-10 h-10 rounded-full bg-purple-500/10 flex items-center justify-center">
                      <Phone className="h-5 w-5 text-purple-400" />
                    </div>
                    <div className="ml-4">
                      <p className="text-sm font-medium text-gray-300">Phone</p>
                      <a href="tel:+16175865962" className="text-sm text-gray-400 hover:text-white transition-colors">
                        +1 (617) 586-5962
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <div className="flex-shrink-0 w-10 h-10 rounded-full bg-pink-500/10 flex items-center justify-center">
                      <svg className="h-5 w-5 text-pink-400" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M2 12H22" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M12 2C14.5013 4.73835 15.9228 8.29203 16 12C15.9228 15.708 14.5013 19.2616 12 22C9.49872 19.2616 8.07725 15.708 8 12C8.07725 8.29203 9.49872 4.73835 12 2V2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </div>
                    <div className="ml-4">
                      <p className="text-sm font-medium text-gray-300">Website</p>
                      <a href="https://hitchcode.net" target="_blank" rel="noopener noreferrer" className="text-sm text-gray-400 hover:text-white transition-colors">
                        hitchcode.net
                      </a>
                    </div>
                  </div>
                </div>

                <div className="mt-10 pt-6 border-t border-white/10">
                  <div className="flex space-x-4">
                    <a href="https://www.linkedin.com/in/zack-hitchcock-17841a219/" target="_blank" rel="noopener noreferrer" className="p-2 rounded-full bg-white/5 hover:bg-white/10 transition-colors" aria-label="LinkedIn">
                      <Linkedin className="h-5 w-5" />
                    </a>
                  </div>
                </div>
              </div>

              {/* Digital Business Card Promotion */}
              <div className="relative overflow-hidden rounded-xl border border-white/10 shadow-xl">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-900/20 to-purple-900/20" />
                <div className="absolute inset-0 backdrop-blur-sm" />

                <div className="relative p-6">
                  <div className="mb-4">
                    <svg width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-blue-400">
                      <path d="M20 8H4V18H20V8Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M8 5V18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M13 8V18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M4 12H20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>

                  <h3 className="text-lg font-medium mb-2">Digital Business Card</h3>
                  <p className="text-gray-400 text-sm mb-6">
                    Visit my digital business card to easily save my contact details or share with others.
                  </p>

                  <Link
                    href="/greeting"
                    className="inline-flex items-center text-sm px-4 py-2 rounded-md border border-white/20 hover:bg-white/5 transition-colors"
                  >
                    View Business Card
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Expertise Highlight Section */}
      <section className="relative z-10 border-t border-white/10 py-12 md:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-xl font-medium text-center mb-10">Technical Specialties</h2>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8">
            <div className="p-5 rounded-lg bg-white/5 text-center hover:bg-white/[0.07] transition-colors duration-300">
              <div className="font-mono text-xs px-2 py-1 rounded bg-white/10 inline-block mb-3 text-blue-400">&lt;/&gt;</div>
              <p className="font-medium mb-1">Frontend</p>
              <p className="text-xs text-gray-400">React, Next.js, TypeScript</p>
            </div>

            <div className="p-5 rounded-lg bg-white/5 text-center hover:bg-white/[0.07] transition-colors duration-300">
              <div className="font-mono text-xs px-2 py-1 rounded bg-white/10 inline-block mb-3 text-purple-400">{ '{' } { '}' }</div>
              <p className="font-medium mb-1">Backend</p>
              <p className="text-xs text-gray-400">Node.js, Express, API Design</p>
            </div>

            <div className="p-5 rounded-lg bg-white/5 text-center hover:bg-white/[0.07] transition-colors duration-300">
              <div className="font-mono text-xs px-2 py-1 rounded bg-white/10 inline-block mb-3 text-pink-400">db</div>
              <p className="font-medium mb-1">Databases</p>
              <p className="text-xs text-gray-400">MongoDB, PostgreSQL, Redis</p>
            </div>

            <div className="p-5 rounded-lg bg-white/5 text-center hover:bg-white/[0.07] transition-colors duration-300">
              <div className="font-mono text-xs px-2 py-1 rounded bg-white/10 inline-block mb-3 text-green-400">CI/CD</div>
              <p className="font-medium mb-1">DevOps</p>
              <p className="text-xs text-gray-400">Docker, AWS, GitHub Actions</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 py-6 border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center space-x-3 mb-4 md:mb-0">
            <div className="h-6 w-6 rounded-md bg-gradient-to-br from-blue-600 to-purple-600"></div>
            <span className={`${jetbrains.className} text-sm font-medium tracking-wide`}>HITCHCODE</span>
          </div>

          <div className="text-xs text-gray-500">
            &copy; {new Date().getFullYear()} HitchCode. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}
