export interface Project {
  id: string;
  title: string;
  category: 'AI' | 'Blockchain' | 'App' | 'Chatbot' | 'Fullstack';
  description: string;
  shortDescription: string;
  technologies: string[];
  liveUrl: string;
  githubUrl: string;
  images: string[];
  featured: boolean;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  company: string;
  content: string;
  avatar: string;
  rating: number;
}

export interface Skill {
  name: string;
  level: number;
  category: string;
}

export interface ContactForm {
  name: string;
  email: string;
  subject: string;
  message: string;
}