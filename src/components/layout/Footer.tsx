import { Link } from 'react-router-dom';
import { Mail, Phone, Instagram, Facebook, Youtube, Heart, Settings } from 'lucide-react';
import { motion } from 'framer-motion';
import { useSiteSettings } from '@/hooks/use-site-settings';

const MagneticIcon = ({ children, href }: { children: React.ReactNode; href: string }) => {
  return (
    <motion.a
      href={href}
      target="_blank"
      rel="noreferrer"
      className="w-10 h-10 rounded-full bg-[#D8A897]/20 flex items-center justify-center text-[#592C66] hover:bg-[#D8A897] hover:text-[#12050f] transition-colors"
      whileHover={{ scale: 1.15, rotate: 5 }}
      whileTap={{ scale: 0.95 }}
    >
      {children}
    </motion.a>
  );
};

const Footer = () => {
  const { settings, loading } = useSiteSettings();
  const { contactInfo } = settings;

  const linkVariants = {
    initial: { x: 0 },
    hover: { x: 4 },
  };

  return (
    <footer className="relative overflow-hidden">
      {/* Animated gradient background */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(216,168,151,0.16),_transparent_32%),radial-gradient(circle_at_bottom_right,_rgba(89,44,102,0.18),_transparent_28%)]" />
      
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-[#D8A897]/40 to-transparent" />
      
      <div className="relative bg-[#12050f] bg-[linear-gradient(180deg,rgba(89,44,102,0.92),rgba(18,5,15,0.98))] border-t border-[#592C66]/30 pt-16 pb-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {/* About Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h3 className="text-2xl font-display text-white mb-4">Tantra Movement</h3>
              <p className="text-[#D8A897]/80 mb-6 font-body leading-relaxed max-w-md">
                Awakening love, presence, and energy through the ancient wisdom of Tantra.
              </p>
              <div className="flex items-center gap-3">
                <MagneticIcon href="https://www.youtube.com/@TantraMovement">
                  <Youtube size={18} />
                </MagneticIcon>
                <MagneticIcon href="https://www.instagram.com/tantramovementlove/">
                  <Instagram size={18} />
                </MagneticIcon>
                <MagneticIcon href="https://www.facebook.com/tantramovement/">
                  <Facebook size={18} />
                </MagneticIcon>
              </div>
            </motion.div>

            {/* Quick Links */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <h3 className="text-xl font-display text-foreground mb-4">Quick Links</h3>
              <ul className="space-y-3">
                {[
                  { to: '/about', label: 'About Us' },
                  { to: '/tantra', label: 'What is Tantra?' },
                  { to: '/workshops', label: 'Workshops & Retreats' },
                  { to: '/massage', label: 'Tantric Massage' },
                ].map((link) => (
                  <motion.li
                    key={link.to}
                    initial="initial"
                    whileHover="hover"
                  >
                    <Link 
                      to={link.to} 
                      className="text-muted-foreground hover:text-primary transition-colors inline-flex items-center group"
                    >
                      <motion.span
                        variants={linkVariants}
                        className="flex items-center"
                      >
                        <span className="w-0 group-hover:w-2 h-px bg-primary mr-0 group-hover:mr-2 transition-all duration-300" />
                        {link.label}
                      </motion.span>
                    </Link>
                  </motion.li>
                ))}
              </ul>
            </motion.div>

            {/* Contact Info */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <h3 className="text-xl font-display text-foreground mb-4">Get in Touch</h3>
              <div className="space-y-4">
                <motion.a
                  href="mailto:contact@tantramovement.com"
                  className="flex items-center text-[#D8A897]/90 hover:text-white transition-colors group"
                  whileHover={{ x: 4 }}
                >
                  <div className="w-8 h-8 rounded-full bg-[#D8A897]/15 flex items-center justify-center mr-3 group-hover:bg-[#D8A897]/30 group-hover:text-[#12050f] transition-colors">
                    <Mail size={14} />
                  </div>
                  contact@tantramovement.com
                </motion.a>
                <motion.a
                  href="tel:+66804936849"
                  className="flex items-center text-[#D8A897]/90 hover:text-white transition-colors group"
                  whileHover={{ x: 4 }}
                >
                  <div className="w-8 h-8 rounded-full bg-[#D8A897]/15 flex items-center justify-center mr-3 group-hover:bg-[#D8A897]/30 group-hover:text-[#12050f] transition-colors">
                    <Phone size={14} />
                  </div>
                  +66 80 493 6849
                </motion.a>
              </div>

              <motion.div 
                className="mt-6"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Link to="/contact" className="tantra-button">
                  Contact Us
                </Link>
              </motion.div>
            </motion.div>
          </div>

          <motion.div 
            className="border-t border-border/50 mt-12 pt-6 text-center"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <p className="text-muted-foreground text-sm flex items-center justify-center gap-1">
              Made with 
              <motion.span
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                <Heart size={14} className="text-primary fill-primary" />
              </motion.span>
              by Tantra Movement © {new Date().getFullYear()}
              <Link to="/admin" className="ml-2 text-muted-foreground/30 hover:text-muted-foreground/60 transition-colors">
                <Settings size={14} />
              </Link>
            </p>
          </motion.div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
