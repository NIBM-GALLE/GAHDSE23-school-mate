const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const adminOnly = require('../middleware/adminOnly');
const feeController = require('../controllers/facilityFeeController');

// f1: Add a new facility fee
router.post('/add', auth, adminOnly, feeController.addFacilityFee);

// f5: Search facility fees by courseId
router.get('/search', auth, feeController.searchFacilityFees);

// f6: Get all facility fees
router.get('/all', auth, feeController.getAllFacilityFees);

// f2: Get facility fee by ID (keep this below /all and /search)
router.get('/:id', auth, feeController.getFacilityFeeById);

// f3: Update an existing facility fee
router.put('/update/:id', auth, adminOnly, feeController.updateFacilityFee);

// f4: Delete a facility fee
router.delete('/delete/:id', auth, adminOnly, feeController.deleteFacilityFee);

module.exports = router;
