const Course = require('../models/Course');
const User = require('../models/User');

// f1: Create Course (admin only)
exports.createCourse = async (req, res) => {
  const { courseName, courseDirector } = req.body;

  try {
    const user = await User.findById(req.user.id);
    if (user.role !== 'admin') {
      return res.status(403).json({ msg: 'You do not have permission to add courses' });
    }

    const newCourse = new Course({ courseName, courseDirector });
    await newCourse.save();

    res.status(201).json({ msg: 'Course added successfully', course: newCourse });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// f2: Get Course by ID
exports.getCourseById = async (req, res) => {
  const { id } = req.params;

  try {
    const course = await Course.findById(id).populate('courseDirector', 'firstName email role');

    if (!course) {
      return res.status(404).json({ msg: 'Course not found' });
    }

    res.status(200).json(course);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// f3: Update Course (admin only)
exports.updateCourse = async (req, res) => {
  const { id } = req.params;
  const { courseName, courseDirector } = req.body;

  try {
    const user = await User.findById(req.user.id);
    if (user.role !== 'admin') {
      return res.status(403).json({ msg: 'You do not have permission to update courses' });
    }

    const updatedCourse = await Course.findByIdAndUpdate(
      id,
      { courseName, courseDirector },
      { new: true }
    ).populate('courseDirector', 'firstName email role');

    if (!updatedCourse) {
      return res.status(404).json({ msg: 'Course not found' });
    }

    res.status(200).json({ msg: 'Course updated successfully', course: updatedCourse });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// f4: Delete Course (admin only)
exports.deleteCourse = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    if (user.role !== 'admin') {
      return res.status(403).json({ msg: 'You do not have permission to delete courses' });
    }

    const deleted = await Course.findByIdAndDelete(req.params.id);
    if (!deleted) {
      return res.status(404).json({ msg: 'Course not found' });
    }

    res.status(200).json({ msg: 'Course deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// f5: Search by courseDirector
exports.searchByDirector = async (req, res) => {
  const { directorId } = req.query;

  if (!directorId) {
    return res.status(400).json({ msg: 'courseDirector ID is required for search' });
  }

  try {
    const courses = await Course.find({ courseDirector: directorId })
      .populate('courseDirector', 'firstName email');

    res.status(200).json({ courses });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get all courses
exports.getCourses = async (req, res) => {
  try {
    const courses = await Course.find().populate('courseDirector', 'firstName email role');
    res.status(200).json({ courses });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
