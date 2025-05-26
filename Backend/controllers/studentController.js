const User = require('../models/User');
const Student = require('../models/Student');
const Parent = require('../models/Parent');
const bcrypt = require('bcryptjs');

// Create a new student and parent
exports.createStudent = async (req, res) => {
  const {
    firstName,
    lastName,
    address,
    contact,
    email,
    password,
    courseIds,
    parentFirstName,
    parentLastName,
    parentAddress,
    parentContact,
    parentEmail,
    parentPassword
  } = req.body;

  try {
    // Check if student email already exists
    const existingStudentUser = await User.findOne({ email });
    if (existingStudentUser) {
      return res.status(400).json({ msg: 'Student email already exists' });
    }

    // Check if parent email already exists
    const existingParentUser = await User.findOne({ email: parentEmail });
    if (existingParentUser) {
      return res.status(400).json({ msg: 'Parent email already exists' });
    }

    // Hash passwords
    const salt = await bcrypt.genSalt(10);
    const hashedStudentPassword = await bcrypt.hash(password, salt);
    const hashedParentPassword = await bcrypt.hash(parentPassword, salt);

    // Create student user
    const studentUser = new User({
      firstName,
      lastName,
      address,
      contact,
      email,
      password: hashedStudentPassword,
      role: 'student'
    });
    const savedStudentUser = await studentUser.save();

    // Create student record
    const student = new Student({
      user: savedStudentUser._id,
      courses: courseIds
    });
    const savedStudent = await student.save();

    // Create parent user
    const parentUser = new User({
      firstName: parentFirstName,
      lastName: parentLastName,
      address: parentAddress,
      contact: parentContact,
      email: parentEmail,
      password: hashedParentPassword,
      role: 'parent'
    });
    const savedParentUser = await parentUser.save();

    // Create parent record
    const parent = new Parent({
      user: savedParentUser._id,
      student: savedStudent._id
    });
    const savedParent = await parent.save();

    res.status(201).json({
      msg: 'Student and parent registered successfully',
      student: savedStudent,
      parent: savedParent
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get all students
exports.getAllStudents = async (req, res) => {
  try {
    const students = await Student.find().populate('user', 'firstName lastName email').populate('courses');
    res.status(200).json(students);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get a student by ID
exports.getStudentById = async (req, res) => {
  const { id } = req.params;

  try {
    const student = await Student.findById(id).populate('user', 'firstName lastName email').populate('courses');
    if (!student) return res.status(404).json({ msg: 'Student not found' });
    res.status(200).json(student);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update a student
exports.updateStudent = async (req, res) => {
  const { id } = req.params;
  const { courses, address, contact } = req.body;

  try {
    const student = await Student.findById(id);
    if (!student) return res.status(404).json({ msg: 'Student not found' });

    student.courses = courses || student.courses;
    student.address = address || student.address;
    student.contact = contact || student.contact;

    const updatedStudent = await student.save();
    res.status(200).json({ msg: 'Student updated', student: updatedStudent });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Delete a student
exports.deleteStudent = async (req, res) => {
  const { id } = req.params;

  try {
    const student = await Student.findById(id);
    if (!student) return res.status(404).json({ msg: 'Student not found' });

    await Student.findByIdAndDelete(id);
    res.status(200).json({ msg: 'Student deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get all parents
exports.getAllParents = async (req, res) => {
  try {
    const parents = await Parent.find().populate('user', 'firstName lastName email').populate('student');
    res.status(200).json(parents);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get a parent by student ID
exports.getParentByStudentId = async (req, res) => {
  const { studentId } = req.params;

  try {
    const parent = await Parent.findOne({ student: studentId }).populate('user', 'firstName lastName email').populate('student');
    if (!parent) return res.status(404).json({ msg: 'Parent not found' });
    res.status(200).json(parent);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Delete a parent
exports.deleteParent = async (req, res) => {
  const { id } = req.params;

  try {
    const parent = await Parent.findById(id);
    if (!parent) return res.status(404).json({ msg: 'Parent not found' });

    await Parent.findByIdAndDelete(id);
    res.status(200).json({ msg: 'Parent deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
