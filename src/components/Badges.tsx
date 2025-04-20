
import React, { useState } from "react";
import { Award, Droplet, FootprintsIcon, Heart, Moon, Flame, Clock, Trophy, Zap } from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { translations } from "@/utils/translations";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";

interface BadgesProps {
  language: string;
}

interface Badge {
  id: string;
  icon: React.ReactNode;
  color: string;
  title: {
    english: string;
    hindi: string;
    kannada: string;
  };
  description: {
    english: string;
    hindi: string;
    kannada: string;
  };
  earned: boolean;
  progress: number;
  earnedDate?: string;
  tier: "bronze" | "silver" | "gold";
}

const badgesList: Badge[] = [
  {
    id: "step-champion",
    icon: <FootprintsIcon />,
    color: "bg-purple-100 text-purple-700",
    title: {
      english: "Step Champion",
      hindi: "स्टेप चैंपियन",
      kannada: "ಹೆಜ್ಜೆ ಚಾಂಪಿಯನ್",
    },
    description: {
      english: "Achieved 10,000 steps for 7 consecutive days",
      hindi: "7 दिनों तक लगातार 10,000 कदम पूरे किए",
      kannada: "7 ದಿನಗಳ ಕಾಲ 10,000 ಹೆಜ್ಜೆಗಳನ್ನು ಸಾಧಿಸಿದ್ದಾರೆ",
    },
    earned: true,
    progress: 100,
    earnedDate: "2023-04-15",
    tier: "gold",
  },
  {
    id: "hydration-hero",
    icon: <Droplet />,
    color: "bg-blue-100 text-blue-700",
    title: {
      english: "Hydration Hero",
      hindi: "हाइड्रेशन हीरो",
      kannada: "ಹೈಡ್ರೇಷನ್ ಹೀರೋ",
    },
    description: {
      english: "Met your water goal for 5 consecutive days",
      hindi: "5 दिनों तक लगातार अपना पानी का लक्ष्य पूरा किया",
      kannada: "5 ದಿನಗಳ ಕಾಲ ನಿಮ್ಮ ನೀರಿನ ಗುರಿಯನ್ನು ತಲುಪಿದ್ದೀರಿ",
    },
    earned: true,
    progress: 100,
    earnedDate: "2023-04-10",
    tier: "silver",
  },
  {
    id: "sleep-master",
    icon: <Moon />,
    color: "bg-indigo-100 text-indigo-700",
    title: {
      english: "Sleep Master",
      hindi: "स्लीप मास्टर",
      kannada: "ನಿದ್ರೆ ಮಾಸ್ಟರ್",
    },
    description: {
      english: "Maintained healthy sleep for 10 days",
      hindi: "10 दिनों तक स्वस्थ नींद बनाए रखी",
      kannada: "10 ದಿನಗಳ ಕಾಲ ಆರೋಗ್ಯಕರ ನಿದ್ದೆಯನ್ನು ಕಾಪಾಡಿಕೊಂಡಿದ್ದೀರಿ",
    },
    earned: false,
    progress: 70,
    tier: "bronze",
  },
  {
    id: "heart-healthy",
    icon: <Heart />,
    color: "bg-red-100 text-red-700",
    title: {
      english: "Heart Healthy",
      hindi: "हार्ट हेल्दी",
      kannada: "ಹೃದಯ ಆರೋಗ್ಯಕರ",
    },
    description: {
      english: "Kept optimal heart rate zone during workouts",
      hindi: "वर्कआउट के दौरान इष्टतम हृदय गति क्षेत्र में रहे",
      kannada: "ವ್ಯಾಯಾಮದ ಸಮಯದಲ್ಲಿ ಅತ್ಯುತ್ತಮ ಹೃದಯ ಬಡಿತದ ವಲಯವನ್ನು ಕಾಪಾಡಿಕೊಂಡಿದ್ದೀರಿ",
    },
    earned: true,
    progress: 100,
    earnedDate: "2023-03-28",
    tier: "gold",
  },
  {
    id: "early-bird",
    icon: <Flame />,
    color: "bg-orange-100 text-orange-700",
    title: {
      english: "Early Bird",
      hindi: "अर्ली बर्ड",
      kannada: "ಬೆಳಗಿನ ಹಕ್ಕಿ",
    },
    description: {
      english: "Completed morning workouts for 5 days",
      hindi: "5 दिनों तक सुबह के वर्कआउट पूरे किए",
      kannada: "5 ದಿನಗಳ ಕಾಲ ಬೆಳಗಿನ ವ್ಯಾಯಾಮಗಳನ್ನು ಪೂರ್ಣಗೊಳಿಸಿದ್ದೀರಿ",
    },
    earned: false,
    progress: 40,
    tier: "bronze",
  },
  {
    id: "consistency-king",
    icon: <Award />,
    color: "bg-yellow-100 text-yellow-700",
    title: {
      english: "Consistency King",
      hindi: "कंसिस्टेंसी किंग",
      kannada: "ನಿರಂತರತೆ ರಾಜ",
    },
    description: {
      english: "Logged activity for 30 consecutive days",
      hindi: "30 दिनों तक लगातार गतिविधि लॉग की",
      kannada: "30 ದಿನಗಳ ಕಾಲ ನಿರಂತರವಾಗಿ ಚಟುವಟಿಕೆಯನ್ನು ದಾಖಲಿಸಿದ್ದೀರಿ",
    },
    earned: true,
    progress: 100,
    earnedDate: "2023-04-01",
    tier: "silver",
  },
  {
    id: "time-optimizer",
    icon: <Clock />,
    color: "bg-teal-100 text-teal-700",
    title: {
      english: "Time Optimizer",
      hindi: "टाइम ऑप्टिमाइज़र",
      kannada: "ಸಮಯ ಆಪ್ಟಿಮೈಜರ್",
    },
    description: {
      english: "Improved workout efficiency by 20%",
      hindi: "वर्कआउट दक्षता में 20% सुधार किया",
      kannada: "ವ್ಯಾಯಾಮದ ದಕ್ಷತೆಯನ್ನು 20% ಹೆಚ್ಚಿಸಿದೆ",
    },
    earned: true,
    progress: 100,
    earnedDate: "2023-03-15",
    tier: "bronze",
  },
  {
    id: "challenge-winner",
    icon: <Trophy />,
    color: "bg-emerald-100 text-emerald-700",
    title: {
      english: "Challenge Winner",
      hindi: "चैलेंज विजेता",
      kannada: "ಸವಾಲು ವಿಜೇತ",
    },
    description: {
      english: "Completed the monthly fitness challenge",
      hindi: "मासिक फिटनेस चैलेंज पूरा किया",
      kannada: "ಮಾಸಿಕ ಫಿಟ್‌ನೆಸ್ ಸವಾಲನ್ನು ಪೂರ್ಣಗೊಳಿಸಿದೆ",
    },
    earned: false,
    progress: 60,
    tier: "silver",
  },
  {
    id: "energy-activator",
    icon: <Zap />,
    color: "bg-cyan-100 text-cyan-700",
    title: {
      english: "Energy Activator",
      hindi: "एनर्जी एक्टिवेटर",
      kannada: "ಶಕ್ತಿ ಸಕ್ರಿಯಗೊಳಿಸುವವರು",
    },
    description: {
      english: "Boosted daily energy levels through regular exercise",
      hindi: "नियमित व्यायाम के माध्यम से दैनिक ऊर्जा स्तर को बढ़ाया",
      kannada: "ನಿಯಮಿತ ವ್ಯಾಯಾಮದ ಮೂಲಕ ದೈನಂದಿನ ಶಕ್ತಿ ಮಟ್ಟವನ್ನು ಹೆಚ್ಚಿಸಿದೆ",
    },
    earned: true,
    progress: 100,
    earnedDate: "2023-02-20",
    tier: "gold",
  },
];

