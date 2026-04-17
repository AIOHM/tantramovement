import React from 'react';
import { motion } from 'framer-motion';
import { Quote, Sparkles, Heart, Star } from 'lucide-react';

interface Teacher {
  name: string;
  title: string;
  bio: string;
  quote?: string;
}

const teachers: Teacher[] = [
  {
    name: "Michal Kali Griks",
    title: "Founder of Tantra Movement",
    bio: "With over 14 years of Tantric practice and 8+ years teaching experience, Michal brings deep knowledge of Neo-Tantra traditions, Kundalini Yoga, and sacred sexuality. A certified Tantra Masseur and Group Trainer from the Rasayana Tantra Academy in the Netherlands, Michal has dedicated his life to sharing how Tantra can transform relationships, health, and spiritual connection.",
    quote: "Having experienced both the shadow and the light of sexuality, I'm committed to bringing sexuality out of shame and guilt into its rightful place of sacredness and honor.",
  },
  {
    name: "Trisha Croft",
    title: "Founder of Light of Lemuria",
    bio: "An international Clairvoyant, Medium, Healer and High Priestess, Trisha brings divine feminine wisdom to our teacher training. Her global work includes Goddess retreats, spiritual tours, and priestess initiations. Trisha's presence adds depth to our understanding of the sacred feminine aspects of Tantra.",
  },
];

