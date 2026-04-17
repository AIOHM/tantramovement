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
            COST / CONTRIBUTION
          </h3>
          <p className="text-[#D8A897] max-w-xl mx-auto">
            Transform your life and empower others through this sacred journey
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="grid md:grid-cols-2 gap-6 mb-10">
          {/* Early Bird Supportive Price */}
          <motion.div
            className="relative p-6 rounded-xl border-2 bg-[#1B1220]/80 backdrop-blur-sm"
            style={{ borderColor: 'rgba(89,44,102,0.3)' }}
            whileHover={{ scale: 1.02, boxShadow: '0 0 30px rgba(89,44,102,0.15)' }}
            transition={{ duration: 0.3 }}
          >
            <div className="absolute -top-3 left-6">
              <span className="px-3 py-1 bg-[#D8A897]/90 text-[#141414] text-xs font-display tracking-wider rounded-full">
                Early Bird Supportive Price
              </span>
            </div>
            <div className="pt-4">
              <div className="space-y-3 mb-6">
                <div>
                  <span className="block text-sm uppercase tracking-widest text-foreground/70">Per Person</span>
                  <span className="text-4xl font-display font-bold text-[#592C66]">2900 USD</span>
                </div>
                <div>
                  <span className="block text-sm uppercase tracking-widest text-foreground/70">Per Couple</span>
                  <span className="text-4xl font-display font-bold text-[#592C66]">4700 USD</span>
                </div>
              </div>
              <p className="text-white/70 text-sm">
                registration 1,5 months before the Course
              </p>
            </div>
          </motion.div>

          {/* Normal Price */}
          <motion.div
            className="relative p-6 rounded-xl border border-white/10 bg-[#1B1220]/70 backdrop-blur-sm"
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.3 }}
          >
            <div className="absolute -top-3 left-6">
              <span className="px-3 py-1 bg-[#592C66]/10 text-[#D8A897] text-xs font-display tracking-wider rounded-full">
                Normal Price
              </span>
            </div>
            <div className="pt-4">
              <div className="space-y-3 mb-6">
                <div>
                  <span className="block text-sm uppercase tracking-widest text-foreground/70">Per Person</span>
                  <span className="text-4xl font-display font-bold text-foreground">3300 USD</span>
                </div>
                <div>
                  <span className="block text-sm uppercase tracking-widest text-foreground/70">Per Couple</span>
                  <span className="text-4xl font-display font-bold text-foreground">5600 USD</span>
                </div>
              </div>
              <p className="text-foreground/70 text-sm">
                Full price for registrations after the Early Bird period
              </p>
            </div>
          </motion.div>
        </div>

        {/* Registration Copy */}
<div className="mb-10 p-6 rounded-xl border border-white/10 bg-[#1B1220]/75 backdrop-blur-sm">
          <h4 className="text-xl font-display font-semibold text-[#D8A897] mb-4 uppercase tracking-widest">
            REGISTRATION
          </h4>
          <p className="text-white/80 mb-3">
            Book your spot directly through the booking function on our website or send us an email at <a href="mailto:contact@tantramovement.com" className="text-[#592C66] underline">contact@tantramovement.com</a>.
            If you have any questions, we’re happy to answer them in advance and even offer a free video call to support you in your decision.
          </p>
          <p className="text-white/80">
            You may also join our shorter ongoing courses before signing up to get to know us better and experience our methods firsthand.
          </p>
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
                className="flex items-center gap-3 p-3 rounded-lg bg-[#0F0B13]/70"
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <div className="p-2 rounded-full" style={{ backgroundColor: 'rgba(89,44,102,0.12)' }}>
                  <item.icon className="h-4 w-4 text-[#592C66]" />
                </div>
                <span className="text-sm text-white/80">{item.text}</span>
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
