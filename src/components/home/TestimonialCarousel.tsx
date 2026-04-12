import { useState, useEffect, useRef } from 'react';
import { ChevronLeft, ChevronRight, Star, Facebook } from 'lucide-react';
import { motion, useMotionValue, useTransform, useSpring } from 'framer-motion';
import { Button } from '@/components/ui/button';
import AnimatedSection from '../common/AnimatedSection';

interface Testimonial {
  id: number;
  name: string;
  text: string;
  rating: number;
}

const testimonials: Testimonial[] = [
  {
    id: 1,
    name: "Sarah & Michael",
    text: "The Tantra Movement workshop transformed our relationship. We learned to communicate on a much deeper level and reconnect with the sacred aspects of our intimacy.",
    rating: 5,
  },
  {
    id: 2,
    name: "Thomas L.",
    text: "I was skeptical at first, but the tantric massage course opened my eyes to a whole new dimension of healing touch. The instructors were professional and created a safe space for learning.",
    rating: 5,
  },
  {
    id: 3,
    name: "Elena J.",
    text: "The private sessions helped me work through blocks I didn't even know I had. I feel more embodied and present than ever before. This work is truly life-changing.",
    rating: 5,
  },
];

const TestimonialCard = ({ testimonial, isActive }: { testimonial: Testimonial; isActive: boolean }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [5, -5]), { stiffness: 300, damping: 30 });
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-5, 5]), { stiffness: 300, damping: 30 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    mouseX.set(x);
    mouseY.set(y);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  if (!isActive) return null;

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ rotateX, rotateY, transformStyle: 'preserve-3d' }}
      className="relative"
    >
      {/* Decorative quote marks */}
      <motion.span
        className="absolute -top-4 -left-2 text-8xl font-display text-secondary/30 select-none"
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.2 }}
      >
        "
      </motion.span>
      <motion.span
        className="absolute -bottom-12 -right-2 text-8xl font-display text-secondary/30 select-none rotate-180"
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.3 }}
      >
        "
      </motion.span>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex justify-center mb-4">
          {[...Array(testimonial.rating)].map((_, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.1 * i }}
            >
              <Star size={24} className="text-secondary fill-secondary drop-shadow-lg" />
            </motion.div>
          ))}
        </div>
        <p className="text-white text-lg md:text-xl italic font-display mb-6 text-center leading-relaxed drop-shadow-md">
          {testimonial.text}
        </p>
        <p className="text-white font-medium text-center text-lg drop-shadow-md font-body">{testimonial.name}</p>
      </motion.div>
    </motion.div>
  );
};

const TestimonialCarousel = () => {
  const [current, setCurrent] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((current) => (current === testimonials.length - 1 ? 0 : current + 1));
    }, 15000);
    return () => clearInterval(interval);
  }, []);

  const next = () => {
    setCurrent((current) => (current === testimonials.length - 1 ? 0 : current + 1));
  };

  const prev = () => {
    setCurrent((current) => (current === 0 ? testimonials.length - 1 : current - 1));
  };

  return (
    <section 
      className="py-16 md:py-24 relative overflow-hidden"
      style={{ 
        background: `linear-gradient(rgba(58, 29, 29, 0.4), rgba(58, 29, 29, 0.2)), url("/lovable-uploads/baf27213-6796-4e6d-b1e1-2575c9594cfb.png")`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed'
      }}
    >
      <div className="section-container relative z-10">
        <motion.h2 
          className="text-3xl md:text-4xl font-display font-bold text-white text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          Transformative Experiences
        </motion.h2>
        
        <div className="relative max-w-4xl mx-auto" style={{ perspective: '1000px' }}>
          {/* Glassmorphism card with 3D tilt effect */}
          <motion.div 
            className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl p-8 md:p-12 shadow-2xl relative overflow-hidden"
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            {/* Ambient glow */}
            <div className="absolute -top-20 -right-20 w-40 h-40 bg-secondary/20 rounded-full blur-3xl" />
            <div className="absolute -bottom-20 -left-20 w-40 h-40 bg-primary/20 rounded-full blur-3xl" />

            {testimonials.map((testimonial, index) => (
              <TestimonialCard 
                key={testimonial.id} 
                testimonial={testimonial} 
                isActive={index === current}
              />
            ))}
          
            <motion.button 
              onClick={prev}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              className="absolute -left-4 top-1/2 transform -translate-y-1/2 w-10 h-10 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center text-white hover:text-secondary hover:bg-white/20 transition-all"
              aria-label="Previous testimonial"
            >
              <ChevronLeft size={20} />
            </motion.button>
            
            <motion.button 
              onClick={next}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              className="absolute -right-4 top-1/2 transform -translate-y-1/2 w-10 h-10 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center text-white hover:text-secondary hover:bg-white/20 transition-all"
              aria-label="Next testimonial"
            >
              <ChevronRight size={20} />
            </motion.button>
            
            <div className="flex justify-center space-x-2 mt-8">
              {testimonials.map((_, index) => (
                <motion.button
                  key={index}
                  onClick={() => setCurrent(index)}
                  whileHover={{ scale: 1.2 }}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    index === current 
                      ? 'bg-secondary w-6 shadow-lg shadow-secondary/50' 
                      : 'bg-white/50 hover:bg-white/70 w-2'
                  }`}
                  aria-label={`Go to testimonial ${index + 1}`}
                />
              ))}
            </div>
          </motion.div>
        </div>
        
        <AnimatedSection className="mt-10 flex justify-center" delay={500}>
          <a 
            href="https://www.facebook.com/TantraMovementSchool/reviews" 
            target="_blank" 
            rel="noopener noreferrer"
            className="inline-block"
          >
            <Button 
              variant="glass" 
              className="group transition-all duration-300 px-6 py-4 h-auto flex items-center rounded-full"
            >
              <Facebook strokeWidth={1.5} size={32} className="text-secondary group-hover:scale-110 transition-transform" />
              <span className="flex flex-col items-start ml-3">
                <span className="font-medium text-lg">Read More Testimonials</span>
                <span className="text-sm text-white/80 flex items-center gap-1">
                  <span className="inline-block w-2 h-2 bg-secondary rounded-full animate-pulse"></span>
                  Community Verified
                </span>
              </span>
            </Button>
          </a>
        </AnimatedSection>
      </div>
    </section>
  );
};

export default TestimonialCarousel;
