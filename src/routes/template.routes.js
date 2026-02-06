const express = require('express');
const router = express.Router();
const { getAllTemplates, getTemplate, createTemplate, updateTemplate, deleteTemplate } = require('../controllers/template.controller');

// Public routes
router.get('/', getAllTemplates);
router.get('/:id', getTemplate);

// Admin routes (can be protected with auth middleware in future)
router.post('/', createTemplate);
router.put('/:id', updateTemplate);
router.delete('/:id', deleteTemplate);

module.exports = router;
