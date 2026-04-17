import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { Quote } from 'lucide-react';

interface TeacherCardProps {
  name: string;
  title: string;
  bio: string;
  quote?: string;
  index: number;
}

const TeacherCard = ({ name, title, bio, quote, index }: TeacherCardProps) => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x);
  const mouseYSpring = useSpring(y);

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["2.5deg", "-2.5deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-2.5deg", "2.5deg"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      className="p-6 rounded-xl relative overflow-hidden"
      style={{
        background: 'linear-gradient(135deg, rgba(20,15,25,0.6), rgba(16,10,18,0.4))',
        border: '1px solid rgba(89,44,102,0.2)',
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
      }}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.2, duration: 0.6 }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      whileHover={{ 
        boxShadow: '0 20px 60px -20px rgba(89,44,102,0.3)',
      }}
    >
      {/* Subtle glow on hover */}
      <motion.div
        className="absolute inset-0 opacity-0 hover:opacity-100 transition-opacity duration-500 pointer-events-none"
        style={{
          background: 'radial-gradient(circle at 50% 50%, rgba(89,44,102,0.1) 0%, transparent 70%)',
        }}
      />
      
      <h4 className="text-xl font-display font-medium text-[#592C66] mb-2">{name}</h4>
      <p className="font-medium text-[#D8A897] mb-4">{title}</p>
      <p className="text-foreground/70 mb-4 leading-relaxed">{bio}</p>
      
      {quote && (
        <motion.div 
          className="p-4 rounded-lg border-l-4 border-[#592C66]"
          style={{
            background: 'rgba(89,44,102,0.08)',
          }}
          initial={{ opacity: 0, x: -10 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ delay: index * 0.2 + 0.3 }}
        >
          <motion.div
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.2 + 0.4, type: "spring" }}
          >
            <Quote className="text-[#592C66] h-5 w-5 mb-2" />
          </motion.div>
          <p className="text-foreground/80 italic font-display">{quote}</p>
        </motion.div>
      )}
    </motion.div>
  );
};

export default TeacherCard;
