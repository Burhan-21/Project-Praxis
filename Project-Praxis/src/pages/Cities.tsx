import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { Search, MapPin, Code } from "lucide-react";
import CityCard from "@/components/CityCard";
import { searchCities, getStates } from "@/lib/aqi-data";
import { useNavigate } from "react-router-dom";

const Cities = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedState, setSelectedState] = useState("");
  const [searchType, setSearchType] = useState<"all" | "name" | "pincode" | "state">("all");
  const navigate = useNavigate();
  
  const states = useMemo(() => getStates(), []);

  const filtered = useMemo(() => {
    let results = searchCities(searchQuery);

    // Filter by selected state if any
    if (selectedState) {
      results = results.filter(city => city.state === selectedState);
    }

    // Further filter based on search type
    if (searchQuery && searchType !== "all") {
      const lowerQuery = searchQuery.toLowerCase();
      results = results.filter(city => {
        switch (searchType) {
          case "name":
            return city.name.toLowerCase().includes(lowerQuery);
          case "pincode":
            return city.pinCode.includes(searchQuery);
          case "state":
            return city.state.toLowerCase().includes(lowerQuery);
          default:
            return true;
        }
      });
    }

    return results;
  }, [searchQuery, selectedState, searchType]);

  const groupedByState = useMemo(() => {
    const grouped: { [key: string]: typeof filtered } = {};
    filtered.forEach(city => {
      if (!grouped[city.state]) {
        grouped[city.state] = [];
      }
      grouped[city.state].push(city);
    });
    return grouped;
  }, [filtered]);

  const stateKeys = Object.keys(groupedByState).sort();

  return (
    <div className="min-h-screen pt-20 pb-12 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-foreground mb-2">Cities of India</h1>
          <p className="text-sm text-muted-foreground">Search by city name, state, or PIN code to view air quality data</p>
        </div>

        {/* Search and Filter Section */}
        <div className="glass-card p-5 mb-8 space-y-4">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {/* Search Input */}
            <div className="lg:col-span-2 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search by city name, PIN code..."
                className="w-full bg-secondary text-foreground pl-9 pr-4 py-2 rounded-lg text-sm border border-border focus:outline-none focus:ring-2 focus:ring-primary/50"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            {/* State Filter */}
            <select
              value={selectedState}
              onChange={(e) => setSelectedState(e.target.value)}
              className="bg-secondary text-foreground px-4 py-2 rounded-lg text-sm border border-border focus:outline-none focus:ring-2 focus:ring-primary/50"
            >
              <option value="">All States & UTs</option>
              {states.map(state => (
                <option key={state} value={state}>{state}</option>
              ))}
            </select>
          </div>

          {/* Search Type Selector */}
          <div className="flex gap-2 flex-wrap">
            <button
              onClick={() => setSearchType("all")}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                searchType === "all"
                  ? "bg-primary text-primary-foreground"
                  : "bg-secondary text-muted-foreground hover:text-foreground"
              }`}
            >
              All
            </button>
            <button
              onClick={() => setSearchType("name")}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all flex items-center gap-1 ${
                searchType === "name"
                  ? "bg-primary text-primary-foreground"
                  : "bg-secondary text-muted-foreground hover:text-foreground"
              }`}
            >
              <MapPin className="w-3 h-3" /> City Name
            </button>
            <button
              onClick={() => setSearchType("pincode")}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all flex items-center gap-1 ${
                searchType === "pincode"
                  ? "bg-primary text-primary-foreground"
                  : "bg-secondary text-muted-foreground hover:text-foreground"
              }`}
            >
              <Code className="w-3 h-3" /> PIN Code
            </button>
            <button
              onClick={() => setSearchType("state")}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                searchType === "state"
                  ? "bg-primary text-primary-foreground"
                  : "bg-secondary text-muted-foreground hover:text-foreground"
              }`}
            >
              State
            </button>
          </div>

          {/* Results Count */}
          <div className="text-xs text-muted-foreground">
            Found <span className="font-semibold text-primary">{filtered.length}</span> cities
          </div>
        </div>

        {/* Cities Grid - Grouped by State */}
        {stateKeys.length > 0 ? (
          <div className="space-y-10">
            {stateKeys.map(state => (
              <motion.div
                key={state}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                <div className="mb-4">
                  <h2 className="text-lg font-bold text-foreground">{state}</h2>
                  <div className="w-12 h-1 bg-gradient-to-r from-primary to-cyan-400 rounded mt-2"></div>
                </div>
                <motion.div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {groupedByState[state].map((city, i) => (
                    <CityCard 
                      key={city.id} 
                      city={city} 
                      index={i} 
                      onClick={() => navigate("/dashboard")}
                    />
                  ))}
                </motion.div>
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-muted-foreground mb-2">No cities found matching your search</p>
            {searchQuery && (
              <p className="text-xs text-muted-foreground">
                Try searching with different keywords: city name, state name, or PIN code
              </p>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Cities;
