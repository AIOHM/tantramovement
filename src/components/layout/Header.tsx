
import { Link, useLocation } from 'react-router-dom';
import { useState, useEffect, type MouseEvent } from 'react';
import { motion } from 'framer-motion';
import { Sparkles } from 'lucide-react';
import { trackClickEvent } from '@/services/analytics';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();
  const [showBadge, setShowBadge] = useState(false);
  const [badgePos, setBadgePos] = useState({ x: 0, y: 0 });
  const isApplyPage = location.pathname === '/apply';
  
  // Change header appearance on scroll
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setIsScrolled(scrollPosition > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handlePrimaryCtaClick = (event: MouseEvent<HTMLElement>) => {
    trackClickEvent(event, isApplyPage ? 'book_call_button_apply_page' : 'book_call_button');

    if (!isApplyPage) {
      return;
    }

    event.preventDefault();
    document.getElementById('booking-form')?.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    });
  };

  return (
    <header 
      className={`fixed w-full z-50 transition-all duration-500 ease-out ${
        isScrolled 
          ? 'py-2 bg-[rgba(72,31,84,0.96)] backdrop-blur-xl shadow-[0_8px_32px_rgba(0,0,0,0.18)] border-b border-white/10'
          : 'py-3 md:py-4 bg-[rgba(47,20,56,0.28)] backdrop-blur-md border-b border-white/10'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link 
            to="/" 
            className="flex items-center group"
            onClick={(e) => trackClickEvent(e, 'logo')}
          >
            <img 
              src="/lovable-uploads/95baccfc-616d-4169-be85-ebd1521150c4.png" 
              alt="Tantra Movement"
              className="h-8 md:h-10 transition-transform duration-300 group-hover:scale-105"
            />
            <span className="ml-2.5 text-xl leading-tight tracking-[0.02em] text-white strong-text-shadow sm:ml-3 sm:text-2xl md:text-3xl">
              Tantra Movement
            </span>
          </Link>
          
          {/* Apply Now Button */}
          <div className="hidden md:flex items-center">
            <Link
              to="/apply"
              className={`rounded-full px-5 py-2.5 text-sm font-semibold transition-all duration-300 lg:px-6 lg:py-3 lg:text-base ${
                isScrolled
                  ? 'bg-accent text-accent-foreground hover:bg-accent/90 shadow-lg'
                  : 'border border-white/20 bg-white/10 text-white hover:bg-white/20 backdrop-blur-sm'
              }`}
              onClick={handlePrimaryCtaClick}
              onMouseEnter={() => setShowBadge(true)}
              onMouseLeave={() => setShowBadge(false)}
              onMouseMove={(e) => setBadgePos({ x: e.clientX, y: e.clientY })}
            >
              Book Call
            </Link>
          </div>

          {/* Floating badge that follows cursor on hover (desktop only) */}
          <motion.div
            className="pointer-events-none hidden md:inline-flex items-center gap-1 whitespace-nowrap px-3 py-1 rounded-full text-[10px] font-display tracking-wider bg-accent text-accent-foreground shadow-lg"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={showBadge ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
            transition={{ type: 'spring', stiffness: 300, damping: 24 }}
            style={{ position: 'fixed', left: badgePos.x, top: badgePos.y - 12, transform: 'translate(-50%, -120%)' }}
          >
            <span className="flex items-center gap-1">
              <Sparkles className="h-3 w-3" />
              Free discovery call
            </span>
          </motion.div>
          
          {/* Apply Now Button - Mobile */}
          <Link
            to="/apply"
            className="rounded-full bg-accent px-4 py-2 text-sm font-semibold text-accent-foreground shadow-lg transition-all duration-300 hover:bg-accent/90 md:hidden"
            onClick={handlePrimaryCtaClick}
          >
            Book Call
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;
