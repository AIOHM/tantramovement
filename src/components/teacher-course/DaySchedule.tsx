import React from 'react';
import { motion } from 'framer-motion';
import { Sunrise, Sun, Sunset, Moon, Coffee, UtensilsCrossed, Sparkles } from 'lucide-react';

interface TimeBlock {
  time: string;
  title: string;
  description: string;
  icon: 'sunrise' | 'sun' | 'sunset' | 'moon' | 'coffee' | 'meal';
  period: 'morning' | 'midday' | 'afternoon' | 'evening';
}

const timeBlocks: TimeBlock[] = [
  { time: '9:00 - 10:30 AM', title: 'Morning Practice', description: 'Optional meditation, yoga, or breathwork', icon: 'sunrise', period: 'morning' },
  { time: '10:30 - 11:00 AM', title: 'Breakfast', description: 'Nourishing start to the day', icon: 'coffee', period: 'morning' },
  { time: '11:00 AM - 2:30 PM', title: 'Morning Session', description: 'Theory and immersive practice', icon: 'sun', period: 'midday' },
  { time: '2:30 - 3:30 PM', title: 'Lunch Break', description: 'Rest and integration time', icon: 'meal', period: 'midday' },
  { time: '3:30 - 7:00 PM', title: 'Afternoon Session', description: 'Practical exercises & massage training', icon: 'sunset', period: 'afternoon' },
  { time: '7:00 - 8:00 PM', title: 'Dinner', description: 'Community meal', icon: 'meal', period: 'afternoon' },
  { time: '9:30 PM onwards', title: 'Personal Time', description: 'Rest and self-reflection', icon: 'moon', period: 'evening' },
];

const scheduleNotes = [
  'One day off per week for rest and integration',
  'Special evening ceremonies twice weekly',
  'Schedule adjusts for beach excursions and nature experiences',
  'Final week includes teaching practice and certification presentations',
];

const iconMap = {
  sunrise: Sunrise,
  sun: Sun,
  sunset: Sunset,
  moon: Moon,
  coffee: Coffee,
  meal: UtensilsCrossed,
};

const periodColors = {
  morning: { bg: 'from-[#592C66]/10 to-[#D8A897]/10', border: 'border-[#592C66]/30', text: 'text-[#592C66]' },
  midday: { bg: 'from-[#592C66]/10 to-[#D8A897]/10', border: 'border-[#592C66]/30', text: 'text-[#592C66]' },
  afternoon: { bg: 'from-[#592C66]/10 to-[#D8A897]/10', border: 'border-[#592C66]/30', text: 'text-[#592C66]' },
  evening: { bg: 'from-[#592C66]/10 to-[#D8A897]/10', border: 'border-[#592C66]/30', text: 'text-[#592C66]' },
};

