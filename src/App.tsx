import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import LeafAnalysis from "./pages/LeafAnalysis";
import NTesterAnalysis from "./pages/NTesterAnalysis";
import LandSegments from "./pages/LandSegments";
import LandOwners from "./pages/LandOwners";
import MasterData from "./pages/MasterData";
import Settings from "./pages/Settings";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/leaf-analysis" element={<LeafAnalysis />} />
          <Route path="/n-tester" element={<NTesterAnalysis />} />
          <Route path="/segments" element={<LandSegments />} />
          <Route path="/owners" element={<LandOwners />} />
          <Route path="/master-data" element={<MasterData />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
