import mongoose from 'mongoose';

const taskSchema = mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'User' },
  title: { type: String, required: true },
  description: { type: String },
  status: { type: String, enum: ['pending', 'completed'], default: 'pending' },
}, { timestamps: true });

export default mongoose.model('Task', taskSchema);