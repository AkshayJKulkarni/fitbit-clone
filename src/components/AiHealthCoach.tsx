
import React, { useState, useEffect } from "react";
import { MessageCircle, X, Send, Minimize, Mic, Robot } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
import { translations } from "@/utils/translations";
import { useToast } from "@/hooks/use-toast";

interface AiHealthCoachProps {
  language: string;
}

interface Message {
  id: number;
  text: string;
  sender: "ai" | "user";
}

// Health tips based on different categories
const healthTips = {
  english: {
    activity: [
      "Try to take short walking breaks every hour during your workday.",
      "Consider using the stairs instead of the elevator when possible.",
      "Dancing is a fun way to increase your daily step count!",
      "Try parking farther away from entrances to add more steps to your day.",
    ],
    nutrition: [
      "Drinking a glass of water before meals can help with portion control.",
      "Try to include a variety of colorful vegetables in your meals.",
      "Consider meal prepping on weekends to make healthy eating easier.",
      "Remember to stay hydrated throughout the day.",
    ],
    sleep: [
      "Establish a consistent sleep schedule, even on weekends.",
      "Avoid screens at least 30 minutes before bedtime.",
      "Keep your bedroom cool, dark, and quiet for optimal sleep.",
      "Try a relaxation technique like deep breathing before sleep.",
    ],
    motivation: [
      "Set small, achievable goals to build momentum.",
      "Find a workout buddy to help keep you accountable.",
      "Track your progress to stay motivated.",
      "Remember that consistency is more important than perfection.",
    ]
  },
  hindi: {
    activity: [
      "अपने कार्य दिवस के दौरान हर घंटे छोटे वॉकिंग ब्रेक लेने का प्रयास करें।",
      "जब संभव हो तो लिफ्ट के बजाय सीढ़ियों का उपयोग करने पर विचार करें।",
      "नृत्य आपके दैनिक कदम गिनती को बढ़ाने का एक मज़ेदार तरीका है!",
      "अपने दिन में अधिक कदम जोड़ने के लिए प्रवेश द्वार से दूर पार्किंग करने का प्रयास करें।",
    ],
    nutrition: [
      "भोजन से पहले एक गिलास पानी पीने से पोर्शन कंट्रोल में मदद मिल सकती है।",
      "अपने भोजन में विभिन्न प्रकार की रंगीन सब्जियों को शामिल करने का प्रयास करें।",
      "स्वस्थ खाने को आसान बनाने के लिए सप्ताहांत पर मील प्रेप करने पर विचार करें।",
      "दिन भर हाइड्रेटेड रहना याद रखें।",
    ],
    sleep: [
      "सप्ताहांत पर भी एक नियमित नींद शेड्यूल स्थापित करें।",
      "सोने से कम से कम 30 मिनट पहले स्क्रीन से बचें।",
      "बेहतर नींद के लिए अपने बेडरूम को ठंडा, अंधेरा और शांत रखें।",
      "सोने से पहले गहरी सांस लेने जैसी रिलैक्सेशन तकनीक आजमाएं।",
    ],
    motivation: [
      "गति बनाने के लिए छोटे, प्राप्य लक्ष्य निर्धारित करें।",
      "आपको जवाबदेह रखने में मदद करने के लिए एक वर्कआउट बडी खोजें।",
      "प्रेरित रहने के लिए अपनी प्रगति को ट्रैक करें।",
      "याद रखें कि निरंतरता परिपूर्णता से अधिक महत्वपूर्ण है।",
    ]
  },
  kannada: {
    activity: [
      "ನಿಮ್ಮ ಕೆಲಸದ ದಿನದ ಸಮಯದಲ್ಲಿ ಪ್ರತಿ ಗಂಟೆಗೊಮ್ಮೆ ಚಿಕ್ಕ ನಡಿಗೆ ವಿರಾಮ ತೆಗೆದುಕೊಳ್ಳಲು ಪ್ರಯತ್ನಿಸಿ.",
      "ಸಾಧ್ಯವಾದಾಗ ಎಲಿವೇಟರ್ ಬದಲು ಮೆಟ್ಟಿಲುಗಳನ್ನು ಬಳಸಲು ಪರಿಗಣಿಸಿ.",
      "ನಿಮ್ಮ ದೈನಂದಿನ ಹೆಜ್ಜೆ ಎಣಿಕೆಯನ್ನು ಹೆಚ್ಚಿಸಲು ನೃತ್ಯವು ಮಜಾದ ಮಾರ್ಗವಾಗಿದೆ!",
      "ನಿಮ್ಮ ದಿನಕ್ಕೆ ಹೆಚ್ಚಿನ ಹೆಜ್ಜೆಗಳನ್ನು ಸೇರಿಸಲು ಪ್ರವೇಶದ್ವಾರಗಳಿಂದ ದೂರದಲ್ಲಿ ಪಾರ್ಕಿಂಗ್ ಮಾಡಲು ಪ್ರಯತ್ನಿಸಿ.",
    ],
    nutrition: [
      "ಊಟಕ್ಕಿಂತ ಮುಂಚೆ ಒಂದು ಗ್ಲಾಸ್ ನೀರು ಕುಡಿಯುವುದರಿಂದ ಪಾಲು ನಿಯಂತ್ರಣದಲ್ಲಿ ಸಹಾಯ ಮಾಡಬಹುದು.",
      "ನಿಮ್ಮ ಊಟದಲ್ಲಿ ವಿವಿಧ ಬಣ್ಣದ ತರಕಾರಿಗಳನ್ನು ಸೇರಿಸಲು ಪ್ರಯತ್ನಿಸಿ.",
      "ಆರೋಗ್ಯಕರ ಆಹಾರವನ್ನು ಸುಲಭಗೊಳಿಸಲು ವಾರಾಂತ್ಯದಲ್ಲಿ ಊಟ ಸಿದ್ಧಪಡಿಸುವುದನ್ನು ಪರಿಗಣಿಸಿ.",
      "ದಿನವಿಡೀ ಹೈಡ್ರೇಟೆಡ್ ಆಗಿರಲು ನೆನಪಿಡಿ.",
    ],
    sleep: [
      "ವಾರಾಂತ್ಯದಲ್ಲೂ ಸಹ, ನಿರಂತರ ನಿದ್ರಾ ವೇಳಾಪಟ್ಟಿಯನ್ನು ಸ್ಥಾಪಿಸಿ.",
      "ಮಲಗುವ ಸಮಯಕ್ಕಿಂತ ಕನಿಷ್ಠ 30 ನಿಮಿಷಗಳ ಮೊದಲು ಸ್ಕ್ರೀನ್‌ಗಳನ್ನು ತಪ್ಪಿಸಿ.",
      "ಉತ್ತಮ ನಿದ್ದೆಗಾಗಿ ನಿಮ್ಮ ಮಲಗುವ ಕೋಣೆಯನ್ನು ತಂಪಾಗಿ, ಕತ್ತಲೆಯಾಗಿ ಮತ್ತು ಶಾಂತವಾಗಿ ಇರಿಸಿ.",
      "ನಿದ್ದೆಗೆ ಮುಂಚೆ ಆಳವಾದ ಉಸಿರಾಟದಂತಹ ವಿಶ್ರಾಂತಿ ತಂತ್ರವನ್ನು ಪ್ರಯತ್ನಿಸಿ.",
    ],
    motivation: [
      "ಗತಿ ಸೃಷ್ಟಿಸಲು ಚಿಕ್ಕ, ಸಾಧಿಸಬಹುದಾದ ಗುರಿಗಳನ್ನು ಹೊಂದಿಸಿ.",
      "ನಿಮ್ಮನ್ನು ಜವಾಬ್ದಾರನನ್ನಾಗಿ ಇರಿಸಲು ಸಹಾಯ ಮಾಡುವ ವ್ಯಾಯಾಮ ಸ್ನೇಹಿತನನ್ನು ಹುಡುಕಿ.",
      "ಪ್ರೇರಿತರಾಗಿರಲು ನಿಮ್ಮ ಪ್ರಗತಿಯನ್ನು ಟ್ರ್ಯಾಕ್ ಮಾಡಿ.",
      "ನೆನಪಿಡಿ, ನಿರಂತರತೆಯು ಪರಿಪೂರ್ಣತೆಗಿಂತ ಹೆಚ್ಚು ಮುಖ್ಯವಾಗಿದೆ.",
    ]
  }
};

