import { motion } from "framer-motion";
import { AlertTriangle, TrendingUp, Zap } from "lucide-react";
import { AlertData, getAqiColor } from "@/lib/aqi-data";
import { cn } from "@/lib/utils";

const icons = { threshold: AlertTriangle, spike: Zap, forecast: TrendingUp };
const severityStyles = {
  warning: "border-l-aqi-moderate",
  danger: "border-l-aqi-unhealthy",
  critical: "border-l-aqi-hazardous",
};

const AlertCard = ({ alert, index }: { alert: AlertData; index: number }) => {
  const Icon = icons[alert.type];
  const color = getAqiColor(alert.aqi);

  return (
    <motion.div
      className={cn("glass-card p-4 border-l-4", severityStyles[alert.severity])}
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.1 }}
    >
      <div className="flex items-start gap-3">
        <div className="p-2 rounded-lg bg-secondary/50">
          <Icon className="w-4 h-4" style={{ color }} />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-semibold uppercase tracking-wider" style={{ color }}>
              {alert.severity}
            </span>
            <span className="text-xs text-muted-foreground">• {alert.city}</span>
          </div>
          <p className="text-sm text-foreground">{alert.message}</p>
          <p className="text-xs text-muted-foreground mt-1">{alert.timestamp}</p>
        </div>
        <span className="font-mono font-bold text-lg" style={{ color }}>{alert.aqi}</span>
      </div>
    </motion.div>
  );
};

export default AlertCard;