const DaySchedule: React.FC = () => {
  return (
    <div className="space-y-10">
      {/* Sun Arc Visual Header */}
      <motion.div
        className="relative h-32 md:h-40 overflow-hidden rounded-2xl"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        {/* Gradient Sky Background */}
        <div 
          className="absolute inset-0"
          style={{
            background: 'linear-gradient(90deg, hsl(35 80% 70% / 0.3) 0%, hsl(45 90% 75% / 0.4) 30%, hsl(30 70% 60% / 0.4) 70%, hsl(280 40% 40% / 0.3) 100%)',
          }}
        />
        
        {/* Sun Arc Path */}
        <svg className="absolute inset-0 w-full h-full" viewBox="0 0 400 100" preserveAspectRatio="none">
          <motion.path
            d="M 0,100 Q 200,-20 400,100"
            fill="none"
            stroke="url(#sunGradient)"
            strokeWidth="2"
            strokeDasharray="4 4"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 2, ease: "easeOut" }}
          />
          <defs>
            <linearGradient id="sunGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="hsl(35 80% 60%)" />
              <stop offset="50%" stopColor="hsl(45 90% 65%)" />
              <stop offset="100%" stopColor="hsl(280 50% 50%)" />
            </linearGradient>
          </defs>
        </svg>

        {/* Sun Icons along arc */}
        {[
          { pos: '10%', icon: Sunrise, label: 'Dawn', delay: 0.3 },
          { pos: '50%', icon: Sun, label: 'Midday', delay: 0.5 },
          { pos: '90%', icon: Moon, label: 'Night', delay: 0.7 },
        ].map((item, i) => (
          <motion.div
            key={i}
            className="absolute"
            style={{ left: item.pos, top: i === 1 ? '20%' : '50%', transform: 'translateX(-50%)' }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: item.delay, duration: 0.5 }}
          >
            <div className="flex flex-col items-center">
              <motion.div
                className="p-2 rounded-full bg-background/80 backdrop-blur-sm border border-[#592C66]/20"
                animate={{ y: [0, -3, 0] }}
                transition={{ duration: 3, repeat: Infinity, delay: i * 0.3 }}
              >
                <item.icon size={20} className="text-[#592C66]" />
              </motion.div>
              <span className="text-xs mt-1 text-foreground/60 font-display">{item.label}</span>
            </div>
          </motion.div>
        ))}

        {/* Title Overlay */}
        <div className="absolute inset-0 flex items-end justify-center pb-4">
          <h4 className="text-lg md:text-xl font-display text-foreground/80 tracking-wide">
            A Sacred Day of Learning
          </h4>
        </div>
      </motion.div>

      {/* Time Blocks Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {timeBlocks.map((block, index) => {
          const Icon = iconMap[block.icon];
          const colors = periodColors[block.period];
          
          return (
            <motion.div
              key={index}
              className={`relative p-5 rounded-xl border backdrop-blur-sm overflow-hidden group ${colors.border}`}
              style={{
                background: 'linear-gradient(135deg, hsl(var(--background) / 0.9), hsl(var(--card) / 0.7))',
              }}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.08, duration: 0.5 }}
              whileHover={{ scale: 1.02, y: -4 }}
            >
              {/* Period Gradient Overlay */}
              <div 
                className={`absolute inset-0 bg-gradient-to-br ${colors.bg} opacity-50 group-hover:opacity-100 transition-opacity duration-500`}
              />

              <div className="relative z-10">
                {/* Icon & Time */}
                <div className="flex items-center justify-between mb-3">
                  <motion.div
                    className={`p-2.5 rounded-xl bg-background/50 ${colors.text}`}
                    whileHover={{ rotate: [0, -10, 10, 0] }}
                    transition={{ duration: 0.5 }}
                  >
                    <Icon size={22} />
                  </motion.div>
                  <span className="text-sm font-medium text-foreground/60 bg-background/50 px-2 py-1 rounded-lg">
                    {block.time}
                  </span>
                </div>

                {/* Content */}
                <h5 className="text-lg font-display font-medium text-foreground mb-1">
                  {block.title}
                </h5>
                <p className="text-sm text-foreground/60 leading-relaxed">
                  {block.description}
                </p>
              </div>

              {/* Hover Glow */}
              <motion.div
                className="absolute bottom-0 left-0 right-0 h-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                style={{
                  background: 'linear-gradient(90deg, transparent, rgba(89,44,102,0.5), transparent)',
                }}
              />
            </motion.div>
          );
        })}
      </div>

      {/* Schedule Notes - Sacred Scroll Style */}
      <motion.div
        className="relative"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.6 }}
      >
        {/* Decorative Top Ornament */}
        <div className="flex justify-center mb-4">
          <motion.div
            className="flex items-center gap-3"
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.8, duration: 0.5 }}
          >
            <div className="w-12 h-px bg-gradient-to-r from-transparent to-[#592C66]/50" />
            <Sparkles size={16} className="text-[#592C66]" />
            <div className="w-12 h-px bg-gradient-to-l from-transparent to-[#592C66]/50" />
          </motion.div>
        </div>

        <div
          className="p-6 md:p-8 rounded-xl border border-[#592C66]/20 backdrop-blur-sm"
          style={{
            background: 'linear-gradient(135deg, rgba(89,44,102,0.08), rgba(216,168,151,0.05))',
          }}
        >
          <h4 className="text-xl font-display font-medium text-[#592C66] mb-5 text-center">
            Important Notes
          </h4>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {scheduleNotes.map((note, i) => (
              <motion.div
                key={i}
                className="flex items-start gap-3 p-3 rounded-lg bg-background/30 border border-[#592C66]/10"
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.8 + i * 0.1 }}
                whileHover={{ x: 4, borderColor: 'rgba(89,44,102,0.3)' }}
              >
                <motion.div
                  className="w-6 h-6 rounded-full bg-[#592C66]/20 flex items-center justify-center flex-shrink-0 mt-0.5"
                  whileHover={{ scale: 1.1, backgroundColor: 'rgba(89,44,102,0.3)' }}
                >
                  <span className="text-xs font-medium text-[#592C66]">{i + 1}</span>
                </motion.div>
                <span className="text-foreground/70 leading-relaxed">{note}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default DaySchedule;
