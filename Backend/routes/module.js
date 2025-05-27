const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');           // ✅ Auth middleware
const adminOnly = require('../middleware/adminOnly'); // ✅ Admin-only check
const moduleController = require('../controllers/moduleController');

// f1: Create a new module (admin only)
router.post('/add', auth, adminOnly, moduleController.createModule);

// f2: Get all modules (auth required)
router.get('/all', auth, moduleController.getAllModules);

// f3: Get module by ID (auth required)
router.get('/:id', auth, moduleController.getModuleById);

// f4: Update a module (admin only)
router.put('/update/:id', auth, adminOnly, moduleController.updateModule);

// f5: Delete a module (admin only)
router.delete('/delete/:id', auth, adminOnly, moduleController.deleteModule);

module.exports = router;
