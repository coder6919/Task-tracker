import { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import API from '../api/axios';
import TaskForm from './TaskForm';
import TaskItem from './TaskItem';

const TaskList = () => {
  const [tasks, setTasks] = useState([]);
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const { data } = await API.get('/tasks');
      setTasks(data);
    } catch (err) { console.error(err); }
  };

  const handleToggle = async (id, currentStatus) => {
    try {
      const newStatus = currentStatus === 'completed' ? 'pending' : 'completed';
      const { data } = await API.put(`/tasks/${id}`, { status: newStatus });
      setTasks(tasks.map(t => t._id === id ? data : t));
    } catch (err) { console.error(err); }
  };

  const handleDelete = async (id) => {
    try {
      await API.delete(`/tasks/${id}`);
      setTasks(tasks.filter(t => t._id !== id));
    } catch (err) { console.error(err); }
  };

  const handleUpdateTitle = async (id, newTitle) => {
    try {
      const { data } = await API.put(`/tasks/${id}`, { title: newTitle });
      setTasks(tasks.map(t => t._id === id ? data : t));
    } catch (err) { console.error(err); }
  };

  const filteredTasks = tasks.filter(task => {
    if (filter === 'pending') return task.status === 'pending';
    if (filter === 'completed') return task.status === 'completed';
    return true;
  });

  return (
    <div className="max-w-2xl mx-auto w-full px-4">
      <TaskForm onTaskAdded={(newTask) => setTasks([newTask, ...tasks])} />
      
      {/* Filter Tabs */}
      <div className="flex gap-4 mb-6 border-b border-slate-200">
        {['all', 'pending', 'completed'].map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`pb-2 px-1 capitalize text-sm font-medium transition-colors relative ${
              filter === f ? 'text-indigo-600' : 'text-slate-400 hover:text-slate-600'
            }`}
          >
            {f}
            {filter === f && (
              <motion.div 
                layoutId="activeTab" 
                className="absolute bottom-0 left-0 right-0 h-0.5 bg-indigo-600" 
              />
            )}
          </button>
        ))}
      </div>

      <div className="relative">
        <AnimatePresence mode='popLayout'>
          {filteredTasks.map(task => (
            <TaskItem 
              key={task._id} 
              task={task} 
              onToggle={handleToggle} 
              onDelete={handleDelete}
              onUpdateTitle={handleUpdateTitle}
            />
          ))}
        </AnimatePresence>
      </div>

      {filteredTasks.length === 0 && (
        <motion.p 
          initial={{ opacity: 0 }} 
          animate={{ opacity: 1 }} 
          className="text-center text-slate-400 mt-10"
        >
          No {filter !== 'all' ? filter : ''} tasks found.
        </motion.p>
      )}
    </div>
  );
};

export default TaskList;