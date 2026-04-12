
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, Users, Heart, User } from 'lucide-react';
import { useSiteSettings } from '@/hooks/use-site-settings';

interface CardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  link: string;
  delay: number;
}

const Card = ({ icon, title, description, link, delay }: CardProps) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, delay);

    return () => clearTimeout(timer);
  }, [delay]);

  return (
    <div 
      className={`relative p-8 rounded-2xl transform transition-all duration-700 hover:translate-y-[-8px] hover:shadow-2xl group overflow-hidden ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
      }`}
      style={{
        background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.9) 0%, rgba(248, 245, 240, 0.8) 100%)',
        backdropFilter: 'blur(20px)',
        border: '1px solid rgba(255, 255, 255, 0.2)',
        boxShadow: '0 8px 32px rgba(139, 69, 19, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.5)'
      }}
    >
      {/* Soft gradient overlay */}
      <div 
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{
          background: 'linear-gradient(135deg, rgba(178, 113, 39, 0.05) 0%, rgba(139, 69, 19, 0.03) 100%)'
        }}
      />
      
      <div className="relative z-10">
        <div 
          className="w-16 h-16 rounded-2xl flex items-center justify-center mb-6 text-wine-red transition-all duration-300 group-hover:scale-110"
          style={{
            background: 'linear-gradient(135deg, rgba(178, 113, 39, 0.15) 0%, rgba(255, 255, 255, 0.3) 100%)',
            boxShadow: 'inset 0 2px 4px rgba(255, 255, 255, 0.5), 0 4px 12px rgba(178, 113, 39, 0.2)'
          }}
        >
          {icon}
        </div>
        <h3 className="text-xl font-playfair font-semibold mb-3 text-chocolate group-hover:text-wine-red transition-colors duration-300">
          {title}
        </h3>
        <p className="text-chocolate/70 mb-6 leading-relaxed">{description}</p>
        <Link 
          to={link} 
          className="inline-flex items-center font-semibold text-wine-red hover:text-deep-gold transition-all duration-300 group-hover:translate-x-1"
        >
          Learn More
          <svg className="w-4 h-4 ml-2 transition-transform duration-300 group-hover:translate-x-1" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
          </svg>
        </Link>
      </div>
    </div>
  );
};

const OverviewCards = () => {
  const { settings } = useSiteSettings();
  const sectionData = settings.landingSections[0]; // Using the first landing section
  
  return (
    <section className="py-16 md:py-24 bg-warm-sand/30">
      <div className="section-container">
        <h2 className="text-3xl md:text-4xl font-playfair text-center font-bold text-chocolate mb-12">
          {sectionData.title}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <Card 
            icon={<BookOpen size={24} />}
            title="Workshops"
            description="Group workshops introducing the fundamentals of Tantra and conscious relationships."
            link="/workshops"
            delay={100}
          />
          <Card 
            icon={<Users size={24} />}
            title="Teacher Training"
            description="Deepen your practice and learn to guide others on their tantric journey."
            link="/workshops"
            delay={300}
          />
          <Card 
            icon={<Heart size={24} />}
            title="Massage Courses"
            description="Learn the ancient art of tantric massage for healing and connection."
            link="/massage"
            delay={500}
          />
          <Card 
            icon={<User size={24} />}
            title="Private Sessions"
            description="Personalized guidance tailored to your unique needs and journey."
            link="/contact"
            delay={700}
          />
        </div>
      </div>
    </section>
  );
};

export default OverviewCards;
