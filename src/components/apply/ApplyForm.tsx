import { useState } from 'react';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { Send, Loader2, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';

const formSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters').max(100),
  email: z.string().email('Please enter a valid email address').max(255),
  phone: z.string().optional(),
  timezone: z.string().min(1, 'Please select your timezone'),
  message: z.string().max(1000).optional(),
});

type FormData = z.infer<typeof formSchema>;

const timezones = [
  { value: 'UTC-12', label: 'UTC-12:00 (Baker Island)' },
  { value: 'UTC-8', label: 'UTC-08:00 (Pacific Time)' },
  { value: 'UTC-5', label: 'UTC-05:00 (Eastern Time)' },
  { value: 'UTC-3', label: 'UTC-03:00 (São Paulo)' },
  { value: 'UTC+0', label: 'UTC+00:00 (London)' },
  { value: 'UTC+1', label: 'UTC+01:00 (Central Europe)' },
  { value: 'UTC+2', label: 'UTC+02:00 (Eastern Europe)' },
  { value: 'UTC+3', label: 'UTC+03:00 (Moscow)' },
  { value: 'UTC+5:30', label: 'UTC+05:30 (India)' },
  { value: 'UTC+7', label: 'UTC+07:00 (Thailand/Vietnam)' },
  { value: 'UTC+8', label: 'UTC+08:00 (Singapore/China)' },
  { value: 'UTC+9', label: 'UTC+09:00 (Japan/Korea)' },
  { value: 'UTC+10', label: 'UTC+10:00 (Sydney)' },
  { value: 'UTC+12', label: 'UTC+12:00 (New Zealand)' },
];

const ApplyForm = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { toast } = useToast();

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      email: '',
      phone: '',
      timezone: '',
      message: '',
    },
  });

  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true);

    try {
      const { error } = await supabase.from('consultation_requests').insert({
        name: data.name,
        email: data.email,
        phone: data.phone || null,
        timezone: data.timezone,
        message: data.message || null,
      });

      if (error) throw error;

      // Send email notification (fire and forget - don't block on failure)
      supabase.functions.invoke('send-consultation-notification', {
        body: {
          name: data.name,
          email: data.email,
          phone: data.phone || undefined,
          timezone: data.timezone,
          message: data.message || undefined,
        },
      }).catch(err => console.error('Failed to send notification:', err));

      setIsSubmitted(true);
      toast({
        title: 'Request Submitted!',
        description: "We'll be in touch within 24 hours to schedule your call.",
      });
    } catch (error) {
      console.error('Error submitting form:', error);
      toast({
        title: 'Something went wrong',
        description: 'Please try again or contact us directly.',
        variant: 'destructive',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSubmitted) {
    return (
      <section id="booking-form" className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="max-w-lg mx-auto text-center p-12 rounded-3xl bg-card/80 backdrop-blur-lg border border-primary/20"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: 'spring', stiffness: 200, delay: 0.2 }}
              className="w-20 h-20 rounded-full bg-primary/20 flex items-center justify-center mx-auto mb-6"
            >
              <CheckCircle className="w-10 h-10 text-primary" />
            </motion.div>
            <h3 className="font-display text-2xl text-foreground mb-4">
              Thank You for Reaching Out!
            </h3>
            <p className="text-muted-foreground mb-6">
              Your request has been received. We'll contact you within 24 hours to schedule 
              your discovery call at a time that works for you.
            </p>
            <p className="text-sm text-muted-foreground">
              Check your inbox (and spam folder) for our response.
            </p>
          </motion.div>
        </div>
      </section>
    );
  }

  return (
    <section id="booking-form" className="py-20 bg-muted/30 relative overflow-hidden">
      {/* Decorative background */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-0 right-0 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-accent/10 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="font-display text-3xl md:text-4xl text-foreground mb-4">
            Book Your Free Discovery Call
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Fill out this short form and we'll reach out to schedule your 15-minute call.
          </p>
        </motion.div>

        {/* Form Card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="max-w-xl mx-auto"
        >
          <div className="p-8 md:p-10 rounded-3xl bg-card/80 backdrop-blur-lg border border-border/50 shadow-xl">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                {/* Name */}
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Full Name *</FormLabel>
                      <FormControl>
                        <Input 
                          placeholder="Your name" 
                          {...field} 
                          className="bg-background/50 border-border/50 focus:border-primary"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Email */}
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email Address *</FormLabel>
                      <FormControl>
                        <Input 
                          type="email" 
                          placeholder="your@email.com" 
                          {...field}
                          className="bg-background/50 border-border/50 focus:border-primary"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Phone */}
                <FormField
                  control={form.control}
                  name="phone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>WhatsApp / Phone (Optional)</FormLabel>
                      <FormControl>
                        <Input 
                          placeholder="+1 234 567 8900" 
                          {...field}
                          className="bg-background/50 border-border/50 focus:border-primary"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Timezone */}
                <FormField
                  control={form.control}
                  name="timezone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Your Timezone *</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger className="bg-background/50 border-border/50 focus:border-primary">
                            <SelectValue placeholder="Select your timezone" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {timezones.map((tz) => (
                            <SelectItem key={tz.value} value={tz.value}>
                              {tz.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Message */}
                <FormField
                  control={form.control}
                  name="message"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>What draws you to this training? (Optional)</FormLabel>
                      <FormControl>
                        <Textarea 
                          placeholder="Share anything you'd like us to know before the call..."
                          className="bg-background/50 border-border/50 focus:border-primary min-h-[100px] resize-none"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Submit Button */}
                <motion.div
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.99 }}
                >
                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-6 text-lg font-display tracking-wider"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                        Submitting...
                      </>
                    ) : (
                      <>
                        <Send className="w-5 h-5 mr-2" />
                        Request Your Free Call
                      </>
                    )}
                  </Button>
                </motion.div>

                {/* Privacy note */}
                <p className="text-xs text-center text-muted-foreground">
                  Your information is secure and will never be shared. 
                  By submitting, you agree to be contacted about the training.
                </p>
              </form>
            </Form>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ApplyForm;
