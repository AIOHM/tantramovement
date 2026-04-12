import { useEffect, useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface Trail {
  id: number;
  x: number;
  y: number;
}

const CursorEnergy = () => {
  const [trails, setTrails] = useState<Trail[]>([]);
  const [isVisible, setIsVisible] = useState(false);

  const handleMouseMove = useCallback((e: MouseEvent) => {
    const newTrail: Trail = {
      id: Date.now(),
      x: e.clientX,
      y: e.clientY,
    };

    setTrails((prev) => [...prev.slice(-8), newTrail]);
    setIsVisible(true);
  }, []);

  const handleMouseLeave = useCallback(() => {
    setIsVisible(false);
  }, []);

  useEffect(() => {
    window.addEventListener('mousemove', handleMouseMove);
    document.body.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.body.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [handleMouseMove, handleMouseLeave]);

  useEffect(() => {
    const cleanup = setInterval(() => {
      setTrails((prev) => prev.slice(1));
    }, 50);

    return () => clearInterval(cleanup);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-[9999]">
      <AnimatePresence>
        {isVisible && trails.map((trail, index) => (
          <motion.div
            key={trail.id}
            initial={{ scale: 1, opacity: 0.6 }}
            animate={{ scale: 0, opacity: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className="absolute rounded-full"
            style={{
              left: trail.x - 10,
              top: trail.y - 10,
              width: 20,
              height: 20,
              background: `radial-gradient(circle, hsl(var(--secondary) / ${0.3 - index * 0.03}) 0%, transparent 70%)`,
              filter: 'blur(2px)',
            }}
          />
        ))}
      </AnimatePresence>
    </div>
  );
};

export default CursorEnergy;
