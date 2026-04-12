
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { trackPageView, trackTimeSpent } from '@/services/analytics';

export const useAnalytics = () => {
  const location = useLocation();
  const [pageLoadTime, setPageLoadTime] = useState<Date | null>(null);

  // Track page views when route changes
  useEffect(() => {
    const trackView = async () => {
      await trackPageView(location.pathname);
      setPageLoadTime(new Date());
    };
    
    trackView();
    
    // Clean up and track time spent when leaving the page
    return () => {
      if (pageLoadTime) {
        const now = new Date();
        const timeSpentSeconds = Math.floor((now.getTime() - pageLoadTime.getTime()) / 1000);
        trackTimeSpent(location.pathname, timeSpentSeconds);
      }
    };
  }, [location.pathname]);

  return null;
};

export default useAnalytics;
