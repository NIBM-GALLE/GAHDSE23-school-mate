const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth'); // Middleware to check token
const adminOnly = require('../middleware/adminOnly'); // Ensure only admins can update/delete
const lectureOnly = require('../middleware/lectureOnly'); // Ensure only lecture can publish grades

const gradeReportController = require('../controllers/gradeReportController');

// f1: Publish grade report (lecture only)
router.post('/publish', auth, lectureOnly, gradeReportController.publishGradeReport);

// f5: Search grade reports by filters
router.get('/search', auth, gradeReportController.searchGradeReports);

// f6: Get all grade reports (admin only)
router.get('/all', auth, adminOnly, gradeReportController.getAllGradeReports);

// f2: Get grade report by ID
router.get('/:id', auth, gradeReportController.getGradeReportById);

// f3: Update grade report (admin only)
router.put('/update/:id', auth, adminOnly, gradeReportController.updateGradeReport);

// f4: Delete grade report (admin only)
router.delete('/delete/:id', auth, adminOnly, gradeReportController.deleteGradeReport);

module.exports = router;
