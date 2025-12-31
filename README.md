# 🍜 Tom Yum Robot Control Center

A smart delivery robot solution for Tom Yum Thai Restaurant.

## 📋 Features

- Real-time robot monitoring
- Task queue management with priority system
- Analytics dashboard
- Charging station management
- Menu management
- Customer database
- Payment processing
- Inventory tracking
- Drag & drop queue management
- Priority override system
- Detailed task tracking and explainability

## 🛠️ Technology Stack

### Backend
- **Python** + **FastAPI**
- **PostgreSQL** (via SQLAlchemy ORM)
- **Redis** for caching and real-time updates
- **WebSocket** for real-time communication

### Frontend
- **Vanilla JavaScript** + **Bootstrap 5**
- **Leaflet.js** for interactive maps
- **Chart.js** for data visualization
- **Socket.io** client for real-time updates
- **Sortable.js** for drag & drop functionality

## 📦 Prerequisites

- Python 3.7+
- Node.js 14+ (for frontend development)
- PostgreSQL (optional, uses SQLite by default for demo)
- Redis (optional, for real-time features)

## 🚀 Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd tom-yum-robot-control
   ```

2. Install Python dependencies:
   ```bash
   pip install -r requirements.txt
   ```

3. For frontend development, install Node.js dependencies:
   ```bash
   cd frontend
   npm install
   ```

## ▶️ Running the Application

### Development Mode

1. Start the backend server:
   ```bash
   python app.py
   ```

2. The API will be available at `http://localhost:8000`

3. For frontend development, open the HTML files directly in your browser or use a local server:
   ```bash
   # If you have Python 3
   python -m http.server 8080
   
   # Or with Node.js
   npx serve
   ```

4. Access the application at `http://localhost:8080`

### Production Deployment

1. Set up PostgreSQL and Redis servers
2. Update database configuration in `database.py`
3. Run database migrations:
   ```bash
   alembic upgrade head
   ```
4. Start the application with a production WSGI server:
   ```bash
   uvicorn app:app --host 0.0.0.0 --port 8000 --workers 4
   ```

## 🌐 API Endpoints

### Authentication
- `POST /api/auth/login` - User login
- `POST /api/auth/logout` - User logout
- `GET /api/auth/me` - Get current user info

### Tables
- `GET /api/tables` - List all tables
- `GET /api/tables/:id` - Get specific table info

### Points
- `GET /api/points` - List all points
- `GET /api/points/:id` - Get specific point info
- `GET /api/points/type/:type` - Get points by type

### Orders
- `GET /api/orders` - List orders
- `GET /api/orders/:id` - Get order details

### Tasks
- `GET /api/tasks` - List tasks
- `GET /api/tasks/:id` - Get task details
- `POST /api/tasks` - Create new task
- `PUT /api/tasks/:id/status` - Update task status

### Robots
- `GET /api/robots` - List robots
- `GET /api/robots/:id` - Get robot status
- `POST /api/robots/:id/command` - Send command to robot

### Queue Management
- `GET /api/queue/tasks` - Get all tasks
- `GET /api/queue/tasks/ready` - Get ready tasks
- `PUT /api/queue/tasks/:id/priority` - Update task priority
- `POST /api/queue/tasks/:id/override` - Apply task override
- `DELETE /api/queue/tasks/:id/override` - Remove task override
- `GET /api/queue/assignment-log` - Get assignment logs

### Charging Management
- `GET /api/charging/status` - Get charging status
- `GET /api/charging/policy` - Get charging policy
- `POST /api/charging/manual-request` - Request manual charging

### Task State Machine
- `POST /api/tasks/:id/confirm-step` - Confirm task step
- `GET /api/tasks/:id/current-step` - Get current step
- `PUT /api/tasks/:id/pause` - Pause task
- `PUT /api/tasks/:id/resume` - Resume task

### Reports
- `GET /api/reports/daily` - Daily report
- `GET /api/reports/tasks` - Task statistics
- `GET /api/reports/performance` - Performance report

## 📁 Project Structure

```
tom-yum-robot-control/
├── app.py                 # Main FastAPI application
├── database.py            # Database configuration
├── models.py              # Database models
├── requirements.txt       # Python dependencies
├── README.md              # This file
├── frontend/
│   ├── index.html         # Main dashboard
│   ├── queue.html         # Queue management
│   ├── task-details.html  # Task details
│   ├── reports.html       # Reports and analytics
│   └── assets/
│       ├── css/
│       ├── js/
│       └── images/
└── alembic/               # Database migrations (if using)
```

## 🧪 Development

### Backend Development

The backend uses FastAPI with automatic API documentation available at:
- Swagger UI: `http://localhost:8000/docs`
- ReDoc: `http://localhost:8000/redoc`

### Frontend Development

The frontend is built with vanilla JavaScript and Bootstrap 5. All HTML files can be opened directly in a browser for development.

### WebSocket Communication

Real-time updates are handled through WebSocket connections:
```javascript
const socket = io('http://localhost:8000');
socket.on('robot_status_update', (data) => {
    // Handle robot status updates
});
```

## 🚢 Deployment

For production deployment:
1. Use a reverse proxy like Nginx
2. Set up SSL certificates
3. Configure environment variables
4. Use a process manager like PM2 or systemd
5. Set up database backups

## 🔐 Security

- All API endpoints are protected with authentication
- Passwords are hashed using bcrypt
- JWT tokens are used for session management
- CORS is configured for web client access

## 📄 License

This project is licensed for internal use by Tom Yum Thai Restaurant.