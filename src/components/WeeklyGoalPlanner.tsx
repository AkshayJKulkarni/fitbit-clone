
import React, { useState } from "react";
import { DndContext, useSensor, useSensors, PointerSensor, DragEndEvent } from "@dnd-kit/core";
import { restrictToParentElement } from "@dnd-kit/modifiers";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Progress } from "@/components/ui/progress";
import { Droplet, FootprintsIcon, Moon, ArrowUp, ArrowDown } from "lucide-react";
import { translations } from "@/utils/translations";
import { 
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";

interface WeeklyGoalPlannerProps {
  language: string;
}

interface DayGoal {
  day: string;
  steps: number;
  water: number;
  sleep: number;
  isCompleted: boolean;
}

const initialGoals: DayGoal[] = [
  { day: "Mon", steps: 8000, water: 2, sleep: 7, isCompleted: true },
  { day: "Tue", steps: 8000, water: 2, sleep: 7, isCompleted: true },
  { day: "Wed", steps: 8000, water: 2, sleep: 7, isCompleted: false },
  { day: "Thu", steps: 8000, water: 2, sleep: 7, isCompleted: false },
  { day: "Fri", steps: 8000, water: 2, sleep: 7, isCompleted: false },
  { day: "Sat", steps: 10000, water: 2.5, sleep: 8, isCompleted: false },
  { day: "Sun", steps: 6000, water: 2, sleep: 8, isCompleted: false },
];

const WeeklyGoalPlanner = ({ language }: WeeklyGoalPlannerProps) => {
  const [goals, setGoals] = useState<DayGoal[]>(initialGoals);
  const [activeGoal, setActiveGoal] = useState<number | null>(null);
  const [showHistory, setShowHistory] = useState(false);
  const { toast } = useToast();
  
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    })
  );
  
  const handleSliderChange = (day: string, type: keyof DayGoal, value: number[]) => {
    if (type === 'isCompleted') return; // Don't allow slider to modify completion status
    
    setGoals(
      goals.map((goal) =>
        goal.day === day
          ? { ...goal, [type]: value[0] }
          : goal
      )
    );
  };
  
  const saveGoals = () => {
    toast({
      title: translations[language]?.goalsSaved || "Goals saved!",
      description: translations[language]?.goalsUpdated || "Your weekly goals have been updated.",
    });
  };

  const getDayLabel = (day: string) => {
    if (language === "hindi") {
      const hindiDays: Record<string, string> = {
        "Mon": "सोम",
        "Tue": "मंगल",
        "Wed": "बुध",
        "Thu": "गुरु",
        "Fri": "शुक्र",
        "Sat": "शनि",
        "Sun": "रवि",
      };
      return hindiDays[day] || day;
    } else if (language === "kannada") {
      const kannadaDays: Record<string, string> = {
        "Mon": "ಸೋಮ",
        "Tue": "ಮಂಗಳ",
        "Wed": "ಬುಧ",
        "Thu": "ಗುರು",
        "Fri": "ಶುಕ್ರ",
        "Sat": "ಶನಿ",
        "Sun": "ಭಾನು",
      };
      return kannadaDays[day] || day;
    }
    return day;
  };

  const toggleDayCompletion = (index: number) => {
    const newGoals = [...goals];
    newGoals[index].isCompleted = !newGoals[index].isCompleted;
    setGoals(newGoals);
    
    toast({
      title: newGoals[index].isCompleted 
        ? (translations[language]?.dayCompleted || "Day Completed!") 
        : (translations[language]?.dayIncomplete || "Day Marked Incomplete"),
      description: `${getDayLabel(newGoals[index].day)} ${
        newGoals[index].isCompleted 
          ? (translations[language]?.markedAsComplete || "goals marked as complete") 
          : (translations[language]?.markedAsIncomplete || "goals marked as incomplete")
      }`,
    });
  };

  const moveGoal = (index: number, direction: 'up' | 'down') => {
    if (
      (direction === 'up' && index === 0) || 
      (direction === 'down' && index === goals.length - 1)
    ) {
      return; // Can't move beyond array boundaries
    }

    const newGoals = [...goals];
    const targetIndex = direction === 'up' ? index - 1 : index + 1;
    
    // Swap the goals
    [newGoals[index], newGoals[targetIndex]] = [newGoals[targetIndex], newGoals[index]];
    
    setGoals(newGoals);
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    
    if (over && active.id !== over.id) {
      const activeIndex = parseInt(active.id.toString());
      const overIndex = parseInt(over.id.toString());
      
      const newGoals = [...goals];
      const [removed] = newGoals.splice(activeIndex, 1);
      newGoals.splice(overIndex, 0, removed);
      
      setGoals(newGoals);
    }
  };

  // Calculate weekly progress percentage
  const completedDays = goals.filter(goal => goal.isCompleted).length;
  const totalDays = goals.length;
  const weeklyProgressPercentage = (completedDays / totalDays) * 100;
  
  return (
    <DndContext 
      sensors={sensors}
      modifiers={[restrictToParentElement]}
      onDragEnd={handleDragEnd}
    >
      <div className="space-y-6 animate-fade-in">
        <div className="bg-gradient-to-r from-purple-100 to-blue-100 rounded-lg p-4 shadow-sm">
          <div className="flex justify-between items-center mb-2">
            <h3 className="font-medium">
              {translations[language]?.weeklyProgress || "Weekly Progress"}
            </h3>
            <span className="text-sm font-bold">{completedDays}/{totalDays} {translations[language]?.days || "days"}</span>
          </div>
          <Progress value={weeklyProgressPercentage} className="h-2 mb-1" />
          <div className="flex justify-between text-xs text-gray-500">
            <span>{translations[language]?.startOfWeek || "Start of week"}</span>
            <span>{translations[language]?.endOfWeek || "End of week"}</span>
          </div>
        </div>
        
        <div className="space-y-4">
          {goals.map((goal, index) => (
            <div 
              key={goal.day} 
              id={index.toString()}
              className={`
                p-3 rounded-lg transition-all duration-200
                ${goal.isCompleted 
                  ? 'bg-green-50 border border-green-200' 
                  : 'bg-gray-50 hover:bg-gray-100'
                }
              `}
            >
              <div className="flex justify-between items-center mb-2">
                <div className="flex items-center">
                  <button 
                    onClick={() => toggleDayCompletion(index)}
                    className={`
                      w-5 h-5 rounded-full mr-2 flex items-center justify-center
                      ${goal.isCompleted 
                        ? 'bg-green-500 text-white' 
                        : 'border border-gray-300'
                      }
                    `}
                  >
                    {goal.isCompleted && "✓"}
                  </button>
                  <span className={`font-medium ${goal.isCompleted ? 'text-green-700' : ''}`}>
                    {getDayLabel(goal.day)}
                  </span>
                </div>
                <div className="flex items-center space-x-1">
                  <button 
                    onClick={() => moveGoal(index, 'up')}
                    disabled={index === 0}
                    className={`text-xs p-1 rounded ${index === 0 ? 'text-gray-300' : 'text-gray-500 hover:bg-gray-200'}`}
                  >
                    <ArrowUp size={14} />
                  </button>
                  <button 
                    onClick={() => moveGoal(index, 'down')}
                    disabled={index === goals.length - 1}
                    className={`text-xs p-1 rounded ${index === goals.length - 1 ? 'text-gray-300' : 'text-gray-500 hover:bg-gray-200'}`}
                  >
                    <ArrowDown size={14} />
                  </button>
                  <button 
                    onClick={() => setActiveGoal(activeGoal === index ? null : index)}
                    className="text-xs text-primary"
                  >
                    {activeGoal === index ? 
                      (translations[language]?.close || "Close") : 
                      (translations[language]?.edit || "Edit")}
                  </button>
                </div>
              </div>
              
              {activeGoal === index ? (
                <div className="space-y-4 animate-fade-in">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <FootprintsIcon className="h-4 w-4 mr-2 text-purple-500" />
                        <span className="text-sm">{translations[language]?.steps || "Steps"}</span>
                      </div>
                      <span className="text-sm font-medium">{goal.steps.toLocaleString()}</span>
                    </div>
                    <Slider
                      value={[goal.steps]}
                      min={2000}
                      max={15000}
                      step={500}
                      onValueChange={(value) => handleSliderChange(goal.day, "steps", value)}
                      className="py-1"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <Droplet className="h-4 w-4 mr-2 text-blue-500" />
                        <span className="text-sm">{translations[language]?.water || "Water"} (L)</span>
                      </div>
                      <span className="text-sm font-medium">{goal.water.toFixed(1)}</span>
                    </div>
                    <Slider
                      value={[goal.water]}
                      min={1}
                      max={4}
                      step={0.1}
                      onValueChange={(value) => handleSliderChange(goal.day, "water", value)}
                      className="py-1"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <Moon className="h-4 w-4 mr-2 text-indigo-500" />
                        <span className="text-sm">{translations[language]?.sleep || "Sleep"} (hrs)</span>
                      </div>
                      <span className="text-sm font-medium">{goal.sleep.toFixed(1)}</span>
                    </div>
                    <Slider
                      value={[goal.sleep]}
                      min={5}
                      max={10}
                      step={0.5}
                      onValueChange={(value) => handleSliderChange(goal.day, "sleep", value)}
                      className="py-1"
                    />
                  </div>
                </div>
              ) : (
                <div className="space-y-2">
                  <div className="flex items-center text-xs text-gray-500 space-x-2">
                    <FootprintsIcon className="h-3 w-3" />
                    <span>{goal.steps.toLocaleString()}</span>
                    <Droplet className="h-3 w-3 ml-2" />
                    <span>{goal.water.toFixed(1)}L</span>
                    <Moon className="h-3 w-3 ml-2" />
                    <span>{goal.sleep.toFixed(1)}h</span>
                  </div>
                  <Progress value={
                    // Just for visualization
                    (goal.steps / 10000) * 100 > 100 ? 100 : (goal.steps / 10000) * 100
                  } className={goal.isCompleted ? "h-2 bg-green-100" : "h-2"} />
                </div>
              )}
            </div>
          ))}
        </div>
        
        <Collapsible>
          <div className="flex justify-between items-center">
            <Button 
              className="w-4/5" 
              onClick={saveGoals}
            >
              {translations[language]?.saveGoals || "Save Goals"}
            </Button>
            
            <CollapsibleTrigger asChild>
              <Button 
                variant="outline" 
                size="sm"
                className="ml-2"
                onClick={() => setShowHistory(!showHistory)}
              >
                {showHistory ? "↑" : "↓"}
              </Button>
            </CollapsibleTrigger>
          </div>
          
          <CollapsibleContent>
            <div className="mt-4 p-3 bg-gray-50 rounded-lg">
              <h4 className="font-medium mb-2">{translations[language]?.previousWeek || "Previous Week"}</h4>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>{translations[language]?.steps || "Steps"}</span>
                  <span>45,672</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>{translations[language]?.water || "Water"}</span>
                  <span>12.5L</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>{translations[language]?.sleep || "Sleep"}</span>
                  <span>49.2 hrs</span>
                </div>
                <div className="flex justify-between text-sm font-medium">
                  <span>{translations[language]?.completion || "Completion"}</span>
                  <span className="text-green-600">85%</span>
                </div>
              </div>
            </div>
          </CollapsibleContent>
        </Collapsible>
      </div>
    </DndContext>
  );
};

export default WeeklyGoalPlanner;
