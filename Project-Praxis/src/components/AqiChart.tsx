import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from "recharts";
import { HourlyData } from "@/lib/aqi-data";

interface AqiChartProps {
  data: HourlyData[];
  title: string;
  dataKey?: string;
}

const AqiChart = ({ data, title, dataKey = "aqi" }: AqiChartProps) => (
  <div className="glass-card p-5">
    <h3 className="text-sm font-semibold text-foreground mb-4">{title}</h3>
    <div className="h-64">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data}>
          <defs>
            <linearGradient id={`gradient-${dataKey}`} x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="hsl(168, 76%, 42%)" stopOpacity={0.3} />
              <stop offset="95%" stopColor="hsl(168, 76%, 42%)" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="hsl(222, 30%, 18%)" />
          <XAxis
            dataKey="time"
            tick={{ fontSize: 10, fill: "hsl(215, 20%, 55%)" }}
            axisLine={false}
            tickLine={false}
            interval="preserveStartEnd"
          />
          <YAxis
            tick={{ fontSize: 10, fill: "hsl(215, 20%, 55%)" }}
            axisLine={false}
            tickLine={false}
            width={35}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: "hsl(222, 47%, 10%)",
              border: "1px solid hsl(222, 30%, 18%)",
              borderRadius: "8px",
              fontSize: "12px",
              color: "hsl(210, 40%, 93%)",
            }}
          />
          <Area
            type="monotone"
            dataKey={dataKey}
            stroke="hsl(168, 76%, 42%)"
            strokeWidth={2}
            fill={`url(#gradient-${dataKey})`}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  </div>
);

export default AqiChart;
