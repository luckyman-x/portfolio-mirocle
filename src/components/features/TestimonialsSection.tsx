import { useState, useEffect, useRef, useCallback } from 'react';
import { Star } from 'lucide-react';
import { testimonials } from '../../constants/projects';

const TestimonialsSection = () => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const [autoScrollEnabled, setAutoScrollEnabled] = useState(true);
  const autoScrollTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const cardWidth = 320; // Compact cards like reference image
  const gap = 16; // Tight spacing for smooth flow
  const totalTestimonials = testimonials.length;

  // Calculate current index based on scroll position
  const updateCurrentIndexFromScroll = useCallback(() => {
    if (!scrollContainerRef.current || isDragging) return;
    
    const container = scrollContainerRef.current;
    const scrollPosition = container.scrollLeft;
    const centerOffset = container.clientWidth / 2;
    const adjustedScroll = scrollPosition + centerOffset - cardWidth / 2;
    const newIndex = Math.round(adjustedScroll / (cardWidth + gap)) % totalTestimonials;
    
    if (newIndex !== currentIndex) {
      setCurrentIndex(newIndex >= 0 ? newIndex : totalTestimonials + newIndex);
    }
  }, [currentIndex, isDragging, cardWidth, gap, totalTestimonials]);

  // Handle infinite scroll - reset position when reaching boundaries
  const handleInfiniteScroll = useCallback(() => {
    if (!scrollContainerRef.current || isDragging) return;
    
    const container = scrollContainerRef.current;
    const maxScroll = container.scrollWidth - container.clientWidth;
    const resetThreshold = (cardWidth + gap) * totalTestimonials;
    
    if (container.scrollLeft <= (cardWidth + gap)) {
      // Reached start, jump to end section
      container.scrollLeft = resetThreshold + (cardWidth + gap);
    } else if (container.scrollLeft >= maxScroll - (cardWidth + gap)) {
      // Reached end, jump to start section  
      container.scrollLeft = resetThreshold;
    }
  }, [isDragging, cardWidth, gap, totalTestimonials]);

  // Auto-scroll functionality - step by step every 2 seconds
  useEffect(() => {
    if (!autoScrollEnabled || isDragging) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % totalTestimonials);
    }, 2000);

    return () => clearInterval(interval);
  }, [autoScrollEnabled, isDragging, totalTestimonials]);

  // Smooth scroll to current index
  useEffect(() => {
    if (!scrollContainerRef.current || isDragging) return;
    
    const container = scrollContainerRef.current;
    const centerOffset = container.clientWidth / 2 - cardWidth / 2;
    const baseOffset = (cardWidth + gap) * totalTestimonials * 2; // Start from middle section
    const targetScroll = baseOffset + currentIndex * (cardWidth + gap) - centerOffset;
    
    container.scrollTo({
      left: targetScroll,
      behavior: 'smooth'
    });
  }, [currentIndex, isDragging, cardWidth, gap, totalTestimonials]);

  // Cleanup timeout on unmount
  useEffect(() => {
    return () => {
      if (autoScrollTimeoutRef.current) {
        clearTimeout(autoScrollTimeoutRef.current);
      }
    };
  }, []);

  // Temporarily disable auto-scroll when user interacts
  const pauseAutoScroll = () => {
    setAutoScrollEnabled(false);
    if (autoScrollTimeoutRef.current) {
      clearTimeout(autoScrollTimeoutRef.current);
    }
    autoScrollTimeoutRef.current = setTimeout(() => {
      setAutoScrollEnabled(true);
    }, 3000);
  };

  // Mouse drag functionality
  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    pauseAutoScroll();
    setStartX(e.pageX - (scrollContainerRef.current?.offsetLeft || 0));
    setScrollLeft(scrollContainerRef.current?.scrollLeft || 0);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !scrollContainerRef.current) return;
    e.preventDefault();
    const x = e.pageX - (scrollContainerRef.current.offsetLeft || 0);
    const walk = (x - startX) * 1.2;
    scrollContainerRef.current.scrollLeft = scrollLeft - walk;
  };

  const handleMouseUp = () => {
    if (!isDragging) return;
    setIsDragging(false);
  };

  const handleMouseLeave = () => {
    if (isDragging) {
      setIsDragging(false);
    }
  };

  // Wheel scroll functionality
  const handleWheel = (e: React.WheelEvent) => {
    if (!scrollContainerRef.current) return;
    e.preventDefault();
    pauseAutoScroll();
    scrollContainerRef.current.scrollLeft += e.deltaY * 0.8;
  };

  // Calculate if a card is in center position
  const isCenter = (index: number, arrayIndex: number) => {
    const actualIndex = index % totalTestimonials;
    return actualIndex === currentIndex;
  };

  // Create multiple copies for true infinite scroll
  const createInfiniteArray = () => {
    const copies = 7; // More copies for smoother infinite scroll
    const result = [];
    for (let i = 0; i < copies; i++) {
      result.push(...testimonials);
    }
    return result;
  };

  const infiniteTestimonials = createInfiniteArray();

  return (
    <section id="testimonials" className="py-20 px-6 relative overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-900/10 via-purple-900/10 to-indigo-900/10" />
      
      <div className="container mx-auto max-w-full relative z-10">
        {/* Section header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Client Testimonials
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto mb-8">
            What industry leaders say about working with me
          </p>

        </div>

        {/* Horizontal scrolling testimonials */}
        <div className="relative">
          {/* Enhanced gradient overlays for smooth edges */}
          <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-black via-black/80 to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-black via-black/80 to-transparent z-10 pointer-events-none" />
          
          <div
            ref={scrollContainerRef}
            className={`flex gap-4 overflow-x-auto scrollbar-hide pb-6 px-8 ${
              isDragging ? 'cursor-grabbing' : 'cursor-grab'
            }`}
            style={{ 
              scrollbarWidth: 'none',
              msOverflowStyle: 'none',
              WebkitScrollbar: { display: 'none' }
            }}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseLeave}
            onWheel={handleWheel}
          >
            {/* Infinite testimonials array */}
            {infiniteTestimonials.map((testimonial, index) => {
              const actualIndex = index % totalTestimonials;
              const isCenterCard = isCenter(actualIndex, index);
              
              return (
                <div
                  key={`${testimonial.id}-${index}`}
                  className={`flex-shrink-0 w-80 h-64 bg-gradient-to-br from-gray-900/90 to-gray-800/90 backdrop-blur-md rounded-2xl p-6 border transition-all duration-500 hover:shadow-xl select-none relative overflow-hidden ${
                    isCenterCard 
                      ? 'border-blue-500/80 shadow-xl shadow-blue-500/30 scale-110 z-20' 
                      : 'border-gray-700/50 hover:border-gray-600/70 hover:scale-105'
                  }`}
                  style={{
                    transform: isCenterCard ? 'scale(1.1)' : 'scale(1)',
                    zIndex: isCenterCard ? 20 : 10
                  }}
                >
                  {/* Content container */}
                  <div className="relative z-10 h-full flex flex-col">
                    {/* Stars */}
                    <div className="flex items-center gap-1 mb-4">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star
                          key={i}
                          size={16}
                          className="text-yellow-400 fill-current"
                        />
                      ))}
                    </div>

                    {/* Testimonial content */}
                    <blockquote className="text-gray-200 leading-relaxed mb-6 text-sm font-medium line-clamp-3 flex-grow">
                      "{testimonial.content}"
                    </blockquote>

                    {/* Client info */}
                    <div className="flex items-center gap-3 mt-auto">
                      <img
                        src={testimonial.avatar}
                        alt={testimonial.name}
                        className="w-12 h-12 rounded-full object-cover border-2 border-blue-500/40 shadow-md"
                        draggable={false}
                      />
                      <div className="min-w-0 flex-1">
                        <div className="font-bold text-white text-sm mb-1">
                          {testimonial.name}
                        </div>
                        <div className="text-blue-300 text-xs font-medium mb-0.5">
                          {testimonial.role}
                        </div>
                        <div className="text-gray-400 text-xs">
                          {testimonial.company}
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Subtle shine effect for center card */}
                  {isCenterCard && (
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -skew-x-12 animate-shimmer" />
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Progress indicators */}
        <div className="flex justify-center mt-8">
          <div className="flex items-center gap-2">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => {
                  setCurrentIndex(index);
                  pauseAutoScroll();
                }}
                className={`transition-all duration-300 rounded-full ${
                  index === currentIndex
                    ? 'w-8 h-3 bg-blue-500'
                    : 'w-3 h-3 bg-gray-600 hover:bg-gray-500'
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;