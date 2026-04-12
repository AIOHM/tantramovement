
import { useAnalytics } from '@/hooks/use-analytics';

const Analytics = () => {
  // This is a non-visual component that just uses the hook
  useAnalytics();
  return null;
};

export default Analytics;
