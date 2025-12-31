"use client";

import { 
  Home, 
  ListOrdered, 
  Bot, 
  Settings, 
  BarChart3,
  Users,
  Utensils,
  Package,
  CreditCard,
  BatteryCharging
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { 
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

const navItems = [
  { name: "Dashboard", icon: Home, href: "/" },
  { name: "Task Queue", icon: ListOrdered, href: "/tasks" },
  { name: "Robots", icon: Bot, href: "/robots" },
  { name: "Analytics", icon: BarChart3, href: "/analytics" },
  { name: "Customers", icon: Users, href: "/customers" },
  { name: "Menu", icon: Utensils, href: "/menu" },
  { name: "Inventory", icon: Package, href: "/inventory" },
  { name: "Payments", icon: CreditCard, href: "/payments" },
  { name: "Charging", icon: BatteryCharging, href: "/charging" },
  { name: "Settings", icon: Settings, href: "/settings" },
];

export function Sidebar() {
  return (
    <div className="hidden md:block w-20 bg-white border-r border-gray-200 h-screen fixed left-0 top-0 z-10">
      <div className="flex flex-col items-center py-6 space-y-6">
        <div className="w-10 h-10 rounded-lg bg-red-600 flex items-center justify-center text-white font-bold">
          TY
        </div>
        
        <TooltipProvider>
          <nav className="flex flex-col items-center space-y-4">
            {navItems.map((item, index) => (
              <Tooltip key={index}>
                <TooltipTrigger asChild>
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    className="h-12 w-12 rounded-lg"
                    onClick={() => window.location.hash = `#${item.href}`}
                  >
                    <item.icon className="h-5 w-5" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent side="right">
                  <p>{item.name}</p>
                </TooltipContent>
              </Tooltip>
            ))}
          </nav>
        </TooltipProvider>
      </div>
    </div>
  );
}