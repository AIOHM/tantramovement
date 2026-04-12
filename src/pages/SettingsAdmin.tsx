import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useToast } from '@/hooks/use-toast';
import AdminLayout from '@/components/layout/AdminLayout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Separator } from '@/components/ui/separator';
import { PlusCircle, Save, Trash2 } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { ContactInfo, LandingPageSection, SiteSettings } from '@/types/SiteSettings';

// Default values for settings
const defaultContactInfo: ContactInfo = {
  email: 'info@tantramovement.com',
  phone: '+1 (234) 567-890',
  address: 'Tantra Movement Studio, 123 Spiritual Way, Mindful City',
  instagram: 'https://instagram.com',
  facebook: 'https://facebook.com'
};

const defaultHeroSection = {
  title: 'Awaken Love, Presence & Energy Through Tantra',
  subtitle: 'Experience the profound wisdom of Tantra in our transformative workshops and private sessions',
  buttonText: 'Explore Workshops'
};

const defaultLandingSections: LandingPageSection[] = [
  {
    id: 'section1',
    title: 'Explore Our Offerings',
    subtitle: 'Discover the transformative power of our tantra programs'
  },
  {
    id: 'section2',
    title: 'Featured Workshops',
    subtitle: 'Join our most popular upcoming events'
  },
  {
    id: 'section3',
    title: 'What Our Students Say',
    subtitle: 'Read testimonials from our community'
  }
];

const defaultFeaturedSection = {
  title: 'Transform Your Relationships Through Sacred Connection',
  subtitle: '',
  content: 'Tantra is more than a practice—it\'s a path to deeper self-awareness and more fulfilling relationships. Our approach combines ancient wisdom with modern techniques to help you:',
  quote: 'The journey of Tantra begins with self-love and expands to embrace all of life.',
  bulletPoints: [
    'Cultivate presence and mindfulness in your interactions',
    'Connect more deeply with yourself and others',
    'Explore the sacred dimensions of your sexuality',
    'Heal blocks and wounds that prevent intimacy'
  ]
};

const SettingsAdmin = () => {
  const [activeTab, setActiveTab] = useState('contact');
  const [loading, setLoading] = useState(false);
  const [fetchingData, setFetchingData] = useState(true);
  const { toast } = useToast();
  
  // Initialize form with default values
  const contactForm = useForm<ContactInfo>({
    defaultValues: defaultContactInfo
  });
  
  const heroForm = useForm({
    defaultValues: defaultHeroSection
  });
  
  const featuredForm = useForm({
    defaultValues: defaultFeaturedSection
  });
  
  const [landingSections, setLandingSections] = useState<LandingPageSection[]>(defaultLandingSections);
  
  // Fetch settings from database
  useEffect(() => {
    const fetchSettings = async () => {
      setFetchingData(true);
      try {
        const { data, error } = await supabase
          .from('site_settings')
          .select('*')
          .single();
        
        if (error) {
          console.error('Error fetching settings:', error);
          // If no settings found, we'll use the defaults
          if (error.code === 'PGRST116') {
            // No rows returned - this is fine, we'll create the settings on first save
            console.log('No settings found, using defaults');
          } else {
            throw error;
          }
        }
        
        if (data) {
          // Properly cast the JSON data to SiteSettings type
          const settings = data.settings as unknown as SiteSettings;
          
          // Update contact form
          if (settings.contactInfo) {
            contactForm.reset(settings.contactInfo);
          }
          
          // Update hero form
          if (settings.heroSection) {
            heroForm.reset(settings.heroSection);
          }
          
          // Update featured section form
          if (settings.featuredSection) {
            featuredForm.reset(settings.featuredSection);
          }
          
          // Update landing sections
          if (settings.landingSections && settings.landingSections.length > 0) {
            setLandingSections(settings.landingSections);
          }
        }
      } catch (error) {
        console.error('Error loading settings:', error);
        toast({
          title: 'Error',
          description: 'Failed to load settings. Using default values.',
          variant: 'destructive'
        });
      } finally {
        setFetchingData(false);
      }
    };
    
    fetchSettings();
  }, []);
  
  // Save contact information
  const saveContactInfo = async (data: ContactInfo) => {
    setLoading(true);
    try {
      // Create a settings object that can be converted to JSON
      const settingsObj = {
        contactInfo: data,
        heroSection: heroForm.getValues(),
        landingSections: landingSections,
        featuredSection: featuredForm.getValues()
      };
      
      // Convert to JSON-compatible format
      const jsonString = JSON.stringify(settingsObj);
      const jsonObj = JSON.parse(jsonString);

      // First try to get existing settings
      const { data: existing } = await supabase.from('site_settings').select('id').limit(1).maybeSingle();
      
      let error;
      if (existing?.id) {
        // Update existing record
        const result = await supabase.from('site_settings').update({ settings: jsonObj }).eq('id', existing.id);
        error = result.error;
      } else {
        // Insert new record
        const result = await supabase.from('site_settings').insert({ settings: jsonObj });
        error = result.error;
      }
      
      if (error) {
        console.error('Supabase error:', error);
        throw error;
      }
      
      toast({
        title: 'Success',
        description: 'Contact information saved successfully',
      });
    } catch (error) {
      console.error('Error saving contact info:', error);
      toast({
        title: 'Error',
        description: 'Failed to save contact information',
        variant: 'destructive'
      });
    } finally {
      setLoading(false);
    }
  };
  
  // Save hero section
  const saveHeroSection = async (data: any) => {
    setLoading(true);
    try {
      // Create a settings object that can be converted to JSON
      const settingsObj = {
        contactInfo: contactForm.getValues(),
        heroSection: data,
        landingSections: landingSections,
        featuredSection: featuredForm.getValues()
      };
      
      // Convert to JSON-compatible format
      const jsonString = JSON.stringify(settingsObj);
      const jsonObj = JSON.parse(jsonString);

      const { data: existing } = await supabase.from('site_settings').select('id').limit(1).maybeSingle();
      
      let error;
      if (existing?.id) {
        const result = await supabase.from('site_settings').update({ settings: jsonObj }).eq('id', existing.id);
        error = result.error;
      } else {
        const result = await supabase.from('site_settings').insert({ settings: jsonObj });
        error = result.error;
      }
      
      if (error) {
        console.error('Supabase error:', error);
        throw error;
      }
      
      toast({
        title: 'Success',
        description: 'Hero section saved successfully',
      });
    } catch (error) {
      console.error('Error saving hero section:', error);
      toast({
        title: 'Error',
        description: 'Failed to save hero section',
        variant: 'destructive'
      });
    } finally {
      setLoading(false);
    }
  };
  
  // Save featured section
  const saveFeaturedSection = async (data: any) => {
    setLoading(true);
    try {
      // Create a settings object that can be converted to JSON
      const settingsObj = {
        contactInfo: contactForm.getValues(),
        heroSection: heroForm.getValues(),
        landingSections: landingSections,
        featuredSection: data
      };
      
      // Convert to JSON-compatible format
      const jsonString = JSON.stringify(settingsObj);
      const jsonObj = JSON.parse(jsonString);

      const { data: existing } = await supabase.from('site_settings').select('id').limit(1).maybeSingle();
      
      let error;
      if (existing?.id) {
        const result = await supabase.from('site_settings').update({ settings: jsonObj }).eq('id', existing.id);
        error = result.error;
      } else {
        const result = await supabase.from('site_settings').insert({ settings: jsonObj });
        error = result.error;
      }
      
      if (error) {
        console.error('Supabase error:', error);
        throw error;
      }
      
      toast({
        title: 'Success',
        description: 'Featured section saved successfully',
      });
    } catch (error) {
      console.error('Error saving featured section:', error);
      toast({
        title: 'Error',
        description: 'Failed to save featured section',
        variant: 'destructive'
      });
    } finally {
      setLoading(false);
    }
  };
  
  // Save landing sections
  const saveLandingSections = async () => {
    setLoading(true);
    try {
      // Create a settings object that can be converted to JSON
      const settingsObj = {
        contactInfo: contactForm.getValues(),
        heroSection: heroForm.getValues(),
        landingSections: landingSections,
        featuredSection: featuredForm.getValues()
      };
      
      // Convert to JSON-compatible format
      const jsonString = JSON.stringify(settingsObj);
      const jsonObj = JSON.parse(jsonString);

      const { data: existing } = await supabase.from('site_settings').select('id').limit(1).maybeSingle();
      
      let error;
      if (existing?.id) {
        const result = await supabase.from('site_settings').update({ settings: jsonObj }).eq('id', existing.id);
        error = result.error;
      } else {
        const result = await supabase.from('site_settings').insert({ settings: jsonObj });
        error = result.error;
      }
      
      if (error) {
        console.error('Supabase error:', error);
        throw error;
      }
      
      toast({
        title: 'Success',
        description: 'Landing sections saved successfully',
      });
    } catch (error) {
      console.error('Error saving landing sections:', error);
      toast({
        title: 'Error',
        description: 'Failed to save landing sections',
        variant: 'destructive'
      });
    } finally {
      setLoading(false);
    }
  };
  
  // Add a new landing section
  const addLandingSection = () => {
    const newSection: LandingPageSection = {
      id: `section${landingSections.length + 1}_${Date.now()}`,
      title: 'New Section',
      subtitle: 'Section description'
    };
    
    setLandingSections([...landingSections, newSection]);
  };
  
  // Remove a landing section
  const removeLandingSection = (id: string) => {
    setLandingSections(landingSections.filter(section => section.id !== id));
  };
  
  // Update a landing section
  const updateLandingSection = (id: string, field: string, value: string) => {
    setLandingSections(landingSections.map(section => 
      section.id === id ? { ...section, [field]: value } : section
    ));
  };
  
  return (
    <AdminLayout title="Website Settings">
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <p className="text-chocolate/70">
            Manage website settings such as contact information and page content
          </p>
        </div>
        
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="mb-6">
            <TabsTrigger value="contact">Contact Information</TabsTrigger>
            <TabsTrigger value="hero">Hero Section</TabsTrigger>
            <TabsTrigger value="sections">Landing Page Sections</TabsTrigger>
            <TabsTrigger value="featured">Featured Section</TabsTrigger>
          </TabsList>
          
          {/* Contact Information Tab */}
          <TabsContent value="contact">
            <Card>
              <CardHeader>
                <CardTitle>Contact Information</CardTitle>
                <CardDescription>
                  Update the contact information that appears on your website
                </CardDescription>
              </CardHeader>
              <CardContent>
                {fetchingData ? (
                  <div className="flex justify-center my-12">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-wine-red"></div>
                  </div>
                ) : (
                  <Form {...contactForm}>
                    <form onSubmit={contactForm.handleSubmit(saveContactInfo)} className="space-y-6">
                      <FormField
                        control={contactForm.control}
                        name="email"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Email Address</FormLabel>
                            <FormControl>
                              <Input placeholder="contact@example.com" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={contactForm.control}
                        name="phone"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Phone Number</FormLabel>
                            <FormControl>
                              <Input placeholder="+1 (234) 567-890" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={contactForm.control}
                        name="address"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Address</FormLabel>
                            <FormControl>
                              <Textarea placeholder="123 Example Street, City, Country" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <Separator className="my-4" />
                      <h3 className="text-lg font-medium mb-4">Social Media</h3>
                      
                      <FormField
                        control={contactForm.control}
                        name="instagram"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Instagram URL</FormLabel>
                            <FormControl>
                              <Input placeholder="https://instagram.com/youraccount" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={contactForm.control}
                        name="facebook"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Facebook URL</FormLabel>
                            <FormControl>
                              <Input placeholder="https://facebook.com/youraccount" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <Button 
                        type="submit" 
                        className="flex gap-2 items-center"
                        disabled={loading}
                      >
                        {loading ? (
                          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                        ) : (
                          <Save size={16} />
                        )}
                        Save Contact Information
                      </Button>
                    </form>
                  </Form>
                )}
              </CardContent>
            </Card>
          </TabsContent>
          
          {/* Hero Section Tab */}
          <TabsContent value="hero">
            <Card>
              <CardHeader>
                <CardTitle>Hero Section</CardTitle>
                <CardDescription>
                  Update the content of the main hero section on your homepage
                </CardDescription>
              </CardHeader>
              <CardContent>
                {fetchingData ? (
                  <div className="flex justify-center my-12">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-wine-red"></div>
                  </div>
                ) : (
                  <Form {...heroForm}>
                    <form onSubmit={heroForm.handleSubmit(saveHeroSection)} className="space-y-6">
                      <FormField
                        control={heroForm.control}
                        name="title"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Hero Title</FormLabel>
                            <FormControl>
                              <Input placeholder="Main headline" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={heroForm.control}
                        name="subtitle"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Hero Subtitle</FormLabel>
                            <FormControl>
                              <Textarea placeholder="Supporting text" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={heroForm.control}
                        name="buttonText"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Button Text</FormLabel>
                            <FormControl>
                              <Input placeholder="Learn More" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <Button 
                        type="submit" 
                        className="flex gap-2 items-center"
                        disabled={loading}
                      >
                        {loading ? (
                          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                        ) : (
                          <Save size={16} />
                        )}
                        Save Hero Section
                      </Button>
                    </form>
                  </Form>
                )}
              </CardContent>
            </Card>
          </TabsContent>
          
          {/* Featured Section Tab */}
          <TabsContent value="featured">
            <Card>
              <CardHeader>
                <CardTitle>Featured Section</CardTitle>
                <CardDescription>
                  Update the content of the featured section about Tantra relationships
                </CardDescription>
              </CardHeader>
              <CardContent>
                {fetchingData ? (
                  <div className="flex justify-center my-12">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-wine-red"></div>
                  </div>
                ) : (
                  <Form {...featuredForm}>
                    <form onSubmit={featuredForm.handleSubmit(saveFeaturedSection)} className="space-y-6">
                      <FormField
                        control={featuredForm.control}
                        name="title"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Section Title</FormLabel>
                            <FormControl>
                              <Input placeholder="Transform Your Relationships..." {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={featuredForm.control}
                        name="content"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Main Content</FormLabel>
                            <FormControl>
                              <Textarea 
                                placeholder="Tantra is more than a practice..." 
                                className="min-h-24"
                                {...field} 
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={featuredForm.control}
                        name="quote"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Featured Quote</FormLabel>
                            <FormControl>
                              <Input 
                                placeholder="The journey of Tantra begins with..." 
                                {...field} 
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <div className="space-y-2">
                        <Label>Bullet Points</Label>
                        <div className="space-y-3">
                          {featuredForm.watch('bulletPoints')?.map((point, index) => (
                            <div key={index} className="flex gap-2">
                              <Input
                                value={point}
                                onChange={(e) => {
                                  const newPoints = [...featuredForm.getValues('bulletPoints')];
                                  newPoints[index] = e.target.value;
                                  featuredForm.setValue('bulletPoints', newPoints);
                                }}
                                placeholder={`Bullet point ${index + 1}`}
                              />
                              <Button
                                type="button"
                                variant="ghost"
                                size="icon"
                                onClick={() => {
                                  const newPoints = featuredForm.getValues('bulletPoints').filter((_, i) => i !== index);
                                  featuredForm.setValue('bulletPoints', newPoints);
                                }}
                              >
                                <Trash2 size={16} className="text-red-500" />
                              </Button>
                            </div>
                          ))}
                          <Button
                            type="button"
                            variant="outline"
                            size="sm"
                            onClick={() => {
                              const currentPoints = featuredForm.getValues('bulletPoints') || [];
                              featuredForm.setValue('bulletPoints', [...currentPoints, 'New point']);
                            }}
                            className="flex items-center gap-1"
                          >
                            <PlusCircle size={14} />
                            Add Bullet Point
                          </Button>
                        </div>
                      </div>
                      
                      <Button 
                        type="submit" 
                        className="flex gap-2 items-center"
                        disabled={loading}
                      >
                        {loading ? (
                          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                        ) : (
                          <Save size={16} />
                        )}
                        Save Featured Section
                      </Button>
                    </form>
                  </Form>
                )}
              </CardContent>
            </Card>
          </TabsContent>
          
          {/* Landing Page Sections Tab */}
          <TabsContent value="sections">
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <h3 className="text-xl font-medium text-chocolate">
                  Landing Page Sections
                </h3>
                <Button 
                  onClick={addLandingSection} 
                  variant="outline" 
                  className="flex items-center gap-2"
                >
                  <PlusCircle size={16} />
                  Add Section
                </Button>
              </div>
              
              {fetchingData ? (
                <div className="flex justify-center my-12">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-wine-red"></div>
                </div>
              ) : (
                <div>
                  {landingSections.map((section, index) => (
                    <Card key={section.id} className="mb-6">
                      <CardHeader className="pb-2">
                        <div className="flex justify-between items-center">
                          <CardTitle className="text-lg">Section {index + 1}</CardTitle>
                          <Button 
                            variant="ghost" 
                            size="sm"
                            onClick={() => removeLandingSection(section.id)}
                            className="text-red-600 hover:text-red-800 hover:bg-red-50"
                          >
                            <Trash2 size={16} />
                          </Button>
                        </div>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="space-y-2">
                          <Label htmlFor={`section-${section.id}-title`}>Section Title</Label>
                          <Input
                            id={`section-${section.id}-title`}
                            value={section.title}
                            onChange={(e) => updateLandingSection(section.id, 'title', e.target.value)}
                          />
                        </div>
                        
                        <div className="space-y-2">
                          <Label htmlFor={`section-${section.id}-subtitle`}>Section Subtitle</Label>
                          <Input
                            id={`section-${section.id}-subtitle`}
                            value={section.subtitle || ''}
                            onChange={(e) => updateLandingSection(section.id, 'subtitle', e.target.value)}
                          />
                        </div>
                        
                        <div className="space-y-2">
                          <Label htmlFor={`section-${section.id}-content`}>Additional Content</Label>
                          <Textarea
                            id={`section-${section.id}-content`}
                            value={section.content || ''}
                            onChange={(e) => updateLandingSection(section.id, 'content', e.target.value)}
                            placeholder="Optional additional content for this section"
                          />
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                  
                  <Button 
                    onClick={saveLandingSections} 
                    className="flex gap-2 items-center"
                    disabled={loading}
                  >
                    {loading ? (
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                    ) : (
                      <Save size={16} />
                    )}
                    Save All Sections
                  </Button>
                </div>
              )}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </AdminLayout>
  );
};

export default SettingsAdmin;
