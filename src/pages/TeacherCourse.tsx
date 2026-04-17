import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import AnimatedSection from '@/components/common/AnimatedSection';
import CourseHero from '@/components/teacher-course/CourseHero';
import WelcomeSection from '@/components/teacher-course/WelcomeSection';
import PremiumTabs from '@/components/teacher-course/PremiumTabs';
import CurriculumCard from '@/components/teacher-course/CurriculumCard';
import VideoShowcase from '@/components/teacher-course/VideoShowcase';
import CursorEnergy from '@/components/effects/CursorEnergy';
import TimelineView from '@/components/teacher-course/TimelineView';
import DaySchedule from '@/components/teacher-course/DaySchedule';
import AccordionFAQ from '@/components/teacher-course/AccordionFAQ';
import EnhancedTeacherSection from '@/components/teacher-course/EnhancedTeacherSection';
import TestimonialsSection from '@/components/teacher-course/TestimonialsSection';
import InvestmentSection from '@/components/teacher-course/InvestmentSection';
import SEO from '@/components/common/SEO';
import { ArrowRight, CheckCircle2, HeartHandshake, ShieldCheck, Sparkles, Users2, type LucideIcon } from 'lucide-react';

interface AudienceCard {
  icon: LucideIcon;
  title: string;
  description: string;
}

