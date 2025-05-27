const FeeStructure = require('../models/FeeStructure');
const Payment = require('../models/Payment');

const paymentController = {
  // Create fee structure
  async createFeeStructure(req, res) {
    try {
      const fee = new FeeStructure(req.body);
      await fee.save();
      await fee.populate('courseId', 'courseName');
      res.status(201).json({ message: 'Fee structure created', data: fee });
    } catch (error) {
      res.status(500).json({ message: 'Server error', error: error.message });
    }
  },

  // Get fee structures
  async getFeeStructures(req, res) {
    try {
      const { courseId } = req.query;
      const filter = {};
      if (courseId) filter.courseId = courseId;

      const fees = await FeeStructure.find(filter).populate('courseId', 'courseName');
      res.json({ data: fees });
    } catch (error) {
      res.status(500).json({ message: 'Server error', error: error.message });
    }
  },

  // Record payment
  async recordPayment(req, res) {
    try {
      const paymentData = { 
        ...req.body,
        status: 'Paid',
        paidAt: new Date()
      };
      
      const payment = new Payment(paymentData);
      await payment.save();
      await payment.populate(['studentId', 'feeId']);
      
      res.status(201).json({ message: 'Payment recorded', data: payment });
    } catch (error) {
      res.status(500).json({ message: 'Server error', error: error.message });
    }
  },

  // Get all payments
  async getPayments(req, res) {
    try {
      const { studentId, status } = req.query;
      const filter = {};
      if (studentId) filter.studentId = studentId;
      if (status) filter.status = status;

      const payments = await Payment.find(filter)
        .populate('studentId', 'firstName lastName email')
        .populate('feeId', 'feeType amount dueDate');
      
      res.json({ data: payments });
    } catch (error) {
      res.status(500).json({ message: 'Server error', error: error.message });
    }
  },

  // Get outstanding payments
  async getOutstandingPayments(req, res) {
    try {
      const { courseId } = req.query;
      
      // Get all fee structures
      const feeFilter = {};
      if (courseId) feeFilter.courseId = courseId;
      
      const fees = await FeeStructure.find(feeFilter).populate('courseId');
      
      // Get all payments for these fees
      const feeIds = fees.map(fee => fee._id);
      const payments = await Payment.find({ 
        feeId: { $in: feeIds },
        status: 'Paid'
      });
      
      // Calculate outstanding amounts
      const outstanding = [];
      for (const fee of fees) {
        const paidPayments = payments.filter(p => p.feeId.toString() === fee._id.toString());
        const totalPaid = paidPayments.reduce((sum, p) => sum + p.amount, 0);
        
        if (totalPaid < fee.amount) {
          outstanding.push({
            fee,
            expectedAmount: fee.amount,
            paidAmount: totalPaid,
            outstandingAmount: fee.amount - totalPaid
          });
        }
      }
      
      res.json({ data: outstanding });
    } catch (error) {
      res.status(500).json({ message: 'Server error', error: error.message });
    }
  },

  // Get student payment history
  async getStudentPayments(req, res) {
    try {
      const { studentId } = req.params;
      
      const payments = await Payment.find({ studentId })
        .populate('feeId', 'feeType amount dueDate description')
        .sort({ createdAt: -1 });
      
      if (!payments.length) {
        return res.status(404).json({ message: 'No payments found for student' });
      }
      
      res.json({ data: payments });
    } catch (error) {
      res.status(500).json({ message: 'Server error', error: error.message });
    }
  }
};

module.exports = paymentController;