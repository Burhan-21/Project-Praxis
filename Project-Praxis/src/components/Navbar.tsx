import { NavLink, useLocation } from "react-router-dom";
import { Wind, LayoutDashboard, MapPin, TrendingUp, Clock, Bell, Moon, Sun } from "lucide-react";
import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";

const links = [
  { to: "/", label: "Home", icon: Wind },
  { to: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { to: "/cities", label: "Cities", icon: MapPin },
  { to: "/forecast", label: "Forecast", icon: TrendingUp },
  { to: "/history", label: "History", icon: Clock },
  { to: "/alerts", label: "Alerts", icon: Bell },
];

const Navbar = () => {
  const location = useLocation();
  const [isDark, setIsDark] = useState(() => {
    const saved = localStorage.getItem("theme");
    if (saved) {
      return saved === "dark";
    }
    return window.matchMedia("(prefers-color-scheme: dark)").matches;
  });

  useEffect(() => {
    const html = document.documentElement;
    if (isDark) {
      html.classList.add("dark");
      html.classList.remove("light");
      localStorage.setItem("theme", "dark");
    } else {
      html.classList.add("light");
      html.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [isDark]);

  const toggleTheme = () => {
    setIsDark(!isDark);
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass-card border-b border-border/30 backdrop-blur-2xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16">
          <NavLink to="/" className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-lg bg-primary/20 flex items-center justify-center glow-primary">
              <Wind className="w-5 h-5 text-primary" />
            </div>
            <span className="text-lg font-bold tracking-tight gradient-text hidden sm:block">AirPulse</span>
          </NavLink>
          <div className="flex items-center gap-1">
            {links.map(({ to, label, icon: Icon }) => {
              const isActive = location.pathname === to;
              return (
                <NavLink
                  key={to}
                  to={to}
                  className={cn(
                    "flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200",
                    isActive
                      ? "bg-primary/15 text-primary"
                      : "text-muted-foreground hover:text-foreground hover:bg-secondary/50"
                  )}
                >
                  <Icon className="w-4 h-4" />
                  <span className="hidden md:inline">{label}</span>
                </NavLink>
              );
            })}
            <button
              onClick={toggleTheme}
              className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 text-muted-foreground hover:text-foreground hover:bg-secondary/50"
              aria-label="Toggle theme"
            >
              {isDark ? (
                <Sun className="w-4 h-4" />
              ) : (
                <Moon className="w-4 h-4" />
              )}
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
