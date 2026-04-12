import { motion, useInView } from 'framer-motion';
import { Quote, Users } from 'lucide-react';
import { useRef, useEffect, useState } from 'react';

const AnimatedNumber = ({ value, suffix }: { value: number; suffix: string }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    if (!isInView) return;

    const duration = 2000;
    const steps = 60;
    const increment = value / steps;
    let step = 0;

    const timer = setInterval(() => {
      step++;
      setDisplayValue(Math.min(Math.round(increment * step), value));
      if (step >= steps) clearInterval(timer);
    }, duration / steps);

    return () => clearInterval(timer);
  }, [value, isInView]);

  return (
    <span ref={ref} className="tabular-nums">
      {displayValue}{suffix}
    </span>
  );
};

const SocialProof = () => {
  return (
    <section className="py-16 bg-background">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          {/* Testimonial */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="relative p-8 md:p-10 rounded-3xl bg-card/50 backdrop-blur-lg border border-border/50 mb-12"
          >
            {/* Quote mark */}
            <div className="absolute -top-4 left-8 w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
              <Quote className="w-5 h-5 text-primary" />
            </div>

            <blockquote className="text-lg md:text-xl text-foreground italic leading-relaxed mb-6">
              "From my first discovery call, I knew this was different. There was no pressure, 
              just genuine curiosity about my journey and honest answers to my questions. 
              That conversation gave me the clarity I needed to take this transformative step."
            </blockquote>

            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center">
                <span className="text-primary font-display">S</span>
              </div>
              <div>
                <p className="font-display text-foreground">Sarah M.</p>
                <p className="text-sm text-muted-foreground">Graduate, 2024 Training</p>
              </div>
            </div>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-8 text-center"
          >
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                <Users className="w-6 h-6 text-primary" />
              </div>
              <div className="text-left">
                <div className="font-display text-2xl text-foreground">
                  <AnimatedNumber value={50} suffix="+" />
                </div>
                <p className="text-sm text-muted-foreground">Teachers Trained</p>
              </div>
            </div>

            <div className="hidden sm:block w-px h-12 bg-border" />

            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center">
                <span className="text-accent font-display">★</span>
              </div>
              <div className="text-left">
                <div className="font-display text-2xl text-foreground">
                  <AnimatedNumber value={100} suffix="%" />
                </div>
                <p className="text-sm text-muted-foreground">Would Recommend</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default SocialProof;
