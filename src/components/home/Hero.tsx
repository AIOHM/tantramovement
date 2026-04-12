import { Link } from 'react-router-dom';
import { useEffect, useState, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useSiteSettings } from '@/hooks/use-site-settings';
import AuroraBackground from '@/components/effects/AuroraBackground';
import KineticText from '@/components/effects/KineticText';
import { Button } from '@/components/ui/button';

const Hero = () => {
  const [isVisible, setIsVisible] = useState(false);
  const { settings } = useSiteSettings();
  const { heroSection } = settings;
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { scrollY } = useScroll();
  const backgroundY = useTransform(scrollY, [0, 500], [0, 150]);
  const contentOpacity = useTransform(scrollY, [0, 400], [1, 0]);
  const contentScale = useTransform(scrollY, [0, 400], [1, 0.95]);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <div 
      ref={containerRef}
      className="h-screen flex items-center justify-center relative overflow-hidden"
    >
      {/* Parallax Background image with enhanced gradient overlay */}
      <motion.div 
        className="absolute inset-0 z-0"
        style={{ y: backgroundY }}
      >
        <div
          className="absolute inset-0 scale-110"
          style={{ 
            backgroundImage: 'url("/lovable-uploads/28212c96-0797-4367-b532-3be0aeba8155.png")',
            backgroundPosition: 'center 20%',
            backgroundSize: 'cover',
          }}
        />
        {/* Strong gradient overlay for WCAG AA contrast compliance */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-black/20" />
        <div className="absolute inset-0 bg-gradient-to-b from-burgundy/30 to-transparent" />
      </motion.div>

      {/* Aurora Energy Background */}
      <AuroraBackground />

      {/* Floating decorative elements */}
      <div className="absolute inset-0 z-5 pointer-events-none overflow-hidden">
        <motion.div
          className="absolute top-1/4 left-10 w-32 h-32 rounded-full border border-white/10"
          animate={{ 
            y: [0, -20, 0],
            rotate: [0, 180, 360],
            opacity: [0.3, 0.5, 0.3]
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        />
        <motion.div
          className="absolute bottom-1/3 right-20 w-24 h-24 rounded-full border border-white/10"
          animate={{ 
            y: [0, 15, 0],
            rotate: [360, 180, 0],
            opacity: [0.2, 0.4, 0.2]
          }}
          transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
        />
        <motion.div
          className="absolute top-1/3 right-1/4 w-2 h-2 rounded-full bg-rose-gold/50"
          animate={{ 
            scale: [1, 1.5, 1],
            opacity: [0.5, 1, 0.5]
          }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>
      
      <motion.div 
        className="section-container relative z-10 mt-16"
        style={{ opacity: contentOpacity, scale: contentScale }}
      >
        <div className="max-w-3xl mx-auto text-center">
          <h1 
            className="text-4xl md:text-6xl lg:text-7xl font-display font-bold text-white mb-6 leading-tight"
            style={{
              textShadow: '0 2px 10px rgba(0, 0, 0, 0.5), 0 4px 15px rgba(0, 0, 0, 0.35)',
            }}
          >
            <KineticText delay={0.3} staggerChildren={0.12}>
              Awaken Love, Presence & Energy Through Tantra
            </KineticText>
          </h1>
          
          <motion.p 
            className="text-xl text-white/90 mb-8 font-body"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 20 }}
            transition={{ delay: 1.5, duration: 0.8 }}
            style={{
              textShadow: '0 2px 8px rgba(0, 0, 0, 0.5), 0 4px 12px rgba(0, 0, 0, 0.3)'
            }}
          >
            {heroSection.subtitle}
          </motion.p>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 20 }}
            transition={{ delay: 2, duration: 0.8 }}
          >
            <Link to="/workshops">
              <Button variant="glass" size="lg" className="text-lg px-8 py-6">
                {heroSection.buttonText}
              </Button>
            </Link>
          </motion.div>
        </div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.5 }}
      >
        <motion.div
          className="w-6 h-10 rounded-full border-2 border-white/30 flex justify-center pt-2"
          animate={{ y: [0, 5, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <motion.div
            className="w-1.5 h-1.5 rounded-full bg-white/60"
            animate={{ y: [0, 12, 0], opacity: [1, 0.3, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Hero;
