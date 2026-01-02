import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Sidebar } from "@/components/sidebar";
import { RestaurantProvider } from "@/lib/restaurant-context";
import Index from "./pages/Index";
import Tasks from "./pages/Tasks";
import Robots from "./pages/Robots";
import Analytics from "./pages/Analytics";
import Settings from "./pages/Settings";
import Charging from "./pages/Charging";
import Menu from "./pages/Menu";
import Customers from "./pages/Customers";
import Payments from "./pages/Payments";
import Inventory from "./pages/Inventory";
import CustomerOrder from "./pages/CustomerOrder";
import MapPage from "./pages/Map";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <RestaurantProvider>
        <BrowserRouter>
          <div className="flex">
            <Sidebar />
            <main className="flex-1 md:ml-20">
              <Routes>
                <Route path="/" element={<Index />} />
                <Route path="/tasks" element={<Tasks />} />
                <Route path="/robots" element={<Robots />} />
                <Route path="/map" element={<MapPage />} />
                <Route path="/analytics" element={<Analytics />} />
                <Route path="/settings" element={<Settings />} />
                <Route path="/charging" element={<Charging />} />
                <Route path="/menu" element={<Menu />} />
                <Route path="/customers" element={<Customers />} />
                <Route path="/payments" element={<Payments />} />
                <Route path="/inventory" element={<Inventory />} />
                <Route path="/customer-order" element={<CustomerOrder />} />
                {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
                <Route path="*" element={<NotFound />} />
              </Routes>
            </main>
          </div>
        </BrowserRouter>
      </RestaurantProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;