const GradeReport = require('../models/GradeReport');
const Student = require('../models/Student');
const Module = require('../models/Module');

// f1: Publish Grade Report
exports.publishGradeReport = async (req, res) => {
  const { studentId, moduleId, date, grade, reportUrl, feedback } = req.body;

  try {
    const student = await Student.findById(studentId);
    if (!student) return res.status(404).json({ msg: 'Student not found' });

    const module = await Module.findById(moduleId);
    if (!module) return res.status(404).json({ msg: 'Module not found' });

    const newGradeReport = new GradeReport({
      studentId,
      moduleId,
      date,
      grade,
      reportUrl,
      feedback
    });

    const savedReport = await newGradeReport.save();

    res.status(201).json({
      msg: 'Grade and report published successfully',
      report: savedReport
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// f2: Get grade report by ID
exports.getGradeReportById = async (req, res) => {
  try {
    const report = await GradeReport.findById(req.params.id)
      .populate('studentId', 'name')
      .populate('moduleId', 'name');

    if (!report) {
      return res.status(404).json({ msg: 'Grade report not found' });
    }

    res.status(200).json(report);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// f3: Update grade report
exports.updateGradeReport = async (req, res) => {
  const { studentId, moduleId, date, grade, reportUrl, feedback } = req.body;

  try {
    const updatedReport = await GradeReport.findByIdAndUpdate(
      req.params.id,
      { studentId, moduleId, date, grade, reportUrl, feedback },
      { new: true }
    );

    if (!updatedReport) {
      return res.status(404).json({ msg: 'Grade report not found' });
    }

    res.status(200).json({
      msg: 'Grade report updated successfully',
      report: updatedReport
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// f4: Delete grade report
exports.deleteGradeReport = async (req, res) => {
  try {
    const deletedReport = await GradeReport.findByIdAndDelete(req.params.id);

    if (!deletedReport) {
      return res.status(404).json({ msg: 'Grade report not found' });
    }

    res.status(200).json({ msg: 'Grade report deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// f5: Search grade reports by filter
exports.searchGradeReports = async (req, res) => {
  const { studentId, moduleId, grade, date } = req.query;
  let query = {};

  if (studentId) query.studentId = studentId;
  if (moduleId) query.moduleId = moduleId;
  if (grade) query.grade = grade;
  if (date) {
    const startDate = new Date(date);
    const endDate = new Date(date);
    endDate.setHours(23, 59, 59, 999);
    query.date = { $gte: startDate, $lte: endDate };
  }

  try {
    const results = await GradeReport.find(query)
      .populate('studentId', 'name')
      .populate('moduleId', 'name');

    res.status(200).json(results);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// f6: Get all grade reports
exports.getAllGradeReports = async (req, res) => {
  try {
    const reports = await GradeReport.find()
      .populate('studentId', 'name')
      .populate('moduleId', 'name');

    res.status(200).json(reports);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
