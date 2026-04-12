
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Edit, Trash2, Calendar } from 'lucide-react';
import { format } from 'date-fns';
import { BlogPost } from '@/types/BlogPost';
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

interface BlogTableProps {
  posts: BlogPost[];
  isLoading: boolean;
  onPostsChange: () => void;
}

const BlogTable = ({ posts, isLoading, onPostsChange }: BlogTableProps) => {
  const [showDeleteConfirm, setShowDeleteConfirm] = useState<string | null>(null);
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleDelete = async (id: string) => {
    try {
      const { error } = await supabase
        .from('blog_posts')
        .delete()
        .eq('id', id);
      
      if (error) throw error;
      
      toast({
        title: "Post Deleted",
        description: "The blog post has been successfully deleted.",
      });
      
      onPostsChange();
    } catch (error) {
      console.error('Error deleting post:', error);
      toast({
        title: "Error",
        description: "Failed to delete post. Please try again.",
        variant: "destructive"
      });
    }
    
    setShowDeleteConfirm(null);
  };

  const handleEdit = (id: string) => {
    navigate(`/admin/blog/edit/${id}`);
  };

  return (
    <div className="bg-card rounded-md shadow-sm overflow-hidden">
      <table className="min-w-full divide-y divide-border">
        <thead className="bg-muted/30">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
              Title
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
              Date
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
              Author
            </th>
            <th className="px-6 py-3 text-right text-xs font-medium text-muted-foreground uppercase tracking-wider">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="bg-card divide-y divide-border">
          {isLoading ? (
            <tr>
              <td colSpan={4} className="px-6 py-10 text-center text-muted-foreground">
                Loading blog posts...
              </td>
            </tr>
          ) : posts.length > 0 ? (
            posts.map((post) => (
              <tr key={post.id} className="hover:bg-muted/10">
                <td className="px-6 py-4">
                  <div className="flex items-center">
                    {post.image_url && (
                      <div className="flex-shrink-0 h-10 w-10 mr-3">
                        <img 
                          className="h-10 w-10 rounded object-cover" 
                          src={post.image_url} 
                          alt="" 
                        />
                      </div>
                    )}
                    <div className="text-sm font-medium text-foreground">
                      {post.title}
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-muted-foreground">
                  <div className="flex items-center">
                    <Calendar size={14} className="mr-2" />
                    {post.date ? format(new Date(post.date), 'MMM d, yyyy') : 'No date'}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-muted-foreground">
                  {post.author}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  {showDeleteConfirm === post.id ? (
                    <div className="flex items-center justify-end">
                      <span className="text-muted-foreground mr-2">Confirm delete?</span>
                      <button
                        onClick={() => handleDelete(post.id)}
                        className="text-destructive hover:text-destructive/80 ml-3"
                      >
                        Yes
                      </button>
                      <button
                        onClick={() => setShowDeleteConfirm(null)}
                        className="text-muted-foreground hover:text-foreground ml-3"
                      >
                        No
                      </button>
                    </div>
                  ) : (
                    <div className="flex items-center justify-end">
                      <button
                        onClick={() => handleEdit(post.id)}
                        className="text-primary hover:text-primary/80"
                      >
                        <Edit size={16} />
                      </button>
                      <button
                        onClick={() => setShowDeleteConfirm(post.id)}
                        className="text-destructive hover:text-destructive/80 ml-3"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  )}
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={4} className="px-6 py-10 text-center text-muted-foreground">
                No blog posts found
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default BlogTable;
