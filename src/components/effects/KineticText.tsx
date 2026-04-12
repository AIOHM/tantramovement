import { motion } from 'framer-motion';
import { ReactNode } from 'react';

interface KineticTextProps {
  children: string;
  className?: string;
  delay?: number;
  as?: 'h1' | 'h2' | 'h3' | 'p' | 'span';
  staggerChildren?: number;
}

const KineticText = ({ 
  children, 
  className = '', 
  delay = 0,
  as: Component = 'span',
  staggerChildren = 0.08
}: KineticTextProps) => {
  const words = children.split(' ');

  const container = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren,
        delayChildren: delay,
      },
    },
  };

  const wordAnimation = {
    hidden: { 
      opacity: 0, 
      y: 30,
      letterSpacing: '0.05em',
    },
    visible: { 
      opacity: 1, 
      y: 0,
      letterSpacing: '0.02em',
      transition: {
        type: 'spring',
        damping: 12,
        stiffness: 100,
      },
    },
  };

  return (
    <motion.span
      className={`inline-block ${className}`}
      variants={container}
      initial="hidden"
      animate="visible"
    >
      {words.map((word, index) => (
        <motion.span
          key={index}
          className="inline-block mr-[0.25em]"
          variants={wordAnimation}
        >
          {word}
        </motion.span>
      ))}
    </motion.span>
  );
};

export default KineticText;
