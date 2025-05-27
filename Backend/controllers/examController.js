// controllers/examController.js
const Exam = require('../models/Exam');
const ExamResult = require('../models/ExamResult');

const examController = {
  // Create exam
  async create(req, res) {
    try {
      const exam = new Exam(req.body);
      await exam.save();
      await exam.populate('courseId');
      res.status(201).json({ message: 'Exam scheduled', data: exam });
    } catch (error) {
      res.status(500).json({ message: 'Server error', error: error.message });
    }
  },

  // Get all exams
  async getAll(req, res) {
    try {
      const { courseId, date } = req.query;
      const filter = {};
      if (courseId) filter.courseId = courseId;
      if (date) filter.date = new Date(date);

      const exams = await Exam.find(filter).populate('courseId', 'courseName');
      res.json({ data: exams });
    } catch (error) {
      res.status(500).json({ message: 'Server error', error: error.message });
    }
  },

  // Get by ID
  async getById(req, res) {
    try {
      const exam = await Exam.findById(req.params.id).populate('courseId');
      
      if (!exam) {
        return res.status(404).json({ message: 'Exam not found' });
      }
      
      res.json({ data: exam });
    } catch (error) {
      res.status(500).json({ message: 'Server error', error: error.message });
    }
  },

  // Update exam
  async update(req, res) {
    try {
      const exam = await Exam.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true, runValidators: true }
      ).populate('courseId');
      
      if (!exam) {
        return res.status(404).json({ message: 'Exam not found' });
      }
      
      res.json({ message: 'Exam updated', data: exam });
    } catch (error) {
      res.status(500).json({ message: 'Server error', error: error.message });
    }
  },

  // Delete exam
  async delete(req, res) {
    try {
      const exam = await Exam.findByIdAndDelete(req.params.id);
      
      if (!exam) {
        return res.status(404).json({ message: 'Exam not found' });
      }
      
      // Also delete related results
      await ExamResult.deleteMany({ examId: req.params.id });
      
      res.json({ message: 'Exam and results deleted' });
    } catch (error) {
      res.status(500).json({ message: 'Server error', error: error.message });
    }
  },

  // Add exam results
  async addResult(req, res) {
    try {
      const { examId } = req.params;
      const resultData = { ...req.body, examId };
      
      const result = new ExamResult(resultData);
      await result.save();
      await result.populate(['examId', 'studentId']);
      
      res.status(201).json({ message: 'Result added', data: result });
    } catch (error) {
      if (error.code === 11000) {
        res.status(400).json({ message: 'Result already exists for this student' });
      } else {
        res.status(500).json({ message: 'Server error', error: error.message });
      }
    }
  },

  // Get exam results
  async getResults(req, res) {
    try {
      const { examId } = req.params;
      
      const exam = await Exam.findById(examId);
      if (!exam) {
        return res.status(404).json({ message: 'Exam not found' });
      }
      
      const results = await ExamResult.find({ examId })
        .populate('studentId', 'firstName lastName email')
        .populate('examId', 'title subject');
      
      res.json({ data: results });
    } catch (error) {
      res.status(500).json({ message: 'Server error', error: error.message });
    }
  }
};

module.exports = examController;