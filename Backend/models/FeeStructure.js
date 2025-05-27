const feeStructureSchema = new mongoose.Schema({
  courseId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Course',
    required: true
  },
  feeType: {
    type: String,
    enum: ['Tuition', 'Lab', 'Library', 'Sports', 'Event'],
    required: true
  },
  amount: {
    type: Number,
    required: true,
    min: 0
  },
  dueDate: {
    type: Date,
    required: true
  },
  description: {
    type: String
  }
}, { timestamps: true });

module.exports = mongoose.model('FeeStructure', feeStructureSchema);

// models/Payment.js
const paymentSchema = new mongoose.Schema({
  studentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  feeId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'FeeStructure',
    required: true
  },
  amount: {
    type: Number,
    required: true,
    min: 0
  },
  paymentMethod: {
    type: String,
    enum: ['Cash', 'Card', 'Bank Transfer', 'Online'],
    required: true
  },
  transactionId: {
    type: String
  },
  status: {
    type: String,
    enum: ['Paid', 'Pending', 'Failed'],
    default: 'Pending'
  },
  notes: {
    type: String
  },
  paidAt: {
    type: Date
  }
}, { timestamps: true });

module.exports = mongoose.model('Payment', paymentSchema);