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
    <section className="relative py-24 bg-zinc-50/50 border-t border-zinc-200">
      <div className="container mx-auto px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16 reveal-on-scroll opacity-0 translate-y-8 transition-all duration-700" style={{ transitionDelay: '100ms' }}>
            <h2 className="text-3xl md:text-4xl font-bold text-zinc-900 mb-6">
              Key Milestones
          </h2>
            <p className="text-zinc-600 text-lg max-w-2xl mx-auto">
            Major achievements that have shaped my professional journey
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="space-y-8">
            {achievements.map((achievement, index) => {
              const Icon = achievement.icon;

                // Map gradient strings to colors for the new design
                const colorMap: Record<string, { bg: string; text: string; icon: string }> = {
                  'from-blue-500 to-cyan-500': { bg: 'bg-blue-50', text: 'text-blue-600', icon: 'text-blue-600' },
                  'from-purple-500 to-pink-500': { bg: 'bg-purple-50', text: 'text-purple-600', icon: 'text-purple-600' },
                  'from-orange-500 to-red-500': { bg: 'bg-orange-50', text: 'text-orange-600', icon: 'text-orange-600' },
                  'from-green-500 to-emerald-500': { bg: 'bg-green-50', text: 'text-green-600', icon: 'text-green-600' }
                };

                const colors = colorMap[achievement.gradient] || { bg: 'bg-blue-50', text: 'text-blue-600', icon: 'text-blue-600' };

              return (
                <div
                  key={index}
                    className="reveal-on-scroll opacity-0 translate-y-8 transition-all duration-700 group"
                  style={{ transitionDelay: `${200 + index * 150}ms` }}
                >
                    <div className="flex items-start space-x-6 p-8 bg-white border border-zinc-200 rounded-xl hover:border-zinc-300 hover:shadow-md transition-all duration-200 hover:translate-y-[-2px]">
                    <div className="flex-shrink-0">
                        <div className={`w-16 h-16 rounded-xl ${colors.bg} flex items-center justify-center`}>
                          <Icon className={`w-8 h-8 ${colors.icon}`} />
                      </div>
                    </div>
                    <div className="flex-grow">
                      <div className="flex items-center space-x-4 mb-3">
                          <span className={`text-2xl font-bold ${colors.text} font-mono`}>
                          {achievement.year}
                        </span>
                          <div className="flex-grow h-px bg-gradient-to-r from-zinc-200 to-transparent" />
                      </div>
                        <h3 className="text-xl font-semibold mb-3 text-zinc-900">{achievement.title}</h3>
                        <p className="text-zinc-600 leading-relaxed">{achievement.description}</p>
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
