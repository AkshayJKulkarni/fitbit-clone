
import React, { useState } from "react";
import { 
  Line, 
  Bar, 
  CartesianGrid, 
  XAxis, 
  YAxis, 
  ResponsiveContainer, 
  ComposedChart, 
  Legend, 
  Tooltip,
  Area,
  ReferenceLine
} from "recharts";
import { ChartContainer } from "@/components/ui/chart";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { translations } from "@/utils/translations";

interface HealthChartProps {
  type: "weekly" | "monthly";
  language?: string;
}

// Enhanced weekly data with more metrics
const weeklyData = [
  { name: "Mon", steps: 7500, heartRate: 68, sleep: 7.2, calories: 1850, water: 1.8 },
  { name: "Tue", steps: 9200, heartRate: 72, sleep: 6.8, calories: 2100, water: 2.1 },
  { name: "Wed", steps: 8100, heartRate: 70, sleep: 7.5, calories: 1950, water: 2.0 },
  { name: "Thu", steps: 10500, heartRate: 74, sleep: 6.5, calories: 2200, water: 2.3 },
  { name: "Fri", steps: 9800, heartRate: 71, sleep: 7.1, calories: 2050, water: 2.2 },
  { name: "Sat", steps: 5600, heartRate: 68, sleep: 8.2, calories: 1750, water: 1.9 },
  { name: "Sun", steps: 6900, heartRate: 67, sleep: 7.8, calories: 1800, water: 2.0 },
];

// Alternative data for previous week for comparison
const previousWeeklyData = [
  { name: "Mon", steps: 6800, heartRate: 69, sleep: 6.9, calories: 1800, water: 1.7 },
  { name: "Tue", steps: 8500, heartRate: 70, sleep: 7.0, calories: 1950, water: 1.9 },
  { name: "Wed", steps: 7900, heartRate: 71, sleep: 7.2, calories: 1900, water: 1.8 },
  { name: "Thu", steps: 9200, heartRate: 73, sleep: 6.8, calories: 2100, water: 2.1 },
  { name: "Fri", steps: 8700, heartRate: 70, sleep: 7.4, calories: 1950, water: 2.0 },
  { name: "Sat", steps: 5200, heartRate: 67, sleep: 8.0, calories: 1700, water: 1.8 },
  { name: "Sun", steps: 6500, heartRate: 66, sleep: 7.5, calories: 1750, water: 1.9 },
];

const monthlyData = [
  { name: "Week 1", steps: 52000, heartRate: 69, sleep: 7.0, calories: 13500, water: 14.0 },
  { name: "Week 2", steps: 58000, heartRate: 71, sleep: 7.2, calories: 14200, water: 14.5 },
  { name: "Week 3", steps: 49000, heartRate: 70, sleep: 6.8, calories: 13800, water: 13.5 },
  { name: "Week 4", steps: 62000, heartRate: 72, sleep: 7.4, calories: 14500, water: 15.0 },
];

const previousMonthlyData = [
  { name: "Week 1", steps: 48000, heartRate: 68, sleep: 6.8, calories: 13200, water: 13.5 },
  { name: "Week 2", steps: 54000, heartRate: 70, sleep: 7.0, calories: 13900, water: 14.0 },
  { name: "Week 3", steps: 47000, heartRate: 69, sleep: 6.6, calories: 13500, water: 13.0 },
  { name: "Week 4", steps: 56000, heartRate: 71, sleep: 7.2, calories: 14100, water: 14.5 },
];

const translatedDays = {
  english: {
    "Mon": "Mon", "Tue": "Tue", "Wed": "Wed", "Thu": "Thu", "Fri": "Fri", "Sat": "Sat", "Sun": "Sun",
    "Week 1": "Week 1", "Week 2": "Week 2", "Week 3": "Week 3", "Week 4": "Week 4"
  },
  hindi: {
    "Mon": "सोम", "Tue": "मंगल", "Wed": "बुध", "Thu": "गुरु", "Fri": "शुक्र", "Sat": "शनि", "Sun": "रवि",
    "Week 1": "सप्ताह 1", "Week 2": "सप्ताह 2", "Week 3": "सप्ताह 3", "Week 4": "सप्ताह 4"
  },
  kannada: {
    "Mon": "ಸೋಮ", "Tue": "ಮಂಗಳ", "Wed": "ಬುಧ", "Thu": "ಗುರು", "Fri": "ಶುಕ್ರ", "Sat": "ಶನಿ", "Sun": "ಭಾನು",
    "Week 1": "ವಾರ 1", "Week 2": "ವಾರ 2", "Week 3": "ವಾರ 3", "Week 4": "ವಾರ 4"
  }
};

