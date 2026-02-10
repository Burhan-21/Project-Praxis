import { motion } from "framer-motion";
import { getAqiLevel, getAqiColor } from "@/lib/aqi-data";

interface AqiGaugeProps {
  value: number;
  size?: "sm" | "md" | "lg";
}

const AqiGauge = ({ value, size = "md" }: AqiGaugeProps) => {
  const level = getAqiLevel(value);
  const color = getAqiColor(value);
  const pct = Math.min(value / 500, 1);
  const dims = size === "lg" ? "w-48 h-48" : size === "md" ? "w-36 h-36" : "w-24 h-24";
  const textSize = size === "lg" ? "text-5xl" : size === "md" ? "text-3xl" : "text-xl";
  const labelSize = size === "lg" ? "text-sm" : "text-xs";
  const r = size === "lg" ? 80 : size === "md" ? 60 : 40;
  const circ = 2 * Math.PI * r;
  const strokeWidth = size === "lg" ? 8 : 6;

  return (
    <div className={`relative ${dims} flex items-center justify-center`}>
      <svg className="absolute inset-0 -rotate-90" viewBox={`0 0 ${(r + strokeWidth) * 2} ${(r + strokeWidth) * 2}`}>
        <circle
          cx={r + strokeWidth}
          cy={r + strokeWidth}
          r={r}
          fill="none"
          stroke="hsl(var(--border))"
          strokeWidth={strokeWidth}
        />
        <motion.circle
          cx={r + strokeWidth}
          cy={r + strokeWidth}
          r={r}
          fill="none"
          stroke={color}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeDasharray={circ}
          initial={{ strokeDashoffset: circ }}
          animate={{ strokeDashoffset: circ * (1 - pct) }}
          transition={{ duration: 1.5, ease: "easeOut" }}
        />
      </svg>
      <div className="text-center z-10">
        <motion.span
          className={`${textSize} font-bold font-mono block`}
          style={{ color }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          {value}
        </motion.span>
        <span className={`${labelSize} font-medium`} style={{ color }}>
          {level.label}
        </span>
      </div>
    </div>
  );
};

export default AqiGauge;
