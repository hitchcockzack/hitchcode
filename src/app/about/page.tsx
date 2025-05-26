'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { JetBrains_Mono, Inter } from 'next/font/google';
import {
  Code,
  Lightbulb,
  Rocket,
  Users,
  Clock,
  Target,
  Zap,
  Award,
  ChevronRight,
  ArrowRight,
  Heart,
  Coffee,
  Brain,
  Smartphone,
  Monitor,
  Database,
  Cloud,
  Palette,
  Settings,
  Globe,
  Star,
  BookOpen,
  TrendingUp
} from 'lucide-react';

const jetbrains = JetBrains_Mono({ subsets: ['latin'] });
const inter = Inter({ subsets: ['latin'] });

const skills = [
  { name: 'React & Next.js', level: 98, category: 'Frontend' },
  { name: 'TypeScript', level: 96, category: 'Languages' },
  { name: 'Node.js', level: 94, category: 'Backend' },
  { name: 'Python', level: 92, category: 'Languages' },
  { name: 'PostgreSQL', level: 90, category: 'Database' },
  { name: 'AWS/Cloud', level: 88, category: 'DevOps' },
  { name: 'UI/UX Design', level: 85, category: 'Design' },
  { name: 'Mobile Development', level: 83, category: 'Mobile' }
];

const achievements = [
  {
    year: '2024',
    title: 'Full-Stack Mastery',
    description: 'Completed advanced certification in modern web development, specializing in React ecosystem and cloud architecture.',
    icon: Award,
    gradient: 'from-blue-500 to-cyan-500'
  },
  {
    year: '2023',
    title: 'Client Success Rate',
    description: '100% client satisfaction with on-time delivery across 50+ projects, ranging from startups to enterprise solutions.',
    icon: Target,
    gradient: 'from-purple-500 to-pink-500'
  },
  {
    year: '2022',
    title: 'Innovation Award',
    description: 'Recognized for developing cutting-edge automation solutions that increased client productivity by 300%.',
    icon: Lightbulb,
    gradient: 'from-orange-500 to-red-500'
  },
  {
    year: '2021',
    title: 'Technical Leadership',
    description: 'Led cross-functional teams in delivering complex software solutions, mentoring junior developers.',
    icon: Users,
    gradient: 'from-green-500 to-emerald-500'
  }
];

const values = [
  {
    title: 'Innovation First',
    description: 'Every line of code is an opportunity to push boundaries and create something extraordinary.',
    icon: Rocket,
    color: 'text-blue-400'
  },
  {
    title: 'Quality Obsessed',
    description: 'Perfection isn\'t an accident. It\'s the result of meticulous attention to detail and rigorous testing.',
    icon: Star,
    color: 'text-purple-400'
  },
  {
    title: 'Client Partnership',
    description: 'Your success is my success. I don\'t just build software, I build lasting business relationships.',
    icon: Heart,
    color: 'text-pink-400'
  },
  {
    title: 'Continuous Growth',
    description: 'Technology evolves rapidly. I stay ahead by constantly learning and adapting to new paradigms.',
    icon: TrendingUp,
    color: 'text-green-400'
  }
];

const techStack = [
  { name: 'Frontend', tools: ['React', 'Next.js', 'TypeScript', 'Tailwind CSS'], icon: Monitor },
  { name: 'Backend', tools: ['Node.js', 'Python', 'Express', 'FastAPI'], icon: Database },
  { name: 'Mobile', tools: ['React Native', 'Expo', 'Flutter'], icon: Smartphone },
  { name: 'Cloud & DevOps', tools: ['AWS', 'Vercel', 'Docker', 'CI/CD'], icon: Cloud },
  { name: 'Design', tools: ['Figma', 'Adobe Creative Suite', 'Framer'], icon: Palette },
  { name: 'Tools', tools: ['Git', 'VS Code', 'Linear', 'Notion'], icon: Settings }
];

