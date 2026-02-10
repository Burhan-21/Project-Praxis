import { motion } from "framer-motion";

interface PollutantCardProps {
  name: string;
  value: number;
  unit: string;
  icon: string;
  index: number;
}

const PollutantCard = ({ name, value, unit, icon, index }: PollutantCardProps) => (
  <motion.div
    className="glass-card-hover p-4"
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: index * 0.08 }}
  >
    <div className="flex items-center gap-2 mb-2">
      <span className="text-lg">{icon}</span>
      <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">{name}</span>
    </div>
    <div className="flex items-baseline gap-1">
      <span className="text-2xl font-bold font-mono text-foreground">{value}</span>
      <span className="text-xs text-muted-foreground">{unit}</span>
    </div>
  </motion.div>
);

export default PollutantCard;
