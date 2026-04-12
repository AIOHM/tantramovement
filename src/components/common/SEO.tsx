
import { Helmet } from 'react-helmet';

interface SEOProps {
  title: string;
  description: string;
  keywords?: string;
  canonical?: string;
  image?: string;
  type?: 'website' | 'article' | 'profile' | 'book' | 'product';
  publishedAt?: string;
  author?: string;
  schema?: object;
}

/**
 * Enhanced SEO component for consistent meta tags and structured data across pages
 */
const SEO: React.FC<SEOProps> = ({
  title,
  description,
  keywords,
  canonical,
  image = '/og-image.png',
  type = 'website',
  publishedAt,
  author = 'Tantra Movement School',
  schema,
}) => {
  const siteTitle = 'Tantra Movement School';
  const fullTitle = title === siteTitle ? title : `${title} | ${siteTitle}`;
  
  // Construct full canonical URL if relative path provided
  const fullCanonical = canonical 
    ? (canonical.startsWith('http') ? canonical : `${window.location.origin}${canonical}`)
    : undefined;
  
  // Construct full image URL if relative path provided
  const fullImage = image 
    ? (image.startsWith('http') ? image : `${window.location.origin}${image}`)
    : `${window.location.origin}/og-image.png`;

  // Base schema for the website
  const baseSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": siteTitle,
    "url": window.location.origin,
    "logo": `${window.location.origin}/lovable-uploads/95baccfc-616d-4169-be85-ebd1521150c4.png`,
    "sameAs": [
      "https://www.facebook.com/TantraMovement",
      "https://www.instagram.com/TantraMovement"
    ]
  };

  return (
    <Helmet>
      {/* Basic Metadata */}
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      {keywords && <meta name="keywords" content={keywords} />}
      {fullCanonical && <link rel="canonical" href={fullCanonical} />}
      <meta name="author" content={author} />
      
      {/* Open Graph / Facebook */}
      <meta property="og:type" content={type} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={fullImage} />
      {fullCanonical && <meta property="og:url" content={fullCanonical} />}
      <meta property="og:site_name" content={siteTitle} />
      {publishedAt && <meta property="article:published_time" content={publishedAt} />}
      
      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={fullImage} />
      
      {/* Structured Data */}
      <script type="application/ld+json">
        {JSON.stringify(schema || baseSchema)}
      </script>
    </Helmet>
  );
};

export default SEO;
