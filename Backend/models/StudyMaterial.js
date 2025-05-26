const mongoose = require('mongoose');

const studyMaterialSchema = new mongoose.Schema({
  moduleId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Module',
    required: true
  },
  title: { type: String, required: true },
  description: String,
  fileUrl: String // optional file path or link
}, { timestamps: true });

module.exports = mongoose.model('StudyMaterial', studyMaterialSchema);
