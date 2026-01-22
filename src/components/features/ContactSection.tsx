import { useState } from 'react';
import { Mail, MessageCircle, Send, CheckCircle, AlertCircle, Phone } from 'lucide-react';
import { ContactForm } from '../../types';
import emailjs from '@emailjs/browser';


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


const ContactSection = () => {
  const [formData, setFormData] = useState<ContactForm>({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'success' | 'error' | null>(null);
  const [isMessageVisible, setIsMessageVisible] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      // EmailJS configuration
      const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
      const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
      const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

      if (!serviceId || !templateId || !publicKey) {
        throw new Error('EmailJS configuration missing. Please check your environment variables.');
      }

      const templateParams = {
        from_name: formData.name,
        from_email: formData.email,
        subject: formData.subject,
        message: formData.message,
        to_email: 'miroclejohn@gmail.com', // Your email
      };

      // Send email using EmailJS
      await emailjs.send(serviceId, templateId, templateParams, publicKey);
      
      setSubmitStatus('success');
      setIsMessageVisible(true);
      setFormData({ name: '', email: '', subject: '', message: '' });
      
      // Auto-hide success message after 5 seconds
      setTimeout(() => {
        setIsMessageVisible(false);
        setTimeout(() => {
          setSubmitStatus(null);
        }, 300); // Wait for fade-out animation to complete
      }, 5000);
    } catch (error) {
      console.error('EmailJS error:', error);
      setSubmitStatus('error');
      setIsMessageVisible(true);
      
      // Auto-hide error message after 5 seconds
      setTimeout(() => {
        setIsMessageVisible(false);
        setTimeout(() => {
          setSubmitStatus(null);
        }, 300); // Wait for fade-out animation to complete
      }, 5000);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-20 px-12 md:px-20 lg:px-32 relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-blue-500 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-48 h-48 bg-purple-500 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }} />
      </div>

      <div className="container mx-auto max-w-4xl relative z-10">
        {/* Section header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            You can contact me!
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Ready to transform your ideas into reality? Let's discuss your next project and create innovative solutions with me.
          </p>
        </div>

        <div className="space-y-12">
          {/* Top section with Get in Touch info */}
          <div>
            <h3 className="text-2xl font-semibold text-white mb-6">Get in Touch</h3>
            <p className="text-gray-400 leading-relaxed mb-8">
              Whether you need full-stack applications, AI solutions, blockchain development, or chatbot integration, 
              I'm here to help bring your vision to life with cutting-edge technology and exceptional craftsmanship.
            </p>
          </div>

          {/* Main content area with contact methods and form */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Left column - Contact methods */}
            <div className="space-y-6">
              <a
                href="mailto:miroclejohn@gmail.com?subject=To%20Mirocle&body=Hello%20Mirocle%2C%0A%0A..."
                className="group flex items-center gap-4 p-4 bg-gradient-to-r from-gray-900/50 to-gray-800/50 backdrop-blur-sm rounded-xl border border-gray-700/50 hover:border-blue-500/50 transition-all duration-300"
              >
                <div className="p-3 bg-gradient-to-r from-blue-600 to-blue-500 rounded-full group-hover:scale-110 transition-transform">
                  <Mail className="text-white" size={20} />
                </div>
                <div>
                  <div className="font-semibold text-white group-hover:text-blue-400 transition-colors">
                    Email
                  </div>
                  <div className="text-gray-400 text-sm">miroclejohn@gmail.com </div>
                </div>
              </a>

               {/* Phone (info only) */}
              <button
                type="button"
                onClick={() => navigator.clipboard.writeText("+15625502280")}
                className="group w-full text-left cursor-pointer flex items-center gap-4 p-4 bg-gradient-to-r from-gray-900/50 to-gray-800/50 backdrop-blur-sm rounded-xl border border-gray-700/50 hover:border-blue-500/50 transition-all duration-300"
                >
                <div className="p-3 bg-gradient-to-r from-blue-600 to-blue-500 rounded-full group-hover:scale-110 transition-transform">
                  <Phone className="text-white" size={20} />
                </div>

                <div>
                  <div className="font-semibold text-white group-hover:text-indigo-400 transition-colors">
                    Phone
                  </div>
                  <div className="text-gray-400 text-sm select-all">
                    +1 562 550 2280
                  </div>
                </div>
              </button>

              <a
                href="https://api.whatsapp.com/send?phone=18058211334"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-4 p-4 bg-gradient-to-r from-gray-900/50 to-gray-800/50 backdrop-blur-sm rounded-xl border border-gray-700/50 hover:border-indigo-500/50 transition-all duration-300"
              >
                <div className="p-3 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-full group-hover:scale-110 transition-transform">
                  <WhatsAppIcon className="text-white" size={20} />
                </div>
                <div>
                  <div className="font-semibold text-white group-hover:text-indigo-400 transition-colors">
                    Whatsapp
                  </div>
                  <div className="text-gray-400 text-sm">+1 805 821 1334</div>
                </div>
              </a>

              <a
                href="https://t.me/Naoki68"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-4 p-4 bg-gradient-to-r from-gray-900/50 to-gray-800/50 backdrop-blur-sm rounded-xl border border-gray-700/50 hover:border-cyan-500/50 transition-all duration-300"
              >
                <div className="p-3 bg-gradient-to-r from-cyan-600 to-blue-600 rounded-full group-hover:scale-110 transition-transform">
                  <TelegramIcon className="text-white" size={20} />
                </div>
                <div>
                  <div className="font-semibold text-white group-hover:text-cyan-400 transition-colors">
                    Telegram
                  </div>
                  <div className="text-gray-400 text-sm">+1 765 859 9734</div>
                </div>
              </a>

              {/* Quick stats */}
              <div className="grid grid-cols-2 gap-4 pt-4">
                <div className="text-center p-4 bg-gradient-to-r from-blue-900/20 to-cyan-900/20 backdrop-blur-sm rounded-xl border border-blue-500/20">
                  <div className="text-2xl font-bold text-white mb-1">&lt; 24h</div>
                  <div className="text-sm text-gray-400">Response Time</div>
                </div>
                <div className="text-center p-4 bg-gradient-to-r from-green-900/20 to-emerald-900/20 backdrop-blur-sm rounded-xl border border-green-500/20">
                  <div className="text-2xl font-bold text-white mb-1">100%</div>
                  <div className="text-sm text-gray-400">Project Success</div>
                </div>
              </div>
            </div>

            {/* Right column - Contact form */}
            <div className="bg-gradient-to-br from-gray-900/50 to-gray-800/50 backdrop-blur-sm rounded-2xl p-8 border border-gray-700/50">
              <h3 className="text-xl font-semibold text-white mb-6">Send a Message</h3>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-2">
                    Your Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-1 bg-gray-800/50 border border-gray-600/50 rounded-lg text-white placeholder-gray-400 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors"
                    placeholder="John Doe"
                  />
                </div>
                
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-1 bg-gray-800/50 border border-gray-600/50 rounded-lg text-white placeholder-gray-400 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors"
                    placeholder="•••••@•••••.com"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="subject" className="block text-sm font-medium text-gray-300 mb-2">
                  Subject
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-1 bg-gray-800/50 border border-gray-600/50 rounded-lg text-white placeholder-gray-400 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors"
                  placeholder="Project Discussion"
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-2">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  required
                  rows={4}
                  className="w-full px-4 py-3 bg-gray-800/50 border border-gray-600/50 rounded-lg text-white placeholder-gray-400 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors resize-none"
                  placeholder="Tell me about your project ideas..."
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full flex items-center justify-center gap-2 px-6 py-4 bg-gradient-to-r from-blue-600 to-blue-500 text-white rounded-lg hover:shadow-lg hover:shadow-blue-500/25 transform hover:-translate-y-0.5 transition-all duration-300 disabled:opacity-50 disabled:transform-none"
              >
                {isSubmitting ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    Sending...
                  </>
                ) : (
                  <>
                    <Send size={18} />
                    Send Message
                  </>
                )}
              </button>

              {/* Status messages with smooth transitions */}
              {submitStatus === 'success' && (
                <div className={`flex items-center gap-2 p-4 bg-green-900/20 border border-green-500/30 rounded-lg text-green-400 transition-all duration-300 ${
                  isMessageVisible ? 'opacity-100 transform translate-y-0' : 'opacity-0 transform translate-y-2'
                }`}>
                  <CheckCircle size={20} />
                  <span>Message sent successfully! We'll get back to you soon.</span>
                </div>
              )}

              {submitStatus === 'error' && (
                <div className={`flex items-center gap-2 p-4 bg-red-900/20 border border-red-500/30 rounded-lg text-red-400 transition-all duration-300 ${
                  isMessageVisible ? 'opacity-100 transform translate-y-0' : 'opacity-0 transform translate-y-2'
                }`}>
                  <AlertCircle size={20} />
                  <span>Something went wrong. Please try again or contact me directly.</span>
                </div>
              )}
            </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
