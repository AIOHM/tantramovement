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
      className="py-4"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
    >
      <div className="rounded-[2rem] border border-white/10 bg-white/[0.05] p-6 backdrop-blur-sm md:p-10">
        <div className="mb-12 text-center">
          <motion.span 
            className="mb-4 inline-block rounded-full bg-[#D8A897]/20 px-4 py-1.5 text-xs font-display uppercase tracking-widest text-[#F1DDD4]"
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            Graduate Stories
          </motion.span>
          <h3 className="mb-3 text-3xl font-display font-bold text-white md:text-4xl">
            Transformations That Speak
          </h3>
          <p className="mx-auto max-w-2xl text-white/75">
            Real voices from graduates who came for depth, safety, and a training they could actually embody after the final week.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.name}
              className="relative rounded-[1.5rem] border border-white/40 bg-[#f2ddd5] p-6 text-left shadow-[0_22px_55px_rgba(29,10,36,0.1)]"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.15 }}
              whileHover={{ y: -4 }}
            >
              <Quote className="absolute right-5 top-5 h-8 w-8 text-[#7b5367]/30" />

              <div className="mb-4 flex gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-4 w-4 fill-[#D8A897] text-[#D8A897]" />
                ))}
              </div>

              <p className="mb-6 text-sm leading-relaxed text-[#38213d] italic">
                "{testimonial.quote}"
              </p>

              <div className="flex items-center gap-3">
                <div className="h-12 w-12 overflow-hidden rounded-full border-2 border-[#7b5367]/20">
                  <img 
                    src={testimonial.image} 
                    alt={testimonial.name}
                    className="h-full w-full object-cover"
                  />
                </div>
                <div>
                  <h4 className="font-medium text-[#38213d]">{testimonial.name}</h4>
                  <p className="text-xs text-[#765163]">{testimonial.location} • {testimonial.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div 
          className="mt-10 grid gap-4 md:grid-cols-4"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
        >
          {[
            { value: '500+', label: 'Graduates' },
            { value: '14+', label: 'Years teaching' },
            { value: '40+', label: 'Countries represented' },
            { value: '12 max', label: 'Students per cohort' },
          ].map((stat) => (
            <div
              key={stat.label}
              className="rounded-2xl border border-white/10 bg-[#2a1431]/50 p-5 text-center"
            >
              <span className="text-3xl font-display font-bold text-[#F2DDD4]">{stat.value}</span>
              <p className="mt-2 text-sm text-white/70">{stat.label}</p>
            </div>
          ))}
        </motion.div>
      </div>
    </motion.div>
  );
};

export default TestimonialsSection;
