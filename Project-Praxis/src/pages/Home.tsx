import { motion } from "framer-motion";
import { ArrowRight, Wind, BarChart3, Shield, Globe } from "lucide-react";
import { Link } from "react-router-dom";
import { cities, getAqiColor, getAqiLevel } from "@/lib/aqi-data";

const features = [
  { icon: Wind, title: "Real-time Monitoring", desc: "Live AQI data from sensors and APIs worldwide" },
  { icon: BarChart3, title: "Advanced Forecasts", desc: "Accurate predictions up to 7 days ahead" },
  { icon: Shield, title: "Smart Alerts", desc: "Instant notifications when pollution spikes" },
  { icon: Globe, title: "Global Coverage", desc: "Track air quality across major cities" },
];

const Home = () => {
  const topCities = cities.slice(0, 4);

  return (
    <div className="min-h-screen pt-20 pb-12 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Hero */}
        <motion.div
          className="text-center py-16 md:py-24"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <motion.div
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-6"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
          >
            <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
            <span className="text-xs font-medium text-primary">Live Monitoring Active</span>
          </motion.div>
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-black tracking-tight mb-6">
            <span className="text-foreground">Breathe</span>{" "}
            <span className="gradient-text">Smarter</span>
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10">
            Real-time air quality monitoring and prediction system. Track pollutants, get forecasts, and protect your health.
          </p>
          <div className="flex items-center justify-center gap-4">
            <Link
              to="/dashboard"
              className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground font-semibold rounded-xl hover:opacity-90 transition-opacity glow-primary"
            >
              Open Dashboard <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              to="/cities"
              className="inline-flex items-center gap-2 px-6 py-3 bg-secondary text-secondary-foreground font-semibold rounded-xl hover:bg-secondary/80 transition-colors"
            >
              Explore Cities
            </Link>
          </div>
        </motion.div>

        {/* Live Ticker */}
        <motion.div
          className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-20"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          {topCities.map((city) => {
            const color = getAqiColor(city.aqi);
            const level = getAqiLevel(city.aqi);
            return (
              <Link key={city.id} to="/dashboard" className="glass-card-hover p-4 text-center">
                <p className="text-xs text-muted-foreground mb-1">{city.name}</p>
                <p className="text-3xl font-bold font-mono" style={{ color }}>{city.aqi}</p>
                <p className="text-xs font-medium mt-1" style={{ color }}>{level.label}</p>
              </Link>
            );
          })}
        </motion.div>

        {/* Features */}
        <motion.div
          className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          {features.map(({ icon: Icon, title, desc }, i) => (
            <motion.div
              key={title}
              className="glass-card p-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 + i * 0.1 }}
            >
              <div className="w-10 h-10 rounded-lg bg-primary/15 flex items-center justify-center mb-4">
                <Icon className="w-5 h-5 text-primary" />
              </div>
              <h3 className="font-semibold text-foreground mb-2">{title}</h3>
              <p className="text-sm text-muted-foreground">{desc}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default Home;
