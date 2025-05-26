// models/FacilityPayment.js
const mongoose = require('mongoose');

const facilityPaymentSchema = new mongoose.Schema({
  parentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Parent',
    required: true
  },
  courseId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Course',
    required: true
  },
  facilityFeeId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'FacilityFee', // Link to the FacilityFee model
    required: true
  },
  amountPaid: {
    type: Number,
    required: true
  },
  paymentDate: {
    type: Date,
    default: Date.now
  },
  paymentMethod: {
    type: String,
    enum: ['Credit', 'Debit', 'Cash', 'Other'],
    required: true
  }
}, { timestamps: true });

module.exports = mongoose.model('FacilityPayment', facilityPaymentSchema);
