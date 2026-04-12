
import Layout from '@/components/layout/Layout';
import AnimatedSection from '@/components/common/AnimatedSection';
import { Link } from 'react-router-dom';

const Massage = () => {
  return (
    <Layout>
      {/* Hero Section with Parallax */}
      <div 
        className="parallax-bg h-[60vh] flex items-center"
        style={{
          backgroundImage: 'url("/lovable-uploads/d5fe70a4-241b-426c-937b-b35a347c1904.png")',
          backgroundPosition: 'center',
        }}
      >
        {/* Replace black overlay with subtle warm gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-chocolate/20 to-transparent"></div>
        <div className="section-container relative z-10">
          <AnimatedSection>
            <h1 className="text-4xl md:text-6xl font-bold text-white text-center">
              Tantric Massage
            </h1>
          </AnimatedSection>
        </div>
      </div>

      {/* Content */}
      <section className="py-16 md:py-24 bg-warm-sand/20">
        <div className="section-container">
          <div className="max-w-3xl mx-auto">
            <AnimatedSection>
              <h2 className="text-3xl md:text-4xl font-playfair font-bold text-chocolate mb-6">
                The Sacred Art of Touch
              </h2>
            </AnimatedSection>
            
            <AnimatedSection delay={200}>
              <p className="text-chocolate/80 mb-6">
                Tantric massage is a transformative practice that goes far beyond ordinary touch. It is a sacred ritual that combines breath, conscious touch, and energy work to awaken the body's innate capacity for pleasure, healing, and spiritual connection.
              </p>
            </AnimatedSection>
            
            <AnimatedSection delay={400}>
              <p className="text-chocolate/80 mb-10">
                At Tantra Movement, we teach this ancient art in a respectful, boundary-honoring environment. Our approach emphasizes the spiritual dimensions of tantric touch while providing practical techniques that can be integrated into relationships or professional practice.
              </p>
            </AnimatedSection>
            
            <AnimatedSection delay={600}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
                <div className="glass-panel p-6 rounded-lg">
                  <h3 className="text-xl font-playfair font-medium text-chocolate mb-4">
                    Tantric Massage Course
                  </h3>
                  <p className="text-chocolate/80 mb-4">
                    Our comprehensive 3-day course teaches the fundamentals of tantric massage, including:
                  </p>
                  <ul className="space-y-2 mb-6">
                    <li className="flex items-start">
                      <span className="inline-block w-3 h-3 bg-deep-gold rounded-full mt-1.5 mr-2"></span>
                      <span className="text-chocolate/80">Sacred space creation</span>
                    </li>
                    <li className="flex items-start">
                      <span className="inline-block w-3 h-3 bg-deep-gold rounded-full mt-1.5 mr-2"></span>
                      <span className="text-chocolate/80">Energy awareness and circulation</span>
                    </li>
                    <li className="flex items-start">
                      <span className="inline-block w-3 h-3 bg-deep-gold rounded-full mt-1.5 mr-2"></span>
                      <span className="text-chocolate/80">Full-body awakening techniques</span>
                    </li>
                    <li className="flex items-start">
                      <span className="inline-block w-3 h-3 bg-deep-gold rounded-full mt-1.5 mr-2"></span>
                      <span className="text-chocolate/80">Communication and consent practices</span>
                    </li>
                  </ul>
                  <Link to="/workshops" className="tantra-button block text-center">
                    View Course Dates
                  </Link>
                </div>
                
                <div className="glass-panel p-6 rounded-lg">
                  <h3 className="text-xl font-playfair font-medium text-chocolate mb-4">
                    Private Sessions
                  </h3>
                  <p className="text-chocolate/80 mb-4">
                    For those who prefer individual guidance, we offer private coaching sessions where you can:
                  </p>
                  <ul className="space-y-2 mb-6">
                    <li className="flex items-start">
                      <span className="inline-block w-3 h-3 bg-wine-red rounded-full mt-1.5 mr-2"></span>
                      <span className="text-chocolate/80">Learn at your own pace</span>
                    </li>
                    <li className="flex items-start">
                      <span className="inline-block w-3 h-3 bg-wine-red rounded-full mt-1.5 mr-2"></span>
                      <span className="text-chocolate/80">Address specific challenges or goals</span>
                    </li>
                    <li className="flex items-start">
                      <span className="inline-block w-3 h-3 bg-wine-red rounded-full mt-1.5 mr-2"></span>
                      <span className="text-chocolate/80">Receive personalized instruction</span>
                    </li>
                    <li className="flex items-start">
                      <span className="inline-block w-3 h-3 bg-wine-red rounded-full mt-1.5 mr-2"></span>
                      <span className="text-chocolate/80">Integrate techniques into your relationship</span>
                    </li>
                  </ul>
                  <Link to="/contact" className="tantra-button block text-center">
                    Inquire About Private Sessions
                  </Link>
                </div>
              </div>
            </AnimatedSection>
            
            <AnimatedSection delay={800}>
              <h3 className="text-2xl font-playfair font-medium text-chocolate mb-4">
                Benefits of Tantric Massage
              </h3>
              <div className="glass-panel p-6 rounded-lg mb-10">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-playfair text-wine-red mb-3">Physical Benefits</h4>
                    <ul className="space-y-2">
                      <li className="flex items-start">
                        <span className="inline-block w-3 h-3 bg-deep-gold rounded-full mt-1.5 mr-2"></span>
                        <span className="text-chocolate/80">Release of physical tension</span>
                      </li>
                      <li className="flex items-start">
                        <span className="inline-block w-3 h-3 bg-deep-gold rounded-full mt-1.5 mr-2"></span>
                        <span className="text-chocolate/80">Increased body awareness</span>
                      </li>
                      <li className="flex items-start">
                        <span className="inline-block w-3 h-3 bg-deep-gold rounded-full mt-1.5 mr-2"></span>
                        <span className="text-chocolate/80">Enhanced sensory perception</span>
                      </li>
                      <li className="flex items-start">
                        <span className="inline-block w-3 h-3 bg-deep-gold rounded-full mt-1.5 mr-2"></span>
                        <span className="text-chocolate/80">Improved circulation</span>
                      </li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-playfair text-wine-red mb-3">Emotional & Spiritual Benefits</h4>
                    <ul className="space-y-2">
                      <li className="flex items-start">
                        <span className="inline-block w-3 h-3 bg-deep-gold rounded-full mt-1.5 mr-2"></span>
                        <span className="text-chocolate/80">Deeper emotional intimacy</span>
                      </li>
                      <li className="flex items-start">
                        <span className="inline-block w-3 h-3 bg-deep-gold rounded-full mt-1.5 mr-2"></span>
                        <span className="text-chocolate/80">Healing of intimacy wounds</span>
                      </li>
                      <li className="flex items-start">
                        <span className="inline-block w-3 h-3 bg-deep-gold rounded-full mt-1.5 mr-2"></span>
                        <span className="text-chocolate/80">Awakened spiritual connection</span>
                      </li>
                      <li className="flex items-start">
                        <span className="inline-block w-3 h-3 bg-deep-gold rounded-full mt-1.5 mr-2"></span>
                        <span className="text-chocolate/80">Greater presence and mindfulness</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </AnimatedSection>
            
            <AnimatedSection delay={1000}>
              <div className="text-center">
                <p className="text-chocolate/80 italic font-dancing text-2xl mb-6">
                  "Touch is not just a physical connection, but a bridge between souls. In tantric massage, we learn to touch not just with our hands, but with our hearts."
                </p>
                <div className="flex flex-col sm:flex-row justify-center gap-4">
                  <Link to="/workshops" className="tantra-button">
                    Join a Course
                  </Link>
                  <Link to="/contact" className="tantra-button bg-deep-gold hover:bg-deep-gold/90">
                    Request Private Training
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

export default Massage;
