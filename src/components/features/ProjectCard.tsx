import { useState } from 'react';
import { ExternalLink, Github } from 'lucide-react';
import { Project } from '../../types';

interface ProjectCardProps {
  project: Project;
  onClick: () => void;
}

const ProjectCard = ({ project, onClick }: ProjectCardProps) => {
  const [imageLoaded, setImageLoaded] = useState(false);

  const categoryColors = {
    AI: 'from-blue-500 to-cyan-500',
    Blockchain: 'from-yellow-500 to-orange-500', 
    App: 'from-green-500 to-emerald-500',
    Chatbot: 'from-purple-500 to-pink-500',
    Fullstack: 'from-red-500 to-rose-500'
  };

  return (
    <div 
      className="group relative bg-gradient-to-br from-gray-900/50 to-gray-800/50 backdrop-blur-sm rounded-2xl overflow-hidden border border-gray-700/50 hover:border-gray-600/80 transition-all duration-500 hover:transform hover:scale-105 cursor-pointer"
      onClick={onClick}
    >
      {/* Image container */}
      <div className="relative h-48 overflow-hidden">
        <div className={`absolute inset-0 bg-gradient-to-r ${categoryColors[project.category]} opacity-20`} />
        <img
          src={project.images[0]}
          alt={project.title}
          className={`w-full h-full object-cover transition-all duration-700 group-hover:scale-110 ${
            imageLoaded ? 'opacity-100' : 'opacity-0'
          }`}
          onLoad={() => setImageLoaded(true)}
        />
        {!imageLoaded && (
          <div className="absolute inset-0 bg-gray-800 animate-pulse" />
        )}
        
        {/* Category badge */}
        <div className={`absolute top-4 left-4 px-3 py-1 rounded-full text-xs font-semibold bg-gradient-to-r ${categoryColors[project.category]} text-white`}>
          {project.category}
        </div>

        {/* Featured badge */}
        {project.featured && (
          <div className="absolute top-4 right-4 px-3 py-1 rounded-full text-xs font-semibold bg-gradient-to-r from-pink-500 to-purple-500 text-white">
            Featured
          </div>
        )}

        {/* Overlay with actions */}
        <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-4">
          <a
            href={project.liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="p-3 bg-blue-600 rounded-full hover:bg-blue-500 transition-colors"
            onClick={(e) => e.stopPropagation()}
          >
            <ExternalLink size={20} className="text-white" />
          </a>
          <a
            href={project.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="p-3 bg-gray-800 rounded-full hover:bg-gray-700 transition-colors"
            onClick={(e) => e.stopPropagation()}
          >
            <Github size={20} className="text-white" />
          </a>
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        <h3 className="text-xl font-bold text-white mb-2 group-hover:text-blue-400 transition-colors">
          {project.title}
        </h3>
        
        <p className="text-gray-400 text-sm mb-4 line-clamp-2">
          {project.shortDescription}
        </p>

        {/* Technologies */}
        <div className="flex flex-wrap gap-2">
          {project.technologies.slice(0, 3).map((tech) => (
            <span
              key={tech}
              className="px-2 py-1 text-xs bg-gray-800/80 text-gray-300 rounded-md"
            >
              {tech}
            </span>
          ))}
          {project.technologies.length > 3 && (
            <span className="px-2 py-1 text-xs bg-gray-800/80 text-gray-300 rounded-md">
              +{project.technologies.length - 3} more
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;