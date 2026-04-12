import { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Link } from 'react-router-dom';
import AuroraBackground from '@/components/effects/AuroraBackground';
import KineticText from '@/components/effects/KineticText';
import { Calendar, MapPin } from 'lucide-react';

const RotatingDate = () => {
  const [currentDate, setCurrentDate] = useState(0);
  const dates = [
    "2nd March - 5th April 2026",
    "1st June - 5th July 2026"
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentDate((prev) => (prev + 1) % dates.length);
    }, 3000); // Change every 3 seconds

    return () => clearInterval(interval);
  }, [dates.length]);

  return (
    <motion.span
      key={currentDate}
      className="font-display text-base sm:text-lg inline-block"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.5 }}
    >
      {dates[currentDate]}
    </motion.span>
  );
};

const CourseHero = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.1]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <div ref={containerRef} className="relative h-screen min-h-[600px] flex items-center overflow-hidden">
      {/* Parallax Background - disabled on mobile for performance */}
      <motion.div 
        className="absolute inset-0"
        style={{ 
          y: typeof window !== 'undefined' && window.innerWidth < 768 ? 0 : y, 
          scale: typeof window !== 'undefined' && window.innerWidth < 768 ? 1 : scale 
        }}
      >
        <img 
          src="/lovable-uploads/e0746755-c7e1-4abf-b16b-3725e10dda5a.png"
          alt="Tantra Teacher Training"
          className="w-full h-full object-cover"
        />
      </motion.div>
      
      {/* Multi-layer gradient overlays */}
      <div className="absolute inset-0 bg-gradient-to-b from-chocolate/50 via-chocolate/30 to-chocolate/70" />
      <div className="absolute inset-0 bg-gradient-to-t from-burgundy/40 to-transparent" />
      <div className="absolute inset-0 bg-[#592C66]/15" />
      
      {/* Aurora Energy Effect */}
      <AuroraBackground />
      
      {/* Floating Decorative Elements - hidden on mobile for performance */}
      <motion.div
        className="absolute top-20 left-10 w-32 h-32 rounded-full opacity-20 hidden md:block"
        style={{
          background: 'radial-gradient(circle, hsl(var(--secondary) / 0.4) 0%, transparent 70%)',
        }}
        animate={{
          y: [0, -20, 0],
          x: [0, 10, 0],
          scale: [1, 1.1, 1],
        }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute bottom-40 right-20 w-48 h-48 rounded-full opacity-15 hidden md:block"
        style={{
          background: 'radial-gradient(circle, hsl(var(--accent) / 0.5) 0%, transparent 70%)',
        }}
        animate={{
          y: [0, 15, 0],
          x: [0, -15, 0],
          scale: [1, 1.15, 1],
        }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 2 }}
      />
      
      {/* Content */}
      <motion.div 
        className="section-container relative z-10"
        style={{ opacity }}
      >
        <div className="text-center max-w-4xl mx-auto">
          {/* Certification Headline */}
          <motion.div
            className="mb-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <h2 className="text-xl md:text-2xl lg:text-3xl font-display font-semibold text-white mb-2">
              <KineticText delay={0} staggerChildren={0.1}>
                200-Hour Tantra Teacher Certification
              </KineticText>
            </h2>
            <div className="w-24 h-1 bg-accent mx-auto rounded-full"></div>
          </motion.div>
          
          {/* Main Headline with Kinetic Text */}
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-display font-bold text-primary-foreground mb-6 text-shadow-lg">
            <KineticText delay={0.2} staggerChildren={0.12}>
              Tantra Teacher Course
            </KineticText>
          </h1>
          
          {/* Price Badge */}
          <motion.div
            className="flex flex-col items-center gap-2 mb-6"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.6 }}
          >
            <div className="flex items-center gap-3 px-6 py-3 rounded-full backdrop-blur-lg border border-primary-foreground/20"
              style={{ background: 'linear-gradient(135deg, hsl(var(--accent) / 0.4), hsl(var(--secondary) / 0.3))' }}
            >
              <span className="text-primary-foreground/70 line-through text-lg">€4,200</span>
              <span className="text-3xl font-display font-bold text-primary-foreground">€3,500</span>
              <span className="px-2 py-0.5 bg-accent/80 text-accent-foreground text-xs font-display rounded-full tracking-wider">
                EARLY BIRD
              </span>
            </div>
            <span className="text-primary-foreground/70 text-lg font-display">
              Only 4 spots remaining
            </span>
          </motion.div>
          
          {/* Floating Glass-Morphic Date Badge - responsive stacking */}
          <motion.div 
            className="inline-flex flex-col sm:flex-row items-center gap-3 sm:gap-6 px-6 sm:px-8 py-3 sm:py-4 rounded-2xl sm:rounded-full backdrop-blur-lg border border-primary-foreground/20 shadow-ceremony mb-8"
            style={{
              background: 'linear-gradient(135deg, hsl(var(--primary) / 0.3), hsl(var(--accent) / 0.2))',
            }}
            initial={{ opacity: 0, y: 30 }}
            animate={{ 
              opacity: 1, 
              y: [0, -6, 0],
            }}
            transition={{ 
              opacity: { duration: 0.8, delay: 0.8 },
              y: { duration: 8, repeat: Infinity, ease: "easeInOut", delay: 1 }
            }}
          >
            <div className="flex items-center gap-2 text-primary-foreground/90">
              <MapPin className="h-4 w-4 sm:h-5 sm:w-5 flex-shrink-0" />
              <span className="font-display text-base sm:text-lg">Thailand - Koh Phangan</span>
            </div>
            <div className="hidden sm:block w-px h-6 bg-primary-foreground/30" />
            <div className="w-12 h-px sm:hidden bg-primary-foreground/30" />
            <div className="flex items-center gap-2 text-primary-foreground/90">
              <Calendar className="h-4 w-4 sm:h-5 sm:w-5 flex-shrink-0" />
              <RotatingDate />
            </div>
          </motion.div>

          {/* CTA Button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1 }}
          >
            <Link to="/apply">
              <motion.button
                className="px-10 py-4 bg-accent text-accent-foreground rounded-full font-display tracking-wider text-sm uppercase shadow-glow transition-all duration-300"
                whileHover={{ scale: 1.05, boxShadow: '0 0 50px hsl(var(--accent) / 0.5)' }}
                whileTap={{ scale: 0.98 }}
              >
                Apply Now – Save €700
              </motion.button>
            </Link>
          </motion.div>
        </div>
      </motion.div>
      
      {/* Scroll Indicator */}
      <motion.div 
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
      >
        <motion.div
          className="w-6 h-10 rounded-full border-2 border-primary-foreground/40 flex justify-center pt-2"
          animate={{ y: [0, 4, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <motion.div
            className="w-1.5 h-3 rounded-full bg-accent"
            animate={{ y: [0, 8, 0], opacity: [1, 0.3, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
        </motion.div>
        <span className="text-primary-foreground/60 text-sm font-display tracking-wider">Scroll</span>
      </motion.div>
    </div>
  );
};

export default CourseHero;
