import { motion, useInView } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';
import { Clock, GraduationCap, Users, Book, Heart, Award } from 'lucide-react';
import FeatureIcon from './FeatureIcon';

interface AnimatedNumberProps {
  value: number;
  suffix?: string;
  inView: boolean;
}

const AnimatedNumber = ({ value, suffix = '', inView }: AnimatedNumberProps) => {
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    if (!inView) return;
    
    let startTime: number;
    const duration = 1500;
    
    const animate = (currentTime: number) => {
      if (!startTime) startTime = currentTime;
      const progress = Math.min((currentTime - startTime) / duration, 1);
      
      // Easing function for smooth animation
      const easeOut = 1 - Math.pow(1 - progress, 3);
      setDisplayValue(Math.floor(easeOut * value));
      
      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };
    
    requestAnimationFrame(animate);
  }, [value, inView]);

  return <span>{displayValue}{suffix}</span>;
};

const WelcomeSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  const features = [
    { Icon: Clock, title: '200', suffix: ' Hours', subtitle: 'of comprehensive training', variant: 'gold' as const },
    { Icon: GraduationCap, title: 'Recognized', subtitle: 'as a Tantra Teacher, Masseuse, and KAP Facilitator', variant: 'gold' as const, isText: true },
    { Icon: Users, title: 'Internship', subtitle: 'during and after the course', variant: 'gold' as const, isText: true },
    { Icon: Book, title: '330', suffix: '-Page', subtitle: 'Textbook and detailed practice manual', variant: 'burgundy' as const },
    { Icon: Heart, title: '50+', subtitle: 'Instructional Videos for ongoing learning', variant: 'burgundy' as const },
    { Icon: Users, title: 'Personalized', subtitle: 'Mentorship from experienced teachers', variant: 'burgundy' as const, isText: true },
  ];

  return (
    <motion.div
      ref={sectionRef}
      className="bg-[#d8a897]/60 backdrop-blur-xl px-10 pt-5 pb-10 md:px-12 md:pt-12 md:pb-12 rounded-xl mb-16 relative overflow-hidden border-2 border-primary"
      initial={{ opacity: 0, y: 30, scale: 0.98 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, type: "spring" }}
    >
      {/* Decorative top accent */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-1 bg-gradient-to-r from-transparent via-[#D8A897] to-transparent" />
      
      {/* Subtle glow */}
      <div className="absolute -top-20 -right-20 w-64 h-64 rounded-full opacity-20 blur-3xl bg-[#D8A897]" />
      
      {/* Credentials Bar */}
      <motion.div 
        className="flex flex-wrap justify-center gap-4 mb-8"
        initial={{ opacity: 0, y: 10 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ delay: 0.1 }}
      >
        <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-[#592C66] border border-[#592C66]/30">
          <Award className="h-4 w-4 text-white" />
          <span className="text-sm font-display text-white">14+ Years Experience</span>
        </div>
        <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-[#592C66] border border-[#592C66]/30">
          <GraduationCap className="h-4 w-4 text-white" />
          <span className="text-sm font-display text-white">500+ Graduates</span>
        </div>
        <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-[#592C66] border border-[#592C66]/30">
          <Users className="h-4 w-4 text-white" />
          <span className="text-sm font-display text-white">40+ Countries</span>
        </div>
      </motion.div>
      
      <motion.h2 
        className="text-3xl md:text-4xl font-display font-bold text-white mb-6 text-center"
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ delay: 0.2 }}
      >
        Welcome to Your Tantra Teaching Journey
      </motion.h2>
      
      <motion.p 
        className="text-white/80 mb-10 text-center max-w-2xl mx-auto text-lg leading-relaxed"
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : {}}
        transition={{ delay: 0.3 }}
      >
        Tantra is a transformative path that unites body, heart, and soul with higher consciousness. 
        Our Neo-Tantra Teacher Training is designed for those who feel called to share this sacred wisdom with others.
      </motion.p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {features.map((feature, index) => (
          <motion.div
            key={index}
            className="flex items-start group"
            initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.4 + index * 0.1 }}
          >
            <FeatureIcon 
              Icon={feature.Icon} 
              variant={feature.variant} 
              delay={0.5 + index * 0.1}
            />
            <div>
              <h3 className="font-medium text-white text-lg group-hover:text-[#D8A897] transition-colors">
                {feature.isText ? (
                  feature.title
                ) : (
                  <AnimatedNumber 
                    value={parseInt(feature.title)} 
                    suffix={feature.suffix} 
                    inView={isInView} 
                  />
                )}
                {feature.isText && ' Certification'}
              </h3>
              <p className="text-white/60">{feature.subtitle}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default WelcomeSection;
