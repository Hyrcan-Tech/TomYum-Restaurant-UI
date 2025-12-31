"use client";

import { RobotMonitor } from "@/components/robot-monitor";
import { SystemStatus } from "@/components/system-status";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  Bot, 
  Play, 
  Pause, 
  RotateCcw,
  Settings,
  Map
} from "lucide-react";
import { useState } from "react";
import { MadeWithDyad } from "@/components/made-with-dyad";

export default function RobotsPage() {
  const [isSystemRunning, setIsSystemRunning] = useState(true);

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Robot Management</h1>
            <p className="text-gray-600 mt-2">Monitor and control all delivery robots</p>
          </div>
          <div className="flex flex-wrap gap-2 mt-4 md:mt-0">
            <Button 
              onClick={() => setIsSystemRunning(!isSystemRunning)}
              className={isSystemRunning ? "bg-red-500 hover:bg-red-600" : "bg-green-500 hover:bg-green-600"}
            >
              {isSystemRunning ? (
                <>
                  <Pause className="mr-2 h-4 w-4" /> Pause System
                </>
              ) : (
                <>
                  <Play className="mr-2 h-4 w-4" /> Start System
                </>
              )}
            </Button>
            <Button variant="outline">
              <RotateCcw className="mr-2 h-4 w-4" /> Reset All
            </Button>
            <Button variant="outline">
              <Map className="mr-2 h-4 w-4" /> Map View
            </Button>
            <Button variant="outline">
              <Settings className="mr-2 h-4 w-4" /> Settings
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <RobotMonitor />
          </div>
          
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Bot className="mr-2 h-5 w-5" />
                  Robot Statistics
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center p-3 bg-blue-50 rounded-lg">
                    <span>Total Robots</span>
                    <span className="font-bold">6</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-green-50 rounded-lg">
                    <span>Operational</span>
                    <span className="font-bold">5</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-yellow-50 rounded-lg">
                    <span>Maintenance</span>
                    <span className="font-bold">1</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-purple-50 rounded-lg">
                    <span>Avg Battery</span>
                    <span className="font-bold">76%</span>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <SystemStatus />
          </div>
        </div>

        <MadeWithDyad />
      </div>
    </div>
  );
}