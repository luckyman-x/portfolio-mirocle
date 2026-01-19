import { useState } from 'react';
import { projects } from '../../constants/projects';
import ProjectCard from './ProjectCard';
import ProjectModal from './ProjectModal';
import { Project } from '../../types';

const ProjectsSection = () => {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const categories = ['All', 'Blockchain', 'Fullstack', 'Chatbot', 'App', 'AI'];
  
  const filteredProjects = selectedCategory === 'All' 
    ? projects 
    : projects.filter(project => project.category === selectedCategory);

  const categoryColors = {
    All: 'from-gray-500 to-gray-600',
    Blockchain: 'from-yellow-500 to-orange-500',
    App: 'from-green-500 to-emerald-500', 
    Chatbot: 'from-purple-500 to-pink-500',
    Fullstack: 'from-red-500 to-rose-500',
    AI: 'from-blue-500 to-cyan-500'
  };

  return (
    <section id="projects" className="py-20 px-12 md:px-20 lg:px-32 relative">
      <div className="container mx-auto max-w-5xl">
        {/* Section header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 animate-fade-in">
            Featured Projects
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto animate-fade-in-up">
            A showcase of innovative solutions spanning full-stack development, AI andb lockchain, more. 
            Each project represents cutting-edge technology and exceptional user experience.
          </p>
        </div>

        {/* Category filters */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-6 py-3 rounded-full font-medium transition-all duration-300 ${
                selectedCategory === category
                  ? `bg-gradient-to-r ${categoryColors[category as keyof typeof categoryColors]} text-white shadow-lg`
                  : 'bg-gray-800/50 text-gray-400 hover:text-white hover:bg-gray-700/50'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Projects grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3" style={{ gap: '16px' }}>
          {filteredProjects.map((project, index) => (
            <div
              key={project.id}
              className="animate-slide-up"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <ProjectCard
                project={project}
                onClick={() => setSelectedProject(project)}
              />
            </div>
          ))}
        </div>

        {/* Empty state */}
        {filteredProjects.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">
              No projects found in this category yet.
            </p>
          </div>
        )}

        {/* Project modal */}
        {selectedProject && (
          <ProjectModal
            project={selectedProject}
            isOpen={!!selectedProject}
            onClose={() => setSelectedProject(null)}
          />
        )}
      </div>
    </section>
  );
};

export default ProjectsSection;