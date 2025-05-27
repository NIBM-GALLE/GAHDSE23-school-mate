const Timetable = require('../models/Timetable');

const timetableController = {
  // Create timetable entry
  async create(req, res) {
    try {
      const timetable = new Timetable(req.body);
      await timetable.save();
      await timetable.populate(['courseId', 'teacherId']);
      res.status(201).json({ message: 'Timetable entry created', data: timetable });
    } catch (error) {
      if (error.code === 11000) {
        res.status(400).json({ message: 'Scheduling conflict detected' });
      } else {
        res.status(500).json({ message: 'Server error', error: error.message });
      }
    }
  },

  // Get all timetable entries
  async getAll(req, res) {
    try {
      const { courseId, teacherId, day } = req.query;
      const filter = {};
      if (courseId) filter.courseId = courseId;
      if (teacherId) filter.teacherId = teacherId;
      if (day) filter.day = day;

      const timetables = await Timetable.find(filter)
        .populate('courseId', 'courseName')
        .populate('teacherId', 'firstName lastName email');
      
      res.json({ data: timetables });
    } catch (error) {
      res.status(500).json({ message: 'Server error', error: error.message });
    }
  },

  // Get by ID
  async getById(req, res) {
    try {
      const timetable = await Timetable.findById(req.params.id)
        .populate('courseId')
        .populate('teacherId');
      
      if (!timetable) {
        return res.status(404).json({ message: 'Timetable entry not found' });
      }
      
      res.json({ data: timetable });
    } catch (error) {
      res.status(500).json({ message: 'Server error', error: error.message });
    }
  },

  // Update
  async update(req, res) {
    try {
      const timetable = await Timetable.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true, runValidators: true }
      ).populate(['courseId', 'teacherId']);
      
      if (!timetable) {
        return res.status(404).json({ message: 'Timetable entry not found' });
      }
      
      res.json({ message: 'Timetable updated', data: timetable });
    } catch (error) {
      res.status(500).json({ message: 'Server error', error: error.message });
    }
  },

  // Delete
  async delete(req, res) {
    try {
      const timetable = await Timetable.findByIdAndDelete(req.params.id);
      
      if (!timetable) {
        return res.status(404).json({ message: 'Timetable entry not found' });
      }
      
      res.json({ message: 'Timetable entry deleted' });
    } catch (error) {
      res.status(500).json({ message: 'Server error', error: error.message });
    }
  }
};

module.exports = timetableController;