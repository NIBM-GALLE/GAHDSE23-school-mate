// controllers/facilityPaymentController.js
const FacilityPayment = require('../models/FacilityPayment');
const Parent = require('../models/Parent');
const FacilityFee = require('../models/FacilityFee');

// 1. Create a new Facility Payment
exports.createFacilityPayment = async (req, res) => {
  const { parentId, courseId, facilityFeeId, amountPaid, paymentMethod } = req.body;

  try {
    // Check if Parent exists
    const parent = await Parent.findById(parentId);
    if (!parent) {
      return res.status(404).json({ msg: 'Parent not found' });
    }

    // Check if Facility Fee exists
    const facilityFee = await FacilityFee.findById(facilityFeeId);
    if (!facilityFee) {
      return res.status(404).json({ msg: 'Facility Fee not found' });
    }

    // Create new facility payment
    const newFacilityPayment = new FacilityPayment({
      parentId,
      courseId,
      facilityFeeId,
      amountPaid,
      paymentMethod
    });

    await newFacilityPayment.save();
    res.status(201).json(newFacilityPayment);
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: 'Server error' });
  }
};

// 2. Get Facility Payment by ID
exports.getFacilityPaymentById = async (req, res) => {
  const { id } = req.params;

  try {
    const facilityPayment = await FacilityPayment.findById(id).populate('parentId courseId facilityFeeId');
    if (!facilityPayment) {
      return res.status(404).json({ msg: 'Facility Payment not found' });
    }

    res.status(200).json(facilityPayment);
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: 'Server error' });
  }
};

// f3: Get all Facility Payments
exports.getAllFacilityPayments = async (req, res) => {
  try {
    const payments = await FacilityPayment.find()
      .populate('parentId', 'user')          // adjust fields as needed
      .populate('courseId', 'courseName');   // adjust fields as needed

    res.status(200).json({ payments });
  } catch (err) {
    console.error('Error fetching facility payments:', err); // log error to server console
    res.status(500).json({ msg: 'Server error' });
  }
};


// 4. Update a Facility Payment
exports.updateFacilityPayment = async (req, res) => {
  const { id } = req.params;
  const { amountPaid, paymentMethod } = req.body;

  try {
    const facilityPayment = await FacilityPayment.findById(id);
    if (!facilityPayment) {
      return res.status(404).json({ msg: 'Facility Payment not found' });
    }

    facilityPayment.amountPaid = amountPaid || facilityPayment.amountPaid;
    facilityPayment.paymentMethod = paymentMethod || facilityPayment.paymentMethod;

    await facilityPayment.save();
    res.status(200).json(facilityPayment);
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: 'Server error' });
  }
};

// 5. Delete Facility Payment
exports.deleteFacilityPayment = async (req, res) => {
  const { id } = req.params;

  try {
    const facilityPayment = await FacilityPayment.findById(id);
    if (!facilityPayment) {
      return res.status(404).json({ msg: 'Facility Payment not found' });
    }

    await facilityPayment.remove();
    res.status(200).json({ msg: 'Facility Payment deleted' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: 'Server error' });
  }
};

// 6. Search Facility Payments by Parent ID or Course ID
exports.searchFacilityPayments = async (req, res) => {
  const { parentId, courseId } = req.query;

  try {
    const query = {};
    if (parentId) query.parentId = parentId;
    if (courseId) query.courseId = courseId;

    const payments = await FacilityPayment.find(query).populate('parentId courseId facilityFeeId');
    res.status(200).json(payments);
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: 'Server error' });
  }
};
