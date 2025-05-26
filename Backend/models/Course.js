// models/Course.js

const mongoose = require('mongoose');

const courseSchema = new mongoose.Schema({
  courseName: {
    type: String,
    required: true
  },
  courseDirector: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // Reference to the User model
    required: true
  },
  // Additional fields can be added like description, start date, etc.
}, { timestamps: true });

module.exports = mongoose.model('Course', courseSchema);
