
import { Link, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Sparkles } from 'lucide-react';
import { trackClickEvent } from '@/services/analytics';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();
  const [showBadge, setShowBadge] = useState(false);
  const [badgePos, setBadgePos] = useState({ x: 0, y: 0 });
  
  // Change header appearance on scroll
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setIsScrolled(scrollPosition > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header 
      className={`fixed w-full z-50 transition-all duration-500 ease-out ${
        isScrolled 
          ? 'py-2 bg-[#592C66] backdrop-blur-xl shadow-[0_8px_32px_rgba(0,0,0,0.12)] border-b border-border/10'
          : 'py-4 bg-transparent'
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
            <span className="text-white font-cormorant text-2xl md:text-3xl ml-3 tracking-wide strong-text-shadow">
              Tantra Movement
            </span>
          </Link>
          
          {/* Apply Now Button */}
          <div className="hidden md:flex items-center">
            <Link
              to="/contact"
              className={`px-6 py-3 rounded-full font-semibold transition-all duration-300 ${
                isScrolled
                  ? 'bg-accent text-accent-foreground hover:bg-accent/90 shadow-lg'
                  : 'bg-white/10 text-white hover:bg-white/20 backdrop-blur-sm border border-white/20'
              }`}
              onClick={(e) => trackClickEvent(e, 'apply_now_button')}
              onMouseEnter={() => setShowBadge(true)}
              onMouseLeave={() => setShowBadge(false)}
              onMouseMove={(e) => setBadgePos({ x: e.clientX, y: e.clientY })}
            >
              Apply Now
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
              Only 4 spots left
            </span>
          </motion.div>
          
          {/* Apply Now Button - Mobile */}
          <Link
            to="/contact"
            className="md:hidden px-6 py-3 rounded-full font-semibold bg-accent text-accent-foreground hover:bg-accent/90 transition-all duration-300 shadow-lg"
            onClick={(e) => trackClickEvent(e, 'apply_now_button_mobile')}
          >
            Apply Now
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;
