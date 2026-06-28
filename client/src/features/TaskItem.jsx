import { useState } from 'react';
import { motion } from 'framer-motion';
import { Trash2, CheckCircle, Circle, Edit3, Check } from 'lucide-react';

const TaskItem = ({ task, onToggle, onDelete, onUpdateTitle }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [newTitle, setNewTitle] = useState(task.title);

  const handleSave = () => {
    if (newTitle.trim() !== task.title) {
      onUpdateTitle(task._id, newTitle);
    }
    setIsEditing(false);
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      className="group flex items-center justify-between p-4 bg-white border border-slate-100 rounded-xl shadow-sm hover:shadow-md transition-all mb-3"
    >
      <div className="flex items-center gap-3 flex-1">
        <button 
          onClick={() => onToggle(task._id, task.status)}
          className="text-indigo-500 shrink-0"
        >
          {task.status === 'completed' ? (
            <CheckCircle className="text-emerald-500" size={22} />
          ) : (
            <Circle size={22} />
          )}
        </button>

        {isEditing ? (
          <input
            autoFocus
            className="flex-1 bg-slate-50 border-none focus:ring-0 text-slate-700 font-medium py-0 px-1 rounded"
            value={newTitle}
            onChange={(e) => setNewTitle(e.target.value)}
            onBlur={handleSave}
            onKeyDown={(e) => e.key === 'Enter' && handleSave()}
          />
        ) : (
          <span 
            className={`text-slate-700 font-medium transition-all ${
              task.status === 'completed' ? 'line-through text-slate-400' : ''
            }`}
          >
            {task.title}
          </span>
        )}
      </div>

      <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
        <button
          onClick={() => setIsEditing(!isEditing)}
          className="text-slate-400 hover:text-indigo-500 transition-colors"
        >
          {isEditing ? <Check size={18} /> : <Edit3 size={18} />}
        </button>
        <button
          onClick={() => onDelete(task._id)}
          className="text-slate-400 hover:text-red-500 transition-colors"
        >
          <Trash2 size={18} />
        </button>
      </div>
    </motion.div>
  );
};

export default TaskItem;