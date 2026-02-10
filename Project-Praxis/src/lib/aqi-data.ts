// Mock AQI data and utilities

export interface CityData {
  id: string;
  name: string;
  state: string;
  pinCode: string;
  country: string;
  aqi: number;
  pm25: number;
  pm10: number;
  co: number;
  no2: number;
  o3: number;
  so2: number;
  temperature: number;
  humidity: number;
  lastUpdated: string;
}

export interface HourlyData {
  time: string;
  aqi: number;
  pm25: number;
  pm10: number;
}

export interface PredictionData {
  period: string;
  predicted: number;
  confidence: number;
  lower: number;
  upper: number;
}

export interface AlertData {
  id: string;
  type: "spike" | "threshold" | "forecast";
  severity: "warning" | "danger" | "critical";
  city: string;
  message: string;
  timestamp: string;
  aqi: number;
}

export const getAqiLevel = (aqi: number) => {
  if (aqi <= 50) return { label: "Good", color: "aqi-good", bgClass: "bg-aqi-good", advice: "Air quality is satisfactory" };
  if (aqi <= 100) return { label: "Moderate", color: "aqi-moderate", bgClass: "bg-aqi-moderate", advice: "Acceptable for most people" };
  if (aqi <= 150) return { label: "Unhealthy for Sensitive", color: "aqi-unhealthy-sensitive", bgClass: "bg-aqi-unhealthy-sensitive", advice: "Sensitive groups should limit outdoor activity" };
  if (aqi <= 200) return { label: "Unhealthy", color: "aqi-unhealthy", bgClass: "bg-aqi-unhealthy", advice: "Everyone may experience health effects" };
  if (aqi <= 300) return { label: "Very Unhealthy", color: "aqi-very-unhealthy", bgClass: "bg-aqi-very-unhealthy", advice: "Health alert: serious effects possible" };
  return { label: "Hazardous", color: "aqi-hazardous", bgClass: "bg-aqi-hazardous", advice: "Emergency conditions" };
};

export const getAqiColor = (aqi: number): string => {
  if (aqi <= 50) return "hsl(142, 71%, 45%)";
  if (aqi <= 100) return "hsl(45, 93%, 47%)";
  if (aqi <= 150) return "hsl(25, 95%, 53%)";
  if (aqi <= 200) return "hsl(0, 72%, 51%)";
  if (aqi <= 300) return "hsl(282, 68%, 38%)";
  return "hsl(345, 100%, 27%)";
};

