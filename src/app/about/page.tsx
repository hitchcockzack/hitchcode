'use client';

import { useState, useEffect, lazy, Suspense } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Inter } from 'next/font/google';
import { sendNotification } from '../../lib/notifications';
import {
  ArrowRight,
  ChevronRight,
  Heart,
  Rocket,
  Star,
  TrendingUp,
  Settings,
  Target,
  Zap,
  Award,
  Users,
  Lightbulb
} from 'lucide-react';

import { BlurFade } from '../../components/magicui/blur-fade'
import { MagicCard } from '../../components/magicui/magic-card'
import { ShineBorder } from '../../components/magicui/shine-border'
import { BorderBeam } from '../../components/magicui/border-beam'

// Lazy load heavy components
const AchievementsSection = lazy(() => import('./components/AchievementsSection'));
const BeyondCodeSection = lazy(() => import('./components/BeyondCodeSection'));

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
    description: 'Recognized for developing cutting-edge automation solutions that increased internal productivity by 300%.',
    icon: Lightbulb,
    gradient: 'from-orange-500 to-red-500'
  },
  {
    year: '2021',
    title: 'Operations Project Manager',
    description: 'Led $3M+ projects with 3-5 teams of 4 operating concurrently in different locations.',
    icon: Users,
    gradient: 'from-green-500 to-emerald-500'
  }
];

const values = [
  {
    title: 'Innovation First',
    description: 'Every line of code is an opportunity to push boundaries and create something extraordinary.',
    icon: Rocket,
    color: 'blue'
  },
  {
    title: 'Quality Obsessed',
    description: 'Perfection isn\'t an accident. It\'s the result of meticulous attention to detail and rigorous testing.',
    icon: Star,
    color: 'purple'
  },
  {
    title: 'Client Partnership',
    description: 'Your success is my success. I don\'t just build software, I build lasting business relationships.',
    icon: Heart,
    color: 'pink'
  },
  {
    title: 'Continuous Growth',
    description: 'Technology evolves rapidly. I stay ahead by constantly learning and adapting to new paradigms.',
    icon: TrendingUp,
    color: 'green'
  }
];

