
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Workshop } from '@/types/Workshop';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Checkbox } from '@/components/ui/checkbox';
import { DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';

// Form validation schema
const formSchema = z.object({
  name: z.string().min(2, { message: 'Name is required' }),
  email: z.string().email({ message: 'Valid email is required' }),
  phone: z.string().optional(),
  agreeToTerms: z.boolean().refine(val => val === true, {
    message: 'You must agree to the terms and conditions',
  }),
});

type FormValues = z.infer<typeof formSchema>;

interface RegisterFormProps {
  workshop: Workshop;
  onClose: () => void;
}

const RegisterForm: React.FC<RegisterFormProps> = ({ workshop, onClose }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [processingPayment, setProcessingPayment] = useState(false);
  const { toast } = useToast();
  
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      email: '',
      phone: '',
      agreeToTerms: false,
    },
  });

  const handleStripe3DSecure = async (checkoutUrl: string) => {
    // Store registration data in localStorage for post-3DS redirect
    localStorage.setItem('workshop_registration', JSON.stringify({
      workshopId: workshop.id,
      customerName: form.getValues('name'),
      customerEmail: form.getValues('email'),
      timestamp: new Date().toISOString()
    }));
    
    console.log("Redirecting to Stripe Checkout:", checkoutUrl);
    
    // Redirect to Stripe Checkout page which handles 3D Secure
    window.location.href = checkoutUrl;
  };

  const onSubmit = async (values: FormValues) => {
    try {
      setIsSubmitting(true);
      setProcessingPayment(true);
      
      // Get supabase auth token for edge function authentication
      const { data: authData } = await supabase.auth.getSession();
      const authToken = authData?.session?.access_token;
      
      // Prepare data for checkout
      const requestData = {
        workshopId: workshop.id,
        customerName: values.name,
        customerEmail: values.email,
        // Use environment variables instead of accessing protected properties
        supabaseUrl: import.meta.env.VITE_SUPABASE_URL || "https://eobsgylnshhmahtfxchc.supabase.co",
        supabaseKey: import.meta.env.VITE_SUPABASE_ANON_KEY || "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVvYnNneWxuc2hobWFodGZ4Y2hjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDE3NzE4MzYsImV4cCI6MjA1NzM0NzgzNn0.IwOgOdMfg-UaoFMR3UmyHrSicu15sOJMvZSm6jJr58k"
      };
      
      console.log("Sending request to create checkout:", requestData);
      
      // Call the Supabase Edge Function to create a checkout session
      const response = await fetch(
        'https://eobsgylnshhmahtfxchc.supabase.co/functions/v1/create-checkout',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${import.meta.env.VITE_SUPABASE_ANON_KEY || "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVvYnNneWxuc2hobWFodGZ4Y2hjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDE3NzE4MzYsImV4cCI6MjA1NzM0NzgzNn0.IwOgOdMfg-UaoFMR3UmyHrSicu15sOJMvZSm6jJr58k"}`,
            'apikey': import.meta.env.VITE_SUPABASE_ANON_KEY || "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVvYnNneWxuc2hobWFodGZ4Y2hjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDE3NzE4MzYsImV4cCI6MjA1NzM0NzgzNn0.IwOgOdMfg-UaoFMR3UmyHrSicu15sOJMvZSm6jJr58k",
          },
          body: JSON.stringify(requestData),
        }
      );
      
      if (!response.ok) {
        const errorText = await response.text();
        console.error('Error response from server:', errorText);
        throw new Error(`Server responded with status: ${response.status}`);
      }
      
      const data = await response.json();
      console.log("Checkout response:", data);
      
      if (data.error) {
        throw new Error(data.error.message || data.error);
      }
      
      // Redirect to Stripe Checkout
      if (data && data.url) {
        await handleStripe3DSecure(data.url);
      } else {
        console.error("No checkout URL in response:", data);
        throw new Error('No checkout URL returned from server');
      }
      
    } catch (error) {
      console.error('Error creating checkout session:', error);
      toast({
        title: 'Error',
        description: error.message || 'Failed to process registration. Please try again.',
        variant: 'destructive',
      });
      setProcessingPayment(false);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="p-1">
      <DialogTitle className="text-2xl font-playfair text-chocolate mb-1">
        Register for {workshop.title}
      </DialogTitle>
      <DialogDescription className="text-chocolate/70 mb-6">
        Fill out the form below to secure your spot.
      </DialogDescription>
      
      {processingPayment ? (
        <div className="flex flex-col items-center justify-center py-8">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-wine-red mb-4"></div>
          <p className="text-chocolate text-center">Processing your payment...</p>
          <p className="text-chocolate/70 text-center text-sm mt-2">
            You will be redirected to Stripe for secure payment processing.
            <br />
            Please do not close this window.
          </p>
        </div>
      ) : (
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-chocolate">Full Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter your full name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-chocolate">Email</FormLabel>
                  <FormControl>
                    <Input type="email" placeholder="Enter your email" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-chocolate">Phone (optional)</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter your phone number" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="bg-warm-sand/20 p-4 rounded-md">
              <p className="font-medium text-chocolate mb-2">Workshop Details</p>
              <div className="text-sm text-chocolate/70 space-y-1">
                <p><span className="font-medium">Date:</span> {workshop.date}{workshop.end_date && ` to ${workshop.end_date}`}</p>
                <p><span className="font-medium">Time:</span> {workshop.time}</p>
                <p><span className="font-medium">Location:</span> {workshop.location}</p>
                <p><span className="font-medium">Price:</span> {workshop.price}</p>
              </div>
            </div>

            <FormField
              control={form.control}
              name="agreeToTerms"
              render={({ field }) => (
                <FormItem className="flex flex-row items-start space-x-3 space-y-0 py-2">
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                  <div className="space-y-1 leading-none">
                    <FormLabel className="text-chocolate">
                      I agree to the terms and conditions
                    </FormLabel>
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex justify-end gap-2 pt-2">
              <Button 
                type="button" 
                variant="outline" 
                onClick={onClose}
                disabled={isSubmitting}
              >
                Cancel
              </Button>
              <Button 
                type="submit" 
                className="bg-wine-red hover:bg-wine-red/90 text-white"
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Processing...' : 'Proceed to Payment'}
              </Button>
            </div>
          </form>
        </Form>
      )}
    </div>
  );
};

export default RegisterForm;
