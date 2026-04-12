
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";
import AdminLayout from '@/components/layout/AdminLayout';
import { BlogPost } from '@/types/BlogPost';
import { Button } from '@/components/ui/button';
import { supabase } from "@/integrations/supabase/client";
import BlogTable from '@/components/blog/BlogTable';
import BlogFilter from '@/components/blog/BlogFilter';

type TabType = 'all' | 'drafts' | 'published';

const BlogAdmin = () => {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [activeTab, setActiveTab] = useState<TabType>('all');
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();
  const navigate = useNavigate();

  const fetchPosts = async () => {
    try {
      setIsLoading(true);
      const { data, error } = await supabase
        .from('blog_posts')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      
      if (data) {
        setPosts(data as BlogPost[]);
      }
    } catch (error) {
      console.error('Error fetching posts:', error);
      toast({ title: "Error", description: "Failed to load blog posts.", variant: "destructive" });
    } finally {
      setIsLoading(false);
    }
  };
  
  useEffect(() => { fetchPosts(); }, [toast]);

  const filteredPosts = posts.filter(post => {
    if (activeTab === 'all') return true;
    return activeTab === 'published';
  });

  return (
    <AdminLayout title="Blog Management">
      <div className="mb-6 flex justify-between items-center">
        <BlogFilter activeTab={activeTab} onChange={setActiveTab} />
        <Button onClick={() => navigate('/admin/blog/new')} className="bg-primary hover:bg-primary/90 text-primary-foreground">
          <Plus size={16} className="mr-1" /> New Post
        </Button>
      </div>
      <BlogTable posts={filteredPosts} isLoading={isLoading} onPostsChange={fetchPosts} />
    </AdminLayout>
  );
};

export default BlogAdmin;
