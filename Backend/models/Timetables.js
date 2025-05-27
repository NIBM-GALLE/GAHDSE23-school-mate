const mongoose = require('mongoose');

const timetableSchema = new mongoose.Schema({
  courseId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Course',
    required: true
  },
  day: {
    type: String,
    enum: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
    required: true
  },
  timeSlot: {
    type: String,
    required: true
  },
  subject: {
    type: String,
    required: true
  },
  teacherId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  room: {
    type: String,
    required: true
  }
}, { timestamps: true });

// Compound index to prevent scheduling conflicts
timetableSchema.index({ courseId: 1, day: 1, timeSlot: 1 }, { unique: true });
timetableSchema.index({ teacherId: 1, day: 1, timeSlot: 1 }, { unique: true });

module.exports = mongoose.model('Timetable', timetableSchema);