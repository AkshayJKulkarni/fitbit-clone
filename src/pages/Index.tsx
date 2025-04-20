import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Activity, BarChart3, Calendar, Clock, Droplet, Heart, Home, MessageCircle, Moon, Settings, Trophy, User } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { useToast } from "@/hooks/use-toast";
import HealthChart from "@/components/HealthChart";
import AiHealthCoach from "@/components/AiHealthCoach";
import WeeklyGoalPlanner from "@/components/WeeklyGoalPlanner";
import WellnessSection from "@/components/WellnessSection";
import Badges from "@/components/Badges";
import LanguageToggle from "@/components/LanguageToggle";
import LoginScreen from "@/components/LoginScreen";
import { useUserAuth } from "@/hooks/useUserAuth";

const Index = () => {
  const { toast } = useToast();
  const { isLoggedIn, logout } = useUserAuth();
  const [language, setLanguage] = useState("english");
  
  useEffect(() => {
    // Check if user is visiting for the first time in this session
    const hasVisited = sessionStorage.getItem("hasVisited");
    if (!hasVisited && isLoggedIn) {
      toast({
        title: "Welcome back!",
        description: "Your fitness journey continues today.",
      });
      sessionStorage.setItem("hasVisited", "true");
    }
  }, [toast, isLoggedIn]);

  if (!isLoggedIn) {
    return <LoginScreen />;
  }

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar */}
      <div className="hidden md:flex flex-col w-64 bg-white border-r border-gray-200 p-4">
        <div className="flex items-center mb-8">
          <svg 
            width="32" 
            height="32" 
            viewBox="0 0 24 24" 
            fill="none" 
            xmlns="http://www.w3.org/2000/svg"
            className="text-primary mr-2"
          >
            <path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z" 
              fill="currentColor" 
              stroke="currentColor" 
              strokeWidth="2" 
              strokeLinecap="round" 
              strokeLinejoin="round"
            />
          </svg>
          <h1 className="text-xl font-bold text-primary">FitDash AI Wellness</h1>
        </div>
        
        <nav className="space-y-1 flex-1">
          <Link 
            to="/" 
            className="flex items-center px-4 py-2 text-sm font-medium text-primary bg-primary-foreground/20 rounded-md"
          >
            <Home className="mr-3 h-5 w-5" />
            Dashboard
          </Link>
          <Link 
            to="/activity"
            className="flex items-center px-4 py-2 text-sm font-medium text-gray-600 hover:bg-gray-100 rounded-md"
          >
            <Activity className="mr-3 h-5 w-5" />
            Activity
          </Link>
          <Link 
            to="/health"
            className="flex items-center px-4 py-2 text-sm font-medium text-gray-600 hover:bg-gray-100 rounded-md"
          >
            <Heart className="mr-3 h-5 w-5" />
            Health
          </Link>
          <Link 
            to="/coaching"
            className="flex items-center px-4 py-2 text-sm font-medium text-gray-600 hover:bg-gray-100 rounded-md"
          >
            <MessageCircle className="mr-3 h-5 w-5" />
            Coaching
          </Link>
          <Link 
            to="/challenges"
            className="flex items-center px-4 py-2 text-sm font-medium text-gray-600 hover:bg-gray-100 rounded-md"
          >
            <Trophy className="mr-3 h-5 w-5" />
            Challenges
          </Link>
          <Link 
            to="/planner"
            className="flex items-center px-4 py-2 text-sm font-medium text-gray-600 hover:bg-gray-100 rounded-md"
          >
            <Calendar className="mr-3 h-5 w-5" />
            Planner
          </Link>
        </nav>
        
        <div className="mt-auto pt-4 border-t border-gray-200">
          <Link 
            to="/settings"
            className="flex items-center px-4 py-2 text-sm font-medium text-gray-600 hover:bg-gray-100 rounded-md"
          >
            <Settings className="mr-3 h-5 w-5" />
            Settings
          </Link>
          <button 
            onClick={logout}
            className="flex w-full items-center px-4 py-2 text-sm font-medium text-gray-600 hover:bg-gray-100 rounded-md"
          >
            <User className="mr-3 h-5 w-5" />
            Logout
          </button>
        </div>
      </div>
      
      {/* Main Content */}
      <div className="flex-1 overflow-auto">
        {/* Top Nav */}
        <header className="bg-white shadow-sm">
          <div className="flex items-center justify-between px-4 py-3">
            <div className="flex items-center md:hidden">
              <svg 
                width="32" 
                height="32" 
                viewBox="0 0 24 24" 
                fill="none" 
                xmlns="http://www.w3.org/2000/svg"
                className="text-primary"
              >
                <path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z" 
                  fill="currentColor" 
                  stroke="currentColor" 
                  strokeWidth="2" 
                  strokeLinecap="round" 
                  strokeLinejoin="round"
                />
              </svg>
            </div>
            <div className="flex items-center space-x-4">
              <LanguageToggle currentLanguage={language} onLanguageChange={setLanguage} />
              <div className="relative">
                <button className="flex text-sm rounded-full focus:outline-none">
                  <img
                    className="h-8 w-8 rounded-full"
                    src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                    alt="User"
                  />
                </button>
              </div>
            </div>
          </div>
        </header>
        
        {/* Dashboard Content */}
        <main className="p-4 md:p-6 max-w-7xl mx-auto">
          <div className="flex flex-wrap items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900">Today's Fitness Dashboard</h2>
            <div className="flex items-center text-sm text-gray-500">
              <Clock className="mr-1 h-4 w-4" />
              {new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
            </div>
          </div>
          
          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-gray-500">Steps</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-baseline">
                  <span className="text-3xl font-bold">8,427</span>
                  <span className="ml-2 text-sm text-gray-500">/ 10,000</span>
                </div>
                <Progress className="h-2 mt-3" value={84} />
              </CardContent>
            </Card>
            
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
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-gray-500">Water</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center">
                  <Droplet className="h-5 w-5 text-blue-500 mr-2" />
                  <span className="text-3xl font-bold">1.2</span>
                  <span className="ml-2 text-sm text-gray-500">L / 2.5 L</span>
                </div>
                <Progress className="h-2 mt-3" value={48} />
              </CardContent>
            </Card>
          </div>
          
          {/* Interactive Analytics Dashboard */}
          <div className="mb-6">
            <Card>
              <CardHeader>
                <CardTitle>Activity Trends</CardTitle>
                <CardDescription>Your activity over time</CardDescription>
              </CardHeader>
              <CardContent>
                <Tabs defaultValue="weekly">
                  <div className="flex justify-between items-center">
                    <TabsList>
                      <TabsTrigger value="weekly">Weekly</TabsTrigger>
                      <TabsTrigger value="monthly">Monthly</TabsTrigger>
                    </TabsList>
                    <div className="flex items-center space-x-2">
                      <button className="text-xs font-medium text-primary">
                        Steps
                      </button>
                      <button className="text-xs font-medium text-gray-500">
                        Heart Rate
                      </button>
                      <button className="text-xs font-medium text-gray-500">
                        Sleep
                      </button>
                    </div>
                  </div>
                  
                  <TabsContent value="weekly" className="mt-4 h-[300px]">
                    <HealthChart type="weekly" />
                  </TabsContent>
                  
                  <TabsContent value="monthly" className="mt-4 h-[300px]">
                    <HealthChart type="monthly" />
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          </div>
          
          {/* Features Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
            {/* Weekly Goal Planner */}
            <Card>
              <CardHeader>
                <CardTitle>Weekly Goal Planner</CardTitle>
                <CardDescription>Set and track your weekly goals</CardDescription>
              </CardHeader>
              <CardContent>
                <WeeklyGoalPlanner language={language} />
              </CardContent>
            </Card>
            
            {/* Wellness Section */}
            <Card>
              <CardHeader>
                <CardTitle>Wellness Center</CardTitle>
                <CardDescription>Guided sessions for your well-being</CardDescription>
              </CardHeader>
              <CardContent>
                <WellnessSection language={language} />
              </CardContent>
            </Card>
          </div>
          
          {/* Badges */}
          <div className="mb-6">
            <Card>
              <CardHeader>
                <CardTitle>Your Achievements</CardTitle>
                <CardDescription>Badges you've earned</CardDescription>
              </CardHeader>
              <CardContent>
                <Badges language={language} />
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
      
      {/* AI Health Coach Widget */}
      <AiHealthCoach language={language} />
    </div>
  );
};

export default Index;
