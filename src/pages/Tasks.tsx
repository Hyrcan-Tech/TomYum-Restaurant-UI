"use client";

import { TaskQueue } from "@/components/task-queue";
import { TaskForm } from "@/components/task-form";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  ListOrdered, 
  Play, 
  Pause, 
  RotateCcw,
  Filter,
  SortAsc
} from "lucide-react";
import { useState } from "react";
import { MadeWithDyad } from "@/components/made-with-dyad";

export default function TasksPage() {
  const [isSystemRunning, setIsSystemRunning] = useState(true);

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Task Management</h1>
            <p className="text-gray-600 mt-2">Monitor and manage all robot tasks</p>
          </div>
          <div className="flex flex-wrap gap-2 mt-4 md:mt-0">
            <Button 
              onClick={() => setIsSystemRunning(!isSystemRunning)}
              className={isSystemRunning ? "bg-red-500 hover:bg-red-600" : "bg-green-500 hover:bg-green-600"}
            >
              {isSystemRunning ? (
                <>
                  <Pause className="mr-2 h-4 w-4" /> Pause
                </>
              ) : (
                <>
                  <Play className="mr-2 h-4 w-4" /> Start
                </>
              )}
            </Button>
            <Button variant="outline">
              <RotateCcw className="mr-2 h-4 w-4" /> Reset
            </Button>
            <Button variant="outline">
              <Filter className="mr-2 h-4 w-4" /> Filter
            </Button>
            <Button variant="outline">
              <SortAsc className="mr-2 h-4 w-4" /> Sort
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <TaskQueue />
          </div>
          
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <ListOrdered className="mr-2 h-5 w-5" />
                  Task Statistics
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center p-3 bg-blue-50 rounded-lg">
                    <span>Total Tasks</span>
                    <span className="font-bold">24</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-green-50 rounded-lg">
                    <span>Completed</span>
                    <span className="font-bold">12</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-yellow-50 rounded-lg">
                    <span>In Progress</span>
                    <span className="font-bold">5</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-red-50 rounded-lg">
                    <span>Pending</span>
                    <span className="font-bold">7</span>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <TaskForm />
          </div>
        </div>

        <MadeWithDyad />
      </div>
    </div>
  );
}