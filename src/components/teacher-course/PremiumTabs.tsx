import { motion } from 'framer-motion';
import { useRef, useEffect, useState } from 'react';

interface PremiumTabsProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

const tabs = [
  { id: 'content', label: 'Overview' },
  { id: 'curriculum', label: 'Curriculum' },
  { id: 'schedule', label: 'Schedule' },
  { id: 'teachers', label: 'Teachers' },
  { id: 'faq', label: 'FAQ' },
  { id: 'documentary', label: 'Documentary' },
];

const PremiumTabs = ({ activeTab, onTabChange }: PremiumTabsProps) => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [showLeftFade, setShowLeftFade] = useState(false);
  const [showRightFade, setShowRightFade] = useState(true);

  // Handle scroll indicators
  const handleScroll = () => {
    if (!scrollContainerRef.current) return;
    const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
    setShowLeftFade(scrollLeft > 10);
    setShowRightFade(scrollLeft < scrollWidth - clientWidth - 10);
  };

  // Scroll active tab into view on mobile
  useEffect(() => {
    if (!scrollContainerRef.current) return;
    const activeElement = scrollContainerRef.current.querySelector(`[data-tab="${activeTab}"]`);
    if (activeElement) {
      activeElement.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
    }
  }, [activeTab]);

  return (
    <div className="sticky top-16 md:top-20 z-40 py-4 md:py-5 bg-hero backdrop-blur-xl border-b border-border/30 shadow-sm -mx-4 px-4 md:mx-0 md:px-0 md:rounded-xl md:border md:border-border/20">
      <div className="relative">
        {/* Left fade indicator - mobile only */}
        <div 
          className={`absolute left-0 top-0 bottom-0 w-8 bg-gradient-to-r from-[rgba(216,168,151,0.6)] to-transparent z-10 pointer-events-none transition-opacity duration-300 md:hidden ${showLeftFade ? 'opacity-100' : 'opacity-0'}`}
        />
        
        {/* Right fade indicator - mobile only */}
        <div 
          className={`absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-l from-[rgba(216,168,151,0.6)] to-transparent z-10 pointer-events-none transition-opacity duration-300 md:hidden ${showRightFade ? 'opacity-100' : 'opacity-0'}`}
        />

        {/* Scrollable container on mobile, flex-wrap on desktop */}
        <div 
          ref={scrollContainerRef}
          onScroll={handleScroll}
          className="flex gap-2 md:gap-3 overflow-x-auto md:overflow-visible md:flex-wrap md:justify-center px-2 md:px-4 pb-2 md:pb-0 scrollbar-hide scroll-smooth snap-x snap-mandatory md:snap-none"
        >
          {tabs.map((tab) => (
            <motion.button
              key={tab.id}
              data-tab={tab.id}
              onClick={() => onTabChange(tab.id)}
              className={`relative px-4 md:px-6 py-2.5 md:py-3 rounded-full font-display text-xs md:text-sm tracking-wider whitespace-nowrap flex-shrink-0 snap-center min-h-[44px] md:min-h-0 transition-all duration-300 font-medium ${
                activeTab === tab.id
                  ? 'text-primary-foreground'
                  : 'text-foreground bg-card/60 hover:bg-card/80 border border-border/30 hover:border-border/50'
              }`}
              whileHover={{ scale: activeTab === tab.id ? 1 : 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              {activeTab === tab.id && (
                <motion.div
                  className="absolute inset-0 rounded-full"
                  style={{
                    background: 'linear-gradient(135deg, rgba(89,44,102,1), rgba(89,44,102,0.8))',
                    boxShadow: '0 4px 20px rgba(89,44,102,0.3)',
                  }}
                  layoutId="activeTab"
                  transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
                />
              )}
              
              {/* Shimmer effect on active tab */}
              {activeTab === tab.id && (
                <motion.div
                  className="absolute inset-0 rounded-full opacity-30"
                  style={{
                    background: 'linear-gradient(90deg, transparent, rgba(216,168,151,0.5), transparent)',
                  }}
                  animate={{ x: ['-100%', '100%'] }}
                  transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
                />
              )}
              
              <span className="relative z-10 font-medium">{tab.label}</span>
            </motion.button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PremiumTabs;
