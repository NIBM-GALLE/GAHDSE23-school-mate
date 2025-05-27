const Parent = require('../models/Parent');

// CREATE - Add a new parent
exports.createParent = async (req, res) => {
  const { user, student } = req.body;

  try {
    const newParent = new Parent({
      user,
      student
    });

    await newParent.save();
    res.status(201).json({ msg: 'Parent added successfully', parent: newParent });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// READ - Get all parents
exports.getAllParents = async (req, res) => {
  try {
    const parents = await Parent.find().populate('user student');
    res.status(200).json(parents);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// READ - Get a parent by ID
exports.getParentById = async (req, res) => {
  try {
    const parent = await Parent.findById(req.params.id).populate('user student');
    if (!parent) return res.status(404).json({ msg: 'Parent not found' });
    res.status(200).json(parent);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// UPDATE - Update a parent by ID
exports.updateParent = async (req, res) => {
  try {
    const updatedParent = await Parent.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedParent) return res.status(404).json({ msg: 'Parent not found' });
    res.status(200).json({ msg: 'Parent updated successfully', parent: updatedParent });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// DELETE - Delete a parent by ID
exports.deleteParent = async (req, res) => {
  try {
    const deletedParent = await Parent.findByIdAndDelete(req.params.id);
    if (!deletedParent) return res.status(404).json({ msg: 'Parent not found' });
    res.status(200).json({ msg: 'Parent deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
