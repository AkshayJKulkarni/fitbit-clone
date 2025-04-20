
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Heart, Activity, Moon, BarChart3 } from "lucide-react";
import HealthChart from "@/components/HealthChart";

const Health = () => {
  return (
    <div className="p-4 md:p-6 max-w-7xl mx-auto">
      <div className="flex flex-wrap items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-900">Health Dashboard</h2>
        <div className="flex items-center text-sm text-gray-500">
          {new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">Heart Rate</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center">
              <Heart className="h-5 w-5 text-red-500 mr-2" />
              <span className="text-3xl font-bold">72</span>
              <span className="ml-2 text-sm text-gray-500">bpm</span>
            </div>
            <div className="text-xs text-gray-500 mt-2">
              Resting: 62 bpm
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">Activity Level</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center">
              <Activity className="h-5 w-5 text-green-500 mr-2" />
              <span className="text-3xl font-bold">Medium</span>
            </div>
            <div className="text-xs text-gray-500 mt-2">
              Based on your recent activity
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">Sleep</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center">
              <Moon className="h-5 w-5 text-indigo-500 mr-2" />
              <span className="text-3xl font-bold">7.2</span>
              <span className="ml-2 text-sm text-gray-500">hrs</span>
            </div>
            <div className="text-xs text-gray-500 mt-2">
              Deep sleep: 1.8 hrs
            </div>
          </CardContent>
        </Card>
      </div>
      
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Health Trends</CardTitle>
        </CardHeader>
        <CardContent className="h-[300px]">
          <HealthChart type="weekly" />
        </CardContent>
      </Card>
    </div>
  );
};

export default Health;
