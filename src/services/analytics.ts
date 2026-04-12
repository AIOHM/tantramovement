
import { supabase } from "@/integrations/supabase/client";

// Track page views
export const trackPageView = async (pathname: string) => {
  try {
    const referrer = document.referrer;

    await supabase.from('analytics_page_views').insert({
      page_path: pathname,
      referrer: referrer || null,
      user_agent: navigator.userAgent || null
    });
  } catch (error) {
    console.error('Error tracking page view:', error);
    // Silently fail to not disrupt user experience
  }
};

// Track click events
export const trackClickEvent = async (
  event: React.MouseEvent<HTMLElement>,
  elementType: string
) => {
  try {
    const target = event.target as HTMLElement;
    const elementText = target.innerText || target.textContent || null;
    const pathname = window.location.pathname;

    await supabase.from('analytics_events').insert({
      event_name: `click_${elementType}`,
      page_path: pathname,
      event_data: {
        element_text: elementText,
        element_type: elementType
      }
    });
  } catch (error) {
    console.error('Error tracking click event:', error);
    // Silently fail to not disrupt user experience
  }
};

// Track time spent on page
export const trackTimeSpent = async (pathname: string, seconds: number) => {
  try {
    if (seconds < 1) return; // Don't track very short visits
    
    await supabase.from('analytics_time_spent').insert({
      page_path: pathname,
      time_spent: seconds
    });
  } catch (error) {
    console.error('Error tracking time spent:', error);
    // Silently fail to not disrupt user experience
  }
};
