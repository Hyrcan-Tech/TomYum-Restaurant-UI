from fastapi import FastAPI, Depends, HTTPException, status
from fastapi.middleware.cors import CORSMiddleware
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm
from pydantic import BaseModel
from typing import List, Optional
from datetime import datetime, timedelta
import uuid
import json
import os

# Import database models and session
from database import SessionLocal, engine, Base
from models import Task, Robot, AssignmentLog

# Create all tables
Base.metadata.create_all(bind=engine)

app = FastAPI(title="Tom Yum Robot Control Center API", version="1.0.0")

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# OAuth2 scheme
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="token")

# In-memory data for demo purposes
robots_data = [
    {"id": "R1", "current_location": "Kitchen", "battery_level": 85, "status": "IDLE", "current_task_id": None},
    {"id": "R2", "current_location": "Charging Station", "battery_level": 30, "status": "CHARGING", "current_task_id": None},
    {"id": "R3", "current_location": "Table 3", "battery_level": 67, "status": "MOVING", "current_task_id": "T-102"},
    {"id": "R4", "current_location": "Table 5", "battery_level": 92, "status": "IDLE", "current_task_id": None},
]

tasks_data = [
    {"id": "T-101", "type": "delivery", "base_priority": 100, "release_time": datetime.now().isoformat(), 
     "deadline": (datetime.now() + timedelta(minutes=10)).isoformat(), "operator_override": 0, 
     "effective_priority": 105, "waypoints": json.dumps(["Kitchen", "Station A", "Table 5"]), 
     "state": "RUNNING", "assigned_robot": "R1"},
    {"id": "T-102", "type": "collection", "base_priority": 50, "release_time": datetime.now().isoformat(), 
     "deadline": (datetime.now() + timedelta(minutes=15)).isoformat(), "operator_override": 0, 
     "effective_priority": 75, "waypoints": json.dumps(["Table 3", "Washing Machine"]), 
     "state": "READY", "assigned_robot": None},
    {"id": "T-103", "type": "ordering", "base_priority": 70, "release_time": (datetime.now() + timedelta(minutes=5)).isoformat(), 
     "deadline": (datetime.now() + timedelta(minutes=20)).isoformat(), "operator_override": 0, 
     "effective_priority": 65, "waypoints": json.dumps(["Table 2"]), 
     "state": "WAITING", "assigned_robot": None},
]

# Dependency
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

# Models
class UserLogin(BaseModel):
    username: str
    password: str

class Token(BaseModel):
    access_token: str
    token_type: str

class Table(BaseModel):
    id: str
    name: str
    status: str
    position: dict

class Point(BaseModel):
    id: str
    name: str
    type: str
    position: dict

class Order(BaseModel):
    id: str
    table_id: str
    items: List[dict]
    status: str
    created_at: datetime

class TaskCreate(BaseModel):
    type: str
    table: str
    priority: str

class RobotCommand(BaseModel):
    command: str

# Authentication endpoints
@app.post("/api/auth/login", response_model=Token)
async def login(form_data: OAuth2PasswordRequestForm = Depends()):
    # In a real application, you would verify credentials against a database
    # For demo purposes, we'll accept any non-empty username/password
    if not form_data.username or not form_data.password:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect username or password",
            headers={"WWW-Authenticate": "Bearer"},
        )
    
    # Generate a fake token for demo
    token = str(uuid.uuid4())
    return {"access_token": token, "token_type": "bearer"}

@app.post("/api/auth/logout")
async def logout():
    return {"message": "Logged out successfully"}

@app.get("/api/auth/me")
async def get_current_user(token: str = Depends(oauth2_scheme)):
    # In a real application, you would verify the token
    return {"username": "admin", "role": "administrator"}

# Tables endpoints
@app.get("/api/tables", response_model=List[Table])
async def get_tables():
    # Return mock data for demo
    return [
        {"id": "T1", "name": "Table 1", "status": "available", "position": {"x": 100, "y": 200}},
        {"id": "T2", "name": "Table 2", "status": "occupied", "position": {"x": 150, "y": 250}},
        {"id": "T3", "name": "Table 3", "status": "reserved", "position": {"x": 200, "y": 300}},
    ]

@app.get("/api/tables/{table_id}")
async def get_table(table_id: str):
    # Return mock data for demo
    return {"id": table_id, "name": f"Table {table_id[-1]}", "status": "available", "position": {"x": 100, "y": 200}}

# Points endpoints
@app.get("/api/points", response_model=List[Point])
async def get_points():
    # Return mock data for demo
    return [
        {"id": "P1", "name": "Kitchen", "type": "kitchen", "position": {"x": 50, "y": 50}},
        {"id": "P2", "name": "Reception", "type": "billing", "position": {"x": 300, "y": 50}},
        {"id": "P3", "name": "Charging Station", "type": "charging", "position": {"x": 200, "y": 350}},
    ]

