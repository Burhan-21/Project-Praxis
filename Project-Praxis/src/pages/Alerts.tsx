import { motion } from "framer-motion";
import { Bell, CheckCircle2 } from "lucide-react";
import AlertCard from "@/components/AlertCard";
import { alerts } from "@/lib/aqi-data";

const Alerts = () => (
  <div className="min-h-screen pt-20 pb-12 px-4">
    <div className="max-w-3xl mx-auto">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Alerts</h1>
          <p className="text-sm text-muted-foreground">{alerts.length} active alerts</p>
        </div>
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-primary/10 border border-primary/20">
          <Bell className="w-4 h-4 text-primary" />
          <span className="text-xs text-primary font-medium">Real-time</span>
        </div>
      </div>

      <div className="space-y-3 mb-8">
        {alerts.map((alert, i) => (
          <AlertCard key={alert.id} alert={alert} index={i} />
        ))}
      </div>

      {/* Alert Settings */}
      <motion.div
        className="glass-card p-5"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
      >
        <h3 className="text-sm font-semibold text-foreground mb-4">Alert Settings</h3>
        <div className="space-y-3">
          {[
            { label: "AQI threshold alerts (>150)", enabled: true },
            { label: "Sudden spike detection", enabled: true },
            { label: "Forecast warnings", enabled: true },
            { label: "Weekly AQI digest", enabled: false },
          ].map((setting) => (
            <div key={setting.label} className="flex items-center justify-between py-2 border-b border-border/30 last:border-0">
              <span className="text-sm text-foreground">{setting.label}</span>
              <div className={`w-9 h-5 rounded-full flex items-center transition-colors ${setting.enabled ? "bg-primary" : "bg-secondary"}`}>
                <div className={`w-4 h-4 rounded-full bg-foreground transition-transform mx-0.5 ${setting.enabled ? "translate-x-4" : ""}`} />
              </div>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  </div>
);

export default Alerts;
