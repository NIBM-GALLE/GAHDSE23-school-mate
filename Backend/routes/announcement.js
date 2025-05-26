const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const lectureOnly = require('../middleware/lectureOnly');
const announcementController = require('../controllers/announcementController');

// f1: Create Announcement (only lectures)
router.post('/create', auth, lectureOnly, announcementController.createAnnouncement);

// f2: Get All Announcements (accessible to authenticated users)
router.get('/all', auth, announcementController.getAllAnnouncements);

// f3: Update Announcement (only lectures)
router.put('/update/:id', auth, lectureOnly, announcementController.updateAnnouncement);

// f4: Delete Announcement (only lectures)
router.delete('/delete/:id', auth, lectureOnly, announcementController.deleteAnnouncement);

// f5: Search by Date (accessible to authenticated users)
// Example: /search/date?date=2024-06-19
router.get('/search/date', auth, announcementController.searchByDate);

// f6: Search by Audience (accessible to authenticated users)
// Example: /search/audience?audience=students
router.get('/search/audience', auth, announcementController.searchByAudience);

// f7: Get Announcement by ID
router.get('/:id', auth, announcementController.getAnnouncementById); 

module.exports = router;
