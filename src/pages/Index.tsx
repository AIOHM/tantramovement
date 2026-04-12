
import Hero from '@/components/home/Hero';
import OverviewCards from '@/components/home/OverviewCards';
import FeaturedSection from '@/components/home/FeaturedSection';
import TestimonialCarousel from '@/components/home/TestimonialCarousel';
import Layout from '@/components/layout/Layout';
import { useSiteSettings } from '@/hooks/use-site-settings';
import SEO from '@/components/common/SEO';

const Index = () => {
  const { loading } = useSiteSettings();
  
  const homeSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "Tantra Movement School",
    "url": window.location.origin,
    "description": "Awaken love, presence & energy through the ancient wisdom of Tantra. Join our transformative workshops, retreats and private sessions.",
    "potentialAction": {
      "@type": "SearchAction",
      "target": {
        "@type": "EntryPoint",
        "urlTemplate": `${window.location.origin}/blog?search={search_term_string}`
      },
      "query-input": "required name=search_term_string"
    }
  };
  
  return (
    <Layout>
      <SEO 
        title="Tantra Movement School - Awaken Love, Presence & Energy"
        description="Transform your life with ancient tantric wisdom. Join our workshops, retreats, and private sessions to explore sacred sexuality, conscious relationships, and spiritual growth."
        keywords="tantra, tantric practices, spiritual growth, sacred sexuality, conscious relationships, tantra workshops, meditation, yoga"
        image="/lovable-uploads/28212c96-0797-4367-b532-3be0aeba8155.png"
        schema={homeSchema}
      />
      <Hero />
      <OverviewCards />
      <FeaturedSection />
      <TestimonialCarousel />
    </Layout>
  );
};

export default Index;