const TeacherCourse = () => {
  const [activeTab, setActiveTab] = useState<'content' | 'curriculum' | 'schedule' | 'teachers' | 'faq' | 'documentary'>('content');
  const tabContentRef = useRef<HTMLDivElement>(null);

  const handleTabChange = (tab: 'content' | 'curriculum' | 'schedule' | 'teachers' | 'faq' | 'documentary') => {
    setActiveTab(tab);
    setTimeout(() => {
      if (tabContentRef.current) {
        const headerOffset = 200;
        const elementPosition = tabContentRef.current.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }
    }, 100);
  };

  // Curriculum data for cards
  const curriculumTopics = [
    {
      number: 1,
      title: 'Tantric Foundations & Philosophy',
      image: '/lovable-uploads/d36b6b48-0ada-4353-85ee-29404e2b94cb.png',
      items: [
        { title: 'Understanding Energies', description: 'Learn to sense, direct and work with subtle energies' },
        { title: '5 Elements', description: 'Earth, Water, Fire, Air, Ether in Tantric practice' },
        { title: '7 Chakras', description: 'In-depth exploration of energy centers' },
        { title: 'Shamanic Tantra', description: 'Ancient wisdom integrated with modern approach' },
        { title: 'Sublimation', description: 'Transforming sexual energy into spiritual power' },
      ]
    },
    {
      number: 2,
      title: 'Sacred Sexuality & Intimacy',
      image: '/lovable-uploads/ca7c5516-f567-414b-ab54-75a73f0c4fa3.png',
      items: [
        { title: 'Sacred Sexuality', description: 'Bringing consciousness to sexual energy' },
        { title: 'Boundaries and Wheel of Consent', description: 'Creating safety in intimate practice' },
        { title: 'Neo-Tantra Massage', description: 'Including yoni and lingam massage (optional)' },
        { title: 'Heart Opening Breast Orgasm Massage', description: '(optional)' },
      ]
    },
    {
      number: 3,
      title: 'Conscious Relationships',
      image: '/lovable-uploads/3a799613-7843-4836-a87b-5a48985e41e4.png',
      items: [
        { title: 'Conscious Relationships', description: 'Creating sacred partnership' },
        { title: '5 Love Languages', description: 'Communication styles in relationships' },
        { title: 'Connection', description: 'Authentic relating practices' },
        { title: 'Love Communication', description: 'Heart-centered dialogue techniques' },
        { title: 'Shadow Work', description: 'Integrating and healing relational patterns' },
      ]
    },
    {
      number: 4,
      title: 'Embodiment Practices',
      image: '/lovable-uploads/83f17701-2a19-4b43-8679-19cf41d3ed18.png',
      items: [
        { title: 'Tantra Kriya Yoga', description: 'Shamanic tantra from the Kaula tradition' },
        { title: 'Water Tantra', description: 'Fluidity and surrender practices' },
        { title: 'Dance with Tantra', description: 'Movement as spiritual practice' },
        { title: 'Shiva Shakti Dance', description: 'Embodying divine masculine and feminine' },
      ]
    },
    {
      number: 5,
      title: 'Meditation & Mindfulness',
      image: '/lovable-uploads/b8ca5895-850f-4b2a-b2a0-d4e791441d2c.png',
      items: [
        { title: 'Meditations', description: 'Osho active meditations, guided and silent practices' },
        { title: 'Mindfulness', description: 'Present-moment awareness techniques' },
        { title: 'Heart Sharings', description: 'Authentic emotional expression in circle' },
        { title: 'Cacao Tantra Ceremony', description: 'Sacred plant medicine integration (non-psychoactive)' },
      ]
    },
    {
      number: 6,
      title: 'Learning Journey',
      image: '/lovable-uploads/67eff247-c2bb-43a9-b696-ddef999a5244.png',
      items: [
        { title: 'Theoretical Knowledge', description: "Understanding the 'why' behind each practice" },
        { title: 'Experiential Learning', description: 'Embodying the practices personally' },
        { title: 'Integration', description: 'Synthesizing all elements into your unique teaching style' },
      ]
    },
  ];

  const weeklySchedule = [
    { week: 1, title: 'Essence of Tantra', color: 'secondary', items: ['Foundations of Tantric philosophy', 'Sacred boundaries and consent practices', 'Connection techniques and energy awareness', 'Introduction to sublimation and sacred sexuality'] },
    { week: 2, title: 'Conscious Relating', color: 'primary', items: ['Relationship as spiritual practice', 'Communication skills for Tantric teachers', 'Teaching sacred sexuality safely and respectfully', 'Trauma awareness and holding space for healing'] },
    { week: 3, title: 'Energetic Tantra', color: 'secondary', items: ['Chakra system and energy cultivation', 'Kundalini awakening practices', 'Shamanic Tantra elements', 'Ritual creation and facilitation'] },
    { week: 4, title: 'Tantra Massage', color: 'primary', items: ['Full-body sacred touch techniques', 'Heart-centered massage approaches', 'De-armoring methods', 'Creating safe container for intimate work'] },
    { week: 5, title: 'Integration & Certification', color: 'secondary', items: ['Teaching methodology and practice', 'Business aspects of Tantra teaching', 'Final assessments and feedback', 'Celebration and initiation ceremony'] },
  ];

  const faqItems = [
    { q: 'Do I need prior experience with Tantra?', a: "While prior experience can be helpful, it's not required. Our teacher training is designed to accommodate all levels, from those new to Tantra to experienced practitioners looking to deepen their knowledge. What's most important is an open mind, willingness to learn, and commitment to personal growth." },
    { q: 'What are the prerequisites for joining?', a: 'We welcome participants who are at least 21 years old and committed to their personal and spiritual development. An interest in teaching or sharing Tantra with others is important, though not everyone who completes the training will necessarily become a teacher. Some join to deepen their own practice and understanding.' },
    { q: 'Is nudity or sexual contact required during the training?', a: 'No. While we explore sacred sexuality as a concept, all exercises are consent-based and clothing-optional. For massage training involving intimate areas, participants can work with models or partners if they choose, but alternatives are always provided. We maintain a safe, respectful environment where your boundaries are honored.' },
    { q: 'What certification will I receive?', a: 'Upon completion, you\'ll may receive certification as a Tantra Teacher through Tantra Movement. This includes credentials in Neo-Tantra massage techniques and Kundalini Activation Process (KAP) facilitation. While not affiliated with a specific yoga alliance, our certification is recognized by many tantric communities worldwide.' },
    { q: "What's included in the course fee?", a: 'The course fee includes all training sessions, course materials, certification, and the comprehensive 330-page manual. Accommodation and meals are not included, but we can assist with finding suitable options near the training venue on Koh Phangan.' },
    { q: 'How do I prepare for the training?', a: "Upon registration, you'll receive preparation materials including readings and practices to help you arrive ready for the immersion. We recommend maintaining a healthy lifestyle, practicing meditation if possible, and coming with an open heart and mind." },
  ];

  const idealFor: AudienceCard[] = [
    {
      icon: Users2,
      title: 'Seekers, healers, and space-holders',
      description: 'You already work with people, or feel called to, and want a deeper embodied foundation in intimacy, energy, and sacred practice.',
    },
    {
      icon: HeartHandshake,
      title: 'Those called to guide with integrity',
      description: 'You feel the pull to share this work, but you want stronger ethics, safety, and confidence before stepping into that role.',
    },
    {
      icon: Sparkles,
      title: 'People in a real life turning point',
      description: 'You want a training that transforms your relationship to love, sexuality, and purpose while opening a new path of service.',
    },
  ];

  const outcomes = [
    'A grounded framework for consent, boundaries, trauma-awareness, and safe space-holding.',
    'Embodied practices in Neo-Tantra, conscious relating, sacred sexuality, ritual, massage, energy work, and meditation.',
    'A small-group field of feedback, mentorship, and integration so you are genuinely held in the process.',
    'A clearer path for sharing this work through sessions, workshops, or your existing healing practice.',
  ];

  const courseSchema = {
    '@context': 'https://schema.org',
    '@type': 'Course',
    name: 'Tantra Teacher Course',
    description: 'A five-week, 200-hour Tantra Teacher Training in Koh Phangan, Thailand focused on Neo-Tantra, sacred sexuality, conscious relationships, energy work, and ethical facilitation.',
    provider: {
      '@type': 'Organization',
      name: 'Tantra Movement School',
      sameAs: window.location.origin,
    },
    image: `${window.location.origin}/lovable-uploads/e0746755-c7e1-4abf-b16b-3725e10dda5a.png`,
    courseMode: 'onsite',
    educationalCredentialAwarded: 'Tantra Teacher Certification',
  };

  return (
    <Layout>
      <SEO
        title="Tantra Teacher Course | 200-Hour Certification in Thailand"
        description="Join a five-week 200-hour Tantra Teacher Course in Koh Phangan, Thailand. Study Neo-Tantra, sacred sexuality, conscious relating, energy work, and ethical facilitation."
        keywords="tantra teacher training, tantra certification, neo-tantra course, tantra thailand, sacred sexuality training, koh phangan retreat"
        canonical="/teacher-course"
        image="/lovable-uploads/e0746755-c7e1-4abf-b16b-3725e10dda5a.png"
        schema={courseSchema}
      />

      {/* Cursor Energy Effect */}
      <CursorEnergy />
      
      {/* Premium Hero */}
      <CourseHero />

      {/* Content Section */}
      <section className="relative overflow-hidden bg-[#592C66]">
        <div className="absolute inset-x-0 top-0 h-72 bg-[radial-gradient(circle_at_top,rgba(216,168,151,0.24),transparent_65%)]" />
        <div className="absolute -left-24 top-[30%] h-72 w-72 rounded-full bg-[#D8A897]/10 blur-3xl" />
        <div className="absolute -right-20 bottom-16 h-80 w-80 rounded-full bg-[#2D1236]/40 blur-3xl" />

        <div className="section-container relative">
          <div className="max-w-4xl mx-auto">
            {/* Premium Welcome Section */}
            <AnimatedSection>
              <WelcomeSection />
            </AnimatedSection>

            <AnimatedSection delay={120}>
              <div className="mb-16 grid gap-6 lg:grid-cols-[1.15fr,0.85fr]">
                <div className="rounded-[2rem] border border-white/10 bg-white/5 p-6 backdrop-blur-sm md:p-8">
                  <span className="inline-flex rounded-full bg-[#D8A897]/20 px-4 py-1.5 text-xs font-display uppercase tracking-[0.22em] text-[#F2DDD4]">
                    Designed For
                  </span>
                  <h2 className="mt-5 text-3xl font-display font-bold text-white md:text-4xl">
                    A transformational training for seekers, healers, lovers, and guides who want depth, safety, and embodiment.
                  </h2>
                  <p className="mt-4 max-w-2xl text-white/80">
                    This is not a surface-level certificate. It is a sacred container for people who want to deepen their relationship with the body, love, truth, and conscious intimacy before sharing this work with others.
                  </p>

                  <div className="mt-8 grid gap-4 md:grid-cols-3">
                    {idealFor.map((item) => (
                      <div
                        key={item.title}
                        className="rounded-2xl border border-white/10 bg-[#2f1738]/40 p-5"
                      >
                        <div className="mb-4 inline-flex rounded-full bg-[#D8A897]/20 p-2 text-[#F2DDD4]">
                          <item.icon className="h-5 w-5" />
                        </div>
                        <h3 className="text-xl font-display text-white">{item.title}</h3>
                        <p className="mt-2 text-sm leading-relaxed text-white/70">{item.description}</p>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="rounded-[2rem] border border-white/10 bg-[#edd1c5]/10 p-6 backdrop-blur-sm md:p-8">
                  <span className="inline-flex rounded-full bg-white/10 px-4 py-1.5 text-xs font-display uppercase tracking-[0.22em] text-[#F2DDD4]">
                    You Leave With
                  </span>
                  <h3 className="mt-5 text-2xl font-display font-bold text-white md:text-3xl">
                    Clarity, tools, and a grounded path to guide others.
                  </h3>

                  <div className="mt-6 space-y-4">
                    {outcomes.map((item) => (
                      <div key={item} className="flex items-start gap-3 rounded-2xl border border-white/10 bg-white/5 p-4">
                        <CheckCircle2 className="mt-0.5 h-5 w-5 flex-shrink-0 text-[#D8A897]" />
                        <p className="text-sm leading-relaxed text-white/80">{item}</p>
                      </div>
                    ))}
                  </div>

                  <div className="mt-8 border-t border-white/10 pt-6">
                    <div className="flex items-start gap-3">
                      <ShieldCheck className="mt-1 h-5 w-5 text-[#D8A897]" />
                      <div>
                        <p className="font-display text-xl text-white">Not sure if you are ready yet?</p>
                        <p className="mt-2 text-sm leading-relaxed text-white/70">
                          Start with a free discovery call and receive honest guidance before you say yes to the path.
                        </p>
                        <Link
                          to="/apply"
                          className="mt-4 inline-flex min-h-[48px] items-center gap-2 rounded-full bg-[#D8A897] px-5 py-3 font-display text-sm uppercase tracking-[0.16em] text-[#2f1834] shadow-[0_16px_40px_rgba(216,168,151,0.2)] transition-all duration-300 hover:brightness-95"
                        >
                          Book Discovery Call
                          <ArrowRight className="h-4 w-4" />
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </AnimatedSection>
            
            {/* Our Approach Section */}
            <AnimatedSection delay={200}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
              >
                <h2 className="text-3xl md:text-4xl font-display font-bold text-white mb-6">
                  Our Approach to Tantra
                </h2>
                <p className="text-white/80 mb-8 text-lg leading-relaxed">
                  At Tantra Movement, we specialize in Neo-Tantra with a focus on personal transformation, ethical facilitation, and embodied practice. We believe Tantra is not about performance or spectacle, but about moving from performance to presence, from shame to celebration, and from separation into deeper union with life.
                </p>
                
                <motion.div 
                  className="mb-12 rounded-[2rem] p-8"
                  style={{ background: 'linear-gradient(135deg, rgba(255,255,255,0.08), rgba(216,168,151,0.14))', border: '1px solid rgba(255,255,255,0.12)' }}
                  whileHover={{ scale: 1.01 }}
                  transition={{ duration: 0.3 }}
                >
                  <h3 className="text-xl font-display font-medium text-white mb-6">
                    Why Choose Our Teacher Training?
                  </h3>
                  <div className="space-y-4">
                    {[
                      { title: 'Beyond Theory', desc: "To become an effective Tantra teacher, you need more than knowledge and techniques. Our program integrates therapeutic principles that prepare you to work skillfully with future students and clients." },
                      { title: 'Personal Transformation', desc: "As you step into the role of teacher, we support your own healing journey. You'll not only learn how to facilitate growth in others but experience profound transformation yourself." },
                      { title: 'Embodied Practice', desc: "We don't just share information – we guide you in fully embodying Tantric principles so you can teach from authentic experience." },
                    ].map((item, i) => (
                      <motion.div 
                        key={i}
                        className="rounded-2xl border border-white/12 p-5 transition-colors hover:border-white/20"
                        style={{ background: 'rgba(243,223,214,0.92)' }}
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: i * 0.1 }}
                        whileHover={{ x: 4 }}
                      >
                        <h4 className="mb-2 font-medium text-[#2f1834]">{item.title}</h4>
                        <p className="text-[#4e3553]">{item.desc}</p>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              </motion.div>
            </AnimatedSection>
            
            {/* Program Details */}
            <AnimatedSection delay={400} className="scroll-mt-32" >
              <div id="program-details" />
              <h2 className="text-3xl md:text-4xl font-display font-bold text-white mb-6">
                Program Details
              </h2>
              
              {/* Premium Tabs */}
              <PremiumTabs activeTab={activeTab} onTabChange={handleTabChange} />
              
              {/* Tab Content */}
              <div className="pt-8">
                <div ref={tabContentRef}></div>
                
                {/* Content Tab - Curriculum Cards */}
                {activeTab === 'content' && (
                  <motion.div 
                    className="glass-panel p-6 md:p-8 rounded-xl mb-10"
                    style={{ background: 'rgba(255,255,255,0.06)' }}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                  >
                    <h3 className="text-2xl md:text-3xl font-display font-medium text-white mb-4">
                      Complete Curriculum Overview
                    </h3>
                    <p className="text-white/70 mb-8 text-lg">
                      Our 200-hour Tantra Teacher Course offers a comprehensive exploration of Neo-Tantra traditions and practices. Below you'll find the complete range of topics covered throughout the training, organized by key learning areas.
                    </p>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {curriculumTopics.map((topic, index) => (
                        <CurriculumCard
                          key={topic.number}
                          number={topic.number}
                          title={topic.title}
                          image={topic.image}
                          items={topic.items}
                          index={index}
                        />
                      ))}
                    </div>
                  </motion.div>
                )}
                
                {/* Curriculum Tab - Week by Week Timeline */}
                {activeTab === 'curriculum' && (
                  <motion.div 
                    className="glass-panel p-6 md:p-8 rounded-xl mb-10"
                    style={{ background: 'rgba(255,255,255,0.06)' }}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                  >
                    <h3 className="text-2xl md:text-3xl font-display font-medium text-white mb-4 text-center">
                      Your 5-Week Journey
                    </h3>
                    <p className="text-white/70 mb-10 text-center max-w-2xl mx-auto">
                      Each week builds upon the last, creating a transformative path from foundations to mastery
                    </p>
                    
                    <TimelineView weeklySchedule={weeklySchedule} />
                  </motion.div>
                )}
                
                {/* Schedule Tab - Day Arc */}
                {activeTab === 'schedule' && (
                  <motion.div 
                    className="glass-panel p-6 md:p-8 rounded-xl mb-10"
                    style={{ background: 'rgba(255,255,255,0.06)' }}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                  >
                    <h3 className="text-2xl md:text-3xl font-display font-medium text-white mb-2 text-center">
                      Daily Schedule
                    </h3>
                    <p className="text-white/70 mb-8 text-center">
                      From dawn practice to evening rest, each day is thoughtfully structured
                    </p>
                    
                    <DaySchedule />
                  </motion.div>
                )}
                
                {/* Teachers Tab - Enhanced */}
                {activeTab === 'teachers' && (
                  <motion.div 
                    className="glass-panel p-6 md:p-8 rounded-xl mb-10"
                    style={{ background: 'rgba(255,255,255,0.06)' }}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                  >
                    <EnhancedTeacherSection />
                  </motion.div>
                )}
                
                {/* FAQ Tab - Accordion */}
                {activeTab === 'faq' && (
                  <motion.div 
                    className="glass-panel p-6 md:p-8 rounded-xl mb-10"
                    style={{ background: 'rgba(255,255,255,0.06)' }}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                  >
                    <h3 className="text-2xl md:text-3xl font-display font-medium text-white mb-2 text-center">
                      Frequently Asked Questions
                    </h3>
                    <p className="text-white/70 mb-8 text-center">
                      Everything you need to know about the training
                    </p>
                    
                    <AccordionFAQ faqItems={faqItems} />
                  </motion.div>
                )}
                
                {/* Documentary Tab */}
                {activeTab === 'documentary' && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                  >
                    <VideoShowcase />
                  </motion.div>
                )}
              </div>
            </AnimatedSection>

            {/* Inline CTA after curriculum */}
            <AnimatedSection delay={200}>
              <motion.div 
                className="my-12 rounded-[2rem] border border-white/10 px-6 py-8 text-center"
                style={{ background: 'linear-gradient(90deg, rgba(255,255,255,0.06), rgba(216,168,151,0.12), rgba(255,255,255,0.06))' }}
                initial={{ opacity: 0, scale: 0.98 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
              >
                <p className="mb-3 text-sm font-semibold uppercase tracking-[0.24em] text-[#F2DDD4]">
                  Next Step
                </p>
                <p className="text-white mb-3 font-display text-2xl md:text-3xl">
                  Ready to explore whether this training is the right fit?
                </p>
                <p className="mx-auto mb-5 max-w-2xl text-white/70">
                  Start with a free discovery call. You can ask about the curriculum, practical details, and whether this path matches where you are right now.
                </p>
                <Link to="/apply">
                  <motion.button
                    className="inline-flex min-h-[52px] items-center gap-2 rounded-full bg-[#D8A897] px-8 py-3 font-display text-sm uppercase tracking-[0.18em] text-[#2f1834] transition-all duration-300 hover:shadow-ceremony"
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    Book Free Call
                    <ArrowRight className="h-4 w-4" />
                  </motion.button>
                </Link>
              </motion.div>
            </AnimatedSection>

            {/* Testimonials Section */}
            <AnimatedSection delay={300}>
              <TestimonialsSection />
            </AnimatedSection>

            {/* Investment Section */}
            <AnimatedSection delay={400}>
              <InvestmentSection />
            </AnimatedSection>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default TeacherCourse;
