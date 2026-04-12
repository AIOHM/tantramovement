import { motion } from 'framer-motion';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

const faqs = [
  {
    question: 'What happens during the discovery call?',
    answer: "It's a casual 15-minute video conversation where we get to know you, answer your questions about the training, discuss your background and intentions, and help you feel into whether this path is right for you. There's no pressure—just an honest, open dialogue.",
  },
  {
    question: 'Do I need experience with Tantra?',
    answer: "Not necessarily. While some foundation in yoga, meditation, or bodywork is helpful, we welcome sincere seekers at various stages of their journey. During the call, we'll discuss your background and help you understand if you're ready for this level of training.",
  },
  {
    question: 'Is this call a sales pitch?',
    answer: "Absolutely not. This call is about mutual exploration. We genuinely want to ensure this training is the right fit for you, just as much as you want to find the right training. If it's not aligned, we'll be honest about that.",
  },
  {
    question: 'What if I\'m not sure yet?',
    answer: "That's exactly what this call is for! You don't need to be certain before booking. The purpose is to help you gain clarity, ask questions, and feel into the decision with more information and support.",
  },
  {
    question: 'How soon after the call can I start the training?',
    answer: "If we mutually agree this training is right for you, we'll guide you through the enrollment process. Training dates vary, and we'll share all upcoming options during or after the call. Spots are limited, so early inquiry is encouraged.",
  },
];

const ApplyFAQ = () => {
  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="font-display text-3xl md:text-4xl text-foreground mb-4">
            Common Questions
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Everything you need to know before booking your call.
          </p>
        </motion.div>

        {/* FAQ Accordion */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="max-w-2xl mx-auto"
        >
          <Accordion type="single" collapsible className="space-y-4">
            {faqs.map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <AccordionItem 
                  value={`item-${index}`}
                  className="border border-border/50 rounded-xl px-6 bg-card/30 backdrop-blur-sm hover:border-primary/30 transition-colors duration-300"
                >
                  <AccordionTrigger className="text-left font-display text-lg hover:text-primary hover:no-underline py-5">
                    <span className="text-primary/60 mr-3 font-mono text-sm">
                      {String(index + 1).padStart(2, '0')}
                    </span>
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground leading-relaxed pb-5 pl-9">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              </motion.div>
            ))}
          </Accordion>
        </motion.div>
      </div>
    </section>
  );
};

export default ApplyFAQ;
