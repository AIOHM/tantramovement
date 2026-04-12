import Layout from '@/components/layout/Layout';
import SEO from '@/components/common/SEO';
import ApplyHero from '@/components/apply/ApplyHero';
import DiscoveryBenefits from '@/components/apply/DiscoveryBenefits';
import ApplicationProcess from '@/components/apply/ApplicationProcess';
import SocialProof from '@/components/apply/SocialProof';
import ApplyForm from '@/components/apply/ApplyForm';
import ApplyFAQ from '@/components/apply/ApplyFAQ';
import FinalCTA from '@/components/apply/FinalCTA';

const Apply = () => {
  return (
    <Layout>
      <SEO
        title="Apply for Teacher Training | Book Your Free Discovery Call"
        description="Book a free 15-minute discovery call to explore if the Tantra Teacher Training is right for you. Get your questions answered and learn about the program."
        keywords="tantra teacher training application, discovery call, tantra certification, apply now"
        canonical="/apply"
      />
      
      <ApplyHero />
      <DiscoveryBenefits />
      <ApplicationProcess />
      <SocialProof />
      <ApplyForm />
      <ApplyFAQ />
      <FinalCTA />
    </Layout>
  );
};

export default Apply;
