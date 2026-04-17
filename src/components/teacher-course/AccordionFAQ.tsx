import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { HelpCircle, ChevronDown, Quote } from 'lucide-react';

interface FAQItem {
  q: string;
  a: string;
}

interface AccordionFAQProps {
  faqItems: FAQItem[];
}

const AccordionFAQ: React.FC<AccordionFAQProps> = ({ faqItems }) => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleItem = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="space-y-4">
      {faqItems.map((item, index) => {
        const isOpen = openIndex === index;
        
        return (
          <motion.div
            key={index}
            className="relative"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.08, duration: 0.5 }}
          >
            {/* Card Container */}
            <motion.div
              className={`relative rounded-xl border overflow-hidden transition-all duration-500 ${
                isOpen 
                  ? 'border-[#592C66]/40 shadow-lg' 
                  : 'border-white/10 hover:border-[#592C66]/30'
              }`}
              style={{
                background: isOpen 
                  ? 'linear-gradient(135deg, rgba(255,255,255,0.95), rgba(16,10,18,0.9))'
                  : 'hsl(var(--background) / 0.6)',
              }}
              layout
            >
              {/* Active Indicator Line */}
              <motion.div
                className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-[#592C66] via-[#D8A897] to-[#592C66]"
                initial={{ scaleY: 0 }}
                animate={{ scaleY: isOpen ? 1 : 0 }}
                transition={{ duration: 0.4, ease: "easeOut" }}
                style={{ originY: 0 }}
              />

              {/* Question Header */}
              <button
                onClick={() => toggleItem(index)}
                className="w-full p-4 md:p-6 flex items-start gap-3 md:gap-4 text-left group min-h-[60px] touch-manipulation"
              >
                {/* Question Number Badge - smaller on mobile */}
                <motion.div
                  className={`flex-shrink-0 w-8 h-8 md:w-10 md:h-10 rounded-xl flex items-center justify-center transition-all duration-300 ${
                    isOpen 
                      ? 'bg-[#592C66] text-white' 
                      : 'bg-[#592C66]/15 text-[#592C66] group-hover:bg-[#592C66]/25'
                  }`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <span className="font-display font-bold text-xs md:text-sm">Q{index + 1}</span>
                </motion.div>

                {/* Question Text */}
                <div className="flex-1 pt-0.5 md:pt-1">
                  <h4 className={`text-base md:text-lg font-display font-medium transition-colors duration-300 ${
                    isOpen ? 'text-[#592C66]' : 'text-foreground group-hover:text-[#592C66]'
                  }`}>
                    {item.q}
                  </h4>
                </div>

                {/* Expand Icon - 44px touch target */}
                <motion.div
                  className={`flex-shrink-0 p-2 md:p-2 rounded-lg transition-colors duration-300 min-w-[36px] min-h-[36px] md:min-w-[40px] md:min-h-[40px] flex items-center justify-center ${
                    isOpen ? 'bg-[#592C66]/10' : 'bg-transparent group-hover:bg-[#592C66]/10'
                  }`}
                  animate={{ rotate: isOpen ? 180 : 0 }}
                  transition={{ duration: 0.3, ease: "easeOut" }}
                >
                  <ChevronDown 
                    size={18} 
                    className={`transition-colors duration-300 ${
                      isOpen ? 'text-[#592C66]' : 'text-muted-foreground'
                    }`}
                  />
                </motion.div>
              </button>

              {/* Answer Content */}
              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ 
                      height: { duration: 0.4, ease: [0.4, 0, 0.2, 1] },
                      opacity: { duration: 0.25, delay: isOpen ? 0.1 : 0 }
                    }}
                    className="overflow-hidden"
                  >
                    <div className="px-4 md:px-6 pb-5 md:pb-6 pt-1 md:pt-2">
                      {/* Decorative Quote Mark - hidden on mobile */}
                      <motion.div
                        className="mb-2 md:mb-3 ml-0 md:ml-14 hidden md:block"
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.2 }}
                      >
                        <Quote size={24} className="text-[#592C66]/30" />
                      </motion.div>

                      {/* Answer Text - no drop cap on mobile */}
                      <motion.div
                        className="ml-0 md:ml-14 relative"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.15, duration: 0.4 }}
                      >
                        <p className="text-foreground/70 leading-relaxed text-sm md:text-base">
                          <span className="hidden md:float-left md:text-4xl md:font-display md:font-medium md:text-[#592C66] md:mr-2 md:mt-1 md:leading-none">
                            {item.a.charAt(0)}
                          </span>
                          <span className="md:hidden">{item.a}</span>
                          <span className="hidden md:inline">{item.a.slice(1)}</span>
                        </p>
                      </motion.div>

                      {/* Bottom Fade Line - hidden on mobile */}
                      <motion.div
                        className="mt-3 md:mt-4 ml-0 md:ml-14 h-px bg-gradient-to-r from-[#592C66]/30 via-[#D8A897]/20 to-transparent hidden md:block"
                        initial={{ scaleX: 0, originX: 0 }}
                        animate={{ scaleX: 1 }}
                        transition={{ delay: 0.3, duration: 0.5 }}
                      />
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>

            {/* Subtle Glow Effect for Active Item */}
            {isOpen && (
              <motion.div
                className="absolute inset-0 rounded-xl pointer-events-none"
                style={{
                  boxShadow: '0 0 30px rgba(89,44,102,0.08)',
                }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              />
            )}
          </motion.div>
        );
      })}

      {/* Help Text at Bottom */}
      <motion.div
        className="flex items-center justify-center gap-2 pt-6 text-muted-foreground"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.6 }}
      >
        <HelpCircle size={16} className="text-[#592C66]" />
        <span className="text-sm">
          Have more questions? <a href="/contact" className="text-[#592C66] hover:underline">Contact us</a>
        </span>
      </motion.div>
    </div>
  );
};

export default AccordionFAQ;
