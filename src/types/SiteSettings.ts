
export interface ContactInfo {
  email: string;
  phone: string;
  address: string;
  instagram: string;
  facebook: string;
}

export interface LandingPageSection {
  id: string;
  title: string;
  subtitle?: string;
  content?: string;
}

export interface SiteSettings {
  contactInfo: ContactInfo;
  heroSection: {
    title: string;
    subtitle: string;
    buttonText: string;
  };
  landingSections: LandingPageSection[];
  featuredSection?: {
    title: string;
    subtitle?: string;
    content: string;
    quote: string;
    bulletPoints: string[];
  };
}
