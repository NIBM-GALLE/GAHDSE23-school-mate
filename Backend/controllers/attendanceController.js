const Attendance = require('../models/Attendance');

// f1: Create (Mark) Attendance
exports.markAttendance = async (req, res) => {
  const { studentId, moduleId, date, status, note } = req.body;

  try {
    const attendance = new Attendance({ studentId, moduleId, date, status, note });
    const savedAttendance = await attendance.save();
    res.status(201).json({ msg: 'Attendance recorded', attendance: savedAttendance });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// f2: Get Single Attendance by ID
exports.getAttendanceById = async (req, res) => {
  const { id } = req.params;

  try {
    const attendance = await Attendance.findById(id)
      .populate('studentId', 'name')
      .populate('moduleId', 'name');

    if (!attendance) return res.status(404).json({ msg: 'Attendance not found' });

    res.status(200).json(attendance);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// f3: Update Attendance by ID
exports.updateAttendance = async (req, res) => {
  const { id } = req.params;
  const { studentId, moduleId, date, status, note } = req.body;

  try {
    const updated = await Attendance.findByIdAndUpdate(
      id,
      { studentId, moduleId, date, status, note },
      { new: true }
    );

    if (!updated) return res.status(404).json({ msg: 'Attendance not found' });

    res.status(200).json({ msg: 'Attendance updated', attendance: updated });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// f4: Delete Attendance
exports.deleteAttendance = async (req, res) => {
  const { id } = req.params;

  try {
    const deleted = await Attendance.findByIdAndDelete(id);
    if (!deleted) return res.status(404).json({ msg: 'Attendance not found' });

    res.status(200).json({ msg: 'Attendance deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// f5: Search Attendance by studentId, moduleId, date, or status
exports.searchAttendance = async (req, res) => {
  const { studentId, moduleId, date, status } = req.query;
  let query = {};

  if (studentId) query.studentId = studentId;
  if (moduleId) query.moduleId = moduleId;
  if (status) query.status = status;
  if (date) {
    const start = new Date(date);
    const end = new Date(date);
    end.setHours(23, 59, 59, 999);
    query.date = { $gte: start, $lte: end };
  }

  try {
    const results = await Attendance.find(query)
      .populate('studentId', 'name')
      .populate('moduleId', 'name');

    res.status(200).json(results);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// f6: Get All Attendance Records
exports.getAllAttendance = async (req, res) => {
  try {
    const allAttendance = await Attendance.find()
      .populate('studentId', 'name')
      .populate('moduleId', 'name');

    res.status(200).json(allAttendance);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
