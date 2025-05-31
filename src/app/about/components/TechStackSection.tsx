import React from 'react';

interface TechStackItem {
  name: string;
  tools: string[];
  icon: React.ComponentType<{ className?: string }>;
}

interface TechStackSectionProps {
  techStack: TechStackItem[];
}

const TechStackSection: React.FC<TechStackSectionProps> = ({ techStack }) => {
  return (
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
  );
};

export default TechStackSection;
