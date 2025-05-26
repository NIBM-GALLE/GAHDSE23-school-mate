const mongoose = require('mongoose');

const gradeReportSchema = new mongoose.Schema({
  studentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Student',
    required: true
  },
  moduleId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Module',
    required: true
  },
  date: {
    type: Date,
    required: true
  },
  grade: {
    type: String,
    required: true
  },
  reportUrl: {
    type: String
  },
  feedback: {
    type: String // New field
  }
}, { timestamps: true });

module.exports = mongoose.model('GradeReport', gradeReportSchema);
