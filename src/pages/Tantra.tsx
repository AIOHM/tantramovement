import { Helmet } from 'react-helmet';
import Layout from '@/components/layout/Layout';
import AnimatedSection from '@/components/common/AnimatedSection';
import PrincipleCard from '@/components/tantra/PrincipleCard';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const Tantra = () => {
  return (
    <Layout>
      <Helmet>
        <title>Understand Tantra | Tantra Movement School</title>
        <meta name="description" content="Explore the ancient wisdom of Tantra - a path to unity, sacred sexuality, embodied presence, and conscious breathwork for deeper connections and spirituality." />
        <meta name="keywords" content="tantra, sacred sexuality, tantric practices, spiritual growth, tantric workshops, embodied presence" />
        <link rel="canonical" href="/tantra" />
        <meta property="og:title" content="What is Tantra? | Tantra Movement School" />
        <meta property="og:description" content="Discover the ancient wisdom of Tantra and its modern applications for relationships, intimacy, and spiritual growth." />
        <meta property="og:type" content="article" />
        <meta property="og:image" content="/lovable-uploads/5c4c3131-6a2e-4741-87fd-ea279b366103.png" />
      </Helmet>
      
      {/* Hero Section with Enhanced Gradient */}
      <div 
        className="relative h-[80vh] flex items-center overflow-hidden" 
        style={{
          backgroundImage: 'url("/lovable-uploads/5c4c3131-6a2e-4741-87fd-ea279b366103.png")',
          backgroundPosition: 'center',
          backgroundSize: 'cover',
          backgroundAttachment: 'fixed'
        }}
        aria-label="Tantra practice image"
      >
        {/* Strong gradient overlay for WCAG AA contrast compliance */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/30 to-black/10"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-chocolate/20 to-transparent"></div>
        
        <div className="section-container relative z-10">
          <AnimatedSection>
            <div className="text-center max-w-4xl mx-auto">
              <h1 
                className="text-5xl md:text-7xl font-playfair font-bold text-white mb-6 leading-tight"
                style={{ textShadow: '0 2px 10px rgba(0, 0, 0, 0.5), 0 4px 15px rgba(0, 0, 0, 0.35)' }}
              >
                What is Tantra?
              </h1>
              <p 
                className="text-xl md:text-2xl text-white font-light tracking-wide"
                style={{ textShadow: '0 2px 8px rgba(0, 0, 0, 0.5)' }}
              >
                A sacred path to unity, presence, and awakened consciousness
              </p>
            </div>
          </AnimatedSection>
        </div>
      </div>

      {/* Introduction Section with Floating Elements */}
      <section className="relative py-20 bg-gradient-to-b from-warm-sand/10 to-transparent overflow-hidden">
        {/* Floating background elements */}
        <div className="absolute top-10 left-10 w-32 h-32 bg-deep-gold/5 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-10 right-10 w-48 h-48 bg-wine-red/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
        
        <div className="section-container relative z-10">
          <div className="max-w-4xl mx-auto">
            <AnimatedSection>
              <div className="text-center mb-16">
                <h2 className="text-4xl md:text-5xl font-playfair font-bold bg-gradient-to-r from-chocolate to-wine-red bg-clip-text text-transparent mb-6">
                  Understanding the Path of Tantra
                </h2>
                <div className="w-24 h-1 bg-gradient-to-r from-deep-gold to-wine-red mx-auto rounded-full"></div>
              </div>
            </AnimatedSection>
            
            <AnimatedSection delay={200}>
              <div className="relative overflow-hidden rounded-2xl mb-16 group">
                <div 
                  className="absolute inset-0 bg-gradient-to-r from-chocolate/80 to-wine-red/60 transition-all duration-700 group-hover:from-chocolate/70 group-hover:to-wine-red/50"
                ></div>
                <div className="relative p-8 md:p-12 text-white">
                  <p className="text-lg md:text-xl leading-relaxed font-light">
                    The word <span className="font-semibold text-deep-gold">"Tantra"</span> comes from Sanskrit and means 
                    <span className="italic"> "to weave"</span> or <span className="italic">"to expand."</span> It's about weaving 
                    together all dimensions of life—physical, emotional, mental, and spiritual—and expanding our consciousness 
                    to embrace the fullness of existence.
                  </p>
                </div>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Visual Break - Sacred Space */}
      <section className="relative h-[60vh] flex items-center overflow-hidden">
        <div 
          className="absolute inset-0 parallax-bg"
          style={{
            backgroundImage: 'url("/lovable-uploads/3e211660-c8a9-47c6-9127-09bad86de8ee.png")',
            backgroundPosition: 'center',
            backgroundSize: 'cover'
          }}
        ></div>
        <div className="absolute inset-0 bg-gradient-to-t from-chocolate/60 via-chocolate/20 to-transparent"></div>
        
        <div className="section-container relative z-10">
          <AnimatedSection>
            <div className="text-center text-white max-w-3xl mx-auto">
              <h3 className="text-3xl md:text-4xl font-playfair font-light mb-4">
                Sacred Practice in Community
              </h3>
              <p className="text-lg text-white/90 font-light">
                Tantra is practiced in sacred spaces where authentic connection and vulnerability are honored
              </p>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Video Section - Sacred Teachings */}
      <section className="py-20 bg-gradient-to-b from-warm-sand/5 to-transparent relative overflow-hidden">
        {/* Floating background elements */}
        <div className="absolute top-20 right-10 w-40 h-40 bg-deep-gold/3 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 left-10 w-56 h-56 bg-wine-red/3 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '3s' }}></div>
        
        <div className="section-container relative z-10">
          <div className="max-w-5xl mx-auto">
            <AnimatedSection>
              <div className="text-center mb-12">
                <h3 className="text-3xl md:text-4xl font-playfair font-bold text-chocolate mb-6">
                  Sacred Teachings & Wisdom
                </h3>
                <p className="text-lg text-chocolate/70 max-w-2xl mx-auto mb-8">
                  Deepen your understanding through authentic tantric teachings that honor the ancient wisdom while making it accessible for modern practitioners
                </p>
                <div className="w-20 h-1 bg-gradient-to-r from-wine-red to-deep-gold mx-auto rounded-full"></div>
              </div>
            </AnimatedSection>

            <AnimatedSection delay={300}>
              <div className="relative max-w-4xl mx-auto">
                {/* Video Container with Beautiful Frame */}
                <div className="relative rounded-3xl overflow-hidden shadow-2xl backdrop-blur-sm border border-white/20 bg-gradient-to-br from-white/10 to-warm-sand/10">
                  <div className="absolute inset-0 bg-gradient-to-br from-deep-gold/5 to-wine-red/5"></div>
                  
                  {/* Video Aspect Ratio Container */}
                  <div className="relative aspect-video">
                    <iframe
                      src="https://www.youtube.com/embed/Kyvb09nLxVU"
                      title="Sacred Tantric Teachings"
                      className="absolute inset-0 w-full h-full rounded-3xl"
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                      allowFullScreen
                    ></iframe>
                  </div>
                  
                  {/* Decorative border overlay */}
                  <div className="absolute inset-0 rounded-3xl border-2 border-gradient-to-br from-deep-gold/20 to-wine-red/20 pointer-events-none"></div>
                </div>

                {/* Video Description */}
                <div className="mt-8 text-center">
                  <p className="text-chocolate/80 leading-relaxed max-w-2xl mx-auto">
                    Experience authentic tantric teachings that bridge ancient wisdom with contemporary understanding, 
                    offering practical guidance for your sacred journey of self-discovery and connection.
                  </p>
                </div>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Core Principles Section - Premium Glass-morphic Cards */}
      <section className="py-24 bg-background relative overflow-hidden">
        {/* Ambient background effects */}
        <div className="absolute inset-0">
          <div className="absolute top-20 left-10 w-80 h-80 bg-gradient-radial from-accent/10 to-transparent rounded-full blur-3xl" />
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-gradient-radial from-primary/10 to-transparent rounded-full blur-3xl" />
        </div>

        <div className="section-container relative z-10">
          <div className="max-w-6xl mx-auto">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center mb-16"
            >
              <h3 className="text-3xl md:text-5xl font-cormorant font-bold text-foreground mb-6">
                Core Principles of Tantra
              </h3>
              <p className="text-muted-foreground font-lora max-w-2xl mx-auto mb-6">
                Ancient wisdom distilled into foundational teachings for modern seekers
              </p>
              <div className="w-24 h-0.5 bg-gradient-to-r from-transparent via-accent to-transparent mx-auto" />
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10">
              <PrincipleCard
                id="unity"
                title="Unity of Opposites"
                description="Tantra recognizes the divine interplay between masculine and feminine energies (often symbolized as Shiva and Shakti) within each person and the universe."
                icon="infinity"
                index={0}
                gradientFrom="hsl(var(--accent) / 0.3)"
                gradientTo="hsl(var(--primary) / 0.2)"
              />
              <PrincipleCard
                id="sexuality"
                title="Sacred Sexuality"
                description="Rather than rejecting sexuality as a barrier to spiritual growth, Tantra honors it as a potential gateway to transcendence and deeper connection."
                icon="hearts"
                index={1}
                gradientFrom="hsl(var(--primary) / 0.3)"
                gradientTo="hsl(var(--secondary) / 0.2)"
              />
              <PrincipleCard
                id="presence"
                title="Embodied Presence"
                description="Tantra emphasizes being fully present in the body and sensory experiences as a path to expanded awareness."
                icon="chakra"
                index={2}
                gradientFrom="hsl(var(--secondary) / 0.3)"
                gradientTo="hsl(var(--accent) / 0.2)"
              />
              <PrincipleCard
                id="breath"
                title="Conscious Breath"
                description="Breath is seen as the connection between body and mind, and conscious breathing practices are central to tantric exploration."
                icon="lotus"
                index={3}
                gradientFrom="hsl(var(--accent) / 0.3)"
                gradientTo="hsl(var(--primary) / 0.2)"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Visual Break - Massage Therapy */}
      <section className="relative h-[70vh] flex items-center overflow-hidden">
        <div 
          className="absolute inset-0"
          style={{
            backgroundImage: 'url("/lovable-uploads/b1f244ef-8245-45a9-9871-9879d1bb9f25.png")',
            backgroundPosition: 'center top',
            backgroundSize: 'cover'
          }}
        ></div>
        <div className="absolute inset-0 bg-gradient-to-r from-wine-red/50 to-chocolate/30"></div>
        
        <div className="section-container relative z-10">
          <AnimatedSection>
            <div className="text-white max-w-2xl">
              <h3 className="text-2xl md:text-3xl font-playfair font-light mb-3">
                Healing Through Sacred Touch
              </h3>
              <p className="text-white/90 font-light">
                Tantric practices include sacred massage and healing touch as pathways to deeper connection and release
              </p>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Modern Applications Section */}
      <section className="py-20 bg-gradient-to-b from-warm-sand/10 to-transparent">
        <div className="section-container">
          <div className="max-w-5xl mx-auto">
            <AnimatedSection>
              <div className="text-center mb-16">
                <h3 className="text-3xl md:text-4xl font-playfair font-bold text-chocolate mb-6">
                  Modern Applications of Tantra
                </h3>
                <p className="text-lg text-chocolate/70 max-w-3xl mx-auto">
                  Today, tantric practices offer profound benefits for contemporary individuals and relationships
                </p>
                <div className="w-20 h-1 bg-gradient-to-r from-wine-red to-deep-gold mx-auto rounded-full mt-6"></div>
              </div>
            </AnimatedSection>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                'Deepening intimacy and communication in relationships',
                'Healing sexual trauma and reconnecting with your body',
                'Developing mindfulness and presence in everyday life',
                'Awakening and circulating life-force energy (prana or chi)',
                'Integrating sexuality with spirituality for a holistic life',
                'Building authentic community and sacred connections'
              ].map((benefit, index) => (
                <AnimatedSection key={index} delay={index * 100}>
                  <div className="group relative p-6 rounded-xl bg-gradient-to-br from-white/60 to-warm-sand/30 backdrop-blur-sm border border-white/30 hover:border-deep-gold/30 transition-all duration-500 hover:transform hover:scale-105">
                    <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-deep-gold/5 to-wine-red/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                    
                    <div className="relative z-10 flex items-start">
                      <div className="w-2 h-2 bg-wine-red rounded-full mt-2 mr-4 group-hover:bg-deep-gold transition-colors duration-300"></div>
                      <p className="text-chocolate/80 group-hover:text-chocolate transition-colors duration-300 leading-relaxed">
                        {benefit}
                      </p>
                    </div>
                  </div>
                </AnimatedSection>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Evening Practice Visual */}
      <section className="relative h-[60vh] flex items-center overflow-hidden">
        <div 
          className="absolute inset-0"
          style={{
            backgroundImage: 'url("/lovable-uploads/cbe68dd9-63d9-48c7-b17d-36a19d23aeae.png")',
            backgroundPosition: 'center',
            backgroundSize: 'cover'
          }}
        ></div>
        <div className="absolute inset-0 bg-gradient-to-t from-chocolate/70 via-chocolate/30 to-transparent"></div>
        
        <div className="section-container relative z-10">
          <AnimatedSection>
            <div className="text-center text-white max-w-3xl mx-auto">
              <h3 className="text-3xl md:text-4xl font-playfair font-light mb-4">
                Evening Ceremonies Under the Stars
              </h3>
              <p className="text-lg text-white/90 font-light">
                Sacred practices continue beyond the studio, connecting us with natural rhythms and celestial energies
              </p>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Beach Practice Visual */}
      <section className="relative h-[60vh] flex items-center overflow-hidden">
        <div 
          className="absolute inset-0"
          style={{
            backgroundImage: 'url("/lovable-uploads/55a41b83-cf44-4f5c-a848-20ae3dd40ae1.png")',
            backgroundPosition: 'center',
            backgroundSize: 'cover'
          }}
        ></div>
        <div className="absolute inset-0 bg-gradient-to-r from-deep-gold/40 via-transparent to-wine-red/30"></div>
        
        <div className="section-container relative z-10">
          <AnimatedSection>
            <div className="text-white max-w-3xl ml-auto text-right">
              <h3 className="text-3xl md:text-4xl font-playfair font-light mb-4">
                Connection with Nature
              </h3>
              <p className="text-lg text-white/90 font-light">
                Tantric practices flourish in natural settings, where we remember our connection to Earth and sky
              </p>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="py-20 bg-gradient-to-b from-warm-sand/20 via-transparent to-warm-sand/10">
        <div className="section-container">
          <div className="max-w-4xl mx-auto text-center">
            <AnimatedSection>
              <div className="relative p-12 rounded-3xl bg-gradient-to-br from-white/60 to-warm-sand/40 backdrop-blur-sm border border-white/30 shadow-2xl">
                <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-deep-gold/5 to-wine-red/5"></div>
                
                <div className="relative z-10">
                  <blockquote className="text-2xl md:text-3xl font-playfair italic text-chocolate mb-8 leading-relaxed">
                    "Tantra is not a technique, but a way of life. It's about embracing all that you are and all that life offers as a pathway to liberation."
                  </blockquote>
                  
                  <Link 
                    to="/workshops" 
                    className="inline-block px-8 py-4 bg-gradient-to-r from-wine-red to-deep-gold text-white font-medium rounded-full transition-all duration-300 hover:from-deep-gold hover:to-wine-red hover:scale-105 hover:shadow-xl shadow-lg"
                    aria-label="Explore our workshops"
                  >
                    Begin Your Tantric Journey
                  </Link>
                </div>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Tantra;
