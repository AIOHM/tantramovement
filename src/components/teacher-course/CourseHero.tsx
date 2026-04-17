import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Link } from 'react-router-dom';
import AuroraBackground from '@/components/effects/AuroraBackground';
import KineticText from '@/components/effects/KineticText';
import { ArrowRight, BookOpen, Calendar, MapPin, ShieldCheck, Users } from 'lucide-react';

const CourseHero = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.1]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;

  const proofPoints = [
    {
      icon: Users,
      title: '500+ graduates',
      description: 'A global community across 40+ countries, connected by love, truth, and embodiment.',
    },
    {
      icon: ShieldCheck,
      title: 'Ethical facilitation',
      description: 'Consent, safety, and grounded embodiment stay at the heart of every practice.',
    },
    {
      icon: BookOpen,
      title: 'Free discovery call',
      description: 'Begin with a warm, honest conversation before committing to the path.',
    },
  ];

  return (
    <div ref={containerRef} className="relative flex min-h-[760px] items-center overflow-hidden">
      {/* Parallax Background - disabled on mobile for performance */}
      <motion.div 
        className="absolute inset-0"
        style={{ 
          y: isMobile ? 0 : y, 
          scale: isMobile ? 1 : scale 
        }}
      >
        <img 
          src="/lovable-uploads/e0746755-c7e1-4abf-b16b-3725e10dda5a.png"
          alt="Tantra Teacher Training"
          className="w-full h-full object-cover"
        />
      </motion.div>
      
      {/* Multi-layer gradient overlays */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#28122f]/75 via-[#4e2759]/58 to-[#592C66]/42" />
      <div className="absolute inset-0 bg-gradient-to-t from-[#28122f]/55 via-transparent to-transparent" />
      <div className="absolute inset-0 bg-[#592C66]/20" />
      
      {/* Aurora Energy Effect */}
      <AuroraBackground />
      
      {/* Floating Decorative Elements - hidden on mobile for performance */}
      <motion.div
        className="absolute top-20 left-10 w-32 h-32 rounded-full opacity-20 hidden md:block"
        style={{
          background: 'radial-gradient(circle, rgba(216,168,151,0.35) 0%, transparent 70%)',
        }}
        animate={{
          y: [0, -20, 0],
          x: [0, 10, 0],
          scale: [1, 1.1, 1],
        }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute bottom-40 right-20 w-48 h-48 rounded-full opacity-15 hidden md:block"
        style={{
          background: 'radial-gradient(circle, rgba(89,44,102,0.35) 0%, transparent 70%)',
        }}
        animate={{
          y: [0, 15, 0],
          x: [0, -15, 0],
          scale: [1, 1.15, 1],
        }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 2 }}
      />
      
      {/* Content */}
      <motion.div 
        className="section-container relative z-10 pt-24 md:pt-32"
        style={{ opacity }}
      >
        <div className="mx-auto max-w-5xl">
          <motion.div
            className="rounded-[2rem] border border-white/20 bg-[linear-gradient(135deg,rgba(27,12,33,0.78),rgba(74,34,86,0.68),rgba(216,168,151,0.16))] px-6 py-8 shadow-[0_28px_90px_rgba(18,7,23,0.42)] backdrop-blur-md md:px-10 md:py-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <div className="mb-5 flex flex-wrap items-center justify-center gap-3 text-center">
              <span className="rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm font-medium tracking-wide text-white/90 backdrop-blur-sm">
                200-hour teacher certification
              </span>
              <span className="rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm font-medium tracking-wide text-white/90 backdrop-blur-sm">
                June 23 - July 24, 2026
              </span>
              <span className="rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm font-medium tracking-wide text-white/90 backdrop-blur-sm">
                Koh Phangan, Thailand
              </span>
            </div>

            <div className="mb-6 flex items-center justify-center gap-4">
              <div className="hidden h-px w-16 bg-gradient-to-r from-transparent to-[#D8A897] md:block" />
              <h2 className="text-center text-lg font-display font-semibold text-white md:text-2xl lg:text-3xl">
                <KineticText delay={0} staggerChildren={0.08}>
                  Tantra Teacher Certification
                </KineticText>
              </h2>
              <div className="hidden h-px w-16 bg-gradient-to-l from-transparent to-[#D8A897] md:block" />
            </div>

            <h1 className="mb-6 text-center text-4xl font-display font-bold text-primary-foreground strong-text-shadow md:text-6xl lg:text-7xl">
              <KineticText delay={0.2} staggerChildren={0.1}>
                Tantra Teacher Course
              </KineticText>
            </h1>

            <motion.p
              className="mx-auto mb-8 max-w-3xl text-center text-lg leading-relaxed text-white/80 md:text-xl"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.45 }}
            >
              A five-week immersion in Neo-Tantra, sacred sexuality, conscious intimacy, and embodied practice for those who feel called to move from performance into presence, and from healing into service.
            </motion.p>

            <motion.div
              className="mb-8 grid gap-3 md:grid-cols-3"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
            >
              {proofPoints.map((point) => (
                <div
                  key={point.title}
                  className="rounded-2xl border border-white/10 bg-white/10 p-4 text-left backdrop-blur-sm"
                >
                  <div className="mb-3 inline-flex rounded-full bg-[#D8A897]/20 p-2 text-[#F3DDD5]">
                    <point.icon className="h-5 w-5" />
                  </div>
                  <p className="font-display text-xl text-white">{point.title}</p>
                  <p className="mt-1 text-sm leading-relaxed text-white/70">{point.description}</p>
                </div>
              ))}
            </motion.div>

            <motion.div
              className="mb-8 flex flex-col justify-center gap-4 sm:flex-row"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
            >
              <Link to="/apply">
                <motion.button
                  className="inline-flex min-h-[52px] items-center justify-center gap-2 rounded-full bg-[#D8A897] px-8 py-4 font-display text-sm uppercase tracking-[0.18em] text-[#2f1834] shadow-[0_16px_40px_rgba(216,168,151,0.25)] transition-all duration-300"
                  whileHover={{ scale: 1.03, boxShadow: '0 0 40px rgba(216,168,151,0.32)' }}
                  whileTap={{ scale: 0.98 }}
                >
                  Book Free Call
                  <ArrowRight className="h-4 w-4" />
                </motion.button>
              </Link>

              <motion.a
                href="#program-details"
                className="inline-flex min-h-[52px] items-center justify-center gap-2 rounded-full border border-white/20 bg-white/10 px-8 py-4 font-display text-sm uppercase tracking-[0.18em] text-white transition-all duration-300 hover:bg-white/20"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Explore Curriculum
                <BookOpen className="h-4 w-4" />
              </motion.a>
            </motion.div>

            <motion.div
              className="grid gap-4 lg:grid-cols-[1.05fr,0.95fr]"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1 }}
            >
              <div className="rounded-[1.75rem] border border-[#f3ddd5]/30 bg-[#edd1c5]/95 p-6 text-left text-[#2f1834] shadow-[0_16px_50px_rgba(29,10,36,0.16)]">
                <p className="mb-2 text-xs font-semibold uppercase tracking-[0.24em] text-[#6d455d]">
                  Supportive pricing
                </p>
                <div className="mb-3 flex flex-wrap items-end gap-3">
                  <span className="text-lg text-[#6d455d] line-through">3300 USD</span>
                  <span className="text-4xl font-display font-bold">2900 USD</span>
                  <span className="rounded-full bg-[#592C66] px-3 py-1 text-xs uppercase tracking-[0.22em] text-white">
                    Save 400 USD
                  </span>
                </div>
                <p className="text-base leading-relaxed text-[#4e3553]">
                  Only 4 places remain for the June 23 to July 24, 2026 cohort. Couple pricing starts at 4700 USD.
                </p>
              </div>

              <div className="rounded-[1.75rem] border border-white/20 bg-white/10 p-6 text-left text-white backdrop-blur-sm">
                <div className="flex items-start gap-3">
                  <Calendar className="mt-1 h-5 w-5 text-[#D8A897]" />
                  <div>
                    <p className="font-display text-xl">Five immersive weeks</p>
                    <p className="text-sm leading-relaxed text-white/70">
                      Train in person from June 23 to July 24, 2026 with daily embodied practice, study, and integration.
                    </p>
                  </div>
                </div>

                <div className="mt-5 flex items-start gap-3">
                  <MapPin className="mt-1 h-5 w-5 text-[#D8A897]" />
                  <div>
                    <p className="font-display text-xl">Koh Phangan, Thailand</p>
                    <p className="text-sm leading-relaxed text-white/70">
                      A sacred island setting for deep practice, meaningful connection, and space to hear yourself more clearly.
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </motion.div>
      
      {/* Scroll Indicator */}
      <motion.div 
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
      >
        <motion.div
          className="w-6 h-10 rounded-full border-2 border-white/40 flex justify-center pt-2"
          animate={{ y: [0, 4, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <motion.div
            className="w-1.5 h-3 rounded-full bg-[#D8A897]"
            animate={{ y: [0, 8, 0], opacity: [1, 0.3, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
        </motion.div>
        <span className="text-primary-foreground/60 text-sm font-display tracking-wider">Scroll</span>
      </motion.div>
    </div>
  );
};

export default CourseHero;
