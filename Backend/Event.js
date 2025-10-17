const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String },
  location: { type: String },
  startDate: { type: Date },
  endDate: { type: Date },
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  createdAt: { type: Date, default: Date.now },
  tags: [String],
  status: { type: String, enum: ['active', 'cancelled', 'draft'], default: 'active' }
});

module.exports = mongoose.model('Event', eventSchema);