
import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import Layout from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import CalendarView from '@/components/workshops/CalendarView';
import RegisterForm from '@/components/workshops/RegisterForm';
import { supabase } from '@/integrations/supabase/client';
import { Workshop } from '@/types/Workshop';
import { useToast } from '@/hooks/use-toast';
import { use3DSecureHandler } from '@/hooks/use3DSecureHandler';
import { useIsMobile } from '@/hooks/use-mobile';

const Workshops = () => {
  const [workshops, setWorkshops] = useState<Workshop[]>([]);
  const [filteredWorkshops, setFilteredWorkshops] = useState<Workshop[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [viewMode, setViewMode] = useState('list');
  const [selectedWorkshop, setSelectedWorkshop] = useState<Workshop | null>(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [activeCategory, setActiveCategory] = useState('all');
  const { toast } = useToast();
  const isMobile = useIsMobile();
  
  // Use the 3D Secure handler to process payments when returning from Stripe
  use3DSecureHandler();

  useEffect(() => {
    const fetchWorkshops = async () => {
      try {
        const { data, error } = await supabase
          .from('workshops')
          .select('*')
          .order('date', { ascending: true });
        
        if (error) throw error;
        
        setWorkshops(data || []);
        setFilteredWorkshops(data || []);
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching workshops:', error);
        toast({
          title: 'Error fetching workshops',
          description: 'Please try again later.',
          variant: 'destructive',
        });
        setIsLoading(false);
      }
    };

    fetchWorkshops();
  }, [toast]);

  useEffect(() => {
    if (activeCategory === 'all') {
      setFilteredWorkshops(workshops);
    } else if (isMobile && activeCategory === 'training') {
      // For mobile: Show both training and massage workshops when the training category is selected
      setFilteredWorkshops(workshops.filter(
        workshop => workshop.category === 'training' || workshop.category === 'massage'
      ));
    } else {
      setFilteredWorkshops(workshops.filter(workshop => workshop.category === activeCategory));
    }
  }, [activeCategory, workshops, isMobile]);

  const handleRegisterClick = (workshop: Workshop) => {
    setSelectedWorkshop(workshop);
    setOpenDialog(true);
  };

  return (
    <Layout>
      <Helmet>
        <title>Workshops | Path of the Goddess</title>
        <meta name="description" content="Discover our transformative workshops" />
      </Helmet>
      
      <section className="py-12 lg:py-16 bg-warm-sand/20">
        <div className="container px-4 mx-auto">
          <div className="mb-8">
            {/* Filter Controls - Side by Side on Desktop, Stacked on Mobile */}
            <div className={`${isMobile ? 'flex flex-col gap-4' : 'flex justify-between items-start gap-10'} mb-6`}>
              {/* Category filter toggle group */}
              <div className="w-full">
                <p className="text-sm text-chocolate/70 mb-1">Filter by type:</p>
                <div className="bg-cream-light border border-chocolate/20 rounded-md p-1 h-10 inline-flex">
                  <ToggleGroup 
                    type="single" 
                    value={activeCategory} 
                    onValueChange={(value) => value && setActiveCategory(value)} 
                    className="justify-center w-full overflow-x-auto flex-nowrap h-8 items-center"
                  >
                    <ToggleGroupItem value="all" className="text-sm data-[state=on]:bg-warm-sand/40 data-[state=on]:rounded-sm h-8 flex items-center">
                      All
                    </ToggleGroupItem>
                    <ToggleGroupItem value="workshop" className="text-sm data-[state=on]:bg-warm-sand/40 data-[state=on]:rounded-sm h-8 flex items-center">
                      Workshops
                    </ToggleGroupItem>
                    <ToggleGroupItem value="retreat" className="text-sm data-[state=on]:bg-warm-sand/40 data-[state=on]:rounded-sm h-8 flex items-center">
                      Retreats
                    </ToggleGroupItem>
                    {!isMobile && (
                      <ToggleGroupItem value="massage" className="text-sm data-[state=on]:bg-warm-sand/40 data-[state=on]:rounded-sm h-8 flex items-center">
                        Massage
                      </ToggleGroupItem>
                    )}
                    <ToggleGroupItem value="training" className="text-sm data-[state=on]:bg-warm-sand/40 data-[state=on]:rounded-sm h-8 flex items-center">
                      Trainings
                    </ToggleGroupItem>
                  </ToggleGroup>
                </div>
              </div>
              
              {/* View mode tabs */}
              <div className="w-full">
                <p className="text-sm text-chocolate/70 mb-1">View as:</p>
                <Tabs value={viewMode} onValueChange={setViewMode} className="w-full">
                  <TabsList className="bg-cream-light border border-chocolate/20 w-full justify-start h-10 p-1">
                    <TabsTrigger value="list" className="text-sm data-[state=active]:bg-warm-sand/40 flex-1">
                      List
                    </TabsTrigger>
                    <TabsTrigger value="calendar" className="text-sm data-[state=active]:bg-warm-sand/40 flex-1">
                      Calendar
                    </TabsTrigger>
                  </TabsList>
                </Tabs>
              </div>
            </div>
            
            {/* Content Area - Below the filters */}
            <Tabs value={viewMode} onValueChange={setViewMode} className="w-full">
              <TabsContent value="list" className="mt-6">
                {isLoading ? (
                  <div className="flex justify-center p-12">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-wine-red"></div>
                  </div>
                ) : filteredWorkshops.length > 0 ? (
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredWorkshops.map((workshop) => (
                      <div 
                        key={workshop.id} 
                        className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow"
                      >
                        {workshop.image_url && (
                          <img 
                            src={workshop.image_url} 
                            alt={workshop.title} 
                            className="w-full h-48 object-cover"
                          />
                        )}
                        <div className="p-6">
                          <h3 className="text-xl font-playfair text-chocolate mb-2">
                            {workshop.title}
                          </h3>
                          <div className="flex flex-col gap-1 mb-4 text-sm text-chocolate/70">
                            <p className="flex items-center gap-2">
                              <span className="font-medium">Date:</span> {workshop.date}
                              {workshop.end_date && ` to ${workshop.end_date}`}
                            </p>
                            <p className="flex items-center gap-2">
                              <span className="font-medium">Time:</span> {workshop.time}
                            </p>
                            <p className="flex items-center gap-2">
                              <span className="font-medium">Location:</span> {workshop.location}
                            </p>
                            <p className="flex items-center gap-2">
                              <span className="font-medium">Price:</span> {workshop.price}
                            </p>
                          </div>
                          <p className="text-chocolate/80 mb-4 line-clamp-3">
                            {workshop.description}
                          </p>
                          <div className="flex justify-between items-center">
                            <Button 
                              variant="outline" 
                              className="border-chocolate/40 text-chocolate hover:bg-warm-sand/20"
                              onClick={() => window.location.href = `/workshop/${workshop.id}`}
                            >
                              Learn More
                            </Button>
                            <Dialog open={openDialog && selectedWorkshop?.id === workshop.id} onOpenChange={setOpenDialog}>
                              <DialogTrigger asChild>
                                <Button 
                                  className="bg-wine-red hover:bg-wine-red/90 text-white" 
                                  onClick={() => handleRegisterClick(workshop)}
                                >
                                  Register
                                </Button>
                              </DialogTrigger>
                              <DialogContent className="sm:max-w-md">
                                {selectedWorkshop && (
                                  <RegisterForm workshop={selectedWorkshop} onClose={() => setOpenDialog(false)} />
                                )}
                              </DialogContent>
                            </Dialog>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12 bg-warm-sand/10 rounded-lg">
                    <p className="text-chocolate/70">No workshops currently available in this category.</p>
                    <p className="text-chocolate/70 mt-2">Please check another category or come back later.</p>
                  </div>
                )}
              </TabsContent>
              
              <TabsContent value="calendar" className="mt-6">
                <CalendarView 
                  workshops={filteredWorkshops} 
                  onRegisterClick={handleRegisterClick}
                />
                {selectedWorkshop && (
                  <Dialog open={openDialog} onOpenChange={setOpenDialog}>
                    <DialogContent className="sm:max-w-md">
                      <RegisterForm workshop={selectedWorkshop} onClose={() => setOpenDialog(false)} />
                    </DialogContent>
                  </Dialog>
                )}
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Workshops;
