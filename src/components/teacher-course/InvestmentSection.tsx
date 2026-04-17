import { motion } from 'framer-motion';
import { ArrowRight, Award, Clock, Gift, Shield, Users } from 'lucide-react';
import { Link } from 'react-router-dom';

const InvestmentSection = () => {
  const included = [
    { icon: Clock, text: '200 hours comprehensive training' },
    { icon: Award, text: 'Triple certification (Teacher, Masseuse, KAP)' },
    { icon: Users, text: 'Small group (max 12 participants)' },
    { icon: Gift, text: '330-page manual & 50+ video lessons' },
    { icon: Shield, text: 'Lifetime access to community' },
  ];

  const enrollmentSteps = [
    'Book a free discovery call and bring whatever is alive in you.',
    'Receive grounded guidance on fit, logistics, accommodation, and payment.',
    'Reserve your place only if your body, heart, and timing all say yes.',
  ];

  return (
    <motion.div
      className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-[linear-gradient(160deg,rgba(24,10,29,0.96),rgba(74,34,86,0.92))] shadow-[0_28px_90px_rgba(18,7,23,0.25)]"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
    >
      <div className="absolute -right-16 -top-20 h-48 w-48 rounded-full bg-[#D8A897]/20 blur-3xl" />
      <div className="absolute -bottom-20 -left-16 h-52 w-52 rounded-full bg-[#D8A897]/10 blur-3xl" />

      <div className="relative p-8 md:p-12">
        <div className="text-center mb-10">
          <motion.span 
            className="mb-4 inline-flex rounded-full bg-[#D8A897]/20 px-4 py-1.5 text-xs font-display uppercase tracking-widest text-[#F7E8E1]"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
          >
            Limited to 12 Participants
          </motion.span>
          <h3 className="mb-3 text-3xl font-display font-bold text-white md:text-4xl">
            Investment & Enrollment
          </h3>
          <p className="mx-auto max-w-2xl text-[#ead8d0]">
            Begin with a free discovery call, feel the resonance, and reserve your place only if this path feels like a true yes in your body.
          </p>
        </div>

        <div className="mb-8 grid gap-6 md:grid-cols-2">
          <motion.div
            className="relative rounded-[1.75rem] border border-[#f3ddd5]/30 bg-[#ecd1c5] p-6 text-[#2f1834] shadow-[0_20px_65px_rgba(18,7,23,0.16)]"
            whileHover={{ scale: 1.02, boxShadow: '0 0 30px rgba(89,44,102,0.15)' }}
            transition={{ duration: 0.3 }}
          >
            <div className="absolute -top-3 left-6">
              <span className="rounded-full bg-[#592C66] px-3 py-1 text-xs font-display tracking-wider text-white">
                Supportive Price
              </span>
            </div>
            <div className="pt-4">
              <div className="space-y-3 mb-6">
                <div>
                  <span className="block text-sm uppercase tracking-widest text-[#6d455d]">Per Person</span>
                  <span className="text-4xl font-display font-bold text-[#2f1834]">2900 USD</span>
                </div>
                <div>
                  <span className="block text-sm uppercase tracking-widest text-[#6d455d]">Per Couple</span>
                  <span className="text-4xl font-display font-bold text-[#2f1834]">4700 USD</span>
                </div>
              </div>
              <p className="text-sm leading-relaxed text-[#4e3553]">
                Available for registrations completed at least six weeks before the course begins.
              </p>
            </div>
          </motion.div>

          <motion.div
            className="relative rounded-[1.75rem] border border-white/10 bg-white/5 p-6 text-white backdrop-blur-sm"
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.3 }}
          >
            <div className="absolute -top-3 left-6">
              <span className="rounded-full border border-white/10 bg-white/10 px-3 py-1 text-xs font-display tracking-wider text-[#F2DDD4]">
                Normal Price
              </span>
            </div>
            <div className="pt-4">
              <div className="space-y-3 mb-6">
                <div>
                  <span className="block text-sm uppercase tracking-widest text-white/60">Per Person</span>
                  <span className="text-4xl font-display font-bold text-white">3300 USD</span>
                </div>
                <div>
                  <span className="block text-sm uppercase tracking-widest text-white/60">Per Couple</span>
                  <span className="text-4xl font-display font-bold text-white">5600 USD</span>
                </div>
              </div>
              <p className="text-sm leading-relaxed text-white/70">
                Full price for registrations after the Early Bird period
              </p>
            </div>
          </motion.div>
        </div>

        <div className="mb-10 grid gap-6 lg:grid-cols-[1.15fr,0.85fr]">
          <div className="rounded-[1.75rem] border border-white/10 bg-white/5 p-6 backdrop-blur-sm">
            <h4 className="mb-4 text-xl font-display font-semibold uppercase tracking-widest text-[#F2DDD4]">
              Registration
            </h4>
            <p className="mb-3 text-white/80">
              Begin by booking a free discovery call or by emailing us at{' '}
              <a href="mailto:contact@tantramovement.com" className="text-[#F3DDD5] underline decoration-[#D8A897]/60 underline-offset-4">
                contact@tantramovement.com
              </a>.
              {' '}We’ll meet you with honesty, warmth, and practical guidance as you feel into whether this training is for you.
            </p>
            <p className="text-white/70">
              If you prefer to experience our approach first, you can also join one of our shorter courses before deciding on the full teacher training.
            </p>
          </div>

          <div className="rounded-[1.75rem] border border-[#f3ddd5]/30 bg-[#edd1c5] p-6 text-[#2f1834]">
            <h4 className="mb-4 text-xl font-display font-semibold uppercase tracking-widest text-[#6d455d]">
              How Enrollment Works
            </h4>
            <ol className="space-y-3">
              {enrollmentSteps.map((step, index) => (
                <li key={step} className="flex items-start gap-3">
                  <span className="mt-0.5 inline-flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full bg-[#592C66] text-xs font-semibold text-white">
                    {index + 1}
                  </span>
                  <span className="text-sm leading-relaxed text-[#4e3553]">{step}</span>
                </li>
              ))}
            </ol>
          </div>
        </div>

        <div className="mb-10">
          <h4 className="mb-4 text-center text-lg font-display font-medium text-white">
            Everything Included
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {included.map((item, index) => (
              <motion.div
                key={index}
                className="flex items-center gap-3 rounded-2xl border border-white/10 bg-[#1E0F24]/75 p-4"
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <div className="rounded-full bg-[#D8A897]/10 p-2">
                  <item.icon className="h-4 w-4 text-[#F2DDD4]" />
                </div>
                <span className="text-sm text-white/80">{item.text}</span>
              </motion.div>
            ))}
          </div>
        </div>

        <div className="text-center">
          <Link to="/apply">
            <motion.button
              className="inline-flex min-h-[52px] items-center justify-center gap-2 rounded-full bg-[#D8A897] px-10 py-4 font-display text-sm uppercase tracking-[0.18em] text-[#2f1834] transition-all duration-300 hover:brightness-95 hover:shadow-lg"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
            >
              Book Your Free Call
              <ArrowRight className="h-4 w-4" />
            </motion.button>
          </Link>
          <p className="mt-4 flex items-center justify-center gap-2 text-sm text-[#EFD8CF]">
            <Shield className="h-4 w-4" />
            100% refundable deposit within 14 days
          </p>
        </div>
      </div>
    </motion.div>
  );
};

export default InvestmentSection;
