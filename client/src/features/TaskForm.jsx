import { useState } from 'react';
import { Plus } from 'lucide-react';
import API from '../api/axios';

const TaskForm = ({ onTaskAdded }) => {
  const [title, setTitle] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await API.post('/tasks', { title });
      onTaskAdded(data);
      setTitle('');
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mb-8 flex gap-2">
      <input
        type="text"
        placeholder="What needs to be done?"
        className="flex-1 px-4 py-3 bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 shadow-sm"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />
      <button
        type="submit"
        className="bg-indigo-600 hover:bg-indigo-700 text-white p-3 rounded-xl transition-transform active:scale-95 shadow-md"
      >
        <Plus size={24} />
      </button>
    </form>
  );
};

export default TaskForm;