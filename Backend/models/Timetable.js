const mongoose = require('mongoose');

const timetableSchema = new mongoose.Schema({
  moduleId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Module',
    required: true
  },
  date: {
    type: Date,
    required: true
  },
  startTime: {
    type: String,
    required: true
  },
  endTime: {
    type: String,
    required: true
  },
  note: {
    type: String
  }
}, { timestamps: true });

module.exports = mongoose.model('Timetable', timetableSchema);
