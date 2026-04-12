
import Layout from '@/components/layout/Layout';
import { Link, useLocation } from 'react-router-dom';
import { useEffect } from 'react';

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <Layout>
      <div className="min-h-[60vh] flex flex-col items-center justify-center bg-warm-sand/20 py-16">
        <div className="text-center">
          <h1 className="text-6xl md:text-8xl font-playfair font-bold text-wine-red mb-4">404</h1>
          <p className="text-xl md:text-2xl text-chocolate mb-8">
            Oops! The page you're looking for seems to have wandered off on a spiritual journey.
          </p>
          <Link 
            to="/" 
            className="tantra-button inline-flex items-center"
          >
            Return to Home
          </Link>
        </div>
      </div>
    </Layout>
  );
};

export default NotFound;
