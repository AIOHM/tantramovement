
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Save, ArrowLeft, Code, Type } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BlogPost } from '@/types/BlogPost';
import { Button } from '@/components/ui/button';
import { supabase } from "@/integrations/supabase/client";

interface BlogFormProps {
  postId: string | 'new';
  onCancel: () => void;
}

const BlogForm = ({ postId, onCancel }: BlogFormProps) => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<'rich' | 'html'>('rich');
  
  // Initialize post state
  const [post, setPost] = useState<BlogPost>({
    id: '',
    title: '',
    content: '',
    image_url: '',
    author: 'Michal Kali Griks',
    date: new Date().toISOString().split('T')[0],
    excerpt: ''
  });

  // Fetch post data if editing an existing post
  useEffect(() => {
    const fetchPost = async () => {
      if (postId !== 'new') {
        try {
          setIsLoading(true);
          console.log(`Fetching post with ID: ${postId}`);
          
          const { data, error } = await supabase
            .from('blog_posts')
            .select('*')
            .eq('id', postId)
            .maybeSingle();
          
          if (error) {
            console.error('Supabase error:', error);
            throw error;
          }
          
          console.log('Fetched data:', data);
          
          if (data) {
            setPost({
              id: data.id,
              title: data.title,
              content: data.content || '',
              image_url: data.image_url,
              author: data.author,
              date: data.date,
              excerpt: data.excerpt || '',
            });
          } else {
            console.log('No post found with ID:', postId);
            toast({
              title: "Post not found",
              description: "The blog post you're trying to edit doesn't exist.",
              variant: "destructive"
            });
            navigate('/admin/blog');
          }
        } catch (error) {
          console.error('Error fetching post:', error);
          toast({
            title: "Error loading post",
            description: "Could not load the blog post. Please try again.",
            variant: "destructive"
          });
        } finally {
          setIsLoading(false);
        }
      } else {
        console.log('Creating new post');
      }
    };
    
    fetchPost();
  }, [postId, navigate, toast]);
  
  const handleSave = async () => {
    if (!post.title.trim()) {
      toast({
        title: "Missing Title",
        description: "Please enter a title for your blog post.",
        variant: "destructive"
      });
      return;
    }
    
    if (!post.content?.trim()) {
      toast({
        title: "Missing Content",
        description: "Please enter content for your blog post.",
        variant: "destructive"
      });
      return;
    }
    
    try {
      setIsLoading(true);
      console.log('Saving post:', post);
      
      // Map data from our app structure to database structure
      const postData = {
        title: post.title,
        content: post.content,
        image_url: post.image_url,
        author: post.author,
        date: post.date,
        excerpt: post.excerpt,
      };
      
      let response;
      
      if (postId === 'new') {
        // Create new post
        console.log('Creating new post with data:', postData);
        response = await supabase
          .from('blog_posts')
          .insert([postData])
          .select();
      } else {
        // Update existing post
        console.log(`Updating post ${postId} with data:`, postData);
        response = await supabase
          .from('blog_posts')
          .update(postData)
          .eq('id', post.id)
          .select();
      }
      
      console.log('Supabase response:', response);
      
      if (response.error) {
        console.error('Supabase error:', response.error);
        throw response.error;
      }
      
      toast({
        title: postId === 'new' ? "Post Created" : "Post Updated",
        description: `Your blog post has been successfully ${postId === 'new' ? 'created' : 'updated'}.`,
      });
      
      navigate('/admin/blog');
    } catch (error) {
      console.error('Error saving post:', error);
      toast({
        title: "Error",
        description: `Failed to ${postId === 'new' ? 'create' : 'update'} post. Please try again.`,
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const formatText = (tag: string) => {
    setPost(prev => ({
      ...prev,
      content: (prev.content || '') + `<${tag}></${tag}>`
    }));
  };

  if (isLoading && postId !== 'new') {
    return (
      <div className="flex justify-center items-center h-64">
        <p>Loading post data...</p>
      </div>
    );
  }

  return (
    <>
      {/* Form header */}
      <div className="mb-6 flex justify-between items-center">
        <button
          onClick={onCancel}
          className="text-foreground/70 hover:text-foreground flex items-center"
        >
          <ArrowLeft size={16} className="mr-1" />
          Back to Posts
        </button>
        <Button 
          onClick={handleSave}
          className="bg-primary hover:bg-primary/90 text-primary-foreground"
          disabled={isLoading}
        >
          <Save size={16} className="mr-1" />
          {isLoading ? 'Saving...' : postId === 'new' ? 'Publish Post' : 'Update Post'}
        </Button>
      </div>
      
      {/* Post form */}
      <div className="bg-card rounded-md shadow-sm p-6">
        {/* Title */}
        <div className="mb-6">
          <label htmlFor="title" className="block text-sm font-medium text-foreground/80 mb-1">
            Post Title
          </label>
          <input
            id="title"
            type="text"
            value={post.title}
            onChange={(e) => setPost({...post, title: e.target.value})}
            className="w-full px-4 py-2 rounded-md border border-border focus:border-primary focus:ring-1 focus:ring-primary focus:outline-none bg-background"
            placeholder="Enter a compelling title..."
          />
        </div>
        
        {/* Image URL */}
        <div className="mb-6">
          <label htmlFor="imageUrl" className="block text-sm font-medium text-foreground/80 mb-1">
            Featured Image URL
          </label>
          <div className="flex space-x-4">
            <input
              id="imageUrl"
              type="text"
              value={post.image_url || ''}
              onChange={(e) => setPost({...post, image_url: e.target.value})}
              className="flex-1 px-4 py-2 rounded-md border border-border focus:border-primary focus:ring-1 focus:ring-primary focus:outline-none bg-background"
              placeholder="https://example.com/image.jpg"
            />
            {post.image_url && (
              <div className="h-10 w-10 rounded overflow-hidden">
                <img 
                  src={post.image_url} 
                  alt="Preview" 
                  className="h-full w-full object-cover"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = '/placeholder.svg';
                  }}
                />
              </div>
            )}
          </div>
        </div>
        
        {/* Excerpt */}
        <div className="mb-6">
          <label htmlFor="excerpt" className="block text-sm font-medium text-foreground/80 mb-1">
            Excerpt (optional)
          </label>
          <textarea
            id="excerpt"
            value={post.excerpt || ''}
            onChange={(e) => setPost({...post, excerpt: e.target.value})}
            className="w-full px-4 py-2 rounded-md border border-border focus:border-primary focus:ring-1 focus:ring-primary focus:outline-none bg-background"
            placeholder="A brief summary of your post (will be shown in previews)"
            rows={2}
          />
        </div>
        
        {/* Content Editor */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-foreground/80 mb-1">
            Post Content
          </label>
          
          <Tabs value={activeTab} onValueChange={(v) => setActiveTab(v as 'rich' | 'html')}>
            <TabsList className="mb-4">
              <TabsTrigger value="rich" className="flex items-center">
                <Type size={14} className="mr-1" />
                Rich Text
              </TabsTrigger>
              <TabsTrigger value="html" className="flex items-center">
                <Code size={14} className="mr-1" />
                HTML
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="rich" className="mt-0">
              <div className="flex space-x-2 mb-2 p-2 bg-muted/30 rounded-t-md border border-border/50">
                <button 
                  onClick={() => formatText('h2')}
                  className="p-1 rounded hover:bg-muted/60"
                  title="Heading"
                >
                  H2
                </button>
                <button 
                  onClick={() => formatText('h3')}
                  className="p-1 rounded hover:bg-muted/60"
                  title="Subheading"
                >
                  H3
                </button>
                <button 
                  onClick={() => formatText('p')}
                  className="p-1 rounded hover:bg-muted/60"
                  title="Paragraph"
                >
                  P
                </button>
                <button 
                  onClick={() => formatText('strong')}
                  className="p-1 rounded hover:bg-muted/60 font-bold"
                  title="Bold"
                >
                  B
                </button>
                <button 
                  onClick={() => formatText('em')}
                  className="p-1 rounded hover:bg-muted/60 italic"
                  title="Italic"
                >
                  I
                </button>
                <button 
                  onClick={() => formatText('ul')}
                  className="p-1 rounded hover:bg-muted/60"
                  title="Unordered List"
                >
                  • List
                </button>
                <button 
                  onClick={() => formatText('ol')}
                  className="p-1 rounded hover:bg-muted/60"
                  title="Ordered List"
                >
                  1. List
                </button>
              </div>
              <textarea
                value={post.content || ''}
                onChange={(e) => setPost({...post, content: e.target.value})}
                className="w-full px-4 py-2 rounded-b-md border border-border focus:border-primary focus:ring-1 focus:ring-primary focus:outline-none bg-background"
                placeholder="Write your blog post content..."
                rows={15}
              />
            </TabsContent>
            
            <TabsContent value="html" className="mt-0">
              <textarea
                value={post.content || ''}
                onChange={(e) => setPost({...post, content: e.target.value})}
                className="w-full px-4 py-2 rounded-md border border-border focus:border-primary focus:ring-1 focus:ring-primary focus:outline-none font-mono text-sm bg-background"
                placeholder="<p>Write your HTML content here...</p>"
                rows={15}
              />
            </TabsContent>
          </Tabs>
        </div>
        
        {/* Preview */}
        <div className="border-t border-border pt-6 mt-6">
          <h3 className="text-lg font-medium text-foreground mb-4">Preview</h3>
          <div className="prose max-w-none border border-border rounded-md p-6 bg-muted/10">
            {post.content ? (
              <div dangerouslySetInnerHTML={{ __html: post.content }} />
            ) : (
              <p className="text-muted-foreground italic">Your content preview will appear here...</p>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default BlogForm;
