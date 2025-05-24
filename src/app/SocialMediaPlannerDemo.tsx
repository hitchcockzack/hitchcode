import React, { useState, useEffect, useRef } from 'react';
import type { JSX } from 'react';
import { Instagram, Youtube, Sparkles, TrendingUp, Zap, Clock, Target, Brain, MousePointer, Copy, ExternalLink, ChevronRight } from 'lucide-react';

// Enhanced trend data with real metrics
const trendingTopics = [
  {
    id: 1,
    keyword: 'Behind-the-Scenes',
    category: 'Authentic Content',
    platforms: ['Instagram', 'TikTok', 'YouTube'],
    engagement: '2.4M',
    growthRate: '+185%',
    viralPotential: 94,
    timeToTrend: '3-5 days',
    color: 'from-pink-500 to-rose-400',
    description: 'Show the real process and people behind your business'
  },
  {
    id: 2,
    keyword: 'Customer Transformations',
    category: 'Social Proof',
    platforms: ['Instagram', 'TikTok', 'YouTube'],
    engagement: '1.8M',
    growthRate: '+142%',
    viralPotential: 87,
    timeToTrend: '2-4 days',
    color: 'from-blue-500 to-cyan-400',
    description: 'Showcase amazing before/after results and customer stories'
  },
  {
    id: 3,
    keyword: 'Quick Tips & Hacks',
    category: 'Educational',
    platforms: ['Instagram', 'TikTok', 'YouTube'],
    engagement: '1.1M',
    growthRate: '+98%',
    viralPotential: 76,
    timeToTrend: '5-7 days',
    color: 'from-emerald-500 to-teal-400',
    description: 'Share valuable tips that establish expertise and help your audience'
  }
];

// Real-time data simulation
const liveMetrics = {
  totalReach: '4.8M',
  avgEngagement: '16.2%',
  viralPosts: 23,
  timeSpentPlanning: '3 min',
  timeSaved: '4.5 hrs'
};