export default function AboutPage() {
  const [currentQuote, setCurrentQuote] = useState(0);

  const quotes = [
    "Code is poetry written for machines but crafted for humans.",
    "Great software isn't just functional—it's transformational.",
    "Every bug is a puzzle waiting to be solved with creativity."
  ];

  useScrollReveal();

  useEffect(() => {
    // Rotating quotes
    const quoteInterval = setInterval(() => {
      setCurrentQuote((prev) => (prev + 1) % quotes.length);
    }, 4000);

    return () => {
      clearInterval(quoteInterval);
    };
  }, []);

  // Send notification when page is visited - debounced
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      sendNotification('👤 About page visited');
    }, 1000);
    return () => clearTimeout(timeoutId);
  }, []);

  return (
    <main className={`min-h-screen bg-black text-zinc-300 ${inter.className}`}>
      {/* Hero */}
      <section className="relative py-16 md:py-24">
        <div className="container mx-auto px-6 md:px-10">
          <div className="max-w-4xl mx-auto text-center">

            {/* Profile Image */}
            <BlurFade inView>
              <div className="w-32 h-32 mx-auto mb-6 relative">
                <div className="w-full h-full rounded-full border-4 border-zinc-800 overflow-hidden">
                  <Image
                      src="/optimized/zack.webp"
                      alt="Zack Hitchcock"
                      width={128}
                      height={128}
                      className="w-full h-full object-cover"
                      priority
                      placeholder="blur"
                      quality={85}
                      sizes="128px"
                      blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q=="
                    />
                  </div>
              </div>
            </BlurFade>

            {/* Main headline */}
            <BlurFade delay={0.08} inView>
              <h1 className="text-5xl md:text-6xl font-extrabold tracking-tighter leading-[1.07] bg-clip-text text-transparent bg-gradient-to-b from-zinc-100 to-zinc-500 drop-shadow-[0_0_18px_rgba(0,0,0,0.6)] pb-[10px] -mb-[10px]">
                Zack Hitchcock
                <br />
                <span className="text-zinc-400">Full-Stack Developer & Digital Architect</span>
              </h1>
            </BlurFade>

            <BlurFade delay={0.16} inView>
              <div className="mb-8">
                <div className="h-8 flex items-center justify-center">
                  <p className="text-lg text-zinc-400 italic min-h-[2rem] transition-all duration-500">"{quotes[currentQuote]}"</p>
                </div>
              </div>
            </BlurFade>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-14">
              <Link href="/contact" className="relative inline-flex items-center justify-center p-[3px] rounded-full group">
                <span className="absolute inset-0 rounded-full bg-gradient-to-r from-[#2563eb] to-[#a21caf]" />
                <span className="px-8 py-4 bg-black rounded-full text-white font-semibold relative transition-colors duration-200 group-hover:bg-transparent inline-flex items-center">Let's Work Together<ArrowRight className="ml-2 h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" /></span>
                <BorderBeam size={60} duration={7} className="via-white/40" />
              </Link>
              <Link href="/services/full-stack-development" className="px-8 py-4 bg-zinc-950/60 border border-zinc-800 hover:border-zinc-700 text-zinc-200 rounded-lg font-semibold transition-all duration-200 group inline-flex items-center">
                View My Work
                <ChevronRight className="h-4 w-4 ml-2 transition-transform duration-300 group-hover:translate-x-1" />
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
                  <div className="text-2xl md:text-3xl font-bold text-zinc-100">
                      {stat.number}
                  </div>
                  <div className="text-sm text-zinc-500 mt-1">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* My Story */}
      <section className="relative py-16 md:py-24 border-t border-zinc-800">
        <div className="container mx-auto px-6 md:px-10">
            <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-zinc-100 text-center mb-12">
                My Journey
              </h2>

              <div className="space-y-6 md:space-y-8">
                <div className="relative overflow-hidden rounded-2xl bg-zinc-950/60 border border-zinc-800">
                  <ShineBorder borderWidth={1} duration={16} shineColor={["#2563eb","#a21caf","#60a5fa"]} className="opacity-[0.22]" />
                  <MagicCard className="rounded-2xl p-8">
                    <div className="flex items-start gap-4 mb-4">
                      <div className="w-12 h-12 bg-blue-600/10 border border-blue-500/20 rounded-lg flex items-center justify-center flex-shrink-0">
                        <Settings className="w-6 h-6 text-blue-400" />
                      </div>
                      <div>
                        <h3 className="text-xl font-semibold mb-3 text-zinc-100">From Hands to Code</h3>
                        <p className="text-zinc-400 leading-relaxed">
                          My journey began with my hands and a toolbox. As a carpenter, I learned that every project starts with
                          understanding the problem, choosing the right tools, and building something that lasts. Then came the Army—as
                          an Airborne Infantryman, I discovered the power of precision, adaptability, and mission-critical thinking.
                          These weren't just jobs; they were neatly-packaged schools of thought, vehicles for problem-solving that would shape everything that followed.
                        </p>
                      </div>
                    </div>
                  </MagicCard>
                </div>

                <div className="relative overflow-hidden rounded-2xl bg-zinc-950/60 border border-zinc-800">
                  <ShineBorder borderWidth={1} duration={16} shineColor={["#2563eb","#a21caf","#60a5fa"]} className="opacity-[0.22]" />
                  <MagicCard className="rounded-2xl p-8">
                    <div className="flex items-start gap-4 mb-4">
                      <div className="w-12 h-12 bg-purple-600/10 border border-purple-500/20 rounded-lg flex items-center justify-center flex-shrink-0">
                        <Target className="w-6 h-6 text-purple-400" />
                      </div>
                      <div>
                        <h3 className="text-xl font-semibold mb-3 text-zinc-100">The Pivotal Moment</h3>
                        <p className="text-zinc-400 leading-relaxed">
                          Returning to construction, I was promoted to project manager—suddenly thrust from the field into an office chair,
                          surrounded by screens and spreadsheets. That's when it hit me: the computer wasn't just another tool—it was the
                          most powerful tool I had never fully embraced. Every construction project had taught me that the right tool makes
                          the impossible possible. It was time to master this one.
                        </p>
                      </div>
                    </div>
                  </MagicCard>
                </div>

                <div className="relative overflow-hidden rounded-2xl bg-zinc-950/60 border border-zinc-800">
                  <ShineBorder borderWidth={1} duration={16} shineColor={["#2563eb","#a21caf","#60a5fa"]} className="opacity-[0.22]" />
                  <MagicCard className="rounded-2xl p-8">
                    <div className="flex items-start gap-4 mb-4">
                      <div className="w-12 h-12 bg-emerald-600/10 border border-emerald-500/20 rounded-lg flex items-center justify-center flex-shrink-0">
                        <Zap className="w-6 h-6 text-emerald-400" />
                      </div>
                      <div>
                        <h3 className="text-xl font-semibold mb-3 text-zinc-100">Tools for Impact</h3>
                        <p className="text-zinc-400 leading-relaxed">
                          I dove headfirst into a software engineering bootcamp, bringing my problem-solver's mindset to code. While the
                          job market for new developers has shifted dramatically, I've found my true calling: using technology as a force
                          multiplier to solve problems for the community on a scale I never imagined possible. Every line of code is
                          a tool, every application a solution, every project an opportunity to build something that makes life better for everyone involved.
                        </p>
                      </div>
                    </div>
                  </MagicCard>
                </div>
                </div>
              </div>
            </div>
        </section>

        {/* Core Values */}
      <section className="relative py-16 md:py-24 border-t border-zinc-800">
        <div className="container mx-auto px-6 md:px-10">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-zinc-100 mb-4">Core Values</h2>
              <p className="text-zinc-400 text-lg max-w-2xl mx-auto">These principles guide every decision I make and every line of code I write</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
              {values.map((value, index) => {
                const Icon = value.icon;
                const colorClasses = {
                  blue: 'bg-blue-600/10 border border-blue-500/20 text-blue-400',
                  purple: 'bg-purple-600/10 border border-purple-500/20 text-purple-400',
                  pink: 'bg-pink-600/10 border border-pink-500/20 text-pink-400',
                  green: 'bg-green-600/10 border border-green-500/20 text-green-400'
                } as const;

                return (
                  <div key={index} className="relative overflow-hidden rounded-2xl bg-zinc-950/60 border border-zinc-800">
                    <ShineBorder borderWidth={1} duration={16} shineColor={["#2563eb","#a21caf","#60a5fa"]} className="opacity-[0.18]" />
                    <MagicCard className="rounded-2xl p-8">
                      <div className="flex items-start gap-4">
                        <div className={`w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0 ${colorClasses[value.color as keyof typeof colorClasses]}`}>
                          <Icon className="w-6 h-6" />
                        </div>
                        <div>
                          <h3 className="text-xl font-semibold mb-2 text-zinc-100">{value.title}</h3>
                          <p className="text-zinc-400 leading-relaxed">{value.description}</p>
                        </div>
                      </div>
                    </MagicCard>
                  </div>
                );
              })}
            </div>
            </div>
          </div>
        </section>

            {/* Beyond the Code */}
      <section className="relative py-16 md:py-24 border-t border-zinc-800">
        <div className="container mx-auto px-6 md:px-10">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-zinc-100 mb-4">
                Beyond the Code
              </h2>
              <p className="text-zinc-400 text-lg max-w-2xl mx-auto">
                Life is about more than just coding - here's what keeps me grounded and motivated
              </p>
            </div>

            {/* Personal Life Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 mb-16">

              {/* Dog Dad Section */}
              <div>
                <div className="h-full p-8 rounded-2xl bg-zinc-950/60 border border-zinc-800">
                  <div className="flex items-center mb-6">
                    <div className="w-12 h-12 bg-amber-600/10 border border-amber-500/20 rounded-lg flex items-center justify-center mr-4">
                      <Heart className="w-6 h-6 text-amber-400" />
                    </div>
                    <h3 className="text-2xl font-semibold text-zinc-100">Dog Dad</h3>
              </div>

                  <p className="text-zinc-400 leading-relaxed mb-6">
                    Meet Vito, my German Shepherd rescue and the best dog in the whole world. This guy is my adventure buddy,
                    workout partner, and constant companion. Whether we're exploring new trails, going for bike rides,
                    roller blading through the neighborhood, or just playing in the yard - he comes with me everywhere.
                  </p>

                  {/* Media Grid */}
                  <div className="space-y-4 mb-6">
                    {/* Full Width First Image */}
                    <div className="w-full overflow-hidden rounded-lg group">
                      <Image
                        src="/optimized/047B9985-47E4-457F-AE9A-E2F2910E8DBF.webp"
                        alt="Vito the German Shepherd"
                        width={800}
                        height={600}
                        className="w-full h-80 object-cover transition-transform duration-300 group-hover:scale-105"
                        loading="lazy"
                        placeholder="blur"
                        blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q=="
                      />
                      </div>

                    {/* Second Row: Image and Video */}
                    <div className="grid grid-cols-2 gap-4">
                      <div className="aspect-square overflow-hidden rounded-lg group">
                      <Image
                          src="/optimized/IMG_1691.webp"
                          alt="Adventures with Vito"
                          width={600}
                          height={400}
                          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                          loading="lazy"
                          placeholder="blur"
                          blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q=="
                        />
                      </div>

                      {/* Video Section */}
                      <div className="flex flex-col space-y-4">
                        <div className="aspect-square overflow-hidden rounded-lg relative group">
                          <video
                            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                            autoPlay
                            loop
                            muted
                            playsInline
                            width={300}
                            height={300}
                          >
                            <source src="/IMG_1915.mov" type="video/quicktime" />
                            <source src="/IMG_1915.mov" type="video/mp4" />
                            Your browser does not support the video tag.
                          </video>
                          <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                            <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
                              <div className="w-0 h-0 border-l-[6px] border-l-white border-y-[4px] border-y-transparent ml-1"></div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Fun Callout */}

                  </div>
                </div>
              </div>

              {/* Firefighter Section */}
              <div>
                <div className="h-full p-8 rounded-2xl bg-zinc-950/60 border border-zinc-800">
                  <div className="flex items-center mb-6">
                    <div className="w-12 h-12 bg-red-600/10 border border-red-500/20 rounded-lg flex items-center justify-center mr-4">
                      <Target className="w-6 h-6 text-red-400" />
                    </div>
                    <h3 className="text-2xl font-semibold text-zinc-100">Firefighter</h3>
                  </div>

                  <p className="text-zinc-400 leading-relaxed mb-6">
                    When I'm not coding, I serve my community as a firefighter. It's taught me the importance of
                    teamwork, quick decision-making under pressure, and always being ready to help others.
                    Plus, Vito gets to visit the station sometimes!
                  </p>

                  {/* Fire Department Image */}
                  <div className="relative overflow-hidden rounded-lg group mb-6">
                    <Image
                      src="/optimized/IMG_1360.webp"
                      alt="Zack and Vito at the fire station"
                      width={800}
                      height={600}
                      className="w-full h-128 object-cover transition-transform duration-300 group-hover:scale-105"
                      loading="lazy"
                      placeholder="blur"
                      blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q=="
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                     <div className="absolute bottom-4 left-4 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <p className="text-sm font-medium">Vito checking out the fire truck</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Army Veteran & World Traveler Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mt-16">

              {/* Army Veteran Section */}
              <div>
                <div className="h-full p-8 rounded-2xl bg-zinc-950/60 border border-zinc-800">
                  <div className="flex items-center mb-6">
                    <div className="w-12 h-12 bg-green-600/10 border border-green-500/20 rounded-lg flex items-center justify-center mr-4">
                      <Star className="w-6 h-6 text-green-400" />
                    </div>
                    <h3 className="text-2xl font-semibold text-zinc-100">Army Veteran</h3>
                  </div>

                  <p className="text-zinc-400 leading-relaxed mb-6">
                    Proud to have served as an Airborne Infantryman, stationed in Italy and North Carolina.
                    Deployed to Iraq in 2019, where I learned the true meaning of teamwork, leadership under pressure,
                    and the importance of mission accomplishment. The discipline and problem-solving skills from my
                    military service continue to shape how I approach every challenge today.
                  </p>

                  {/* Military Images */}
                  <div className="grid grid-cols-2 gap-4 mb-6">
                    <div className="aspect-square overflow-hidden rounded-lg group">
                      <Image
                        src="/optimized/IMG_6325.webp"
                        alt="Military service - Army training"
                        width={600}
                        height={400}
                        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                        loading="lazy"
                        placeholder="blur"
                        blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q=="
                      />
                    </div>
                    <div className="aspect-square overflow-hidden rounded-lg group">
                      <Image
                        src="/optimized/3A28D7A4-D601-4B60-8B1B-ABF447146B9F.webp"
                        alt="Deployment memories"
                        width={600}
                        height={400}
                        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                        loading="lazy"
                        placeholder="blur"
                        blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q=="
                      />
                    </div>
                    <div className="aspect-square overflow-hidden rounded-lg group col-span-2">
                      <Image
                        src="/optimized/IMG_1157.webp"
                        alt="Army service memories"
                        width={600}
                        height={400}
                        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                        loading="lazy"
                        placeholder="blur"
                        blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q=="
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* World Traveler Section */}
              <div>
                <div className="h-full p-8 rounded-2xl bg-zinc-950/60 border border-zinc-800">
                  <div className="flex items-center mb-6">
                    <div className="w-12 h-12 bg-teal-600/10 border border-teal-500/20 rounded-lg flex items-center justify-center mr-4">
                      <TrendingUp className="w-6 h-6 text-teal-400" />
                    </div>
                    <h3 className="text-2xl font-semibold text-zinc-100">World Traveler</h3>
                  </div>

                  <p className="text-zinc-400 leading-relaxed mb-6">
                    From military deployments to personal adventures, I've been fortunate to experience different
                    cultures and perspectives around the world. These experiences have broadened my worldview and
                    taught me that great solutions often come from understanding diverse approaches to problems.
                    Travel keeps me curious and adaptable.
                  </p>

                  {/* Travel Images */}
                  <div className="space-y-4 mb-6">
                    <div className="relative overflow-hidden rounded-lg group">
                      <Image
                        src="/optimized/review.webp"
                        alt="Positive host review showing character"
                        width={600}
                        height={400}
                         className="w-full h-64 object-contain object-center transition-transform duration-300 group-hover:scale-105"
                        loading="lazy"
                        placeholder="blur"
                        blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q=="
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    </div>
                    <div className="relative overflow-hidden rounded-lg group">
                      <Image
                        src="/optimized/IMG_8133.webp"
                        alt="Travel adventures around the world"
                        width={600}
                        height={400}
                        className="w-full h-64 object-cover transition-transform duration-300 group-hover:scale-105"
                        loading="lazy"
                        placeholder="blur"
                        blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q=="
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    </div>
                  </div>
                </div>
              </div>
              </div>
            </div>
          </div>
        </section>

        {/* Achievements Timeline - Lazy loaded */}
        <Suspense fallback={
        <div className="relative py-16 md:py-24 border-t border-zinc-800">
          <div className="container mx-auto px-6 md:px-10">
            <div className="max-w-7xl mx-auto">
              <div className="h-64 bg-zinc-900/60 border border-zinc-800 rounded-lg animate-pulse" />
            </div>
            </div>
          </div>
        }>
        <AchievementsSection achievements={achievements} jetbrains={inter} />
        </Suspense>



        {/* CTA */}
      <section className="py-20 md:py-24 border-t border-zinc-800">
        <div className="container mx-auto px-6 md:px-10">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-4xl md:text-5xl font-bold text-zinc-100 mb-6">Ready to Create Something Amazing?</h2>
            <p className="text-xl text-zinc-400 mb-10 leading-relaxed">Whether you have a clear vision or just an idea, I'm here to help bring your digital dreams to life. Let's start a conversation about what we can build together.</p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href="/contact" className="relative inline-flex items-center justify-center p-[3px] rounded-full group" prefetch>
                <span className="absolute inset-0 rounded-full bg-gradient-to-r from-[#2563eb] to-[#a21caf]" />
                <span className="px-8 py-4 bg-black rounded-full text-white font-semibold relative transition-colors duration-200 group-hover:bg-transparent inline-flex items-center">Start Your Project<ArrowRight className="ml-2 h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" /></span>
                <BorderBeam size={60} duration={7} className="via-white/40" />
              </Link>
              <Link href="/services/full-stack-development" className="px-8 py-4 bg-zinc-950/60 border border-zinc-800 hover:border-zinc-700 text-zinc-200 rounded-lg font-semibold transition-all duration-200" prefetch>Explore Services</Link>
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
    </main>
  );
}
