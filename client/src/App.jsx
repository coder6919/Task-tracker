import { BrowserRouter as Router, Routes, Route, Navigate, useLocation, useNavigate } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import AuthForm from './features/AuthForm';
import TaskList from './features/TaskList';

// Smooth fade + slight slide variants
const pageVariants = {
  initial: { opacity: 0, x: 10 },
  animate: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: -10 },
};

const Dashboard = ({ user, setUser }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('userInfo');
    setUser(null);
    navigate('/login', { replace: true });
  };

  return (
    <div className="min-h-screen bg-slate-50 w-full">
      <div className="max-w-4xl mx-auto py-10 px-4">
        <nav className="flex justify-between items-center mb-12">
          <div>
            <h1 className="text-2xl font-bold text-slate-800">Task Tracker</h1>
            <p className="text-slate-500">Welcome back, {user?.username}!</p>
          </div>
          <button 
            onClick={handleLogout}
            className="px-4 py-2 text-sm font-medium text-red-600 hover:bg-red-50 rounded-lg transition-colors border border-red-100 bg-white cursor-pointer shadow-sm active:scale-95"
          >
            Logout
          </button>
        </nav>
        <TaskList />
      </div>
    </div>
  );
};

const AnimatedRoutes = ({ user, setUser }) => {
  const location = useLocation();

  return (
    <div className="page-stack min-h-screen w-full bg-slate-50 overflow-hidden">
      <AnimatePresence mode="sync">
        <Routes location={location} key={location.pathname}>
          
          <Route path="/login" element={
            <motion.div variants={pageVariants} initial="initial" animate="animate" exit="exit" transition={{ duration: 0.3 }}>
              <div className="min-h-screen flex items-center justify-center p-4">
                {user ? <Navigate to="/dashboard" replace /> : <AuthForm isLogin={true} setUser={setUser} />}
              </div>
            </motion.div>
          } />

          <Route path="/signup" element={
            <motion.div variants={pageVariants} initial="initial" animate="animate" exit="exit" transition={{ duration: 0.3 }}>
              <div className="min-h-screen flex items-center justify-center p-4">
                {user ? <Navigate to="/dashboard" replace /> : <AuthForm isLogin={false} setUser={setUser} />}
              </div>
            </motion.div>
          } />

          <Route path="/dashboard" element={
            <motion.div variants={pageVariants} initial="initial" animate="animate" exit="exit" transition={{ duration: 0.3 }}>
              {user ? <Dashboard user={user} setUser={setUser} /> : <Navigate to="/login" replace />}
            </motion.div>
          } />

          <Route path="/" element={<Navigate to="/login" replace />} />
        </Routes>
      </AnimatePresence>
    </div>
  );
};

export default function App() {
  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem('userInfo');
    try {
      return storedUser ? JSON.parse(storedUser) : null;
    } catch {
      return null;
    }
  });

  return (
    <Router>
      <AnimatedRoutes user={user} setUser={setUser} />
    </Router>
  );
}