import { motion } from 'framer-motion';

interface LoadingRitualProps {
  size?: 'sm' | 'md' | 'lg';
  text?: string;
}

const LoadingRitual = ({ size = 'md', text }: LoadingRitualProps) => {
  const sizeMap = {
    sm: 40,
    md: 60,
    lg: 80,
  };

  const dimension = sizeMap[size];

  return (
    <div className="flex flex-col items-center justify-center gap-4">
      <div className="relative" style={{ width: dimension, height: dimension }}>
        {/* Outer breathing circle */}
        <motion.div
          className="absolute inset-0 rounded-full border-2 border-primary/30"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
        
        {/* Middle rotating ring */}
        <motion.div
          className="absolute inset-2 rounded-full border-2 border-transparent"
          style={{
            borderTopColor: 'hsl(var(--secondary))',
            borderRightColor: 'hsl(var(--secondary) / 0.5)',
          }}
          animate={{ rotate: 360 }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: 'linear',
          }}
        />
        
        {/* Inner pulsing core */}
        <motion.div
          className="absolute inset-4 rounded-full bg-gradient-to-br from-primary/20 to-secondary/20"
          animate={{
            scale: [0.8, 1, 0.8],
            opacity: [0.5, 1, 0.5],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
        
        {/* Center dot */}
        <motion.div
          className="absolute top-1/2 left-1/2 w-2 h-2 -ml-1 -mt-1 rounded-full bg-primary"
          animate={{
            boxShadow: [
              '0 0 10px hsl(var(--primary) / 0.5)',
              '0 0 20px hsl(var(--primary) / 0.8)',
              '0 0 10px hsl(var(--primary) / 0.5)',
            ],
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      </div>
      
      {text && (
        <motion.p
          className="text-muted-foreground font-body text-sm"
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        >
          {text}
        </motion.p>
      )}
    </div>
  );
};

export default LoadingRitual;