// Content strategies for different business niches
const contentStrategies = {
  1: [ // Behind-the-Scenes
    {
      platform: 'Instagram',
      type: 'Reel + Carousel',
      business: 'Pet Grooming Studio',
      title: 'A Day in the Life: Transforming Pups',
      caption: `✨ Ever wondered what happens during those 3 hours your pup is with us? Here's the behind-the-scenes magic!

From the gentle welcome (with treats, obviously 🐕) to the final fluff and bow tie moment - every step is designed with love and expertise.

Today featuring Bella the Golden Retriever who went from beach dog to runway ready! 💫

What's your favorite part of the grooming process? Drop a 🐾 below!

#PetGrooming #DogGrooming #BehindTheScenes #PetCare #DogSalon #PetLove #LocalBusiness #DogGroomer #PetStylist #DogsOfInstagram`,
      estimatedReach: '15K - 35K',
      engagement: '18.5%',
      bestTime: '7:30 PM',
      contentBreakdown: `
REEL STRUCTURE (30 seconds):
• 0-3s: Quick montage of "before" shots
• 4-8s: Washing process with calming music
• 9-15s: Cutting and styling techniques
• 16-22s: Blow drying and brushing
• 23-30s: Final reveal with happy dog

CAROUSEL SLIDES:
1. Before photo with messy fur
2. Bath time action shot
3. Precision cutting close-up
4. Nail trimming process
5. Final glamour shot with bow tie

MUSIC: Trending audio "Transformation Tuesday"
HASHTAGS: Mix of niche + trending tags
CTA: "Book your pup's glow-up!" with link in bio`
    },
    {
      platform: 'TikTok',
      type: 'Day in the Life',
      business: 'Local Restaurant',
      title: 'What 5 AM Looks Like at Our Kitchen',
      caption: `POV: You're a chef who starts work before the sun rises ☀️ #ChefLife #RestaurantLife`,
      estimatedReach: '45K - 85K',
      engagement: '22.1%',
      bestTime: '9:15 PM',
      contentBreakdown: `
TIKTOK STRATEGY (60 seconds):

HOOK (0-3s): "5 AM and the magic begins..."
• Quick shot of empty kitchen
• Coffee brewing sound effect
• Time-lapse setup

CONTENT BLOCKS:
1. Prep Work (3-15s)
   - Chopping vegetables in rhythm to trending sound
   - Fresh ingredient close-ups
   - Knife skills showcase

2. Cooking Process (15-35s)
   - Sizzling pans and flames
   - Seasoning techniques
   - Multiple dishes being prepared simultaneously

3. Plating Artistry (35-50s)
   - Artistic food presentation
   - Garnish placement
   - Final dish reveal

4. Team Arrival (50-60s)
   - Staff arriving and energy building
   - "Ready for service!" moment

TRENDING SOUNDS: "Morning routine" + cooking ASMR
EFFECTS: Speed ramping, quick cuts, trending transitions
HASHTAGS: #ChefTok #RestaurantLife #FoodPrep #CookingSkills #LocalEats #BehindTheScenes #ChefLife #FoodService`
    },
    {
      platform: 'YouTube',
      type: 'Long-form Tutorial',
      business: 'Fitness Studio',
      title: 'How We Design Custom Workout Plans: Full Process Revealed',
      caption: `Take a deep dive into our client assessment and program design process. Perfect for aspiring trainers and fitness enthusiasts who want to understand the science behind effective training.`,
      estimatedReach: '8K - 18K',
      engagement: '28.7%',
      bestTime: '2:00 PM',
      contentBreakdown: `
YOUTUBE SCRIPT (12-15 minutes):

INTRO (0-60s):
"What's up, fitness family! I'm Sarah, and today I'm taking you behind the scenes to show you exactly how we create custom workout plans for our clients. Whether you're a trainer looking to improve your process or someone curious about what goes into your program, this video will break it all down."

CHAPTER 1: Initial Assessment (1-4 mins)
• Client consultation process
• Movement screening demonstration
• Goal setting framework
• Previous injury considerations

CHAPTER 2: Program Design (4-8 mins)
• Exercise selection criteria
• Progressive overload planning
• Periodization concepts
• Customization for different goals

CHAPTER 3: Real Client Example (8-12 mins)
• Walk through actual client case study
• Show program modifications over 12 weeks
• Results and adjustments made

CHAPTER 4: Pro Tips (12-15 mins)
• Common mistakes to avoid
• How to track progress effectively
• When to modify programs
• Client communication strategies

KEY ELEMENTS:
- Screen recordings of our planning software
- Whiteboard explanations of concepts
- Real client transformations (with permission)
- Downloadable template in description

SEO KEYWORDS: custom workout plans, personal trainer, program design, fitness assessment
THUMBNAILS: Split screen of before/after client + "FULL PROCESS REVEALED"`
    }
  ],
  2: [ // Customer Transformations
    {
      platform: 'Instagram',
      type: 'Before/After Post',
      business: 'Pet Grooming Studio',
      title: 'Max\'s Incredible 3-Hour Transformation',
      caption: `🤯 TRANSFORMATION TUESDAY: Meet Max!

When Max came in this morning, his owner said "I think he's given up on life." Three hours later... LOOK AT THIS CONFIDENT BOY! 💪

Here's what Max got today:
🛁 De-shedding bath with oatmeal treatment
✂️ Full body trim and face sculpting
💅 Nail trim and paw pad conditioning
🎀 Signature bow tie finish

Max's owner literally cried happy tears at pickup. These moments are why we do what we do! 🥹

Swipe to see the full transformation journey →

Book your pup's confidence boost! Link in bio 📲

#TransformationTuesday #PetGrooming #DogGrooming #BeforeAndAfter #PetMakeover #ConfidentDog #PetCare #LocalBusiness #DogLove #GroomingMagic #PetSalon #DogTransformation`,
      estimatedReach: '25K - 55K',
      engagement: '24.3%',
      bestTime: '11:00 AM',
      contentBreakdown: `
POST STRATEGY:

CAROUSEL STRUCTURE (8 slides):
1. Dramatic before photo (matted, sad-looking dog)
2. Bath time action shot
3. During grooming process
4. Nail trimming close-up
5. Blow drying moment
6. Nearly finished, getting bow tie
7. STUNNING after shot
8. Happy owner reaction + testimonial quote

CAPTION STRATEGY:
- Hook with emotional transformation
- Bullet points for service breakdown
- Emotional payoff (owner crying)
- Clear CTA with urgency

ENGAGEMENT TACTICS:
- "Swipe to see more" to increase dwell time
- Question in comments: "What's your pet's biggest transformation?"
- Story highlights: "Transformations"
- User-generated content potential

BEST PRACTICES:
- Post during lunch break (high engagement)
- Use mix of broad and niche hashtags
- Tag location for local discovery
- Cross-post to Facebook and TikTok`
    },
    {
      platform: 'TikTok',
      type: 'Transformation Video',
      business: 'Local Restaurant',
      title: 'Turning a Picky Eater into a Foodie',
      caption: `POV: Your kid who only eats chicken nuggets just asked for seconds of our veggie pasta 🤯 #TransformationTuesday #PickyEater`,
      estimatedReach: '65K - 120K',
      engagement: '19.8%',
      bestTime: '8:30 PM',
      contentBreakdown: `
TIKTOK TRANSFORMATION CONTENT (30 seconds):

STRUCTURE:
Hook (0-3s): "This kid only ate chicken nuggets until..."
• Show child initially refusing food
• Parent looking frustrated

Setup (3-8s): "We had a secret weapon"
• Quick shot of our kid-friendly presentation
• Colorful, fun plating techniques

Process (8-20s): "The transformation magic"
• Chef making food look like art
• Hidden vegetables blended into fun shapes
• Interactive eating experience

Payoff (20-30s): "30 minutes later..."
• Child enthusiastically eating
• Asking for more
• Parent's shocked reaction

ENGAGEMENT TACTICS:
- Relatable parent struggle hook
- Educational value (hidden nutrition tips)
- Emotional payoff
- Community building in comments

VIRAL ELEMENTS:
- Trending "POV" format
- Universal parent struggle
- Satisfying transformation
- Shareable moment

FOLLOW-UP CONTENT IDEAS:
- Recipe reveal video
- More picky eater success stories
- Parent testimonials
- Kids menu behind-the-scenes

HASHTAG STRATEGY: Mix trending (#POV, #TransformationTuesday) with niche (#PickyEater, #KidsFood, #FamilyDining)`
    },
    {
      platform: 'YouTube',
      type: 'Client Success Story',
      business: 'Fitness Studio',
      title: 'From Couch to 5K: Maria\'s Complete Fitness Transformation',
      caption: `Follow Maria's incredible 6-month journey from never exercising to completing her first 5K race. This is her complete story, including the struggles, breakthroughs, and exact program that changed her life.`,
      estimatedReach: '12K - 28K',
      engagement: '31.2%',
      bestTime: '6:00 PM',
      contentBreakdown: `
YOUTUBE DOCUMENTARY SCRIPT (18-22 minutes):

COLD OPEN (0-30s):
"Six months ago, Maria couldn't walk up a flight of stairs without getting winded. Today... well, you'll see."
• Quick montage of transformation
• Race finish line moment

INTRODUCTION (30s-2min):
• Maria's starting point interview
• Her motivation and fears
• Initial fitness assessment footage

CHAPTER 1: The Beginning (2-6 mins)
• First workout session (struggles)
• Mindset challenges
• Initial program design
• Week 1-4 progress

CHAPTER 2: Breaking Through (6-12 mins)
• Month 2-3 developments
• Plateau and how we overcame it
• Nutrition changes
• Building confidence

CHAPTER 3: The Momentum (12-16 mins)
• Months 4-5 acceleration
• First outdoor run
• Goal setting for 5K
• Training intensification

CHAPTER 4: Race Day (16-20 mins)
• Pre-race nerves
• Family support
• The actual race footage
• Finish line emotions
• Post-race interview

EPILOGUE (20-22 mins):
• Current fitness level
• Life changes beyond physical
• Advice for viewers
• What's next for Maria

PRODUCTION ELEMENTS:
- Professional interview setup
- Workout footage throughout journey
- Before/after photos and videos
- Race day multiple camera angles
- Emotional moments highlighted
- Progress tracking graphics

OPTIMIZATION:
- Chapters for easy navigation
- Downloadable workout guide
- Links to related transformation videos
- Community tab follow-ups`
    }
  ],
  3: [ // Quick Tips & Hacks
    {
      platform: 'Instagram',
      type: 'Educational Carousel',
      business: 'Pet Grooming Studio',
      title: '5 Signs Your Dog Needs Professional Grooming',
      caption: `📚 GROOMING 101: Don't wait until it's an emergency!

Your pup is telling you they need professional care - you just need to know how to listen. Here are 5 clear signs it's time to book that appointment:

👆 Swipe through to learn each warning sign and what it means for your dog's health and comfort.

💡 PRO TIP: Regular grooming isn't just about looks - it's preventive healthcare! We catch skin issues, ear infections, and other problems early.

Questions about your pup's grooming needs? Drop them below! Our certified groomers love helping pet parents. 🐾

Save this post for future reference! 🔖

#DogGrooming #PetCare #DogHealth #PetTips #GroomingTips #PetWellness #DogCare #PetEducation #LocalGroomer #PetSalon #DogOwnerTips #PetMaintenance`,
      estimatedReach: '18K - 42K',
      engagement: '21.7%',
      bestTime: '1:00 PM',
      contentBreakdown: `
EDUCATIONAL CAROUSEL (6 slides):

SLIDE 1: Title slide with hook
"5 Signs Your Dog Needs Grooming ASAP"
• Eye-catching design
• Professional branding
• "Swipe for tips" CTA

SLIDE 2: Sign #1 - Matted Fur
• Visual example of matting
• Pain points: discomfort, skin issues
• Prevention tip included

SLIDE 3: Sign #2 - Strong Odor
• Not just "doggy smell"
• Health implications explained
• When to be concerned

SLIDE 4: Sign #3 - Overgrown Nails
• Visual showing proper vs. overgrown
• Walking difficulties explained
• Potential injuries highlighted

SLIDE 5: Sign #4 - Excessive Scratching
• Skin condition indicators
• Grooming solutions offered
• When to see a vet

SLIDE 6: Sign #5 - Can't See Eyes
• Vision impairment issues
• Safety concerns
• Before/after examples

ENGAGEMENT STRATEGY:
- Educational value builds trust
- Saves for future reference
- Shares with other pet owners
- Generates consultation bookings
- Positions as expert authority

CONTENT PILLARS:
- Education (this post)
- Behind-the-scenes
- Transformations
- Customer features
- Seasonal tips`
    },
    {
      platform: 'TikTok',
      type: 'Quick Tips',
      business: 'Local Restaurant',
      title: '3 Chef Secrets for Perfect Pasta Every Time',
      caption: `Michelin-trained chef reveals the 3 secrets restaurants don't want you to know 🤫 #ChefSecrets #PastaTips`,
      estimatedReach: '85K - 150K',
      engagement: '26.4%',
      bestTime: '7:45 PM',
      contentBreakdown: `
TIKTOK EDUCATION FORMAT (45 seconds):

HOOK (0-3s): "Michelin chef reveals pasta secrets"
• Professional kitchen setting
• Chef in whites with credentials

TIP #1 (3-18s): "Salt your water like the ocean"
• Visual demonstration of salt amount
• Taste test comparison
• "This changes everything" moment

TIP #2 (18-33s): "Save the pasta water"
• Show starchy pasta water
• Demonstrate sauce binding
• Professional technique reveal

TIP #3 (33-45s): "Never rinse your pasta"
• Common mistake highlight
• Science explanation (quick)
• Final dish presentation

VIRAL ELEMENTS:
- "Secrets they don't want you to know" angle
- Professional credibility
- Immediately actionable tips
- Before/after comparisons

ENGAGEMENT HOOKS:
- Saves for cooking reference
- Shares to family group chats
- Comments with their pasta fails
- Requests for more cooking tips

FOLLOW-UP CONTENT SERIES:
- "Chef Secrets" weekly series
- Cooking mistake corrections
- Professional techniques simplified
- Kitchen tool recommendations

AUTHORITY BUILDING:
- Professional credentials mentioned
- Restaurant-quality results
- Technical knowledge simplified
- Credibility through expertise

HASHTAG MIX:
- Trending: #ChefSecrets #CookingTips #FoodHacks
- Niche: #PastaTips #ItalianCooking #ChefLife
- Broad: #Cooking #FoodTok #KitchenTips`
    },
    {
      platform: 'YouTube',
      type: 'Educational Series',
      business: 'Fitness Studio',
      title: 'The 5-Minute Morning Routine That Changes Everything',
      caption: `Discover the science-backed morning routine our clients use to increase energy, improve focus, and set themselves up for success every single day. No equipment needed!`,
      estimatedReach: '15K - 35K',
      engagement: '33.1%',
      bestTime: '6:30 AM',
      contentBreakdown: `
YOUTUBE EDUCATIONAL CONTENT (8-10 minutes):

INTRO (0-45s):
"What if I told you 5 minutes every morning could completely change your day? I'm Sarah from Elite Fitness, and I'm about to share the exact routine our most successful clients use."

THE SCIENCE (45s-2min):
• Circadian rhythm explanation
• Movement's impact on energy
• Mindfulness and focus connection
• Why morning routines work

THE 5-MINUTE ROUTINE (2-7mins):

MINUTE 1: Activation (2-3min)
• Joint mobility sequence
• Wake up the nervous system
• Demonstrate each movement

MINUTE 2: Strength (3-4min)
• Bodyweight movement
• Core activation
• Proper form coaching

MINUTE 3: Cardio (4-5min)
• Heart rate elevation
• Energy boost techniques
• Modification options

MINUTE 4: Breathing (5-6min)
• Stress reduction technique
• Focus enhancement
• Oxygenation benefits

MINUTE 5: Intention (6-7min)
• Goal visualization
• Day planning moment
• Positive mindset setting

IMPLEMENTATION TIPS (7-9min):
• How to build the habit
• Common obstacles
• Modification for different fitness levels
• Tracking progress

CALL TO ACTION (9-10min):
• 7-day challenge invitation
• Community support offered
• Related video recommendations

OPTIMIZATION ELEMENTS:
- Timestamps in description
- Downloadable routine card
- Follow-along format option
- Progress tracking sheet
- Community challenge hashtag

AUTHORITY SIGNALS:
- Scientific backing cited
- Professional credentials
- Client success statistics
- Research references linked

ENGAGEMENT FEATURES:
- Challenge participation
- Progress sharing encouraged
- Modification requests welcomed
- Success story submissions`
    }
  ]
};

