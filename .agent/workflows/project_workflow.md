---
description: Comprehensive guide to setting up, running, and developing the EventSense project locally.
---

# EventSense Project Workflow

This workflow details the steps to set up the development environment, run the application, and perform common development tasks for the EventSense project.

## Prerequisites

Ensure you have the following installed:
- **Node.js** (v14 or higher) - [Download](https://nodejs.org/)
- **MongoDB** (Local or Atlas) - [Download](https://www.mongodb.com/try/download/community)
- **Git** - [Download](https://git-scm.com/)

## 1. Initial Setup

If this is your first time working on the project, follow these setup steps.

### Clone and Install Dependencies

1.  **Backend Dependencies**
    ```bash
    cd "d:/1_Project Event booking/backend"
    npm install
    ```

// turbo
2.  **Frontend Dependencies**
    ```bash
    cd "d:/1_Project Event booking/frontend"
    npm install
    ```

### Environment Configuration

1.  Navigate to the `backend` directory.
2.  Ensure a `.env` file exists with the following configuration (create it if missing):
    ```properties
    MONGO_URI=mongodb+srv://vishal:Vishal8264@cluster0.lfpl7c7.mongodb.net/EventSense?retryWrites=true&w=majority
    JWT_SECRET=eventsense_super_secret_jwt_key_2026_production_ready
    PORT=5000
    
    # Email Configuration (Optional)
    EMAIL_USER=your-email@gmail.com
    EMAIL_PASS=your-app-password
    EMAIL_FROM=EventSense <noreply@eventsense.com>
    ```

### Database Seeding (Optional)

To populate the database with initial test data (Admin, Organizer, User accounts):

// turbo
1.  **Run Seed Script**
    ```bash
    cd "d:/1_Project Event booking/backend"
    npm run seed
    ```

## 2. Running the Application

You need to run both the backend and frontend servers simultaneously.

### Start Backend Server

The backend runs on port `5000`.

1.  Open a terminal.
2.  Run the development server:
    ```bash
    cd "d:/1_Project Event booking/backend"
    npm run dev
    ```
    *Output should confirm: `MongoDB Connected` and listening on port 5000.*

### Start Frontend Server

The frontend runs on port `5173` (Vite default).

1.  Open a **new** terminal.
2.  Run the development server:
    ```bash
    cd "d:/1_Project Event booking/frontend"
    npm run dev
    ```
3.  Open your browser and navigate to `http://localhost:5173`.

## 3. Common Development Tasks

### Project Structure Overview

- **Backend** (`/backend`):
    - `server.js`: Application entry point.
    - `routes/`: API route definitions.
    - `controllers/`: Logic for handling requests.
    - `models/`: Database schemas.
- **Frontend** (`/frontend`):
    - `src/App.jsx`: Main React component.
    - `src/pages/`: Page components/views.
    - `src/components/`: Reusable UI components.

### Adding New Dependencies

- **Backend**:
    ```bash
    cd backend
    npm install <package_name>
    ```
- **Frontend**:
    ```bash
    cd frontend
    npm install <package_name>
    ```

### Troubleshooting

- **Port in Use**: If port 5000 or 5173 is busy, kill the process or change the port in `.env` (backend) or `vite.config.js` (frontend).
- **Database Connection Error**: unexpected token... usually means IP whitelist issues on MongoDB Atlas or incorrect credentials in `.env`.
