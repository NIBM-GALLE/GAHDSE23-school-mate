const express = require('express');
const router = express.Router();
const examController = require('../controllers/examController');

router.post('/', examController.create);
router.get('/', examController.getAll);
router.get('/:id', examController.getById);
router.put('/:id', examController.update);
router.delete('/:id', examController.delete);

// Exam results routes
router.post('/:examId/results', examController.addResult);
router.get('/:examId/results', examController.getResults);

module.exports = router;