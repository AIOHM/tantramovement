import React, { useState } from 'react';
import { format, startOfToday, isWithinInterval, isSameDay, parseISO } from 'date-fns';
import { Calendar as CalendarIcon, Clock, MapPin, Users, DollarSign } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Workshop } from '@/types/Workshop';
import { Calendar } from '@/components/ui/calendar';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import RegisterForm from './RegisterForm';

interface CalendarViewProps {
  workshops: Workshop[];
  onRegisterClick: (workshop: Workshop) => void;
}

const CalendarView: React.FC<CalendarViewProps> = ({ workshops, onRegisterClick }) => {
  const today = startOfToday();
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(today);
  const [selectedWorkshop, setSelectedWorkshop] = useState<Workshop | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  // Get workshops for the selected date
  const selectedDateWorkshops = workshops.filter(workshop => {
    const startDate = parseISO(workshop.date);
    
    // If workshop has an end date, check if selected date is within the range
    if (workshop.end_date) {
      const endDate = parseISO(workshop.end_date);
      return selectedDate && isWithinInterval(selectedDate, { start: startDate, end: endDate });
    }
    
    // Otherwise, check if selected date is the same as workshop date
    return selectedDate && isSameDay(startDate, selectedDate);
  });

  // Function to determine if a date has a workshop
  const hasWorkshopOnDate = (date: Date) => {
    return workshops.some(workshop => {
      const startDate = parseISO(workshop.date);
      
      if (workshop.end_date) {
        const endDate = parseISO(workshop.end_date);
        return isWithinInterval(date, { start: startDate, end: endDate });
      }
      
      return isSameDay(startDate, date);
    });
  };

  // Get all dates that have workshops for modifiers
  const workshopDates = workshops.reduce((dates: Date[], workshop) => {
    const startDate = parseISO(workshop.date);
    dates.push(startDate);
    
    if (workshop.end_date) {
      // For multi-day events, add all dates in the range
      const endDate = parseISO(workshop.end_date);
      let currentDate = new Date(startDate);
      
      while (currentDate <= endDate) {
        dates.push(new Date(currentDate));
        currentDate.setDate(currentDate.getDate() + 1);
      }
    }
    
    return dates;
  }, []);

  const handleRegisterClick = (workshop: Workshop) => {
    onRegisterClick(workshop);
  };

  return (
    <div className="flex flex-col md:flex-row gap-8 w-full">
      {/* Calendar Section */}
      <div className="flex-1 md:max-w-xs">
        <div className="glass-panel p-4 rounded-lg">
          <h3 className="text-xl font-playfair font-medium text-chocolate mb-4 flex items-center">
            <CalendarIcon className="mr-2 h-5 w-5 text-wine-red" />
            Workshop Calendar
          </h3>
          <Calendar
            mode="single"
            selected={selectedDate}
            onSelect={setSelectedDate}
            className="rounded-md"
            modifiers={{
              workshop: workshopDates
            }}
            modifiersClassNames={{
              workshop: "bg-deep-gold/20 font-semibold",
              selected: "bg-wine-red text-white hover:bg-wine-red focus:bg-wine-red"
            }}
          />
          <div className="mt-3 flex items-center text-sm text-chocolate/70">
            <div className="w-3 h-3 rounded-full bg-deep-gold/20 mr-2"></div>
            <span>Dates with events</span>
          </div>
        </div>
      </div>

      {/* Workshop Details Section */}
      <div className="flex-1">
        <div className="glass-panel p-6 rounded-lg h-full">
          {selectedDate && (
            <h3 className="text-xl font-playfair font-medium text-chocolate mb-4">
              Workshops on {format(selectedDate, "MMMM d, yyyy")}
            </h3>
          )}

          {selectedDateWorkshops.length > 0 ? (
            <div className="space-y-6">
              {selectedDateWorkshops.map((workshop) => (
                <div key={workshop.id} className="bg-white/40 rounded-lg p-5 transition-all hover:shadow-md">
                  <div className="flex flex-col md:flex-row md:items-center justify-between mb-3">
                    <h4 className="text-lg font-medium text-wine-red">{workshop.title}</h4>
                    <span className="text-deep-gold text-sm font-medium px-3 py-1 bg-deep-gold/10 rounded-full">
                      {workshop.category.charAt(0).toUpperCase() + workshop.category.slice(1)}
                    </span>
                  </div>
                  
                  <p className="text-chocolate/80 mb-4">{workshop.description}</p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <div className="flex items-center text-chocolate/70">
                      <Clock className="h-4 w-4 mr-2 text-deep-gold" />
                      <span>{workshop.time}</span>
                    </div>
                    <div className="flex items-center text-chocolate/70">
                      <MapPin className="h-4 w-4 mr-2 text-deep-gold" />
                      <span>{workshop.location}</span>
                    </div>
                    <div className="flex items-center text-chocolate/70">
                      <Users className="h-4 w-4 mr-2 text-deep-gold" />
                      <span>{workshop.capacity}</span>
                    </div>
                    <div className="flex items-center text-chocolate/70">
                      <DollarSign className="h-4 w-4 mr-2 text-deep-gold" />
                      <span>{workshop.price}</span>
                    </div>
                  </div>
                  
                  {workshop.end_date && (
                    <div className="mt-3 text-sm text-wine-red bg-wine-red/5 px-3 py-1.5 rounded-md inline-block">
                      Multi-day event: {format(parseISO(workshop.date), "MMM d")} - {format(parseISO(workshop.end_date), "MMM d, yyyy")}
                    </div>
                  )}

                  <div className="mt-5">
                    <Button 
                      className="bg-wine-red hover:bg-wine-red/90 text-white"
                      onClick={() => handleRegisterClick(workshop)}
                    >
                      Register for this Workshop
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-10 text-center">
              <div className="w-16 h-16 bg-warm-sand/40 rounded-full flex items-center justify-center mb-4">
                <CalendarIcon className="h-8 w-8 text-chocolate/40" />
              </div>
              <h4 className="text-lg font-medium text-chocolate mb-2">No Workshops Scheduled</h4>
              <p className="text-chocolate/60 max-w-md">
                There are no workshops scheduled for this date. Please select a highlighted date to view available workshops.
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Registration Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-[500px]">
          {selectedWorkshop && (
            <RegisterForm 
              workshop={selectedWorkshop} 
              onClose={() => setIsDialogOpen(false)} 
            />
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default CalendarView;