export const cities: CityData[] = [
  // ANDHRA PRADESH
  { id: "ap1", name: "Hyderabad", state: "Andhra Pradesh", pinCode: "500001", country: "India", aqi: 110, pm25: 52.4, pm10: 93.7, co: 1.0, no2: 29.2, o3: 28.1, so2: 6.1, temperature: 28, humidity: 66, lastUpdated: "4 min ago" },
  { id: "ap2", name: "Visakhapatnam", state: "Andhra Pradesh", pinCode: "530001", country: "India", aqi: 95, pm25: 42.3, pm10: 78.5, co: 0.9, no2: 24.1, o3: 31.2, so2: 5.4, temperature: 32, humidity: 72, lastUpdated: "3 min ago" },
  { id: "ap3", name: "Vijayawada", state: "Andhra Pradesh", pinCode: "520001", country: "India", aqi: 102, pm25: 48.2, pm10: 85.3, co: 0.95, no2: 26.8, o3: 29.5, so2: 5.9, temperature: 33, humidity: 70, lastUpdated: "2 min ago" },
  { id: "ap4", name: "Tirupati", state: "Andhra Pradesh", pinCode: "517501", country: "India", aqi: 88, pm25: 39.1, pm10: 72.4, co: 0.8, no2: 21.5, o3: 32.4, so2: 4.8, temperature: 30, humidity: 65, lastUpdated: "5 min ago" },
  { id: "ap5", name: "Amaravati", state: "Andhra Pradesh", pinCode: "518501", country: "India", aqi: 105, pm25: 52.4, pm10: 94.2, co: 1.1, no2: 26.7, o3: 20.5, so2: 6.2, temperature: 33, humidity: 70, lastUpdated: "2 min ago" },
  { id: "ap6", name: "Nellore", state: "Andhra Pradesh", pinCode: "524001", country: "India", aqi: 92, pm25: 43.5, pm10: 79.8, co: 0.87, no2: 22.3, o3: 31.8, so2: 5.2, temperature: 32, humidity: 68, lastUpdated: "1 min ago" },

  // ARUNACHAL PRADESH
  { id: "ar1", name: "Itanagar", state: "Arunachal Pradesh", pinCode: "791111", country: "India", aqi: 38, pm25: 9.8, pm10: 18.6, co: 0.3, no2: 6.2, o3: 42.1, so2: 1.9, temperature: 22, humidity: 75, lastUpdated: "1 min ago" },
  { id: "ar2", name: "Naharlagun", state: "Arunachal Pradesh", pinCode: "791110", country: "India", aqi: 41, pm25: 10.8, pm10: 20.4, co: 0.32, no2: 6.8, o3: 41.5, so2: 2.1, temperature: 23, humidity: 76, lastUpdated: "2 min ago" },
  { id: "ar3", name: "Pasighat", state: "Arunachal Pradesh", pinCode: "791102", country: "India", aqi: 44, pm25: 11.5, pm10: 21.8, co: 0.34, no2: 7.2, o3: 40.8, so2: 2.2, temperature: 24, humidity: 74, lastUpdated: "3 min ago" },
  { id: "ar4", name: "Tezu", state: "Arunachal Pradesh", pinCode: "792101", country: "India", aqi: 39, pm25: 10.2, pm10: 19.3, co: 0.31, no2: 6.4, o3: 41.8, so2: 1.95, temperature: 22, humidity: 76, lastUpdated: "4 min ago" },
  { id: "ar5", name: "Guwahati (AR)", state: "Arunachal Pradesh", pinCode: "781001", country: "India", aqi: 43, pm25: 11.2, pm10: 21.1, co: 0.33, no2: 6.9, o3: 41.2, so2: 2.0, temperature: 23, humidity: 75, lastUpdated: "2 min ago" },

  // ASSAM
  { id: "as1", name: "Guwahati", state: "Assam", pinCode: "781001", country: "India", aqi: 112, pm25: 56.8, pm10: 104.3, co: 1.2, no2: 29.5, o3: 22.6, so2: 6.8, temperature: 30, humidity: 78, lastUpdated: "3 min ago" },
  { id: "as2", name: "Silchar", state: "Assam", pinCode: "788001", country: "India", aqi: 98, pm25: 45.7, pm10: 83.2, co: 0.95, no2: 24.3, o3: 28.1, so2: 5.6, temperature: 28, humidity: 76, lastUpdated: "2 min ago" },
  { id: "as3", name: "Dibrugarh", state: "Assam", pinCode: "786001", country: "India", aqi: 105, pm25: 51.2, pm10: 91.4, co: 1.08, no2: 27.6, o3: 25.3, so2: 6.1, temperature: 29, humidity: 77, lastUpdated: "1 min ago" },
  { id: "as4", name: "Nagaon", state: "Assam", pinCode: "782001", country: "India", aqi: 108, pm25: 54.3, pm10: 97.1, co: 1.15, no2: 28.4, o3: 23.8, so2: 6.5, temperature: 30, humidity: 76, lastUpdated: "4 min ago" },
  { id: "as5", name: "Jorhat", state: "Assam", pinCode: "785001", country: "India", aqi: 102, pm25: 48.6, pm10: 87.5, co: 1.0, no2: 25.9, o3: 27.2, so2: 5.8, temperature: 29, humidity: 77, lastUpdated: "3 min ago" },

  // BIHAR
  { id: "br1", name: "Patna", state: "Bihar", pinCode: "800001", country: "India", aqi: 168, pm25: 88.5, pm10: 148.1, co: 1.5, no2: 41.3, o3: 18.9, so2: 10.4, temperature: 31, humidity: 65, lastUpdated: "2 min ago" },
  { id: "br2", name: "Gaya", state: "Bihar", pinCode: "823001", country: "India", aqi: 145, pm25: 74.2, pm10: 126.8, co: 1.32, no2: 35.6, o3: 21.4, so2: 8.9, temperature: 32, humidity: 62, lastUpdated: "3 min ago" },
  { id: "br3", name: "Bhagalpur", state: "Bihar", pinCode: "812001", country: "India", aqi: 152, pm25: 79.3, pm10: 135.4, co: 1.38, no2: 38.2, o3: 20.1, so2: 9.5, temperature: 31, humidity: 64, lastUpdated: "1 min ago" },
  { id: "br4", name: "Muzaffarpur", state: "Bihar", pinCode: "842001", country: "India", aqi: 158, pm25: 82.4, pm10: 140.6, co: 1.42, no2: 39.7, o3: 19.5, so2: 9.8, temperature: 31, humidity: 66, lastUpdated: "2 min ago" },
  { id: "br5", name: "Darbhanga", state: "Bihar", pinCode: "846001", country: "India", aqi: 162, pm25: 85.1, pm10: 144.3, co: 1.45, no2: 40.8, o3: 19.2, so2: 10.1, temperature: 31, humidity: 67, lastUpdated: "4 min ago" },

  // CHHATTISGARH
  { id: "cg1", name: "Raipur", state: "Chhattisgarh", pinCode: "492001", country: "India", aqi: 128, pm25: 63.2, pm10: 116.6, co: 1.3, no2: 32.9, o3: 23.4, so2: 7.3, temperature: 32, humidity: 60, lastUpdated: "4 min ago" },
  { id: "cg2", name: "Bhilai", state: "Chhattisgarh", pinCode: "490001", country: "India", aqi: 135, pm25: 68.5, pm10: 122.4, co: 1.38, no2: 34.2, o3: 22.1, so2: 7.8, temperature: 32, humidity: 59, lastUpdated: "3 min ago" },
  { id: "cg3", name: "Durg", state: "Chhattisgarh", pinCode: "491001", country: "India", aqi: 132, pm25: 65.8, pm10: 119.5, co: 1.35, no2: 33.6, o3: 22.8, so2: 7.5, temperature: 32, humidity: 60, lastUpdated: "2 min ago" },
  { id: "cg4", name: "Bilaspur", state: "Chhattisgarh", pinCode: "495001", country: "India", aqi: 118, pm25: 57.4, pm10: 108.3, co: 1.22, no2: 29.8, o3: 25.2, so2: 6.9, temperature: 31, humidity: 62, lastUpdated: "1 min ago" },
  { id: "cg5", name: "Rajnandgaon", state: "Chhattisgarh", pinCode: "491441", country: "India", aqi: 125, pm25: 61.3, pm10: 114.2, co: 1.28, no2: 31.7, o3: 23.9, so2: 7.1, temperature: 31, humidity: 61, lastUpdated: "5 min ago" },

  // GOA
  { id: "ga1", name: "Panaji", state: "Goa", pinCode: "403001", country: "India", aqi: 54, pm25: 14.2, pm10: 28.7, co: 0.4, no2: 9.4, o3: 38.5, so2: 2.6, temperature: 29, humidity: 81, lastUpdated: "5 min ago" },
  { id: "ga2", name: "Margao", state: "Goa", pinCode: "403601", country: "India", aqi: 52, pm25: 13.5, pm10: 27.3, co: 0.38, no2: 8.9, o3: 39.2, so2: 2.4, temperature: 29, humidity: 80, lastUpdated: "4 min ago" },
  { id: "ga3", name: "Vasco da Gama", state: "Goa", pinCode: "403801", country: "India", aqi: 58, pm25: 15.8, pm10: 31.2, co: 0.43, no2: 10.2, o3: 37.8, so2: 2.8, temperature: 30, humidity: 82, lastUpdated: "3 min ago" },
  { id: "ga4", name: "Pernem", state: "Goa", pinCode: "403501", country: "India", aqi: 50, pm25: 12.8, pm10: 25.9, co: 0.36, no2: 8.4, o3: 40.1, so2: 2.2, temperature: 28, humidity: 79, lastUpdated: "2 min ago" },
  { id: "ga5", name: "Sattari", state: "Goa", pinCode: "403505", country: "India", aqi: 48, pm25: 12.1, pm10: 24.6, co: 0.34, no2: 8.0, o3: 41.2, so2: 2.0, temperature: 27, humidity: 78, lastUpdated: "1 min ago" },

  // GUJARAT
  { id: "gj1", name: "Ahmedabad", state: "Gujarat", pinCode: "380001", country: "India", aqi: 128, pm25: 64.2, pm10: 115.8, co: 1.31, no2: 32.4, o3: 23.6, so2: 7.2, temperature: 34, humidity: 51, lastUpdated: "2 min ago" },
  { id: "gj2", name: "Surat", state: "Gujarat", pinCode: "395001", country: "India", aqi: 115, pm25: 56.8, pm10: 105.2, co: 1.18, no2: 28.9, o3: 26.1, so2: 6.7, temperature: 33, humidity: 54, lastUpdated: "3 min ago" },
  { id: "gj3", name: "Vadodara", state: "Gujarat", pinCode: "390001", country: "India", aqi: 112, pm25: 54.3, pm10: 101.4, co: 1.15, no2: 27.6, o3: 26.8, so2: 6.4, temperature: 32, humidity: 53, lastUpdated: "1 min ago" },
  { id: "gj4", name: "Rajkot", state: "Gujarat", pinCode: "360001", country: "India", aqi: 108, pm25: 51.2, pm10: 97.6, co: 1.10, no2: 26.3, o3: 28.2, so2: 6.1, temperature: 33, humidity: 50, lastUpdated: "4 min ago" },
  { id: "gj5", name: "Gandhinagar", state: "Gujarat", pinCode: "382001", country: "India", aqi: 118, pm25: 58.3, pm10: 108.2, co: 1.1, no2: 27.8, o3: 25.7, so2: 6.1, temperature: 34, humidity: 52, lastUpdated: "6 min ago" },
  { id: "gj6", name: "Bhavnagar", state: "Gujarat", pinCode: "364001", country: "India", aqi: 102, pm25: 48.5, pm10: 91.3, co: 1.02, no2: 24.7, o3: 30.1, so2: 5.6, temperature: 32, humidity: 55, lastUpdated: "5 min ago" },

  // HARYANA
  { id: "hr1", name: "Faridabad", state: "Haryana", pinCode: "121001", country: "India", aqi: 105, pm25: 49.8, pm10: 90.2, co: 1.08, no2: 25.4, o3: 27.3, so2: 6.2, temperature: 28, humidity: 55, lastUpdated: "2 min ago" },
  { id: "hr2", name: "Gurgaon", state: "Haryana", pinCode: "122001", country: "India", aqi: 108, pm25: 51.2, pm10: 92.8, co: 1.12, no2: 26.8, o3: 26.5, so2: 6.4, temperature: 28, humidity: 56, lastUpdated: "3 min ago" },
  { id: "hr3", name: "Hisar", state: "Haryana", pinCode: "125001", country: "India", aqi: 112, pm25: 54.3, pm10: 98.7, co: 1.18, no2: 28.5, o3: 25.2, so2: 6.8, temperature: 29, humidity: 54, lastUpdated: "1 min ago" },
  { id: "hr4", name: "Rohtak", state: "Haryana", pinCode: "124001", country: "India", aqi: 105, pm25: 49.8, pm10: 90.4, co: 1.08, no2: 25.3, o3: 27.4, so2: 6.1, temperature: 28, humidity: 55, lastUpdated: "4 min ago" },
  { id: "hr5", name: "Panipat", state: "Haryana", pinCode: "132103", country: "India", aqi: 115, pm25: 56.2, pm10: 102.1, co: 1.20, no2: 29.2, o3: 24.8, so2: 6.9, temperature: 28, humidity: 57, lastUpdated: "2 min ago" },

  // HIMACHAL PRADESH
  { id: "hp1", name: "Shimla", state: "Himachal Pradesh", pinCode: "171001", country: "India", aqi: 40, pm25: 11.2, pm10: 20.3, co: 0.3, no2: 8.1, o3: 39.6, so2: 2.0, temperature: 18, humidity: 55, lastUpdated: "4 min ago" },
  { id: "hp2", name: "Mandi", state: "Himachal Pradesh", pinCode: "175001", country: "India", aqi: 45, pm25: 12.3, pm10: 21.8, co: 0.32, no2: 8.7, o3: 38.9, so2: 2.2, temperature: 20, humidity: 58, lastUpdated: "3 min ago" },
  { id: "hp3", name: "Solan", state: "Himachal Pradesh", pinCode: "173212", country: "India", aqi: 38, pm25: 10.5, pm10: 19.2, co: 0.28, no2: 7.6, o3: 40.2, so2: 1.9, temperature: 19, humidity: 56, lastUpdated: "2 min ago" },
  { id: "hp4", name: "Nahan", state: "Himachal Pradesh", pinCode: "173001", country: "India", aqi: 42, pm25: 11.8, pm10: 21.1, co: 0.31, no2: 8.4, o3: 39.3, so2: 2.1, temperature: 20, humidity: 57, lastUpdated: "1 min ago" },
  { id: "hp5", name: "Palampur", state: "Himachal Pradesh", pinCode: "176061", country: "India", aqi: 35, pm25: 9.8, pm10: 17.6, co: 0.26, no2: 7.1, o3: 41.5, so2: 1.7, temperature: 17, humidity: 54, lastUpdated: "5 min ago" },

  // JHARKHAND
  { id: "jh1", name: "Ranchi", state: "Jharkhand", pinCode: "834001", country: "India", aqi: 98, pm25: 45.7, pm10: 86.1, co: 0.9, no2: 23.5, o3: 28.4, so2: 5.2, temperature: 27, humidity: 60, lastUpdated: "3 min ago" },
  { id: "jh2", name: "Dhanbad", state: "Jharkhand", pinCode: "828101", country: "India", aqi: 125, pm25: 61.2, pm10: 112.4, co: 1.28, no2: 31.5, o3: 23.8, so2: 7.2, temperature: 28, humidity: 59, lastUpdated: "2 min ago" },
  { id: "jh3", name: "Giridih", state: "Jharkhand", pinCode: "815301", country: "India", aqi: 115, pm25: 56.3, pm10: 105.2, co: 1.18, no2: 28.9, o3: 25.6, so2: 6.6, temperature: 27, humidity: 61, lastUpdated: "1 min ago" },
  { id: "jh4", name: "Jamshedpur", state: "Jharkhand", pinCode: "831001", country: "India", aqi: 108, pm25: 51.4, pm10: 96.8, co: 1.12, no2: 27.2, o3: 27.1, so2: 6.2, temperature: 28, humidity: 60, lastUpdated: "4 min ago" },
  { id: "jh5", name: "Bokaro", state: "Jharkhand", pinCode: "827004", country: "India", aqi: 118, pm25: 58.1, pm10: 108.6, co: 1.22, no2: 29.8, o3: 24.9, so2: 6.8, temperature: 28, humidity: 61, lastUpdated: "5 min ago" },

  // KARNATAKA
  { id: "ka1", name: "Bengaluru", state: "Karnataka", pinCode: "560001", country: "India", aqi: 88, pm25: 35.6, pm10: 68.2, co: 0.8, no2: 20.5, o3: 32.8, so2: 4.9, temperature: 27, humidity: 60, lastUpdated: "6 min ago" },
  { id: "ka2", name: "Mysuru", state: "Karnataka", pinCode: "570001", country: "India", aqi: 72, pm25: 26.4, pm10: 51.8, co: 0.62, no2: 16.8, o3: 36.5, so2: 3.9, temperature: 28, humidity: 62, lastUpdated: "4 min ago" },
  { id: "ka3", name: "Mangaluru", state: "Karnataka", pinCode: "575001", country: "India", aqi: 68, pm25: 24.2, pm10: 47.5, co: 0.58, no2: 15.2, o3: 37.8, so2: 3.4, temperature: 29, humidity: 75, lastUpdated: "3 min ago" },
  { id: "ka4", name: "Tumkur", state: "Karnataka", pinCode: "572101", country: "India", aqi: 82, pm25: 32.1, pm10: 62.4, co: 0.75, no2: 19.3, o3: 33.6, so2: 4.4, temperature: 28, humidity: 61, lastUpdated: "2 min ago" },
  { id: "ka5", name: "Davangere", state: "Karnataka", pinCode: "577001", country: "India", aqi: 78, pm25: 29.8, pm10: 58.2, co: 0.70, no2: 17.9, o3: 34.9, so2: 4.0, temperature: 29, humidity: 62, lastUpdated: "1 min ago" },
  { id: "ka6", name: "Belagavi", state: "Karnataka", pinCode: "590001", country: "India", aqi: 92, pm25: 43.5, pm10: 79.8, co: 0.87, no2: 22.3, o3: 31.8, so2: 5.1, temperature: 29, humidity: 60, lastUpdated: "5 min ago" },

  // KERALA
  { id: "kl1", name: "Kochi", state: "Kerala", pinCode: "682001", country: "India", aqi: 62, pm25: 19.2, pm10: 37.8, co: 0.52, no2: 12.4, o3: 35.6, so2: 3.5, temperature: 29, humidity: 82, lastUpdated: "2 min ago" },
  { id: "kl2", name: "Thiruvananthapuram", state: "Kerala", pinCode: "695001", country: "India", aqi: 58, pm25: 17.9, pm10: 34.6, co: 0.5, no2: 10.8, o3: 36.9, so2: 3.1, temperature: 30, humidity: 80, lastUpdated: "1 min ago" },
  { id: "kl3", name: "Kozhikode", state: "Kerala", pinCode: "673001", country: "India", aqi: 64, pm25: 20.1, pm10: 39.2, co: 0.54, no2: 13.2, o3: 35.2, so2: 3.8, temperature: 28, humidity: 81, lastUpdated: "3 min ago" },
  { id: "kl4", name: "Kannur", state: "Kerala", pinCode: "670001", country: "India", aqi: 60, pm25: 18.5, pm10: 36.1, co: 0.51, no2: 11.9, o3: 36.4, so2: 3.3, temperature: 28, humidity: 80, lastUpdated: "4 min ago" },
  { id: "kl5", name: "Malappuram", state: "Kerala", pinCode: "676501", country: "India", aqi: 65, pm25: 20.8, pm10: 40.4, co: 0.55, no2: 13.8, o3: 34.8, so2: 3.9, temperature: 28, humidity: 82, lastUpdated: "2 min ago" },

  // MADHYA PRADESH
  { id: "mp1", name: "Bhopal", state: "Madhya Pradesh", pinCode: "462001", country: "India", aqi: 132, pm25: 67.2, pm10: 112.5, co: 1.1, no2: 28.5, o3: 26.2, so2: 7.4, temperature: 29, humidity: 58, lastUpdated: "3 min ago" },
  { id: "mp2", name: "Indore", state: "Madhya Pradesh", pinCode: "452001", country: "India", aqi: 118, pm25: 58.1, pm10: 108.3, co: 1.22, no2: 29.8, o3: 25.2, so2: 6.9, temperature: 31, humidity: 54, lastUpdated: "2 min ago" },
  { id: "mp3", name: "Jabalpur", state: "Madhya Pradesh", pinCode: "482001", country: "India", aqi: 125, pm25: 61.3, pm10: 114.2, co: 1.28, no2: 31.7, o3: 23.9, so2: 7.1, temperature: 30, humidity: 56, lastUpdated: "1 min ago" },
  { id: "mp4", name: "Gwalior", state: "Madhya Pradesh", pinCode: "474001", country: "India", aqi: 115, pm25: 56.2, pm10: 102.1, co: 1.20, no2: 29.2, o3: 24.8, so2: 6.9, temperature: 30, humidity: 55, lastUpdated: "4 min ago" },
  { id: "mp5", name: "Ujjain", state: "Madhya Pradesh", pinCode: "456001", country: "India", aqi: 108, pm25: 51.4, pm10: 96.8, co: 1.12, no2: 27.2, o3: 27.1, so2: 6.2, temperature: 31, humidity: 56, lastUpdated: "5 min ago" },
  { id: "mp6", name: "Sagar", state: "Madhya Pradesh", pinCode: "470001", country: "India", aqi: 120, pm25: 59.2, pm10: 110.4, co: 1.25, no2: 30.5, o3: 24.1, so2: 7.0, temperature: 30, humidity: 57, lastUpdated: "3 min ago" },

  // MAHARASHTRA
  { id: "mh1", name: "Mumbai", state: "Maharashtra", pinCode: "400001", country: "India", aqi: 156, pm25: 82.3, pm10: 134.6, co: 1.5, no2: 39.8, o3: 21.7, so2: 10.8, temperature: 30, humidity: 78, lastUpdated: "4 min ago" },
  { id: "mh2", name: "Pune", state: "Maharashtra", pinCode: "411001", country: "India", aqi: 108, pm25: 51.2, pm10: 92.8, co: 1.12, no2: 26.8, o3: 26.5, so2: 6.4, temperature: 28, humidity: 60, lastUpdated: "3 min ago" },
  { id: "mh3", name: "Nagpur", state: "Maharashtra", pinCode: "440001", country: "India", aqi: 125, pm25: 61.3, pm10: 114.2, co: 1.28, no2: 31.7, o3: 23.9, so2: 7.1, temperature: 32, humidity: 62, lastUpdated: "2 min ago" },
  { id: "mh4", name: "Aurangabad", state: "Maharashtra", pinCode: "431001", country: "India", aqi: 118, pm25: 58.1, pm10: 108.3, co: 1.22, no2: 29.8, o3: 25.2, so2: 6.9, temperature: 31, humidity: 61, lastUpdated: "1 min ago" },
  { id: "mh5", name: "Nashik", state: "Maharashtra", pinCode: "422001", country: "India", aqi: 112, pm25: 54.3, pm10: 101.4, co: 1.15, no2: 27.6, o3: 26.8, so2: 6.4, temperature: 30, humidity: 62, lastUpdated: "5 min ago" },
  { id: "mh6", name: "Kolhapur", state: "Maharashtra", pinCode: "416001", country: "India", aqi: 105, pm25: 49.8, pm10: 90.2, co: 1.08, no2: 25.4, o3: 27.3, so2: 6.2, temperature: 29, humidity: 63, lastUpdated: "6 min ago" },

  // MANIPUR
  { id: "mn1", name: "Imphal", state: "Manipur", pinCode: "795001", country: "India", aqi: 62, pm25: 18.2, pm10: 36.4, co: 0.5, no2: 12.3, o3: 34.7, so2: 3.1, temperature: 24, humidity: 72, lastUpdated: "5 min ago" },
  { id: "mn2", name: "Senapati", state: "Manipur", pinCode: "795106", country: "India", aqi: 58, pm25: 16.8, pm10: 33.6, co: 0.47, no2: 11.2, o3: 35.8, so2: 2.9, temperature: 22, humidity: 70, lastUpdated: "4 min ago" },
  { id: "mn3", name: "Churachandpur", state: "Manipur", pinCode: "795128", country: "India", aqi: 64, pm25: 19.4, pm10: 38.8, co: 0.52, no2: 13.1, o3: 34.2, so2: 3.2, temperature: 23, humidity: 71, lastUpdated: "3 min ago" },
  { id: "mn4", name: "Thoubal", state: "Manipur", pinCode: "795138", country: "India", aqi: 66, pm25: 20.2, pm10: 40.4, co: 0.54, no2: 13.9, o3: 33.8, so2: 3.4, temperature: 24, humidity: 73, lastUpdated: "2 min ago" },
  { id: "mn5", name: "Bishnupur", state: "Manipur", pinCode: "795142", country: "India", aqi: 60, pm25: 17.5, pm10: 35.0, co: 0.48, no2: 11.8, o3: 35.2, so2: 3.0, temperature: 23, humidity: 71, lastUpdated: "1 min ago" },

  // MEGHALAYA
  { id: "ml1", name: "Shillong", state: "Meghalaya", pinCode: "793001", country: "India", aqi: 48, pm25: 12.6, pm10: 25.3, co: 0.4, no2: 9.8, o3: 37.1, so2: 2.5, temperature: 20, humidity: 68, lastUpdated: "1 min ago" },
  { id: "ml2", name: "Garo Hills", state: "Meghalaya", pinCode: "794101", country: "India", aqi: 45, pm25: 11.8, pm10: 23.6, co: 0.38, no2: 9.2, o3: 37.9, so2: 2.3, temperature: 19, humidity: 67, lastUpdated: "2 min ago" },
  { id: "ml3", name: "Tura", state: "Meghalaya", pinCode: "794001", country: "India", aqi: 50, pm25: 13.2, pm10: 26.4, co: 0.42, no2: 10.3, o3: 36.5, so2: 2.6, temperature: 20, humidity: 69, lastUpdated: "3 min ago" },
  { id: "ml4", name: "Jaintia Hills", state: "Meghalaya", pinCode: "794105", country: "India", aqi: 46, pm25: 12.1, pm10: 24.2, co: 0.39, no2: 9.4, o3: 37.6, so2: 2.4, temperature: 19, humidity: 68, lastUpdated: "4 min ago" },
  { id: "ml5", name: "Nongstoin", state: "Meghalaya", pinCode: "793200", country: "India", aqi: 47, pm25: 12.4, pm10: 24.8, co: 0.40, no2: 9.7, o3: 37.3, so2: 2.5, temperature: 20, humidity: 68, lastUpdated: "1 min ago" },

  // MIZORAM
  { id: "mz1", name: "Aizawl", state: "Mizoram", pinCode: "796001", country: "India", aqi: 52, pm25: 14.1, pm10: 27.6, co: 0.4, no2: 8.7, o3: 36.4, so2: 2.7, temperature: 22, humidity: 73, lastUpdated: "2 min ago" },
  { id: "mz2", name: "Lunglei", state: "Mizoram", pinCode: "796701", country: "India", aqi: 50, pm25: 13.5, pm10: 26.3, co: 0.38, no2: 8.3, o3: 37.1, so2: 2.5, temperature: 21, humidity: 72, lastUpdated: "3 min ago" },
  { id: "mz3", name: "Serchhip", state: "Mizoram", pinCode: "796501", country: "India", aqi: 54, pm25: 14.8, pm10: 28.9, co: 0.42, no2: 9.1, o3: 35.8, so2: 2.8, temperature: 22, humidity: 74, lastUpdated: "1 min ago" },
  { id: "mz4", name: "Champhai", state: "Mizoram", pinCode: "796621", country: "India", aqi: 48, pm25: 13.0, pm10: 25.2, co: 0.36, no2: 7.9, o3: 37.9, so2: 2.4, temperature: 21, humidity: 71, lastUpdated: "4 min ago" },
  { id: "mz5", name: "Kolasib", state: "Mizoram", pinCode: "796801", country: "India", aqi: 51, pm25: 13.8, pm10: 26.9, co: 0.39, no2: 8.5, o3: 36.7, so2: 2.6, temperature: 22, humidity: 72, lastUpdated: "5 min ago" },

  // NAGALAND
  { id: "nl1", name: "Kohima", state: "Nagaland", pinCode: "797001", country: "India", aqi: 46, pm25: 11.8, pm10: 23.7, co: 0.3, no2: 7.4, o3: 40.6, so2: 2.2, temperature: 21, humidity: 70, lastUpdated: "4 min ago" },
  { id: "nl2", name: "Dimapur", state: "Nagaland", pinCode: "797112", country: "India", aqi: 50, pm25: 13.2, pm10: 26.4, co: 0.34, no2: 8.1, o3: 39.8, so2: 2.4, temperature: 23, humidity: 71, lastUpdated: "3 min ago" },
  { id: "nl3", name: "Mon", state: "Nagaland", pinCode: "798627", country: "India", aqi: 48, pm25: 12.5, pm10: 25.0, co: 0.32, no2: 7.8, o3: 40.2, so2: 2.3, temperature: 22, humidity: 70, lastUpdated: "2 min ago" },
  { id: "nl4", name: "Tuensang", state: "Nagaland", pinCode: "798627", country: "India", aqi: 44, pm25: 11.2, pm10: 22.4, co: 0.29, no2: 6.9, o3: 41.4, so2: 2.1, temperature: 20, humidity: 69, lastUpdated: "1 min ago" },
  { id: "nl5", name: "Wokha", state: "Nagaland", pinCode: "798627", country: "India", aqi: 45, pm25: 11.5, pm10: 23.0, co: 0.30, no2: 7.2, o3: 41.0, so2: 2.2, temperature: 21, humidity: 70, lastUpdated: "5 min ago" },

  // ODISHA
  { id: "od1", name: "Bhubaneswar", state: "Odisha", pinCode: "751001", country: "India", aqi: 118, pm25: 57.7, pm10: 108.1, co: 1.2, no2: 27.9, o3: 24.4, so2: 6.8, temperature: 32, humidity: 68, lastUpdated: "3 min ago" },
  { id: "od2", name: "Cuttack", state: "Odisha", pinCode: "753001", country: "India", aqi: 122, pm25: 60.1, pm10: 112.4, co: 1.25, no2: 29.3, o3: 23.8, so2: 7.1, temperature: 32, humidity: 70, lastUpdated: "2 min ago" },
  { id: "od3", name: "Rourkela", state: "Odisha", pinCode: "769001", country: "India", aqi: 128, pm25: 63.5, pm10: 117.2, co: 1.32, no2: 31.2, o3: 22.8, so2: 7.4, temperature: 30, humidity: 66, lastUpdated: "1 min ago" },
  { id: "od4", name: "Balasore", state: "Odisha", pinCode: "756001", country: "India", aqi: 115, pm25: 55.8, pm10: 105.2, co: 1.18, no2: 27.1, o3: 25.3, so2: 6.5, temperature: 31, humidity: 69, lastUpdated: "4 min ago" },
  { id: "od5", name: "Puri", state: "Odisha", pinCode: "752001", country: "India", aqi: 112, pm25: 53.4, pm10: 101.8, co: 1.15, no2: 26.2, o3: 26.2, so2: 6.2, temperature: 32, humidity: 72, lastUpdated: "5 min ago" },
  { id: "od6", name: "Sambalpur", state: "Odisha", pinCode: "768001", country: "India", aqi: 120, pm25: 59.3, pm10: 110.6, co: 1.23, no2: 28.9, o3: 24.1, so2: 6.9, temperature: 31, humidity: 67, lastUpdated: "3 min ago" },

  // PUNJAB
  { id: "pb1", name: "Amritsar", state: "Punjab", pinCode: "143001", country: "India", aqi: 128, pm25: 63.8, pm10: 115.4, co: 1.32, no2: 32.1, o3: 23.4, so2: 7.3, temperature: 28, humidity: 58, lastUpdated: "4 min ago" },
  { id: "pb2", name: "Ludhiana", state: "Punjab", pinCode: "141001", country: "India", aqi: 135, pm25: 68.2, pm10: 121.8, co: 1.38, no2: 34.5, o3: 22.1, so2: 7.8, temperature: 28, humidity: 59, lastUpdated: "3 min ago" },
  { id: "pb3", name: "Jalandhar", state: "Punjab", pinCode: "144001", country: "India", aqi: 132, pm25: 65.4, pm10: 119.2, co: 1.35, no2: 33.2, o3: 22.8, so2: 7.5, temperature: 28, humidity: 58, lastUpdated: "2 min ago" },
  { id: "pb4", name: "Patiala", state: "Punjab", pinCode: "147001", country: "India", aqi: 125, pm25: 61.2, pm10: 114.6, co: 1.28, no2: 30.8, o3: 24.2, so2: 7.0, temperature: 28, humidity: 57, lastUpdated: "1 min ago" },
  { id: "pb5", name: "Bathinda", state: "Punjab", pinCode: "151001", country: "India", aqi: 120, pm25: 58.9, pm10: 110.8, co: 1.22, no2: 29.5, o3: 25.1, so2: 6.8, temperature: 29, humidity: 56, lastUpdated: "5 min ago" },

  // RAJASTHAN
  { id: "rj1", name: "Jaipur", state: "Rajasthan", pinCode: "302001", country: "India", aqi: 118, pm25: 58.6, pm10: 104.5, co: 1.2, no2: 27.8, o3: 25.3, so2: 6.9, temperature: 33, humidity: 52, lastUpdated: "2 min ago" },
  { id: "rj2", name: "Jodhpur", state: "Rajasthan", pinCode: "342001", country: "India", aqi: 108, pm25: 51.2, pm10: 97.6, co: 1.10, no2: 26.3, o3: 28.2, so2: 6.1, temperature: 34, humidity: 48, lastUpdated: "3 min ago" },
  { id: "rj3", name: "Udaipur", state: "Rajasthan", pinCode: "313001", country: "India", aqi: 102, pm25: 48.3, pm10: 91.2, co: 1.02, no2: 24.6, o3: 29.8, so2: 5.6, temperature: 32, humidity: 50, lastUpdated: "1 min ago" },
  { id: "rj4", name: "Ajmer", state: "Rajasthan", pinCode: "305001", country: "India", aqi: 112, pm25: 54.1, pm10: 100.8, co: 1.15, no2: 27.2, o3: 26.4, so2: 6.4, temperature: 33, humidity: 51, lastUpdated: "4 min ago" },
  { id: "rj5", name: "Bikaner", state: "Rajasthan", pinCode: "334001", country: "India", aqi: 105, pm25: 49.8, pm10: 94.2, co: 1.08, no2: 25.4, o3: 27.6, so2: 6.0, temperature: 35, humidity: 46, lastUpdated: "5 min ago" },
  { id: "rj6", name: "Alwar", state: "Rajasthan", pinCode: "301001", country: "India", aqi: 115, pm25: 56.2, pm10: 102.1, co: 1.20, no2: 29.2, o3: 24.8, so2: 6.9, temperature: 32, humidity: 53, lastUpdated: "2 min ago" },

  // SIKKIM
  { id: "sk1", name: "Gangtok", state: "Sikkim", pinCode: "737001", country: "India", aqi: 44, pm25: 12.1, pm10: 21.9, co: 0.3, no2: 7.1, o3: 41.3, so2: 2.0, temperature: 19, humidity: 74, lastUpdated: "1 min ago" },
  { id: "sk2", name: "Namchi", state: "Sikkim", pinCode: "737126", country: "India", aqi: 40, pm25: 11.2, pm10: 20.1, co: 0.28, no2: 6.5, o3: 42.1, so2: 1.8, temperature: 18, humidity: 73, lastUpdated: "2 min ago" },
  { id: "sk3", name: "Gyalshing", state: "Sikkim", pinCode: "737101", country: "India", aqi: 42, pm25: 11.6, pm10: 21.0, co: 0.29, no2: 6.8, o3: 41.7, so2: 1.9, temperature: 19, humidity: 74, lastUpdated: "3 min ago" },
  { id: "sk4", name: "Mangan", state: "Sikkim", pinCode: "737001", country: "India", aqi: 41, pm25: 11.4, pm10: 20.5, co: 0.29, no2: 6.6, o3: 41.5, so2: 1.85, temperature: 18, humidity: 73, lastUpdated: "4 min ago" },
  { id: "sk5", name: "Pakyong", state: "Sikkim", pinCode: "737104", country: "India", aqi: 45, pm25: 12.3, pm10: 22.1, co: 0.31, no2: 7.2, o3: 41.0, so2: 2.1, temperature: 19, humidity: 75, lastUpdated: "1 min ago" },

  // TAMIL NADU
  { id: "tn1", name: "Chennai", state: "Tamil Nadu", pinCode: "600001", country: "India", aqi: 92, pm25: 41.3, pm10: 82.7, co: 0.9, no2: 24.9, o3: 30.4, so2: 5.8, temperature: 34, humidity: 70, lastUpdated: "1 min ago" },
  { id: "tn2", name: "Coimbatore", state: "Tamil Nadu", pinCode: "641001", country: "India", aqi: 88, pm25: 38.4, pm10: 76.2, co: 0.85, no2: 22.1, o3: 32.2, so2: 5.0, temperature: 32, humidity: 64, lastUpdated: "2 min ago" },
  { id: "tn3", name: "Madurai", state: "Tamil Nadu", pinCode: "625001", country: "India", aqi: 98, pm25: 45.2, pm10: 85.8, co: 0.98, no2: 26.3, o3: 28.1, so2: 6.2, temperature: 33, humidity: 68, lastUpdated: "3 min ago" },
  { id: "tn4", name: "Salem", state: "Tamil Nadu", pinCode: "636001", country: "India", aqi: 95, pm25: 43.1, pm10: 81.5, co: 0.94, no2: 25.2, o3: 29.4, so2: 5.7, temperature: 32, humidity: 66, lastUpdated: "4 min ago" },
  { id: "tn5", name: "Tiruchirappalli", state: "Tamil Nadu", pinCode: "620001", country: "India", aqi: 92, pm25: 41.5, pm10: 83.2, co: 0.91, no2: 24.8, o3: 30.6, so2: 5.5, temperature: 33, humidity: 67, lastUpdated: "5 min ago" },
  { id: "tn6", name: "Virudunagar", state: "Tamil Nadu", pinCode: "626001", country: "India", aqi: 90, pm25: 40.2, pm10: 80.4, co: 0.88, no2: 23.9, o3: 31.2, so2: 5.3, temperature: 33, humidity: 65, lastUpdated: "2 min ago" },

  // TELANGANA
  { id: "tg1", name: "Hyderabad", state: "Telangana", pinCode: "500001", country: "India", aqi: 110, pm25: 52.4, pm10: 93.7, co: 1.0, no2: 29.2, o3: 28.1, so2: 6.1, temperature: 28, humidity: 66, lastUpdated: "4 min ago" },
  { id: "tg2", name: "Secunderabad", state: "Telangana", pinCode: "500003", country: "India", aqi: 108, pm25: 51.2, pm10: 92.1, co: 0.98, no2: 28.5, o3: 28.5, so2: 5.9, temperature: 28, humidity: 65, lastUpdated: "3 min ago" },
  { id: "tg3", name: "Warangal", state: "Telangana", pinCode: "506001", country: "India", aqi: 115, pm25: 56.3, pm10: 105.2, co: 1.18, no2: 30.8, o3: 26.2, so2: 6.6, temperature: 30, humidity: 68, lastUpdated: "2 min ago" },
  { id: "tg4", name: "Karimnagar", state: "Telangana", pinCode: "505001", country: "India", aqi: 112, pm25: 54.1, pm10: 100.8, co: 1.15, no2: 29.4, o3: 26.8, so2: 6.4, temperature: 31, humidity: 67, lastUpdated: "1 min ago" },
  { id: "tg5", name: "Khammam", state: "Telangana", pinCode: "507001", country: "India", aqi: 118, pm25: 58.2, pm10: 108.6, co: 1.22, no2: 30.9, o3: 25.4, so2: 6.8, temperature: 31, humidity: 69, lastUpdated: "5 min ago" },

  // TRIPURA
  { id: "tr1", name: "Agartala", state: "Tripura", pinCode: "799001", country: "India", aqi: 85, pm25: 32.7, pm10: 61.3, co: 0.7, no2: 18.9, o3: 33.2, so2: 4.3, temperature: 29, humidity: 75, lastUpdated: "5 min ago" },
  { id: "tr2", name: "Udaipur", state: "Tripura", pinCode: "799120", country: "India", aqi: 82, pm25: 31.2, pm10: 58.6, co: 0.67, no2: 18.1, o3: 33.9, so2: 4.0, temperature: 28, humidity: 74, lastUpdated: "4 min ago" },
  { id: "tr3", name: "Ambassa", state: "Tripura", pinCode: "799101", country: "India", aqi: 88, pm25: 34.5, pm10: 64.8, co: 0.73, no2: 20.1, o3: 32.3, so2: 4.6, temperature: 29, humidity: 76, lastUpdated: "3 min ago" },
  { id: "tr4", name: "Kailashahar", state: "Tripura", pinCode: "799280", country: "India", aqi: 79, pm25: 29.8, pm10: 56.1, co: 0.65, no2: 17.3, o3: 34.6, so2: 3.8, temperature: 28, humidity: 73, lastUpdated: "2 min ago" },
  { id: "tr5", name: "Dharmanagar", state: "Tripura", pinCode: "799250", country: "India", aqi: 86, pm25: 33.6, pm10: 63.2, co: 0.71, no2: 19.5, o3: 32.8, so2: 4.4, temperature: 29, humidity: 75, lastUpdated: "1 min ago" },

  // UTTAR PRADESH
  { id: "up1", name: "Lucknow", state: "Uttar Pradesh", pinCode: "226001", country: "India", aqi: 129, pm25: 64.7, pm10: 116.9, co: 1.3, no2: 33.5, o3: 22.4, so2: 8.1, temperature: 30, humidity: 63, lastUpdated: "1 min ago" },
  { id: "up2", name: "Kanpur", state: "Uttar Pradesh", pinCode: "208001", country: "India", aqi: 145, pm25: 74.2, pm10: 128.6, co: 1.42, no2: 37.8, o3: 20.2, so2: 9.2, temperature: 31, humidity: 62, lastUpdated: "2 min ago" },
  { id: "up3", name: "Varanasi", state: "Uttar Pradesh", pinCode: "221001", country: "India", aqi: 138, pm25: 70.3, pm10: 122.1, co: 1.35, no2: 35.9, o3: 21.3, so2: 8.8, temperature: 30, humidity: 64, lastUpdated: "3 min ago" },
  { id: "up4", name: "Delhi (UP)", state: "Uttar Pradesh", pinCode: "110001", country: "India", aqi: 135, pm25: 68.5, pm10: 120.4, co: 1.38, no2: 34.2, o3: 22.1, so2: 7.8, temperature: 31, humidity: 61, lastUpdated: "1 min ago" },
  { id: "up5", name: "Agra", state: "Uttar Pradesh", pinCode: "282001", country: "India", aqi: 125, pm25: 61.3, pm10: 114.2, co: 1.28, no2: 31.7, o3: 23.9, so2: 7.1, temperature: 32, humidity: 60, lastUpdated: "4 min ago" },
  { id: "up6", name: "Allahabad", state: "Uttar Pradesh", pinCode: "211001", country: "India", aqi: 132, pm25: 66.2, pm10: 118.3, co: 1.35, no2: 33.8, o3: 22.5, so2: 7.9, temperature: 31, humidity: 62, lastUpdated: "5 min ago" },

  // UTTARAKHAND
  { id: "uk1", name: "Dehradun", state: "Uttarakhand", pinCode: "248001", country: "India", aqi: 76, pm25: 28.4, pm10: 54.6, co: 0.6, no2: 16.8, o3: 36.2, so2: 4.0, temperature: 24, humidity: 65, lastUpdated: "2 min ago" },
  { id: "uk2", name: "Nainital", state: "Uttarakhand", pinCode: "263001", country: "India", aqi: 58, pm25: 18.2, pm10: 38.4, co: 0.45, no2: 12.1, o3: 37.8, so2: 3.2, temperature: 18, humidity: 62, lastUpdated: "1 min ago" },
  { id: "uk3", name: "Haridwar", state: "Uttarakhand", pinCode: "249401", country: "India", aqi: 88, pm25: 39.5, pm10: 74.8, co: 0.82, no2: 21.3, o3: 31.5, so2: 4.8, temperature: 25, humidity: 66, lastUpdated: "3 min ago" },
  { id: "uk4", name: "Roorkee", state: "Uttarakhand", pinCode: "247667", country: "India", aqi: 82, pm25: 35.2, pm10: 68.4, co: 0.75, no2: 19.4, o3: 33.2, so2: 4.3, temperature: 24, humidity: 64, lastUpdated: "4 min ago" },
  { id: "uk5", name: "Gairsain", state: "Uttarakhand", pinCode: "263684", country: "India", aqi: 48, pm25: 15.2, pm10: 32.1, co: 0.38, no2: 10.2, o3: 39.1, so2: 2.8, temperature: 16, humidity: 60, lastUpdated: "5 min ago" },

  // WEST BENGAL
  { id: "wb1", name: "Kolkata", state: "West Bengal", pinCode: "700001", country: "India", aqi: 148, pm25: 76.4, pm10: 128.1, co: 1.4, no2: 36.1, o3: 20.7, so2: 9.2, temperature: 31, humidity: 74, lastUpdated: "5 min ago" },
  { id: "wb2", name: "Asansol", state: "West Bengal", pinCode: "713301", country: "India", aqi: 132, pm25: 65.8, pm10: 119.4, co: 1.35, no2: 33.6, o3: 22.8, so2: 7.5, temperature: 30, humidity: 70, lastUpdated: "4 min ago" },
  { id: "wb3", name: "Durgapur", state: "West Bengal", pinCode: "713201", country: "India", aqi: 128, pm25: 63.2, pm10: 116.6, co: 1.30, no2: 32.5, o3: 23.4, so2: 7.2, temperature: 30, humidity: 70, lastUpdated: "3 min ago" },
  { id: "wb4", name: "Siliguri", state: "West Bengal", pinCode: "734001", country: "India", aqi: 92, pm25: 41.8, pm10: 83.4, co: 0.92, no2: 24.3, o3: 30.2, so2: 5.6, temperature: 26, humidity: 72, lastUpdated: "2 min ago" },
  { id: "wb5", name: "Darjeeling", state: "West Bengal", pinCode: "734101", country: "India", aqi: 68, pm25: 24.8, pm10: 49.2, co: 0.58, no2: 15.8, o3: 35.8, so2: 3.6, temperature: 18, humidity: 68, lastUpdated: "1 min ago" },
  { id: "wb6", name: "Jalpaiguri", state: "West Bengal", pinCode: "735101", country: "India", aqi: 85, pm25: 38.2, pm10: 76.1, co: 0.82, no2: 22.4, o3: 31.5, so2: 5.0, temperature: 24, humidity: 71, lastUpdated: "2 min ago" },

  // UNION TERRITORY - DELHI
  { id: "dl1", name: "New Delhi", state: "Delhi (UT)", pinCode: "110001", country: "India", aqi: 187, pm25: 98.4, pm10: 156.2, co: 1.8, no2: 42.1, o3: 18.5, so2: 12.3, temperature: 32, humidity: 65, lastUpdated: "2 min ago" },
  { id: "dl2", name: "Central Delhi", state: "Delhi (UT)", pinCode: "110006", country: "India", aqi: 185, pm25: 97.2, pm10: 154.8, co: 1.78, no2: 41.8, o3: 18.8, so2: 12.1, temperature: 32, humidity: 66, lastUpdated: "3 min ago" },
  { id: "dl3", name: "East Delhi", state: "Delhi (UT)", pinCode: "110091", country: "India", aqi: 182, pm25: 95.6, pm10: 152.3, co: 1.75, no2: 41.2, o3: 19.2, so2: 11.9, temperature: 32, humidity: 65, lastUpdated: "1 min ago" },
  { id: "dl4", name: "West Delhi", state: "Delhi (UT)", pinCode: "110015", country: "India", aqi: 190, pm25: 100.1, pm10: 158.6, co: 1.82, no2: 42.8, o3: 18.2, so2: 12.5, temperature: 33, humidity: 64, lastUpdated: "4 min ago" },
  { id: "dl5", name: "South Delhi", state: "Delhi (UT)", pinCode: "110025", country: "India", aqi: 180, pm25: 94.3, pm10: 150.1, co: 1.72, no2: 40.5, o3: 19.5, so2: 11.7, temperature: 32, humidity: 65, lastUpdated: "2 min ago" },

  // UNION TERRITORY - JAMMU & KASHMIR
  { id: "jk1", name: "Srinagar", state: "Jammu & Kashmir", pinCode: "190001", country: "India", aqi: 72, pm25: 26.7, pm10: 48.3, co: 0.6, no2: 15.4, o3: 37.2, so2: 4.3, temperature: 18, humidity: 55, lastUpdated: "1 min ago" },
  { id: "jk2", name: "Jammu", state: "Jammu & Kashmir", pinCode: "180001", country: "India", aqi: 98, pm25: 46.2, pm10: 88.4, co: 0.98, no2: 25.8, o3: 27.6, so2: 6.2, temperature: 28, humidity: 62, lastUpdated: "2 min ago" },
  { id: "jk3", name: "Anantnag", state: "Jammu & Kashmir", pinCode: "192201", country: "India", aqi: 65, pm25: 20.4, pm10: 41.2, co: 0.53, no2: 13.2, o3: 38.4, so2: 3.6, temperature: 16, humidity: 60, lastUpdated: "3 min ago" },
  { id: "jk4", name: "Baramulla", state: "Jammu & Kashmir", pinCode: "193101", country: "India", aqi: 68, pm25: 22.5, pm10: 43.8, co: 0.57, no2: 14.5, o3: 37.6, so2: 3.9, temperature: 17, humidity: 58, lastUpdated: "4 min ago" },
  { id: "jk5", name: "Samba", state: "Jammu & Kashmir", pinCode: "184121", country: "India", aqi: 92, pm25: 43.5, pm10: 82.3, co: 0.92, no2: 24.1, o3: 29.2, so2: 5.8, temperature: 27, humidity: 64, lastUpdated: "1 min ago" },

  // UNION TERRITORY - LADAKH
  { id: "ld1", name: "Leh", state: "Ladakh", pinCode: "194101", country: "India", aqi: 34, pm25: 8.9, pm10: 14.2, co: 0.2, no2: 4.1, o3: 43.1, so2: 1.2, temperature: 12, humidity: 40, lastUpdated: "3 min ago" },
  { id: "ld2", name: "Kargil", state: "Ladakh", pinCode: "194401", country: "India", aqi: 38, pm25: 10.2, pm10: 16.8, co: 0.23, no2: 5.2, o3: 42.3, so2: 1.5, temperature: 10, humidity: 38, lastUpdated: "2 min ago" },
  { id: "ld3", name: "Nubra", state: "Ladakh", pinCode: "194402", country: "India", aqi: 32, pm25: 8.1, pm10: 13.4, co: 0.18, no2: 3.8, o3: 43.6, so2: 1.0, temperature: 8, humidity: 35, lastUpdated: "1 min ago" },

  // UNION TERRITORY - PUDUCHERRY
  { id: "py1", name: "Puducherry", state: "Puducherry", pinCode: "605001", country: "India", aqi: 60, pm25: 16.1, pm10: 33.2, co: 0.5, no2: 11.8, o3: 35.6, so2: 3.4, temperature: 31, humidity: 77, lastUpdated: "6 min ago" },
  { id: "py2", name: "Yanam", state: "Puducherry", pinCode: "533464", country: "India", aqi: 64, pm25: 18.4, pm10: 36.8, co: 0.54, no2: 13.2, o3: 34.8, so2: 3.7, temperature: 31, humidity: 79, lastUpdated: "5 min ago" },
  { id: "py3", name: "Karaikal", state: "Puducherry", pinCode: "609602", country: "India", aqi: 62, pm25: 17.3, pm10: 35.1, co: 0.52, no2: 12.6, o3: 35.1, so2: 3.5, temperature: 31, humidity: 78, lastUpdated: "4 min ago" },
  { id: "py4", name: "Mahe", state: "Puducherry", pinCode: "673331", country: "India", aqi: 55, pm25: 14.2, pm10: 29.4, co: 0.45, no2: 10.2, o3: 37.2, so2: 3.0, temperature: 29, humidity: 76, lastUpdated: "3 min ago" },

  // UNION TERRITORY - ANDAMAN & NICOBAR
  { id: "an1", name: "Port Blair", state: "Andaman & Nicobar", pinCode: "744101", country: "India", aqi: 28, pm25: 7.1, pm10: 12.3, co: 0.2, no2: 3.5, o3: 44.2, so2: 1.0, temperature: 26, humidity: 83, lastUpdated: "4 min ago" },
  { id: "an2", name: "Rangat", state: "Andaman & Nicobar", pinCode: "744306", country: "India", aqi: 32, pm25: 8.4, pm10: 14.6, co: 0.22, no2: 4.2, o3: 43.1, so2: 1.2, temperature: 27, humidity: 82, lastUpdated: "3 min ago" },
  { id: "an3", name: "Diglipur", state: "Andaman & Nicobar", pinCode: "744301", country: "India", aqi: 30, pm25: 7.8, pm10: 13.5, co: 0.21, no2: 3.9, o3: 43.8, so2: 1.1, temperature: 27, humidity: 84, lastUpdated: "2 min ago" },
  { id: "an4", name: "Barrackpur", state: "Andaman & Nicobar", pinCode: "744102", country: "India", aqi: 26, pm25: 6.5, pm10: 11.2, co: 0.18, no2: 3.1, o3: 44.8, so2: 0.9, temperature: 26, humidity: 85, lastUpdated: "1 min ago" },

  // UNION TERRITORY - CHANDIGARH
  { id: "ch1", name: "Chandigarh", state: "Chandigarh (UT)", pinCode: "160001", country: "India", aqi: 90, pm25: 40.6, pm10: 75.4, co: 0.8, no2: 21.6, o3: 30.7, so2: 5.1, temperature: 28, humidity: 60, lastUpdated: "1 min ago" },
  { id: "ch2", name: "Sector 17", state: "Chandigarh (UT)", pinCode: "160017", country: "India", aqi: 88, pm25: 39.5, pm10: 73.8, co: 0.78, no2: 20.9, o3: 31.2, so2: 4.9, temperature: 28, humidity: 59, lastUpdated: "2 min ago" },
  { id: "ch3", name: "Panchkula", state: "Chandigarh (UT)", pinCode: "134107", country: "India", aqi: 92, pm25: 42.1, pm10: 77.4, co: 0.82, no2: 22.3, o3: 30.1, so2: 5.3, temperature: 28, humidity: 61, lastUpdated: "3 min ago" },

  // UNION TERRITORY - DAMAN & DADI
  { id: "dd1", name: "Daman", state: "Daman & Diu", pinCode: "396210", country: "India", aqi: 70, pm25: 25.8, pm10: 49.6, co: 0.6, no2: 14.7, o3: 34.2, so2: 3.9, temperature: 30, humidity: 72, lastUpdated: "5 min ago" },
  { id: "dd2", name: "Diu", state: "Daman & Diu", pinCode: "362520", country: "India", aqi: 64, pm25: 20.2, pm10: 41.4, co: 0.52, no2: 12.1, o3: 36.8, so2: 3.2, temperature: 30, humidity: 75, lastUpdated: "4 min ago" },
  { id: "dd3", name: "Silvassa", state: "Daman & Diu", pinCode: "396230", country: "India", aqi: 68, pm25: 24.6, pm10: 48.2, co: 0.58, no2: 14.2, o3: 34.9, so2: 3.7, temperature: 29, humidity: 71, lastUpdated: "3 min ago" },

  // UNION TERRITORY - LAKSHADWEEP
  { id: "lk1", name: "Kavaratti", state: "Lakshadweep", pinCode: "682551", country: "India", aqi: 22, pm25: 5.3, pm10: 10.7, co: 0.1, no2: 2.4, o3: 46.8, so2: 0.9, temperature: 28, humidity: 85, lastUpdated: "3 min ago" },
  { id: "lk2", name: "Agatti", state: "Lakshadweep", pinCode: "682553", country: "India", aqi: 24, pm25: 5.8, pm10: 11.4, co: 0.12, no2: 2.8, o3: 46.2, so2: 1.0, temperature: 28, humidity: 84, lastUpdated: "2 min ago" },
  { id: "lk3", name: "Andrott", state: "Lakshadweep", pinCode: "682558", country: "India", aqi: 20, pm25: 4.8, pm10: 9.8, co: 0.09, no2: 2.1, o3: 47.3, so2: 0.8, temperature: 27, humidity: 86, lastUpdated: "1 min ago" },
];


