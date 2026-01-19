import { useEffect, useRef, useState } from 'react';
import { skills } from '../../constants/projects';

const SkillsSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(true); // Changed to true to show skills immediately
  const [animatedSkills, setAnimatedSkills] = useState<number[]>([]);

  useEffect(() => {
    // Animate all skills immediately
    skills.forEach((_, index) => {
      setTimeout(() => {
        setAnimatedSkills(prev => [...prev, index]);
      }, index * 50); // Reduced delay
    });
  }, []);

  const categories = Array.from(new Set(skills.map(skill => skill.category)));
  const categoryColors = {
    Frontend: 'from-blue-500 to-cyan-500',
    Backend: 'from-green-500 to-emerald-500',
    Mobile: 'from-indigo-500 to-purple-500',
    AI: 'from-purple-500 to-pink-500',
    Database: 'from-red-500 to-rose-500',
    DevOps: 'from-gray-500 to-slate-500',
    Blockchain: 'from-yellow-500 to-orange-500'
  };

  return (
    <section id="skills" ref={sectionRef} className="py-20 px-12 md:px-20 lg:px-32 relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-10 w-32 h-32 bg-blue-500 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-20 right-10 w-40 h-40 bg-purple-500 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
      </div>

      <div className="container mx-auto max-w-4xl relative z-10">
        {/* Section header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Technical Expertise
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Mastery across the full technology stack with 7+ years of hands-on experience
          </p>
        </div>

        {/* Skills by category */}
        <div className="space-y-12">
          {categories.map((category, categoryIndex) => (
            <div
              key={category}
              className={`transform transition-all duration-1000 ${
                isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
              }`}
              style={{ transitionDelay: `${categoryIndex * 200}ms` }}
            >
              {/* Category header */}
              <div className="flex items-center gap-4 mb-6">
                <div className={`px-4 py-2 rounded-full bg-gradient-to-r ${categoryColors[category as keyof typeof categoryColors]} text-white font-semibold`}>
                  {category}
                </div>
                <div className="flex-1 h-px bg-gradient-to-r from-gray-600 to-transparent" />
              </div>

              {/* Category skills */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {skills
                  .filter(skill => skill.category === category)
                  .map((skill, skillIndex) => {
                    const globalIndex = skills.findIndex(s => s === skill);
                    const isAnimated = animatedSkills.includes(globalIndex);
                    
                    return (
                      <div
                        key={skill.name}
                        className="group bg-gradient-to-r from-gray-900/50 to-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700/50 hover:border-gray-600/80 transition-all duration-300"
                      >
                        <div className="flex items-center justify-between mb-3">
                          <h3 className="text-lg font-semibold text-white group-hover:text-blue-400 transition-colors">
                            {skill.name}
                          </h3>
                          <span className="text-sm font-medium text-gray-400">
                            {skill.level}%
                          </span>
                        </div>
                        
                        {/* Progress bar */}
                        <div className="relative h-2 bg-gray-700 rounded-full overflow-hidden">
                          <div
                            className={`absolute left-0 top-0 h-full bg-gradient-to-r ${categoryColors[category as keyof typeof categoryColors]} transition-all duration-1000 ease-out`}
                            style={{
                              width: isAnimated ? `${skill.level}%` : '0%',
                              transitionDelay: `${skillIndex * 100}ms`
                            }}
                          />
                          
                          {/* Shine effect */}
                          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 animate-shimmer" />
                        </div>

                        {/* Skill level indicator */}
                        <div className="mt-2 flex gap-1">
                          {[...Array(5)].map((_, i) => (
                            <div
                              key={i}
                              className={`w-2 h-2 rounded-full transition-all duration-500 ${
                                i < Math.ceil(skill.level / 20)
                                  ? `bg-gradient-to-r ${categoryColors[category as keyof typeof categoryColors]}`
                                  : 'bg-gray-600'
                              }`}
                              style={{ transitionDelay: `${(skillIndex * 100) + (i * 50)}ms` }}
                            />
                          ))}
                        </div>
                      </div>
                    );
                  })}
              </div>
            </div>
          ))}
        </div>

        {/* Experience summary */}
        <div className="mt-16 text-center">
          <div className="inline-flex items-center gap-6 px-8 py-4 bg-gradient-to-r from-blue-900/30 to-purple-900/30 backdrop-blur-sm border border-blue-500/30 rounded-2xl">
            <div className="text-center">
              <div className="text-3xl font-bold text-white">7+</div>
              <div className="text-sm text-gray-400">Years Experience</div>
            </div>
            <div className="w-px h-12 bg-gray-600" />
            <div className="text-center">
              <div className="text-3xl font-bold text-white">50+</div>
              <div className="text-sm text-gray-400">Projects Completed</div>
            </div>
            <div className="w-px h-12 bg-gray-600" />
            <div className="text-center">
              <div className="text-3xl font-bold text-white">30K+</div>
              <div className="text-sm text-gray-400">Users Served</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SkillsSection;