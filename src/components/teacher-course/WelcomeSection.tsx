import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Award, Book, Clock, GraduationCap, Heart, Users } from 'lucide-react';
import FeatureIcon from './FeatureIcon';

const WelcomeSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  const features = [
    {
      Icon: Clock,
      title: '200 guided hours',
      subtitle: 'Five weeks of ritual, learning, movement, breath, touch, and integration.',
      variant: 'gold' as const,
    },
    {
      Icon: GraduationCap,
      title: 'Teacher certification',
      subtitle: 'Leave with a grounded foundation to guide others with more integrity, clarity, and embodied confidence.',
      variant: 'gold' as const,
    },
    {
      Icon: Users,
      title: 'Small-group learning',
      subtitle: 'A maximum of 12 participants means you are seen, supported, and personally guided.',
      variant: 'gold' as const,
    },
    {
      Icon: Book,
      title: '330-page manual',
      subtitle: 'Rituals, practices, and teaching notes you can keep returning to long after the immersion ends.',
      variant: 'burgundy' as const,
    },
    {
      Icon: Heart,
      title: 'Embodied curriculum',
      subtitle: 'Sacred sexuality, conscious intimacy, energy work, ritual, meditation, and massage.',
      variant: 'burgundy' as const,
    },
    {
      Icon: Award,
      title: 'Mentorship & internship',
      subtitle: 'Support during and after the course so the path continues beyond the final week.',
      variant: 'burgundy' as const,
    },
  ];

  return (
    <motion.div
      ref={sectionRef}
      className="relative mb-16 overflow-hidden rounded-[2rem] border border-[#7b566d]/25 bg-[linear-gradient(135deg,rgba(244,224,216,0.98),rgba(227,188,176,0.9))] px-6 py-8 shadow-[0_24px_80px_rgba(29,10,36,0.16)] md:px-10 md:py-12"
      initial={{ opacity: 0, y: 30, scale: 0.98 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, type: "spring" }}
    >
      {/* Decorative top accent */}
      <div className="absolute left-1/2 top-0 h-1 w-32 -translate-x-1/2 bg-gradient-to-r from-transparent via-[#592C66] to-transparent" />
      
      {/* Subtle glow */}
      <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-[#D8A897]/40 opacity-70 blur-3xl" />
      <div className="absolute -bottom-24 -left-24 h-64 w-64 rounded-full bg-[#592C66]/10 blur-3xl" />
      
      {/* Credentials Bar */}
      <motion.div 
        className="flex flex-wrap justify-center gap-4 mb-8"
        initial={{ opacity: 0, y: 10 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ delay: 0.1 }}
      >
        <div className="flex items-center gap-2 rounded-full border border-[#592C66]/20 bg-[#592C66] px-4 py-2">
          <Award className="h-4 w-4 text-[#F7E8E1]" />
          <span className="text-sm font-display text-[#F7E8E1]">14+ Years Experience</span>
        </div>
        <div className="flex items-center gap-2 rounded-full border border-[#592C66]/20 bg-[#592C66] px-4 py-2">
          <GraduationCap className="h-4 w-4 text-[#F7E8E1]" />
          <span className="text-sm font-display text-[#F7E8E1]">500+ Graduates</span>
        </div>
        <div className="flex items-center gap-2 rounded-full border border-[#592C66]/20 bg-[#592C66] px-4 py-2">
          <Users className="h-4 w-4 text-[#F7E8E1]" />
          <span className="text-sm font-display text-[#F7E8E1]">40+ Countries</span>
        </div>
      </motion.div>
      
      <motion.h2 
        className="mb-5 text-center text-3xl font-display font-bold text-[#321835] md:text-5xl"
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ delay: 0.2 }}
      >
        Welcome to Your Tantra Teaching Journey
      </motion.h2>
      
      <motion.p 
        className="mx-auto mb-10 max-w-3xl text-center text-lg leading-relaxed text-[#4d3554]"
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : {}}
        transition={{ delay: 0.3 }}
      >
        Tantra is a path from numbness to aliveness, from shame to celebration, and from performance to presence. This training is for those who feel called to embody that path deeply before they share it with others.
      </motion.p>
      
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
        {features.map((feature, index) => (
          <motion.div
            key={index}
            className="group rounded-2xl border border-[#7b566d]/10 bg-white/60 p-5 shadow-[0_18px_55px_rgba(53,22,61,0.08)]"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.4 + index * 0.1 }}
          >
            <div className="flex items-start">
              <FeatureIcon 
                Icon={feature.Icon} 
                variant={feature.variant} 
                delay={0.5 + index * 0.1}
              />
              <div>
                <h3 className="text-xl font-medium text-[#321835] transition-colors group-hover:text-[#592C66]">
                  {feature.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-[#4d3554]">{feature.subtitle}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <motion.div
        className="mt-8 flex flex-col items-start justify-between gap-4 rounded-2xl border border-[#7b566d]/20 bg-[#fff7f3]/60 p-5 md:flex-row md:items-center"
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ delay: 0.95 }}
      >
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.22em] text-[#6b435b]">
            Start with clarity, not pressure
          </p>
          <p className="mt-2 max-w-2xl text-sm leading-relaxed text-[#4d3554] md:text-base">
            We invite serious applicants to begin with a free discovery call so you can ask honest questions, feel the resonance, and understand the next steps before enrolling.
          </p>
        </div>

        <Link to="/apply">
          <motion.span
            className="inline-flex min-h-[52px] items-center gap-2 rounded-full bg-[#592C66] px-6 py-3 font-display text-sm uppercase tracking-[0.18em] text-white shadow-[0_16px_40px_rgba(89,44,102,0.22)]"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            Book Discovery Call
            <ArrowRight className="h-4 w-4" />
          </motion.span>
        </Link>
      </motion.div>
    </motion.div>
  );
};

export default WelcomeSection;
