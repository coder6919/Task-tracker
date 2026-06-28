import { BrowserRouter as Router, Routes, Route, Navigate, useLocation, useNavigate } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import AuthForm from './features/AuthForm';
import TaskList from './features/TaskList';

// Animation settings
const variants = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 },
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
    <div className="relative w-full overflow-hidden">
      {/* popLayout prevents the 'pushing down' effect during transitions */}
      <AnimatePresence mode="popLayout" initial={false}>
        <Routes location={location} key={location.pathname}>
          
          <Route path="/login" element={
            !user ? (
              <motion.div key="login" variants={variants} initial="initial" animate="animate" exit="exit" transition={{ duration: 0.3 }}>
                <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
                  <AuthForm isLogin={true} setUser={setUser} />
                </div>
              </motion.div>
            ) : <Navigate to="/dashboard" replace />
          } />

          <Route path="/signup" element={
            !user ? (
              <motion.div key="signup" variants={variants} initial="initial" animate="animate" exit="exit" transition={{ duration: 0.3 }}>
                <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
                  <AuthForm isLogin={false} setUser={setUser} />
                </div>
              </motion.div>
            ) : <Navigate to="/dashboard" replace />
          } />

          <Route path="/dashboard" element={
            user ? (
              <motion.div key="dashboard" variants={variants} initial="initial" animate="animate" exit="exit" transition={{ duration: 0.3 }}>
                <Dashboard user={user} setUser={setUser} />
              </motion.div>
            ) : <Navigate to="/login" replace />
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
    return storedUser ? JSON.parse(storedUser) : null;
  });

  // Scroll to top on every route change
  const ScrollToTop = () => {
    const { pathname } = useLocation();
    useEffect(() => {
      window.scrollTo(0, 0);
    }, [pathname]);
    return null;
  };

  return (
    <Router>
      <ScrollToTop />
      <AnimatedRoutes user={user} setUser={setUser} />
    </Router>
  );
}