@app.get("/api/points/{point_id}")
async def get_point(point_id: str):
    # Return mock data for demo
    return {"id": point_id, "name": f"Point {point_id[-1]}", "type": "delivery", "position": {"x": 100, "y": 100}}

@app.get("/api/points/type/{point_type}", response_model=List[Point])
async def get_points_by_type(point_type: str):
    # Return mock data for demo
    return [
        {"id": "P1", "name": f"{point_type.capitalize()} Point 1", "type": point_type, "position": {"x": 100, "y": 100}},
    ]

# Orders endpoints
@app.get("/api/orders", response_model=List[Order])
async def get_orders():
    # Return mock data for demo
    return [
        {"id": "O1", "table_id": "T1", "items": [{"name": "Pad Thai", "quantity": 2}], "status": "preparing", "created_at": datetime.now()},
        {"id": "O2", "table_id": "T3", "items": [{"name": "Tom Yum Soup", "quantity": 1}], "status": "ready", "created_at": datetime.now()},
    ]

@app.get("/api/orders/{order_id}")
async def get_order(order_id: str):
    # Return mock data for demo
    return {"id": order_id, "table_id": "T1", "items": [{"name": "Dish", "quantity": 1}], "status": "preparing", "created_at": datetime.now()}

# Tasks endpoints
@app.get("/api/tasks", response_model=List[dict])
async def get_tasks():
    return tasks_data

@app.get("/api/tasks/{task_id}")
async def get_task(task_id: str):
    task = next((t for t in tasks_data if t["id"] == task_id), None)
    if not task:
        raise HTTPException(status_code=404, detail="Task not found")
    return task

@app.post("/api/tasks", response_model=dict)
async def create_task(task: TaskCreate):
    new_task = {
        "id": f"T-{len(tasks_data) + 100}",
        "type": task.type,
        "base_priority": 50 if task.priority == "low" else 70 if task.priority == "medium" else 100,
        "release_time": datetime.now().isoformat(),
        "deadline": (datetime.now() + timedelta(minutes=15)).isoformat(),
        "operator_override": 0,
        "effective_priority": 50 if task.priority == "low" else 70 if task.priority == "medium" else 100,
        "waypoints": json.dumps([task.table]),
        "state": "READY",
        "assigned_robot": None
    }
    tasks_data.append(new_task)
    return new_task

@app.put("/api/tasks/{task_id}/status")
async def update_task_status(task_id: str, status: dict):
    task = next((t for t in tasks_data if t["id"] == task_id), None)
    if not task:
        raise HTTPException(status_code=404, detail="Task not found")
    task["state"] = status.get("state", task["state"])
    return {"message": "Task status updated"}

# Robots endpoints
@app.get("/api/robots", response_model=List[dict])
async def get_robots():
    return robots_data

@app.get("/api/robots/{robot_id}")
async def get_robot(robot_id: str):
    robot = next((r for r in robots_data if r["id"] == robot_id), None)
    if not robot:
        raise HTTPException(status_code=404, detail="Robot not found")
    return robot

@app.post("/api/robots/{robot_id}/command")
async def send_robot_command(robot_id: str, command: RobotCommand):
    robot = next((r for r in robots_data if r["id"] == robot_id), None)
    if not robot:
        raise HTTPException(status_code=404, detail="Robot not found")
    
    # Update robot status based on command
    if command.command == "RETURN_TO_BASE":
        robot["status"] = "MOVING"
        robot["current_location"] = "Returning to base"
    elif command.command == "START_CHARGING":
        robot["status"] = "CHARGING"
        robot["current_location"] = "Charging Station"
    
    return {"message": f"Command {command.command} sent to robot {robot_id}"}

# Queue management endpoints
@app.get("/api/queue/tasks")
async def get_queue_tasks():
    return tasks_data

@app.get("/api/queue/tasks/ready")
async def get_ready_tasks():
    return [t for t in tasks_data if t["state"] == "READY"]

@app.put("/api/queue/tasks/{task_id}/priority")
async def update_task_priority(task_id: str, priority_data: dict):
    task = next((t for t in tasks_data if t["id"] == task_id), None)
    if not task:
        raise HTTPException(status_code=404, detail="Task not found")
    
    # Apply operator override
    override_boost = priority_data.get("boost", 0)
    task["operator_override"] = override_boost
    task["effective_priority"] = task["base_priority"] + override_boost
    
    # Log the override
    log_entry = {
        "task_id": task_id,
        "robot_id": task.get("assigned_robot"),
        "assignment_time": datetime.now().isoformat(),
        "score": task["effective_priority"],
        "reason": f"Operator override applied with boost of {override_boost}",
        "effective_priority": task["effective_priority"]
    }
    
    return {"message": "Task priority updated", "task": task, "log": log_entry}

