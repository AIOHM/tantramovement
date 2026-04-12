
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { supabase } from '@/integrations/supabase/client';
import { Workshop } from '@/types/Workshop';

// Form validation schema
const formSchema = z.object({
  title: z.string().min(2, { message: 'Title is required' }),
  description: z.string().min(10, { message: 'Description is required (min 10 characters)' }),
  date: z.string().min(1, { message: 'Date is required' }),
  endDate: z.string().optional(),
  time: z.string().min(1, { message: 'Time is required' }),
  location: z.string().min(1, { message: 'Location is required' }),
  capacity: z.string().min(1, { message: 'Capacity is required' }),
  price: z.string().min(1, { message: 'Price is required' }),
  category: z.enum(['workshop', 'retreat', 'training', 'massage']),
  imageUrl: z.string().optional(),
  facilitator: z.string().optional(),
  highlights: z.string().optional(),
});

type FormValues = z.infer<typeof formSchema>;

interface WorkshopFormProps {
  workshop?: Workshop;
  onClose: () => void;
  onSuccess: () => void;
}

const WorkshopForm: React.FC<WorkshopFormProps> = ({ workshop, onClose, onSuccess }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();
  const isEditing = !!workshop;

  // Convert highlights array to comma-separated string for form initialization
  const highlightsString = workshop?.highlights ? workshop.highlights.join(', ') : '';

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: workshop?.title || '',
      description: workshop?.description || '',
      date: workshop?.date || '',
      endDate: workshop?.end_date || '',
      time: workshop?.time || '',
      location: workshop?.location || '',
      capacity: workshop?.capacity || '',
      price: workshop?.price || '',
      category: (workshop?.category as 'workshop' | 'retreat' | 'training' | 'massage') || 'workshop',
      imageUrl: workshop?.image_url || '',
      facilitator: workshop?.facilitator || '',
      highlights: highlightsString,
    },
  });

  const onSubmit = async (values: FormValues) => {
    try {
      setIsSubmitting(true);
      
      // Convert comma-separated highlights to array if provided
      const highlightsArray = values.highlights 
        ? values.highlights.split(',').map(item => item.trim()) 
        : [];
      
      // Format data for database
      const workshopData = {
        title: values.title,
        description: values.description,
        date: values.date,
        end_date: values.endDate || null,
        time: values.time,
        location: values.location,
        capacity: values.capacity,
        price: values.price,
        category: values.category,
        image_url: values.imageUrl || null,
        facilitator: values.facilitator || null,
        highlights: highlightsArray.length > 0 ? highlightsArray : null,
      };
      
      let result;
      
      if (isEditing && workshop) {
        // Update existing workshop
        result = await supabase
          .from('workshops')
          .update(workshopData)
          .eq('id', workshop.id);
      } else {
        // Create new workshop
        result = await supabase
          .from('workshops')
          .insert(workshopData);
      }
      
      if (result.error) {
        throw result.error;
      }
      
      toast({
        title: isEditing ? 'Workshop Updated' : 'Workshop Created',
        description: isEditing 
          ? 'Workshop has been successfully updated.'
          : 'New workshop has been successfully created.',
      });
      
      onSuccess();
      onClose();
      
    } catch (error) {
      console.error('Error saving workshop:', error);
      toast({
        title: 'Error',
        description: error.message || 'Failed to save workshop. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="p-1">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-chocolate">Title</FormLabel>
                <FormControl>
                  <Input placeholder="Enter workshop title" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-chocolate">Description</FormLabel>
                <FormControl>
                  <Textarea 
                    placeholder="Enter workshop description" 
                    className="min-h-[100px]" 
                    {...field} 
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="date"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-chocolate">Start Date</FormLabel>
                  <FormControl>
                    <Input placeholder="MM/DD/YYYY" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="endDate"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-chocolate">End Date (Optional)</FormLabel>
                  <FormControl>
                    <Input placeholder="MM/DD/YYYY" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="time"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-chocolate">Time</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g., 10:00 AM - 5:00 PM" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="location"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-chocolate">Location</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter location" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="capacity"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-chocolate">Capacity</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g., 20 participants" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="price"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-chocolate">Price</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g., $499" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <FormField
            control={form.control}
            name="category"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-chocolate">Category</FormLabel>
                <Select 
                  onValueChange={field.onChange} 
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a category" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="workshop">Workshop</SelectItem>
                    <SelectItem value="retreat">Retreat</SelectItem>
                    <SelectItem value="training">Training</SelectItem>
                    <SelectItem value="massage">Massage</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="facilitator"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-chocolate">Facilitator (Optional)</FormLabel>
                <FormControl>
                  <Input placeholder="Enter facilitator name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="imageUrl"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-chocolate">Image URL (Optional)</FormLabel>
                <FormControl>
                  <Input placeholder="Enter image URL" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="highlights"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-chocolate">Highlights (Optional, comma-separated)</FormLabel>
                <FormControl>
                  <Input placeholder="Key points, separated by commas" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="flex justify-end gap-2 pt-4">
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
              {isSubmitting ? 'Saving...' : isEditing ? 'Update Workshop' : 'Create Workshop'}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default WorkshopForm;
