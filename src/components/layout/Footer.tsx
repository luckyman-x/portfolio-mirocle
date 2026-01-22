import { Mail, MessageCircle, Github, ExternalLink } from 'lucide-react';


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


const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative bg-gradient-to-br from-gray-900 to-black border-t border-gray-800">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 50% 50%, rgba(59, 130, 246, 0.1) 0%, transparent 50%)`
        }} />
      </div>

      <div className="container mx-auto px-6 py-12 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand section */}
          <div className="md:col-span-2">
            <div className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-600 bg-clip-text text-transparent mb-4">
              Mirocle John
            </div>
            <p className="text-gray-400 mb-6 max-w-md">
              United by innovation, I can push the boundaries of AI, Blockchain, and web development — building a smarter, more connected future, one line of code at a time.
            </p>
            <div className="flex gap-4">
              <a
                href="mailto:miroclejohn@gmail.com?subject=To%20Mirocle&body=Hello%20Mirocle%2C%0A%0A..."
                className="p-3 bg-gray-800 hover:bg-blue-600 text-gray-300 hover:text-white rounded-full transition-colors"
              >
                <Mail size={18} />
              </a>

              <a
                href="https://api.whatsapp.com/send?phone=18058211334"
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 bg-gray-800 hover:bg-indigo-600 text-gray-300 hover:text-white rounded-full transition-colors"
              >
                <WhatsAppIcon size={18} />
              </a>

              <a
                href="https://t.me/Naoki68"
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 bg-gray-800 hover:bg-cyan-600 text-gray-300 hover:text-white rounded-full transition-colors"
              >
                <TelegramIcon size={18} />
              </a>
              <a
                href="https://github.com/maxcointech0000"
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 bg-gray-800 hover:bg-gray-600 text-gray-300 hover:text-white rounded-full transition-colors"
              >
                <Github size={18} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2 text-gray-400">
              {['About', 'Projects', 'Skills', 'Testimonials', 'Contact'].map((item) => (
                <li key={item}>
                  <button
                    onClick={() => document.getElementById(item.toLowerCase())?.scrollIntoView({ behavior: 'smooth' })}
                    className="hover:text-white transition-colors"
                  >
                    {item}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-white font-semibold mb-4">Services</h3>
            <ul className="space-y-2 text-gray-400 text-sm">
              <li>AI/ML Development</li>
              <li>Blockchain Solutions</li>
              <li>Full Stack Development</li>
              <li>Chatbot Integration</li>
              <li>Mobile App Development</li>
              <li>Technical Consulting</li>
            </ul>
          </div>
        </div>

        {/* Bottom section */}
        <div className="border-t border-gray-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="text-gray-400 text-sm">
            © {currentYear} Mirocle John. All rights reserved.
          </div>
          
          <div className="flex items-center gap-6 text-sm text-gray-400">
            <span className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
              Available for hire
            </span>
            <span>Response time: &lt; 24h</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
