import { motion } from 'framer-motion';
import { Star, Quote } from 'lucide-react';

interface Testimonial {
  name: string;
  location: string;
  image: string;
  quote: string;
  role: string;
}

const testimonials: Testimonial[] = [
  {
    name: 'Sarah',
    location: 'Germany',
    image: '/lovable-uploads/b8459c9d-9402-4880-9c7e-6b042bcdf875.png',
    quote: 'This training completely transformed my understanding of Tantra and myself. The depth of knowledge and the safe container created by the teachers allowed me to open up in ways I never thought possible.',
    role: 'Now teaching in Berlin',
  },
  {
    name: 'Marcus',
    location: 'Australia',
    image: '/lovable-uploads/dad97673-e7f7-47bb-b072-b97ed184960a.png',
    quote: 'The combination of theoretical knowledge and embodied practice is what sets this training apart. I left feeling fully prepared and confident to guide others on their tantric journey.',
    role: 'Retreat Facilitator',
  },
  {
    name: 'Elena',
    location: 'Netherlands',
    image: '/lovable-uploads/3161fc80-cada-4a29-8238-96e251fde805.png',
    quote: 'The teachers hold such beautiful space. Their years of experience and genuine care for each student creates an environment where true transformation happens.',
    role: 'Tantra Coach',
  },
];

const TestimonialsSection = () => {
  return (
    <motion.div
      className="py-16"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
    >
      {/* Header */}
      <div className="text-center mb-12">
        <motion.span 
          className="inline-block px-4 py-1.5 rounded-full text-xs font-display tracking-widest uppercase bg-secondary/20 text-secondary mb-4"
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          Graduate Stories
        </motion.span>
        <h3 className="text-3xl md:text-4xl font-display font-bold text-accent mb-3">
          Transformations That Speak
        </h3>
        <p className="text-accent max-w-xl mx-auto">
          Hear from those who have walked this sacred path before you
        </p>
      </div>

      {/* Testimonials Grid */}
      <div className="grid md:grid-cols-3 gap-6">
        {testimonials.map((testimonial, index) => (
          <motion.div
            key={testimonial.name}
            className="relative p-6 rounded-xl glass-panel-warm"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.15 }}
            whileHover={{ y: -4 }}
          >
            {/* Quote icon */}
            <Quote className="absolute top-4 right-4 h-8 w-8 text-accent/30" />
            
            {/* Stars */}
            <div className="flex gap-1 mb-4">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="h-4 w-4 fill-accent text-accent" />
              ))}
            </div>
            
            {/* Quote */}
            <p className="text-accent text-sm leading-relaxed mb-6 italic">
              "{testimonial.quote}"
            </p>
            
            {/* Author */}
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-accent/30">
                <img 
                  src={testimonial.image} 
                  alt={testimonial.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <h4 className="font-medium text-accent">{testimonial.name}</h4>
                <p className="text-xs text-accent/80">{testimonial.location} • {testimonial.role}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Stats bar */}
      <motion.div 
        className="mt-12 grid grid-cols-3 gap-4 p-6 rounded-xl bg-card/50 backdrop-blur-sm border border-border/30"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.3 }}
      >
        <div className="text-center">
          <span className="text-3xl font-display font-bold text-primary">500+</span>
          <p className="text-sm text-foreground/60">Graduates</p>
        </div>
        <div className="text-center border-x border-border/30">
          <span className="text-3xl font-display font-bold text-secondary">14+</span>
          <p className="text-sm text-foreground/60">Years Teaching</p>
        </div>
        <div className="text-center">
          <span className="text-3xl font-display font-bold text-accent-foreground">40+</span>
          <p className="text-sm text-foreground/60">Countries</p>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default TestimonialsSection;
