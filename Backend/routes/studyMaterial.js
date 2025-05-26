const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth'); // Token verification
const lectureOnly = require('../middleware/lectureOnly'); // Only lectures/admins can modify materials

const studyMaterialController = require('../controllers/studyMaterialController');

// CREATE study material
router.post('/add', auth, lectureOnly, studyMaterialController.createStudyMaterial);

// READ - Get all study materials
router.get('/all', auth, studyMaterialController.getAllStudyMaterials);

// READ - Get a single study material by ID
router.get('/:id', auth, studyMaterialController.getStudyMaterialById);

// UPDATE study material
router.put('/update/:id', auth, lectureOnly, studyMaterialController.updateStudyMaterial);

// DELETE study material
router.delete('/delete/:id', auth, lectureOnly, studyMaterialController.deleteStudyMaterial);

// SEARCH - By title
router.get('/search/title', auth, studyMaterialController.searchByTitle);

// SEARCH - By module ID
router.get('/search/module', auth, studyMaterialController.searchByModuleId);

module.exports = router;
