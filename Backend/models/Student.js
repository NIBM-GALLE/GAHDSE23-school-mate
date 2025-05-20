const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // Link to the User collection (with role: 'student')
    required: true,
    unique: true
  },
  courses: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Course' // Each student can enroll in many courses
    }
  ]
}, { timestamps: true });

module.exports = mongoose.model('Student', studentSchema);
