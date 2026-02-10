import { motion } from "framer-motion";
import { MapPin, Star, Code } from "lucide-react";
import { CityData, getAqiLevel, getAqiColor } from "@/lib/aqi-data";
import { useState } from "react";

interface CityCardProps {
  city: CityData;
  index: number;
  onClick?: () => void;
}

const CityCard = ({ city, index, onClick }: CityCardProps) => {
  const [fav, setFav] = useState(false);
  const level = getAqiLevel(city.aqi);
  const color = getAqiColor(city.aqi);

  return (
    <motion.div
      className="glass-card-hover p-5 cursor-pointer relative overflow-hidden"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.06 }}
      onClick={onClick}
    >
      <div
        className="absolute top-0 right-0 w-24 h-24 rounded-full blur-3xl opacity-20"
        style={{ backgroundColor: color }}
      />
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-start gap-2 flex-1">
          <MapPin className="w-4 h-4 text-muted-foreground mt-0.5 flex-shrink-0" />
          <div className="flex-1 min-w-0">
            <h3 className="font-semibold text-foreground truncate">{city.name}</h3>
            <p className="text-xs text-muted-foreground truncate">{city.state}</p>
            <div className="flex items-center gap-1 mt-1">
              <Code className="w-3 h-3 text-muted-foreground" />
              <p className="text-xs text-muted-foreground font-mono">{city.pinCode}</p>
            </div>
          </div>
        </div>
        <button
          onClick={(e) => { e.stopPropagation(); setFav(!fav); }}
          className="p-1 hover:bg-secondary/50 rounded flex-shrink-0"
        >
          <Star className={`w-4 h-4 ${fav ? "fill-primary text-primary" : "text-muted-foreground"}`} />
        </button>
      </div>
      <div className="flex items-end justify-between">
        <div>
          <span className="text-3xl font-bold font-mono" style={{ color }}>{city.aqi}</span>
          <p className="text-xs font-medium mt-1" style={{ color }}>{level.label}</p>
        </div>
        <div className="text-right text-xs text-muted-foreground space-y-0.5">
          <p>PM2.5: <span className="font-mono text-foreground">{city.pm25}</span></p>
          <p>PM10: <span className="font-mono text-foreground">{city.pm10}</span></p>
          <p>{city.lastUpdated}</p>
        </div>
      </div>
    </motion.div>
  );
};

export default CityCard;
