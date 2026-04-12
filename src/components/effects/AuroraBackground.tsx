import { useEffect, useState } from 'react';

interface AuroraOrb {
  id: number;
  x: number;
  y: number;
  size: number;
  duration: number;
  delay: number;
  color: string;
}

const AuroraBackground = () => {
  const [orbs] = useState<AuroraOrb[]>([
    { id: 1, x: 20, y: 30, size: 400, duration: 25, delay: 0, color: 'hsl(var(--primary) / 0.15)' },
    { id: 2, x: 70, y: 60, size: 350, duration: 30, delay: 5, color: 'hsl(var(--secondary) / 0.12)' },
    { id: 3, x: 40, y: 80, size: 300, duration: 28, delay: 10, color: 'hsl(var(--accent) / 0.1)' },
    { id: 4, x: 80, y: 20, size: 280, duration: 22, delay: 3, color: 'hsl(25 70% 50% / 0.08)' },
  ]);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {orbs.map((orb) => (
        <div
          key={orb.id}
          className="absolute rounded-full blur-3xl animate-aurora-float"
          style={{
            left: `${orb.x}%`,
            top: `${orb.y}%`,
            width: orb.size,
            height: orb.size,
            background: `radial-gradient(circle, ${orb.color} 0%, transparent 70%)`,
            animationDuration: `${orb.duration}s`,
            animationDelay: `${orb.delay}s`,
            transform: 'translate(-50%, -50%)',
          }}
        />
      ))}
    </div>
  );
};

export default AuroraBackground;
