import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Playbooks from "./pages/Playbooks";
import PlaybookDetail from "./pages/PlaybookDetail";
import Apply from "./pages/Apply";
import Roundtables from "./pages/Roundtables";
import RoundtableDetail from "./pages/RoundtableDetail";
import Masterminds from "./pages/Masterminds";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/playbooks" element={<Playbooks />} />
          <Route path="/playbooks/:slug" element={<PlaybookDetail />} />
          <Route path="/events/roundtables" element={<Roundtables />} />
          <Route path="/events/roundtables/:slug" element={<RoundtableDetail />} />
          <Route path="/events/masterminds" element={<Masterminds />} />
          <Route path="/apply" element={<Apply />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
