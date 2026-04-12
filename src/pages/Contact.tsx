import { useState } from 'react';
import Layout from '@/components/layout/Layout';
import AnimatedSection from '@/components/common/AnimatedSection';
import { Mail, Phone, MapPin, Send } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { useSiteSettings } from '@/hooks/use-site-settings';

const Contact = () => {
  const { toast } = useToast();
  const { settings, loading } = useSiteSettings();
  const { contactInfo } = settings;
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [submitting, setSubmitting] = useState(false);
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [subscribing, setSubscribing] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    
    try {
      // Store message in database
      const { error: dbError } = await supabase
        .from('contact_messages')
        .insert({
          name: formData.name,
          email: formData.email,
          subject: formData.subject || null,
          message: formData.message
        });
      
      if (dbError) throw dbError;
      
      // Call the edge function to send email notification
      const { error: fnError, data } = await supabase.functions.invoke('send-contact-notification', {
        body: {
          name: formData.name,
          email: formData.email,
          subject: formData.subject || 'Contact Form Message',
          message: formData.message
        }
      });
      
      if (fnError) {
        console.error('Error sending notification:', fnError);
        throw new Error(fnError.message || 'Failed to send notification email');
      }
      
      console.log('Edge function response:', data);
      
      // Show success message
      toast({
        title: "Message Sent!",
        description: "We've received your message and will respond soon.",
        duration: 5000,
      });
      
      // Reset form
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: ''
      });
    } catch (error) {
      console.error('Error submitting form:', error);
      toast({
        title: "Error",
        description: error.message || "There was a problem sending your message. Please try again.",
        variant: "destructive",
        duration: 5000,
      });
    } finally {
      setSubmitting(false);
    }
  };

  const handleNewsletterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubscribing(true);
    
    try {
      // Check if email is valid
      if (!newsletterEmail || !newsletterEmail.includes('@')) {
        throw new Error('Please enter a valid email address');
      }

      // Store in database
      const { error } = await supabase
        .from('newsletter_subscribers')
        .insert({ email: newsletterEmail });
      
      if (error) {
        if (error.code === '23505') { // Unique constraint violation
          toast({
            title: "Already Subscribed",
            description: "This email is already subscribed to our newsletter.",
            duration: 5000,
          });
        } else {
          throw error;
        }
      } else {
        toast({
          title: "Success!",
          description: "You've been subscribed to our newsletter.",
          duration: 5000,
        });
      }
      
      // Reset form
      setNewsletterEmail('');
    } catch (error) {
      console.error('Error subscribing to newsletter:', error);
      toast({
        title: "Error",
        description: error.message || "There was a problem subscribing. Please try again.",
        variant: "destructive",
        duration: 5000,
      });
    } finally {
      setSubscribing(false);
    }
  };

  return (
    <Layout>
      {/* Contact Section */}
      <section className="py-16 md:py-24 bg-white">
        <div className="section-container">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <AnimatedSection>
              <div className="glass-panel p-8 rounded-lg h-full">
                <h2 className="text-2xl font-playfair font-bold text-chocolate mb-6">
                  Contact Information
                </h2>
                
                <div className="space-y-6 mb-8">
                  <div className="flex items-start">
                    <div className="bg-deep-gold/10 w-12 h-12 rounded-full flex items-center justify-center mr-4 text-wine-red">
                      <Mail size={20} />
                    </div>
                    <div>
                      <h3 className="text-wine-red font-medium mb-1">Email Us</h3>
                      <p className="text-chocolate/80">{contactInfo.email}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="bg-deep-gold/10 w-12 h-12 rounded-full flex items-center justify-center mr-4 text-wine-red">
                      <Phone size={20} />
                    </div>
                    <div>
                      <h3 className="text-wine-red font-medium mb-1">Call Us</h3>
                      <p className="text-chocolate/80">{contactInfo.phone}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="bg-deep-gold/10 w-12 h-12 rounded-full flex items-center justify-center mr-4 text-wine-red">
                      <MapPin size={20} />
                    </div>
                    <div>
                      <h3 className="text-wine-red font-medium mb-1">Visit Us</h3>
                      <p className="text-chocolate/80">
                        {contactInfo.address}
                      </p>
                    </div>
                  </div>
                </div>
                
                <h3 className="text-xl font-playfair font-medium text-chocolate mb-4">
                  Follow Us
                </h3>
                <div className="flex space-x-4">
                  <a 
                    href={contactInfo.instagram}
                    target="_blank" 
                    rel="noreferrer"
                    className="bg-deep-gold/10 w-10 h-10 rounded-full flex items-center justify-center text-wine-red hover:bg-wine-red hover:text-white transition-colors"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                    </svg>
                  </a>
                  <a 
                    href={contactInfo.facebook}
                    target="_blank" 
                    rel="noreferrer"
                    className="bg-deep-gold/10 w-10 h-10 rounded-full flex items-center justify-center text-wine-red hover:bg-wine-red hover:text-white transition-colors"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
                    </svg>
                  </a>
                  <a 
                    href="https://youtube.com" 
                    target="_blank" 
                    rel="noreferrer"
                    className="bg-deep-gold/10 w-10 h-10 rounded-full flex items-center justify-center text-wine-red hover:bg-wine-red hover:text-white transition-colors"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z" />
                      <polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02" />
                    </svg>
                  </a>
                </div>
              </div>
            </AnimatedSection>
            
            <AnimatedSection delay={300}>
              <div className="glass-panel p-8 rounded-lg h-full">
                <h2 className="text-2xl font-playfair font-bold text-chocolate mb-6">
                  Send Us a Message
                </h2>
                <form onSubmit={handleSubmit}>
                  <div className="mb-4">
                    <label htmlFor="name" className="block text-chocolate/80 mb-2">Your Name</label>
                    <input 
                      type="text" 
                      id="name" 
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full p-3 bg-white/50 border border-wine-red/20 rounded-md focus:outline-none focus:ring-2 focus:ring-wine-red/50"
                      required
                    />
                  </div>
                  
                  <div className="mb-4">
                    <label htmlFor="email" className="block text-chocolate/80 mb-2">Your Email</label>
                    <input 
                      type="email" 
                      id="email" 
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full p-3 bg-white/50 border border-wine-red/20 rounded-md focus:outline-none focus:ring-2 focus:ring-wine-red/50"
                      required
                    />
                  </div>
                  
                  <div className="mb-4">
                    <label htmlFor="subject" className="block text-chocolate/80 mb-2">Subject</label>
                    <select 
                      id="subject" 
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      className="w-full p-3 bg-white/50 border border-wine-red/20 rounded-md focus:outline-none focus:ring-2 focus:ring-wine-red/50"
                      required
                    >
                      <option value="">Select a subject</option>
                      <option value="workshop">Workshop Inquiry</option>
                      <option value="private">Private Session</option>
                      <option value="retreat">Retreat Information</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                  
                  <div className="mb-6">
                    <label htmlFor="message" className="block text-chocolate/80 mb-2">Your Message</label>
                    <textarea 
                      id="message" 
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      rows={5}
                      className="w-full p-3 bg-white/50 border border-wine-red/20 rounded-md focus:outline-none focus:ring-2 focus:ring-wine-red/50"
                      required
                    ></textarea>
                  </div>
                  
                  <button 
                    type="submit"
                    className="tantra-button flex items-center justify-center w-full"
                    disabled={submitting}
                  >
                    <Send size={18} className="mr-2" />
                    <span>{submitting ? 'Sending...' : 'Send Message'}</span>
                  </button>
                </form>
              </div>
            </AnimatedSection>
          </div>
          
          <AnimatedSection delay={600}>
            <div className="mt-16">
              <h2 className="text-2xl font-playfair font-bold text-chocolate text-center mb-8">
                Join Our Newsletter
              </h2>
              <div className="max-w-xl mx-auto glass-panel p-6 rounded-lg">
                <p className="text-chocolate/80 mb-4 text-center">
                  Stay updated with our latest workshops, retreats, and tantric wisdom.
                </p>
                <form className="flex flex-col sm:flex-row gap-3" onSubmit={handleNewsletterSubmit}>
                  <input 
                    type="email" 
                    placeholder="Your email address"
                    value={newsletterEmail}
                    onChange={(e) => setNewsletterEmail(e.target.value)}
                    className="flex-grow p-3 bg-white/50 border border-wine-red/20 rounded-md focus:outline-none focus:ring-2 focus:ring-wine-red/50"
                    required
                  />
                  <button 
                    type="submit"
                    className="tantra-button whitespace-nowrap"
                    disabled={subscribing}
                  >
                    {subscribing ? 'Subscribing...' : 'Subscribe'}
                  </button>
                </form>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>
    </Layout>
  );
};

export default Contact;
