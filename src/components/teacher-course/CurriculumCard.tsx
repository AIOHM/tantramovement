import { motion, AnimatePresence } from 'framer-motion';
import { useState, useRef, useEffect } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

interface CurriculumCardProps {
  number: number;
  title: string;
  image: string;
  items: { title: string; description: string }[];
  index: number;
}

const CurriculumCard = ({ number, title, image, items, index }: CurriculumCardProps) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  // Scroll card into view on mobile when expanded
  useEffect(() => {
    if (isExpanded && cardRef.current && window.innerWidth < 768) {
      setTimeout(() => {
        cardRef.current?.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      }, 100);
    }
  }, [isExpanded]);

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ delay: index * 0.1, duration: 0.6 }}
      className="relative h-64 md:h-80 lg:h-96 rounded-2xl overflow-hidden group cursor-pointer touch-manipulation"
      onClick={() => setIsExpanded(!isExpanded)}
    >
      {/* Background image with blur when expanded */}
      <motion.div
        className="absolute inset-0 will-change-transform"
        animate={{ 
          scale: isExpanded ? 1.05 : 1,
          filter: isExpanded ? 'blur(3px)' : 'blur(0px)'
        }}
        transition={{ duration: 0.4, ease: 'easeOut' }}
        style={{
          backgroundImage: `url(${image})`,
          backgroundPosition: 'center 25%',
          backgroundSize: 'cover',
        }}
      />
      
      {/* Gradient overlay - stronger when expanded */}
      <motion.div 
        className="absolute inset-0 transition-colors duration-300"
        animate={{ 
          background: isExpanded 
            ? 'linear-gradient(to top, rgba(0,0,0,0.92), rgba(0,0,0,0.7), rgba(0,0,0,0.5))' 
            : 'linear-gradient(to top, rgba(0,0,0,0.8), rgba(0,0,0,0.4), rgba(0,0,0,0.2))'
        }}
      />
      
      {/* Module number badge */}
      <motion.div
        className="absolute top-4 left-4 w-10 h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center"
        style={{
          background: 'linear-gradient(135deg, rgba(89,44,102,1), rgba(89,44,102,0.8))',
          boxShadow: '0 4px 20px rgba(89,44,102,0.3)',
        }}
      >
        <span className="text-white font-display font-bold text-sm md:text-base">
          {number}
        </span>
      </motion.div>
      
      {/* Content */}
      <div className="absolute inset-0 flex flex-col justify-end p-4 md:p-6">
        <motion.div
          className="text-white"
          initial={false}
          animate={{ y: isExpanded ? -10 : 0 }}
        >
          <h3 className="text-lg md:text-xl lg:text-2xl font-display font-bold mb-2 text-shadow-lg">
            {title}
          </h3>
          
          {/* Toggle indicator */}
          <div className="flex items-center gap-2 text-[#D8A897] text-sm font-display min-h-[44px]">
            {isExpanded ? (
              <>
                <ChevronUp className="w-4 h-4" />
                <span>Close</span>
              </>
            ) : (
              <>
                <ChevronDown className="w-4 h-4" />
                <span>View Topics ({items.length})</span>
              </>
            )}
          </div>
        </motion.div>
        
        {/* Expandable content */}
        <AnimatePresence>
          {isExpanded && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="mt-3 overflow-hidden"
            >
              {/* Scrollable container with CSS mask for smooth fade */}
              <ul 
                className="space-y-2.5 max-h-40 md:max-h-48 lg:max-h-56 overflow-y-auto scrollbar-hide px-1"
                style={{
                  maskImage: 'linear-gradient(to bottom, transparent 0%, black 12%, black 88%, transparent 100%)',
                  WebkitMaskImage: 'linear-gradient(to bottom, transparent 0%, black 12%, black 88%, transparent 100%)',
                  paddingTop: '0.75rem',
                  paddingBottom: '0.75rem',
                }}
              >
                {items.map((item, i) => (
                  <motion.li
                    key={i}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.05 }}
                    className="flex items-start gap-2.5 text-xs md:text-sm text-white/95"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-[#D8A897] mt-1.5 flex-shrink-0" />
                    <span>
                      <strong className="font-semibold">{item.title}</strong>
                      {item.description && (
                        <span className="text-white/70"> – {item.description}</span>
                      )}
                    </span>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

export default CurriculumCard;