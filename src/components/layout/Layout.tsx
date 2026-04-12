import { ReactNode, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import ScrollToTop from '../common/ScrollToTop';
import { trackPageView } from '@/services/analytics';
import ImageWithFallback from '../common/ImageWithFallback';

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  const location = useLocation();
  const isWorkshopsPage = location.pathname === '/workshops';
  const isContactPage = location.pathname === '/contact';
  const isTantraPage = location.pathname === '/tantra';

  // Track page views for analytics when route changes
  useEffect(() => {
    trackPageView(location.pathname);
    
    // Scroll to top on navigation
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex flex-col">
      {/* Skip to content link for keyboard accessibility */}
      <a href="#main-content" className="skip-to-content">
        Skip to main content
      </a>
      
      <Header />
      
      {isWorkshopsPage && (
        <div className="w-full h-[40vh] md:h-[50vh] relative">
          <ImageWithFallback 
            src="/lovable-uploads/290eaa26-2134-41ab-86ec-5d99c87be009.png" 
            alt="Workshop participants" 
            className="w-full h-full object-cover"
            priority={true}
          />
          <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
            <h1 className="text-4xl md:text-5xl font-playfair text-white font-bold strong-text-shadow">
              Workshops & Retreats
            </h1>
          </div>
        </div>
      )}
      
      {isContactPage && (
        <div className="w-full h-[40vh] md:h-[50vh] relative overflow-hidden">
          <div className="absolute inset-0 bg-contact-gradient">
            <div className="absolute inset-0 bg-contact-sphere-1"></div>
            <div className="absolute inset-0 bg-contact-sphere-2"></div>
            <div className="absolute inset-0 bg-contact-sphere-3"></div>
            <div className="absolute inset-0 bg-contact-sphere-4"></div>
          </div>
          <div className="absolute top-0 left-0 w-full h-full flex flex-col items-center justify-center px-4">
            <div className="w-32 h-32 mb-6 flex items-center justify-center animate-float-gentle relative z-10">
              <ImageWithFallback 
                src="/lovable-uploads/cd2df711-5bc1-409d-971a-9f826e8e97a7.png"
                alt="Lotus chat icon"
                className="w-28 h-28 object-contain"
                priority={true}
              />
            </div>
            <h1 className="text-4xl md:text-5xl font-playfair text-white font-bold strong-text-shadow mb-3 text-center animate-fade-in">
              Connect With Us
            </h1>
            <p className="text-white text-lg md:text-xl max-w-2xl text-center px-4 strong-text-shadow animate-slide-up">
              We're here to guide you on your tantric journey. Reach out with questions or to book a session.
            </p>
          </div>
        </div>
      )}
      
      {/* Add structured data for SEO when on Tantra page */}
      {isTantraPage && (
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Article",
            "headline": "What is Tantra?",
            "description": "The word 'Tantra' comes from Sanskrit and means 'to weave' or 'to expand.' Explore the ancient wisdom of Tantra.",
            "image": "/lovable-uploads/5c4c3131-6a2e-4741-87fd-ea279b366103.png",
            "author": {
              "@type": "Organization",
              "name": "Tantra Movement School"
            },
            "publisher": {
              "@type": "Organization",
              "name": "Tantra Movement School",
              "logo": {
                "@type": "ImageObject",
                "url": "/lovable-uploads/95baccfc-616d-4169-be85-ebd1521150c4.png"
              }
            },
            "mainEntityOfPage": {
              "@type": "WebPage",
              "@id": "https://tantramovementschool.com/tantra"
            }
          })}
        </script>
      )}
      
      <main id="main-content" className="flex-grow">{children}</main>
      <ScrollToTop />
      <Footer />
    </div>
  );
};

export default Layout;
