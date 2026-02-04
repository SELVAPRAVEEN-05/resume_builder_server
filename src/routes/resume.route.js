const express = require('express');
const router = express.Router();

const auth = require('../middleware/auth.middleware');
const {
  createResume,
  getMyResume,
  updateObjective,
  deleteResume
} = require('../controllers/resume.controller');

router.post('/', auth, createResume);

router.get('/me', auth, getMyResume);

router.put('/objective', auth, updateObjective);

router.delete('/', auth, deleteResume);

module.exports = router;
