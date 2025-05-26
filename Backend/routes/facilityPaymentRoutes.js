// routes/facilityPaymentRoutes.js
const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const adminOnly = require('../middleware/adminOnly');
const facilityPaymentController = require('../controllers/facilityPaymentController');

// f1: Create Facility Payment (admin only)
router.post('/add', auth, adminOnly, facilityPaymentController.createFacilityPayment);

// f3: Get all Facility Payments (must come before /:id)
router.get('/all', auth, facilityPaymentController.getAllFacilityPayments);

// f6: Search Facility Payments (by parentId or courseId)
router.get('/search', auth, facilityPaymentController.searchFacilityPayments);

// f2: Get Facility Payment by ID
router.get('/:id', auth, facilityPaymentController.getFacilityPaymentById);

// f4: Update Facility Payment (admin only)
router.put('/update/:id', auth, adminOnly, facilityPaymentController.updateFacilityPayment);

// f5: Delete Facility Payment (admin only)
router.delete('/delete/:id', auth, adminOnly, facilityPaymentController.deleteFacilityPayment);

module.exports = router;
