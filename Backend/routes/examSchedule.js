const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const lectureOnly = require('../middleware/lectureOnly');
const examScheduleController = require('../controllers/examScheduleController');

// f1: Publish exam schedule
router.post('/publish', auth, lectureOnly, examScheduleController.publishExamSchedule);

// f5: Search exam schedules by moduleId, date, or both
router.get('/search', auth, examScheduleController.searchExamSchedule);

// f6: Get all exam schedules
router.get('/all', auth, examScheduleController.getAllExamSchedules);

// f2: Get exam schedule by ID
router.get('/:id', auth, examScheduleController.getExamScheduleById);

// f3: Update exam schedule
router.put('/update/:id', auth, lectureOnly, examScheduleController.updateExamSchedule);

// f4: Delete exam schedule
router.delete('/delete/:id', auth, lectureOnly, examScheduleController.deleteExamSchedule);

module.exports = router;
