const express = require('express');
const router = express.Router();
const parentController = require('../controllers/parentController');
const auth = require('../middleware/auth');
const adminOnly = require('../middleware/adminOnly');

// CRUD Routes
router.post('/create', auth, adminOnly, parentController.createParent);
router.get('/all', auth, adminOnly, parentController.getAllParents);
router.get('/:id', auth, parentController.getParentById);
router.put('/:id', auth, adminOnly, parentController.updateParent);
router.delete('/:id', auth, adminOnly, parentController.deleteParent);

module.exports = router;
