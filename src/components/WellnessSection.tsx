
import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Play, Pause, FastForward, Rewind } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { translations } from "@/utils/translations";

interface WellnessSectionProps {
  language: string;
}

interface AudioSession {
  id: string;
  title: {
    english: string;
    hindi: string;
    kannada: string;
  };
  duration: string;
  type: "breathing" | "meditation" | "exercise";
}

const sessions: AudioSession[] = [
  {
    id: "breathing1",
    title: {
      english: "Deep Breathing",
      hindi: "गहरी साँस",
      kannada: "ಆಳವಾದ ಉಸಿರಾಟ",
    },
    duration: "5:00",
    type: "breathing",
  },
  {
    id: "meditation1",
    title: {
      english: "Mindful Meditation",
      hindi: "माइंडफुल ध्यान",
      kannada: "ಮನಸ್ಸಿನ ಧ್ಯಾನ",
    },
    duration: "10:00",
    type: "meditation",
  },
  {
    id: "exercise1",
    title: {
      english: "Morning Stretch",
      hindi: "सुबह की स्ट्रेचिंग",
      kannada: "ಬೆಳಗಿನ ಹಿಗ್ಗಿಸುವಿಕೆ",
    },
    duration: "7:30",
    type: "exercise",
  },
  {
    id: "breathing2",
    title: {
      english: "Box Breathing",
      hindi: "बॉक्स ब्रीदिंग",
      kannada: "ಬಾಕ್ಸ್ ಉಸಿರಾಟ",
    },
    duration: "3:00",
    type: "breathing",
  },
  {
    id: "meditation2",
    title: {
      english: "Sleep Meditation",
      hindi: "नींद का ध्यान",
      kannada: "ನಿದ್ರೆ ಧ್ಯಾನ",
    },
    duration: "15:00",
    type: "meditation",
  },
  {
    id: "exercise2",
    title: {
      english: "Desk Exercises",
      hindi: "डेस्क व्यायाम",
      kannada: "ಡೆಸ್ಕ್ ವ್ಯಾಯಾಮಗಳು",
    },
    duration: "8:45",
    type: "exercise",
  },
];

const WellnessSection = ({ language }: WellnessSectionProps) => {
  const [activeSession, setActiveSession] = useState<string | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  
  const handlePlayPause = (sessionId: string) => {
    if (activeSession === sessionId) {
      setIsPlaying(!isPlaying);
    } else {
      setActiveSession(sessionId);
      setIsPlaying(true);
      setProgress(0);
    }
  };
  
  // Simulate progress
  React.useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isPlaying && activeSession) {
      interval = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 100) {
            setIsPlaying(false);
            clearInterval(interval);
            return 0;
          }
          return prev + 1;
        });
      }, 300);
    }
    
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isPlaying, activeSession]);
  
  return (
    <Tabs defaultValue="breathing">
      <TabsList className="grid grid-cols-3 mb-4">
        <TabsTrigger value="breathing">
          {translations[language]?.breathing || "Breathing"}
        </TabsTrigger>
        <TabsTrigger value="meditation">
          {translations[language]?.meditation || "Meditation"}
        </TabsTrigger>
        <TabsTrigger value="exercise">
          {translations[language]?.exercise || "Exercise"}
        </TabsTrigger>
      </TabsList>
      
      {["breathing", "meditation", "exercise"].map((type) => (
        <TabsContent key={type} value={type} className="space-y-4">
          {sessions
            .filter((session) => session.type === type)
            .map((session) => (
              <Card key={session.id} className={`overflow-hidden ${activeSession === session.id ? 'border-primary' : ''}`}>
                <CardContent className="p-0">
                  <div className="flex items-center p-4">
                    <div className="flex-1">
                      <h4 className="font-medium">
                        {session.title[language as keyof typeof session.title] || session.title.english}
                      </h4>
                      <p className="text-sm text-gray-500">{session.duration}</p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Button 
                        variant="ghost" 
                        size="icon"
                        onClick={() => {
                          if (activeSession === session.id) {
                            setProgress(Math.max(0, progress - 10));
                          }
                        }}
                        disabled={activeSession !== session.id}
                      >
                        <Rewind className="h-4 w-4" />
                      </Button>
                      
                      <Button 
                        variant={activeSession === session.id ? "default" : "outline"}
                        size="icon"
                        onClick={() => handlePlayPause(session.id)}
                      >
                        {isPlaying && activeSession === session.id ? (
                          <Pause className="h-4 w-4" />
                        ) : (
                          <Play className="h-4 w-4" />
                        )}
                      </Button>
                      
                      <Button 
                        variant="ghost" 
                        size="icon"
                        onClick={() => {
                          if (activeSession === session.id) {
                            setProgress(Math.min(100, progress + 10));
                          }
                        }}
                        disabled={activeSession !== session.id}
                      >
                        <FastForward className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                  
                  {activeSession === session.id && (
                    <div className="h-1 bg-gray-200">
                      <div
                        className="h-full bg-primary transition-all duration-300"
                        style={{ width: `${progress}%` }}
                      />
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
        </TabsContent>
      ))}
    </Tabs>
  );
};

export default WellnessSection;
