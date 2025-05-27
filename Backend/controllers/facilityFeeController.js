const FacilityFee = require('../models/FacilityFee');

// f1: Add a new facility fee
exports.addFacilityFee = async (req, res) => {
  const { courseId, feeAmount, description } = req.body;

  try {
    const fee = new FacilityFee({
      courseId,
      feeAmount,
      description
    });

    const savedFee = await fee.save();
    res.status(201).json({ msg: 'Facility fee added', fee: savedFee });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// f2: Get facility fee by ID
exports.getFacilityFeeById = async (req, res) => {
  try {
    const fee = await FacilityFee.findById(req.params.id).populate('courseId', 'courseName');
    if (!fee) return res.status(404).json({ msg: 'Facility fee not found' });

    res.status(200).json(fee);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// f3: Update an existing facility fee
exports.updateFacilityFee = async (req, res) => {
  const { feeAmount, description } = req.body;

  try {
    const updatedFee = await FacilityFee.findByIdAndUpdate(
      req.params.id,
      { feeAmount, description },
      { new: true }
    );

    if (!updatedFee) return res.status(404).json({ msg: 'Facility fee not found' });

    res.status(200).json({ msg: 'Facility fee updated', fee: updatedFee });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// f4: Delete a facility fee
exports.deleteFacilityFee = async (req, res) => {
  try {
    const deletedFee = await FacilityFee.findByIdAndDelete(req.params.id);
    if (!deletedFee) return res.status(404).json({ msg: 'Facility fee not found' });

    res.status(200).json({ msg: 'Facility fee deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// f5: Search facility fees by courseId
exports.searchFacilityFees = async (req, res) => {
  const { courseId } = req.query;

  if (!courseId) {
    return res.status(400).json({ msg: 'courseId is required for search' });
  }

  try {
    const fees = await FacilityFee.find({ courseId }).populate('courseId', 'courseName');
    res.status(200).json({ fees });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// f6: Get all facility fees
exports.getAllFacilityFees = async (req, res) => {
  try {
    const fees = await FacilityFee.find().populate('courseId', 'courseName');
    res.status(200).json({ fees });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