const getBadgeTierStyles = (tier: string) => {
  switch (tier) {
    case "gold":
      return "border-2 border-yellow-400 shadow-md";
    case "silver":
      return "border-2 border-gray-300 shadow-sm";
    case "bronze":
      return "border-2 border-amber-600";
    default:
      return "";
  }
};

const Badges = ({ language }: BadgesProps) => {
  const [selectedCategory, setSelectedCategory] = useState<"all" | "earned" | "inprogress">("all");
  const [isExpanded, setIsExpanded] = useState(false);

  const filteredBadges = badgesList.filter(badge => {
    if (selectedCategory === "all") return true;
    if (selectedCategory === "earned") return badge.earned;
    if (selectedCategory === "inprogress") return !badge.earned;
    return true;
  });

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex space-x-2">
          <Button 
            variant={selectedCategory === "all" ? "default" : "outline"} 
            size="sm" 
            onClick={() => setSelectedCategory("all")}
            className="text-xs"
          >
            {translations[language]?.allBadges || "All Badges"}
          </Button>
          <Button 
            variant={selectedCategory === "earned" ? "default" : "outline"} 
            size="sm" 
            onClick={() => setSelectedCategory("earned")}
            className="text-xs"
          >
            {translations[language]?.earned || "Earned"}
          </Button>
          <Button 
            variant={selectedCategory === "inprogress" ? "default" : "outline"} 
            size="sm" 
            onClick={() => setSelectedCategory("inprogress")}
            className="text-xs"
          >
            {translations[language]?.inProgress || "In Progress"}
          </Button>
        </div>
        
        <CollapsibleTrigger asChild onClick={() => setIsExpanded(!isExpanded)}>
          <Button variant="ghost" size="sm">
            {isExpanded ? 
              (translations[language]?.showLess || "Show Less") : 
              (translations[language]?.showAll || "Show All")}
          </Button>
        </CollapsibleTrigger>
      </div>
      
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
        <TooltipProvider>
          {filteredBadges.slice(0, isExpanded ? filteredBadges.length : 6).map((badge) => (
            <Dialog key={badge.id}>
              <DialogTrigger asChild>
                <div className={`
                  flex flex-col items-center justify-center p-4 rounded-lg 
                  ${badge.color} 
                  ${!badge.earned ? 'opacity-60 grayscale' : ''}
                  hover:scale-105 transition-transform cursor-pointer
                  ${getBadgeTierStyles(badge.tier)}
                `}>
                  <div className="h-10 w-10 flex items-center justify-center mb-2">
                    {badge.icon}
                  </div>
                  <span className="text-xs font-medium text-center">
                    {badge.title[language as keyof typeof badge.title] || badge.title.english}
                  </span>
                </div>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle className="flex items-center">
                    <div className={`p-2 rounded-lg mr-2 ${badge.color}`}>
                      {badge.icon}
                    </div>
                    {badge.title[language as keyof typeof badge.title] || badge.title.english}
                    {badge.tier === "gold" && <Trophy className="h-4 w-4 ml-2 text-yellow-500" />}
                    {badge.tier === "silver" && <Award className="h-4 w-4 ml-2 text-gray-400" />}
                    {badge.tier === "bronze" && <Award className="h-4 w-4 ml-2 text-amber-600" />}
                  </DialogTitle>
                  <DialogDescription>
                    <p className="mt-2">
                      {badge.description[language as keyof typeof badge.description] || badge.description.english}
                    </p>
                    
                    <div className="mt-4">
                      <div className="flex justify-between items-center mb-1 text-sm">
                        <span>{translations[language]?.progress || "Progress"}:</span>
                        <span>{badge.progress}%</span>
                      </div>
                      <Progress value={badge.progress} className="h-2" />
                    </div>
                    
                    {badge.earned && (
                      <p className="mt-4 text-sm text-green-600">
                        {translations[language]?.earnedOn || "Earned on"}: {badge.earnedDate}
                      </p>
                    )}
                    
                    {!badge.earned && (
                      <p className="mt-4 text-sm italic">
                        {translations[language]?.notEarnedYet || "Not earned yet"}
                      </p>
                    )}
                  </DialogDescription>
                </DialogHeader>
              </DialogContent>
            </Dialog>
          ))}
        </TooltipProvider>
      </div>
      
      <Collapsible open={isExpanded}>
        <CollapsibleContent>
          <div className="pt-4 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
            <TooltipProvider>
              {filteredBadges.slice(6).map((badge) => (
                <Tooltip key={badge.id}>
                  <TooltipTrigger asChild>
                    <div className={`
                      flex flex-col items-center justify-center p-4 rounded-lg 
                      ${badge.color} 
                      ${!badge.earned ? 'opacity-40 grayscale' : ''}
                      cursor-pointer hover:scale-105 transition-transform
                      ${getBadgeTierStyles(badge.tier)}
                    `}>
                      <div className="h-10 w-10 flex items-center justify-center mb-2">
                        {badge.icon}
                      </div>
                      <span className="text-xs font-medium text-center">
                        {badge.title[language as keyof typeof badge.title] || badge.title.english}
                      </span>
                    </div>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>{badge.description[language as keyof typeof badge.description] || badge.description.english}</p>
                    {!badge.earned && (
                      <p className="text-sm italic mt-1">
                        {translations[language]?.notEarnedYet || "Not earned yet"}
                      </p>
                    )}
                  </TooltipContent>
                </Tooltip>
              ))}
            </TooltipProvider>
          </div>
        </CollapsibleContent>
      </Collapsible>
    </div>
  );
};

export default Badges;
