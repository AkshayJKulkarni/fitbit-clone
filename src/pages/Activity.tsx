
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Activity as ActivityIcon, BarChart3 } from "lucide-react";

const Activity = () => {
  return (
    <div className="p-4 md:p-6 max-w-7xl mx-auto">
      <div className="flex flex-wrap items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-900">Activity Dashboard</h2>
        <div className="flex items-center text-sm text-gray-500">
          {new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <ActivityIcon className="mr-2 h-5 w-5 text-primary" />
              Daily Activity
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p>Your recent activity data will appear here.</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <BarChart3 className="mr-2 h-5 w-5 text-primary" />
              Activity Trends
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p>Your activity trends and analysis will appear here.</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Activity;
