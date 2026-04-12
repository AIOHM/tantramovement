import { useState } from 'react';
import { motion } from 'framer-motion';
import { Play, Film, Users, MapPin, Sparkles } from 'lucide-react';
import KineticText from '@/components/effects/KineticText';

const VideoShowcase = () => {
  const [isPlaying, setIsPlaying] = useState(false);

  const highlights = [
    { icon: Film, text: 'Behind-the-scenes footage of training sessions' },
    { icon: Users, text: 'Interviews with participants about their experience' },
    { icon: MapPin, text: 'The beautiful tropical setting of Koh Phangan' },
    { icon: Sparkles, text: 'Highlights from ceremonies and celebration events' },
  ];

  return (
    <motion.div
      className="mb-10"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      {/* Header Section */}
      <div className="text-center mb-8">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-4"
        >
          <Film className="w-4 h-4 text-primary" />
          <span className="text-sm font-display text-primary">Documentary Film</span>
        </motion.div>
        
        <h3 className="text-2xl md:text-3xl lg:text-4xl font-display font-medium text-foreground mb-3">
          <KineticText delay={0.1} staggerChildren={0.06}>
            Inside Our Teacher Training
          </KineticText>
        </h3>
        
        <p className="text-foreground/70 max-w-2xl mx-auto text-base md:text-lg">
          Experience the transformative journey through this documentary filmed during a previous course
        </p>
      </div>
      
      {/* Video Container - Full Width Premium Design */}
      <motion.div 
        className="relative rounded-2xl overflow-hidden mb-8 group"
        style={{
          boxShadow: '0 25px 80px -20px hsl(var(--primary) / 0.25)',
        }}
        whileHover={{ scale: 1.005 }}
        transition={{ duration: 0.4 }}
      >
        {/* Decorative frame corners */}
        <div className="absolute top-0 left-0 w-20 h-20 border-t-2 border-l-2 border-accent/50 rounded-tl-2xl pointer-events-none z-20" />
        <div className="absolute top-0 right-0 w-20 h-20 border-t-2 border-r-2 border-accent/50 rounded-tr-2xl pointer-events-none z-20" />
        <div className="absolute bottom-0 left-0 w-20 h-20 border-b-2 border-l-2 border-accent/50 rounded-bl-2xl pointer-events-none z-20" />
        <div className="absolute bottom-0 right-0 w-20 h-20 border-b-2 border-r-2 border-accent/50 rounded-br-2xl pointer-events-none z-20" />
        
        {/* Glowing border effect */}
        <div className="absolute inset-0 rounded-2xl border border-white/10 pointer-events-none z-10" />
        
        {!isPlaying ? (
          <div 
            className="relative aspect-video cursor-pointer"
            onClick={() => setIsPlaying(true)}
          >
            {/* Thumbnail */}
            <img 
              src="https://img.youtube.com/vi/Kyvb09nLxVU/maxresdefault.jpg"
              alt="Documentary thumbnail - Tantra Teacher Training"
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            
            {/* Overlay gradient */}
            <div className="absolute inset-0 bg-gradient-to-t from-chocolate/70 via-chocolate/30 to-chocolate/10 group-hover:from-chocolate/60 transition-colors duration-500" />
            
            {/* Ambient glow effect */}
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700"
              style={{
                background: 'radial-gradient(circle at center, hsl(var(--primary) / 0.15) 0%, transparent 70%)',
              }}
            />
            
            {/* Purple theme overlay */}
            <div className="absolute inset-0 bg-[#592C66]/10" />
            
            {/* Play Button */}
            <motion.div
              className="absolute inset-0 flex items-center justify-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              <motion.div
                className="relative"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                {/* Outer pulse ring */}
                <motion.div
                  className="absolute inset-0 rounded-full"
                  style={{
                    background: 'linear-gradient(135deg, hsl(var(--accent)), hsl(var(--secondary)))',
                  }}
                  animate={{ 
                    scale: [1, 1.3, 1],
                    opacity: [0.5, 0, 0.5],
                  }}
                  transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
                />
                
                {/* Main button */}
                <motion.div
                  className="relative w-20 h-20 md:w-28 md:h-28 rounded-full flex items-center justify-center backdrop-blur-sm"
                  style={{
                    background: 'linear-gradient(135deg, hsl(var(--accent) / 0.9), hsl(var(--secondary) / 0.9))',
                    boxShadow: '0 0 50px hsl(var(--accent) / 0.4), inset 0 1px 0 rgba(255,255,255,0.2)',
                  }}
                  animate={{ 
                    boxShadow: [
                      '0 0 50px hsl(var(--accent) / 0.4), inset 0 1px 0 rgba(255,255,255,0.2)',
                      '0 0 70px hsl(var(--accent) / 0.6), inset 0 1px 0 rgba(255,255,255,0.2)',
                      '0 0 50px hsl(var(--accent) / 0.4), inset 0 1px 0 rgba(255,255,255,0.2)',
                    ]
                  }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  <Play className="w-8 h-8 md:w-12 md:h-12 text-foreground fill-foreground ml-1" />
                </motion.div>
              </motion.div>
            </motion.div>
            
            {/* Duration badge */}
            <motion.div 
              className="absolute bottom-4 right-4 md:bottom-6 md:right-6 px-4 py-2 rounded-full bg-foreground/90 text-background text-sm font-medium backdrop-blur-sm"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
            >
              Watch Documentary
            </motion.div>
          </div>
        ) : (
          <div className="aspect-video">
            <iframe 
              className="w-full h-full"
              src="https://www.youtube.com/embed/Kyvb09nLxVU?autoplay=1"
              title="Tantra Teacher Training Documentary"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
        )}
      </motion.div>
      
      {/* Description and Highlights - Cards Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left: Description Card */}
        <motion.div 
          className="glass-panel p-6 md:p-8 rounded-xl"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4 }}
        >
          <h4 className="text-xl font-display font-medium text-foreground mb-4">
            About This Documentary
          </h4>
          <p className="text-foreground/70 leading-relaxed">
            Witness the powerful personal breakthroughs, community building, 
            and the authentic process of becoming a tantra teacher. This film 
            captures the essence of our training—the vulnerability, the growth, 
            and the profound connections formed during this life-changing journey.
          </p>
        </motion.div>
        
        {/* Right: Highlights Card */}
        <motion.div 
          className="p-6 md:p-8 rounded-xl border border-accent/20"
          style={{
            background: 'linear-gradient(135deg, hsl(var(--muted) / 0.5), hsl(var(--background) / 0.8))',
          }}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.5 }}
        >
          <h4 className="text-xl font-display font-medium text-primary mb-4">
            What You'll See
          </h4>
          <ul className="space-y-3">
            {highlights.map((item, i) => (
              <motion.li 
                key={i}
                className="flex items-start gap-3"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.6 + i * 0.1 }}
              >
                <div className="w-8 h-8 rounded-full bg-secondary/30 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <item.icon className="w-4 h-4 text-secondary" />
                </div>
                <span className="text-foreground/70">{item.text}</span>
              </motion.li>
            ))}
          </ul>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default VideoShowcase;