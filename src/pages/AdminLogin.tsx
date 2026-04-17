import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Lock, Loader2 } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";
import Layout from '@/components/layout/Layout';
import { supabase } from '@/integrations/supabase/client';

const AdminLogin = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      const { data, error } = await supabase.functions.invoke('validate-admin', {
        body: { username, password }
      });

      if (error) throw error;

      if (data?.success) {
        sessionStorage.setItem('isAdminAuthenticated', 'true');
        navigate('/admin/consultations');
      } else {
        toast({
          title: "Authentication Failed",
          description: "Incorrect password. Please try again.",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error('Login error:', error);
      toast({
        title: "Error",
        description: "Unable to authenticate. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Layout>
      <div className="min-h-[80vh] flex items-center justify-center">
        <div className="w-full max-w-md p-8 glass-panel rounded-lg">
          <div className="text-center mb-6">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-wine-red/10 mb-4">
              <Lock className="text-wine-red" size={24} />
            </div>
            <h1 className="text-2xl font-playfair font-bold text-chocolate">Admin Access</h1>
            <p className="text-chocolate/70 mt-2">Enter your password to access the admin area</p>
          </div>
          
          <form onSubmit={handleLogin}>
            <div className="mb-6">
              <label htmlFor="username" className="block text-sm font-medium text-chocolate/80 mb-2">
                Username
              </label>
              <input
                id="username"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full px-4 py-2 rounded-md border border-chocolate/20 focus:border-wine-red focus:ring-1 focus:ring-wine-red focus:outline-none"
                placeholder="WordPress admin username"
                required
                disabled={isLoading}
              />
            </div>
            <div className="mb-6">
              <label htmlFor="password" className="block text-sm font-medium text-chocolate/80 mb-2">
                Password
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-2 rounded-md border border-chocolate/20 focus:border-wine-red focus:ring-1 focus:ring-wine-red focus:outline-none"
                placeholder="Enter admin password"
                required
                disabled={isLoading}
              />
            </div>
            
            <button
              type="submit"
              className="w-full tantra-button flex items-center justify-center gap-2"
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <Loader2 className="animate-spin" size={18} />
                  Verifying...
                </>
              ) : (
                'Login'
              )}
            </button>
          </form>
        </div>
      </div>
    </Layout>
  );
};

export default AdminLogin;
