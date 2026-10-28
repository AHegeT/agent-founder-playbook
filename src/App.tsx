import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Playbooks from "./pages/Playbooks";
import PlaybookDetail from "./pages/PlaybookDetail";
import Apply from "./pages/Apply";
import Roundtables from "./pages/Roundtables";
import RoundtableDetail from "./pages/RoundtableDetail";
import Masterminds from "./pages/Masterminds";
import Webinars from "./pages/Webinars";
import Workshops from "./pages/Workshops";
import About from "./pages/About";
import LauConnect from "./pages/connect/LauConnect";
import LuisGerardoConnect from "./pages/connect/LuisGerardoConnect";
import FindingTalentRecap from "./pages/FindingTalentRecap";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const SiteNavbar = () => {
  const { pathname } = useLocation();
  return pathname.startsWith("/connect/") ? null : <Navbar />;
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <SiteNavbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/playbooks" element={<Playbooks />} />
          <Route path="/playbooks/:slug" element={<PlaybookDetail />} />
          <Route path="/events/roundtables" element={<Roundtables />} />
          <Route path="/events/roundtables/:slug" element={<RoundtableDetail />} />
          <Route path="/events/masterminds" element={<Masterminds />} />
          <Route path="/events/webinars" element={<Webinars />} />
          <Route path="/events/workshops" element={<Workshops />} />
          <Route path="/events/finding-right-talent" element={<FindingTalentRecap />} />
          <Route path="/apply" element={<Apply />} />
          <Route path="/about" element={<About />} />
          <Route path="/connect/lau" element={<LauConnect />} />
          <Route path="/connect/luis-gerardo" element={<LuisGerardoConnect />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