const HealthChart = ({ type, language = "english" }: HealthChartProps) => {
  const [activeMetric, setActiveMetric] = useState<"steps" | "heartRate" | "sleep" | "calories" | "water">("steps");
  const [showComparison, setShowComparison] = useState(false);
  const [currentPeriod, setCurrentPeriod] = useState<"current" | "previous">("current");
  
  const data = type === "weekly" 
    ? (currentPeriod === "current" ? weeklyData : previousWeeklyData)
    : (currentPeriod === "current" ? monthlyData : previousMonthlyData);
  
  const comparisonData = type === "weekly" ? previousWeeklyData : previousMonthlyData;
  
  // Translate day names based on selected language
  const localizedData = data.map(item => ({
    ...item,
    localName: translatedDays[language as keyof typeof translatedDays]?.[item.name] || item.name
  }));

  const getMetricColor = (metric: string) => {
    switch (metric) {
      case "steps": return "#8B5CF6"; // Purple
      case "heartRate": return "#F97316"; // Orange
      case "sleep": return "#0EA5E9"; // Blue
      case "calories": return "#EF4444"; // Red
      case "water": return "#3B82F6"; // Blue
      default: return "#8B5CF6";
    }
  };

  const getMetricDataKey = (metric: string) => {
    return metric;
  };

  const getYAxisLabel = () => {
    switch (activeMetric) {
      case "steps": return translations[language]?.steps || "Steps";
      case "heartRate": return translations[language]?.heartRate || "Heart Rate (bpm)";
      case "sleep": return translations[language]?.sleep || "Sleep (hours)";
      case "calories": return translations[language]?.calories || "Calories";
      case "water": return translations[language]?.water || "Water (L)";
      default: return "";
    }
  };

  const getMetricAverageValue = (metricName: string) => {
    const sum = data.reduce((acc, item) => acc + (item as any)[metricName], 0);
    return (sum / data.length).toFixed(
      metricName === "sleep" || metricName === "water" ? 1 : 0
    );
  };

  const togglePeriod = () => {
    setCurrentPeriod(prev => prev === "current" ? "previous" : "current");
  };

  // Create custom Tooltip component to display formatted values
  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      const value = payload[0].value;
      
      let formattedValue;
      switch (activeMetric) {
        case "steps":
          formattedValue = value.toLocaleString();
          break;
        case "sleep":
        case "water":
          formattedValue = `${value.toFixed(1)}`;
          break;
        default:
          formattedValue = value;
      }
      
      return (
        <div className="bg-white p-2 border border-gray-200 shadow-sm rounded-md">
          <p className="font-medium">{label}</p>
          <p className="text-sm" style={{ color: getMetricColor(activeMetric) }}>
            {`${getYAxisLabel()}: ${formattedValue}`}
          </p>
          {showComparison && (
            <p className="text-xs text-gray-500">
              {translations[language]?.vs || "vs"} {translations[language]?.previous || "previous"}: 
              {(payload[1]?.value || 0).toLocaleString()}
            </p>
          )}
        </div>
      );
    }
    return null;
  };
  
  return (
    <div className="space-y-4">
      <div className="flex flex-wrap justify-between items-center">
        <div className="flex flex-wrap gap-2 mb-2">
          <Button
            variant={activeMetric === "steps" ? "default" : "outline"}
            size="sm"
            onClick={() => setActiveMetric("steps")}
            className="text-xs"
          >
            {translations[language]?.steps || "Steps"}
          </Button>
          <Button
            variant={activeMetric === "heartRate" ? "default" : "outline"}
            size="sm"
            onClick={() => setActiveMetric("heartRate")}
            className="text-xs"
          >
            {translations[language]?.heartRate || "Heart Rate"}
          </Button>
          <Button
            variant={activeMetric === "sleep" ? "default" : "outline"}
            size="sm"
            onClick={() => setActiveMetric("sleep")}
            className="text-xs"
          >
            {translations[language]?.sleep || "Sleep"}
          </Button>
          <Button
            variant={activeMetric === "calories" ? "default" : "outline"}
            size="sm"
            onClick={() => setActiveMetric("calories")}
            className="text-xs"
          >
            {translations[language]?.calories || "Calories"}
          </Button>
          <Button
            variant={activeMetric === "water" ? "default" : "outline"}
            size="sm"
            onClick={() => setActiveMetric("water")}
            className="text-xs"
          >
            {translations[language]?.water || "Water"}
          </Button>
        </div>
        
        <div className="flex items-center space-x-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={togglePeriod}
          >
            {currentPeriod === "current" 
              ? (translations[language]?.current || "Current") 
              : (translations[language]?.previous || "Previous")}
          </Button>
          
          <Button
            variant="outline"
            size="sm"
            onClick={() => setShowComparison(!showComparison)}
            className={showComparison ? "bg-primary/10" : ""}
          >
            {showComparison 
              ? (translations[language]?.hideComparison || "Hide Comparison") 
              : (translations[language]?.showComparison || "Show Comparison")}
          </Button>
        </div>
      </div>
      
      <div className="bg-gray-50 p-3 rounded-lg mb-2">
        <div className="flex justify-between items-center">
          <div>
            <span className="text-sm font-medium">{getYAxisLabel()}</span>
            <p className="text-2xl font-bold" style={{ color: getMetricColor(activeMetric) }}>
              {getMetricAverageValue(activeMetric)}
              <span className="text-sm text-gray-500 ml-1">
                {activeMetric === "heartRate" ? "bpm" : 
                 activeMetric === "sleep" ? "hrs" : 
                 activeMetric === "water" ? "L" : 
                 activeMetric === "steps" ? "avg" : "avg"}
              </span>
            </p>
          </div>
          
          <div className="flex space-x-2">
            <Button variant="ghost" size="icon" onClick={togglePeriod} className="h-8 w-8">
              <ArrowLeft className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="icon" onClick={togglePeriod} className="h-8 w-8">
              <ArrowRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>

      <ChartContainer
        config={{
          [activeMetric]: { color: getMetricColor(activeMetric) },
          [`${activeMetric}Prev`]: { color: "#94A3B8" } // Slate color for comparison
        }}
        className="h-[240px]"
      >
        <ResponsiveContainer width="100%" height="100%">
          <ComposedChart data={localizedData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis 
              dataKey="localName" 
              fontSize={12}
            />
            <YAxis 
              yAxisId="left" 
              orientation="left" 
              domain={['auto', 'auto']}
              fontSize={12}
            />
            <Tooltip content={<CustomTooltip />} />
            
            {/* Add reference line for the average if showing steps or calories */}
            {(activeMetric === "steps" || activeMetric === "calories") && (
              <ReferenceLine 
                y={parseFloat(getMetricAverageValue(activeMetric))} 
                strokeDasharray="3 3"
                stroke={getMetricColor(activeMetric)} 
                opacity={0.6} 
              />
            )}
            
            {activeMetric === "steps" || activeMetric === "calories" ? (
              // Bar chart for steps and calories
              <Bar
                dataKey={getMetricDataKey(activeMetric)}
                fill={getMetricColor(activeMetric)}
                opacity={0.8}
                radius={4}
                maxBarSize={30}
                yAxisId="left"
              />
            ) : (
              // Line chart for heart rate, sleep, and water
              <Line
                type="monotone"
                dataKey={getMetricDataKey(activeMetric)}
                stroke={getMetricColor(activeMetric)}
                strokeWidth={2}
                dot={{ strokeWidth: 2, r: 4 }}
                activeDot={{ r: 6, strokeWidth: 0 }}
                yAxisId="left"
              />
            )}
            
            {/* Show comparison data if enabled */}
            {showComparison && (
              activeMetric === "steps" || activeMetric === "calories" ? (
                // Bar chart for comparison
                <Bar
                  dataKey={getMetricDataKey(activeMetric)}
                  data={type === "weekly" ? previousWeeklyData : previousMonthlyData}
                  fill="#94A3B8"
                  opacity={0.4}
                  radius={4}
                  maxBarSize={30}
                  yAxisId="left"
                  name={`${activeMetric}Prev`}
                />
              ) : (
                // Line chart for comparison
                <Line
                  type="monotone"
                  dataKey={getMetricDataKey(activeMetric)}
                  data={type === "weekly" ? previousWeeklyData : previousMonthlyData}
                  stroke="#94A3B8"
                  strokeWidth={1.5}
                  strokeDasharray="4 4"
                  dot={{ r: 0 }}
                  activeDot={{ r: 4, strokeWidth: 0 }}
                  yAxisId="left"
                  name={`${activeMetric}Prev`}
                />
              )
            )}
            
            {/* Add area under curve for sleep and water metrics */}
            {(activeMetric === "sleep" || activeMetric === "water") && (
              <Area
                type="monotone"
                dataKey={getMetricDataKey(activeMetric)}
                fillOpacity={0.2}
                stroke="none"
                fill={getMetricColor(activeMetric)}
                yAxisId="left"
              />
            )}
          </ComposedChart>
        </ResponsiveContainer>
      </ChartContainer>
    </div>
  );
};

export default HealthChart;
