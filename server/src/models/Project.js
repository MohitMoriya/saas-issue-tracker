const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
  title: { type: String, required: true, trim: true },
  key: { type: String, required: true, uppercase: true, trim: true }, // e.g., 'PROJ'
  description: { type: String, trim: true },
  owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  members: [{
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    role: { type: String, enum: ['Admin', 'Member'], default: 'Member' }
  }],
  status: { type: String, enum: ['ACTIVE', 'ARCHIVED', 'COMPLETED'], default: 'ACTIVE' }
}, { timestamps: true });

module.exports = mongoose.model('Project', projectSchema);
