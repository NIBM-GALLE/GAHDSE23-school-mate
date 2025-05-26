const ExamSchedule = require('../models/ExamSchedule');

// f1: Create Exam Schedule
exports.publishExamSchedule = async (req, res) => {
  const { moduleId, date, startTime, endTime, note } = req.body;

  try {
    const schedule = new ExamSchedule({
      moduleId,
      date,
      startTime,
      endTime,
      note
    });

    const saved = await schedule.save();
    res.status(201).json({ msg: 'Exam schedule published', schedule: saved });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// f2: Get Exam Schedule by ID
exports.getExamScheduleById = async (req, res) => {
  const { id } = req.params;

  try {
    const schedule = await ExamSchedule.findById(id).populate('moduleId', 'name');

    if (!schedule) {
      return res.status(404).json({ msg: 'Exam schedule not found' });
    }

    res.status(200).json(schedule);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// f3: Update Exam Schedule
exports.updateExamSchedule = async (req, res) => {
  const { id } = req.params;
  const { moduleId, date, startTime, endTime, note } = req.body;

  try {
    const updatedSchedule = await ExamSchedule.findByIdAndUpdate(
      id,
      { moduleId, date, startTime, endTime, note },
      { new: true }
    ).populate('moduleId', 'name');

    if (!updatedSchedule) {
      return res.status(404).json({ msg: 'Exam schedule not found' });
    }

    res.status(200).json({ msg: 'Exam schedule updated successfully', schedule: updatedSchedule });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// f4: Delete Exam Schedule
exports.deleteExamSchedule = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedSchedule = await ExamSchedule.findByIdAndDelete(id);

    if (!deletedSchedule) {
      return res.status(404).json({ msg: 'Exam schedule not found' });
    }

    res.status(200).json({ msg: 'Exam schedule deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// f5: Search Exam Schedule by moduleId or date, or both
exports.searchExamSchedule = async (req, res) => {
  const { moduleId, date } = req.query;
  let query = {};

  if (moduleId) query.moduleId = moduleId;
  if (date) {
    const startDate = new Date(date);
    const endDate = new Date(date);
    endDate.setHours(23, 59, 59, 999);
    query.date = { $gte: startDate, $lte: endDate };
  }

  try {
    const schedules = await ExamSchedule.find(query).populate('moduleId', 'name');
    res.status(200).json(schedules);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// f6: Get All Exam Schedules
exports.getAllExamSchedules = async (req, res) => {
  try {
    const schedules = await ExamSchedule.find().populate('moduleId', 'name');
    
    res.status(200).json(schedules);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

