import { motion } from 'framer-motion';
import { Calendar, MessageCircle, CheckCircle, Sparkles } from 'lucide-react';

const steps = [
  {
    number: '01',
    icon: Calendar,
    title: 'Book Discovery Call',
    description: 'Fill out the form below and choose a time that works for you',
  },
  {
    number: '02',
    icon: MessageCircle,
    title: '15-Min Conversation',
    description: 'We\'ll connect via video call to explore your questions and intentions',
  },
  {
    number: '03',
    icon: CheckCircle,
    title: 'Mutual Decision',
    description: 'Together we\'ll feel into whether this training is the right fit',
  },
  {
    number: '04',
    icon: Sparkles,
    title: 'Secure Your Spot',
    description: 'If it feels aligned, we\'ll guide you through the enrollment process',
  },
];

const ApplicationProcess = () => {
  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="font-display text-3xl md:text-4xl text-foreground mb-4">
            Your Path to Teaching Tantra
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            A simple, supportive process designed to honor your journey.
          </p>
        </motion.div>

        {/* Timeline */}
        <div className="relative max-w-4xl mx-auto">
          {/* Connecting line */}
          <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-primary/20 via-primary/50 to-primary/20 hidden sm:block" />

          {steps.map((step, index) => (
            <motion.div
              key={step.number}
              initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.15, type: 'spring', stiffness: 80 }}
              className={`relative flex items-center mb-12 last:mb-0 ${
                index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
              }`}
            >
              {/* Content Card */}
              <div className={`flex-1 ${index % 2 === 0 ? 'md:pr-16 md:text-right' : 'md:pl-16'} pl-20 sm:pl-24 md:pl-0`}>
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  className="p-6 rounded-2xl bg-card/50 backdrop-blur-sm border border-border/50 hover:border-primary/30 transition-all duration-300"
                >
                  <span className="inline-block text-xs font-medium text-primary mb-2">
                    Step {step.number}
                  </span>
                  <h3 className="font-display text-xl text-foreground mb-2">
                    {step.title}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {step.description}
                  </p>
                </motion.div>
              </div>

              {/* Center Icon */}
              <motion.div
                className="absolute left-0 sm:left-0 md:left-1/2 md:-translate-x-1/2 w-16 h-16 rounded-full bg-primary/10 border-2 border-primary flex items-center justify-center z-10"
                whileHover={{ scale: 1.1, rotate: 360 }}
                transition={{ duration: 0.5 }}
              >
                <step.icon className="w-6 h-6 text-primary" />
              </motion.div>

              {/* Empty space for alternating layout */}
              <div className="hidden md:block flex-1" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ApplicationProcess;