export const generateHourlyData = (baseAqi: number): HourlyData[] => {
  const hours = [];
  for (let i = 23; i >= 0; i--) {
    const h = new Date();
    h.setHours(h.getHours() - i);
    const variance = Math.sin(i * 0.5) * 30 + (Math.random() - 0.5) * 20;
    const aqi = Math.max(10, Math.round(baseAqi + variance));
    hours.push({
      time: h.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" }),
      aqi,
      pm25: +(aqi * 0.52 + Math.random() * 5).toFixed(1),
      pm10: +(aqi * 0.85 + Math.random() * 10).toFixed(1),
    });
  }
  return hours;
};

export const generateWeeklyData = (baseAqi: number) => {
  const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
  return days.map((day, i) => ({
    day,
    aqi: Math.max(15, Math.round(baseAqi + Math.sin(i) * 40 + (Math.random() - 0.5) * 30)),
    pm25: +(baseAqi * 0.5 + Math.sin(i) * 15 + Math.random() * 8).toFixed(1),
    pm10: +(baseAqi * 0.8 + Math.sin(i) * 25 + Math.random() * 12).toFixed(1),
  }));
};

export const predictions: PredictionData[] = [
  { period: "1 Hour", predicted: 172, confidence: 94, lower: 158, upper: 186 },
  { period: "6 Hours", predicted: 165, confidence: 88, lower: 142, upper: 188 },
  { period: "24 Hours", predicted: 148, confidence: 79, lower: 118, upper: 178 },
  { period: "3 Days", predicted: 135, confidence: 68, lower: 98, upper: 172 },
  { period: "7 Days", predicted: 128, confidence: 55, lower: 82, upper: 174 },
];