// TikTok SVG Icon
function TikTokIcon({ className = "", ...props }: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      {...props}
    >
      <path d="M21.5 4c0 2.9 2.35 5.25 5.25 5.25v3.1c-1.5.04-2.97-.36-4.25-1.13v8.78c0 4.5-3.66 8.15-8.15 8.15S6.2 24.5 6.2 20c0-4.5 3.66-8.15 8.15-8.15.2 0 .4.01.6.03v3.13c-.2-.02-.4-.03-.6-.03-2.78 0-5.05 2.27-5.05 5.05s2.27 5.05 5.05 5.05 5.05-2.27 5.05-5.05V4h3.1Z" fill="#25F4EE"/>
      <path d="M22.5 5.5c.5 2.2 2.3 3.8 4.5 3.8v2.1c-1.5.04-2.97-.36-4.25-1.13v8.78c0 4.5-3.66 8.15-8.15 8.15S6.2 24.5 6.2 20c0-4.5 3.66-8.15 8.15-8.15.2 0 .4.01.6.03v2.13c-.2-.02-.4-.03-.6-.03-2.78 0-5.05 2.27-5.05 5.05s2.27 5.05 5.05 5.05 5.05-2.27 5.05-5.05V5.5h2.1Z" fill="#FE2C55"/>
      <path d="M21.5 4v16c0 4.5-3.66 8.15-8.15 8.15S5.2 24.5 5.2 20c0-4.5 3.66-8.15 8.15-8.15.2 0 .4.01.6.03v3.13c-.2-.02-.4-.03-.6-.03-2.78 0-5.05 2.27-5.05 5.05s2.27 5.05 5.05 5.05 5.05-2.27 5.05-5.05V4h3.1Z" fill="#fff"/>
    </svg>
  );
}

