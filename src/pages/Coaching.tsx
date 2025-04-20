
import React from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { MessageCircle, Video, BookOpen } from "lucide-react";
import AiHealthCoach from "@/components/AiHealthCoach";

const Coaching = () => {
  return (
    <div className="p-4 md:p-6 max-w-7xl mx-auto">
      <div className="flex flex-wrap items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-900">Coaching Dashboard</h2>
        <div className="flex items-center text-sm text-gray-500">
          {new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <MessageCircle className="mr-2 h-5 w-5 text-primary" />
              Chat with Coach
            </CardTitle>
            <CardDescription>Get personalized advice from your AI health coach</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="mb-4">Ask questions about nutrition, exercise, sleep, or any health topic.</p>
            <div className="p-4 bg-primary-foreground/20 rounded-md">
              <p className="text-sm text-gray-600 italic">Use the AI Health Coach widget in the corner for immediate assistance.</p>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Video className="mr-2 h-5 w-5 text-primary" />
              Video Sessions
            </CardTitle>
            <CardDescription>Schedule video consultations with experts</CardDescription>
          </CardHeader>
          <CardContent>
            <p>Coming soon: Book video sessions with nutrition experts, fitness trainers, and health specialists.</p>
          </CardContent>
        </Card>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <BookOpen className="mr-2 h-5 w-5 text-primary" />
            Learning Resources
          </CardTitle>
          <CardDescription>Educational content to improve your health knowledge</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 border rounded-md">
              <h3 className="font-medium mb-2">Nutrition Basics</h3>
              <p className="text-sm text-gray-600">Learn the fundamentals of balanced nutrition.</p>
            </div>
            <div className="p-4 border rounded-md">
              <h3 className="font-medium mb-2">Exercise Essentials</h3>
              <p className="text-sm text-gray-600">Discover effective workout strategies.</p>
            </div>
            <div className="p-4 border rounded-md">
              <h3 className="font-medium mb-2">Sleep Improvement</h3>
              <p className="text-sm text-gray-600">Tips for better sleep quality.</p>
            </div>
          </div>
        </CardContent>
      </Card>
      
      {/* Include the AI Health Coach component */}
      <div className="hidden">
        <AiHealthCoach language="english" />
      </div>
    </div>
  );
};

export default Coaching;
