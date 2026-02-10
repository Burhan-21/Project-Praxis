import { useState } from "react";
import { motion } from "framer-motion";
import { Thermometer, Droplets, Clock } from "lucide-react";
import AqiGauge from "@/components/AqiGauge";
import PollutantCard from "@/components/PollutantCard";
import AqiChart from "@/components/AqiChart";
import { cities, generateHourlyData, generateWeeklyData, getAqiLevel } from "@/lib/aqi-data";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from "recharts";

const Dashboard = () => {
  const [selectedCity, setSelectedCity] = useState(cities[0]);
  const hourlyData = generateHourlyData(selectedCity.aqi);
  const weeklyData = generateWeeklyData(selectedCity.aqi);
  const level = getAqiLevel(selectedCity.aqi);

  const pollutants = [
    { name: "PM2.5", value: selectedCity.pm25, unit: "µg/m³", icon: "🔴" },
    { name: "PM10", value: selectedCity.pm10, unit: "µg/m³", icon: "🟠" },
    { name: "CO", value: selectedCity.co, unit: "mg/m³", icon: "🟡" },
    { name: "NO₂", value: selectedCity.no2, unit: "ppb", icon: "🟤" },
    { name: "O₃", value: selectedCity.o3, unit: "ppb", icon: "🔵" },
    { name: "SO₂", value: selectedCity.so2, unit: "ppb", icon: "🟣" },
  ];

  return (
    <div className="min-h-screen pt-20 pb-12 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-2xl font-bold text-foreground">Dashboard</h1>
            <p className="text-sm text-muted-foreground">Real-time air quality monitoring</p>
          </div>
          <select
            className="bg-secondary text-secondary-foreground px-4 py-2 rounded-lg text-sm font-medium border border-border"
            value={selectedCity.id}
            onChange={(e) => setSelectedCity(cities.find((c) => c.id === e.target.value)!)}
          >
            {cities.map((c) => (
              <option key={c.id} value={c.id}>{c.name}, {c.country}</option>
            ))}
          </select>
        </div>

        {/* Top Row: Gauge + Info */}
        <div className="grid lg:grid-cols-3 gap-4 mb-6">
          <motion.div
            className="glass-card p-6 flex flex-col items-center justify-center"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
          >
            <AqiGauge value={selectedCity.aqi} size="lg" />
            <p className="text-sm text-muted-foreground mt-4">{level.advice}</p>
          </motion.div>

          <div className="lg:col-span-2 grid grid-cols-2 sm:grid-cols-3 gap-3">
            {pollutants.map((p, i) => (
              <PollutantCard key={p.name} {...p} index={i} />
            ))}
          </div>
        </div>

        {/* Weather Info */}
        <div className="grid grid-cols-3 gap-3 mb-6">
          <div className="glass-card p-4 flex items-center gap-3">
            <Thermometer className="w-5 h-5 text-primary" />
            <div>
              <p className="text-xs text-muted-foreground">Temperature</p>
              <p className="font-bold font-mono text-foreground">{selectedCity.temperature}°C</p>
            </div>
          </div>
          <div className="glass-card p-4 flex items-center gap-3">
            <Droplets className="w-5 h-5 text-primary" />
            <div>
              <p className="text-xs text-muted-foreground">Humidity</p>
              <p className="font-bold font-mono text-foreground">{selectedCity.humidity}%</p>
            </div>
          </div>
          <div className="glass-card p-4 flex items-center gap-3">
            <Clock className="w-5 h-5 text-primary" />
            <div>
              <p className="text-xs text-muted-foreground">Updated</p>
              <p className="font-bold text-foreground text-sm">{selectedCity.lastUpdated}</p>
            </div>
          </div>
        </div>

        {/* Charts */}
        <div className="grid lg:grid-cols-2 gap-4">
          <AqiChart data={hourlyData} title="24-Hour AQI Trend" />
          <div className="glass-card p-5">
            <h3 className="text-sm font-semibold text-foreground mb-4">Weekly Overview</h3>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={weeklyData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(222, 30%, 18%)" />
                  <XAxis dataKey="day" tick={{ fontSize: 10, fill: "hsl(215, 20%, 55%)" }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fontSize: 10, fill: "hsl(215, 20%, 55%)" }} axisLine={false} tickLine={false} width={35} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "hsl(222, 47%, 10%)",
                      border: "1px solid hsl(222, 30%, 18%)",
                      borderRadius: "8px",
                      fontSize: "12px",
                      color: "hsl(210, 40%, 93%)",
                    }}
                  />
                  <Bar dataKey="aqi" fill="hsl(168, 76%, 42%)" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
