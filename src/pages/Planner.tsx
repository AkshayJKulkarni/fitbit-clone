
import React from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Calendar as CalendarIcon, CheckSquare } from "lucide-react";
import WeeklyGoalPlanner from "@/components/WeeklyGoalPlanner";

const Planner = () => {
  return (
    <div className="p-4 md:p-6 max-w-7xl mx-auto">
      <div className="flex flex-wrap items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-900">Fitness Planner</h2>
        <div className="flex items-center text-sm text-gray-500">
          {new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <CheckSquare className="mr-2 h-5 w-5 text-primary" />
              Weekly Goals
            </CardTitle>
            <CardDescription>Set and track your weekly fitness goals</CardDescription>
          </CardHeader>
          <CardContent>
            <WeeklyGoalPlanner language="english" />
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <CalendarIcon className="mr-2 h-5 w-5 text-primary" />
              Schedule
            </CardTitle>
            <CardDescription>Your upcoming fitness activities</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { day: "Monday", activities: ["Morning run - 7:00 AM", "Yoga class - 6:30 PM"] },
                { day: "Tuesday", activities: ["Strength training - 5:30 PM"] },
                { day: "Wednesday", activities: ["Rest day", "Stretching - 7:00 PM"] },
                { day: "Thursday", activities: ["HIIT workout - 6:00 AM", "Swimming - 7:00 PM"] },
                { day: "Friday", activities: ["Cycling - 5:30 PM"] }
              ].map((schedule) => (
                <div key={schedule.day} className="border-b pb-3 last:border-0 last:pb-0">
                  <h3 className="font-medium text-sm mb-2">{schedule.day}</h3>
                  <ul className="space-y-1">
                    {schedule.activities.map((activity, index) => (
                      <li key={index} className="text-sm flex items-start">
                        <span className="inline-block h-1.5 w-1.5 rounded-full bg-primary mt-1.5 mr-2"></span>
                        {activity}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Planner;
