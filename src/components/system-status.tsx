"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  CheckCircle, 
  AlertTriangle, 
  XCircle,
  Wifi,
  Database,
  Cpu,
  Battery
} from "lucide-react";

interface SystemStatus {
  name: string;
  status: "operational" | "degraded" | "down";
  message: string;
  value?: number;
}

const systemStatuses: SystemStatus[] = [
  { name: "Robot Network", status: "operational", message: "All robots connected" },
  { name: "Task Queue", status: "operational", message: "Processing normally" },
  { name: "Database", status: "operational", message: "Connected and responsive" },
  { name: "Charging Station", status: "degraded", message: "One station offline", value: 75 },
  { name: "Kitchen Interface", status: "operational", message: "Connected to POS system" },
  { name: "Battery Levels", status: "degraded", message: "Robot Gamma low", value: 65 },
];

const getStatusIcon = (status: string) => {
  switch (status) {
    case "operational": return <CheckCircle className="h-4 w-4 text-green-500" />;
    case "degraded": return <AlertTriangle className="h-4 w-4 text-yellow-500" />;
    case "down": return <XCircle className="h-4 w-4 text-red-500" />;
    default: return <CheckCircle className="h-4 w-4 text-green-500" />;
  }
};

const getStatusColor = (status: string) => {
  switch (status) {
    case "operational": return "bg-green-500";
    case "degraded": return "bg-yellow-500";
    case "down": return "bg-red-500";
    default: return "bg-green-500";
  }
};

export function SystemStatus() {
  const operationalCount = systemStatuses.filter(s => s.status === "operational").length;
  const totalCount = systemStatuses.length;
  
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span>System Status</span>
          <Badge 
            variant={operationalCount === totalCount ? "default" : "destructive"}
            className="flex items-center"
          >
            <div className={`h-2 w-2 rounded-full mr-2 ${operationalCount === totalCount ? "bg-green-500" : "bg-yellow-500"}`}></div>
            {operationalCount}/{totalCount} Systems Operational
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {systemStatuses.map((system, index) => (
            <div key={index} className="flex items-start justify-between p-3 border rounded-lg">
              <div className="flex items-start space-x-3">
                {getStatusIcon(system.status)}
                <div>
                  <h3 className="font-medium">{system.name}</h3>
                  <p className="text-sm text-gray-500">{system.message}</p>
                  {system.value !== undefined && (
                    <div className="mt-2 w-32">
                      <div className="flex justify-between text-xs mb-1">
                        <span>Health</span>
                        <span>{system.value}%</span>
                      </div>
                      <Progress 
                        value={system.value} 
                        className={system.value < 50 ? "bg-red-200" : system.value < 75 ? "bg-yellow-200" : "bg-green-200"}
                      />
                    </div>
                  )}
                </div>
              </div>
              <Badge 
                variant="outline" 
                className={`capitalize ${system.status === "operational" ? "text-green-600 border-green-600" : system.status === "degraded" ? "text-yellow-600 border-yellow-600" : "text-red-600 border-red-600"}`}
              >
                {system.status}
              </Badge>
            </div>
          ))}
        </div>
        
        <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="p-3 bg-green-50 rounded-lg text-center">
            <Wifi className="h-5 w-5 mx-auto text-green-500 mb-1" />
            <div className="text-sm font-medium">6</div>
            <div className="text-xs text-gray-500">Robots Online</div>
          </div>
          <div className="p-3 bg-blue-50 rounded-lg text-center">
            <Database className="h-5 w-5 mx-auto text-blue-500 mb-1" />
            <div className="text-sm font-medium">12</div>
            <div className="text-xs text-gray-500">Tasks Queued</div>
          </div>
          <div className="p-3 bg-purple-50 rounded-lg text-center">
            <Cpu className="h-5 w-5 mx-auto text-purple-500 mb-1" />
            <div className="text-sm font-medium">98%</div>
            <div className="text-xs text-gray-500">CPU Usage</div>
          </div>
          <div className="p-3 bg-yellow-50 rounded-lg text-center">
            <Battery className="h-5 w-5 mx-auto text-yellow-500 mb-1" />
            <div className="text-sm font-medium">76%</div>
            <div className="text-xs text-gray-500">Avg Battery</div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}