const AiHealthCoach = ({ language }: AiHealthCoachProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      text: translations[language]?.aiCoachWelcome || "Hi there! I'm your AI Health Coach. How can I help you today?",
      sender: "ai",
    },
  ]);
  const [isListening, setIsListening] = useState(false);
  const [tipCategory, setTipCategory] = useState<"activity" | "nutrition" | "sleep" | "motivation">("activity");
  const { toast } = useToast();

  // Rotate through tip categories
  useEffect(() => {
    const interval = setInterval(() => {
      setTipCategory((prev) => {
        const categories: ("activity" | "nutrition" | "sleep" | "motivation")[] = [
          "activity", "nutrition", "sleep", "motivation"
        ];
        const currentIndex = categories.indexOf(prev);
        const nextIndex = (currentIndex + 1) % categories.length;
        return categories[nextIndex];
      });
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const toggleChat = () => {
    setIsOpen(!isOpen);
    setIsMinimized(false);
  };

  const minimizeChat = () => {
    setIsMinimized(!isMinimized);
  };

  const sendMessage = () => {
    if (!message.trim()) return;
    
    const newMessage: Message = {
      id: messages.length + 1,
      text: message,
      sender: "user",
    };
    
    setMessages([...messages, newMessage]);
    setMessage("");
    
    // Simulate AI response
    setTimeout(() => {
      // Get tips for the current language or fall back to English
      const languageTips = healthTips[language as keyof typeof healthTips] || healthTips.english;
      
      // Get random tip from the current category
      const tips = languageTips[tipCategory];
      const randomTip = tips[Math.floor(Math.random() * tips.length)];
      
      const aiMessage: Message = {
        id: messages.length + 2,
        text: randomTip,
        sender: "ai",
      };
      
      setMessages(prev => [...prev, aiMessage]);
    }, 800);
  };

  const toggleVoiceInput = () => {
    if (!isListening) {
      // Simulate voice recognition being activated
      setIsListening(true);
      toast({
        title: translations[language]?.listeningStarted || "Listening...",
        description: translations[language]?.speakNow || "Speak now. This is a simulation.",
      });
      
      // Simulate receiving voice input after 3 seconds
      setTimeout(() => {
        setIsListening(false);
        const voiceMessages = [
          "How can I improve my sleep?",
          "What's a good workout for today?",
          "How many steps should I aim for?",
          "Give me a nutrition tip"
        ];
        const randomMessage = voiceMessages[Math.floor(Math.random() * voiceMessages.length)];
        setMessage(randomMessage);
      }, 3000);
    } else {
      setIsListening(false);
      toast({
        title: translations[language]?.listeningStopped || "Listening stopped",
      });
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      sendMessage();
    }
  };

  // Get welcome animation based on the current tip category
  const getWelcomeAnimation = () => {
    switch (tipCategory) {
      case "activity":
        return "animate-bounce";
      case "nutrition":
        return "animate-pulse";
      case "sleep":
        return "animate-fade-in";
      case "motivation":
        return "animate-scale-in";
      default:
        return "";
    }
  };

  return (
    <>
      {/* Chat button */}
      <button
        onClick={toggleChat}
        className={cn(
          "fixed bottom-4 right-4 p-3 rounded-full shadow-lg z-50 transition-colors",
          isOpen ? "bg-gray-200" : `bg-primary text-white ${getWelcomeAnimation()}`
        )}
      >
        {isOpen ? <X size={24} /> : <MessageCircle size={24} />}
      </button>

      {/* Chat window */}
      {isOpen && (
        <Card className={cn(
          "fixed bottom-16 right-4 w-80 md:w-96 shadow-xl z-40 transition-all duration-300 ease-in-out animate-scale-in",
          isMinimized ? "h-14" : "h-96"
        )}>
          <CardHeader className="p-3 border-b flex flex-row items-center justify-between space-y-0">
            <CardTitle className="text-sm font-medium flex items-center">
              <Robot className="mr-2 h-4 w-4 text-primary" />
              {translations[language]?.aiCoachTitle || "AI Health Coach"}
            </CardTitle>
            <Button variant="ghost" size="sm" onClick={minimizeChat} className="h-8 w-8 p-0">
              {isMinimized ? <MessageCircle size={16} /> : <Minimize size={16} />}
            </Button>
          </CardHeader>
          
          {!isMinimized && (
            <>
              <CardContent className="p-0">
                <ScrollArea className="h-72 p-4">
                  <div className="space-y-4">
                    {messages.map((msg) => (
                      <div
                        key={msg.id}
                        className={cn(
                          "flex",
                          msg.sender === "user" ? "justify-end" : "justify-start"
                        )}
                      >
                        <div
                          className={cn(
                            "max-w-[80%] rounded-lg px-3 py-2 text-sm",
                            msg.sender === "user"
                              ? "bg-primary text-primary-foreground animate-fade-in"
                              : "bg-muted animate-fade-in"
                          )}
                        >
                          {msg.text}
                        </div>
                      </div>
                    ))}
                  </div>
                </ScrollArea>
              </CardContent>
              
              <CardFooter className="p-3 pt-0">
                <div className="flex w-full items-center space-x-2">
                  <Input
                    placeholder={translations[language]?.typeMessage || "Type a message..."}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    onKeyDown={handleKeyDown}
                    className="flex-1"
                  />
                  <Button 
                    size="icon" 
                    variant={isListening ? "destructive" : "outline"}
                    onClick={toggleVoiceInput}
                    className={isListening ? "animate-pulse" : ""}
                  >
                    <Mic size={16} />
                  </Button>
                  <Button size="icon" onClick={sendMessage}>
                    <Send size={16} />
                  </Button>
                </div>
              </CardFooter>
            </>
          )}
        </Card>
      )}
    </>
  );
};

export default AiHealthCoach;