const EnhancedTeacherSection: React.FC = () => {
  return (
    <div className="space-y-10">
      {/* Hero Section - Portrait-Optimized Layout */}
      <motion.div
        className="relative"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        {/* Desktop: Side by side | Mobile: Stacked */}
        <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-12">
          
          {/* Portrait Image Container */}
          <motion.div
            className="relative w-full max-w-[280px] md:max-w-[320px] lg:max-w-[360px] mx-auto lg:mx-0"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            {/* Decorative frame - outer glow */}
            <div 
              className="absolute -inset-4 rounded-3xl opacity-60"
              style={{
                background: 'linear-gradient(135deg, rgba(89,44,102,0.28), rgba(216,168,151,0.18), rgba(89,44,102,0.12))',
                filter: 'blur(20px)',
              }}
            />
            
            {/* Decorative frame - border */}
            <div className="absolute -inset-2 rounded-2xl border border-[#592C66]/30" />
            
            {/* Corner accents */}
            <div className="absolute -top-1 -left-1 w-8 h-8 border-t-2 border-l-2 border-[#592C66]/40 rounded-tl-xl" />
            <div className="absolute -top-1 -right-1 w-8 h-8 border-t-2 border-r-2 border-[#592C66]/40 rounded-tr-xl" />
            <div className="absolute -bottom-1 -left-1 w-8 h-8 border-b-2 border-l-2 border-[#592C66]/40 rounded-bl-xl" />
            <div className="absolute -bottom-1 -right-1 w-8 h-8 border-b-2 border-r-2 border-[#592C66]/40 rounded-br-xl" />

            {/* Main Image */}
            <div className="relative rounded-xl overflow-hidden group">
              {/* Breathing overlay */}
              <motion.div
                className="absolute inset-0 z-10 pointer-events-none"
                style={{
                  background: 'radial-gradient(ellipse at center, rgba(89,44,102,0.15) 0%, transparent 60%)',
                }}
                animate={{ 
                  opacity: [0.3, 0.6, 0.3],
                }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
              />

              {/* Vignette */}
              <div 
                className="absolute inset-0 z-10 pointer-events-none rounded-xl"
                style={{
                  boxShadow: 'inset 0 0 60px hsl(var(--background) / 0.4)',
                }}
              />

              <motion.img
                src="/lovable-uploads/2378a390-2e88-46f2-a762-d3ac10a4ef68.png"
                alt="Tantra Movement Teachers - Michal and Trisha"
                className="w-full h-auto object-cover rounded-xl"
                animate={{ y: [0, -5, 0] }}
                transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
              />
            </div>

            {/* Floating Sparkles */}
            {[...Array(3)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute"
                style={{
                  left: i === 0 ? '-10%' : i === 1 ? '105%' : '50%',
                  top: i === 0 ? '20%' : i === 1 ? '60%' : '-5%',
                }}
                animate={{
                  y: [0, -8, 0],
                  opacity: [0.4, 0.8, 0.4],
                  rotate: [0, 10, 0],
                }}
                transition={{ duration: 4 + i, repeat: Infinity, delay: i * 0.7 }}
              >
                <Sparkles size={14} className="text-[#592C66]/60" />
              </motion.div>
            ))}
          </motion.div>

          {/* Text Content - Right side on desktop */}
          <motion.div
            className="flex-1 text-center lg:text-left"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            {/* Badge */}
            <motion.div
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#592C66]/10 border border-[#592C66]/20 mb-6"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5 }}
            >
              <Heart className="w-4 h-4 text-[#592C66]" />
              <span className="text-sm font-display text-[#592C66]">Meet Your Teachers</span>
            </motion.div>

            <h3 className="text-3xl md:text-4xl lg:text-5xl font-display font-medium text-foreground mb-4">
              Your Guides on This Journey
            </h3>
            
            <p className="text-foreground/70 text-lg leading-relaxed max-w-xl mx-auto lg:mx-0 mb-6">
              Learn from experienced practitioners who have dedicated their lives to the path of Tantra 
              and are passionate about sharing its transformative wisdom.
            </p>

            {/* Decorative line */}
            <div className="flex items-center justify-center lg:justify-start gap-3">
              <div className="w-12 h-px bg-gradient-to-r from-[#592C66]/50 to-[#D8A897]/50" />
              <Sparkles size={12} className="text-[#592C66]/50" />
              <div className="w-12 h-px bg-gradient-to-l from-[#592C66]/50 to-[#D8A897]/50" />
            </div>
          </motion.div>
        </div>
      </motion.div>

      {/* Teacher Cards */}
      <div className="space-y-8 pt-4">
        {teachers.map((teacher, index) => (
          <motion.div
            key={teacher.name}
            className="relative"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: index * 0.15 }}
          >
            <div
              className="relative p-6 md:p-8 rounded-2xl border border-[#592C66]/20 overflow-hidden group"
              style={{
                background: 'linear-gradient(135deg, rgba(16,10,18,0.9), rgba(89,44,102,0.05))',
              }}
            >
              {/* Decorative Pattern */}
              <div
                className="absolute top-0 right-0 w-48 h-48 opacity-5 group-hover:opacity-10 transition-opacity duration-500"
                style={{
                  background: 'radial-gradient(circle, rgba(89,44,102,0.18) 1px, transparent 1px)',
                  backgroundSize: '12px 12px',
                }}
              />

              {/* Header with Name Badge */}
              <div className="flex flex-col md:flex-row md:items-center gap-4 mb-6">
                {/* Avatar/Icon */}
                <motion.div
                  className="w-14 h-14 md:w-16 md:h-16 rounded-full flex items-center justify-center border border-[#592C66]/30"
                  style={{ background: 'linear-gradient(135deg, rgba(89,44,102,0.15), rgba(216,168,151,0.12))' }}
                  whileHover={{ scale: 1.05, rotate: 5 }}
                >
                  <Heart size={24} className="text-[#592C66]" />
                </motion.div>

                <div className="flex-1">
                  <h4 className="text-xl md:text-2xl lg:text-3xl font-display font-medium text-[#592C66] mb-1">
                    {teacher.name}
                  </h4>
                  <div className="flex items-center gap-2">
                    <Star size={14} className="text-[#592C66]" />
                    <span className="text-[#592C66] font-display text-sm tracking-wide">
                      {teacher.title}
                    </span>
                  </div>
                </div>
              </div>

              {/* Bio with Drop Cap - hidden on mobile */}
              <motion.p
                className="text-foreground/70 leading-relaxed mb-6"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
              >
                <span className="hidden md:float-left md:inline text-5xl font-display font-medium text-[#592C66]/30 mr-3 mt-1 leading-none">
                  {teacher.bio.charAt(0)}
                </span>
                <span className="md:hidden">{teacher.bio}</span>
                <span className="hidden md:inline">{teacher.bio.slice(1)}</span>
              </motion.p>

              {/* Quote Section (if available) */}
              {teacher.quote && (
                <motion.div
                  className="relative mt-6 p-4 md:p-5 rounded-xl border border-[#592C66]/20"
                  style={{
                    background: 'linear-gradient(135deg, rgba(89,44,102,0.05), rgba(216,168,151,0.08))',
                  }}},{
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.4 }}
                >
                  {/* Quote Marks */}
                  <motion.div
                    className="absolute -top-3 left-4"
                    initial={{ opacity: 0, scale: 0 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.5, type: "spring" }}
                  >
                    <div className="bg-background px-2">
                      <Quote size={20} className="text-[#592C66]" />
                    </div>
                  </motion.div>

                  <p className="text-foreground/80 italic font-display text-base md:text-lg leading-relaxed pt-2">
                    "{teacher.quote}"
                  </p>

                  {/* Attribution */}
                  <div className="mt-4 flex items-center gap-2">
                    <div className="w-8 h-px bg-[#592C66]/50" />
                    <span className="text-sm text-[#592C66] font-display">
                      {teacher.name.split(' ')[0]}
                    </span>
                  </div>
                </motion.div>
              )}

              {/* Hover Glow Effect */}
              <motion.div
                className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                style={{
                  boxShadow: 'inset 0 0 40px rgba(89,44,102,0.1)',
                }}
              />
            </div>
          </motion.div>
        ))}
      </div>

      {/* Bottom Decoration */}
      <motion.div
        className="flex justify-center pt-4"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.6 }}
      >
        <div className="flex items-center gap-4">
          <div className="w-12 md:w-16 h-px bg-gradient-to-r from-transparent to-[#592C66]/50" />
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          >
            <Sparkles size={14} className="text-[#592C66]" />
          </motion.div>
          <div className="w-12 md:w-16 h-px bg-gradient-to-l from-transparent to-[#592C66]/50" />
        </div>
      </motion.div>
    </div>
  );
};

export default EnhancedTeacherSection;