from sqlalchemy import Column, Integer, String, DateTime, Float, Text, JSON
from database import Base
from datetime import datetime

class Task(Base):
    __tablename__ = "tasks"
    
    id = Column(String, primary_key=True, index=True)
    type = Column(String, index=True)
    base_priority = Column(Integer)
    release_time = Column(DateTime)
    deadline = Column(DateTime, nullable=True)
    operator_override = Column(Integer, default=0)
    effective_priority = Column(Integer)
    waypoints = Column(JSON)
    state = Column(String, default="WAITING")
    assigned_robot = Column(String, nullable=True)
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

class Robot(Base):
    __tablename__ = "robots"
    
    id = Column(String, primary_key=True, index=True)
    current_location = Column(String)
    battery_level = Column(Integer)
    status = Column(String)
    current_task_id = Column(String, nullable=True)
    last_active = Column(DateTime, default=datetime.utcnow)
    created_at = Column(DateTime, default=datetime.utcnow)

class AssignmentLog(Base):
    __tablename__ = "assignment_logs"
    
    id = Column(Integer, primary_key=True, index=True, autoincrement=True)
    task_id = Column(String, index=True)
    robot_id = Column(String, index=True)
    assignment_time = Column(DateTime, default=datetime.utcnow)
    score = Column(Float)
    reason = Column(Text)
    effective_priority = Column(Integer)