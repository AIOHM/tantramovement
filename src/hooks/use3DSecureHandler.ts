
import { useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';

export function use3DSecureHandler() {
  const { toast } = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    // Check if returning from Stripe with a session_id
    const url = new URL(window.location.href);
    const sessionId = url.searchParams.get('session_id');
    const success = url.searchParams.get('success');
    const canceled = url.searchParams.get('canceled');

    // Only process if we have session_id and success/canceled params
    if (sessionId) {
      const processPaymentStatus = async () => {
        try {
          console.log("Processing 3D Secure payment return, session ID:", sessionId);
          
          // Get the stored registration data
          const registrationData = localStorage.getItem('workshop_registration');
          if (!registrationData) {
            console.warn("No registration data found in localStorage");
            return;
          }
          
          // Parse the registration data
          const parsedData = JSON.parse(registrationData);
          console.log("Retrieved registration data:", parsedData);
          
          if (success === 'true') {
            // Payment was successful
            toast({
              title: "Payment Successful",
              description: "Your workshop registration has been confirmed.",
              variant: "default",
            });
            
            // Clear the stored registration data
            localStorage.removeItem('workshop_registration');
            
            // Navigate to a success page or back to workshops
            navigate('/workshops');
          } else if (canceled === 'true') {
            // Payment was canceled or failed
            toast({
              title: "Payment Canceled",
              description: "Your payment was not processed. Please try again.",
              variant: "destructive",
            });
            
            // Clear the stored registration data
            localStorage.removeItem('workshop_registration');
          }
          
          // Remove the query parameters from the URL without reloading
          const newUrl = window.location.pathname;
          window.history.replaceState({}, document.title, newUrl);
        } catch (error) {
          console.error('Error processing payment status:', error);
          toast({
            title: "Payment Error",
            description: "There was an error processing your payment status.",
            variant: "destructive",
          });
        }
      };

      processPaymentStatus();
    }
  }, [toast, navigate]);
}
