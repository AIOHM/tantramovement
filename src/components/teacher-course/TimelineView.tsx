import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Heart, Zap, Hand, Brain } from 'lucide-react';

interface WeekData {
  week: number;
  title: string;
  color: string;
  items: string[];
}

interface TimelineViewProps {
  weeklySchedule: WeekData[];
}

const weekIcons = [Sparkles, Heart, Zap, Hand, Brain];

const TimelineView: React.FC<TimelineViewProps> = ({ weeklySchedule }) => {
  return (
    <div className="relative">
      {/* Central Timeline Spine - Desktop only */}
      <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-px -translate-x-1/2">
        <motion.div
          className="w-full h-full"
          style={{
            background: 'linear-gradient(180deg, hsl(var(--primary)) 0%, hsl(var(--secondary)) 50%, hsl(var(--accent)) 100%)',
          }}
          initial={{ scaleY: 0, originY: 0 }}
          whileInView={{ scaleY: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.5, ease: "easeOut" }}
        />
      </div>

      {/* Mobile Timeline Spine */}
      <div className="md:hidden absolute left-6 top-0 bottom-0 w-px">
        <motion.div
          className="w-full h-full"
          style={{
            background: 'linear-gradient(180deg, hsl(var(--primary)) 0%, hsl(var(--secondary)) 50%, hsl(var(--accent)) 100%)',
          }}
          initial={{ scaleY: 0, originY: 0 }}
          whileInView={{ scaleY: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.5, ease: "easeOut" }}
        />
      </div>

      {/* Timeline Cards */}
      <div className="space-y-12 md:space-y-16">
        {weeklySchedule.map((week, index) => {
          const Icon = weekIcons[index % weekIcons.length];
          const isEven = index % 2 === 0;
          
          return (
            <motion.div
              key={week.week}
              className={`relative flex items-start gap-4 md:gap-8 ${
                isEven ? 'md:flex-row' : 'md:flex-row-reverse'
              }`}
              initial={{ opacity: 0, x: isEven ? -50 : 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: index * 0.15 }}
            >
              {/* Timeline Node - Desktop */}
              <div className="hidden md:flex absolute left-1/2 -translate-x-1/2 z-10">
                <motion.div
                  className="relative"
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.15 + 0.3, type: "spring", stiffness: 200 }}
                >
                  {/* Glow Effect */}
                  <motion.div
                    className="absolute inset-0 rounded-full blur-md"
                    style={{
                      background: week.color === 'primary' 
                        ? 'hsl(var(--primary) / 0.5)' 
                        : 'hsl(var(--secondary) / 0.5)',
                    }}
                    animate={{ scale: [1, 1.3, 1], opacity: [0.5, 0.8, 0.5] }}
                    transition={{ duration: 3, repeat: Infinity, delay: index * 0.2 }}
                  />
                  {/* Week Number Circle */}
                  <div
                    className={`w-14 h-14 rounded-full flex items-center justify-center text-lg font-display font-bold relative ${
                      week.color === 'primary' 
                        ? 'bg-primary text-primary-foreground' 
                        : 'bg-secondary text-secondary-foreground'
                    }`}
                  >
                    {week.week}
                  </div>
                </motion.div>
              </div>

              {/* Timeline Node - Mobile */}
              <div className="md:hidden flex-shrink-0 z-10">
                <motion.div
                  className="relative"
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.15 + 0.3, type: "spring", stiffness: 200 }}
                >
                  <motion.div
                    className="absolute inset-0 rounded-full blur-md"
                    style={{
                      background: week.color === 'primary' 
                        ? 'hsl(var(--primary) / 0.5)' 
                        : 'hsl(var(--secondary) / 0.5)',
                    }}
                    animate={{ scale: [1, 1.3, 1], opacity: [0.5, 0.8, 0.5] }}
                    transition={{ duration: 3, repeat: Infinity, delay: index * 0.2 }}
                  />
                  <div
                    className={`w-12 h-12 rounded-full flex items-center justify-center text-base font-display font-bold relative ${
                      week.color === 'primary' 
                        ? 'bg-primary text-primary-foreground' 
                        : 'bg-secondary text-secondary-foreground'
                    }`}
                  >
                    {week.week}
                  </div>
                </motion.div>
              </div>

              {/* Card */}
              <motion.div
                className={`flex-1 md:w-[calc(50%-3rem)] ${isEven ? 'md:pr-12' : 'md:pl-12'}`}
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.3 }}
              >
                <div
                  className={`relative p-6 rounded-xl border backdrop-blur-sm overflow-hidden group ${
                    week.color === 'primary'
                      ? 'border-primary/30 hover:border-primary/50'
                      : 'border-secondary/30 hover:border-secondary/50'
                  }`}
                  style={{
                    background: 'linear-gradient(135deg, hsl(var(--background) / 0.8), hsl(var(--card) / 0.6))',
                  }}
                >
                  {/* Decorative Pattern */}
                  <div
                    className="absolute top-0 right-0 w-32 h-32 opacity-5 group-hover:opacity-10 transition-opacity duration-500"
                    style={{
                      background: `radial-gradient(circle, ${
                        week.color === 'primary' ? 'hsl(var(--primary))' : 'hsl(var(--secondary))'
                      } 1px, transparent 1px)`,
                      backgroundSize: '8px 8px',
                    }}
                  />

                  {/* Header */}
                  <div className="flex items-center gap-3 mb-4">
                    <div
                      className={`p-2 rounded-lg ${
                        week.color === 'primary'
                          ? 'bg-primary/10 text-primary'
                          : 'bg-secondary/10 text-secondary'
                      }`}
                    >
                      <Icon size={20} />
                    </div>
                    <div>
                      <p className="text-xs uppercase tracking-wider text-muted-foreground mb-1">
                        Week {week.week}
                      </p>
                      <h4
                        className={`text-xl font-display font-medium ${
                          week.color === 'primary' ? 'text-primary' : 'text-secondary'
                        }`}
                      >
                        {week.title}
                      </h4>
                    </div>
                  </div>

                  {/* Items */}
                  <ul className="space-y-3">
                    {week.items.map((item, j) => (
                      <motion.li
                        key={j}
                        className="flex items-start gap-3 text-foreground/70"
                        initial={{ opacity: 0, x: -10 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.1 + j * 0.05 + 0.3 }}
                      >
                        <motion.span
                          className={`mt-2 w-2 h-2 rounded-full flex-shrink-0 ${
                            week.color === 'primary' ? 'bg-primary' : 'bg-secondary'
                          }`}
                          initial={{ scale: 0 }}
                          whileInView={{ scale: 1 }}
                          viewport={{ once: true }}
                          transition={{ delay: index * 0.1 + j * 0.05 + 0.4 }}
                        />
                        <span className="leading-relaxed">{item}</span>
                      </motion.li>
                    ))}
                  </ul>

                  {/* Hover Glow */}
                  <motion.div
                    className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                    style={{
                      background: `radial-gradient(circle at 50% 100%, ${
                        week.color === 'primary'
                          ? 'hsl(var(--primary) / 0.1)'
                          : 'hsl(var(--secondary) / 0.1)'
                      } 0%, transparent 70%)`,
                    }}
                  />
                </div>
              </motion.div>

              {/* Spacer for alternating layout */}
              <div className="hidden md:block flex-1 md:w-[calc(50%-3rem)]" />
            </motion.div>
          );
        })}
      </div>

      {/* Journey Complete Badge */}
      <motion.div
        className="flex justify-center mt-12"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.8 }}
      >
        <div className="glass-panel-warm px-6 py-3 rounded-full flex items-center gap-3">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
          >
            <Sparkles size={18} className="text-secondary" />
          </motion.div>
          <span className="text-sm font-display text-foreground/80">
            5 Weeks of Transformation
          </span>
        </div>
      </motion.div>
    </div>
  );
};

export default TimelineView;
