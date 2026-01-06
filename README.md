# 🍜 Tom Yum Robot Control Center

A smart delivery robot solution for Tom Yum Thai Restaurant built with React, TypeScript, and FastAPI.

## 📋 Features

- Real-time robot monitoring
- Task queue management with priority system
- Analytics dashboard
- Charging station management
- Menu management
- Customer database
- Payment processing
- Inventory tracking
- Interactive restaurant map
- Drag & drop queue management
- Priority override system
- Detailed task tracking and explainability

## 🛠️ Technology Stack

### Frontend

- **React** with TypeScript
- **Tailwind CSS** for styling
- **shadcn/ui** components
- **React Router** for navigation
- **Lucide React** for icons
- **Vite** for build tooling

### Backend

- **FastAPI** for backend API
- **SQLAlchemy** for database ORM
- **WebSockets** for real-time updates
- **Uvicorn** as ASGI server

## 📦 Prerequisites

- Node.js 18+
- Python 3.9+
- npm or yarn

## 🚀 Installation

1. Clone the repository:

```bash
git clone <repository-url>
cd tom-yum-robot-control
```

2. Install dependencies:

```bash
npm install
pip install -r requirements.txt
```

## ▶️ Running the Application

### Development Mode

1. Start the backend server:

```bash
uvicorn app:app --reload
```

2. In another terminal, start the frontend:

```bash
npm run dev
```

The application will be available at `http://localhost:8080`

### Production Build

1. Build the frontend:

```bash
npm run build
```

2. Start the backend server:

```bash
uvicorn app:app
```

The application will be available at `http://localhost:8000`

### Using the Run Script

```bash
python run_server.py
```

This will automatically build the frontend and start the backend server.

## 🌐 Application Pages

The application uses React Router for client-side navigation:

- **Dashboard** (`/`) - Main overview of system status
- **Task Queue** (`/tasks`) - Manage and monitor task queue
- **Robots** (`/robots`) - Robot status monitoring
- **Map** (`/map`) - Interactive restaurant layout with robot positions
- **Analytics** (`/analytics`) - Performance metrics and insights
- **Customers** (`/customers`) - Customer database management
- **Menu** (`/menu`) - Restaurant menu management
- **Inventory** (`/inventory`) - Track restaurant inventory
- **Payments** (`/payments`) - Payment processing and tracking
- **Charging** (`/charging`) - Robot charging station management
- **Settings** (`/settings`) - System configuration
- **Customer Order** (`/customer-order`) - Customer-facing ordering interface

## 📁 Project Structure

```
src/
├── components/ # Reusable UI components
├── pages/ # Page components for each route
├── lib/ # Utility functions and context providers
├── hooks/ # Custom React hooks
├── utils/ # Helper functions
├── App.tsx # Main application component with routing
└── main.tsx # Application entry point

backend/
├── app.py # FastAPI backend
├── database.py # Database configuration
├── models.py # Database models
└── requirements.txt # Python dependencies
```

## 🧪 Development

### Component Development

The application uses shadcn/ui components extensively. All UI components are built with Tailwind CSS classes for consistent styling.

### State Management

- React Context API for global state management
- useState and useEffect for local component state
- Restaurant context for simulating backend data

### Routing

React Router is used for client-side routing with the following routes defined in `src/App.tsx`.

## 🚢 Deployment

The application can be deployed to any platform that supports Node.js and Python:

1. Build the frontend:
   ```bash
   npm run build
   ```

2. Deploy the backend with the built frontend:
   ```bash
   uvicorn app:app --host 0.0.0.0 --port 8000
   ```

## 🔐 Security

This is a full-stack application with proper authentication and authorization. In a production environment, you should:

1. Set up proper environment variables for secrets
2. Configure CORS appropriately
3. Implement proper error handling
4. Set up HTTPS

## 📡 API Endpoints

The application provides a comprehensive REST API with the following endpoints:

### Authentication

```
POST /api/auth/login
POST /api/auth/logout
GET /api/auth/me
```

### Tables

```
GET /api/tables
GET /api/tables/{table_id}
```

### Points

```
GET /api/points
GET /api/points/{point_id}
GET /api/points/type/{point_type}
```

### Orders

```
GET /api/orders
GET /api/orders/{order_id}
```

### Tasks

```
GET /api/tasks
GET /api/tasks/{task_id}
POST /api/tasks
PUT /api/tasks/{task_id}/status
```

### Robots

```
GET /api/robots
GET /api/robots/{robot_id}
POST /api/robots/{robot_id}/command
```

### Queue Management

```
GET /api/queue/tasks
GET /api/queue/tasks/ready
PUT /api/queue/tasks/{task_id}/priority
POST /api/queue/tasks/{task_id}/override
DELETE /api/queue/tasks/{task_id}/override
GET /api/queue/assignment-log
```

### Charging Management

```
GET /api/charging/status
GET /api/charging/policy
POST /api/charging/manual-request
```

### Task State Machine

```
POST /api/tasks/{task_id}/confirm-step
GET /api/tasks/{task_id}/current-step
PUT /api/tasks/{task_id}/pause
PUT /api/tasks/{task_id}/resume
```

### Reports

```
GET /api/reports/daily
GET /api/reports/tasks
GET /api/reports/performance
```

## 📊 Data Models

### Task

```typescript
interface Task {
  id: string;
  type: "ordering" | "delivery" | "collection" | "payment" | "charging";
  base_priority: number;
  release_time: Date;
  deadline: Date;
  operator_override: number;
  effective_priority: number;
  waypoints: string[];
  state: "WAITING" | "READY" | "CLAIMED" | "RUNNING" | "PAUSED" | "DONE";
  assigned_robot: string | null;
  created_at: Date;
  updated_at: Date;
}
```

### Robot

```typescript
interface Robot {
  id: string;
  current_location: string;
  battery_level: number;
  status: "IDLE" | "MOVING" | "CHARGING" | "ERROR";
  current_task_id: string | null;
  last_active: Date;
  created_at: Date;
}
```

## 📄 License

This project is licensed for internal use by Tom Yum Thai Restaurant.