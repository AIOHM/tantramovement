import { useState, useEffect } from 'react';
import { Calendar, Tag, User } from 'lucide-react';
import { Link } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import AnimatedSection from '@/components/common/AnimatedSection';
import { format } from 'date-fns';
import { BlogPost } from '@/types/BlogPost';
import { supabase } from "@/integrations/supabase/client";
import SEO from '@/components/common/SEO';

const Blog = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setIsLoading(true);
        const { data, error } = await supabase
          .from('blog_posts')
          .select('*')
          .order('date', { ascending: false });
        
        if (error) throw error;
        
        if (data) {
          setPosts(data as BlogPost[]);
        }
      } catch (error) {
        console.error('Error fetching posts:', error);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchPosts();
  }, []);

  const filteredPosts = posts.filter(post => 
    post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (post.content || '').toLowerCase().includes(searchTerm.toLowerCase())
  );

  const blogListSchema = {
    "@context": "https://schema.org",
    "@type": "Blog",
    "name": "Tantra Wisdom Blog",
    "description": "Insights, practices, and inspiration for your tantric journey",
    "url": `${window.location.origin}/blog`,
    "blogPost": posts.map(post => ({
      "@type": "BlogPosting",
      "headline": post.title,
      "description": post.excerpt,
      "image": post.image_url,
      "datePublished": post.date,
      "author": { "@type": "Person", "name": post.author },
      "url": `${window.location.origin}/blog/${post.id}`
    }))
  };

  return (
    <Layout>
      <SEO 
        title="Tantra Wisdom Blog - Insights & Practices"
        description="Explore our collection of articles on tantric practices, sacred sexuality, spiritual growth, and conscious relationships."
        keywords="tantra blog, tantric wisdom, spiritual articles, sacred sexuality blog"
        canonical="/blog"
        type="website"
        schema={blogListSchema}
      />
      <div 
        className="parallax-bg h-[40vh] flex items-center"
        style={{ backgroundImage: 'url("/lovable-uploads/28212c96-0797-4367-b532-3be0aeba8155.png")', backgroundPosition: 'center' }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-warm-charcoal/30 to-transparent"></div>
        <div className="section-container relative z-10">
          <AnimatedSection>
            <h1 className="text-4xl md:text-6xl font-bold text-white text-center">Tantra Wisdom</h1>
            <p className="text-xl text-white/90 text-center mt-4 max-w-2xl mx-auto">
              Insights, practices, and inspiration for your tantric journey
            </p>
          </AnimatedSection>
        </div>
      </div>

      <section className="py-16 md:py-24 bg-background">
        <div className="section-container">
          <div className="mb-12 max-w-md mx-auto">
            <div className="relative">
              <input
                type="text"
                placeholder="Search articles..."
                className="w-full px-4 py-3 rounded-md border border-border focus:border-primary focus:ring-1 focus:ring-primary focus:outline-none pl-10 bg-background"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground">
                <Tag size={18} />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {isLoading ? (
              <div className="col-span-full text-center py-10">
                <p className="text-muted-foreground text-lg">Loading articles...</p>
              </div>
            ) : filteredPosts.length > 0 ? (
              filteredPosts.map((post, index) => (
                <AnimatedSection key={post.id} delay={index * 100}>
                  <Link to={`/blog/${post.id}`} className="block group">
                    <article className="bg-muted/20 overflow-hidden rounded-lg shadow-sm hover:shadow-md transition-all duration-300">
                      <div className="h-48 overflow-hidden">
                        <img 
                          src={post.image_url || '/placeholder.svg'} 
                          alt={post.title}
                          className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                      </div>
                      <div className="p-6">
                        <h2 className="text-xl font-display font-bold text-foreground mb-3 group-hover:text-primary transition-colors">
                          {post.title}
                        </h2>
                        <p className="text-muted-foreground mb-4 line-clamp-3">
                          {post.excerpt || (post.content || '').replace(/<[^>]*>/g, '').substring(0, 120) + '...'}
                        </p>
                        <div className="flex items-center justify-between text-sm text-muted-foreground">
                          <div className="flex items-center">
                            <User size={14} className="mr-1" />
                            <span>{post.author}</span>
                          </div>
                          <div className="flex items-center">
                            <Calendar size={14} className="mr-1" />
                            <span>{post.date ? format(new Date(post.date), 'MMM d, yyyy') : 'No date'}</span>
                          </div>
                        </div>
                      </div>
                    </article>
                  </Link>
                </AnimatedSection>
              ))
            ) : (
              <div className="col-span-full text-center py-10">
                <p className="text-muted-foreground text-lg">No articles found matching "{searchTerm}"</p>
                <button onClick={() => setSearchTerm('')} className="mt-3 text-primary hover:underline">Clear search</button>
              </div>
            )}
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Blog;
