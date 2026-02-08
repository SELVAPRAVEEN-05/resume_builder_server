const express = require('express');
const router = express.Router();

const auth = require('../middleware/auth.middleware');
const { validateResume } = require('../middleware/validation.middleware');

const {
  createResume,
  getMyResumes,
  getResumeById,
  updateResume,
  deleteResume
} = require('../controllers/resume.controller');

router.post('/', auth, validateResume, createResume);
router.get('/', auth, getMyResumes);
router.get('/:resumeId', auth, getResumeById);
router.put('/:resumeId', auth, validateResume, updateResume);
router.delete('/:resumeId', auth, deleteResume);

module.exports = router;