@app.post("/api/queue/tasks/{task_id}/override")
async def apply_task_override(task_id: str, override_data: dict):
    task = next((t for t in tasks_data if t["id"] == task_id), None)
    if not task:
        raise HTTPException(status_code=404, detail="Task not found")
    
    # Mark as critical
    task["operator_override"] = 50  # Critical boost
    task["effective_priority"] = task["base_priority"] + 50
    task["state"] = "READY"  # Make sure it's ready
    
    return {"message": "Task marked as critical", "task": task}

@app.delete("/api/queue/tasks/{task_id}/override")
async def remove_task_override(task_id: str):
    task = next((t for t in tasks_data if t["id"] == task_id), None)
    if not task:
        raise HTTPException(status_code=404, detail="Task not found")
    
    # Remove override
    task["operator_override"] = 0
    task["effective_priority"] = task["base_priority"]
    
    return {"message": "Task override removed", "task": task}

@app.get("/api/queue/assignment-log")
async def get_assignment_log():
    # Return mock assignment logs
    return [
        {"task_id": "T-101", "robot_id": "R1", "assignment_time": datetime.now().isoformat(), 
         "score": 105, "reason": "High priority delivery task", "effective_priority": 105},
        {"task_id": "T-102", "robot_id": "R3", "assignment_time": (datetime.now() - timedelta(minutes=5)).isoformat(), 
         "score": 75, "reason": "Collection task with medium priority", "effective_priority": 75},
    ]

# Charging management endpoints
@app.get("/api/charging/status")
async def get_charging_status():
    # Return mock charging status
    return {
        "station_1": {"status": "occupied", "robot_id": "R2", "charging_level": 30},
        "station_2": {"status": "available", "robot_id": None, "charging_level": 100},
    }

@app.get("/api/charging/policy")
async def get_charging_policy():
    return {
        "min_battery_threshold": 30,
        "max_concurrent_charging": 1,
        "charging_priority": "battery_level",
        "auto_charging_enabled": True
    }

@app.post("/api/charging/manual-request")
async def request_manual_charging(robot_id: dict):
    return {"message": f"Manual charging request for robot {robot_id.get('robot_id')} accepted"}

# Task state machine endpoints
@app.post("/api/tasks/{task_id}/confirm-step")
async def confirm_task_step(task_id: str):
    task = next((t for t in tasks_data if t["id"] == task_id), None)
    if not task:
        raise HTTPException(status_code=404, detail="Task not found")
    
    return {"message": f"Step confirmed for task {task_id}", "task": task}

@app.get("/api/tasks/{task_id}/current-step")
async def get_current_task_step(task_id: str):
    task = next((t for t in tasks_data if t["id"] == task_id), None)
    if not task:
        raise HTTPException(status_code=404, detail="Task not found")
    
    # Mock current step based on task type
    if task["type"] == "delivery":
        return {"step": 2, "total_steps": 3, "description": "At Station A - Awaiting Operator Verification"}
    elif task["type"] == "collection":
        return {"step": 1, "total_steps": 2, "description": "Moving to customer table"}
    
    return {"step": 1, "total_steps": 1, "description": "Initial step"}

@app.put("/api/tasks/{task_id}/pause")
async def pause_task(task_id: str):
    task = next((t for t in tasks_data if t["id"] == task_id), None)
    if not task:
        raise HTTPException(status_code=404, detail="Task not found")
    
    task["state"] = "PAUSED"
    return {"message": f"Task {task_id} paused", "task": task}

@app.put("/api/tasks/{task_id}/resume")
async def resume_task(task_id: str):
    task = next((t for t in tasks_data if t["id"] == task_id), None)
    if not task:
        raise HTTPException(status_code=404, detail="Task not found")
    
    task["state"] = "READY"
    return {"message": f"Task {task_id} resumed", "task": task}

# Reports endpoints
@app.get("/api/reports/daily")
async def get_daily_report():
    # Return mock daily report
    return {
        "date": datetime.now().date().isoformat(),
        "total_tasks": 25,
        "completed_tasks": 22,
        "failed_tasks": 1,
        "avg_completion_time": "2.5 minutes",
        "robot_utilization": "85%"
    }

@app.get("/api/reports/tasks")
async def get_task_statistics():
    # Return mock task statistics
    return {
        "delivery_tasks": 12,
        "collection_tasks": 8,
        "ordering_tasks": 3,
        "payment_tasks": 2,
        "charging_tasks": 5
    }

@app.get("/api/reports/performance")
async def get_performance_report():
    # Return mock performance report
    return {
        "system_health": 98,
        "avg_response_time": "0.2s",
        "peak_load_time": "18:30",
        "error_rate": "0.5%",
        "uptime": "99.9%"
    }

# WebSocket endpoint placeholder
@app.websocket("/ws")
async def websocket_endpoint(websocket):
    # In a real implementation, this would handle WebSocket connections
    # For now, we'll just acknowledge the connection
    await websocket.accept()
    await websocket.send_text("WebSocket connection established")
    await websocket.close()

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)