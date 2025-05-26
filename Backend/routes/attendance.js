const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const lectureOnly = require('../middleware/lectureOnly');
const attendanceController = require('../controllers/attendanceController');

// f1: Mark attendance (Create attendance record)
router.post('/mark', auth, lectureOnly, attendanceController.markAttendance);

// f5: Search attendance records by studentId, moduleId, date, and/or status
router.get('/search', auth, attendanceController.searchAttendance);

// f6: Get all attendance records
router.get('/all', auth, attendanceController.getAllAttendance);

// f2: Get a single attendance record by ID
router.get('/:id', auth, attendanceController.getAttendanceById); 

// f3: Update attendance by ID
router.put('/update/:id', auth, lectureOnly, attendanceController.updateAttendance); 

// f4: Delete attendance record by ID
router.delete('/delete/:id', auth, lectureOnly, attendanceController.deleteAttendance);

module.exports = router;