const platformIcons: Record<string, JSX.Element> = {
  Instagram: <Instagram className="w-4 h-4 text-pink-400" />,
  YouTube: <Youtube className="w-4 h-4 text-red-500" />,
  TikTok: <TikTokIcon className="w-4 h-4" />
};

// Animated counter component
function AnimatedCounter({ target, suffix = '', duration = 2000 }: { target: string; suffix?: string; duration?: number }) {
  const [count, setCount] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.3 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isVisible) return;

    const numericTarget = parseFloat(target.replace(/[^\d.]/g, ''));
    let startTime: number;

    const animate = (currentTime: number) => {
      if (!startTime) startTime = currentTime;
      const progress = Math.min((currentTime - startTime) / duration, 1);

      const easeOutQuart = 1 - Math.pow(1 - progress, 4);
      setCount(numericTarget * easeOutQuart);

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };

    requestAnimationFrame(animate);
  }, [isVisible, target, duration]);

  return (
    <span ref={ref} className="font-bold">
      {target.includes('M') ? `${count.toFixed(1)}M` :
       target.includes('%') ? `${Math.round(count)}%` :
       target.includes('.') ? count.toFixed(1) :
       Math.round(count)}
      {suffix}
    </span>
  );
}

// Live status indicator
function LiveIndicator() {
  return (
    <div className="flex items-center gap-2">
      <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
      <span className="text-xs font-semibold text-red-400">LIVE DATA</span>
    </div>
  );
}