export const alerts: AlertData[] = [
  { id: "1", type: "threshold", severity: "danger", city: "New Delhi", message: "AQI exceeded 150 — Unhealthy level reached", timestamp: "10 min ago", aqi: 187 },
  { id: "2", type: "spike", severity: "critical", city: "Lagos", message: "Sudden AQI spike detected (+45 in 30min)", timestamp: "25 min ago", aqi: 168 },
  { id: "3", type: "forecast", severity: "warning", city: "Mumbai", message: "AQI predicted to reach 200+ in next 6 hours", timestamp: "1 hour ago", aqi: 156 },
  { id: "4", type: "threshold", severity: "warning", city: "Beijing", message: "PM2.5 concentration exceeds WHO guidelines", timestamp: "2 hours ago", aqi: 142 },
];

export const generateForecastChartData = (baseAqi: number) => {
  const data = [];
  for (let i = -12; i <= 48; i++) {
    const h = new Date();
    h.setHours(h.getHours() + i);
    const isPast = i <= 0;
    const variance = Math.sin(i * 0.3) * 25 + (Math.random() - 0.5) * 15;
    const aqi = Math.max(10, Math.round(baseAqi + variance - i * 0.5));
    data.push({
      time: h.toLocaleTimeString("en-US", { hour: "2-digit", hour12: true }),
      actual: isPast ? aqi : undefined,
      predicted: !isPast ? aqi : undefined,
      upper: !isPast ? aqi + 20 + Math.random() * 10 : undefined,
      lower: !isPast ? Math.max(5, aqi - 20 - Math.random() * 10) : undefined,
    });
  }
  return data;
};

// Search functionality for cities by name, state, or PIN code
export const searchCities = (query: string): CityData[] => {
  if (!query.trim()) return cities;
  
  const lowerQuery = query.toLowerCase();
  
  return cities.filter(city => 
    city.name.toLowerCase().includes(lowerQuery) ||
    city.state.toLowerCase().includes(lowerQuery) ||
    city.pinCode.includes(query)
  );
};

// Get unique states for filtering
export const getStates = (): string[] => {
  const statesSet = new Set(cities.map(city => city.state));
  return Array.from(statesSet).sort();
};

// Get all cities for a specific state
export const getCitiesByState = (state: string): CityData[] => {
  return cities.filter(city => city.state === state);
};
