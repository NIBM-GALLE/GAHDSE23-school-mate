// models/Module.js
const mongoose = require('mongoose');

const moduleSchema = new mongoose.Schema({
  courseId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Course',
    required: true
  },
  moduleName: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model('Module', moduleSchema);
