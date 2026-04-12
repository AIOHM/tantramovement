
import { useParams } from 'react-router-dom';
import AdminLayout from '@/components/layout/AdminLayout';
import BlogForm from '@/components/blog/BlogForm';
import { useNavigate } from 'react-router-dom';

const BlogEditor = () => {
  const { id = 'new' } = useParams<{ id: string }>();
  const navigate = useNavigate();
  
  const handleCancel = () => {
    navigate('/admin/blog');
  };

  return (
    <AdminLayout title={id === 'new' ? "Create New Blog Post" : "Edit Blog Post"}>
      <BlogForm postId={id} onCancel={handleCancel} />
    </AdminLayout>
  );
};

export default BlogEditor;
