import { motion, useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import AnimatedIcon from './AnimatedIcon';

interface PrincipleCardProps {
  id: string;
  title: string;
  description: string;
  icon: 'lotus' | 'infinity' | 'chakra' | 'hearts';
  index: number;
  gradientFrom: string;
  gradientTo: string;
}

const PrincipleCard = ({ 
  id, 
  title, 
  description, 
  icon, 
  index,
  gradientFrom,
  gradientTo 
}: PrincipleCardProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(cardRef, { once: true, margin: "-100px" });

  // Slight rotation variations for organic feel
  const rotations = [-1.5, 1, -0.5, 1.5];
  const baseRotation = rotations[index % 4];

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 30, rotate: baseRotation }}
      animate={isInView ? { 
        opacity: 1, 
        y: 0, 
        rotate: isHovered ? 0 : baseRotation 
      } : {}}
      transition={{ 
        duration: 0.6,
        delay: index * 0.15,
        type: "spring",
        stiffness: 100,
        damping: 15
      }}
      whileHover={{ 
        scale: 1.02, 
        rotate: 0,
        transition: { duration: 0.3 }
      }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      className="relative group cursor-pointer"
    >
      {/* Glow effect on hover */}
      <div 
        className="absolute -inset-2 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl"
        style={{
          background: `linear-gradient(135deg, ${gradientFrom} 0%, ${gradientTo} 100%)`
        }}
      />

      {/* Main card */}
      <div 
        className="relative p-8 md:p-10 rounded-2xl overflow-hidden transition-all duration-500"
        style={{
          background: `linear-gradient(135deg, hsl(var(--accent) / 0.08) 0%, hsl(var(--secondary) / 0.04) 100%)`,
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          border: '1px solid hsl(var(--accent) / 0.15)',
          boxShadow: isHovered 
            ? '0 30px 60px -15px rgba(0, 0, 0, 0.2), 0 0 40px -10px hsl(var(--accent) / 0.3)'
            : '0 15px 40px -10px rgba(0, 0, 0, 0.1)'
        }}
      >
        {/* Animated icon */}
        <div className="mb-6">
          <AnimatedIcon 
            type={icon} 
            className="w-12 h-12 md:w-16 md:h-16 text-primary" 
            delay={index * 0.15 + 0.3}
          />
        </div>

        {/* Title */}
        <h4 className="text-xl md:text-2xl font-cormorant font-semibold text-foreground mb-4 transition-colors duration-300 group-hover:text-primary">
          {title}
        </h4>

        {/* Description */}
        <p className="text-muted-foreground font-lora leading-relaxed transition-colors duration-300 group-hover:text-foreground/90">
          {description}
        </p>

        {/* Decorative corner accent */}
        <div 
          className="absolute top-0 right-0 w-20 h-20 opacity-10 group-hover:opacity-20 transition-opacity duration-500"
          style={{
            background: `radial-gradient(circle at top right, ${gradientFrom} 0%, transparent 70%)`
          }}
        />
      </div>
    </motion.div>
  );
};

export default PrincipleCard;
