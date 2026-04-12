import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

interface AnimatedIconProps {
  type: 'lotus' | 'infinity' | 'chakra' | 'hearts';
  className?: string;
  delay?: number;
}

const AnimatedIcon = ({ type, className = '', delay = 0 }: AnimatedIconProps) => {
  const ref = useRef<SVGSVGElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  const pathVariants = {
    hidden: { pathLength: 0, opacity: 0 },
    visible: { 
      pathLength: 1, 
      opacity: 1,
      transition: { 
        pathLength: { duration: 0.8, ease: "easeInOut", delay },
        opacity: { duration: 0.3, delay }
      }
    }
  };

  const icons = {
    // Lotus flower icon
    lotus: (
      <svg ref={ref} viewBox="0 0 64 64" className={className} fill="none">
        <motion.path
          d="M32 48C32 48 24 40 24 32C24 24 28 20 32 16C36 20 40 24 40 32C40 40 32 48 32 48Z"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          variants={pathVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        />
        <motion.path
          d="M32 48C32 48 18 42 16 32C14 22 20 16 20 16C24 20 26 28 32 48Z"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          variants={pathVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        />
        <motion.path
          d="M32 48C32 48 46 42 48 32C50 22 44 16 44 16C40 20 38 28 32 48Z"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          variants={pathVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        />
        <motion.path
          d="M32 48C32 48 12 44 8 34C4 24 10 18 10 18"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          variants={pathVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        />
        <motion.path
          d="M32 48C32 48 52 44 56 34C60 24 54 18 54 18"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          variants={pathVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        />
      </svg>
    ),

    // Infinity loop icon
    infinity: (
      <svg ref={ref} viewBox="0 0 64 64" className={className} fill="none">
        <motion.path
          d="M32 32C32 32 24 24 16 24C8 24 4 32 12 36C20 40 32 32 32 32C32 32 40 24 48 24C56 24 60 32 52 36C44 40 32 32 32 32Z"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          variants={pathVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        />
      </svg>
    ),

    // Chakra circle icon
    chakra: (
      <svg ref={ref} viewBox="0 0 64 64" className={className} fill="none">
        <motion.circle
          cx="32"
          cy="32"
          r="20"
          stroke="currentColor"
          strokeWidth="1.5"
          variants={pathVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        />
        <motion.circle
          cx="32"
          cy="32"
          r="12"
          stroke="currentColor"
          strokeWidth="1.5"
          variants={pathVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        />
        <motion.circle
          cx="32"
          cy="32"
          r="4"
          stroke="currentColor"
          strokeWidth="1.5"
          fill="currentColor"
          variants={pathVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        />
        {/* Radiating lines */}
        {[0, 45, 90, 135, 180, 225, 270, 315].map((angle, i) => (
          <motion.line
            key={angle}
            x1={32 + 22 * Math.cos((angle * Math.PI) / 180)}
            y1={32 + 22 * Math.sin((angle * Math.PI) / 180)}
            x2={32 + 28 * Math.cos((angle * Math.PI) / 180)}
            y2={32 + 28 * Math.sin((angle * Math.PI) / 180)}
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            variants={pathVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
          />
        ))}
      </svg>
    ),

    // Connected hearts icon
    hearts: (
      <svg ref={ref} viewBox="0 0 64 64" className={className} fill="none">
        <motion.path
          d="M22 28C22 24 18 20 14 20C10 20 6 24 6 28C6 36 22 44 22 44C22 44 38 36 38 28C38 24 34 20 30 20C26 20 22 24 22 28Z"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          variants={pathVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        />
        <motion.path
          d="M42 28C42 24 46 20 50 20C54 20 58 24 58 28C58 36 42 44 42 44C42 44 26 36 26 28"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          variants={pathVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        />
      </svg>
    )
  };

  return icons[type];
};

export default AnimatedIcon;
