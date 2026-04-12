import { useEffect, useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import AdminLayout from '@/components/layout/AdminLayout';
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { RefreshCw, Trash2, Phone, Mail, MessageSquare } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';

interface ConsultationRequest {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  timezone: string | null;
  message: string | null;
  status: string;
  created_at: string;
}

const statusOptions = [
  { value: 'pending', label: 'Pending', color: 'bg-yellow-500/20 text-yellow-700 border-yellow-500/30' },
  { value: 'contacted', label: 'Contacted', color: 'bg-blue-500/20 text-blue-700 border-blue-500/30' },
  { value: 'scheduled', label: 'Scheduled', color: 'bg-green-500/20 text-green-700 border-green-500/30' },
];

const ConsultationAdmin = () => {
  const [requests, setRequests] = useState<ConsultationRequest[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  const fetchRequests = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('consultation_requests')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      setRequests(data || []);
    } catch (error) {
      console.error('Error fetching requests:', error);
      toast({ title: 'Error', description: 'Failed to load consultation requests.', variant: 'destructive' });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchRequests(); }, []);

  const updateStatus = async (id: string, status: string) => {
    const { error } = await supabase
      .from('consultation_requests')
      .update({ status })
      .eq('id', id);
    
    if (!error) {
      setRequests(requests.map(r => r.id === id ? { ...r, status } : r));
      toast({ title: 'Status Updated', description: `Request marked as ${status}.` });
    }
  };

  const deleteRequest = async (id: string) => {
    const { error } = await supabase.from('consultation_requests').delete().eq('id', id);
    if (!error) {
      setRequests(requests.filter(r => r.id !== id));
      toast({ title: 'Deleted', description: 'Request removed.' });
    }
  };

  const formatDate = (dateString: string) => 
    new Intl.DateTimeFormat('en-US', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric', 
      hour: '2-digit', 
      minute: '2-digit' 
    }).format(new Date(dateString));

  const getStatusBadge = (status: string) => {
    const option = statusOptions.find(o => o.value === status) || statusOptions[0];
    return <Badge variant="outline" className={option.color}>{option.label}</Badge>;
  };

  return (
    <AdminLayout title="Consultation Requests">
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <p className="text-muted-foreground">
            Manage discovery call requests from prospective students
          </p>
          <Button variant="outline" onClick={fetchRequests}>
            <RefreshCw size={16} className="mr-2" /> Refresh
          </Button>
        </div>

        <Table>
          <TableCaption>{requests.length} consultation requests</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead>Date</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Contact</TableHead>
              <TableHead>Timezone</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell colSpan={6} className="text-center py-10">Loading...</TableCell>
              </TableRow>
            ) : requests.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} className="text-center py-10 text-muted-foreground">
                  No consultation requests yet.
                </TableCell>
              </TableRow>
            ) : requests.map(req => (
              <TableRow key={req.id}>
                <TableCell className="whitespace-nowrap">{formatDate(req.created_at)}</TableCell>
                <TableCell className="font-medium">{req.name}</TableCell>
                <TableCell>
                  <div className="flex flex-col gap-1">
                    <a href={`mailto:${req.email}`} className="text-primary hover:underline flex items-center gap-1">
                      <Mail size={14} /> {req.email}
                    </a>
                    {req.phone && (
                      <a href={`tel:${req.phone}`} className="text-muted-foreground hover:text-foreground flex items-center gap-1">
                        <Phone size={14} /> {req.phone}
                      </a>
                    )}
                  </div>
                </TableCell>
                <TableCell>{req.timezone || '-'}</TableCell>
                <TableCell>
                  <Select value={req.status} onValueChange={(value) => updateStatus(req.id, value)}>
                    <SelectTrigger className="w-32">
                      <SelectValue>{getStatusBadge(req.status)}</SelectValue>
                    </SelectTrigger>
                    <SelectContent>
                      {statusOptions.map(option => (
                        <SelectItem key={option.value} value={option.value}>
                          {option.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end gap-2">
                    {req.message && (
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button variant="ghost" size="sm">
                            <MessageSquare size={16} />
                          </Button>
                        </DialogTrigger>
                        <DialogContent>
                          <DialogHeader>
                            <DialogTitle>Message from {req.name}</DialogTitle>
                            <DialogDescription className="pt-4 whitespace-pre-wrap">
                              {req.message}
                            </DialogDescription>
                          </DialogHeader>
                        </DialogContent>
                      </Dialog>
                    )}
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      onClick={() => deleteRequest(req.id)} 
                      className="text-destructive hover:text-destructive"
                    >
                      <Trash2 size={16} />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </AdminLayout>
  );
};

export default ConsultationAdmin;
