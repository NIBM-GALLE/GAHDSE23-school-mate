// models/Parent.js

const mongoose = require('mongoose');

const parentSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // Link to the User collection (with role: 'parent')
    required: true,
    unique: true
  },
  student: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Student', // Optional link to the student
    required: true
  }
}, { timestamps: true });

module.exports = mongoose.model('Parent', parentSchema);
