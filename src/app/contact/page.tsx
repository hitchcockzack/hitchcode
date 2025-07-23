'use client';

import { useState, FormEvent, useEffect } from 'react';
import Link from 'next/link';
import { Inter } from 'next/font/google';
import { Send, ArrowRight, Mail, Linkedin, Phone, Download, CheckCircle, Clock, Users, Zap } from 'lucide-react';

const inter = Inter({ subsets: ['latin'] });

// Scroll reveal hook for smooth animations
const useScrollReveal = () => {
  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: '0px 0px -100px 0px',
      threshold: 0.1
    }

    const handleIntersect = (entries: IntersectionObserverEntry[]) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-in')
        }
      })
    }

    const observer = new IntersectionObserver(handleIntersect, observerOptions)
    document.querySelectorAll('.reveal-on-scroll').forEach(item => {
      observer.observe(item)
    })

    return () => observer.disconnect()
  }, [])
}

export default function ContactPage() {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    company: '',
    message: ''
  });
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});

  useScrollReveal();

  const validateForm = () => {
    const errors: Record<string, string> = {};
    if (!formState.name.trim()) errors.name = "Name is required";
    if (!formState.email.trim()) {
      errors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formState.email)) {
      errors.email = "Please enter a valid email";
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
        setFormState({ name: '', email: '', company: '', message: '' });
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

  return (
    <div className={`min-h-screen bg-white ${inter.className}`}>
      {/* Hero Section */}
      <section className="relative py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">

            {/* Status indicator */}
            <div className="reveal-on-scroll opacity-0 translate-y-4 transition-all duration-500 mb-8">
              <div className="inline-flex items-center px-4 py-2 bg-green-50 border border-green-200 rounded-full text-sm text-green-700">
                <div className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse" />
                Available for new projects
              </div>
            </div>

            {/* Main headline */}
            <div className="reveal-on-scroll opacity-0 translate-y-8 transition-all duration-700 mb-8" style={{ transitionDelay: '200ms' }}>
              <h1 className="text-5xl md:text-6xl font-bold text-zinc-900 mb-6 tracking-tight">
                Let's Build Something
                <br />
                <span className="text-zinc-600">Exceptional</span>
              </h1>

              <p className="text-xl text-zinc-700 max-w-3xl mx-auto leading-relaxed">
                Ready to eliminate operational friction and unlock your team's potential?
                Let's discuss how intelligent automation can transform your business.
              </p>
            </div>

            {/* Value props */}
            <div className="reveal-on-scroll opacity-0 translate-y-8 transition-all duration-700 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-3xl mx-auto" style={{ transitionDelay: '400ms' }}>
              <div className="text-center">
                <div className="w-12 h-12 bg-blue-50 rounded-lg flex items-center justify-center mx-auto mb-3">
                  <Clock className="h-6 w-6 text-blue-600" />
                </div>
                <div className="text-sm font-medium text-zinc-900">Quick Response</div>
                <div className="text-xs text-zinc-600">Usually within 24 hours</div>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-blue-50 rounded-lg flex items-center justify-center mx-auto mb-3">
                  <Users className="h-6 w-6 text-blue-600" />
                </div>
                <div className="text-sm font-medium text-zinc-900">Strategic Partnership</div>
                <div className="text-xs text-zinc-600">CTO-level guidance</div>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-blue-50 rounded-lg flex items-center justify-center mx-auto mb-3">
                  <Zap className="h-6 w-6 text-blue-600" />
                </div>
                <div className="text-sm font-medium text-zinc-900">Proven Results</div>
                <div className="text-xs text-zinc-600">50+ successful transformations</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Form Section */}
      <section className="relative py-24 bg-zinc-50/50 border-t border-zinc-200">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">

              {/* Contact Form */}
              <div className="lg:col-span-2">
                <div className="reveal-on-scroll opacity-0 translate-y-8 transition-all duration-700">
                  <div className="bg-white border border-zinc-200 rounded-xl p-8 shadow-sm">
                    <div className="mb-8">
                      <h2 className="text-2xl font-semibold text-zinc-900 mb-2">Start a Conversation</h2>
                      <p className="text-zinc-600">
                        Tell me about your challenges, ideas, or questions. I'll get back to you with insights and next steps.
                      </p>
                    </div>

                    {!isSubmitted ? (
                      <form onSubmit={handleSubmit} className="space-y-6">
                        {/* Name and Email Row */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div>
                            <label htmlFor="name" className="block text-sm font-medium text-zinc-700 mb-2">
                              Name *
                            </label>
                            <input
                              type="text"
                              id="name"
                              name="name"
                              value={formState.name}
                              onChange={handleInputChange}
                              className={`w-full px-4 py-3 border rounded-lg text-zinc-900 placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 ${
                                formErrors.name ? 'border-red-300 bg-red-50' : 'border-zinc-300 hover:border-zinc-400'
                              }`}
                              placeholder="Your name"
                            />
                            {formErrors.name && (
                              <p className="mt-1 text-sm text-red-600">{formErrors.name}</p>
                            )}
                          </div>

                          <div>
                            <label htmlFor="email" className="block text-sm font-medium text-zinc-700 mb-2">
                              Email *
                            </label>
                            <input
                              type="email"
                              id="email"
                              name="email"
                              value={formState.email}
                              onChange={handleInputChange}
                              className={`w-full px-4 py-3 border rounded-lg text-zinc-900 placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 ${
                                formErrors.email ? 'border-red-300 bg-red-50' : 'border-zinc-300 hover:border-zinc-400'
                              }`}
                              placeholder="your@email.com"
                            />
                            {formErrors.email && (
                              <p className="mt-1 text-sm text-red-600">{formErrors.email}</p>
                            )}
                          </div>
                        </div>

                        {/* Company */}
                        <div>
                          <label htmlFor="company" className="block text-sm font-medium text-zinc-700 mb-2">
                            Company
                          </label>
                          <input
                            type="text"
                            id="company"
                            name="company"
                            value={formState.company}
                            onChange={handleInputChange}
                            className="w-full px-4 py-3 border border-zinc-300 hover:border-zinc-400 rounded-lg text-zinc-900 placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                            placeholder="Your company (optional)"
                          />
                        </div>

                        {/* Message */}
                        <div>
                          <label htmlFor="message" className="block text-sm font-medium text-zinc-700 mb-2">
                            Message *
                          </label>
                          <textarea
                            id="message"
                            name="message"
                            value={formState.message}
                            onChange={handleInputChange}
                            rows={6}
                            className={`w-full px-4 py-3 border rounded-lg text-zinc-900 placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 resize-none ${
                              formErrors.message ? 'border-red-300 bg-red-50' : 'border-zinc-300 hover:border-zinc-400'
                            }`}
                            placeholder="Tell me about your project, challenges, or questions. What operational friction is slowing you down?"
                          />
                          {formErrors.message && (
                            <p className="mt-1 text-sm text-red-600">{formErrors.message}</p>
                          )}
                        </div>

                        {/* Submit Button */}
                        <button
                          type="submit"
                          disabled={isSubmitting}
                          className="w-full md:w-auto px-8 py-4 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white rounded-lg font-semibold transition-colors duration-200 shadow-sm hover:shadow-md flex items-center justify-center"
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
                    ) : (
                      <div className="text-center py-12">
                        <div className="w-16 h-16 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-6">
                          <CheckCircle className="h-8 w-8 text-green-600" />
                        </div>
                        <h3 className="text-xl font-semibold text-zinc-900 mb-2">Message Sent Successfully</h3>
                        <p className="text-zinc-600 mb-6">
                          Thank you for reaching out. I'll review your message and respond within 24 hours with insights and next steps.
                        </p>
                        <button
                          onClick={() => setIsSubmitted(false)}
                          className="px-6 py-2 bg-zinc-100 hover:bg-zinc-200 text-zinc-700 rounded-lg font-medium transition-colors duration-200"
                        >
                          Send Another Message
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Contact Information */}
              <div className="lg:col-span-1">
                <div className="space-y-8">

                  {/* Contact Details */}
                  <div className="reveal-on-scroll opacity-0 translate-y-8 transition-all duration-700" style={{ transitionDelay: '200ms' }}>
                    <div className="bg-white border border-zinc-200 rounded-xl p-6 shadow-sm">
                      <h3 className="text-lg font-semibold text-zinc-900 mb-6">Get in Touch</h3>

                      <div className="space-y-4">
                        <div className="flex items-start">
                          <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center mr-3">
                            <Mail className="h-5 w-5 text-blue-600" />
                          </div>
                          <div>
                            <p className="text-sm font-medium text-zinc-900">Email</p>
                            <a
                              href="mailto:hitchcockzack@gmail.com"
                              className="text-sm text-zinc-600 hover:text-blue-600 transition-colors"
                            >
                              hitchcockzack@gmail.com
                            </a>
                          </div>
                        </div>

                        <div className="flex items-start">
                          <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center mr-3">
                            <Phone className="h-5 w-5 text-blue-600" />
                          </div>
                          <div>
                            <p className="text-sm font-medium text-zinc-900">Phone</p>
                            <a
                              href="tel:+16175865962"
                              className="text-sm text-zinc-600 hover:text-blue-600 transition-colors"
                            >
                              +1 (617) 586-5962
                            </a>
                          </div>
                        </div>

                        <div className="flex items-start">
                          <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center mr-3">
                            <Linkedin className="h-5 w-5 text-blue-600" />
                          </div>
                          <div>
                            <p className="text-sm font-medium text-zinc-900">LinkedIn</p>
                            <a
                              href="https://www.linkedin.com/in/zack-hitchcock-17841a219/"
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-sm text-zinc-600 hover:text-blue-600 transition-colors"
                            >
                              Connect with me
                            </a>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Response Time */}
                  <div className="reveal-on-scroll opacity-0 translate-y-8 transition-all duration-700" style={{ transitionDelay: '400ms' }}>
                    <div className="bg-blue-50 border border-blue-200 rounded-xl p-6">
                      <h4 className="text-sm font-semibold text-blue-900 mb-3">What to Expect</h4>
                      <div className="space-y-3 text-sm text-blue-800">
                        <div className="flex items-start">
                          <div className="w-1.5 h-1.5 bg-blue-600 rounded-full mt-2 mr-3 flex-shrink-0" />
                          <p>Initial response within 24 hours</p>
                        </div>
                        <div className="flex items-start">
                          <div className="w-1.5 h-1.5 bg-blue-600 rounded-full mt-2 mr-3 flex-shrink-0" />
                          <p>Strategic consultation call within 3-5 days</p>
                        </div>
                        <div className="flex items-start">
                          <div className="w-1.5 h-1.5 bg-blue-600 rounded-full mt-2 mr-3 flex-shrink-0" />
                          <p>Custom proposal within 1 week</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Digital Business Card */}
                  <div className="reveal-on-scroll opacity-0 translate-y-8 transition-all duration-700" style={{ transitionDelay: '600ms' }}>
                    <div className="bg-white border border-zinc-200 rounded-xl p-6 shadow-sm">
                      <h4 className="text-sm font-semibold text-zinc-900 mb-3">Digital Business Card</h4>
                      <p className="text-sm text-zinc-600 mb-4">
                        View my interactive business card for easy contact sharing.
                      </p>
                      <Link
                        href="/greeting"
                        className="inline-flex items-center text-sm text-blue-600 hover:text-blue-700 font-medium transition-colors group"
                      >
                        View Card
                        <ArrowRight className="h-4 w-4 ml-1 group-hover:translate-x-1 transition-transform duration-200" />
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Custom CSS for animations */}
      <style jsx>{`
        .animate-in {
          opacity: 1 !important;
          transform: translateY(0) !important;
        }

        /* Focus styles for accessibility */
        .focus-visible:focus {
          outline: 2px solid #3A5AFF;
          outline-offset: 2px;
        }

        /* Reduce motion for accessibility */
        @media (prefers-reduced-motion: reduce) {
          .transition-all,
          .transition-colors,
          .transition-transform {
            transition: none;
          }

          .animate-pulse {
            animation: none;
          }
        }
      `}</style>
    </div>
  );
}
