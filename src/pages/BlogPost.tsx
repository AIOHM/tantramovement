import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Calendar, User } from 'lucide-react';
import Layout from '@/components/layout/Layout';
import { format } from 'date-fns';
import AnimatedSection from '@/components/common/AnimatedSection';
import { supabase } from "@/integrations/supabase/client";
import { BlogPost as BlogPostType } from '@/types/BlogPost';
import SEO from '@/components/common/SEO';

const BlogPost = () => {
  const { id } = useParams<{ id: string }>();
  const [post, setPost] = useState<BlogPostType | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchPost = async () => {
      try {
        setIsLoading(true);
        setError('');
        
        if (!id || id === 'new') {
          setPost(null);
          setIsLoading(false);
          return;
        }

        const { data, error } = await supabase
          .from('blog_posts')
          .select('*')
          .eq('id', id)
          .maybeSingle();
        
        if (error) throw error;
        
        if (data) {
          setPost(data as BlogPostType);
        } else {
          setPost(null);
          setError('Post not found');
        }
      } catch (error) {
        console.error('Error fetching post:', error);
        setPost(null);
        setError('Error loading post');
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchPost();
    window.scrollTo(0, 0);
  }, [id]);

  const getArticleSchema = (post: BlogPostType) => ({
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": post.title,
    "description": post.excerpt,
    "image": post.image_url,
    "datePublished": post.date,
    "author": { "@type": "Person", "name": post.author },
    "publisher": {
      "@type": "Organization",
      "name": "Tantra Movement School",
      "logo": { "@type": "ImageObject", "url": `${window.location.origin}/lovable-uploads/95baccfc-616d-4169-be85-ebd1521150c4.png` }
    },
    "mainEntityOfPage": { "@type": "WebPage", "@id": `${window.location.origin}/blog/${post.id}` }
  });

  if (isLoading) {
    return (
      <Layout>
        <SEO title="Loading Article..." description="Please wait while we load the article." type="article" />
        <div className="section-container flex flex-col items-center py-16">
          <p className="text-muted-foreground">Loading post...</p>
        </div>
      </Layout>
    );
  }

  if (!post) {
    return (
      <Layout>
        <SEO title="Article Not Found" description="The article you're looking for couldn't be found." type="article" />
        <div className="section-container flex flex-col items-center py-16">
          <h1 className="text-3xl font-display font-bold text-foreground mb-6">Post Not Found</h1>
          <p className="text-muted-foreground mb-8">{error || "The blog post you're looking for doesn't exist."}</p>
          <Link to="/blog" className="tantra-button">Back to Blog</Link>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <SEO 
        title={post.title}
        description={post.excerpt || (post.content || '').replace(/<[^>]*>/g, '').substring(0, 160)}
        keywords={`tantra, spiritual growth, ${post.title.toLowerCase()}`}
        canonical={`/blog/${post.id}`}
        type="article"
        publishedAt={post.date || undefined}
        author={post.author || undefined}
        image={post.image_url || undefined}
        schema={getArticleSchema(post)}
      />
      <div 
        className="parallax-bg h-[50vh] flex items-center relative"
        style={{ backgroundImage: `url("${post.image_url}")`, backgroundPosition: 'center' }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-warm-charcoal/40 to-warm-charcoal/20"></div>
        <div className="section-container relative z-10">
          <AnimatedSection>
            <h1 className="text-3xl md:text-5xl font-bold text-white text-center max-w-4xl mx-auto strong-text-shadow">
              {post.title}
            </h1>
          </AnimatedSection>
        </div>
      </div>

      <section className="py-16 md:py-20 bg-background">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <AnimatedSection>
            <div className="flex items-center justify-between mb-10 pb-6 border-b border-border">
              <div className="flex items-center text-muted-foreground">
                <User size={18} className="mr-2" />
                <span>{post.author}</span>
              </div>
              <div className="flex items-center text-muted-foreground">
                <Calendar size={18} className="mr-2" />
                <span>{post.date ? format(new Date(post.date), 'MMMM d, yyyy') : 'No date'}</span>
              </div>
            </div>
            
            <div className="prose max-w-none" dangerouslySetInnerHTML={{ __html: post.content || '' }} />
            
            <div className="mt-14 pt-8 border-t border-border">
              <Link to="/blog" className="inline-flex items-center text-primary hover:text-primary/80 transition-colors">
                <ArrowLeft size={16} className="mr-2" /> Back to all articles
              </Link>
            </div>
          </AnimatedSection>
        </div>
      </section>
    </Layout>
  );
};

export default BlogPost;
