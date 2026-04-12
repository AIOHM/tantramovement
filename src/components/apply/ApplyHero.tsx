import { motion, useScroll, useTransform } from 'framer-motion';
import KineticText from '@/components/effects/KineticText';
import { Calendar, Clock, Video } from 'lucide-react';

const ApplyHero = () => {
  const { scrollY } = useScroll();
  const backgroundY = useTransform(scrollY, [0, 500], [0, 150]);
  const contentY = useTransform(scrollY, [0, 500], [0, 50]);

  return (
    <section className="relative min-h-[90vh] flex items-center overflow-hidden">
      {/* Background with parallax */}
      <motion.div 
        className="absolute inset-0 z-0"
        style={{ y: backgroundY }}
      >
        <img
          src="/lovable-uploads/e5e57460-b2b6-4cc5-9a3d-74cad54fb7b0.png"
          alt="Tantra Teacher Training"
          className="w-full h-[120%] object-cover object-center"
        />
        <div className="absolute inset-0 bg-hero" />
      </motion.div>

      {/* Content */}
      <motion.div 
        className="relative z-10 container mx-auto px-4 py-20"
        style={{ y: contentY }}
      >
        <div className="max-w-3xl md:bg-hero md:backdrop-blur-xl md:px-16 md:pt-8 md:pb-20 md:rounded-xl md:border md:border-border/10 md:text-white">
          <div className="md:-mx-4 md:-my-2 md:px-4 md:py-4">
          {/* Trust Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/20 backdrop-blur-sm border border-accent/30 mb-8"
          >
            <Video className="w-4 h-4 text-accent md:text-white" />
            <span className="text-sm font-medium text-accent md:text-white">100% Free • No Obligation • Private & Confidential</span>
          </motion.div>

          {/* Headline */}
          <h1 className="font-display text-4xl md:text-5xl lg:text-6xl text-foreground md:text-white mb-6 leading-tight">
            <KineticText delay={0.3}>Begin Your Journey</KineticText>
            <br />
            <span className="text-primary md:text-white">
              <KineticText delay={0.5}>as a Tantra Teacher</KineticText>
            </span>
          </h1>

          {/* Subheadline */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            className="text-lg md:text-xl md:text-white text-muted-foreground mb-8 max-w-2xl"
          >
            Book a free 15-minute discovery call to explore if this sacred path is right for you. 
            Ask your questions, learn about the training, and feel if this resonates with your calling.
          </motion.p>

          {/* Quick Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9 }}
            className="flex flex-wrap gap-4 mb-10"
          >
            <div className="flex items-center gap-2 text-muted-foreground md:text-white">
              <Clock className="w-5 h-5 text-primary md:text-white" />
              <span>15 Minutes</span>
            </div>
            <div className="flex items-center gap-2 text-muted-foreground md:text-white">
              <Video className="w-5 h-5 text-primary md:text-white" />
              <span>Video Call</span>
            </div>
            <div className="flex items-center gap-2 text-muted-foreground md:text-white">
              <Calendar className="w-5 h-5 text-primary md:text-white" />
              <span>Flexible Scheduling</span>
            </div>
          </motion.div>

          {/* CTA Button */}
          <motion.a
            href="#booking-form"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.1 }}
            className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-primary text-primary-foreground font-display text-lg tracking-wider hover:bg-primary/90 transition-all duration-300 shadow-lg hover:shadow-xl hover:shadow-primary/30"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            Book Your Free Call
          </motion.a>
        </div>
        </div>
      </motion.div>

      {/* Floating decorative element */}
      <motion.div
        className="absolute right-8 top-1/2 -translate-y-1/2 hidden lg:block"
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 1.3, duration: 0.8 }}
      >
        <div className="relative w-72 h-96 rounded-2xl overflow-hidden border border-white/20 shadow-2xl">
          <img
            src="/lovable-uploads/3a799613-7843-4836-a87b-5a48985e41e4.png"
            alt="Discovery Call"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-primary/40 to-transparent" />
          
          {/* Glass card overlay */}
          <div className="absolute bottom-4 left-4 right-4 p-4 rounded-xl bg-white/10 backdrop-blur-md border border-white/20">
            <p className="text-white text-sm font-medium">Personal Guidance Awaits</p>
            <p className="text-white/70 text-xs mt-1">One-on-one conversation with our team</p>
          </div>
        </div>
      </motion.div>
    </section>
  );
};

export default ApplyHero;
