import { motion } from 'framer-motion';
import { Check, Shield, Clock, Users, Award, Gift } from 'lucide-react';
import { Link } from 'react-router-dom';

const InvestmentSection = () => {
  const included = [
    { icon: Clock, text: '200 hours comprehensive training' },
    { icon: Award, text: 'Triple certification (Teacher, Masseuse, KAP)' },
    { icon: Users, text: 'Small group (max 12 participants)' },
    { icon: Gift, text: '330-page manual & 50+ video lessons' },
    { icon: Shield, text: 'Lifetime access to community' },
  ];

  return (
    <motion.div
      className="relative overflow-hidden rounded-2xl"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
    >
      <div className="relative p-8 md:p-12">
        {/* Header */}
        <div className="text-center mb-10">
          <motion.span 
            className="inline-block px-4 py-1.5 rounded-full text-xs font-display tracking-widest uppercase text-white mb-4"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
          >
            Limited to 12 Participants
          </motion.span>
          <h3 className="text-3xl md:text-4xl font-display font-bold text-[#D8A897] mb-3">
            Your Investment
          </h3>
          <p className="text-[#D8A897] max-w-xl mx-auto">
            Transform your life and empower others through this sacred journey
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="grid md:grid-cols-2 gap-6 mb-10">
          {/* Early Bird */}
          <motion.div
            className="relative p-6 rounded-xl border-2 border-accent/30 bg-card/50 backdrop-blur-sm"
            whileHover={{ scale: 1.02, borderColor: 'hsl(var(--accent))' }}
            transition={{ duration: 0.3 }}
          >
            <div className="absolute -top-3 left-6">
              <span className="px-3 py-1 bg-accent text-accent-foreground text-xs font-display tracking-wider rounded-full">
                EARLY BIRD
              </span>
            </div>
            <div className="pt-4">
              <div className="flex items-baseline gap-2 mb-2">
                <span className="text-4xl font-display font-bold text-primary">€3,500</span>
                <span className="text-foreground/50 line-through text-lg">€4,200</span>
              </div>
              <p className="text-foreground/70 text-sm mb-4">Save €700 when booking before January 15</p>
              <ul className="space-y-2">
                <li className="flex items-center gap-2 text-sm text-foreground/80">
                  <Check className="h-4 w-4 text-accent" />
                  <span>Full payment or 3-month plan</span>
                </li>
                <li className="flex items-center gap-2 text-sm text-foreground/80">
                  <Check className="h-4 w-4 text-accent" />
                  <span>Priority room selection</span>
                </li>
              </ul>
            </div>
          </motion.div>

          {/* Standard */}
          <motion.div
            className="relative p-6 rounded-xl border border-border/50 bg-card/30 backdrop-blur-sm"
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.3 }}
          >
            <div className="pt-4">
              <div className="flex items-baseline gap-2 mb-2">
                <span className="text-4xl font-display font-bold text-foreground">€4,200</span>
              </div>
              <p className="text-foreground/70 text-sm mb-4">Standard pricing</p>
              <ul className="space-y-2">
                <li className="flex items-center gap-2 text-sm text-foreground/80">
                  <Check className="h-4 w-4 text-secondary" />
                  <span>Flexible 6-month payment plan</span>
                </li>
                <li className="flex items-center gap-2 text-sm text-foreground/80">
                  <Check className="h-4 w-4 text-secondary" />
                  <span>All course materials included</span>
                </li>
              </ul>
            </div>
          </motion.div>
        </div>

        {/* What's Included */}
        <div className="mb-10">
          <h4 className="text-lg font-display font-medium text-[#D8A897] mb-4 text-center">
            Everything Included
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {included.map((item, index) => (
              <motion.div
                key={index}
                className="flex items-center gap-3 p-3 rounded-lg bg-background/50"
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <div className="p-2 rounded-full bg-primary/10">
                  <item.icon className="h-4 w-4 text-primary" />
                </div>
                <span className="text-sm text-foreground/80">{item.text}</span>
              </motion.div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="text-center">
          <Link to="/apply">
            <motion.button
              className="px-10 py-4 bg-[#D8A897] text-[#141414] rounded-full font-display tracking-wider text-sm uppercase hover:brightness-95 hover:shadow-lg transition-all duration-300"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
            >
              Reserve Your Spot
            </motion.button>
          </Link>
          <p className="mt-4 text-[#D8A897] text-sm flex items-center justify-center gap-2">
            <Shield className="h-4 w-4" />
            100% refundable deposit within 14 days
          </p>
        </div>
      </div>
    </motion.div>
  );
};

export default InvestmentSection;
