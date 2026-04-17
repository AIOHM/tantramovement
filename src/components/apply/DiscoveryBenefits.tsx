import { motion } from 'framer-motion';
import { Target, HelpCircle, MapPin, Heart } from 'lucide-react';

const benefits = [
  {
    icon: Target,
    title: 'Personalized Guidance',
    description: 'Learn if this training aligns with your unique path and current stage of life',
  },
  {
    icon: HelpCircle,
    title: 'Get Your Questions Answered',
    description: 'Ask anything about the curriculum, schedule, requirements, or teaching approach',
  },
  {
    icon: MapPin,
    title: 'Location & Logistics',
    description: 'Detailed information about Koh Phangan, accommodations, and practical arrangements',
  },
  {
    icon: Heart,
    title: 'No Pressure',
    description: 'An open, honest conversation to help you feel into this decision—not a sales pitch',
  },
];

const DiscoveryBenefits = () => {
  return (
    <section
      className="relative py-20 bg-muted/30 overflow-hidden"
      style={{
        backgroundImage: 'url(https://www.tantramovement.com/wp-content/uploads/2023/11/WallpaperDog-5568469-scaled-cover-black-1030x644.webp)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      }}
    >
      <div className="absolute inset-0 bg-black/50" />
      <div className="relative container mx-auto px-4">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="font-display text-3xl md:text-4xl text-foreground mb-4">
            What You'll Discover
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            This call is designed to serve you. Here's what we'll explore together.
          </p>
        </motion.div>

        {/* Benefits Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {benefits.map((benefit, index) => (
            <motion.div
              key={benefit.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, type: 'spring', stiffness: 100 }}
              whileHover={{ y: -5, transition: { duration: 0.2 } }}
              className="group relative p-6 rounded-2xl bg-card/50 backdrop-blur-lg border border-border/50 hover:border-primary/30 transition-all duration-300"
            >
              {/* Glow effect */}
              <div className="absolute inset-0 rounded-2xl bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              
              {/* Icon */}
              <motion.div
                className="relative w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors duration-300"
                whileHover={{ rotate: [0, -5, 5, 0] }}
                transition={{ duration: 0.5 }}
              >
                <benefit.icon className="w-7 h-7 text-primary" />
              </motion.div>

              {/* Content */}
              <h3 className="relative font-display text-lg text-foreground mb-2">
                {benefit.title}
              </h3>
              <p className="relative text-sm text-muted-foreground leading-relaxed">
                {benefit.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default DiscoveryBenefits;
