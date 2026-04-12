import { useEffect, useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';

interface Stat {
  value: number;
  suffix: string;
  label: string;
}

interface AnimatedStatsProps {
  stats: Stat[];
  className?: string;
}

const AnimatedNumber = ({ value, suffix, inView }: { value: number; suffix: string; inView: boolean }) => {
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    if (!inView) return;

    const duration = 2000;
    const steps = 60;
    const increment = value / steps;
    let current = 0;
    let step = 0;

    const timer = setInterval(() => {
      step++;
      current = Math.min(Math.round(increment * step), value);
      setDisplayValue(current);

      if (step >= steps) {
        clearInterval(timer);
        setDisplayValue(value);
      }
    }, duration / steps);

    return () => clearInterval(timer);
  }, [value, inView]);

  return (
    <span className="tabular-nums">
      {displayValue}{suffix}
    </span>
  );
};

const AnimatedStats = ({ stats, className = '' }: AnimatedStatsProps) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <div ref={ref} className={`grid grid-cols-2 md:grid-cols-4 gap-8 ${className}`}>
      {stats.map((stat, index) => (
        <motion.div
          key={stat.label}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: index * 0.15, duration: 0.6, ease: 'easeOut' }}
          className="text-center"
        >
          <div className="relative inline-block">
            <span className="text-4xl md:text-5xl font-display font-bold text-primary">
              <AnimatedNumber value={stat.value} suffix={stat.suffix} inView={isInView} />
            </span>
            <motion.div
              initial={{ scale: 0 }}
              animate={isInView ? { scale: 1 } : {}}
              transition={{ delay: index * 0.15 + 0.3, duration: 0.5 }}
              className="absolute -inset-4 rounded-full bg-primary/5 -z-10"
              style={{
                boxShadow: '0 0 40px hsl(var(--primary) / 0.1)',
              }}
            />
          </div>
          <p className="mt-2 text-muted-foreground font-body">{stat.label}</p>
        </motion.div>
      ))}
    </div>
  );
};

export default AnimatedStats;
