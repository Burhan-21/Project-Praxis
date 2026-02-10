import { motion } from "framer-motion";
import { cities, generateHourlyData, generateWeeklyData, getAqiColor } from "@/lib/aqi-data";
import AqiChart from "@/components/AqiChart";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, LineChart, Line, Legend } from "recharts";

const tooltipStyle = {
  backgroundColor: "hsl(222, 47%, 10%)",
  border: "1px solid hsl(222, 30%, 18%)",
  borderRadius: "8px",
  fontSize: "12px",
  color: "hsl(210, 40%, 93%)",
};

const History = () => {
  const hourlyData = generateHourlyData(cities[0].aqi);
  const weeklyData = generateWeeklyData(cities[0].aqi);

  // Monthly summary
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun"];
  const monthlyData = months.map((m, i) => ({
    month: m,
    avgAqi: Math.round(80 + Math.sin(i) * 40 + Math.random() * 20),
    maxAqi: Math.round(150 + Math.sin(i) * 60 + Math.random() * 30),
    minAqi: Math.round(30 + Math.sin(i) * 15 + Math.random() * 10),
  }));

  return (
    <div className="min-h-screen pt-20 pb-12 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-foreground">History & Insights</h1>
          <p className="text-sm text-muted-foreground">Historical air quality data for {cities[0].name}</p>
        </div>

        {/* Summary Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
          {[
            { label: "Avg AQI (30d)", value: 142, delta: "+12%" },
            { label: "Good Days", value: 8, delta: "-2" },
            { label: "Unhealthy Days", value: 14, delta: "+5" },
            { label: "Worst AQI", value: 287, delta: "Feb 14" },
          ].map((s, i) => (
            <motion.div
              key={s.label}
              className="glass-card p-4"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
            >
              <p className="text-xs text-muted-foreground mb-1">{s.label}</p>
              <p className="text-2xl font-bold font-mono" style={{ color: getAqiColor(typeof s.value === "number" ? s.value : 100) }}>{s.value}</p>
              <p className="text-xs text-muted-foreground">{s.delta}</p>
            </motion.div>
          ))}
        </div>

        <div className="grid lg:grid-cols-2 gap-4 mb-6">
          <AqiChart data={hourlyData} title="24-Hour Detailed View" />
          <div className="glass-card p-5">
            <h3 className="text-sm font-semibold text-foreground mb-4">Weekly Comparison</h3>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={weeklyData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(222, 30%, 18%)" />
                  <XAxis dataKey="day" tick={{ fontSize: 10, fill: "hsl(215, 20%, 55%)" }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fontSize: 10, fill: "hsl(215, 20%, 55%)" }} axisLine={false} tickLine={false} width={35} />
                  <Tooltip contentStyle={tooltipStyle} />
                  <Bar dataKey="pm25" fill="hsl(168, 76%, 42%)" radius={[4, 4, 0, 0]} name="PM2.5" />
                  <Bar dataKey="pm10" fill="hsl(199, 89%, 48%)" radius={[4, 4, 0, 0]} name="PM10" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Monthly Trend */}
        <div className="glass-card p-5">
          <h3 className="text-sm font-semibold text-foreground mb-4">6-Month AQI Trend</h3>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={monthlyData}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(222, 30%, 18%)" />
                <XAxis dataKey="month" tick={{ fontSize: 10, fill: "hsl(215, 20%, 55%)" }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 10, fill: "hsl(215, 20%, 55%)" }} axisLine={false} tickLine={false} width={35} />
                <Tooltip contentStyle={tooltipStyle} />
                <Legend wrapperStyle={{ fontSize: "12px" }} />
                <Line type="monotone" dataKey="avgAqi" stroke="hsl(168, 76%, 42%)" strokeWidth={2} dot={false} name="Average" />
                <Line type="monotone" dataKey="maxAqi" stroke="hsl(0, 72%, 51%)" strokeWidth={1.5} strokeDasharray="4 4" dot={false} name="Max" />
                <Line type="monotone" dataKey="minAqi" stroke="hsl(199, 89%, 48%)" strokeWidth={1.5} strokeDasharray="4 4" dot={false} name="Min" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};

export default History;
