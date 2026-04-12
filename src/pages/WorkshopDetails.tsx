
import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import Layout from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import RegisterForm from '@/components/workshops/RegisterForm';
import { Workshop } from '@/types/Workshop';
import { Calendar, Clock, MapPin, Users } from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { use3DSecureHandler } from '@/hooks/use3DSecureHandler';

const WorkshopDetails = () => {
  const { id } = useParams<{ id: string }>();
  const [workshop, setWorkshop] = useState<Workshop | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [openDialog, setOpenDialog] = useState(false);
  const { toast } = useToast();
  
  use3DSecureHandler();

  useEffect(() => {
    const fetchWorkshop = async () => {
      if (!id) return;
      
      try {
        const { data, error } = await supabase
          .from('workshops')
          .select('*')
          .eq('id', id)
          .maybeSingle();
        
        if (error) throw error;
        setWorkshop(data as Workshop | null);
      } catch (error) {
        console.error('Error fetching workshop:', error);
        toast({ title: 'Error fetching workshop', description: 'Please try again later.', variant: 'destructive' });
      } finally {
        setIsLoading(false);
      }
    };

    fetchWorkshop();
  }, [id, toast]);

  if (isLoading) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-16 flex justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
        </div>
      </Layout>
    );
  }

  if (!workshop) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-16 text-center">
          <h1 className="text-3xl font-display text-foreground mb-4">Workshop Not Found</h1>
          <p className="text-muted-foreground mb-6">The workshop you are looking for does not exist.</p>
          <Link to="/workshops"><Button className="bg-primary hover:bg-primary/90 text-primary-foreground">View All Workshops</Button></Link>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <Helmet>
        <title>{workshop.title} | Path of the Goddess</title>
        <meta name="description" content={(workshop.description || '').slice(0, 160)} />
      </Helmet>
      
      <section className="py-12 lg:py-16 bg-muted/20">
        <div className="container px-4 mx-auto">
          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <div className="bg-card rounded-lg shadow-md p-8">
                <div className="flex justify-between items-start flex-wrap gap-4 mb-6">
                  <div>
                    <Link to="/workshops" className="text-primary hover:text-primary/80 text-sm mb-2 inline-block">← Back to Workshops</Link>
                    <h1 className="text-3xl md:text-4xl font-display text-foreground">{workshop.title}</h1>
                  </div>
                  <Button onClick={() => setOpenDialog(true)} className="bg-primary hover:bg-primary/90 text-primary-foreground">Register Now</Button>
                </div>
                
                {workshop.image_url && (
                  <img src={workshop.image_url} alt={workshop.title} className="w-full h-64 md:h-96 object-cover rounded-md mb-8" />
                )}
                
                <div className="prose max-w-none text-muted-foreground">
                  <p className="whitespace-pre-line">{workshop.description}</p>
                </div>
                
                {workshop.highlights && workshop.highlights.length > 0 && (
                  <div className="mt-8">
                    <h3 className="text-xl font-display text-foreground mb-4">Workshop Highlights</h3>
                    <ul className="list-disc pl-5 space-y-2 text-muted-foreground">
                      {workshop.highlights.map((highlight, index) => <li key={index}>{highlight}</li>)}
                    </ul>
                  </div>
                )}
                
                {workshop.facilitator && (
                  <div className="mt-8">
                    <h3 className="text-xl font-display text-foreground mb-4">Facilitator</h3>
                    <p className="text-muted-foreground">{workshop.facilitator}</p>
                  </div>
                )}
                
                <div className="mt-8 pt-6 border-t border-border">
                  <Button onClick={() => setOpenDialog(true)} className="bg-primary hover:bg-primary/90 text-primary-foreground w-full md:w-auto">
                    Register for this Workshop
                  </Button>
                </div>
              </div>
            </div>
            
            <div className="lg:col-span-1">
              <div className="bg-card rounded-lg shadow-md p-6 mb-6 sticky top-24">
                <h3 className="text-xl font-display text-foreground mb-4">Workshop Details</h3>
                
                <div className="space-y-4 text-muted-foreground">
                  <div className="flex items-start gap-3">
                    <Calendar className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                    <div><p className="font-medium">Date</p><p>{workshop.date}</p>{workshop.end_date && <p>to {workshop.end_date}</p>}</div>
                  </div>
                  <Separator className="bg-border" />
                  <div className="flex items-start gap-3">
                    <Clock className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                    <div><p className="font-medium">Time</p><p>{workshop.time}</p></div>
                  </div>
                  <Separator className="bg-border" />
                  <div className="flex items-start gap-3">
                    <MapPin className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                    <div><p className="font-medium">Location</p><p>{workshop.location}</p></div>
                  </div>
                  <Separator className="bg-border" />
                  <div className="flex items-start gap-3">
                    <Users className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                    <div><p className="font-medium">Capacity</p><p>{workshop.capacity}</p></div>
                  </div>
                  <Separator className="bg-border" />
                  <div className="flex items-start gap-3">
                    <span className="flex-shrink-0 font-bold text-primary mt-0.5">$</span>
                    <div><p className="font-medium">Price</p><p>{workshop.price}</p></div>
                  </div>
                </div>
                
                <Button onClick={() => setOpenDialog(true)} className="bg-primary hover:bg-primary/90 text-primary-foreground w-full mt-6">Register Now</Button>
              </div>
              
              <div className="bg-muted/30 rounded-lg p-6">
                <h4 className="text-lg font-display text-foreground mb-2">Need Help?</h4>
                <p className="text-muted-foreground text-sm mb-4">If you have any questions about this workshop, please contact us.</p>
                <Link to="/contact"><Button variant="outline" className="w-full border-border text-foreground hover:bg-muted/20">Contact Us</Button></Link>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      <Dialog open={openDialog} onOpenChange={setOpenDialog}>
        <DialogContent className="sm:max-w-md">
          <RegisterForm workshop={workshop} onClose={() => setOpenDialog(false)} />
        </DialogContent>
      </Dialog>
    </Layout>
  );
};

export default WorkshopDetails;
