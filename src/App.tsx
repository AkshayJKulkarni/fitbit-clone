
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { UserAuthProvider } from "@/hooks/useUserAuth";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Activity from "./pages/Activity";
import Health from "./pages/Health";
import Coaching from "./pages/Coaching";
import Challenges from "./pages/Challenges";
import Planner from "./pages/Planner";
import Settings from "./pages/Settings";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <UserAuthProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/activity" element={<Activity />} />
            <Route path="/health" element={<Health />} />
            <Route path="/coaching" element={<Coaching />} />
            <Route path="/challenges" element={<Challenges />} />
            <Route path="/planner" element={<Planner />} />
            <Route path="/settings" element={<Settings />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </UserAuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
