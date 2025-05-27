const Module = require('../models/Module');

// f1: Create Module
exports.createModule = async (req, res) => {
  const { courseId, moduleName } = req.body;

  try {
    const newModule = new Module({ courseId, moduleName });
    await newModule.save();

    res.status(201).json({ msg: 'Module created successfully', module: newModule });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// f2: Get all modules
exports.getAllModules = async (req, res) => {
  try {
    const modules = await Module.find().populate('courseId', 'courseName'); // Populate courseId to get course name
    res.status(200).json({ modules });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// f3: Get module by ID
exports.getModuleById = async (req, res) => {
  const { id } = req.params;

  try {
    const module = await Module.findById(id).populate('courseId', 'courseName');
    if (!module) {
      return res.status(404).json({ msg: 'Module not found' });
    }
    res.status(200).json({ module });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// f4: Update module
exports.updateModule = async (req, res) => {
  const { id } = req.params;
  const { courseId, moduleName } = req.body;

  try {
    const updatedModule = await Module.findByIdAndUpdate(
      id,
      { courseId, moduleName },
      { new: true } // Returns the updated document
    );

    if (!updatedModule) {
      return res.status(404).json({ msg: 'Module not found' });
    }

    res.status(200).json({ msg: 'Module updated successfully', module: updatedModule });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// f5: Delete module
exports.deleteModule = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedModule = await Module.findByIdAndDelete(id);
    if (!deletedModule) {
      return res.status(404).json({ msg: 'Module not found' });
    }

    res.status(200).json({ msg: 'Module deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
