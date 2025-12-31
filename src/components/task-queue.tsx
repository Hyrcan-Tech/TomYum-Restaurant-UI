"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  Utensils, 
  Package, 
  CreditCard, 
  BatteryCharging, 
  AlertTriangle,
  ArrowUp,
  ArrowDown,
  AlertCircle
} from "lucide-react";

interface Task {
  id: number;
  type: "ordering" | "delivery" | "collection" | "payment" | "charging";
  priority: "high" | "medium" | "low" | "dynamic";
  status: "queued" | "in-progress" | "completed";
  table: string;
  time: string;
  effectivePriority: number;
}

const mockTasks: Task[] = [
  { id: 1, type: "delivery", priority: "high", status: "in-progress", table: "Table 5", time: "2 min", effectivePriority: 95 },
  { id: 2, type: "collection", priority: "medium", status: "queued", table: "Table 3", time: "5 min", effectivePriority: 75 },
  { id: 3, type: "ordering", priority: "medium", status: "queued", table: "Table 7", time: "8 min", effectivePriority: 70 },
  { id: 4, type: "payment", priority: "low", status: "queued", table: "Table 2", time: "12 min", effectivePriority: 50 },
  { id: 5, type: "charging", priority: "dynamic", status: "queued", table: "Charging Station", time: "15 min", effectivePriority: 40 },
  { id: 6, type: "ordering", priority: "medium", status: "queued", table: "Table 9", time: "10 min", effectivePriority: 65 },
  { id: 7, type: "delivery", priority: "high", status: "queued", table: "Table 1", time: "3 min", effectivePriority: 90 },
];

const getTaskIcon = (type: string) => {
  switch (type) {
    case "delivery": return <Utensils className="h-4 w-4" />;
    case "collection": return <Package className="h-4 w-4" />;
    case "ordering": return <Utensils className="h-4 w-4" />;
    case "payment": return <CreditCard className="h-4 w-4" />;
    case "charging": return <BatteryCharging className="h-4 w-4" />;
    default: return <AlertTriangle className="h-4 w-4" />;
  }
};

const getPriorityColor = (priority: string) => {
  switch (priority) {
    case "high": return "bg-red-500";
    case "medium": return "bg-orange-500";
    case "low": return "bg-green-500";
    case "dynamic": return "bg-blue-500";
    default: return "bg-gray-500";
  }
};

export function TaskQueue() {
  const [tasks, setTasks] = useState<Task[]>(mockTasks);
  const [selectedTask, setSelectedTask] = useState<number | null>(null);

  const moveTaskUp = (id: number) => {
    setTasks(prev => {
      const index = prev.findIndex(task => task.id === id);
      if (index <= 0) return prev;
      
      const newTasks = [...prev];
      [newTasks[index - 1], newTasks[index]] = [newTasks[index], newTasks[index - 1]];
      return newTasks;
    });
  };

  const moveTaskDown = (id: number) => {
    setTasks(prev => {
      const index = prev.findIndex(task => task.id === id);
      if (index === -1 || index === prev.length - 1) return prev;
      
      const newTasks = [...prev];
      [newTasks[index], newTasks[index + 1]] = [newTasks[index + 1], newTasks[index]];
      return newTasks;
    });
  };

  const markAsCritical = (id: number) => {
    setTasks(prev => 
      prev.map(task => 
        task.id === id 
          ? { ...task, priority: "high", effectivePriority: 100 } 
          : task
      )
    );
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span>Task Queue Management</span>
          <Badge variant="secondary">{tasks.length} tasks</Badge>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {tasks.map((task, index) => (
            <div 
              key={task.id} 
              className={`flex items-center justify-between p-3 border rounded-lg hover:bg-gray-50 transition-colors ${
                selectedTask === task.id ? "ring-2 ring-blue-500" : ""
              }`}
              onClick={() => setSelectedTask(task.id)}
            >
              <div className="flex items-center space-x-3">
                <div className={`p-2 rounded-full ${getPriorityColor(task.priority)}`}>
                  {getTaskIcon(task.type)}
                </div>
                <div>
                  <h3 className="font-medium capitalize">{task.type} Task</h3>
                  <p className="text-sm text-gray-500">{task.table}</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-4">
                <div className="hidden md:block">
                  <Badge variant="outline" className="capitalize">
                    {task.priority}
                  </Badge>
                </div>
                
                <div className="text-right hidden sm:block">
                  <div className="font-medium">{task.time}</div>
                  <div className="text-xs text-gray-500">ETA</div>
                </div>
                
                <div className="text-right">
                  <div className="font-medium text-sm">P{task.effectivePriority}</div>
                  <div className="text-xs text-gray-500">Priority</div>
                </div>
                
                <div className="flex flex-col space-y-1">
                  <Button 
                    size="icon" 
                    variant="ghost" 
                    className="h-6 w-6"
                    onClick={(e) => {
                      e.stopPropagation();
                      moveTaskUp(task.id);
                    }}
                    disabled={index === 0}
                  >
                    <ArrowUp className="h-3 w-3" />
                  </Button>
                  <Button 
                    size="icon" 
                    variant="ghost" 
                    className="h-6 w-6"
                    onClick={(e) => {
                      e.stopPropagation();
                      moveTaskDown(task.id);
                    }}
                    disabled={index === tasks.length - 1}
                  >
                    <ArrowDown className="h-3 w-3" />
                  </Button>
                </div>
                
                <Button 
                  size="sm" 
                  variant="outline" 
                  className="hidden md:flex"
                  onClick={(e) => {
                    e.stopPropagation();
                    markAsCritical(task.id);
                  }}
                >
                  <AlertCircle className="h-3 w-3 mr-1" />
                  Critical
                </Button>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-6 p-4 bg-blue-50 rounded-lg">
          <h4 className="font-medium text-blue-900 mb-2">Queue Management Guide</h4>
          <ul className="text-sm text-blue-800 list-disc pl-5 space-y-1">
            <li>Tasks are prioritized automatically based on business rules</li>
            <li>Use arrow buttons to manually reorder tasks when needed</li>
            <li>Mark tasks as "Critical" for immediate attention</li>
            <li>System prevents conflicts and ensures safe robot operation</li>
          </ul>
        </div>
      </CardContent>
    </Card>
  );
}