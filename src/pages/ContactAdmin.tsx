
import { useEffect, useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import AdminLayout from '@/components/layout/AdminLayout';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Download, Mail, RefreshCw, Trash2 } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';

interface ContactMessage {
  id: string;
  name: string;
  email: string;
  message: string;
  created_at: string;
}

interface NewsletterSubscriber {
  id: string;
  email: string;
  created_at: string;
}

const ContactAdmin = () => {
  const [activeTab, setActiveTab] = useState('messages');
  const [messages, setMessages] = useState<ContactMessage[]>([]);
  const [subscribers, setSubscribers] = useState<NewsletterSubscriber[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  const fetchData = async () => {
    setLoading(true);
    try {
      const { data: messagesData } = await supabase.from('contact_messages').select('*').order('created_at', { ascending: false });
      setMessages(messagesData || []);
      
      const { data: subscribersData } = await supabase.from('newsletter_subscribers').select('*').order('created_at', { ascending: false });
      setSubscribers(subscribersData || []);
    } catch (error) {
      console.error('Error fetching data:', error);
      toast({ title: 'Error', description: 'Failed to load data.', variant: 'destructive' });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchData(); }, []);

  const deleteMessage = async (id: string) => {
    const { error } = await supabase.from('contact_messages').delete().eq('id', id);
    if (!error) {
      setMessages(messages.filter(m => m.id !== id));
      toast({ title: 'Success', description: 'Message deleted.' });
    }
  };

  const deleteSubscriber = async (id: string) => {
    const { error } = await supabase.from('newsletter_subscribers').delete().eq('id', id);
    if (!error) {
      setSubscribers(subscribers.filter(s => s.id !== id));
      toast({ title: 'Success', description: 'Subscriber removed.' });
    }
  };

  const formatDate = (dateString: string) => new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' }).format(new Date(dateString));

  return (
    <AdminLayout title="Contact Management">
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <p className="text-muted-foreground">Manage contact messages and newsletter subscribers</p>
          <Button variant="outline" onClick={fetchData}><RefreshCw size={16} className="mr-2" /> Refresh</Button>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="mb-6">
            <TabsTrigger value="messages"><Mail size={16} className="mr-2" /> Messages</TabsTrigger>
            <TabsTrigger value="subscribers">Subscribers</TabsTrigger>
          </TabsList>

          <TabsContent value="messages">
            <Table>
              <TableCaption>{messages.length} messages</TableCaption>
              <TableHeader>
                <TableRow>
                  <TableHead>Date</TableHead>
                  <TableHead>Name</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Message</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {loading ? (
                  <TableRow><TableCell colSpan={5} className="text-center py-10">Loading...</TableCell></TableRow>
                ) : messages.map(msg => (
                  <TableRow key={msg.id}>
                    <TableCell>{formatDate(msg.created_at)}</TableCell>
                    <TableCell>{msg.name}</TableCell>
                    <TableCell><a href={`mailto:${msg.email}`} className="text-primary hover:underline">{msg.email}</a></TableCell>
                    <TableCell className="max-w-xs truncate">{msg.message}</TableCell>
                    <TableCell className="text-right">
                      <Button variant="ghost" size="sm" onClick={() => deleteMessage(msg.id)} className="text-destructive"><Trash2 size={16} /></Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TabsContent>

          <TabsContent value="subscribers">
            <Table>
              <TableCaption>{subscribers.length} subscribers</TableCaption>
              <TableHeader>
                <TableRow>
                  <TableHead>Date</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {loading ? (
                  <TableRow><TableCell colSpan={3} className="text-center py-10">Loading...</TableCell></TableRow>
                ) : subscribers.map(sub => (
                  <TableRow key={sub.id}>
                    <TableCell>{formatDate(sub.created_at)}</TableCell>
                    <TableCell><a href={`mailto:${sub.email}`} className="text-primary hover:underline">{sub.email}</a></TableCell>
                    <TableCell className="text-right">
                      <Button variant="ghost" size="sm" onClick={() => deleteSubscriber(sub.id)} className="text-destructive"><Trash2 size={16} /></Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TabsContent>
        </Tabs>
      </div>
    </AdminLayout>
  );
};

export default ContactAdmin;
