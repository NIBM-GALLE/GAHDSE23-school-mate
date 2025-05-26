const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const lectureOnly = require('../middleware/lectureOnly');
const timetableController = require('../controllers/timetableController');

// CREATE
router.post('/publish', auth, lectureOnly, timetableController.publishTimetable);

// READ
router.get('/all', auth, timetableController.getAllTimetables);
router.get('/:id', auth, timetableController.getTimetableById);

// UPDATE
router.put('/update/:id', auth, lectureOnly, timetableController.updateTimetable);

// DELETE
router.delete('/delete/:id', auth, lectureOnly, timetableController.deleteTimetable);

// SEARCH (by date or moduleId)
router.get('/search', auth, timetableController.searchTimetables);

module.exports = router;
