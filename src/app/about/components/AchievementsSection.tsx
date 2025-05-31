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
  );
};

export default AchievementsSection;
