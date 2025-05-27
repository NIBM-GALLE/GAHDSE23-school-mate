const express = require('express');
const router = express.Router();
const timetableController = require('../controllers/timetableController');

router.post('/', timetableController.create);
router.get('/', timetableController.getAll);
router.get('/:id', timetableController.getById);
router.put('/:id', timetableController.update);
router.delete('/:id', timetableController.delete);

module.exports = router;