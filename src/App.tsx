import { useEffect } from 'react';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import ParticleBackground from './components/features/ParticleBackground';
import HeroSection from './components/features/HeroSection';
import ProjectsSection from './components/features/ProjectsSection';
import SkillsSection from './components/features/SkillsSection';
import TestimonialsSection from './components/features/TestimonialsSection';
import ContactSection from './components/features/ContactSection';

function App() {
  useEffect(() => {
    // Add smooth scrolling behavior
    document.documentElement.style.scrollBehavior = 'smooth';
    
    // Add custom animations to document
    const style = document.createElement('style');
    style.textContent = `
      @keyframes fadeIn {
        from { opacity: 0; transform: translateY(20px); }
        to { opacity: 1; transform: translateY(0); }
      }
      
      @keyframes slideUp {
        from { opacity: 0; transform: translateY(30px) scale(0.8); }
        to { opacity: 1; transform: translateY(0) scale(0.8); }
      }
      
      @keyframes float {
        0%, 100% { transform: translateY(0px); }
        50% { transform: translateY(-20px); }
      }
      
      @keyframes shimmer {
        0% { transform: translateX(-100%); }
        100% { transform: translateX(200%); }
      }
      
      .animate-fade-in {
        animation: fadeIn 0.8s ease-out forwards;
      }
      
      .animate-fade-in-up {
        animation: fadeIn 1s ease-out 0.3s forwards;
        opacity: 0;
      }
      
      .animate-slide-up {
        animation: slideUp 0.6s ease-out forwards;
        opacity: 0;
        transform: scale(0.8);
      }
      
      .animate-float {
        animation: float 3s ease-in-out infinite;
      }
      
      .animate-shimmer {
        animation: shimmer 2s infinite;
      }
      
      .scrollbar-hide {
        -ms-overflow-style: none;
        scrollbar-width: none;
      }
      
      .scrollbar-hide::-webkit-scrollbar {
        display: none;
      }
      
      .line-clamp-2 {
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
        overflow: hidden;
      }
      
      .line-clamp-3 {
        display: -webkit-box;
        -webkit-line-clamp: 3;
        -webkit-box-orient: vertical;
        overflow: hidden;
      }
      
      .line-clamp-4 {
        display: -webkit-box;
        -webkit-line-clamp: 4;
        -webkit-box-orient: vertical;
        overflow: hidden;
      }
    `;
    document.head.appendChild(style);
    
    return () => {
      document.head.removeChild(style);
    };
  }, []);

  return (
    <div className="min-h-screen bg-black text-white overflow-x-hidden">
      <ParticleBackground />
      <Header />
      
      <main className="relative z-10">
        <section id="about">
          <HeroSection />
        </section>
        <ProjectsSection />
        <SkillsSection />
        <TestimonialsSection />
        <ContactSection />
      </main>
      
      <Footer />
    </div>
  );
}

export default App;