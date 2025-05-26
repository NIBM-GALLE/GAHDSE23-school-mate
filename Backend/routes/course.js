const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const adminOnly = require('../middleware/adminOnly');
const courseController = require('../controllers/courseController');

// f1: Create Course (admin only)
router.post('/add', auth, adminOnly, courseController.createCourse);

// View all courses
router.get('/all', auth, courseController.getCourses);

// f5: Search by courseDirector
router.get('/search/director', auth, courseController.searchByDirector);

// f2: Get Course by ID
router.get('/:id', auth, courseController.getCourseById);

// f3: Update Course (admin only)
router.put('/update/:id', auth, adminOnly, courseController.updateCourse);

// f4: Delete Course (admin only)
router.delete('/delete/:id', auth, adminOnly, courseController.deleteCourse);

module.exports = router;
