const Timetable = require('../models/Timetable');

// CREATE
exports.publishTimetable = async (req, res) => {
  const { moduleId, date, startTime, endTime, note } = req.body;

  try {
    const newTimetable = new Timetable({ moduleId, date, startTime, endTime, note });
    const savedTimetable = await newTimetable.save();
    res.status(201).json({ msg: 'Timetable published successfully', timetable: savedTimetable });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// READ ALL
exports.getAllTimetables = async (req, res) => {
  try {
    const timetables = await Timetable.find().populate('moduleId');
    res.status(200).json(timetables);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// READ ONE
exports.getTimetableById = async (req, res) => {
  try {
    const timetable = await Timetable.findById(req.params.id).populate('moduleId');
    if (!timetable) return res.status(404).json({ msg: 'Timetable not found' });
    res.status(200).json(timetable);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// UPDATE
exports.updateTimetable = async (req, res) => {
  try {
    const updated = await Timetable.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updated) return res.status(404).json({ msg: 'Timetable not found' });
    res.status(200).json({ msg: 'Timetable updated', timetable: updated });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// DELETE
exports.deleteTimetable = async (req, res) => {
  try {
    const deleted = await Timetable.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ msg: 'Timetable not found' });
    res.status(200).json({ msg: 'Timetable deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// SEARCH by date or moduleId
exports.searchTimetables = async (req, res) => {
  const { date, moduleId } = req.query;

  let query = {};
  if (date) query.date = new Date(date);
  if (moduleId) query.moduleId = moduleId;

  try {
    const results = await Timetable.find(query).populate('moduleId');
    res.status(200).json(results);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
