// WebSocket connection
const socket = new WebSocket('ws://localhost:8000/ws');

socket.onopen = function(event) {
    console.log('WebSocket connection established');
};

socket.onmessage = function(event) {
    const data = JSON.parse(event.data);
    console.log('Received:', data);
    
    // Handle different types of updates
    switch(data.type) {
        case 'robot_updated':
            updateRobotStatus(data.data);
            break;
        case 'task_created':
            addNewTask(data.data);
            break;
        case 'task_updated':
            updateTaskStatus(data.data);
            break;
        case 'task_priority_updated':
            updateTaskPriority(data.data);
            break;
        case 'charging_updated':
            updateChargingStatus(data.data);
            break;
        default:
            console.log('Unknown message type:', data.type);
    }
};

socket.onerror = function(error) {
    console.error('WebSocket error:', error);
};

socket.onclose = function(event) {
    console.log('WebSocket connection closed');
};

// Update robot status in UI
function updateRobotStatus(robot) {
    const robotElement = document.querySelector(`[data-robot-id="${robot.id}"]`);
    if (robotElement) {
        robotElement.querySelector('.robot-status').textContent = robot.status;
        robotElement.querySelector('.robot-battery').textContent = `${robot.battery_level}%`;
        robotElement.querySelector('.robot-location').textContent = robot.current_location;
        
        // Update status class
        robotElement.className = robotElement.className.replace(/robot-\w+/, `robot-${robot.status.toLowerCase()}`);
    }
}

// Add new task to UI
function addNewTask(task) {
    const taskQueue = document.getElementById('taskQueue');
    if (taskQueue) {
        const taskElement = document.createElement('div');
        taskElement.className = `list-group-item task-item priority-${getPriorityClass(task.effective_priority)}`;
        taskElement.dataset.id = task.id;
        taskElement.innerHTML = `
            <div class="d-flex justify-content-between align-items-start">
                <div>
                    <div class="d-flex align-items-center mb-1">
                        <span class="badge bg-${getPriorityBadgeColor(task.effective_priority)} me-2">${getPriorityEmoji(task.effective_priority)}</span>
                        <strong>${task.id}</strong>
                        <span class="badge bg-light text-dark ms-2">${task.type}</span>
                        <span class="badge bg-primary ms-2">${task.state}</span>
                    </div>
                    <div class="text-muted">${task.waypoints[0]}</div>
                    <div class="mt-1">
                        <small>Pri: ${getPriorityText(task.effective_priority)}</small>
                    </div>
                </div>
                <div>
                    <button class="btn btn-sm btn-outline-primary me-1">Assign</button>
                    <button class="btn btn-sm btn-outline-secondary">Details</button>
                </div>
            </div>
        `;
        taskQueue.prepend(taskElement);
    }
}

// Update task status in UI
function updateTaskStatus(task) {
    const taskElement = document.querySelector(`[data-id="${task.id}"]`);
    if (taskElement) {
        taskElement.querySelector('.badge.bg-primary').textContent = task.state;
        taskElement.className = taskElement.className.replace(/priority-\w+/, `priority-${getPriorityClass(task.effective_priority)}`);
    }
}

// Update task priority in UI
function updateTaskPriority(task) {
    const taskElement = document.querySelector(`[data-id="${task.id}"]`);
    if (taskElement) {
        taskElement.querySelector('.mt-1 small').textContent = `Pri: ${getPriorityText(task.effective_priority)}`;
        taskElement.className = taskElement.className.replace(/priority-\w+/, `priority-${getPriorityClass(task.effective_priority)}`);
    }
}

// Update charging status in UI
function updateChargingStatus(data) {
    // Update robot status
    updateRobotStatus(data.robot);
    
    // Update charging station status if displayed
    const stationElement = document.querySelector(`[data-station-id="${data.station.id}"]`);
    if (stationElement) {
        stationElement.querySelector('.station-status').textContent = data.station.status;
        stationElement.querySelector('.station-robot').textContent = data.station.robot_id || 'None';
    }
}

// Helper functions
function getPriorityClass(priority) {
    if (priority >= 90) return 'high';
    if (priority >= 70) return 'medium';
    return 'low';
}

function getPriorityBadgeColor(priority) {
    if (priority >= 90) return 'danger';
    if (priority >= 70) return 'warning';
    return 'secondary';
}

