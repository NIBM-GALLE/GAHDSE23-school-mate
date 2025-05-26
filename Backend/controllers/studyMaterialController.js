const StudyMaterial = require('../models/StudyMaterial');

// CREATE
exports.createStudyMaterial = async (req, res) => {
  const { moduleId, title, description, fileUrl } = req.body;

  try {
    const newMaterial = new StudyMaterial({ moduleId, title, description, fileUrl });
    await newMaterial.save();
    res.status(201).json({ msg: 'Study material added successfully', material: newMaterial });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// READ - Get all study materials
exports.getAllStudyMaterials = async (req, res) => {
  try {
    const materials = await StudyMaterial.find().populate('moduleId');
    res.status(200).json(materials);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// READ - Get a study material by ID
exports.getStudyMaterialById = async (req, res) => {
  try {
    const material = await StudyMaterial.findById(req.params.id).populate('moduleId');
    if (!material) return res.status(404).json({ msg: 'Material not found' });
    res.status(200).json(material);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// UPDATE
exports.updateStudyMaterial = async (req, res) => {
  try {
    const updated = await StudyMaterial.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updated) return res.status(404).json({ msg: 'Material not found' });
    res.status(200).json({ msg: 'Updated successfully', material: updated });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// DELETE
exports.deleteStudyMaterial = async (req, res) => {
  try {
    const deleted = await StudyMaterial.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ msg: 'Material not found' });
    res.status(200).json({ msg: 'Deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// SEARCH - By title (case-insensitive partial match)
exports.searchByTitle = async (req, res) => {
  const { title } = req.query;
  if (!title) {
    return res.status(400).json({ msg: 'Title query parameter is required' });
  }

  try {
    const materials = await StudyMaterial.find({
      title: { $regex: title, $options: 'i' } // case-insensitive search
    }).populate('moduleId');

    res.status(200).json(materials);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// SEARCH - By moduleId
exports.searchByModuleId = async (req, res) => {
  const { moduleId } = req.query;
  if (!moduleId) {
    return res.status(400).json({ msg: 'moduleId query parameter is required' });
  }

  try {
    const materials = await StudyMaterial.find({ moduleId }).populate('moduleId');
    res.status(200).json(materials);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
