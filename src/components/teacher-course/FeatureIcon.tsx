import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { LucideIcon } from 'lucide-react';

interface FeatureIconProps {
  Icon: LucideIcon;
  variant: 'gold' | 'burgundy';
  delay?: number;
}

const FeatureIcon = ({ Icon, variant, delay = 0 }: FeatureIconProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  const bgColor = 'bg-[#592C66]';
  const glowColor = '#592C66';

  return (
    <motion.div
      ref={ref}
      className={`relative flex-shrink-0 w-12 h-12 ${bgColor} rounded-full flex items-center justify-center mr-4`}
      initial={{ scale: 0, opacity: 0 }}
      animate={isInView ? { scale: 1, opacity: 1 } : {}}
      transition={{ 
        duration: 0.5, 
        delay,
        type: "spring",
        stiffness: 200,
        damping: 15
      }}
    >
      {/* Pulsing glow */}
      <motion.div
        className="absolute inset-0 rounded-full"
        style={{ boxShadow: `0 0 20px ${glowColor}` }}
        animate={isInView ? { 
          opacity: [0.5, 0.8, 0.5],
          scale: [1, 1.1, 1]
        } : {}}
        transition={{ duration: 3, repeat: Infinity, delay: delay + 0.5 }}
      />
      
      {/* Icon with draw animation */}
      <motion.div
        initial={{ opacity: 0, rotate: -10 }}
        animate={isInView ? { opacity: 1, rotate: 0 } : {}}
        transition={{ duration: 0.4, delay: delay + 0.2 }}
      >
        <Icon className="text-primary-foreground h-5 w-5" />
      </motion.div>
    </motion.div>
  );
};

export default FeatureIcon;
