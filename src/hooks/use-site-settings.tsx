
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { SiteSettings } from '@/types/SiteSettings';

const defaultSettings: SiteSettings = {
  contactInfo: {
    email: 'info@tantramovement.com',
    phone: '+1 (234) 567-890',
    address: 'Tantra Movement Studio, 123 Spiritual Way, Mindful City',
    instagram: 'https://instagram.com',
    facebook: 'https://facebook.com'
  },
  heroSection: {
    title: 'Awaken Love, Presence & Energy Through Tantra',
    subtitle: 'Experience the profound wisdom of Tantra in our transformative workshops and private sessions',
    buttonText: 'Explore Workshops'
  },
  landingSections: [
    {
      id: 'section1',
      title: 'Explore Our Offerings',
      subtitle: 'Discover the transformative power of our tantra programs'
    },
    {
      id: 'section2',
      title: 'Featured Workshops',
      subtitle: 'Join our most popular upcoming events'
    },
    {
      id: 'section3',
      title: 'What Our Students Say',
      subtitle: 'Read testimonials from our community'
    }
  ],
  featuredSection: {
    title: 'Transform Your Relationships Through Sacred Connection',
    subtitle: '',
    content: 'Tantra is more than a practice—it\'s a path to deeper self-awareness and more fulfilling relationships. Our approach combines ancient wisdom with modern techniques to help you:',
    quote: 'The journey of Tantra begins with self-love and expands to embrace all of life.',
    bulletPoints: [
      'Cultivate presence and mindfulness in your interactions',
      'Connect more deeply with yourself and others',
      'Explore the sacred dimensions of your sexuality',
      'Heal blocks and wounds that prevent intimacy'
    ]
  }
};

export const useSiteSettings = () => {
  const [settings, setSettings] = useState<SiteSettings>(defaultSettings);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const { data, error } = await supabase
          .from('site_settings')
          .select('*')
          .single();
        
        if (error) {
          // If no settings found, we'll use the defaults
          if (error.code === 'PGRST116') {
            console.log('No settings found, using defaults');
            setLoading(false);
            return;
          }
          throw error;
        }
        
        if (data) {
          // Cast the settings from JSON to our type
          const siteSettings = data.settings as unknown as SiteSettings;
          setSettings(siteSettings);
        }
      } catch (err) {
        console.error('Error fetching site settings:', err);
        setError(err instanceof Error ? err : new Error('Unknown error fetching settings'));
      } finally {
        setLoading(false);
      }
    };

    fetchSettings();
  }, []);

  return { settings, loading, error };
};
