# 📝 TaskFlow: Animated MERN Task Tracker

A high-performance, full-stack task management application built with the **MERN** stack. This project features "Framer-like" smooth animations, a modern **Tailwind CSS v4** design system, and a robust **JWT-based** authentication system.

### 🔗 [Live Demo (Vercel)](https://your-vercel-link.vercel.app) | 🖥️ [Backend API (Render)](https://your-render-link.onrender.com)

---

## 🚀 Features

### **Core Functionality (CRUD)**
- **Create:** Add tasks instantly with a focus-friendly input.
- **Read:** View a personalized list of tasks synced with MongoDB Atlas.
- **Update:** 
  - **Inline Editing:** Click a task title to rename it on the fly.
  - **Status Toggle:** One-click completion marking with visual feedback.
- **Delete:** Remove tasks with smooth "pop-out" exit animations.

### **Advanced UI/UX (Framer Motion)**
- **Smooth Transitions:** Layout-aware animations where items slide into place when one is deleted.
- **Page Transitions:** Staggered fade-and-slide effects between Login, Signup, and Dashboard.
- **Stacking Fix:** Custom CSS Grid stacking to prevent layout jumps during page swaps.
- **Tailwind CSS v4:** Built using the latest "CSS-first" configuration for maximum performance.

### **Security & State**
- **JWT Auth:** Secure authentication using JSON Web Tokens.
- **BcryptJS:** Industry-standard password hashing on the backend.
- **Protected Routes:** Automatic redirection for unauthenticated users.
- **Data Isolation:** Complete privacy—users can only see and edit their own data.

---

## 🛠️ Tech Stack

**Frontend:**
- **React.js (v18.3)**
- **Tailwind CSS (v4.0)** (Vite Plugin setup)
- **Framer Motion** (Layout & Page animations)
- **Lucide React** (Modern iconography)
- **Axios** (API communication)

**Backend:**
- **Node.js & Express.js**
- **MongoDB & Mongoose** (NoSQL Database)
- **JSON Web Tokens (JWT)** (Secure Auth)
- **BcryptJS** (Password encryption)

---

## 📂 Project Structure

```text
task-tracker/
├── client/                # Frontend (Vite + React)
│   ├── src/
│   │   ├── api/           # Axios instance & Interceptors
│   │   ├── components/    # Reusable UI (Transitions)
│   │   ├── features/      # Auth, TaskList, TaskItem, TaskForm
│   │   ├── App.jsx        # Routing, Global State, & AnimatePresence
│   │   └── index.css      # Tailwind v4 @import & Page Stacking CSS
│   ├── vite.config.js     # Tailwind v4 plugin configuration
│   └── vercel.json        # SPA Routing configuration
└── server/                # Backend (Node + Express)
    ├── config/            # MongoDB connection logic
    ├── models/            # User & Task Mongoose Schemas
    ├── routes/            # Express API endpoints
    ├── controllers/       # Auth & Task Business Logic
    └── index.js           # Server Entry Point

## Installation And Setup
git clone https://github.com/your-username/task-tracker.git
cd task-tracker

cd server
npm install

PORT=5000
MONGO_URI=your_mongodb_atlas_connection_string
JWT_SECRET=your_random_secret_key
CLIENT_URL=http://localhost:5173

cd ../client
npm install

VITE_API_URL=http://localhost:5000/api
