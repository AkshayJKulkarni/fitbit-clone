
import React from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Trophy, Users, Calendar, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";

const Challenges = () => {
  return (
    <div className="p-4 md:p-6 max-w-7xl mx-auto">
      <div className="flex flex-wrap items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-900">Fitness Challenges</h2>
        <div className="flex items-center text-sm text-gray-500">
          {new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
        </div>
      </div>
      
      {/* Active Challenge */}
      <Card className="mb-6 border-primary/20">
        <CardHeader className="bg-primary-foreground/10">
          <div className="flex justify-between items-center">
            <CardTitle className="flex items-center">
              <Trophy className="mr-2 h-5 w-5 text-primary" />
              Active Challenge
            </CardTitle>
            <span className="text-xs font-medium px-2 py-1 bg-primary/10 text-primary rounded-full">In Progress</span>
          </div>
          <CardDescription>10,000 Steps Daily for 7 Days</CardDescription>
        </CardHeader>
        <CardContent className="pt-6">
          <div className="mb-4">
            <div className="flex justify-between mb-2 text-sm">
              <span>Progress: 4/7 days</span>
              <span>57%</span>
            </div>
            <Progress value={57} className="h-2" />
          </div>
          <div className="grid grid-cols-7 gap-1 mb-4">
            {[1, 2, 3, 4, 5, 6, 7].map((day) => (
              <div key={day} className="text-center">
                <div className={`h-8 w-8 rounded-full flex items-center justify-center mx-auto ${day <= 4 ? 'bg-primary text-white' : 'bg-gray-100'}`}>
                  {day}
                </div>
                <div className="text-xs mt-1">
                  {day <= 4 && <CheckCircle className="h-3 w-3 mx-auto text-green-500" />}
                </div>
              </div>
            ))}
          </div>
          <div className="flex items-center text-sm text-gray-600">
            <Users className="h-4 w-4 mr-2" />
            <span>326 participants</span>
            <Calendar className="h-4 w-4 ml-4 mr-2" />
            <span>3 days remaining</span>
          </div>
        </CardContent>
        <CardFooter className="border-t bg-gray-50 flex justify-between">
          <Button variant="outline" size="sm">Details</Button>
          <Button size="sm">Track Today</Button>
        </CardFooter>
      </Card>
      
      {/* Available Challenges */}
      <h3 className="text-lg font-medium mb-4">Available Challenges</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {[
          {
            title: "Morning Runner",
            description: "Run 3km every morning for 5 days",
            participants: 156,
            difficulty: "Medium",
          },
          {
            title: "Hydration Hero",
            description: "Drink 3L of water daily for 10 days",
            participants: 284,
            difficulty: "Easy",
          },
          {
            title: "Strength Master",
            description: "Complete 50 pushups daily for 7 days",
            participants: 92,
            difficulty: "Hard",
          }
        ].map((challenge, index) => (
          <Card key={index}>
            <CardHeader className="pb-2">
              <CardTitle className="text-base">{challenge.title}</CardTitle>
              <CardDescription>{challenge.description}</CardDescription>
            </CardHeader>
            <CardContent className="pb-2">
              <div className="flex justify-between text-sm text-gray-600">
                <div className="flex items-center">
                  <Users className="h-4 w-4 mr-1" />
                  {challenge.participants}
                </div>
                <div>
                  <span className={`px-2 py-0.5 rounded-full text-xs ${
                    challenge.difficulty === "Easy" ? "bg-green-100 text-green-800" :
                    challenge.difficulty === "Medium" ? "bg-yellow-100 text-yellow-800" :
                    "bg-red-100 text-red-800"
                  }`}>
                    {challenge.difficulty}
                  </span>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="outline" size="sm" className="w-full">Join Challenge</Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Challenges;
