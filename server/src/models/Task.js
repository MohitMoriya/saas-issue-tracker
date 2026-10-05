const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  content: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
});

const taskSchema = new mongoose.Schema({
  title: { type: String, required: true, trim: true },
  taskKey: { type: String, required: true, uppercase: true }, // e.g., 'PROJ-101'
  description: { type: String, trim: true },
  status: { 
    type: String, 
    enum: ['BACKLOG', 'TODO', 'IN_PROGRESS', 'IN_REVIEW', 'COMPLETED'], 
    default: 'TODO' 
  },
  priority: { 
    type: String, 
    enum: ['LOW', 'MEDIUM', 'HIGH', 'URGENT'], 
    default: 'MEDIUM' 
  },
  project: { type: mongoose.Schema.Types.ObjectId, ref: 'Project', required: true },
  reporter: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  assignee: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  dueDate: { type: Date },
  tags: [{ type: String, trim: true }],
  comments: [commentSchema]
}, { timestamps: true });

module.exports = mongoose.model('Task', taskSchema);
