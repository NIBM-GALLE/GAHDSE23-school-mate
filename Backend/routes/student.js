const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');           // ✅ Auth middleware
const adminOnly = require('../middleware/adminOnly'); // ✅ Admin-only check
const studentController = require('../controllers/studentController');

// Create a new student and parent
router.post('/add', auth, adminOnly, studentController.createStudent);

// Get all students
router.get('/all', auth, adminOnly, studentController.getAllStudents);

// Get a student by ID
router.get('/:id', auth, studentController.getStudentById);

// Update a student's details
router.put('/update/:id', auth, adminOnly, studentController.updateStudent);

// Delete a student by ID
router.delete('/delete/:id', auth, adminOnly, studentController.deleteStudent);

// Get all parents
router.get('/parents', auth, adminOnly, studentController.getAllParents);

// Get a parent by student ID
router.get('/parent/:studentId', auth, studentController.getParentByStudentId);

// Delete a parent by ID
router.delete('/parent/delete/:id', auth, adminOnly, studentController.deleteParent);

module.exports = router;
