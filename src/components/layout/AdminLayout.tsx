
import { useEffect } from 'react';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import { Settings, ArrowLeft, Calendar, FileText, Users, Sliders, BarChart2, PhoneCall } from 'lucide-react';

interface AdminLayoutProps {
  children: React.ReactNode;
  title: string;
}

const AdminLayout = ({ children, title }: AdminLayoutProps) => {
  const navigate = useNavigate();
  const location = useLocation();
  
  // Check if admin is authenticated
  useEffect(() => {
    const isAuthenticated = sessionStorage.getItem('isAdminAuthenticated') === 'true';
    if (!isAuthenticated) {
      navigate('/admin');
    }
  }, [navigate]);

  const isActive = (path: string) => location.pathname.includes(path);

  return (
    <div className="min-h-screen bg-warm-sand/30">
      {/* Admin Header */}
      <header className="bg-chocolate py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center">
            <div className="flex items-center">
              <Settings className="text-white mr-2" size={20} />
              <h1 className="text-xl font-semibold text-white">Admin Panel</h1>
            </div>
            <Link 
              to="/" 
              className="text-white/80 hover:text-white flex items-center transition-colors"
            >
              <ArrowLeft size={16} className="mr-1" />
              Back to Site
            </Link>
          </div>
        </div>
      </header>

      {/* Admin Navigation */}
      <div className="bg-chocolate/90 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex">
            <Link 
              to="/admin/workshops" 
              className={`py-3 px-5 inline-flex items-center ${isActive('/admin/workshops') ? 'bg-chocolate/80 font-medium' : 'hover:bg-chocolate/80'}`}
            >
              <Calendar size={16} className="mr-2" />
              Workshops
            </Link>
            <Link 
              to="/admin/blog" 
              className={`py-3 px-5 inline-flex items-center ${isActive('/admin/blog') ? 'bg-chocolate/80 font-medium' : 'hover:bg-chocolate/80'}`}
            >
              <FileText size={16} className="mr-2" />
              Blog
            </Link>
            <Link 
              to="/admin/consultations" 
              className={`py-3 px-5 inline-flex items-center ${isActive('/admin/consultations') ? 'bg-chocolate/80 font-medium' : 'hover:bg-chocolate/80'}`}
            >
              <PhoneCall size={16} className="mr-2" />
              Consultations
            </Link>
            <Link 
              to="/admin/contact" 
              className={`py-3 px-5 inline-flex items-center ${isActive('/admin/contact') ? 'bg-chocolate/80 font-medium' : 'hover:bg-chocolate/80'}`}
            >
              <Users size={16} className="mr-2" />
              Contact & Newsletter
            </Link>
            <Link 
              to="/admin/analytics" 
              className={`py-3 px-5 inline-flex items-center ${isActive('/admin/analytics') ? 'bg-chocolate/80 font-medium' : 'hover:bg-chocolate/80'}`}
            >
              <BarChart2 size={16} className="mr-2" />
              Analytics
            </Link>
            <Link 
              to="/admin/settings" 
              className={`py-3 px-5 inline-flex items-center ${isActive('/admin/settings') ? 'bg-chocolate/80 font-medium' : 'hover:bg-chocolate/80'}`}
            >
              <Sliders size={16} className="mr-2" />
              Settings
            </Link>
          </nav>
        </div>
      </div>

      {/* Page Title */}
      <div className="bg-warm-sand/50 py-6 border-b border-chocolate/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-playfair font-bold text-chocolate">{title}</h2>
        </div>
      </div>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {children}
      </main>

      {/* Admin Footer */}
      <footer className="bg-chocolate py-3 text-center text-white/60 text-sm">
        Tantra Movement Admin © {new Date().getFullYear()}
      </footer>
    </div>
  );
};

export default AdminLayout;
