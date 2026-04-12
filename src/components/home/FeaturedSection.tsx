
import { useEffect, useState, useRef } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { SiteSettings } from '@/types/SiteSettings';

const FeaturedSection = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [content, setContent] = useState({
    title: 'Transform Your Relationships Through Sacred Connection',
    content: "Tantra is more than a practice—it's a path to deeper self-awareness and more fulfilling relationships. Our approach combines ancient wisdom with modern techniques to help you:",
    quote: 'The journey of Tantra begins with self-love and expands to embrace all of life.',
    bulletPoints: [
      'Cultivate presence and mindfulness in your interactions',
      'Connect more deeply with yourself and others',
      'Explore the sacred dimensions of your sexuality',
      'Heal blocks and wounds that prevent intimacy'
    ]
  });
  const sectionRef = useRef<HTMLDivElement>(null);

  // Fetch settings from database
  useEffect(() => {
    const fetchSettings = async () => {
      try {
        // Use any to bypass the type checking since site_settings isn't in the generated types yet
        const { data, error } = await supabase
          .from('site_settings')
          .select('*')
          .single() as any;
        
        if (error) {
          if (error.code !== 'PGRST116') { // Not found is ok, we'll use defaults
            console.error('Error fetching settings:', error);
          }
          return;
        }
        
        if (data && data.settings) {
          const settings = data.settings as SiteSettings;
          if (settings.featuredSection) {
            setContent({
              title: settings.featuredSection.title,
              content: settings.featuredSection.content,
              quote: settings.featuredSection.quote,
              bulletPoints: settings.featuredSection.bulletPoints
            });
          }
        }
      } catch (error) {
        console.error('Error loading settings:', error);
      }
    };
    
    fetchSettings();
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <section 
      ref={sectionRef}
      className="py-16 md:py-24 bg-white relative overflow-hidden"
    >
      <div className="absolute inset-0 bg-gradient-to-b from-white via-warm-sand/10 to-warm-sand/30 -z-10"></div>
      <div className="absolute top-0 left-0 w-40 h-40 bg-deep-gold/10 rounded-full -translate-x-1/2 -translate-y-1/2"></div>
      <div className="absolute bottom-0 right-0 w-60 h-60 bg-wine-red/5 rounded-full translate-x-1/3 translate-y-1/3"></div>
      
      <div className="section-container relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div 
            className={`transition-all duration-1000 ${
              isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'
            }`}
          >
            <h2 className="text-3xl md:text-4xl font-playfair font-bold text-chocolate mb-6">
              {content.title}
            </h2>
            <p className="text-chocolate/80 mb-4">
              {content.content}
            </p>
            <ul className="space-y-3 mb-6">
              {content.bulletPoints.map((point, index) => (
                <li key={index} className="flex items-start">
                  <span className="inline-block w-4 h-4 bg-deep-gold rounded-full mt-1 mr-3"></span>
                  <span className="text-chocolate/80">{point}</span>
                </li>
              ))}
            </ul>
            <p className="text-chocolate/80 italic font-cormorant text-xl">
              "{content.quote}"
            </p>
          </div>
          
          <div 
            className={`relative transition-all duration-1000 ${
              isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'
            }`}
          >
            <div className="aspect-[3/4] rounded-lg overflow-hidden">
              <img 
                src="/lovable-uploads/5c4c3131-6a2e-4741-87fd-ea279b366103.png" 
                alt="Couple practicing Tantra" 
                className="w-full h-full object-cover"
              />
              
              <div className="absolute inset-x-0 bottom-0 backdrop-blur-md bg-black/60 p-5 rounded-b-lg border-t border-white/10 shadow-lg">
                <p className="text-white font-cormorant text-xl text-center shadow-sm">
                  "Tantra taught us to slow down and truly see each other."
                </p>
                <p className="text-white/90 text-sm mt-2 text-center font-medium">
                  — Maria & John, Workshop Participants
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturedSection;