export default function SocialMediaContentStudio() {
  const [selectedTrend, setSelectedTrend] = useState<number | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedContent, setGeneratedContent] = useState<any[]>([]);
  const [showSuccess, setShowSuccess] = useState(false);
  const [expandedContent, setExpandedContent] = useState<number | null>(null);
  const [generationStatus, setGenerationStatus] = useState<'idle' | 'generating' | 'complete'>('idle');
  const [completedTrend, setCompletedTrend] = useState<number | null>(null);
  const generatedContentRef = useRef<HTMLDivElement>(null);

  const handleTrendSelect = (trendId: number) => {
    if (selectedTrend === trendId && generationStatus === 'generating') return;

    setSelectedTrend(trendId);
    setIsGenerating(true);
    setGenerationStatus('generating');
    setCompletedTrend(null);

    // Simulate AI content generation with real content
    setTimeout(() => {
      const strategies = contentStrategies[trendId as keyof typeof contentStrategies] || [];
      setGeneratedContent(strategies);
      setIsGenerating(false);
      setShowSuccess(true);
      setGenerationStatus('complete');
      setCompletedTrend(trendId);
      setTimeout(() => {
        setShowSuccess(false);
        setGenerationStatus('idle');
        setCompletedTrend(null);
      }, 3000);
      // Scroll to generated content on mobile
      if (window.innerWidth < 768 && generatedContentRef.current) {
        generatedContentRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 1200);
  };

  const toggleContentExpansion = (index: number) => {
    setExpandedContent(expandedContent === index ? null : index);
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    // Could add a toast notification here
  };

  return (
    <section className="w-full flex flex-col items-center px-0 md:px-8">
      <div className="w-full max-w-7xl bg-gradient-to-br from-slate-900/95 to-slate-800/95 border border-purple-500/30 shadow-2xl rounded-3xl backdrop-blur-xl overflow-hidden">
        <div className="relative p-6 md:p-8 bg-gradient-to-r from-purple-900/80 to-blue-900/80 border-b border-purple-500/20">
          <div className="relative flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
            <div className="flex flex-col">
              <div className="flex items-center gap-3 mb-2">
                <div className="p-2 bg-gradient-to-br from-purple-500 to-blue-500 rounded-xl">
                  <Brain className="w-6 h-6 text-white" />
                </div>
                <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent">
                  Social Media Content Studio
                </h2>
                <LiveIndicator />
              </div>
              <p className="text-purple-200 text-lg max-w-2xl">
                Generate comprehensive content strategies with detailed captions, scripts, and breakdowns for any business niche based on the most recent and relevant trends.
              </p>
            </div>

            <div className="grid grid-cols-3 gap-4 text-center">
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-3 border border-white/20">
                <div className="text-2xl font-bold text-white">
                  <AnimatedCounter target={liveMetrics.totalReach} />
                </div>
                <div className="text-xs text-purple-200">Total Reach</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-3 border border-white/20">
                <div className="text-2xl font-bold text-green-400">
                  <AnimatedCounter target={liveMetrics.avgEngagement} />
                </div>
                <div className="text-xs text-purple-200">Avg Engagement</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-3 border border-white/20">
                <div className="text-2xl font-bold text-yellow-400">
                  <AnimatedCounter target={liveMetrics.timeSaved} />
                </div>
                <div className="text-xs text-purple-200">Hours Saved</div>
              </div>
            </div>
          </div>
        </div>

        <div className="p-6 md:p-8">
          <div className="mb-8">
            <div className="flex items-center gap-3 mb-6">
              <TrendingUp className="w-6 h-6 text-purple-400" />
              <h3 className="text-2xl font-bold text-white">Trending Content Strategies</h3>
              <div className="ml-auto flex items-center gap-2 text-sm text-gray-400">
                <Clock className="w-4 h-4" />
                Updated 2 min ago
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              {trendingTopics.map((trend) => (
                <div
                  key={trend.id}
                  className={`group relative cursor-pointer transition-all duration-500 transform hover:scale-[1.05] ${
                    selectedTrend === trend.id
                      ? 'ring-2 ring-purple-400 scale-[1.02] shadow-2xl shadow-purple-500/25'
                      : 'hover:shadow-2xl hover:shadow-purple-500/20'
                  }`}
                  onClick={() => handleTrendSelect(trend.id)}
                >
                  <div className={`h-full p-6 bg-gradient-to-br ${trend.color} bg-opacity-20 backdrop-blur-sm rounded-2xl border border-white/20 relative overflow-hidden`}>
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>

                    <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <div className="bg-white/20 backdrop-blur-sm rounded-full p-2">
                        <ChevronRight className="w-4 h-4 text-white" />
                      </div>
                    </div>

                    <div className="relative z-10">
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-2">
                          {trend.platforms.map((platform) => (
                            <div key={platform} className="p-1.5 bg-white/20 rounded-lg group-hover:bg-white/30 transition-colors duration-300">
                              {platformIcons[platform]}
                            </div>
                          ))}
                        </div>
                        <div className="flex items-center gap-1 bg-green-500/20 text-green-400 px-2 py-1 rounded-full text-xs font-bold group-hover:bg-green-500/30 transition-colors duration-300">
                          <TrendingUp className="w-3 h-3" />
                          {trend.growthRate}
                        </div>
                      </div>

                      <h4 className="text-xl font-bold text-white mb-2 group-hover:text-purple-200 transition-colors duration-300">{trend.keyword}</h4>

                      <div className="bg-black/30 backdrop-blur-sm rounded-lg p-3 mb-4 group-hover:bg-black/40 transition-colors duration-300">
                        <p className="text-gray-100 text-sm mb-2 font-medium">{trend.category}</p>
                        <p className="text-gray-200 text-xs leading-relaxed">{trend.description}</p>
                      </div>

                      <div className="grid grid-cols-2 gap-3 text-xs mb-4">
                        <div className="bg-black/20 backdrop-blur-sm rounded-lg p-2 group-hover:bg-black/30 transition-colors duration-300">
                          <span className="text-gray-200">Engagement</span>
                          <div className="font-bold text-white">{trend.engagement}</div>
                        </div>
                        <div className="bg-black/20 backdrop-blur-sm rounded-lg p-2 group-hover:bg-black/30 transition-colors duration-300">
                          <span className="text-gray-200">Viral Score</span>
                          <div className="font-bold text-purple-300">{trend.viralPotential}/100</div>
                        </div>
                      </div>

                      {selectedTrend !== trend.id && (
                        <div className="flex items-center justify-center gap-2 bg-gradient-to-r from-purple-600/20 to-blue-600/20 backdrop-blur-sm rounded-lg p-3 border border-purple-400/30 group-hover:from-purple-600/30 group-hover:to-blue-600/30 group-hover:border-purple-400/50 transition-all duration-300">
                          <MousePointer className="w-4 h-4 text-purple-300 group-hover:animate-bounce" />
                          <span className="text-sm font-semibold text-purple-200">Click to Generate Strategies</span>
                          <Sparkles className="w-4 h-4 text-purple-300" />
                        </div>
                      )}

                      {selectedTrend === trend.id && generationStatus === 'generating' && (
                        <div className="flex items-center gap-2 text-purple-300 animate-pulse bg-black/30 backdrop-blur-sm rounded-lg p-3">
                          <Zap className="w-4 h-4 animate-spin" />
                          <span className="text-sm font-semibold">Generating strategies...</span>
                        </div>
                      )}
                      {selectedTrend === trend.id && generationStatus === 'complete' && completedTrend === trend.id && (
                        <div className="flex items-center gap-2 text-green-300 bg-black/30 backdrop-blur-sm rounded-lg p-3 animate-fade-in">
                          <Sparkles className="w-4 h-4 animate-bounce" />
                          <span className="text-sm font-semibold">Complete!</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {(isGenerating || generatedContent.length > 0) && (
            <div className="mb-8" ref={generatedContentRef}>
              <div className="flex items-center gap-3 mb-6">
                <Target className="w-6 h-6 text-blue-400" />
                <h3 className="text-2xl font-bold text-white">Multi-Niche Content Strategies</h3>
                {generationStatus === 'generating' && (
                  <div className="ml-auto flex items-center gap-2 bg-blue-500/20 text-blue-300 px-3 py-1 rounded-full text-sm font-semibold animate-pulse">
                    <Zap className="w-4 h-4 animate-spin" />
                    Generating...
                  </div>
                )}
                {generationStatus === 'complete' && (
                  <div className="ml-auto flex items-center gap-2 bg-green-500/20 text-green-400 px-3 py-1 rounded-full text-sm font-semibold">
                    <Sparkles className="w-4 h-4" />
                    Complete!
                  </div>
                )}
              </div>

              {isGenerating ? (
                <div className="grid grid-cols-1 gap-6">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="h-32 bg-gradient-to-br from-slate-700/50 to-slate-600/50 rounded-2xl border border-white/10 animate-pulse">
                      <div className="p-6 space-y-4">
                        <div className="h-4 bg-white/20 rounded animate-pulse"></div>
                        <div className="h-3 bg-white/15 rounded animate-pulse"></div>
                        <div className="h-3 bg-white/15 rounded w-3/4 animate-pulse"></div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="space-y-6">
                  {generatedContent.map((content, index) => (
                    <div
                      key={index}
                      className="group bg-gradient-to-br from-slate-800/80 to-slate-700/80 backdrop-blur-sm rounded-2xl border border-white/20 p-6 hover:border-purple-400/50 transition-all duration-300 hover:shadow-xl hover:shadow-purple-500/10 animate-fade-in"
                      style={{ animationDelay: `${index * 150}ms` }}
                    >
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-3">
                          {platformIcons[content.platform]}
                          <div>
                            <span className="font-semibold text-white text-lg">{content.platform}</span>
                            <div className="text-sm text-gray-400">{content.business}</div>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-xs text-purple-400 bg-purple-500/20 px-2 py-1 rounded-full">
                            {content.type}
                          </span>
                          <button
                            onClick={() => copyToClipboard(content.caption)}
                            className="p-1.5 bg-blue-500/20 hover:bg-blue-500/30 rounded-lg transition-colors"
                          >
                            <Copy className="w-4 h-4 text-blue-400" />
                          </button>
                        </div>
                      </div>

                      <h4 className="text-xl font-bold text-white mb-3">{content.title}</h4>

                      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        <div>
                          <h5 className="text-sm font-semibold text-purple-300 mb-2">Caption/Description:</h5>
                          <div className="bg-slate-900/50 rounded-lg p-4 text-sm text-gray-300 leading-relaxed max-h-48 overflow-y-auto">
                            {content.caption.split('\n').map((line: string, i: number) => (
                              <p key={i} className="mb-2">{line}</p>
                            ))}
                          </div>
                        </div>

                        <div className="space-y-4">
                          <div className="grid grid-cols-2 gap-4 text-xs">
                            <div className="bg-slate-900/30 rounded-lg p-3">
                              <span className="text-gray-400">Est. Reach</span>
                              <div className="text-green-400 font-semibold">{content.estimatedReach}</div>
                            </div>
                            <div className="bg-slate-900/30 rounded-lg p-3">
                              <span className="text-gray-400">Engagement</span>
                              <div className="text-blue-400 font-semibold">{content.engagement}</div>
                            </div>
                          </div>

                          <button
                            onClick={() => toggleContentExpansion(index)}
                            className="w-full bg-gradient-to-r from-purple-600/80 to-blue-600/80 hover:from-purple-500 hover:to-blue-500 text-white py-2 px-4 rounded-xl font-semibold transition-all duration-300 flex items-center justify-center gap-2"
                          >
                            <ExternalLink className="w-4 h-4" />
                            {expandedContent === index ? 'Hide' : 'View'} Full Strategy Breakdown
                          </button>
                        </div>
                      </div>

                      {expandedContent === index && (
                        <div className="mt-6 pt-6 border-t border-white/10">
                          <h5 className="text-lg font-semibold text-white mb-3">Complete Strategy Breakdown:</h5>
                          <div className="bg-slate-900/50 rounded-lg p-4 text-sm text-gray-300 leading-relaxed max-h-96 overflow-y-auto">
                            {content.contentBreakdown.split('\n').map((line: string, i: number) => (
                              <p key={i} className={`mb-2 ${line.includes('•') ? 'ml-4' : ''} ${line.includes(':') && line.length < 50 ? 'font-semibold text-purple-300' : ''}`}>
                                {line}
                              </p>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      <style jsx>{`
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fade-in {
          animation: fade-in 0.6s ease-out forwards;
          opacity: 0;
        }

        .line-clamp-2 {
          overflow: hidden;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
        }
      `}</style>
    </section>
  );
}
