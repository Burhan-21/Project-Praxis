import { motion } from "framer-motion";
import { predictions, cities, generateForecastChartData, getAqiColor, getAqiLevel } from "@/lib/aqi-data";
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from "recharts";
import { TrendingUp, Target } from "lucide-react";

const Forecast = () => {
  const city = cities[0];
  const chartData = generateForecastChartData(city.aqi);

  return (
    <div className="min-h-screen pt-20 pb-12 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-foreground">AQI Forecast</h1>
          <p className="text-sm text-muted-foreground">Advanced predictions for {city.name}</p>
        </div>

        {/* Forecast Chart */}
        <div className="glass-card p-5 mb-6">
          <div className="flex items-center gap-2 mb-4">
            <TrendingUp className="w-4 h-4 text-primary" />
            <h3 className="text-sm font-semibold text-foreground">48-Hour Forecast</h3>
          </div>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={chartData}>
                <defs>
                  <linearGradient id="actual-grad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="hsl(168, 76%, 42%)" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="hsl(168, 76%, 42%)" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="pred-grad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="hsl(199, 89%, 48%)" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="hsl(199, 89%, 48%)" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(222, 30%, 18%)" />
                <XAxis dataKey="time" tick={{ fontSize: 9, fill: "hsl(215, 20%, 55%)" }} axisLine={false} tickLine={false} interval={4} />
                <YAxis tick={{ fontSize: 10, fill: "hsl(215, 20%, 55%)" }} axisLine={false} tickLine={false} width={35} />
                <Tooltip contentStyle={{ backgroundColor: "hsl(222, 47%, 10%)", border: "1px solid hsl(222, 30%, 18%)", borderRadius: "8px", fontSize: "12px", color: "hsl(210, 40%, 93%)" }} />
                <Area type="monotone" dataKey="actual" stroke="hsl(168, 76%, 42%)" strokeWidth={2} fill="url(#actual-grad)" name="Actual" />
                <Area type="monotone" dataKey="predicted" stroke="hsl(199, 89%, 48%)" strokeWidth={2} strokeDasharray="5 5" fill="url(#pred-grad)" name="Predicted" />
                <Area type="monotone" dataKey="upper" stroke="none" fill="hsl(199, 89%, 48%)" fillOpacity={0.08} name="Upper Bound" />
                <Area type="monotone" dataKey="lower" stroke="none" fill="hsl(199, 89%, 48%)" fillOpacity={0.08} name="Lower Bound" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Prediction Cards */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-3">
          {predictions.map((p, i) => {
            const color = getAqiColor(p.predicted);
            const level = getAqiLevel(p.predicted);
            return (
              <motion.div
                key={p.period}
                className="glass-card-hover p-5 text-center"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.08 }}
              >
                <p className="text-xs text-muted-foreground mb-2 font-medium">{p.period}</p>
                <p className="text-3xl font-bold font-mono mb-1" style={{ color }}>{p.predicted}</p>
                <p className="text-xs mb-3" style={{ color }}>{level.label}</p>
                <div className="flex items-center justify-center gap-1 text-xs text-muted-foreground">
                  <Target className="w-3 h-3" />
                  <span className="font-mono">{p.confidence}%</span>
                  <span>confidence</span>
                </div>
                <p className="text-[10px] text-muted-foreground mt-1 font-mono">
                  {p.lower}–{p.upper}
                </p>
              </motion.div>
            );
          })}
        </div>

        {/* Model Info */}
        <motion.div
          className="glass-card p-5 mt-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          <div className="flex items-center gap-2 mb-3">
            <TrendingUp className="w-4 h-4 text-primary" />
            <h3 className="text-sm font-semibold text-foreground">Model Information</h3>
          </div>
          <div className="grid sm:grid-cols-3 gap-4 text-sm">
            <div>
              <p className="text-xs text-muted-foreground">Algorithm</p>
              <p className="font-medium text-foreground">Random Forest + LSTM Ensemble</p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Training Data</p>
              <p className="font-medium text-foreground">3 years of historical AQI data</p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Last Retrained</p>
              <p className="font-medium text-foreground">2 hours ago</p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Forecast;
