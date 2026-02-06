const express = require('express');
const router = express.Router();

const auth = require('../middleware/auth.middleware');
const { validateResume } = require('../middleware/validation.middleware');
const {
  createResume,
  getMyResume,
  deleteResume,
  generateResumePDF,
  updateResume
} = require('../controllers/resume.controller');

router.post('/', auth, validateResume, createResume);
router.get('/me', auth, getMyResume);
router.put('/', auth, validateResume, updateResume);
router.get('/pdf', auth, generateResumePDF);
router.delete('/', auth, deleteResume);

module.exports = router;
