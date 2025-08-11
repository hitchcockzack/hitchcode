import React from 'react';

interface Achievement {
  year: string;
  title: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
  gradient: string;
}

interface AchievementsSectionProps {
  achievements: Achievement[];
  jetbrains: {
    className: string;
  };
}

const AchievementsSection: React.FC<AchievementsSectionProps> = ({ achievements, jetbrains }) => {
  return (
    <section className="relative py-16 md:py-24 border-t border-zinc-800">
      <div className="container mx-auto px-6 md:px-10">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-zinc-100 mb-4">Key Milestones</h2>
            <p className="text-zinc-400 text-lg max-w-2xl mx-auto">Major achievements that have shaped my professional journey</p>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="space-y-6 md:space-y-8">
            {achievements.map((achievement, index) => {
              const Icon = achievement.icon;

                // Map gradient strings to dark theme badge colors
                const colorMap: Record<string, { badge: string; icon: string; year: string; rule: string; title: string; desc: string }> = {
                  'from-blue-500 to-cyan-500': { badge: 'bg-blue-600/10 border border-blue-500/20', icon: 'text-blue-400', year: 'text-blue-300', rule: 'from-zinc-700', title: 'text-zinc-100', desc: 'text-zinc-400' },
                  'from-purple-500 to-pink-500': { badge: 'bg-purple-600/10 border border-purple-500/20', icon: 'text-purple-400', year: 'text-purple-300', rule: 'from-zinc-700', title: 'text-zinc-100', desc: 'text-zinc-400' },
                  'from-orange-500 to-red-500': { badge: 'bg-orange-600/10 border border-orange-500/20', icon: 'text-orange-400', year: 'text-orange-300', rule: 'from-zinc-700', title: 'text-zinc-100', desc: 'text-zinc-400' },
                  'from-green-500 to-emerald-500': { badge: 'bg-emerald-600/10 border border-emerald-500/20', icon: 'text-emerald-400', year: 'text-emerald-300', rule: 'from-zinc-700', title: 'text-zinc-100', desc: 'text-zinc-400' }
                };

                const colors = colorMap[achievement.gradient] || { badge: 'bg-zinc-900/60 border border-zinc-800', icon: 'text-zinc-400', year: 'text-zinc-300', rule: 'from-zinc-700', title: 'text-zinc-100', desc: 'text-zinc-400' };

              return (
                <div
                  key={index}
                    className="reveal-on-scroll opacity-0 translate-y-8 transition-all duration-700 group"
                  style={{ transitionDelay: `${200 + index * 150}ms` }}
                >
                    <div className="flex items-start gap-6 p-6 md:p-8 bg-zinc-950/60 border border-zinc-800 rounded-2xl hover:border-zinc-700 transition-all duration-200">
                    <div className="flex-shrink-0">
                        <div className={`w-16 h-16 rounded-xl flex items-center justify-center ${colors.badge}`}>
                          <Icon className={`w-8 h-8 ${colors.icon}`} />
                      </div>
                    </div>
                    <div className="flex-grow">
                      <div className="flex items-center gap-4 mb-3">
                          <span className={`text-2xl font-bold font-mono ${colors.year}`}>
                          {achievement.year}
                        </span>
                          <div className={`flex-grow h-px bg-gradient-to-r ${colors.rule} to-transparent`} />
                      </div>
                        <h3 className={`text-xl font-semibold mb-2 ${colors.title}`}>{achievement.title}</h3>
                        <p className={`${colors.desc} leading-relaxed`}>{achievement.description}</p>
                    </div>
                  </div>
                </div>
              );
            })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AchievementsSection;
