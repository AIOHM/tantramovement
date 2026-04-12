import Layout from '@/components/layout/Layout';
import AnimatedSection from '@/components/common/AnimatedSection';
import { useEffect, useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import { Play } from 'lucide-react';

const About = () => {
  const [heroLoaded, setHeroLoaded] = useState(false);
  const heroRef = useRef<HTMLDivElement>(null);
  const quoteRef = useRef<HTMLDivElement>(null);
  const quoteInView = useInView(quoteRef, { once: true, margin: "-100px" });
  
  // Parallax scroll effect
  const { scrollY } = useScroll();
  const backgroundY = useTransform(scrollY, [0, 500], [0, 150]);
  const contentY = useTransform(scrollY, [0, 500], [0, 50]);
  const opacity = useTransform(scrollY, [0, 300], [1, 0.3]);

  useEffect(() => {
    const timer = setTimeout(() => setHeroLoaded(true), 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <Layout>
      {/* Cinematic Hero Section with Asymmetric Floating Card */}
      <div 
        ref={heroRef}
        className="relative h-[80vh] min-h-[600px] flex items-center overflow-hidden"
      >
        {/* Parallax Background Image - fades in first */}
        <motion.div 
          className="absolute inset-0 z-0"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          style={{ y: backgroundY }}
        >
          <div 
            className="absolute inset-0 scale-110"
            style={{
              backgroundImage: 'url("/lovable-uploads/ffed66e1-768b-4e6d-8ae7-9229a0f9eb5c.png")',
              backgroundPosition: 'center 30%',
              backgroundSize: 'cover',
              backgroundAttachment: 'scroll',
            }}
          />
          
          <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-background/30 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-b from-primary/15 via-transparent to-background/60" />
          <div 
            className="absolute inset-0" 
            style={{
              background: 'radial-gradient(ellipse at center, transparent 40%, rgba(0,0,0,0.35) 100%)'
            }}
          />
        </motion.div>

        {/* Content Container with Asymmetric Layout */}
        <motion.div 
          className="section-container relative z-10 w-full"
          style={{ y: contentY, opacity }}
        >
          <div className="flex justify-start md:ml-[10%] lg:ml-[15%]">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, rotate: 3 }}
              animate={heroLoaded ? { opacity: 1, scale: 1, rotate: 0 } : {}}
              transition={{ 
                duration: 0.8, 
                delay: 0.3,
                ease: [0.22, 1, 0.36, 1]
              }}
              className="relative max-w-2xl"
            >
              {/* Ambient glow behind card */}
              <div 
                className="absolute -inset-8 md:-inset-12 rounded-full opacity-40 blur-3xl"
                style={{
                  background: 'radial-gradient(circle, hsl(var(--accent) / 0.4) 0%, transparent 70%)'
                }}
              />

              {/* Glass-morphic card container */}
              <div 
                className="relative p-8 md:p-12 lg:p-16 rounded-3xl"
                style={{
                  background: 'rgba(255, 255, 255, 0.08)',
                  backdropFilter: 'blur(24px)',
                  WebkitBackdropFilter: 'blur(24px)',
                  border: '1px solid rgba(255, 255, 255, 0.15)',
                  boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25), inset 0 1px 0 rgba(255, 255, 255, 0.1)'
                }}
              >
                <h1 
                  className="text-5xl md:text-6xl lg:text-7xl font-cormorant font-bold text-white mb-6"
                  style={{
                    letterSpacing: '0.06em',
                    textShadow: '0 4px 20px rgba(0, 0, 0, 0.3)'
                  }}
                >
                  {['Our', 'Journey'].map((word, i) => (
                    <motion.span
                      key={word}
                      initial={{ opacity: 0, y: 20 }}
                      animate={heroLoaded ? { opacity: 1, y: 0 } : {}}
                      transition={{ 
                        duration: 0.5, 
                        delay: 0.5 + (i * 0.08),
                        ease: [0.4, 0, 0.2, 1]
                      }}
                      className="inline-block mr-4"
                    >
                      {word}
                    </motion.span>
                  ))}
                </h1>

                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={heroLoaded ? { opacity: 1, y: 0 } : {}}
                  transition={{ 
                    duration: 0.6, 
                    delay: 0.7,
                    ease: [0.4, 0, 0.2, 1]
                  }}
                  className="text-lg md:text-xl text-white/85 font-lora leading-relaxed mb-8"
                >
                  Discover the path of conscious connection and spiritual awakening through the ancient wisdom of Tantra
                </motion.p>

                <motion.div
                  initial={{ opacity: 0, y: 15 }}
                  animate={heroLoaded ? { opacity: 1, y: 0 } : {}}
                  transition={{ 
                    duration: 0.5, 
                    delay: 0.9,
                    ease: [0.4, 0, 0.2, 1]
                  }}
                >
                  <Link 
                    to="/teacher-course"
                    className="group inline-flex items-center px-6 py-3 rounded-lg text-white font-medium transition-all duration-300 hover:bg-white/15"
                    style={{
                      background: 'rgba(255, 255, 255, 0.1)',
                      border: '1px solid rgba(255, 255, 255, 0.25)'
                    }}
                  >
                    <span className="tracking-wide">Explore Teacher Training</span>
                    <svg 
                      className="ml-2 w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" 
                      fill="none" 
                      viewBox="0 0 24 24" 
                      stroke="currentColor"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </Link>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={heroLoaded ? { opacity: 1 } : {}}
          transition={{ delay: 1.2, duration: 0.8 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10"
        >
          <motion.div 
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="w-6 h-10 rounded-full border-2 border-white/40 flex items-start justify-center p-2"
          >
            <motion.div 
              animate={{ opacity: [1, 0.3, 1] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              className="w-1 h-2 bg-white/60 rounded-full"
            />
          </motion.div>
        </motion.div>
      </div>

      {/* Understanding the Path of Tantra - Elegant Pull Quote Section */}
      <section className="py-20 md:py-32 bg-background relative overflow-hidden">
        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-radial from-accent/20 to-transparent rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-80 h-80 bg-gradient-radial from-secondary/15 to-transparent rounded-full blur-3xl" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="md:ml-[5%] md:mr-[15%]">
            <motion.div
              ref={quoteRef}
              initial={{ opacity: 0, scale: 0.98, rotate: -1 }}
              animate={quoteInView ? { opacity: 1, scale: 1, rotate: 0 } : {}}
              transition={{ 
                duration: 0.8, 
                ease: [0.22, 1, 0.36, 1]
              }}
              className="relative"
            >
              <div 
                className="relative p-10 md:p-20 rounded-3xl overflow-hidden"
                style={{
                  background: 'linear-gradient(135deg, hsl(var(--accent) / 0.08) 0%, hsl(var(--secondary) / 0.04) 100%)',
                  backdropFilter: 'blur(20px)',
                  WebkitBackdropFilter: 'blur(20px)',
                  border: '1px solid hsl(var(--accent) / 0.15)',
                  boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.15), 0 0 0 1px rgba(255, 255, 255, 0.05) inset'
                }}
              >
                <div 
                  className="absolute top-6 left-8 text-8xl md:text-9xl font-cormorant text-accent/20 leading-none select-none"
                  aria-hidden="true"
                >
                  "
                </div>

                <motion.blockquote
                  initial={{ opacity: 0 }}
                  animate={quoteInView ? { opacity: 1 } : {}}
                  transition={{ duration: 0.6, delay: 0.3 }}
                  className="relative z-10"
                >
                  <p className="text-2xl md:text-3xl lg:text-4xl font-cormorant italic text-foreground/90 leading-relaxed mb-8">
                    Tantra is not about techniques or practices—it is about awakening to the sacred nature of all existence, 
                    discovering the divine spark that lives within every moment of authentic connection.
                  </p>
                  <footer className="flex items-center gap-4">
                    <div className="w-12 h-px bg-accent/50" />
                    <cite className="text-muted-foreground font-lora not-italic">
                      The Path of Conscious Love
                    </cite>
                  </footer>
                </motion.blockquote>

                <div 
                  className="absolute bottom-6 right-8 text-8xl md:text-9xl font-cormorant text-accent/20 leading-none select-none rotate-180"
                  aria-hidden="true"
                >
                  "
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Sacred Teachings Video Section */}
      <section className="py-16 md:py-24 bg-muted/30 relative">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-cormorant font-bold text-foreground mb-4">
                Sacred Teachings of Wisdom
              </h2>
              <p className="text-muted-foreground font-lora max-w-2xl mx-auto">
                Discover the foundations of conscious connection and sacred practice
              </p>
            </div>
          </AnimatedSection>

          <AnimatedSection delay={200}>
            <div className="relative group">
              <div className="absolute -top-4 -left-4 w-16 h-16 opacity-20">
                <svg viewBox="0 0 64 64" className="w-full h-full text-accent">
                  <circle cx="32" cy="32" r="30" fill="none" stroke="currentColor" strokeWidth="0.5" />
                  <circle cx="32" cy="32" r="20" fill="none" stroke="currentColor" strokeWidth="0.5" />
                  <circle cx="32" cy="32" r="10" fill="none" stroke="currentColor" strokeWidth="0.5" />
                </svg>
              </div>
              <div className="absolute -bottom-4 -right-4 w-16 h-16 opacity-20 rotate-45">
                <svg viewBox="0 0 64 64" className="w-full h-full text-accent">
                  <circle cx="32" cy="32" r="30" fill="none" stroke="currentColor" strokeWidth="0.5" />
                  <circle cx="32" cy="32" r="20" fill="none" stroke="currentColor" strokeWidth="0.5" />
                  <circle cx="32" cy="32" r="10" fill="none" stroke="currentColor" strokeWidth="0.5" />
                </svg>
              </div>

              <div 
                className="relative rounded-2xl overflow-hidden"
                style={{
                  boxShadow: '0 25px 60px -15px rgba(0, 0, 0, 0.2), 0 0 0 1px rgba(0, 0, 0, 0.05)'
                }}
              >
                <div className="aspect-video relative bg-gradient-to-br from-primary/90 to-primary">
                  <img 
                    src="/lovable-uploads/28212c96-0797-4367-b532-3be0aeba8155.png" 
                    alt="Tantra Movement teachings" 
                    className="w-full h-full object-cover opacity-80"
                  />
                  
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-black/20" />

                  <div className="absolute top-4 left-4 flex items-center gap-3">
                    <span className="px-3 py-1 rounded-full bg-white/20 backdrop-blur-sm text-white text-sm font-medium">
                      Inside the Movement
                    </span>
                    <span className="px-3 py-1 rounded-full bg-black/30 backdrop-blur-sm text-white text-sm">
                      12:45
                    </span>
                  </div>

                  <button 
                    className="absolute inset-0 flex items-center justify-center group/play"
                    aria-label="Play video"
                  >
                    <div 
                      className="relative w-20 h-20 md:w-24 md:h-24 rounded-full flex items-center justify-center transition-all duration-500 group-hover/play:scale-110"
                      style={{
                        background: 'linear-gradient(135deg, hsl(var(--accent)) 0%, hsl(var(--secondary)) 100%)',
                        boxShadow: '0 10px 40px -10px hsl(var(--accent) / 0.5), 0 0 0 4px rgba(255, 255, 255, 0.2)'
                      }}
                    >
                      <div className="absolute inset-0 rounded-full bg-white/20 opacity-0 group-hover/play:opacity-100 transition-opacity duration-500" />
                      <Play className="w-8 h-8 md:w-10 md:h-10 text-white ml-1 relative z-10" fill="white" />
                      <div className="absolute inset-0 rounded-full border-2 border-white/30 animate-ping" style={{ animationDuration: '2s' }} />
                    </div>
                  </button>

                  <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/70 to-transparent">
                    <h3 className="text-white font-cormorant text-xl md:text-2xl font-semibold mb-1">
                      Inside the Tantra Movement
                    </h3>
                    <p className="text-white/70 font-lora text-sm">
                      An introduction to our philosophy and practice
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* About Content */}
      <section className="py-16 md:py-24 bg-background">
        <div className="section-container">
          <div className="max-w-3xl mx-auto">
            <AnimatedSection>
              <h2 className="text-3xl md:text-4xl font-cormorant font-bold text-foreground mb-6">
                About Tantra Movement
              </h2>
            </AnimatedSection>
            
            <AnimatedSection delay={200}>
              <p className="text-muted-foreground mb-6 font-lora leading-relaxed">
                Tantra Movement was founded with a vision to bring the transformative wisdom of Tantra to modern relationships. Our school emerged from a passion for helping individuals and couples experience deeper connection, more authentic intimacy, and greater presence in their lives.
              </p>
            </AnimatedSection>
            
            <AnimatedSection delay={400}>
              <p className="text-muted-foreground mb-6 font-lora leading-relaxed">
                We believe that Tantra is not just an ancient practice but a relevant pathway to healing the disconnection so prevalent in today's fast-paced society. By combining traditional tantric teachings with contemporary understanding of psychology and human development, we've created a unique approach that resonates with people from all walks of life.
              </p>
            </AnimatedSection>
            
            <AnimatedSection delay={600}>
              <div className="glass-panel-warm p-8 rounded-2xl my-12">
                <h3 className="text-xl font-cormorant font-semibold text-foreground mb-4">
                  Our Mission
                </h3>
                <p className="text-muted-foreground italic font-lora leading-relaxed">
                  To awaken individuals to their full potential for love, presence, and conscious connection through the transformative practices of Tantra.
                </p>
              </div>
            </AnimatedSection>
            
            <AnimatedSection delay={800}>
              <h3 className="text-2xl font-cormorant font-semibold text-foreground mb-4">
                Our Approach
              </h3>
              <p className="text-muted-foreground mb-10 font-lora leading-relaxed">
                At Tantra Movement, we prioritize creating safe, inclusive spaces for exploration and growth. Our methodologies are trauma-informed, body-positive and honoring each person's unique journey. We focus on consent, boundaries, and personal empowerment as foundations for authentic tantric practice.
              </p>
            </AnimatedSection>
            
            <AnimatedSection delay={1000}>
              <h3 className="text-2xl font-cormorant font-semibold text-foreground mb-6">
                Meet Our Founder
              </h3>
              <div className="flex flex-col md:flex-row gap-8 items-center mb-10">
                <div className="md:w-1/3">
                  <div className="aspect-square rounded-full overflow-hidden ring-4 ring-accent/20 ring-offset-4 ring-offset-background">
                    <img 
                      src="/lovable-uploads/67eff247-c2bb-43a9-b696-ddef999a5244.png" 
                      alt="Michal Kali Griks - Founder" 
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" 
                    />
                  </div>
                </div>
                <div className="md:w-2/3">
                  <h4 className="text-xl font-cormorant font-semibold text-foreground mb-2">
                    Michal Kali Griks
                  </h4>
                  <p className="text-primary mb-4 font-medium">Founder of Tantra Movement</p>
                  <p className="text-muted-foreground font-lora leading-relaxed">
                    With over 14 years of Tantric practice and 8+ years teaching experience, Michal brings deep knowledge of Neo-Tantra traditions, Kundalini Yoga, and sacred sexuality. A certified Tantra Masseur and Group Trainer from the Rasayana Tantra Academy in the Netherlands, Michal has dedicated his life to sharing how Tantra can transform relationships, health, and spiritual connection.
                  </p>
                </div>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default About;
