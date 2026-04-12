import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import AdminLayout from '@/components/layout/AdminLayout';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Plus, Edit, Trash2, Calendar, ExternalLink } from 'lucide-react';
import { supabase } from "@/integrations/supabase/client";
import { Workshop } from '@/types/Workshop';
import { useToast } from "@/hooks/use-toast";
import RegisterForm from '@/components/workshops/RegisterForm';
import WorkshopForm from '@/components/workshops/WorkshopForm';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from '@/components/ui/alert-dialog';

const WorkshopAdmin = () => {
  const [workshops, setWorkshops] = useState<Workshop[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedWorkshop, setSelectedWorkshop] = useState<Workshop | null>(null);
  const [isBookDialogOpen, setIsBookDialogOpen] = useState(false);
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [workshopToDelete, setWorkshopToDelete] = useState<string | null>(null);
  
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => { fetchWorkshops(); }, []);

  const fetchWorkshops = async () => {
    try {
      setIsLoading(true);
      const { data, error } = await supabase.from('workshops').select('*').order('date', { ascending: true });
      if (error) throw error;
      if (data) setWorkshops(data as Workshop[]);
    } catch (error) {
      console.error('Error fetching workshops:', error);
      toast({ title: 'Error', description: 'Failed to fetch workshops.', variant: 'destructive' });
    } finally {
      setIsLoading(false);
    }
  };

  const handleEditWorkshop = (workshop: Workshop) => {
    setSelectedWorkshop(workshop);
    setIsEditDialogOpen(true);
  };

  const handleDeleteWorkshop = async (id: string) => {
    try {
      const { error } = await supabase.from('workshops').delete().eq('id', id);
      if (error) throw error;
      fetchWorkshops();
      toast({ title: 'Workshop Deleted', description: 'Workshop has been successfully deleted.' });
    } catch (error: any) {
      console.error('Error deleting workshop:', error);
      toast({ title: 'Error', description: error.message || 'Failed to delete workshop.', variant: 'destructive' });
    } finally {
      setIsDeleteDialogOpen(false);
      setWorkshopToDelete(null);
    }
  };

  const confirmDeleteWorkshop = (id: string) => {
    setWorkshopToDelete(id);
    setIsDeleteDialogOpen(true);
  };

  const handleBookWorkshop = (workshop: Workshop) => {
    setSelectedWorkshop(workshop);
    setIsBookDialogOpen(true);
  };

  return (
    <AdminLayout title="Workshop Management">
      <div className="mb-6 flex justify-between items-center">
        <h3 className="text-lg font-medium text-foreground">Workshops List</h3>
        <Button className="bg-primary hover:bg-primary/90 text-primary-foreground" onClick={() => { setSelectedWorkshop(null); setIsCreateDialogOpen(true); }}>
          <Plus className="h-4 w-4 mr-1" /> Add New Workshop
        </Button>
      </div>

      {isLoading ? (
        <div className="text-center py-8">Loading workshops...</div>
      ) : (
        <div className="bg-card rounded-lg shadow overflow-hidden">
          <table className="min-w-full divide-y divide-border">
            <thead className="bg-muted/30">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase">Title</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase">Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase">Location</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase">Price</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase">Category</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-card divide-y divide-border">
              {workshops.length > 0 ? workshops.map((workshop) => (
                <tr key={workshop.id}>
                  <td className="px-6 py-4 whitespace-nowrap font-medium text-foreground">{workshop.title}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-muted-foreground">
                    {workshop.date}{workshop.end_date ? ` - ${workshop.end_date}` : ''}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-muted-foreground">{workshop.location}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-muted-foreground">{workshop.price}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-secondary/20 text-secondary-foreground">{workshop.category}</span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex space-x-2">
                      <Button variant="outline" size="sm" onClick={() => handleEditWorkshop(workshop)}><Edit className="h-4 w-4" /></Button>
                      <Button variant="outline" size="sm" onClick={() => confirmDeleteWorkshop(workshop.id)}><Trash2 className="h-4 w-4" /></Button>
                      <Button variant="outline" size="sm" className="text-white border-secondary hover:bg-secondary/10" onClick={() => handleBookWorkshop(workshop)}>
                        <Calendar className="h-4 w-4 mr-1" /> Book
                      </Button>
                      <Button variant="outline" size="sm" asChild>
                        <a href={`/workshop/${workshop.id}`} target="_blank" rel="noopener noreferrer"><ExternalLink className="h-4 w-4" /></a>
                      </Button>
                    </div>
                  </td>
                </tr>
              )) : (
                <tr><td colSpan={6} className="px-6 py-4 text-center text-sm text-muted-foreground">No workshops found.</td></tr>
              )}
            </tbody>
          </table>
        </div>
      )}

      <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
        <DialogContent className="sm:max-w-[700px]">
          <DialogHeader>
            <DialogTitle className="text-2xl font-display text-foreground">Create New Workshop</DialogTitle>
            <DialogDescription className="text-muted-foreground">Fill out the form to create a new workshop</DialogDescription>
          </DialogHeader>
          <WorkshopForm onClose={() => setIsCreateDialogOpen(false)} onSuccess={fetchWorkshops} />
        </DialogContent>
      </Dialog>

      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="sm:max-w-[700px]">
          <DialogHeader>
            <DialogTitle className="text-2xl font-display text-foreground">Edit Workshop</DialogTitle>
            <DialogDescription className="text-muted-foreground">Update the workshop details</DialogDescription>
          </DialogHeader>
          {selectedWorkshop && <WorkshopForm workshop={selectedWorkshop} onClose={() => setIsEditDialogOpen(false)} onSuccess={fetchWorkshops} />}
        </DialogContent>
      </Dialog>

      <Dialog open={isBookDialogOpen} onOpenChange={setIsBookDialogOpen}>
        <DialogContent className="sm:max-w-[500px]">
          {selectedWorkshop && <RegisterForm workshop={selectedWorkshop} onClose={() => setIsBookDialogOpen(false)} />}
        </DialogContent>
      </Dialog>

      <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>This action cannot be undone.</AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={() => workshopToDelete && handleDeleteWorkshop(workshopToDelete)} className="bg-destructive hover:bg-destructive/90">Delete</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </AdminLayout>
  );
};

export default WorkshopAdmin;
