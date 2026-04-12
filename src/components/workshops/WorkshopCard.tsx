import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Calendar, MapPin, Clock, Users } from 'lucide-react';
import { format } from 'date-fns';
import { Button } from '@/components/ui/button';

interface WorkshopCardProps {
  workshop: {
    id: string;
    title: string;
    date: string;
    end_date?: string;
    time?: string;
    location?: string;
    price?: string;
    image_url?: string;
    category: string;
    capacity?: string;
    description?: string;
  };
  index: number;
  onRegister: () => void;
}

const WorkshopCard = ({ workshop, index, onRegister }: WorkshopCardProps) => {
  const categoryColors: Record<string, string> = {
    workshop: 'from-primary/80 to-primary',
    retreat: 'from-secondary/80 to-secondary',
    training: 'from-accent/80 to-accent',
    massage: 'from-rose-gold/80 to-rose-gold',
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ 
        delay: index * 0.1, 
        duration: 0.6,
        ease: [0.22, 1, 0.36, 1]
      }}
      whileHover={{ y: -8 }}
      className="group relative"
    >
      <div className="relative overflow-hidden rounded-2xl bg-card backdrop-blur-lg border border-border/50 shadow-lg transition-all duration-500 group-hover:shadow-2xl group-hover:border-primary/30">
        {/* Glow effect on hover */}
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-secondary/5" />
        </div>

        {/* Image container */}
        <div className="relative h-56 overflow-hidden">
          <motion.div
            className="absolute inset-0"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.6 }}
          >
            <img
              src={workshop.image_url || '/placeholder.svg'}
              alt={workshop.title}
              className="w-full h-full object-cover"
            />
          </motion.div>
          
          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
          
          {/* Category badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.1 + 0.3 }}
            className={`absolute top-4 left-4 px-3 py-1 rounded-full text-xs font-medium text-white bg-gradient-to-r ${categoryColors[workshop.category] || 'from-primary to-primary'}`}
          >
            {workshop.category}
          </motion.div>

          {/* Price badge */}
          {workshop.price && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 + 0.4 }}
              className="absolute top-4 right-4 px-3 py-1 rounded-full text-sm font-bold text-white bg-black/50 backdrop-blur-sm border border-white/20"
            >
              {workshop.price}
            </motion.div>
          )}
        </div>

        {/* Content */}
        <div className="p-6 space-y-4">
          <h3 className="text-xl font-display font-semibold text-foreground group-hover:text-primary transition-colors duration-300">
            {workshop.title}
          </h3>

          <div className="space-y-2 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4 text-primary" />
              <span>
                {format(new Date(workshop.date), 'MMM d, yyyy')}
                {workshop.end_date && ` - ${format(new Date(workshop.end_date), 'MMM d, yyyy')}`}
              </span>
            </div>
            
            {workshop.time && (
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-secondary" />
                <span>{workshop.time}</span>
              </div>
            )}
            
            {workshop.location && (
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-accent" />
                <span>{workshop.location}</span>
              </div>
            )}

            {workshop.capacity && (
              <div className="flex items-center gap-2">
                <Users className="w-4 h-4 text-rose-gold" />
                <span>{workshop.capacity}</span>
              </div>
            )}
          </div>

          {/* Actions */}
          <div className="flex gap-3 pt-2">
            <Link to={`/workshops/${workshop.id}`} className="flex-1">
              <Button variant="outline" className="w-full group-hover:border-primary/50 transition-colors">
                Learn More
              </Button>
            </Link>
            <Button onClick={onRegister} variant="premium" className="flex-1">
              Register
            </Button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default WorkshopCard;
