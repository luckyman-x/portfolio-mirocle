import { useEffect, useState } from 'react';
import { ChevronDown, Github, Mail, MessageCircle } from 'lucide-react';


// Custom WhatsApp Icon Component
const WhatsAppIcon = ({
  size = 20,
  className = "",
}: {
  size?: number;
  className?: string;
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="currentColor"
    className={className}
  >
    <path d="M20.52 3.48A11.91 11.91 0 0 0 12.01 0C5.38 0 .02 5.36.02 11.99c0 2.11.55 4.17 1.6 5.98L0 24l6.19-1.62a11.94 11.94 0 0 0 5.82 1.48h.01c6.63 0 11.99-5.36 11.99-11.99c0-3.2-1.25-6.21-3.49-8.39zM12.01 21.9a9.9 9.9 0 0 1-5.04-1.38l-.36-.21l-3.67.96l.98-3.58l-.23-.37a9.9 9.9 0 1 1 8.32 4.58zm5.74-7.4c-.31-.16-1.83-.9-2.11-1c-.28-.1-.49-.16-.7.16c-.21.31-.8 1-.98 1.21c-.18.21-.36.23-.67.08c-.31-.16-1.32-.49-2.52-1.56c-.93-.83-1.56-1.86-1.74-2.17c-.18-.31-.02-.48.13-.63c.14-.14.31-.36.47-.54c.16-.18.21-.31.31-.52c.1-.21.05-.39-.03-.54c-.08-.16-.7-1.68-.96-2.3c-.25-.6-.5-.52-.7-.53h-.6c-.21 0-.54.08-.82.39c-.28.31-1.08 1.06-1.08 2.59c0 1.52 1.11 2.99 1.27 3.2c.16.21 2.18 3.33 5.28 4.67c.74.32 1.32.51 1.77.65c.74.23 1.41.2 1.94.12c.59-.09 1.83-.75 2.09-1.47c.26-.72.26-1.33.18-1.47c-.08-.14-.28-.21-.59-.37z" />
  </svg>
);

// Custom Telegram Icon Component
const TelegramIcon = ({
  size = 20,
  className = "",
}: {
  size?: number;
  className?: string;
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="currentColor"
    className={className}
  >
    <path d="M9.993 15.59l-.396 5.58c.567 0 .814-.244 1.11-.537l2.664-2.54 5.52 4.035c1.012.56 1.73.266 1.99-.937l3.61-16.94h.001c.304-1.42-.513-1.976-1.5-1.61L1.29 9.38c-1.36.53-1.34 1.29-.246 1.63l5.48 1.71L19.27 5.33c.6-.4 1.15-.18.7.22z" />
  </svg>
);


const HeroSection = () => {
  const [text, setText] = useState('');
  const [showCursor, setShowCursor] = useState(true);
  const fullText = 'Full Stack Web & App Developer';

  useEffect(() => {
    let i = 0;
    const typingInterval = setInterval(() => {
      if (i < fullText.length) {
        setText(fullText.slice(0, i + 1));
        i++;
      } else {
        clearInterval(typingInterval);
      }
    }, 100);

    // Cursor blinking
    const cursorInterval = setInterval(() => {
      setShowCursor(prev => !prev);
    }, 500);

    return () => {
      clearInterval(typingInterval);
      clearInterval(cursorInterval);
    };
  }, []);

  const scrollToProjects = () => {
    document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Animated gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-900/20 via-purple-900/20 to-indigo-900/20" />
      
      {/* Floating elements */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute animate-float"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${3 + Math.random() * 4}s`
            }}
          >
            <div className="w-2 h-2 bg-blue-400/30 rounded-full blur-sm" />
          </div>
        ))}
      </div>

      <div className="relative z-10 text-center px-6 max-w-4xl mx-auto mt-16">
        {/* Main heading */}
        <div className="mb-8">
          <h1 className="text-6xl md:text-8xl font-bold mb-4 bg-gradient-to-r from-white via-blue-200 to-purple-300 bg-clip-text text-transparent animate-fade-in">
            Mirocle John
          </h1>
          <div className="text-2xl md:text-4xl text-gray-300 font-light mb-6 h-12">
            {text}
            <span className={`${showCursor ? 'opacity-100' : 'opacity-0'} transition-opacity`}>|</span>
          </div>
        </div>

        {/* Expertise badges */}
        <div className="flex flex-wrap justify-center gap-4 mb-8">
          {['AI/ML', 'Blockchain', 'Full Stack', 'Chatbots', 'Mobile Apps'].map((skill, index) => (
            <div
              key={skill}
              className="px-6 py-3 bg-gradient-to-r from-blue-500/20 to-purple-500/20 backdrop-blur-sm border border-blue-500/30 rounded-full text-blue-200 font-medium animate-slide-up"
              style={{ animationDelay: `${index * 0.2}s` }}
            >
              {skill}
            </div>
          ))}
        </div>

        {/* Description */}
        <p className="text-xl text-gray-400 mb-12 max-w-2xl mx-auto leading-relaxed animate-fade-in-up">
          I 've got 7+ years of experience of crafting innovative solutions across full-stack & mobile app development, AI and blockchain . 
          My mission is to transform innovative ideas into exceptional digital experiences.
        </p>

        {/* Social links */}
        <div className="flex justify-center gap-6 mb-16">
          <a
            href="mailto:miroclejohn@gmail.com?subject=To%20Mirocle&body=Hello%20Mirocle%2C%0A%0A..."
            className="group flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-500 text-white rounded-full hover:shadow-lg hover:shadow-blue-500/25 transform hover:-translate-y-1 transition-all duration-300"
          >
            <Mail size={20} />
            Email
          </a>

          <a
            href="https://api.whatsapp.com/send?phone=18058211334"
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-full hover:shadow-lg hover:shadow-purple-500/25 transform hover:-translate-y-1 transition-all duration-300"
          >
            <WhatsAppIcon size={20} />
            Whatsapp
          </a>

          <a
            href="https://t.me/YC0112_425_517"
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-cyan-600 to-blue-600 text-white rounded-full hover:shadow-lg hover:shadow-cyan-500/25 transform hover:-translate-y-1 transition-all duration-300"
          >
            <TelegramIcon size={20} />
            Telegram
          </a>
        </div>

        {/* Scroll indicator */}
        <button
          onClick={scrollToProjects}
          className="animate-bounce text-gray-400 hover:text-white transition-colors duration-300"
        >
          <ChevronDown size={32} />
        </button>
      </div>
    </section>
  );
};

export default HeroSection;
