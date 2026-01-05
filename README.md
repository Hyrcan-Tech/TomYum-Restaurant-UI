# 🍜 Tom Yum Robot Control Center

A smart delivery robot solution for Tom Yum Thai Restaurant built with React, TypeScript, and Tailwind CSS.

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

### Backend (Simulated)
- In-memory data structures simulating a backend
- WebSocket-like real-time updates through React context

## 📦 Prerequisites

- Node.js 18+
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
```

## ▶️ Running the Application

### Development Mode

```bash
npm run dev
```

The application will be available at `http://localhost:8080`

### Production Build

```bash
npm run build
```

### Preview Production Build

```bash
npm run preview
```

## 🌐 Application Pages

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
├── components/        # Reusable UI components
├── pages/            # Page components for each route
├── lib/              # Utility functions and context providers
├── hooks/            # Custom React hooks
├── utils/            # Helper functions
├── App.tsx           # Main application component with routing
└── main.tsx          # Application entry point
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

The application can be deployed to any static hosting service (Vercel, Netlify, etc.) since it's a client-side React application.

To build for production:
```bash
npm run build
```

## 🔐 Security

This is a frontend-only application with simulated backend data. In a production environment, you would need to:

1. Connect to a real backend API
2. Implement proper authentication
3. Add environment variables for API endpoints
4. Implement proper error handling

## 📄 License

This project is licensed for internal use by Tom Yum Thai Restaurant.