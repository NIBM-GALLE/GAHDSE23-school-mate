const mongoose = require('mongoose');

const facilityFeeSchema = new mongoose.Schema({
  courseId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Course',
    required: true
  },
  feeAmount: {
    type: Number,
    required: true
  },
  description: {
    type: String
  }
}, { timestamps: true });

module.exports = mongoose.model('FacilityFee', facilityFeeSchema);