export default function AboutPage() {
  const [activeSkill, setActiveSkill] = useState<number | null>(null);
  const [playedIntro, setPlayedIntro] = useState(false);
  const [currentQuote, setCurrentQuote] = useState(0);

  const quotes = [
    "Code is poetry written for machines but crafted for humans.",
    "Great software isn't just functional—it's transformational.",
    "Every bug is a puzzle waiting to be solved with creativity."
  ];

  useEffect(() => {
    const timer = setTimeout(() => {
      setPlayedIntro(true);
    }, 500);

    // Rotating quotes
    const quoteInterval = setInterval(() => {
      setCurrentQuote((prev) => (prev + 1) % quotes.length);
    }, 4000);

    // Intersection Observer for reveal animations
    const observerOptions = {
      root: null,
      rootMargin: '0px',
      threshold: 0.1
    };

    const handleIntersect = (entries: IntersectionObserverEntry[], observer: IntersectionObserver) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed');
          observer.unobserve(entry.target);
        }
      });
    };

    const observer = new IntersectionObserver(handleIntersect, observerOptions);
    document.querySelectorAll('.reveal-item').forEach(item => {
      observer.observe(item);
    });

    return () => {
      clearTimeout(timer);
      clearInterval(quoteInterval);
      observer.disconnect();
    };
  }, []);

  return (
    <div className={`min-h-screen w-full bg-black text-white flex flex-col ${inter.className}`}>
      {/* Background Elements */}
      <div className="fixed inset-0 z-0 opacity-10 pointer-events-none">
        <div className="h-full w-full bg-[linear-gradient(to_right,#ffffff_1px,transparent_1px),linear-gradient(to_bottom,#ffffff_1px,transparent_1px)] bg-[size:80px_80px]" />
      </div>

      {/* Global accent lines */}
      <div className="fixed top-0 left-0 w-4 h-screen bg-gradient-to-b from-blue-600/30 via-purple-600/30 to-transparent z-0" />
      <div className="fixed top-0 right-0 w-4 h-screen bg-gradient-to-b from-transparent via-purple-600/30 to-blue-600/30 z-0" />

      {/* Floating gradient orbs */}
      <div className="fixed -top-40 -left-40 w-80 h-80 bg-blue-600/20 rounded-full filter blur-[100px] animate-pulse" />
      <div className="fixed -bottom-40 -right-40 w-80 h-80 bg-purple-600/20 rounded-full filter blur-[100px] animate-pulse" style={{ animationDelay: '2s' }} />

      <main className="flex-1 relative z-10">
        {/* Hero Section */}
        <section className="relative min-h-[90vh] flex items-center justify-center py-20 overflow-hidden">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className={`text-center transform transition-all duration-1000 ease-out ${playedIntro ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}>
              {/* Profile Image Placeholder */}
              <div className="w-32 h-32 mx-auto mb-8 relative">
                <div className="w-full h-full rounded-full bg-gradient-to-br from-blue-500 to-purple-600 p-1">
                  <div className="w-full h-full rounded-full bg-black flex items-center justify-center">
                    <Code className="w-12 h-12 text-blue-400" />
                  </div>
                </div>
                <div className="absolute -inset-4 rounded-full bg-gradient-to-r from-blue-500/20 to-purple-500/20 blur-xl animate-pulse" />
              </div>

              <h1 className={`${jetbrains.className} text-4xl sm:text-6xl md:text-7xl font-bold mb-6 tracking-tight`}>
                <span className="bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">Zack Hitchcock</span>
              </h1>

              <div className="mb-8">
                <p className="text-xl md:text-2xl text-gray-300 mb-4">
                  Full-Stack Developer & Digital Architect
                </p>
                <div className="h-8 flex items-center justify-center">
                  <p className="text-lg text-gray-400 italic min-h-[2rem] transition-all duration-500">
                    "{quotes[currentQuote]}"
                  </p>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
                <Link
                  href="/contact"
                  className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white rounded-md font-medium transition-all duration-300 min-w-[160px] text-center"
                >
                  Let's Work Together
                </Link>
                <Link
                  href="/services/full-stack-development"
                  className="px-6 py-3 bg-white/5 border border-white/10 hover:bg-white/10 rounded-md font-medium transition-colors min-w-[160px] text-center group"
                >
                  <span className="inline-flex items-center">
                    View My Work
                    <ChevronRight className="h-4 w-4 ml-2 transition-transform duration-300 group-hover:translate-x-1" />
                  </span>
                </Link>
              </div>

              {/* Quick Stats */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-2xl mx-auto">
                {[
                  { number: '50+', label: 'Projects Completed' },
                  { number: '100%', label: 'Client Satisfaction' },
                  { number: '5+', label: 'Years Experience' },
                  { number: '24/7', label: 'Support Available' }
                ].map((stat, index) => (
                  <div key={index} className="text-center">
                    <div className={`text-2xl md:text-3xl font-bold ${jetbrains.className} bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent`}>
                      {stat.number}
                    </div>
                    <div className="text-sm text-gray-400 mt-1">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* My Story Section */}
        <section className="relative py-24 border-t border-white/10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <div className="reveal-item opacity-0 transition-all duration-1000 translate-y-8" style={{ transitionDelay: '100ms' }}>
                <h2 className={`${jetbrains.className} text-3xl md:text-4xl font-bold text-center mb-16`}>
                  <span className="bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">My Journey</span>
                </h2>

                <div className="prose prose-lg prose-invert max-w-none">
                  <div className="bg-gradient-to-br from-gray-900/50 to-gray-800/30 backdrop-blur-sm rounded-xl border border-white/10 p-8 md:p-12 mb-12">
                    <div className="flex items-start space-x-4 mb-6">
                      <div className="w-12 h-12 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center flex-shrink-0">
                        <Heart className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h3 className="text-xl font-semibold mb-4 text-blue-400">The Spark</h3>
                        <p className="text-gray-300 leading-relaxed">
                          My journey began not in a computer science classroom, but in a moment of pure frustration. Watching my
                          mother struggle with outdated business software that made simple tasks unnecessarily complex, I knew there
                          had to be a better way. That night, I wrote my first line of code—not for a grade or a job, but to solve
                          a real problem for someone I cared about.
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-gradient-to-br from-gray-900/50 to-gray-800/30 backdrop-blur-sm rounded-xl border border-white/10 p-8 md:p-12 mb-12">
                    <div className="flex items-start space-x-4 mb-6">
                      <div className="w-12 h-12 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center flex-shrink-0">
                        <Brain className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h3 className="text-xl font-semibold mb-4 text-purple-400">The Evolution</h3>
                        <p className="text-gray-300 leading-relaxed">
                          What started as a simple automation script grew into a passion for creating software that doesn't just
                          work—it transforms how people interact with technology. I've spent thousands of hours not just learning
                          programming languages, but understanding the psychology of user experience, the art of clean architecture,
                          and the science of scalable systems.
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-gradient-to-br from-gray-900/50 to-gray-800/30 backdrop-blur-sm rounded-xl border border-white/10 p-8 md:p-12">
                    <div className="flex items-start space-x-4 mb-6">
                      <div className="w-12 h-12 rounded-full bg-gradient-to-r from-green-500 to-blue-500 flex items-center justify-center flex-shrink-0">
                        <Rocket className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h3 className="text-xl font-semibold mb-4 text-green-400">The Mission</h3>
                        <p className="text-gray-300 leading-relaxed">
                          Today, I wake up every morning with the same goal: to bridge the gap between complex technology and
                          human needs. Every project I take on isn't just about code—it's about understanding your vision,
                          anticipating challenges, and delivering solutions that exceed expectations. I believe that the best
                          software is invisible to its users, powerful in its capabilities, and transformative in its impact.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Core Values Section */}
        <section className="relative py-24 border-t border-white/10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16 reveal-item opacity-0 transition-all duration-1000 translate-y-8" style={{ transitionDelay: '100ms' }}>
              <h2 className={`${jetbrains.className} text-3xl md:text-4xl font-bold mb-6`}>
                <span className="bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">Core Values</span>
              </h2>
              <p className="text-gray-400 text-lg max-w-2xl mx-auto">
                These principles guide every decision I make and every line of code I write
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {values.map((value, index) => {
                const Icon = value.icon;
                return (
                  <div
                    key={index}
                    className="reveal-item opacity-0 transition-all duration-700 translate-y-8 group"
                    style={{ transitionDelay: `${200 + index * 100}ms` }}
                  >
                    <div className="h-full p-8 bg-gradient-to-br from-gray-900/50 to-gray-800/30 backdrop-blur-sm rounded-xl border border-white/10 hover:border-white/20 transition-all duration-300 hover:translate-y-[-4px] shadow-xl">
                      <div className="flex items-start space-x-4">
                        <div className={`w-12 h-12 rounded-lg bg-gradient-to-r ${value.color === 'text-blue-400' ? 'from-blue-500/20 to-blue-600/20' : value.color === 'text-purple-400' ? 'from-purple-500/20 to-purple-600/20' : value.color === 'text-pink-400' ? 'from-pink-500/20 to-pink-600/20' : 'from-green-500/20 to-green-600/20'} flex items-center justify-center flex-shrink-0`}>
                          <Icon className={`w-6 h-6 ${value.color}`} />
                        </div>
                        <div>
                          <h3 className="text-xl font-semibold mb-3 text-white">{value.title}</h3>
                          <p className="text-gray-400 leading-relaxed">{value.description}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Skills & Expertise Section */}
        <section className="relative py-24 border-t border-white/10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16 reveal-item opacity-0 transition-all duration-1000 translate-y-8" style={{ transitionDelay: '100ms' }}>
              <h2 className={`${jetbrains.className} text-3xl md:text-4xl font-bold mb-6`}>
                <span className="bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">Technical Expertise</span>
              </h2>
              <p className="text-gray-400 text-lg max-w-2xl mx-auto">
                Constantly evolving skillset built through years of hands-on experience and continuous learning
              </p>
            </div>

            {/* Tech Stack Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
              {techStack.map((category, index) => {
                const Icon = category.icon;
                return (
                  <div
                    key={index}
                    className="reveal-item opacity-0 transition-all duration-700 translate-y-8"
                    style={{ transitionDelay: `${200 + index * 100}ms` }}
                  >
                    <div className="h-full p-6 bg-gradient-to-br from-gray-900/50 to-gray-800/30 backdrop-blur-sm rounded-xl border border-white/10 hover:border-white/20 transition-all duration-300 shadow-xl">
                      <div className="flex items-center space-x-3 mb-4">
                        <Icon className="w-6 h-6 text-blue-400" />
                        <h3 className="text-lg font-semibold">{category.name}</h3>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {category.tools.map((tool, toolIndex) => (
                          <span
                            key={toolIndex}
                            className="px-3 py-1 text-xs bg-white/5 border border-white/10 rounded-full text-gray-300"
                          >
                            {tool}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Skills Progress Bars */}
            <div className="max-w-4xl mx-auto">
              <h3 className="text-xl font-semibold mb-8 text-center">Proficiency Levels</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {skills.map((skill, index) => (
                  <div
                    key={index}
                    className="reveal-item opacity-0 transition-all duration-700 translate-y-8 group"
                    style={{ transitionDelay: `${400 + index * 50}ms` }}
                    onMouseEnter={() => setActiveSkill(index)}
                    onMouseLeave={() => setActiveSkill(null)}
                  >
                    <div className="p-4 bg-gradient-to-br from-gray-900/30 to-gray-800/20 rounded-lg border border-white/5 hover:border-white/10 transition-all duration-300">
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-sm font-medium">{skill.name}</span>
                        <span className="text-xs text-gray-400">{skill.category}</span>
                      </div>
                      <div className="w-full bg-gray-800 rounded-full h-2">
                        <div
                          className={`h-2 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 transition-all duration-1000 ease-out ${activeSkill === index ? 'shadow-lg shadow-blue-500/25' : ''}`}
                          style={{
                            width: `${skill.level}%`,
                            transitionDelay: `${600 + index * 50}ms`
                          }}
                        />
                      </div>
                      <div className="text-xs text-gray-500 mt-1 text-right">{skill.level}%</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Achievements Timeline */}
        <section className="relative py-24 border-t border-white/10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16 reveal-item opacity-0 transition-all duration-1000 translate-y-8" style={{ transitionDelay: '100ms' }}>
              <h2 className={`${jetbrains.className} text-3xl md:text-4xl font-bold mb-6`}>
                <span className="bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">Key Milestones</span>
              </h2>
              <p className="text-gray-400 text-lg max-w-2xl mx-auto">
                Major achievements that have shaped my professional journey
              </p>
            </div>

            <div className="max-w-4xl mx-auto">
              <div className="space-y-8">
                {achievements.map((achievement, index) => {
                  const Icon = achievement.icon;
                  return (
                    <div
                      key={index}
                      className="reveal-item opacity-0 transition-all duration-700 translate-y-8 group"
                      style={{ transitionDelay: `${200 + index * 150}ms` }}
                    >
                      <div className="flex items-start space-x-6 p-8 bg-gradient-to-br from-gray-900/50 to-gray-800/30 backdrop-blur-sm rounded-xl border border-white/10 hover:border-white/20 transition-all duration-300 hover:translate-y-[-2px] shadow-xl">
                        <div className="flex-shrink-0">
                          <div className={`w-16 h-16 rounded-xl bg-gradient-to-r ${achievement.gradient} flex items-center justify-center`}>
                            <Icon className="w-8 h-8 text-white" />
                          </div>
                        </div>
                        <div className="flex-grow">
                          <div className="flex items-center space-x-4 mb-3">
                            <span className={`${jetbrains.className} text-2xl font-bold bg-gradient-to-r ${achievement.gradient} bg-clip-text text-transparent`}>
                              {achievement.year}
                            </span>
                            <div className="flex-grow h-px bg-gradient-to-r from-white/20 to-transparent" />
                          </div>
                          <h3 className="text-xl font-semibold mb-3 text-white">{achievement.title}</h3>
                          <p className="text-gray-400 leading-relaxed">{achievement.description}</p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </section>

        {/* Fun Facts Section */}
        <section className="relative py-24 border-t border-white/10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16 reveal-item opacity-0 transition-all duration-1000 translate-y-8" style={{ transitionDelay: '100ms' }}>
              <h2 className={`${jetbrains.className} text-3xl md:text-4xl font-bold mb-6`}>
                <span className="bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">Beyond the Code</span>
              </h2>
              <p className="text-gray-400 text-lg max-w-2xl mx-auto">
                A few fun facts about me that might surprise you
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  icon: Coffee,
                  title: 'Coffee Connoisseur',
                  description: 'I\'ve perfected the art of brewing the perfect cup to fuel late-night coding sessions.',
                  color: 'from-amber-500 to-orange-500'
                },
                {
                  icon: BookOpen,
                  title: 'Lifelong Learner',
                  description: 'Currently reading 3 books simultaneously about AI, design psychology, and business strategy.',
                  color: 'from-green-500 to-teal-500'
                },
                {
                  icon: Globe,
                  title: 'Digital Nomad',
                  description: 'I\'ve coded from 15+ countries, bringing global perspectives to every project.',
                  color: 'from-purple-500 to-pink-500'
                }
              ].map((fact, index) => {
                const Icon = fact.icon;
                return (
                  <div
                    key={index}
                    className="reveal-item opacity-0 transition-all duration-700 translate-y-8 group"
                    style={{ transitionDelay: `${200 + index * 100}ms` }}
                  >
                    <div className="h-full p-8 bg-gradient-to-br from-gray-900/50 to-gray-800/30 backdrop-blur-sm rounded-xl border border-white/10 hover:border-white/20 transition-all duration-300 hover:translate-y-[-4px] shadow-xl text-center">
                      <div className={`w-16 h-16 mx-auto mb-6 rounded-full bg-gradient-to-r ${fact.color} flex items-center justify-center`}>
                        <Icon className="w-8 h-8 text-white" />
                      </div>
                      <h3 className="text-xl font-semibold mb-4 text-white">{fact.title}</h3>
                      <p className="text-gray-400 leading-relaxed">{fact.description}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="relative py-24 border-t border-white/10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="reveal-item opacity-0 transition-all duration-1000 translate-y-8" style={{ transitionDelay: '100ms' }}>
              <h2 className={`${jetbrains.className} text-3xl md:text-4xl font-bold mb-6`}>
                <span className="bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">Ready to Create Something Amazing?</span>
              </h2>
              <p className="text-gray-400 text-lg max-w-2xl mx-auto mb-12">
                Whether you have a clear vision or just an idea, I'm here to help bring your digital dreams to life.
                Let's start a conversation about what we can build together.
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link
                  href="/contact"
                  className="px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white rounded-md font-medium transition-all duration-300 min-w-[200px] text-center inline-flex items-center justify-center group"
                >
                  Start Your Project
                  <ArrowRight className="ml-2 h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
                </Link>
                <Link
                  href="/services/full-stack-development"
                  className="px-8 py-4 bg-white/5 border border-white/10 hover:bg-white/10 rounded-md font-medium transition-colors min-w-[200px] text-center"
                >
                  Explore Services
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>

      <style jsx global>{`
        .reveal-item {
          opacity: 1;
          transform: translateY(0);
          transition: opacity 1s ease-out, transform 1s ease-out;
        }

        .reveal-item.revealed {
          opacity: 1;
          transform: translateY(0);
        }

        @media (max-width: 768px) {
          .prose {
            font-size: 16px;
          }
        }
      `}</style>
    </div>
  );
}