function getPriorityEmoji(priority) {
    if (priority >= 90) return '🔴';
    if (priority >= 70) return '🟡';
    return '⚪';
}

function getPriorityText(priority) {
    if (priority >= 90) return 'Very High';
    if (priority >= 70) return 'High';
    if (priority >= 50) return 'Medium';
    return 'Low';
}

// API functions
async function apiCall(endpoint, method = 'GET', data = null) {
    const options = {
        method: method,
        headers: {
            'Content-Type': 'application/json',
        }
    };
    
    if (data) {
        options.body = JSON.stringify(data);
    }
    
    try {
        const response = await fetch(`/api${endpoint}`, options);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return await response.json();
    } catch (error) {
        console.error('API call failed:', error);
        throw error;
    }
}

// Task management functions
async function createTask(taskData) {
    try {
        const result = await apiCall('/tasks', 'POST', taskData);
        console.log('Task created:', result);
        return result;
    } catch (error) {
        console.error('Failed to create task:', error);
        alert('Failed to create task');
    }
}

async function updateTaskStatus(taskId, status) {
    try {
        const result = await apiCall(`/tasks/${taskId}/status`, 'PUT', { state: status });
        console.log('Task status updated:', result);
        return result;
    } catch (error) {
        console.error('Failed to update task status:', error);
        alert('Failed to update task status');
    }
}

async function updateTaskPriority(taskId, priorityData) {
    try {
        const result = await apiCall(`/queue/tasks/${taskId}/priority`, 'PUT', priorityData);
        console.log('Task priority updated:', result);
        return result;
    } catch (error) {
        console.error('Failed to update task priority:', error);
        alert('Failed to update task priority');
    }
}

async function applyTaskOverride(taskId, overrideData) {
    try {
        const result = await apiCall(`/queue/tasks/${taskId}/override`, 'POST', overrideData);
        console.log('Task override applied:', result);
        return result;
    } catch (error) {
        console.error('Failed to apply task override:', error);
        alert('Failed to apply task override');
    }
}

// Robot management functions
async function sendRobotCommand(robotId, command) {
    try {
        const result = await apiCall(`/robots/${robotId}/command`, 'POST', { command: command });
        console.log('Robot command sent:', result);
        return result;
    } catch (error) {
        console.error('Failed to send robot command:', error);
        alert('Failed to send robot command');
    }
}

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
    console.log('Application initialized');
    
    // Set up event listeners for task creation
    const taskForm = document.getElementById('taskForm');
    if (taskForm) {
        taskForm.addEventListener('submit', async function(e) {
            e.preventDefault();
            
            const formData = new FormData(taskForm);
            const taskData = {
                type: formData.get('type'),
                table: formData.get('table'),
                priority: formData.get('priority')
            };
            
            await createTask(taskData);
            taskForm.reset();
        });
    }
    
    // Set up event listeners for task actions
    document.addEventListener('click', async function(e) {
        // Task assignment
        if (e.target.classList.contains('assign-task')) {
            const taskId = e.target.closest('[data-id]').dataset.id;
            await updateTaskStatus(taskId, 'RUNNING');
        }
        
        // Task details
        if (e.target.classList.contains('task-details')) {
            const taskId = e.target.closest('[data-id]').dataset.id;
            window.location.href = `/task-details?task=${taskId}`;
        }
        
        // Critical task
        if (e.target.classList.contains('critical-task')) {
            const taskId = e.target.closest('[data-id]').dataset.id;
            await applyTaskOverride(taskId, {
                boost: 50,
                reason: 'Operator marked as critical'
            });
        }
        
        // Robot commands
        if (e.target.classList.contains('robot-command')) {
            const robotId = e.target.dataset.robotId;
            const command = e.target.dataset.command;
            await sendRobotCommand(robotId, command);
        }
    });
    
    // Set up real-time updates for system stats
    setInterval(async function() {
        try {
            const report = await apiCall('/reports/daily');
            document.getElementById('activeTasksCount').textContent = report.total_tasks;
            document.getElementById('robotsOkCount').textContent = '4';
            document.getElementById('avgBatteryLevel').textContent = '71%';
            document.getElementById('systemHealth').textContent = `${report.system_health}%`;
        } catch (error) {
            console.error('Failed to update system stats:', error);
        }
    }, 5000);
});