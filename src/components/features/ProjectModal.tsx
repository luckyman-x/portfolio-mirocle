import { useState, useEffect } from 'react';
import { X, ExternalLink, Github, Users, Calendar, Star } from 'lucide-react';
import { Project } from '../../types';

interface ProjectModalProps {
  project: Project;
  isOpen: boolean;
  onClose: () => void;
}

const ProjectModal = ({ project, isOpen, onClose }: ProjectModalProps) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [imageLoaded, setImageLoaded] = useState<boolean[]>([]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      setImageLoaded(new Array(project.images.length).fill(false));
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, project.images.length]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft') setCurrentImageIndex(prev => Math.max(0, prev - 1));
      if (e.key === 'ArrowRight') setCurrentImageIndex(prev => Math.min(project.images.length - 1, prev + 1));
    };

    if (isOpen) {
      document.addEventListener('keydown', handleKeyDown);
    }

    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, project.images.length, onClose]);

  const categoryColors = {
    AI: 'from-blue-500 to-cyan-500',
    Blockchain: 'from-yellow-500 to-orange-500',
    App: 'from-green-500 to-emerald-500',
    Chatbot: 'from-purple-500 to-pink-500',
    Fullstack: 'from-red-500 to-rose-500'
  };

  const handleImageLoad = (index: number) => {
    setImageLoaded(prev => {
      const updated = [...prev];
      updated[index] = true;
      return updated;
    });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/80 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto border border-gray-700">
        {/* Header */}
        <div className="sticky top-0 bg-gray-900/95 backdrop-blur-sm border-b border-gray-700 p-6 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className={`px-3 py-1 rounded-full text-sm font-semibold bg-gradient-to-r ${categoryColors[project.category]} text-white`}>
              {project.category}
            </div>
            <h2 className="text-2xl font-bold text-white">{project.title}</h2>
            {project.featured && (
              <div className="flex items-center gap-1 px-2 py-1 rounded-full bg-yellow-500/20 text-yellow-400 text-sm">
                <Star size={14} fill="currentColor" />
                Featured
              </div>
            )}
          </div>
          <button
            onClick={onClose}
            className="p-2 text-gray-400 hover:text-white hover:bg-gray-800 rounded-full transition-colors"
          >
            <X size={24} />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          {/* Main image gallery */}
          <div className="mb-8">
            <div className="relative h-64 md:h-96 bg-gray-800 rounded-xl overflow-hidden mb-4">
              <img
                src={project.images[currentImageIndex]}
                alt={`${project.title} screenshot ${currentImageIndex + 1}`}
                className={`w-full h-full object-cover transition-opacity duration-300 ${
                  imageLoaded[currentImageIndex] ? 'opacity-100' : 'opacity-0'
                }`}
                onLoad={() => handleImageLoad(currentImageIndex)}
              />
              {!imageLoaded[currentImageIndex] && (
                <div className="absolute inset-0 bg-gray-800 animate-pulse flex items-center justify-center">
                  <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
                </div>
              )}

              {/* Navigation arrows */}
              {project.images.length > 1 && (
                <>
                  <button
                    onClick={() => setCurrentImageIndex(prev => Math.max(0, prev - 1))}
                    className="absolute left-4 top-1/2 -translate-y-1/2 p-2 bg-black/50 text-white rounded-full hover:bg-black/70 transition-colors"
                    disabled={currentImageIndex === 0}
                  >
                    ←
                  </button>
                  <button
                    onClick={() => setCurrentImageIndex(prev => Math.min(project.images.length - 1, prev + 1))}
                    className="absolute right-4 top-1/2 -translate-y-1/2 p-2 bg-black/50 text-white rounded-full hover:bg-black/70 transition-colors"
                    disabled={currentImageIndex === project.images.length - 1}
                  >
                    →
                  </button>
                </>
              )}

              {/* Image counter */}
              <div className="absolute bottom-4 right-4 px-3 py-1 bg-black/50 text-white text-sm rounded-full">
                {currentImageIndex + 1} / {project.images.length}
              </div>
            </div>

            {/* Image thumbnails */}
            <div className="flex gap-2 overflow-x-auto pb-2">
              {project.images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentImageIndex(index)}
                  className={`flex-shrink-0 w-16 h-16 rounded-lg overflow-hidden border-2 transition-all ${
                    index === currentImageIndex 
                      ? 'border-blue-500 scale-105' 
                      : 'border-gray-600 hover:border-gray-500'
                  }`}
                >
                  <img
                    src={image}
                    alt={`Thumbnail ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Project info grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Description */}
            <div className="lg:col-span-2 space-y-6">
              <div>
                <h3 className="text-xl font-semibold text-white mb-3">Description</h3>
                <p className="text-gray-300 leading-relaxed">{project.description}</p>
              </div>

              {/* Technologies */}
              <div>
                <h3 className="text-xl font-semibold text-white mb-3">Technologies Used</h3>
                <div className="flex flex-wrap gap-2">
                  {project.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="px-3 py-1 bg-gradient-to-r from-blue-600/20 to-purple-600/20 border border-blue-500/30 text-blue-300 rounded-full text-sm"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* Action buttons */}
              <div className="flex gap-4">
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-500 text-white rounded-full hover:shadow-lg hover:shadow-blue-500/25 transform hover:-translate-y-0.5 transition-all duration-300"
                >
                  <ExternalLink size={18} />
                  View Live Site
                </a>
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-gray-700 to-gray-600 text-white rounded-full hover:shadow-lg hover:shadow-gray-500/25 transform hover:-translate-y-0.5 transition-all duration-300"
                >
                  <Github size={18} />
                  View Code
                </a>
              </div>
            </div>

            {/* Stats sidebar */}
            <div className="space-y-6">
              {/* User count */}
              {project.userCount && (
                <div className="bg-gradient-to-r from-green-500/20 to-emerald-500/20 border border-green-500/30 rounded-xl p-4">
                  <div className="flex items-center gap-2 text-green-400 mb-2">
                    <Users size={20} />
                    <span className="font-semibold">Active Users</span>
                  </div>
                  <div className="text-2xl font-bold text-white">{project.userCount}</div>
                </div>
              )}

              {/* Project stats */}
              <div className="bg-gradient-to-r from-purple-500/20 to-pink-500/20 border border-purple-500/30 rounded-xl p-4">
                <div className="flex items-center gap-2 text-purple-400 mb-2">
                  <Calendar size={20} />
                  <span className="font-semibold">Project Status</span>
                </div>
                <div className="text-lg font-semibold text-white">Live & Active</div>
              </div>

              {/* Category info */}
              <div className={`bg-gradient-to-r ${categoryColors[project.category]}/20 border border-current/30 rounded-xl p-4`}>
                <div className="flex items-center gap-2 mb-2">
                  <span className="font-semibold">Category</span>
                </div>
                <div className="text-lg font-semibold text-white">{project.category} Development</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectModal;