
import { useState, useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';
import AdminLayout from '@/components/layout/AdminLayout';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { RefreshCw, Clock, MousePointer, Layout } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { supabase } from "@/integrations/supabase/client";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, LineChart, Line, PieChart, Pie, Cell } from 'recharts';

// Analytics data types matching database schema
interface PageView {
  page_path: string;
  created_at: string;
  user_agent?: string | null;
  referrer?: string | null;
}

interface ClickEvent {
  event_name: string;
  page_path: string | null;
  event_data: any;
  created_at: string;
}

interface TimeSpent {
  page_path: string;
  time_spent: number;
}

interface PageStats {
  name: string;
  views: number;
  clicks: number;
  avgTimeSeconds: number;
}

interface DeviceStats {
  name: string;
  value: number;
}

const COLORS = ['hsl(345, 55%, 28%)', 'hsl(18, 55%, 55%)', 'hsl(15, 45%, 72%)', 'hsl(32, 25%, 88%)', 'hsl(20, 15%, 20%)'];

const AnalyticsAdmin = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [pageViews, setPageViews] = useState<PageView[]>([]);
  const [clickEvents, setClickEvents] = useState<ClickEvent[]>([]);
  const [timeSpent, setTimeSpent] = useState<TimeSpent[]>([]);
  const [loading, setLoading] = useState(true);
  const [pageStats, setPageStats] = useState<PageStats[]>([]);
  const [deviceStats, setDeviceStats] = useState<DeviceStats[]>([]);
  const [dailyViews, setDailyViews] = useState<any[]>([]);
  const { toast } = useToast();

  const fetchAnalyticsData = async () => {
    setLoading(true);
    try {
      const { data: viewsData, error: viewsError } = await supabase
        .from('analytics_page_views')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (viewsError) throw viewsError;
      setPageViews(viewsData || []);
      
      const { data: eventsData, error: eventsError } = await supabase
        .from('analytics_events')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (eventsError) throw eventsError;
      setClickEvents(eventsData || []);
      
      const { data: timeData, error: timeError } = await supabase
        .from('analytics_time_spent')
        .select('*');
      
      if (timeError) throw timeError;
      setTimeSpent(timeData || []);

      processDataForCharts(viewsData || [], eventsData || [], timeData || []);
      
    } catch (error) {
      console.error('Error fetching analytics data:', error);
      toast({
        title: 'Error',
        description: 'Failed to load analytics data',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const processDataForCharts = (
    views: PageView[], 
    clicks: ClickEvent[], 
    times: TimeSpent[]
  ) => {
    const pageMap = new Map<string, PageStats>();
    
    views.forEach(view => {
      const path = view.page_path;
      if (!pageMap.has(path)) {
        pageMap.set(path, { name: formatPagePath(path), views: 0, clicks: 0, avgTimeSeconds: 0 });
      }
      pageMap.get(path)!.views += 1;
    });
    
    clicks.forEach(click => {
      const path = click.page_path || '/';
      if (!pageMap.has(path)) {
        pageMap.set(path, { name: formatPagePath(path), views: 0, clicks: 0, avgTimeSeconds: 0 });
      }
      pageMap.get(path)!.clicks += 1;
    });
    
    times.forEach(time => {
      const path = time.page_path;
      if (pageMap.has(path)) {
        const timesForPage = times.filter(t => t.page_path === path);
        const totalTime = timesForPage.reduce((sum, t) => sum + t.time_spent, 0);
        pageMap.get(path)!.avgTimeSeconds = Math.round(totalTime / timesForPage.length);
      }
    });
    
    setPageStats(Array.from(pageMap.values()).sort((a, b) => b.views - a.views).slice(0, 10));
    
    const deviceCounts = new Map<string, number>();
    views.forEach(view => {
      const isMobile = view.user_agent?.includes('Mobile') ? 'mobile' : 'desktop';
      deviceCounts.set(isMobile, (deviceCounts.get(isMobile) || 0) + 1);
    });
    
    setDeviceStats(Array.from(deviceCounts.entries()).map(([name, value]) => ({
      name: name.charAt(0).toUpperCase() + name.slice(1), value
    })));
    
    const now = new Date();
    const last7Days = Array.from({ length: 7 }, (_, i) => {
      const date = new Date();
      date.setDate(now.getDate() - i);
      return date.toISOString().split('T')[0];
    }).reverse();
    
    setDailyViews(last7Days.map(date => ({
      date: formatDate(date),
      views: views.filter(view => new Date(view.created_at).toISOString().split('T')[0] === date).length
    })));
  };

  const formatPagePath = (path: string): string => path === '/' ? 'Home' : path.charAt(1).toUpperCase() + path.slice(2).replace(/-/g, ' ');
  const formatDate = (dateString: string): string => new Date(dateString).toLocaleDateString('en-US', { month: 'short', day: 'numeric' });

  useEffect(() => { fetchAnalyticsData(); }, []);

  return (
    <AdminLayout title="Website Analytics">
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <p className="text-muted-foreground">Track user engagement across your website</p>
          <Button variant="outline" className="flex items-center gap-2" onClick={fetchAnalyticsData}>
            <RefreshCw size={16} /> Refresh Data
          </Button>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="mb-6">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="pages">Page Analysis</TabsTrigger>
          </TabsList>
          
          <TabsContent value="overview">
            {loading ? (
              <div className="flex justify-center my-12">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
              </div>
            ) : (
              <>
                <div className="grid gap-4 md:grid-cols-3 mb-6">
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-lg flex items-center gap-2"><Layout size={18} className="text-primary" /> Page Views</CardTitle>
                    </CardHeader>
                    <CardContent><p className="text-3xl font-bold">{pageViews.length}</p></CardContent>
                  </Card>
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-lg flex items-center gap-2"><MousePointer size={18} className="text-primary" /> Interactions</CardTitle>
                    </CardHeader>
                    <CardContent><p className="text-3xl font-bold">{clickEvents.length}</p></CardContent>
                  </Card>
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-lg flex items-center gap-2"><Clock size={18} className="text-primary" /> Avg Time</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-3xl font-bold">
                        {timeSpent.length > 0 ? Math.round(timeSpent.reduce((sum, t) => sum + t.time_spent, 0) / timeSpent.length) : 0}s
                      </p>
                    </CardContent>
                  </Card>
                </div>
                
                <div className="grid gap-6 md:grid-cols-2">
                  <Card>
                    <CardHeader><CardTitle>Daily Page Views (Last 7 Days)</CardTitle></CardHeader>
                    <CardContent>
                      <div className="h-[300px]">
                        <ChartContainer config={{ growth: {}, neutral: {} }}>
                          <LineChart data={dailyViews}>
                            <XAxis dataKey="date" />
                            <YAxis />
                            <Tooltip content={<ChartTooltipContent />} />
                            <Line type="monotone" dataKey="views" name="Views" stroke="hsl(345, 55%, 28%)" activeDot={{ r: 8 }} />
                          </LineChart>
                        </ChartContainer>
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardHeader><CardTitle>Device Types</CardTitle></CardHeader>
                    <CardContent>
                      <div className="h-[300px]">
                        <ChartContainer config={{ desktop: { color: COLORS[0] }, mobile: { color: COLORS[1] } }}>
                          <PieChart>
                            <Pie data={deviceStats} cx="50%" cy="50%" outerRadius={80} fill="#8884d8" dataKey="value"
                              label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}>
                              {deviceStats.map((_, index) => <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />)}
                            </Pie>
                            <Tooltip content={<ChartTooltipContent />} />
                          </PieChart>
                        </ChartContainer>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </>
            )}
          </TabsContent>
          
          <TabsContent value="pages">
            {loading ? (
              <div className="flex justify-center my-12">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
              </div>
            ) : (
              <Card>
                <CardHeader><CardTitle>Page Performance</CardTitle></CardHeader>
                <CardContent>
                  <div className="h-[400px]">
                    <ChartContainer config={{ views: { color: COLORS[0] }, clicks: { color: COLORS[1] } }}>
                      <BarChart data={pageStats} layout="vertical" margin={{ left: 100 }}>
                        <XAxis type="number" />
                        <YAxis type="category" dataKey="name" width={100} />
                        <Tooltip content={<ChartTooltipContent />} />
                        <Legend />
                        <Bar dataKey="views" name="Views" fill={COLORS[0]} />
                        <Bar dataKey="clicks" name="Clicks" fill={COLORS[1]} />
                      </BarChart>
                    </ChartContainer>
                  </div>
                </CardContent>
              </Card>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </AdminLayout>
  );
};

export default AnalyticsAdmin;
