"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  Battery, 
  MapPin, 
  Activity,
  AlertTriangle
} from "lucide-react";

interface Robot {
  id: number;
  name: string;
  status: "idle" | "delivering" | "collecting" | "charging" | "error";
  battery: number;
  location: string;
  lastTask: string;
  nextTask?: string;
}

const mockRobots: Robot[] = [
  { id: 1, name: "Robot Alpha", status: "delivering", battery: 85, location: "Table 5", lastTask: "Ordering" },
  { id: 2, name: "Robot Beta", status: "idle", battery: 92, location: "Charging Station", lastTask: "Charging" },
  { id: 3, name: "Robot Gamma", status: "charging", battery: 30, location: "Charging Station", lastTask: "Delivery" },
  { id: 4, name: "Robot Delta", status: "collecting", battery: 67, location: "Table 3", lastTask: "Idle", nextTask: "Delivery" },
];

const getStatusColor = (status: string) => {
  switch (status) {
    case "delivering": return "bg-blue-500";
    case "idle": return "bg-green-500";
    case "charging": return "bg-yellow-500";
    case "collecting": return "bg-purple-500";
    case "error": return "bg-red-500";
    default: return "bg-gray-500";
  }
};

const getStatusText = (status: string) => {
  switch (status) {
    case "delivering": return "Delivering";
    case "idle": return "Idle";
    case "charging": return "Charging";
    case "collecting": return "Collecting";
    case "error": return "Error";
    default: return "Unknown";
  }
};

export function RobotMonitor() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span>Robot Status Monitor</span>
          <Badge variant="secondary">4 robots active</Badge>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {mockRobots.map((robot) => (
            <div key={robot.id} className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-4 border rounded-lg">
              <div className="flex items-center space-x-4 mb-3 sm:mb-0">
                <div className={`h-3 w-3 rounded-full ${getStatusColor(robot.status)}`}></div>
                <div>
                  <h3 className="font-medium">{robot.name}</h3>
                  <div className="flex items-center text-sm text-gray-500 mt-1">
                    <MapPin className="h-3 w-3 mr-1" />
                    <span>{robot.location}</span>
                  </div>
                </div>
              </div>
              
              <div className="flex-1 w-full sm:w-auto sm:mx-4 mb-3 sm:mb-0">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm font-medium">Battery</span>
                  <span className="text-sm">{robot.battery}%</span>
                </div>
                <Progress value={robot.battery} className="w-full" />
                {robot.battery < 30 && (
                  <div className="flex items-center mt-1 text-xs text-red-500">
                    <AlertTriangle className="h-3 w-3 mr-1" />
                    Low battery
                  </div>
                )}
              </div>
              
              <div className="flex flex-col items-end">
                <Badge variant="outline" className="capitalize mb-1">
                  {getStatusText(robot.status)}
                </Badge>
                <div className="text-xs text-gray-500 text-right">
                  <div>Last: {robot.lastTask}</div>
                  {robot.nextTask && <div>Next: {robot.nextTask}</div>}
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="p-3 bg-blue-50 rounded-lg text-center">
            <Activity className="h-5 w-5 mx-auto text-blue-500 mb-1" />
            <div className="text-sm font-medium">3</div>
            <div className="text-xs text-gray-500">Delivering</div>
          </div>
          <div className="p-3 bg-green-50 rounded-lg text-center">
            <Activity className="h-5 w-5 mx-auto text-green-500 mb-1" />
            <div className="text-sm font-medium">1</div>
            <div className="text-xs text-gray-500">Idle</div>
          </div>
          <div className="p-3 bg-yellow-50 rounded-lg text-center">
            <Battery className="h-5 w-5 mx-auto text-yellow-500 mb-1" />
            <div className="text-sm font-medium">1</div>
            <div className="text-xs text-gray-500">Charging</div>
          </div>
          <div className="p-3 bg-purple-50 rounded-lg text-center">
            <Activity className="h-5 w-5 mx-auto text-purple-500 mb-1" />
            <div className="text-sm font-medium">1</div>
            <div className="text-xs text-gray-500">Collecting</div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}