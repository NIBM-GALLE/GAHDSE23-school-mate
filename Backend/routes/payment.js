const express = require('express');
const router = express.Router();
const paymentController = require('../controllers/paymentController');

// Fee structure routes
router.post('/fees', paymentController.createFeeStructure);
router.get('/fees', paymentController.getFeeStructures);

// Payment routes
router.post('/', paymentController.recordPayment);
router.get('/', paymentController.getPayments);
router.get('/outstanding', paymentController.getOutstandingPayments);
router.get('/student/:studentId', paymentController.getStudentPayments);

module.exports = router;
